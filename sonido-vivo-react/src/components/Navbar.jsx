import React from 'react';

const Navbar = ({ currentUser, setCurrentUser, carritoCount = 0, onOpenCart }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
      <div className="container">
        <a className="navbar-brand fw-bold text-warning" href="#home">
          🎵 Sonido Vivo
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="#catalog">Catálogo</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#nosotros">Nosotros</a>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            <button 
              className="btn btn-outline-warning position-relative"
              onClick={onOpenCart}
            >
              🛒 Carrito
              {carritoCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {carritoCount}
                </span>
              )}
            </button>

            <select
              className="form-select form-select-sm bg-secondary text-white border-0"
              value={currentUser?.role || 'Cliente'}
              onChange={(e) => setCurrentUser({ role: e.target.value })}
            >
              <option value="Cliente">Rol: Cliente</option>
              <option value="Vendedor">Rol: Vendedor</option>
              <option value="Administrador">Rol: Administrador</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;