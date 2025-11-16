import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { fetchProducts } from "../../services/productsApi.js";

export default function ItemListContainer() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✔ carrito real
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts()
      .then(data => {
        console.log("Datos recibidos:", data);
        if (Array.isArray(data)) setProducts(data);
        else setProducts([]);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container mt-4">Cargando productos...</div>;
  if (error) return <div className="container mt-4 alert alert-danger">Error: {error}</div>;
  if (products.length === 0) return <div className="container mt-4">No hay productos</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Nuestros Productos</h2>
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100">

              <img 
                src={product.image || "https://via.placeholder.com/300x250?text=Sin+Imagen"} 
                className="card-img-top" 
                alt={product.title}
                style={{ height: "250px", objectFit: "cover" }}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x250?text=Error+al+cargar";
                }}
              />

              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text text-muted">{product.Description}</p>
                <p className="card-text text-secondary small">{product.Stock}</p>

                <p className="card-text fw-bold fs-4 text-success">
                  ${product.Prince}
                </p>

                <button
                  className="btn btn-primary mt-auto"
                  onClick={() =>
                    addToCart(
                      {
                        id: product.id,
                        title: product.title,
                        price: product.Prince,
                        image: product.image
                      },
                      1
                    )
                  }
                >
                  Agregar al carrito
                </button>

              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
