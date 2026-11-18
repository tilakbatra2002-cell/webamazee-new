export const CALENDLY_URL = "https://calendly.com/webamazee0411/30min";

export const VERIFIED_CONTACT = {
  email: "info@webamazee.com",
  phone: "+91 83605 32487",
  phoneHref: "tel:+918360532487",
  locationShort: "Mohali · Chandigarh Tricity, India",
  hours: "Mon – Sat · 09:00 – 19:00 IST",
  socials: {
    linkedin: "https://www.linkedin.com/in/webamazee-tech-15113a3bb/",
    instagram: "https://www.instagram.com/webamazee/",
    facebook: "https://www.facebook.com/people/Webamazee/61589420618603/",
    calendly: CALENDLY_URL,
  },
} as const;

export const HERO_SERVICE_OPTIONS = [
  "Website Design & Development",
  "E-Commerce Development",
  "SEO",
  "Local SEO",
  "AI SEO",
  "Digital Marketing",
  "Social Media Marketing",
  "Content Strategy",
  "Conversion-Focused Landing Pages",
  "Website Optimisation & Redesign",
  "Ongoing Growth Support",
] as const;

export type ClientLogoItem = {
  name: string;
  logo: string;
  width: number;
  height: number;
  sector: string;
  country: string;
  caseStudyHref: string;
};

export const REAL_CLIENT_LOGOS: ClientLogoItem[] = [
  {
    name: "Kabir Oil Mill",
    logo: "/images/newhome/clients/kabir-oil-mill.webp",
    width: 169,
    height: 67,
    sector: "E-Commerce Store",
    country: "India",
    caseStudyHref: "/case-studies/kabiroilmill",
  },
  {
    name: "Wellington Tours",
    logo: "/images/newhome/clients/wellington-tours.webp",
    width: 120,
    height: 87,
    sector: "Travel & Tourism",
    country: "New Zealand",
    caseStudyHref: "/case-studies/wellingtontours",
  },
  {
    name: "Shine Gold Tours India",
    logo: "/images/newhome/clients/shine-gold-tours.webp",
    width: 146,
    height: 72,
    sector: "Website Redesign",
    country: "India",
    caseStudyHref: "/case-studies/shinegoldtours",
  },
  {
    name: "American-Lao Business Association",
    logo: "/images/newhome/clients/amlaoba.webp",
    width: 98,
    height: 99,
    sector: "Trade Association",
    country: "United States & Laos",
    caseStudyHref: "/case-studies/americanlaobusinessassociation",
  },
];

export type GrowthServiceItem = {
  title: string;
  description: string;
  focusPoints: string[];
  href: string;
  ctaLabel: string;
  enquiryValue: string;
};

export type GrowthStage = {
  id: string;
  number: string;
  goalTitle: string;
  goalLabel: string;
  summary: string;
  outcomeNote: string;
  services: GrowthServiceItem[];
};

export const GROWTH_STAGES: GrowthStage[] = [
  {
    id: "goal-get-found",
    number: "01",
    goalTitle: "Get Found",
    goalLabel: "Search & AI Visibility",
    summary:
      "Position your business where prospective buyers actively search — across Google organic results, local map packs, and modern AI answer engines.",
    outcomeNote: "Built for sustainable, high-intent organic discovery.",
    services: [
      {
        title: "SEO",
        description:
          "Structured keyword research, on-page improvements, technical SEO fixes, and search-intent content that help key service and product pages rank on Google.",
        focusPoints: ["Technical & on-page foundations", "Search-intent page optimisation", "Monthly Search Console reporting"],
        href: "/services/seo-services",
        ctaLabel: "Explore SEO",
        enquiryValue: "SEO",
      },
      {
        title: "Local SEO",
        description:
          "Help nearby customers find and contact your business first across Google Maps, Google Business Profile, local citations, and location-focused search terms.",
        focusPoints: ["Google Business Profile setup", "Local pack & citation consistency", "City & regional search pages"],
        href: "/services/local-seo",
        ctaLabel: "Explore Local SEO",
        enquiryValue: "Local SEO",
      },
      {
        title: "AI SEO",
        description:
          "Prepare your website structure, entities, schema markup, and answer-ready content so AI assistants and generative search platforms understand and cite your brand.",
        focusPoints: ["Entity & structured data signals", "Answer-focused content clarity", "AI search visibility audits"],
        href: "/services/ai-seo",
        ctaLabel: "Explore AI SEO",
        enquiryValue: "AI SEO",
      },
    ],
  },
  {
    id: "goal-attract-customers",
    number: "02",
    goalTitle: "Attract Customers",
    goalLabel: "Demand, Reach & Authority",
    summary:
      "Reach the right audience consistently across digital channels with coordinated campaigns, active social presence, and useful, search-aligned content.",
    outcomeNote: "Designed to turn brand awareness into qualified interest.",
    services: [
      {
        title: "Digital Marketing",
        description:
          "Integrated multi-channel campaigns combining search visibility, paid acquisition support, and conversion paths aligned to your commercial priorities.",
        focusPoints: ["Channel & audience planning", "Search & campaign alignment", "Clear lead tracking"],
        href: "/services",
        ctaLabel: "Explore Digital Marketing",
        enquiryValue: "Digital Marketing",
      },
      {
        title: "Social Media Marketing",
        description:
          "Consistent brand presence across Instagram, Facebook, and LinkedIn with planned content calendars, creative assets, community management, and ad support.",
        focusPoints: ["Platform-specific content plans", "Audience & community engagement", "Paid social campaign management"],
        href: "/services/social-media-marketing",
        ctaLabel: "Explore Social Media",
        enquiryValue: "Social Media Marketing",
      },
      {
        title: "Content Strategy",
        description:
          "Clear, well-researched service copy, landing pages, FAQs, and editorial guides written around real buyer questions to earn trust and organic reach.",
        focusPoints: ["Topic & competitor gap research", "Decision-focused website copy", "Search & AI-ready structure"],
        href: "/services/ai-content-optimization",
        ctaLabel: "Explore Content Strategy",
        enquiryValue: "Content Strategy",
      },
    ],
  },
  {
    id: "goal-build-presence",
    number: "03",
    goalTitle: "Build Your Digital Presence",
    goalLabel: "Websites & Online Stores",
    summary:
      "Give your business a credible, fast, mobile-ready digital home that communicates your value immediately and makes taking the next step effortless.",
    outcomeNote: "Engineered from day one for speed, clarity, and search.",
    services: [
      {
        title: "Website Design",
        description:
          "Thoughtful UI/UX design and website redesigns with clean visual hierarchy, brand-appropriate typography, and intuitive navigation across desktop and mobile.",
        focusPoints: ["Custom responsive UI/UX", "Clear information architecture", "Modern website redesigns"],
        href: "/services/website-redesign",
        ctaLabel: "Explore Website Design",
        enquiryValue: "Website Design & Development",
      },
      {
        title: "Website Development",
        description:
          "Reliable, fast-loading business websites built on modern stacks or maintainable CMS platforms, complete with enquiry flows, analytics, and on-page SEO setup.",
        focusPoints: ["Performance-minded builds", "Manageable CMS & clean code", "Built-in SEO & lead capture"],
        href: "/services/website-development",
        ctaLabel: "Explore Web Development",
        enquiryValue: "Website Design & Development",
      },
      {
        title: "E-Commerce Development",
        description:
          "End-to-end online storefronts connecting organised product catalogues, clear product detail pages, shopping cart, payment gateways, and mobile checkout.",
        focusPoints: ["Catalogue & product architecture", "Connected cart & checkout flow", "Mobile-first shopping UX"],
        href: "/services/ecommerce-development",
        ctaLabel: "Explore E-Commerce",
        enquiryValue: "E-Commerce Development",
      },
    ],
  },
  {
    id: "goal-convert-grow",
    number: "04",
    goalTitle: "Convert & Grow",
    goalLabel: "Enquiries, Speed & Retention",
    summary:
      "Ensure the traffic you earn actually turns into enquiries and orders — then keep improving site performance and search equity month after month.",
    outcomeNote: "Focused on removing friction across the buyer journey.",
    services: [
      {
        title: "Conversion-Focused Landing Pages",
        description:
          "Dedicated campaign and service landing pages structured around a single clear offer, strong trust signals, and direct enquiry or booking actions.",
        focusPoints: ["Focused message-to-offer match", "Contextual enquiry & call CTAs", "Fast mobile load experience"],
        href: "/services/landing-page-development",
        ctaLabel: "Explore Landing Pages",
        enquiryValue: "Conversion-Focused Landing Pages",
      },
      {
        title: "Website Optimisation",
        description:
          "Practical improvements to page speed, Core Web Vitals, crawlability, navigation clarity, and form usability so visitors stay engaged and act.",
        focusPoints: ["Speed & technical health fixes", "UX & navigation refinement", "Crawl, index & schema cleanup"],
        href: "/services/technical-seo",
        ctaLabel: "Explore Optimisation",
        enquiryValue: "Website Optimisation & Redesign",
      },
      {
        title: "Ongoing Growth Support",
        description:
          "Consistent monthly partnership combining site updates, search optimisation, fresh content, and transparent reporting so your digital presence keeps compounding.",
        focusPoints: ["Dedicated monthly roadmap", "Iterative SEO & content updates", "Clear progress reporting"],
        href: "/pricing",
        ctaLabel: "View Growth Retainers",
        enquiryValue: "Ongoing Growth Support",
      },
    ],
  },
];

export type CaseStudyShowcase = {
  slug: string;
  name: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  screenshot: string;
  categoryTag: string;
  industry: string;
  country: string;
  year: string;
  domain: string;
  liveUrl: string;
  caseStudyUrl: string;
  headline: string;
  challenge: string;
  solution: string;
  outcome: string;
  deliverables: string[];
};

export const CASE_STUDY_SHOWCASES: CaseStudyShowcase[] = [
  {
    slug: "kabiroilmill",
    name: "Kabir Oil Mill",
    logo: "/images/newhome/clients/kabir-oil-mill.webp",
    logoWidth: 169,
    logoHeight: 67,
    screenshot: "/images/portfolio/kabir-oil-mill-live-homepage.webp",
    categoryTag: "E-Commerce Development",
    industry: "Food & Consumer Products",
    country: "India",
    year: "2025",
    domain: "kabiroilmill.com",
    liveUrl: "https://kabiroilmill.com/",
    caseStudyUrl: "/case-studies/kabiroilmill",
    headline: "A complete e-commerce storefront connecting product discovery to online checkout",
    challenge:
      "Kabir Oil Mill needed a dedicated online store to showcase its cold-pressed oil product range clearly and move beyond offline-only discovery.",
    solution:
      "Webamazee planned, designed, and developed the full WooCommerce storefront — structuring product categories, product detail pages, shopping cart, and mobile-friendly checkout.",
    outcome:
      "Delivered a cohesive digital storefront where customers can browse oil varieties, understand product purity, and place online orders seamlessly across devices.",
    deliverables: [
      "Store Architecture",
      "Product Catalogue & Pages",
      "Cart & Checkout Flow",
      "Responsive Mobile UI",
      "On-Page SEO Structure",
    ],
  },
  {
    slug: "wellingtontours",
    name: "Wellington Tours",
    logo: "/images/newhome/clients/wellington-tours.webp",
    logoWidth: 120,
    logoHeight: 87,
    screenshot: "/images/portfolio/wellington-tours-live-homepage.webp",
    categoryTag: "Website Development",
    industry: "Travel & Tourism",
    country: "New Zealand",
    year: "2025",
    domain: "wellingtontour.co.nz",
    liveUrl: "https://wellingtontour.co.nz/",
    caseStudyUrl: "/case-studies/wellingtontours",
    headline: "An enquiry-focused New Zealand travel website built around clear tour discovery",
    challenge:
      "Wellington Tours needed a credible digital home to present city tours, intercity packages, and airport transfers clearly while making traveller enquiries effortless.",
    solution:
      "We structured the site around real traveller questions — organising tour packages, destination highlights, and prominent booking and contact prompts for desktop and mobile planners.",
    outcome:
      "Delivered a professional New Zealand tourism website with clear service navigation and direct enquiry paths at key decision points.",
    deliverables: [
      "Travel UX & Navigation",
      "Tour & Transfer Pages",
      "Contextual Enquiry CTAs",
      "Mobile-First Layouts",
      "Search-Ready Hierarchy",
    ],
  },
  {
    slug: "shinegoldtours",
    name: "Shine Gold Tours India",
    logo: "/images/newhome/clients/shine-gold-tours.webp",
    logoWidth: 146,
    logoHeight: 72,
    screenshot: "/images/portfolio/shine-gold-tours-india-live-homepage.webp",
    categoryTag: "Website Redesign",
    industry: "Travel & Tourism",
    country: "India",
    year: "2025",
    domain: "shinegoldtoursindia.com",
    liveUrl: "https://shinegoldtoursindia.com/",
    caseStudyUrl: "/case-studies/shinegoldtours",
    headline: "Full UI/UX redesign transforming an outdated travel site into a modern destination showcase",
    challenge:
      "An outdated visual interface, slow page experience, and cluttered hierarchy made it hard for visitors to explore Indian tour offerings or reach an enquiry form.",
    solution:
      "Webamazee executed a ground-up UI and UX redesign — refreshing typography and destination storytelling, reorganising tour categories, cleaning up frontend delivery, and adding contextual CTAs.",
    outcome:
      "Replaced a dated presence with a modern, responsive travel website featuring clearer destination browsing and direct traveller lead journeys.",
    deliverables: [
      "Complete UI/UX Redesign",
      "Information Architecture",
      "Destination Storytelling",
      "Frontend Performance Cleanup",
      "Responsive Lead Flows",
    ],
  },
  {
    slug: "americanlaobusinessassociation",
    name: "American-Lao Business Association",
    logo: "/images/newhome/clients/amlaoba.webp",
    logoWidth: 98,
    logoHeight: 99,
    screenshot: "/images/portfolio/american-lao-business-association-live-homepage.webp",
    categoryTag: "Website Redesign",
    industry: "Business Association · International Trade",
    country: "United States & Laos",
    year: "2026",
    domain: "amlaoba.org",
    liveUrl: "https://amlaoba.org/",
    caseStudyUrl: "/case-studies/americanlaobusinessassociation",
    headline: "A modern digital front door strengthening US–Laos business, investment, and member connections",
    challenge:
      "AMLAOBA needed an authoritative website to communicate its bilateral trade mission and organise growing events, news, sponsor tiers, member directories, and membership routes.",
    solution:
      "We redesigned the visual identity and site structure around its Connect, Promote, Support, and Grow pillars — creating scannable sections for events, insights, sponsors, and membership actions.",
    outcome:
      "Delivered a polished, international-ready association platform serving businesses, investors, and institutional partners across the United States and Laos.",
    deliverables: [
      "Mission-Led Homepage",
      "Events & Insights Structure",
      "Sponsor & Member Showcase",
      "Membership Conversion Paths",
      "Cross-Device Responsive UI",
    ],
  },
];

export const WHY_CHOOSE_PILLARS = [
  {
    number: "01",
    title: "Practical, Business-Focused Solutions",
    description:
      "We focus on what helps real customers understand your offer, trust your business, and get in touch or buy — avoiding vanity features and unnecessary complexity.",
  },
  {
    number: "02",
    title: "Website Development & Marketing Under One Roof",
    description:
      "Your website structure, design, page speed, SEO, AI search readiness, and ongoing marketing are handled by one coordinated team rather than disconnected freelancers.",
  },
  {
    number: "03",
    title: "Clear, Direct Communication",
    description:
      "You receive straightforward updates and honest recommendations in plain language — so you always know what we are working on and why it matters.",
  },
  {
    number: "04",
    title: "Transparent Project Delivery",
    description:
      "Every engagement starts with a defined scope, clear deliverables, published pricing, and structured milestones from initial planning through launch.",
  },
  {
    number: "05",
    title: "Solutions Tailored to Your Business Goals",
    description:
      "Whether you run a local business in Chandigarh Tricity, a growing e-commerce brand, or an international organisation, we shape the roadmap around your stage and priorities.",
  },
] as const;

export const WORKING_PROCESS_STEPS = [
  {
    step: "01",
    title: "Understand Your Business",
    description:
      "We start by learning how your business works, what you offer, who your best customers are, and what a meaningful digital outcome looks like for you.",
    deliverable: "Discovery & Goal Alignment",
  },
  {
    step: "02",
    title: "Research & Strategy",
    description:
      "We audit your current website, search visibility, and competitive landscape to map the right page structure, keywords, and conversion paths.",
    deliverable: "Site & Growth Roadmap",
  },
  {
    step: "03",
    title: "Design & Development",
    description:
      "Our team designs clean, responsive interfaces and develops fast, search-ready pages with clear messaging and reliable enquiry or checkout flows.",
    deliverable: "Custom Build & QA Review",
  },
  {
    step: "04",
    title: "Launch & Optimisation",
    description:
      "We verify mobile usability, forms, technical SEO, analytics, and Search Console setup for a smooth launch — then refine based on real user behaviour.",
    deliverable: "Verified Live Deployment",
  },
  {
    step: "05",
    title: "Ongoing Growth",
    description:
      "After launch, we help you compound visibility and leads month over month through SEO, AI search optimisation, content, and social campaigns.",
    deliverable: "Monthly Reporting & Growth",
  },
] as const;

export type ApprovedPackage = {
  name: string;
  usd: number;
  inr: string;
  recurring: boolean;
  subtitle?: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  badgeLabel?: string;
};

/** Approved one-time Website Development packages — preserved verbatim from pricing-catalog.tsx */
export const ONE_TIME_WEBSITE_PACKAGES: ApprovedPackage[] = [
  {
    name: "Starter Website",
    usd: 749,
    inr: "24,999",
    recurring: false,
    features: [
      "Up to 5 Pages",
      "Responsive Design",
      "Contact Form",
      "Basic SEO Setup",
      "WhatsApp Integration",
    ],
    cta: "Get Started",
  },
  {
    name: "Business Website",
    usd: 1299,
    inr: "39,999",
    recurring: false,
    highlighted: true,
    badgeLabel: "Popular Choice",
    features: [
      "Up to 10 Pages",
      "Custom UI/UX Design",
      "On-Page SEO",
      "Contact & Lead Forms",
      "Analytics Integration",
    ],
    cta: "Choose Plan",
  },
  {
    name: "Professional Website",
    usd: 1999,
    inr: "64,999",
    recurring: false,
    features: [
      "Up to 15 Pages",
      "Premium UI/UX Design",
      "Advanced SEO Setup",
      "Lead Generation Features",
      "Conversion Optimization",
    ],
    cta: "Choose Plan",
  },
  {
    name: "E-Commerce Website",
    usd: 2499,
    inr: "79,999",
    recurring: false,
    features: [
      "Online Store Development",
      "Product & Category Setup",
      "Payment Gateway Integration",
      "Mobile Responsive Design",
      "Basic SEO & Analytics",
    ],
    cta: "Build My Store",
  },
];

export type RetainerCategory = {
  id: string;
  label: string;
  description: string;
  packages: ApprovedPackage[];
};

/** Approved monthly marketing retainer categories — preserved verbatim from pricing.tsx & pricing-catalog.tsx */
export const MONTHLY_RETAINER_CATEGORIES: RetainerCategory[] = [
  {
    id: "growth-bundles",
    label: "Digital Growth Packages",
    description:
      "Multi-channel monthly retainers combining SEO, social media, and digital growth around your business stage.",
    packages: [
      {
        name: "Starter",
        usd: 499,
        inr: "14,999",
        recurring: true,
        subtitle: "For new businesses and startups.",
        features: [
          "Basic SEO",
          "Google Business Profile",
          "5 Social Media Posts / Month",
          "Basic Graphic Design",
          "Monthly Performance Report",
        ],
        cta: "Get Started",
      },
      {
        name: "Growth",
        usd: 799,
        inr: "24,999",
        recurring: true,
        highlighted: true,
        badgeLabel: "Featured",
        subtitle: "For businesses ready to grow.",
        features: [
          "On-Page & Local SEO",
          "Keyword Research",
          "10 Social Media Posts / Month",
          "Social Media Management",
          "Monthly Growth Report",
        ],
        cta: "Grow My Business",
      },
      {
        name: "Professional",
        usd: 1299,
        inr: "39,999",
        recurring: true,
        subtitle: "For established businesses.",
        features: [
          "Advanced SEO",
          "15 Social Media Posts / Month",
          "Social Media Management",
          "Google & Meta Ads Management",
          "Competitor Analysis",
        ],
        cta: "Go Professional",
      },
      {
        name: "Complete Growth",
        usd: 1999,
        inr: "59,999",
        recurring: true,
        subtitle: "For businesses wanting complete digital growth.",
        features: [
          "Advanced SEO + AI SEO",
          "20 Social Media Posts / Month",
          "Google & Meta Ads Management",
          "Content & Lead Generation",
          "Conversion Optimization",
        ],
        cta: "Let's Grow",
      },
    ],
  },
  {
    id: "seo",
    label: "SEO",
    description:
      "Month-to-month search engine optimization to grow organic traffic, rankings and qualified leads.",
    packages: [
      {
        name: "SEO Starter",
        usd: 449,
        inr: "12,999",
        recurring: true,
        features: [
          "Keyword Research",
          "On-Page SEO",
          "Technical SEO Basics",
          "Google Search Console",
          "Monthly SEO Report",
        ],
        cta: "Start SEO",
      },
      {
        name: "Local SEO",
        usd: 649,
        inr: "19,999",
        recurring: true,
        features: [
          "Local Keyword Research",
          "Google Business Profile Optimization",
          "Local On-Page SEO",
          "Citation & Directory Optimization",
          "Monthly SEO Report",
        ],
        cta: "Grow Locally",
      },
      {
        name: "SEO Growth",
        usd: 999,
        inr: "32,999",
        recurring: true,
        highlighted: true,
        badgeLabel: "Recommended",
        features: [
          "Advanced Keyword Research",
          "Technical & On-Page SEO",
          "Content Optimization",
          "Competitor Analysis",
          "Monthly Growth Report",
        ],
        cta: "Grow My Rankings",
      },
      {
        name: "SEO Professional",
        usd: 1499,
        inr: "49,999",
        recurring: true,
        features: [
          "Advanced Technical SEO",
          "National & Global SEO",
          "Content Strategy",
          "Competitor & SERP Analysis",
          "Advanced Performance Reporting",
        ],
        cta: "Go Professional",
      },
    ],
  },
  {
    id: "ai-seo",
    label: "AI SEO",
    description:
      "AI-powered search optimization designed for the next generation of search. Monthly plans.",
    packages: [
      {
        name: "AI SEO Starter",
        usd: 549,
        inr: "16,999",
        recurring: true,
        features: [
          "AI Search Visibility Audit",
          "AI Keyword Research",
          "Content Optimization",
          "Search Console Integration",
          "Monthly AI SEO Report",
        ],
        cta: "Start AI SEO",
      },
      {
        name: "AI SEO Growth",
        usd: 899,
        inr: "28,999",
        recurring: true,
        features: [
          "AI Search Optimization",
          "AI Keyword & Topic Research",
          "Content Strategy",
          "Entity & Semantic Optimization",
          "Monthly Performance Report",
        ],
        cta: "Grow With AI",
      },
      {
        name: "AI SEO Pro",
        usd: 1299,
        inr: "39,999",
        recurring: true,
        highlighted: true,
        badgeLabel: "Recommended",
        features: [
          "Advanced AI SEO Strategy",
          "AI Content Optimization",
          "Entity & Topic Authority",
          "Competitor AI Search Analysis",
          "Advanced Reporting",
        ],
        cta: "Choose AI SEO Pro",
      },
      {
        name: "AI SEO Domination",
        usd: 1799,
        inr: "54,999",
        recurring: true,
        features: [
          "Complete AI SEO Strategy",
          "AI Search Visibility Optimization",
          "Advanced Content Strategy",
          "Competitor & SERP Intelligence",
          "Monthly Growth Strategy",
        ],
        cta: "Dominate Search",
      },
    ],
  },
  {
    id: "social-media",
    label: "Social Media Marketing",
    description:
      "Strategic social media services designed to build brand presence, increase engagement, reach the right audience and generate business growth across major social platforms.",
    packages: [
      {
        name: "Social Starter",
        usd: 499,
        inr: "16,999",
        recurring: true,
        features: [
          "Social Media Management",
          "Up to 2 Social Platforms",
          "Social Media Content",
          "8 Social Media Posts",
          "Basic Community Management",
          "Monthly Performance Report",
        ],
        cta: "Get Started",
      },
      {
        name: "Social Growth",
        usd: 849,
        inr: "29,999",
        recurring: true,
        highlighted: true,
        badgeLabel: "Recommended",
        features: [
          "Social Media Management",
          "Up to 3 Social Platforms",
          "12 Social Media Posts",
          "Instagram & Facebook Marketing",
          "Community Engagement",
          "Content Strategy",
          "Monthly Performance Report",
        ],
        cta: "Grow My Social Media",
      },
      {
        name: "Social Professional",
        usd: 1299,
        inr: "44,999",
        recurring: true,
        features: [
          "Social Media Management",
          "Up to 4 Social Platforms",
          "16 Social Media Posts",
          "Instagram, Facebook & LinkedIn Marketing",
          "Social Media Strategy",
          "Audience & Competitor Research",
          "Community Management",
          "Social Media Advertising Management",
          "Monthly Performance Report",
        ],
        cta: "Build My Presence",
      },
      {
        name: "Social Enterprise",
        usd: 1899,
        inr: "64,999",
        recurring: true,
        features: [
          "Complete Social Media Management",
          "Up to 6 Social Platforms",
          "20 Social Media Posts",
          "Instagram Marketing",
          "Facebook Marketing",
          "LinkedIn Marketing",
          "Social Media Advertising",
          "Advanced Content Strategy",
          "Audience & Competitor Research",
          "Community Management",
          "Detailed Monthly Analytics & Reporting",
        ],
        cta: "Scale My Social Media",
      },
    ],
  },
];
