import React from 'react';

export default function CartModal({
  isOpen,
  onClose,
  cart = [],
  cartItems = [],
  items = [],
  onRemove,
  onRemoveFromCart
}) {
  if (!isOpen) return null;

  // Garantiza obtener la lista de productos sin importar la prop que reciba
  const listaCarrito = cart.length ? cart : cartItems.length ? cartItems : items;

  // Llama a la función de eliminación disponible
  const handleRemoveItem = (id) => {
    if (onRemoveFromCart) {
      onRemoveFromCart(id);
    } else if (onRemove) {
      onRemove(id);
    }
  };

  // Cálculo del total
  const total = listaCarrito.reduce(
    (sum, item) => sum + Number(item.precio || 0) * (item.cantidad || 1),
    0
  );

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Carrito de Compras</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            {listaCarrito.length === 0 ? (
              <p className="text-center text-muted my-3">El carrito está vacío.</p>
            ) : (
              <ul className="list-group list-group-flush mb-3">
                {listaCarrito.map((item, index) => {
                  const itemId = item.id || item._id || index;
                  const cantidad = item.cantidad || 1;
                  const precioTotal = Number(item.precio || 0) * cantidad;

                  return (
                    <li
                      key={itemId}
                      className="list-group-item d-flex justify-content-between align-items-center py-3"
                    >
                      <div>
                        <h6 className="mb-0 fw-semibold">{item.nombre}</h6>
                        <small className="text-muted">
                          ${Number(item.precio).toLocaleString('es-CL')} x {cantidad}
                        </small>
                      </div>

                      <div className="d-flex align-items-center gap-3">
                        <span className="fw-bold text-success">
                          ${precioTotal.toLocaleString('es-CL')}
                        </span>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => handleRemoveItem(itemId)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}

            <div className="d-flex justify-content-between align-items-center border-top pt-3 fw-bold fs-5">
              <span>Total:</span>
              <span className="text-success">${total.toLocaleString('es-CL')}</span>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}