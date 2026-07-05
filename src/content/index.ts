/**
 * Content accessor — the ONLY module pages import for content.
 *
 * Reads from Supabase when configured (CMS-edited content), otherwise — or on
 * any DB error/empty table — falls back to the static seed so the site always
 * renders. Async by design so the source is invisible to callers.
 */
import {
  blogPosts,
  leadershipIntro,
  networkBrands,
  portfolioItems,
  principles,
  services,
  siteSettings,
  whoWeAre,
} from "./seed";
import {
  dbBlogPosts,
  dbNetworkBrands,
  dbPortfolioItems,
  dbPrinciples,
  dbServices,
  dbSettingValue,
  dbSiteSettings,
} from "./db";
import type { BlogPost, Service } from "./types";
import type { Locale } from "@/i18n/routing";

export async function getServices(): Promise<Service[]> {
  const db = await dbServices();
  return db ?? [...services].sort((a, b) => a.order - b.order);
}

export async function getService(slug: string): Promise<Service | null> {
  const all = await getServices();
  return all.find((s) => s.slug === slug) ?? null;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const db = await dbBlogPosts();
  if (db) return db;
  return [...blogPosts]
    .filter((p) => p.status === "published")
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const all = await getBlogPosts();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getNetworkBrands() {
  const db = await dbNetworkBrands();
  return db ?? networkBrands;
}

export async function getPortfolioItems() {
  const db = await dbPortfolioItems();
  return (db ?? portfolioItems).filter((p) => p.isPublic).sort((a, b) => a.order - b.order);
}

export async function getPrinciples() {
  const db = await dbPrinciples();
  return db ?? principles;
}

export async function getSiteSettings() {
  const db = await dbSiteSettings();
  return db ?? siteSettings;
}

export async function getWhoWeAre(locale: Locale): Promise<string[]> {
  const db = await dbSettingValue<Record<string, string[]>>("who_we_are");
  const source = db ?? whoWeAre;
  return source[locale] ?? source.en;
}

export async function getLeadershipIntro(locale: Locale): Promise<string> {
  const db = await dbSettingValue<Record<string, string>>("leadership_intro");
  const source = db ?? leadershipIntro;
  return source[locale] ?? source.en;
}

export type { Service, BlogPost } from "./types";
