import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) return alert("Tu carrito está vacío");
    navigate("/checkout");
  };

  if (cart.length === 0) return <div className="cart-empty">Tu carrito está vacío</div>;

  return (
    <div className="cart-container">
      <h2>Mi Carrito</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <span>{item.title || item.name}</span>
            <span>${item.price}</span>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
              style={{ width: "60px", marginRight: "10px" }}
            />
            <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <div className="cart-actions">
        <span>Total: ${totalPrice}</span>
        <button className="btn btn-success" onClick={handleCheckout}>Finalizar Compra</button>
        <button className="btn btn-danger" onClick={clearCart}>Vaciar Carrito</button>
      </div>
    </div>
  );
}
