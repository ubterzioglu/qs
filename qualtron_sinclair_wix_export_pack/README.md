# Qualtron Sinclair Wix Export Pack

This package contains a public-side scrape of the Wix website `https://www.qualtronsinclair.com/` prepared for AI-assisted rebuild.

## Folder structure

```text
content/
  pages/          Markdown pages extracted from public site
  services/       Service vertical pages
  blog/           Blog posts that were publicly readable
  data/           Structured JSON manifests
scripts/
  download-assets.sh
TODO_PANEL_EXPORTS.md
source-summary.md
claude-code-rebuild-prompt.md
```

## Recommended rebuild stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase PostgreSQL + RLS
- Vercel deployment

## Asset note

The package includes image URL manifests, not downloaded image binaries. Use `scripts/download-assets.sh` locally, or export original media from Wix Media Manager for best quality.

## High priority before rebuild

Read `TODO_PANEL_EXPORTS.md`.
