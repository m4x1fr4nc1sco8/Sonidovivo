import React, { useState } from 'react';

export function AdminPanel({
  productos,
  pedidos,
  onUpdateStock,
  onChangeOrderStatus,
  onAddProduct,
  onDeleteProduct
}) {
  const [nuevoProd, setNuevoProd] = useState({
    nombre: '',
    precio: '',
    stock: '',
    categoria: 'Guitarras'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nuevoProd.nombre || !nuevoProd.precio || !nuevoProd.stock) return;

    if (onAddProduct) {
      onAddProduct({
        ...nuevoProd,
        id: Date.now(),
        precio: Number(nuevoProd.precio),
        stock: Number(nuevoProd.stock)
      });
    }
    setNuevoProd({ nombre: '', precio: '', stock: '', categoria: 'Guitarras' });
  };

  return (
    <div className="container my-4 p-4 bg-light rounded shadow-sm">
      <h3 className="fw-bold text-dark border-bottom pb-2 mb-4">👑 Panel de Administración</h3>

      <div className="row g-4">
        {/* Formulario Agregar Producto */}
        <div className="col-md-5">
          <div className="card border-0 shadow-sm p-3">
            <h5 className="fw-bold mb-3">Agregar Nuevo Producto</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="form-label small fw-semibold">Nombre</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={nuevoProd.nombre}
                  onChange={(e) => setNuevoProd({ ...nuevoProd, nombre: e.target.value })}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="form-label small fw-semibold">Categoría</label>
                <select
                  className="form-select form-select-sm"
                  value={nuevoProd.categoria}
                  onChange={(e) => setNuevoProd({ ...nuevoProd, categoria: e.target.value })}
                >
                  <option value="Guitarras">Guitarras</option>
                  <option value="Baterías">Baterías</option>
                  <option value="Teclados">Teclados</option>
                </select>
              </div>
              <div className="row g-2 mb-3">
                <div className="col-6">
                  <label className="form-label small fw-semibold">Precio ($)</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={nuevoProd.precio}
                    onChange={(e) => setNuevoProd({ ...nuevoProd, precio: e.target.value })}
                    required
                  />
                </div>
                <div className="col-6">
                  <label className="form-label small fw-semibold">Stock Inicial</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={nuevoProd.stock}
                    onChange={(e) => setNuevoProd({ ...nuevoProd, stock: e.target.value })}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-success btn-sm w-100 fw-bold">
                + Crear Producto
              </button>
            </form>
          </div>
        </div>

        {/* Resumen de Inventario y Gestión */}
        <div className="col-md-7">
          <div className="card border-0 shadow-sm p-3">
            <h5 className="fw-bold mb-3">Gestión de Stock</h5>
            <div className="table-responsive" style={{ maxHeight: '300px' }}>
              <table className="table table-sm align-middle">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Stock</th>
                    <th className="text-center">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((prod) => (
                    <tr key={prod.id}>
                      <td>{prod.nombre}</td>
                      <td>
                        <span className={`badge ${prod.stock > 0 ? 'bg-info' : 'bg-danger'}`}>
                          {prod.stock} un.
                        </span>
                      </td>
                      <td>
                        <div className="d-flex justify-content-center gap-1">
                          <button
                            className="btn btn-outline-primary btn-sm py-0 px-2"
                            onClick={() => onUpdateStock(prod.id, prod.stock + 5)}
                            title="Añadir 5 unidades de stock"
                          >
                            +5 Stock
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm py-0 px-2"
                            onClick={() => onDeleteProduct && onDeleteProduct(prod.id)}
                            title="Eliminar producto"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}