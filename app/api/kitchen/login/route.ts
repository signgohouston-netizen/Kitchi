import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

// Simple shared access code for the prototype. In production each vendor/home
// chef gets their own account (the blueprint calls for a Vendor Portal + auth).
const ACCESS_CODE = process.env.KITCHEN_ACCESS_CODE || "kitchen2024";

// POST /api/kitchen/login  { name, code } → { kitchen: { id, name } }
export async function POST(req: NextRequest) {
  try {
    const { name, code } = await req.json();
    if (!name || !String(name).trim()) {
      return NextResponse.json({ error: "Please enter your kitchen name." }, { status: 400 });
    }
    if (code !== ACCESS_CODE) {
      return NextResponse.json({ error: "Incorrect access code." }, { status: 401 });
    }
    const kitchen = {
      id: "kit_" + crypto.randomBytes(4).toString("hex"),
      name: String(name).trim(),
    };
    return NextResponse.json({ kitchen });
  } catch {
    return NextResponse.json({ error: "Login failed." }, { status: 500 });
  }
}
