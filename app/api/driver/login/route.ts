import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

// Simple shared access code for the prototype. In production this becomes real
// per-driver accounts (the blueprint calls for proper auth + a database).
const ACCESS_CODE = process.env.DRIVER_ACCESS_CODE || "kitchi2024";

// POST /api/driver/login  { name, code } → { driver: { id, name } }
export async function POST(req: NextRequest) {
  try {
    const { name, code } = await req.json();
    if (!name || !String(name).trim()) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }
    if (code !== ACCESS_CODE) {
      return NextResponse.json({ error: "Incorrect access code." }, { status: 401 });
    }
    const driver = {
      id: "drv_" + crypto.randomBytes(4).toString("hex"),
      name: String(name).trim(),
    };
    return NextResponse.json({ driver });
  } catch {
    return NextResponse.json({ error: "Login failed." }, { status: 500 });
  }
}
