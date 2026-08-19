export type Project = {
  slug: string;
  title: string;
  category: string;
  categories: string[];
  image: string;
  industry: string;
  country: string;
  year: string;
  url: string;
  client: string;
  outcome: string;
  summary: string;
  description: string;
  stack: string[];
  overview: string[];
  goals: string[];
  requirements: string[];
  challenges: { title: string; desc: string }[];
  solution: string[];
  solutionAreas: { title: string; desc: string }[];
  features: { title: string; desc: string }[];
  techStack: string[];
  process: { step: string; title: string; desc: string }[];
  seo: { title: string; desc: string }[];
  gallery: { label: string; device: "desktop" | "tablet" | "mobile"; alt: string }[];
  testimonial?: { quote: string; name: string; role: string; rating: number };
  faqs: { q: string; a: string }[];
  services: { slug: string; name: string }[];
};

const webBuildProcess = [
  { step: "01", title: "Discovery", desc: "We clarified the business, audience, offer and primary action the website needed to support." },
  { step: "02", title: "Structure", desc: "We mapped the pages, content hierarchy and user journeys before visual design began." },
  { step: "03", title: "UI and UX", desc: "We created responsive layouts that make the offer easy to understand and act on." },
  { step: "04", title: "Development", desc: "We built the website, connected its core functionality and prepared content for launch." },
  { step: "05", title: "Quality assurance", desc: "We tested navigation, forms, responsive behaviour and key customer journeys." },
  { step: "06", title: "Launch", desc: "We completed final checks, launched the website and handed over a maintainable experience." },
];

const seoFoundation = [
  { title: "Search friendly structure", desc: "Logical pages, headings and internal links help people and search engines understand the website." },
  { title: "Responsive delivery", desc: "Layouts adapt across phones, tablets and desktop screens." },
  { title: "Image handling", desc: "Website imagery is sized and delivered with performance in mind." },
  { title: "Clear metadata", desc: "Important pages have descriptive titles and summaries for search results." },
  { title: "Conversion paths", desc: "Calls to action connect organic visitors with the next useful step." },
  { title: "Measurement ready", desc: "The website can support analytics and search performance monitoring." },
];

export const projects: Project[] = [
  {
    slug: "kabir-oil-mill",
    title: "Kabir Oil Mill",
    category: "E-Commerce Development",
    categories: ["website-development", "wordpress", "ecommerce"],
    image: "/images/portfolio/kabir-oil-mill-live-homepage.webp",
    industry: "Food and Consumer Products",
    country: "India",
    year: "2025",
    url: "https://kabiroilmill.com/",
    client: "Kabir Oil Mill · India",
    outcome: "An online store that is receiving sales",
    summary: "A complete e-commerce website for an oil products business, developed by Webamazee from planning through launch.",
    description: "Kabir Oil Mill needed a clear online shopping experience for its oil products. Webamazee handled the website from start to finish, creating an e-commerce journey that now supports website sales.",
    stack: ["WordPress", "WooCommerce", "Elementor", "HTML", "CSS", "JavaScript"],
    overview: [
      "Kabir Oil Mill is an e-commerce business focused on oil products. The website needed to explain the product range clearly while giving customers a straightforward route from discovery to checkout.",
      "Webamazee managed the website development from start to finish. The completed store combines product discovery, product detail and purchasing in one responsive experience, and the client is now receiving sales through the website.",
    ],
    goals: ["Present the oil product range clearly", "Create a complete online shopping journey", "Build trust around the products and brand", "Make the store easy to use on mobile devices"],
    requirements: ["Product and category pages", "Shopping cart and checkout", "Responsive e-commerce design", "Simple product management", "Clear contact and customer support paths"],
    challenges: [
      { title: "Product clarity", desc: "Customers needed to understand the available oil products and choose the right option without confusion." },
      { title: "End-to-end commerce", desc: "The experience had to connect browsing, product detail, cart and checkout reliably." },
      { title: "Trust", desc: "The design and content needed to make a growing product brand feel credible." },
      { title: "Mobile shopping", desc: "The full purchase journey needed to remain simple on smaller screens." },
    ],
    solution: [
      "We planned the store around clear product discovery and a short path to purchase. Product presentation, navigation and calls to action were designed as one joined-up shopping experience.",
      "Webamazee completed the design and development, configured the e-commerce flow and tested the store across screen sizes before launch. The resulting website is now being used by customers to place orders.",
    ],
    solutionAreas: [
      { title: "Store architecture", desc: "A clear structure for products, categories and supporting information." },
      { title: "Product experience", desc: "Focused product pages with useful details and visible purchase actions." },
      { title: "Cart and checkout", desc: "A connected path from product selection to order completion." },
      { title: "Responsive UI", desc: "A shopping experience designed for desktop and mobile customers." },
      { title: "Content management", desc: "A practical setup for managing products and store content." },
      { title: "Launch support", desc: "Testing and launch checks across the core e-commerce journey." },
    ],
    features: [
      { title: "Product catalogue", desc: "Organised product browsing for the oil range." },
      { title: "Product detail pages", desc: "Dedicated pages that explain each item and support purchase decisions." },
      { title: "Shopping cart", desc: "A simple place to review selected products before checkout." },
      { title: "Checkout", desc: "An end-to-end order journey within the website." },
      { title: "Responsive design", desc: "Layouts adapted for mobile, tablet and desktop." },
      { title: "Store management", desc: "Tools for maintaining products and website content." },
    ],
    techStack: ["WordPress", "WooCommerce", "Elementor", "HTML5", "CSS3", "JavaScript"],
    process: webBuildProcess,
    seo: seoFoundation,
    gallery: [
      { label: "Live homepage", device: "desktop", alt: "Kabir Oil Mill live e-commerce homepage" },
      { label: "Product discovery", device: "desktop", alt: "Kabir Oil Mill online product browsing experience" },
      { label: "Store experience", device: "tablet", alt: "Kabir Oil Mill e-commerce website on a tablet" },
      { label: "Mobile shopping", device: "mobile", alt: "Kabir Oil Mill mobile shopping experience" },
    ],
    faqs: [
      { q: "What kind of website did Webamazee build for Kabir Oil Mill?", a: "We built a complete e-commerce website focused on selling the company's oil products online." },
      { q: "What work did Webamazee handle?", a: "Webamazee handled the website development from initial planning through design, development, testing and launch." },
      { q: "Can customers order products through the website?", a: "Yes. The website provides a complete shopping path and the client is receiving sales through it." },
      { q: "Does the website work on mobile devices?", a: "Yes. Product browsing, cart and checkout are designed to work across mobile, tablet and desktop screens." },
      { q: "How are products presented?", a: "Products are organised through clear catalogue and detail pages so customers can understand available options." },
      { q: "Was e-commerce functionality part of the project?", a: "Yes. Product management, cart and checkout were core parts of the website build." },
      { q: "Did the project include user experience design?", a: "Yes. The store was planned around a clear journey from product discovery to purchase." },
      { q: "Can the business manage store content?", a: "The website uses a content and commerce setup designed for ongoing product and content management." },
      { q: "Which Webamazee services are relevant to this project?", a: "The project relates to website development, e-commerce development and search-friendly website structure." },
      { q: "Where can I discuss a similar online store?", a: "You can contact Webamazee to discuss your products, required store features and launch plan." },
    ],
    services: [
      { slug: "ecommerce-development", name: "E-Commerce Development" },
      { slug: "website-development", name: "Website Development" },
    ],
  },
  {
    slug: "wellington-tours",
    title: "Wellington Tours",
    category: "Website Development",
    categories: ["website-development", "wordpress", "travel"],
    image: "/images/portfolio/wellington-tours-live-homepage.webp",
    industry: "Travel and Tourism",
    country: "New Zealand",
    year: "2025",
    url: "https://wellingtontour.co.nz/",
    client: "Wellington Tours · New Zealand",
    outcome: "A tour website that generates enquiries",
    summary: "A New Zealand travel website that presents tour packages clearly and helps prospective travellers make enquiries.",
    description: "Wellington Tours needed a practical digital home for its travel packages. Webamazee built an enquiry-focused website that helps visitors explore options and contact the business.",
    stack: ["WordPress", "Elementor", "HTML", "CSS", "JavaScript"],
    overview: [
      "Wellington Tours is a New Zealand travel and tours business. Its website needed to present different packages in a way that helps visitors compare experiences and decide what to enquire about.",
      "We created a responsive, enquiry-focused website with clear tour presentation and contact routes. The client is receiving enquiries through the website and the business is growing, without relying on inflated or unverified performance claims.",
    ],
    goals: ["Showcase travel and tour packages", "Make package information easy to explore", "Generate qualified travel enquiries", "Build confidence before a visitor gets in touch"],
    requirements: ["Clear tour navigation", "Package presentation pages", "Prominent enquiry actions", "Mobile-friendly travel content", "Easy content updates"],
    challenges: [
      { title: "Multiple packages", desc: "Visitors needed a clear way to understand and compare different tour options." },
      { title: "Travel inspiration", desc: "The website needed to be useful while still creating interest in the destination and experience." },
      { title: "Enquiry intent", desc: "Calls to action had to appear naturally where travellers were ready to ask a question." },
      { title: "Mobile planning", desc: "Tour research often happens on mobile, so content had to remain easy to scan." },
    ],
    solution: [
      "We structured the website around the questions travellers ask: what tours are available, what an experience includes and how to enquire. This made the package journey more direct.",
      "The visual design balances destination content with practical information. Clear enquiry points connect interested visitors with the business, and the website is now generating enquiries for the client.",
    ],
    solutionAreas: [
      { title: "Tour structure", desc: "A clear hierarchy for packages and travel information." },
      { title: "Destination-led design", desc: "Visual presentation that supports travel discovery." },
      { title: "Enquiry journey", desc: "Visible contact actions at useful decision points." },
      { title: "Responsive content", desc: "Readable package information across screen sizes." },
      { title: "Trust content", desc: "Business and service information that supports confidence." },
      { title: "Maintainable pages", desc: "A structure that can accommodate changing tour information." },
    ],
    features: [
      { title: "Tour package pages", desc: "Dedicated content for available travel options." },
      { title: "Enquiry calls to action", desc: "Clear prompts for visitors who want more information." },
      { title: "Destination content", desc: "Useful visual and written context for travellers." },
      { title: "Responsive navigation", desc: "Simple access to important pages on mobile and desktop." },
      { title: "Contact experience", desc: "Direct ways for prospective customers to reach the business." },
      { title: "Content management", desc: "A practical foundation for updating tour information." },
    ],
    techStack: ["WordPress", "Elementor", "HTML5", "CSS3", "JavaScript"],
    process: webBuildProcess,
    seo: seoFoundation,
    gallery: [
      { label: "Live homepage", device: "desktop", alt: "Wellington Tours live New Zealand homepage" },
      { label: "Tour packages", device: "desktop", alt: "Wellington Tours package browsing experience" },
      { label: "Travel content", device: "tablet", alt: "Wellington Tours travel content on tablet" },
      { label: "Mobile enquiries", device: "mobile", alt: "Wellington Tours mobile enquiry experience" },
    ],
    faqs: [
      { q: "What is Wellington Tours?", a: "Wellington Tours is a New Zealand travel business that presents travel and tour packages online." },
      { q: "What was the website designed to do?", a: "It was designed to explain available packages and generate enquiries from interested travellers." },
      { q: "Is the client receiving enquiries through the website?", a: "Yes. The website is generating enquiries for the client and supporting business growth." },
      { q: "How does the website organise tour information?", a: "Packages and supporting travel information are arranged in a clear structure for easier exploration." },
      { q: "Does the website support mobile visitors?", a: "Yes. The design is responsive so travellers can browse and enquire from different devices." },
      { q: "What services did Webamazee provide?", a: "The work covered website planning, UI and UX design, development, responsive testing and launch." },
      { q: "How does the website encourage enquiries?", a: "Relevant pages include clear contact prompts where a traveller may be ready to ask about a tour." },
      { q: "Was the website built for travel content?", a: "Yes. The design balances destination appeal with practical package information." },
      { q: "Which related services can travel businesses explore?", a: "Relevant services include website development, SEO, local SEO and landing page development." },
      { q: "Can Webamazee build another enquiry-focused travel website?", a: "Yes. We can plan a travel website around your destinations, packages and preferred enquiry process." },
    ],
    services: [
      { slug: "website-development", name: "Website Development" },
      { slug: "seo-services", name: "SEO Services" },
      { slug: "landing-page-development", name: "Landing Page Development" },
    ],
  },
  {
    slug: "shine-gold-tours-india",
    title: "Shine Gold Tours India",
    category: "Website Redesign",
    categories: ["website-redesign", "website-development", "travel"],
    image: "/images/portfolio/shine-gold-tours-india-live-homepage.webp",
    industry: "Travel and Tourism",
    country: "India",
    year: "2025",
    url: "https://shinegoldtoursindia.com/",
    client: "Shine Gold Tours India · India",
    outcome: "A redesigned website generating traffic and leads",
    summary: "A modern UI and UX redesign for an Indian travel company, created to improve destination discovery and lead generation.",
    description: "Webamazee redesigned Shine Gold Tours India's website with a more attractive, modern interface. After the redesign, the website began attracting traffic and generating leads.",
    stack: ["WordPress", "HTML", "CSS", "JavaScript", "Responsive UI"],
    overview: [
      "Shine Gold Tours India offers travel experiences across India. Its previous website needed a stronger visual hierarchy and a more inviting way for travellers to discover destinations and tour options.",
      "Webamazee redesigned the website with a modern UI and UX, clearer content organisation and stronger enquiry paths. Following the redesign, the website began attracting traffic and generating leads for the client.",
    ],
    goals: ["Modernise the travel website", "Make destinations and tours easier to explore", "Create a more attractive UI and UX", "Support traffic and lead generation"],
    requirements: ["Modern responsive redesign", "Clear destination and tour structure", "Improved visual storytelling", "Prominent enquiry routes", "Search-friendly page organisation"],
    challenges: [
      { title: "Outdated experience", desc: "The existing presentation did not reflect the quality and variety of the travel offer." },
      { title: "Content hierarchy", desc: "Destinations and tours needed clearer organisation so visitors could find useful information." },
      { title: "Visual storytelling", desc: "Travel imagery needed to support decisions rather than compete with navigation and content." },
      { title: "Lead journey", desc: "Interested travellers needed visible, contextual ways to make an enquiry." },
    ],
    solution: [
      "We redesigned the interface around destination discovery, clear tour categories and a consistent visual system. The result is more attractive while remaining practical to navigate.",
      "Enquiry actions were placed throughout the journey, and the responsive layouts make the website easier to use across devices. After the redesign, the website began attracting traffic and generating leads.",
    ],
    solutionAreas: [
      { title: "UI refresh", desc: "A modern visual system for the travel brand." },
      { title: "UX structure", desc: "Clearer organisation for destinations, tours and supporting information." },
      { title: "Travel storytelling", desc: "Imagery and copy arranged to support destination discovery." },
      { title: "Lead paths", desc: "Relevant enquiry actions across the browsing journey." },
      { title: "Responsive redesign", desc: "Improved layouts for mobile, tablet and desktop." },
      { title: "Search foundation", desc: "Logical page structure and content hierarchy for discoverability." },
    ],
    features: [
      { title: "Modern homepage", desc: "A refreshed first impression with clearer travel messaging." },
      { title: "Tour categories", desc: "Organised paths to different travel experiences." },
      { title: "Destination sections", desc: "Visual content that helps visitors explore India." },
      { title: "Enquiry forms", desc: "Direct opportunities for interested travellers to contact the business." },
      { title: "Responsive UI", desc: "A consistent experience across common screen sizes." },
      { title: "Search-friendly content", desc: "Structured destination and service information." },
    ],
    techStack: ["WordPress", "HTML5", "CSS3", "JavaScript", "Responsive UI"],
    process: [
      { step: "01", title: "Existing site review", desc: "We reviewed the previous experience, content and important visitor journeys." },
      { step: "02", title: "Content planning", desc: "We reorganised destinations, tour information and enquiry paths." },
      { step: "03", title: "UI and UX redesign", desc: "We created a modern interface with a clearer hierarchy and stronger travel storytelling." },
      { step: "04", title: "Development", desc: "We implemented responsive pages and integrated the updated content." },
      { step: "05", title: "Migration checks", desc: "We reviewed important routes, forms and content before launch." },
      { step: "06", title: "Launch", desc: "The redesigned website was launched after device and journey testing." },
    ],
    seo: seoFoundation,
    gallery: [
      { label: "Live redesigned homepage", device: "desktop", alt: "Shine Gold Tours India live redesigned homepage" },
      { label: "Tour discovery", device: "desktop", alt: "Shine Gold Tours India tour discovery experience" },
      { label: "Destination content", device: "tablet", alt: "Shine Gold Tours India destination content on tablet" },
      { label: "Mobile enquiries", device: "mobile", alt: "Shine Gold Tours India mobile enquiry experience" },
    ],
    faqs: [
      { q: "What did Webamazee do for Shine Gold Tours India?", a: "We redesigned the website with a more attractive, modern UI and UX." },
      { q: "What happened after the redesign?", a: "The website began attracting traffic and generating leads for the client." },
      { q: "Were exact traffic or lead figures claimed?", a: "No. This case study only states the outcome provided by the client and does not publish unverified percentages or totals." },
      { q: "How was tour discovery improved?", a: "Destinations and travel experiences were organised into clearer sections and browsing paths." },
      { q: "Does the redesigned website work on mobile?", a: "Yes. The updated layouts are responsive across mobile, tablet and desktop screens." },
      { q: "How does the website generate enquiries?", a: "Contextual calls to action and enquiry forms give interested travellers direct ways to get in touch." },
      { q: "Did the redesign include visual changes?", a: "Yes. Typography, spacing, imagery and content hierarchy were refreshed as one consistent interface." },
      { q: "Was search visibility considered?", a: "The redesign uses logical page and content structure to support discoverability." },
      { q: "Which Webamazee services relate to this work?", a: "Website redesign, website development and SEO services are relevant to this project." },
      { q: "Can Webamazee redesign another travel website?", a: "Yes. We can review an existing travel website and plan a redesign around its content, users and enquiry goals." },
    ],
    services: [
      { slug: "website-redesign", name: "Website Redesign" },
      { slug: "website-development", name: "Website Development" },
      { slug: "seo-services", name: "SEO Services" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(slug: string, count = 3): Project[] {
  return projects.filter((project) => project.slug !== slug).slice(0, count);
}

export function getAllProjects(): Project[] {
  return projects;
}
