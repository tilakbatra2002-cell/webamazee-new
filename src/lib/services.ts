import type { LucideIcon } from "lucide-react";
import {
  Code2, RefreshCw, MousePointerClick, ShoppingCart, Search, Brain,
  Settings2, MapPin, FilePen, TrendingUp, Target, Link2,
  CheckCircle2, Zap, BarChart3, FileText, ShieldCheck, Wrench, LineChart,
  Package, RefreshCcw, Headphones, Database, Gauge, Globe, Layers, Award,
  Users, Lock, Sparkles, Rocket, Scale, Handshake, Palette, Bot, Cog, Star,
} from "lucide-react";
import { socialServiceEntries } from "./services-social";

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  icon: string;
  tagline: string;
  shortDesc: string;
  metaTitle: string;
  metaDescription: string;
  keyword: string;
  /** Optional curated meta-keyword set (mapping layer); falls back to generated keywords. */
  metaKeywords?: string[];
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    subtitle: string;
    trust: string[];
  };
  pains: { title: string; desc: string }[];
  overview: string[];
  whoNeeds: string[];
  examples: string[];
  whyMattersTitle: string;
  whyMatters: string[];
  process: { step: string; title: string; desc: string }[];
  included: { icon: string; title: string; desc: string }[];
  whyChoose: { icon: string; title: string; desc: string }[];
  industries: string[];
  techStack: string[];
  measurementAreas: string[];
  faqs: { q: string; a: string }[];
  related: string[];
};

const serviceEntries: Service[] = [
  {
    slug: "website-development",
    name: "Website Development",
    shortName: "Web Development",
    icon: "Code2",
    tagline: "Fast, beautiful, conversion-ready websites",
    shortDesc:
      "Premium custom websites engineered for speed, SEO and conversions.",
    metaTitle: "Website Development & Custom Web Design Services",
    metaDescription:
      "Custom, performance-focused website development services with search foundations built in. Get a free quote from Webamazee today.",
    keyword: "website development services",
    metaKeywords: ["website development services", "custom web design", "business website development", "web development company", "Next.js development", "website development pricing"],
    hero: {
      eyebrow: "Website Development",
      title: "Websites built to",
      highlight: "convert, not just look good",
      subtitle:
        "We design and build lightning-fast, premium websites that turn visitors into customers — engineered with SEO and performance at the core.",
      trust: ["Performance-minded builds", "SEO-ready foundations", "Mobile-first & responsive"],
    },
    pains: [
      { title: "Slow load times", desc: "Slow pages can frustrate visitors and make important actions harder to complete." },
      { title: "Outdated look", desc: "An outdated presentation can make it harder to communicate your offer and build trust." },
      { title: "Poor mobile experience", desc: "A difficult mobile journey can make it harder for visitors to understand your offer or get in touch." },
      { title: "Weak conversion paths", desc: "Without clear calls to action, visitors may be unsure what to do next." },
    ],
    overview: [
      "Your website shapes how people discover and evaluate your business online. Clear information, useful content and accessible actions can help visitors understand your offer and get in touch.",
      "At Webamazee, we build premium custom websites from the ground up using Next.js, React and modern design systems. We don't rely on generic templates. Every project starts with your brand, your audience and your goals, then becomes a bespoke experience designed to guide visitors toward a buying decision.",
      "From thoughtful performance optimisation to clean architecture and built-in SEO, our websites are designed around the needs of users and search engines.",
    ],
    whoNeeds: [
      "Business owners with an outdated or underperforming website",
      "Startups launching a new product or service",
      "SMEs that need to build trust and generate enquiries",
      "Companies preparing to invest in SEO and paid campaigns",
    ],
    examples: [
      "Plan a new business website around its audience, services and enquiry goals.",
      "Bring clearer navigation, responsive design and a considered content structure into an existing site.",
      "Build a search-ready foundation for a new product or service launch.",
    ],
    whyMattersTitle: "A strong foundation for digital growth",
    whyMatters: [
      "Your website is a useful place to bring together information about your services and provide clear next steps. Unlike paid ads, useful content can remain accessible after a campaign ends.",
      "Page speed, accessibility and navigation shape a visitor’s experience. We review these factors alongside your design and technical goals so the site can support your other marketing efforts.",
      "When you invest in SEO, content or paid traffic, a clear destination helps visitors understand your offer. We build conversion paths around your business goals and agree what to measure.",
    ],
    process: [
      { step: "01", title: "Discovery", desc: "We map your goals, audience, competitors and content needs to define the right build." },
      { step: "02", title: "Strategy & architecture", desc: "We define sitemap, UX flow and conversion paths before any design begins." },
      { step: "03", title: "Design", desc: "We craft a premium, on-brand UI that balances beauty with usability." },
      { step: "04", title: "Development", desc: "We engineer a fast, accessible, SEO-optimised site on a modern stack." },
      { step: "05", title: "Content & integrations", desc: "We wire up analytics, CMS, forms and third-party tools." },
      { step: "06", title: "Launch & optimise", desc: "We launch, monitor performance and iterate to maximise results." },
    ],
    included: [
      { icon: "Package", title: "Custom build", desc: "A bespoke website, not a template, built to your brand and goals." },
      { icon: "Zap", title: "Speed optimisation", desc: "Performance reviews and Core Web Vitals improvements tailored to your site." },
      { icon: "Settings2", title: "CMS access", desc: "Edit content yourself without touching code." },
      { icon: "ShieldCheck", title: "Security", desc: "Best-practice security to protect your business." },
      { icon: "BarChart3", title: "Analytics", desc: "Analytics and reporting planned as part of project setup." },
      { icon: "Headphones", title: "Ongoing support", desc: "A care plan for updates, backups and improvements." },
    ],
    whyChoose: [
      { icon: "Sparkles", title: "AI-first approach", desc: "We use AI to accelerate builds without compromising quality." },
      { icon: "Award", title: "Premium craft", desc: "Design and engineering comparable to award-winning agencies." },
      { icon: "Scale", title: "Transparent process", desc: "Clear milestones, fixed pricing and honest communication." },
      { icon: "Gauge", title: "Performance-first", desc: "Speed and Core Web Vitals are non-negotiable." },
      { icon: "Headphones", title: "Dedicated team", desc: "A responsive team invested in your success." },
      { icon: "Globe", title: "Remote collaboration", desc: "We work with businesses through clear, remote-friendly processes." },
    ],
    industries: ["B2B Services", "SaaS & Startups", "E-Commerce", "Professional Services", "Healthcare", "Real Estate"],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel", "Sanity / Headless CMS", "Google Analytics", "Search Console"],
    measurementAreas: [
      "Page speed and Core Web Vitals",
      "Mobile usability",
      "Service-page clarity",
      "Enquiry journey",
    ],
    faqs: [
      { q: "How long does a website build take?", a: "Timing depends on scope, content readiness and integrations. We outline a realistic schedule after understanding the project." },
      { q: "Will my website be mobile friendly?", a: "We design responsive layouts and review key pages across common screen sizes." },
      { q: "Can I edit the website myself?", a: "Yes. We set up a CMS so you can update content, add pages and manage your site without touching code." },
      { q: "Do you build with templates?", a: "No. Every website is custom-designed and built around your brand, audience and goals." },
      { q: "Is the website SEO-ready?", a: "We consider clean architecture, structured data, page speed and Core Web Vitals as part of the project scope." },
      { q: "Will my website load quickly?", a: "We assess performance and optimise Core Web Vitals based on the needs of your site." },
      { q: "Do you provide ongoing support?", a: "We offer care plans covering updates, security, backups, monitoring and continuous improvements." },
      { q: "What do you need from me to start?", a: "Just your goals and content. We handle the design, build, SEO and launch." },
    ],
    related: ["website-redesign", "landing-page-development", "seo-services"],
  },
  {
    slug: "website-redesign",
    name: "Website Redesign",
    shortName: "Redesign",
    icon: "RefreshCw",
    tagline: "Refresh your site for a clearer digital experience",
    shortDesc:
      "Refresh your website’s design, structure and technical foundations around your business goals.",
    metaTitle: "Website Redesign Services That Convert",
    metaDescription:
      "Website redesign services focused on usability, content structure, performance and search-aware migration planning. Get a free audit from Webamazee.",
    keyword: "website redesign services",
    metaKeywords: ["website redesign services", "web redesign", "website makeover", "SEO-safe website redesign", "website conversion optimization"],
    hero: {
      eyebrow: "Website Redesign",
      title: "Give your website a",
      highlight: "clearer experience",
      subtitle:
        "We refresh outdated, slow or confusing websites through considered design, clearer navigation and careful migration planning.",
      trust: ["SEO-conscious migration", "UX & conversion audit", "Planned launch"],
    },
    pains: [
      { title: "Dated presentation", desc: "An outdated design can make it harder to communicate your brand and build trust." },
      { title: "Poor mobile experience", desc: "A difficult mobile experience can make it harder for visitors to browse or enquire." },
      { title: "Confusing navigation", desc: "When visitors can't find what they need, they leave — often to competitors." },
      { title: "Slow & clunky", desc: "Slow pages can frustrate visitors and affect usability and performance measures." },
    ],
    overview: [
      "A redesign can address issues that make a site harder to use or maintain. If navigation is unclear, pages load slowly or content no longer reflects your offer, visitors may struggle to find what they need.",
      "At Webamazee, we review what works, identify what needs attention and plan the new structure around your goals. Relevant redirects and preserved content can help reduce avoidable disruption during migration.",
      "The aim is a modern, usable website with clearer content and conversion paths. We agree the project goals and measures before work begins.",
    ],
    whoNeeds: [
      "Businesses with a site that looks or performs outdated",
      "Companies losing leads due to poor mobile experience",
      "Organisations preparing to invest in SEO or paid ads",
      "Brands that have evolved but whose website hasn't",
    ],
    examples: [
      "Refresh an outdated visual system while retaining useful content.",
      "Reorganise service pages so visitors can find a relevant next step.",
      "Plan a careful migration with redirects and search visibility in mind.",
    ],
    whyMattersTitle: "Why a redesign can help",
    whyMatters: [
      "A redesign is an opportunity to revisit how your site presents your business and guides visitors to important information.",
      "Redesign work can include performance, structure, accessibility and conversion paths. We set priorities based on the site review and your business goals.",
      "An outdated site can make it harder to communicate current services, maintain content and support campaigns. Whether a redesign is worthwhile depends on your needs, current site and budget.",
    ],
    process: [
      { step: "01", title: "Deep audit", desc: "We review your current site, performance, UX and SEO to find what's holding you back." },
      { step: "02", title: "Strategy", desc: "We define new information architecture, conversion paths and design direction." },
      { step: "03", title: "Design", desc: "We craft a modern, premium visual experience that builds trust." },
      { step: "04", title: "Build", desc: "We rebuild on a fast, future-proof tech stack." },
      { step: "05", title: "SEO-safe migration", desc: "Redirects and structure protect your rankings and traffic." },
      { step: "06", title: "Launch & measure", desc: "We launch and track improvements in performance and conversions." },
    ],
    included: [
      { icon: "Wrench", title: "UX & conversion audit", desc: "We pinpoint the friction costing you leads." },
      { icon: "Palette", title: "Modern redesign", desc: "A refreshed, premium look that reflects your brand today." },
      { icon: "RefreshCcw", title: "SEO-safe migration", desc: "Redirects that preserve and improve your rankings." },
      { icon: "Zap", title: "Speed optimisation", desc: "Faster load times and better Core Web Vitals." },
      { icon: "Package", title: "Future-proof rebuild", desc: "A modern stack that's easy to update and scale." },
      { icon: "Headphones", title: "Support & care", desc: "Ongoing help, updates and improvements." },
    ],
    whyChoose: [
      { icon: "ShieldCheck", title: "No SEO risk", desc: "We protect your rankings with careful migration." },
      { icon: "Sparkles", title: "AI-accelerated", desc: "AI helps us move faster and smarter on your rebuild." },
      { icon: "Award", title: "Premium craft", desc: "Design decisions aligned with your brand, audience and goals." },
      { icon: "Scale", title: "Transparent pricing", desc: "Clear proposals with no hidden fees." },
      { icon: "Gauge", title: "Performance-first", desc: "Speed and Core Web Vitals are built in." },
      { icon: "Globe", title: "Remote collaboration", desc: "A clear process for working with your team remotely." },
    ],
    industries: ["Legal & Financial", "Healthcare", "Professional Services", "E-Commerce", "Real Estate", "Hospitality"],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Google Search Console", "Screaming Frog", "GA4", "Schema.org", "Vercel"],
    measurementAreas: [
      "Content and URL continuity",
      "Page performance",
      "Navigation and usability",
      "Enquiry paths",
    ],
    faqs: [
      { q: "Will I lose my SEO rankings in a redesign?", a: "Any migration can carry some risk. We plan redirects, preserve relevant structure and review changes to help reduce avoidable disruption." },
      { q: "How long does a redesign take?", a: "Timing depends on scope, content readiness and migration requirements. We outline a realistic schedule after reviewing the existing site." },
      { q: "Can you keep my current brand?", a: "Yes. We can refresh your existing brand or build a whole new identity." },
      { q: "Will it be mobile-friendly?", a: "We build responsive layouts and review key pages across common screen sizes." },
      { q: "Do I need new content?", a: "We can work with your existing content or help create new copy and imagery." },
      { q: "Is there downtime during the redesign?", a: "No. We build and migrate without disrupting your live site or customers." },
      { q: "What makes your redesigns different?", a: "We combine premium design with SEO-safe migration and a conversion-first approach." },
      { q: "How do we get started?", a: "Book a free redesign audit and we'll show you exactly what a modern site could unlock." },
    ],
    related: ["website-development", "landing-page-development", "technical-seo"],
  },
  {
    slug: "landing-page-development",
    name: "Landing Page Development",
    shortName: "Landing Pages",
    icon: "MousePointerClick",
    tagline: "High-converting landing pages for your campaigns",
    shortDesc:
      "Focused landing pages built around your ads, offers and goals.",
    metaTitle: "Landing Page Development & Design Services",
    metaDescription:
      "Landing page design and development focused on campaign fit, clear calls to action and useful measurement. A/B-ready builds from Webamazee.",
    keyword: "landing page development",
    metaKeywords: ["landing page development", "landing page design", "conversion-focused landing pages", "A/B-ready landing pages", "campaign landing pages"],
    hero: {
      eyebrow: "Landing Pages",
      title: "Landing pages engineered to",
      highlight: "clear next steps",
      subtitle:
        "We build focused landing pages that align your offer, audience and call to action to support campaign goals.",
      trust: ["A/B testing ready", "Performance reviewed", "Lead capture built in"],
    },
    pains: [
      { title: "Wasted ad spend", desc: "Sending ads to your homepage scatters attention and burns budget." },
      { title: "Weak calls to action", desc: "Unclear CTAs leave visitors unsure what to do next." },
      { title: "Slow pages", desc: "Slow pages can interrupt the experience before visitors understand your offer." },
      { title: "No testing", desc: "Without A/B testing you can't know what's working - or improve it." },
    ],
    overview: [
      "A landing page is a focused page built around an offer and a clear next step, such as an enquiry or purchase. Compared with a general homepage, it can keep campaign information and calls to action together.",
      "At Webamazee, we plan the headline, copy, imagery, form and call to action around your campaign or offer, with attention to clarity and usability.",
      "We align the page with your campaign message and make the next step clear. Performance depends on the offer, audience, traffic and other campaign factors, so we agree what to measure.",
    ],
    whoNeeds: [
      "Marketers running Google or Meta ad campaigns",
      "Businesses launching a new product or offer",
      "Startups collecting leads or demo signups",
      "E-commerce brands running promotions and sales",
    ],
    examples: [
      "Give a specific offer a focused page and a clear enquiry path.",
      "Create campaign-specific pages for paid or organic traffic.",
      "Review form friction, calls to action and page engagement after launch.",
    ],
    whyMattersTitle: "How focused landing pages support campaigns",
    whyMatters: [
      "A focused landing page gives campaign traffic a relevant destination. We organise the offer, supporting information and next step so visitors can assess whether it is right for them.",
      "A page that matches its ad and offer can create a more consistent user journey. Campaign performance depends on multiple factors, so we use available tracking to assess what is working.",
      "Landing pages can support structured testing. We can compare page variations against agreed goals where suitable analytics and traffic are available.",
    ],
    process: [
      { step: "01", title: "Objective", desc: "We clarify the page's goal, audience and the offer you're promoting." },
      { step: "02", title: "Persuasion map", desc: "We structure the copy, sections and CTA for maximum response." },
      { step: "03", title: "Design", desc: "We craft a fast, focused, on-brand page." },
      { step: "04", title: "Build & integrate", desc: "We build the page and connect forms, tracking and your CRM." },
      { step: "05", title: "Quality & speed", desc: "We review page speed and mobile usability as part of quality assurance." },
      { step: "06", title: "Launch & test", desc: "We launch and set up A/B testing to keep improving." },
    ],
    included: [
      { icon: "Package", title: "Campaign-matched design", desc: "Visual and message alignment with your ads." },
      { icon: "Target", title: "Clear single CTA", desc: "One unmissable action per page." },
      { icon: "Database", title: "Lead capture", desc: "Optimised forms that collect the right data." },
      { icon: "Zap", title: "Performance", desc: "Page speed reviewed alongside usability." },
      { icon: "BarChart3", title: "Tracking & pixels", desc: "Analytics and campaign tracking planned during setup." },
      { icon: "RefreshCcw", title: "A/B ready", desc: "Built to test and optimise continuously." },
    ],
    whyChoose: [
      { icon: "Sparkles", title: "Conversion-focused", desc: "Every decision serves the page's goal." },
      { icon: "Zap", title: "Fast delivery", desc: "Delivery milestones agreed after we review the brief and content." },
      { icon: "Gauge", title: "Performance checks", desc: "Page speed reviewed alongside usability and campaign goals." },
      { icon: "Scale", title: "Transparent", desc: "Clear scope, pricing and reporting." },
      { icon: "Headphones", title: "Ongoing testing", desc: "We help you improve conversion over time." },
      { icon: "Globe", title: "Global expertise", desc: "We build for audiences worldwide." },
    ],
    industries: ["SaaS", "E-Commerce", "Finance", "Real Estate", "Education", "Healthcare"],
    techStack: ["Next.js", "React", "Tailwind CSS", "Vercel", "GA4", "Meta Pixel", "Google Tag Manager", "HubSpot", "Klaviyo", "Hotjar"],
    measurementAreas: [
      "Page engagement",
      "Form completion",
      "Call-to-action clarity",
      "Campaign attribution",
    ],
    faqs: [
      { q: "How many landing pages do I need?", a: "We recommend one per campaign or offer. We can build a scalable system that grows with you." },
      { q: "Can you integrate with my email or CRM?", a: "Yes, we integrate with tools like HubSpot, Mailchimp and Klaviyo to capture and manage leads." },
      { q: "Do you include A/B testing?", a: "We build pages ready to test and can run experiments to improve conversion." },
      { q: "How fast can I get a page?", a: "Timing depends on the offer, content and integrations. We confirm a schedule after discovery." },
      { q: "Will the page load quickly?", a: "We test page speed and address Core Web Vitals issues where possible. Results depend on the site's code, content, hosting and integrations." },
      { q: "Do you write the copy?", a: "We can, or we work with your copy - either way it's structured for persuasion." },
      { q: "Is it optimised for mobile?", a: "Absolutely. Every landing page is mobile-first." },
      { q: "What do I need to provide?", a: "Your offer, audience and any brand assets. We handle the rest." },
    ],
    related: ["website-development", "ecommerce-development", "google-ranking-growth"],
  },
  {
    slug: "ecommerce-development",
    name: "E-Commerce Development",
    shortName: "E-Commerce",
    icon: "ShoppingCart",
    tagline: "Online stores that sell",
    shortDesc:
      "E-commerce stores planned around product discovery, checkout and search foundations.",
    metaTitle: "E-Commerce Website Development Services",
    metaDescription:
      "E-commerce development for Shopify and headless stores, with attention to product discovery, checkout, security and search foundations.",
    keyword: "e-commerce development services",
    metaKeywords: ["e-commerce website development", "online store development", "Shopify development", "headless commerce", "eCommerce web design"],
    hero: {
      eyebrow: "E-Commerce",
      title: "Online stores designed to",
      highlight: "a clearer journey",
      subtitle:
        "We build e-commerce stores with product discovery, checkout and relevant integrations planned around your business needs.",
      trust: ["Checkout-optimised", "SEO-ready store", "Secure payments"],
    },
    pains: [
      { title: "Checkout friction", desc: "A confusing checkout can interrupt the path from product selection to purchase." },
      { title: "Hard to discover", desc: "Poorly structured product pages can be difficult for customers and search engines to understand." },
      { title: "Slow storefront", desc: "Slow pages can frustrate shoppers and affect performance measures." },
      { title: "Hard to scale", desc: "Rigid platforms make growth, new products and integrations painful." },
    ],
    overview: [
      "Selling online is about more than listing products. It's about creating a fast, intuitive, trustworthy experience that guides shoppers from browsing to checkout with minimal friction.",
      "At Webamazee, we plan the store around product pages, checkout, search foundations and the integrations the business needs. The scope is shaped by your catalogue and operations.",
      "We build on leading platforms like Shopify and headless commerce solutions, choosing the right foundation for your catalogue, budget and growth ambitions.",
    ],
    whoNeeds: [
      "Retailers and brands starting online sales",
      "Existing stores that need higher conversions",
      "E-commerce businesses scaling across markets",
      "Brands ready to rank on Google and marketplaces",
    ],
    examples: [
      "Organise categories and products for easier discovery.",
      "Simplify the journey from product details to checkout.",
      "Plan product content and technical SEO alongside store functionality.",
    ],
    whyMattersTitle: "How e-commerce performance supports sales",
    whyMatters: [
      "In e-commerce, speed, clarity and trust shape the shopping experience. We review the path from product discovery to checkout and look for avoidable friction.",
      "Organic search can complement other discovery channels. A clear catalogue and useful product content help shoppers understand the range and search engines understand the pages.",
      "We choose a platform based on your catalogue, operations and growth plans, with relevant integrations considered during project planning.",
    ],
    process: [
      { step: "01", title: "Strategy", desc: "We define your catalogue, platform, integrations and conversion goals." },
      { step: "02", title: "UX & design", desc: "We craft a premium shopping experience around your brand." },
      { step: "03", title: "Build", desc: "We build the store on the right platform for your needs." },
      { step: "04", title: "Integrations", desc: "We connect payments, shipping, email, analytics and more." },
      { step: "05", title: "SEO & speed", desc: "We optimise structure, product pages and Core Web Vitals." },
      { step: "06", title: "Launch & optimise", desc: "We launch and continuously improve for sales." },
    ],
    included: [
      { icon: "ShoppingCart", title: "Checkout optimisation", desc: "Streamlined checkout that reduces abandonment." },
      { icon: "Package", title: "Product page design", desc: "High-converting pages with strong UX." },
      { icon: "Lock", title: "Secure payments", desc: "Reliable, secure payment integration." },
      { icon: "Cog", title: "Inventory & shipping", desc: "Full integration with your operations." },
      { icon: "Search", title: "SEO & speed", desc: "Store architecture built to rank and load fast." },
      { icon: "BarChart3", title: "Analytics & retargeting", desc: "Tracking and remarketing ready to grow revenue." },
    ],
    whyChoose: [
      { icon: "Sparkles", title: "Conversion engineering", desc: "Every page designed to maximise sales." },
      { icon: "Award", title: "Premium storefronts", desc: "Beautiful, on-brand experiences." },
      { icon: "Gauge", title: "Performance-first", desc: "Fast stores that rank and convert." },
      { icon: "Scale", title: "Scalable platform", desc: "Built to grow with your catalogue." },
      { icon: "ShieldCheck", title: "Secure & reliable", desc: "Payments and data protected." },
      { icon: "Globe", title: "Multi-market ready", desc: "Sell across global markets." },
    ],
    industries: ["Fashion", "Homeware", "Beauty", "Electronics", "Food & Beverage", "Health"],
    techStack: ["Shopify", "Headless Commerce", "Next.js", "Stripe", "PayPal", "Klaviyo", "GA4", "Search Console", "Ahrefs", "ShipStation"],
    measurementAreas: [
      "Product discovery",
      "Checkout usability",
      "Organic visibility",
      "Order flow",
    ],
    faqs: [
      { q: "Which platform do you build on?", a: "We build on leading platforms including Shopify and headless commerce solutions, chosen for your needs." },
      { q: "Can you migrate my existing store?", a: "Yes, we handle secure migrations with minimal disruption to your business." },
      { q: "Is the store optimised for SEO?", a: "Absolutely. Product pages, structure and speed are all optimised for search." },
      { q: "Do you integrate with my tools?", a: "We connect payments, shipping, email, analytics and more." },
      { q: "How long does a store take to build?", a: "Timing depends on catalogue size, platform and integrations. We agree a schedule once the scope is clear." },
      { q: "Is the checkout secure?", a: "Yes. We use trusted, PCI-compliant payment providers and best-practice security." },
      { q: "Can you reduce cart abandonment?", a: "Yes, through a streamlined checkout, trust signals and recovery flows." },
      { q: "Do you provide ongoing support?", a: "We offer care plans covering updates, optimisation and growth." },
    ],
    related: ["website-development", "seo-services", "google-ranking-growth"],
  },
  {
    slug: "seo-services",
    name: "SEO Services",
    shortName: "SEO",
    icon: "Search",
    tagline: "Grow organic traffic and rankings",
    shortDesc:
      "A full-funnel SEO strategy combining technical, on-page and off-page optimisation.",
    metaTitle: "SEO Services for Organic Growth & Rankings",
    metaDescription:
      "Professional SEO services that grow rankings and organic traffic. Technical SEO, on-page optimisation, content and link building. Get a free SEO audit from Webamazee.",
    keyword: "SEO services",
    metaKeywords: ["SEO services", "professional SEO", "on-page SEO", "off-page SEO", "SEO audit", "organic growth"],
    hero: {
      eyebrow: "SEO",
      title: "Be found in relevant searches,",
      highlight: "grow organically",
      subtitle:
        "Our SEO services combine technical excellence, quality content and authority building to grow your organic traffic and rankings sustainably.",
      trust: ["White-hat only", "Transparent reporting", "Data-driven"],
    },
    pains: [
      { title: "Invisible on Google", desc: "Your customers can't find you, but they find your competitors." },
      { title: "Wasted ad spend", desc: "Rising ad costs eat margins while organic channels sit unused." },
      { title: "Traffic that doesn't convert", desc: "Ranking for the wrong keywords brings visitors who never buy." },
      { title: "Unclear progress", desc: "Without proper tracking you can't tell what's working." },
    ],
    overview: [
      "SEO can support qualified customer discovery over the long term. By aligning useful pages with relevant searches, a business can help people find information about its products and services.",
      "At Webamazee we deliver a complete, data-driven SEO service covering technical, on-page and off-page optimisation. We target the searches that matter, create content that answers intent and build authority that keeps you ahead of competitors.",
      "SEO is an ongoing process. We set priorities based on your starting point and review visibility, relevant traffic and enquiries over time.",
    ],
    whoNeeds: [
      "Businesses with little or no organic visibility",
      "Companies spending heavily on ads and wanting cheaper growth",
      "Sites that get traffic but few enquiries or sales",
      "Brands facing strong competition in search results",
    ],
    examples: [
      "Build a search strategy around customer intent and business priorities.",
      "Address technical issues that make important pages harder to discover.",
      "Connect useful content with relevant search demand.",
    ],
    whyMattersTitle: "Why SEO is your best long-term investment",
    whyMatters: [
      "Organic search is where your ideal customers actively look for solutions. Ranking there means you're seen at the exact moment they're ready to buy - without paying per click.",
      "Search visibility develops through a combination of technical quality, useful content and relevant authority. Ongoing work can help expand the searches where your business appears.",
      "Unlike paid advertising, useful search content may continue to attract visits after publication, though performance varies and pages need ongoing care.",
    ],
    process: [
      { step: "01", title: "Audit", desc: "We analyse your site, market and competitors to find opportunities." },
      { step: "02", title: "Strategy", desc: "We build a keyword and content plan aligned to your goals." },
      { step: "03", title: "Technical fixes", desc: "We fix crawlability, speed and architecture issues." },
      { step: "04", title: "On-page optimisation", desc: "We optimise content, metadata and internal linking." },
      { step: "05", title: "Authority building", desc: "We earn quality backlinks that strengthen your domain." },
      { step: "06", title: "Measure & grow", desc: "We track rankings, refine and scale what works." },
    ],
    included: [
      { icon: "Search", title: "Keyword research", desc: "Find the high-value searches your customers use." },
      { icon: "FileText", title: "On-page optimisation", desc: "Content and metadata optimised for rankings and clicks." },
      { icon: "Cog", title: "Technical SEO", desc: "Fix crawlability, speed and architecture issues." },
      { icon: "Database", title: "Content strategy", desc: "A plan that captures demand and builds authority." },
      { icon: "Link2", title: "Link building", desc: "Quality backlinks that strengthen your domain." },
      { icon: "BarChart3", title: "Reporting", desc: "Clear visibility into performance and ROI." },
    ],
    whyChoose: [
      { icon: "ShieldCheck", title: "White-hat only", desc: "Ethical tactics that protect your business long-term." },
      { icon: "Sparkles", title: "AI-accelerated", desc: "AI helps us map intent and scale quality content." },
      { icon: "LineChart", title: "Data-driven", desc: "Every decision backed by analytics and evidence." },
      { icon: "Scale", title: "Transparent", desc: "Clear reporting and honest communication." },
      { icon: "Award", title: "Measurement-led", desc: "We review agreed visibility and traffic measures against a baseline." },
      { icon: "Globe", title: "International", desc: "Global search expertise." },
    ],
    industries: ["SaaS", "E-Commerce", "Professional Services", "Healthcare", "Real Estate", "B2B"],
    techStack: ["Google Analytics", "Search Console", "Ahrefs", "SEMrush", "Screaming Frog", "PageSpeed Insights", "Surfer SEO", "Clearscope"],
    measurementAreas: [
      "Organic search visibility",
      "Relevant traffic",
      "Qualified enquiries",
      "Technical health",
    ],
    faqs: [
      { q: "How long until I see SEO results?", a: "SEO timing depends on the site's starting point, competition and how quickly recommendations can be implemented. We review progress against an agreed baseline without promising a fixed deadline." },
      { q: "Do you guarantee rankings?", a: "No ethical provider can guarantee specific positions. We focus on a transparent process, agreed priorities and reporting against an established baseline." },
      { q: "Do you only use white-hat SEO?", a: "Yes, always. We use ethical tactics that protect your business long-term." },
      { q: "What reporting do I get?", a: "A live dashboard plus clear monthly reports on rankings, traffic and conversions." },
      { q: "Which keywords should I target?", a: "We identify keywords that balance search volume, intent and winnability for your business." },
      { q: "Can you fix my existing SEO problems?", a: "Yes. We audit, diagnose and fix technical and content issues holding you back." },
      { q: "Is SEO worth it compared to ads?", a: "It depends on your goals, time horizon and competition. SEO and paid campaigns can serve different roles, and we can help assess the trade-offs." },
      { q: "How do we get started?", a: "Book a free SEO audit and we'll show you exactly where the opportunities are." },
    ],
    related: ["technical-seo", "ai-seo", "link-building"],
  },
  {
    slug: "ai-seo",
    name: "AI SEO",
    shortName: "AI SEO",
    icon: "Brain",
    tagline: "Future-proof rankings with AI",
    shortDesc:
      "Rank ahead of competitors using AI-driven content and intent optimisation.",
    metaTitle: "AI SEO Services for Future-Proof Rankings",
    metaDescription:
      "AI SEO services that use machine learning to understand intent, create winning content and outpace competitors. Future-proof rankings with Webamazee's AI SEO.",
    keyword: "AI SEO services",
    metaKeywords: ["AI SEO services", "AI-powered SEO", "AI search optimization", "generative engine optimization", "AI content optimization", "AI SEO agency"],
    hero: {
      eyebrow: "AI SEO",
      title: "Rank with the power of",
      highlight: "AI behind you",
      subtitle:
        "AI SEO combines machine learning with expert strategy to understand intent, create winning content and outpace competitors.",
      trust: ["Entity & topic mapping", "Zero-click capture", "Expert review"],
    },
    pains: [
      { title: "Content that doesn't rank", desc: "Old keyword-stuffing tactics no longer work in AI-driven search." },
      { title: "Competitors are ahead", desc: "Rivals are using AI to scale content and outpace you." },
      { title: "Losing to AI answers", desc: "Google now answers queries directly, capturing clicks you want." },
      { title: "Slow content production", desc: "Traditional writing can't keep up with the pace of search change." },
    ],
    overview: [
      "AI tools can support topic research and content planning. We use expert review to keep work useful, accurate and aligned with your audience and business goals.",
      "We use AI models to map topics, analyse intent and scale high-quality, optimised content - all refined by human experts to ensure accuracy and brand voice. This is SEO, supercharged.",
      "Search snippets and AI-generated features change over time. We review the available search results and focus on content that is clear, useful and well supported.",
    ],
    whoNeeds: [
      "Businesses in competitive niches where content drives rankings",
      "Companies scaling content without sacrificing quality",
      "Marketers wanting to capture featured snippets and AI answers",
      "Brands that want to stay ahead of AI-era search changes",
    ],
    examples: [
      "Use AI-assisted research to surface topics for expert review.",
      "Structure content around entities, intent and useful answers.",
      "Pair automation with editorial oversight and search-quality checks.",
    ],
    whyMattersTitle: "How AI can support SEO work",
    whyMatters: [
      "Search systems continue to evolve. Structuring useful, well-supported content can make it easier for people and search engines to understand what you offer; no format guarantees placement in AI summaries.",
      "AI can assist with research and drafting, while human review checks accuracy, usefulness and brand fit. We prioritise quality and scope over publishing volume.",
      "AI assistants and search-result features continue to change. We can monitor how your content appears and refine it as the landscape evolves, without guaranteeing a particular placement.",
    ],
    process: [
      { step: "01", title: "AI research", desc: "We use AI to uncover topics, entities and intent patterns." },
      { step: "02", title: "Strategy", desc: "We map an AI-informed content and optimisation plan." },
      { step: "03", title: "Create", desc: "AI-assisted content, drafted at scale around intent." },
      { step: "04", title: "Expert review", desc: "Our editors perfect accuracy, voice and quality." },
      { step: "05", title: "Optimise", desc: "Schema, structure and on-page signals for AI and snippets." },
      { step: "06", title: "Measure & refine", desc: "We track AI-era signals and continuously improve." },
    ],
    included: [
      { icon: "Brain", title: "Entity & topic mapping", desc: "Understand what search engines associate with your brand." },
      { icon: "FileText", title: "AI content optimisation", desc: "Content tuned for relevance, depth and intent." },
      { icon: "Database", title: "Schema markup", desc: "Help search engines understand and feature your content." },
      { icon: "Target", title: "Zero-click capture", desc: "Win featured snippets and AI answer boxes." },
      { icon: "Search", title: "Intent analysis", desc: "Target the right stage of the buyer journey." },
      { icon: "Users", title: "Expert review", desc: "AI efficiency with the quality only experts deliver." },
    ],
    whyChoose: [
      { icon: "Sparkles", title: "Genuinely AI-powered", desc: "Not a buzzword - a real, working system." },
      { icon: "Award", title: "Forward-looking", desc: "Positioned for AI-era search, not the old playbook." },
      { icon: "Users", title: "Human quality", desc: "AI refined by experts for accuracy and voice." },
      { icon: "Scale", title: "Transparent", desc: "Clear strategy and honest reporting." },
      { icon: "Gauge", title: "Performance-first", desc: "Content that ranks and converts." },
      { icon: "Target", title: "Audience aware", desc: "Content shaped around audience, market and search intent." },
    ],
    industries: ["SaaS", "B2B", "E-Commerce", "Publishing", "Professional Services", "Education"],
    techStack: ["OpenAI", "Claude", "Gemini", "Surfer SEO", "Clearscope", "Ahrefs", "Search Console", "Schema.org", "GA4"],
    measurementAreas: [
      "Search-intent coverage",
      "Content quality",
      "Organic visibility",
      "Qualified enquiries",
    ],
    faqs: [
      { q: "What exactly is AI SEO?", a: "It's using AI models to understand search intent, map topics and optimise content for modern, AI-driven search results." },
      { q: "Is AI content penalised by Google?", a: "Not when done right. We refine AI output with expert review to create genuinely helpful, high-quality content." },
      { q: "How is this different from regular SEO?", a: "It's more efficient and forward-looking - targeting AI-era ranking factors alongside classic SEO." },
      { q: "Will this protect me from AI search?", a: "It positions your content to be the source AI search engines and people trust." },
      { q: "Do humans review the content?", a: "Yes, always. AI drafts and assists; our experts ensure accuracy, voice and quality." },
      { q: "How fast will I see results?", a: "AI can support research and drafting, but search visibility depends on the site's starting point, competition and implementation. We set expectations after reviewing the project." },
      { q: "Which tools do you use?", a: "We use leading AI models and SEO tools including OpenAI, Claude, Gemini, Surfer and Clearscope." },
      { q: "Is AI SEO safe and ethical?", a: "Yes. We use AI responsibly within Google's guidelines, always reviewed by experts." },
    ],
    related: ["ai-content-optimization", "seo-services", "google-ranking-growth"],
  },
  {
    slug: "technical-seo",
    name: "Technical SEO",
    shortName: "Technical SEO",
    icon: "Settings2",
    tagline: "Fix the foundation for better rankings",
    shortDesc:
      "Crawlability, Core Web Vitals and site architecture - perfected for search engines.",
    metaTitle: "Technical SEO Services & Site Speed Audits",
    metaDescription:
      "Expert technical SEO services. Fix crawlability, Core Web Vitals, schema and site architecture to unlock higher rankings. Get a technical SEO audit from Webamazee.",
    keyword: "technical SEO services",
    metaKeywords: ["technical SEO services", "site speed optimization", "Core Web Vitals", "crawlability", "schema markup", "technical SEO audit"],
    hero: {
      eyebrow: "Technical SEO",
      title: "A technically flawless site",
      highlight: "ranks higher",
      subtitle:
        "We audit and fix the technical foundation of your website so search engines can crawl, index and rank it effectively.",
      trust: ["Deep site audits", "Core Web Vitals", "Schema markup"],
    },
    pains: [
      { title: "Pages not indexed", desc: "Search engines can't find or index important pages, so they never rank." },
      { title: "Poor Core Web Vitals", desc: "Slow, unstable pages hurt both rankings and user experience." },
      { title: "Crawl errors & broken links", desc: "Errors waste crawl budget and frustrate users." },
      { title: "Confusing architecture", desc: "Poor structure spreads authority thin and buries key pages." },
    ],
    overview: [
      "Technical SEO helps search engines access and interpret a website. Reviewing crawlability, indexation and site structure can support discoverability, but does not guarantee ranking changes.",
      "At Webamazee we fix crawlability, page speed, Core Web Vitals, schema and architecture. We run deep technical audits that uncover the issues holding your site back, then implement fixes directly.",
      "The aim is a clearer technical foundation for your content and other SEO work. Outcomes depend on the site, implementation and competition.",
    ],
    whoNeeds: [
      "Websites with declining or stagnant rankings",
      "Sites with many pages not showing up on Google",
      "E-commerce stores with slow product pages",
      "Any business investing in SEO but not seeing results",
    ],
    examples: [
      "Review crawlability, indexation and canonical signals.",
      "Check loading behaviour and Core Web Vitals on key templates.",
      "Review structured data, redirects and technical hygiene.",
    ],
    whyMattersTitle: "Why technical SEO is the foundation of rankings",
    whyMatters: [
      "Search engines need to access and interpret pages to consider them for results. Technical issues can make that harder, so we review crawlability, indexation and structure.",
      "Page speed and Core Web Vitals are part of the user experience and technical health. We review them alongside other factors that can influence search visibility.",
      "Resolving crawlability or indexation issues may help search engines access pages more reliably. The timing and effect depend on implementation and the wider search context.",
    ],
    process: [
      { step: "01", title: "Deep audit", desc: "We run a comprehensive technical crawl of your site." },
      { step: "02", title: "Prioritise", desc: "We rank issues by impact on rankings and user experience." },
      { step: "03", title: "Fix crawlability", desc: "We resolve indexing, robots and sitemap issues." },
      { step: "04", title: "Optimise speed", desc: "We improve Core Web Vitals and load times." },
      { step: "05", title: "Refine structure", desc: "We improve architecture, schema and internal links." },
      { step: "06", title: "Monitor", desc: "We track site health to keep you error-free and ranking." },
    ],
    included: [
      { icon: "Search", title: "Crawl & index audit", desc: "Find and fix what's stopping pages being indexed." },
      { icon: "Gauge", title: "Core Web Vitals", desc: "Optimise loading, interactivity and visual stability." },
      { icon: "Database", title: "Schema markup", desc: "Structured data for rich results and visibility." },
      { icon: "Layers", title: "Site architecture", desc: "Clean structure that distributes authority effectively." },
      { icon: "Wrench", title: "Link & redirect fixes", desc: "Eliminate errors that waste crawl budget and UX." },
      { icon: "ShieldCheck", title: "Mobile optimisation", desc: "Responsive behaviour reviewed across common screen sizes." },
    ],
    whyChoose: [
      { icon: "Cog", title: "Technical experts", desc: "Deep expertise in modern web infrastructure." },
      { icon: "Sparkles", title: "AI-assisted", desc: "AI helps us surface issues faster and more completely." },
      { icon: "Scale", title: "Impact-first", desc: "We fix what moves rankings, not just check boxes." },
      { icon: "Gauge", title: "Performance-first", desc: "Speed and Core Web Vitals are our priorities." },
      { icon: "Headphones", title: "Hands-on fixes", desc: "We implement fixes, not just reports." },
      { icon: "Globe", title: "Best practice", desc: "We follow current Google guidelines and standards." },
    ],
    industries: ["E-Commerce", "SaaS", "Publishing", "Professional Services", "Travel", "Finance"],
    techStack: ["Screaming Frog", "Google Search Console", "PageSpeed Insights", "Lighthouse", "Ahrefs", "SEMrush", "GA4", "Schema.org"],
    measurementAreas: [
      "Crawlability and indexing",
      "Core Web Vitals",
      "Structured data",
      "Technical errors",
    ],
    faqs: [
      { q: "What is technical SEO?", a: "It's optimising the technical aspects of your site - crawlability, speed, indexing and structure - so search engines can rank it well." },
      { q: "Why is it important?", a: "A technically sound site is a prerequisite for rankings. Fixing issues unlocks the value of your content and links." },
      { q: "How often should I audit?", a: "We recommend a deep audit at least quarterly, with continuous monitoring in between." },
      { q: "Do you fix the issues for me?", a: "Yes, we implement fixes directly or work with your developers to ensure they're done right." },
      { q: "Will it improve my speed?", a: "Yes. Core Web Vitals and load time are central to our technical optimisation." },
      { q: "How long until I see results?", a: "Timing depends on the issue, implementation and competition. We review audit findings first and agree a practical schedule." },
      { q: "Can you fix a Google penalty?", a: "Yes, we diagnose and correct issues that have hurt your rankings." },
      { q: "Do I need ongoing technical SEO?", a: "Site health degrades over time, so we recommend ongoing monitoring and care." },
    ],
    related: ["seo-services", "website-development", "google-ranking-growth"],
  },
  {
    slug: "local-seo",
    name: "Local SEO",
    shortName: "Local SEO",
    icon: "MapPin",
    tagline: "Make your business easier to find locally",
    shortDesc:
      "Improve your local search presence and make it easier for nearby customers to find your business.",
    metaTitle: "Local SEO Services for Google Maps Visibility",
    metaDescription:
      "Local SEO services to improve your Google Maps visibility. Optimise your Google Business Profile, build citations and win nearby customers. Get a free audit.",
    keyword: "local SEO services",
    metaKeywords: ["local SEO services", "Google Maps optimization", "Google Business Profile", "local citations", "local search visibility"],
    hero: {
      eyebrow: "Local SEO",
      title: "Improve your local",
      highlight: "search visibility",
      subtitle:
        "We help local businesses present accurate profiles, useful service information and clear contact paths across local search.",
      trust: ["Maps optimisation", "Review growth", "Citation building"],
    },
    pains: [
      { title: "Invisible in local search", desc: "Nearby customers searching for you find competitors instead." },
      { title: "Not on Google Maps", desc: "If you're not in the local pack, you're missing the easiest wins." },
      { title: "Few or no reviews", desc: "Shoppers trust reviews - a lack of them sends people elsewhere." },
      { title: "Inconsistent listings", desc: "Conflicting info across directories confuses search engines and customers." },
    ],
    overview: [
      "When people search for nearby services, they compare the information available about providers. Local SEO can help customers find accurate details about your business and service area.",
      "At Webamazee, we review your Google Business Profile, local listings and review process to improve the accuracy and consistency of your online presence.",
      "Whether you have one location or several, we plan around your profiles, service areas and business priorities, then agree how to monitor relevant enquiries and engagement.",
    ],
    whoNeeds: [
      "Local businesses relying on nearby customers",
      "Multi-location brands and franchises",
      "Service businesses that want more calls and visits",
      "Any business competing in local search results",
    ],
    examples: [
      "Improve the completeness and consistency of local business profiles.",
      "Align service-area pages with the places a business genuinely serves.",
      "Create clear routes from local discovery to calls or enquiries.",
    ],
    whyMattersTitle: "How local SEO can support customer discovery",
    whyMatters: [
      "Local searches can signal a nearby need or service query. Accurate business information and relevant local pages can help customers understand where and how you serve them.",
      "Google Maps and local search results can help people compare nearby providers. We focus on accurate profiles, useful service information and clear contact paths.",
      "Local SEO can improve how a business appears in local results, but timing depends on the starting point, competition and implementation.",
    ],
    process: [
      { step: "01", title: "Local audit", desc: "We review your Google Business Profile, listings and local presence." },
      { step: "02", title: "Profile optimisation", desc: "We perfect your profile, categories, photos and info." },
      { step: "03", title: "Citation building", desc: "We build consistent NAP across directories." },
      { step: "04", title: "Reviews", desc: "We implement a system to earn and manage reviews." },
      { step: "05", title: "Local content", desc: "We create location-specific pages and content." },
      { step: "06", title: "Track & grow", desc: "We monitor local rankings and refine your strategy." },
    ],
    included: [
      { icon: "MapPin", title: "Google Business optimisation", desc: "Accurate business details and useful profile content." },
      { icon: "Database", title: "Citation building", desc: "Consistent NAP across directories to build trust." },
      { icon: "Star", title: "Review management", desc: "A system to earn and manage positive reviews." },
      { icon: "FileText", title: "Local landing pages", desc: "Pages targeting your local keywords and areas." },
      { icon: "Link2", title: "Local link building", desc: "Authority from local sources and partnerships." },
      { icon: "BarChart3", title: "Maps tracking", desc: "Visibility into your local pack and map rankings." },
    ],
    whyChoose: [
      { icon: "MapPin", title: "Local specialists", desc: "Deep expertise in local search and Maps." },
      { icon: "Sparkles", title: "AI-assisted", desc: "AI helps us scale and refine local strategies." },
      { icon: "Scale", title: "Multi-location support", desc: "Strategies can reflect each location’s profile and service area." },
      { icon: "ShieldCheck", title: "White-hat", desc: "Safe tactics that protect your business." },
      { icon: "Headphones", title: "Hands-on", desc: "We manage profiles, reviews and listings for you." },
      { icon: "BarChart3", title: "Clear reporting", desc: "Progress reviewed against agreed local visibility and enquiry measures." },
    ],
    industries: ["Healthcare", "Home Services", "Restaurants", "Retail", "Legal", "Automotive"],
    techStack: ["Google Business Profile", "Google Maps", "Moz Local", "BrightLocal", "Google Analytics", "Search Console", "Ahrefs"],
    measurementAreas: [
      "Local search visibility",
      "Business-profile engagement",
      "Calls and enquiries",
      "Review activity",
    ],
    faqs: [
      { q: "What is local SEO?", a: "It's optimising your online presence to appear in local search results and Google Maps for your service area." },
      { q: "How long before local results?", a: "Timing depends on the starting point, local competition and implementation. We review progress against agreed measures." },
      { q: "Do you manage Google Business Profiles?", a: "Yes, we set up, optimise and manage profiles to maximise visibility." },
      { q: "Is local SEO good for multiple locations?", a: "We can plan a strategy around your locations, profiles and local service areas." },
      { q: "How do I get more reviews?", a: "We build a simple, effective system to earn genuine positive reviews." },
      { q: "Do you build local citations?", a: "Yes, we build and maintain consistent citations across directories." },
      { q: "Can you help a new business rank locally?", a: "Yes, we build local authority from the ground up." },
      { q: "How do we start?", a: "Book a free local SEO audit covering your profile, citations and reviews." },
    ],
    related: ["seo-services", "google-ranking-growth", "website-development"],
  },
  {
    slug: "ai-content-optimization",
    name: "AI Content Optimisation",
    shortName: "AI Content",
    icon: "FilePen",
    tagline: "Content planned around search intent",
    shortDesc:
      "Search-focused content supported by AI and reviewed by experienced editors.",
    metaTitle: "AI Content Optimisation & SEO Content Services",
    metaDescription:
      "AI-assisted content optimisation with expert review, shaped around search intent and your business goals.",
    keyword: "AI content optimisation",
    metaKeywords: ["AI content optimisation", "SEO content services", "search-optimised content", "content optimization at scale", "AI content workflow"],
    hero: {
      eyebrow: "AI Content",
      title: "Useful content for",
      highlight: "your audience",
      subtitle:
        "We use AI to support research and drafts, with human review for accuracy, usefulness and brand voice.",
      trust: ["AI + expert review", "Topical authority", "Search intent"],
    },
    pains: [
      { title: "Content that doesn't rank", desc: "Writing content that search engines and readers ignore." },
      { title: "Too slow to produce", desc: "Manual content creation can't keep pace with demand." },
      { title: "No clear strategy", desc: "Random posts that don't target the right topics or intent." },
      { title: "Inconsistent quality", desc: "An uneven voice and quality that undermines your authority." },
    ],
    overview: [
      "Content can help explain a business’s expertise and answer audience questions. Our AI content optimisation service combines research, drafting and expert review; search outcomes vary by topic and competition.",
      "From briefs through editing and publishing, we structure content around relevant topics and business goals. AI can support research, and editors review deliverables before publication.",
      "The goal is a consistent, useful content workflow that reflects your brand and provides clear information to readers.",
    ],
    whoNeeds: [
      "Businesses wanting to scale content without sacrificing quality",
      "Sites that need to build topical authority to rank",
      "Marketers overwhelmed by content production",
      "Brands that want consistent, on-brand, high-ranking content",
    ],
    examples: [
      "Plan topic clusters around audience questions and subject expertise.",
      "Use AI to support research and drafts, with human editing before publication.",
      "Refresh pages based on intent, usefulness and observed search performance.",
    ],
    whyMattersTitle: "How content can support search visibility",
    whyMatters: [
      "Useful content that answers audience questions can support search visibility. We focus on clarity, relevance and appropriate editorial review rather than promising rankings.",
      "Content priorities should follow audience needs and search intent; publishing volume alone does not guarantee visibility.",
      "AI can support research and drafting, while editors review accuracy, usefulness and brand fit.",
    ],
    process: [
      { step: "01", title: "Content strategy", desc: "We map topics and keywords to your audience and goals." },
      { step: "02", title: "AI drafting", desc: "We generate optimised drafts using AI models." },
      { step: "03", title: "Expert refinement", desc: "Our editors perfect accuracy, voice and quality." },
      { step: "04", title: "On-page optimisation", desc: "We optimise titles, meta, headings and structure." },
      { step: "05", title: "Publishing ops", desc: "We manage publishing, internal links and scheduling." },
      { step: "06", title: "Measure & iterate", desc: "We publish and iterate based on performance." },
    ],
    included: [
      { icon: "Search", title: "Topic & keyword mapping", desc: "Target the search terms that drive your market." },
      { icon: "Target", title: "Intent optimisation", desc: "Match content to what users actually want." },
      { icon: "FileText", title: "On-page SEO", desc: "Titles, meta, headings and structure optimised." },
      { icon: "ShieldCheck", title: "E-E-A-T signals", desc: "Build the trust signals search engines reward." },
      { icon: "RefreshCcw", title: "Content refreshing", desc: "Update and improve existing content." },
      { icon: "BarChart3", title: "Performance reporting", desc: "Clear insight into what's ranking and converting." },
    ],
    whyChoose: [
      { icon: "Sparkles", title: "AI-assisted", desc: "AI-supported research and drafting with human review." },
      { icon: "Users", title: "Expert-reviewed", desc: "Every piece refined by experienced editors." },
      { icon: "Award", title: "Editorial review", desc: "Content checked for usefulness, accuracy and alignment with your goals." },
      { icon: "Scale", title: "Strategic", desc: "Built around topical authority, not random posts." },
      { icon: "Headphones", title: "Managed for you", desc: "We handle strategy, production and publishing." },
      { icon: "Globe", title: "Brand-aware", desc: "Content that reflects your voice and values." },
    ],
    industries: ["SaaS", "B2B", "E-Commerce", "Finance", "Healthcare", "Publishing"],
    techStack: ["OpenAI", "Claude", "Gemini", "Surfer SEO", "Clearscope", "Ahrefs", "GA4", "WordPress / Headless CMS"],
    measurementAreas: [
      "Content quality",
      "Search-intent coverage",
      "Organic visibility",
      "Qualified enquiries",
    ],
    faqs: [
      { q: "Is AI content good for SEO?", a: "Yes, when it's high-quality and expert-reviewed. We combine AI efficiency with human quality for the best results." },
      { q: "How is this different from blog writing?", a: "It's more strategic and scalable - focused on ranking, intent and measurable performance." },
      { q: "Do you write in my brand voice?", a: "We learn your brand and ensure all content reflects your voice and values." },
      { q: "Can you refresh my old content?", a: "Yes, content refreshing is a core part of our service." },
      { q: "How much content will I get?", a: "It depends on your goals and budget. We tailor output to what moves rankings for you." },
      { q: "Do you manage publishing?", a: "Yes, we handle publishing, internal linking and scheduling." },
      { q: "How fast will I see results?", a: "Search visibility develops at different speeds depending on the starting point, competition and content. We review progress against your baseline rather than promising a fixed timeline." },
      { q: "What makes your content rank?", a: "Intent-focused topics, expert quality, strong on-page SEO and topical authority." },
    ],
    related: ["ai-seo", "seo-services", "google-ranking-growth"],
  },
  {
    slug: "google-ranking-growth",
    name: "Google Ranking Growth",
    shortName: "Ranking Growth",
    icon: "TrendingUp",
    tagline: "A data-led path to stronger search visibility",
    shortDesc:
      "A structured process for improving search visibility, with progress reviewed against agreed measures.",
    metaTitle: "Google Ranking Growth Services",
    metaDescription:
      "Google ranking strategy, rank tracking and reporting focused on relevant search visibility. Talk to Webamazee.",
    keyword: "Google ranking growth",
    metaKeywords: ["Google ranking growth", "SEO ranking improvement", "SERP optimization", "organic traffic growth", "keyword ranking"],
    hero: {
      eyebrow: "Ranking Growth",
      title: "Strengthen your search visibility",
      highlight: "with a clear process",
      subtitle:
        "A data-led approach to prioritising relevant queries, improving site foundations and monitoring progress against an agreed baseline.",
      trust: ["Daily rank tracking", "Algorithm-ready", "Transparent"],
    },
    pains: [
      { title: "Low search visibility", desc: "Pages appearing lower in results may be harder for potential customers to discover." },
      { title: "Unpredictable rankings", desc: "Rankings jump around and you don't know why." },
      { title: "No clear plan", desc: "Random tweaks without a strategy deliver no sustained gains." },
      { title: "Algorithm anxiety", desc: "Google updates keep wiping out your hard-won progress." },
    ],
    overview: [
      "Search visibility for relevant queries can help people discover a business. Our Google ranking growth service uses data to prioritise work and review changes against an agreed baseline; positions cannot be guaranteed.",
      "We track priority queries and use available performance data to refine the work. Reporting connects visibility with agreed business measures.",
      "Rather than relying on one-off fixes, we review technical foundations, content and authority as part of an ongoing programme.",
    ],
    whoNeeds: [
      "Businesses with low visibility for priority searches",
      "Businesses seeing traffic decline or plateau",
      "Companies that want to outrank specific competitors",
      "Brands investing in SEO without clear progress",
    ],
    examples: [
      "Prioritise relevant searches based on intent and competitive context.",
      "Improve pages that have a clear path to better visibility.",
      "Review search positions and organic traffic against an agreed baseline.",
    ],
    whyMattersTitle: "Why sustainable search visibility matters",
    whyMatters: [
      "Visibility in relevant search results can bring qualified visitors, but the impact varies by query, competition and search-results layout.",
      "Search visibility can support organic visits, while the relationship between rankings, traffic and enquiries varies by query and business.",
      "Ongoing review helps you respond to search changes and maintain the technical and content foundations you have built.",
    ],
    process: [
      { step: "01", title: "Baseline", desc: "We establish your current rankings and opportunity." },
      { step: "02", title: "Strategy", desc: "We prioritise keywords and build an action plan." },
      { step: "03", title: "Technical", desc: "We ensure a solid foundation for rankings." },
      { step: "04", title: "Content & on-page", desc: "We optimise pages for target keywords." },
      { step: "05", title: "Authority", desc: "We earn the links that boost your domain power." },
      { step: "06", title: "Track & adapt", desc: "We monitor rankings and adapt to algorithm shifts." },
    ],
    included: [
      { icon: "BarChart3", title: "Rank tracking", desc: "Daily visibility into your keyword positions." },
      { icon: "Target", title: "Competitor benchmarks", desc: "Know exactly where you stand against rivals." },
      { icon: "FileText", title: "Content & on-page", desc: "Optimise pages for target keywords." },
      { icon: "Link2", title: "Authority building", desc: "Earn the links that boost your domain power." },
      { icon: "RefreshCcw", title: "Algorithm adaptation", desc: "Stay ahead of Google's updates." },
      { icon: "ShieldCheck", title: "Reporting", desc: "Clear evidence of progress and ROI." },
    ],
    whyChoose: [
      { icon: "LineChart", title: "Data-led", desc: "Every move backed by analytics." },
      { icon: "Sparkles", title: "AI-assisted", desc: "AI helps us find and exploit opportunities." },
      { icon: "BarChart3", title: "Transparent reporting", desc: "Progress reviewed against priority queries and agreed business measures." },
      { icon: "Scale", title: "Adaptable", desc: "A search approach reviewed as algorithms and business priorities change." },
      { icon: "Headphones", title: "Responsive", desc: "A dedicated team on your side." },
      { icon: "Globe", title: "International", desc: "Global expertise." },
    ],
    industries: ["SaaS", "E-Commerce", "B2B", "Healthcare", "Finance", "Professional Services"],
    techStack: ["Ahrefs", "SEMrush", "Google Search Console", "GA4", "Screaming Frog", "PageSpeed Insights", "Surfer SEO"],
    measurementAreas: [
      "Priority keyword visibility",
      "Organic traffic quality",
      "Qualified enquiries",
      "Technical health",
    ],
    faqs: [
      { q: "How fast will my rankings improve?", a: "Ranking movement varies with the site's starting point, competition and implementation. We set expectations after reviewing the project and report against an agreed baseline." },
      { q: "Which keywords should I target?", a: "We identify keywords that balance search volume, intent and winnability for your business." },
      { q: "Can you recover from a penalty?", a: "Yes, we diagnose and fix issues that have hurt your rankings." },
      { q: "How do I know it's working?", a: "You get transparent rank tracking and reporting showing exactly what's improving." },
      { q: "Do you adapt to Google updates?", a: "Yes, we continuously adapt strategy to algorithm changes." },
      { q: "Will rankings stay after we stop?", a: "Search positions can change as competitors, content and algorithms evolve. Ongoing review can help identify changes that need attention." },
      { q: "How is this different from basic SEO?", a: "It's a systematic, data-led growth programme, not one-off fixes." },
      { q: "How do we start?", a: "Book a free call and we’ll review your priorities and identify practical next steps for search visibility." },
    ],
    related: ["seo-services", "ai-seo", "link-building"],
  },
  {
    slug: "competitor-analysis",
    name: "Competitor Analysis",
    shortName: "Competitor Intel",
    icon: "Target",
    tagline: "Know your rivals, win your market",
    shortDesc:
      "Reverse-engineer competitor strategies to find the gaps and opportunities you can win.",
    metaTitle: "SEO Competitor Analysis & Market Gap Services",
    metaDescription:
      "Competitor analysis services that reveal your rivals' SEO, content and backlink strategies. Find winning gaps and outrank them with Webamazee.",
    keyword: "competitor analysis services",
    metaKeywords: ["SEO competitor analysis", "competitor audit", "market gap analysis", "backlink analysis", "competitive SEO strategy"],
    hero: {
      eyebrow: "Competitor Analysis",
      title: "See what your competitors",
      highlight: "are really doing",
      subtitle:
        "We reverse-engineer your competitors' SEO, content and backlink strategies to reveal the opportunities you can win.",
      trust: ["Gap analysis", "Backlink intel", "Actionable roadmap"],
    },
    pains: [
      { title: "Flying blind", desc: "You don't know why competitors outrank you - or how to close the gap." },
      { title: "Guesswork strategy", desc: "Decisions based on hunches waste time and budget." },
      { title: "Competitors pulling ahead", desc: "Rivals are capturing the keywords and links you want." },
      { title: "Wasted effort", desc: "You work hard on the wrong things while opportunities sit unclaimed." },
    ],
    overview: [
      "Your competitors are testing strategies and accumulating data. Competitor analysis turns their work into your advantage - showing you exactly where they're strong and where they're vulnerable.",
      "We analyse their rankings, content and backlinks to build a roadmap that helps you outrank and outperform them. Instead of guessing, you'll know precisely what to do next.",
      "The result is a clear, evidence-based strategy that focuses your effort on the opportunities most likely to move the needle.",
    ],
    whoNeeds: [
      "Businesses losing market share to competitors",
      "Brands that want a data-backed SEO strategy",
      "Companies entering a new or competitive market",
      "Teams unsure where to focus their marketing effort",
    ],
    examples: [
      "Compare competitors' content, positioning and search visibility.",
      "Identify content and authority gaps for further review.",
      "Turn findings into a practical, prioritised roadmap.",
    ],
    whyMattersTitle: "Why competitor intelligence wins markets",
    whyMatters: [
      "Time spent guessing can delay useful decisions. Understanding competitor activity gives you evidence to plan next steps.",
      "Competitor analysis can surface keyword, content and authority gaps to consider. We assess each opportunity against your goals and available resources.",
      "Data-backed decisions reduce wasted spend and focus your budget where it delivers. You stop competing in the dark and start winning.",
    ],
    process: [
      { step: "01", title: "Identify rivals", desc: "We map your true competitive landscape." },
      { step: "02", title: "Deep analysis", desc: "We analyse their rankings, content and backlinks." },
      { step: "03", title: "Gap mapping", desc: "We find the opportunities they're missing." },
      { step: "04", title: "Benchmark", desc: "We establish clear performance baselines." },
      { step: "05", title: "Strategy", desc: "We prioritise opportunities by relevance, potential impact and effort." },
      { step: "06", title: "Action plan", desc: "We build a roadmap to outperform your rivals." },
    ],
    included: [
      { icon: "Search", title: "Keyword gap analysis", desc: "Keywords they rank for that you don't." },
      { icon: "Link2", title: "Backlink intel", desc: "See the links driving their authority." },
      { icon: "FileText", title: "Content analysis", desc: "Understand what works in your niche." },
      { icon: "BarChart3", title: "Position benchmarking", desc: "Track your progress against competitors." },
      { icon: "Target", title: "Market share insights", desc: "Understand your share of the search market." },
      { icon: "MapPin", title: "Actionable roadmap", desc: "Clear, prioritised next steps to win." },
    ],
    whyChoose: [
      { icon: "Sparkles", title: "AI-powered", desc: "AI surfaces insights manual analysis misses." },
      { icon: "Award", title: "Expert analysis", desc: "Deep, strategic understanding of search." },
      { icon: "Scale", title: "Actionable", desc: "Not just reports - a clear plan to win." },
      { icon: "Target", title: "Focused", desc: "Prioritised on what moves your market." },
      { icon: "Headphones", title: "Supporting", desc: "We help you execute the roadmap." },
      { icon: "Globe", title: "Any market", desc: "We analyse competitors in any industry." },
    ],
    industries: ["SaaS", "E-Commerce", "B2B", "Healthcare", "Finance", "Retail"],
    techStack: ["Ahrefs", "SEMrush", "SimilarWeb", "Screaming Frog", "Google Search Console", "GA4", "Moz"],
    measurementAreas: [
      "Keyword opportunities",
      "Content and topic gaps",
      "Authority opportunities",
      "Prioritised actions",
    ],
    faqs: [
      { q: "Who should get a competitor analysis?", a: "Any business that wants a clear, data-backed strategy for outranking competitors in search." },
      { q: "How often should I run one?", a: "We recommend a full analysis quarterly, with ongoing tracking in between." },
      { q: "What do I get out of it?", a: "Actionable insights and a roadmap to win the opportunities competitors are missing." },
      { q: "Can you do this for my niche?", a: "Yes, we analyse competitors in any industry or market." },
      { q: "How long does it take?", a: "Timing depends on the market, scope and available data. We agree the analysis schedule after an initial review." },
      { q: "Is it just a report?", a: "No - you get prioritised, actionable next steps, not just data." },
      { q: "Do you analyse backlinks?", a: "Yes, we identify the links driving competitor authority and opportunities for you." },
      { q: "How do we get started?", a: "Book a free call and we'll scope the right analysis for your market." },
    ],
    related: ["seo-services", "link-building", "google-ranking-growth"],
  },
  {
    slug: "link-building",
    name: "Link Building",
    shortName: "Link Building",
    icon: "Link2",
    tagline: "Earn authority that compounds",
    shortDesc:
      "White-hat, authoritative backlinks that boost your domain power and rankings.",
    metaTitle: "Link Building & White-Hat Backlink Services",
    metaDescription:
      "White-hat link building services. Earn high-authority backlinks that boost your domain power and rankings. Digital PR, guest posts and outreach from Webamazee.",
    keyword: "link building services",
    metaKeywords: ["link building services", "white-hat backlinks", "digital PR", "guest posting", "authoritative backlinks"],
    hero: {
      eyebrow: "Link Building",
      title: "Backlinks that build",
      highlight: "lasting authority",
      subtitle:
        "We earn high-quality, white-hat backlinks that boost your domain authority and send rankings compounding upward.",
      trust: ["White-hat SEO", "Digital PR", "Relevant authority"],
    },
    pains: [
      { title: "Stuck rankings", desc: "Good content won't rank without the authority backlinks provide." },
      { title: "Fear of penalties", desc: "Risky link schemes can put search visibility and site reputation at risk." },
      { title: "No time to build", desc: "Quality outreach takes real time and skill you don't have." },
      { title: "Wrong links", desc: "Irrelevant or low-quality links do more harm than good." },
    ],
    overview: [
      "Relevant links can be one part of a broader SEO foundation. Our link building service focuses on earning appropriate coverage through ethical outreach and useful content.",
      "Through digital PR, guest posts, content partnerships and outreach, we work to develop a relevant backlink profile. Outcomes depend on the sites, content and market involved.",
      "We never use risky schemes. Every link is earned and relevant, protecting your business and building authority that lasts.",
    ],
    whoNeeds: [
      "Sites with content that's underperforming in rankings",
      "Businesses wanting to outrank competitors in competitive niches",
      "Brands ready for digital PR and visibility",
      "Sites building authority for new keywords and markets",
    ],
    examples: [
      "Assess opportunities for relevant coverage and partnerships.",
      "Develop useful resources that can earn editorial links.",
      "Review backlink quality and risk before outreach.",
    ],
    whyMattersTitle: "Why links are the currency of authority",
    whyMatters: [
      "Links from relevant sites can provide useful context and contribute to a website’s authority, alongside content quality and technical foundations.",
      "Relevant links can complement other SEO work. We review quality and fit rather than treating link volume as a goal.",
      "A considered backlink profile is one part of a broader SEO foundation and should be reviewed as search systems change.",
    ],
    process: [
      { step: "01", title: "Audit", desc: "We assess your current backlink profile and gaps." },
      { step: "02", title: "Prospecting", desc: "We find high-authority, relevant link opportunities." },
      { step: "03", title: "Content & PR", desc: "We craft assets worth linking to and share them." },
      { step: "04", title: "Outreach", desc: "We build relationships and earn placements." },
      { step: "05", title: "Build", desc: "We secure quality links on relevant sites." },
      { step: "06", title: "Monitor & protect", desc: "We track links and disavow any harmful ones." },
    ],
    included: [
      { icon: "Sparkles", title: "Digital PR", desc: "Earn links through compelling stories and coverage." },
      { icon: "FileText", title: "Guest posting", desc: "Authority links on relevant, trusted websites." },
      { icon: "Link2", title: "Content partnerships", desc: "Collaborative content that earns natural links." },
      { icon: "Wrench", title: "Broken link building", desc: "Turn broken opportunities into your links." },
      { icon: "Target", title: "Competitor backlinks", desc: "Replicate the links that give rivals their edge." },
      { icon: "ShieldCheck", title: "Link monitoring", desc: "Track growth and protect your profile's health." },
    ],
    whyChoose: [
      { icon: "ShieldCheck", title: "White-hat approach", desc: "Safe, ethical links that protect your business." },
      { icon: "Sparkles", title: "Digital PR", desc: "Earned, natural authority - not bought links." },
      { icon: "Award", title: "Relevant & quality", desc: "Links that actually move rankings." },
      { icon: "Scale", title: "Transparent", desc: "Clear reporting on every link earned." },
      { icon: "Headphones", title: "Hands-on", desc: "A dedicated outreach team on your side." },
      { icon: "Globe", title: "Any niche", desc: "Expertise building links across industries." },
    ],
    industries: ["SaaS", "E-Commerce", "Finance", "Healthcare", "B2B", "Publishing"],
    techStack: ["Ahrefs", "SEMrush", "BuzzStream", "Pitchbox", "Moz", "Google Search Console", "Majestic"],
    measurementAreas: [
      "Referring-domain relevance",
      "Link quality",
      "Organic visibility",
      "Search-position trends",
    ],
    faqs: [
      { q: "Are your links safe?", a: "Yes. We only use white-hat, Google-approved methods that protect your business." },
      { q: "How many links will I get?", a: "We focus on quality over quantity, earning relevant links that actually move rankings." },
      { q: "How long until links help?", a: "Quality links can support authority over time. The pace depends on your market, the sites involved and the wider SEO foundation." },
      { q: "Do you build links in my industry?", a: "Yes, we target authoritative, relevant sites in your niche and market." },
      { q: "Do you use digital PR?", a: "Yes, digital PR is a core part of earning natural, high-quality links." },
      { q: "Will you disavow bad links?", a: "Yes, we monitor your profile and disavow any harmful or spammy links." },
      { q: "Is this better than buying links?", a: "Absolutely. Buying links risks penalties; earned links build lasting authority." },
      { q: "How do we get started?", a: "Book a free call and we'll audit your profile and plan a safe, effective programme." },
    ],
    related: ["seo-services", "competitor-analysis", "google-ranking-growth"],
  },
  // Social Media Management category (defined in ./services-social)
  ...socialServiceEntries,
];

/** Every service page presents ten visible FAQs; the same array feeds FAQ schema. */
export const services: Service[] = serviceEntries.map((service) => ({
  ...service,
  faqs: [
    ...service.faqs,
    {
      q: `What information does Webamazee need to plan ${service.shortName.toLowerCase()}?`,
      a: "We start with your business goals, target audience, current website or assets, priorities and any practical constraints that affect the scope.",
    },
    {
      q: `Can ${service.shortName.toLowerCase()} be combined with other Webamazee services?`,
      a: "Yes. Where it supports the goal, we can coordinate this work with website development, SEO, content, redesign or conversion-focused landing pages.",
    },
  ].slice(0, 10),
}));

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getRelatedServices(service: Service): Service[] {
  return service.related
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is Service => Boolean(s));
}
