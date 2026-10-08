import React from 'react';

export const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="col-md-4 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm border-0">
        <img
          src={product.img || 'https://via.placeholder.com/300x200?text=Sin+Imagen'}
          className="card-img-top p-3"
          alt={product.nombre}
          style={{ height: '200px', objectFit: 'contain' }}
        />
        <div className="card-body d-flex flex-column">
          <span className="badge bg-secondary mb-2 align-self-start">{product.categoria}</span>
          <h5 className="card-title text-truncate">{product.nombre}</h5>
          <p className="card-text fw-bold text-success fs-5">
            ${product.precio?.toLocaleString('es-CL')}
          </p>
          <div className="mt-auto">
            <p className={`small mb-2 ${product.stock > 0 ? 'text-muted' : 'text-danger fw-bold'}`}>
              {product.stock > 0 ? `Stock: ${product.stock} un.` : 'Agotado'}
            </p>
            <button
              className="btn btn-primary w-100"
              onClick={() => onAddToCart(product)}
              disabled={product.stock <= 0}
            >
              {product.stock > 0 ? 'Agregar al carrito' : 'Sin Stock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};