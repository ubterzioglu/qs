import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Label, Section, CodeCard } from "@/components/blueprint";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolio" });
  return { title: t("label"), description: t("title") };
}

// Public-side portfolio text was image-based; these are the entries confirmed in the
// export pack. Full partner details are pending panel export (see MIGRATION.md) and
// are editable in /admin once the DB is wired — we do not invent details here.
const items: { name: string; tag: Record<Locale, string> }[] = [
  { name: "Ritefit", tag: { en: "Hisseli Gayrimenkul Cebinizde", tr: "Hisseli Gayrimenkul Cebinizde" } },
  { name: "CorteQS", tag: { en: "Türk Diasporası Dijital Hayatına Geçiyor", tr: "Türk Diasporası Dijital Hayatına Geçiyor" } },
];

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("portfolio");
  const loc = locale as Locale;

  return (
    <Section marker={t("label")} title={t("title")} className="border-t-0">
      <div className="grid gap-px border border-[var(--color-rule)] bg-[var(--color-rule)] sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <CodeCard key={item.name} index={i + 1} className="border-0">
            <h3 className="bp-display text-xl text-[var(--color-ink)]">{item.name}</h3>
            <p className="mt-3 text-sm text-[var(--color-graphite)]">{item.tag[loc]}</p>
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
