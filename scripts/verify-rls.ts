/**
 * Security smoke test for the Supabase setup. Run after schema/seed changes:
 *
 *   pnpm tsx scripts/verify-rls.ts
 *
 * Verifies: admin sign-in works; anon can read content; anon CANNOT read form
 * tables; anon CAN insert into form tables; anon CANNOT update content.
 */
import { createClient } from "@supabase/supabase-js";
import { loadEnvLocal, requireEnv } from "./env";

loadEnvLocal();

const anon = createClient(
  requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
  requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  { auth: { persistSession: false } },
);

let failures = 0;
function check(label: string, ok: boolean, detail: string) {
  console.log(`${ok ? "✔" : "✘"} ${label}: ${detail}`);
  if (!ok) failures++;
}

async function run() {
  const si = await anon.auth.signInWithPassword({
    email: requireEnv("ADMIN_SEED_EMAIL"),
    password: requireEnv("ADMIN_SEED_PASSWORD"),
  });
  check("admin sign-in", !si.error, si.error?.message ?? `ok (${si.data.user?.email})`);
  await anon.auth.signOut();

  const svc = await anon.from("services").select("slug");
  check("anon reads services", !svc.error && (svc.data?.length ?? 0) > 0, svc.error?.message ?? `${svc.data?.length} rows`);

  const posts = await anon.from("blog_posts").select("slug,status");
  const allPublished = (posts.data ?? []).every((p) => p.status === "published");
  check("anon reads only published posts", !posts.error && allPublished, posts.error?.message ?? `${posts.data?.length} rows, allPublished=${allPublished}`);

  const cm = await anon.from("contact_messages").select("id").limit(1);
  const blocked = Boolean(cm.error) || (cm.data?.length ?? 0) === 0;
  check("anon CANNOT read contact_messages", blocked, cm.error ? `error ${cm.error.code}` : `${cm.data?.length ?? 0} rows visible`);

  const ins = await anon.from("contact_messages").insert({
    first_name: "RLS",
    last_name: "Probe",
    email: "rls-probe@test.dev",
    message: "verification probe — safe to delete",
  });
  check("anon CAN insert contact message", !ins.error, ins.error?.message ?? "ok");

  const upd = await anon
    .from("services")
    .update({ code: "HAX" })
    .eq("slug", "legal-compliance")
    .select();
  const updBlocked = Boolean(upd.error) || (upd.data?.length ?? 0) === 0;
  check("anon CANNOT update content", updBlocked, upd.error ? "error (blocked)" : `${upd.data?.length ?? 0} rows changed`);

  console.log(failures === 0 ? "\nAll security checks passed ✔" : `\n${failures} CHECK(S) FAILED ✘`);
  process.exit(failures === 0 ? 0 : 1);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
