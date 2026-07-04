/**
 * Content model. These types are the contract shared by:
 *  - the static seed fallback (src/content/seed.ts) used when no DB is configured,
 *  - the Supabase reader (src/content/db.ts) used once env is set,
 *  - the /admin CMS editing surface.
 *
 * Localized fields are keyed by locale so a single row carries EN + TR.
 */
import type { Locale } from "@/i18n/routing";

export type Localized<T = string> = Record<Locale, T>;

export type ServiceCode = "LGL" | "TLT" | "DIG" | "INF" | "TEC" | "CAP";

export interface Service {
  slug: string;
  code: ServiceCode;
  order: number;
  title: Localized;
  description: Localized;
  quote: Localized;
  subtitle?: Localized;
  image: string; // /media/... path
  imageAlt: Localized;
}

export type PortfolioCategory =
  | "venture"
  | "partner"
  | "subsidiary"
  | "investment"
  | "platform";

export interface PortfolioItem {
  slug: string;
  name: string;
  category: PortfolioCategory;
  description: Localized;
  logo?: string;
  url?: string;
  order: number;
  isPublic: boolean;
}

export interface NetworkBrand {
  name: string;
  description: Localized;
  url?: string;
}

export interface BlogPost {
  slug: string;
  status: "published" | "draft";
  title: Localized;
  excerpt: Localized;
  body: Localized; // markdown
  cover?: string;
  author: string;
  publishedAt: string; // ISO date
  readTimeMinutes: number;
}

export interface OfficeLocation {
  city: string;
  address: string;
  phone: string;
  phoneLabel: string;
  map?: string;
}

export interface Principle {
  title: Localized;
  description: Localized;
}

export interface SiteSettings {
  brandName: string;
  contactEmail: string;
  locations: OfficeLocation[];
}
