// Zero-dependency static site builder for the Qualtron Sinclair content export.
// Reads content/posts/*.md (with YAML-ish front matter) and content/posts.json,
// renders a small static site into dist/. No npm install required.

import { readFileSync, readdirSync, writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT = join(__dirname, "content");
const POSTS_DIR = join(CONTENT, "posts");
const DIST = join(__dirname, "dist");

// ---------- tiny front-matter parser ----------
function parseFrontMatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    data[key] = val;
  }
  return { data, body: m[2] };
}

// ---------- minimal Markdown -> HTML ----------
function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function inlineMd(s) {
  let t = escapeHtml(s);
  t = t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" loading="lazy">');
  t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  t = t.replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>");
  return t;
}
function mdToHtml(md) {
  const lines = md.split("\n");
  const out = [];
  let i = 0;
  while (i < lines.length) {
    let line = lines[i];
    if (/^\s*$/.test(line)) { i++; continue; }
    // standalone image line
    if (/^!\[[^\]]*\]\([^)]+\)\s*$/.test(line.trim())) {
      out.push(`<figure>${inlineMd(line.trim())}</figure>`);
      i++; continue;
    }
    // headings
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) { const lvl = h[1].length; out.push(`<h${lvl}>${inlineMd(h[2])}</h${lvl}>`); i++; continue; }
    // horizontal rule
    if (/^---\s*$/.test(line)) { out.push("<hr>"); i++; continue; }
    // unordered list
    if (/^\s*[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(`<li>${inlineMd(lines[i].replace(/^\s*[-*]\s+/, ""))}</li>`);
        i++;
      }
      out.push(`<ul>${items.join("")}</ul>`);
      continue;
    }
    // ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(`<li>${inlineMd(lines[i].replace(/^\s*\d+\.\s+/, ""))}</li>`);
        i++;
      }
      out.push(`<ol>${items.join("")}</ol>`);
      continue;
    }
    // paragraph (collect until blank line)
    const buf = [];
    while (i < lines.length && !/^\s*$/.test(lines[i]) &&
           !/^(#{1,6})\s/.test(lines[i]) && !/^\s*[-*]\s+/.test(lines[i]) &&
           !/^\s*\d+\.\s+/.test(lines[i]) && !/^---\s*$/.test(lines[i])) {
      buf.push(lines[i]); i++;
    }
    out.push(`<p>${inlineMd(buf.join(" "))}</p>`);
  }
  return out.join("\n");
}

// ---------- templates ----------
const CSS = `
:root{--bg:#0d0f14;--fg:#e9e6df;--muted:#9aa0aa;--accent:#aa8c42;--card:#151821;}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.7 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}
a{color:var(--accent);text-decoration:none}a:hover{text-decoration:underline}
.wrap{max-width:760px;margin:0 auto;padding:2.5rem 1.25rem}
header.site{border-bottom:1px solid #222836;margin-bottom:2rem}
header.site h1{font-size:1.4rem;letter-spacing:.02em;margin:0 0 .25rem}
header.site p{color:var(--muted);margin:0 0 1.5rem}
.card{background:var(--card);border:1px solid #1e2330;border-radius:14px;padding:1.25rem 1.4rem;margin:0 0 1rem;transition:border-color .2s}
.card:hover{border-color:var(--accent)}
.card h2{margin:.1rem 0 .4rem;font-size:1.15rem}
.card .meta{color:var(--muted);font-size:.82rem;margin-bottom:.5rem}
.card p.ex{color:#c8ccd4;margin:0}
article h1{font-size:1.9rem;line-height:1.25;margin:0 0 .5rem}
article .meta{color:var(--muted);font-size:.85rem;margin-bottom:2rem}
article img{max-width:100%;border-radius:12px;height:auto}
article figure{margin:1.5rem 0}
article h2{margin-top:2.2rem;border-bottom:1px solid #222836;padding-bottom:.3rem}
article h3{margin-top:1.8rem;color:var(--accent)}
hr{border:none;border-top:1px solid #222836;margin:2.5rem 0}
.back{display:inline-block;margin-bottom:1.5rem;font-size:.9rem}
footer{color:var(--muted);font-size:.8rem;border-top:1px solid #222836;margin-top:3rem;padding-top:1.5rem}
`;

function page({ title, body }) {
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(title)}</title>
<style>${CSS}</style>
</head><body><div class="wrap">${body}
<footer>Qualtron Sinclair — content export from Wix. Rebuilt as a static site.</footer>
</div></body></html>`;
}

function fmtDate(d){ if(!d) return ""; try{ return new Date(d).toLocaleDateString("en-GB",{year:"numeric",month:"short",day:"numeric"});}catch{return d;} }

// ---------- build ----------
if (existsSync(DIST)) rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });
mkdirSync(join(DIST, "post"), { recursive: true });

const files = readdirSync(POSTS_DIR).filter(f => f.endsWith(".md"));
const posts = [];
for (const f of files) {
  const raw = readFileSync(join(POSTS_DIR, f), "utf8");
  const { data, body } = parseFrontMatter(raw);
  const slug = data.slug || f.replace(/\.md$/, "");
  posts.push({ ...data, slug, body });
}
posts.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

// post pages
for (const p of posts) {
  const html = page({
    title: `${p.title} — Qualtron Sinclair`,
    body: `<a class="back" href="../index.html">← All posts</a>
<article>
<h1>${escapeHtml(p.title)}</h1>
<div class="meta">${fmtDate(p.date)}${p.minutesToRead ? ` · ${p.minutesToRead} min read` : ""}${p.author ? ` · ${escapeHtml(p.author)}` : ""}</div>
${p.coverImage ? `<figure><img src="${p.coverImage}" alt=""></figure>` : ""}
${mdToHtml(p.body)}
</article>`
  });
  writeFileSync(join(DIST, "post", `${p.slug}.html`), html);
}

// index
const cards = posts.map(p => `
<a class="card" href="post/${p.slug}.html" style="display:block">
  <h2>${escapeHtml(p.title)}</h2>
  <div class="meta">${fmtDate(p.date)}${p.minutesToRead ? ` · ${p.minutesToRead} min read` : ""}</div>
  <p class="ex">${escapeHtml(p.excerpt || "")}</p>
</a>`).join("");

writeFileSync(join(DIST, "index.html"), page({
  title: "Qualtron Sinclair — Blog",
  body: `<header class="site"><h1>Qualtron Sinclair</h1><p>Blog — exported from Wix, rebuilt as a static site.</p></header>${cards}`
}));

console.log(`Built ${posts.length} posts → dist/`);
