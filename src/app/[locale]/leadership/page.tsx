import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Label, Section, CodeCard } from "@/components/blueprint";
import { getPrinciples, getLeadershipIntro } from "@/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "leadership" });
  return { title: t("label"), description: t("title") };
}

export default async function LeadershipPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("leadership");
  const loc = locale as Locale;
  const principles = await getPrinciples();
  const intro = await getLeadershipIntro(loc);

  return (
    <>
      <Section marker={t("label")} title={t("title")} className="border-t-0">
        <p className="max-w-3xl text-lg leading-relaxed text-[var(--color-ink)]">{intro}</p>
      </Section>

      <Section marker="—" title={t("principlesTitle")}>
        <div className="grid gap-px border border-[var(--color-rule)] bg-[var(--color-rule)] sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, i) => (
            <CodeCard key={i} index={i + 1} className="border-0">
              <h3 className="bp-display text-xl text-[var(--color-ink)]">{p.title[loc]}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-graphite)]">
                {p.description[loc]}
              </p>
            </CodeCard>
          ))}
        </div>
        <p className="mt-10 max-w-3xl leading-relaxed text-[var(--color-graphite)]">
          {loc === "tr"
            ? "Liderlik felsefemizin merkezinde, salt uyumu aşan sarsılmaz bir etik bütünlük taahhüdü yatar. Liderliğin yalnızca sonuçlarla değil, tüm paydaşlara gösterdiğimiz sorumlulukla, her kararda barındırdığımız adaletle ve hareket ederken sergilediğimiz şeffaflıkla ölçüldüğüne inanıyoruz."
            : "At the core of our leadership philosophy lies an unwavering commitment to ethical integrity — a standard that transcends mere compliance. We believe leadership is measured not only by results, but by the responsibility we demonstrate toward all stakeholders, the fairness we embed in every decision, and the transparency with which we act."}
        </p>
      </Section>
    </>
  );
}
