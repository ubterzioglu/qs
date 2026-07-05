import type { ReactNode } from "react";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";

const NAV = [
  { href: "/admin", label: "Genel Bakış", icon: "grid" },
  { href: "/admin/submissions/contact", label: "Form Gönderileri", icon: "inbox" },
  { href: "/admin/revisions", label: "Revizyon İstekleri", icon: "flag" },
  { href: "/admin/services", label: "Hizmetler", icon: "layers" },
  { href: "/admin/insights", label: "İçgörüler", icon: "doc" },
  { href: "/admin/settings", label: "Ayarlar", icon: "gear" },
] as const;

export default async function AdminPanelLayout({ children }: { children: ReactNode }) {
  await requireAdmin();

  return (
    <div className="flex min-h-screen bg-[var(--color-obsidian)]">
      {/* SIDEBAR (left) */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-[var(--color-navy-line)] bg-[var(--color-navy)] lg:flex">
        <div className="flex items-center gap-3 border-b border-[var(--color-navy-line)] px-6 py-5">
          <QSMark />
          <div className="leading-tight">
            <p className="qs-display text-base text-[var(--color-cream)]">Qualtron Sinclair</p>
            <p className="qs-label mt-0.5">Yönetim</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-6" aria-label="Yönetim menüsü">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center gap-3 border-l-2 border-transparent px-3 py-2.5 text-sm text-[var(--color-mist)] transition-colors hover:border-[var(--color-brass)] hover:bg-[var(--color-navy-2)] hover:text-[var(--color-cream)]"
            >
              <NavIcon name={item.icon} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="space-y-1 border-t border-[var(--color-navy-line)] px-3 py-4">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-[var(--color-slate)] transition-colors hover:text-[var(--color-cream)]"
          >
            <NavIcon name="external" />
            Siteyi Görüntüle
          </Link>
          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-[var(--color-slate)] transition-colors hover:text-[var(--color-brass-hi)]"
            >
              <NavIcon name="logout" />
              Çıkış Yap
            </button>
          </form>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar (sidebar hidden below lg) */}
        <header className="flex items-center justify-between border-b border-[var(--color-navy-line)] bg-[var(--color-navy)] px-5 py-4 lg:hidden">
          <span className="qs-display text-base text-[var(--color-cream)]">
            QS <span className="text-[var(--color-brass)]">Yönetim</span>
          </span>
          <form action="/api/admin/logout" method="post">
            <button type="submit" className="qs-label text-[var(--color-mist)]">
              Çıkış
            </button>
          </form>
        </header>

        {/* Mobile horizontal nav */}
        <nav className="flex gap-4 overflow-x-auto border-b border-[var(--color-navy-line)] bg-[var(--color-navy)] px-5 py-3 lg:hidden" aria-label="Yönetim menüsü">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="qs-label whitespace-nowrap text-[var(--color-mist)]">
              {item.label}
            </Link>
          ))}
        </nav>

        <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10 lg:px-10">{children}</main>
      </div>
    </div>
  );
}

function NavIcon({ name }: { name: string }) {
  // Minimal line icons (currentColor), 16px.
  const paths: Record<string, ReactNode> = {
    grid: <><rect x="2" y="2" width="5" height="5" /><rect x="9" y="2" width="5" height="5" /><rect x="2" y="9" width="5" height="5" /><rect x="9" y="9" width="5" height="5" /></>,
    inbox: <><path d="M2 10l2-7h8l2 7v3H2z" /><path d="M2 10h4l1 2h2l1-2h4" /></>,
    flag: <><path d="M3 2v12" /><path d="M3 3h9l-2 3 2 3H3" /></>,
    layers: <><path d="M8 2l6 3-6 3-6-3z" /><path d="M2 8l6 3 6-3" /><path d="M2 11l6 3 6-3" /></>,
    doc: <><path d="M4 2h6l2 2v10H4z" /><path d="M6 6h4M6 9h4M6 12h2" /></>,
    gear: <><circle cx="8" cy="8" r="2.5" /><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.5 1.5M11.5 11.5L13 13M13 3l-1.5 1.5M4.5 11.5L3 13" /></>,
    external: <><path d="M6 3H3v10h10v-3" /><path d="M9 3h4v4M13 3L7 9" /></>,
    logout: <><path d="M6 3H3v10h3" /><path d="M9 8h6M12 5l3 3-3 3" /></>,
  };
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-[var(--color-brass)] opacity-80">
      {paths[name]}
    </svg>
  );
}

function QSMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true" className="text-[var(--color-brass)]">
      <rect x="1" y="1" width="24" height="24" stroke="currentColor" strokeWidth="1.5" />
      <rect x="7" y="7" width="12" height="12" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15 15L23 23" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
