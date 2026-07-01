"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./CartProvider";

const money = (n: number) => "$" + n.toFixed(2);

export default function CartDrawer() {
  const { items, subtotal, delivery, total, isOpen, close, setQty, remove, clear } = useCart();
  const router = useRouter();
  const [checkout, setCheckout] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleClose() {
    close();
    setCheckout(false);
    setError("");
  }

  async function placeOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setError("");
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: fd.get("name"),
            address: fd.get("address"),
            phone: fd.get("phone"),
            notes: fd.get("notes"),
          },
          items: items.map((i) => ({ name: i.name, price: i.price, qty: i.qty, emoji: i.emoji })),
          paymentMethod: "Cash on delivery",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not place order.");
      clear();
      close();
      setCheckout(false);
      router.push(`/track/${data.order.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not place order.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className={"cart-overlay" + (isOpen ? " open" : "")} onClick={handleClose} />
      <aside className={"cart-drawer" + (isOpen ? " open" : "") + (checkout ? " checkout" : "")} aria-label="Shopping cart">
        <div className="cart-drawer-head">
          <h3>Your Cart</h3>
          <button className="cart-close" aria-label="Close" onClick={handleClose}>&times;</button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-empty">
              <div className="big">🛒</div>
              <p>Your cart is empty.<br />Add a dish to get started!</p>
            </div>
          ) : (
            items.map((i) => (
              <div className="cart-item" key={i.name}>
                <div className="ci-emoji">{i.emoji}</div>
                <div className="ci-info">
                  <div className="ci-name">{i.name}</div>
                  <div className="ci-price">{money(i.price)}</div>
                </div>
                <div className="qty">
                  <button onClick={() => setQty(i.name, -1)} aria-label="Decrease">&minus;</button>
                  <span className="q">{i.qty}</span>
                  <button onClick={() => setQty(i.name, 1)} aria-label="Increase">+</button>
                </div>
                <button className="ci-remove" onClick={() => remove(i.name)}>Remove</button>
              </div>
            ))
          )}
        </div>

        <div className="cart-foot">
          <div className="cart-row"><span>Subtotal</span><span>{money(subtotal)}</span></div>
          <div className="cart-row"><span>Delivery</span><span>{money(delivery)}</span></div>
          <div className="cart-row total"><span>Total</span><span>{money(total)}</span></div>
          <button
            className="btn btn-primary btn-block"
            onClick={() => items.length && setCheckout(true)}
          >
            Checkout
          </button>
        </div>

        <div className="checkout-view">
          <button className="back-link" onClick={() => setCheckout(false)}>&larr; Back to cart</button>
          <h3 style={{ marginBottom: 14 }}>Checkout</h3>
          <form onSubmit={placeOrder}>
            <div className="field"><label>Full name</label><input name="name" type="text" required placeholder="Jane Doe" /></div>
            <div className="field"><label>Delivery address</label><input name="address" type="text" required placeholder="123 Main St, Houston, TX" /></div>
            <div className="field"><label>Phone</label><input name="phone" type="tel" required placeholder="(713) 555-0142" /></div>
            <div className="field"><label>Delivery notes <span style={{ color: "var(--muted)", fontWeight: 400 }}>(optional)</span></label><input name="notes" type="text" placeholder="Gate code, allergies, etc." /></div>
            <div className="cart-row"><span>Payment</span><span>Cash on delivery</span></div>
            <div className="cart-row total"><span>Total due</span><span>{money(total)}</span></div>
            <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
              {submitting ? "Placing order…" : "Place order"}
            </button>
            {error && <p className="form-note show" style={{ color: "#dc2626" }}>{error}</p>}
          </form>
        </div>
      </aside>
    </>
  );
}
