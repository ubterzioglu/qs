"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const NAV = [
  { key: "services", href: "/services" },
  { key: "portfolio", href: "/portfolio" },
  { key: "networks", href: "/qs-networks" },
  { key: "leadership", href: "/leadership" },
  { key: "careers", href: "/careers" },
  { key: "insights", href: "/insights" },
  { key: "contact", href: "/contact" },
] as const;

export function SiteHeader() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Strip the locale prefix so we can re-link the same page in the other locale.
  const barePath =
    pathname.replace(new RegExp(`^/(${routing.locales.join("|")})(?=/|$)`), "") ||
    "/";

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-rule)] bg-[var(--color-paper)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Qualtron Sinclair — home">
          <QSMark />
          <span className="bp-display text-sm tracking-tight text-[var(--color-ink)] sm:text-base">
            QUALTRON SINCLAIR
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="bp-label text-[var(--color-graphite)] transition-colors hover:text-[var(--color-ink)]"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LocaleSwitch current={locale} barePath={barePath} />
          <button
            type="button"
            className="bp-label text-[var(--color-ink)] lg:hidden"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? t("close") : t("menu")}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-[var(--color-rule)] bg-[var(--color-paper)] lg:hidden"
          aria-label="Mobile"
        >
          <ul className="mx-auto max-w-6xl px-6 py-4">
            {NAV.map((item) => (
              <li key={item.key} className="border-b border-[var(--color-rule)] last:border-0">
                <Link
                  href={item.href}
                  className="block py-3 text-lg text-[var(--color-ink)]"
                  onClick={() => setOpen(false)}
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

function LocaleSwitch({ current, barePath }: { current: string; barePath: string }) {
  return (
    <div className="flex items-center gap-1 bp-label">
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1">
          {i > 0 && <span className="text-[var(--color-rule-strong)]">|</span>}
          <Link
            href={barePath}
            locale={loc}
            aria-current={loc === current ? "true" : undefined}
            className={
              loc === current
                ? "text-[var(--color-blueprint)]"
                : "text-[var(--color-graphite)] hover:text-[var(--color-ink)]"
            }
          >
            {loc.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
}

/** The nested-square "Q" monogram, redrawn as a minimal blueprint mark. */
function QSMark() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      aria-hidden="true"
      className="text-[var(--color-blueprint)]"
    >
      <rect x="1" y="1" width="24" height="24" stroke="currentColor" strokeWidth="1.5" />
      <rect x="7" y="7" width="12" height="12" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15 15L23 23" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
