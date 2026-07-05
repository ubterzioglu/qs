"use client";

/**
 * Browser Supabase client (cookie-based session via @supabase/ssr).
 * Used only by the /admin login form; returns null when env is absent.
 */
import { createBrowserClient } from "@supabase/ssr";
import { env, isSupabaseConfigured } from "@/lib/env";

export function createBrowserSupabase() {
  if (!isSupabaseConfigured) return null;
  return createBrowserClient(env.supabaseUrl, env.supabaseAnonKey);
}
