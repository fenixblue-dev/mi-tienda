import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]); // items: {id, title/name, price, image, quantity}

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const found = prev.find((p) => String(p.id) === String(product.id));
      if (found) {
        return prev.map((p) =>
          String(p.id) === String(product.id) ? { ...p, quantity: (p.quantity || 1) + quantity } : p
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => String(p.id) !== String(id)));
  };

  const updateQuantity = (id, qty) => {
    setCart((prev) => prev.map(p => String(p.id) === String(id) ? { ...p, quantity: qty } : p));
  };

  const clearCart = () => setCart([]);

  const totalQuantity = cart.reduce((s, it) => s + (it.quantity || 0), 0);
  const totalPrice = cart.reduce((s, it) => s + (it.quantity || 0) * (Number(it.price) || 0), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalQuantity, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
