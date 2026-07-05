/**
 * Generate favicon + OG assets from the REAL Qualtron Sinclair logo
 * (ref/brand/qualtron-logo.jpg — obsidian tile, cream serif wordmark + nested-square
 * "Q" monogram). Small icons use the cropped monogram (wordmark is illegible at 32px);
 * the OG card uses the full logo. Renders with sharp into src/app + public.
 *
 *   pnpm tsx scripts/gen-brand-assets.ts
 */
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";

const OBSIDIAN = "#09082a"; // sampled from the logo tile so it blends seamlessly

const root = process.cwd();
const LOGO = resolve(root, "ref/brand/qualtron-logo.jpg");
const pub = (p: string) => resolve(root, "public", p);
const app = (p: string) => resolve(root, "src/app", p);

// Monogram crop from the 500x500 logo (tuned to the nested-square "Q").
const MONO = { left: 36, top: 204, width: 92, height: 92 };

/** A square icon of the monogram on the obsidian tile, at `size` px. */
async function iconBuffer(size: number, padRatio = 0.18): Promise<Buffer> {
  const inner = Math.round(size * (1 - padRatio * 2));
  const mono = await sharp(LOGO)
    .extract(MONO)
    .resize(inner, inner, { fit: "contain", background: OBSIDIAN })
    .toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 4, background: OBSIDIAN },
  })
    .composite([{ input: mono, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function writeIcon(size: number, out: string, padRatio?: number) {
  const buf = await iconBuffer(size, padRatio);
  await sharp(buf).toFile(out);
  console.log("  ", out.replace(root, "."), `(${(buf.length / 1024).toFixed(1)}KB)`);
}

/** 1200x630 Open Graph card: full logo centered on the obsidian tile color. */
async function writeOg(out: string) {
  const W = 1200, H = 630;
  // Full logo scaled to fit within the card with margin (height-constrained so
  // the square logo never exceeds the 630px canvas height).
  const logo = await sharp(LOGO)
    .resize(500, 500, { fit: "inside" })
    .toBuffer();
  const buf = await sharp({
    create: { width: W, height: H, channels: 4, background: OBSIDIAN },
  })
    .composite([{ input: logo, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
  await sharp(buf).toFile(out);
  console.log("  ", out.replace(root, "."), `(${(buf.length / 1024).toFixed(1)}KB)`);
}

async function run() {
  await mkdir(pub("."), { recursive: true });

  console.log("favicons (monogram)…");
  await writeIcon(32, app("icon.png"));
  await writeIcon(180, app("apple-icon.png"), 0.14);
  await writeIcon(192, pub("icon-192.png"));
  await writeIcon(512, pub("icon-512.png"));
  await writeIcon(512, pub("icon-maskable-512.png"), 0.24); // extra safe-zone padding

  console.log("Open Graph / Twitter (full logo)…");
  await writeOg(app("opengraph-image.png"));
  await writeOg(app("twitter-image.png"));

  console.log("Done ✔");
  console.log("Note: icon.svg (vector monogram) is kept as-is for crisp tab rendering.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
