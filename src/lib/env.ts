/**
 * Client-SAFE environment access.
 *
 * ONLY reads NEXT_PUBLIC_* values (already inlined into the client bundle) plus
 * booleans derived from them. This module is safe to import from client
 * components. Server-only secrets live in ./env.server (guarded by "server-only").
 */

/**
 * Read an env var, treating empty/whitespace-only values as absent.
 * Coolify (and Docker `ENV FOO=$ARG` with an unset arg) inject empty STRINGS
 * rather than leaving the var undefined, so `?? default` alone isn't enough —
 * `"" ?? x` is `""`. This collapses those to the fallback.
 */
export function readEnv(value: string | undefined, fallback = ""): string {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : fallback;
}

const DEFAULT_SITE_URL = "http://localhost:3000";

/** Ensure the site URL is a valid absolute URL; otherwise fall back safely. */
function resolveSiteUrl(raw: string): string {
  const candidate = readEnv(raw, DEFAULT_SITE_URL);
  try {
    return new URL(candidate).toString().replace(/\/$/, "");
  } catch {
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
  siteUrl: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? ""),
};

/** True when public Supabase env is configured (client-safe check). */
export const isSupabaseConfigured =
  env.supabaseUrl.length > 0 && env.supabaseAnonKey.length > 0;
