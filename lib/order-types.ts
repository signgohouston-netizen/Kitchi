// Shared order types + helpers. NO server-only imports here so this file is safe
// to use from client components (driver dashboard, tracking page, admin).

export type OrderStatus =
  | "placed"
  | "preparing"
  | "ready"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export type OrderItem = { name: string; price: number; qty: number; emoji?: string };
export type OrderEvent = { status: OrderStatus; at: string };

export type Order = {
  id: string;
  code: string; // short human-friendly code, e.g. "KK-4F2A"
  createdAt: string;
  customer: { name: string; phone: string; address: string; notes?: string };
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string;
  status: OrderStatus;
  driver: { id: string; name: string } | null;
  events: OrderEvent[];
};

// The customer-facing happy path, in order.
export const STATUS_FLOW: OrderStatus[] = ["placed", "preparing", "ready", "out_for_delivery", "delivered"];

export const STATUS_META: Record<OrderStatus, { label: string; short: string; emoji: string; color: string }> = {
  placed:           { label: "Order placed",        short: "New",         emoji: "🧾", color: "#6b7280" },
  preparing:        { label: "Preparing your food", short: "Preparing",   emoji: "👩‍🍳", color: "#d97706" },
  ready:            { label: "Ready for pickup",    short: "Ready",       emoji: "🍲", color: "#0d9488" },
  out_for_delivery: { label: "Out for delivery",    short: "On the way",  emoji: "🛵", color: "#2563eb" },
  delivered:        { label: "Delivered",           short: "Delivered",   emoji: "✅", color: "#16a34a" },
  cancelled:        { label: "Cancelled",           short: "Cancelled",   emoji: "✕",  color: "#dc2626" },
};

export function statusIndex(status: OrderStatus): number {
  return STATUS_FLOW.indexOf(status);
}

export function money(n: number): string {
  return "$" + n.toFixed(2);
}

export function formatTime(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  } catch {
    return "";
  }
}
