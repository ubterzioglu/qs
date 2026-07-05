import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Label, Section } from "@/components/blueprint";
import { getSiteSettings } from "@/content";
import { ContactForm } from "@/components/forms/contact-form";
import { StartupHubForm } from "@/components/forms/startup-hub-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("label"), description: t("intro") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const settings = await getSiteSettings();

  return (
    <>
      <Section marker={t("label")} title={t("title")} className="border-t-0">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="max-w-xl text-lg leading-relaxed text-[var(--color-ink)]">{t("intro")}</p>
            <div className="mt-10 max-w-2xl">
              <ContactForm />
            </div>
          </div>

          <aside>
            <Label>{t("offices")}</Label>
            <ul className="mt-4 space-y-6">
              {settings.locations.map((loc) => (
                <li key={loc.city} className="border-t border-[var(--color-rule)] pt-4">
                  <p className="bp-display text-lg text-[var(--color-ink)]">{loc.city}</p>
                  <p className="mt-1 text-sm text-[var(--color-graphite)]">{loc.address}</p>
                  <p className="mt-2 bp-label">
                    {loc.phoneLabel}:{" "}
                    <a href={`tel:${loc.phone.replace(/\s/g, "")}`} className="text-[var(--color-blueprint)]">
                      {loc.phone}
                    </a>
                  </p>
                </li>
              ))}
              <li className="border-t border-[var(--color-rule)] pt-4">
                <p className="bp-display text-lg text-[var(--color-ink)]">Delaware</p>
                <p className="mt-1 text-sm text-[var(--color-graphite)]">United States</p>
              </li>
            </ul>
            <a
              href={`mailto:${settings.contactEmail}`}
              className="mt-8 inline-block bp-label text-[var(--color-blueprint)] underline underline-offset-4"
            >
              {settings.contactEmail}
            </a>
          </aside>
        </div>
      </Section>

      <Section marker="Hub" title={t("hubTitle")}>
        <p className="mb-10 max-w-2xl leading-relaxed text-[var(--color-graphite)]">{t("hubBody")}</p>
        <div className="max-w-3xl">
          <StartupHubForm />
        </div>
      </Section>
    </>
  );
}
