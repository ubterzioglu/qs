# Qualtron Sinclair — Content Export & Static Site

This repository contains the **content** of the Qualtron Sinclair site, exported
from Wix and restructured so you can edit it as code and host it anywhere
(GitHub Pages, Netlify, Vercel, or any static host).

> **Why not a 1:1 copy of the Wix site?**
> Wix does not let you export the source code (HTML/CSS/JS) of a standard site.
> What *is* portable is the content. This export pulls the blog content via the
> Wix REST API and converts it from Wix's Ricos rich‑text format into clean
> Markdown, which you fully control and can re-render into any framework.

## What's included

```
qualtron-sinclair/
├── README.md
├── .gitignore
├── package.json
├── build.mjs                 # zero-dependency Markdown -> static HTML builder
├── content/
│   ├── posts.json            # index of all posts + metadata
│   └── posts/                # one Markdown file per blog post (front matter + body)
│       ├── beyond-intelligence-the-rise-of-autonomous-digital-agents.md
│       ├── the-digital-fabric-of-cities-smart-ecosystems-and-civic-ai.md
│       ├── clone-age-2.md
│       └── clone-age.md
└── dist/                     # generated static site (after `npm run build`)
```

## Content extracted

| Post | Language | Published |
|------|----------|-----------|
| Beyond Intelligence: The Rise of Autonomous Digital Agents | EN | 2025-07-15 |
| The Digital Fabric of Cities: Smart Ecosystems and Civic AI | EN | 2025-07-08 |
| Clone Age 2 | EN | 2025-07-07 |
| Clone Age | EN / TR | 2025-07-06 |

## Notes & caveats

- **Images** currently point to the original Wix CDN (`static.wixstatic.com`).
  They will keep working while your Wix site exists. To fully self-host, download
  them into `content/assets/` and update the Markdown image links. See
  "Downloading images" below.
- **Only blog content** was portable. The site's Stores app was disabled, and no
  custom CMS collections existed beyond the Blog app's own. Page layouts, theme,
  and design are **not** exportable from Wix and are not included.
- Some posts had Turkish slugs that didn't match their English titles (a Wix
  editing artifact). Slugs were normalized; the original slug is preserved in
  each file's front matter as `originalSlug` for redirect mapping if needed.

## Usage

Requires Node.js 18+.

```bash
npm run build      # renders content/ into dist/ as static HTML
npm run serve      # optional: preview dist/ locally (uses `npx serve`)
```

Then push to GitHub and enable **Settings → Pages → Deploy from branch → /dist**
(or point Netlify/Vercel at the `build` command with `dist` as the output dir).

### Downloading images to self-host

```bash
mkdir -p content/assets
# example for one image:
curl -L "https://static.wixstatic.com/media/d7fe0e_532a450ca64844f8a800c738c302b200~mv2.jpg" \
  -o content/assets/autonomous-agents-cover.jpg
```
Then replace the corresponding `https://static.wixstatic.com/...` URL in the
Markdown with `assets/autonomous-agents-cover.jpg`.

## Migrating to a framework instead

The Markdown + `posts.json` structure drops directly into:
- **Astro** — `src/content/` collections
- **Next.js** — `contentlayer` or `next-mdx-remote`
- **Hugo / Eleventy** — `content/posts/`

You keep the writing, lose the Wix lock-in.
