"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction, type LoginState } from "../actions";

const initial: LoginState = { status: "idle" };

export default function AdminLoginPage() {
  const [state, action] = useActionState(loginAction, initial);

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
          action={action}
          className="space-y-5 border border-[var(--color-navy-line)] bg-[var(--color-navy)] p-8"
        >
          <label className="block">
            <span className="qs-label">Password</span>
            <input
              type="password"
              name="password"
              required
              autoFocus
              autoComplete="current-password"
              className="mt-2 w-full border border-[var(--color-navy-line)] bg-[var(--color-obsidian)] px-3 py-2.5 text-[var(--color-cream)] outline-none focus:border-[var(--color-brass)]"
            />
          </label>

          {state.status === "error" && (
            <p className="border border-[var(--color-brass-deep)] px-3 py-2 text-sm text-[var(--color-brass-hi)]">
              {state.message ?? "Incorrect password."}
            </p>
          )}

          <SubmitButton />
        </form>
      </div>
    </main>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="qs-btn w-full justify-center disabled:opacity-50">
      {pending ? "Signing in…" : "Sign in"}
    </button>
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
