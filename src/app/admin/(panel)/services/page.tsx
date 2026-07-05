import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { createServiceClient } from "@/lib/supabase/server";

export default async function AdminServicesList() {
  await requireAdmin();
  const db = createServiceClient();
  const { data: rows } = db
    ? await db.from("services").select("slug,code,ord,title").order("ord")
    : { data: null };

  return (
    <div>
      <p className="qs-label">Content</p>
      <h1 className="qs-display mt-2 text-3xl text-[var(--color-cream)]">Services</h1>

      <div className="mt-8 grid gap-px border border-[var(--color-navy-line)] bg-[var(--color-navy-line)]">
        {(rows ?? []).map((r) => (
          <Link
            key={r.slug}
            href={`/admin/services/${r.slug}`}
            className="flex items-center justify-between bg-[var(--color-navy)] px-5 py-4 transition-colors hover:bg-[var(--color-navy-2)]"
          >
            <span className="flex items-center gap-4">
              <span className="qs-label">{String(r.ord).padStart(2, "0")} · {r.code}</span>
              <span className="text-[var(--color-cream)]">
                {(r.title as { en?: string })?.en ?? r.slug}
              </span>
            </span>
            <span className="qs-label text-[var(--color-brass)]">Edit →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
