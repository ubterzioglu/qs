# Handover — Qualtron Sinclair (qualtronsinclair.com)

Repo: `ubterzioglu/qs` · Son commit: `a29e371` · Tüm işler push edildi, çalışma alanı temiz.

## Durum: SİTE HAZIR ✅
İki dilli (EN/TR) tam site + yönetim paneli + SEO/GEO. Coolify'da son commit redeploy edilince canlı.

## Teknoloji
Next.js 15 (App Router) · TypeScript · Tailwind v4 · next-intl · Supabase (Postgres+RLS) ·
Resend (e-posta) · Docker/Coolify. Standalone build **sadece Linux/Docker'da** çalışır
(Windows'ta `EPERM: symlink` verir — normal; doğrulama için `docker build` kullan).

## Ortam değişkenleri (Coolify)
- **Build variable**: `NEXT_PUBLIC_SITE_URL` (=https://www.qualtronsinclair.com),
  `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Runtime**: `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`,
  (opsiyonel) `RESEND_API_KEY`, `CONTACT_NOTIFY_EMAIL`, `SOCIAL_LINKS`, `MAINTENANCE_MODE`
- Gerçek değerler **`.env.local`**'de (git-ignored). Supabase şeması + seed + admin
  kullanıcı zaten oluşturuldu; Coolify'da tekrar çalıştırma gerekmez.

## Yönetim paneli
`/admin/login` — **tek şifre** (`.env.local` > `ADMIN_PASSWORD` = `Burakubt2026**`).
Bölümler: Genel Bakış · Form Gönderileri (CSV) · Revizyon İstekleri (+yorum) · Hizmetler ·
İçgörüler · Güncellemeler · Eksik Kalanlar · Ayarlar. Tamamı Türkçe, sol sidebar.

## Doğrulama komutları
```
pnpm tsc --noEmit                 # typecheck
docker build -t qs .              # gerçek build testi (Linux)
pnpm seed                         # içeriği DB'ye yükle (idempotent)
pnpm tsx scripts/verify-rls.ts    # güvenlik smoke testi
```
Dev'de admin sayfası screenshot'ı için: geçerli `qs_admin` çerezi üret (HMAC-SHA256,
`ADMIN_SESSION_SECRET`, payload=`exp.hmac(exp)`), cookie ile fetch et → HTML'i diske
yaz → Edge `--headless --screenshot` ile aç. (Örnek akış önceki oturumlarda çalıştı.)

## ⏳ YARIM KALAN İŞ: Gerçek logo uygulaması
Kullanıcı gerçek logoyu paylaştı (koyu lacivert zemin, krem serif "QUALTRON SINCLAIR"
+ iç içe kare Q monogramı, orijinal **4880×1384**) ve şunu istedi:
**"logoyu gerekli yerlere gerekli sıkıştırmaları yaparak ekle; favicon ve OG için de kullan."**

**BLOKAJ:** Harness yüklenen görseli **diske kaydetmedi**; işlenemedi. İlk adım:
1. Kullanıcıdan logoyu şu yola kaydetmesini iste: `ref/brand/qualtron-logo.png`
   (veya PNG'yi elde et). Diskte olmadan favicon üretilemez.
2. `scripts/gen-brand-assets.ts`'i logodan besleyecek şekilde güncelle:
   - **favicon/icon** (küçük boyutlar): sadece **Q monogramı** kırp (wordmark değil),
     brass/obsidian. Çıktı: `src/app/icon.png` (32), `icon.svg`, `apple-icon.png` (180),
     `public/icon-192.png` / `icon-512.png` / `icon-maskable-512.png`.
   - **OG/Twitter** (1200×630): tam logo (wordmark dahil) koyu zemin ortada.
     Çıktı: `src/app/opengraph-image.png` + `twitter-image.png`.
   - `sharp` kurulu; sıkıştırma için `.png({quality, compressionLevel})` / gerekiyorsa
     `.webp()`. Orijinali `ref/brand/`'e koy (git-ignored `ref/` — büyük dosya sorun değil).
3. **Header + Footer'da** logoyu göster: şu an `src/components/site-header.tsx` ve
   `site-footer.tsx` inline SVG `QSMark` + metin "QUALTRON SINCLAIR" kullanıyor. Gerçek
   logoyu (tam yatay versiyon header'da; monogram+metin footer'da) `next/image` ile koy.
   Koyu zeminli logo olduğu için açık temada dikkat — ya beyaz/koyu iki varyant üret,
   ya monogramı şeffaf zeminli kullan. (Site public teması AÇIK "drafting paper"; admin
   KOYU. Logo koyu zeminli → açık temada bir çerçeve/koyu kutu içine al veya renk varyantı üret.)
4. Üretimden sonra: `pnpm tsc --noEmit` + `docker build` (50→ sayfa yeşil) + OG görselini
   Read ile göz kontrolü + commit/push.

**Not:** `scripts/gen-brand-assets.ts` şu an monogramı SVG'den üretiyor (placeholder marka).
Gerçek logo gelince onu `sharp` ile kırp/ölçekle — SVG üretimini değiştir.

## Kullanıcıdan bekleyen diğer bilgiler
`/admin/missing` (Eksik Kalanlar) sayfasında tam liste var. Öne çıkanlar: yasal
metinlerdeki `[DOLDURUN]` (gerçek tüzel kişilik), portföy detayları/logoları,
`RESEND_API_KEY`, `SOCIAL_LINKS`, analytics ID'leri, Delaware adresi.

## Önemli dosya haritası
- İçerik: `src/content/{seed.ts,legal.ts,index.ts,db.ts,types.ts}`
- SEO/GEO: `src/lib/seo.ts`, `src/components/json-ld.tsx`, `src/app/{sitemap,robots,manifest}.ts`, `src/app/llms.txt/route.ts`
- Admin: `src/app/admin/**`, `src/lib/admin/{auth,session,submissions,changelog,missing}.ts`, `src/lib/env.server.ts`
- Marka varlıkları: `src/app/{icon,apple-icon,opengraph-image,twitter-image}.png` + `scripts/gen-brand-assets.ts`
- Deploy: `Dockerfile`, `DEPLOY.md`, `MIGRATION.md`
