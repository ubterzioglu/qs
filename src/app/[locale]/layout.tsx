import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { env } from "@/lib/env";
import { SITE, altLanguages } from "@/lib/seo";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/json-ld";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// ISR: re-render public pages at most every 60s so CMS edits in /admin appear
// without a redeploy (pages fall back to the static seed if the DB is down).
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const title = `${SITE.name} — ${SITE.tagline[loc]}`;
  const description = SITE.description[loc];

  return {
    metadataBase: new URL(env.siteUrl),
    title: {
      default: title,
      template: `%s · ${SITE.name}`,
    },
    description,
    applicationName: SITE.name,
    keywords: SITE.keywords,
    authors: [{ name: SITE.name, url: env.siteUrl }],
    creator: SITE.name,
    publisher: SITE.name,
    category: "business",
    alternates: {
      canonical: locale === "tr" ? "/tr" : "/",
      languages: altLanguages("/"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title,
      description,
      url: locale === "tr" ? "/tr" : "/",
      locale: loc === "tr" ? "tr_TR" : "en_US",
      alternateLocale: loc === "tr" ? ["en_US"] : ["tr_TR"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/icon.png", type: "image/png", sizes: "32x32" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
    },
    manifest: "/manifest.webmanifest",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const loc = locale as Locale;

  return (
    <NextIntlClientProvider>
      <OrganizationJsonLd locale={loc} />
      <WebSiteJsonLd locale={loc} />
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </NextIntlClientProvider>
  );
}
