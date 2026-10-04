"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct } from "@/lib/products";

const StoreContext = createContext(null);
const STORAGE_KEY = "gabo-store";

export function StoreProvider({ children }) {
  // cart: [{ id, qty }], wishlist: [id]
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Restore saved cart and wishlist after the first render
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      if (Array.isArray(saved.cart)) setCart(saved.cart.filter((item) => getProduct(item.id)));
      if (Array.isArray(saved.wishlist)) setWishlist(saved.wishlist.filter((id) => getProduct(id)));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart, wishlist }));
    } catch {}
  }, [cart, wishlist, loaded]);

  const addToCart = useCallback((id, qty = 1) => {
    setCart((items) => {
      const existing = items.find((item) => item.id === id);
      if (existing) {
        return items.map((item) => (item.id === id ? { ...item, qty: item.qty + qty } : item));
      }
      return [...items, { id, qty }];
    });
    setCartOpen(true);
  }, []);

  const updateQty = useCallback((id, qty) => {
    setCart((items) =>
      qty <= 0 ? items.filter((item) => item.id !== id) : items.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((items) => items.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((id) => {
    setWishlist((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));
  }, []);

  const value = useMemo(() => {
    const cartItems = cart
      .map((item) => ({ ...item, product: getProduct(item.id) }))
      .filter((item) => item.product);

    return {
      loaded,
      cartItems,
      cartCount: cartItems.reduce((sum, item) => sum + item.qty, 0),
      subtotal: cartItems.reduce((sum, item) => sum + item.qty * item.product.price, 0),
      wishlist,
      isCartOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      toggleWishlist,
      isWishlisted: (id) => wishlist.includes(id),
    };
  }, [loaded, cart, wishlist, isCartOpen, addToCart, updateQty, removeFromCart, clearCart, toggleWishlist]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  return useContext(StoreContext);
}

export function formatPrice(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}
