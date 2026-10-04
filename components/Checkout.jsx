"use client";

import Link from "next/link";
import { useState } from "react";
import { formatPrice, useStore } from "@/components/StoreProvider";

const FREE_SHIPPING_FROM = 150;
const SHIPPING_COST = 9.99;

export default function Checkout() {
  const { loaded, cartItems, subtotal, clearCart } = useStore();
  const [orderNumber, setOrderNumber] = useState(null);

  const shipping = subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  function handleSubmit(e) {
    e.preventDefault();
    setOrderNumber(`GEA-${Math.floor(100000 + Math.random() * 900000)}`);
    clearCart();
    window.scrollTo({ top: 0 });
  }

  if (orderNumber) {
    return (
      <section className="checkout">
        <div className="checkout-done">
          <span className="checkout-check">✓</span>
          <h1>Thank you for your order!</h1>
          <p>
            Your order <strong>{orderNumber}</strong> has been placed. We&apos;ll send a confirmation to your email.
          </p>
          <Link href="/shop" className="btn-hero">Keep Shopping</Link>
        </div>
      </section>
    );
  }

  // Wait for the saved cart so the page doesn't flash "empty" on load
  if (!loaded) {
    return <section className="checkout" aria-busy="true" />;
  }

  if (cartItems.length === 0) {
    return (
      <section className="checkout">
        <div className="checkout-done">
          <h1>Your cart is empty</h1>
          <p>Add some watches to your cart before checking out.</p>
          <Link href="/shop" className="btn-hero">Go to Shop</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout">
      <div className="checkout-container">
        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-grid">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <fieldset>
              <legend>Contact information</legend>
              <div className="form-row">
                <label>
                  Full name
                  <input name="name" required autoComplete="name" />
                </label>
                <label>
                  Email
                  <input name="email" type="email" required autoComplete="email" />
                </label>
              </div>
              <label>
                Phone
                <input name="phone" type="tel" autoComplete="tel" />
              </label>
            </fieldset>

            <fieldset>
              <legend>Shipping address</legend>
              <label>
                Address
                <input name="address" required autoComplete="street-address" />
              </label>
              <div className="form-row">
                <label>
                  City
                  <input name="city" required autoComplete="address-level2" />
                </label>
                <label>
                  State / Province
                  <input name="state" autoComplete="address-level1" />
                </label>
              </div>
              <div className="form-row">
                <label>
                  ZIP / Postal code
                  <input name="zip" required autoComplete="postal-code" />
                </label>
                <label>
                  Country
                  <input name="country" required autoComplete="country-name" />
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend>Payment method</legend>
              <div className="payment-options">
                <label className="payment-option">
                  <input type="radio" name="payment" value="card" defaultChecked />
                  Credit / Debit card
                </label>
                <label className="payment-option">
                  <input type="radio" name="payment" value="paypal" />
                  PayPal
                </label>
              </div>
              <p className="checkout-note">
                Demo store: no real payment is processed yet. Connect a payment provider before going live.
              </p>
            </fieldset>

            <button type="submit" className="btn-add btn-add-lg">
              Place Order · {formatPrice(total)}
            </button>
          </form>

          <aside className="order-summary">
            <h2>Order summary</h2>
            <ul>
              {cartItems.map(({ id, qty, product }) => (
                <li key={id}>
                  <div className="summary-thumb">
                    <img src={product.images[0]} alt={product.name} />
                    <span>{qty}</span>
                  </div>
                  <p>{product.name}</p>
                  <strong>{formatPrice(product.price * qty)}</strong>
                </li>
              ))}
            </ul>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>
            {shipping > 0 && (
              <p className="checkout-note">Free shipping on orders over {formatPrice(FREE_SHIPPING_FROM)}.</p>
            )}
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
