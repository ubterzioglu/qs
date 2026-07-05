import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { createServiceClient } from "@/lib/supabase/server";
import { NewRevisionForm } from "@/components/admin/revision-forms";

const STATUS_LABEL: Record<string, string> = {
  open: "Open",
  in_progress: "In progress",
  done: "Done",
};
const STATUS_COLOR: Record<string, string> = {
  open: "text-[var(--color-brass)]",
  in_progress: "text-[var(--color-brass-hi)]",
  done: "text-[var(--color-slate)]",
};

export default async function RevisionsPage() {
  await requireAdmin();
  const db = createServiceClient();

  const { data: rows } = db
    ? await db
        .from("revision_requests")
        .select("id,title,page,priority,status,created_by,created_at")
        .order("created_at", { ascending: false })
        .limit(200)
    : { data: null };

  return (
    <div>
      <p className="qs-label">Workflow</p>
      <h1 className="qs-display mt-2 text-3xl text-[var(--color-cream)]">Revision requests</h1>

      <div className="mt-8">
        <NewRevisionForm />
      </div>

      <div className="mt-10 grid gap-px border border-[var(--color-navy-line)] bg-[var(--color-navy-line)]">
        {(rows ?? []).length === 0 && (
          <p className="bg-[var(--color-navy)] px-5 py-6 text-sm text-[var(--color-slate)]">
            No revision requests yet — create the first one above.
          </p>
        )}
        {(rows ?? []).map((r) => (
          <Link
            key={r.id}
            href={`/admin/revisions/${r.id}`}
            className="flex flex-wrap items-center justify-between gap-3 bg-[var(--color-navy)] px-5 py-4 transition-colors hover:bg-[var(--color-navy-2)]"
          >
            <span className="flex min-w-0 items-center gap-4">
              <span className={`qs-label shrink-0 ${STATUS_COLOR[r.status] ?? ""}`}>
                {STATUS_LABEL[r.status] ?? r.status}
              </span>
              {r.priority === "high" && (
                <span className="qs-label shrink-0 text-red-400">High</span>
              )}
              <span className="truncate text-[var(--color-cream)]">{r.title}</span>
            </span>
            <span className="qs-label">
              {r.page && <span className="mr-3 text-[var(--color-mist)]">{r.page}</span>}
              {String(r.created_at).slice(0, 10)} · {r.created_by}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
