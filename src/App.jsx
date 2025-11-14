import Home from "./pages/Home";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout"; // nueva página
import Login from "./pages/Login";
import ProductFormContainer from "./components/Admincomponents/ProductFormContainer/ProductFormContainer";
import { CartProvider } from "./context/CartContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav"; // ajusta la ruta si es diferente
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Nav />
          <main className="container container-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/item/:id" element={<ItemDetailContainer />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<Checkout />} /> {/* NUEVA RUTA */}
              <Route path="/login" element={<Login />} />

              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <ProductFormContainer />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
