/**
 * Content accessor — the ONLY module pages import for content.
 *
 * Today it returns static seed data. When Supabase env is present, these
 * functions become the place to swap in DB reads (src/content/db.ts) without
 * touching any page. Async by design so that swap is invisible to callers.
 */
import {
  blogPosts,
  leadershipIntro,
  networkBrands,
  principles,
  services,
  siteSettings,
  whoWeAre,
} from "./seed";
import type { BlogPost, Service } from "./types";
import type { Locale } from "@/i18n/routing";

export async function getServices(): Promise<Service[]> {
  return [...services].sort((a, b) => a.order - b.order);
}

export async function getService(slug: string): Promise<Service | null> {
  return services.find((s) => s.slug === slug) ?? null;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return [...blogPosts]
    .filter((p) => p.status === "published")
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const post = blogPosts.find((p) => p.slug === slug);
  return post && post.status === "published" ? post : null;
}

export async function getNetworkBrands() {
  return networkBrands;
}

export async function getPrinciples() {
  return principles;
}

export async function getSiteSettings() {
  return siteSettings;
}

export function getWhoWeAre(locale: Locale): string[] {
  return whoWeAre[locale] ?? whoWeAre.en;
}

export function getLeadershipIntro(locale: Locale): string {
  return leadershipIntro[locale] ?? leadershipIntro.en;
}

export type { Service, BlogPost } from "./types";
