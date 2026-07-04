# Claude Code Rebuild Prompt — Qualtron Sinclair

You are a senior full-stack engineer and product designer. Rebuild the Wix website `https://www.qualtronsinclair.com/` as a modern, fast, production-ready site.

Use this export package as the source of truth. Inspect all files first.

Stack:

- Next.js App Router
- TypeScript strict mode
- Tailwind CSS
- Supabase PostgreSQL + RLS
- Vercel deployment
- Zod for forms
- Server Components by default

Build pages:

- `/` Home
- `/services/legal-compliance`
- `/services/talent-recruitment`
- `/services/digital-presence-platforms`
- `/services/physical-infrastructure`
- `/services/innovation-technology`
- `/services/capital-structuring-fundraising`
- `/portfolio`
- `/qs-networks`
- `/leadership`
- `/careers`
- `/insights`
- `/insights/[slug]`
- `/contact`
- `/impressum`
- `/privacy`

Content:

- Use Markdown and JSON from `content/`.
- Do not use placeholder Wix content from `/about-5` as production copy.
- Preserve core Qualtron Sinclair positioning: growth architecture, MENA expansion, compliance, capital, technology, talent, infrastructure, operations.
- Do not invent legal/entity facts.
- Do not invent partner/portfolio details beyond what is provided.

Supabase tables:

- pages
- services
- portfolio_items
- blog_posts
- media_assets
- contact_messages
- career_applications
- innoventure_applications
- startup_hub_submissions
- redirects
- site_settings

RLS:

- Public read for published pages/services/blog/portfolio/media.
- Public insert for forms only.
- No public update/delete.

Forms:

- Contact form inserts into contact_messages.
- Careers form inserts into career_applications.
- InnoVenture form inserts into innoventure_applications and includes consent field.
- Startup hub upload form should be scaffolded; if file storage is not configured, create a clean form and TODO.

SEO:

- Use current slugs or create redirect mapping.
- Add sitemap.xml and robots.txt.
- Add Organization, WebSite, ProfessionalService/Corporation JSON-LD where appropriate.
- Add canonical URLs.

Design:

- Premium business advisory / asset manager visual identity.
- Dark corporate background, refined typography, subtle gold/steel accents.
- Not a generic SaaS template.
- Clean, international, MENA/global expansion feeling.
- Strong service cards and portfolio grid.
- Mobile-first.

Critical cleanup:

- Remove all Wix artifacts.
- Replace generic `/about-5` placeholder content.
- Correct obvious typos: `assesments` -> `assessments`, `clientsand` -> `clients and`.
- Preserve meaning, improve polish.
- Add TODO_PANEL_EXPORTS.md items to README migration notes.

Run:

- pnpm install
- pnpm lint
- pnpm typecheck
- pnpm build

Fix all errors before finishing.
