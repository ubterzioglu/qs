import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { createServiceClient } from "@/lib/supabase/server";

const FORM_TABLES = [
  { kind: "contact", table: "contact_messages", label: "İletişim mesajları" },
  { kind: "careers", table: "career_applications", label: "Kariyer başvuruları" },
  { kind: "innoventure", table: "innoventure_applications", label: "InnoVenture başvuruları" },
  { kind: "startup-hub", table: "startup_hub_submissions", label: "Girişim Merkezi gönderileri" },
] as const;

async function count(table: string): Promise<number> {
  const db = createServiceClient();
  if (!db) return 0;
  const { count: n } = await db.from(table).select("*", { count: "exact", head: true });
  return n ?? 0;
}

export default async function AdminDashboard() {
  await requireAdmin();

  const [formCounts, serviceCount, postCount, openRevisions] = await Promise.all([
    Promise.all(FORM_TABLES.map(async (f) => ({ ...f, count: await count(f.table) }))),
    count("services"),
    count("blog_posts"),
    (async () => {
      const db = createServiceClient();
      if (!db) return 0;
      const { count: n } = await db
        .from("revision_requests")
        .select("*", { count: "exact", head: true })
        .neq("status", "done");
      return n ?? 0;
    })(),
  ]);

  return (
    <div>
      <p className="qs-label">Genel Bakış</p>
      <h1 className="qs-display mt-2 text-3xl text-[var(--color-cream)]">Yönetim Paneli</h1>

      <h2 className="qs-label mt-10">Form gönderileri</h2>
      <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {formCounts.map((f) => (
          <Link key={f.kind} href={`/admin/submissions/${f.kind}`} className="qs-card block p-6">
            <p className="qs-display text-4xl text-[var(--color-brass)]">{f.count}</p>
            <p className="mt-2 text-sm text-[var(--color-mist)]">{f.label}</p>
          </Link>
        ))}
      </div>

      <h2 className="qs-label mt-10">İçerik ve iş akışı</h2>
      <div className="mt-3 grid gap-4 sm:grid-cols-3">
        <Link href="/admin/services" className="qs-card block p-6">
          <p className="qs-display text-4xl text-[var(--color-cream)]">{serviceCount}</p>
          <p className="mt-2 text-sm text-[var(--color-mist)]">Hizmetler (dikeyler)</p>
        </Link>
        <Link href="/admin/insights" className="qs-card block p-6">
          <p className="qs-display text-4xl text-[var(--color-cream)]">{postCount}</p>
          <p className="mt-2 text-sm text-[var(--color-mist)]">İçgörü yazıları (taslak dahil)</p>
        </Link>
        <Link href="/admin/revisions" className="qs-card block p-6">
          <p className="qs-display text-4xl text-[var(--color-brass)]">{openRevisions}</p>
          <p className="mt-2 text-sm text-[var(--color-mist)]">Açık revizyon isteği</p>
        </Link>
      </div>

      <p className="mt-10 text-xs text-[var(--color-slate)]">
        İçerik değişiklikleri ~60 saniye içinde sitede yayına girer. Veritabanına
        ulaşılamazsa site yerleşik içeriğe döner.
      </p>
    </div>
  );
}
