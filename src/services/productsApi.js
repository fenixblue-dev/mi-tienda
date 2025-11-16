// src/services/productsApi.js

const API_URL = "https://68ef4694b06cc802829cbcfc.mockapi.io/api/v1/Product";

export async function fetchProducts() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al obtener los productos");
    return await res.json();
  } catch (error) {
    console.error("Error en fetchProducts:", error);
    throw error;
  }
}

export async function fetchProductById(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Error al obtener el producto");
    return await res.json();
  } catch (error) {
    console.error("Error en fetchProductById:", error);
    throw error;
  }
}

export async function createProduct(product) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (!res.ok) throw new Error("Error al crear el producto");

    return await res.json();
  } catch (error) {
    console.error("Error en createProduct:", error);
    throw error;
  }
}
