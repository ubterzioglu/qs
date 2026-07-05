import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { Label, Rule, Section } from "@/components/blueprint";
import { VideoHero } from "@/components/video-hero";
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
  const loc = locale as Locale;

  return (
    <>
      {/* HERO — ambient boardroom video, serif thesis, brass accent */}
      <VideoHero src="/media/brand/hero.mp4" poster="/media/brand/who-we-are.jpg">
        <div className="flex items-center justify-between">
          <Label>{t("sectionLabel")}</Label>
          <Label className="hidden sm:block">{t("regions")}</Label>
        </div>
        <Rule className="mt-5 max-w-xs" />

        <h1 className="qs-display mt-10 max-w-4xl text-[clamp(3rem,8vw,6.5rem)] text-[var(--color-cream)]">
          {t("heroLineA")}{" "}
          <span className="text-[var(--color-mist)]">{t("heroLineB")}</span>{" "}
          <em className="not-italic text-[var(--color-brass)]">{t("heroLineC")}</em>
        </h1>

        <div className="mt-12 grid gap-8 border-t border-[var(--color-navy-line)] pt-8 md:grid-cols-[2fr_1fr]">
          <p className="max-w-2xl text-lg leading-relaxed text-[var(--color-cream)] sm:text-xl">
            {t("heroIntro")}
          </p>
          <div className="flex flex-col justify-between gap-6">
            <p className="qs-label leading-relaxed">{t("heroSub")}</p>
            <Link href="/contact" className="qs-btn group self-start">
              {t("ctaButton")}
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </VideoHero>

      {/* WHO WE ARE */}
      <Section marker={t("whoLabel")} title={t("whoTitle")} className="qs-surface">
        <div className="grid gap-x-14 gap-y-6 md:grid-cols-2">
          {who.map((para, i) => (
            <p
              key={i}
              className={
                i === 4
                  ? "qs-display text-2xl text-[var(--color-brass-hi)] md:col-span-2 sm:text-3xl"
                  : "leading-relaxed text-[var(--color-mist)]"
              }
            >
              {para}
            </p>
          ))}
        </div>
      </Section>

      {/* VERTICALS — cards with service imagery */}
      <Section marker={t("verticalsLabel")} title={t("verticalsTitle")}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="qs-card group flex flex-col overflow-hidden"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.imageAlt[loc]}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-2)] via-transparent to-transparent" />
                <span className="absolute left-4 top-4 qs-label bg-[var(--color-obsidian)]/70 px-2 py-1">
                  {String(i + 1).padStart(2, "0")} · {s.code}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="qs-display text-2xl text-[var(--color-cream)]">{s.title[loc]}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[var(--color-mist)]">
                  {s.description[loc]}
                </p>
                <span className="mt-5 qs-label text-[var(--color-brass)] transition-colors group-hover:text-[var(--color-brass-hi)]">
                  {nav("services")} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* CTA — brass band */}
      <section className="qs-surface border-t border-[var(--color-navy-line)]">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-24 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p className="qs-display max-w-2xl text-4xl text-[var(--color-cream)] sm:text-5xl">
            {t("cta")}
          </p>
          <Link href="/contact" className="qs-btn shrink-0">
            {t("ctaButton")}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
