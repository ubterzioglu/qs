import type { ReactNode } from "react";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { signOutAction } from "../actions";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/submissions/contact", label: "Submissions" },
  { href: "/admin/revisions", label: "Revisions" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/insights", label: "Insights" },
  { href: "/admin/settings", label: "Settings" },
];

export default async function AdminPanelLayout({ children }: { children: ReactNode }) {
  const user = await requireAdmin();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-[var(--color-navy-line)] bg-[var(--color-navy)]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="qs-display text-lg text-[var(--color-cream)]">
              QS <span className="text-[var(--color-brass)]">Admin</span>
            </Link>
            <nav className="flex flex-wrap items-center gap-4" aria-label="Admin">
              {NAV.map((item) => (
                <Link key={item.href} href={item.href} className="qs-label hover:text-[var(--color-brass-hi)]">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[var(--color-slate)]">{user.email}</span>
            <form action={signOutAction}>
              <button type="submit" className="qs-label text-[var(--color-mist)] hover:text-[var(--color-brass-hi)]">
                Sign out
              </button>
            </form>
            <Link href="/" className="qs-label text-[var(--color-mist)] hover:text-[var(--color-brass-hi)]">
              View site ↗
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">{children}</main>
    </div>
  );
}
