// Servicio principal: DummyJSON
const API_URL = "https://dummyjson.com/products";

// obtiene lista desde DummyJSON (default 30)
export async function fetchProductsFromApi() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    return Array.isArray(data.products) ? data.products : data;
  } catch (err) {
    console.error("fetchProductsFromApi:", err);
    return [];
  }
}

// obtiene producto por id desde API
export async function fetchProductByIdApi(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("fetchProductByIdApi:", err);
    return null;
  }
}

// intenta crear producto en la API; si falla guarda en localStorage
export async function createProductApiOrLocal(product) {
  try {
    // DummyJSON might accept POST to /products/add on some setups; try POST to /products/add first, fallback to /products
    const tryUrls = [`${API_URL}/add`, API_URL];
    for (const url of tryUrls) {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        });
        if (res.ok) {
          const created = await res.json();
          return { ok: true, created };
        }
      } catch (e) {
        // continue to next url
      }
    }
    throw new Error("API no aceptó POST");
  } catch (err) {
    // fallback: guardamos en localStorage
    const key = "products_local";
    const stored = JSON.parse(localStorage.getItem(key) || "[]");
    const id = Date.now();
    const storedProduct = { ...product, id };
    stored.unshift(storedProduct);
    localStorage.setItem(key, JSON.stringify(stored));
    console.warn("Se guardó producto en localStorage (fallback).");
    return { ok: false, created: storedProduct };
  }
}

// devuelve productos combinando localStorage (creados por admin) + API
export async function fetchProductsCombined() {
  const api = await fetchProductsFromApi();
  const local = JSON.parse(localStorage.getItem("products_local") || "[]");
  // si API devuelve items con id numérico, ensure no id collision: put local first
  return [...local, ...api];
}
