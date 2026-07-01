// Server-only order store. Persists to a JSON file under /data so orders survive
// dev-server restarts. For production this swaps to a real database (Postgres per
// the blueprint) — the API routes are the only thing that touch this module.
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import type { Order, OrderStatus, OrderItem } from "./order-types";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "orders.json");
const DELIVERY_FEE = 2.99;

async function readAll(): Promise<Order[]> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    return JSON.parse(raw) as Order[];
  } catch {
    return [];
  }
}

async function writeAll(orders: Order[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(orders, null, 2), "utf8");
}

function shortCode(): string {
  return "KK-" + crypto.randomBytes(2).toString("hex").toUpperCase();
}

export async function listOrders(filter?: { status?: OrderStatus; driverId?: string }): Promise<Order[]> {
  let orders = await readAll();
  if (filter?.status) orders = orders.filter((o) => o.status === filter.status);
  if (filter?.driverId) orders = orders.filter((o) => o.driver?.id === filter.driverId);
  // newest first
  return orders.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function getOrder(id: string): Promise<Order | undefined> {
  const orders = await readAll();
  return orders.find((o) => o.id === id || o.code === id);
}

export async function createOrder(input: {
  customer: Order["customer"];
  items: OrderItem[];
  paymentMethod?: string;
}): Promise<Order> {
  const orders = await readAll();
  const items = (input.items || []).map((i) => ({
    name: String(i.name),
    price: Number(i.price) || 0,
    qty: Math.max(1, Number(i.qty) || 1),
    emoji: i.emoji || "🍽️",
  }));
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const deliveryFee = items.length ? DELIVERY_FEE : 0;
  const now = new Date().toISOString();

  const order: Order = {
    id: crypto.randomUUID(),
    code: shortCode(),
    createdAt: now,
    customer: {
      name: String(input.customer?.name || "").trim() || "Guest",
      phone: String(input.customer?.phone || "").trim(),
      address: String(input.customer?.address || "").trim(),
      notes: input.customer?.notes ? String(input.customer.notes).trim() : undefined,
    },
    items,
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    paymentMethod: input.paymentMethod || "Cash on delivery",
    status: "placed",
    driver: null,
    events: [{ status: "placed", at: now }],
  };

  orders.push(order);
  await writeAll(orders);
  return order;
}

type UpdateInput = {
  status?: OrderStatus;
  driver?: { id: string; name: string } | null;
};

export async function updateOrder(id: string, patch: UpdateInput): Promise<Order | undefined> {
  const orders = await readAll();
  const idx = orders.findIndex((o) => o.id === id || o.code === id);
  if (idx === -1) return undefined;
  const order = orders[idx];

  if (patch.driver !== undefined) order.driver = patch.driver;
  if (patch.status && patch.status !== order.status) {
    order.status = patch.status;
    order.events.push({ status: patch.status, at: new Date().toISOString() });
  }

  orders[idx] = order;
  await writeAll(orders);
  return order;
}
