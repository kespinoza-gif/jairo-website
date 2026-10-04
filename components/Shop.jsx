"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { categories, products } from "@/lib/products";
import { useStore } from "@/components/StoreProvider";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";

const PER_PAGE = 8;

const priceRanges = [
  { value: "all", label: "Any price" },
  { value: "0-150", label: "Under $150" },
  { value: "150-300", label: "$150 – $300" },
  { value: "300-500", label: "$300 – $500" },
  { value: "500-99999", label: "Over $500" },
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "name", label: "Name: A to Z" },
];

export default function Shop({ initialWishlistOnly = false, initialPage = 1 }) {
  const { loaded, wishlist } = useStore();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState("all");
  const [sort, setSort] = useState("featured");
  const [wishlistOnly, setWishlistOnly] = useState(initialWishlistOnly);
  const [page, setPage] = useState(initialPage);
  const gridTopRef = useRef(null);

  // Any filter change starts again from the first page
  const resetting = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const [min, max] = price === "all" ? [0, Infinity] : price.split("-").map(Number);

    const list = products.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        p.price >= min &&
        p.price < max &&
        (!wishlistOnly || wishlist.includes(p.id)) &&
        (!q || `${p.name} ${p.category} ${p.shortDescription}`.toLowerCase().includes(q))
    );

    const sorters = {
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      rating: (a, b) => b.rating - a.rating,
      name: (a, b) => a.name.localeCompare(b.name),
    };
    return sorters[sort] ? [...list].sort(sorters[sort]) : list;
  }, [query, category, price, sort, wishlistOnly, wishlist]);

  const totalPages = Math.max(1, Math.ceil(visible.length / PER_PAGE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const firstIndex = (currentPage - 1) * PER_PAGE;
  const pageItems = visible.slice(firstIndex, firstIndex + PER_PAGE);

  // Keep ?page= in the address bar so Back from a product returns to the same page
  useEffect(() => {
    // Until the saved wishlist loads, the page count can be wrong and would wipe ?page=
    if (!loaded) return;
    const params = new URLSearchParams(window.location.search);
    if (currentPage > 1) params.set("page", currentPage);
    else params.delete("page");
    const search = params.toString() ? `?${params}` : "";
    if (search !== window.location.search) {
      router.replace(`${window.location.pathname}${search}`, { scroll: false });
    }
  }, [loaded, currentPage, router]);

  function goToPage(n) {
    setPage(n);
    gridTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const hasFilters = query || category !== "All" || price !== "all" || wishlistOnly;

  function clearFilters() {
    setQuery("");
    setCategory("All");
    setPrice("all");
    setWishlistOnly(false);
    setPage(1);
  }

  return (
    <section className="shop">
      <div className="shop-container">
        <div className="shop-header">
          <div>
            <span className="section-tag">Shop · 商店</span>
            <h1>
              Watch <span>Collection</span>
            </h1>
          </div>

          <div className="shop-toolbar">
            <label className="shop-search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="search"
                placeholder="Search watches..."
                value={query}
                onChange={(e) => resetting(setQuery)(e.target.value)}
                aria-label="Search products"
              />
            </label>

            <label className="shop-sort">
              <span>Sort by</span>
              <select value={sort} onChange={(e) => resetting(setSort)(e.target.value)}>
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="shop-filters">
          <div className="filter-chips">
            {["All", ...categories].map((c) => (
              <button
                key={c}
                type="button"
                className={`chip${category === c ? " is-active" : ""}`}
                onClick={() => resetting(setCategory)(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="filter-extra">
            <select className="filter-select" value={price} onChange={(e) => resetting(setPrice)(e.target.value)} aria-label="Price range">
              {priceRanges.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>

            <button
              type="button"
              className={`chip chip-heart${wishlistOnly ? " is-active" : ""}`}
              onClick={() => resetting(setWishlistOnly)(!wishlistOnly)}
            >
              ♥ Wishlist ({wishlist.length})
            </button>
          </div>
        </div>

        <div className="shop-meta" ref={gridTopRef}>
          <p>
            {visible.length > 0 ? (
              <>
                Showing <strong>{firstIndex + 1}–{firstIndex + pageItems.length}</strong> of {visible.length} products
              </>
            ) : (
              "No products found"
            )}
          </p>
          {hasFilters && (
            <button type="button" className="link-btn" onClick={clearFilters}>
              Clear filters
            </button>
          )}
        </div>

        {!loaded && wishlistOnly ? null : visible.length > 0 ? (
          <>
            <div className="product-grid">
              {pageItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <Pagination page={currentPage} totalPages={totalPages} onChange={goToPage} />
          </>
        ) : (
          <div className="shop-empty">
            <p>{wishlistOnly && wishlist.length === 0 ? "Your wishlist is empty. Tap the heart on any watch to save it." : "No watches match your filters."}</p>
            <button type="button" className="btn-hero" onClick={clearFilters}>
              Show All Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
