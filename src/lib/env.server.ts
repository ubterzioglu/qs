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
  // Email notifications for form submissions (Resend). All optional — when unset,
  // notifications are silently skipped and forms still work.
  resendApiKey: readEnv(process.env.RESEND_API_KEY),
  // Where submission alerts are sent (defaults to the admin email).
  notifyEmail: readEnv(process.env.CONTACT_NOTIFY_EMAIL) || readEnv(process.env.ADMIN_EMAILS).split(",")[0] || "",
  // Verified "from" sender on your Resend domain (e.g. "Qualtron Sinclair <no-reply@qualtronsinclair.com>").
  notifyFrom: readEnv(process.env.CONTACT_NOTIFY_FROM) || "Qualtron Sinclair <onboarding@resend.dev>",
};

/** True when the single-password admin login is configured. */
export const isAdminConfigured =
  serverEnv.adminPassword.length > 0 && serverEnv.adminSessionSecret.length > 0;
