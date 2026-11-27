/**
 * Pricing catalogue data.
 *
 * Extracted verbatim from pricing-catalog.tsx so that server components can
 * read the published prices without importing a client module. This is the
 * single source of truth for every price shown on the site; do not duplicate
 * prices elsewhere.
 */

export type PricingPackage = {
  name: string;
  usd: number;
  inr: string;
  recurring: boolean;
  features: string[];
  cta: string;
  recommended?: boolean;
};

export type PricingCategory = {
  id: string;
  number: string;
  title: string;
  description: string;
  packages: PricingPackage[];
};

export const pricingCategories: PricingCategory[] = [
  {
    id: "website-development",
    number: "01",
    title: "Website Development",
    description:
      "Fast, conversion-focused websites and online stores, built to perform. These are one-time projects.",
    packages: [
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
    ],
  },
  {
    id: "seo",
    number: "02",
    title: "SEO",
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
    number: "03",
    title: "AI SEO",
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
        recommended: true,
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
    id: "social-media-marketing",
    number: "04",
    title: "Social Media Marketing",
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
        recommended: true,
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
