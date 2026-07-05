import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { Label, Rule, Section, CodeCard } from "@/components/blueprint";
import { getServices, getWhoWeAre } from "@/content";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const nav = await getTranslations("nav");
  const services = await getServices();
  const who = getWhoWeAre(locale as Locale);

  return (
    <>
      {/* HERO — the thesis, framed as a drawing sheet */}
      <section className="relative overflow-hidden border-b border-[var(--color-ink)]">
        <div className="bp-grid absolute inset-0 opacity-70" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pt-24 lg:px-8">
          <div className="flex items-center justify-between">
            <Label>{t("sectionLabel")}</Label>
            <Label className="hidden sm:block">{t("regions")}</Label>
          </div>
          <Rule className="mt-4" />

          <h1 className="bp-display mt-10 max-w-4xl text-[clamp(2.75rem,8vw,6.5rem)] text-[var(--color-ink)]">
            {t("heroLineA")}{" "}
            <span className="text-[var(--color-graphite)]">{t("heroLineB")}</span>{" "}
            <span className="relative text-[var(--color-blueprint)]">
              {t("heroLineC")}
            </span>
          </h1>

          <div className="mt-12 grid gap-8 border-t border-[var(--color-rule)] pt-8 md:grid-cols-[2fr_1fr]">
            <p className="max-w-2xl text-lg leading-relaxed text-[var(--color-ink)] sm:text-xl">
              {t("heroIntro")}
            </p>
            <div className="flex flex-col justify-between gap-6">
              <p className="bp-label leading-relaxed">{t("heroSub")}</p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 self-start border border-[var(--color-ink)] px-6 py-3 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
              >
                {t("ctaButton")}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <Section marker={t("whoLabel")} title={t("whoTitle")}>
        <div className="grid gap-x-12 gap-y-6 md:grid-cols-2">
          {who.map((para, i) => (
            <p
              key={i}
              className={`leading-relaxed text-[var(--color-graphite)] ${
                i === 4 ? "bp-display text-2xl text-[var(--color-ink)] md:col-span-2" : ""
              }`}
            >
              {para}
            </p>
          ))}
        </div>
      </Section>

      {/* VERTICALS — six coded cards */}
      <Section marker={t("verticalsLabel")} title={t("verticalsTitle")}>
        <div className="grid gap-px border border-[var(--color-rule)] bg-[var(--color-rule)] sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <CodeCard key={s.slug} code={s.code} index={i + 1} className="border-0">
              <h3 className="bp-display text-xl text-[var(--color-ink)]">
                {s.title[locale as Locale]}
              </h3>
              <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-[var(--color-graphite)]">
                {s.description[locale as Locale]}
              </p>
              <Link
                href={`/services/${s.slug}`}
                className="mt-6 inline-block bp-label text-[var(--color-blueprint)] underline underline-offset-4"
              >
                {nav("services")} →
              </Link>
            </CodeCard>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="border-t border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)]">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p className="bp-display text-3xl sm:text-4xl lg:text-5xl">{t("cta")}</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 border border-[var(--color-paper)] px-8 py-4 text-sm font-medium transition-colors hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)]"
          >
            {t("ctaButton")}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
