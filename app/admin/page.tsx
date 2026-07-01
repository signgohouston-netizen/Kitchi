"use client";

import { useEffect, useState } from "react";
import { type Order, type OrderStatus, STATUS_META, STATUS_FLOW, money, formatTime } from "@/lib/order-types";

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const data = await fetch("/api/orders", { cache: "no-store" }).then((r) => r.json());
        if (!alive) return;
        setOrders(data.orders || []);
        setLoaded(true);
      } catch { /* ignore */ }
    }
    load();
    const t = setInterval(load, 4000);
    return () => { alive = false; clearInterval(t); };
  }, []);

  const counts = STATUS_FLOW.reduce((acc, s) => {
    acc[s] = orders.filter((o) => o.status === s).length;
    return acc;
  }, {} as Record<string, number>);
  const revenue = orders.filter((o) => o.status === "delivered").reduce((s, o) => s + o.total, 0);

  const shown = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <main className="dash">
      <div className="container">
        <div className="dash-bar">
          <div>
            <span className="kicker">Admin</span>
            <h1>Orders overview</h1>
          </div>
        </div>

        <div className="admin-stats">
          <div className="admin-stat"><div className="num">{orders.length}</div><div className="lbl">Total orders</div></div>
          <div className="admin-stat"><div className="num">{counts["placed"] || 0}</div><div className="lbl">New / unassigned</div></div>
          <div className="admin-stat"><div className="num">{(counts["preparing"] || 0) + (counts["out_for_delivery"] || 0)}</div><div className="lbl">In progress</div></div>
          <div className="admin-stat"><div className="num">{money(revenue)}</div><div className="lbl">Delivered revenue</div></div>
        </div>

        <div className="admin-filters">
          <button className={"chip-filter" + (filter === "all" ? " active" : "")} onClick={() => setFilter("all")}>All ({orders.length})</button>
          {STATUS_FLOW.map((s) => (
            <button key={s} className={"chip-filter" + (filter === s ? " active" : "")} onClick={() => setFilter(s)}>
              {STATUS_META[s].emoji} {STATUS_META[s].short} ({counts[s] || 0})
            </button>
          ))}
        </div>

        {!loaded ? (
          <p className="dash-empty">Loading orders…</p>
        ) : shown.length === 0 ? (
          <p className="dash-empty">No orders here yet. Place an order from the homepage to see it appear live.</p>
        ) : (
          <div className="admin-table">
            <div className="admin-row admin-head">
              <span>Order</span><span>Customer</span><span>Items</span><span>Total</span><span>Driver</span><span>Status</span><span>Time</span>
            </div>
            {shown.map((o) => {
              const meta = STATUS_META[o.status];
              return (
                <div className="admin-row" key={o.id}>
                  <span data-label="Order"><strong>{o.code}</strong></span>
                  <span data-label="Customer">{o.customer.name}</span>
                  <span data-label="Items">{o.items.reduce((n, i) => n + i.qty, 0)}</span>
                  <span data-label="Total">{money(o.total)}</span>
                  <span data-label="Driver">{o.driver?.name || "—"}</span>
                  <span data-label="Status"><span className="status-badge" style={{ background: meta.color }}>{meta.emoji} {meta.short}</span></span>
                  <span data-label="Time">{formatTime(o.createdAt)}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
