"use client";

import Link from "next/link";
import { useState } from "react";
import { formatPrice, useStore } from "@/components/StoreProvider";
import WishlistButton from "@/components/WishlistButton";

export default function ProductDetail({ product }) {
  const { addToCart } = useStore();
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);

  return (
    <section className="detail">
      <div className="detail-container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/shop">Shop</Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </nav>

        <div className="detail-grid">
          <div className="gallery">
            <div className="gallery-main">
              <img src={product.images[activeImage].replace("w=800", "w=1200")} alt={product.name} />
            </div>
            <div className="gallery-thumbs">
              {product.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  className={`thumb${i === activeImage ? " is-active" : ""}`}
                  onClick={() => setActiveImage(i)}
                  aria-label={`Show image ${i + 1}`}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          </div>

          <div className="detail-info">
            <span className="product-category">{product.category}</span>
            <h1>{product.name}</h1>

            <div className="detail-rating">
              <span className="stars" aria-hidden="true">
                {"★".repeat(Math.round(product.rating))}
                {"☆".repeat(5 - Math.round(product.rating))}
              </span>
              <span>
                {product.rating} · {product.reviews} reviews
              </span>
            </div>

            <p className="detail-price">{formatPrice(product.price)}</p>
            <p className="detail-description">{product.description}</p>

            <h2>Features</h2>
            <ul className="plan-features detail-features">
              {product.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>

            <div className="detail-buy">
              <div className="qty-stepper">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
                <span>{qty}</span>
                <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">+</button>
              </div>
              <button type="button" className="btn-add btn-add-lg" onClick={() => addToCart(product.id, qty)}>
                Add to Cart · {formatPrice(product.price * qty)}
              </button>
            </div>

            <WishlistButton id={product.id} withLabel />
          </div>
        </div>
      </div>
    </section>
  );
}
