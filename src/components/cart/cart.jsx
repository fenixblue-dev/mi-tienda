import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";

const Cart = () => {
  const { cart, removeItem, clearCart } = useContext(CartContext);

  if (cart.length === 0) {
    return <div className="cart-empty">Tu carrito está vacío</div>;
  }

  return (
    <div className="cart-container">
      <h2>Mi Carrito</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <span>{item.name}</span>
            <span>${item.price}</span>
            <button onClick={() => removeItem(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <div className="cart-actions">
        <button onClick={clearCart}>Vaciar Carrito</button>
        <span>Total: ${cart.reduce((acc, item) => acc + item.price, 0)}</span>
      </div>
    </div>
  );
};

export default Cart;
