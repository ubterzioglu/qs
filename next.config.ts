import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Emit a self-contained server bundle (.next/standalone) for a small Docker image.
  output: "standalone",
  async redirects() {
    // TEMP: homepage -> old Wix site while the new build is finished.
    // Remove this block to restore the Next.js homepage; rest of the site is untouched.
    const homeRedirect = [
      { source: "/", destination: "https://burakakcakanat2.wixsite.com/qualtron-sinclair", permanent: false },
      { source: "/tr", destination: "https://burakakcakanat2.wixsite.com/qualtron-sinclair", permanent: false },
    ];

    // Old Wix slugs -> new structure (301). Locale-agnostic; next-intl adds prefix.
    const map: Array<[string, string]> = [
      ["/legal-compliance", "/services/legal-compliance"],
      ["/talent-recruitment", "/services/talent-recruitment"],
      ["/digital-presence-platforms", "/services/digital-presence-platforms"],
      ["/physical-infrastructure", "/services/physical-infrastructure"],
      ["/innovation-technology", "/services/innovation-technology"],
      ["/capital-structuring-fundraising", "/services/capital-structuring-fundraising"],
      ["/blog", "/insights"],
      ["/contact-3", "/contact"],
      ["/about-5", "/"],
      // Old Wix blog post slugs (incl. Turkish originals) -> new insight slugs.
      ["/post/qualtron-sinclair-modern-ve-kurumsal-landing-page-tasarımı", "/insights/clone-age"],
      ["/post/qualtron-sinclair-minimalist-ve-zarif-landing-page-tasarımı", "/insights/clone-age-2"],
      ["/post/qualtron-sinclair-yüksek-güven-ve-düşük-gürültülü-tasarım", "/insights/the-digital-fabric-of-cities-smart-ecosystems-and-civic-ai"],
      ["/post/:slug", "/insights/:slug"],
    ];
    return [...homeRedirect, ...map.map(([source, destination]) => ({ source, destination, permanent: true }))];
  },
};

export default withNextIntl(nextConfig);
