// src/views/VendorPanel.jsx
import React from 'react';

export const VendorPanel = ({ productos, pedidos, onUpdateStock, onChangeOrderStatus }) => {
  return (
    <section className="container my-5" id="panel-vendedor">
      <h2 className="text-center mb-4">Panel del Vendedor</h2>

      {/* Gestión de Stock */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-dark text-white fw-bold">Gestión de Stock de Productos</div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock Actual</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {productos.map(p => (
                  <tr key={p.id}>
                    <td>{p.nombre}</td>
                    <td>{p.categoria}</td>
                    <td>${p.precio.toLocaleString('es-CL')}</td>
                    <td>
                      <span className={`badge ${p.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                        {p.stock} un.
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-1" onClick={() => onUpdateStock(p.id, 1)}>+1</button>
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => onUpdateStock(p.id, -1)}>-1</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Gestión de Pedidos */}
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white fw-bold">Pedidos por Aprobar y Despachar</div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Cliente</th>
                  <th>Transporte</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map(p => (
                  <tr key={p.id}>
                    <td><strong>{p.id}</strong></td>
                    <td>{p.cliente}</td>
                    <td>{p.transporte}</td>
                    <td>${p.total.toLocaleString('es-CL')}</td>
                    <td><span className="badge bg-info text-dark">{p.estado}</span></td>
                    <td>
                      <button className="btn btn-sm btn-success me-1" onClick={() => onChangeOrderStatus(p.id, 'Despachado')}>Despachar</button>
                      <button className="btn btn-sm btn-primary" onClick={() => onChangeOrderStatus(p.id, 'Entregado')}>Entregar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VendorPanel;