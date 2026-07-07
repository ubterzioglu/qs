/**
 * JSON-LD structured data. Helps Google rich results AND grounds AI/LLM answers
 * (GEO) with authoritative facts about the company.
 */
import { SITE, absoluteUrl } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

function Ld({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Trusted, in-house data — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd({ locale }: { locale: Locale }) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "Corporation",
        "@id": `${SITE.url}#organization`,
        name: SITE.name,
        legalName: SITE.legalName,
        url: SITE.url,
        logo: absoluteUrl("/icon-512.png"),
        image: absoluteUrl("/opengraph-image.png"),
        description: SITE.description[locale],
        email: SITE.email,
        sameAs: SITE.sameAs,
        areaServed: SITE.areaServed,
        knowsAbout: [
          "MENA market entry",
          "company formation",
          "regulatory compliance",
          "capital structuring",
          "fundraising",
          "digital platforms",
          "artificial intelligence",
          "talent acquisition",
          "physical infrastructure",
        ],
        address: SITE.offices.map((o) => ({
          "@type": "PostalAddress",
          streetAddress: o.streetAddress,
          addressLocality: o.locality,
          addressRegion: o.region,
          postalCode: o.postalCode,
          addressCountry: o.country,
        })),
      }}
    />
  );
}

/** One LocalBusiness/Place entry per office — strengthens local/map geo signals. */
export function LocalBusinessJsonLd() {
  return (
    <>
      {SITE.offices.map((o) => (
        <Ld
          key={o.city}
          data={{
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": `${SITE.url}#office-${o.city.toLowerCase()}`,
            name: `${SITE.name} — ${o.city}`,
            parentOrganization: { "@id": `${SITE.url}#organization` },
            address: {
              "@type": "PostalAddress",
              streetAddress: o.streetAddress,
              addressLocality: o.locality,
              addressRegion: o.region,
              postalCode: o.postalCode,
              addressCountry: o.country,
            },
            ...(o.geo
              ? {
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: o.geo.lat,
                    longitude: o.geo.lng,
                  },
                }
              : {}),
            areaServed: SITE.areaServed,
          }}
        />
      ))}
    </>
  );
}

export function WebSiteJsonLd({ locale }: { locale: Locale }) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE.url}#website`,
        url: SITE.url,
        name: SITE.name,
        description: SITE.description[locale],
        inLanguage: locale === "tr" ? "tr-TR" : "en-US",
        publisher: { "@id": `${SITE.url}#organization` },
      }}
    />
  );
}

/** ProfessionalService with the six offerings — for the services pages. */
export function ProfessionalServiceJsonLd({
  locale,
  services,
}: {
  locale: Locale;
  services: { slug: string; title: string; description: string }[];
}) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": `${SITE.url}#service`,
        name: SITE.name,
        url: absoluteUrl("/services", locale),
        parentOrganization: { "@id": `${SITE.url}#organization` },
        areaServed: SITE.areaServed,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: locale === "tr" ? "Hizmetler" : "Services",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.title,
              description: s.description,
              url: absoluteUrl(`/services/${s.slug}`, locale),
            },
          })),
        },
      }}
    />
  );
}

/** FAQ schema — strong GEO signal; AI engines quote these Q&As directly. */
export function FaqJsonLd({ locale }: { locale: Locale }) {
  const faqs =
    locale === "tr"
      ? [
          {
            q: "Qualtron Sinclair nedir?",
            a: "Qualtron Sinclair, MENA pazarlarına — özellikle BAE, Katar ve KSA'ya — giren kurumlar için çok dikeyli bir büyüme mimarı ve genişleme partneridir. Sadece danışmanlık vermez; uygular ve inşa eder.",
          },
          {
            q: "Qualtron Sinclair hangi hizmetleri sunar?",
            a: "Altı operasyonel dikey: Hukuk & Uyum, Yetenek & Eğitim, Dijital Varlık & Platformlar, Fiziksel Altyapı, İnovasyon & Teknoloji ve Sermaye Yapılandırma & Fonlama.",
          },
          {
            q: "Qualtron Sinclair nerede bulunuyor?",
            a: "Doha, Dubai, İstanbul ve Delaware'de ofisleri vardır; MENA ve GCC bölgesine hizmet verir.",
          },
        ]
      : [
          {
            q: "What is Qualtron Sinclair?",
            a: "Qualtron Sinclair is a multi-vertical growth architect and expansion partner for corporations entering the MENA markets — the UAE, Qatar and KSA in particular. It doesn't just advise; it executes and builds.",
          },
          {
            q: "What services does Qualtron Sinclair offer?",
            a: "Six operating verticals: Legal & Compliance, Talent & Training, Digital Presence & Platforms, Physical Infrastructure, Innovation & Technology, and Capital Structuring & Fundraising.",
          },
          {
            q: "Where is Qualtron Sinclair based?",
            a: "It has offices in Doha, Dubai, Istanbul and Delaware, and serves the MENA and GCC region.",
          },
        ];

  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: it.name,
          item: it.url,
        })),
      }}
    />
  );
}

export function ArticleJsonLd({
  locale,
  title,
  description,
  slug,
  cover,
  author,
  publishedAt,
}: {
  locale: Locale;
  title: string;
  description: string;
  slug: string;
  cover?: string;
  author: string;
  publishedAt: string;
}) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        url: absoluteUrl(`/insights/${slug}`, locale),
        image: cover ? absoluteUrl(cover) : absoluteUrl("/opengraph-image.png"),
        datePublished: publishedAt,
        dateModified: publishedAt,
        inLanguage: locale === "tr" ? "tr-TR" : "en-US",
        author: { "@type": "Person", name: author },
        publisher: { "@id": `${SITE.url}#organization` },
        mainEntityOfPage: absoluteUrl(`/insights/${slug}`, locale),
      }}
    />
  );
}
