/**
 * Seed the Supabase content tables from the static seed (src/content/seed.ts).
 * Idempotent: upserts by primary key; safe to re-run. Uses the service-role key
 * (bypasses RLS) — run locally/CI only, never ship to the client.
 *
 *   pnpm seed
 */
import { createClient } from "@supabase/supabase-js";
import { loadEnvLocal, requireEnv } from "../scripts/env";
import {
  services,
  blogPosts,
  networkBrands,
  principles,
  portfolioItems,
  siteSettings,
  whoWeAre,
  leadershipIntro,
} from "../src/content/seed";

loadEnvLocal();

const supabase = createClient(
  requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
  requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
  { auth: { persistSession: false, autoRefreshToken: false } },
);

async function run() {
  console.log("Seeding services…");
  {
    const rows = services.map((s) => ({
      slug: s.slug,
      code: s.code,
      ord: s.order,
      title: s.title,
      description: s.description,
      quote: s.quote,
      subtitle: s.subtitle ?? null,
      image: s.image,
      image_alt: s.imageAlt,
    }));
    const { error } = await supabase.from("services").upsert(rows);
    if (error) throw new Error(`services: ${error.message}`);
    console.log(`  ${rows.length} upserted`);
  }

  console.log("Seeding blog_posts…");
  {
    const rows = blogPosts.map((p) => ({
      slug: p.slug,
      status: p.status,
      title: p.title,
      excerpt: p.excerpt,
      body: p.body,
      cover: p.cover ?? null,
      author: p.author,
      published_at: p.publishedAt,
      read_time_minutes: p.readTimeMinutes,
    }));
    const { error } = await supabase.from("blog_posts").upsert(rows);
    if (error) throw new Error(`blog_posts: ${error.message}`);
    console.log(`  ${rows.length} upserted`);
  }

  console.log("Seeding network_brands…");
  {
    const rows = networkBrands.map((b, i) => ({
      name: b.name,
      description: b.description,
      url: b.url ?? null,
      ord: i,
    }));
    const { error } = await supabase
      .from("network_brands")
      .upsert(rows, { onConflict: "name" });
    if (error) throw new Error(`network_brands: ${error.message}`);
    console.log(`  ${rows.length} upserted`);
  }

  console.log("Seeding portfolio_items…");
  {
    const rows = portfolioItems.map((p) => ({
      slug: p.slug,
      name: p.name,
      category: p.category,
      description: p.description,
      logo: p.logo ?? null,
      url: p.url ?? null,
      ord: p.order,
      is_public: p.isPublic,
    }));
    const { error } = await supabase.from("portfolio_items").upsert(rows);
    if (error) throw new Error(`portfolio_items: ${error.message}`);
    console.log(`  ${rows.length} upserted`);
  }

  console.log("Seeding principles…");
  {
    // No natural key — replace wholesale for idempotency.
    const del = await supabase.from("principles").delete().gte("id", 0);
    if (del.error) throw new Error(`principles delete: ${del.error.message}`);
    const rows = principles.map((p, i) => ({
      title: p.title,
      description: p.description,
      ord: i,
    }));
    const { error } = await supabase.from("principles").insert(rows);
    if (error) throw new Error(`principles: ${error.message}`);
    console.log(`  ${rows.length} inserted`);
  }

  console.log("Seeding locations…");
  {
    const del = await supabase.from("locations").delete().gte("id", 0);
    if (del.error) throw new Error(`locations delete: ${del.error.message}`);
    const rows = siteSettings.locations.map((l, i) => ({
      city: l.city,
      address: l.address,
      phone: l.phone,
      phone_label: l.phoneLabel,
      map: l.map ?? null,
      ord: i,
    }));
    const { error } = await supabase.from("locations").insert(rows);
    if (error) throw new Error(`locations: ${error.message}`);
    console.log(`  ${rows.length} inserted`);
  }

  console.log("Seeding site_settings…");
  {
    const rows = [
      {
        key: "site",
        value: {
          brandName: siteSettings.brandName,
          contactEmail: siteSettings.contactEmail,
        },
      },
      { key: "who_we_are", value: whoWeAre },
      { key: "leadership_intro", value: leadershipIntro },
    ];
    const { error } = await supabase.from("site_settings").upsert(rows);
    if (error) throw new Error(`site_settings: ${error.message}`);
    console.log(`  ${rows.length} upserted`);
  }

  console.log("Seed complete ✔");
}

run().catch((err) => {
  console.error("Seed failed:", err.message ?? err);
  process.exit(1);
});
