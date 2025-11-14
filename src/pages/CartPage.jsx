import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  return (
    <div>
      <h2 className="mb-4">Carrito</h2>

      {cart.length === 0 ? (
        <div>
          <p>El carrito está vacío.</p>
          <Link to="/" className="btn btn-primary">Seguir comprando</Link>
        </div>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cart.map((it) => (
              <li key={it.id} className="list-group-item d-flex align-items-center">
                <img src={it.image} alt={it.title || it.name} style={{ width:70, height:70, objectFit:"cover", marginRight:12 }} />
                <div className="flex-grow-1">
                  <strong>{it.title || it.name}</strong>
                  <div className="text-muted-small">Precio unitario: ${it.price}</div>
                </div>

                <div style={{ width:140 }} className="text-end">
                  <input type="number" min="1" value={it.quantity || 1} onChange={(e)=> updateQuantity(it.id, Number(e.target.value))}
                         className="form-control form-control-sm mb-2" />
                  <div className="d-flex justify-content-end gap-2">
                    <button className="btn btn-sm btn-outline-danger" onClick={()=>removeFromCart(it.id)}>Eliminar</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="d-flex justify-content-between align-items-center">
            <h4>Total: ${totalPrice}</h4>
            <div>
              <button className="btn btn-outline-secondary me-2" onClick={clearCart}>Vaciar carrito</button>
              <button className="btn btn-success">Finalizar compra</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
