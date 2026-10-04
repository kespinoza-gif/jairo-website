"use client";

import { useStore } from "@/components/StoreProvider";

export default function WishlistButton({ id, withLabel = false }) {
  const { isWishlisted, toggleWishlist } = useStore();
  const active = isWishlisted(id);

  return (
    <button
      type="button"
      className={`wishlist-btn${active ? " is-active" : ""}${withLabel ? " with-label" : ""}`}
      aria-pressed={active}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleWishlist(id);
      }}
    >
      <svg viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      {withLabel && <span>{active ? "In Wishlist" : "Add to Wishlist"}</span>}
    </button>
  );
}
