import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { Label, Rule } from "@/components/blueprint";
import { Markdown } from "@/lib/markdown";
import { getBlogPost, getBlogPosts } from "@/content";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { absoluteUrl, altLanguages } from "@/lib/seo";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return routing.locales.flatMap((locale) =>
    posts.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  const loc = locale as Locale;
  const path = `/insights/${slug}`;
  return {
    title: post.title[loc],
    description: post.excerpt[loc],
    alternates: {
      canonical: loc === "tr" ? `/tr${path}` : path,
      languages: altLanguages(path),
    },
    openGraph: {
      type: "article",
      title: post.title[loc],
      description: post.excerpt[loc],
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: post.cover ? [post.cover] : ["/opengraph-image.png"],
    },
    twitter: { card: "summary_large_image", title: post.title[loc], description: post.excerpt[loc] },
  };
}

export default async function InsightPost({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const loc = locale as Locale;
  const t = await getTranslations("insights");

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 lg:px-8">
      <ArticleJsonLd
        locale={loc}
        title={post.title[loc]}
        description={post.excerpt[loc]}
        slug={post.slug}
        cover={post.cover}
        author={post.author}
        publishedAt={post.publishedAt}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Qualtron Sinclair", url: absoluteUrl("/", loc) },
          { name: t("label"), url: absoluteUrl("/insights", loc) },
          { name: post.title[loc], url: absoluteUrl(`/insights/${post.slug}`, loc) },
        ]}
      />
      <Link href="/insights" className="bp-label text-[var(--color-graphite)] hover:text-[var(--color-ink)]">
        ← {t("back")}
      </Link>

      <header className="mt-8">
        <div className="flex items-center justify-between">
          <Label>{post.publishedAt}</Label>
          <Label>{t("readTime", { minutes: post.readTimeMinutes })}</Label>
        </div>
        <Rule className="mt-4" />
        <h1 className="bp-display mt-8 text-[clamp(2rem,5vw,3.5rem)] text-[var(--color-ink)]">
          {post.title[loc]}
        </h1>
        <p className="mt-4 text-lg text-[var(--color-graphite)]">{post.excerpt[loc]}</p>
      </header>

      {post.cover && (
        <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden border border-[var(--color-ink)]">
          <Image src={post.cover} alt={post.title[loc]} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
        </div>
      )}

      <div className="mt-12 text-lg">
        <Markdown source={post.body[loc]} />
      </div>
    </article>
  );
}
