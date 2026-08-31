import { indiaLocationPages } from "./locations-india";
import { commercialLocationPages } from "./locations-commercial";
import { intlCommercialLocationPages } from "./locations-commercial-intl";

/**
 * Centralized location-based SEO page registry.
 *
 * Each entry is a fully data-driven landing page targeting a location + service
 * combination. All metadata, structured data, canonical URLs, internal links
 * and sitemap entries are derived from these entries — so adding a new location
 * page is just: add an entry here + create a thin route folder.
 *
 * Public URLs are flat and SEO-friendly (no /locations/ prefix).
 * Webamazee is positioned as a GLOBAL digital growth company — these are target
 * SEO landing pages, not claims of local offices or restricted service areas.
 */

export type LocationService =
  | "web-design"
  | "seo"
  | "digital-marketing"
  | "ai-marketing";

/** Title-case a keyword for the H1 / page title (keeps small words lowercase). */
function titleCase(s: string): string {
  const small = new Set(["in", "and", "the", "of", "for", "on", "a", "an", "to"]);
  return s
    .split(" ")
    .map((w, i) =>
      i === 0 || !small.has(w) ? w.charAt(0).toUpperCase() + w.slice(1) : w
    )
    .join(" ");
}

export type LocationPage = {
  slug: string;
  location: string;
  country: string;
  service: LocationService;
  primaryKeyword: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  heroText: string;
  intro: string[];
  /** Search-intent: points the page genuinely answers for the searcher. */
  intent?: { heading: string; body: string }[];
  /** Core service explanation — what the customer actually receives. */
  coreService?: string[];
  whyNeeds: { title: string; desc: string }[];
  servicesIncluded: { name: string; slug: string; desc: string; benefit?: string }[];
  whyChoose: { title: string; desc: string }[];
  process: { step: string; title: string; desc: string }[];
  relevantServices: { name: string; slug: string }[];
  outcomes: string[];
  /** Industries relevant to the location + service. */
  industries?: { name: string; desc: string; href?: string }[];
  /** Supporting blog links (only real existing posts). */
  blogLinks?: { label: string; href: string }[];
  /** Selected real projects that support the location page. */
  portfolioLinks?: { label: string; href: string; description?: string }[];
  /** Existing location-specific service routes linked from priority location hubs. */
  locationServices?: { name: string; description: string; cta: string; href: string }[];
  /** Location cluster internal links (contextual, not a footer block). */
  clusterLinks?: { label: string; href: string }[];
  faqs: { q: string; a: string }[];
  internalLinks: { label: string; href: string }[];
  keywords: string[];
  contentNotes: { heading: string; body: string }[];
  /** Optional location-specific closing CTA copy. */
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaLabel?: string;
};

// ---------- Shared, brand-consistent sections (slightly tailored per service) ----------

const webDesignProcess = [
  { step: "01", title: "Discover", desc: "We map your business goals, audience and competitors to define the right build." },
  { step: "02", title: "Strategy", desc: "We plan the site structure, messaging and conversion paths before designing." },
  { step: "03", title: "Design & Build", desc: "We craft a fast, modern, SEO-friendly website on a solid technical foundation." },
  { step: "04", title: "Launch", desc: "We go live with analytics, tracking and quality checks in place." },
  { step: "05", title: "Measure & Improve", desc: "We monitor performance and refine the site to keep improving results." },
];

const seoProcess = [
  { step: "01", title: "Discover", desc: "We audit your site, market and competitors to find real opportunities." },
  { step: "02", title: "Strategy", desc: "We build a keyword and content plan aligned to your business goals." },
  { step: "03", title: "Optimize", desc: "We improve technical, on-page and content signals across your site." },
  { step: "04", title: "Launch", desc: "We roll out changes and connect measurement and reporting." },
  { step: "05", title: "Measure & Improve", desc: "We track rankings and traffic, then iterate to compound growth." },
];

const webDesignWhyChoose = [
  { title: "Strategy-first approach", desc: "We design around your goals and your customers, not just aesthetics." },
  { title: "SEO-friendly development", desc: "Clean structure, fast pages and semantic markup built in from the start." },
  { title: "Conversion-focused design", desc: "Every layout and call to action is built to turn visitors into enquiries." },
  { title: "Performance optimization", desc: "Speed and Core Web Vitals are a core part of every build." },
  { title: "Global experience", desc: "We help businesses worldwide with modern, scalable websites." },
];

const seoWhyChoose = [
  { title: "AI-powered SEO", desc: "We combine AI-assisted analysis with human strategy for better results." },
  { title: "Data-driven strategy", desc: "Every decision is backed by analytics and real search data." },
  { title: "White-hat only", desc: "Ethical, Google-safe tactics that protect your business long-term." },
  { title: "Transparent communication", desc: "Clear reporting on rankings, traffic and progress." },
  { title: "Global experience", desc: "We help businesses worldwide improve their organic visibility." },
];

const webDesignOutcomes = [
  "A fast, modern website that builds credibility",
  "Clearer messaging that helps visitors understand your offer",
  "Conversion-focused pages that turn traffic into enquiries",
  "A site built to rank well on search engines",
  "A better experience on mobile and desktop alike",
];

const seoOutcomes = [
  "Better organic search visibility",
  "More qualified, relevant traffic",
  "Higher conversion potential from search visitors",
  "Stronger on-page and technical foundations",
  "Clear reporting on rankings and progress",
];

const globalPositioning =
  "Webamazee is a global digital growth company. These are target SEO landing pages for businesses and agencies in a specific market — we help ambitious companies grow online worldwide.";

// ---------- Location content (unique per market) ----------

function buildEntry({
  slug,
  location,
  country,
  service,
  primaryKeyword,
  intro,
  whyNeeds,
  servicesIncluded,
  faqs,
  contentNotes,
  marketNotes,
}: {
  slug: string;
  location: string;
  country: string;
  service: LocationService;
  primaryKeyword: string;
  intro: string[];
  whyNeeds: { title: string; desc: string }[];
  servicesIncluded: { name: string; slug: string; desc: string }[];
  faqs: { q: string; a: string }[];
  contentNotes: { heading: string; body: string }[];
  marketNotes: string;
}): LocationPage {
  const isDesign = service === "web-design";
  const serviceNoun = isDesign ? "Web Designing" : "SEO Services";
  const eyebrow = `WEBAMAZEE · ${location.toUpperCase()}`;
  const h1 = titleCase(primaryKeyword);

  const relevantServices = isDesign
    ? [
        { name: "Website Development", slug: "website-development" },
        { name: "Website Redesign", slug: "website-redesign" },
        { name: "Landing Page Development", slug: "landing-page-development" },
        { name: "E-Commerce Development", slug: "ecommerce-development" },
        { name: "SEO Services", slug: "seo-services" },
        { name: "Technical SEO", slug: "technical-seo" },
      ]
    : [
        { name: "AI SEO", slug: "ai-seo" },
        { name: "Technical SEO", slug: "technical-seo" },
        { name: "Local SEO", slug: "local-seo" },
        { name: "Google Ranking Growth", slug: "google-ranking-growth" },
        { name: "Competitor Analysis", slug: "competitor-analysis" },
        { name: "Link Building", slug: "link-building" },
        { name: "AI Content Optimization", slug: "ai-content-optimization" },
      ];

  const internalLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  const capTitle = h1;
  return {
    slug,
    location,
    country,
    service,
    primaryKeyword,
    metaTitle: capTitle,
    metaDescription: isDesign
      ? `Looking for a ${primaryKeyword}? Webamazee creates fast, modern and conversion-focused websites designed to help businesses grow online. Get a free website audit.`
      : `Grow your online visibility with strategic ${primaryKeyword.toLowerCase()} including technical SEO, content optimization and Google ranking growth. Get a free audit.`,
    h1,
    eyebrow,
    heroText: isDesign
      ? `Create a fast, modern and conversion-focused website designed to help your business attract customers, build credibility and grow online.`
      : `Improve your search visibility, organic traffic, qualified leads and website conversions with strategic, white-hat SEO built for real results.`,
    intro: [marketNotes, ...intro, globalPositioning],
    whyNeeds,
    servicesIncluded,
    whyChoose: isDesign ? webDesignWhyChoose : seoWhyChoose,
    process: isDesign ? webDesignProcess : seoProcess,
    relevantServices,
    outcomes: isDesign ? webDesignOutcomes : seoOutcomes,
    faqs,
    internalLinks,
    keywords: [primaryKeyword, location, country, isDesign ? "web design" : "SEO"],
    contentNotes,
  };
}

// ---------- 1 & 2. ZIRAKPUR ----------

const zirakpurIntro = [
  "Zirakpur is a growing hub for businesses across retail, real estate, healthcare and services, often serving customers across the wider Chandigarh Tricity region. For many of these businesses, a strong online presence is no longer optional — it's how new customers find them.",
];

export const locationPages: LocationPage[] = [
  buildEntry({
    slug: "web-designing-company-zirakpur",
    location: "Zirakpur",
    country: "India",
    service: "web-design",
    primaryKeyword: "web designing company in Zirakpur",
    marketNotes:
      "Businesses in and around Zirakpur increasingly compete for attention online. A professional website helps local businesses stand out, build trust and turn searches into enquiries.",
    intro: [
      "A well-designed website is the foundation of a modern business. In Zirakpur, where customers often compare options online before visiting or calling, your website is often their first impression.",
      "Webamazee designs and builds fast, modern, conversion-focused websites that help Zirakpur businesses attract customers, build credibility and grow online — whether you need a business website, an online store or a redesign.",
    ],
    whyNeeds: [
      { title: "Online competition", desc: "Customers compare businesses online, so a weak website can send them to a competitor." },
      { title: "Mobile usage", desc: "Most local searches happen on phones — your site must work beautifully on mobile." },
      { title: "Credibility", desc: "A professional website reassures customers you're established and trustworthy." },
      { title: "Lead generation", desc: "Clear calls to action turn visitors into enquiries, calls and sales." },
    ],
    servicesIncluded: [
      { name: "Business Website Design", slug: "website-development", desc: "A professional site that represents your brand and captures enquiries." },
      { name: "Website Development", slug: "website-development", desc: "Fast, reliable builds on a modern technical foundation." },
      { name: "WordPress Development", slug: "website-development", desc: "Easy-to-manage websites you can update yourself." },
      { name: "E-Commerce Development", slug: "ecommerce-development", desc: "Online stores built to sell and scale." },
      { name: "Landing Page Development", slug: "landing-page-development", desc: "Focused pages that convert ads and campaigns." },
      { name: "Website Redesign", slug: "website-redesign", desc: "Modernize an outdated site without losing SEO value." },
      { name: "UI/UX Design", slug: "website-redesign", desc: "Interfaces that are clear, intuitive and on-brand." },
      { name: "Website Speed Optimization", slug: "website-development", desc: "Faster pages that rank better and convert more." },
    ],
    faqs: [
      { q: "How much does a website cost in Zirakpur?", a: "The cost depends on the scope — a business site differs from an e-commerce store. We provide clear, fixed quotes tailored to your goals after a free consultation." },
      { q: "How long does website development take?", a: "Most business websites launch within a few weeks. Larger builds, like e-commerce stores, take longer depending on features and integrations." },
      { q: "Can Webamazee redesign an existing website?", a: "Yes. We modernize outdated sites and preserve your SEO value during the migration." },
      { q: "Do you build SEO-friendly websites?", a: "Yes. Clean structure, fast pages and semantic markup are built in from the start." },
      { q: "Can you build an e-commerce website?", a: "Yes, we build online stores with checkout, payments and product management." },
      { q: "Can Webamazee work with businesses outside Zirakpur?", a: "Absolutely. Webamazee is a global digital growth company helping businesses online worldwide." },
    ],
    contentNotes: [
      { heading: "A website that works as hard as you do", body: "Your website should do more than look good — it should attract visitors, answer their questions and turn them into enquiries. We focus on clear messaging, strong calls to action and a design that reflects your brand." },
      { heading: "Designed for how customers search today", body: "People in and around Zirakpur use search engines and their phones to find businesses. A responsive, fast website ensures you're there when they're looking, whether they're on a laptop or a mobile device." },
    ],
  }),
  buildEntry({
    slug: "seo-services-zirakpur",
    location: "Zirakpur",
    country: "India",
    service: "seo",
    primaryKeyword: "SEO services in Zirakpur",
    marketNotes:
      "For Zirakpur businesses, showing up when customers search matters. SEO helps you become visible for the services you offer in your local market.",
    intro: [
      "Search is where many customers begin — whether they're looking for a service, a product or a local provider. If your business doesn't appear, those customers never get a chance to know you.",
      "Webamazee provides strategic SEO services that help Zirakpur businesses improve their search visibility, attract relevant traffic and convert more of it into enquiries and sales.",
    ],
    whyNeeds: [
      { title: "Local search visibility", desc: "Customers search for services near them — being visible in those results matters." },
      { title: "Organic traffic", desc: "Search traffic is highly relevant and cost-effective compared to paid ads." },
      { title: "Qualified leads", desc: "People searching for your service are already interested in what you offer." },
      { title: "Google rankings", desc: "Higher rankings mean more visibility, more clicks and more enquiries." },
    ],
    servicesIncluded: [
      { name: "Technical SEO", slug: "technical-seo", desc: "Fix crawlability, speed and site health for better rankings." },
      { name: "On-Page SEO", slug: "seo-services", desc: "Optimize titles, content and structure for relevant keywords." },
      { name: "Local SEO", slug: "local-seo", desc: "Improve visibility for location-based searches." },
      { name: "AI SEO", slug: "ai-seo", desc: "Use AI to understand intent and build content that ranks." },
      { name: "Content Optimization", slug: "ai-content-optimization", desc: "Refine content to be genuinely helpful and searchable." },
      { name: "Competitor Analysis", slug: "competitor-analysis", desc: "Understand what's working for competitors and find gaps." },
      { name: "Link Building", slug: "link-building", desc: "Earn quality backlinks that strengthen authority." },
      { name: "Google Ranking Growth", slug: "google-ranking-growth", desc: "A data-led path to improving your search positions." },
    ],
    faqs: [
      { q: "How long does SEO take to show results?", a: "Search engines take time to reflect changes. Most businesses see meaningful movement within a few months, with growth building over time." },
      { q: "Do you provide local SEO?", a: "Yes, we help businesses improve visibility for location-based searches relevant to their market." },
      { q: "Can you improve existing Google rankings?", a: "Yes. We audit your current situation and build a strategy to improve your search positions." },
      { q: "Do you provide technical SEO?", a: "Yes, we fix crawlability, site speed and technical health issues that limit rankings." },
      { q: "Can you work with businesses outside Zirakpur?", a: "Absolutely. Webamazee is a global digital growth company helping businesses online worldwide." },
      { q: "How does your SEO process work?", a: "We discover, strategize, optimize, launch and measure — with clear reporting throughout." },
    ],
    contentNotes: [
      { heading: "SEO that builds over time", body: "Good SEO compounds. Each improvement makes the next more effective, so your organic visibility and traffic keep building month after month." },
      { heading: "A transparent, ethical approach", body: "We use white-hat, Google-safe techniques and report clearly on rankings, traffic and progress — so you always know what your investment is doing." },
    ],
  }),

  // ---------- 3 & 4. NEW ZEALAND ----------

  buildEntry({
    slug: "web-designing-company-new-zealand",
    location: "New Zealand",
    country: "New Zealand",
    service: "web-design",
    primaryKeyword: "web designing company in New Zealand",
    marketNotes:
      "New Zealand businesses — from local services to hospitality and retail — rely on a strong online presence to connect with customers. A fast, trustworthy website helps you stand out and grow.",
    intro: [
      "A great website helps New Zealand businesses build credibility, win trust and convert visitors into customers. Whether you're a local service provider or an established brand, your website is central to how customers experience you.",
      "Webamazee designs and builds premium, conversion-focused websites for businesses across New Zealand — with performance and SEO built in from day one.",
    ],
    whyNeeds: [
      { title: "Customer trust", desc: "A polished website reassures customers you're professional and reliable." },
      { title: "Local search", desc: "Customers search for providers nearby — a strong site helps you get found." },
      { title: "Mobile experience", desc: "New Zealanders browse on phones; your site must perform on every device." },
      { title: "Conversion", desc: "Clear messaging and calls to action turn visits into enquiries." },
    ],
    servicesIncluded: [
      { name: "Business Website Design", slug: "website-development", desc: "Professional sites that represent your brand." },
      { name: "Website Development", slug: "website-development", desc: "Fast, modern builds on a solid technical foundation." },
      { name: "WordPress Development", slug: "website-development", desc: "Easy-to-manage websites you can update yourself." },
      { name: "E-Commerce Development", slug: "ecommerce-development", desc: "Online stores built for New Zealand businesses." },
      { name: "Landing Page Development", slug: "landing-page-development", desc: "High-converting pages for campaigns and offers." },
      { name: "Website Redesign", slug: "website-redesign", desc: "Modernize an existing site while protecting SEO." },
      { name: "UI/UX Design", slug: "website-redesign", desc: "Clear, intuitive, on-brand interfaces." },
      { name: "Website Speed Optimization", slug: "website-development", desc: "Faster pages that rank and convert better." },
    ],
    faqs: [
      { q: "How much does a website cost in New Zealand?", a: "Costs vary with scope. We provide transparent, fixed quotes after understanding your goals in a free consultation." },
      { q: "How long does website development take?", a: "Most business websites launch within a few weeks; larger builds take longer depending on features." },
      { q: "Can Webamazee redesign an existing website?", a: "Yes, and we preserve your SEO value during the migration." },
      { q: "Do you build SEO-friendly websites?", a: "Yes — clean structure, fast pages and semantic markup are standard." },
      { q: "Can you build an e-commerce website?", a: "Yes, we build online stores with payments and product management." },
      { q: "Can Webamazee work with businesses outside New Zealand?", a: "Yes. Webamazee is a global digital growth company helping businesses online worldwide." },
    ],
    contentNotes: [
      { heading: "A website that builds confidence", body: "For New Zealand customers, trust is everything. A fast, clear, professional website shows you're a business they can rely on — and helps you convert interest into enquiries." },
      { heading: "Performance matters", body: "New Zealanders expect fast, responsive websites. We optimize speed and mobile experience so your site performs brilliantly on every device." },
    ],
  }),
  buildEntry({
    slug: "seo-services-new-zealand",
    location: "New Zealand",
    country: "New Zealand",
    service: "seo",
    primaryKeyword: "SEO services in New Zealand",
    marketNotes:
      "New Zealand businesses compete for attention in search results. Strategic SEO helps them get found by the right customers and grow sustainably.",
    intro: [
      "When customers search for what you offer, do they find you? SEO helps New Zealand businesses appear in relevant search results, attract quality traffic and grow online.",
      "Webamazee provides strategic SEO services tailored to New Zealand businesses — improving visibility, organic traffic and enquiries with a transparent, ethical approach.",
    ],
    whyNeeds: [
      { title: "Competitive search", desc: "Stand out among businesses competing for the same customers." },
      { title: "Organic growth", desc: "Build sustainable traffic without relying only on paid ads." },
      { title: "Qualified leads", desc: "Attract people already searching for your services." },
      { title: "Local relevance", desc: "Improve visibility for the searches your customers make." },
    ],
    servicesIncluded: [
      { name: "Technical SEO", slug: "technical-seo", desc: "Fix site health and crawlability for better rankings." },
      { name: "On-Page SEO", slug: "seo-services", desc: "Optimize content and structure for relevant keywords." },
      { name: "Local SEO", slug: "local-seo", desc: "Improve visibility in location-based searches." },
      { name: "AI SEO", slug: "ai-seo", desc: "Use AI to understand intent and build winning content." },
      { name: "Content Optimization", slug: "ai-content-optimization", desc: "Make content genuinely helpful and searchable." },
      { name: "Competitor Analysis", slug: "competitor-analysis", desc: "Find opportunities your competitors are missing." },
      { name: "Link Building", slug: "link-building", desc: "Earn authority that supports rankings." },
      { name: "Google Ranking Growth", slug: "google-ranking-growth", desc: "A data-led path to improving positions." },
    ],
    faqs: [
      { q: "How long does SEO take to show results?", a: "Most businesses see meaningful movement within a few months, with growth building over time." },
      { q: "Do you provide local SEO?", a: "Yes, we improve visibility for the location-based searches relevant to your business." },
      { q: "Can you improve existing rankings?", a: "Yes — we audit your current situation and build a strategy to improve positions." },
      { q: "Do you provide technical SEO?", a: "Yes, we fix speed, crawlability and technical issues." },
      { q: "Can you work with businesses outside New Zealand?", a: "Yes. Webamazee is a global digital growth company." },
      { q: "How does your SEO process work?", a: "Discover, strategize, optimize, launch and measure — with clear reporting throughout." },
    ],
    contentNotes: [
      { heading: "Sustainable, compounding growth", body: "SEO builds on itself. Each improvement strengthens the next, so your visibility and traffic grow steadily over time." },
      { heading: "A transparent partnership", body: "We keep you informed with clear reporting on rankings, traffic and progress — so you always know what's working." },
    ],
  }),

  // ---------- 5 & 6. UNITED STATES ----------

  buildEntry({
    slug: "web-designing-company-united-states",
    location: "United States",
    country: "United States",
    service: "web-design",
    primaryKeyword: "web designing company in United States",
    marketNotes:
      "The US digital market is highly competitive. A fast, polished, conversion-focused website helps American businesses stand out, build trust and win customers online.",
    intro: [
      "In a market as competitive as the United States, your website is one of your most powerful assets. It's how you make a strong first impression, build credibility and convert visitors into customers.",
      "Webamazee designs and builds premium, high-performance websites for US businesses — focused on conversion, speed and search visibility in a crowded digital landscape.",
    ],
    whyNeeds: [
      { title: "Competitive markets", desc: "Stand out among businesses vying for the same customers online." },
      { title: "Lead generation", desc: "Clear paths from visitor to enquiry and sale." },
      { title: "Scalability", desc: "Websites built to grow with your business and audience." },
      { title: "Credibility", desc: "A professional site builds the trust customers need to buy." },
    ],
    servicesIncluded: [
      { name: "Business Website Design", slug: "website-development", desc: "Professional sites that build trust and convert." },
      { name: "Website Development", slug: "website-development", desc: "Fast, modern builds engineered for performance." },
      { name: "WordPress Development", slug: "website-development", desc: "Manageable websites you can update yourself." },
      { name: "E-Commerce Development", slug: "ecommerce-development", desc: "Stores built to sell at scale." },
      { name: "Landing Page Development", slug: "landing-page-development", desc: "Focused pages that maximize campaign ROI." },
      { name: "Website Redesign", slug: "website-redesign", desc: "Modernize an existing site without losing SEO." },
      { name: "UI/UX Design", slug: "website-redesign", desc: "Interfaces optimized for clarity and conversion." },
      { name: "Website Speed Optimization", slug: "website-development", desc: "Fast pages that rank higher and convert more." },
    ],
    faqs: [
      { q: "How much does a website cost in the United States?", a: "Costs depend on scope. We provide clear, fixed quotes tailored to your business after a free consultation." },
      { q: "How long does website development take?", a: "Most business sites launch within a few weeks; larger builds take longer." },
      { q: "Can Webamazee redesign an existing website?", a: "Yes, and we preserve your SEO value during migration." },
      { q: "Do you build SEO-friendly websites?", a: "Yes — clean structure, fast pages and semantic markup are standard." },
      { q: "Can you build an e-commerce website?", a: "Yes, we build scalable online stores with payments and product management." },
      { q: "Can Webamazee work with businesses outside the United States?", a: "Yes. Webamazee is a global digital growth company." },
    ],
    contentNotes: [
      { heading: "Built to win in a competitive market", body: "American customers have plenty of choice. A fast, polished, conversion-focused website helps you stand out and turn interest into action." },
      { heading: "Speed is a competitive advantage", body: "Every second matters. We optimize performance so your site loads fast, ranks well and keeps visitors engaged." },
    ],
  }),
  buildEntry({
    slug: "seo-services-united-states",
    location: "United States",
    country: "United States",
    service: "seo",
    primaryKeyword: "SEO services in United States",
    marketNotes:
      "US search results are fiercely competitive. Strategic SEO helps American businesses win visibility, attract qualified traffic and grow sustainably.",
    intro: [
      "In the United States, search is where customers compare options and make decisions. SEO helps your business appear in relevant results, attract the right traffic and convert it into growth.",
      "Webamazee provides strategic, white-hat SEO for US businesses — improving visibility, organic traffic and enquiries with a data-driven approach.",
    ],
    whyNeeds: [
      { title: "Competitive search results", desc: "Win visibility in a crowded, high-competition market." },
      { title: "Lead generation", desc: "Attract customers actively searching for your services." },
      { title: "Organic traffic", desc: "Build sustainable traffic that reduces reliance on paid ads." },
      { title: "Conversion optimization", desc: "Turn search visitors into enquiries and customers." },
    ],
    servicesIncluded: [
      { name: "Technical SEO", slug: "technical-seo", desc: "Fix site health for better crawlability and rankings." },
      { name: "On-Page SEO", slug: "seo-services", desc: "Optimize content and structure for target keywords." },
      { name: "Local SEO", slug: "local-seo", desc: "Improve visibility in local and regional searches." },
      { name: "AI SEO", slug: "ai-seo", desc: "Use AI to understand intent and build winning content." },
      { name: "Content Optimization", slug: "ai-content-optimization", desc: "Make content genuinely helpful and searchable." },
      { name: "Competitor Analysis", slug: "competitor-analysis", desc: "Find opportunities competitors are missing." },
      { name: "Link Building", slug: "link-building", desc: "Earn quality backlinks that support rankings." },
      { name: "Google Ranking Growth", slug: "google-ranking-growth", desc: "A data-led path to improving positions." },
    ],
    faqs: [
      { q: "How long does SEO take to show results?", a: "Most businesses see meaningful movement within a few months, with growth building over time." },
      { q: "Do you provide local SEO?", a: "Yes, we improve visibility for location-based searches." },
      { q: "Can you improve existing rankings?", a: "Yes — we audit and build a strategy to improve positions." },
      { q: "Do you provide technical SEO?", a: "Yes, we fix speed, crawlability and technical issues." },
      { q: "Can you work with businesses outside the United States?", a: "Yes. Webamazee is a global digital growth company." },
      { q: "How does your SEO process work?", a: "Discover, strategize, optimize, launch and measure." },
    ],
    contentNotes: [
      { heading: "Winning in a crowded market", body: "Competitive keywords take work. Our data-driven approach targets the opportunities most likely to move your business forward." },
      { heading: "A long-term, ethical approach", body: "We build sustainable rankings with white-hat techniques and clear reporting, so growth lasts." },
    ],
  }),

  // ---------- 7 & 8. UNITED KINGDOM ----------

  buildEntry({
    slug: "web-designing-company-united-kingdom",
    location: "United Kingdom",
    country: "United Kingdom",
    service: "web-design",
    primaryKeyword: "web designing company in United Kingdom",
    marketNotes:
      "UK businesses across services, retail and hospitality need a strong online presence to build credibility and win customers. A fast, professional website makes that possible.",
    intro: [
      "Your website is often the first thing UK customers see about your business. A clear, fast, professional site builds trust and turns interest into enquiries.",
      "Webamazee designs and builds premium, conversion-focused websites for UK businesses — with performance and SEO built in from the start.",
    ],
    whyNeeds: [
      { title: "Credibility", desc: "A polished website reassures customers you're professional." },
      { title: "Local markets", desc: "Service businesses need a strong local online presence." },
      { title: "Search visibility", desc: "A well-built site helps you get found in search results." },
      { title: "Conversion", desc: "Clear calls to action turn visitors into customers." },
    ],
    servicesIncluded: [
      { name: "Business Website Design", slug: "website-development", desc: "Professional sites that build trust." },
      { name: "Website Development", slug: "website-development", desc: "Fast, modern builds." },
      { name: "WordPress Development", slug: "website-development", desc: "Easy-to-manage websites." },
      { name: "E-Commerce Development", slug: "ecommerce-development", desc: "Online stores built to sell." },
      { name: "Landing Page Development", slug: "landing-page-development", desc: "High-converting campaign pages." },
      { name: "Website Redesign", slug: "website-redesign", desc: "Modernize an existing site while protecting SEO." },
      { name: "UI/UX Design", slug: "website-redesign", desc: "Clear, on-brand interfaces." },
      { name: "Website Speed Optimization", slug: "website-development", desc: "Faster pages that rank and convert." },
    ],
    faqs: [
      { q: "How much does a website cost in the United Kingdom?", a: "Costs vary with scope. We provide clear, fixed quotes after a free consultation." },
      { q: "How long does website development take?", a: "Most business sites launch within a few weeks." },
      { q: "Can Webamazee redesign an existing website?", a: "Yes, and we preserve your SEO value during migration." },
      { q: "Do you build SEO-friendly websites?", a: "Yes — clean structure, fast pages and semantic markup are standard." },
      { q: "Can you build an e-commerce website?", a: "Yes, we build online stores with payments and product management." },
      { q: "Can Webamazee work with businesses outside the United Kingdom?", a: "Yes. Webamazee is a global digital growth company." },
    ],
    contentNotes: [
      { heading: "Building trust with a professional presence", body: "UK customers value reliability. A clear, professional website helps you make a confident first impression and convert interest into enquiries." },
      { heading: "Fast, responsive, and ready to convert", body: "We optimize speed and mobile experience so your site performs brilliantly and turns visitors into customers." },
    ],
  }),
  buildEntry({
    slug: "seo-services-united-kingdom",
    location: "United Kingdom",
    country: "United Kingdom",
    service: "seo",
    primaryKeyword: "SEO services in United Kingdom",
    marketNotes:
      "UK search markets are competitive, especially for local services. SEO helps businesses get found by the right customers and grow sustainably.",
    intro: [
      "When customers search for your services in the UK, visibility matters. SEO helps you appear in relevant results, attract qualified traffic and grow.",
      "Webamazee provides strategic, white-hat SEO for UK businesses — improving visibility, organic traffic and enquiries with a clear, ethical approach.",
    ],
    whyNeeds: [
      { title: "Competitive local markets", desc: "Stand out among businesses serving the same customers." },
      { title: "Service businesses", desc: "SEO helps service providers get found for what they offer." },
      { title: "Search visibility", desc: "Appear in the results your customers actually see." },
      { title: "Conversion", desc: "Turn search visitors into enquiries and customers." },
    ],
    servicesIncluded: [
      { name: "Technical SEO", slug: "technical-seo", desc: "Fix site health for better rankings." },
      { name: "On-Page SEO", slug: "seo-services", desc: "Optimize content and structure." },
      { name: "Local SEO", slug: "local-seo", desc: "Improve local search visibility." },
      { name: "AI SEO", slug: "ai-seo", desc: "Use AI to build content that ranks." },
      { name: "Content Optimization", slug: "ai-content-optimization", desc: "Make content helpful and searchable." },
      { name: "Competitor Analysis", slug: "competitor-analysis", desc: "Find winning opportunities." },
      { name: "Link Building", slug: "link-building", desc: "Earn authority that supports rankings." },
      { name: "Google Ranking Growth", slug: "google-ranking-growth", desc: "Improve your search positions." },
    ],
    faqs: [
      { q: "How long does SEO take to show results?", a: "Most businesses see meaningful movement within a few months." },
      { q: "Do you provide local SEO?", a: "Yes, we improve local search visibility." },
      { q: "Can you improve existing rankings?", a: "Yes — we audit and build a strategy to improve positions." },
      { q: "Do you provide technical SEO?", a: "Yes, we fix speed and technical issues." },
      { q: "Can you work with businesses outside the United Kingdom?", a: "Yes. Webamazee is a global digital growth company." },
      { q: "How does your SEO process work?", a: "Discover, strategize, optimize, launch and measure." },
    ],
    contentNotes: [
      { heading: "A clear path to better visibility", body: "We focus on the searches that matter to your business and build a plan to win them — sustainably and ethically." },
      { heading: "Transparent, long-term growth", body: "Clear reporting and white-hat techniques mean your SEO investment compounds over time." },
    ],
  }),

  // ---------- 9 & 10. AUSTRALIA ----------

  buildEntry({
    slug: "web-designing-company-australia",
    location: "Australia",
    country: "Australia",
    service: "web-design",
    primaryKeyword: "web designing company in Australia",
    marketNotes:
      "Australian businesses across services, retail and hospitality rely on a strong online presence to connect with customers. A fast, professional website builds credibility and drives growth.",
    intro: [
      "Your website is central to how Australian customers experience your business. A fast, clear, professional site builds trust and turns visits into enquiries.",
      "Webamazee designs and builds premium, conversion-focused websites for Australian businesses — with performance and SEO built in from the start.",
    ],
    whyNeeds: [
      { title: "Customer trust", desc: "A professional site reassures customers you're reliable." },
      { title: "Local search", desc: "Customers search for providers — a strong site helps you get found." },
      { title: "Performance", desc: "Australian customers expect fast, responsive websites." },
      { title: "Lead generation", desc: "Clear calls to action turn visitors into enquiries." },
    ],
    servicesIncluded: [
      { name: "Business Website Design", slug: "website-development", desc: "Professional sites that build trust." },
      { name: "Website Development", slug: "website-development", desc: "Fast, modern builds." },
      { name: "WordPress Development", slug: "website-development", desc: "Easy-to-manage websites." },
      { name: "E-Commerce Development", slug: "ecommerce-development", desc: "Online stores built to sell." },
      { name: "Landing Page Development", slug: "landing-page-development", desc: "High-converting campaign pages." },
      { name: "Website Redesign", slug: "website-redesign", desc: "Modernize an existing site while protecting SEO." },
      { name: "UI/UX Design", slug: "website-redesign", desc: "Clear, on-brand interfaces." },
      { name: "Website Speed Optimization", slug: "website-development", desc: "Faster pages that rank and convert." },
    ],
    faqs: [
      { q: "How much does a website cost in Australia?", a: "Costs depend on scope. We provide clear, fixed quotes after a free consultation." },
      { q: "How long does website development take?", a: "Most business sites launch within a few weeks." },
      { q: "Can Webamazee redesign an existing website?", a: "Yes, and we preserve your SEO value during migration." },
      { q: "Do you build SEO-friendly websites?", a: "Yes — clean structure, fast pages and semantic markup are standard." },
      { q: "Can you build an e-commerce website?", a: "Yes, we build online stores with payments and product management." },
      { q: "Can Webamazee work with businesses outside Australia?", a: "Yes. Webamazee is a global digital growth company." },
    ],
    contentNotes: [
      { heading: "Built for how Australians buy", body: "Customers expect a fast, clear, trustworthy online experience. We build websites that deliver on that expectation and turn interest into action." },
      { heading: "Performance and SEO from the start", body: "We optimize speed, structure and on-page fundamentals so your website ranks and converts." },
    ],
  }),
  buildEntry({
    slug: "seo-services-australia",
    location: "Australia",
    country: "Australia",
    service: "seo",
    primaryKeyword: "SEO services in Australia",
    marketNotes:
      "Australian search markets are competitive, especially for service businesses. SEO helps businesses get found, attract quality traffic and grow.",
    intro: [
      "When customers search for your services in Australia, being visible matters. SEO helps you appear in relevant results, attract qualified traffic and grow sustainably.",
      "Webamazee provides strategic, white-hat SEO for Australian businesses — improving visibility, organic traffic and enquiries with a transparent approach.",
    ],
    whyNeeds: [
      { title: "Competitive search", desc: "Stand out among businesses serving the same customers." },
      { title: "Service businesses", desc: "SEO helps service providers get found for what they offer." },
      { title: "Organic traffic", desc: "Build sustainable traffic that reduces paid-ad reliance." },
      { title: "Lead generation", desc: "Attract customers actively searching for your services." },
    ],
    servicesIncluded: [
      { name: "Technical SEO", slug: "technical-seo", desc: "Fix site health for better rankings." },
      { name: "On-Page SEO", slug: "seo-services", desc: "Optimize content and structure." },
      { name: "Local SEO", slug: "local-seo", desc: "Improve local search visibility." },
      { name: "AI SEO", slug: "ai-seo", desc: "Use AI to build content that ranks." },
      { name: "Content Optimization", slug: "ai-content-optimization", desc: "Make content helpful and searchable." },
      { name: "Competitor Analysis", slug: "competitor-analysis", desc: "Find winning opportunities." },
      { name: "Link Building", slug: "link-building", desc: "Earn authority that supports rankings." },
      { name: "Google Ranking Growth", slug: "google-ranking-growth", desc: "Improve your search positions." },
    ],
    faqs: [
      { q: "How long does SEO take to show results?", a: "Most businesses see meaningful movement within a few months." },
      { q: "Do you provide local SEO?", a: "Yes, we improve local search visibility." },
      { q: "Can you improve existing rankings?", a: "Yes — we audit and build a strategy to improve positions." },
      { q: "Do you provide technical SEO?", a: "Yes, we fix speed and technical issues." },
      { q: "Can you work with businesses outside Australia?", a: "Yes. Webamazee is a global digital growth company." },
      { q: "How does your SEO process work?", a: "Discover, strategize, optimize, launch and measure." },
    ],
    contentNotes: [
      { heading: "A sustainable path to growth", body: "We focus on the searches that matter and build an ethical, data-driven plan that compounds over time." },
      { heading: "Clear reporting, real progress", body: "You'll always know what's working with transparent reporting on rankings, traffic and progress." },
    ],
  }),

  // ---------- 11 & 12. UAE ----------

  buildEntry({
    slug: "web-designing-company-uae",
    location: "UAE",
    country: "United Arab Emirates",
    service: "web-design",
    primaryKeyword: "web designing company in UAE",
    marketNotes:
      "The UAE's digital market is fast-moving and competitive. A premium, high-performance website helps businesses position themselves strongly and win customers online.",
    intro: [
      "In a competitive market like the UAE, your website is a statement about your business. A premium, fast, conversion-focused site helps you stand out, build trust and grow.",
      "Webamazee designs and builds premium websites for UAE businesses — focused on positioning, performance and conversion.",
    ],
    whyNeeds: [
      { title: "Premium positioning", desc: "A polished website reflects the quality of your business." },
      { title: "Competitive markets", desc: "Stand out in a crowded, fast-moving digital landscape." },
      { title: "Lead generation", desc: "Clear paths from visitor to enquiry and sale." },
      { title: "International audience", desc: "A strong site helps you connect with global customers." },
    ],
    servicesIncluded: [
      { name: "Business Website Design", slug: "website-development", desc: "Premium sites that build trust." },
      { name: "Website Development", slug: "website-development", desc: "Fast, modern builds." },
      { name: "WordPress Development", slug: "website-development", desc: "Easy-to-manage websites." },
      { name: "E-Commerce Development", slug: "ecommerce-development", desc: "Online stores built to sell." },
      { name: "Landing Page Development", slug: "landing-page-development", desc: "High-converting campaign pages." },
      { name: "Website Redesign", slug: "website-redesign", desc: "Modernize an existing site while protecting SEO." },
      { name: "UI/UX Design", slug: "website-redesign", desc: "Clear, premium interfaces." },
      { name: "Website Speed Optimization", slug: "website-development", desc: "Faster pages that rank and convert." },
    ],
    faqs: [
      { q: "How much does a website cost in the UAE?", a: "Costs depend on scope and positioning. We provide clear, fixed quotes after a free consultation." },
      { q: "How long does website development take?", a: "Most business sites launch within a few weeks." },
      { q: "Can Webamazee redesign an existing website?", a: "Yes, and we preserve your SEO value during migration." },
      { q: "Do you build SEO-friendly websites?", a: "Yes — clean structure, fast pages and semantic markup are standard." },
      { q: "Can you build an e-commerce website?", a: "Yes, we build online stores with payments and product management." },
      { q: "Can Webamazee work with businesses outside the UAE?", a: "Yes. Webamazee is a global digital growth company." },
    ],
    contentNotes: [
      { heading: "A premium presence that wins trust", body: "In a market that values quality, a polished, high-performance website helps you position your business strongly and convert interest into customers." },
      { heading: "Built to perform globally", body: "We optimize speed, mobile experience and SEO so your site performs brilliantly for international audiences." },
    ],
  }),
  buildEntry({
    slug: "seo-services-uae",
    location: "UAE",
    country: "United Arab Emirates",
    service: "seo",
    primaryKeyword: "SEO services in UAE",
    marketNotes:
      "The UAE's search market is competitive and international. Strategic SEO helps businesses improve visibility, attract qualified traffic and grow.",
    intro: [
      "In a competitive market like the UAE, visibility online is essential. SEO helps your business appear in relevant search results, attract the right customers and grow.",
      "Webamazee provides strategic, white-hat SEO for UAE businesses — improving visibility, organic traffic and enquiries with a data-driven approach.",
    ],
    whyNeeds: [
      { title: "Competitive search", desc: "Stand out in a fast-moving, competitive market." },
      { title: "Lead generation", desc: "Attract customers actively searching for your services." },
      { title: "Search visibility", desc: "Appear in the results your customers see." },
      { title: "Conversion", desc: "Turn search visitors into enquiries and customers." },
    ],
    servicesIncluded: [
      { name: "Technical SEO", slug: "technical-seo", desc: "Fix site health for better rankings." },
      { name: "On-Page SEO", slug: "seo-services", desc: "Optimize content and structure." },
      { name: "Local SEO", slug: "local-seo", desc: "Improve local search visibility." },
      { name: "AI SEO", slug: "ai-seo", desc: "Use AI to build content that ranks." },
      { name: "Content Optimization", slug: "ai-content-optimization", desc: "Make content helpful and searchable." },
      { name: "Competitor Analysis", slug: "competitor-analysis", desc: "Find winning opportunities." },
      { name: "Link Building", slug: "link-building", desc: "Earn authority that supports rankings." },
      { name: "Google Ranking Growth", slug: "google-ranking-growth", desc: "Improve your search positions." },
    ],
    faqs: [
      { q: "How long does SEO take to show results?", a: "Most businesses see meaningful movement within a few months." },
      { q: "Do you provide local SEO?", a: "Yes, we improve local search visibility." },
      { q: "Can you improve existing rankings?", a: "Yes — we audit and build a strategy to improve positions." },
      { q: "Do you provide technical SEO?", a: "Yes, we fix speed and technical issues." },
      { q: "Can you work with businesses outside the UAE?", a: "Yes. Webamazee is a global digital growth company." },
      { q: "How does your SEO process work?", a: "Discover, strategize, optimize, launch and measure." },
    ],
    contentNotes: [
      { heading: "Winning visibility in a competitive market", body: "We focus on the searches that matter to your business and build an ethical, data-driven plan to win them." },
      { heading: "A long-term, transparent approach", body: "White-hat techniques and clear reporting mean your SEO investment compounds over time." },
    ],
  }),
];

const priorityWebDesignSlugs = new Set([
  "web-designing-company-zirakpur",
  "web-designing-company-mohali",
  "web-designing-company-panchkula",
  "web-designing-company-chandigarh",
  "web-designing-company-new-zealand",
  "web-designing-company-united-states",
  "web-designing-company-united-kingdom",
  "web-designing-company-uae",
]);

const completeWebServices = [
  { name: "Website Development", slug: "website-development", desc: "Strategy, design and development for a fast, responsive business website.", benefit: "A dependable digital foundation" },
  { name: "Web Design", slug: "website-development", desc: "Clear, brand-aligned interfaces planned around real customer journeys.", benefit: "A credible first impression" },
  { name: "E-Commerce Development", slug: "ecommerce-development", desc: "Online stores with practical product, cart and checkout experiences.", benefit: "A smoother route to purchase" },
  { name: "SEO Services", slug: "seo-services", desc: "Technical, on-page and content work that supports organic visibility.", benefit: "Build relevant search visibility" },
  { name: "Landing Page Development", slug: "landing-page-development", desc: "Focused campaign pages with one clear conversion goal.", benefit: "Turn campaign traffic into action" },
  { name: "Website Redesign", slug: "website-redesign", desc: "Modernise an existing website while planning carefully around its SEO value.", benefit: "Improve the experience without careless migration" },
  { name: "AI SEO", slug: "ai-seo", desc: "Human-led search strategy supported by AI-assisted research and analysis.", benefit: "Sharper search intent coverage" },
  { name: "AI Content Optimization", slug: "ai-content-optimization", desc: "Improve useful website content around audience needs and search intent.", benefit: "Clearer, more relevant content" },
];

const locationProjectLinks = [
  { label: "Kabir Oil Mill e-commerce case study", href: "/work/kabir-oil-mill", description: "A complete online store for an oil products business." },
  { label: "Wellington Tours website case study", href: "/work/wellington-tours", description: "A New Zealand travel website built to support enquiries." },
  { label: "Shine Gold Tours India redesign", href: "/work/shine-gold-tours-india", description: "A modern travel website redesign focused on discovery and leads." },
];

const locationServiceRoutes: Record<string, { seo: string; digital: string; ai: string; audience: string }> = {
  "web-designing-company-zirakpur": {
    seo: "/seo-services-zirakpur",
    digital: "/digital-marketing-company-zirakpur",
    ai: "/ai-marketing-company-zirakpur",
    audience: "local customers across Zirakpur and the wider Tricity",
  },
  "web-designing-company-chandigarh": {
    seo: "/seo-services-chandigarh",
    digital: "/digital-marketing-company-chandigarh",
    ai: "/ai-marketing-company-chandigarh",
    audience: "professional and consumer audiences across Chandigarh and the Tricity",
  },
  "web-designing-company-mohali": {
    seo: "/seo-services-mohali",
    digital: "/digital-marketing-company-mohali",
    ai: "/ai-marketing-company-mohali",
    audience: "technology, B2B and service buyers in Mohali",
  },
  "web-designing-company-panchkula": {
    seo: "/seo-services-panchkula",
    digital: "/digital-marketing-company-panchkula",
    ai: "/ai-marketing-company-panchkula",
    audience: "customers comparing trusted providers in Panchkula and nearby markets",
  },
  "web-designing-company-new-zealand": {
    seo: "/seo-services-new-zealand",
    digital: "/digital-marketing-company-new-zealand",
    ai: "/ai-marketing-company-new-zealand",
    audience: "regional, nationwide and tourism audiences in New Zealand",
  },
  "web-designing-company-united-states": {
    seo: "/seo-services-united-states",
    digital: "/digital-marketing-company-usa",
    ai: "/ai-marketing-company-usa",
    audience: "competitive regional and national audiences in the United States",
  },
  "web-designing-company-united-kingdom": {
    seo: "/seo-services-united-kingdom",
    digital: "/digital-marketing-company-uk",
    ai: "/ai-marketing-company-uk",
    audience: "regional and UK-wide customers who value clear service information",
  },
  "web-designing-company-uae": {
    seo: "/seo-services-uae",
    digital: "/digital-marketing-company-uae",
    ai: "/ai-marketing-company-uae",
    audience: "local, expatriate and international buyers in the UAE",
  },
};

function buildLocationServices(page: LocationPage) {
  const routes = locationServiceRoutes[page.slug];
  if (!routes) return undefined;
  return [
    {
      name: `Web Designing Company in ${page.location}`,
      description: `Build a fast, conversion-focused website for ${routes.audience}.`,
      cta: "Explore Web Design",
      href: `/${page.slug}`,
    },
    {
      name: `SEO Services in ${page.location}`,
      description: `Strengthen search visibility with useful content and technical SEO shaped around ${routes.audience}.`,
      cta: "Explore SEO Services",
      href: routes.seo,
    },
    {
      name: `Digital Marketing Company in ${page.location}`,
      description: `Connect website, search, content and measurement for ${routes.audience}.`,
      cta: "Explore Digital Marketing",
      href: routes.digital,
    },
    {
      name: `AI Marketing Company in ${page.location}`,
      description: `Use human-led AI research and optimisation to support marketing for ${routes.audience}.`,
      cta: "Explore AI Marketing",
      href: routes.ai,
    },
  ];
}

const priorityLocationDetails: Record<string, Partial<LocationPage>> = {
  "web-designing-company-zirakpur": {
    metaTitle: "Professional Web Designing Company in Zirakpur – Webamazee",
    metaDescription:
      "We are a best web designing company in Zirakpur. you can get websites which has fast loading speed and are made more customers. contact us Today",
    h1: "Professional Web Designing Company in Zirakpur",
    // Exact target keywords for this page (per brief). Kept as a focused set
    // rather than repeating the phrase throughout the page body.
    keywords: [
      "website designing company in Zirakpur",
      "web design company in Zirakpur",
      "website development company in Zirakpur",
    ],
    heroText: "Give a Zirakpur business a clearer digital storefront for Tricity customers, mobile visitors and people comparing nearby providers before they call or visit.",

    // Search intent this page genuinely answers — written for a Zirakpur business
    // owner, not repeated keyword blocks.
    intent: [
      {
        heading: "A website that earns enquiries from the Tricity",
        body: "Many Zirakpur businesses draw customers from Zirakpur itself as well as Chandigarh, Mohali and Panchkula. The site needs to make your offer, service area and contact options clear in the first few seconds on any device.",
      },
      {
        heading: "Fast-loading pages for mobile-first visitors",
        body: "A lot of local searches in and around Zirakpur happen on phones. We optimise images, code and hosting so pages load quickly, which keeps visitors on the site and supports better search performance.",
      },
      {
        heading: "Found when customers search nearby",
        body: "A clear service structure, useful local content and sensible internal links help search engines understand what you offer and where you serve, so you can appear for relevant local searches.",
      },
      {
        heading: "Built to turn visits into calls and messages",
        body: "Every page is planned around a clear next step — call, WhatsApp, enquiry form, direction or purchase — so the website supports lead generation rather than just looking presentable.",
      },
    ],

    // What a Zirakpur business actually receives — unique, useful detail.
    coreService: [
      "Webamazee plans and builds websites for the way businesses in Zirakpur and the wider Chandigarh Tricity actually win customers. A typical project starts with a short discovery conversation about your offer, the customers you want to reach and the action you want them to take — whether that is a phone call, a WhatsApp message, a form enquiry or an online order.",
      "For service businesses such as clinics, salons, coaching centres, real estate and property consultants, legal and financial advisers, contractors and local trades, we build clear service pages, contact and enquiry journeys, and easy call or WhatsApp options. For restaurants, cafes and retailers, the focus is on menus or catalogues, opening information, location and online orders or reservations. For product and e-commerce businesses, we plan product discovery, cart and checkout so buying is straightforward on mobile.",
      "Every website is mobile responsive and tested across phones, tablets and desktops. We treat page speed and Core Web Vitals as part of the build, not an afterthought, and use clean, semantic structure and sensible heading hierarchy so search engines can understand the site. Calls to action, forms and tracking are set up before launch so you can see where enquiries come from.",
      "After launch we can continue with SEO, local search support and improvements based on real visitor behaviour — so the website keeps pace as your business grows. Throughout the project we collaborate remotely with clear milestones and review stages, which works well for busy Zirakpur business owners.",
    ],

    whyNeeds: [
      { title: "Tricity competition", desc: "Customers can compare providers across Zirakpur, Chandigarh, Mohali and Panchkula, so the website must explain the difference quickly." },
      { title: "Mobile-first discovery", desc: "Local service, retail and property searches often begin on a phone and need direct calls, directions or enquiry paths." },
      { title: "Trust before contact", desc: "Clear services, genuine work and practical business information help a growing company feel established." },
      { title: "Local and wider reach", desc: "The site should support nearby enquiries without limiting a business that also serves the wider region." },
    ],
    whyChoose: [
      { title: "Tricity-aware planning", desc: "We structure pages for businesses competing across connected local markets, not for one isolated neighbourhood." },
      { title: "Lead-focused journeys", desc: "Calls, forms, location information and service details are organised around the way nearby customers decide." },
      { title: "SEO-ready foundations", desc: "Service hierarchy, local relevance and technical structure are considered before launch." },
      { title: "Practical e-commerce", desc: "Retail and product businesses can add a clear online buying experience without unnecessary complexity." },
      { title: "Remote, accountable delivery", desc: "Milestones and shared reviews keep the project clear even when most collaboration happens online." },
    ],
    industries: [
      { name: "Local businesses", desc: "Service pages and contact journeys for businesses serving Zirakpur and the Tricity.", href: "/seo-for-local-business" },
      { name: "E-commerce", desc: "Online stores for retailers and product businesses that want to sell beyond walk-in trade.", href: "/seo-for-ecommerce" },
      { name: "Professional services", desc: "Credibility-led websites for consultants, agencies and specialist practices.", href: "/seo-for-professional-services" },
      { name: "Healthcare", desc: "Clear service and enquiry information for clinics and healthcare providers.", href: "/seo-for-healthcare" },
      { name: "Travel and tourism", desc: "Destination, package and enquiry experiences for travel businesses.", href: "/seo-for-tourism" },
      { name: "Property and home services", desc: "Mobile-friendly websites for businesses responding to local property and household needs." },
    ],
    contentNotes: [
      { heading: "Competing across the Tricity", body: "A Zirakpur website often needs to establish local relevance while explaining why customers from neighbouring Chandigarh, Mohali and Panchkula should choose the business. We help you present your service area and offer clearly without repeating place names across the page." },
      { heading: "Built for fast, mobile-first browsing", body: "Zirakpur customers often search and compare businesses on their phones, sometimes on slower connections. We optimise images, code and page weight so the site loads quickly and stays usable on mobile, which supports both visitor experience and search visibility." },
      { heading: "Designed around enquiries and sales", body: "For local services, restaurants, property, healthcare and retail alike, the website is structured around a clear next step — a call, WhatsApp message, booking, direction or purchase — rather than decorative pages that do not contribute to the business." },
      { heading: "Search-ready without doorway copy", body: "We support local visibility with useful service information, factual service areas and genuine internal links to relevant pages, instead of thin, keyword-stuffed location pages that search engines tend to ignore." },
      { heading: "Fast routes to action", body: "For mobile visitors, clear calls, directions, enquiries and product actions matter more than decorative complexity. We make the contact and conversion paths obvious from every important page." },
    ],
    // Genuine supporting resources (only real existing posts) and nearby
    // Tricity location pages — natural internal linking, not a link dump.
    blogLinks: [
      { label: "How much does it cost to hire a web developer?", href: "/blog/web-developer-cost-guide-2026" },
      { label: "When should you redesign your website? A practical guide", href: "/blog/redesign-before-after-seo" },
      { label: "Core Web Vitals for business websites: a practical guide", href: "/blog/core-web-vitals-guide" },
      { label: "Local SEO checklist for service businesses", href: "/blog/local-seo-checklist" },
    ],
    clusterLinks: [
      { label: "Web design in Chandigarh", href: "/web-designing-company-chandigarh" },
      { label: "Web design in Mohali", href: "/web-designing-company-mohali" },
      { label: "Web design in Panchkula", href: "/web-designing-company-panchkula" },
      { label: "All services in Zirakpur", href: "/services-in-zirakpur" },
    ],
    portfolioLinks: [locationProjectLinks[0], locationProjectLinks[2], locationProjectLinks[1]],
    ctaTitle: "Build a Stronger Digital Presence for Your Zirakpur Business",
    ctaSubtitle: "Tell us how customers currently find you and we will map the website, search and enquiry journey around your next stage of growth.",
    ctaLabel: "Plan Your Website",
  },
  "web-designing-company-mohali": {
    heroText: "Build a polished website for Mohali's technology, B2B and service market—one that explains a complex offer clearly and turns serious research into an enquiry.",
    whyNeeds: [
      { title: "Technology-led expectations", desc: "Startups and IT buyers expect a modern, fast experience that reflects the quality of the team behind it." },
      { title: "Longer B2B decisions", desc: "Capability, process, proof and contact options must support buyers who compare several providers." },
      { title: "Recruitment and credibility", desc: "A clear company story helps customers, partners and prospective team members understand the business." },
      { title: "Scalable content", desc: "Growing teams need a structure that can accommodate new services, products and market pages." },
    ],
    whyChoose: [
      { title: "B2B message clarity", desc: "We turn technical capabilities into pages that decision-makers can understand and navigate." },
      { title: "Scalable architecture", desc: "The content model can grow with new services, sectors and product features." },
      { title: "Performance-conscious build", desc: "Responsive delivery and technical discipline support a professional product impression." },
      { title: "Search and conversion together", desc: "Organic landing pages still guide visitors toward demos, calls or qualified enquiries." },
      { title: "Structured collaboration", desc: "Clear review stages work well with founders, marketing teams and technical stakeholders." },
    ],
    industries: [
      { name: "SaaS and technology", desc: "Product, feature and comparison journeys for software businesses.", href: "/seo-for-saas" },
      { name: "Professional services", desc: "Authority-led sites for consultants, agencies and B2B specialists.", href: "/seo-for-professional-services" },
      { name: "E-commerce", desc: "Maintainable stores for growing product brands.", href: "/seo-for-ecommerce" },
      { name: "Healthcare", desc: "Accessible information and enquiry journeys for clinics and providers.", href: "/seo-for-healthcare" },
      { name: "Local businesses", desc: "Search-ready websites for companies serving Mohali and the wider Tricity.", href: "/seo-for-local-business" },
      { name: "Education and training", desc: "Course, programme and admissions information organised for prospective students." },
    ],
    contentNotes: [
      { heading: "Explaining technical value", body: "Mohali technology and B2B firms often need the website to translate specialist work into outcomes a buyer can evaluate." },
      { heading: "SEO across a longer journey", body: "Feature, service and educational pages can answer different questions before a prospect is ready to contact sales." },
      { heading: "Ready for the next service line", body: "A modular structure avoids a full rebuild whenever the business expands its offer." },
    ],
    portfolioLinks: [locationProjectLinks[1], locationProjectLinks[0], locationProjectLinks[2]],
    ctaTitle: "Plan a Website That Matches Your Mohali Business",
    ctaSubtitle: "Bring us your product, service or growth challenge and we will shape a clear website roadmap around it.",
    ctaLabel: "Discuss Your Website",
  },
  "web-designing-company-panchkula": {
    heroText: "Create a trustworthy website for Panchkula customers who want clear service information, a strong local reputation and an easy way to take the next step.",
    whyNeeds: [
      { title: "Reputation-led buying", desc: "Professional practices and local services need the website to reinforce trust before a call or appointment." },
      { title: "Cross-city customers", desc: "Many businesses serve the wider Tricity, so navigation and location context must support more than one audience." },
      { title: "Clear appointments and enquiries", desc: "Visitors should quickly find the right service and know how to contact or book." },
      { title: "Modernising established brands", desc: "Long-running businesses often need a better digital experience without losing familiar brand equity." },
    ],
    whyChoose: [
      { title: "Trust-first design", desc: "Service detail, credentials, work and contact information are presented in a calm, credible hierarchy." },
      { title: "Local journey planning", desc: "The site supports calls, enquiries and location intent without turning every paragraph into local keywords." },
      { title: "Careful redesigns", desc: "Existing content and search value are reviewed before changing URLs or page structure." },
      { title: "Accessible mobile experience", desc: "Readable layouts and clear controls support people researching services on the move." },
      { title: "Connected SEO support", desc: "Technical, on-page and content work can continue after launch where required." },
    ],
    industries: [
      { name: "Healthcare", desc: "Reassuring, accessible pages for clinics and specialist providers.", href: "/seo-for-healthcare" },
      { name: "Professional services", desc: "Credibility and enquiry journeys for consultants and practices.", href: "/seo-for-professional-services" },
      { name: "Local businesses", desc: "Service and location visibility for Panchkula-focused companies.", href: "/seo-for-local-business" },
      { name: "E-commerce", desc: "Online stores for retailers moving beyond local footfall.", href: "/seo-for-ecommerce" },
      { name: "Travel and tourism", desc: "Package discovery and enquiry websites for travel operators.", href: "/seo-for-tourism" },
      { name: "Education", desc: "Programme information and enquiry paths for institutes and training providers." },
    ],
    contentNotes: [
      { heading: "Trust before an appointment", body: "For healthcare and professional services, the website should answer practical questions before asking someone to enquire." },
      { heading: "Serving Panchkula and the Tricity", body: "Useful area context and linked service pages can support regional visibility without producing repetitive doorway content." },
      { heading: "Redesign without disruption", body: "Established businesses benefit from an inventory of useful pages, links and search signals before migration." },
    ],
    portfolioLinks: [locationProjectLinks[2], locationProjectLinks[0], locationProjectLinks[1]],
    ctaTitle: "Turn Your Panchkula Website Into a Better Customer Journey",
    ctaSubtitle: "We will review the information customers need and plan a clearer path from first visit to enquiry.",
    ctaLabel: "Start the Conversation",
  },
  "web-designing-company-chandigarh": {
    heroText: "Present a Chandigarh business with the clarity expected in a competitive professional market, from the first search result to the final enquiry or purchase action.",
    whyNeeds: [
      { title: "Professional competition", desc: "A polished digital presence helps firms stand out when buyers compare expertise and service quality." },
      { title: "Regional visibility", desc: "Many organisations serve the full Tricity and need clear service-area and content architecture." },
      { title: "Mixed buyer journeys", desc: "Customers may research on mobile, return on desktop and contact only after reviewing proof and details." },
      { title: "Campaign readiness", desc: "Focused landing pages should be available when a business runs a new service, event or advertising campaign." },
    ],
    whyChoose: [
      { title: "Professional positioning", desc: "We organise messages, proof and service detail for discerning business and consumer audiences." },
      { title: "Regional information architecture", desc: "Service and market pages are connected without duplicating weak location copy." },
      { title: "Campaign landing pages", desc: "Focused pages can support launches and paid campaigns without disrupting the main site." },
      { title: "Search-ready development", desc: "Performance, headings, metadata and internal links are part of the build process." },
      { title: "Clear stakeholder reviews", desc: "Defined milestones make feedback manageable for founders and established teams." },
    ],
    industries: [
      { name: "Professional services", desc: "Authority-led websites for firms, consultants and specialist practices.", href: "/seo-for-professional-services" },
      { name: "Healthcare", desc: "Accessible service and enquiry content for clinics and providers.", href: "/seo-for-healthcare" },
      { name: "SaaS and technology", desc: "Feature and solution pages for software and technology companies.", href: "/seo-for-saas" },
      { name: "E-commerce", desc: "Product discovery and checkout experiences for online retailers.", href: "/seo-for-ecommerce" },
      { name: "Travel and tourism", desc: "Destination, package and lead-generation journeys.", href: "/seo-for-tourism" },
      { name: "Local businesses", desc: "Useful service pages for companies serving Chandigarh and the Tricity.", href: "/seo-for-local-business" },
    ],
    contentNotes: [
      { heading: "A professional search journey", body: "The title and description earn the click, while useful service detail and proof determine whether a Chandigarh prospect stays." },
      { heading: "Regional SEO architecture", body: "We separate genuinely useful market pages from duplicated location copy and connect them to core services." },
      { heading: "Ready for campaigns", body: "A flexible site can support focused landing pages when a company launches a new offer or targets a new audience." },
    ],
    portfolioLinks: [locationProjectLinks[2], locationProjectLinks[1], locationProjectLinks[0]],
    ctaTitle: "Build a More Credible Chandigarh Website",
    ctaSubtitle: "Let us turn your services, proof and regional reach into a website customers can understand and trust.",
    ctaLabel: "Plan Your Project",
  },
  "web-designing-company-new-zealand": {
    heroText: "Build a clear, accessible website for New Zealand customers who expect useful information, straightforward navigation and a dependable experience on any device.",
    whyNeeds: [
      { title: "National and regional audiences", desc: "Businesses may serve one city, several regions or the whole country, so market scope must be explained accurately." },
      { title: "Tourism discovery", desc: "Travel visitors need inspiring content alongside practical package, location and enquiry information." },
      { title: "Remote trust", desc: "Clear processes, proof and contact expectations matter when customers and delivery teams are geographically distributed." },
      { title: "Accessible performance", desc: "Fast, readable pages support visitors across different devices and connection conditions." },
    ],
    whyChoose: [
      { title: "Remote collaboration by design", desc: "Scheduled reviews and written decisions make time-zone collaboration predictable." },
      { title: "Tourism and enquiry experience", desc: "We balance destination appeal with the practical details needed before a visitor contacts the business." },
      { title: "Market-scope clarity", desc: "Content distinguishes local, regional and nationwide service without making false office claims." },
      { title: "Accessible responsive delivery", desc: "Content hierarchy, contrast and mobile usability remain part of design decisions." },
      { title: "Search foundations", desc: "Useful market pages, technical structure and relevant internal links support long-term visibility." },
    ],
    industries: [
      { name: "Travel and tourism", desc: "Destination, activity and tour websites designed around discovery and enquiries.", href: "/seo-for-tourism" },
      { name: "SaaS and technology", desc: "Product and educational journeys for software companies.", href: "/seo-for-saas" },
      { name: "Professional services", desc: "Credibility-led sites for firms serving regional or national clients.", href: "/seo-for-professional-services" },
      { name: "E-commerce", desc: "Online shopping experiences for New Zealand product brands.", href: "/seo-for-ecommerce" },
      { name: "Healthcare", desc: "Clear service and contact content for providers.", href: "/seo-for-healthcare" },
      { name: "Local businesses", desc: "Search-ready websites for businesses serving defined communities.", href: "/seo-for-local-business" },
    ],
    contentNotes: [
      { heading: "Local, regional or nationwide", body: "A useful New Zealand site makes its true service footprint clear rather than implying offices in every city." },
      { heading: "Tourism search intent", body: "Destination inspiration should connect naturally to package information, availability questions and enquiry actions." },
      { heading: "Remote delivery with clear ownership", body: "Time-zone differences are handled through planned meetings, written feedback and defined approval stages." },
    ],
    portfolioLinks: [locationProjectLinks[1], locationProjectLinks[2], locationProjectLinks[0]],
    ctaTitle: "Plan a Website for Your New Zealand Market",
    ctaSubtitle: "Share your audience, regions and customer journey so we can recommend a practical website and search structure.",
    ctaLabel: "Discuss Your Market",
  },
  "web-designing-company-united-states": {
    heroText: "Create a focused website for US buyers who compare options quickly, expect specific proof and need a clear reason to choose your business.",
    whyNeeds: [
      { title: "Competitive category pages", desc: "Broad markets require precise positioning rather than generic claims that could belong to any competitor." },
      { title: "Multi-state scope", desc: "Service coverage and location strategy must reflect where the business genuinely operates." },
      { title: "Proof-led decisions", desc: "Case studies, process and useful service details help buyers evaluate risk before contacting sales." },
      { title: "Conversion clarity", desc: "Each key page needs one obvious next step for a visitor at that stage of research." },
    ],
    whyChoose: [
      { title: "Specific positioning", desc: "We structure messages around audience problems and buying intent rather than broad agency language." },
      { title: "Scalable market architecture", desc: "Service and regional pages are planned around genuine coverage and content value." },
      { title: "Proof in context", desc: "Relevant work and process details sit close to the decisions they support." },
      { title: "Conversion-focused development", desc: "Forms, calls and landing pages are designed around measurable customer actions." },
      { title: "Asynchronous project delivery", desc: "Written updates and staged reviews keep work moving across time zones." },
    ],
    industries: [
      { name: "SaaS and technology", desc: "Product, feature and comparison pages for software buying journeys.", href: "/seo-for-saas" },
      { name: "E-commerce", desc: "Scalable product discovery and shopping experiences.", href: "/seo-for-ecommerce" },
      { name: "Professional services", desc: "Authority-focused websites for specialist and B2B firms.", href: "/seo-for-professional-services" },
      { name: "Healthcare", desc: "Accessible service information for healthcare organisations.", href: "/seo-for-healthcare" },
      { name: "Travel and tourism", desc: "Destination and package experiences that support enquiries.", href: "/seo-for-tourism" },
      { name: "Local businesses", desc: "Service-area content for businesses with a genuine local footprint.", href: "/seo-for-local-business" },
    ],
    contentNotes: [
      { heading: "Competing on specificity", body: "US buyers often have many alternatives, so pages need a clear audience, offer and reason to act." },
      { heading: "SEO across real service areas", body: "Regional pages should reflect genuine coverage and distinct customer needs, not a list of interchangeable city pages." },
      { heading: "Evidence near the decision", body: "Relevant work, process and FAQs reduce uncertainty before a demo, call or purchase." },
    ],
    portfolioLinks: [locationProjectLinks[1], locationProjectLinks[0], locationProjectLinks[2]],
    ctaTitle: "Build a More Focused Website for US Buyers",
    ctaSubtitle: "We will map your offer, market coverage and conversion path before recommending pages or technology.",
    ctaLabel: "Plan Your US Website",
  },
  "web-designing-company-united-kingdom": {
    heroText: "Build a credible website for UK customers who value precise service information, transparent expectations and a straightforward path to enquiry.",
    whyNeeds: [
      { title: "Clear service scope", desc: "Visitors need to know what is included, who the service suits and where the business operates." },
      { title: "Regional relevance", desc: "UK-wide and regional providers need different content structures and should not imply locations they do not have." },
      { title: "Professional trust", desc: "Useful detail, proof and transparent contact expectations strengthen credibility." },
      { title: "Legacy website migration", desc: "Established businesses often need redesigns that preserve valuable pages and links." },
    ],
    whyChoose: [
      { title: "Plain-English structure", desc: "We organise specialist services so buyers can understand scope without unnecessary jargon." },
      { title: "Honest market positioning", desc: "Regional and nationwide reach is represented without manufactured office locations." },
      { title: "Migration-aware redesign", desc: "Useful URLs, content and internal links are reviewed before a new site goes live." },
      { title: "Professional lead journeys", desc: "Service pages answer key questions before directing visitors to an enquiry." },
      { title: "Time-zone overlap", desc: "Planned reviews and written updates provide practical collaboration with UK teams." },
    ],
    industries: [
      { name: "Professional services", desc: "Clear authority and lead journeys for firms and consultants.", href: "/seo-for-professional-services" },
      { name: "SaaS and technology", desc: "Product and comparison content for software buyers.", href: "/seo-for-saas" },
      { name: "E-commerce", desc: "Product-led shopping experiences for online brands.", href: "/seo-for-ecommerce" },
      { name: "Healthcare", desc: "Accessible service information for providers.", href: "/seo-for-healthcare" },
      { name: "Travel and tourism", desc: "Destination and booking-enquiry journeys.", href: "/seo-for-tourism" },
      { name: "Local businesses", desc: "Search-focused sites for businesses serving genuine local areas.", href: "/seo-for-local-business" },
    ],
    contentNotes: [
      { heading: "Regional versus UK-wide intent", body: "The site architecture should reflect whether customers choose locally, regionally or nationally." },
      { heading: "Protecting established visibility", body: "A redesign starts with useful URLs, content and links so valuable search equity is not discarded casually." },
      { heading: "Clarity before enquiry", body: "Transparent service scope and helpful FAQs improve the quality of conversations that follow." },
    ],
    portfolioLinks: [locationProjectLinks[0], locationProjectLinks[1], locationProjectLinks[2]],
    ctaTitle: "Plan a Clearer Website for Your UK Audience",
    ctaSubtitle: "Tell us where you operate and how customers choose you, and we will map a credible digital journey.",
    ctaLabel: "Discuss Your UK Website",
  },
  "web-designing-company-uae": {
    heroText: "Create a polished, multilingual-ready digital foundation for UAE customers and international buyers who expect speed, clarity and premium presentation.",
    whyNeeds: [
      { title: "Diverse audiences", desc: "Businesses may serve residents, international buyers and partners with different expectations and levels of familiarity." },
      { title: "Premium presentation", desc: "Strong visual standards still need clear service details and practical conversion paths." },
      { title: "Mobile and messaging journeys", desc: "Visitors often expect fast mobile contact through forms, calls or messaging channels." },
      { title: "Multi-market growth", desc: "The website may need to support UAE demand while remaining credible to customers in other countries." },
    ],
    whyChoose: [
      { title: "International audience planning", desc: "We structure information for buyers with different contexts rather than assuming one uniform journey." },
      { title: "Premium without friction", desc: "Visual quality supports the offer while navigation and conversion actions remain direct." },
      { title: "Mobile contact focus", desc: "Calls, forms and messaging routes are considered for visitors who want a quick response." },
      { title: "Scalable market content", desc: "Service and country content can grow without duplicating the same page repeatedly." },
      { title: "Remote delivery", desc: "Structured approvals and written handovers support UAE teams across time zones." },
    ],
    industries: [
      { name: "E-commerce", desc: "Premium product presentation and reliable shopping journeys.", href: "/seo-for-ecommerce" },
      { name: "Professional services", desc: "Authority-led websites for consultants and specialist firms.", href: "/seo-for-professional-services" },
      { name: "SaaS and technology", desc: "Product and solution pages for regional and international buyers.", href: "/seo-for-saas" },
      { name: "Travel and tourism", desc: "Experience, destination and enquiry journeys for travel brands.", href: "/seo-for-tourism" },
      { name: "Healthcare", desc: "Clear, accessible information for providers serving diverse audiences.", href: "/seo-for-healthcare" },
      { name: "Local businesses", desc: "Useful service pages for companies with a genuine UAE footprint.", href: "/seo-for-local-business" },
    ],
    contentNotes: [
      { heading: "Designing for diverse buyers", body: "A UAE website may need to work for local customers, expatriate audiences and international decision-makers at the same time." },
      { heading: "Search across service and market intent", body: "Useful market pages should explain genuine availability and customer needs rather than imply offices or coverage that do not exist." },
      { heading: "Premium presentation with direct action", body: "Strong visual design is paired with clear contact routes so the experience remains commercially useful." },
    ],
    portfolioLinks: [locationProjectLinks[1], locationProjectLinks[0], locationProjectLinks[2]],
    ctaTitle: "Build a Premium Website for Your UAE Audience",
    ctaSubtitle: "Share your customer mix, service area and growth plans so we can shape the right digital foundation.",
    ctaLabel: "Plan Your UAE Website",
  },
};

function additionalLocationFaqs(page: LocationPage): { q: string; a: string }[] {
  const local = page.country === "India";
  return [
    {
      q: `Can Webamazee combine web design and digital marketing for a ${page.location} business?`,
      a: `Yes. We can plan the website, SEO foundations and supporting digital marketing around one commercial strategy for businesses serving ${page.location}.`,
    },
    {
      q: `Do you build e-commerce websites for businesses in ${page.location}?`,
      a: "Yes. Our e-commerce development service covers product structure, responsive storefront design and the core shopping journey.",
    },
    {
      q: `Can you redesign an existing ${page.location} business website?`,
      a: "Yes. We review the current content, user journeys and search visibility before planning a careful, modern redesign.",
    },
    {
      q: `How do projects work when Webamazee is not physically based in ${page.location}?`,
      a: local
        ? "We collaborate through structured calls, shared project updates and clear review stages, so the work does not depend on frequent in-person meetings."
        : `Webamazee serves ${page.location} remotely through scheduled calls, shared project updates and clear review stages. We do not claim a physical office in this market.`,
    },
    {
      q: `Can you help with SEO after a ${page.location} website launches?`,
      a: "Yes. We offer SEO, technical SEO, local SEO where relevant, and AI-assisted content optimization as separate ongoing services.",
    },
    {
      q: `What should a ${page.location} business prepare before starting?`,
      a: "A clear offer, target audience, preferred customer action and any existing brand or website materials give the project a strong starting point.",
    },
  ];
}

function enhancePriorityLocation(page: LocationPage): LocationPage {
  if (!priorityWebDesignSlugs.has(page.slug)) return page;
  const details = priorityLocationDetails[page.slug] ?? {};
  const faqs = [...page.faqs];
  for (const faq of additionalLocationFaqs(page)) {
    if (faqs.length >= 10) break;
    if (!faqs.some((item) => item.q === faq.q)) faqs.push(faq);
  }
  const serving = page.country === "India"
    ? `for growing businesses in ${page.location} and the wider region`
    : `for businesses serving customers across ${page.location}, delivered remotely without claiming a local office`;
  return {
    ...page,
    h1: `Web Design & Digital Marketing Company in ${page.location}`,
    metaTitle: `Web Design & Digital Marketing Company in ${page.location}`,
    metaDescription: `Webamazee provides web design, website development, e-commerce, SEO and digital marketing ${serving}. Plan a practical growth-focused website.`,
    heroText: `Build a clear, fast and conversion-focused website, then support it with practical SEO and digital marketing shaped around the ${page.location} market.`,
    servicesIncluded: completeWebServices,
    relevantServices: completeWebServices.map(({ name, slug }) => ({ name, slug })),
    portfolioLinks: page.location === "New Zealand"
      ? [locationProjectLinks[1], locationProjectLinks[2], locationProjectLinks[0]]
      : page.location === "United Arab Emirates" || page.location === "UAE"
        ? [locationProjectLinks[1], locationProjectLinks[0], locationProjectLinks[2]]
        : locationProjectLinks.slice(0, 3),
    faqs,
    keywords: Array.from(new Set([
      ...page.keywords,
      `digital marketing company in ${page.location}`,
      `web design company in ${page.location}`,
      `web development company in ${page.location}`,
      `SEO company in ${page.location}`,
      `e-commerce development company in ${page.location}`,
      `website development company in ${page.location}`,
    ])),
    ...details,
    locationServices: buildLocationServices(page),
  };
}

function faqCandidatesFor(page: LocationPage): { q: string; a: string }[] {
  const place = page.location;
  const remote = page.country === "India"
    ? "We use clear milestones, shared reviews and scheduled calls, with in-person meetings not required for the project to progress."
    : `We work remotely with ${place} businesses through scheduled calls, written updates and defined review stages.`;

  if (page.service === "seo") {
    return [
      { q: `What does SEO cost for a business targeting ${place}?`, a: "Cost depends on competition, technical condition, content scope and the markets being targeted. We define priorities before proposing an engagement." },
      { q: `How long does an SEO project for ${place} take?`, a: "Technical fixes can be implemented quickly, while search visibility develops over time. The plan depends on the starting point and competitive landscape." },
      { q: `Can you improve local visibility in ${place}?`, a: `Yes, where local search is relevant. We review factual business information, service-area content and the website signals that support ${place} searches.` },
      { q: `Does ${place} SEO include technical work?`, a: "Yes. Crawlability, indexation, performance, canonicals and internal structure can be included when the audit identifies a need." },
      { q: `Can SEO support an e-commerce business serving ${place}?`, a: "Yes. Category structure, product content, technical controls and internal links can be planned around commercial search intent." },
      { q: `How do you collaborate with businesses in ${place}?`, a: remote },
    ];
  }

  if (page.service === "digital-marketing") {
    return [
      { q: `What does a digital marketing plan for ${place} include?`, a: "The mix depends on the audience and goal, and may connect SEO, content, landing pages, measurement and website improvements." },
      { q: `How is the right channel chosen for a ${place} business?`, a: "We start with the customer journey, commercial goal and available evidence rather than recommending every channel by default." },
      { q: `Can you build campaign landing pages for ${place} audiences?`, a: "Yes. Focused landing pages can support a specific service, offer or campaign with clear tracking and conversion actions." },
      { q: `Can digital marketing work with an existing website?`, a: "Yes. We first identify whether the current website can support the campaign or whether specific technical and content improvements are needed." },
      { q: `How will marketing activity be measured?`, a: "Measurement is agreed around meaningful actions such as qualified enquiries, bookings or orders rather than relying only on reach and clicks." },
      { q: `How do you work remotely with ${place} teams?`, a: remote },
    ];
  }

  if (page.service === "ai-marketing") {
    return [
      { q: `How can AI support marketing for a ${place} business?`, a: "AI can assist research, content analysis and workflow efficiency, while people remain responsible for strategy, accuracy and approval." },
      { q: "Does AI replace the marketing team?", a: "No. It supports repetitive and analytical work; human judgement is still required for positioning, quality and business decisions." },
      { q: `Can AI help research search intent in ${place}?`, a: "It can help organise themes and questions, but findings must be checked against real customer needs and reliable search data." },
      { q: "How is AI-generated content reviewed?", a: "Content should be fact-checked, edited for the brand and reviewed for usefulness before publication." },
      { q: "Can AI marketing connect with an existing SEO plan?", a: "Yes. AI-assisted analysis can support research and optimisation without replacing the technical and editorial foundations of SEO." },
      { q: `How do you deliver AI marketing work for ${place} clients?`, a: remote },
    ];
  }

  return [
    { q: `How much does a business website in ${place} cost?`, a: "Cost depends on page scope, content, integrations and e-commerce requirements. We provide a clear proposal after understanding the project." },
    { q: `How long does web design for a ${place} business take?`, a: "Timing depends on scope and content readiness. The schedule is agreed after the required pages, functionality and review stages are clear." },
    { q: `Can you build an online store for customers in ${place}?`, a: "Yes. We can plan product discovery, cart, checkout and store management around the business requirements." },
    { q: `Can an existing ${place} website be redesigned safely?`, a: "Yes. We review useful URLs, content, internal links and search considerations before planning the migration." },
    { q: "Is website maintenance available after launch?", a: "Ongoing support can be scoped around the platform, update frequency and the level of assistance the team needs." },
    { q: `How do you collaborate with a ${place} business remotely?`, a: remote },
  ];
}

function ensureTenLocationFaqs(page: LocationPage): LocationPage {
  const faqs = [...page.faqs];
  for (const faq of faqCandidatesFor(page)) {
    if (faqs.length >= 10) break;
    if (!faqs.some((item) => item.q === faq.q)) faqs.push(faq);
  }
  return { ...page, faqs: faqs.slice(0, 10) };
}

// Combined registry: existing international pages + India-focused pages + commercial
// (Digital Marketing / AI Marketing) pages. Adding here automatically flows the
// slugs into the XML sitemap and the centralized getters.
export const allLocationPages: LocationPage[] = [
  ...locationPages,
  ...indiaLocationPages,
  ...commercialLocationPages,
  ...intlCommercialLocationPages,
].map(enhancePriorityLocation).map(ensureTenLocationFaqs);

export function getLocationPage(slug: string): LocationPage | undefined {
  return allLocationPages.find((p) => p.slug === slug);
}

export function getAllLocationPages(): LocationPage[] {
  return allLocationPages;
}
