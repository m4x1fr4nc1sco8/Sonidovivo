// src/App.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import VendorPanel from './views/VendorPanel';
import { 
  
  getProductos, 
  getPedidos, 
  updateStockProducto, 
  updateEstadoPedido, 
  addPedido, 
  validarRut 
} from './services/db';
import "./index.css"; // Importamos tu estilo original

export function App() {
  // Estados de datos
  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  
  // Estados de UI
  const [categoriaSel, setCategoriaSel] = useState('todos');
  const [currentUser, setCurrentUser] = useState(null); // { role: 'Cliente' | 'Vendedor' | 'Administrador' }
  const [codigoTracking, setCodigoTracking] = useState('');
  const [trackingResultado, setTrackingResultado] = useState(null);

  // Carga inicial de persistencia (LocalStorage)
  useEffect(() => {
    setProductos(getProductos());
    setPedidos(getPedidos());
  }, []);

  // --- Manejo del Carrito ---
  const handleAddToCart = (product) => {
    if (product.stock <= 0) {
      alert('Producto sin stock disponible');
      return;
    }
    setCarrito((prev) => [...prev, product]);
  };

  const handleRemoveFromCart = (index) => {
    setCarrito((prev) => prev.filter((_, i) => i !== index));
  };

  // --- Operaciones del Panel de Vendedor (CRUD) ---
  const handleUpdateStock = (id, cambio) => {
    const prodsActualizados = updateStockProducto(id, cambio);
    setProductos([...prodsActualizados]);
  };

  const handleChangeOrderStatus = (id, nuevoEstado) => {
    const pedidosActualizados = updateEstadoPedido(id, nuevoEstado);
    setPedidos([...pedidosActualizados]);
  };

  // --- Búsqueda de Tracking ---
  const handleConsultarTracking = () => {
    const cod = codigoTracking.trim().toUpperCase();
    const pedidoEncontrado = pedidos.find((p) => p.id === cod);
    setTrackingResultado(pedidoEncontrado || 'no_encontrado');
  };

  // Productos filtrados por categoría
  const productosFiltrados = categoriaSel === 'todos' 
    ? productos 
    : productos.filter((p) => p.categoria === categoriaSel);

  return (
    <div>
      {/* Navegación */}
      <Navbar 
        cartCount={carrito.length} 
        currentUser={currentUser} 
        onOpenCart={() => {}} 
        onOpenLogin={() => {}} 
      />

      {/* Banner de Estado del Usuario */}
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

      {/* Encabezado / Hero */}
      <header className="bg-primary text-white text-center py-5 hero-section">
        <div className="container">
          <h1 className="display-4 fw-bold">Sonido Vivo</h1>
          <p className="lead">Instrumentos y Equipos Musicales en Viña del Mar</p>
          <a href="#catalogo" className="btn btn-warning btn-lg fw-bold">Ver Catálogo</a>
        </div>
      </header>

      {/* Panel Vendedor (Condicional) */}
      {currentUser?.role === 'Vendedor' && (
        <VendorPanel 
          productos={productos} 
          pedidos={pedidos} 
          onUpdateStock={handleUpdateStock} 
          onChangeOrderStatus={handleChangeOrderStatus} 
        />
      )}

      {/* Catálogo Principal */}
      <main className="container my-5" id="catalogo">
        <h2 className="text-center mb-4">Catálogo de Productos</h2>
        <div className="row mb-4">
          <div className="col-md-6 offset-md-3">
            <select 
              className="form-select" 
              value={categoriaSel} 
              onChange={(e) => setCategoriaSel(e.target.value)}
            >
              <option value="todos">Todas las Categorías</option>
              <option value="Guitarras Acústicas">Guitarras Acústicas</option>
              <option value="Guitarras Eléctricas">Guitarras Eléctricas</option>
              <option value="Bajos Eléctricos">Bajos Eléctricos</option>
              <option value="Baterías">Baterías</option>
              <option value="Teclados y Pianos">Teclados y Pianos</option>
            </select>
          </div>
        </div>

        <div className="row g-4">
          {productosFiltrados.map((prod) => (
            <ProductCard 
              key={prod.id} 
              product={prod} 
              onAddToCart={handleAddToCart} 
            />
          ))}
        </div>
      </main>

      {/* Sección de Seguimiento */}
      <section className="bg-light py-5" id="seguimiento">
        <div className="container">
          <h2 className="text-center mb-3">Consulta el Estado de tu Pedido</h2>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="input-group mb-3">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Ej: SV-1001" 
                  value={codigoTracking} 
                  onChange={(e) => setCodigoTracking(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleConsultarTracking}>Consultar</button>
              </div>

              {trackingResultado && trackingResultado !== 'no_encontrado' && (
                <div className="card border-success mt-3">
                  <div className="card-body">
                    <h5>Pedido {trackingResultado.id}</h5>
                    <p className="mb-1"><strong>Cliente:</strong> {trackingResultado.cliente}</p>
                    <p className="mb-1"><strong>Estado:</strong> <span className="badge bg-primary">{trackingResultado.estado}</span></p>
                  </div>
                </div>
              )}

              {trackingResultado === 'no_encontrado' && (
                <div className="alert alert-danger mt-3">No se encontró el código ingresado.</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}