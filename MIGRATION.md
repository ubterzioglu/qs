# Migration notes — pending Wix panel exports

The public scrape (in `ref/qualtron_sinclair_wix_export_pack/`) was enough to rebuild
the site, but the following need to be exported/confirmed from the Wix admin panel (or
provided by the client) for a clean production launch. Adapted from
`ref/.../TODO_PANEL_EXPORTS.md`.

## 1. Media (original resolution)
- Original logo files, favicon/brand icons
- Hero/background images and blog cover images in original resolution
  (current `public/media/*` are the best public-CDN versions available)

## 2. Blog content — full bodies
✅ **DONE.** All 4 posts now have full bodies, real slugs, authors, dates, and cover
images, imported from the Wix Blog API export in `ref/content/` (2026-07-05):
- `beyond-intelligence-the-rise-of-autonomous-digital-agents`
- `the-digital-fabric-of-cities-smart-ecosystems-and-civic-ai`
- `clone-age-2` (author: Burak Akçakanat) — newly added
- `clone-age` (author: Burak Akçakanat) — full EN + real TR translation
Covers downloaded to `public/media/blog/`. Old Wix post slugs 301-redirect to the new ones.
Remaining (nice-to-have): full TR translations for the two English-only posts (currently
condensed TR), and per-post SEO title/description + categories/tags.

## 3. Portfolio details
Portfolio page was image-based. Provide, per item:
full name · short description · logo · external URL · category
(venture/partner/subsidiary/investment/platform) · display order · public vs confidential.
Confirmed so far: **Ritefit** (Hisseli Gayrimenkul), **CorteQS** (corteqs.net).

## 4. Forms & submissions
- Destination emails / notification recipients / automations per form
- Consent/privacy wording (esp. InnoVenture AI-matchmaking consent — legal basis)
- Start-up Hub: file-upload storage config (currently accepts a link + TODO),
  allowed file types, size limits, spam protection

## 5. SEO & redirects
- Per-page SEO title + meta description + OG image
- Full list of currently indexed slugs (to complete the 301 map in `next.config.ts`)
- Analytics / GTM / Meta Pixel / Search Console IDs

## 6. Legal pages (real text)
`/impressum` and `/privacy` currently carry honest placeholders. Need:
- Exact legal entity name + registered office(s) + registration numbers
- Privacy / Datenschutz, cookie policy, investment/start-up-hub disclaimers
- Whether Delaware is footer-only or needs a full address/legal detail

## 7. Contact/company details to confirm
- Exact legal entity name
- Contact email(s) beyond contact@qualtronsinclair.com
- Doha / Dubai / Istanbul / Delaware addresses (Delaware address still missing)

## 8. Languages
Decision taken: **EN + TR**. Turkish translations for short marketing copy are in place;
longer bodies currently mirror EN and are editable in `/admin` — have a native reviewer
pass over `src/content/seed.ts` (TR fields) and `src/messages/tr.json`. The old `/about-5`
Turkish placeholder is intentionally dropped (redirects to `/`).
