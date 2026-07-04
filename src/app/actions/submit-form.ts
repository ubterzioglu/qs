"use server";

/**
 * Single server action for all public forms. Validates at the trust boundary
 * with Zod, then inserts into the matching Supabase table via the anon client
 * (RLS allows INSERT-only on form tables). When Supabase is not configured,
 * it logs and returns success so the site is demoable without a database.
 */
import { createServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import {
  contactSchema,
  careersSchema,
  innoventureSchema,
  startupHubSchema,
  type FormKind,
} from "@/lib/schemas";

export type FormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: Record<string, string> };

const TABLES: Record<FormKind, string> = {
  contact: "contact_messages",
  careers: "career_applications",
  innoventure: "innoventure_applications",
  "startup-hub": "startup_hub_submissions",
};

function parse(kind: FormKind, raw: Record<string, unknown>) {
  switch (kind) {
    case "contact":
      return contactSchema.safeParse(raw);
    case "careers":
      return careersSchema.safeParse(raw);
    case "innoventure":
      return innoventureSchema.safeParse(raw);
    case "startup-hub":
      return startupHubSchema.safeParse(raw);
  }
}

export async function submitForm(
  kind: FormKind,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const raw: Record<string, unknown> = Object.fromEntries(formData.entries());
  // Checkboxes arrive as "on"/absent — normalize consent to boolean.
  if ("consent" in raw) raw.consent = raw.consent === "on" || raw.consent === "true";

  const result = parse(kind, raw);
  if (!result || !result.success) {
    const fieldErrors: Record<string, string> = {};
    result?.error.issues.forEach((i) => {
      const key = String(i.path[0] ?? "");
      if (key && !fieldErrors[key]) fieldErrors[key] = i.message;
    });
    return { status: "error", message: "Please correct the highlighted fields.", fieldErrors };
  }

  // No DB configured yet → accept and log (demo mode).
  if (!isSupabaseConfigured) {
    console.info(`[form:${kind}] (no DB configured) submission accepted`, result.data);
    return { status: "success" };
  }

  const supabase = await createServerClient();
  if (!supabase) return { status: "success" };

  // result.data is a union of the four validated shapes; the target table is
  // chosen dynamically, so widen to a plain row for the insert.
  const row = result.data as Record<string, unknown>;
  const { error } = await supabase.from(TABLES[kind]).insert(row);
  if (error) {
    console.error(`[form:${kind}] insert failed`, error.message);
    return { status: "error", message: "Something went wrong. Please try again." };
  }
  return { status: "success" };
}
