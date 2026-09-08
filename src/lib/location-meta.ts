/**
 * Approved per-page metadata for the 46 location pages (SEO Metadata Master Plan, 2026-09).
 *
 * `keywords` are the curated keyword-mapping sets for each page (mapping layer only -
 * meta keywords are not a Google ranking factor). `metaDescription` (where present) is the
 * approved page-specific description; pages without one keep their generated description.
 * Titles are untouched - all 108 approved titles from commit 9848a75 remain as-is.
 *
 * Applied at the end of the location pipeline in ./locations.ts (after
 * enhancePriorityLocation) so these values are the final rendered metadata.
 */
import type { LocationPage } from "./locations";

export interface LocationMetaOverride {
  metaDescription?: string;
  keywords: string[];
}

export const locationMetaOverrides: Record<string, LocationMetaOverride> = {
  "ai-marketing-company-bathinda": {
    metaDescription: "AI-powered marketing for Bathinda's education, healthcare and retail businesses - AI-assisted research, content and SEO led by human strategy.",
    keywords: ["AI marketing company in Bathinda", "AI marketing in Bathinda", "AI marketing agency Bathinda", "AI SEO Bathinda", "AI content marketing Bathinda", "Bathinda", "India"],
  },
  "ai-marketing-company-chandigarh": {
    metaDescription: "AI-powered marketing for Chandigarh's startup scene and professional businesses - AI-assisted research, content and SEO with human strategy leading the way.",
    keywords: ["AI marketing company in Chandigarh", "AI marketing in Chandigarh", "AI marketing agency Chandigarh", "AI SEO Chandigarh", "AI content marketing Chandigarh", "Chandigarh", "India"],
  },
  "ai-marketing-company-himachal-pradesh": {
    metaDescription: "AI-powered marketing for Himachal Pradesh's tourism and local businesses - AI-assisted research, content and SEO with human strategy leading the way.",
    keywords: ["AI marketing company in Himachal Pradesh", "AI marketing in Himachal Pradesh", "AI marketing agency Himachal Pradesh", "AI SEO Himachal Pradesh", "AI content marketing Himachal Pradesh", "Himachal Pradesh", "India"],
  },
  "ai-marketing-company-mohali": {
    metaDescription: "AI-powered marketing for Mohali's IT parks, startups and B2B companies - AI-assisted research, content and SEO with human strategy leading the way.",
    keywords: ["AI marketing company in Mohali", "AI marketing in Mohali", "AI marketing agency Mohali", "AI SEO Mohali", "AI content marketing Mohali", "Mohali", "India"],
  },
  "ai-marketing-company-new-zealand": {
    metaDescription: "AI-powered marketing for New Zealand businesses - AI-assisted research, content and SEO that keep up with a highly connected market, led by human strategy.",
    keywords: ["AI marketing company in New Zealand", "AI marketing in New Zealand", "AI marketing agency New Zealand", "AI SEO New Zealand", "AI content marketing New Zealand", "New Zealand"],
  },
  "ai-marketing-company-panchkula": {
    metaDescription: "AI-powered marketing for Panchkula's clinics, schools, retail and professional practices - AI-assisted research, content and SEO led by human strategy.",
    keywords: ["AI marketing company in Panchkula", "AI marketing in Panchkula", "AI marketing agency Panchkula", "AI SEO Panchkula", "AI content marketing Panchkula", "Panchkula", "India"],
  },
  "ai-marketing-company-punjab": {
    metaDescription: "AI-powered marketing for Punjab businesses - manufacturing, food processing, retail and healthcare - AI-assisted research, content and SEO led by human strategy.",
    keywords: ["AI marketing company in Punjab", "AI marketing in Punjab", "AI marketing agency Punjab", "AI SEO Punjab", "AI content marketing Punjab", "Punjab", "India"],
  },
  "ai-marketing-company-uae": {
    keywords: ["AI marketing company in UAE", "AI marketing in United Arab Emirates", "AI marketing agency UAE", "AI SEO UAE", "AI content marketing UAE", "UAE", "United Arab Emirates"],
  },
  "ai-marketing-company-uk": {
    keywords: ["AI marketing company in UK", "AI marketing in United Kingdom", "AI marketing agency UK", "AI SEO UK", "AI content marketing UK", "UK", "United Kingdom"],
  },
  "ai-marketing-company-usa": {
    keywords: ["AI marketing company in USA", "AI marketing in United States", "AI marketing agency USA", "AI SEO USA", "AI content marketing USA", "USA", "United States"],
  },
  "ai-marketing-company-zirakpur": {
    metaDescription: "AI-powered marketing for Zirakpur and the Tricity - AI-assisted research, content and SEO that speed up work and surface opportunities, led by human strategy.",
    keywords: ["AI marketing company in Zirakpur", "AI marketing in Zirakpur", "AI marketing agency Zirakpur", "AI SEO Zirakpur", "AI content marketing Zirakpur", "Zirakpur", "India"],
  },
  "digital-marketing-company-bathinda": {
    metaDescription: "Looking for a digital marketing company in Bathinda? Webamazee combines SEO, websites, AI content and conversion strategy for education, healthcare and retail.",
    keywords: ["digital marketing company in Bathinda", "digital marketing in Bathinda", "digital marketing agency Bathinda", "SEO Bathinda", "social media marketing Bathinda", "Bathinda", "India"],
  },
  "digital-marketing-company-chandigarh": {
    metaDescription: "Looking for a digital marketing company in Chandigarh? Webamazee combines SEO, websites, AI content and conversion strategy for startups and growing businesses.",
    keywords: ["digital marketing company in Chandigarh", "digital marketing in Chandigarh", "digital marketing agency Chandigarh", "SEO Chandigarh", "social media marketing Chandigarh", "Chandigarh", "India"],
  },
  "digital-marketing-company-himachal-pradesh": {
    metaDescription: "Looking for a digital marketing company in Himachal Pradesh? Webamazee combines SEO, websites, AI content and conversion strategy for tourism and local business.",
    keywords: ["digital marketing company in Himachal Pradesh", "digital marketing in Himachal Pradesh", "digital marketing agency Himachal Pradesh", "SEO Himachal Pradesh", "social media marketing Himachal Pradesh", "Himachal Pradesh", "India"],
  },
  "digital-marketing-company-mohali": {
    metaDescription: "Looking for a digital marketing company in Mohali? Webamazee combines SEO, websites, AI content and conversion strategy for IT, startup and service businesses.",
    keywords: ["digital marketing company in Mohali", "digital marketing in Mohali", "digital marketing agency Mohali", "SEO Mohali", "social media marketing Mohali", "Mohali", "India"],
  },
  "digital-marketing-company-new-zealand": {
    metaDescription: "Looking for a digital marketing company in New Zealand? Webamazee combines SEO, modern websites, content and conversion strategy for businesses across the country.",
    keywords: ["digital marketing company in New Zealand", "digital marketing in New Zealand", "digital marketing agency New Zealand", "SEO New Zealand", "social media marketing New Zealand", "New Zealand"],
  },
  "digital-marketing-company-panchkula": {
    metaDescription: "Looking for a digital marketing company in Panchkula? Webamazee combines SEO, websites, AI content and conversion strategy for retail, healthcare and professionals.",
    keywords: ["digital marketing company in Panchkula", "digital marketing in Panchkula", "digital marketing agency Panchkula", "SEO Panchkula", "social media marketing Panchkula", "Panchkula", "India"],
  },
  "digital-marketing-company-punjab": {
    metaDescription: "Looking for a digital marketing company in Punjab? Webamazee combines SEO, websites, AI content and conversion strategy for manufacturing, retail and healthcare.",
    keywords: ["digital marketing company in Punjab", "digital marketing in Punjab", "digital marketing agency Punjab", "SEO Punjab", "social media marketing Punjab", "Punjab", "India"],
  },
  "digital-marketing-company-uae": {
    metaDescription: "Looking for a digital marketing company in the UAE? Webamazee combines SEO, premium websites, content and conversion strategy for a competitive digital market.",
    keywords: ["digital marketing company in UAE", "digital marketing in United Arab Emirates", "digital marketing agency UAE", "SEO UAE", "social media marketing UAE", "UAE", "United Arab Emirates"],
  },
  "digital-marketing-company-uk": {
    metaDescription: "Looking for a digital marketing company in the UK? Webamazee combines SEO, a professional digital presence, content and conversion optimization for UK businesses.",
    keywords: ["digital marketing company in UK", "digital marketing in United Kingdom", "digital marketing agency UK", "SEO UK", "social media marketing UK", "UK", "United Kingdom"],
  },
  "digital-marketing-company-usa": {
    metaDescription: "Looking for a digital marketing company in the USA? Webamazee combines SEO, conversion-focused websites, content and scalable systems to help US businesses grow.",
    keywords: ["digital marketing company in USA", "digital marketing in United States", "digital marketing agency USA", "SEO USA", "social media marketing USA", "USA", "United States"],
  },
  "digital-marketing-company-zirakpur": {
    metaDescription: "Looking for a digital marketing company in Zirakpur? Webamazee connects SEO, websites, AI content and conversion strategy into one clear plan for the Tricity.",
    keywords: ["digital marketing company in Zirakpur", "digital marketing in Zirakpur", "digital marketing agency Zirakpur", "SEO Zirakpur", "social media marketing Zirakpur", "Zirakpur", "India"],
  },
  "seo-services-australia": {
    metaDescription: "Grow your online visibility with strategic SEO services in Australia - technical SEO, local SEO, content optimization and ranking growth for competitive markets.",
    keywords: ["SEO services in Australia", "SEO in Australia", "local SEO Australia", "technical SEO Australia", "SEO company Australia", "Australia"],
  },
  "seo-services-bathinda": {
    metaDescription: "Strategic SEO services in Bathinda - technical SEO, local SEO and content optimization for local products and service providers.",
    keywords: ["SEO services in Bathinda", "SEO in Bathinda", "local SEO Bathinda", "technical SEO Bathinda", "SEO company Bathinda", "Bathinda", "India"],
  },
  "seo-services-chandigarh": {
    metaDescription: "Strategic SEO services in Chandigarh - technical SEO, local SEO and content optimization for the searches customers in and around the city make first.",
    keywords: ["SEO services in Chandigarh", "SEO in Chandigarh", "local SEO Chandigarh", "technical SEO Chandigarh", "SEO company Chandigarh", "Chandigarh", "India"],
  },
  "seo-services-himachal-pradesh": {
    metaDescription: "Strategic SEO services in Himachal Pradesh - for tourism, hospitality and local businesses searched from Shimla to Dharamshala.",
    keywords: ["SEO services in Himachal Pradesh", "SEO in Himachal Pradesh", "local SEO Himachal Pradesh", "technical SEO Himachal Pradesh", "SEO company Himachal Pradesh", "Himachal Pradesh", "India"],
  },
  "seo-services-mohali": {
    metaDescription: "Strategic SEO services in Mohali - built for startups, IT companies and service businesses competing for the same searches.",
    keywords: ["SEO services in Mohali", "SEO in Mohali", "local SEO Mohali", "technical SEO Mohali", "SEO company Mohali", "Mohali", "India"],
  },
  "seo-services-new-zealand": {
    metaDescription: "Grow your online visibility with strategic SEO services in New Zealand - technical SEO, content optimization and ranking growth with transparent, ethical tactics.",
    keywords: ["SEO services in New Zealand", "SEO in New Zealand", "local SEO New Zealand", "technical SEO New Zealand", "SEO company New Zealand", "New Zealand"],
  },
  "seo-services-panchkula": {
    metaDescription: "Strategic SEO services in Panchkula - technical SEO, local SEO and content optimization for local services and professional practices.",
    keywords: ["SEO services in Panchkula", "SEO in Panchkula", "local SEO Panchkula", "technical SEO Panchkula", "SEO company Panchkula", "Panchkula", "India"],
  },
  "seo-services-punjab": {
    metaDescription: "Strategic SEO services in Punjab - technical SEO, content optimization and local visibility for businesses from Ludhiana to Amritsar.",
    keywords: ["SEO services in Punjab", "SEO in Punjab", "local SEO Punjab", "technical SEO Punjab", "SEO company Punjab", "Punjab", "India"],
  },
  "seo-services-uae": {
    metaDescription: "Grow your online visibility with strategic SEO services in the UAE - technical SEO, content optimization and ranking growth built for a competitive market.",
    keywords: ["SEO services in UAE", "SEO in United Arab Emirates", "local SEO UAE", "technical SEO UAE", "SEO company UAE", "UAE", "United Arab Emirates"],
  },
  "seo-services-united-kingdom": {
    metaDescription: "Grow your online visibility with strategic SEO services in the United Kingdom - technical SEO, local SEO and content optimization with a clear, ethical approach.",
    keywords: ["SEO services in UK", "SEO in United Kingdom", "local SEO UK", "technical SEO UK", "SEO company UK", "UK", "United Kingdom"],
  },
  "seo-services-united-states": {
    metaDescription: "Grow your online visibility with strategic SEO services in the United States - data-driven technical SEO, content and ranking growth in a crowded market.",
    keywords: ["SEO services in USA", "SEO in United States", "local SEO USA", "technical SEO USA", "SEO company USA", "USA", "United States"],
  },
  "seo-services-zirakpur": {
    metaDescription: "Grow your online visibility with strategic SEO services in Zirakpur - technical SEO, local SEO and content optimization to win nearby searches.",
    keywords: ["SEO services in Zirakpur", "SEO in Zirakpur", "local SEO Zirakpur", "technical SEO Zirakpur", "SEO company Zirakpur", "Zirakpur", "India"],
  },
  "web-designing-company-australia": {
    metaDescription: "Web design and website development for Australian businesses - fast, SEO-ready sites for services, retail and hospitality that build trust and win enquiries.",
    keywords: ["web designing company in Australia", "web design company Australia", "website development Australia", "custom website development Australia", "Australia"],
  },
  "web-designing-company-bathinda": {
    keywords: ["web designing company in Bathinda", "web design company Bathinda", "website development Bathinda", "custom website development Bathinda", "Bathinda", "India"],
  },
  "web-designing-company-chandigarh": {
    metaDescription: "Web design and development for Chandigarh's professional market - a clear, fast website that carries your business from first search result to final enquiry.",
    keywords: ["web design company Chandigarh", "website development Chandigarh", "web designing company in Chandigarh", "custom website development Chandigarh", "eCommerce website Chandigarh", "website redesign Chandigarh", "Chandigarh", "India"],
  },
  "web-designing-company-himachal-pradesh": {
    keywords: ["web designing company in Himachal Pradesh", "web design company Himachal Pradesh", "website development Himachal Pradesh", "custom website development Himachal Pradesh", "Himachal Pradesh", "India"],
  },
  "web-designing-company-mohali": {
    metaDescription: "Website design, development and e-commerce for Mohali's technology and B2B market - fast, clear sites that turn serious research into qualified enquiries.",
    keywords: ["web design company Mohali", "website development Mohali", "web designing company in Mohali", "custom website development Mohali", "eCommerce website Mohali", "website redesign Mohali", "Mohali", "India"],
  },
  "web-designing-company-new-zealand": {
    metaDescription: "Web design and website development for New Zealand businesses - clear, fast sites with useful information and a straightforward path from search to enquiry.",
    keywords: ["web design company New Zealand", "website development New Zealand", "web designing company in New Zealand", "custom website development New Zealand", "eCommerce website New Zealand", "website redesign New Zealand", "New Zealand"],
  },
  "web-designing-company-panchkula": {
    metaDescription: "Trustworthy web design and development for Panchkula - clear service information, strong local credibility and an easy path from first visit to enquiry.",
    keywords: ["web design company Panchkula", "website development Panchkula", "web designing company in Panchkula", "custom website development Panchkula", "eCommerce website Panchkula", "website redesign Panchkula", "Panchkula", "India"],
  },
  "web-designing-company-punjab": {
    keywords: ["web designing company in Punjab", "web design company Punjab", "website development Punjab", "custom website development Punjab", "Punjab", "India"],
  },
  "web-designing-company-uae": {
    metaDescription: "Web design and development for UAE businesses - premium, fast, multilingual-ready websites built for local, expatriate and international buyers.",
    keywords: ["web design company UAE", "website development UAE", "web designing company in UAE", "custom website development UAE", "eCommerce website UAE", "website redesign UAE", "UAE", "United Arab Emirates"],
  },
  "web-designing-company-united-kingdom": {
    metaDescription: "Web design and development for UK businesses - precise service information, transparent expectations and a straightforward path from search to enquiry.",
    keywords: ["web design company UK", "website development UK", "web designing company in UK", "custom website development UK", "eCommerce website UK", "website redesign UK", "UK", "United Kingdom"],
  },
  "web-designing-company-united-states": {
    metaDescription: "Web design and development for US businesses - focused, fast websites with the proof and clarity US buyers need to compare options and take the next step.",
    keywords: ["web design company USA", "website development USA", "web designing company in USA", "custom website development USA", "eCommerce website USA", "website redesign USA", "USA", "United States"],
  },
  "web-designing-company-zirakpur": {
    metaDescription: "Fast, mobile-first websites for Zirakpur and Tricity businesses - clear service pages and simple paths to call, WhatsApp or enquiry. Plan your build with Webamazee.",
    keywords: ["website designing company in Zirakpur", "web design company in Zirakpur", "website development company in Zirakpur", "web design Zirakpur", "website development Zirakpur", "Tricity web design"],
  },
};

/**
 * Apply the approved override for a location page (no-op when the slug has
 * no entry). Idempotent - safe to run more than once in the pipeline.
 */
export function applyApprovedLocationMeta<T extends LocationPage>(page: T): T {
  const override = locationMetaOverrides[page.slug];
  if (!override) return page;
  return {
    ...page,
    ...(override.metaDescription ? { metaDescription: override.metaDescription } : {}),
    keywords: override.keywords,
  } as T;
}
