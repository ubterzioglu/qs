import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "tr"],
  defaultLocale: "en",
  // English at "/", Turkish at "/tr/...". Keeps clean canonical URLs for the default locale.
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
