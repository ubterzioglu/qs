# Qualtron Sinclair — Rebuild Plan

> Source of truth: `ref/qualtron_sinclair_wix_export_pack/` (content) + `ref/Site Files/` (media).
> Original site: https://www.qualtronsinclair.com/

## Decisions (locked with client)

| Axis | Decision |
|------|----------|
| Admin | Same Next.js app, `/admin` route, Supabase Auth-gated (CMS + form inbox) |
| Content source | Hybrid: content lives in Supabase; seeded from export pack; edited via `/admin` |
| Languages | English + Turkish from day one (`next-intl`, locale-prefixed routes) |
| Design | **Brand-new visual language — "Architectural Blueprint"** |
| Delivery | Plan first, then scaffold in parallel |

## Design system — "Architectural Blueprint"

Thesis: *"We design the structure behind growth."* The site itself reads like a set of
architectural drawings — the structure is the message. This deliberately avoids the three
AI-default looks (cream+serif, black+acid-green, broadsheet).

- **Palette** (light "drafting paper" base, not the old dark boardroom):
  - `--paper` #F5F4F0 (drafting paper background)
  - `--ink` #14181F (near-black technical ink, primary text)
  - `--graphite` #5A6472 (secondary text / labels)
  - `--blueprint` #1B3A5B (deep blueprint blue — primary accent, from the old logo navy)
  - `--brass` #A6763C (single warm accent — echoes the brass scale, used *once* per view)
  - `--rule` #D7D5CD (hairline grid/divider color)
- **Type**:
  - Display: a wide/condensed grotesque with character (e.g. **Archivo Expanded** or **Space Grotesk**) — set large, tight tracking.
  - Body: a clean humanist sans (e.g. **Inter**).
  - Utility/label: a monospace (e.g. **JetBrains Mono**) for coordinate labels, section numbers, data — the "technical drawing" voice.
- **Structure as information**: section markers use *real* schema (`01 — GROWTH ARCHITECTURE`, vertical codes `LGL / TLT / CAP / DIG / INF / TEC`), not decorative numbering. Hairline rules, corner ticks, and margin measurement labels frame content like a blueprint sheet.
- **Signature element**: a live hairline **grid + drafting frame** that wraps the hero and section blocks, with animated "drawn" rule lines on load (respecting `prefers-reduced-motion`). One brass accent per section max.
- **Quality floor**: responsive to mobile, visible keyboard focus, reduced-motion honored, dark-on-light with AA contrast.

## Tech stack

- Next.js 15 (App Router, RSC by default) + TypeScript strict
- Tailwind CSS v4 + design tokens as CSS variables
- next-intl (locale-prefixed `/[locale]/...`, EN default, TR second)
- Supabase (Postgres + RLS + Auth) — `@supabase/ssr` for cookie-based sessions
- Zod for all form + boundary validation
- Vercel-ready (sitemap, robots, JSON-LD, redirects)

## Routes (locale-prefixed: `/en/...`, `/tr/...`)

Public:
- `/` Home
- `/services/legal-compliance`, `/services/talent-recruitment`, `/services/digital-presence-platforms`, `/services/physical-infrastructure`, `/services/innovation-technology`, `/services/capital-structuring-fundraising`
- `/portfolio`
- `/qs-networks`
- `/leadership`
- `/careers`
- `/insights` + `/insights/[slug]`
- `/contact`
- `/impressum`, `/privacy` (legal placeholders w/ TODO — real text pending panel export)

Admin (no locale prefix, `/admin/...`):
- `/admin/login`
- `/admin` dashboard (submission counts)
- `/admin/pages`, `/admin/services`, `/admin/portfolio`, `/admin/insights` (CRUD, EN+TR fields)
- `/admin/submissions/{contact,careers,innoventure,startup-hub}` (read + CSV export)
- `/admin/settings` (site settings, locations)

Redirects (old Wix slug → new): `/about-5`→`/`(410/redirect), `/legal-compliance`→`/services/legal-compliance`, `/talent-recruitment`→`/services/talent-recruitment`, `/digital-presence-platforms`→`/services/…`, `/physical-infrastructure`→`/services/…`, `/innovation-technology`→`/services/…`, `/capital-structuring-fundraising`→`/services/…`, `/blog`→`/insights`, `/contact-3`→`/contact`.

## Supabase schema (matches rebuild prompt)

Tables (all with `id uuid pk`, `created_at`, `updated_at`):
- `pages` (slug, status, i18n JSONB: `title/body` per locale, seo)
- `services` (slug, order, i18n: title/description/quote/subtitle, image, code)
- `portfolio_items` (name, category enum, description i18n, logo, url, order, is_public)
- `blog_posts` (slug, status, i18n: title/excerpt/body, cover, author, published_at, read_time)
- `media_assets` (path, alt, kind, width/height)
- `site_settings` (singleton: brand, contact email, socials) + `locations` (city, address, phone, label, map)
- `redirects` (from_path, to_path, code)
- Form tables: `contact_messages`, `career_applications`, `innoventure_applications` (incl. `consent bool`), `startup_hub_submissions`

**RLS**:
- `anon` SELECT on published `pages/services/blog_posts/portfolio_items(is_public)/media_assets/site_settings/locations/redirects`.
- `anon` INSERT only on the 4 form tables (no read).
- No `anon` UPDATE/DELETE anywhere.
- `authenticated` (admins) full access, gated further by app-level auth + an `admins` allowlist.

## Seed

`supabase/seed` script parses `ref/qualtron_sinclair_wix_export_pack/content/**` (markdown + JSON)
→ inserts EN content into `pages/services/blog_posts/portfolio_items/locations/site_settings`.
TR fields seeded empty (editable in `/admin`) except where TR source exists. `/about-5` placeholder is **not** imported.

## Media

`ref/Site Files/*` → `public/media/` with slugified, ASCII names. Map service images
(`Legal & Compliance.jpg`, etc.) to their service slugs. Hero video `67 - QUALTRON SINCLAIR main.mp4`
kept as optional hero background (poster fallback for reduced-motion/mobile). Large PDFs
(company overviews) → `public/docs/`.

## Content cleanup (per rebuild prompt)

- Fix typos: `assesments`→`assessments`, `clientsand`→`clients and`.
- Drop Wix artifacts and the `/about-5` template copy.
- Do **not** invent legal/entity/partner facts — pending items tracked in `MIGRATION.md` (from TODO_PANEL_EXPORTS.md).

## Env (you'll provide later)

`.env.local` needs: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
`SUPABASE_SERVICE_ROLE_KEY` (server-only, for seed/admin), `ADMIN_EMAILS` allowlist.
Until provided, the app runs with a **static content fallback** (reads seed JSON) so the
site is fully viewable without a DB connection; wiring Supabase is a drop-in swap.

## Build order

1. Scaffold app (Next + TS + Tailwind v4 + next-intl) — working home page in Blueprint style.
2. Design tokens + shared layout (drafting frame, header w/ EN|TR switch, footer w/ locations).
3. Media pipeline into `public/`.
4. Supabase schema + migrations + RLS (SQL files).
5. Seed script + static fallback loader.
6. Public pages (home, services ×6, portfolio, qs-networks, leadership, careers, insights, contact, legal).
7. Admin (auth + CMS + submission inbox + CSV export).
8. Forms (Zod + insert).
9. SEO (sitemap/robots/JSON-LD/redirects) + `pnpm lint && typecheck && build` green.

## Verification

Separate reviewer pass (code-reviewer / verifier agent) before "done". Zero TS/lint errors,
successful `pnpm build`, forms validated, RLS SQL reviewed, a11y floor met.
