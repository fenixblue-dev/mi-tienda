import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { Modal, Button } from "react-bootstrap";
import "./Cart.css";

export default function Cart() {
  const { cart, removeFromCart, clearCart, updateQuantity, totalPrice } = useCart();
  const [showModal, setShowModal] = useState(false);

  const handleCheckout = () => {
    if (cart.length === 0) return alert("Tu carrito está vacío");
    setShowModal(true);
  };

  const confirmCheckout = () => {
    clearCart();
    setShowModal(false);
    alert("¡Compra realizada con éxito!");
  };

  if (cart.length === 0) return <div className="cart-empty">Tu carrito está vacío</div>;

  return (
    <div className="cart-container">
      <h2>Mi Carrito</h2>
      <ul>
        {cart.map((item) => (
          <li
            key={item.id}
            className="cart-item d-flex align-items-center justify-content-between mb-2"
          >
            <span>{item.title || item.name}</span>
            <span>${item.price}</span>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
              style={{ width: "60px", marginRight: "10px" }}
            />
            <button
              className="btn btn-sm btn-danger"
              onClick={() => removeFromCart(item.id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <div className="cart-actions mt-3">
        <span>Total: ${totalPrice}</span>
        <Button variant="success" onClick={handleCheckout} className="ms-2">
          Finalizar Compra
        </Button>
        <Button variant="danger" onClick={clearCart} className="ms-2">
          Vaciar Carrito
        </Button>
      </div>

      {/* Modal de confirmación */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Compra</Modal.Title>
