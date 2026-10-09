import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { VendorPanel } from './views/VendorPanel';
import CartModal from './components/CartModal';
import {
  getProductos,
  getPedidos,
  updateStockProducto,
  updateEstadoPedido
} from './services/db';
import './index.css';

export function App() {
  // Estados de datos
  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  // Estados de UI
  const [categoriaSel, setCategoriaSel] = useState('todos');
  const [currentUser, setCurrentUser] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [codigoTracking, setCodigoTracking] = useState('');
  const [trackingResultado, setTrackingResultado] = useState(null);

  // Carga inicial
  useEffect(() => {
    setProductos(getProductos());
    setPedidos(getPedidos());
  }, []);

  // Manejo del Carrito
  // 1. Agregar producto y descontar 1 de stock
  const handleAddToCart = (producto) => {
    if (producto.stock <= 0) return;

    // Descuenta 1 al stock visible en el catálogo
    setProductos((prevProductos) =>
      prevProductos.map((p) =>
        p.id === producto.id ? { ...p, stock: p.stock - 1 } : p
      )
    );

    // Añade al carrito
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find((item) => item.id === producto.id);
      if (existe) {
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
  };

  // 2. Eliminar ítem completo del carrito y devolver todo su stock
  const handleRemoveFromCart = (productId) => {
    const itemAEliminar = carrito.find((item) => item.id === productId);
    if (!itemAEliminar) return;

    // Devuelve la cantidad eliminada al stock del catálogo
    setProductos((prevProductos) =>
      prevProductos.map((p) =>
        p.id === productId ? { ...p, stock: p.stock + itemAEliminar.cantidad } : p
      )
    );

    // Saca el producto del carrito
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== productId));
  };

  // 3. Reducir de a 1 unidad dentro del carrito devolviendo 1 al stock
  const handleDecreaseQuantity = (productId) => {
    const item = carrito.find((i) => i.id === productId);
    if (!item) return;

    if (item.cantidad === 1) {
      handleRemoveFromCart(productId);
      return;
    }

    setProductos((prevProductos) =>
      prevProductos.map((p) =>
        p.id === productId ? { ...p, stock: p.stock + 1 } : p
      )
    );

    setCarrito((prevCarrito) =>
      prevCarrito.map((i) =>
        i.id === productId ? { ...i, cantidad: i.cantidad - 1 } : i
      )
    );
  };

  // Manejo de Inventario y Pedidos
  const handleUpdateStock = (id, nuevoStock) => {
    updateStockProducto(id, nuevoStock);
    setProductos(getProductos());
  };

  const handleChangeOrderStatus = (id, nuevoEstado) => {
    updateEstadoPedido(id, nuevoEstado);
    setPedidos(getPedidos());
  };

  // Búsqueda de Tracking
  const handleConsultarTracking = () => {
    const cod = codigoTracking.trim().toUpperCase();
    const pedidoEncontrado = pedidos.find((p) => p.id === cod);
    setTrackingResultado(pedidoEncontrado || 'no_encontrado');
  };

  // Productos filtrados
  const productosFiltrados = productos.filter((prod) => {
    if (
      !categoriaSel || 
      categoriaSel.trim().toLowerCase() === 'todos' || 
      categoriaSel === ''
    ) {
      return true;
    }

    const catProducto = (prod.categoria || '').trim().toLowerCase();
    const catSeleccionada = categoriaSel.trim().toLowerCase();

    return (
      catProducto.includes(catSeleccionada) ||
      catSeleccionada.includes(catProducto)
    );
  });

  return (
    <div>
      <Navbar
        carritoCount={carrito.reduce((acc, item) => acc + item.cantidad, 0)}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {currentUser && (
        <div className="bg-primary text-white py-2">
          <div className="container d-flex justify-content-between align-items-center">
            <span>Sesión iniciada como: <strong>{currentUser.role}</strong></span>
            <button className="btn btn-sm btn-outline-light" onClick={() => setCurrentUser(null)}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}

      <header className="bg-primary text-white text-center py-5 hero-section">
        <div className="container">
          <h1 className="display-4 fw-bold">Sonido Vivo</h1>
          <p className="lead">Instrumentos y Equipos Musicales en Viña del Mar</p>
          <a href="#catalogo" className="btn btn-warning btn-lg fw-bold">Ver Catálogo</a>
        </div>
      </header>

      {currentUser?.role === 'Vendedor' && (
        <VendorPanel
          productos={productos}
          pedidos={pedidos}
          onUpdateStock={handleUpdateStock}
          onChangeOrderStatus={handleChangeOrderStatus}
        />
      )}

      <div className="container my-5" id="catalogo">
        <h2 className="text-center mb-4">Catálogo de Productos</h2>
        <div className="d-flex justify-content-center gap-2 mb-4">
          <button
            className={`btn ${categoriaSel === 'todos' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setCategoriaSel('todos')}
          >
            Todos
          </button>
          <button
            className={`btn ${categoriaSel === 'Guitarras' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setCategoriaSel('Guitarras')}
          >
            Guitarras
          </button>
          <button
            className={`btn ${categoriaSel === 'Baterías' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setCategoriaSel('Baterías')}
          >
            Baterías
          </button>
          <button
            className={`btn ${categoriaSel === 'Teclados' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setCategoriaSel('Teclados')}
          >
            Teclados
          </button>
        </div>

        <div className="row g-4">
          {productosFiltrados.map((prod) => (
            <div className="col-12 col-md-6 col-lg-4" key={prod.id}>
              <ProductCard
                product={prod}
                onAddToCart={handleAddToCart}
              />
            </div>
          ))}
        </div>
      </div>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={carrito}
        onRemove={handleRemoveFromCart}
        onRemoveFromCart={handleRemoveFromCart}
        onAddToCart={handleAddToCart}
        onDecreaseQuantity={handleDecreaseQuantity}
      />
    </div>
  );
}

export default App;