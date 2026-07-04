/**
 * Server-side Supabase clients.
 *  - createServerClient(): cookie-bound, respects RLS as the current user (admin auth).
 *  - createServiceClient(): service-role, bypasses RLS. Server-only. Use sparingly
 *    (seed + trusted server actions that must write regardless of session).
 *
 * All are null-safe: if env is absent, callers fall back to seed/no-op so the app
 * still runs without a database.
 */
import { cookies } from "next/headers";
import { createServerClient as createSsrClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { env, isSupabaseConfigured } from "@/lib/env";

export async function createServerClient() {
  if (!isSupabaseConfigured) return null;
  const cookieStore = await cookies();
  return createSsrClient(env.supabaseUrl, env.supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(toSet) {
        try {
          toSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // called from a Server Component — safe to ignore (middleware refreshes).
        }
      },
    },
  });
}

/** Service-role client. Returns null unless BOTH url and service key are set. */
export function createServiceClient() {
  if (!env.supabaseUrl || !env.supabaseServiceRoleKey) return null;
  return createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
