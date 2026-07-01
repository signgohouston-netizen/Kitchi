import { NextRequest, NextResponse } from "next/server";
import { getOrder, updateOrder } from "@/lib/order-store";
import type { OrderStatus } from "@/lib/order-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/orders/:id  (id can be the uuid or the short code)
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) return NextResponse.json({ error: "Order not found." }, { status: 404 });
  return NextResponse.json({ order });
}

const VALID: OrderStatus[] = ["placed", "preparing", "ready", "out_for_delivery", "delivered", "cancelled"];

// PATCH /api/orders/:id  → update status and/or assign a driver
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = await req.json();
    const patch: { status?: OrderStatus; driver?: { id: string; name: string } | null } = {};
    if (body.status) {
      if (!VALID.includes(body.status)) {
        return NextResponse.json({ error: "Invalid status." }, { status: 400 });
      }
      patch.status = body.status;
    }
    if (body.driver !== undefined) patch.driver = body.driver;

    const order = await updateOrder(id, patch);
    if (!order) return NextResponse.json({ error: "Order not found." }, { status: 404 });
    return NextResponse.json({ order });
  } catch {
    return NextResponse.json({ error: "Could not update order." }, { status: 500 });
  }
}
