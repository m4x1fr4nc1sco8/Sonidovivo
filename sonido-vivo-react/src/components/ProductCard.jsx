import React from 'react';

export function ProductCard({ product, onAddToCart }) {
  if (!product) return null;

  const { nombre, precio, categoria, stock } = product;
  
  // Soporta cualquier nombre de propiedad que traiga la imagen desde db.js
  const imgSrc = product.imagen || product.img || product.image || 'https://via.placeholder.com/200';

  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="text-center p-3 bg-white" style={{ height: '200px' }}>
        <img
          src={imgSrc}
          className="img-fluid h-100"
          alt={nombre}
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="card-body d-flex flex-column bg-light">
        <div className="mb-2">
          <span className="badge bg-secondary">{categoria}</span>
        </div>
        <h5 className="card-title fw-bold text-dark">{nombre}</h5>
        
        <p className="card-text fs-4 fw-bold text-success my-2">
          ${Number(precio).toLocaleString('es-CL')}
        </p>
        
        <p className="card-text text-muted small mb-3">
          Stock disponible: <strong>{stock}</strong> un.
        </p>

        <button
          className="btn btn-primary mt-auto w-100 fw-semibold py-2"
          onClick={() => onAddToCart(product)}
          disabled={stock <= 0}
        >
          {stock > 0 ? 'Agregar al carrito' : 'Sin Stock'}
        </button>
      </div>
    </div>
  );
}