/**
 * Admin sign-out via a plain API route (see login route for the rationale).
 * Clears the session cookie and redirects to the login page using the public
 * origin (never request.url, which is internal behind a reverse proxy).
 */
import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/admin/session";
import { publicOrigin } from "@/lib/admin/redirect";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const res = NextResponse.redirect(`${publicOrigin(request)}/admin/login`, {
    status: 303,
  });
  res.cookies.delete(ADMIN_COOKIE);
  return res;
}
