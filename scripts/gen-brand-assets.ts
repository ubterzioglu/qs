/**
 * Generate favicon + OG assets from the brand marks (obsidian + brass).
 * Renders SVG -> PNG/ICO with sharp into src/app (Next metadata files) and public/.
 *
 *   pnpm tsx scripts/gen-brand-assets.ts
 */
import { writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";

const OBSIDIAN = "#0a0e1f";
const BRASS = "#c8a15a";
const CREAM = "#f3efe6";

const root = process.cwd();
const pub = (p: string) => resolve(root, "public", p);
const app = (p: string) => resolve(root, "src/app", p);

/** The nested-square "Q" monogram on the obsidian tile. `pad` = inset ratio. */
function iconSvg(size: number, opts: { bg?: string; stroke?: string; radius?: number } = {}) {
  const bg = opts.bg ?? OBSIDIAN;
  const stroke = opts.stroke ?? BRASS;
  const r = opts.radius ?? 0;
  // 26x26 monogram viewBox, centered & scaled with padding.
  const inner = size * 0.62;
  const off = (size - inner) / 2;
  const sw = Math.max(1.5, size * 0.06);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${r}" fill="${bg}"/>
  <g transform="translate(${off} ${off}) scale(${inner / 26})" fill="none" stroke="${stroke}" stroke-width="${(sw * 26) / inner}">
    <rect x="1" y="1" width="24" height="24"/>
    <rect x="7" y="7" width="12" height="12"/>
    <path d="M15 15L23 23"/>
  </g>
</svg>`;
}

/** 1200x630 Open Graph / Twitter card. */
function ogSvg() {
  const W = 1200, H = 630;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0f1630"/>
      <stop offset="1" stop-color="${OBSIDIAN}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <!-- faint blueprint grid -->
  <g stroke="${CREAM}" stroke-opacity="0.05" stroke-width="1">
    ${Array.from({ length: 30 }, (_, i) => `<line x1="${i * 40}" y1="0" x2="${i * 40}" y2="${H}"/>`).join("")}
    ${Array.from({ length: 16 }, (_, i) => `<line x1="0" y1="${i * 40}" x2="${W}" y2="${i * 40}"/>`).join("")}
  </g>
  <!-- monogram -->
  <g transform="translate(96 96) scale(3.2)" fill="none" stroke="${BRASS}" stroke-width="1.6">
    <rect x="1" y="1" width="24" height="24"/>
    <rect x="7" y="7" width="12" height="12"/>
    <path d="M15 15L23 23"/>
  </g>
  <!-- eyebrow -->
  <text x="96" y="360" fill="${BRASS}" font-family="monospace" font-size="24" letter-spacing="6">GROWTH ARCHITECTURE · MENA</text>
  <!-- wordmark -->
  <text x="94" y="440" fill="${CREAM}" font-family="Georgia, 'Times New Roman', serif" font-size="82" font-weight="600">Qualtron Sinclair</text>
  <!-- tagline -->
  <text x="96" y="510" fill="#a9b2c9" font-family="Georgia, serif" font-size="40">We design the structure behind growth.</text>
  <!-- offices -->
  <text x="96" y="575" fill="#6b7591" font-family="monospace" font-size="22" letter-spacing="4">DOHA — DUBAI — ISTANBUL — DELAWARE</text>
</svg>`;
}

async function png(svg: string, out: string) {
  await sharp(Buffer.from(svg)).png().toFile(out);
  console.log("  ", out.replace(root, "."));
}

async function run() {
  await mkdir(pub("."), { recursive: true });

  console.log("favicons…");
  // Next App Router picks these up automatically from src/app/*.
  await png(iconSvg(32), app("icon.png"));            // browser tab
  await png(iconSvg(180, { radius: 40 }), app("apple-icon.png")); // iOS home screen
  // PWA icons in public/
  await png(iconSvg(192), pub("icon-192.png"));
  await png(iconSvg(512), pub("icon-512.png"));
  // Maskable (safe-zone padding via smaller monogram already applied)
  await png(iconSvg(512), pub("icon-maskable-512.png"));
  // .ico (multi-size) for legacy
  await sharp(Buffer.from(iconSvg(48))).resize(48, 48).toFormat("png").toFile(pub("favicon-48.png"));
  // Next serves favicon.ico from src/app/favicon.ico
  await sharp(Buffer.from(iconSvg(32))).resize(32, 32).toFormat("png").toFile(app("favicon.ico"));

  // SVG favicon (crisp at any size)
  await writeFile(app("icon.svg"), iconSvg(32).trim(), "utf8");

  console.log("Open Graph image…");
  await png(ogSvg(), app("opengraph-image.png")); // 1200x630, auto-used by Next
  await png(ogSvg(), app("twitter-image.png"));

  console.log("Done ✔");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
