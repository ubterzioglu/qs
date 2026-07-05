import type { MetadataRoute } from "next";
import { getServices, getBlogPosts } from "@/content";
import { absoluteUrl, altLanguages } from "@/lib/seo";

/**
 * Dynamic sitemap covering every public page in both locales, with hreflang
 * alternates. Service and insight slugs are pulled from the content layer so new
 * DB entries appear automatically.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, posts] = await Promise.all([getServices(), getBlogPosts()]);

  const staticPaths = [
    "/",
    "/services",
    "/portfolio",
    "/qs-networks",
    "/leadership",
    "/careers",
    "/insights",
    "/contact",
    "/impressum",
    "/privacy",
  ];
  const servicePaths = services.map((s) => `/services/${s.slug}`);
  const postPaths = posts.map((p) => `/insights/${p.slug}`);
  const allPaths = [...staticPaths, ...servicePaths, ...postPaths];

  const priorityFor = (path: string) =>
    path === "/" ? 1 : path.startsWith("/services") ? 0.9 : path.startsWith("/insights/") ? 0.6 : 0.7;

  const entries: MetadataRoute.Sitemap = [];
  for (const path of allPaths) {
    // One entry per locale, each declaring the full alternates set.
    for (const locale of ["en", "tr"] as const) {
      entries.push({
        url: absoluteUrl(path, locale),
        lastModified: new Date(),
        changeFrequency: path === "/" ? "weekly" : "monthly",
        priority: priorityFor(path),
        alternates: { languages: altLanguages(path) },
      });
    }
  }
  return entries;
}
