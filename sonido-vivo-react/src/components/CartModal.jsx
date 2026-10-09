import React, { useState } from 'react';

export default function CartModal({
  isOpen,
  onClose,
  cart = [],
  cartItems = [],
  items = [],
  onRemove,
  onRemoveFromCart,
  onAddToCart,
  onDecreaseQuantity,
  onCheckoutSuccess
}) {
  if (!isOpen) return null;

  const listaCarrito = cart.length ? cart : cartItems.length ? cartItems : items;

  // Estados para el proceso de compra
  const [paso, setPaso] = useState('carrito'); // 'carrito' | 'checkout' | 'exito'
  const [formData, setFormData] = useState({
    rut: '',
    nombre: '',
    email: '',
    direccion: '',
    metodoPago: 'debito'
  });
  const [errorRut, setErrorRut] = useState('');
  const [pedidoConfirmado, setPedidoConfirmado] = useState(null);

  const handleRemoveItem = (id) => {
    if (onRemoveFromCart) onRemoveFromCart(id);
    else if (onRemove) onRemove(id);
  };

  const total = listaCarrito.reduce(
    (sum, item) => sum + Number(item.precio || 0) * (item.cantidad || 1),
    0
  );

  // Formateador dinámico de RUT Chileno
  const handleRutChange = (e) => {
    let valor = e.target.value.replace(/[^0-9kK]/g, '').toUpperCase();
    if (valor.length > 9) valor = valor.slice(0, 9);

    if (valor.length > 1) {
      const cuerpo = valor.slice(0, -1);
      const dv = valor.slice(-1);
      const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      valor = `${cuerpoFormateado}-${dv}`;
    }
    setFormData({ ...formData, rut: valor });
    setErrorRut('');
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProcesarPago = (e) => {
    e.preventDefault();

    // Validar RUT básico (ejemplo: 12.345.678-9 o 12345678-9)
    const rutLimpio = formData.rut.replace(/\./g, '');
    if (!/^\d{7,8}-[0-9Kk]$/.test(rutLimpio)) {
      setErrorRut('Ingresa un RUT válido (ej: 12.345.678-K)');
      return;
    }

    const nuevoPedido = {
      id: `SV-${Math.floor(100000 + Math.random() * 900000)}`,
      cliente: formData.nombre,
      rut: formData.rut,
      email: formData.email,
      direccion: formData.direccion,
      metodoPago: formData.metodoPago,
      items: listaCarrito,
      total: total,
      estado: 'Pendiente',
      fecha: new Date().toLocaleDateString('es-CL')
    };

    setPedidoConfirmado(nuevoPedido);
    if (onCheckoutSuccess) {
      onCheckoutSuccess(nuevoPedido);
    }
    setPaso('exito');
  };

  const handleCerrarTodo = () => {
    setPaso('carrito');
    setFormData({ rut: '', nombre: '', email: '', direccion: '', metodoPago: 'debito' });
    setPedidoConfirmado(null);
    onClose();
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title fw-bold">
              {paso === 'carrito' && '🛒 Carrito de Compras'}
              {paso === 'checkout' && '💳 Finalizar Compra'}
              {paso === 'exito' && '🎉 ¡Compra Confirmada!'}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={handleCerrarTodo}
            ></button>
          </div>

          <div className="modal-body p-4">
            {/* VISTA 1: CARRITO */}
            {paso === 'carrito' && (
              <>
                {listaCarrito.length === 0 ? (
                  <div className="text-center py-5">
                    <p className="text-muted fs-5">El carrito está vacío.</p>
                  </div>
                ) : (
                  <>
                    <div className="table-responsive">
                      <table className="table align-middle">
                        <thead className="table-light">
                          <tr>
                            <th>Producto</th>
                            <th className="text-center">Cantidad</th>
                            <th className="text-end">Subtotal</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {listaCarrito.map((item, index) => {
                            const itemId = item.id || item._id || index;
                            const cantidad = item.cantidad || 1;
                            const subtotal = Number(item.precio || 0) * cantidad;

                            return (
                              <tr key={itemId}>
                                <td>
                                  <div className="fw-semibold">{item.nombre}</div>
                                  <small className="text-muted">
                                    ${Number(item.precio).toLocaleString('es-CL')} c/u
                                  </small>
                                </td>
                                <td>
                                  <div className="d-flex justify-content-center align-items-center gap-2">
                                    <button
                                      className="btn btn-sm btn-outline-secondary"
                                      onClick={() => onDecreaseQuantity && onDecreaseQuantity(itemId)}
                                    >
                                      -
                                    </button>
                                    <span className="fw-bold px-2">{cantidad}</span>
                                    <button
                                      className="btn btn-sm btn-outline-secondary"
                                      onClick={() => onAddToCart && onAddToCart(item)}
                                    >
                                      +
                                    </button>
                                  </div>
                                </td>
                                <td className="text-end fw-bold text-success">
                                  ${subtotal.toLocaleString('es-CL')}
                                </td>
                                <td className="text-end">
                                  <button
                                    type="button"
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => handleRemoveItem(itemId)}
                                  >
                                    🗑️
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    <div className="d-flex justify-content-between align-items-center border-top pt-3 mt-3 fs-5">
                      <span className="fw-bold">Total a Pagar:</span>
                      <span className="fw-bold text-success fs-4">
                        ${total.toLocaleString('es-CL')}
                      </span>
                    </div>
                  </>
                )}
              </>
            )}

            {/* VISTA 2: CHECKOUT */}
            {paso === 'checkout' && (
              <form onSubmit={handleProcesarPago}>
                <h6 className="fw-bold mb-3 border-bottom pb-2">Datos del Comprador</h6>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">RUT</label>
                    <input
                      type="text"
                      className={`form-control ${errorRut ? 'is-invalid' : ''}`}
                      placeholder="12.345.678-K"
                      value={formData.rut}
                      onChange={handleRutChange}
                      required
                    />
                    {errorRut && <div className="invalid-feedback">{errorRut}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Nombre Completo</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nombre"
                      placeholder="Juan Pérez"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Correo Electrónico</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="juan@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Dirección de Despacho</label>
                    <input
                      type="text"
                      className="form-control"
                      name="direccion"
                      placeholder="Av. Libertad 1234, Viña del Mar"
                      value={formData.direccion}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <h6 className="fw-bold mt-4 mb-2 border-bottom pb-2">Método de Pago</h6>
                  <div className="col-12">
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="metodoPago"
                        id="pagoDebito"
                        value="debito"
                        checked={formData.metodoPago === 'debito'}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="pagoDebito">
                        💳 Tarjeta de Débito / Crédito (Webpay)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="metodoPago"
                        id="pagoTransferencia"
                        value="transferencia"
                        checked={formData.metodoPago === 'transferencia'}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="pagoTransferencia">
                        🏦 Transferencia Bancaria Directa
                      </label>
                    </div>
                  </div>
                </div>

                <div className="alert alert-secondary mt-3 mb-0 d-flex justify-content-between align-items-center">
                  <span>Total final:</span>
                  <strong className="text-success fs-5">${total.toLocaleString('es-CL')}</strong>
                </div>

                <div className="d-flex justify-content-between mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setPaso('carrito')}
                  >
                    Volver al Carrito
                  </button>
                  <button type="submit" className="btn btn-success fw-bold px-4">
                    Confirmar y Pagar
                  </button>
                </div>
              </form>
            )}

            {/* VISTA 3: CONFIRMACIÓN / ÉXITO */}
            {paso === 'exito' && pedidoConfirmado && (
              <div className="text-center py-3">
                <div className="mb-3 text-success fs-1">✅</div>
                <h4 className="fw-bold text-success mb-2">¡Gracias por tu compra!</h4>
                <p className="text-muted">Hemos procesado tu pedido correctamente.</p>

                <div className="bg-light p-3 rounded text-start my-3">
                  <p className="mb-1"><strong>Código de Seguimiento:</strong> <span className="badge bg-primary fs-6">{pedidoConfirmado.id}</span></p>
                  <p className="mb-1"><strong>Cliente:</strong> {pedidoConfirmado.cliente} ({pedidoConfirmado.rut})</p>
                  <p className="mb-1"><strong>Dirección:</strong> {pedidoConfirmado.direccion}</p>
                  <p className="mb-0"><strong>Total Pagado:</strong> ${pedidoConfirmado.total.toLocaleString('es-CL')}</p>
                </div>

                <p className="small text-muted">Usa el código de seguimiento en la sección de tracking para ver el estado de tu orden.</p>
              </div>
            )}
          </div>

          {/* FOOTER GENERAL */}
          <div className="modal-footer">
            {paso === 'carrito' && (
              <>
                <button type="button" className="btn btn-secondary" onClick={handleCerrarTodo}>
                  Cerrar
                </button>
                {listaCarrito.length > 0 && (
                  <button
                    type="button"
                    className="btn btn-primary fw-bold"
                    onClick={() => setPaso('checkout')}
                  >
                    Ir a Pagar
                  </button>
                )}
              </>
            )}

            {paso === 'exito' && (
              <button type="button" className="btn btn-success fw-bold px-4" onClick={handleCerrarTodo}>
                Aceptar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}