/**
 * Centralized env access. The site is designed to run WITHOUT Supabase
 * (static seed fallback), so these are all optional and we expose a flag.
 */
export const env = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  adminEmails: (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean),
  // Maintenance ("yenileniyoruz") takeover. When "1"/"true", public traffic is
  // rewritten to /maintenance; /admin and /maintenance stay reachable.
  maintenanceMode: /^(1|true|on)$/i.test(process.env.MAINTENANCE_MODE ?? ""),
};

/** True when public Supabase env is configured (client-safe check). */
export const isSupabaseConfigured =
  env.supabaseUrl.length > 0 && env.supabaseAnonKey.length > 0;
