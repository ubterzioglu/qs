import { env } from "@/lib/env";

/**
 * Resolve the public origin for redirects from an API route.
 *
 * Behind a reverse proxy (Coolify/Traefik/Nginx) `request.url` is the internal
 * container address (e.g. http://0.0.0.0:3000), which must NOT be sent to the
 * browser. Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL — explicit, always correct when configured.
 *   2. x-forwarded-host / host + x-forwarded-proto — the proxy's real values.
 *   3. request.url origin — last-resort fallback (local dev without config).
 */
export function publicOrigin(request: Request): string {
  // 1) Configured site URL wins (unless it's the localhost dev default).
  if (env.siteUrl && !env.siteUrl.includes("localhost")) {
    return env.siteUrl.replace(/\/$/, "");
  }

  // 2) Trust the proxy's forwarded headers.
  const h = request.headers;
  const host = h.get("x-forwarded-host") ?? h.get("host");
  if (host && !host.startsWith("0.0.0.0") && !host.startsWith("127.0.0.1")) {
    const proto = h.get("x-forwarded-proto") ?? "https";
    return `${proto}://${host}`;
  }

  // 3) Fallback.
  if (env.siteUrl) return env.siteUrl.replace(/\/$/, "");
  return new URL(request.url).origin;
}
