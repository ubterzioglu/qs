import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Section } from "@/components/blueprint";
import { getSiteSettings } from "@/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "footer" });
  return { title: t("impressum") };
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
  const settings = await getSiteSettings();

  return (
    <Section marker="Legal" title={t("impressum")} className="border-t-0">
      <div className="max-w-2xl space-y-6 text-[var(--color-graphite)]">
        <p className="text-[var(--color-ink)]">{settings.brandName}</p>
        {settings.locations.map((loc2) => (
          <p key={loc2.city}>
            <span className="text-[var(--color-ink)]">{loc2.city}</span>
            <br />
            {loc2.address}
            <br />
            {loc2.phoneLabel}: {loc2.phone}
          </p>
        ))}
        <p>
          <a href={`mailto:${settings.contactEmail}`} className="text-[var(--color-blueprint)] underline underline-offset-4">
            {settings.contactEmail}
          </a>
        </p>
        <p className="border-t border-[var(--color-rule)] pt-6 text-sm">
          {loc === "tr"
            ? "Tam yasal tüzel kişilik bilgileri (tescilli unvan, sicil numaraları) yayından önce eklenecektir."
            : "Full legal entity details (registered name, registration numbers) will be added before launch."}
        </p>
      </div>
    </Section>
  );
}
