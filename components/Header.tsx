"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./CartProvider";
import Logo from "./Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/meal-plans", label: "Meal Plans" },
  { href: "/become-a-cook", label: "Become a Home Cook" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { count, open: openCart } = useCart();

  return (
    <header className="site-header">
      <div className="container nav">
        <Link href="/" className="brand" aria-label="Kitchi Kitchi home"><Logo size={38} /></Link>

        <nav className={"nav-links" + (open ? " open" : "")} onClick={() => setOpen(false)}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={pathname === l.href ? "active" : ""}>{l.label}</Link>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="cart-link" aria-label="Cart" onClick={openCart}>
            🛒<span className="cart-badge" style={{ display: count ? "flex" : "none" }}>{count}</span>
          </button>
          <Link href="/contact" className="btn btn-ghost btn-sm">Sign In</Link>
          <Link href="/contact" className="btn btn-primary btn-sm">Sign Up</Link>
          <button className={"nav-toggle" + (open ? " active" : "")} aria-label="Menu" onClick={() => setOpen(!open)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
