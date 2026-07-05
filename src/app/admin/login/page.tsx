import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin/auth";

export const metadata: Metadata = {
  title: "Yönetim Girişi · Qualtron Sinclair",
  robots: { index: false, follow: false },
};

// Plain server component + native <form> POSTing to an API route (no Server
// Action) — immune to the cross-deploy "action not found" error. Two-column
// premium card: brand/visual panel on the left, password form on the right.
export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdmin()) redirect("/admin");
  const { error } = await searchParams;
  const message =
    error === "config"
      ? "Yönetim girişi bu ortamda yapılandırılmamış."
      : error
        ? "Hatalı şifre. Lütfen tekrar deneyin."
        : null;

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="grid w-full max-w-4xl overflow-hidden border border-[var(--color-navy-line)] bg-[var(--color-navy)] shadow-2xl md:grid-cols-2">
        {/* LEFT — brand / visual panel */}
        <aside className="relative hidden flex-col justify-between overflow-hidden p-10 md:flex">
          {/* Ambient boardroom video + obsidian wash */}
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-30 motion-reduce:hidden"
            autoPlay
            muted
            loop
            playsInline
            poster="/media/brand/who-we-are.jpg"
            aria-hidden="true"
          >
            <source src="/media/brand/hero.mp4" type="video/mp4" />
          </video>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(150deg, rgba(10,14,31,0.7) 0%, rgba(15,22,48,0.92) 70%, var(--color-obsidian) 100%)",
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--color-cream) 1px, transparent 1px), linear-gradient(to bottom, var(--color-cream) 1px, transparent 1px)",
              backgroundSize: "38px 38px",
            }}
            aria-hidden="true"
          />

          <div className="relative flex items-center gap-3">
            <QSMark />
            <span className="qs-display text-lg text-[var(--color-cream)]">QUALTRON SINCLAIR</span>
          </div>

          <div className="relative">
            <span className="qs-label">Yönetim Konsolu</span>
            <div className="qs-rule mt-4 max-w-[7rem]" />
            <h1 className="qs-display mt-6 text-4xl leading-tight text-[var(--color-cream)]">
              Büyümenin arkasındaki
              <br />
              <em className="not-italic text-[var(--color-brass)]">yapıyı</em> yönetin.
            </h1>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--color-mist)]">
              İçerik, gönderiler ve revizyon istekleri — hepsi tek panelde.
            </p>
          </div>

          <p className="relative qs-label text-[var(--color-slate)]">
            Doha — Dubai — İstanbul — Delaware
          </p>
        </aside>

        {/* RIGHT — password form */}
        <div className="flex flex-col justify-center bg-[var(--color-navy-2)] p-10 sm:p-12">
          {/* Mobile-only brand header (left panel is hidden on small screens) */}
          <div className="mb-8 flex items-center gap-3 md:hidden">
            <QSMark />
            <span className="qs-display text-base text-[var(--color-cream)]">Qualtron Sinclair</span>
          </div>

          <span className="qs-label">Giriş</span>
          <h2 className="qs-display mt-2 text-3xl text-[var(--color-cream)]">Yönetim Paneli</h2>
          <p className="mt-2 text-sm text-[var(--color-mist)]">
            Devam etmek için şifrenizi girin.
          </p>

          <form action="/api/admin/login" method="post" className="mt-8 space-y-5">
            <label className="block">
              <span className="qs-label">Şifre</span>
              <input
                type="password"
                name="password"
                required
                autoFocus
                autoComplete="current-password"
                placeholder="••••••••••"
                className="mt-2 w-full border border-[var(--color-navy-line)] bg-[var(--color-obsidian)] px-4 py-3 text-[var(--color-cream)] outline-none transition-colors focus:border-[var(--color-brass)]"
              />
            </label>

            {message && (
              <p className="border border-[var(--color-brass-deep)] bg-[var(--color-obsidian)] px-4 py-3 text-sm text-[var(--color-brass-hi)]">
                {message}
              </p>
            )}

            <button type="submit" className="qs-btn w-full justify-center py-3.5">
              Giriş Yap
              <span aria-hidden="true">→</span>
            </button>
          </form>

          <p className="mt-8 text-xs text-[var(--color-slate)]">
            Bu alan yalnızca yetkili yöneticiler içindir.
          </p>
        </div>
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
