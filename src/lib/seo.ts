/**
 * Shared SEO/GEO constants and helpers.
 * Single source of truth for descriptions, keywords, and structured-data facts
 * so pages, sitemap, JSON-LD, and llms.txt stay consistent.
 */
import { env } from "@/lib/env";

export const SITE = {
  name: "Qualtron Sinclair",
  legalName: "Qualtron Sinclair",
  url: env.siteUrl,
  tagline: {
    en: "We design the structure behind growth.",
    tr: "Büyümenin arkasındaki yapıyı tasarlıyoruz.",
  },
  description: {
    en: "Qualtron Sinclair is a multi-vertical growth architect and expansion partner for corporations entering the MENA markets — the UAE, Qatar and KSA in particular. We deliver legal & compliance, capital structuring, digital platforms, technology, talent and physical infrastructure end to end.",
    tr: "Qualtron Sinclair, MENA pazarlarına — özellikle BAE, Katar ve KSA'ya — giren kurumlar için çok dikeyli bir büyüme mimarı ve genişleme partneridir. Hukuk ve uyum, sermaye yapılandırma, dijital platformlar, teknoloji, yetenek ve fiziksel altyapıyı uçtan uca sunuyoruz.",
  },
  keywords: [
    "Qualtron Sinclair",
    "MENA market entry",
    "MENA expansion",
    "business advisory MENA",
    "company formation UAE",
    "company formation Qatar",
    "capital structuring",
    "fundraising MENA",
    "growth architect",
    "GCC expansion",
    "Dubai business setup",
    "Doha business setup",
    "regional expansion partner",
  ],
  sameAs: [] as string[], // add LinkedIn / X profile URLs when available
  email: "contact@qualtronsinclair.com",
  offices: [
    { city: "Doha", country: "Qatar", region: "QA", locality: "Doha" },
    { city: "Dubai", country: "United Arab Emirates", region: "AE", locality: "Dubai" },
    { city: "İstanbul", country: "Türkiye", region: "TR", locality: "İstanbul" },
    { city: "Delaware", country: "United States", region: "US-DE", locality: "Delaware" },
  ],
  areaServed: ["MENA", "United Arab Emirates", "Qatar", "Saudi Arabia", "Türkiye", "GCC"],
};

/** Absolute URL for a locale-aware path. EN has no prefix; TR is /tr/... */
export function absoluteUrl(path: string, locale: "en" | "tr" = "en"): string {
  const base = SITE.url.replace(/\/$/, "");
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return locale === "tr" ? `${base}/tr${clean}` : `${base}${clean || "/"}`;
}

/** hreflang alternates block for a given bare path (used in per-page metadata). */
export function altLanguages(path: string) {
  return {
    en: absoluteUrl(path, "en"),
    tr: absoluteUrl(path, "tr"),
    "x-default": absoluteUrl(path, "en"),
  };
}

/**
 * Build per-page Metadata with a correct canonical + hreflang alternates + OG,
 * so every route has a unique, non-duplicate SEO surface.
 */
export function pageMetadata(opts: {
  locale: "en" | "tr";
  path: string; // bare path, e.g. "/portfolio"
  title: string;
  description: string;
  image?: string; // optional page-specific OG image (absolute or /media path)
}) {
  const { locale, path, title, description, image } = opts;
  const canonical = locale === "tr" ? `/tr${path === "/" ? "" : path}` : path;
  return {
    title,
    description,
    alternates: { canonical, languages: altLanguages(path) },
    openGraph: {
      title: `${title} · ${SITE.name}`,
      description,
      url: canonical,
      type: "website" as const,
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: { card: "summary_large_image" as const, title, description },
  };
}
