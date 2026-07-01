"use client";

import { useCallback, useEffect, useState } from "react";
import { type Order, STATUS_META, money, formatTime } from "@/lib/order-types";

type Driver = { id: string; name: string };
const STORE_KEY = "kk_driver";

export default function DriverPage() {
  const [driver, setDriver] = useState<Driver | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) setDriver(JSON.parse(raw));
    } catch { /* ignore */ }
    setReady(true);
  }, []);

  function onLogin(d: Driver) {
    localStorage.setItem(STORE_KEY, JSON.stringify(d));
    setDriver(d);
  }
  function logout() {
    localStorage.removeItem(STORE_KEY);
    setDriver(null);
  }

  if (!ready) return <main className="container" style={{ padding: 80 }} />;
  if (!driver) return <DriverLogin onLogin={onLogin} />;
  return <DriverDashboard driver={driver} onLogout={logout} />;
}

function DriverLogin({ onLogin }: { onLogin: (d: Driver) => void }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setBusy(true);
    try {
      const res = await fetch("/api/driver/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed.");
      onLogin(data.driver);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally { setBusy(false); }
  }

  return (
    <main className="dash-login">
      <div className="dash-login-card">
        <div className="dash-login-emoji">🛵</div>
        <h1>Driver Login</h1>
        <p>Sign in to receive and deliver Kitchi Kitchi orders.</p>
        <form onSubmit={submit}>
          <div className="field"><label>Your name</label><input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Alex Rider" /></div>
          <div className="field"><label>Driver access code</label><input value={code} onChange={(e) => setCode(e.target.value)} type="password" required placeholder="Enter access code" /></div>
          {error && <p className="form-note show" style={{ color: "#dc2626" }}>{error}</p>}
          <button type="submit" className="btn btn-primary btn-block" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
        </form>
        <p className="dash-hint">Demo access code: <code>kitchi2024</code></p>
      </div>
    </main>
  );
}

function DriverDashboard({ driver, onLogout }: { driver: Driver; onLogout: () => void }) {
  const [available, setAvailable] = useState<Order[]>([]);
  const [mine, setMine] = useState<Order[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const [a, m] = await Promise.all([
        fetch("/api/orders?status=ready", { cache: "no-store" }).then((r) => r.json()),
        fetch(`/api/orders?driverId=${driver.id}`, { cache: "no-store" }).then((r) => r.json()),
      ]);
      // Available = kitchen has marked it ready AND no driver has claimed it yet
      setAvailable((a.orders || []).filter((o: Order) => !o.driver));
      setMine((m.orders || []).filter((o: Order) => o.status === "ready" || o.status === "out_for_delivery"));
    } catch { /* ignore */ }
  }, [driver.id]);

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

  const accept = (o: Order) => patch(o.id, { driver }); // claim it; stays "ready" until picked up
  const pickup = (o: Order) => patch(o.id, { status: "out_for_delivery" });
  const deliver = (o: Order) => patch(o.id, { status: "delivered" });

  return (
    <main className="dash">
      <div className="container">
        <div className="dash-bar">
          <div>
            <span className="kicker">Driver dashboard</span>
            <h1>Hi, {driver.name} 👋</h1>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onLogout}>Log out</button>
        </div>

        <section className="dash-section">
          <h2>Your active deliveries {mine.length > 0 && <span className="count-pill">{mine.length}</span>}</h2>
          {mine.length === 0 ? (
            <p className="dash-empty">No active deliveries. Accept an order below to get started.</p>
          ) : (
            <div className="order-list">
              {mine.map((o) => (
                <OrderCard key={o.id} order={o} busy={busyId === o.id}
                  primary={o.status === "ready"
                    ? { label: "Mark picked up 🛍️", onClick: () => pickup(o) }
                    : { label: "Mark delivered ✅", onClick: () => deliver(o) }}
                />
              ))}
            </div>
          )}
        </section>

        <section className="dash-section">
          <h2>Available for pickup {available.length > 0 && <span className="count-pill orange">{available.length}</span>}</h2>
          {available.length === 0 ? (
            <p className="dash-empty">No orders ready yet. Once a kitchen marks an order ready, it appears here automatically. 🔄</p>
          ) : (
            <div className="order-list">
              {available.map((o) => (
                <OrderCard key={o.id} order={o} busy={busyId === o.id}
                  primary={{ label: "Accept delivery", onClick: () => accept(o) }} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function OrderCard({ order, primary, busy }: {
  order: Order;
  primary: { label: string; onClick: () => void };
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
        <span>📍 {order.customer.address}</span>
        <span>{count} item(s) · {money(order.total)}</span>
      </div>
      {order.customer.notes && <div className="order-note">📝 {order.customer.notes}</div>}
      <button className="btn btn-primary btn-block" onClick={primary.onClick} disabled={busy}>
        {busy ? "Updating…" : primary.label}
      </button>
    </article>
  );
}
