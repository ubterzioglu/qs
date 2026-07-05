import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { createServiceClient } from "@/lib/supabase/server";
import { setRevisionStatusAction } from "@/app/admin/actions";
import { RevisionCommentForm } from "@/components/admin/revision-forms";

const STATUSES = [
  { value: "open", label: "Open" },
  { value: "in_progress", label: "In progress" },
  { value: "done", label: "Done" },
];

export default async function RevisionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  // Basic UUID shape check before querying.
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();

  const db = createServiceClient();
  if (!db) notFound();

  const [req, comments] = await Promise.all([
    db.from("revision_requests").select("*").eq("id", id).maybeSingle(),
    db
      .from("revision_comments")
      .select("*")
      .eq("request_id", id)
      .order("created_at", { ascending: true }),
  ]);
  if (!req.data) notFound();
  const r = req.data;

  return (
    <div className="max-w-3xl">
      <Link href="/admin/revisions" className="qs-label text-[var(--color-slate)] hover:text-[var(--color-mist)]">
        ← Revision requests
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="qs-display text-3xl text-[var(--color-cream)]">{r.title}</h1>
          <p className="qs-label mt-2">
            {r.page && <span className="mr-3">{r.page}</span>}
            priority: {r.priority} · by {r.created_by} · {String(r.created_at).slice(0, 16).replace("T", " ")}
          </p>
        </div>
        <div className="flex gap-2">
          {STATUSES.map((s) => (
            <form key={s.value} action={setRevisionStatusAction.bind(null, r.id, s.value)}>
              <button
                type="submit"
                disabled={r.status === s.value}
                className={`qs-label border px-3 py-2 transition-colors ${
                  r.status === s.value
                    ? "border-[var(--color-brass)] text-[var(--color-brass)]"
                    : "border-[var(--color-navy-line)] text-[var(--color-slate)] hover:text-[var(--color-mist)]"
                }`}
              >
                {s.label}
              </button>
            </form>
          ))}
        </div>
      </div>

      {r.description && (
        <div className="mt-6 whitespace-pre-wrap border border-[var(--color-navy-line)] bg-[var(--color-navy)] p-5 text-sm leading-relaxed text-[var(--color-mist)]">
          {r.description}
        </div>
      )}

      <h2 className="qs-label mt-10">Comments ({comments.data?.length ?? 0})</h2>
      <ul className="mt-3 space-y-3">
        {(comments.data ?? []).map((c) => (
          <li key={c.id} className="border border-[var(--color-navy-line)] bg-[var(--color-navy)] p-4">
            <p className="qs-label">
              {c.author} · {String(c.created_at).slice(0, 16).replace("T", " ")}
            </p>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-[var(--color-cream)]">
              {c.body}
            </p>
          </li>
        ))}
        {(comments.data ?? []).length === 0 && (
          <li className="text-sm text-[var(--color-slate)]">No comments yet.</li>
        )}
      </ul>

      <div className="mt-8">
        <RevisionCommentForm requestId={r.id} />
      </div>
    </div>
  );
}
