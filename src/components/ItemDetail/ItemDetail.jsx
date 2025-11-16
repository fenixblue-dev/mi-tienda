import { useState } from "react";
import { useCart } from "../../context/CartContext";
import "./ItemDetail.css";

export default function ItemDetail({ product }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  // Estas propiedades SI existen en tu API
  const title = product.title;
  const img = product.image; 
  const price = Number(product.price) || 0;

  return (
    <div className="card p-3">
      <div className="row g-3">
        <div className="col-md-5">
          <img src={img} alt={title} className="img-fluid" style={{ borderRadius: 8 }} />
        </div>
        <div className="col-md-7">
          <h3>{title}</h3>

          <p>{product.description || "Sin descripción"}</p>

          <h4 className="text-success">${price}</h4>

          <div className="d-flex align-items-center gap-3 mt-3">
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="form-control"
              style={{ maxWidth: 120 }}
            />

            <button
              className="btn btn-primary"
              onClick={() =>
                addToCart(
                  {
                    id: product.id,
                    title,
                    price,
                    image: img,
                    description: product.description,
                  },
                  qty
                )
              }
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
