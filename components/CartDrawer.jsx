"use client";

import Link from "next/link";
import { useEffect } from "react";
import { formatPrice, useStore } from "@/components/StoreProvider";

export default function CartDrawer() {
  const { cartItems, cartCount, subtotal, isCartOpen, closeCart, updateQty, removeFromCart } = useStore();

  // Close on Escape and stop the page behind from scrolling while open
  useEffect(() => {
    if (!isCartOpen) return;
    const onKey = (e) => e.key === "Escape" && closeCart();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isCartOpen, closeCart]);

  return (
    <>
      <div className={`cart-overlay${isCartOpen ? " is-open" : ""}`} onClick={closeCart} />

      <aside className={`cart-drawer${isCartOpen ? " is-open" : ""}`} aria-hidden={!isCartOpen} aria-label="Shopping cart">
        <div className="cart-drawer-header">
          <h2>Your Cart ({cartCount})</h2>
          <button type="button" className="icon-btn" onClick={closeCart} aria-label="Close cart">
            ✕
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
            <Link href="/shop" className="btn-hero" onClick={closeCart}>
              Go to Shop
            </Link>
          </div>
        ) : (
          <>
            <ul className="cart-items">
              {cartItems.map(({ id, qty, product }) => (
                <li key={id} className="cart-item">
                  <img src={product.images[0]} alt={product.name} />
                  <div className="cart-item-info">
                    <Link href={`/shop/${product.slug}`} onClick={closeCart} className="cart-item-name">
                      {product.name}
                    </Link>
                    <p className="cart-item-price">{formatPrice(product.price)}</p>
                    <div className="qty-stepper qty-stepper-sm">
                      <button type="button" onClick={() => updateQty(id, qty - 1)} aria-label="Decrease quantity">−</button>
                      <span>{qty}</span>
                      <button type="button" onClick={() => updateQty(id, qty + 1)} aria-label="Increase quantity">+</button>
                    </div>
                  </div>
                  <div className="cart-item-side">
                    <p>{formatPrice(product.price * qty)}</p>
                    <button type="button" className="link-btn" onClick={() => removeFromCart(id)}>
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-drawer-footer">
              <div className="cart-subtotal">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <p className="cart-note">Shipping calculated at checkout.</p>
              <Link href="/checkout" className="btn-checkout cart-checkout" onClick={closeCart}>
                Checkout
              </Link>
              <button type="button" className="link-btn cart-continue" onClick={closeCart}>
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
