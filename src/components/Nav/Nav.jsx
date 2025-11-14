import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import "./Nav.css";

export default function Nav() {
  const { totalQuantity } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // controla menú hamburguesa

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">Tienda</Link>

        {/* Botón hamburguesa */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú colapsable */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="menuNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Inicio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cart">
                Carrito {totalQuantity > 0 && `(${totalQuantity})`}
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center mt-2 mt-lg-0">
            {user ? (
              <>
                <span className="me-3 text-light">Hola, {user.username}</span>
                <Link className="btn btn-outline-light btn-sm me-2" to="/admin">Admin</Link>
                <button className="btn btn-sm btn-danger" onClick={handleLogout}>Salir</button>
              </>
            ) : (
              <button className="btn btn-outline-light btn-sm" onClick={() => navigate("/login")}>
                Ingresar
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
