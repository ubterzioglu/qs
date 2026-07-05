import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Section } from "@/components/blueprint";
import { CareersForm } from "@/components/forms/careers-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "careers" });
  return { title: t("label"), description: t("intro") };
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("careers");

  return (
    <Section marker={t("label")} title={t("title")} className="border-t-0">
      <p className="max-w-2xl text-lg leading-relaxed text-[var(--color-ink)]">{t("intro")}</p>
      <div className="mt-14 max-w-3xl border-t border-[var(--color-ink)] pt-10">
        <h2 className="bp-display mb-8 text-2xl text-[var(--color-ink)]">{t("formTitle")}</h2>
        <CareersForm />
      </div>
    </Section>
  );
}
