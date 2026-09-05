export type CaseStudy = {
  slug: string;
  name: string;
  image: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  tag: string;
  service: string;
  summary: string;
  industry: string;
  country: string;
  projectType: string;
  completion: string;
  liveUrl?: string;
  overviewClient: string[];
  overviewBusiness: string;
  objectives: string[];
  scope: string;
  timeline: string;
  team: string;
  exec: { challenge: string; solution: string; outcome: string };
  before: string[];
  challenges: { title: string; desc: string }[];
  discovery: { title: string; desc: string }[];
  design: { title: string; desc: string }[];
  development: { title: string; desc: string }[];
  features: { title: string; desc: string }[];
  gallery: { label: string; device: "desktop" | "tablet" | "mobile"; alt: string }[];
  beforeAfter: { title: string; description: string; improvementTag?: string; variant: "homepage" | "service" | "product" | "mobile" | "booking" | "landing"; aspect?: string }[];
  seo: { title: string; desc: string }[];
  outcomes: string[];
  techStack: string[];
  services: { slug: string; name: string }[];
  related: string[];
  faqs: { q: string; a: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "kabiroilmill",
    name: "Kabir Oil Mill",
    image: "/images/portfolio/kabir-oil-mill-live-homepage.webp",
    title: "How Webamazee Built a Digital E-commerce Store for Kabir Oil Mill",
    metaTitle: "Kabir Oil Mill E-commerce Website Case Study",
    metaDescription: "See how Webamazee planned and developed Kabir Oil Mill's responsive e-commerce website, product experience and digital ordering journey.",
    tag: "E-commerce",
    service: "E-commerce Website Development",
    summary: "A complete e-commerce website that gave Kabir Oil Mill a professional online storefront for product discovery and digital orders.",
    industry: "E-commerce",
    country: "India",
    projectType: "E-commerce website development",
    completion: "2025",
    liveUrl: "https://kabiroilmill.com/",
    overviewClient: [
      "Kabir Oil Mill is an oil business that needed a stronger digital presence to showcase its products and make it easier for customers to discover and purchase them online.",
      "Before the project, the existing digital presence was not effectively supporting online product discovery and sales. The business needed a professional storefront that could represent the brand, organise the range and create a practical route to purchase.",
    ],
    overviewBusiness: "An oil products business moving from primarily traditional discovery toward a dedicated online storefront and stronger digital sales channel.",
    objectives: ["Create a complete online storefront", "Present oil products and categories clearly", "Make the buying journey easier", "Support online orders", "Build a responsive, search-friendly foundation"],
    scope: "Strategy, information architecture, UI and UX design, e-commerce development, responsive implementation, product presentation, testing and launch.",
    timeline: "A complete website engagement from discovery and structure through development, testing and launch.",
    team: "Webamazee strategy, design and development support working with the client throughout the project.",
    exec: {
      challenge: "Customers had limited ability to discover the range online, and the business lacked a professional e-commerce storefront capable of supporting a clear purchase journey.",
      solution: "Webamazee handled the project from start to finish, creating a mobile-friendly store with organised products, clear calls to action, trust-building content and an SEO-ready structure.",
      outcome: "Kabir Oil Mill gained a dedicated digital storefront, a stronger market presence and a website through which the business began receiving orders.",
    },
    before: ["The business relied heavily on traditional and offline discovery, while its existing digital presence did not provide customers with a complete place to browse the oil range.", "Without a strong storefront, product presentation and ordering were disconnected. Customers needed a clearer digital channel that could build trust and support a purchase."],
    challenges: [
      { title: "Limited product discovery", desc: "The digital presence did not make the oil range easy to find and understand." },
      { title: "No strong storefront", desc: "The brand needed a professional e-commerce experience rather than a basic online presence." },
      { title: "Unclear buying journey", desc: "Customers needed a simpler route from browsing products to placing an order." },
      { title: "Competitive presentation", desc: "The website needed to build trust and represent the quality of the business online." },
    ],
    discovery: [
      { title: "Business and product review", desc: "We clarified the product range, audience and role the website needed to play in sales." },
      { title: "Customer journey mapping", desc: "We mapped product discovery, detail, cart and checkout as one connected experience." },
      { title: "Catalogue planning", desc: "Products and categories were organised to make browsing more understandable." },
      { title: "Trust requirements", desc: "We identified the information customers need before feeling confident enough to order." },
    ],
    design: [
      { title: "Conversion-focused layout", desc: "Pages guide visitors toward product detail and purchase actions without unnecessary friction." },
      { title: "Product-first presentation", desc: "Imagery, names, prices and supporting information keep the range central." },
      { title: "Responsive interface", desc: "The shopping journey adapts across mobile, tablet and desktop screens." },
      { title: "Brand credibility", desc: "Consistent typography, spacing and calls to action create a more professional presence." },
    ],
    development: [
      { title: "E-commerce build", desc: "We implemented catalogue, product, cart and checkout functionality." },
      { title: "Content integration", desc: "Product and business information was structured within the new storefront." },
      { title: "Mobile testing", desc: "Important shopping actions were tested across common screen sizes." },
      { title: "SEO-ready structure", desc: "Headings, metadata foundations, internal links and image handling support discoverability." },
      { title: "Quality assurance", desc: "Navigation and the end-to-end purchase journey were reviewed before launch." },
      { title: "Launch", desc: "The website was prepared and released as the business's dedicated online store." },
    ],
    features: [
      { title: "Product catalogue", desc: "A clear place to browse the oil product range." },
      { title: "Product detail pages", desc: "Focused information and visible purchase actions for each product." },
      { title: "Cart and checkout", desc: "A connected route from product selection to online order." },
      { title: "Mobile shopping", desc: "Responsive controls and layouts for customers using phones." },
      { title: "Trust content", desc: "Business and product information that supports purchase confidence." },
      { title: "Clear calls to action", desc: "Consistent next steps throughout product discovery." },
      { title: "Search-friendly hierarchy", desc: "Logical headings, categories and internal links." },
      { title: "Manageable storefront", desc: "A practical foundation for maintaining products and content." },
    ],
    gallery: [
      { label: "Live storefront", device: "desktop", alt: "Kabir Oil Mill live e-commerce storefront" },
      { label: "Product presentation", device: "desktop", alt: "Kabir Oil Mill product presentation" },
      { label: "Responsive store", device: "tablet", alt: "Kabir Oil Mill responsive e-commerce website" },
      { label: "Mobile shopping", device: "mobile", alt: "Kabir Oil Mill mobile shopping experience" },
    ],
    beforeAfter: [],
    seo: [
      { title: "Catalogue hierarchy", desc: "Categories and products use a logical structure for customers and search engines." },
      { title: "On-page foundations", desc: "Headings, metadata and internal links were considered during development." },
      { title: "Responsive delivery", desc: "Mobile usability supports customers discovering products on different devices." },
      { title: "Image optimisation", desc: "Product imagery is handled with clarity and performance in mind." },
      { title: "Conversion paths", desc: "Search visitors can move from product discovery toward an order." },
      { title: "Maintainable content", desc: "The store can support ongoing product and content updates." },
    ],
    outcomes: ["A dedicated online storefront for the Kabir Oil Mill brand.", "Clearer product discovery and presentation.", "A mobile-friendly path from browsing to ordering.", "A stronger presence in the market through a professional website.", "The business began receiving orders through its digital presence."],
    techStack: ["WordPress", "WooCommerce", "Elementor", "HTML5", "CSS3", "JavaScript", "Responsive design", "On-page SEO"],
    services: [{ slug: "ecommerce-development", name: "E-commerce Development" }, { slug: "website-development", name: "Website Development" }],
    related: ["wellingtontours", "shinegoldtours"],
    faqs: [
      { q: "What type of website did Kabir Oil Mill need?", a: "Kabir Oil Mill needed a professional e-commerce website that could showcase oil products and support online orders." },
      { q: "What did Webamazee build?", a: "Webamazee handled the project from planning through design, e-commerce development, testing and launch." },
      { q: "Was the website built as an e-commerce store?", a: "Yes. Product discovery, product detail, cart and checkout form one connected shopping journey." },
      { q: "How were the products presented?", a: "Products were organised into a clear catalogue with dedicated information and visible purchase actions." },
      { q: "Was the website optimised for mobile?", a: "Yes. The storefront and ordering journey were designed to work across mobile, tablet and desktop screens." },
      { q: "How does the website support online orders?", a: "Customers can browse the range, review products, add items to the cart and continue through checkout." },
      { q: "What services did Webamazee provide?", a: "The project included website strategy, UI and UX, e-commerce development, responsive implementation and SEO-friendly structure." },
      { q: "How did the website improve the company's digital presence?", a: "It gave Kabir Oil Mill a dedicated online storefront and a stronger way to present the brand and products digitally." },
      { q: "Can Webamazee build similar e-commerce websites?", a: "Yes. Webamazee can plan and develop e-commerce experiences around a business's catalogue and customer journey." },
      { q: "How can I start an e-commerce website project?", a: "Contact Webamazee with your product range, required store features and goals so the project can be scoped clearly." },
    ],
  },
  {
    slug: "wellingtontours",
    name: "Wellington Tours",
    image: "/images/portfolio/wellington-tours-live-homepage.webp",
    title: "How Webamazee Helped Wellington Tours Build a Stronger Digital Presence",
    metaTitle: "Wellington Tours Website Case Study",
    metaDescription: "Explore how Webamazee developed Wellington Tours' professional travel website, tour presentation and enquiry-focused customer journey.",
    tag: "Travel & Tourism",
    service: "Travel & Tourism Website Development",
    summary: "A professional New Zealand travel website that presents tours clearly and gives potential customers a direct enquiry journey.",
    industry: "Travel and Tourism",
    country: "New Zealand",
    projectType: "Travel website development",
    completion: "2025",
    liveUrl: "https://wellingtontour.co.nz/",
    overviewClient: ["Wellington Tours is a New Zealand-based travel and tours business offering tour experiences, city tours, intercity tours and transport services.", "The business needed a stronger digital presence that could showcase available experiences, communicate practical information clearly and make it easier for potential customers to enquire."],
    overviewBusiness: "A New Zealand travel operator using its website to present tours and transport services and turn visitor interest into direct enquiries.",
    objectives: ["Present tour and package options clearly", "Build trust through professional visual presentation", "Make enquiries easier", "Create a mobile-friendly experience", "Support search visibility for travel services"],
    scope: "Travel website strategy, information architecture, UI and UX design, responsive development, tour content presentation, enquiry paths and launch.",
    timeline: "A complete website engagement from discovery and content structure through responsive implementation and launch.",
    team: "Webamazee strategy, design and development support working with Wellington Tours.",
    exec: { challenge: "The business needed a professional online presence capable of explaining its tour experiences clearly and supporting enquiry generation.", solution: "We built a responsive travel website with organised tour content, strong calls to action, clear navigation and an easy route to contact the business.", outcome: "Wellington Tours gained a stronger digital presence and started generating enquiries through the website." },
    before: ["Potential customers did not have a strong digital destination where they could quickly understand the available tours, transfers and travel experiences.", "The enquiry journey was not working effectively as a business channel. Wellington Tours needed a professional website that could present the offer, build confidence and make the next step obvious."],
    challenges: [
      { title: "Limited digital presence", desc: "The business needed a website that represented its travel services professionally." },
      { title: "Multiple tour options", desc: "City, intercity and transport offerings needed a clear information structure." },
      { title: "Enquiry friction", desc: "Potential customers needed an easier route from browsing to asking about a service." },
      { title: "Competitive attention", desc: "The experience needed to communicate trust in a busy travel market." },
    ],
    discovery: [
      { title: "Service review", desc: "We clarified the different tour, transfer and transport offerings." },
      { title: "Traveller questions", desc: "We identified the practical information customers need before making an enquiry." },
      { title: "Journey mapping", desc: "Navigation was planned from discovery to tour detail and contact." },
      { title: "Content priorities", desc: "Tour information, trust and calls to action were organised around decision-making." },
    ],
    design: [
      { title: "Travel-led visual system", desc: "Destination imagery and clear typography create a professional first impression." },
      { title: "Tour information hierarchy", desc: "Available experiences are easier to scan and understand." },
      { title: "CTA placement", desc: "Booking and enquiry prompts appear at useful points in the journey." },
      { title: "Mobile-first layouts", desc: "Navigation and service information remain usable on smaller screens." },
    ],
    development: [
      { title: "Responsive website build", desc: "The approved designs were implemented across desktop and mobile." },
      { title: "Tour content integration", desc: "Tour and transfer information was added within a consistent page structure." },
      { title: "Enquiry paths", desc: "Contact and booking actions were connected with relevant services." },
      { title: "SEO-ready pages", desc: "Page hierarchy, headings and metadata foundations support discoverability." },
      { title: "Cross-device testing", desc: "Important navigation and enquiry actions were checked across screen sizes." },
      { title: "Launch preparation", desc: "Content, routes and customer journeys were reviewed before release." },
    ],
    features: [
      { title: "Tour categories", desc: "Clear routes to city, intercity and transport offerings." },
      { title: "Service detail", desc: "Practical information for potential travellers." },
      { title: "Booking CTA", desc: "Visible prompts for customers ready to take the next step." },
      { title: "Enquiry journey", desc: "Direct contact paths from relevant tour content." },
      { title: "Responsive navigation", desc: "A usable menu across phones and larger screens." },
      { title: "Professional presentation", desc: "A consistent visual system that supports trust." },
      { title: "Search-friendly structure", desc: "Logical headings and page hierarchy." },
      { title: "Live website access", desc: "A dedicated digital channel for tours and enquiries." },
    ],
    gallery: [{ label: "Live homepage", device: "desktop", alt: "Wellington Tours live homepage" }, { label: "Tour presentation", device: "desktop", alt: "Wellington Tours tour presentation" }, { label: "Responsive website", device: "tablet", alt: "Wellington Tours responsive website" }, { label: "Mobile enquiry", device: "mobile", alt: "Wellington Tours mobile enquiry journey" }],
    beforeAfter: [],
    seo: [{ title: "Travel service structure", desc: "Tour and transfer offerings have clear, relevant pages." }, { title: "On-page foundations", desc: "Headings, metadata and internal links support search understanding." }, { title: "Mobile usability", desc: "Responsive layouts support travellers researching on phones." }, { title: "Content clarity", desc: "Service information answers practical customer questions." }, { title: "Enquiry conversion", desc: "Search visitors have clear contact and booking actions." }, { title: "Image handling", desc: "Travel imagery supports the experience without replacing useful information." }],
    outcomes: ["A stronger and more professional digital presence.", "Clearer presentation of tour and transport services.", "A more direct journey from travel research to enquiry.", "A mobile-friendly website for potential customers.", "The business started generating enquiries through the website."],
    techStack: ["WordPress", "Elementor", "HTML5", "CSS3", "JavaScript", "Responsive design", "On-page SEO", "Enquiry forms"],
    services: [{ slug: "website-development", name: "Website Development" }, { slug: "landing-page-development", name: "Landing Page Development" }, { slug: "seo-services", name: "SEO Services" }],
    related: ["kabiroilmill", "shinegoldtours"],
    faqs: [
      { q: "What type of business is Wellington Tours?", a: "Wellington Tours is a New Zealand travel business offering tours, transfers and related travel experiences." },
      { q: "What type of website did Webamazee build?", a: "Webamazee built a professional, responsive travel website focused on presenting services and generating enquiries." },
      { q: "How are tour packages presented?", a: "Tours and transport options use clear categories, service information and relevant booking or enquiry actions." },
      { q: "How does the website support enquiries?", a: "Potential customers can move from tour information to direct contact and booking prompts without an unclear journey." },
      { q: "Was the website designed for mobile users?", a: "Yes. Navigation, tour content and calls to action adapt to mobile, tablet and desktop screens." },
      { q: "How did the website improve the company's online presence?", a: "It gave Wellington Tours a professional digital channel for presenting its experiences and communicating with potential customers." },
      { q: "What services were included?", a: "The work covered website strategy, UI and UX design, responsive development, content structure and enquiry journeys." },
      { q: "Is the website optimised for search engines?", a: "The website uses search-friendly page structure, headings, metadata foundations and internal links." },
      { q: "Can Webamazee build websites for tour operators?", a: "Yes. Webamazee can build travel websites around destinations, tours, packages and enquiry requirements." },
      { q: "How can a tourism business start a website project?", a: "Contact Webamazee with your services, destinations and preferred booking or enquiry process to define the scope." },
    ],
  },
  {
    slug: "shinegoldtours",
    name: "Shine Gold Tours India",
    image: "/images/portfolio/shine-gold-tours-india-live-homepage.webp",
    title: "How Webamazee Redesigned Shine Gold Tours India's Website for Better UX",
    metaTitle: "Shine Gold Tours India Website Redesign Case Study",
    metaDescription: "See how Webamazee transformed Shine Gold Tours India's outdated, slow website with modern UI and UX, clearer information and stronger lead journeys.",
    tag: "Website Redesign",
    service: "Website Redesign / Travel & Tourism",
    summary: "A complete UI and UX redesign that transformed an outdated, slow travel website into a clearer, faster and more conversion-focused experience.",
    industry: "Travel and Tourism",
    country: "India",
    projectType: "Travel website redesign",
    completion: "2025",
    liveUrl: "https://shinegoldtoursindia.com/",
    overviewClient: ["Shine Gold Tours India is a travel and tourism business whose existing website needed a complete visual and usability improvement.", "The previous website was outdated, slow and difficult to navigate. It did not provide the modern experience expected by travel customers or guide visitors clearly through services and tour offerings."],
    overviewBusiness: "An Indian travel business requiring a complete redesign to improve presentation, usability, performance and lead generation.",
    objectives: ["Replace the outdated visual interface", "Improve loading and mobile experience", "Create a clearer information hierarchy", "Present tours and services more effectively", "Strengthen calls to action and lead journeys"],
    scope: "Existing-site review, information architecture, full UI and UX redesign, responsive frontend improvement, content reorganisation, performance work, SEO foundations and launch.",
    timeline: "A focused redesign engagement covering discovery, interface redesign, responsive implementation, testing and release.",
    team: "Webamazee design and development support working through a complete redesign rather than a superficial visual update.",
    exec: { challenge: "Slow load times, an outdated interface and weak information hierarchy created friction and increased the likelihood that visitors would leave before engaging with the business.", solution: "We transformed the experience with a complete UI and UX redesign, clearer navigation, improved content presentation, responsive layouts, cleaner frontend delivery and stronger calls to action.", outcome: "The redesigned website provided a stronger platform for presenting services, began attracting traffic and helped the business receive leads through the improved digital experience." },
    before: ["The previous website used an outdated visual interface and did not communicate the quality of the company's travel services effectively.", "Slow pages, weak navigation and unclear content structure created unnecessary friction. Visitors could lose interest before understanding the tours or reaching an enquiry action."],
    challenges: [
      { title: "Outdated design", desc: "The interface did not communicate the quality of the company's travel services." },
      { title: "Slow loading", desc: "Performance problems created friction, especially for visitors on mobile devices." },
      { title: "Poor user experience", desc: "Navigation and content hierarchy did not guide users effectively through available offerings." },
      { title: "Weak conversion journey", desc: "Calls to action and service presentation needed to support enquiries more clearly." },
    ],
    discovery: [
      { title: "Existing-site audit", desc: "We reviewed the old interface, page hierarchy, navigation and performance issues." },
      { title: "Content inventory", desc: "Tour and service information was assessed before the new structure was planned." },
      { title: "User journey review", desc: "We identified where visitors could lose context or leave before enquiring." },
      { title: "Redesign priorities", desc: "Visual clarity, speed, mobile usability and conversion paths guided the work." },
    ],
    design: [
      { title: "Modern visual system", desc: "Typography, spacing, imagery and interface elements were redesigned consistently." },
      { title: "Improved hierarchy", desc: "Tour and service content became easier to scan and understand." },
      { title: "Clearer navigation", desc: "Visitors can move through offerings with less friction." },
      { title: "Stronger CTA placement", desc: "Enquiry actions appear in context throughout the journey." },
    ],
    development: [
      { title: "Responsive implementation", desc: "The redesigned interface was built for desktop, tablet and mobile." },
      { title: "Frontend cleanup", desc: "The experience was simplified to reduce unnecessary visual and interaction overhead." },
      { title: "Performance improvements", desc: "Media and page delivery were reviewed to support faster loading." },
      { title: "Content restructuring", desc: "Tour and service information was integrated into the new hierarchy." },
      { title: "SEO-ready structure", desc: "Headings, metadata foundations and internal links were considered during redesign." },
      { title: "Testing and launch", desc: "Navigation, responsiveness and important enquiry routes were checked before release." },
    ],
    features: [
      { title: "Modern homepage", desc: "A stronger first impression for the travel brand." },
      { title: "Tour presentation", desc: "Clearer organisation of destinations and services." },
      { title: "Responsive navigation", desc: "Improved usability across screen sizes." },
      { title: "Lead CTAs", desc: "More visible and contextual enquiry actions." },
      { title: "Improved hierarchy", desc: "Content is easier to scan and understand." },
      { title: "Cleaner frontend", desc: "A more focused experience with reduced friction." },
      { title: "SEO foundations", desc: "Search-friendly page and heading structure." },
      { title: "Trust presentation", desc: "A professional visual experience that better represents the business." },
    ],
    gallery: [{ label: "Redesigned homepage", device: "desktop", alt: "Shine Gold Tours India redesigned homepage" }, { label: "Tour presentation", device: "desktop", alt: "Shine Gold Tours India tour presentation" }, { label: "Responsive redesign", device: "tablet", alt: "Shine Gold Tours India responsive redesign" }, { label: "Mobile experience", device: "mobile", alt: "Shine Gold Tours India mobile website experience" }],
    beforeAfter: [
      { title: "Homepage Experience", description: "An outdated interface was replaced with stronger hierarchy, modern presentation and clearer calls to action.", improvementTag: "Modern UI", variant: "homepage" },
      { title: "Tour Information", description: "Tour and service content was reorganised so visitors could understand available experiences more quickly.", improvementTag: "Clearer Structure", variant: "service" },
      { title: "Mobile Journey", description: "Responsive layouts and direct enquiry actions reduced friction on smaller screens.", improvementTag: "Mobile First", variant: "mobile" },
    ],
    seo: [{ title: "Information architecture", desc: "Tour and service pages use a clearer hierarchy." }, { title: "On-page foundations", desc: "Headings, metadata and internal links support search understanding." }, { title: "Performance focus", desc: "Cleaner delivery and media handling support a faster experience." }, { title: "Responsive usability", desc: "Mobile visitors can navigate and enquire more easily." }, { title: "Content presentation", desc: "Travel information is structured around visitor needs." }, { title: "Conversion paths", desc: "Search and referral visitors have clearer enquiry actions." }],
    outcomes: ["A modern visual experience that better represents the travel business.", "Clearer navigation and tour information.", "A faster, more usable experience across devices.", "Stronger calls to action and lead journeys.", "The redesigned website began attracting traffic and helped the business receive leads."],
    techStack: ["WordPress", "Elementor", "HTML5", "CSS3", "JavaScript", "Responsive redesign", "Performance optimisation", "On-page SEO"],
    services: [{ slug: "website-redesign", name: "Website Redesign" }, { slug: "website-development", name: "Website Development" }, { slug: "seo-services", name: "SEO Services" }],
    related: ["kabiroilmill", "wellingtontours"],
    faqs: [
      { q: "Why did Shine Gold Tours India need a redesign?", a: "The existing site was outdated, slow and did not guide travel customers clearly through the company's services." },
      { q: "What problems did the old website have?", a: "The old experience had dated visual design, loading friction, unclear navigation and weak conversion paths." },
      { q: "How did the redesign improve UX?", a: "The redesign introduced clearer hierarchy, simpler navigation, improved tour presentation and more visible enquiry actions." },
      { q: "How were loading and performance issues addressed?", a: "The frontend experience and media delivery were reviewed and simplified to support faster, cleaner page loading." },
      { q: "Was the new website mobile responsive?", a: "Yes. The redesigned layouts, navigation and enquiry actions adapt across phones, tablets and desktop screens." },
      { q: "How was the information architecture improved?", a: "Tours, services and supporting information were reorganised into a clearer structure based on visitor needs." },
      { q: "How did the redesign support lead generation?", a: "Stronger visual hierarchy and contextual calls to action created a more direct route from interest to enquiry." },
      { q: "Did the redesign improve the website's visual presentation?", a: "Yes. A consistent modern visual system replaced the outdated interface and better represented the travel brand." },
      { q: "Can Webamazee redesign an outdated travel website?", a: "Yes. Webamazee can audit, restructure and redesign a travel website around usability, performance and conversion goals." },
      { q: "How can I request a website redesign?", a: "Contact Webamazee with your current website and the problems you want to solve so the redesign can be scoped responsibly." },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined { return caseStudies.find((study) => study.slug === slug); }
export function getAllCaseStudies(): CaseStudy[] { return caseStudies; }
export function getRelatedCaseStudies(slug: string, count = 2): CaseStudy[] {
  const study = getCaseStudy(slug);
  if (!study) return caseStudies.slice(0, count);
  return study.related.map((relatedSlug) => getCaseStudy(relatedSlug)).filter((item): item is CaseStudy => Boolean(item)).slice(0, count);
}
