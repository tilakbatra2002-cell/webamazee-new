import type { LocationPage, LocationService } from "./locations";
import type { CommercialLocationPage } from "./locations-commercial";

/**
 * International commercial location pages. Two premium page types added for the
 * four priority SEO markets:
 *
 *   Digital Marketing Company in {Country}   slug: digital-marketing-company-{slug}
 *   AI Marketing Company in {Country}        slug: ai-marketing-company-{slug}
 *
 * Countries: New Zealand, USA, UK, UAE.
 *
 * Webamazee is a global digital growth company. These are target SEO landing
 * pages for businesses in a specific market; we help ambitious companies grow
 * online worldwide. No local offices are claimed and no guaranteed rankings are
 * promised.
 *
 * IMPORTANT: All content in this file is written with ZERO dash characters
 * (no hyphen, en dash or em dash). This covers headings, paragraphs, FAQs,
 * metadata, CTA text, schema text and card content.
 */

export type IntlCommercialLocationPage = CommercialLocationPage;

// ---------------------------------------------------------------------------
// Shared, brand-consistent, dash-free blocks
// ---------------------------------------------------------------------------

const internalLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const globalPositioning =
  "Webamazee is a global digital growth company. We work with businesses worldwide and these pages are targeted SEO landing pages for a specific market. We help ambitious companies grow online.";

const commonPortfolio = [
  { label: "Kabir Oil Mill", href: "/work/kabir-oil-mill" },
  { label: "Wellington Tours", href: "/work/wellington-tours" },
  { label: "Shine Gold Tours India", href: "/work/shine-gold-tours-india" },
];

// --- Digital Marketing shared blocks (dash free) ---------------------------

const digitalServices: IntlCommercialLocationPage["commercialServices"] = [
  { name: "SEO Services", slug: "seo-services", desc: "Improve rankings and drive sustainable organic traffic.", benefit: "Long term visibility" },
  { name: "AI SEO", slug: "ai-seo", desc: "Use AI to understand intent and build content that ranks.", benefit: "Content aligned to search" },
  { name: "Technical SEO", slug: "technical-seo", desc: "Fix speed, crawlability and site health for better performance.", benefit: "Stronger foundations" },
  { name: "Local SEO", slug: "local-seo", desc: "Improve visibility for location based searches.", benefit: "Get found locally" },
  { name: "AI Content Optimization", slug: "ai-content-optimization", desc: "Refine content to be genuinely helpful and searchable.", benefit: "Content that earns rankings" },
  { name: "Website Development", slug: "website-development", desc: "Fast, modern builds on a solid technical foundation.", benefit: "A site that converts" },
  { name: "Website Redesign", slug: "website-redesign", desc: "Modernize an outdated site without losing SEO value.", benefit: "Protect rankings while improving" },
  { name: "Landing Page Development", slug: "landing-page-development", desc: "Focused pages that convert ads and campaigns.", benefit: "Higher campaign ROI" },
  { name: "Ecommerce Development", slug: "ecommerce-development", desc: "Online stores built to sell and scale.", benefit: "Built to convert browsers into buyers" },
  { name: "Link Building", slug: "link-building", desc: "Earn quality backlinks that strengthen authority.", benefit: "Build trust and authority" },
  { name: "Competitor Analysis", slug: "competitor-analysis", desc: "Understand what works for competitors and find gaps.", benefit: "Find opportunities others miss" },
  { name: "Google Ranking Growth", slug: "google-ranking-growth", desc: "A data led path to improving your positions.", benefit: "Improve visibility over time" },
];

const digitalProcess = [
  { step: "01", title: "Discovery", desc: "We learn your business, audience and goals to define what success looks like." },
  { step: "02", title: "Market Research", desc: "We study the searches, channels and behaviours that matter to your customers." },
  { step: "03", title: "Competitor Analysis", desc: "We see what works for competitors and where the gaps are." },
  { step: "04", title: "Strategy", desc: "We build a channel plan covering SEO, content, website, paid and AI aligned to your goals." },
  { step: "05", title: "Implementation", desc: "We roll out technical, content and website improvements with clean execution." },
  { step: "06", title: "Measurement", desc: "We connect analytics and report on the metrics that actually matter." },
  { step: "07", title: "Optimization", desc: "We test, learn and iterate to compound results over time." },
];

const digitalWhyChoose = [
  { title: "AI powered advantage", desc: "We combine AI assisted analysis with human strategy for sharper execution." },
  { title: "Conversion focused", desc: "Every tactic aims to turn traffic into enquiries and customers." },
  { title: "Data driven", desc: "Decisions are backed by analytics and real search data." },
  { title: "White hat only", desc: "Ethical, Google safe tactics that protect your business long term." },
  { title: "Global experience", desc: "We help businesses worldwide grow online with modern, scalable marketing." },
  { title: "Transparent", desc: "Clear reporting on rankings, traffic, leads and progress." },
];

const digitalOutcomes = [
  "Better organic search visibility over time",
  "More qualified, relevant traffic and enquiries",
  "A stronger, faster website that converts",
  "Sustainable growth that compounds month after month",
  "Clear reporting on what is working and why",
];

const digitalRelevant = [
  { name: "SEO Services", slug: "seo-services" },
  { name: "AI SEO", slug: "ai-seo" },
  { name: "Technical SEO", slug: "technical-seo" },
  { name: "Local SEO", slug: "local-seo" },
  { name: "AI Content Optimization", slug: "ai-content-optimization" },
  { name: "Website Development", slug: "website-development" },
  { name: "Website Redesign", slug: "website-redesign" },
  { name: "Landing Page Development", slug: "landing-page-development" },
  { name: "Ecommerce Development", slug: "ecommerce-development" },
  { name: "Google Ranking Growth", slug: "google-ranking-growth" },
  { name: "Competitor Analysis", slug: "competitor-analysis" },
  { name: "Link Building", slug: "link-building" },
];

// --- AI Marketing shared blocks (dash free) --------------------------------

const aiServices: IntlCommercialLocationPage["commercialServices"] = [
  { name: "AI SEO", slug: "ai-seo", desc: "Use AI to understand intent and build content that ranks.", benefit: "Content aligned to search intent" },
  { name: "AI Content Optimization", slug: "ai-content-optimization", desc: "Refine existing content to be more helpful and searchable.", benefit: "Content that earns rankings" },
  { name: "AI Assisted Keyword Research", slug: "ai-seo", desc: "Surface the terms your customers actually search for.", benefit: "Sharper targeting" },
  { name: "Competitor Intelligence", slug: "competitor-analysis", desc: "Use AI to analyse competitors and find gaps you can win.", benefit: "Uncover real opportunities" },
  { name: "AI Content Workflows", slug: "ai-content-optimization", desc: "Scale research and drafting with human review at every step.", benefit: "Faster, consistent output" },
  { name: "Marketing Automation", slug: "seo-services", desc: "Streamline repetitive tasks so your team can focus on strategy.", benefit: "More output from the same time" },
  { name: "AI Assisted Personalization", slug: "ai-content-optimization", desc: "Tailor messaging and content to audience segments.", benefit: "More relevant experiences" },
  { name: "Performance and Data Insights", slug: "google-ranking-growth", desc: "Use AI to interpret analytics and find actionable signals.", benefit: "Better, faster decisions" },
];

const aiProcess = [
  { step: "01", title: "Discovery", desc: "We learn your business, audience and goals before applying any AI tools." },
  { step: "02", title: "Data and Research", desc: "We gather search, competitor and customer data to ground the work in reality." },
  { step: "03", title: "AI Assisted Analysis", desc: "We use AI to process and interpret research faster and surface patterns." },
  { step: "04", title: "Strategy", desc: "Human strategists translate those signals into a clear plan." },
  { step: "05", title: "Implementation", desc: "We execute content, SEO and website work with AI support where it helps." },
  { step: "06", title: "Human Review", desc: "Every AI output is reviewed, edited and quality checked by experts." },
  { step: "07", title: "Measurement", desc: "We track what matters and report transparently." },
  { step: "08", title: "Optimization", desc: "We iterate to compound sustainable, human overseen growth." },
];

const aiWhyChoose = [
  { title: "Human led strategy", desc: "AI supports the work; experienced strategists make the calls." },
  { title: "AI assisted efficiency", desc: "We use AI to speed up research, content and analysis." },
  { title: "Quality control", desc: "Every AI output is reviewed and refined by experts before it ships." },
  { title: "Results oriented", desc: "Focused on sustainable growth, not on AI hype." },
  { title: "Transparent", desc: "You always know what is being done and why." },
  { title: "Global experience", desc: "We help businesses worldwide with AI powered, human led growth." },
];

const aiOutcomes = [
  "Faster research and content workflows",
  "Content better aligned to search intent",
  "Sharper competitive insight and targeting",
  "More time for strategy and high impact execution",
  "Sustainable, human overseen growth over time",
];

const aiRelevant = [
  { name: "AI SEO", slug: "ai-seo" },
  { name: "AI Content Optimization", slug: "ai-content-optimization" },
  { name: "SEO Services", slug: "seo-services" },
  { name: "Google Ranking Growth", slug: "google-ranking-growth" },
  { name: "Technical SEO", slug: "technical-seo" },
  { name: "Competitor Analysis", slug: "competitor-analysis" },
  { name: "Website Development", slug: "website-development" },
  { name: "Website Redesign", slug: "website-redesign" },
];

// ---------------------------------------------------------------------------
// Builders
// ---------------------------------------------------------------------------

type Country = {
  /** Slug used for the new digital/ai marketing page URLs (fixed by requirements). */
  slug: string;
  name: string;
  /** Slug suffix of the EXISTING Web Designing / SEO location pages. */
  serviceSlug: string;
};

const countries: Country[] = [
  { slug: "new-zealand", name: "New Zealand", serviceSlug: "new-zealand" },
  { slug: "usa", name: "USA", serviceSlug: "united-states" },
  { slug: "uk", name: "UK", serviceSlug: "united-kingdom" },
  { slug: "uae", name: "UAE", serviceSlug: "uae" },
];

function otherCountrySlugs(current: Country): string[] {
  return countries.filter((c) => c.slug !== current.slug).map((c) => c.slug);
}

function buildDigital(
  country: Country,
  o: {
    metaDescription: string;
    heroSubtitle: string;
    heroHighlight: string;
    intro: string[];
    whatDigital: { heading: string; body: string[] };
    whyNeeds: { title: string; desc: string }[];
    strategies: IntlCommercialLocationPage["strategies"];
    faqs: { q: string; a: string }[];
    contentNotes: { heading: string; body: string }[];
    clusterTitle: string;
  }
): IntlCommercialLocationPage {
  const title = `Digital Marketing Company in ${country.name}`;
  return {
    slug: `digital-marketing-company-${country.slug}`,
    location: country.name,
    country: country.name,
    service: "digital-marketing" as LocationService,
    commercialType: "digital-marketing",
    primaryKeyword: `digital marketing company in ${country.name}`,
    metaTitle: title,
    metaDescription: o.metaDescription,
    h1: `${title} ${o.heroHighlight}`,
    eyebrow: `WEBAMAZEE · DIGITAL MARKETING · ${country.name.toUpperCase()}`,
    heroText: o.heroSubtitle,
    heroTitle: title,
    heroHighlight: o.heroHighlight,
    heroSubtitle: o.heroSubtitle,
    intro: [...o.intro, globalPositioning],
    whatItMeans: o.whatDigital,
    whyNeeds: o.whyNeeds,
    servicesIncluded: digitalServices,
    commercialServices: digitalServices,
    whyChoose: digitalWhyChoose,
    commercialWhyChoose: digitalWhyChoose,
    process: digitalProcess,
    processIntro:
      "Our process is transparent and repeatable, so you always know what is happening and why.",
    relevantServices: digitalRelevant,
    strategies: o.strategies,
    outcomes: digitalOutcomes,
    faqs: o.faqs,
    internalLinks,
    keywords: [
      `digital marketing company in ${country.name}`,
      `digital marketing agency ${country.name}`,
      `digital marketing services ${country.name}`,
      `online marketing ${country.name}`,
      country.name,
      "global digital marketing",
    ],
    contentNotes: o.contentNotes,
    portfolioLinks: commonPortfolio,
    crossLinks: [
      { label: `Web Designing Company in ${country.name}`, href: `/web-designing-company-${country.serviceSlug}` },
      { label: `SEO Services in ${country.name}`, href: `/seo-services-${country.serviceSlug}` },
      { label: `AI Marketing Company in ${country.name}`, href: `/ai-marketing-company-${country.slug}` },
    ],
    locationCluster: otherCountrySlugs(country).map((s) => ({
      label: `Digital Marketing in ${countries.find((c) => c.slug === s)!.name}`,
      href: `/digital-marketing-company-${s}`,
    })),
    crossTitle: "Explore more services for your market",
    clusterTitle: o.clusterTitle,
  };
}

function buildAI(
  country: Country,
  o: {
    metaDescription: string;
    heroSubtitle: string;
    heroHighlight: string;
    intro: string[];
    whatIsAI: { heading: string; body: string[] };
    howAIAids: { heading: string; body: string[] };
    aiSearch: { heading: string; body: string[] };
    strategies: IntlCommercialLocationPage["strategies"];
    faqs: { q: string; a: string }[];
    contentNotes: { heading: string; body: string }[];
    clusterTitle: string;
  }
): IntlCommercialLocationPage {
  const title = `AI Marketing Company in ${country.name}`;
  return {
    slug: `ai-marketing-company-${country.slug}`,
    location: country.name,
    country: country.name,
    service: "ai-marketing" as LocationService,
    commercialType: "ai-marketing",
    primaryKeyword: `AI marketing company in ${country.name}`,
    metaTitle: title,
    metaDescription: o.metaDescription,
    h1: `${title} ${o.heroHighlight}`,
    eyebrow: `WEBAMAZEE · AI MARKETING · ${country.name.toUpperCase()}`,
    heroText: o.heroSubtitle,
    heroTitle: title,
    heroHighlight: o.heroHighlight,
    heroSubtitle: o.heroSubtitle,
    intro: [...o.intro, globalPositioning],
    whatItMeans: o.whatIsAI,
    aiApproach: o.howAIAids,
    aiSearch: o.aiSearch,
    whyNeeds: [
      { title: "Do more with the same time", desc: "AI speeds up research, content and analysis so your team can focus on strategy." },
      { title: "Content that fits search", desc: "Use AI to better match the intent behind how customers search." },
      { title: "Sharper decisions", desc: "AI helps interpret data and surface opportunities faster." },
      { title: "Human oversight", desc: "AI supports the work; experienced people make the final calls." },
    ],
    servicesIncluded: aiServices,
    commercialServices: aiServices,
    whyChoose: aiWhyChoose,
    commercialWhyChoose: aiWhyChoose,
    process: aiProcess,
    processIntro:
      "AI accelerates parts of the process, but strategy and quality control always stay human led.",
    relevantServices: aiRelevant,
    strategies: o.strategies,
    outcomes: aiOutcomes,
    faqs: o.faqs,
    internalLinks,
    keywords: [
      `AI marketing company in ${country.name}`,
      `AI marketing agency ${country.name}`,
      `AI marketing services ${country.name}`,
      "AI SEO",
      "AI content marketing",
      country.name,
      "global AI marketing",
    ],
    contentNotes: o.contentNotes,
    portfolioLinks: commonPortfolio,
    crossLinks: [
      { label: `Web Designing Company in ${country.name}`, href: `/web-designing-company-${country.serviceSlug}` },
      { label: `SEO Services in ${country.name}`, href: `/seo-services-${country.serviceSlug}` },
      { label: `Digital Marketing Company in ${country.name}`, href: `/digital-marketing-company-${country.slug}` },
    ],
    locationCluster: otherCountrySlugs(country).map((s) => ({
      label: `AI Marketing in ${countries.find((c) => c.slug === s)!.name}`,
      href: `/ai-marketing-company-${s}`,
    })),
    crossTitle: "Explore more services for your market",
    clusterTitle: o.clusterTitle,
  };
}

// ---------------------------------------------------------------------------
// NEW ZEALAND
// ---------------------------------------------------------------------------

const nzDigital = buildDigital(countries[0], {
  metaDescription:
    "Looking for a digital marketing company in New Zealand? Webamazee combines SEO, modern websites, content and conversion focused strategy to help businesses across the country grow online.",
  heroSubtitle:
    "A complete digital growth partner for New Zealand businesses. SEO, websites, content and conversion focused strategy in one clear plan.",
    heroHighlight: 'for Sustainable Online Growth',
  intro: [

    "New Zealand businesses operate in a distinct online environment. The population is highly connected, customers research and compare online before choosing, and reputation travels fast. A strong digital presence helps businesses across the country get found and win enquiries.",
    "Webamazee works with businesses in New Zealand and worldwide. We bring together search optimization, modern websites, AI assisted content and conversion focused strategy into one clear, accountable plan.",
  ],
  whatDigital: {
    heading: "What digital marketing means for businesses in New Zealand",
    body: [
      "For businesses across New Zealand, digital marketing is how customers discover, compare and choose you. From local service providers to national brands, the customer journey increasingly starts with a search and a visit to your website.",
      "A well executed digital presence helps you appear in relevant results, present a credible and trustworthy offer, and guide interested customers toward an enquiry. It supports both local visibility and national growth.",
      "The strongest approach combines organic visibility, a modern conversion focused website and content that answers real customer questions, creating growth that compounds over time.",
    ],
  },
  whyNeeds: [
    { title: "Online visibility", desc: "Get found for the searches your customers actually make." },
    { title: "Local and national reach", desc: "Win customers across New Zealand, not just in your immediate area." },
    { title: "Modern websites", desc: "Present a fast, credible and mobile friendly presence." },
    { title: "Lead generation", desc: "Turn online interest into real enquiries and customers." },
  ],
  strategies: [
    { title: "Search visibility", body: "Win the searches that matter for your product or service across New Zealand.", link: { label: "SEO Services", href: "/services/seo-services" } },
    { title: "A modern website that converts", body: "Build a fast, clear site that turns visitors into enquiries.", link: { label: "Website Development", href: "/services/website-development" } },
    { title: "Content that builds trust", body: "Publish helpful content that positions your business as the trusted choice.", link: { label: "AI Content Optimization", href: "/services/ai-content-optimization" } },
    { title: "Local and national reach", body: "Combine local visibility with broader national growth opportunities.", link: { label: "Local SEO", href: "/services/local-seo" } },
    { title: "AI assisted efficiency", body: "Create relevant, consistent content faster using AI with human control.", link: { label: "AI SEO", href: "/services/ai-seo" } },
    { title: "Analytics and measurement", body: "Track enquiries and performance so your marketing is always accountable." },
  ],
  faqs: [
    { q: "What does a digital marketing company do?", a: "It helps businesses get found online, attract the right customers and convert interest into enquiries and sales." },
    { q: "What services are included?", a: "Our digital marketing combines SEO, website development and redesign, landing pages, content, conversion optimization and AI assisted marketing." },
    { q: "How long does digital marketing take to produce results?", a: "Website and conversion improvements can help quickly, while organic search typically compounds over a few months." },
    { q: "Can you work with businesses across New Zealand remotely?", a: "Yes. Webamazee is a global digital growth company and we work with businesses across New Zealand and worldwide." },
    { q: "Do you provide local SEO for New Zealand businesses?", a: "Yes. Local visibility is core to how we help businesses win customers in their region." },
    { q: "Can you redesign an existing website?", a: "Yes, and we protect your SEO value during the migration." },
    { q: "Will I get regular reporting?", a: "Yes. You will see clear reporting on rankings, traffic and conversions." },
    { q: "Do you guarantee rankings?", a: "No ethical agency can guarantee positions. We deliver a transparent, data driven process that builds visibility over time." },
    { q: "What is the cost of digital marketing in New Zealand?", a: "It depends on your goals and scope. We provide a clear, fixed proposal after a free strategy conversation." },
  ],
  contentNotes: [
    { heading: "Built for the New Zealand market", body: "From local service providers to national brands, we help businesses get found and grow online." },
    { heading: "A global partner", body: "We bring worldwide experience to help New Zealand businesses compete and win online." },
  ],
  clusterTitle: "Explore digital marketing in other markets",
});

const nzAI = buildAI(countries[0], {
  metaDescription:
    "Explore AI powered marketing strategies for New Zealand businesses, combining SEO, content optimization, automation and human expertise for sustainable online growth.",
  heroSubtitle:
    "Apply AI to research, content, SEO and analysis, with human strategy and quality control leading the way. Smarter growth for New Zealand businesses.",
    heroHighlight: 'for Smarter Digital Growth',
  intro: [

    "Businesses across New Zealand are discovering that AI can do much more than generate text. Used well, it speeds up research, sharpens content, improves SEO and surfaces opportunities that would take a team days to find manually.",
    "Webamazee helps New Zealand businesses apply AI to marketing in a practical, human led way, so you get the efficiency of AI without losing the judgement that makes marketing work.",
  ],
  whatIsAI: {
    heading: "What is AI marketing?",
    body: [
      "AI marketing means using artificial intelligence to support how you research, plan, create and optimize your marketing, from understanding what customers search for to drafting and refining content and interpreting performance data.",
      "Crucially, AI marketing does not replace human expertise. AI is a powerful assistant that works faster and surfaces patterns, but strategic decisions, tone, brand judgement and quality control stay with experienced people.",
      "For a New Zealand business, the practical benefit is simple. You can maintain a stronger, more consistent online presence without adding a large in house team.",
    ],
  },
  howAIAids: {
    heading: "How AI can help businesses in New Zealand",
    body: [
      "A New Zealand service provider, retailer or national brand can use AI to keep its content fresh and relevant, so it shows up for the searches customers make. AI helps identify the phrases people use when comparing options.",
      "AI also helps with competitor intelligence, understanding what competing businesses are doing online and where there is room to win. And it turns raw analytics into plain language insight, so you understand which pages and campaigns are working.",
      "The result is a marketing operation that feels like a much bigger team, without losing the human judgement your brand depends on.",
    ],
  },
  aiSearch: {
    heading: "AI SEO and search visibility",
    body: [
      "Search engines reward content that genuinely matches what people are looking for. AI helps you understand that intent more precisely and create content that answers it, from product pages to local service pages.",
      "AI is not a shortcut to rankings. Google's algorithms change constantly and no tool can guarantee a position. What AI does is make your SEO more efficient, with better keyword insight, faster content research and clearer technical analysis.",
      "Combined with sound technical SEO, good user experience and strong internal linking, AI assisted content gives your business a realistic, compounding path to better visibility.",
    ],
  },
  strategies: [
    { title: "Content that matches intent", body: "Use AI to map the questions and phrases your customers search, then build content that answers them.", link: { label: "AI Content Optimization", href: "/services/ai-content-optimization" } },
    { title: "AI assisted keyword research", body: "Surface the terms that matter most for your product or service, faster and with more context.", link: { label: "AI SEO", href: "/services/ai-seo" } },
    { title: "Faster content workflows", body: "Draft, refine and repurpose content at speed, with human review before anything publishes." },
    { title: "Competitor insight", body: "Use AI to analyse what competitors are doing online and find gaps you can win.", link: { label: "Competitor Analysis", href: "/services/competitor-analysis" } },
    { title: "Data made simple", body: "Turn analytics into clear, actionable insight so you know what to focus on.", link: { label: "Google Ranking Growth", href: "/services/google-ranking-growth" } },
    { title: "Automation with oversight", body: "Automate repetitive marketing tasks while keeping strategy, tone and quality human led." },
  ],
  faqs: [
    { q: "What is AI marketing?", a: "It is using AI to support research, content, SEO and analysis, with human strategy and quality control leading the way." },
    { q: "How can AI help a small business in New Zealand?", a: "It helps you maintain a stronger online presence faster and more consistently, without a large team." },
    { q: "Is AI marketing the same as digital marketing?", a: "No. AI marketing is a way of doing digital marketing, using AI to make the work faster and smarter while people stay in charge." },
    { q: "Can AI improve SEO?", a: "It can make SEO more efficient with better keyword insight, faster research and clearer analysis. It does not guarantee rankings." },
    { q: "Does AI replace human marketers?", a: "No. AI supports the work while experienced people make the strategic and quality decisions." },
    { q: "How long does an AI marketing strategy take?", a: "We scope the plan after a free consultation and practical improvements are delivered quickly, with growth building over time." },
    { q: "Can AI help with content optimization?", a: "Yes. AI helps refine content to better match search intent and user needs, which supports better performance." },
    { q: "Can Webamazee integrate AI with an existing strategy?", a: "Yes. We apply AI where it adds the most value alongside your current marketing." },
    { q: "Do you guarantee results?", a: "No ethical partner promises guaranteed outcomes. We deliver a transparent, human led and data driven approach." },
  ],
  contentNotes: [
    { heading: "AI for New Zealand businesses", body: "We help businesses across the country apply AI to research, content and analysis, with human strategy leading the way." },
    { heading: "Practical and human led", body: "AI accelerates the work while experienced strategists make the decisions." },
  ],
  clusterTitle: "Explore AI marketing in other markets",
});

// ---------------------------------------------------------------------------
// USA
// ---------------------------------------------------------------------------

const usDigital = buildDigital(countries[1], {
  metaDescription:
    "Looking for a digital marketing company in the USA? Webamazee combines SEO, conversion focused websites, content and scalable marketing systems to help US businesses acquire customers and grow.",
  heroSubtitle:
    "A complete digital growth partner for competitive US markets. SEO, conversion focused websites, content and scalable marketing systems in one clear plan.",
    heroHighlight: 'for Modern Business Growth',
  intro: [

    "The United States is one of the most competitive online markets in the world. Every category is crowded and customers have endless choice, so businesses must be visible, credible and quick to convert. Digital marketing is how ambitious US businesses stand out and win customers at scale.",
    "Webamazee works with businesses targeting the US and worldwide. We combine search optimization, conversion focused websites, AI assisted content and analytics led strategy into a scalable, accountable plan.",
  ],
  whatDigital: {
    heading: "What digital marketing means for businesses in the USA",
    body: [
      "For businesses targeting the United States, digital marketing is how you acquire customers in a crowded landscape. Customers compare options across search, websites and content before deciding, so every touchpoint needs to perform.",
      "A well executed digital presence helps you appear in relevant results, present a polished offer, and turn interest into enquiries and sales. It is a system of acquisition, not a single tactic.",
      "The strongest approach combines organic visibility, a high converting website and analytics led optimization that lets you scale what works and improve what does not.",
    ],
  },
  whyNeeds: [
    { title: "Competitive online markets", desc: "Stand out in categories where customers have endless choice." },
    { title: "Digital customer acquisition", desc: "Attract and convert customers through search and website experience." },
    { title: "Scalable systems", desc: "Build marketing that can grow with your business across the US." },
    { title: "Analytics and optimization", desc: "Use data to improve performance and ROI continuously." },
  ],
  strategies: [
    { title: "Search visibility", body: "Win the searches that drive qualified customers in your US market.", link: { label: "SEO Services", href: "/services/seo-services" } },
    { title: "Conversion focused websites", body: "Build fast, clear sites designed to turn traffic into enquiries and sales.", link: { label: "Website Development", href: "/services/website-development" } },
    { title: "Scalable content", body: "Create content that supports growth across multiple markets and segments.", link: { label: "AI Content Optimization", href: "/services/ai-content-optimization" } },
    { title: "Technical performance", body: "Keep speed and crawlability strong so all channels perform at their best.", link: { label: "Technical SEO", href: "/services/technical-seo" } },
    { title: "AI assisted efficiency", body: "Scale research and content with AI support and human control.", link: { label: "AI SEO", href: "/services/ai-seo" } },
    { title: "Analytics and optimization", body: "Measure performance and iterate to improve results over time." },
  ],
  faqs: [
    { q: "What does a digital marketing company do?", a: "It builds and runs the systems that help businesses get found, attract customers and convert interest into sales." },
    { q: "What services are included?", a: "Our digital marketing combines SEO, website development, redesign, landing pages, content, conversion optimization and AI assisted marketing." },
    { q: "How long does digital marketing take to produce results?", a: "Website and conversion improvements can help quickly, while organic search typically compounds over a few months." },
    { q: "Can you help my business compete in a crowded US market?", a: "Yes. We build scalable systems that help you stand out and win customers in competitive categories." },
    { q: "Can Webamazee work with businesses remotely?", a: "Yes. Webamazee is a global digital growth company working with businesses across the USA and worldwide." },
    { q: "Do you provide analytics and reporting?", a: "Yes. Clear reporting on rankings, traffic and conversions is a core part of our service." },
    { q: "Can you redesign an existing website?", a: "Yes, and we protect your SEO value during the migration." },
    { q: "Do you guarantee rankings?", a: "No ethical agency can guarantee positions. We deliver a transparent, data driven process." },
    { q: "How do you price digital marketing?", a: "Pricing depends on scope and goals. We provide a clear, fixed proposal after a free strategy conversation." },
  ],
  contentNotes: [
    { heading: "Built for competitive US markets", body: "We help businesses target US customers with scalable acquisition systems." },
    { heading: "A global partner", body: "We bring worldwide experience to help you compete and win in the US." },
  ],
  clusterTitle: "Explore digital marketing in other markets",
});

const usAI = buildAI(countries[1], {
  metaDescription:
    "Explore AI assisted marketing strategy for US businesses, combining SEO, content optimization, automation and human expertise to acquire customers at scale.",
  heroSubtitle:
    "Apply AI to research, content, SEO and analysis, with human strategy and quality control leading the way. Scalable, AI assisted growth for US businesses.",
    heroHighlight: 'for AI Assisted Marketing Strategy',
  intro: [

    "For US businesses, the pressure to grow faster and more efficiently is constant. AI gives teams a practical way to accelerate research, scale content, sharpen SEO and interpret data, all while keeping human judgement in control.",
    "Webamazee helps US businesses apply AI to marketing in a human led way, so you get the speed and scale of AI without sacrificing the quality and strategy that win customers.",
  ],
  whatIsAI: {
    heading: "What is AI marketing?",
    body: [
      "AI marketing means using artificial intelligence to support research, planning, content creation and optimization, from understanding search intent to drafting and refining content and interpreting performance data.",
      "It is a powerful assistant, not a replacement for people. AI works faster and surfaces patterns, but strategy, tone, brand judgement and quality control remain with experienced marketers.",
      "For a US business, this means a stronger, more scalable online presence that keeps up with a fast moving, competitive market.",
    ],
  },
  howAIAids: {
    heading: "How AI can help businesses in the USA",
    body: [
      "For US businesses, AI helps maintain a steady flow of relevant content across multiple markets and segments, so you stay visible for the searches customers make. It surfaces the specific terms and questions buyers use.",
      "AI also accelerates competitor intelligence, helping you understand what rivals are doing and where you can win, and turns analytics into plain language insight your team can act on quickly.",
      "The result is a marketing operation that scales like a much larger team, with your brand's judgement fully in control.",
    ],
  },
  aiSearch: {
    heading: "AI SEO and search visibility",
    body: [
      "In competitive US search markets, appearing for the right queries is essential. AI helps you understand intent more precisely and create content that answers it well.",
      "AI is not a shortcut to rankings. It makes SEO more efficient with sharper keyword insight, faster research and clearer technical analysis. Google rewards quality and relevance, not automation alone.",
      "Combined with sound technical SEO, great user experience and strong internal linking, AI assisted content gives US businesses a realistic path to better visibility.",
    ],
  },
  strategies: [
    { title: "Intent led content", body: "Map the questions your US customers ask, then build content that answers them with authority.", link: { label: "AI Content Optimization", href: "/services/ai-content-optimization" } },
    { title: "AI keyword research", body: "Surface high intent terms for your product or service, faster and with more context.", link: { label: "AI SEO", href: "/services/ai-seo" } },
    { title: "Content at scale", body: "Produce the volume of credible content a competitive US market demands, with human review." },
    { title: "Competitive intelligence", body: "Use AI to analyse competitors and find gaps you can win across the market.", link: { label: "Competitor Analysis", href: "/services/competitor-analysis" } },
    { title: "Performance insight", body: "Turn analytics into actionable direction for scaling what works.", link: { label: "Google Ranking Growth", href: "/services/google-ranking-growth" } },
    { title: "Automation with oversight", body: "Automate repetitive tasks while keeping strategy and quality human led." },
  ],
  faqs: [
    { q: "What is AI marketing?", a: "It is using AI to support research, content, SEO and analysis, with human strategy and quality control leading the way." },
    { q: "How can AI help a US business acquire customers?", a: "It helps you scale content and analysis, stay visible in competitive searches and act on data faster." },
    { q: "Is AI marketing the same as digital marketing?", a: "No. AI marketing is a way of doing digital marketing, using AI to make the work faster and smarter while people stay in charge." },
    { q: "Can AI improve SEO?", a: "It makes SEO more efficient with better keyword insight, faster research and clearer analysis. It does not guarantee rankings." },
    { q: "Does AI replace human marketers?", a: "No. AI supports the work while experienced people make strategic and quality decisions." },
    { q: "How long does an AI marketing strategy take?", a: "We scope the plan after a free consultation and deliver practical improvements quickly." },
    { q: "Can AI help with content optimization?", a: "Yes. AI helps refine content to better match search intent and user needs." },
    { q: "Can Webamazee integrate AI with an existing strategy?", a: "Yes. We apply AI where it adds the most value alongside your current marketing." },
    { q: "Do you guarantee results?", a: "No ethical partner promises guaranteed outcomes. We deliver a transparent, human led approach." },
  ],
  contentNotes: [
    { heading: "Built for US scale", body: "We help businesses target US customers with AI assisted, scalable marketing systems." },
    { heading: "Human led and efficient", body: "AI accelerates the work while experienced strategists keep quality and direction human." },
  ],
  clusterTitle: "Explore AI marketing in other markets",
});

// ---------------------------------------------------------------------------
// UK
// ---------------------------------------------------------------------------

const ukDigital = buildDigital(countries[2], {
  metaDescription:
    "Looking for a digital marketing company in the UK? Webamazee combines SEO, a professional digital presence, content and conversion optimization to help UK businesses grow with sustainable organic growth.",
  heroSubtitle:
    "A complete digital growth partner for UK businesses. Professional presence, search visibility, content and conversion optimization in one clear plan.",
    heroHighlight: 'for Results Focused Digital Strategy',
  intro: [

    "Businesses across the United Kingdom operate in a sophisticated online market where trust and professionalism matter. Customers research thoroughly and expect a credible, polished digital presence before they choose.",
    "Webamazee works with businesses in the UK and worldwide. We combine search optimization, a professional website, content and conversion optimization into a strategy built for sustainable organic growth.",
  ],
  whatDigital: {
    heading: "What digital marketing means for businesses in the UK",
    body: [
      "For UK businesses, digital marketing is how you build a professional presence and get found by the customers who matter. Whether you serve a local community or the whole country, the customer journey starts with search and a credible website.",
      "A well executed digital presence helps you appear in relevant results, present a trustworthy offer and convert interest into enquiries. It is the foundation of sustainable growth that does not depend on constant ad spend.",
      "The strongest approach combines organic visibility, a conversion focused website and content that answers real customer questions, creating a reliable pipeline of enquiries over time.",
    ],
  },
  whyNeeds: [
    { title: "Professional digital presence", desc: "Present a polished, credible offer that builds trust and enquiries." },
    { title: "Search visibility", desc: "Get found for the searches your customers make across the UK." },
    { title: "Lead generation", desc: "Turn online interest into a reliable flow of enquiries." },
    { title: "Sustainable growth", desc: "Build organic visibility that compounds over time." },
  ],
  strategies: [
    { title: "Search visibility", body: "Win the searches that matter for your product or service across the UK.", link: { label: "SEO Services", href: "/services/seo-services" } },
    { title: "A professional website", body: "Build a polished, conversion focused site that reflects your business.", link: { label: "Website Development", href: "/services/website-development" } },
    { title: "Conversion optimization", body: "Improve the experience so more visitors become enquiries and customers.", link: { label: "Website Redesign", href: "/services/website-redesign" } },
    { title: "Content that builds trust", body: "Publish helpful content that positions your business as the obvious choice.", link: { label: "AI Content Optimization", href: "/services/ai-content-optimization" } },
    { title: "AI assisted efficiency", body: "Create consistent, relevant content faster with AI support and human control.", link: { label: "AI SEO", href: "/services/ai-seo" } },
    { title: "Clear measurement", body: "Track enquiries and performance so your marketing is always accountable." },
  ],
  faqs: [
    { q: "What does a digital marketing company do?", a: "It helps businesses get found, present a professional presence and convert interest into enquiries and customers." },
    { q: "What services are included?", a: "Our digital marketing combines SEO, website development and redesign, landing pages, content, conversion optimization and AI assisted marketing." },
    { q: "How long does digital marketing take to produce results?", a: "Website and conversion improvements can help quickly, while organic search typically compounds over a few months." },
    { q: "Can you work with businesses across the UK remotely?", a: "Yes. Webamazee is a global digital growth company and we work with businesses across the UK and worldwide." },
    { q: "Do you provide local SEO?", a: "Yes. Local visibility is core to how we help businesses win customers in their area." },
    { q: "Can you improve an existing website?", a: "Yes, and we protect your SEO value during the migration." },
    { q: "Will I get regular reporting?", a: "Yes. You will see clear reporting on rankings, traffic and conversions." },
    { q: "Do you guarantee rankings?", a: "No ethical agency can guarantee positions. We deliver a transparent, data driven process." },
    { q: "What is the cost of digital marketing in the UK?", a: "It depends on your goals and scope. We provide a clear, fixed proposal after a free strategy conversation." },
  ],
  contentNotes: [
    { heading: "Built for the UK market", body: "We help businesses across the UK build a professional presence and grow sustainably online." },
    { heading: "A global partner", body: "We bring worldwide experience to help UK businesses compete and win online." },
  ],
  clusterTitle: "Explore digital marketing in other markets",
});

const ukAI = buildAI(countries[2], {
  metaDescription:
    "Explore AI powered marketing systems for UK businesses, combining SEO, content optimization, automation and human expertise for smarter, sustainable growth.",
  heroSubtitle:
    "Apply AI to research, content, SEO and analysis, with human strategy and quality control leading the way. Smarter marketing systems for UK businesses.",
    heroHighlight: 'for Smarter Marketing Systems',
  intro: [

    "UK businesses are increasingly turning to AI to work smarter. It speeds up research, improves content, sharpens SEO and helps interpret the data behind your marketing, all while keeping human judgement in control.",
    "Webamazee helps UK businesses apply AI to marketing in a human led way, so you build smarter systems that deliver sustainable growth without losing quality or brand voice.",
  ],
  whatIsAI: {
    heading: "What is AI marketing?",
    body: [
      "AI marketing means using artificial intelligence to support research, planning, content creation and optimization, from understanding what customers search for to refining content and interpreting performance data.",
      "It is a powerful assistant, not a replacement for people. AI works faster and surfaces patterns, but strategy, tone, brand judgement and quality control remain with experienced marketers.",
      "For a UK business, this means building marketing systems that are more efficient, more consistent and easier to scale.",
    ],
  },
  howAIAids: {
    heading: "How AI can help businesses in the UK",
    body: [
      "For UK businesses, AI helps maintain a steady flow of professional, relevant content so you stay visible for the searches customers make. It surfaces the exact terms and questions buyers use when making decisions.",
      "AI also supports competitor intelligence, helping you understand what rivals are doing and where you can win, and turns analytics into plain language insight that guides your next move.",
      "The result is a marketing system that runs more efficiently, with your brand's judgement fully in control.",
    ],
  },
  aiSearch: {
    heading: "AI SEO and search visibility",
    body: [
      "For UK businesses, appearing for the right searches is essential to a sustainable organic strategy. AI helps you understand intent more precisely and create content that answers it well.",
      "AI is not a shortcut to rankings. It makes SEO more efficient with sharper keyword insight, faster research and clearer technical analysis. Google rewards quality and relevance, not automation alone.",
      "Combined with sound technical SEO, great user experience and strong internal linking, AI assisted content gives UK businesses a realistic path to better visibility.",
    ],
  },
  strategies: [
    { title: "Intent led content", body: "Map the questions your UK customers ask, then build content that answers them well.", link: { label: "AI Content Optimization", href: "/services/ai-content-optimization" } },
    { title: "AI keyword research", body: "Surface high intent terms for your product or service, faster and with more context.", link: { label: "AI SEO", href: "/services/ai-seo" } },
    { title: "Smarter workflows", body: "Produce professional content consistently, with human review before anything publishes." },
    { title: "Competitive intelligence", body: "Use AI to understand competitors and find gaps in the market.", link: { label: "Competitor Analysis", href: "/services/competitor-analysis" } },
    { title: "Data led decisions", body: "Turn analytics into clear direction for sustainable growth.", link: { label: "Google Ranking Growth", href: "/services/google-ranking-growth" } },
    { title: "Automation with control", body: "Automate repetitive tasks while keeping strategy and quality human led." },
  ],
  faqs: [
    { q: "What is AI marketing?", a: "It is using AI to support research, content, SEO and analysis, with human strategy and quality control leading the way." },
    { q: "How can AI help a UK business grow?", a: "It helps you build smarter marketing systems that are more efficient, consistent and easier to scale." },
    { q: "Is AI marketing the same as digital marketing?", a: "No. AI marketing is a way of doing digital marketing, using AI to make the work faster and smarter while people stay in charge." },
    { q: "Can AI improve SEO?", a: "It makes SEO more efficient with better keyword insight, faster research and clearer analysis. It does not guarantee rankings." },
    { q: "Does AI replace human marketers?", a: "No. AI supports the work while experienced people make strategic and quality decisions." },
    { q: "How long does an AI marketing strategy take?", a: "We scope the plan after a free consultation and deliver practical improvements quickly." },
    { q: "Can AI help with content optimization?", a: "Yes. AI helps refine content to better match search intent and user needs." },
    { q: "Can Webamazee integrate AI with an existing strategy?", a: "Yes. We apply AI where it adds the most value alongside your current marketing." },
    { q: "Do you guarantee results?", a: "No ethical partner promises guaranteed outcomes. We deliver a transparent, human led approach." },
  ],
  contentNotes: [
    { heading: "Built for the UK market", body: "We help UK businesses build smarter, sustainable marketing systems with AI." },
    { heading: "Human led and efficient", body: "AI accelerates the work while experienced strategists keep quality human." },
  ],
  clusterTitle: "Explore AI marketing in other markets",
});

// ---------------------------------------------------------------------------
// UAE
// ---------------------------------------------------------------------------

const uaeDigital = buildDigital(countries[3], {
  metaDescription:
    "Looking for a digital marketing company in the UAE? Webamazee combines SEO, premium websites, content and conversion focused strategy to help businesses win in a competitive digital environment.",
  heroSubtitle:
    "A complete digital growth partner for high performance UAE markets. Premium presence, SEO, content and conversion focused strategy in one clear plan.",
    heroHighlight: 'for High Performance Digital Growth',
  intro: [

    "The United Arab Emirates is a fast moving, highly competitive digital market where premium positioning and performance matter. Businesses here serve a diverse, international audience that expects a polished online presence and a seamless customer experience.",
    "Webamazee works with businesses in the UAE and worldwide. We combine search optimization, premium websites, AI assisted content and conversion focused strategy into a high performance, accountable plan.",
  ],
  whatDigital: {
    heading: "What digital marketing means for businesses in the UAE",
    body: [
      "For businesses in the UAE, digital marketing is how you stand out in a competitive environment and connect with an international audience. Customers expect premium quality and make decisions quickly, often across languages.",
      "A well executed digital presence helps you appear in relevant results, present a polished and trustworthy offer, and convert interest into enquiries and sales. It supports both local visibility and international reach.",
      "The strongest approach combines search visibility, a premium conversion focused website and content that resonates with diverse audiences, creating high performance growth over time.",
    ],
  },
  whyNeeds: [
    { title: "Highly competitive market", desc: "Stand out in a fast moving, premium digital environment." },
    { title: "Premium online presence", desc: "Present a polished brand that matches customer expectations." },
    { title: "International audiences", desc: "Connect with diverse, multilingual customers across the region." },
    { title: "Lead generation", desc: "Convert online interest into high quality enquiries." },
  ],
  strategies: [
    { title: "Search visibility", body: "Win the searches that matter for your product or service in the UAE market.", link: { label: "SEO Services", href: "/services/seo-services" } },
    { title: "A premium website", body: "Build a polished, conversion focused site that reflects your positioning.", link: { label: "Website Development", href: "/services/website-development" } },
    { title: "Conversion focused pages", body: "Turn a great first impression into enquiries with clear, effective landing pages.", link: { label: "Landing Page Development", href: "/services/landing-page-development" } },
    { title: "Content for diverse audiences", body: "Create content that resonates with an international, multilingual customer base.", link: { label: "AI Content Optimization", href: "/services/ai-content-optimization" } },
    { title: "AI assisted efficiency", body: "Scale research and content with AI support and human control.", link: { label: "AI SEO", href: "/services/ai-seo" } },
    { title: "Performance measurement", body: "Track enquiries and conversions so your marketing is accountable." },
  ],
  faqs: [
    { q: "What does a digital marketing company do?", a: "It helps businesses get found, present a premium presence and convert interest into enquiries and sales." },
    { q: "What services are included?", a: "Our digital marketing combines SEO, website development, redesign, landing pages, content, conversion optimization and AI assisted marketing." },
    { q: "How long does digital marketing take to produce results?", a: "Website and conversion improvements can help quickly, while organic search typically compounds over a few months." },
    { q: "Can you help my business compete in the UAE market?", a: "Yes. We build premium, performance focused marketing that helps you stand out in a competitive environment." },
    { q: "Do you support multilingual and international audiences?", a: "We build websites and content strategies that support diverse, international customers where relevant." },
    { q: "Can Webamazee work with businesses remotely?", a: "Yes. Webamazee is a global digital growth company working with businesses in the UAE and worldwide." },
    { q: "Will I get regular reporting?", a: "Yes. Clear reporting on rankings, traffic and conversions is a core part of our service." },
    { q: "Do you guarantee rankings?", a: "No ethical agency can guarantee positions. We deliver a transparent, data driven process." },
    { q: "What is the cost of digital marketing in the UAE?", a: "It depends on your goals and scope. We provide a clear, fixed proposal after a free strategy conversation." },
  ],
  contentNotes: [
    { heading: "Built for high performance markets", body: "We help businesses in the UAE win with premium, performance focused digital marketing." },
    { heading: "A global partner", body: "We bring worldwide experience to help you compete and grow in the UAE." },
  ],
  clusterTitle: "Explore digital marketing in other markets",
});

const uaeAI = buildAI(countries[3], {
  metaDescription:
    "Explore AI assisted digital growth for UAE businesses, combining SEO, content optimization, automation and human expertise for high performance results.",
  heroSubtitle:
    "Apply AI to research, content, SEO and analysis, with human strategy and quality control leading the way. AI assisted growth for UAE businesses.",
    heroHighlight: 'for AI Assisted Digital Growth',
  intro: [

    "In the UAE's fast moving business environment, efficiency and speed are prized. AI gives businesses a practical way to accelerate research, scale premium content, sharpen SEO and interpret data, while keeping human judgement in control.",
    "Webamazee helps UAE businesses apply AI to marketing in a human led way, so you get the efficiency of AI without losing the quality and strategy that win customers.",
  ],
  whatIsAI: {
    heading: "What is AI marketing?",
    body: [
      "AI marketing means using artificial intelligence to support research, planning, content creation and optimization, from understanding what customers search for to refining content and interpreting performance data.",
      "It is a powerful assistant, not a replacement for people. AI works faster and surfaces patterns, but strategy, tone, brand judgement and quality control remain with experienced marketers.",
      "For a UAE business, this means a stronger, more efficient marketing operation that keeps pace with a fast moving, premium market.",
    ],
  },
  howAIAids: {
    heading: "How AI can help businesses in the UAE",
    body: [
      "For UAE businesses, AI helps maintain a steady flow of premium, relevant content so you stay visible for the searches customers make. It surfaces the exact terms and questions that buyers use in a competitive market.",
      "AI also supports competitor intelligence, helping you understand what rivals are doing and where you can win, and turns analytics into plain language insight that guides your decisions quickly.",
      "The result is a marketing operation that works faster and at a higher standard, with your brand's judgement fully in control.",
    ],
  },
  aiSearch: {
    heading: "AI SEO and search visibility",
    body: [
      "In a competitive market like the UAE, appearing for the right searches is essential. AI helps you understand intent more precisely and create content that answers it well.",
      "AI is not a shortcut to rankings. It makes SEO more efficient with sharper keyword insight, faster research and clearer technical analysis. Google rewards quality and relevance, not automation alone.",
      "Combined with sound technical SEO, a premium website and strong user experience, AI assisted content gives UAE businesses a realistic path to better visibility.",
    ],
  },
  strategies: [
    { title: "Premium, intent led content", body: "Create content that reflects premium positioning and answers customer questions well.", link: { label: "AI Content Optimization", href: "/services/ai-content-optimization" } },
    { title: "AI keyword research", body: "Surface high intent terms for your product or service, faster and with more context.", link: { label: "AI SEO", href: "/services/ai-seo" } },
    { title: "Efficient workflows", body: "Produce consistent, high quality content with human review before anything publishes." },
    { title: "Competitive intelligence", body: "Use AI to understand competitors and find gaps in a competitive market.", link: { label: "Competitor Analysis", href: "/services/competitor-analysis" } },
    { title: "Performance insight", body: "Turn analytics into direction for high performance growth.", link: { label: "Google Ranking Growth", href: "/services/google-ranking-growth" } },
    { title: "Automation with control", body: "Automate repetitive tasks while keeping strategy and quality human led." },
  ],
  faqs: [
    { q: "What is AI marketing?", a: "It is using AI to support research, content, SEO and analysis, with human strategy and quality control leading the way." },
    { q: "How can AI help a UAE business?", a: "It helps you work faster and at a higher standard, staying visible in a competitive market without a large team." },
    { q: "Is AI marketing the same as digital marketing?", a: "No. AI marketing is a way of doing digital marketing, using AI to make the work faster and smarter while people stay in charge." },
    { q: "Can AI improve SEO?", a: "It makes SEO more efficient with better keyword insight, faster research and clearer analysis. It does not guarantee rankings." },
    { q: "Does AI replace human marketers?", a: "No. AI supports the work while experienced people make strategic and quality decisions." },
    { q: "How long does an AI marketing strategy take?", a: "We scope the plan after a free consultation and deliver practical improvements quickly." },
    { q: "Can AI help with content optimization?", a: "Yes. AI helps refine content to better match search intent and user needs." },
    { q: "Can Webamazee integrate AI with an existing strategy?", a: "Yes. We apply AI where it adds the most value alongside your current marketing." },
    { q: "Do you guarantee results?", a: "No ethical partner promises guaranteed outcomes. We deliver a transparent, human led approach." },
  ],
  contentNotes: [
    { heading: "Built for high performance markets", body: "We help UAE businesses apply AI for faster, higher quality marketing." },
    { heading: "Human led and efficient", body: "AI accelerates the work while experienced strategists keep quality human." },
  ],
  clusterTitle: "Explore AI marketing in other markets",
});

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

function completeIntlCommercialFaqs(page: IntlCommercialLocationPage): IntlCommercialLocationPage {
  const additions = page.service === "digital-marketing"
    ? [
        { q: `How do you plan digital marketing for customers in ${page.location}?`, a: "We review the audience, buying journey, existing website and commercial goal before selecting channels or campaign pages." },
        { q: `Can Webamazee work with an existing ${page.location} marketing team?`, a: "Yes. Responsibilities, approvals and measurement can be agreed so our work supports the internal team rather than duplicating it." },
      ]
    : [
        { q: `How is AI-assisted content quality controlled for ${page.location}?`, a: "People review accuracy, tone, usefulness and market context before content is approved. AI output is never treated as automatically publishable." },
        { q: `Can AI marketing be added to an existing ${page.location} strategy?`, a: "Yes. We identify specific research, analysis or workflow tasks where AI can assist without replacing the strategy already in place." },
      ];
  return { ...page, faqs: [...page.faqs, ...additions].slice(0, 10) };
}

export const intlCommercialLocationPages: IntlCommercialLocationPage[] = [
  nzDigital,
  nzAI,
  usDigital,
  usAI,
  ukDigital,
  ukAI,
  uaeDigital,
  uaeAI,
].map(completeIntlCommercialFaqs);

export function getIntlCommercialLocationPage(slug: string): IntlCommercialLocationPage | undefined {
  return intlCommercialLocationPages.find((p) => p.slug === slug);
}
