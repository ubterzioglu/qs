import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { Label, Rule } from "@/components/blueprint";
import { getService, getServices } from "@/content";
import { pageMetadata, absoluteUrl } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/json-ld";

export async function generateStaticParams() {
  const services = await getServices();
  return routing.locales.flatMap((locale) =>
    services.map((s) => ({ locale, slug: s.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = await getService(slug);
  if (!service) return {};
  const loc = locale as Locale;
  return pageMetadata({
    locale: loc,
    path: `/services/${slug}`,
    title: service.title[loc],
    description: service.description[loc].slice(0, 200),
    image: service.image,
  });
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const service = await getService(slug);
  if (!service) notFound();

  const loc = locale as Locale;
  const t = await getTranslations("services");
  const nav = await getTranslations("nav");
  const all = await getServices();
  const idx = all.findIndex((s) => s.slug === slug);
  const next = all[(idx + 1) % all.length];

  return (
    <article>
      <BreadcrumbJsonLd
        items={[
          { name: "Qualtron Sinclair", url: absoluteUrl("/", loc) },
          { name: nav("services"), url: absoluteUrl("/services", loc) },
          { name: service.title[loc], url: absoluteUrl(`/services/${slug}`, loc) },
        ]}
      />
      <div className="mx-auto max-w-6xl px-6 pt-12 lg:px-8">
        <Link href="/services" className="bp-label text-[var(--color-graphite)] hover:text-[var(--color-ink)]">
          ← {nav("services")}
        </Link>
      </div>

      <header className="mx-auto max-w-6xl px-6 pb-10 pt-8 lg:px-8">
        <div className="flex items-center justify-between">
          <Label>{String(service.order).padStart(2, "0")} — {service.code}</Label>
          {service.subtitle && <Label>{service.subtitle[loc]}</Label>}
        </div>
        <Rule className="mt-4" />
        <h1 className="bp-display mt-8 max-w-4xl text-[clamp(2.25rem,6vw,4.5rem)] text-[var(--color-ink)]">
          {service.title[loc]}
        </h1>
      </header>

      <div className="relative aspect-[21/9] w-full overflow-hidden border-y border-[var(--color-ink)]">
        <Image
          src={service.image}
          alt={service.imageAlt[loc]}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[2fr_1fr] lg:px-8">
        <div className="text-lg leading-relaxed text-[var(--color-ink)]">
          {service.description[loc]}
        </div>
        <aside className="border-t border-[var(--color-ink)] pt-6">
          <Label>{t("quoteLabel")}</Label>
          <blockquote className="bp-display mt-4 text-xl leading-snug text-[var(--color-blueprint)]">
            “{service.quote[loc]}”
          </blockquote>
        </aside>
      </div>

      <div className="border-t border-[var(--color-rule)]">
        <Link
          href={`/services/${next.slug}`}
          className="group mx-auto flex max-w-6xl items-center justify-between px-6 py-10 lg:px-8"
        >
          <div>
            <Label>{t("readMore")}</Label>
            <p className="bp-display mt-2 text-2xl text-[var(--color-ink)]">{next.title[loc]}</p>
          </div>
          <span aria-hidden="true" className="text-3xl transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </article>
  );
}
