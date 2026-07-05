/**
 * One-time bootstrap: create (or update) the admin auth user in Supabase.
 * Reads ADMIN_SEED_EMAIL / ADMIN_SEED_PASSWORD from .env.local.
 * Idempotent: if the user exists, resets the password instead.
 *
 *   pnpm tsx scripts/create-admin.ts
 */
import { createClient } from "@supabase/supabase-js";
import { loadEnvLocal, requireEnv } from "./env";

loadEnvLocal();

const email = requireEnv("ADMIN_SEED_EMAIL").toLowerCase();
const password = requireEnv("ADMIN_SEED_PASSWORD");

const supabase = createClient(
  requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
  requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
  { auth: { persistSession: false, autoRefreshToken: false } },
);

async function run() {
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (!error) {
    console.log(`Admin user created: ${data.user?.email} (${data.user?.id})`);
    return;
  }

  // Already exists -> find and update the password.
  if (/already.*registered|already exists/i.test(error.message)) {
    const list = await supabase.auth.admin.listUsers({ page: 1, perPage: 200 });
    if (list.error) throw list.error;
    const existing = list.data.users.find(
      (u) => u.email?.toLowerCase() === email,
    );
    if (!existing) throw new Error("User reported existing but not found");
    const upd = await supabase.auth.admin.updateUserById(existing.id, {
      password,
      email_confirm: true,
    });
    if (upd.error) throw upd.error;
    console.log(`Admin user existed — password updated: ${email}`);
    return;
  }

  throw error;
}

run().catch((err) => {
  console.error("create-admin failed:", err.message ?? err);
  process.exit(1);
});
