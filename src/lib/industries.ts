/**
 * Industry SEO landing pages.
 *
 * Six industry specific SEO pages that build topical authority and target high
 * intent commercial searches:
 *
 *   /seo-for-ecommerce
 *   /seo-for-saas
 *   /seo-for-local-business
 *   /seo-for-tourism
 *   /seo-for-healthcare
 *   /seo-for-professional-services
 *
 * Webamazee is positioned as a global digital marketing and SEO company. These
 * are industry pages with worldwide relevance, not country specific pages. No
 * local offices, awards, statistics or partnerships are claimed.
 *
 * IMPORTANT: All content in this file uses ZERO dash characters (no hyphen, en
 * dash or em dash). Every heading, paragraph, FAQ, CTA and link label is written
 * with natural wording and comma or colon punctuation instead.
 */

export type IndustryCoreService = { name: string; slug: string; desc: string; benefit: string };

export type Industry = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  keyword: string;
  h1Title: string;
  h1Highlight: string;
  eyebrow: string;
  heroSubtitle: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  intro: string[];
  challenges: { title: string; desc: string }[];
  whyMatters: { heading: string; body: string[] };
  strategy: { title: string; body: string; link?: { label: string; href: string } }[];
  coreServices: IndustryCoreService[];
  growth: { title: string; desc: string }[];
  process: { step: string; title: string; desc: string }[];
  whyChoose: { title: string; desc: string }[];
  relatedServices: { name: string; slug: string }[];
  faqs: { q: string; a: string }[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaLabel: string;
  crossLinks: { label: string; href: string }[];
  keywords: string[];
};

// Shared, brand consistent SEO process (dash free)
const seoProcess = [
  { step: "01", title: "Audit", desc: "We assess your technical, on page and content foundations to find real opportunities." },
  { step: "02", title: "Strategy", desc: "We build a keyword and content plan aligned to your commercial goals." },
  { step: "03", title: "Implement", desc: "We improve technical, on page and content signals across your site." },
  { step: "04", title: "Measure", desc: "We connect reporting and track rankings, traffic and conversions." },
  { step: "05", title: "Optimize", desc: "We iterate on what is working to compound results over time." },
];

const whyChoose = [
  { title: "AI powered analysis", desc: "We combine AI assisted research with human strategy for sharper results." },
  { title: "Data driven", desc: "Every decision is backed by analytics and real search data." },
  { title: "White hat only", desc: "Ethical, Google safe tactics that protect your business long term." },
  { title: "Conversion focused", desc: "We aim every effort at turning search visitors into enquiries and customers." },
  { title: "Transparent", desc: "Clear reporting on rankings, traffic and progress." },
  { title: "Global experience", desc: "We help businesses worldwide grow through strategic SEO." },
];

function service(name: string, slug: string, desc: string, benefit: string): IndustryCoreService {
  return { name, slug, desc, benefit };
}

// ---------------------------------------------------------------------------
// 1. ECOMMERCE
// ---------------------------------------------------------------------------

const industryEntries: Industry[] = [
  {
    slug: "seo-for-ecommerce",
    name: "Ecommerce",
    metaTitle: "SEO for Ecommerce",
    metaDescription:
      "Ecommerce SEO services to grow organic revenue. Product and category page optimization, technical SEO, structured data and content strategy for online stores.",
    keyword: "SEO for ecommerce",
    h1Title: "SEO for Ecommerce Businesses",
    h1Highlight: "That Want More Organic Revenue",
    eyebrow: "SEO FOR ECOMMERCE",
    heroSubtitle:
      "Turn organic search into a reliable revenue channel for your online store with product and category optimization, technical SEO and conversion focused content.",
    heroCtaPrimary: "Get a Free Ecommerce SEO Audit",
    heroCtaSecondary: "Talk to Our Team",
    intro: [
      "For online stores, organic search is one of the most valuable acquisition channels because it brings customers who are already looking for what you sell. When your product and category pages rank well, every click has real commercial intent.",
      "Webamazee helps ecommerce businesses grow organic revenue through a complete approach that combines product page SEO, category page optimization, technical SEO, structured data and content strategy. We work with online stores of all sizes, from growing brands to large catalogs.",
    ],
    challenges: [
      { title: "Large product catalogs", desc: "Thousands of products create indexation and content challenges." },
      { title: "Duplicate content", desc: "Similar product pages and URLs can dilute your authority." },
      { title: "Faceted navigation", desc: "Filters and sorting can generate thousands of low value URLs." },
      { title: "Indexation problems", desc: "Pages you want ranked can be missed or ignored by search engines." },
      { title: "Thin product pages", desc: "Sparse descriptions struggle to earn rankings and conversions." },
      { title: "Competitive keywords", desc: "Commercial product terms are often fiercely contested." },
    ],
    whyMatters: {
      heading: "Why SEO matters for ecommerce",
      body: [
        "Customers rarely scroll past the first page when shopping online. Ranking for the right product and category searches puts your store in front of people ready to buy, which reduces your dependence on paid ads over time.",
        "Ecommerce SEO also improves the quality of your traffic. Search visitors have commercial intent, so they convert at a higher rate than general browsing traffic. A well optimized store builds organic revenue that compounds as your catalog and authority grow.",
        "Technical health is central to ecommerce success. Fast pages, clean indexation and a clear internal linking structure help every product and category reach its full ranking potential.",
      ],
    },
    strategy: [
      { title: "Product page SEO", body: "Optimize titles, descriptions, images and unique content so each product earns its own rankings.", link: { label: "SEO Services", href: "/services/seo-services" } },
      { title: "Category page optimization", body: "Structure category pages around buying intent and help them target broader commercial terms." },
      { title: "Technical SEO", body: "Fix crawlability, speed and indexation so search engines can understand your full catalog.", link: { label: "Technical SEO", href: "/services/technical-seo" } },
      { title: "Internal linking", body: "Build a clean architecture that distributes authority to your most important product pages." },
      { title: "Structured data", body: "Add product schema so rich results can surface price, availability and reviews.", link: { label: "AI SEO", href: "/services/ai-seo" } },
      { title: "Commercial content", body: "Publish buying guides and comparisons that capture high intent search demand.", link: { label: "AI Content Optimization", href: "/services/ai-content-optimization" } },
    ],
    coreServices: [
      service("SEO Services", "seo-services", "Improve rankings and drive sustainable organic traffic to your store.", "Organic revenue growth"),
      service("Technical SEO", "technical-seo", "Fix speed, crawlability and indexation for a large product catalog.", "Clean indexation"),
      service("AI SEO", "ai-seo", "Use AI to understand product intent and build content that ranks.", "Smarter targeting"),
      service("AI Content Optimization", "ai-content-optimization", "Refine product and category content to be helpful and searchable.", "Content that ranks"),
      service("Google Ranking Growth", "google-ranking-growth", "A data led path to improving commercial keyword positions.", "Better visibility"),
      service("Competitor Analysis", "competitor-analysis", "Understand what winning stores do and find gaps to exploit.", "Find opportunities"),
    ],
    growth: [
      { title: "Long tail product terms", desc: "Win less competitive, highly specific searches that convert strongly." },
      { title: "Category authority", desc: "Build category pages that dominate broad commercial keywords." },
      { title: "Buying intent content", desc: "Capture shoppers at the research stage with guides and comparisons." },
      { title: "Fresh and seasonal pages", desc: "Target trends and seasons with timely, optimized content." },
      { title: "Reuse and repurpose", desc: "Turn winning content into variants that reach more searches." },
      { title: "Reduced ad dependence", desc: "Build organic traffic that lowers your reliance on paid channels." },
    ],
    process: seoProcess,
    whyChoose,
    relatedServices: [
      { name: "SEO Services", slug: "seo-services" },
      { name: "Technical SEO", slug: "technical-seo" },
      { name: "AI SEO", slug: "ai-seo" },
      { name: "Google Ranking Growth", slug: "google-ranking-growth" },
      { name: "Competitor Analysis", slug: "competitor-analysis" },
      { name: "AI Content Optimization", slug: "ai-content-optimization" },
      { name: "Link Building", slug: "link-building" },
      { name: "Website Development", slug: "website-development" },
    ],
    faqs: [
      { q: "How does ecommerce SEO increase organic visibility?", a: "It helps your product and category pages rank for the searches customers make, so your store appears where buying intent is highest." },
      { q: "How should ecommerce product pages be optimized?", a: "Each page needs a clear title, a unique and helpful description, quality images, product schema and a strong call to action." },
      { q: "How should ecommerce category pages be structured?", a: "Category pages should target broad buying intent with helpful copy, clear filters and strong internal links to key products." },
      { q: "How does technical SEO affect an ecommerce website?", a: "It fixes speed, crawlability and indexation so search engines can find and rank your entire catalog." },
      { q: "What is the best way to handle duplicate product content?", a: "Use canonical tags, unique product descriptions and avoid publishing near identical variants without a clear hierarchy." },
      { q: "How long does ecommerce SEO take to show results?", a: "Technical and content improvements can help within weeks, while stronger rankings typically build over a few months." },
      { q: "Can SEO work alongside a paid ads strategy?", a: "Yes. Organic and paid channels often support each other, with SEO reducing long term cost per acquisition." },
      { q: "Do you guarantee rankings or revenue?", a: "No ethical partner can guarantee positions or sales. We deliver a transparent, data driven approach that builds visibility over time." },
    ],
    ctaTitle: "Ready to Grow Your Organic Ecommerce Revenue?",
    ctaSubtitle: "Get a free ecommerce SEO audit and a personalised roadmap for your online store.",
    ctaLabel: "Get a Free Ecommerce SEO Audit",
    crossLinks: [
      { label: "SEO for SaaS", href: "/seo-for-saas" },
      { label: "SEO for Local Business", href: "/seo-for-local-business" },
      { label: "SEO for Tourism", href: "/seo-for-tourism" },
    ],
    keywords: ["SEO for ecommerce", "ecommerce SEO", "product page optimization", "category page SEO", "online store SEO", "organic ecommerce traffic"],
  },

  // ---------------------------------------------------------------------------
  // 2. SAAS
  // ---------------------------------------------------------------------------

  {
    slug: "seo-for-saas",
    name: "SaaS",
    metaTitle: "SEO for SaaS Companies",
    metaDescription:
      "SaaS SEO to grow organic leads. Feature pages, comparison pages, content strategy and technical SEO for B2B SaaS and product led growth.",
    keyword: "SEO for SaaS",
    h1Title: "SEO for SaaS Companies",
    h1Highlight: "That Want Sustainable Organic Growth",
    eyebrow: "SEO FOR SAAS",
    heroSubtitle:
      "Attract qualified prospects through every stage of the buying journey with SaaS content strategy, feature and comparison pages, and technical SEO.",
    heroCtaPrimary: "Get a Free SaaS SEO Audit",
    heroCtaSecondary: "Talk to Our Team",
    intro: [
      "SaaS buying cycles are long and involve research across many pages before a prospect ever requests a demo. SEO helps you capture that demand by showing up for every question and comparison a buyer makes along the way.",
      "Webamazee helps SaaS companies grow sustainable organic leads through a strategy built around the SaaS funnel, from awareness content to high intent feature and comparison pages.",
    ],
    challenges: [
      { title: "Long buying cycles", desc: "Prospects research for weeks or months before deciding." },
      { title: "Technical terminology", desc: "Your audience uses specific, technical language you must match." },
      { title: "Competitive keywords", desc: "Category terms are dominated by large, well funded competitors." },
      { title: "Multiple personas", desc: "Different roles evaluate your product with different questions." },
      { title: "Feature based searches", desc: "Buyers search for specific capabilities, not just your brand." },
      { title: "Comparison searches", desc: "Prospects actively compare you against alternatives." },
    ],
    whyMatters: {
      heading: "Why SEO matters for SaaS",
      body: [
        "SaaS products are researched online before purchase, and SEO is how you appear throughout that journey. From a founder searching for a problem to a buyer comparing you against a competitor, each search is a chance to build trust.",
        "The long buying cycle means content must cover many intents. SEO helps you create the feature pages, comparison pages and educational content that guide prospects toward your product.",
        "Organic leads for SaaS are especially valuable because they arrive with context and intent. Sustainable organic growth reduces your reliance on paid acquisition and compounds over time.",
      ],
    },
    strategy: [
      { title: "SaaS content strategy", body: "Map content to the funnel so every stage of the buyer journey is covered.", link: { label: "AI Content Optimization", href: "/services/ai-content-optimization" } },
      { title: "Feature page SEO", body: "Optimize feature pages for the specific capabilities your product offers." },
      { title: "Comparison and alternative pages", body: "Create pages that help prospects compare you fairly against alternatives." },
      { title: "Technical SEO", body: "Keep the site fast, crawlable and well structured for competitive keywords.", link: { label: "Technical SEO", href: "/services/technical-seo" } },
      { title: "Keyword research", body: "Find the commercial and informational terms your buyers actually search.", link: { label: "AI SEO", href: "/services/ai-seo" } },
      { title: "Authority building", body: "Earn backlinks and citations that strengthen your domain authority.", link: { label: "Link Building", href: "/services/link-building" } },
    ],
    coreServices: [
      service("SEO Services", "seo-services", "Improve rankings across the SaaS buying journey.", "Organic lead growth"),
      service("Technical SEO", "technical-seo", "Fix speed, crawlability and structure for competitive keywords.", "Stronger foundation"),
      service("AI SEO", "ai-seo", "Use AI to understand buyer intent and build content that ranks.", "Smarter targeting"),
      service("AI Content Optimization", "ai-content-optimization", "Create and refine funnel content that earns rankings.", "Content that converts"),
      service("Link Building", "link-building", "Earn authority that supports competitive keyword growth.", "Build trust"),
      service("Competitor Analysis", "competitor-analysis", "Understand competing SaaS products and find gaps.", "Find opportunities"),
    ],
    growth: [
      { title: "Funnel aligned content", desc: "Capture demand at awareness, consideration, evaluation and conversion." },
      { title: "Feature based traffic", desc: "Win searches for the specific capabilities buyers want." },
      { title: "Comparison demand", desc: "Own the pages where prospects compare you against rivals." },
      { title: "Use case pages", desc: "Show how your product solves problems for specific audiences." },
      { title: "Solution pages", desc: "Position your product around outcomes and problems." },
      { title: "Programmatic SEO", desc: "Where suitable, scale pages across entities without sacrificing quality." },
    ],
    process: seoProcess,
    whyChoose,
    relatedServices: [
      { name: "SEO Services", slug: "seo-services" },
      { name: "Technical SEO", slug: "technical-seo" },
      { name: "AI SEO", slug: "ai-seo" },
      { name: "AI Content Optimization", slug: "ai-content-optimization" },
      { name: "Google Ranking Growth", slug: "google-ranking-growth" },
      { name: "Link Building", slug: "link-building" },
      { name: "Competitor Analysis", slug: "competitor-analysis" },
      { name: "Website Redesign", slug: "website-redesign" },
    ],
    faqs: [
      { q: "How does SaaS SEO work?", a: "It attracts prospects through content and pages aligned to every stage of the buying journey, from awareness to comparison." },
      { q: "What keywords should SaaS companies target?", a: "A mix of informational terms, feature based searches and high intent commercial terms like alternatives and comparisons." },
      { q: "Should SaaS companies create comparison pages?", a: "Yes. Comparison pages capture buyers actively evaluating you against competitors and can be highly effective." },
      { q: "What role does content play in SaaS SEO?", a: "Content covers the long research journey, building trust and capturing demand your product pages alone cannot reach." },
      { q: "What is programmatic SEO for SaaS?", a: "It is using a template to scale pages across many entities. It is valuable for some SaaS products but not every company needs it." },
      { q: "How long does SaaS SEO take to show results?", a: "Content can attract traffic quickly, while competitive rankings typically build over several months." },
      { q: "Can SEO help with product led growth?", a: "Yes. SEO surfaces your product to the searches that support organic signups and trial requests." },
      { q: "Do you guarantee rankings?", a: "No ethical partner can guarantee positions. We deliver a transparent, data driven process." },
    ],
    ctaTitle: "Ready to Grow Organic Leads for Your SaaS?",
    ctaSubtitle: "Get a free SaaS SEO audit and a personalised roadmap for sustainable organic growth.",
    ctaLabel: "Get a Free SaaS SEO Audit",
    crossLinks: [
      { label: "SEO for Ecommerce", href: "/seo-for-ecommerce" },
      { label: "SEO for Professional Services", href: "/seo-for-professional-services" },
      { label: "SEO for Local Business", href: "/seo-for-local-business" },
    ],
    keywords: ["SEO for SaaS", "SaaS SEO", "B2B SaaS SEO", "SaaS content strategy", "feature page SEO", "comparison page SEO"],
  },

  // ---------------------------------------------------------------------------
  // 3. LOCAL BUSINESS
  // ---------------------------------------------------------------------------

  {
    slug: "seo-for-local-business",
    name: "Local Business",
    metaTitle: "SEO for Local Businesses",
    metaDescription:
      "Local SEO to win nearby customers. Google Business Profile optimization, local landing pages, reviews and local citations for small businesses.",
    keyword: "SEO for local business",
    h1Title: "SEO for Local Businesses",
    h1Highlight: "That Want More Customers",
    eyebrow: "SEO FOR LOCAL BUSINESS",
    heroSubtitle:
      "Win more nearby customers with local SEO, Google Business Profile optimization, reviews and location pages that turn local search into enquiries.",
    heroCtaPrimary: "Get a Free Local SEO Audit",
    heroCtaSecondary: "Talk to Our Team",
    intro: [
      "When people search for a service near them, they usually choose from the businesses that appear. Local SEO helps your business show up for those searches and stand out to customers in your area.",
      "Webamazee helps local businesses win more customers through Google Business Profile optimization, local landing pages, reviews, citations and a solid on page foundation.",
    ],
    challenges: [
      { title: "Fierce local competition", desc: "Nearby businesses compete for the same local searches." },
      { title: "Google Business Profile gaps", desc: "Incomplete profiles lose visibility and trust." },
      { title: "Inconsistent citations", desc: "Mismatched name, address and phone data confuse search engines." },
      { title: "Weak local content", desc: "Generic content does not match local search intent." },
      { title: "Few reviews", desc: "A lack of reviews reduces trust and visibility." },
      { title: "Unoptimized website", desc: "A slow or unclear site fails to convert local traffic." },
    ],
    whyMatters: {
      heading: "Why SEO matters for local businesses",
      body: [
        "Local search visibility, organic search visibility and Google Maps visibility are related but distinct. Local SEO brings all three together so you appear when nearby customers search for your services.",
        "Most local customers act quickly. When they find your business in the map pack or search results with strong reviews and clear information, they are far more likely to call or visit.",
        "Local SEO also builds long term reputation. A consistent profile, good reviews and a well structured website create a trustworthy local presence that wins customers again and again.",
      ],
    },
    strategy: [
      { title: "Google Business Profile", body: "Optimize your profile with accurate details, categories and images.", link: { label: "Local SEO", href: "/services/local-seo" } },
      { title: "Local landing pages", body: "Build location pages that match how customers search in each area." },
      { title: "Reviews and reputation", body: "Encourage genuine reviews and manage your reputation carefully." },
      { title: "Local content", body: "Publish content relevant to your community and local searches." },
      { title: "Local citations", body: "Keep your name, address and phone consistent across directories.", link: { label: "Link Building", href: "/services/link-building" } },
      { title: "On page and technical SEO", body: "Ensure your website is fast, clear and built to convert local visitors.", link: { label: "Technical SEO", href: "/services/technical-seo" } },
    ],
    coreServices: [
      service("Local SEO", "local-seo", "Improve visibility for the location based searches that matter.", "Win nearby customers"),
      service("SEO Services", "seo-services", "Build organic visibility that supports local growth.", "More enquiries"),
      service("Google Ranking Growth", "google-ranking-growth", "A data led path to improving your local positions.", "Better visibility"),
      service("AI Content Optimization", "ai-content-optimization", "Create helpful local content that earns trust and rankings.", "Content that converts"),
      service("Website Development", "website-development", "Build a fast, clear site that turns local traffic into enquiries.", "A site that converts"),
      service("Technical SEO", "technical-seo", "Fix speed and crawlability so local pages perform at their best.", "Stronger foundation"),
    ],
    growth: [
      { title: "Map pack visibility", desc: "Appear when customers search for services near them." },
      { title: "Location page growth", desc: "Win searches for each area you serve with dedicated pages." },
      { title: "Review driven trust", desc: "Build a reputation that improves both rankings and conversion." },
      { title: "Local content", desc: "Capture community and service based searches." },
      { title: "Consistent citations", desc: "Strengthen local relevance with accurate directory data." },
      { title: "Telephone and footfall", desc: "Convert local search directly into calls, messages and visits." },
    ],
    process: seoProcess,
    whyChoose,
    relatedServices: [
      { name: "Local SEO", slug: "local-seo" },
      { name: "SEO Services", slug: "seo-services" },
      { name: "Technical SEO", slug: "technical-seo" },
      { name: "Google Ranking Growth", slug: "google-ranking-growth" },
      { name: "AI Content Optimization", slug: "ai-content-optimization" },
      { name: "Link Building", slug: "link-building" },
      { name: "Website Development", slug: "website-development" },
      { name: "Website Redesign", slug: "website-redesign" },
    ],
    faqs: [
      { q: "How does local SEO help small businesses?", a: "It helps your business appear for searches in your area, so nearby customers can find and choose you." },
      { q: "How does Google Business Profile affect visibility?", a: "A complete, accurate profile strongly influences your presence in local search and on Google Maps." },
      { q: "Do reviews help local SEO?", a: "Yes. Genuine reviews build trust and can improve your visibility and conversion rate." },
      { q: "Should local businesses create location pages?", a: "Yes, if you serve multiple areas. Each location page targets the searches customers make in that area." },
      { q: "What is the difference between local and organic SEO?", a: "Local SEO focuses on location based search and map visibility, while organic SEO targets broader search rankings." },
      { q: "Can you guarantee a Google Maps position?", a: "No ethical partner can guarantee a specific map position. We build a strong, data driven local presence over time." },
      { q: "How long does local SEO take to show results?", a: "Profile and website improvements can help quickly, while rankings typically build over a few months." },
      { q: "Do you work with local businesses remotely?", a: "Yes. Webamazee is a global digital growth company that helps local businesses worldwide." },
    ],
    ctaTitle: "Ready to Win More Local Customers?",
    ctaSubtitle: "Get a free local SEO audit and a personalised plan for your business.",
    ctaLabel: "Get a Free Local SEO Audit",
    crossLinks: [
      { label: "SEO for Ecommerce", href: "/seo-for-ecommerce" },
      { label: "SEO for Tourism", href: "/seo-for-tourism" },
      { label: "SEO for Healthcare", href: "/seo-for-healthcare" },
      { label: "SEO for Professional Services", href: "/seo-for-professional-services" },
    ],
    keywords: ["SEO for local business", "local SEO", "Google Business Profile optimization", "location pages", "local citations", "local search visibility"],
  },

  // ---------------------------------------------------------------------------
  // 4. TOURISM
  // ---------------------------------------------------------------------------

  {
    slug: "seo-for-tourism",
    name: "Tourism",
    metaTitle: "SEO for Tourism Businesses",
    metaDescription:
      "Tourism SEO for direct bookings. Destination content, activity pages, local search and booking focused landing pages for tour operators and travel businesses.",
    keyword: "SEO for tourism",
    h1Title: "SEO for Tourism Businesses",
    h1Highlight: "That Want More Direct Bookings",
    eyebrow: "SEO FOR TOURISM",
    heroSubtitle:
      "Win more direct organic bookings with destination content, activity pages and booking focused SEO for tour operators, activity providers and travel businesses.",
    heroCtaPrimary: "Get a Free Tourism SEO Audit",
    heroCtaSecondary: "Talk to Our Team",
    intro: [
      "Travellers begin almost every journey with a search, from dreaming about a destination to comparing tours and booking an experience. SEO helps your tourism business appear at every stage and win direct bookings.",
      "Webamazee helps tour operators, activity providers and destination businesses grow direct organic visibility and reduce heavy dependence on third party booking platforms.",
    ],
    challenges: [
      { title: "Powerful booking platforms", desc: "Large platforms dominate many travel searches." },
      { title: "Seasonal demand", desc: "Search volume rises and falls with seasons and events." },
      { title: "Long research journeys", desc: "Travellers research across many pages before booking." },
      { title: "Visual content needs", desc: "Travel content demands strong, fast loading imagery." },
      { title: "Local and destination intent", desc: "Searches mix places, activities and experiences." },
      { title: "Commission pressure", desc: "Heavy reliance on platforms erodes margins." },
    ],
    whyMatters: {
      heading: "Why SEO matters for tourism",
      body: [
        "Tourism search intent spans information, destinations, activities, commercial choices and booking. SEO helps you capture travellers at each stage, from a vague interest in a place to a specific search for a tour or experience.",
        "Direct bookings are more profitable than platform bookings. By building organic visibility you can win travellers directly and keep more of every sale, while still using platforms where they make sense.",
        "Seasonal SEO helps you prepare content ahead of demand, so you are ready to capture searches when travellers start planning.",
      ],
    },
    strategy: [
      { title: "Destination content", body: "Build pages that answer what travellers want to know about a place.", link: { label: "AI Content Optimization", href: "/services/ai-content-optimization" } },
      { title: "Activity and experience pages", body: "Optimize pages for specific tours, activities and experiences." },
      { title: "Booking focused landing pages", body: "Create clear, high converting pages designed for direct enquiries." },
      { title: "Local and destination SEO", body: "Combine local relevance with destination based search visibility.", link: { label: "Local SEO", href: "/services/local-seo" } },
      { title: "Seasonal SEO", body: "Plan content around peak planning and booking seasons." },
      { title: "Image and technical SEO", body: "Optimize imagery and site speed for a visual, mobile first audience.", link: { label: "Technical SEO", href: "/services/technical-seo" } },
    ],
    coreServices: [
      service("SEO Services", "seo-services", "Build organic visibility for your tours and experiences.", "Direct bookings"),
      service("Local SEO", "local-seo", "Win location and destination based searches.", "Local and travel visibility"),
      service("AI Content Optimization", "ai-content-optimization", "Create destination and activity content that ranks.", "Content that converts"),
      service("Technical SEO", "technical-seo", "Fix speed and crawlability for a visual, mobile first site.", "Fast, healthy site"),
      service("Website Development", "website-development", "Build a booking ready website that converts travellers.", "A site that sells"),
      service("Google Ranking Growth", "google-ranking-growth", "A data led path to improving your travel positions.", "Better visibility"),
    ],
    growth: [
      { title: "Direct organic visibility", desc: "Reduce dependence on third party booking platforms." },
      { title: "Things to do searches", desc: "Win travellers searching for activities and experiences." },
      { title: "Destination authority", desc: "Become a trusted source for your destination." },
      { title: "Seasonal readiness", desc: "Capture demand at the right time with planned content." },
      { title: "Experience pages", desc: "Rank for the specific experiences travellers seek." },
      { title: "Better margins", desc: "Keep more revenue through direct bookings." },
    ],
    process: seoProcess,
    whyChoose,
    relatedServices: [
      { name: "SEO Services", slug: "seo-services" },
      { name: "Local SEO", slug: "local-seo" },
      { name: "AI Content Optimization", slug: "ai-content-optimization" },
      { name: "Technical SEO", slug: "technical-seo" },
      { name: "Google Ranking Growth", slug: "google-ranking-growth" },
      { name: "Website Development", slug: "website-development" },
      { name: "AI SEO", slug: "ai-seo" },
      { name: "Link Building", slug: "link-building" },
    ],
    faqs: [
      { q: "How can tourism businesses increase organic bookings?", a: "By ranking for destination, activity and experience searches and converting that traffic with clear booking pages." },
      { q: "What keywords should tour operators target?", a: "A mix of destination terms, activity searches, things to do queries and specific tour or experience keywords." },
      { q: "How can tourism businesses compete with large booking platforms?", a: "By building strong destination and experience pages, local relevance and direct relationships with travellers." },
      { q: "Does seasonal content help tourism SEO?", a: "Yes. Planned seasonal content helps you capture demand before and during peak planning periods." },
      { q: "What is the difference between a tour and an activity page?", a: "A tour page targets specific tours and itineraries, while activity pages target experiences and things to do." },
      { q: "How important is local SEO for tourism?", a: "Very. Location and destination intent is central to how travellers search and choose." },
      { q: "How long does tourism SEO take?", a: "Content can capture demand quickly, while destination authority builds over a few months." },
      { q: "Do you guarantee booking numbers?", a: "No ethical partner can guarantee bookings. We deliver a transparent, data driven approach to visibility." },
    ],
    ctaTitle: "Ready to Win More Direct Bookings?",
    ctaSubtitle: "Get a free tourism SEO audit and a personalised roadmap for your travel business.",
    ctaLabel: "Get a Free Tourism SEO Audit",
    crossLinks: [
      { label: "SEO for Local Business", href: "/seo-for-local-business" },
      { label: "SEO for Ecommerce", href: "/seo-for-ecommerce" },
      { label: "SEO for Healthcare", href: "/seo-for-healthcare" },
    ],
    keywords: ["SEO for tourism", "tourism SEO", "tour operator SEO", "destination SEO", "activity keywords", "organic bookings"],
  },

  // ---------------------------------------------------------------------------
  // 5. HEALTHCARE
  // ---------------------------------------------------------------------------

  {
    slug: "seo-for-healthcare",
    name: "Healthcare",
    metaTitle: "SEO for Healthcare",
    metaDescription:
      "Healthcare SEO to improve search visibility. Service pages, location pages, local SEO and trustworthy website content for clinics and healthcare providers.",
    keyword: "SEO for healthcare",
    h1Title: "SEO for Healthcare Businesses",
    h1Highlight: "That Want Better Search Visibility",
    eyebrow: "SEO FOR HEALTHCARE",
    heroSubtitle:
      "Improve your search visibility with trustworthy healthcare SEO, service pages, local optimization and website content that patients can rely on.",
    heroCtaPrimary: "Get a Free Healthcare SEO Audit",
    heroCtaSecondary: "Talk to Our Team",
    intro: [
      "Patients search for health information and providers online, and they look for websites they can trust. Healthcare SEO helps you appear in those searches with accurate, reassuring and well structured content.",
      "Webamazee helps clinics and healthcare providers improve search visibility through service page optimization, local SEO and trustworthy website content. We never provide medical advice or make claims about outcomes.",
    ],
    challenges: [
      { title: "Trust and accuracy", desc: "Patients need accurate, reliable information." },
      { title: "Sensitive topics", desc: "Healthcare content must be handled with care and responsibility." },
      { title: "Local search intent", desc: "Most patients look for providers near them." },
      { title: "Service specific searches", desc: "Patients search for specific treatments and services." },
      { title: "Website usability", desc: "Clear navigation and fast pages matter for anxious users." },
      { title: "Reputation", desc: "Trust and credibility strongly influence patient choice." },
    ],
    whyMatters: {
      heading: "Why SEO matters for healthcare",
      body: [
        "Patients increasingly choose providers online. Appearing in search results with clear, trustworthy information helps your practice get found and reassures people before they contact you.",
        "Healthcare SEO focuses on digital visibility and content quality. Local search is especially important because most patients look for care close to home.",
        "Content should be accurate and clearly presented. Where necessary, healthcare content should be reviewed by appropriately qualified professionals to ensure it is correct and responsible.",
      ],
    },
    strategy: [
      { title: "Service page optimization", body: "Optimize pages for the specific services and treatments you offer.", link: { label: "SEO Services", href: "/services/seo-services" } },
      { title: "Location pages", body: "Help patients find each of your locations with dedicated pages.", link: { label: "Local SEO", href: "/services/local-seo" } },
      { title: "Local SEO", body: "Improve visibility for local and provider searches.", link: { label: "Local SEO", href: "/services/local-seo" } },
      { title: "Trustworthy content", body: "Create clear, accurate content that answers patient questions.", link: { label: "AI Content Optimization", href: "/services/ai-content-optimization" } },
      { title: "Technical SEO", body: "Ensure your website is fast, accessible and easy to navigate.", link: { label: "Technical SEO", href: "/services/technical-seo" } },
      { title: "Structured data", body: "Use appropriate schema to present clear, structured information." },
    ],
    coreServices: [
      service("SEO Services", "seo-services", "Improve organic visibility for your healthcare website.", "More patient enquiries"),
      service("Local SEO", "local-seo", "Win local and provider based searches near your practice.", "Findable locally"),
      service("AI Content Optimization", "ai-content-optimization", "Create accurate, trustworthy content that answers patients.", "Content that builds trust"),
      service("Technical SEO", "technical-seo", "Fix speed, accessibility and crawlability for a better website.", "Fast, healthy site"),
      service("Google Ranking Growth", "google-ranking-growth", "A data led path to improving your search positions.", "Better visibility"),
      service("Website Development", "website-development", "Build a clear, reassuring website for your patients.", "A trustworthy presence"),
    ],
    growth: [
      { title: "Service visibility", desc: "Win searches for the specific care you provide." },
      { title: "Local patient reach", desc: "Attract patients searching for providers near them." },
      { title: "Trust and credibility", desc: "Build authority through accurate, well structured content." },
      { title: "Location growth", desc: "Support every location with dedicated, optimized pages." },
      { title: "Better usability", desc: "Help patients find what they need quickly and easily." },
      { title: "Qualified enquiries", desc: "Convert informed, high intent visitors into enquiries." },
    ],
    process: seoProcess,
    whyChoose,
    relatedServices: [
      { name: "SEO Services", slug: "seo-services" },
      { name: "Local SEO", slug: "local-seo" },
      { name: "Technical SEO", slug: "technical-seo" },
      { name: "AI Content Optimization", slug: "ai-content-optimization" },
      { name: "Google Ranking Growth", slug: "google-ranking-growth" },
      { name: "AI SEO", slug: "ai-seo" },
      { name: "Website Development", slug: "website-development" },
      { name: "Website Redesign", slug: "website-redesign" },
    ],
    faqs: [
      { q: "How does SEO help healthcare websites?", a: "It improves your visibility for the searches patients make, so more people can find and contact your practice." },
      { q: "What makes healthcare SEO different?", a: "It prioritises trust, accuracy and responsible content handling alongside visibility and local search." },
      { q: "How important is local SEO for healthcare businesses?", a: "Very important, because most patients look for providers close to home." },
      { q: "How should healthcare content demonstrate trust?", a: "By being accurate, clear, up to date and, where necessary, reviewed by appropriately qualified professionals." },
      { q: "Can you provide medical advice?", a: "No. Webamazee provides SEO and digital visibility services only and never offers medical advice or makes claims about outcomes." },
      { q: "Do you help with service and location pages?", a: "Yes. Service and location pages are central to how we improve healthcare search visibility." },
      { q: "How long does healthcare SEO take?", a: "Website and content improvements can help quickly, while rankings typically build over a few months." },
      { q: "Do you guarantee patient outcomes?", a: "No. We focus on digital visibility and never promise specific patient outcomes." },
    ],
    ctaTitle: "Ready to Improve Your Healthcare Search Visibility?",
    ctaSubtitle: "Get a free healthcare SEO audit and a personalised plan for your practice.",
    ctaLabel: "Get a Free Healthcare SEO Audit",
    crossLinks: [
      { label: "SEO for Local Business", href: "/seo-for-local-business" },
      { label: "SEO for Professional Services", href: "/seo-for-professional-services" },
      { label: "SEO for Tourism", href: "/seo-for-tourism" },
    ],
    keywords: ["SEO for healthcare", "healthcare SEO", "healthcare website SEO", "service page optimization", "healthcare local SEO", "trustworthy website content"],
  },

  // ---------------------------------------------------------------------------
  // 6. PROFESSIONAL SERVICES
  // ---------------------------------------------------------------------------

  {
    slug: "seo-for-professional-services",
    name: "Professional Services",
    metaTitle: "SEO for Professional Services",
    metaDescription:
      "Professional services SEO to win qualified leads. Service pages, expertise led content and conversion focused strategy for law, accounting, consulting and B2B firms.",
    keyword: "SEO for professional services",
    h1Title: "SEO for Professional Services",
    h1Highlight: "That Want More Qualified Leads",
    eyebrow: "SEO FOR PROFESSIONAL SERVICES",
    heroSubtitle:
      "Attract qualified prospects rather than mere traffic with professional services SEO, expertise led content and conversion focused pages for your firm.",
    heroCtaPrimary: "Get a Free Professional Services SEO Audit",
    heroCtaSecondary: "Talk to Our Team",
    intro: [
      "Professional service firms win business on trust and expertise. SEO helps you get found by the prospects who are actively looking for the specific help you offer, and present your expertise convincingly.",
      "Webamazee helps law firms, accounting firms, consultants and B2B service providers attract qualified prospects through service pages, thought leadership and conversion focused SEO.",
    ],
    challenges: [
      { title: "High value decisions", desc: "Prospects choose firms carefully and trust matters." },
      { title: "Long qualification cycles", desc: "B2B buying journeys can be long and considered." },
      { title: "Expertise based searches", desc: "Buyers search for specialists and specific problems." },
      { title: "Competitive local markets", desc: "Firms compete for clients in the same areas." },
      { title: "Commercial intent", desc: "Attracting the right leads is more valuable than volume." },
      { title: "Compliance sensitivity", desc: "Content must stay within professional boundaries." },
    ],
    whyMatters: {
      heading: "Why SEO matters for professional services",
      body: [
        "Professional service businesses win on trust and specific expertise. SEO helps you appear for the searches prospects make when they need help, and lets you demonstrate authority through well crafted content.",
        "The goal is qualified leads, not just traffic. By targeting commercial intent and expertise based searches, you attract prospects who are ready to engage rather than casual visitors.",
        "A clear service page structure and thoughtful thought leadership help prospects understand your expertise and feel confident choosing you.",
      ],
    },
    strategy: [
      { title: "Service page SEO", body: "Optimize pages for the specific services you offer.", link: { label: "SEO Services", href: "/services/seo-services" } },
      { title: "Local SEO", body: "Win the clients searching for firms in your area.", link: { label: "Local SEO", href: "/services/local-seo" } },
      { title: "Expertise led content", body: "Build authority with content that demonstrates real expertise.", link: { label: "AI Content Optimization", href: "/services/ai-content-optimization" } },
      { title: "Thought leadership", body: "Publish insights that position your firm as a trusted authority." },
      { title: "Long tail keywords", body: "Target specific, high intent searches that convert well.", link: { label: "AI SEO", href: "/services/ai-seo" } },
      { title: "Conversion optimization", body: "Ensure clear paths from search to enquiry and consultation.", link: { label: "Website Redesign", href: "/services/website-redesign" } },
    ],
    coreServices: [
      service("SEO Services", "seo-services", "Improve organic visibility for your firm's services.", "Qualified leads"),
      service("Local SEO", "local-seo", "Win clients searching for firms in your area.", "Local visibility"),
      service("AI Content Optimization", "ai-content-optimization", "Create expertise led content that builds authority.", "Content that converts"),
      service("AI SEO", "ai-seo", "Use AI to find high intent terms and target them well.", "Smarter targeting"),
      service("Google Ranking Growth", "google-ranking-growth", "A data led path to improving your positions.", "Better visibility"),
      service("Website Redesign", "website-redesign", "Build a credible, conversion focused website for your firm.", "A site that wins trust"),
    ],
    growth: [
      { title: "Commercial intent targeting", desc: "Attract prospects ready to engage, not just browse." },
      { title: "Expertise authority", desc: "Build trust through clear, insightful content." },
      { title: "Long tail leads", desc: "Win specific, high intent searches." },
      { title: "Service line growth", desc: "Build visibility for each service you offer." },
      { title: "Local firm visibility", desc: "Win clients looking for firms near them." },
      { title: "Higher quality enquiries", desc: "Convert informed prospects into consultations." },
    ],
    process: seoProcess,
    whyChoose,
    relatedServices: [
      { name: "SEO Services", slug: "seo-services" },
      { name: "Local SEO", slug: "local-seo" },
      { name: "AI Content Optimization", slug: "ai-content-optimization" },
      { name: "AI SEO", slug: "ai-seo" },
      { name: "Google Ranking Growth", slug: "google-ranking-growth" },
      { name: "Technical SEO", slug: "technical-seo" },
      { name: "Website Redesign", slug: "website-redesign" },
      { name: "Link Building", slug: "link-building" },
    ],
    faqs: [
      { q: "How does SEO generate leads for professional services?", a: "It targets high intent, expertise based searches so you attract prospects who are actively looking for your specific help." },
      { q: "What keywords should professional service firms target?", a: "A mix of service terms, local terms and long tail, high intent queries related to your specific expertise." },
      { q: "How long can professional services SEO take?", a: "Content can attract leads quickly, while competitive rankings typically build over several months." },
      { q: "How can professional firms build authority through content?", a: "By publishing clear, insightful content that demonstrates expertise and answers prospect questions." },
      { q: "Is local SEO important for professional services?", a: "Yes, for firms that serve specific areas it is essential to winning local clients." },
      { q: "Can SEO help a firm attract better clients rather than more traffic?", a: "Yes. By targeting commercial intent you attract qualified prospects who are more likely to engage." },
      { q: "Do you provide legal or financial advice?", a: "No. Webamazee provides SEO and digital visibility services only." },
      { q: "Do you guarantee leads?", a: "No ethical partner can guarantee leads. We deliver a transparent, data driven approach." },
    ],
    ctaTitle: "Ready to Win More Qualified Leads for Your Firm?",
    ctaSubtitle: "Get a free professional services SEO audit and a personalised plan for your firm.",
    ctaLabel: "Get a Free Professional Services SEO Audit",
    crossLinks: [
      { label: "SEO for SaaS", href: "/seo-for-saas" },
      { label: "SEO for Local Business", href: "/seo-for-local-business" },
      { label: "SEO for Healthcare", href: "/seo-for-healthcare" },
    ],
    keywords: ["SEO for professional services", "professional services SEO", "B2B SEO", "service page SEO", "thought leadership SEO", "qualified leads"],
  },
];

/** Every industry landing page exposes ten visible, schema-matched FAQs. */
export const industries: Industry[] = industryEntries.map((industry) => ({
  ...industry,
  faqs: [
    ...industry.faqs,
    {
      q: `Can ${industry.name.toLowerCase()} SEO work with an existing website?`,
      a: "Yes. We can review the current technical and content foundation, then prioritise improvements without requiring an automatic rebuild.",
    },
    {
      q: `What does Webamazee need to plan SEO for a ${industry.name.toLowerCase()} business?`,
      a: "We begin with your services or products, audience, priority markets, current website data and the commercial actions you want organic visitors to take.",
    },
  ].slice(0, 10),
}));

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}

export function getAllIndustries(): Industry[] {
  return industries;
}
