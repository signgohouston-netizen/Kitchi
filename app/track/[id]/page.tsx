"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  type Order,
  STATUS_FLOW,
  STATUS_META,
  statusIndex,
  money,
  formatTime,
} from "@/lib/order-types";

export default function TrackPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const res = await fetch(`/api/orders/${id}`, { cache: "no-store" });
        if (!alive) return;
        if (res.status === 404) { setNotFound(true); setLoading(false); return; }
        const data = await res.json();
        setOrder(data.order);
        setLoading(false);
      } catch {
        if (alive) setLoading(false);
      }
    }
    load();
    const t = setInterval(load, 4000); // poll for live updates
    return () => { alive = false; clearInterval(t); };
  }, [id]);

  if (loading) {
    return <main className="container" style={{ padding: "80px 24px", textAlign: "center" }}><p>Loading your order…</p></main>;
  }
  if (notFound || !order) {
    return (
      <main className="container" style={{ padding: "80px 24px", textAlign: "center" }}>
        <h1 style={{ marginBottom: 12 }}>Order not found</h1>
        <p style={{ color: "var(--muted)", marginBottom: 24 }}>We couldn&apos;t find that order. Check your link and try again.</p>
        <Link href="/" className="btn btn-primary">Back to home</Link>
      </main>
    );
  }

  const activeIdx = statusIndex(order.status);
  const cancelled = order.status === "cancelled";

  return (
    <main className="track-wrap">
      <div className="container" style={{ maxWidth: 760 }}>
        <div className="track-head">
          <span className="kicker">Order {order.code}</span>
          <h1>{cancelled ? "Order cancelled" : STATUS_META[order.status].label}</h1>
          <p>Placed at {formatTime(order.createdAt)} · {order.items.reduce((n, i) => n + i.qty, 0)} item(s)</p>
        </div>

        {!cancelled && (
          <div className="track-timeline">
            {STATUS_FLOW.map((s, i) => {
              const done = i <= activeIdx;
              const current = i === activeIdx;
              const ev = order.events.find((e) => e.status === s);
              return (
                <div key={s} className={"track-step" + (done ? " done" : "") + (current ? " current" : "")}>
                  <div className="track-dot">{done ? STATUS_META[s].emoji : i + 1}</div>
                  <div className="track-step-body">
                    <div className="track-step-label">{STATUS_META[s].label}</div>
                    {ev && <div className="track-step-time">{formatTime(ev.at)}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {order.driver && order.status !== "delivered" && (
          <div className="track-driver">
            <div className="track-driver-avatar">🛵</div>
            <div>
              <div className="track-driver-name">{order.driver.name} is your driver</div>
              <div className="track-driver-sub">
                {order.status === "out_for_delivery" ? "On the way to you now" : "Heading to the kitchen"}
              </div>
            </div>
          </div>
        )}

        <div className="track-card">
          <h3>Order summary</h3>
          {order.items.map((i) => (
            <div className="track-item" key={i.name}>
              <span>{i.emoji} {i.qty}× {i.name}</span>
              <span>{money(i.price * i.qty)}</span>
            </div>
          ))}
          <div className="cart-row" style={{ marginTop: 12 }}><span>Subtotal</span><span>{money(order.subtotal)}</span></div>
          <div className="cart-row"><span>Delivery</span><span>{money(order.deliveryFee)}</span></div>
          <div className="cart-row total"><span>Total</span><span>{money(order.total)}</span></div>
        </div>

        <div className="track-card">
          <h3>Delivery details</h3>
          <p style={{ color: "var(--body)" }}><strong>{order.customer.name}</strong></p>
          <p style={{ color: "var(--muted)" }}>{order.customer.address}</p>
          {order.customer.phone && <p style={{ color: "var(--muted)" }}>{order.customer.phone}</p>}
          {order.customer.notes && <p style={{ color: "var(--muted)" }}>Note: {order.customer.notes}</p>}
          <p style={{ color: "var(--muted)", marginTop: 8 }}>Payment: {order.paymentMethod}</p>
        </div>

        <div className="cta-row center" style={{ marginTop: 28 }}>
          <Link href="/" className="btn btn-ghost">Order something else</Link>
        </div>
      </div>
    </main>
  );
}
