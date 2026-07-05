import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Section } from "@/components/blueprint";
import { Markdown } from "@/lib/markdown";
import { pageMetadata } from "@/lib/seo";
import { impressum } from "@/content/legal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "footer" });
  return pageMetadata({
    locale: locale as Locale,
    path: "/impressum",
    title: t("impressum"),
    description: t("impressum"),
  });
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("footer");
  const loc = locale as Locale;

  return (
    <Section marker="Legal" title={t("impressum")} className="border-t-0">
      <div className="max-w-2xl">
        <Markdown source={impressum[loc]} />
      </div>
    </Section>
  );
}
