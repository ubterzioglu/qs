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
  PortfolioItem,
  Principle,
  Service,
  SiteSettings,
} from "./types";

/**
 * Portfolio ventures/partners. Confirmed from the public export; full details
 * (logos, external URLs, categories) are editable in /admin. We do not invent
 * partner facts — add more entries as they are provided.
 */
export const portfolioItems: PortfolioItem[] = [
  {
    slug: "ritefit",
    name: "Ritefit",
    category: "venture",
    description: {
      en: "Fractional real-estate, in your pocket.",
      tr: "Hisseli gayrimenkul, cebinizde.",
    },
    order: 1,
    isPublic: true,
  },
  {
    slug: "corteqs",
    name: "CorteQS",
    category: "platform",
    description: {
      en: "The Turkish diaspora goes digital — an AI-powered network for dispersed communities.",
      tr: "Türk diasporası dijital hayata geçiyor — dağınık topluluklar için yapay zeka destekli bir ağ.",
    },
    url: "https://corteqs.net",
    order: 2,
    isPublic: true,
  },
];

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
    slug: "beyond-intelligence-the-rise-of-autonomous-digital-agents",
    status: "published",
    title: {
      en: "Beyond Intelligence: The Rise of Autonomous Digital Agents",
      tr: "Zekânın Ötesinde: Otonom Dijital Ajanların Yükselişi",
    },
    excerpt: {
      en: "Discover the rise of Autonomous Digital Agents — self-learning, mission-driven entities reshaping strategy, operations, and human-machine collaboration.",
      tr: "Otonom Dijital Ajanların yükselişini keşfedin — stratejiyi, operasyonları ve insan-makine iş birliğini yeniden şekillendiren, kendi kendine öğrenen, misyon odaklı varlıklar.",
    },
    body: {
      en: "Welcome to the next frontier of human-machine synergy: the age of Autonomous Digital Agents (ADA). These are not just tools or scripts — they are context-aware, self-learning micro-entities that think, decide, and act within digital ecosystems. Unlike traditional AI models, ADAs are persistent, adaptive, and mission-driven, making them indispensable for operational excellence, customer interaction, and even strategy formulation.\n\nAn ADA operates as a semi-autonomous entity trained on domain-specific knowledge, workflows, and user interactions. It can coordinate with other agents, negotiate tasks, and reconfigure itself based on real-time input and system goals. Imagine a marketing ADA that rewrites campaigns daily based on competitor feeds and real-time engagement metrics — or a legal ADA that auto-generates compliance responses as regulations evolve.\n\nThe core of an ADA is its behavioral engine — a layered fusion of neural reasoning, natural language understanding, and reinforcement learning. Over time, this engine builds memory and context, allowing the agent to shift from reactive to proactive behavior. Unlike static chatbots or command-based RPA, ADAs demonstrate initiative — they follow intentions, not just instructions.\n\nIndustries are already experimenting. In healthcare, agents assist in triage and remote diagnostics. In finance, they handle customer portfolios, fraud detection, and scenario analysis. In logistics, agents manage fleet routes based on weather and real-time demand. Every sector with decision-density is fertile ground for these self-scaling, always-on agents.\n\nAt Qualtron Sinclair, we see ADAs as a new class of digital workforce. Just as industrial revolutions automated labor, the ADA revolution automates reasoning. We embed them across our digital platforms — from training systems and consumer platforms to market research and investor dashboards — driving precision, speed, and continuous adaptation.\n\nOne of the most transformative potentials of ADAs lies in personal and executive coaching. Imagine a leadership development agent that continuously monitors communication tone, time management patterns, and conflict dynamics — offering subtle nudges and deep insights to optimize leadership effectiveness in real time.\n\nChallenges remain: accountability, interpretability, ethical constraints, and secure interoperability. But with emotional AI, contextual memory, and logic scaffolding, these issues are being addressed rapidly. The question is not whether you'll use ADAs — but how well you'll integrate them.\n\nThe future of leadership and execution will be deeply symbiotic with these agents. In five years, every forward-thinking team will operate not only with dashboards and OKRs but also with a network of autonomous advisors — always learning, always evolving.",
      tr: "İnsan-makine sinerjisinin bir sonraki eşiğine hoş geldiniz: Otonom Dijital Ajanlar (ODA) çağı. Bunlar yalnızca birer araç ya da betik değil; bağlamın farkında olan, kendi kendine öğrenen, dijital ekosistemler içinde düşünen, karar veren ve harekete geçen mikro varlıklardır. Geleneksel yapay zekâ modellerinin aksine ODA'lar kalıcı, uyum yeteneği yüksek ve misyon odaklıdır; bu da onları operasyonel mükemmellik, müşteri etkileşimi ve hatta strateji geliştirme açısından vazgeçilmez kılar.\n\nBir ODA; alana özgü bilgi birikimi, iş akışları ve kullanıcı etkileşimleri üzerine eğitilmiş, yarı otonom bir varlık olarak çalışır. Diğer ajanlarla eşgüdüm sağlayabilir, görevler üzerinde uzlaşabilir ve gerçek zamanlı girdilere ve sistem hedeflerine göre kendini yeniden yapılandırabilir. Rakip verilerine ve anlık etkileşim metriklerine dayanarak kampanyaları her gün yeniden kurgulayan bir pazarlama ODA'sını ya da mevzuat değiştikçe uyum yanıtlarını otomatik üreten bir hukuk ODA'sını düşünün.\n\nBir ODA'nın çekirdeğinde davranış motoru yer alır; nöral akıl yürütme, doğal dil anlama ve pekiştirmeli öğrenmenin katmanlı bir bileşimidir bu. Zamanla bu motor bellek ve bağlam oluşturarak ajanın tepkisel davranıştan proaktif davranışa geçmesini sağlar. Statik sohbet botlarının veya komut tabanlı RPA çözümlerinin aksine ODA'lar inisiyatif ortaya koyar; yalnızca talimatları değil, niyetleri takip ederler.\n\nSektörler şimdiden denemelere başladı. Sağlıkta ajanlar triyaj ve uzaktan tanı süreçlerine destek veriyor. Finansta müşteri portföylerini yönetiyor, dolandırıcılık tespiti ve senaryo analizi yapıyor. Lojistikte hava koşulları ve anlık talebe göre filo rotalarını yönetiyorlar. Karar yoğunluğu yüksek her sektör, kendi kendine ölçeklenen, kesintisiz çalışan bu ajanlar için verimli bir zemin sunuyor.\n\nQualtron Sinclair olarak ODA'ları yeni bir dijital iş gücü sınıfı olarak görüyoruz. Sanayi devrimlerinin emeği otomatikleştirmesi gibi, ODA devrimi de akıl yürütmeyi otomatikleştiriyor. Bu ajanları eğitim sistemlerinden tüketici platformlarına, pazar araştırmalarından yatırımcı gösterge panellerine kadar tüm dijital platformlarımıza yerleştiriyor; böylece kesinliği, hızı ve sürekli uyumu hayata geçiriyoruz.\n\nODA'ların en dönüştürücü potansiyellerinden biri, bireysel ve üst düzey yönetici koçluğunda yatıyor.\n\nİletişim tonunu, zaman yönetimi kalıplarını ve çatışma dinamiklerini sürekli izleyen; liderlik etkinliğini gerçek zamanlı olarak en üst düzeye çıkarmak için ince yönlendirmeler ve derinlikli içgörüler sunan bir liderlik gelişimi ajanı hayal edin.\n\nAşılması gereken zorluklar hâlâ mevcut: hesap verebilirlik, yorumlanabilirlik, etik sınırlamalar ve güvenli birlikte çalışabilirlik. Ancak duygusal yapay zekâ, bağlamsal bellek ve mantıksal iskeleleme sayesinde bu sorunlar hızla ele alınıyor. Mesele ODA'ları kullanıp kullanmayacağınız değil; onları ne kadar iyi entegre edeceğinizdir.\n\nLiderliğin ve icranın geleceği bu ajanlarla derin bir simbiyoz içinde şekillenecek. Beş yıl içinde ileri görüşlü her ekip yalnızca gösterge panelleri ve OKR'lerle değil, sürekli öğrenen ve sürekli evrilen bir otonom danışmanlar ağıyla da çalışacak.",
    },
    cover: "/media/blog/beyond-intelligence.jpg",
    author: "Qualtron Sinclair",
    publishedAt: "2025-07-15",
    readTimeMinutes: 2,
  },
  {
    slug: "the-digital-fabric-of-cities-smart-ecosystems-and-civic-ai",
    status: "published",
    title: {
      en: "The Digital Fabric of Cities: Smart Ecosystems and Civic AI",
      tr: "Şehirlerin Dijital Dokusu: Akıllı Ekosistemler ve Sivil Yapay Zekâ",
    },
    excerpt: {
      en: "Explore how Civic AI transforms cities into adaptive, intelligent ecosystems — blending data, ethics, and innovation to shape the future of urban life.",
      tr: "Sivil yapay zekânın şehirleri veri, etik ve inovasyonu harmanlayarak uyarlanabilir, akıllı ekosistemlere nasıl dönüştürdüğünü keşfedin.",
    },
    body: {
      en: "The cities of tomorrow are not built on concrete alone — they are woven from data, intelligence, and adaptive algorithms. As urbanization accelerates and infrastructure ages, we are witnessing the rise of Civic AI: the integration of artificial intelligence into public systems, turning cities into responsive, predictive, and deeply personalized environments.\n\nCivic AI isn't just about smart traffic lights or surveillance systems. It's a multi-layered neural infrastructure designed to process urban rhythms in real-time — from energy consumption and public transport to population movement, noise patterns, and social sentiment. These systems help authorities and citizens co-navigate complexity with foresight and precision.\n\nAt the heart of every smart city lies an ecosystem of connected sensors, digital twins, and behavioral models. Urban AI learns from this web of interaction — it identifies micro-patterns, forecasts bottlenecks, and even adapts policies such as dynamic taxation zones based on carbon emissions.\n\nBut the real breakthrough is the real-time orchestration of services. Imagine a city where traffic flow adjusts based on hospital intake rates, where AI prevents crime by reassigning patrols in predictive clusters, or where waste systems re-route in anticipation of local events. Cities become living entities — and Civic AI, their nervous system.\n\nFor corporations and investors, this opens a new frontier: not just B2B or B2C, but B2Civic — Business to City. Qualtron Sinclair works with innovation hubs and municipalities to align AI startups and digital platforms with civic challenges. The result? Scalable, government-integrated solutions in public health, transport, energy, and education.\n\nWe also embed Civic AI insights into our digital twins and organizational design services. A company operating in multiple cities may integrate real-time urban indicators — commute time, public sentiment, policy shifts — into its HR scheduling, pricing, or service delivery. In this model, cities are no longer backgrounds — they are strategic variables.\n\nOf course, there are risks. Algorithmic bias in policing, data sovereignty disputes, and the digital divide can deepen inequality. That's why ethics, transparency, and civic participation must become embedded layers of every AI infrastructure. A truly smart city is also a wise city — aware of its blind spots and inclusive in its learning.\n\nIn the coming decade, Civic AI will redefine the relationship between people, place, and power. The question for leaders is: are you building for the city you see — or the one that's emerging beneath your feet?",
      tr: "Geleceğin şehirleri yalnızca betondan yükselmiyor; veriden, zekâdan ve uyarlanabilir algoritmalardan örülüyor. Kentleşme hızlanır ve altyapı yaşlanırken, kamusal sistemlere yapay zekânın entegre edilmesiyle ortaya çıkan Sivil Yapay Zekâ'nın (Civic AI) yükselişine tanıklık ediyoruz. Bu yaklaşım, şehirleri yanıt veren, öngörü üreten ve derinlemesine kişiselleştirilmiş ortamlara dönüştürüyor.\n\nSivil Yapay Zekâ; akıllı trafik ışıklarından ya da gözetim sistemlerinden ibaret değildir. Kentin ritmini gerçek zamanlı işlemek üzere tasarlanmış, çok katmanlı bir sinirsel altyapıdır. Enerji tüketiminden toplu taşımaya, nüfus hareketlerinden gürültü örüntülerine ve toplumsal duygu durumuna kadar geniş bir yelpazeyi kapsar. Bu sistemler, kamu otoritelerinin ve vatandaşların karmaşıklığın içinde öngörü ve isabetle birlikte yol almasına yardımcı olur.\n\nHer akıllı şehrin merkezinde; birbirine bağlı sensörlerden, dijital ikizlerden ve davranış modellerinden oluşan bir ekosistem yer alır. Kentsel yapay zekâ, bu etkileşim ağından öğrenir: mikro örüntüleri saptar (örneğin metro ağlarında tekrar eden yoğunluk bölgelerini), tıkanıklıkları öngörür (örneğin hafta sonu yaşanan enerji tüketim zirvelerini) ve hatta politikaları uyarlar (örneğin karbon emisyonlarına göre değişen dinamik vergilendirme bölgeleri).\n\nAncak asıl atılım yalnızca veri toplamakta değil; hizmetlerin gerçek zamanlı orkestrasyonundadır. Trafik akışının hastane hasta kabul oranlarına göre ayarlandığı, yapay zekânın devriyeleri öngörüsel kümeler halinde yeniden konumlandırarak suçu önlediği ya da atık sistemlerinin yerel etkinlikleri öngörerek güzergâh değiştirdiği bir şehir düşünün. Şehirler yaşayan varlıklara dönüşüyor; Sivil Yapay Zekâ ise onların sinir sistemi oluyor.\n\nKurumlar ve yatırımcılar için bu, yeni bir sınır açıyor: yalnızca B2B ya da B2C değil, B2Civic, yani İşletmeden Şehre. Qualtron Sinclair; inovasyon merkezleri ve belediyelerle çalışarak yapay zekâ girişimlerini ve dijital platformları kentsel sorunlarla buluşturuyor. Sonuç mu? Kamu sağlığı, ulaşım, enerji ve eğitim alanlarında, kamu yönetimiyle entegre ve ölçeklenebilir çözümler.\n\nAyrıca Sivil Yapay Zekâ öngörülerini dijital ikiz ve organizasyonel tasarım hizmetlerimize de entegre ediyoruz. Birden fazla şehirde faaliyet gösteren bir şirket; gerçek zamanlı kentsel göstergeleri (ulaşım süresi, toplumsal duygu durumu, politika değişiklikleri) insan kaynakları planlamasına, fiyatlandırmasına veya hizmet sunumuna dahil edebilir. Bu modelde şehirler artık birer arka plan değil; stratejik değişkenlerdir.\n\nElbette riskler de var. Kolluk faaliyetlerindeki algoritmik önyargı, veri egemenliği anlaşmazlıkları ve dijital uçurum eşitsizliği derinleştirebilir. Tam da bu nedenle etik, şeffaflık ve sivil katılım, her yapay zekâ altyapısının yerleşik katmanları haline gelmelidir. Gerçekten \"akıllı\" bir şehir, aynı zamanda bilge bir şehirdir: kör noktalarının farkında ve öğrenme sürecinde kapsayıcıdır.\n\nÖnümüzdeki on yılda Sivil Yapay Zekâ; insan, mekân ve güç arasındaki ilişkiyi yeniden tanımlayacak. Liderler için asıl soru şu: Gördüğünüz şehir için mi inşa ediyorsunuz, yoksa ayaklarınızın altında yeni yeni beliren şehir için mi?",
    },
    cover: "/media/blog/digital-fabric.jpg",
    author: "Qualtron Sinclair",
    publishedAt: "2025-07-08",
    readTimeMinutes: 2,
  },
  {
    slug: "clone-age-2",
    status: "published",
    title: { en: "Clone Age 2", tr: "Klon Çağı 2" },
    excerpt: {
      en: "The dawn of Personal, Organizational, and Corporate Digital Twins — and the sub-twins that compose them.",
      tr: "Kişisel, Organizasyonel ve Kurumsal Dijital İkizlerin şafağı — ve onları oluşturan alt-ikizler.",
    },
    body: {
      en: "**The Dawn of Personal, Organizational, and Corporate Digital Twins — The Clone Age:**\n\nIn this unfolding era of digital transformation, the capability to forge digital representations across all strata, from the individual to the grandest of enterprises, has gently materialized.\n\nThe concept of the Clone Age thoughtfully encompasses these digital reflections under three principal umbrellas: the Personal Digital Twin, the Organizational Digital Twin, and the Corporate Digital Twin. Each inherently comprises nuanced sub-twins, forming structures that are increasingly configurable, integrable, and evolving systems.\n\n## 1. Personal Digital Twin\n\nThe Personal Digital Twin serves as a digital echo of an individual, embracing a spectrum of dimensions from behaviors and aptitudes to emotions and creative potentials. Its sub-twins include the Behavioral, Wellbeing, Cognitive, Emotional, Professional, Identity, Creative, and Spiritual Twins. The Personal Gestalt emerges as the integration of all these twins, presenting a unified confluence of one's identity components, naturally bridging the digital and external realms.\n\n## 2. Organizational Digital Twin\n\nOrganizational Digital Twins thoughtfully construct digital representations of companies and organizations, encompassing structural, cultural, and operational processes. They serve public institutions, NGOs, educational institutions, and internal organizational structures — enabling analyses of departments, HR processes, workflows, and culture.\n\n## 3. Corporate Digital Twin\n\nCorporate Digital Twins enable the modeling of a company's entire suite of processes within the digital domain, facilitating strategic decisions grounded in data analysis — from employee and team structures to departments, business units, and financial and operational systems. The Corporate Gestalt arises from the confluence of these twins, offering a real-time, holistic view of the organization, enriched by AI-powered Artificial Corporate Intelligence (ACI) models.\n\nApproximately a decade ago, in my book \"Human Consciousness Decoded,\" while exploring the human journey towards enlightenment, I also touched upon a consciousness algorithm that could be mapped and potentially transferred to a digital medium. The structures outlined here humbly suggest the gradual realization of those earlier insights.\n\nBurak Akçakanat — March 2025",
      tr: "**Kişisel, Organizasyonel ve Kurumsal Dijital İkizlerin Şafağı — Klon Çağı:**\n\nDijital dönüşümün bu gelişen çağında, bireyden en büyük işletmelere kadar tüm katmanlarda dijital temsiller oluşturma yeteneği nazikçe gerçekleşti.\n\nKlon Çağı kavramı bu dijital yansımaları üç ana başlık altında toplar: Kişisel Dijital İkiz, Organizasyonel Dijital İkiz ve Kurumsal Dijital İkiz. Her biri, giderek yapılandırılabilir, entegre edilebilir ve gelişen sistemler oluşturan incelikli alt-ikizler içerir.\n\n## 1. Kişisel Dijital İkiz\n\nKişisel Dijital İkiz, bireyin dijital yankısı olarak hizmet eder; davranışlardan yeteneklere, duygulardan yaratıcı potansiyellere kadar bir yelpazeyi kucaklar. Alt-ikizleri arasında Davranışsal, Refah, Bilişsel, Duygusal, Profesyonel, Kimlik, Yaratıcı ve Ruhsal İkizler bulunur. Kişisel Gestalt, tüm bu ikizlerin bütünleşmesiyle ortaya çıkar.\n\n## 2. Organizasyonel Dijital İkiz\n\nOrganizasyonel Dijital İkizler; şirketlerin ve kuruluşların yapısal, kültürel ve operasyonel süreçlerini kapsayan dijital temsillerini oluşturur. Kamu kurumları, STK'lar, eğitim kurumları ve iç yapılara hizmet eder.\n\n## 3. Kurumsal Dijital İkiz\n\nKurumsal Dijital İkizler, bir şirketin tüm süreçlerinin dijital alanda modellenmesini sağlar; veri analizine dayalı stratejik kararları kolaylaştırır. Kurumsal Gestalt, bu ikizlerin birleşiminden doğar ve yapay zekâ destekli Yapay Kurumsal Zekâ (ACI) modelleriyle zenginleştirilir.\n\nBurak Akçakanat — Mart 2025",
    },
    cover: "/media/blog/clone-age-2.jpg",
    author: "Burak Akçakanat",
    publishedAt: "2025-07-07",
    readTimeMinutes: 3,
  },
  {
    slug: "clone-age",
    status: "published",
    title: { en: "Clone Age", tr: "Klon Çağı" },
    excerpt: {
      en: "How digital twins — personal, organizational, and corporate — unlock insight, efficiency, and resilience through AI-driven strategies.",
      tr: "Kişisel, organizasyonel ve kurumsal dijital ikizlerin yapay zekâ odaklı stratejilerle içgörü, verimlilik ve dayanıklılığı nasıl açığa çıkardığı.",
    },
    body: {
      en: "Welcome to the Clone Age, where the line between physical and digital worlds fades, and we harness digital counterparts to supercharge decision-making, efficiency, and innovation. In this era, I would like to introduce three core digital twin models: Digital Personal Clones (DPC/DPT), Digital Organizational Clones (DOC/DOT), and Digital Corporate Clones (DCC/DCT).\n\nEach model acts as a real-time, data-driven reflection — whether of an individual, a team, or an entire enterprise — leveraging simulation, machine learning, and emotional AI to anticipate behaviors, optimize processes, and unlock strategic insights.\n\n## DPC / DPT: Digital Personal Clone / Digital Personal Twin\n\nI define Digital Personal Clones (DPC) and Digital Personal Twins (DPT) as your virtual avatars that learn from wearables, communication patterns, and other personal data streams. A DPT stays in sync with you, offering tailored recommendations — be it healthier work schedules or personalized learning plans. In its second phase, it emulates habits, thought patterns, emotions, voice, and avatar, demonstrating intelligence with a past, present, and future.\n\n## DOC / DOT: Digital Organizational Clone / Digital Organizational Twin\n\nI model Digital Organizational Clones (DOC) and Digital Organizational Twins (DOT) to capture team structures, workflows, and cultural nuances. By ingesting project timelines, communication logs, and resource data, a DOT lets us simulate \"what-if\" scenarios — like staffing changes — and spot bottlenecks before they occur.\n\n## DCC / DCT: Digital Corporate Clone / Digital Corporate Twin\n\nAt the enterprise level, Digital Corporate Clones (DCC) and Digital Corporate Twins (DCT) replicate an organization's entire ecosystem — from supply chains and financial models to market feedback loops. By combining industry benchmarks with real-time analytics, a DCT embodies what I call Corporate Gestalt (CG) — a holistic intelligence that reveals insights beyond the sum of individual components.\n\n## Future Outlook\n\nIn the Clone Age, personal, organizational, and corporate twins don't just mirror reality — they enable us to stay one step ahead. As emotional AI and deep reasoning capabilities evolve, we'll move from reactive to truly preemptive strategies.\n\n## Conclusion\n\nThe Clone Age opens doors to hyper-personalized experiences via DPT and enterprise resilience through DCT. By embracing these models now, you position yourself — and your organization — as pioneers in a new frontier of digital intelligence.\n\nBurak Akçakanat — March 2025",
      tr: "Klon Çağı'na hoş geldiniz! Fiziksel ve dijital dünyalar arasındaki sınırlar kayboluyor; bireylerden ekip ve kurumlara kadar her varlık, karar almayı, verimliliği ve inovasyonu güçlendiren dijital yansımalar kazanıyor. Bu dönemde üç ana dijital ikiz modelini toparlamak istiyorum: Dijital Kişisel Klonlar (DPC/DPT), Dijital Organizasyon Klonları (DOC/DOT) ve Dijital Kurumsal Klonlar (DCC/DCT).\n\nHer model, bireylerin, ekiplerin veya bütün işletmelerin gerçek zamanlı, veri odaklı bir gölgesini oluşturur; simülasyon, makine öğrenimi ve duygusal yapay zekâ kullanarak davranışları öngörür, süreçleri optimize eder ve stratejik içgörüler sunar.\n\n## DPC / DPT: Dijital Kişisel Klon / Dijital Kişisel İkiz\n\nDijital Kişisel Klon (DPC) ve Dijital Kişisel İkiz (DPT), giyilebilir cihazlardan iletişim verilerine kadar kişisel veri akışlarını analiz ederek alışkanlıklarınızı ve tercihlerinizi yansıtan sanal avatarlarınızdır. Bir DPT sizinle senkronize kalır; gerçek zamanlı geri bildirim, duygu analizi, davranış tahmini ve uyarlanabilir koçluk sağlar.\n\n## DOC / DOT: Dijital Organizasyon Klonu / Dijital Organizasyon İkizi\n\nDijital Organizasyon Klonları (DOC) ve Dijital Organizasyon İkizleri (DOT), ekip yapınızı, iş akışlarınızı ve kültürel etkileşimlerinizi dijital ortamda haritalar. Proje takvimleri ve kaynak verileriyle senaryo analizleri yaparak darboğazları önceden tespit eder.\n\n## DCC / DCT: Dijital Kurumsal Klon / Dijital Kurumsal İkiz\n\nKurum ölçeğinde, Dijital Kurumsal Klonlar (DCC) ve Dijital Kurumsal İkizler (DCT); tedarik zincirlerinden finansal modellere kadar tüm kurumsal ekosistemi yansıtır. Bir DCT, Kurumsal Gestalt olarak adlandırdığım, bütünü aşan içgörüyü sunar.\n\n## Sonuç\n\nKlon Çağı; DPT ile kişiselleştirilmiş deneyimler, DCT ile kurumsal dayanıklılık sunuyor. Bu modelleri bugün benimseyerek, siz ve organizasyonunuz dijital zekânın yeni sınırlarında öncü konuma yükselirsiniz.\n\nBurak Akçakanat — Mart 2025",
    },
    cover: "/media/blog/clone-age.jpg",
    author: "Burak Akçakanat",
    publishedAt: "2025-07-06",
    readTimeMinutes: 4,
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
