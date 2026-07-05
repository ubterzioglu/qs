/**
 * E2E auth check against a running dev/prod server (default http://localhost:3350).
 *
 *   pnpm tsx scripts/verify-admin-e2e.ts [baseUrl]
 *
 * Signs in with ADMIN_SEED_* credentials, encodes the session in the
 * @supabase/ssr cookie format (base64url JSON, chunked like the browser client),
 * then requests /admin and asserts the dashboard renders (not a redirect).
 */
import { createClient } from "@supabase/supabase-js";
import { loadEnvLocal, requireEnv } from "./env";

loadEnvLocal();

const base = process.argv[2] ?? "http://localhost:3350";
const url = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
const projectRef = new URL(url).hostname.split(".")[0];

const supabase = createClient(url, requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"), {
  auth: { persistSession: false },
});

function b64url(s: string): string {
  return Buffer.from(s, "utf8").toString("base64url");
}

/** Chunk exactly like @supabase/ssr (max ~3180 chars per cookie). */
function sessionCookies(sessionJson: string): string {
  const value = "base64-" + b64url(sessionJson);
  const name = `sb-${projectRef}-auth-token`;
  const MAX = 3180;
  if (value.length <= MAX) return `${name}=${value}`;
  const parts: string[] = [];
  for (let i = 0; i * MAX < value.length; i++) {
    parts.push(`${name}.${i}=${value.slice(i * MAX, (i + 1) * MAX)}`);
  }
  return parts.join("; ");
}

async function run() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: requireEnv("ADMIN_SEED_EMAIL"),
    password: requireEnv("ADMIN_SEED_PASSWORD"),
  });
  if (error || !data.session) {
    console.error("✘ sign-in failed:", error?.message);
    process.exit(1);
  }
  console.log("✔ sign-in ok:", data.user?.email);

  const cookie = sessionCookies(JSON.stringify(data.session));

  const res = await fetch(`${base}/admin`, {
    headers: { cookie },
    redirect: "manual",
  });
  const html = res.status === 200 ? await res.text() : "";
  const isDashboard = html.includes("Overview") && html.includes("Form submissions");

  console.log(`${res.status === 200 ? "✔" : "✘"} GET /admin with session -> HTTP ${res.status}`);
  console.log(`${isDashboard ? "✔" : "✘"} dashboard content rendered: ${isDashboard}`);

  // Also verify CSV export honors the session.
  const csv = await fetch(`${base}/admin/export/contact`, {
    headers: { cookie },
    redirect: "manual",
  });
  console.log(`${csv.status === 200 ? "✔" : "✘"} GET /admin/export/contact with session -> HTTP ${csv.status}`);

  await supabase.auth.signOut();
  const ok = res.status === 200 && isDashboard && csv.status === 200;
  console.log(ok ? "\nAdmin E2E passed ✔" : "\nAdmin E2E FAILED ✘");
  process.exit(ok ? 0 : 1);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
