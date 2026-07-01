import { NextRequest, NextResponse } from "next/server";
import { listOrders, createOrder } from "@/lib/order-store";
import type { OrderStatus } from "@/lib/order-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/orders?status=placed&driverId=xxx  → list orders
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") as OrderStatus | null;
  const driverId = searchParams.get("driverId");
  const orders = await listOrders({
    status: status || undefined,
    driverId: driverId || undefined,
  });
  return NextResponse.json({ orders });
}

// POST /api/orders  → create an order from the customer's cart + details
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
    }
    if (!body.customer?.name || !body.customer?.address) {
      return NextResponse.json({ error: "Name and delivery address are required." }, { status: 400 });
    }
    const order = await createOrder({
      customer: body.customer,
      items: body.items,
      paymentMethod: body.paymentMethod,
    });
    return NextResponse.json({ order }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Could not place order." }, { status: 500 });
  }
}
