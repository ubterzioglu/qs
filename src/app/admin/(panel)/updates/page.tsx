import { requireAdmin } from "@/lib/admin/auth";
import { RELEASES } from "@/lib/admin/changelog";

const TAG_STYLE: Record<string, string> = {
  yeni: "text-[var(--color-brass)]",
  iyileştirme: "text-[var(--color-brass-hi)]",
  düzeltme: "text-[var(--color-mist)]",
  tasarım: "text-[var(--color-brass)]",
};

function formatDate(iso: string): string {
  const months = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
  ];
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${months[(m ?? 1) - 1]} ${y}`;
}

export default async function AdminUpdatesPage() {
  await requireAdmin();

  return (
    <div className="max-w-3xl">
      <p className="qs-label">Değişiklik günlüğü</p>
      <h1 className="qs-display mt-2 text-3xl text-[var(--color-cream)]">Güncellemeler</h1>
      <p className="mt-2 text-sm text-[var(--color-mist)]">
        Sitede ve yönetim panelinde yapılan geliştirmelerin kaydı.
      </p>

      <div className="mt-10 space-y-12">
        {RELEASES.map((rel) => (
          <section key={rel.date} className="relative border-l border-[var(--color-navy-line)] pl-6">
            {/* timeline dot */}
            <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--color-brass)]" aria-hidden="true" />
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="qs-label text-[var(--color-brass)]">{formatDate(rel.date)}</span>
              {rel.tag && <span className={`qs-label ${TAG_STYLE[rel.tag] ?? ""}`}>{rel.tag}</span>}
            </div>
            <h2 className="qs-display mt-2 text-xl text-[var(--color-cream)]">{rel.title}</h2>

            <ul className="mt-4 space-y-2.5">
              {rel.items.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-[var(--color-mist)]">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-brass)]/70" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-12 text-xs text-[var(--color-slate)]">
        Bu liste geliştirici tarafından güncellenir.
      </p>
    </div>
  );
}
