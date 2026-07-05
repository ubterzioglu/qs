import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Label, Section, CodeCard } from "@/components/blueprint";
import { getNetworkBrands } from "@/content";
import { InnoventureForm } from "@/components/forms/innoventure-form";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "networks" });
  return pageMetadata({ locale: locale as Locale, path: "/qs-networks", title: t("title"), description: t("title") });
}

export default async function NetworksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("networks");
  const loc = locale as Locale;
  const brands = await getNetworkBrands();

  return (
    <>
      <Section marker={t("label")} title={t("title")} className="border-t-0">
        <p className="max-w-3xl text-lg leading-relaxed text-[var(--color-ink)]">
          {loc === "tr"
            ? "InnoventureGlobal, girişimcileri ve yatırımcıları özel bir iletişim ağı üzerinden birbirine bağlayan, iş birliği ve büyüme için gerçek fırsatlar yaratan küresel bir topluluktur."
            : "InnoventureGlobal is a global community connecting entrepreneurs and investors through a private communication network, creating real opportunities for collaboration and growth."}
        </p>
      </Section>

      <Section marker="Sub-brands" title="Qualtron Networks">
        <div className="grid gap-px border border-[var(--color-rule)] bg-[var(--color-rule)] sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((b, i) => (
            <CodeCard key={b.name} index={i + 1} className="border-0">
              <h3 className="bp-display text-lg text-[var(--color-ink)]">{b.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-graphite)]">
                {b.description[loc]}
              </p>
              {b.url && (
                <a
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block bp-label text-[var(--color-blueprint)] underline underline-offset-4"
                >
                  {b.url.replace(/^https?:\/\//, "")} ↗
                </a>
              )}
            </CodeCard>
          ))}
        </div>
      </Section>

      <Section marker="Apply" title="Join the InnoVenture Network">
        <p className="mb-10 max-w-2xl leading-relaxed text-[var(--color-graphite)]">
          {loc === "tr"
            ? "Yapay zeka entegre InnoVenture Ağımıza katılın; üyelere özel etkinliklere ve iş birliklerine erişim kazanın."
            : "Join our AI-integrated InnoVenture Network and gain exclusive access to special events and collaborations for members."}
        </p>
        <InnoventureForm />
      </Section>
    </>
  );
}
