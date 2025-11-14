import { useEffect, useState } from "react";
import ItemList from "../ItemList/ItemList";
import { fetchProductsCombined } from "../../services/productsApi";

export default function ItemListContainer() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const prods = await fetchProductsCombined();
      if (mounted) setProducts(prods);
      setLoading(false);
    })();
    return () => mounted = false;
  }, []);

  if (loading) return <div className="text-center my-5">Cargando productos...</div>;

  return (
    <section>
      <h2 className="mb-4">Productos</h2>
      <div className="product-grid">
        <ItemList products={products} />
      </div>
    </section>
  );
}
