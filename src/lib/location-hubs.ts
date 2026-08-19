import type { Metadata } from "next";
import { generateMetadata } from "./metadata";
import { breadcrumbSchema, faqSchema } from "./schema";
import { absoluteUrl } from "./seo";
import { site } from "./site";

export type LocationHubService = {
  name: string;
  description: string;
  cta: string;
  href: string;
};

export type LocationHub = {
  slug: string;
  location: string;
  country: string;
  title: string;
  metaDescription: string;
  h1: string;
  heroText: string;
  intro: string[];
  needs: { title: string; desc: string }[];
  services: LocationHubService[];
  industries: { name: string; desc: string; href?: string }[];
  projects: { name: string; summary: string; href: string }[];
  collaboration: string;
  seoFocus: string;
  ecommerceFocus: string;
  faqs: { q: string; a: string }[];
};

type HubSeed = Omit<LocationHub, "services" | "projects" | "faqs"> & {
  routes: { web: string; seo: string; digital: string; ai: string };
};

const projects = {
  kabir: { name: "Kabir Oil Mill", summary: "A complete e-commerce website built around clear product discovery and online ordering.", href: "/work/kabir-oil-mill" },
  wellington: { name: "Wellington Tours", summary: "A New Zealand travel website structured around tour packages and customer enquiries.", href: "/work/wellington-tours" },
  shine: { name: "Shine Gold Tours India", summary: "A travel website redesign focused on clearer information, modern UI and lead generation.", href: "/work/shine-gold-tours-india" },
};

function services(seed: HubSeed): LocationHubService[] {
  return [
    { name: `Web Designing Company in ${seed.location}`, description: `Plan and build a fast, responsive website around the way customers in ${seed.location} evaluate the business.`, cta: "Explore Web Design", href: seed.routes.web },
    { name: `SEO Company in ${seed.location}`, description: `Improve technical foundations, content relevance and organic visibility for searches that matter in ${seed.location}.`, cta: "Explore SEO Services", href: seed.routes.seo },
    { name: `Digital Marketing Company in ${seed.location}`, description: `Connect website, search, content and measurement through a focused digital growth plan for ${seed.location}.`, cta: "Explore Digital Marketing", href: seed.routes.digital },
    { name: `AI Marketing Company in ${seed.location}`, description: `Use AI-assisted research and analysis with human strategy, editing and quality control for the ${seed.location} market.`, cta: "Explore AI Marketing", href: seed.routes.ai },
  ];
}

function faqs(seed: HubSeed): { q: string; a: string }[] {
  return [
    { q: `What services does Webamazee provide in ${seed.location}?`, a: `Webamazee provides website development, SEO, digital marketing and human-led AI marketing for businesses serving ${seed.location}.` },
    { q: `Which service should a ${seed.location} business start with?`, a: "That depends on the current bottleneck. A weak website may need design or development first, while an established site may benefit from SEO or a focused marketing plan." },
    { q: `How much do digital services in ${seed.location} cost?`, a: "Cost depends on scope, existing assets, required pages, integrations and ongoing marketing needs. We provide a written proposal after clarifying priorities." },
    { q: `How long does a website project for ${seed.location} take?`, a: "Timing depends on page count, functionality, content readiness and review speed. The project schedule is agreed after discovery." },
    { q: `Can Webamazee improve an existing ${seed.location} website?`, a: "Yes. We can review the current user experience, technical health, content and search visibility before recommending a redesign or targeted improvements." },
    { q: `What SEO considerations matter in ${seed.location}?`, a: seed.seoFocus },
    { q: `Can you build an e-commerce website for the ${seed.location} market?`, a: seed.ecommerceFocus },
    { q: `How does remote collaboration work with ${seed.location} businesses?`, a: seed.collaboration },
    { q: "Can website development and digital marketing be planned together?", a: "Yes. Planning them together can align page structure, search intent, campaign landing pages and conversion measurement from the beginning." },
    { q: "Do you guarantee rankings, leads or sales?", a: "No. We provide a transparent strategy and professional implementation, but outcomes also depend on the offer, market, competition and ongoing execution." },
  ];
}

const seeds: HubSeed[] = [
  {
    slug: "services-in-zirakpur", location: "Zirakpur", country: "India",
    title: "Digital Marketing & Web Development Services in Zirakpur",
    metaDescription: "Explore Webamazee services in Zirakpur: web design, website development, SEO, digital marketing and AI marketing for businesses across the Tricity.",
    h1: "Digital Marketing & Web Development Services in Zirakpur",
    heroText: "A practical digital growth hub for Zirakpur businesses competing for attention across the connected Chandigarh Tricity market.",
    intro: ["Zirakpur businesses often serve customers moving between Zirakpur, Chandigarh, Mohali and Panchkula. A useful digital presence must establish local relevance while making services, products and contact options clear on mobile.", "This hub connects Webamazee's web design, SEO, digital marketing and AI marketing services for the Zirakpur market, so you can choose the right starting point without navigating unrelated offers."],
    needs: [
      { title: "Tricity competition", desc: "Customers can compare nearby providers quickly, making clear positioning and proof essential." },
      { title: "Mobile discovery", desc: "Local searches need fast pages, direct contact paths and readable service information." },
      { title: "Local visibility", desc: "Factual area context and useful service pages support discovery without repetitive doorway copy." },
      { title: "Retail and growth", desc: "Product and service businesses need a foundation that can support both local enquiries and wider sales." },
    ],
    industries: [
      { name: "Local Business", desc: "Service and enquiry journeys for businesses serving the Tricity.", href: "/seo-for-local-business" },
      { name: "E-commerce", desc: "Online shopping for retailers and product businesses.", href: "/seo-for-ecommerce" },
      { name: "Professional Services", desc: "Credibility-led websites for consultants and specialist practices.", href: "/seo-for-professional-services" },
      { name: "Healthcare", desc: "Clear information for clinics and providers.", href: "/seo-for-healthcare" },
      { name: "Travel and Tourism", desc: "Package discovery and enquiry experiences.", href: "/seo-for-tourism" },
      { name: "Home and Property Services", desc: "Mobile-first journeys for local property and household needs." },
    ],
    collaboration: "We use scheduled calls, written updates and clear review stages, so the project can progress without frequent in-person meetings.",
    seoFocus: "Useful service pages, factual Tricity coverage, mobile performance and consistent business information are important foundations.",
    ecommerceFocus: "Yes. We can plan product structure, responsive shopping, checkout and store management around the business requirements.",
    routes: { web: "/web-designing-company-zirakpur", seo: "/seo-services-zirakpur", digital: "/digital-marketing-company-zirakpur", ai: "/ai-marketing-company-zirakpur" },
  },
  {
    slug: "services-in-chandigarh", location: "Chandigarh", country: "India",
    title: "Digital Marketing & Web Development Services in Chandigarh",
    metaDescription: "Web design, SEO, digital marketing and AI marketing services for Chandigarh businesses that need a credible, search-ready digital presence.",
    h1: "Digital Marketing & Web Development Services in Chandigarh",
    heroText: "Build a credible digital journey for Chandigarh's competitive professional, technology and consumer markets.",
    intro: ["Chandigarh organisations often need to reach both city-based customers and the wider Tricity. Professional presentation matters, but so do clear service details, useful search content and direct enquiry paths.", "This service hub brings together Webamazee's location-specific website, SEO and marketing options for Chandigarh businesses planning a launch, redesign or sustained growth programme."],
    needs: [
      { title: "Professional expectations", desc: "Buyers compare expertise, proof and service clarity before contacting a provider." },
      { title: "Regional reach", desc: "The website may need to explain Chandigarh relevance alongside wider Tricity coverage." },
      { title: "Campaign readiness", desc: "New services and campaigns benefit from focused landing pages and reliable measurement." },
      { title: "Search foundations", desc: "Technical structure and helpful content should support visibility from launch." },
    ],
    industries: [
      { name: "Professional Services", desc: "Authority and enquiry journeys for specialist firms.", href: "/seo-for-professional-services" },
      { name: "Healthcare", desc: "Accessible service content for clinics and providers.", href: "/seo-for-healthcare" },
      { name: "SaaS", desc: "Product, feature and educational journeys for software companies.", href: "/seo-for-saas" },
      { name: "E-commerce", desc: "Product discovery and shopping experiences.", href: "/seo-for-ecommerce" },
      { name: "Travel and Tourism", desc: "Destination and package enquiry journeys.", href: "/seo-for-tourism" },
      { name: "Local Business", desc: "Search-ready pages for Chandigarh service providers.", href: "/seo-for-local-business" },
    ],
    collaboration: "Defined milestones and shared reviews support collaboration with founders, marketing teams and other stakeholders.",
    seoFocus: "A clear service hierarchy, regional internal links, useful expertise content and sound technical delivery help support Chandigarh search intent.",
    ecommerceFocus: "Yes. Store design can be connected with product SEO, campaign landing pages and measurement from the outset.",
    routes: { web: "/web-designing-company-chandigarh", seo: "/seo-services-chandigarh", digital: "/digital-marketing-company-chandigarh", ai: "/ai-marketing-company-chandigarh" },
  },
  {
    slug: "services-in-mohali", location: "Mohali", country: "India",
    title: "Digital Marketing & Web Development Services in Mohali",
    metaDescription: "Explore website development, SEO, digital marketing and AI marketing services for Mohali technology, B2B and service businesses.",
    h1: "Digital Marketing & Web Development Services in Mohali",
    heroText: "Digital services for Mohali technology, B2B and service companies that need to explain complex value and generate qualified enquiries.",
    intro: ["Mohali's technology and business ecosystem creates strong expectations for performance, clarity and scalable content. Buyers may review product detail, expertise and proof over several visits before taking action.", "This hub connects the location-specific services Webamazee offers to Mohali businesses, from a new website foundation to ongoing SEO and AI-assisted marketing workflows."],
    needs: [
      { title: "Technical clarity", desc: "Complex services and products need to be understandable to decision-makers." },
      { title: "Longer B2B journeys", desc: "Feature, process and proof pages support research before an enquiry." },
      { title: "Scalable architecture", desc: "Growing teams need room for new services, sectors and product content." },
      { title: "Qualified demand", desc: "Search and campaigns should focus on relevant opportunities, not traffic alone." },
    ],
    industries: [
      { name: "SaaS", desc: "Product and comparison content for software buyers.", href: "/seo-for-saas" },
      { name: "Professional Services", desc: "Credibility-led B2B websites.", href: "/seo-for-professional-services" },
      { name: "E-commerce", desc: "Maintainable stores for product brands.", href: "/seo-for-ecommerce" },
      { name: "Healthcare", desc: "Clear patient and service information.", href: "/seo-for-healthcare" },
      { name: "Local Business", desc: "Visibility for businesses serving Mohali and the Tricity.", href: "/seo-for-local-business" },
      { name: "Education", desc: "Programme and admissions information for institutes." },
    ],
    collaboration: "Structured reviews work with founders, technical teams and marketers while keeping responsibilities and approvals clear.",
    seoFocus: "Commercial service pages, technical performance and content across the buyer journey are especially useful for Mohali B2B and technology companies.",
    ecommerceFocus: "Yes. We can build a maintainable store and connect it with product content, technical SEO and campaign measurement.",
    routes: { web: "/web-designing-company-mohali", seo: "/seo-services-mohali", digital: "/digital-marketing-company-mohali", ai: "/ai-marketing-company-mohali" },
  },
  {
    slug: "services-in-panchkula", location: "Panchkula", country: "India",
    title: "Digital Marketing & Web Development Services in Panchkula",
    metaDescription: "Web design, SEO, digital marketing and AI marketing services for Panchkula businesses focused on trust, local visibility and enquiries.",
    h1: "Digital Marketing & Web Development Services in Panchkula",
    heroText: "Strengthen trust, local visibility and customer journeys for a Panchkula business with connected website and marketing services.",
    intro: ["Panchkula customers often choose healthcare, professional and local services after comparing reputation, practical information and ease of contact. Established businesses may also need a modern website without discarding useful content.", "This hub helps Panchkula businesses move from that need to the right Webamazee service, whether the priority is a redesign, SEO, digital marketing or AI-supported content work."],
    needs: [
      { title: "Trust before contact", desc: "Credentials, services and FAQs need to reduce uncertainty before an appointment or enquiry." },
      { title: "Local search", desc: "Useful area context and accurate information support customers looking nearby." },
      { title: "Careful redesign", desc: "Established websites need migration planning for useful URLs and search signals." },
      { title: "Mobile action", desc: "Calls, forms and appointment paths must remain clear on smaller screens." },
    ],
    industries: [
      { name: "Healthcare", desc: "Accessible websites for clinics and specialists.", href: "/seo-for-healthcare" },
      { name: "Professional Services", desc: "Trust and enquiry journeys for practices and consultants.", href: "/seo-for-professional-services" },
      { name: "Local Business", desc: "Service visibility for Panchkula companies.", href: "/seo-for-local-business" },
      { name: "E-commerce", desc: "Online selling for retailers and brands.", href: "/seo-for-ecommerce" },
      { name: "Travel and Tourism", desc: "Tour and package discovery.", href: "/seo-for-tourism" },
      { name: "Education", desc: "Clear programme information for institutes." },
    ],
    collaboration: "The project uses discovery, shared content reviews and defined approvals so established teams can modernise without unnecessary disruption.",
    seoFocus: "Local relevance, trustworthy service detail, mobile usability and a careful redirect plan are important for Panchkula service businesses.",
    ecommerceFocus: "Yes. We can plan an online store for local and wider customers, including product structure and a responsive purchase path.",
    routes: { web: "/web-designing-company-panchkula", seo: "/seo-services-panchkula", digital: "/digital-marketing-company-panchkula", ai: "/ai-marketing-company-panchkula" },
  },
  {
    slug: "services-in-new-zealand", location: "New Zealand", country: "New Zealand",
    title: "Digital Marketing & Web Development Services in New Zealand",
    metaDescription: "Website development, SEO, digital marketing and AI marketing services for New Zealand tourism, technology and service businesses.",
    h1: "Digital Marketing & Web Development Services in New Zealand",
    heroText: "Reach regional, nationwide and tourism audiences with a clear, accessible website and an honest New Zealand market strategy.",
    intro: ["New Zealand businesses may serve a local community, several regions or an international travel audience. The website needs to state that scope accurately while remaining fast and useful across devices.", "This hub connects Webamazee's New Zealand service pages and highlights the different roles website development, SEO, digital marketing and AI-assisted workflows can play."],
    needs: [
      { title: "Market scope", desc: "Local, regional and nationwide coverage require different page structures." },
      { title: "Tourism discovery", desc: "Inspiration must connect with packages, practical information and enquiries." },
      { title: "Accessible delivery", desc: "Readable, responsive pages support varied devices and connection conditions." },
      { title: "Remote trust", desc: "Clear process and proof matter when teams and customers are distributed." },
    ],
    industries: [
      { name: "Travel and Tourism", desc: "Destination and tour enquiry experiences.", href: "/seo-for-tourism" },
      { name: "SaaS", desc: "Product and educational content for technology companies.", href: "/seo-for-saas" },
      { name: "Professional Services", desc: "Credibility for firms serving regional or national clients.", href: "/seo-for-professional-services" },
      { name: "E-commerce", desc: "Online stores for New Zealand product brands.", href: "/seo-for-ecommerce" },
      { name: "Healthcare", desc: "Accessible information for providers.", href: "/seo-for-healthcare" },
      { name: "Local Business", desc: "Useful local service pages.", href: "/seo-for-local-business" },
    ],
    collaboration: "We coordinate across time zones through scheduled calls, written updates and clear review deadlines.",
    seoFocus: "Market scope, regional relevance, useful tourism or service content and technical accessibility should be represented without false office claims.",
    ecommerceFocus: "Yes. We can build responsive product and checkout journeys for businesses selling within New Zealand or to wider markets.",
    routes: { web: "/web-designing-company-new-zealand", seo: "/seo-services-new-zealand", digital: "/digital-marketing-company-new-zealand", ai: "/ai-marketing-company-new-zealand" },
  },
  {
    slug: "services-in-uae", location: "UAE", country: "AE",
    title: "Digital Marketing & Web Development Services in the UAE",
    metaDescription: "Premium web development, SEO, digital marketing and AI marketing services for UAE businesses serving diverse local and international audiences.",
    h1: "Digital Marketing & Web Development Services in the UAE",
    heroText: "Create a premium, mobile-first digital foundation for the UAE's diverse local, expatriate and international audiences.",
    intro: ["UAE businesses frequently communicate with customers from different backgrounds and levels of market familiarity. Premium design helps, but the website must still explain the offer and make contact straightforward.", "This UAE service hub links Webamazee's website, SEO, digital marketing and AI marketing pages so businesses can choose a focused route without implying a physical Webamazee office in the market."],
    needs: [
      { title: "Diverse audiences", desc: "Content needs to work for local, expatriate and international buyers." },
      { title: "Premium clarity", desc: "Strong visual presentation must support, not hide, practical service information." },
      { title: "Mobile contact", desc: "Fast forms, calls and messaging routes support customers ready to act." },
      { title: "Multi-market growth", desc: "The architecture may need to support the UAE alongside other countries." },
    ],
    industries: [
      { name: "E-commerce", desc: "Premium product presentation and shopping journeys.", href: "/seo-for-ecommerce" },
      { name: "Professional Services", desc: "Authority for consultants and specialist firms.", href: "/seo-for-professional-services" },
      { name: "SaaS", desc: "Product pages for regional and international buyers.", href: "/seo-for-saas" },
      { name: "Travel and Tourism", desc: "Experience and destination enquiries.", href: "/seo-for-tourism" },
      { name: "Healthcare", desc: "Accessible information for diverse audiences.", href: "/seo-for-healthcare" },
      { name: "Local Business", desc: "Useful pages for businesses with a genuine UAE footprint.", href: "/seo-for-local-business" },
    ],
    collaboration: "Remote discovery, written decisions and staged approvals support UAE teams while keeping ownership clear.",
    seoFocus: "Service and market pages should reflect genuine availability, search intent and audience language without manufacturing offices or coverage.",
    ecommerceFocus: "Yes. We can connect premium storefront design with product structure, checkout and search-ready content.",
    routes: { web: "/web-designing-company-uae", seo: "/seo-services-uae", digital: "/digital-marketing-company-uae", ai: "/ai-marketing-company-uae" },
  },
  {
    slug: "services-in-usa", location: "USA", country: "US",
    title: "Digital Marketing & Web Development Services in the USA",
    metaDescription: "Focused web development, SEO, digital marketing and AI marketing services for US businesses competing across regional and national markets.",
    h1: "Digital Marketing & Web Development Services in the USA",
    heroText: "Compete with clearer positioning, stronger proof and connected website and marketing services for US buyers.",
    intro: ["US buyers often have many alternatives and expect specific information before they contact a provider. Broad claims are less useful than a clear audience, offer, proof and next step.", "This hub brings together Webamazee's location-specific pages for US website development, SEO, digital marketing and AI-assisted marketing without claiming a local office."],
    needs: [
      { title: "Competitive positioning", desc: "Pages need a specific reason for the intended audience to choose the business." },
      { title: "Regional scope", desc: "Service coverage should reflect genuine operations across states or nationwide." },
      { title: "Proof-led decisions", desc: "Case studies and process detail help buyers evaluate risk." },
      { title: "Conversion clarity", desc: "Each commercial page should support one appropriate next action." },
    ],
    industries: [
      { name: "SaaS", desc: "Feature, solution and comparison pages.", href: "/seo-for-saas" },
      { name: "E-commerce", desc: "Scalable product discovery and shopping.", href: "/seo-for-ecommerce" },
      { name: "Professional Services", desc: "Authority-led websites for specialist firms.", href: "/seo-for-professional-services" },
      { name: "Healthcare", desc: "Accessible provider information.", href: "/seo-for-healthcare" },
      { name: "Travel and Tourism", desc: "Destination and package enquiries.", href: "/seo-for-tourism" },
      { name: "Local Business", desc: "Service-area content for genuine local operations.", href: "/seo-for-local-business" },
    ],
    collaboration: "Asynchronous updates, scheduled reviews and documented approvals keep work moving across US time zones.",
    seoFocus: "Specific commercial intent, genuine regional coverage, proof and useful internal links matter more than interchangeable city pages.",
    ecommerceFocus: "Yes. We can plan a scalable storefront around the catalogue, customer journey and operational requirements.",
    routes: { web: "/web-designing-company-united-states", seo: "/seo-services-united-states", digital: "/digital-marketing-company-usa", ai: "/ai-marketing-company-usa" },
  },
  {
    slug: "services-in-uk", location: "UK", country: "GB",
    title: "Digital Marketing & Web Development Services in the UK",
    metaDescription: "Clear, credible web development, SEO, digital marketing and AI marketing services for UK professional, technology and e-commerce businesses.",
    h1: "Digital Marketing & Web Development Services in the UK",
    heroText: "Give UK customers precise service information, credible proof and a straightforward route from search to enquiry.",
    intro: ["UK businesses may compete locally, regionally or nationwide. The website should make that scope clear while providing transparent service information and preserving useful search assets during redesigns.", "This UK service hub connects Webamazee's existing web design, SEO, digital marketing and AI marketing pages for businesses choosing their next digital priority."],
    needs: [
      { title: "Clear scope", desc: "Customers need to know what is included, who it suits and where it is available." },
      { title: "Regional relevance", desc: "Local and UK-wide providers require different content architecture." },
      { title: "Professional trust", desc: "Useful detail and proof improve enquiry quality." },
      { title: "Migration care", desc: "Established sites need URL and content planning before redesign." },
    ],
    industries: [
      { name: "Professional Services", desc: "Authority and lead journeys for firms.", href: "/seo-for-professional-services" },
      { name: "SaaS", desc: "Product and comparison content for software buyers.", href: "/seo-for-saas" },
      { name: "E-commerce", desc: "Product-led online shopping.", href: "/seo-for-ecommerce" },
      { name: "Healthcare", desc: "Accessible service information.", href: "/seo-for-healthcare" },
      { name: "Travel and Tourism", desc: "Destination and package journeys.", href: "/seo-for-tourism" },
      { name: "Local Business", desc: "Search-focused sites for genuine service areas.", href: "/seo-for-local-business" },
    ],
    collaboration: "Time-zone overlap, planned reviews and written updates provide a practical workflow with UK teams.",
    seoFocus: "Regional versus nationwide intent, transparent scope and preservation of established URLs are key considerations.",
    ecommerceFocus: "Yes. We can build a clear UK-facing store and connect product content, technical SEO and conversion measurement.",
    routes: { web: "/web-designing-company-united-kingdom", seo: "/seo-services-united-kingdom", digital: "/digital-marketing-company-uk", ai: "/ai-marketing-company-uk" },
  },
];

export const locationHubs: LocationHub[] = seeds.map((seed) => ({
  ...seed,
  services: services(seed),
  projects: seed.slug === "services-in-new-zealand" ? [projects.wellington, projects.shine, projects.kabir] : seed.slug === "services-in-uae" ? [projects.shine, projects.kabir, projects.wellington] : [projects.kabir, projects.wellington, projects.shine],
  faqs: faqs(seed),
}));

export function getLocationHub(slug: string): LocationHub | undefined {
  return locationHubs.find((hub) => hub.slug === slug);
}

const hubByLocation: Record<string, string> = {
  Zirakpur: "/services-in-zirakpur",
  Chandigarh: "/services-in-chandigarh",
  Mohali: "/services-in-mohali",
  Panchkula: "/services-in-panchkula",
  "New Zealand": "/services-in-new-zealand",
  UAE: "/services-in-uae",
  "United Arab Emirates": "/services-in-uae",
  USA: "/services-in-usa",
  "United States": "/services-in-usa",
  UK: "/services-in-uk",
  "United Kingdom": "/services-in-uk",
};

export function locationHubHref(location: string): string | undefined {
  return hubByLocation[location];
}

export function locationHubMetadata(hub: LocationHub): Metadata {
  return generateMetadata({
    title: hub.title,
    metaTitle: hub.title,
    metaDescription: hub.metaDescription,
    canonical: `/${hub.slug}`,
    path: `/${hub.slug}`,
    keywords: [`services in ${hub.location}`, `web development ${hub.location}`, `SEO ${hub.location}`, `digital marketing ${hub.location}`],
    schemaType: "website",
    category: "Location Services",
  });
}

export function locationHubSchema(hub: LocationHub): Record<string, unknown>[] {
  const url = absoluteUrl(`/${hub.slug}`);
  return [
    breadcrumbSchema([{ label: "Services", href: "/services" }, { label: hub.location }], `/${hub.slug}`),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#services`,
      name: hub.h1,
      description: hub.metaDescription,
      url,
      provider: { "@id": `${site.url}/#organization` },
      areaServed: { "@type": "Place", name: hub.location },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `Webamazee services in ${hub.location}`,
        itemListElement: hub.services.map((service) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: service.name, url: absoluteUrl(service.href) } })),
      },
    },
    faqSchema(hub.faqs),
  ];
}
