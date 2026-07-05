import { getServices, getBlogPosts } from "@/content";
import { SITE, absoluteUrl } from "@/lib/seo";

export const revalidate = 3600;

/**
 * /llms.txt — a structured Markdown summary for AI assistants / LLM search
 * engines (the emerging "llms.txt" convention). Grounds GEO answers with
 * authoritative, up-to-date facts and links.
 */
export async function GET() {
  const [services, posts] = await Promise.all([getServices(), getBlogPosts()]);

  const lines: string[] = [];
  lines.push(`# ${SITE.name}`);
  lines.push("");
  lines.push(`> ${SITE.tagline.en}`);
  lines.push("");
  lines.push(SITE.description.en);
  lines.push("");
  lines.push("## About");
  lines.push(
    "Qualtron Sinclair is a multi-vertical holding and expansion partner. It does not " +
      "only advise — it executes and builds. It helps corporations establish a compliant, " +
      "scalable presence in the MENA region (UAE, Qatar, KSA in particular) and operates its " +
      "own AI and technology ventures.",
  );
  lines.push("");
  lines.push(`- Website: ${SITE.url}`);
  lines.push(`- Contact: ${SITE.email}`);
  lines.push(`- Offices: ${SITE.offices.map((o) => o.city).join(", ")}`);
  lines.push(`- Area served: ${SITE.areaServed.join(", ")}`);
  lines.push(`- Languages: English, Türkçe`);
  lines.push("");
  lines.push("## Services (operating verticals)");
  for (const s of services) {
    lines.push(`- [${s.title.en}](${absoluteUrl(`/services/${s.slug}`)}): ${s.description.en}`);
  }
  lines.push("");
  lines.push("## Insights");
  for (const p of posts) {
    lines.push(`- [${p.title.en}](${absoluteUrl(`/insights/${p.slug}`)}): ${p.excerpt.en}`);
  }
  lines.push("");
  lines.push("## Key pages");
  lines.push(`- [Portfolio](${absoluteUrl("/portfolio")})`);
  lines.push(`- [QS Networks](${absoluteUrl("/qs-networks")})`);
  lines.push(`- [Leadership](${absoluteUrl("/leadership")})`);
  lines.push(`- [Careers](${absoluteUrl("/careers")})`);
  lines.push(`- [Contact](${absoluteUrl("/contact")})`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
