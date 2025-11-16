import { useState } from "react";
import { createProduct } from "../../../services/productsApi.js";
import { useNavigate } from "react-router-dom";

export default function ProductFormContainer() {
  const [form, setForm] = useState({ title: "", price: "", description: "", image: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const payload = {
      title: form.title || "Producto",
      price: Number(form.price) || 0,
      description: form.description || "",
      images: form.image ? [form.image] : []
    };
    
    try {
      const result = await createProduct(payload);
      setLoading(false);
      
      if (result) {
        alert("Producto creado exitosamente");
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      alert("Error al crear el producto");
      console.error(error);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 700 }}>
      <h2>Alta de producto</h2>
      <form onSubmit={handleSubmit}>
        <input 
          name="title" 
          value={form.title} 
          onChange={handleChange} 
          className="form-control mb-2" 
          placeholder="Título" 
        />
        <input 
          name="price" 
          value={form.price} 
          onChange={handleChange} 
          className="form-control mb-2" 
          placeholder="Precio" 
          type="number"
        />
        <input 
          name="image" 
          value={form.image} 
          onChange={handleChange} 
          className="form-control mb-2" 
          placeholder="URL imagen (opcional)" 
        />
        <textarea 
          name="description" 
          value={form.description} 
          onChange={handleChange} 
          className="form-control mb-2" 
          placeholder="Descripción" 
          rows="3" 
        />
        <button className="btn btn-success" disabled={loading}>
          {loading ? "Guardando..." : "Crear producto"}
        </button>
      </form>
    </div>
  );
}