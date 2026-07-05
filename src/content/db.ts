/**
 * Supabase-backed content readers. Server-only.
 *
 * Each reader returns `null` on error or when the table is empty so the
 * accessor layer (src/content/index.ts) can fall back to the static seed —
 * the site must never break because the DB is unreachable or unseeded.
 */
import { createClient } from "@supabase/supabase-js";
import { env, isSupabaseConfigured } from "@/lib/env";
import type {
  BlogPost,
  Localized,
  NetworkBrand,
  OfficeLocation,
  Principle,
  Service,
  ServiceCode,
  SiteSettings,
} from "./types";

/** Anonymous read-only client (public content honors RLS). */
function anonClient() {
  if (!isSupabaseConfigured) return null;
  return createClient(env.supabaseUrl, env.supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

type Row = Record<string, unknown>;
const loc = (v: unknown): Localized => v as Localized;

export async function dbServices(): Promise<Service[] | null> {
  const supabase = anonClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("ord", { ascending: true });
  if (error || !data || data.length === 0) return null;
  return data.map((r: Row) => ({
    slug: r.slug as string,
    code: r.code as ServiceCode,
    order: r.ord as number,
    title: loc(r.title),
    description: loc(r.description),
    quote: loc(r.quote),
    subtitle: r.subtitle ? loc(r.subtitle) : undefined,
    image: r.image as string,
    imageAlt: loc(r.image_alt),
  }));
}

export async function dbBlogPosts(): Promise<BlogPost[] | null> {
  const supabase = anonClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  // Only fall back to seed on a real error. An empty result is a legitimate
  // state (e.g. every post unpublished) — return [] so seed posts don't resurface.
  if (error || !data) return null;
  return data.map((r: Row) => ({
    slug: r.slug as string,
    status: r.status as BlogPost["status"],
    title: loc(r.title),
    excerpt: loc(r.excerpt),
    body: loc(r.body),
    cover: (r.cover as string) ?? undefined,
    author: r.author as string,
    publishedAt: r.published_at as string,
    readTimeMinutes: r.read_time_minutes as number,
  }));
}

export async function dbNetworkBrands(): Promise<NetworkBrand[] | null> {
  const supabase = anonClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("network_brands")
    .select("*")
    .order("ord", { ascending: true });
  if (error || !data || data.length === 0) return null;
  return data.map((r: Row) => ({
    name: r.name as string,
    description: loc(r.description),
    url: (r.url as string) ?? undefined,
  }));
}

export async function dbPortfolioItems(): Promise<import("./types").PortfolioItem[] | null> {
  const supabase = anonClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("portfolio_items")
    .select("*")
    .eq("is_public", true)
    .order("ord", { ascending: true });
  if (error || !data || data.length === 0) return null;
  return data.map((r: Row) => ({
    slug: r.slug as string,
    name: r.name as string,
    category: r.category as import("./types").PortfolioCategory,
    description: loc(r.description),
    logo: (r.logo as string) ?? undefined,
    url: (r.url as string) ?? undefined,
    order: r.ord as number,
    isPublic: r.is_public as boolean,
  }));
}

export async function dbPrinciples(): Promise<Principle[] | null> {
  const supabase = anonClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("principles")
    .select("*")
    .order("ord", { ascending: true });
  if (error || !data || data.length === 0) return null;
  return data.map((r: Row) => ({
    title: loc(r.title),
    description: loc(r.description),
  }));
}

export async function dbSiteSettings(): Promise<SiteSettings | null> {
  const supabase = anonClient();
  if (!supabase) return null;
  const [settings, locations] = await Promise.all([
    supabase.from("site_settings").select("key,value").eq("key", "site").maybeSingle(),
    supabase.from("locations").select("*").order("ord", { ascending: true }),
  ]);
  if (settings.error || !settings.data || locations.error || !locations.data?.length) {
    return null;
  }
  const site = settings.data.value as { brandName?: string; contactEmail?: string };
  const locs: OfficeLocation[] = locations.data.map((r: Row) => ({
    city: r.city as string,
    address: r.address as string,
    phone: r.phone as string,
    phoneLabel: r.phone_label as string,
    map: (r.map as string) ?? undefined,
  }));
  return {
    brandName: site.brandName ?? "Qualtron Sinclair",
    contactEmail: site.contactEmail ?? "contact@qualtronsinclair.com",
    locations: locs,
  };
}

export async function dbSettingValue<T>(key: string): Promise<T | null> {
  const supabase = anonClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", key)
    .maybeSingle();
  if (error || !data) return null;
  return data.value as T;
}
