import "server-only";

/**
 * Server-ONLY environment access. Importing this from a client component is a
 * build error (the "server-only" package throws), which keeps the service-role
 * key and admin allowlist out of the browser bundle.
 */
import { readEnv } from "./env";

export const serverEnv = {
  supabaseServiceRoleKey: readEnv(process.env.SUPABASE_SERVICE_ROLE_KEY),
  // Single-password admin login.
  adminPassword: readEnv(process.env.ADMIN_PASSWORD),
  adminSessionSecret: readEnv(process.env.ADMIN_SESSION_SECRET),
  // Maintenance ("yenileniyoruz") takeover flag (read directly in middleware too).
  maintenanceMode: /^(1|true|on)$/i.test(readEnv(process.env.MAINTENANCE_MODE)),
};

/** True when the single-password admin login is configured. */
export const isAdminConfigured =
  serverEnv.adminPassword.length > 0 && serverEnv.adminSessionSecret.length > 0;
