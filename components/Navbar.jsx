"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { useStore } from "@/components/StoreProvider";

const links = [
  { href: "/", label: "Inicio", match: (p) => p === "/" },
  { href: "/shop", label: "Shop", match: (p) => p.startsWith("/shop") },
  { href: "/#cursos", label: "Cursos" },
  { href: "/#clase-gratis", label: "Reservar" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount, wishlist, openCart } = useStore();
  const toggleRef = useRef(null);

  // Collapse the mobile menu after a link is chosen
  const closeMenu = () => {
    if (toggleRef.current) toggleRef.current.checked = false;
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href="/" className="logo" onClick={closeMenu}>
          Gabo <span>en Asia</span>
        </Link>

        <input type="checkbox" id="menu-toggle" className="menu-toggle" ref={toggleRef} />

        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.label}>
              <Link href={link.href} className={link.match?.(pathname) ? "active" : undefined} onClick={closeMenu}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <Link href="/shop?wishlist=1" className="cart" aria-label="Wishlist">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {wishlist.length > 0 && <span className="cart-count">{wishlist.length}</span>}
          </Link>
          <button type="button" className="cart" aria-label="Carrito" onClick={openCart}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="cart-count">{cartCount}</span>
          </button>
          <Link href="/checkout" className="btn-checkout">Checkout</Link>
        </div>

        <label htmlFor="menu-toggle" className="hamburger" aria-label="Abrir menú">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>
    </nav>
  );
}
