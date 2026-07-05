"use client";

import { useState, type FormEvent } from "react";
import { createBrowserSupabase } from "@/lib/supabase/client";
import { confirmAdminAccess } from "../actions";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const supabase = createBrowserSupabase();
    if (!supabase) {
      setError("Supabase is not configured on this deployment.");
      return;
    }
    setPending(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (signInError) {
      setPending(false);
      setError("Invalid email or password.");
      return;
    }
    // Credentials are valid, but the account must also be on the ADMIN_EMAILS
    // allowlist. Confirm server-side (and sign out if not) to avoid a redirect loop.
    const access = await confirmAdminAccess();
    if (!access.ok) {
      await supabase.auth.signOut();
      setPending(false);
      setError(access.message ?? "This account is not authorized.");
      return;
    }
    // Full navigation so the fresh auth cookies reach the server components.
    window.location.assign("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center gap-3">
          <QSMark />
          <div>
            <p className="qs-display text-xl text-[var(--color-cream)]">Qualtron Sinclair</p>
            <p className="qs-label mt-1">Admin Console</p>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="space-y-5 border border-[var(--color-navy-line)] bg-[var(--color-navy)] p-8"
        >
          <label className="block">
            <span className="qs-label">Email</span>
            <input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full border border-[var(--color-navy-line)] bg-[var(--color-obsidian)] px-3 py-2.5 text-[var(--color-cream)] outline-none focus:border-[var(--color-brass)]"
            />
          </label>
          <label className="block">
            <span className="qs-label">Password</span>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full border border-[var(--color-navy-line)] bg-[var(--color-obsidian)] px-3 py-2.5 text-[var(--color-cream)] outline-none focus:border-[var(--color-brass)]"
            />
          </label>

          {error && (
            <p className="border border-[var(--color-brass-deep)] px-3 py-2 text-sm text-[var(--color-brass-hi)]">
              {error}
            </p>
          )}

          <button type="submit" disabled={pending} className="qs-btn w-full justify-center disabled:opacity-50">
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}

function QSMark() {
  return (
    <svg width="30" height="30" viewBox="0 0 26 26" fill="none" aria-hidden="true" className="text-[var(--color-brass)]">
      <rect x="1" y="1" width="24" height="24" stroke="currentColor" strokeWidth="1.5" />
      <rect x="7" y="7" width="12" height="12" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15 15L23 23" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
