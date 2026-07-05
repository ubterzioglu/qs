import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Label, Section, CodeCard } from "@/components/blueprint";
import { pageMetadata } from "@/lib/seo";
import { getPortfolioItems } from "@/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolio" });
  return pageMetadata({ locale: locale as Locale, path: "/portfolio", title: t("title"), description: t("title") });
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("portfolio");
  const loc = locale as Locale;
  const items = await getPortfolioItems();

  return (
    <Section marker={t("label")} title={t("title")} className="border-t-0">
      <div className="grid gap-px border border-[var(--color-rule)] bg-[var(--color-rule)] sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <CodeCard key={item.slug} index={i + 1} className="border-0">
            <h3 className="bp-display text-xl text-[var(--color-ink)]">{item.name}</h3>
            <p className="mt-3 text-sm text-[var(--color-graphite)]">{item.description[loc]}</p>
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bp-label text-[var(--color-blueprint)] underline underline-offset-4"
              >
                {item.url.replace(/^https?:\/\//, "")} ↗
              </a>
            )}
          </CodeCard>
        ))}
        <div className="flex items-center justify-center bg-[var(--color-paper-2)] p-8">
          <Label>
            {loc === "tr" ? "Daha fazlası yakında" : "More ventures soon"}
          </Label>
        </div>
      </div>
    </Section>
  );
}
