import type { Metadata } from "next";
import { siteSettings } from "@/content/seed";

export const metadata: Metadata = {
  title: "Qualtron Sinclair — Renewing / Yenileniyoruz",
  description:
    "Qualtron Sinclair is being renewed. We design the structure behind growth.",
  robots: { index: false, follow: false },
};

// Standalone premium takeover — deliberately NOT inside the [locale] tree, so it
// carries no site header/footer. Bilingual copy is inlined (no intl provider here).
export default function MaintenancePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0d1017] text-[#f5f4f0]">
      {/* Ambient hero video backdrop, dimmed. Poster + reduced-motion safe. */}
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
        autoPlay
        muted
        loop
        playsInline
        poster="/media/brand/who-we-are.jpg"
        aria-hidden="true"
      >
        <source src="/media/brand/hero.mp4" type="video/mp4" />
      </video>

      {/* Blueprint grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f5f4f0 1px, transparent 1px), linear-gradient(to bottom, #f5f4f0 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />
      {/* Vignette for legibility */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 20%, transparent 30%, #0d1017 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-screen max-w-4xl flex-col justify-between px-6 py-12 sm:py-16">
        {/* Top: brand mark + coordinate labels */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <QSMark />
            <span
              className="text-sm tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              QUALTRON SINCLAIR
            </span>
          </div>
          <span className="bp-maint-label">EST · MENA</span>
        </header>

        {/* Center: the statement */}
        <div className="py-10">
          <span className="bp-maint-label">Status — Renewing / Yenileniyoruz</span>
          <div className="mt-6 bp-maint-rule" />
          <h1
            className="mt-8 text-[clamp(2.5rem,9vw,6rem)] leading-[0.95]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "-0.02em" }}
          >
            We are
            <br />
            <span style={{ color: "#8fb4d9" }}>rebuilding</span> the
            <br />
            structure.
          </h1>

          <div className="mt-10 grid max-w-2xl gap-6 border-t border-white/15 pt-6 sm:grid-cols-2">
            <p className="text-base leading-relaxed text-white/80">
              Our new platform is on its way. We design the structure behind
              growth — and we&apos;re applying the same to our own presence.
            </p>
            <p className="text-base leading-relaxed text-white/70">
              Yeni platformumuz çok yakında. Büyümenin arkasındaki yapıyı
              tasarlıyoruz — şimdi aynısını kendi dijital varlığımıza uyguluyoruz.
            </p>
          </div>

          <a
            href={`mailto:${siteSettings.contactEmail}`}
            className="mt-10 inline-flex items-center gap-3 border border-white/40 px-7 py-3 text-sm font-medium transition-colors hover:bg-[#f5f4f0] hover:text-[#0d1017]"
          >
            {siteSettings.contactEmail}
            <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* Bottom: offices as a measurement row */}
        <footer className="border-t border-white/15 pt-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="bp-maint-label">Doha — Dubai — Istanbul — Delaware</span>
            <span className="bp-maint-label">© 2025 Qualtron Sinclair</span>
          </div>
        </footer>
      </div>
    </main>
  );
}

function QSMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true" style={{ color: "#8fb4d9" }}>
      <rect x="1" y="1" width="24" height="24" stroke="currentColor" strokeWidth="1.5" />
      <rect x="7" y="7" width="12" height="12" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15 15L23 23" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
