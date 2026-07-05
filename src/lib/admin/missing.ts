/**
 * "Eksik Kalanlar" — items that could NOT be recovered from the old Wix site
 * and need real data from the company (or are optional infra improvements).
 * Shown at /admin/missing. Source of truth mirrors MIGRATION.md.
 */
export type MissingStatus = "bekliyor" | "opsiyonel" | "kısmen";

export interface MissingItem {
  title: string;
  detail: string;
  status: MissingStatus;
  where?: string; // where to provide it
}

export interface MissingGroup {
  title: string;
  items: MissingItem[];
}

export const MISSING: MissingGroup[] = [
  {
    title: "Yasal & Şirket Bilgileri",
    items: [
      {
        title: "Resmi tüzel kişilik bilgileri",
        detail:
          "Künye ve gizlilik sayfalarındaki [DOLDURUN] yer tutucuları: tescilli şirket unvanı, şirket türü, ticaret sicil numarası, vergi/VAT numarası ve yetkili temsilci(ler).",
        status: "bekliyor",
        where: "Bize iletin veya src/content/legal.ts",
      },
      {
        title: "Tam ofis adresleri",
        detail:
          "Doha, Dubai, İstanbul ve Delaware için açık posta adresleri. Delaware adresi hâlâ eksik — sadece footer'da mı yoksa tam tüzel adres mi olacak, netleştirin.",
        status: "bekliyor",
        where: "Ayarlar / locations tablosu",
      },
      {
        title: "İletişim detayları",
        detail:
          "contact@qualtronsinclair.com dışında ek e-posta adresleri, telefon/WhatsApp numaraları.",
        status: "opsiyonel",
      },
      {
        title: "Yatırım / Girişim Merkezi feragatnameleri",
        detail:
          "InnoVenture yapay zeka eşleştirme onayının hukuki dayanağı ve girişim/yatırımcı yükleme formu için yasal metinler.",
        status: "bekliyor",
      },
    ],
  },
  {
    title: "Portföy",
    items: [
      {
        title: "Girişim / partner detayları",
        detail:
          "Her giriş için: tam ad · kısa açıklama · logo · dış bağlantı · kategori (girişim/partner/iştirak/yatırım/platform) · sıra · herkese açık mı gizli mi. Şu an sadece Ritefit ve CorteQS var.",
        status: "kısmen",
        where: "/admin (yakında editör) veya src/content/seed.ts",
      },
      {
        title: "Portföy / şirket logoları",
        detail: "Orijinal çözünürlükte logo dosyaları (Ritefit, CorteQS ve eklenecek diğerleri).",
        status: "bekliyor",
      },
    ],
  },
  {
    title: "Medya (orijinal çözünürlük)",
    items: [
      {
        title: "Orijinal logo ve marka ikonları",
        detail:
          "Şu an public/media/* içindekiler Wix CDN'in optimize edilmiş sürümleri. Wix Media Manager'dan orijinal logo, favicon ve marka dosyaları en iyi kalite için.",
        status: "opsiyonel",
      },
      {
        title: "Hero / kapak görselleri (yüksek çözünürlük)",
        detail: "Hizmet görselleri, blog kapakları ve arka plan görsellerinin orijinal halleri.",
        status: "opsiyonel",
      },
    ],
  },
  {
    title: "SEO & Analitik",
    items: [
      {
        title: "Analitik / izleme kimlikleri",
        detail:
          "Google Analytics / GTM, Meta Pixel, Google Search Console doğrulama kodu. Sağlarsanız kurarım.",
        status: "bekliyor",
        where: "Bize iletin",
      },
      {
        title: "Sosyal medya profilleri",
        detail:
          "LinkedIn / X (Twitter) profil adresleri — SEO yapılandırılmış verisi (sameAs) için. SOCIAL_LINKS env'ine eklenecek.",
        status: "bekliyor",
        where: "SOCIAL_LINKS ortam değişkeni",
      },
      {
        title: "Eski indekslenmiş adresler (301 listesi)",
        detail:
          "Google'da indeksli eski Wix adreslerinin tam listesi — yönlendirme (301) haritasını eksiksiz tamamlamak için.",
        status: "opsiyonel",
      },
    ],
  },
  {
    title: "Formlar & E-posta",
    items: [
      {
        title: "Resend API anahtarı",
        detail:
          "Form geldiğinde otomatik e-posta bildirimi için. resend.com'dan ücretsiz alınır; RESEND_API_KEY olarak eklenir. Anahtar olmadan formlar yine çalışır, panelde görünür.",
        status: "bekliyor",
        where: "RESEND_API_KEY ortam değişkeni",
      },
      {
        title: "Girişim Merkezi dosya yükleme",
        detail:
          "Şu an bağlantı (link) kabul ediyor. Gerçek dosya yükleme için depolama (Supabase Storage) yapılandırması, izinli dosya türleri ve boyut sınırları.",
        status: "opsiyonel",
      },
      {
        title: "Spam / kötüye kullanım koruması",
        detail:
          "Yoğun trafik öncesi kenar (edge) katmanında captcha / hız sınırı (Cloudflare Turnstile veya Coolify WAF). Veritabanı tarafı zaten korumalı.",
        status: "opsiyonel",
      },
    ],
  },
  {
    title: "İçerik (ince ayar)",
    items: [
      {
        title: "Türkçe çevirilerin ana dil kontrolü",
        detail:
          "Tüm blog ve sayfa Türkçe metinleri hazır; bir ana dil editörünün son okuma yapması önerilir.",
        status: "opsiyonel",
      },
      {
        title: "Blog başına SEO başlık/açıklama + kategori/etiket",
        detail: "Her yazı için özel SEO başlığı, meta açıklaması ve kategori/etiketler.",
        status: "opsiyonel",
      },
    ],
  },
];
