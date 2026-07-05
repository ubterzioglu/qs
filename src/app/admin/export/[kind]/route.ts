/**
 * CSV export of a submission table. Admin-only (guarded), service-role read.
 * GET /admin/export/[kind] -> text/csv attachment.
 */
import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin/auth";
import { createServiceClient } from "@/lib/supabase/server";
import { SUBMISSION_KINDS, isSubmissionKind } from "@/lib/admin/submissions";

export const dynamic = "force-dynamic";

function csvEscape(v: unknown): string {
  if (v === null || v === undefined) return "";
  let s = typeof v === "boolean" ? (v ? "yes" : "no") : String(v);
  // Formula-injection neutralization: a leading = + - @ (or tab/CR) is treated as
  // a formula by Excel/Sheets. Values are anonymously writable via the public
  // forms, so prefix a single quote to force text. (OWASP CSV injection guidance.)
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return /[",\n\r]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ kind: string }> },
) {
  const user = await getAdminUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  const { kind } = await params;
  if (!isSubmissionKind(kind)) return new NextResponse("Not found", { status: 404 });
  const def = SUBMISSION_KINDS[kind];

  const db = createServiceClient();
  if (!db) return new NextResponse("Service key not configured", { status: 500 });

  // Paginate so the export is truly complete — a single select() is capped by
  // PostgREST's db-max-rows (Supabase default ~1000) and would silently truncate.
  const PAGE = 1000;
  const all: Record<string, unknown>[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from(def.table)
      .select("*")
      .order("created_at", { ascending: false })
      .range(from, from + PAGE - 1);
    if (error) return new NextResponse(error.message, { status: 500 });
    if (!data || data.length === 0) break;
    all.push(...data);
    if (data.length < PAGE) break;
  }

  const header = def.columns.join(",");
  const lines = all.map((row: Record<string, unknown>) =>
    def.columns.map((c) => csvEscape(row[c as string])).join(","),
  );
  // BOM so Excel opens UTF-8 (Turkish characters) correctly.
  const csv = "﻿" + [header, ...lines].join("\r\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${def.table}-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
