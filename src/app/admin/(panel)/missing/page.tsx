import { requireAdmin } from "@/lib/admin/auth";
import { MISSING, type MissingStatus } from "@/lib/admin/missing";

const STATUS: Record<MissingStatus, { label: string; cls: string }> = {
  bekliyor: { label: "Bekliyor", cls: "border-[var(--color-brass)] text-[var(--color-brass)]" },
  kısmen: { label: "Kısmen", cls: "border-[var(--color-brass-hi)] text-[var(--color-brass-hi)]" },
  opsiyonel: { label: "Opsiyonel", cls: "border-[var(--color-navy-line)] text-[var(--color-slate)]" },
};

export default async function AdminMissingPage() {
  await requireAdmin();

  const waiting = MISSING.flatMap((g) => g.items).filter((i) => i.status === "bekliyor").length;

  return (
    <div className="max-w-3xl">
      <p className="qs-label">Eski siteden gelmeyenler</p>
      <h1 className="qs-display mt-2 text-3xl text-[var(--color-cream)]">Eksik Kalanlar</h1>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-mist)]">
        Eski Wix sitesinden alınamayan ve sizden beklenen gerçek bilgiler. Bunlar
        uydurulmadı — girmeniz gereken veriler ve yapılabilecek opsiyonel iyileştirmeler.
        {waiting > 0 && (
          <span className="text-[var(--color-brass)]"> {waiting} madde bilginizi bekliyor.</span>
        )}
      </p>

      <div className="mt-10 space-y-10">
        {MISSING.map((group) => (
          <section key={group.title}>
            <h2 className="qs-label border-b border-[var(--color-navy-line)] pb-2 text-[var(--color-cream)]">
              {group.title}
            </h2>
            <ul className="mt-4 space-y-4">
              {group.items.map((item, i) => (
                <li key={i} className="border border-[var(--color-navy-line)] bg-[var(--color-navy)] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-[var(--color-cream)]">{item.title}</h3>
                    <span className={`qs-label border px-2 py-1 ${STATUS[item.status].cls}`}>
                      {STATUS[item.status].label}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-mist)]">{item.detail}</p>
                  {item.where && (
                    <p className="mt-2 qs-label text-[var(--color-slate)]">Nereye: {item.where}</p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-12 border-t border-[var(--color-navy-line)] pt-6 text-xs leading-relaxed text-[var(--color-slate)]">
        <p>
          <span className="text-[var(--color-brass)]">Bekliyor</span> = sizden gerçek bilgi
          gerekiyor · <span className="text-[var(--color-brass-hi)]">Kısmen</span> = başlandı,
          tamamlanması için veri lazım · <span className="text-[var(--color-mist)]">Opsiyonel</span> ={" "}
          nice-to-have, aciliyeti yok.
        </p>
        <p className="mt-2">
          Bilgileri bize ilettiğinizde ilgili maddeleri hemen tamamlarız.
        </p>
      </div>
    </div>
  );
}
