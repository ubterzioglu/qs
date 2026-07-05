import "server-only";

/**
 * Single-password admin sessions.
 *
 * Login = one shared password (ADMIN_PASSWORD). On success we issue an HMAC-signed
 * session token stored in an HttpOnly cookie; every /admin request verifies the
 * signature (and expiry) with ADMIN_SESSION_SECRET. The password itself never
 * enters the cookie or the browser.
 *
 * Uses Web Crypto (subtle) so it works in both the Node and Edge runtimes.
 */
import { serverEnv, isAdminConfigured } from "@/lib/env.server";

export const ADMIN_COOKIE = "qs_admin";
const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours

const encoder = new TextEncoder();

function b64url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let bin = "";
  for (const b of arr) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmac(message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(serverEnv.adminSessionSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return b64url(sig);
}

/** Constant-time string comparison (avoids timing side channels). */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** True if the supplied password matches ADMIN_PASSWORD (constant time). */
export function verifyPassword(input: string): boolean {
  if (!isAdminConfigured) return false;
  return timingSafeEqual(input, serverEnv.adminPassword);
}

/** Create a signed session token: `<expiryEpoch>.<hmac(expiry)>`. */
export async function createSessionToken(): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = String(exp);
  const sig = await hmac(payload);
  return `${payload}.${sig}`;
}

/** Verify a session token's signature and expiry. */
export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token || !isAdminConfigured) return false;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);

  const expected = await hmac(payload);
  if (!timingSafeEqual(sig, expected)) return false;

  const exp = Number(payload);
  if (!Number.isFinite(exp) || exp * 1000 < Date.now()) return false;
  return true;
}

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_TTL_SECONDS,
  // `secure` is set at write time based on the request (true in production/HTTPS).
};
