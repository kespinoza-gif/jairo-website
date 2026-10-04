"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatPrice, useStore } from "@/components/StoreProvider";
import WishlistButton from "@/components/WishlistButton";

export default function ProductCard({ product }) {
  const router = useRouter();
  const { addToCart } = useStore();
  const href = `/shop/${product.slug}`;

  return (
    <article
      className="product-card"
      role="link"
      tabIndex={0}
      onClick={() => router.push(href)}
      onKeyDown={(e) => {
        // Ignore Enter on the buttons inside the card
        if (e.key === "Enter" && e.target === e.currentTarget) router.push(href);
      }}
    >
      <div className="product-image">
        <img src={product.images[0]} alt={product.name} loading="lazy" />
        <WishlistButton id={product.id} />
      </div>

      <div className="product-body">
        <span className="product-category">{product.category}</span>
        <h3>{product.name}</h3>
        <p className="product-description">{product.shortDescription}</p>
        <p className="product-price">{formatPrice(product.price)}</p>

        <div className="product-actions">
          <button
            type="button"
            className="btn-add"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product.id);
            }}
          >
            Add to Cart
          </button>
          <Link href={href} className="btn-details" onClick={(e) => e.stopPropagation()}>
            More Details
          </Link>
        </div>
      </div>
    </article>
  );
}
