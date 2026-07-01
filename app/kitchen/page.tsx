"use client";

import { useCallback, useEffect, useState } from "react";
import { type Order, STATUS_META, money, formatTime } from "@/lib/order-types";

type Kitchen = { id: string; name: string };
const STORE_KEY = "kk_kitchen";

export default function KitchenPage() {
  const [kitchen, setKitchen] = useState<Kitchen | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) setKitchen(JSON.parse(raw));
    } catch { /* ignore */ }
    setReady(true);
  }, []);

  function onLogin(k: Kitchen) {
    localStorage.setItem(STORE_KEY, JSON.stringify(k));
    setKitchen(k);
  }
  function logout() {
    localStorage.removeItem(STORE_KEY);
    setKitchen(null);
  }

  if (!ready) return <main className="container" style={{ padding: 80 }} />;
  if (!kitchen) return <KitchenLogin onLogin={onLogin} />;
  return <KitchenDashboard kitchen={kitchen} onLogout={logout} />;
}

function KitchenLogin({ onLogin }: { onLogin: (k: Kitchen) => void }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setBusy(true);
    try {
      const res = await fetch("/api/kitchen/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed.");
      onLogin(data.kitchen);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally { setBusy(false); }
  }

  return (
    <main className="dash-login">
      <div className="dash-login-card">
        <div className="dash-login-emoji">👩‍🍳</div>
        <h1>Kitchen Login</h1>
        <p>Sign in to receive orders and manage your kitchen.</p>
        <form onSubmit={submit}>
          <div className="field"><label>Kitchen / chef name</label><input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Fatima's Halal Kitchen" /></div>
          <div className="field"><label>Kitchen access code</label><input value={code} onChange={(e) => setCode(e.target.value)} type="password" required placeholder="Enter access code" /></div>
          {error && <p className="form-note show" style={{ color: "#dc2626" }}>{error}</p>}
          <button type="submit" className="btn btn-primary btn-block" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
        </form>
        <p className="dash-hint">Demo access code: <code>kitchen2024</code></p>
      </div>
    </main>
  );
}

function KitchenDashboard({ kitchen, onLogout }: { kitchen: Kitchen; onLogout: () => void }) {
  const [incoming, setIncoming] = useState<Order[]>([]);
  const [cooking, setCooking] = useState<Order[]>([]);
  const [waiting, setWaiting] = useState<Order[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const [p, pr, rd] = await Promise.all([
        fetch("/api/orders?status=placed", { cache: "no-store" }).then((r) => r.json()),
        fetch("/api/orders?status=preparing", { cache: "no-store" }).then((r) => r.json()),
        fetch("/api/orders?status=ready", { cache: "no-store" }).then((r) => r.json()),
      ]);
      setIncoming(p.orders || []);
      setCooking(pr.orders || []);
      // ready orders still waiting for a driver to pick up
      setWaiting((rd.orders || []).filter((o: Order) => o.status === "ready"));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    refresh();
    const t = setInterval(refresh, 4000);
    return () => clearInterval(t);
  }, [refresh]);

  async function patch(id: string, body: object) {
    setBusyId(id);
    try {
      await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await refresh();
    } finally { setBusyId(null); }
  }

  const accept = (o: Order) => patch(o.id, { status: "preparing" });
  const markReady = (o: Order) => patch(o.id, { status: "ready" });
  const reject = (o: Order) => patch(o.id, { status: "cancelled" });

  return (
    <main className="dash">
      <div className="container">
        <div className="dash-bar">
          <div>
            <span className="kicker">Kitchen dashboard</span>
            <h1>{kitchen.name} 🍳</h1>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onLogout}>Log out</button>
        </div>

        <section className="dash-section">
          <h2>New orders {incoming.length > 0 && <span className="count-pill orange">{incoming.length}</span>}</h2>
          {incoming.length === 0 ? (
            <p className="dash-empty">No new orders right now. They&apos;ll appear here automatically. 🔔</p>
          ) : (
            <div className="order-list">
              {incoming.map((o) => (
                <OrderCard key={o.id} order={o} busy={busyId === o.id}
                  primary={{ label: "Accept & start cooking 👩‍🍳", onClick: () => accept(o) }}
                  secondary={{ label: "Reject", onClick: () => reject(o) }} />
              ))}
            </div>
          )}
        </section>

        <section className="dash-section">
          <h2>Cooking now {cooking.length > 0 && <span className="count-pill">{cooking.length}</span>}</h2>
          {cooking.length === 0 ? (
            <p className="dash-empty">Nothing on the stove. Accept a new order to start.</p>
          ) : (
            <div className="order-list">
              {cooking.map((o) => (
                <OrderCard key={o.id} order={o} busy={busyId === o.id}
                  primary={{ label: "Mark ready for pickup 🍲", onClick: () => markReady(o) }} />
              ))}
            </div>
          )}
        </section>

        <section className="dash-section">
          <h2>Ready — waiting for driver {waiting.length > 0 && <span className="count-pill" style={{ background: "#0d9488" }}>{waiting.length}</span>}</h2>
          {waiting.length === 0 ? (
            <p className="dash-empty">No orders waiting for pickup.</p>
          ) : (
            <div className="order-list">
              {waiting.map((o) => (
                <OrderCard key={o.id} order={o} busy={busyId === o.id} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function OrderCard({ order, primary, secondary, busy }: {
  order: Order;
  primary?: { label: string; onClick: () => void };
  secondary?: { label: string; onClick: () => void };
  busy: boolean;
}) {
  const meta = STATUS_META[order.status];
  const count = order.items.reduce((n, i) => n + i.qty, 0);
  return (
    <article className="order-card">
      <div className="order-card-top">
        <div>
          <span className="order-code">{order.code}</span>
          <span className="status-badge" style={{ background: meta.color }}>{meta.emoji} {meta.short}</span>
        </div>
        <span className="order-time">{formatTime(order.createdAt)}</span>
      </div>
      <div className="order-items">
        {order.items.map((i) => <div key={i.name}>{i.emoji} {i.qty}× {i.name}</div>)}
      </div>
      <div className="order-meta-row">
        <span>🧑 {order.customer.name}</span>
        <span>{count} item(s) · {money(order.total)}</span>
      </div>
      {order.customer.notes && <div className="order-note">📝 {order.customer.notes}</div>}
      {order.driver && <div className="order-meta-row" style={{ borderTop: "none", paddingTop: 0 }}><span>🛵 Driver: {order.driver.name}</span></div>}
      {(primary || secondary) && (
        <div className="order-card-actions">
          {secondary && <button className="btn-reject" onClick={secondary.onClick} disabled={busy}>{secondary.label}</button>}
          {primary && <button className="btn btn-primary btn-block" onClick={primary.onClick} disabled={busy}>{busy ? "Updating…" : primary.label}</button>}
        </div>
      )}
    </article>
  );
}
