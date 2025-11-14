import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

export default function Cart() {
  const { cart, removeFromCart, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }
    navigate("/checkout"); // redirige a la página de confirmación
  };

  if (cart.length === 0) {
    return <div className="cart-empty">Tu carrito está vacío</div>;
  }

  return (
    <div className="cart-container">
      <h2>Mi Carrito</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <span>{item.title || item.name}</span>
            <span>${item.price}</span>
            <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <div className="cart-actions">
        <span>Total: ${totalPrice}</span>
        <button className="btn btn-success" onClick={handleCheckout}>
          Finalizar Compra
        </button>
        <button className="btn btn-danger" onClick={clearCart}>
          Vaciar Carrito
        </button>
      </div>
    </div>
  );
}
