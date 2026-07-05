import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { Label, Section } from "@/components/blueprint";
import { getServices } from "@/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("indexLabel"), description: t("indexTitle") };
}

export default async function ServicesIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const services = await getServices();
  const loc = locale as Locale;

  return (
    <Section marker={t("indexLabel")} title={t("indexTitle")} className="border-t-0">
      <div className="grid gap-px border border-[var(--color-rule)] bg-[var(--color-rule)]">
        {services.map((s, i) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="group grid gap-4 bg-[var(--color-paper)] p-6 transition-colors hover:bg-[var(--color-paper-2)] sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-8 sm:p-8"
          >
            <div className="flex items-center gap-4">
              <Label>{String(i + 1).padStart(2, "0")}</Label>
              <span className="bp-label text-[var(--color-blueprint)]">{s.code}</span>
            </div>
            <div>
              <h2 className="bp-display text-2xl text-[var(--color-ink)]">{s.title[loc]}</h2>
              <p className="mt-2 line-clamp-2 max-w-2xl text-sm text-[var(--color-graphite)]">
                {s.description[loc]}
              </p>
            </div>
            <span
              aria-hidden="true"
              className="hidden text-2xl text-[var(--color-graphite)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--color-ink)] sm:block"
            >
              →
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
