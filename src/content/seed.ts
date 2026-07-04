/**
 * Static seed content — the single source of truth until Supabase is wired.
 * Extracted from ref/qualtron_sinclair_wix_export_pack, typos fixed
 * (assesments -> assessments, clientsand -> clients and), Wix artifacts removed.
 * TR translations provided for short marketing copy; longer bodies mirror EN
 * until reviewed (editable later in /admin).
 */
import type {
  BlogPost,
  NetworkBrand,
  Principle,
  Service,
  SiteSettings,
} from "./types";

export const services: Service[] = [
  {
    slug: "legal-compliance",
    code: "LGL",
    order: 1,
    title: { en: "Legal & Compliance", tr: "Hukuk & Uyum" },
    description: {
      en: "We establish your regional legal presence — company formation, licensing, compliance pathways, and regulatory counsel across Türkiye, UAE, and the GCC.",
      tr: "Bölgesel yasal varlığınızı kuruyoruz — Türkiye, BAE ve Körfez ülkelerinde şirket kuruluşu, lisanslama, uyum süreçleri ve regülasyon danışmanlığı.",
    },
    quote: {
      en: "We build trust by shaping transparent, resilient, and compliant foundations for your growth.",
      tr: "Büyümeniz için şeffaf, dayanıklı ve uyumlu temeller kurarak güven inşa ediyoruz.",
    },
    image: "/media/services/legal-compliance.jpg",
    imageAlt: { en: "Legal & Compliance", tr: "Hukuk & Uyum" },
  },
  {
    slug: "talent-recruitment",
    code: "TLT",
    order: 2,
    title: { en: "Talent, Training & Change", tr: "Yetenek, Eğitim & Değişim" },
    description: {
      en: "From executive search to full team hiring, training, assessments and change — we connect you with market-ready, culturally aligned talent through our recruitment, training and organizational development partners and platforms.",
      tr: "Üst düzey yönetici aramadan tüm ekip alımına, eğitime, değerlendirmelere ve değişime kadar — işe alım, eğitim ve organizasyonel gelişim partnerlerimiz ve platformlarımız aracılığıyla sizi pazara hazır, kültürel olarak uyumlu yeteneklerle buluşturuyoruz.",
    },
    quote: {
      en: "We unlock human potential with diverse, aligned, and high-impact teams that drive transformation.",
      tr: "Dönüşümü yönlendiren çeşitli, uyumlu ve yüksek etkili ekiplerle insan potansiyelini açığa çıkarıyoruz.",
    },
    image: "/media/services/talent-recruitment.jpg",
    imageAlt: { en: "Talent & Recruitment", tr: "Yetenek & İşe Alım" },
  },
  {
    slug: "digital-presence-platforms",
    code: "DIG",
    order: 3,
    title: { en: "Digital Presence & Platforms", tr: "Dijital Varlık & Platformlar" },
    description: {
      en: "We operate as a full-service digital agency, building and managing your entire online footprint — from corporate websites to mobile apps, e-commerce platforms, CRM integrations, content marketing, SEO, and performance campaigns. Our approach blends creative, strategic, and technological excellence tailored to regional dynamics.",
      tr: "Tam kapsamlı bir dijital ajans olarak çalışıyoruz; kurumsal web sitelerinden mobil uygulamalara, e-ticaret platformlarına, CRM entegrasyonlarına, içerik pazarlamasına, SEO'ya ve performans kampanyalarına kadar tüm çevrimiçi varlığınızı kuruyor ve yönetiyoruz. Yaklaşımımız yaratıcı, stratejik ve teknolojik mükemmelliği bölgesel dinamiklere göre harmanlar.",
    },
    quote: {
      en: "We craft meaningful digital footprints that connect vision to audience with creativity and precision.",
      tr: "Vizyonu izleyiciyle yaratıcılık ve hassasiyetle buluşturan anlamlı dijital ayak izleri oluşturuyoruz.",
    },
    image: "/media/services/digital-presence-platforms.jpg",
    imageAlt: { en: "Digital Presence & Platforms", tr: "Dijital Varlık & Platformlar" },
  },
  {
    slug: "physical-infrastructure",
    code: "INF",
    order: 4,
    title: { en: "Physical Infrastructure", tr: "Fiziksel Altyapı" },
    description: {
      en: "Through our design and construction subsidiaries, we deliver construction and interior design, fit-outs, and turnkey facility solutions tailored for scale, as well as supporting projects with material sourcing and architectural detailing.",
      tr: "Tasarım ve inşaat iştiraklerimiz aracılığıyla ölçeğe göre uyarlanmış inşaat ve iç mimari, iç donanım ve anahtar teslim tesis çözümleri sunuyor, ayrıca malzeme tedariki ve mimari detaylandırma ile projeleri destekliyoruz.",
    },
    quote: {
      en: "We design and deliver inspiring spaces that scale with ambition and reflect identity.",
      tr: "Hırsla ölçeklenen ve kimliği yansıtan ilham verici mekanlar tasarlıyor ve teslim ediyoruz.",
    },
    image: "/media/services/physical-infrastructure.jpg",
    imageAlt: { en: "Physical Infrastructure", tr: "Fiziksel Altyapı" },
  },
  {
    slug: "innovation-technology",
    code: "TEC",
    order: 5,
    title: { en: "Innovation & Technology", tr: "İnovasyon & Teknoloji" },
    subtitle: { en: "Next-Gen Socio-Digital Architect", tr: "Yeni Nesil Sosyo-Dijital Mimar" },
    description: {
      en: "Qualtron Sinclair also functions as a growth platform for its clients and its own AI and technology ventures. We support these startups not only with capital and structure but also with product strategy, go-to-market development, and scalability resources. Clients benefit from this innovation ecosystem through access to plug-and-play technology, bespoke AI integrations, and co-innovation opportunities. We are also deeply engaged in digital innovation across sectors such as consumer engagement, social media dynamics, academic learning, training platforms, and applied AI. While specific projects remain confidential, our portfolio represents some of the region's most cutting-edge and scalable digital ventures — designed for both B2B and B2C impact. Through internal and external investment, we aim to scale our ventures, support entrepreneurial excellence, and attract strategic co-investors.",
      tr: "Qualtron Sinclair aynı zamanda müşterileri ve kendi yapay zeka ve teknoloji girişimleri için bir büyüme platformu olarak işlev görür. Bu girişimleri yalnızca sermaye ve yapı ile değil, ürün stratejisi, pazara giriş geliştirme ve ölçeklenebilirlik kaynaklarıyla da destekliyoruz. Müşteriler bu inovasyon ekosisteminden tak-çalıştır teknolojiye, özel yapay zeka entegrasyonlarına ve ortak inovasyon fırsatlarına erişerek yararlanır. Ayrıca tüketici etkileşimi, sosyal medya dinamikleri, akademik öğrenme, eğitim platformları ve uygulamalı yapay zeka gibi sektörlerde dijital inovasyona derinlemesine dahiliz. Belirli projeler gizli kalsa da portföyümüz bölgenin en yenilikçi ve ölçeklenebilir dijital girişimlerinden bazılarını temsil eder — hem B2B hem de B2C etkisi için tasarlanmıştır.",
    },
    quote: {
      en: "We turn curiosity into progress through disruptive ideas, AI-powered tools, and scalable ventures.",
      tr: "Yıkıcı fikirler, yapay zeka destekli araçlar ve ölçeklenebilir girişimlerle merakı ilerlemeye dönüştürüyoruz.",
    },
    image: "/media/services/innovation-technology.jpg",
    imageAlt: { en: "Innovation & Technology", tr: "İnovasyon & Teknoloji" },
  },
  {
    slug: "capital-structuring-fundraising",
    code: "CAP",
    order: 6,
    title: { en: "Capital Structuring & Fundraising", tr: "Sermaye Yapılandırma & Fonlama" },
    description: {
      en: "We help structure investment deals, secure regional capital, and connect you with aligned family offices, funds, and strategic investors.",
      tr: "Yatırım anlaşmalarını yapılandırmaya, bölgesel sermaye sağlamaya ve sizi uyumlu aile ofisleri, fonlar ve stratejik yatırımcılarla buluşturmaya yardımcı oluyoruz.",
    },
    quote: {
      en: "We empower bold ideas with smart capital, fostering sustainable growth and shared success.",
      tr: "Cesur fikirleri akıllı sermaye ile güçlendiriyor, sürdürülebilir büyümeyi ve ortak başarıyı teşvik ediyoruz.",
    },
    image: "/media/services/capital-structuring-fundraising.jpg",
    imageAlt: { en: "Capital Structuring & Fundraising", tr: "Sermaye Yapılandırma & Fonlama" },
  },
];

export const networkBrands: NetworkBrand[] = [
  {
    name: "Innoventure Alumni",
    description: {
      en: "Provides a secure investment and networking platform for alumni communities.",
      tr: "Mezun toplulukları için güvenli bir yatırım ve networking platformu sağlar.",
    },
  },
  {
    name: "Innoventure Global",
    description: {
      en: "Offers borderless global business opportunities and keynote events, independent of nationality or alma mater.",
      tr: "Uyruk veya mezun olunan okuldan bağımsız, sınırsız küresel iş fırsatları ve etkinlikler sunar.",
    },
  },
  {
    name: "CorteQS",
    description: {
      en: "An intelligent service platform that connects dispersed alumni and diaspora communities globally through AI-powered data and dynamics, enabling social and economic collaboration.",
      tr: "Dağınık mezun ve diaspora topluluklarını yapay zeka destekli veri ve dinamiklerle küresel olarak birbirine bağlayan, sosyal ve ekonomik iş birliğini mümkün kılan akıllı bir hizmet platformu.",
    },
    url: "https://corteqs.net",
  },
  {
    name: "One-o-One",
    description: {
      en: "Transforms connections into experiences through next-generation event design and management.",
      tr: "Yeni nesil etkinlik tasarımı ve yönetimi ile bağlantıları deneyime dönüştürür.",
    },
  },
  {
    name: "Qualtron Sinclair",
    description: {
      en: "Powers the entire ecosystem with robust infrastructure and operational support, ensuring seamless network functionality.",
      tr: "Sağlam altyapı ve operasyonel destekle tüm ekosisteme güç verir, kesintisiz ağ işlevselliği sağlar.",
    },
  },
];

export const principles: Principle[] = [
  {
    title: { en: "Sustainability", tr: "Sürdürülebilirlik" },
    description: { en: "Long-term value over short-term gain.", tr: "Kısa vadeli kazanç yerine uzun vadeli değer." },
  },
  {
    title: { en: "Ethics", tr: "Etik" },
    description: { en: "Transparent, fair, and responsible conduct.", tr: "Şeffaf, adil ve sorumlu davranış." },
  },
  {
    title: { en: "Innovation", tr: "İnovasyon" },
    description: { en: "Relentlessly curious, creatively disruptive.", tr: "Durmaksızın meraklı, yaratıcı biçimde yıkıcı." },
  },
  {
    title: { en: "Diversity", tr: "Çeşitlilik" },
    description: { en: "Multicultural, inclusive, and globally connected.", tr: "Çok kültürlü, kapsayıcı ve küresel olarak bağlı." },
  },
  {
    title: { en: "Collective Improvement", tr: "Kolektif Gelişim" },
    description: { en: "We grow by helping others grow.", tr: "Başkalarının büyümesine yardım ederek büyürüz." },
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "clone-age",
    status: "published",
    title: { en: "Clone Age", tr: "Klon Çağı" },
    excerpt: {
      en: "How digital twins — personal, organizational, and corporate — unlock insight, efficiency, and resilience through AI-driven strategies.",
      tr: "Kişisel, organizasyonel ve kurumsal dijital ikizlerin yapay zeka odaklı stratejilerle içgörü, verimlilik ve dayanıklılığı nasıl açığa çıkardığı.",
    },
    body: {
      en: "The Dawn of Personal, Organizational, and Corporate Digital Twins.\n\nIn this unfolding era of digital transformation, the concept of the digital twin is moving from industrial machinery into the fabric of how people and organizations understand themselves. A digital twin is a living, data-driven model — continuously updated, capable of simulation, and able to reveal what is otherwise invisible.\n\nAt the personal level, digital twins capture patterns of behavior and preference to support better decisions. At the organizational level, they mirror processes, teams, and flows of information, exposing bottlenecks before they become failures. At the corporate level, they become strategic instruments — modeling markets, scenarios, and risk.\n\nQualtron Sinclair sees the Clone Age not as science fiction but as operational reality: the discipline of building faithful models of complex systems so that insight, efficiency, and resilience compound over time.",
      tr: "Kişisel, Organizasyonel ve Kurumsal Dijital İkizlerin Şafağı.\n\nDijital dönüşümün bu gelişen çağında, dijital ikiz kavramı endüstriyel makinelerden insanların ve kuruluşların kendilerini nasıl anladıklarının dokusuna doğru ilerliyor. Dijital ikiz, yaşayan, veri odaklı bir modeldir — sürekli güncellenen, simülasyon yapabilen ve aksi takdirde görünmez olanı ortaya çıkarabilen.\n\nQualtron Sinclair, Klon Çağı'nı bilim kurgu olarak değil, operasyonel gerçeklik olarak görüyor: içgörü, verimlilik ve dayanıklılığın zamanla birleşmesi için karmaşık sistemlerin sadık modellerini kurma disiplini.",
    },
    cover: "/media/blog/clone-age.jpg",
    author: "Qualtron Sinclair",
    publishedAt: "2025-07-06",
    readTimeMinutes: 4,
  },
  {
    slug: "beyond-intelligence-autonomous-digital-agents",
    status: "published",
    title: {
      en: "Beyond Intelligence: The Rise of Autonomous Digital Agents",
      tr: "Zekanın Ötesinde: Otonom Dijital Ajanların Yükselişi",
    },
    excerpt: {
      en: "Self-learning, mission-driven entities reshaping strategy, operations, and human-machine collaboration.",
      tr: "Stratejiyi, operasyonları ve insan-makine iş birliğini yeniden şekillendiren, kendi kendine öğrenen, misyon odaklı varlıklar.",
    },
    body: {
      en: "Autonomous digital agents are self-learning, mission-driven entities that operate with increasing independence. Unlike static automation, they adapt — reshaping strategy, operations, and the boundary between human and machine collaboration.\n\n_Full article pending migration from the original CMS._",
      tr: "Otonom dijital ajanlar, giderek artan bağımsızlıkla çalışan, kendi kendine öğrenen, misyon odaklı varlıklardır. Statik otomasyonun aksine uyum sağlarlar — stratejiyi, operasyonları ve insan-makine iş birliğinin sınırını yeniden şekillendirirler.\n\n_Tam makale orijinal CMS'ten taşınmayı bekliyor._",
    },
    cover: "/media/blog/beyond-intelligence.jpg",
    author: "Qualtron Sinclair",
    publishedAt: "2025-07-15",
    readTimeMinutes: 2,
  },
  {
    slug: "digital-fabric-of-cities",
    status: "published",
    title: {
      en: "The Digital Fabric of Cities: Smart Ecosystems and Civic AI",
      tr: "Şehirlerin Dijital Dokusu: Akıllı Ekosistemler ve Sivil Yapay Zeka",
    },
    excerpt: {
      en: "How Civic AI transforms cities into adaptive, intelligent ecosystems — blending data, ethics, and innovation.",
      tr: "Sivil yapay zekanın şehirleri veri, etik ve inovasyonu harmanlayarak uyarlanabilir, akıllı ekosistemlere nasıl dönüştürdüğü.",
    },
    body: {
      en: "Civic AI transforms cities into adaptive, intelligent ecosystems — blending data, ethics, and innovation to shape the future of urban life.\n\n_Full article pending migration from the original CMS._",
      tr: "Sivil yapay zeka şehirleri uyarlanabilir, akıllı ekosistemlere dönüştürür — kentsel yaşamın geleceğini şekillendirmek için veri, etik ve inovasyonu harmanlar.\n\n_Tam makale orijinal CMS'ten taşınmayı bekliyor._",
    },
    cover: "/media/blog/digital-fabric.jpg",
    author: "Qualtron Sinclair",
    publishedAt: "2025-07-08",
    readTimeMinutes: 2,
  },
];

export const siteSettings: SiteSettings = {
  brandName: "Qualtron Sinclair",
  contactEmail: "contact@qualtronsinclair.com",
  locations: [
    { city: "Doha", address: "Y2 Village Building 3 205, Doha, Qatar", phone: "+974 33 987 886", phoneLabel: "M" },
    {
      city: "Dubai",
      address: "Reef Tower, 30th Floor, No30-33, O1 Cluster, O Street, JLT, Dubai, UAE",
      phone: "+971 585 71 7916",
      phoneLabel: "WB",
    },
    {
      city: "İstanbul",
      address: "Yapı Kredi Plaza C Blok K:8 No 23, 4. Levent, İstanbul, Türkiye",
      phone: "+90 532 436 2909",
      phoneLabel: "M/WhatsApp",
      map: "https://harita.yandex.com.tr/",
    },
  ],
};

/** Home "Who we are" narrative, split into paragraphs. */
export const whoWeAre: Record<string, string[]> = {
  en: [
    "Qualtron Sinclair is not only a business advisory firm — it is a growth architect with operating verticals, strategic investments, and founding stakes in real-world companies and digital ventures.",
    "We operate as a multi-vertical holding and expansion partner for our own investments and corporations entering the MENA markets — the UAE, Qatar, and KSA in particular. Our mission: to build the infrastructure that transforms market entry into sustainable growth.",
    "What we do for our own portfolio companies — from capital structuring to compliance setup, from digital infrastructure to team building — we now offer to other firms seeking regional expansion.",
    "With an ecosystem spanning construction, design, digital platforms, AI, advisory, fintech, and compliance solutions, Qualtron Sinclair provides hands-on leadership and operational architecture to new market entrants.",
    "We don't just advise. We execute. We don't just invest. We build.",
    "Based in Dubai, Doha, and Istanbul — we are the regional growth arm of forward-thinking companies.",
  ],
  tr: [
    "Qualtron Sinclair yalnızca bir iş danışmanlığı firması değildir — operasyonel dikeyleri, stratejik yatırımları ve gerçek şirketlerde ile dijital girişimlerde kurucu payları olan bir büyüme mimarıdır.",
    "Kendi yatırımlarımız ve MENA pazarlarına — özellikle BAE, Katar ve KSA'ya — giren kurumlar için çok dikeyli bir holding ve genişleme partneri olarak çalışıyoruz. Misyonumuz: pazar girişini sürdürülebilir büyümeye dönüştüren altyapıyı kurmak.",
    "Kendi portföy şirketlerimiz için yaptıklarımızı — sermaye yapılandırmadan uyum kurulumuna, dijital altyapıdan ekip kurmaya — artık bölgesel genişleme arayan diğer firmalara sunuyoruz.",
    "İnşaat, tasarım, dijital platformlar, yapay zeka, danışmanlık, fintech ve uyum çözümlerini kapsayan bir ekosistemle Qualtron Sinclair, yeni pazara girenlere uygulamalı liderlik ve operasyonel mimari sağlar.",
    "Sadece tavsiye vermeyiz. Uygularız. Sadece yatırım yapmayız. İnşa ederiz.",
    "Dubai, Doha ve İstanbul merkezli — ileri görüşlü şirketlerin bölgesel büyüme kolu biziz.",
  ],
};

export const leadershipIntro: Localized_ = {
  en: "Our leadership team combines decades of experience in corporate growth, venture building, and regional expansion. As operator-investors, we blend strategic thinking with practical execution across every vertical we serve.",
  tr: "Liderlik ekibimiz kurumsal büyüme, girişim inşası ve bölgesel genişlemede onlarca yıllık deneyimi bir araya getirir. Operatör-yatırımcılar olarak, hizmet verdiğimiz her dikeyde stratejik düşünceyi pratik uygulamayla harmanlıyoruz.",
};

// local alias to avoid importing Localized only for two consts
type Localized_ = { en: string; tr: string };
