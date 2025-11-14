import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Checkout() {
  const { totalPrice, clearCart } = useCart();

  // Limpiar carrito al entrar a checkout
  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>¡Gracias por tu compra!</h2>
      <p>Total abonado: ${totalPrice}</p>
      <Link to="/" className="btn btn-primary">
        Volver al inicio
      </Link>
    </div>
  );
}
