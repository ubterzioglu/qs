import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { createServiceClient } from "@/lib/supabase/server";
import { SUBMISSION_KINDS, isSubmissionKind } from "@/lib/admin/submissions";

export default async function SubmissionsPage({
  params,
}: {
  params: Promise<{ kind: string }>;
}) {
  await requireAdmin();
  const { kind } = await params;
  if (!isSubmissionKind(kind)) notFound();
  const def = SUBMISSION_KINDS[kind];

  const db = createServiceClient();
  const { data: rows, error } = db
    ? await db
        .from(def.table)
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200)
    : { data: null, error: { message: "Service key not configured" } };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="qs-label">Submissions</p>
          <h1 className="qs-display mt-2 text-3xl text-[var(--color-cream)]">{def.label}</h1>
        </div>
        <a href={`/admin/export/${kind}`} className="qs-btn text-xs">
          Download CSV
        </a>
      </div>

      <nav className="mt-6 flex flex-wrap gap-3" aria-label="Submission kinds">
        {Object.entries(SUBMISSION_KINDS).map(([k, v]) => (
          <Link
            key={k}
            href={`/admin/submissions/${k}`}
            className={`qs-label ${k === kind ? "text-[var(--color-brass)]" : "text-[var(--color-slate)] hover:text-[var(--color-mist)]"}`}
          >
            {v.label}
          </Link>
        ))}
      </nav>

      {error && (
        <p className="mt-8 border border-[var(--color-brass-deep)] px-4 py-3 text-sm text-[var(--color-brass-hi)]">
          {error.message}
        </p>
      )}

      {rows && rows.length === 0 && (
        <p className="mt-8 text-sm text-[var(--color-slate)]">No submissions yet.</p>
      )}

      {rows && rows.length > 0 && (
        <div className="mt-8 overflow-x-auto border border-[var(--color-navy-line)]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--color-navy)]">
              <tr>
                {def.columns.map((c) => (
                  <th key={c} className="qs-label whitespace-nowrap px-4 py-3 font-normal">
                    {c.replaceAll("_", " ")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row: Record<string, unknown>) => (
                <tr key={String(row.id)} className="border-t border-[var(--color-navy-line)] align-top">
                  {def.columns.map((c) => (
                    <td key={c} className="max-w-xs whitespace-pre-wrap break-words px-4 py-3 text-[var(--color-mist)]">
                      {formatCell(row[c as string])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-4 text-xs text-[var(--color-slate)]">
        Showing the latest {Math.min(rows?.length ?? 0, 200)} entries. CSV export
        includes all rows (paginated).
      </p>
    </div>
  );
}

function formatCell(v: unknown): string {
  if (v === null || v === undefined) return "—";
  if (typeof v === "boolean") return v ? "yes" : "no";
  if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}T/.test(v)) {
    return v.slice(0, 16).replace("T", " ");
  }
  return String(v);
}
