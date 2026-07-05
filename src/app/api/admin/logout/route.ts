/**
 * Admin sign-out via a plain API route (see login route for the rationale).
 * Clears the session cookie and redirects to the login page.
 */
import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/admin/session";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const origin = new URL(request.url).origin;
  const res = NextResponse.redirect(`${origin}/admin/login`, { status: 303 });
  res.cookies.delete(ADMIN_COOKIE);
  return res;
}
