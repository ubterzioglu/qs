/**
 * Centralized env access. The site is designed to run WITHOUT Supabase
 * (static seed fallback), so these are all optional and we expose a flag.
 */

/**
 * Read an env var, treating empty/whitespace-only values as absent.
 * Coolify (and Docker `ENV FOO=$ARG` with an unset arg) inject empty STRINGS
 * rather than leaving the var undefined, so `?? default` alone isn't enough —
 * `"" ?? x` is `""`. This collapses those to the fallback.
 */
function readEnv(value: string | undefined, fallback = ""): string {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : fallback;
}

const DEFAULT_SITE_URL = "http://localhost:3000";

/** Ensure the site URL is a valid absolute URL; otherwise fall back safely. */
function resolveSiteUrl(raw: string): string {
  const candidate = readEnv(raw, DEFAULT_SITE_URL);
  try {
    // Throws on empty or protocol-less values (e.g. "qualtronsinclair.com").
    return new URL(candidate).toString().replace(/\/$/, "");
  } catch {
    // Last resort: prepend https:// if a bare host was given, else use the default.
    try {
      return new URL(`https://${candidate}`).toString().replace(/\/$/, "");
    } catch {
      return DEFAULT_SITE_URL;
    }
  }
}

export const env = {
  supabaseUrl: readEnv(process.env.NEXT_PUBLIC_SUPABASE_URL),
  supabaseAnonKey: readEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  supabaseServiceRoleKey: readEnv(process.env.SUPABASE_SERVICE_ROLE_KEY),
  siteUrl: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? ""),
  adminEmails: readEnv(process.env.ADMIN_EMAILS)
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean),
  // Maintenance ("yenileniyoruz") takeover. When "1"/"true"/"on", public traffic is
  // rewritten to /maintenance; /admin and /maintenance stay reachable.
  maintenanceMode: /^(1|true|on)$/i.test(readEnv(process.env.MAINTENANCE_MODE)),
};

/** True when public Supabase env is configured (client-safe check). */
export const isSupabaseConfigured =
  env.supabaseUrl.length > 0 && env.supabaseAnonKey.length > 0;
