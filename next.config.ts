import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Emit a self-contained server bundle (.next/standalone) for a small Docker image.
  output: "standalone",
  async redirects() {
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
    ];
    return map.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default withNextIntl(nextConfig);
