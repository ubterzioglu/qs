/**
 * Single-password admin login via a plain API route (not a Server Action).
 * Server Actions couple the client bundle to a build-specific action id, which
 * breaks across deploys/CDN caching (UnrecognizedActionError). A route handler
 * has no such coupling, so login stays robust.
 *
 * POST form fields: { password }. On success, sets the signed session cookie
 * and 303-redirects to /admin. On failure, redirects back with ?error=1.
 */
import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import {
  ADMIN_COOKIE,
  SESSION_COOKIE_OPTIONS,
  createSessionToken,
  verifyPassword,
} from "@/lib/admin/session";
import { isAdminConfigured } from "@/lib/env.server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const origin = new URL(request.url).origin;
  const back = (params = "") =>
    NextResponse.redirect(`${origin}/admin/login${params}`, { status: 303 });

  if (!isAdminConfigured) return back("?error=config");

  const form = await request.formData();
  const password = typeof form.get("password") === "string" ? String(form.get("password")) : "";
  if (!verifyPassword(password)) return back("?error=1");

  const token = await createSessionToken();
  const proto = (await headers()).get("x-forwarded-proto");
  const secure = proto ? proto === "https" : process.env.NODE_ENV === "production";

  const res = NextResponse.redirect(`${origin}/admin`, { status: 303 });
  res.cookies.set(ADMIN_COOKIE, token, { ...SESSION_COOKIE_OPTIONS, secure });
  return res;
}
