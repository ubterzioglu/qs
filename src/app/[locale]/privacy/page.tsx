import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Section } from "@/components/blueprint";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "footer" });
  return { title: t("privacy") };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("footer");
  const loc = locale as Locale;

  return (
    <Section marker="Legal" title={t("privacy")} className="border-t-0">
      <div className="max-w-2xl space-y-4 text-[var(--color-graphite)]">
        <p>
          {loc === "tr"
            ? "Qualtron Sinclair, iletişim ve başvuru formları aracılığıyla paylaştığınız bilgilere değer verir ve bunları yalnızca sizinle iletişim kurmak ve hizmetlerimizi sunmak için kullanır."
            : "Qualtron Sinclair values the information you share through our contact and application forms, and uses it solely to respond to you and provide our services."}
        </p>
        <p>
          {loc === "tr"
            ? "InnoVenture Ağı başvurularında, yapay zeka destekli eşleştirme için verdiğiniz onay yalnızca açıkça kabul etmeniz halinde uygulanır."
            : "For InnoVenture Network applications, consent for AI-powered matchmaking applies only where you have explicitly opted in."}
        </p>
        <p className="border-t border-[var(--color-rule)] pt-6 text-sm">
          {loc === "tr"
            ? "Tam gizlilik ve çerez politikası metni yayından önce yayımlanacaktır."
            : "The full privacy and cookie policy text will be published before launch."}
        </p>
      </div>
    </Section>
  );
}
