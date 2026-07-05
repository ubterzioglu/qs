import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { Label, Section } from "@/components/blueprint";
import { getBlogPosts } from "@/content";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "insights" });
  return pageMetadata({ locale: locale as Locale, path: "/insights", title: t("title"), description: t("title") });
}

export default async function InsightsIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("insights");
  const loc = locale as Locale;
  const posts = await getBlogPosts();

  return (
    <Section marker={t("label")} title={t("title")} className="border-t-0">
      <ul className="grid gap-px border border-[var(--color-rule)] bg-[var(--color-rule)]">
        {posts.map((post, i) => (
          <li key={post.slug}>
            <Link
              href={`/insights/${post.slug}`}
              className="group grid gap-4 bg-[var(--color-paper)] p-6 transition-colors hover:bg-[var(--color-paper-2)] sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-8 sm:p-8"
            >
              <Label>{String(i + 1).padStart(2, "0")}</Label>
              <div>
                <h2 className="bp-display text-xl text-[var(--color-ink)] sm:text-2xl">
                  {post.title[loc]}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--color-graphite)]">
                  {post.excerpt[loc]}
                </p>
              </div>
              <div className="text-right">
                <p className="bp-label">{post.publishedAt}</p>
                <p className="bp-label mt-1">{t("readTime", { minutes: post.readTimeMinutes })}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
