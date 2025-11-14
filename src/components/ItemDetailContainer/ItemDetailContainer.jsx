import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductByIdApi } from "../../services/productsApi";
import ItemDetail from "../ItemDetail/ItemDetail";

export default function ItemDetailContainer() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const p = await fetchProductByIdApi(id);
      if (mounted) setProduct(p);
      setLoading(false);
    })();
    return () => (mounted = false);
  }, [id]);

  if (loading) return <div className="text-center my-5">Cargando producto...</div>;
  if (!product) return <div className="text-center my-5">Producto no encontrado.</div>;

  return <ItemDetail product={product} />;
}
