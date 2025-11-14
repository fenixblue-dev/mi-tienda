import { Link } from "react-router-dom";
import "./Item.css";

export default function Item({ product }) {
  // DummyJSON fields: title, price, images[], description
  const title = product.title || product.name || product.title;
  const price = product.price ?? product.price;
  const img = (product.images && product.images[0]) || product.image || "/images/default.png";

  return (
    <div className="card">
      <img src={img} alt={title} style={{ width: "100%", height: 200 }} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="text-muted-small mb-2">{product.brand || product.category || ""}</p>
        <div className="d-flex justify-content-between align-items-center">
          <strong className="text-success">${price}</strong>
          <Link className="btn btn-primary btn-sm" to={`/item/${product.id}`}>Ver</Link>
        </div>
      </div>
    </div>
  );
}
