import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { createServiceClient } from "@/lib/supabase/server";

export default async function AdminInsightsList() {
  await requireAdmin();
  const db = createServiceClient();
  const { data: rows } = db
    ? await db
        .from("blog_posts")
        .select("slug,status,title,published_at,author")
        .order("published_at", { ascending: false })
    : { data: null };

  return (
    <div>
      <p className="qs-label">Content</p>
      <h1 className="qs-display mt-2 text-3xl text-[var(--color-cream)]">Insights</h1>

      <div className="mt-8 grid gap-px border border-[var(--color-navy-line)] bg-[var(--color-navy-line)]">
        {(rows ?? []).map((r) => (
          <Link
            key={r.slug}
            href={`/admin/insights/${r.slug}`}
            className="flex flex-wrap items-center justify-between gap-3 bg-[var(--color-navy)] px-5 py-4 transition-colors hover:bg-[var(--color-navy-2)]"
          >
            <span className="flex items-center gap-4">
              <span className={`qs-label ${r.status === "draft" ? "text-[var(--color-slate)]" : "text-[var(--color-brass)]"}`}>
                {r.status}
              </span>
              <span className="text-[var(--color-cream)]">
                {(r.title as { en?: string })?.en ?? r.slug}
              </span>
            </span>
            <span className="qs-label">{r.published_at} · {r.author}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
