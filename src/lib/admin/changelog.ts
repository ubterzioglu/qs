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
    title: "Eksik Kalanlar bölümü + son içerik",
    items: [
      "Yönetim paneline “Eksik Kalanlar” bölümü eklendi: eski Wix sitesinden alınamayan ve sizden beklenen gerçek bilgiler kategorize edildi (durum rozetleriyle).",
      "İki blog yazısının (Beyond Intelligence, Digital Fabric of Cities) tam Türkçe çevirisi eklendi.",
      "Yasal sayfalar hazırlandı: Künye (Impressum), Gizlilik Politikası ve Çerez Politikası — profesyonel, KVKK/GDPR uyumlu taslaklar. Gerçek şirket bilgileri için [DOLDURUN] yer tutucuları bırakıldı.",
      "Form gönderilerinde e-posta bildirimi altyapısı (Resend) kuruldu; anahtar girilince gelen her formda otomatik mail atar.",
      "Portföy içeriği düzenlenebilir yapıya taşındı (Ritefit, CorteQS) ve dış bağlantı desteği eklendi.",
      "SEO için sosyal medya profili alanı (yapılandırılmış veri) hazırlandı.",
      "Yönetim paneline “Güncellemeler” (bu) bölümü eklendi.",
    ],
  },
  {
    date: "2026-07-05",
    title: "Yeni tasarım, veritabanı ve yönetim paneli",
    items: [
      "Sitenin tasarımı yeni “Obsidian & Brass” koyu kurumsal temaya geçirildi (lacivert zemin, serif başlıklar, altın/bronz vurgular, tanıtım videolu hero). Önceki tasarım güvenli şekilde yedeklendi.",
      "Gerçek blog yazıları (Beyond Intelligence, Digital Fabric of Cities, Clone Age, Clone Age 2) Wix API'sinden tam metin, kapak görselleri ve yazar bilgisiyle aktarıldı; eski adresler yeni adreslere yönlendirildi.",
      "Supabase veritabanı bağlandı: hizmetler, blog, portföy, ayarlar, form gönderileri ve revizyon istekleri artık veritabanında. İçerik değişiklikleri ~60 saniyede yayına giriyor.",
      "Yönetim paneli oluşturuldu: gösterge paneli, form gönderileri (CSV indirme), hizmet ve blog editörleri (EN+TR, taslak), site ayarları.",
      "Revizyon istekleri bölümü: değişiklik isteği oluşturma, öncelik/durum takibi ve her isteğin altına yorum ekleme.",
      "Yönetim girişi tek şifreye çevrildi; imzalı, güvenli (HttpOnly) oturum çerezi ile korunuyor.",
      "Yönetim paneli tamamen Türkçeleştirildi ve premium sol menülü (sidebar) düzene geçirildi; giriş ekranı iki sütunlu şık kart oldu.",
      "Güvenlik: çok-ajanlı bağımsız bir güvenlik incelemesi yapıldı; bulunan tüm açıklar (yetki kontrolü, veri sızıntısı, CSV enjeksiyonu vb.) kapatıldı ve test edildi.",
    ],
  },
  {
    date: "2026-07-05",
    title: "SEO, GEO ve marka görselleri",
    items: [
      "Favicon seti üretildi: tarayıcı sekmesi, iOS ana ekran ve PWA ikonları (marka monogramından).",
      "Sosyal paylaşım görseli (Open Graph / Twitter) hazırlandı — WhatsApp, LinkedIn ve X paylaşımlarında premium görünüm.",
      "Tam SEO: sitemap.xml, robots.txt, canonical adresler, çoklu dil (hreflang EN/TR) etiketleri, zengin meta veriler ve tema rengi.",
      "GEO / yapay zeka arama optimizasyonu: yapılandırılmış veri (Organization, WebSite, ProfessionalService, FAQ, Article, Breadcrumb) ve AI asistanları için /llms.txt özeti.",
      "Giriş/çıkış yönlendirme hatası (0.0.0.0 adresine gitme) düzeltildi; artık her zaman doğru alan adına yönlendiriyor.",
    ],
  },
  {
    date: "2026-07-04",
    title: "İlk kurulum ve yayına hazırlık",
    items: [
      "Site sıfırdan modern altyapıyla kuruldu (Next.js 15, TypeScript, Tailwind).",
      "GitHub deposu bağlandı ve Wix içerik paketi projeye alındı.",
      "İki dilli (İngilizce + Türkçe) tam site: ana sayfa, 6 hizmet sayfası, portföy, QS Networks, liderlik, kariyer, içgörüler, iletişim.",
      "Formlar eklendi: iletişim, kariyer başvurusu, InnoVenture başvurusu, Girişim Merkezi.",
      "Premium “yenileniyoruz” (bakım) sayfası — tek ayarla açılıp kapanabilir.",
      "Coolify ile yayına alma altyapısı (Docker) hazırlandı; yayınlama sırasında çıkan derleme hataları teşhis edilip çözüldü ve doğrulandı.",
    ],
  },
];
