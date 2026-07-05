import "server-only";

/**
 * Admin access guard. Server-only.
 *
 * Auth = single shared password -> HMAC-signed session cookie (see ./session).
 * All /admin pages, server actions, and route handlers must call requireAdmin()
 * (or check isAdmin()) before touching data.
 */
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, verifySessionToken } from "./session";

/** True when the current request carries a valid signed admin session cookie. */
export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(ADMIN_COOKIE)?.value);
}

/** Redirects to /admin/login unless a valid admin session exists. */
export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/login");
}
