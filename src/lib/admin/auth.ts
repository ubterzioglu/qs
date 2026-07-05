/**
 * Admin access guard. Server-only.
 *
 * A user is an admin when they have a valid Supabase session AND their email
 * is in the ADMIN_EMAILS allowlist. All /admin pages, server actions, and
 * route handlers must call requireAdmin() before touching data.
 */
import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import { serverEnv } from "@/lib/env.server";

export function isAllowedAdmin(user: User | null): boolean {
  const email = user?.email?.toLowerCase();
  // Empty allowlist -> nobody is an admin (fail closed).
  return Boolean(
    email && serverEnv.adminEmails.length > 0 && serverEnv.adminEmails.includes(email),
  );
}

/** Returns the admin user or null (no redirect) — for pages that branch. */
export async function getAdminUser(): Promise<User | null> {
  if (!isSupabaseConfigured) return null;
  const supabase = await createServerClient();
  if (!supabase) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return isAllowedAdmin(user) ? user : null;
}

/** Redirects to /admin/login unless a valid allow-listed admin session exists. */
export async function requireAdmin(): Promise<User> {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");
  return user;
}
