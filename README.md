# Qualtron Sinclair

Modern rebuild of [qualtronsinclair.com](https://www.qualtronsinclair.com/) — a
multi-vertical growth architect for MENA market entry. Next.js 15 + TypeScript +
Tailwind v4 + next-intl, with a Supabase-backed CMS and a bilingual (EN/TR) public site.

Visual language: **"Architectural Blueprint"** — drafting-paper base, hairline grid,
monospace measurement labels, and coded verticals. The structure is the message.

## Stack

- **Next.js 15** App Router, React Server Components, TypeScript strict
- **Tailwind CSS v4** with a CSS-variable design-token system
- **next-intl** — English at `/`, Turkish at `/tr`, with 301 redirects from old Wix slugs
- **Supabase** (Postgres + RLS + Auth) — optional; the site runs on static seed content until configured
- **Zod** — validation at every form boundary

## Getting started

```bash
pnpm install
pnpm dev            # http://localhost:3000
```

The site works with **no environment variables** — content is served from
`src/content/seed.ts` and forms accept-and-log. To enable the database-backed CMS and
persist form submissions, copy `.env.example` to `.env.local` and fill in Supabase keys.

```bash
pnpm build          # production build
pnpm typecheck      # tsc --noEmit
pnpm lint           # next lint
```

## Maintenance / "Yenileniyoruz" mode

A premium coming-soon takeover ships built in. Toggle it with one env var — no code change:

```bash
MAINTENANCE_MODE=1  # show /maintenance to all public visitors; /admin stays reachable
```

Leave it empty (or unset) to serve the full site. On Vercel, set/unset the var and redeploy.

## Structure

```
src/
  app/[locale]/        Public bilingual pages (home, services, portfolio, …)
  app/maintenance/     Standalone premium coming-soon takeover
  app/admin/           Supabase Auth-gated CMS (content + form inbox)
  app/actions/         Server actions (form submission)
  components/          Blueprint UI primitives, header/footer, forms
  content/             Typed content model + static seed + accessor (DB swap-in point)
  i18n/                next-intl routing, navigation, request config
  lib/                 env, schemas (Zod), markdown, Supabase clients
  messages/            en.json / tr.json translation catalogs
supabase/              SQL migrations, RLS policies, seed script
public/media/          Site imagery (slugified from the Wix export)
ref/                   Source material: Wix export pack + original Site Files
```

## Content

Content originates from the Wix export in `ref/` and lives in `src/content/seed.ts`
(the source of truth until Supabase is wired). See [MIGRATION.md](./MIGRATION.md) for the
list of items still needed from the Wix admin panel (full blog bodies, portfolio details,
legal text, SEO metadata, analytics IDs).

See [PLAN.md](./PLAN.md) for the full architecture and design rationale.
