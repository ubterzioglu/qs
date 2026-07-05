import { NextResponse } from "next/server";

// Lightweight liveness probe for Coolify / load balancers.
// Always fast, no external calls — reports process health only.
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({ status: "ok", service: "qualtron-sinclair" });
}
