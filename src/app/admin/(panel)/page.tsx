import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { createServiceClient } from "@/lib/supabase/server";

const FORM_TABLES = [
  { kind: "contact", table: "contact_messages", label: "Contact messages" },
  { kind: "careers", table: "career_applications", label: "Career applications" },
  { kind: "innoventure", table: "innoventure_applications", label: "InnoVenture applications" },
  { kind: "startup-hub", table: "startup_hub_submissions", label: "Start-up Hub submissions" },
] as const;

async function count(table: string): Promise<number> {
  const db = createServiceClient();
  if (!db) return 0;
  const { count: n } = await db.from(table).select("*", { count: "exact", head: true });
  return n ?? 0;
}

export default async function AdminDashboard() {
  await requireAdmin();

  const [formCounts, serviceCount, postCount] = await Promise.all([
    Promise.all(FORM_TABLES.map(async (f) => ({ ...f, count: await count(f.table) }))),
    count("services"),
    count("blog_posts"),
  ]);

  return (
    <div>
      <p className="qs-label">Dashboard</p>
      <h1 className="qs-display mt-2 text-3xl text-[var(--color-cream)]">Overview</h1>

      <h2 className="qs-label mt-10">Form submissions</h2>
      <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {formCounts.map((f) => (
          <Link
            key={f.kind}
            href={`/admin/submissions/${f.kind}`}
            className="qs-card block p-6"
          >
            <p className="qs-display text-4xl text-[var(--color-brass)]">{f.count}</p>
            <p className="mt-2 text-sm text-[var(--color-mist)]">{f.label}</p>
          </Link>
        ))}
      </div>

      <h2 className="qs-label mt-10">Content</h2>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        <Link href="/admin/services" className="qs-card block p-6">
          <p className="qs-display text-4xl text-[var(--color-cream)]">{serviceCount}</p>
          <p className="mt-2 text-sm text-[var(--color-mist)]">Services (verticals)</p>
        </Link>
        <Link href="/admin/insights" className="qs-card block p-6">
          <p className="qs-display text-4xl text-[var(--color-cream)]">{postCount}</p>
          <p className="mt-2 text-sm text-[var(--color-mist)]">Insight posts (incl. drafts)</p>
        </Link>
      </div>

      <p className="mt-10 text-xs text-[var(--color-slate)]">
        Content edits go live within ~60 seconds (ISR). Public pages fall back to
        the built-in seed if the database is unreachable.
      </p>
    </div>
  );
}
