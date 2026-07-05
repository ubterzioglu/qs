/**
 * Admin "Güncellemeler" (changelog) — human-readable release notes shown at
 * /admin/updates. Add a new entry to the top of RELEASES when you ship changes.
 */
export interface ChangelogEntry {
  date: string; // ISO date, e.g. "2026-07-05"
  title: string;
  tag?: "yeni" | "iyileştirme" | "düzeltme" | "tasarım";
  items: string[];
}

export const RELEASES: ChangelogEntry[] = [
  {
    date: "2026-07-05",
    title: "Yönetim paneli, içerik, tasarım ve SEO",
    items: [
      "Sitenin tasarımı yeni “Obsidian & Brass” koyu kurumsal temaya geçirildi (lacivert zemin, serif başlıklar, altın/bronz vurgular, video hero). Önceki tasarım yedeklendi.",
      "Gerçek blog yazıları (Beyond Intelligence, Digital Fabric of Cities, Clone Age, Clone Age 2) tam metin ve kapak görselleriyle siteye aktarıldı; yazar bilgisi eklendi.",
      "Supabase veritabanı bağlandı: içerik yönetimi (hizmetler, blog, ayarlar), form gönderileri ve revizyon istekleri artık veritabanında.",
      "Yönetim paneli oluşturuldu: gösterge paneli, form gönderileri (CSV indirme), revizyon istekleri + yorumlar, hizmet/blog editörleri, site ayarları.",
      "Revizyon istekleri bölümü eklendi: değişiklik isteği oluşturma, öncelik/durum takibi ve her isteğin altına yorum ekleme.",
      "Yönetim girişi tek şifreye çevrildi; imzalı güvenli oturum çerezi ile korunuyor (Supabase e-posta girişi kaldırıldı).",
      "Yönetim paneli tamamen Türkçeleştirildi ve premium sol menülü (sidebar) düzene geçirildi; giriş ekranı iki sütunlu şık kart oldu.",
      "Giriş/çıkış yönlendirme hatası (0.0.0.0 adresine gitme) düzeltildi; artık her zaman doğru alan adına yönlendiriyor.",
      "SEO paketi eklendi: favicon seti, sosyal paylaşım (OG/Twitter) görseli, sitemap.xml, robots.txt, canonical ve çoklu dil (hreflang) etiketleri.",
      "GEO / yapay zeka arama optimizasyonu: yapılandırılmış veri (Organization, FAQ, Article), ve AI asistanları için /llms.txt özeti eklendi.",
    ],
  },
  {
    date: "2026-07-04",
    title: "İlk kurulum ve yayına hazırlık",
    items: [
      "Site sıfırdan modern altyapıyla kuruldu (Next.js 15, TypeScript, Tailwind).",
      "İki dilli (İngilizce + Türkçe) tam site: ana sayfa, 6 hizmet sayfası, portföy, QS Networks, liderlik, kariyer, içgörüler, iletişim.",
      "Formlar eklendi: iletişim, kariyer başvurusu, InnoVenture başvurusu, Girişim Merkezi.",
      "Premium “yenileniyoruz” (bakım) sayfası — tek ayarla açılıp kapanabilir.",
      "Coolify ile yayına alma altyapısı (Docker) hazırlandı ve doğrulandı.",
    ],
  },
];
