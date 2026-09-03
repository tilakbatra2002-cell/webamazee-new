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
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    subtitle: string;
    trust: string[];
    stats: { value: string; label: string }[];
  };
  pains: { title: string; desc: string }[];
  overview: string[];
  whoNeeds: string[];
  examples: string[];
  whyMattersTitle: string;
  whyMatters: string[];
  whyStats: { value: string; label: string }[];
  process: { step: string; title: string; desc: string }[];
  included: { icon: string; title: string; desc: string }[];
  whyChoose: { icon: string; title: string; desc: string }[];
  industries: string[];
  techStack: string[];
  resultsTitle: string;
  resultsRows: { label: string; before: string; after: string }[];
  resultsStory: string[];
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
    metaTitle: "Website Development Services | Custom Web Design | Webamazee",
    metaDescription:
      "Premium website development services. Custom, fast, SEO-ready websites that convert. Next.js builds, 90+ Lighthouse scores. Get a free quote from Webamazee today.",
    keyword: "website development services",
    hero: {
      eyebrow: "Website Development",
      title: "Websites built to",
      highlight: "convert, not just look good",
      subtitle:
        "We design and build lightning-fast, premium websites that turn visitors into customers — engineered with SEO and performance at the core.",
      trust: ["90+ Lighthouse scores", "SEO-ready from day one", "Mobile-first & responsive"],
      stats: [
        { value: "3–6", label: "Week launch" },
        { value: "<1s", label: "Load time" },
        { value: "2.4×", label: "Avg. conversion lift" },
      ],
    },
    pains: [
      { title: "Slow load times", desc: "Visitors abandon sites that take more than a few seconds, costing you leads daily." },
      { title: "Outdated look", desc: "A dated website erodes trust instantly and pushes buyers to competitors." },
      { title: "No mobile experience", desc: "Over half your traffic is mobile — if it's broken there, you're losing it." },
      { title: "Weak conversion paths", desc: "Pretty pages without clear CTAs and structure quietly leak revenue." },
    ],
    overview: [
      "Website development is the foundation of your entire online presence. It's the first impression most customers have of your business, and it's the engine that turns search traffic into enquiries, sales and loyal customers. A well-built website isn't just a digital brochure — it's a high-performing sales channel.",
      "At Webamazee, we build premium custom websites from the ground up using Next.js, React and modern design systems. We don't rely on generic templates. Every project starts with your brand, your audience and your goals, then becomes a bespoke experience designed to guide visitors toward a buying decision.",
      "From sub-second load times to clean architecture and built-in SEO, our websites are engineered to perform — for your users and for Google. The result is a site that looks world-class and works even harder.",
    ],
    whoNeeds: [
      "Business owners with an outdated or underperforming website",
      "Startups launching a new product or service",
      "SMEs that need to build trust and generate enquiries",
      "Companies preparing to invest in SEO and paid campaigns",
    ],
    examples: [
      "A B2B services firm doubled qualified leads after a rebuild and SEO fix",
      "An e-commerce brand cut load time from 8s to 3s and lifted conversions 2.4×",
      "A SaaS startup launched a marketing site that ranked on page one in 90 days",
    ],
    whyMattersTitle: "Your website is your highest-ROI asset",
    whyMatters: [
      "Your website works for you 24/7 — every hour of every day. Unlike ads that stop the moment you stop paying, a well-built website compounds value through organic traffic, credibility and conversions.",
      "Speed and experience directly affect revenue. Research consistently shows that faster pages convert better and rank higher. A premium website gives you an unfair advantage over competitors still running slow, dated sites.",
      "As you invest in SEO, content and paid traffic, every visitor lands on your website. That's why it must convert. We build websites that maximise the return on every channel you feed them.",
    ],
    whyStats: [
      { value: "53%", label: "leave if a page takes 3s+" },
      { value: "2.4×", label: "conversion lift after rebuild" },
      { value: "<1s", label: "our target load time" },
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
      { icon: "Zap", title: "Speed optimisation", desc: "Core Web Vitals optimised for sub-second loading." },
      { icon: "Settings2", title: "CMS access", desc: "Edit content yourself without touching code." },
      { icon: "ShieldCheck", title: "Security", desc: "Best-practice security to protect your business." },
      { icon: "BarChart3", title: "Analytics", desc: "Tracking and reporting wired in from day one." },
      { icon: "Headphones", title: "Ongoing support", desc: "A care plan for updates, backups and improvements." },
    ],
    whyChoose: [
      { icon: "Sparkles", title: "AI-first approach", desc: "We use AI to accelerate builds without compromising quality." },
      { icon: "Award", title: "Premium craft", desc: "Design and engineering comparable to award-winning agencies." },
      { icon: "Scale", title: "Transparent process", desc: "Clear milestones, fixed pricing and honest communication." },
      { icon: "Gauge", title: "Performance-first", desc: "Speed and Core Web Vitals are non-negotiable." },
      { icon: "Headphones", title: "Dedicated team", desc: "A responsive team invested in your success." },
      { icon: "Globe", title: "International standards", desc: "We serve businesses worldwide to a global standard." },
    ],
    industries: ["B2B Services", "SaaS & Startups", "E-Commerce", "Professional Services", "Healthcare", "Real Estate"],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel", "Sanity / Headless CMS", "Google Analytics", "Search Console"],
    resultsTitle: "Websites that deliver measurable results",
    resultsRows: [
      { label: "Page load time", before: "8.0s", after: "1.2s" },
      { label: "Conversion rate", before: "1.1%", after: "2.6%" },
      { label: "Qualified leads", before: "—", after: "+112%" },
      { label: "Core Web Vitals", before: "Poor", after: "All green" },
    ],
    resultsStory: [
      "One of our B2B clients came to us with a slow, dated site that was costing them enquiries. We rebuilt it around clear service pages, strong trust signals and prominent calls to action — while fixing technical SEO and cutting load time from 8 seconds to just over 1.",
      "Within months, qualified leads more than doubled and the conversion rate improved 2.4×. The website went from a liability to their most reliable source of growth.",
    ],
    faqs: [
      { q: "How long does a website build take?", a: "Most premium builds launch within 3–6 weeks depending on scope, content and integrations." },
      { q: "Will my website be mobile friendly?", a: "Absolutely. Every build is mobile-first and pixel-perfect across all devices." },
      { q: "Can I edit the website myself?", a: "Yes. We set up a CMS so you can update content, add pages and manage your site without touching code." },
      { q: "Do you build with templates?", a: "No. Every website is custom-designed and built around your brand, audience and goals." },
      { q: "Is the website SEO-ready?", a: "Yes. Clean architecture, schema, fast load times and Core Web Vitals are built in from day one." },
      { q: "Will my website load quickly?", a: "We target sub-second load times and optimise all Core Web Vitals for performance." },
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
    tagline: "Transform your outdated site into a growth machine",
    shortDesc:
      "Modernise your existing website with a redesign that improves performance, UX and conversions.",
    metaTitle: "Website Redesign Services | Modern Web Redesign | Webamazee",
    metaDescription:
      "Professional website redesign services. Transform your outdated site into a fast, modern, conversion-focused experience — without losing your SEO. Get a free redesign audit from Webamazee.",
    keyword: "website redesign services",
    hero: {
      eyebrow: "Website Redesign",
      title: "Your old website is costing you",
      highlight: "customers every day",
      subtitle:
        "We transform outdated, slow and confusing websites into modern, premium experiences that build trust, rank higher and convert more.",
      trust: ["SEO-safe migration", "UX & conversion audit", "Zero downtime"],
      stats: [
        { value: "3–6", label: "Week timeline" },
        { value: "2.4×", label: "Avg. conversion lift" },
        { value: "100%", label: "Rankings preserved" },
      ],
    },
    pains: [
      { title: "Dated, untrustworthy look", desc: "Visitors judge your credibility in seconds — an old site loses them fast." },
      { title: "Poor mobile experience", desc: "If your site isn't great on mobile, you're alienating most of your traffic." },
      { title: "Confusing navigation", desc: "When visitors can't find what they need, they leave — often to competitors." },
      { title: "Slow & clunky", desc: "Slow pages frustrate users and tank your Core Web Vitals and rankings." },
    ],
    overview: [
      "A website redesign is one of the highest-ROI investments a business can make. Your website is the first impression for most customers, and if it's slow, dated or hard to navigate, it's quietly costing you leads every single day.",
      "At Webamazee we preserve what works, fix what doesn't and rebuild your site around conversion. Crucially, we do this without losing your hard-won SEO equity — using careful migration, redirects and preserved structure.",
      "The result is a modern, premium website that builds trust, ranks higher and turns more visitors into customers. It's not a cosmetic refresh; it's a strategic rebuild that pays for itself.",
    ],
    whoNeeds: [
      "Businesses with a site that looks or performs outdated",
      "Companies losing leads due to poor mobile experience",
      "Organisations preparing to invest in SEO or paid ads",
      "Brands that have evolved but whose website hasn't",
    ],
    examples: [
      "A legal firm redesigned its site and more than doubled qualified leads",
      "A homeware retailer cut load time 60% and lifted organic revenue 4.2×",
      "A local clinic rebuilt around local SEO and ranked #1 in Maps across 12 locations",
    ],
    whyMattersTitle: "Why a redesign pays for itself",
    whyMatters: [
      "Your competitors are investing in their online presence. Every day your site underperforms, you hand them leads. A redesign levels the playing field — and often puts you ahead.",
      "Beyond looks, a redesign is a performance investment. Faster pages rank higher and convert better, and a clearer structure makes your marketing and SEO spend far more effective.",
      "The cost of NOT redesigning is often higher than the cost of redesigning. An outdated site erodes trust, wastes ad spend and suppresses organic growth month after month.",
    ],
    whyStats: [
      { value: "75%", label: "judge credibility by design" },
      { value: "2.4×", label: "conversion lift after redesign" },
      { value: "0", label: "rankings lost with us" },
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
      { icon: "Award", title: "Premium craft", desc: "Design comparable to leading international agencies." },
      { icon: "Scale", title: "Transparent pricing", desc: "Clear proposals with no hidden fees." },
      { icon: "Gauge", title: "Performance-first", desc: "Speed and Core Web Vitals are built in." },
      { icon: "Globe", title: "Global standards", desc: "Serving businesses worldwide." },
    ],
    industries: ["Legal & Financial", "Healthcare", "Professional Services", "E-Commerce", "Real Estate", "Hospitality"],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Google Search Console", "Screaming Frog", "GA4", "Schema.org", "Vercel"],
    resultsTitle: "Redesigns that deliver a step-change in results",
    resultsRows: [
      { label: "Qualified leads", before: "baseline", after: "+112%" },
      { label: "Page load time", before: "8.0s", after: "1.2s" },
      { label: "Conversion rate", before: "1.1%", after: "2.6%" },
      { label: "Organic traffic", before: "baseline", after: "+320%" },
    ],
    resultsStory: [
      "A professional services firm came to us with a dated, slow website that was undermining their credibility. We redesigned it around clear service pages, trust signals and strong calls to action, while performing an SEO-safe migration.",
      "The results were dramatic: load time dropped from 8 to 1.2 seconds, conversion rate more than doubled and qualified leads rose 112%. The redesign paid for itself within a few months.",
    ],
    faqs: [
      { q: "Will I lose my SEO rankings in a redesign?", a: "No. We follow careful migration best practices with redirects and preserved structure to protect your rankings and traffic." },
      { q: "How long does a redesign take?", a: "Most redesigns complete within 3–6 weeks depending on scope and content." },
      { q: "Can you keep my current brand?", a: "Yes. We can refresh your existing brand or build a whole new identity." },
      { q: "Will it be mobile-friendly?", a: "Every redesign is mobile-first, so it looks and works beautifully on all devices." },
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
      "Focused, high-converting landing pages built around your ads, offers and goals.",
    metaTitle: "Landing Page Development | High-Converting Landing Pages | Webamazee",
    metaDescription:
      "High-converting landing page design and development. Focused pages that turn ad traffic and clicks into leads and sales. Fast, A/B-ready builds from Webamazee.",
    keyword: "landing page development",
    hero: {
      eyebrow: "Landing Pages",
      title: "Landing pages engineered to",
      highlight: "maximise conversions",
      subtitle:
        "We build focused, high-converting landing pages that turn your ad spend and traffic into leads and sales — with clarity and speed.",
      trust: ["A/B testing ready", "Sub-second load", "Lead capture built in"],
      stats: [
        { value: "1-2", label: "Week turnaround" },
        { value: "+35%", label: "Avg. conversion lift" },
        { value: "98/100", label: "Avg. PageSpeed" },
      ],
    },
    pains: [
      { title: "Wasted ad spend", desc: "Sending ads to your homepage scatters attention and burns budget." },
      { title: "Weak calls to action", desc: "Unclear CTAs leave visitors unsure what to do next." },
      { title: "Slow pages", desc: "Slow landing pages lose conversions before visitors even read your offer." },
      { title: "No testing", desc: "Without A/B testing you can't know what's working - or improve it." },
    ],
    overview: [
      "A landing page is a single, focused page built around one goal - capturing a lead or making a sale. Unlike a homepage that tries to do everything, a great landing page removes distractions and drives visitors toward a single action.",
      "At Webamazee we build landing pages that are laser-focused, fast and persuasive. Every element - headline, copy, imagery, form and CTA - is designed to maximise conversion for your specific campaign or offer.",
      "We align your page with your ads, speak directly to your audience and remove every barrier to conversion. The result is higher conversion rates and a dramatically better return on your ad spend.",
    ],
    whoNeeds: [
      "Marketers running Google or Meta ad campaigns",
      "Businesses launching a new product or offer",
      "Startups collecting leads or demo signups",
      "E-commerce brands running promotions and sales",
    ],
    examples: [
      "A product launch page achieved 2.8x the conversions of the old funnel",
      "A SaaS landing page lifted demo signups 186%",
      "A B2B lead page doubled qualified enquiries with clearer CTAs",
    ],
    whyMattersTitle: "Why landing pages boost your ROI",
    whyMatters: [
      "Every ad you run sends traffic somewhere. A focused landing page ensures that traffic converts instead of bouncing. The difference between a landing page and a generic homepage is often the difference between profit and loss on a campaign.",
      "Landing pages also improve your Quality Score and ad efficiency, lowering your cost per click over time. Aligned messaging plus a clear CTA means more conversions from the same budget.",
      "Best of all, landing pages are built to be tested. We create pages ready for A/B testing, so you can continuously lift conversion rates and compound your results.",
    ],
    whyStats: [
      { value: "2-3x", label: "higher conversion than homepages" },
      { value: "-30%", label: "lower cost per lead with aligned pages" },
      { value: "1-2wk", label: "typical launch time" },
    ],
    process: [
      { step: "01", title: "Objective", desc: "We clarify the page's goal, audience and the offer you're promoting." },
      { step: "02", title: "Persuasion map", desc: "We structure the copy, sections and CTA for maximum response." },
      { step: "03", title: "Design", desc: "We craft a fast, focused, on-brand page." },
      { step: "04", title: "Build & integrate", desc: "We build the page and connect forms, tracking and your CRM." },
      { step: "05", title: "Quality & speed", desc: "We ensure sub-second load times and flawless mobile performance." },
      { step: "06", title: "Launch & test", desc: "We launch and set up A/B testing to keep improving." },
    ],
    included: [
      { icon: "Package", title: "Campaign-matched design", desc: "Visual and message alignment with your ads." },
      { icon: "Target", title: "Clear single CTA", desc: "One unmissable action per page." },
      { icon: "Database", title: "Lead capture", desc: "Optimised forms that collect the right data." },
      { icon: "Zap", title: "Speed", desc: "Lightning-fast pages that keep users engaged." },
      { icon: "BarChart3", title: "Tracking & pixels", desc: "Analytics and remarketing from day one." },
      { icon: "RefreshCcw", title: "A/B ready", desc: "Built to test and optimise continuously." },
    ],
    whyChoose: [
      { icon: "Sparkles", title: "Conversion-focused", desc: "Every decision serves the page's goal." },
      { icon: "Zap", title: "Fast delivery", desc: "High-quality pages live in 1-2 weeks." },
      { icon: "Gauge", title: "Top performance", desc: "PageSpeed scores that protect conversions." },
      { icon: "Scale", title: "Transparent", desc: "Clear scope, pricing and results." },
      { icon: "Headphones", title: "Ongoing testing", desc: "We help you improve conversion over time." },
      { icon: "Globe", title: "Global expertise", desc: "We build for audiences worldwide." },
    ],
    industries: ["SaaS", "E-Commerce", "Finance", "Real Estate", "Education", "Healthcare"],
    techStack: ["Next.js", "React", "Tailwind CSS", "Vercel", "GA4", "Meta Pixel", "Google Tag Manager", "HubSpot", "Klaviyo", "Hotjar"],
    resultsTitle: "Landing pages that turn clicks into customers",
    resultsRows: [
      { label: "Conversion rate", before: "2.1%", after: "5.8%" },
      { label: "Cost per lead", before: "baseline", after: "-38%" },
      { label: "Page load time", before: "4.5s", after: "0.9s" },
      { label: "Demo signups", before: "baseline", after: "+186%" },
    ],
    resultsStory: [
      "A SaaS client was sending paid traffic to a generic site and watching it bounce. We built a focused demo-signup landing page aligned to their ads, with a clear value proposition and frictionless form.",
      "Demo signups jumped 186% and the cost per lead dropped sharply. Because the page was A/B-test ready, we kept refining headlines and CTAs to compound the gains.",
    ],
    faqs: [
      { q: "How many landing pages do I need?", a: "We recommend one per campaign or offer. We can build a scalable system that grows with you." },
      { q: "Can you integrate with my email or CRM?", a: "Yes, we integrate with tools like HubSpot, Mailchimp and Klaviyo to capture and manage leads." },
      { q: "Do you include A/B testing?", a: "We build pages ready to test and can run experiments to improve conversion." },
      { q: "How fast can I get a page?", a: "Most landing pages launch within 1-2 weeks." },
      { q: "Will the page load quickly?", a: "Yes, we target sub-second load times and top PageSpeed scores." },
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
      "Checkout-optimised, SEO-ready e-commerce stores that turn browsers into buyers.",
    metaTitle: "E-Commerce Development Services | Online Store Build | Webamazee",
    metaDescription:
      "Premium e-commerce development services. Build a fast, secure, SEO-ready online store that converts and scales. Shopify and headless builds from Webamazee.",
    keyword: "e-commerce development services",
    hero: {
      eyebrow: "E-Commerce",
      title: "Online stores designed to",
      highlight: "sell more",
      subtitle:
        "We build premium, conversion-optimised e-commerce stores - fast, secure and built to grow revenue.",
      trust: ["Checkout-optimised", "SEO-ready store", "Secure payments"],
      stats: [
        { value: "4-8", label: "Week launch" },
        { value: "4.2x", label: "Avg. revenue lift" },
        { value: "0", label: "hidden fees" },
      ],
    },
    pains: [
      { title: "High cart abandonment", desc: "A clunky checkout silently costs you a large share of potential sales." },
      { title: "Invisible to Google", desc: "Poorly structured product pages rank for almost nothing." },
      { title: "Slow storefront", desc: "Slow pages frustrate shoppers and sink your Core Web Vitals." },
      { title: "Hard to scale", desc: "Rigid platforms make growth, new products and integrations painful." },
    ],
    overview: [
      "Selling online is about more than listing products. It's about creating a fast, intuitive, trustworthy experience that guides shoppers from browsing to checkout with minimal friction.",
      "At Webamazee we build e-commerce stores that are fast, secure and engineered to convert. From product pages and checkout flow to SEO and integrations, every element is designed to drive sales and repeat customers.",
      "We build on leading platforms like Shopify and headless commerce solutions, choosing the right foundation for your catalogue, budget and growth ambitions.",
    ],
    whoNeeds: [
      "Retailers and brands starting online sales",
      "Existing stores that need higher conversions",
      "E-commerce businesses scaling across markets",
      "Brands ready to rank on Google and marketplaces",
    ],
    examples: [
      "A homeware brand rebuilt its store and grew organic revenue 4.2x",
      "A fashion retailer streamlined checkout and reduced abandonment",
      "A multi-market store scaled smoothly across regions and currencies",
    ],
    whyMattersTitle: "Why e-commerce performance equals revenue",
    whyMatters: [
      "In e-commerce, speed, clarity and trust directly translate into sales. Every extra step in checkout, every slow page and every confusing layout costs you revenue.",
      "SEO is the most cost-effective growth channel for stores. A well-structured catalogue that ranks on Google brings you buyers already searching to purchase - at a fraction of the cost of ads.",
      "A scalable platform means you can add products, enter new markets and run promotions without outgrowing your store. We build for today's sales and tomorrow's growth.",
    ],
    whyStats: [
      { value: "70%", label: "of carts abandoned at checkout" },
      { value: "4.2x", label: "organic revenue growth achieved" },
      { value: "38%", label: "lower cost per acquisition" },
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
    resultsTitle: "Stores that sell - and keep selling",
    resultsRows: [
      { label: "Organic revenue", before: "baseline", after: "4.2x" },
      { label: "Organic traffic", before: "baseline", after: "+320%" },
      { label: "Cart abandonment", before: "68%", after: "44%" },
      { label: "Cost per acquisition", before: "baseline", after: "-38%" },
    ],
    resultsStory: [
      "A homeware retailer was heavily reliant on paid ads with rising costs and thin margins. Their existing store was slow and ranking for almost none of their high-value product keywords.",
      "We rebuilt the store on a fast, SEO-ready platform, redesigned category and product pages, and launched a content and link building programme. Organic traffic grew 320%, organic revenue increased 4.2x and their reliance on paid ads fell sharply.",
    ],
    faqs: [
      { q: "Which platform do you build on?", a: "We build on leading platforms including Shopify and headless commerce solutions, chosen for your needs." },
      { q: "Can you migrate my existing store?", a: "Yes, we handle secure migrations with minimal disruption to your business." },
      { q: "Is the store optimised for SEO?", a: "Absolutely. Product pages, structure and speed are all optimised for search." },
      { q: "Do you integrate with my tools?", a: "We connect payments, shipping, email, analytics and more." },
      { q: "How long does a store take to build?", a: "Most stores launch within 4-8 weeks depending on catalogue size and integrations." },
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
    metaTitle: "SEO Services | #1 SEO Agency | Webamazee",
    metaDescription:
      "Professional SEO services that grow rankings and organic traffic. Technical SEO, on-page optimisation, content and link building. Get a free SEO audit from Webamazee.",
    keyword: "SEO services",
    hero: {
      eyebrow: "SEO",
      title: "Rank higher, get found,",
      highlight: "grow organically",
      subtitle:
        "Our SEO services combine technical excellence, quality content and authority building to grow your organic traffic and rankings sustainably.",
      trust: ["White-hat only", "Transparent reporting", "Data-driven"],
      stats: [
        { value: "60-90", label: "Days to movement" },
        { value: "+320%", label: "Avg. traffic growth" },
        { value: "100%", label: "White-hat tactics" },
      ],
    },
    pains: [
      { title: "Invisible on Google", desc: "Your customers can't find you, but they find your competitors." },
      { title: "Wasted ad spend", desc: "Rising ad costs eat margins while organic channels sit unused." },
      { title: "Traffic that doesn't convert", desc: "Ranking for the wrong keywords brings visitors who never buy." },
      { title: "Unclear progress", desc: "Without proper tracking you can't tell what's working." },
    ],
    overview: [
      "SEO is the most cost-effective way to attract qualified customers over the long term. It's the practice of optimising your website so it ranks higher on Google for the searches that matter to your business - bringing you traffic that's already looking for what you sell.",
      "At Webamazee we deliver a complete, data-driven SEO service covering technical, on-page and off-page optimisation. We target the searches that matter, create content that answers intent and build authority that keeps you ahead of competitors.",
      "Unlike short-term tactics, our approach builds sustainable growth that compounds month after month - reducing your reliance on paid advertising and improving your margins.",
    ],
    whoNeeds: [
      "Businesses with little or no organic visibility",
      "Companies spending heavily on ads and wanting cheaper growth",
      "Sites that get traffic but few enquiries or sales",
      "Brands facing strong competition in search results",
    ],
    examples: [
      "A SaaS startup reached page one in 90 days and 12k monthly visitors",
      "A homeware brand grew organic revenue 4.2x in 12 months",
      "A local clinic ranked #1 in Maps across all locations",
    ],
    whyMattersTitle: "Why SEO is your best long-term investment",
    whyMatters: [
      "Organic search is where your ideal customers actively look for solutions. Ranking there means you're seen at the exact moment they're ready to buy - without paying per click.",
      "SEO compounds. Rankings build authority, authority builds more rankings, and every improvement multiplies across your site. Over time, organic becomes your most reliable and profitable channel.",
      "Compared to paid advertising, SEO delivers a dramatically better return over the long run. The traffic keeps coming long after the work is done.",
    ],
    whyStats: [
      { value: "53%", label: "of web traffic is organic" },
      { value: "70%", label: "click result #1, not ads" },
      { value: "5x", label: "higher CTR for page-one results" },
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
      { icon: "Award", title: "Proven results", desc: "A track record of measurable ranking and traffic growth." },
      { icon: "Globe", title: "International", desc: "Global search expertise." },
    ],
    industries: ["SaaS", "E-Commerce", "Professional Services", "Healthcare", "Real Estate", "B2B"],
    techStack: ["Google Analytics", "Search Console", "Ahrefs", "SEMrush", "Screaming Frog", "PageSpeed Insights", "Surfer SEO", "Clearscope"],
    resultsTitle: "SEO that moves the metrics that matter",
    resultsRows: [
      { label: "Organic traffic", before: "baseline", after: "+320%" },
      { label: "Page-one keywords", before: "3", after: "180+" },
      { label: "Organic revenue", before: "baseline", after: "4.2x" },
      { label: "Cost per lead", before: "baseline", after: "-38%" },
    ],
    resultsStory: [
      "Across our clients, we consistently move page-one keywords and grow organic traffic into the hundreds of percent. The common thread is a disciplined, data-driven process that compounds month after month.",
      "By combining technical fixes, intent-driven content and authority building, we've helped e-commerce brands, SaaS startups and local businesses turn organic search into their most profitable channel.",
    ],
    faqs: [
      { q: "How long until I see SEO results?", a: "Meaningful movement typically appears within 60-90 days, with significant growth in 4-6 months." },
      { q: "Do you guarantee rankings?", a: "No ethical agency can guarantee specific rankings, but we consistently deliver strong, measurable growth." },
      { q: "Do you only use white-hat SEO?", a: "Yes, always. We use ethical tactics that protect your business long-term." },
      { q: "What reporting do I get?", a: "A live dashboard plus clear monthly reports on rankings, traffic and conversions." },
      { q: "Which keywords should I target?", a: "We identify keywords that balance search volume, intent and winnability for your business." },
      { q: "Can you fix my existing SEO problems?", a: "Yes. We audit, diagnose and fix technical and content issues holding you back." },
      { q: "Is SEO worth it compared to ads?", a: "For most businesses, yes. SEO compounds and reduces reliance on paid clicks over time." },
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
    metaTitle: "AI SEO Services | AI-Powered SEO Agency | Webamazee",
    metaDescription:
      "AI SEO services that use machine learning to understand intent, create winning content and outpace competitors. Future-proof rankings with Webamazee's AI SEO.",
    keyword: "AI SEO services",
    hero: {
      eyebrow: "AI SEO",
      title: "Rank with the power of",
      highlight: "AI behind you",
      subtitle:
        "AI SEO combines machine learning with expert strategy to understand intent, create winning content and outpace competitors.",
      trust: ["Entity & topic mapping", "Zero-click capture", "Expert review"],
      stats: [
        { value: "2x", label: "faster content scaling" },
        { value: "98/100", label: "avg. optimisation score" },
        { value: "#1", label: "for priority keywords" },
      ],
    },
    pains: [
      { title: "Content that doesn't rank", desc: "Old keyword-stuffing tactics no longer work in AI-driven search." },
      { title: "Competitors are ahead", desc: "Rivals are using AI to scale content and outpace you." },
      { title: "Losing to AI answers", desc: "Google now answers queries directly, capturing clicks you want." },
      { title: "Slow content production", desc: "Traditional writing can't keep up with the pace of search change." },
    ],
    overview: [
      "Search engines now use AI to understand content and intent more deeply than ever. AI SEO uses the same technology to give your business a competitive edge - understanding what people want, creating better content and capturing the AI-era results most agencies miss.",
      "We use AI models to map topics, analyse intent and scale high-quality, optimised content - all refined by human experts to ensure accuracy and brand voice. This is SEO, supercharged.",
      "The result is content that ranks faster, captures featured snippets and AI answers, and positions your brand as the source search engines and people trust.",
    ],
    whoNeeds: [
      "Businesses in competitive niches where content drives rankings",
      "Companies scaling content without sacrificing quality",
      "Marketers wanting to capture featured snippets and AI answers",
      "Brands that want to stay ahead of AI-era search changes",
    ],
    examples: [
      "A SaaS startup reached page one in 90 days using AI topic mapping",
      "A content-driven brand scaled to 12k monthly visitors with AI SEO",
      "A B2B firm captured featured snippets across its highest-value keywords",
    ],
    whyMattersTitle: "Why AI SEO is the new competitive edge",
    whyMatters: [
      "Google's search results are increasingly powered by AI that understands meaning, not just keywords. Content optimised for AI-era signals outranks and outlasts content written for the old playbook.",
      "AI SEO lets you produce more high-quality, optimised content in less time - capturing more of the search landscape than competitors still working manually.",
      "As AI assistants and zero-click results grow, being the source search engines trust becomes essential. AI SEO positions you to win that visibility.",
    ],
    whyStats: [
      { value: "90%", label: "of Google results are AI-influenced" },
      { value: "2x", label: "faster with AI-assisted workflows" },
      { value: "100%", label: "expert-reviewed for quality" },
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
      { icon: "Globe", title: "International", desc: "Expertise across four major markets." },
    ],
    industries: ["SaaS", "B2B", "E-Commerce", "Publishing", "Professional Services", "Education"],
    techStack: ["OpenAI", "Claude", "Gemini", "Surfer SEO", "Clearscope", "Ahrefs", "Search Console", "Schema.org", "GA4"],
    resultsTitle: "AI SEO that outpaces the competition",
    resultsRows: [
      { label: "Time to page one", before: "6+ months", after: "90 days" },
      { label: "Content output", before: "4/mo", after: "16/mo" },
      { label: "Featured snippets", before: "0", after: "14" },
      { label: "Organic traffic", before: "baseline", after: "+280%" },
    ],
    resultsStory: [
      "A B2B SaaS startup needed fast traction to support fundraising. We deployed our AI SEO framework - mapping buyer-intent topics, building an entity strategy and producing expert-refined content at scale.",
      "They reached page one for their top priority keyword in 90 days, grew to 12,000 monthly visitors and increased demo signups 186%. The AI system allowed us to move at a pace manual teams couldn't match.",
    ],
    faqs: [
      { q: "What exactly is AI SEO?", a: "It's using AI models to understand search intent, map topics and optimise content for modern, AI-driven search results." },
      { q: "Is AI content penalised by Google?", a: "Not when done right. We refine AI output with expert review to create genuinely helpful, high-quality content." },
      { q: "How is this different from regular SEO?", a: "It's more efficient and forward-looking - targeting AI-era ranking factors alongside classic SEO." },
      { q: "Will this protect me from AI search?", a: "It positions your content to be the source AI search engines and people trust." },
      { q: "Do humans review the content?", a: "Yes, always. AI drafts and assists; our experts ensure accuracy, voice and quality." },
      { q: "How fast will I see results?", a: "AI accelerates production and optimisation, so many clients see movement faster than with traditional SEO." },
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
    metaTitle: "Technical SEO Services | Technical SEO Audit | Webamazee",
    metaDescription:
      "Expert technical SEO services. Fix crawlability, Core Web Vitals, schema and site architecture to unlock higher rankings. Get a technical SEO audit from Webamazee.",
    keyword: "technical SEO services",
    hero: {
      eyebrow: "Technical SEO",
      title: "A technically flawless site",
      highlight: "ranks higher",
      subtitle:
        "We audit and fix the technical foundation of your website so search engines can crawl, index and rank it effectively.",
      trust: ["Deep site audits", "Core Web Vitals", "Schema markup"],
      stats: [
        { value: "100+", label: "checks per audit" },
        { value: "0", label: "crawl errors left behind" },
        { value: "90+", label: "avg. PageSpeed score" },
      ],
    },
    pains: [
      { title: "Pages not indexed", desc: "Search engines can't find or index important pages, so they never rank." },
      { title: "Poor Core Web Vitals", desc: "Slow, unstable pages hurt both rankings and user experience." },
      { title: "Crawl errors & broken links", desc: "Errors waste crawl budget and frustrate users." },
      { title: "Confusing architecture", desc: "Poor structure spreads authority thin and buries key pages." },
    ],
    overview: [
      "No amount of content can compensate for a site search engines can't properly crawl. Technical SEO ensures your website's infrastructure supports maximum visibility - so all your other SEO efforts actually pay off.",
      "At Webamazee we fix crawlability, page speed, Core Web Vitals, schema and architecture. We run deep technical audits that uncover the issues holding your site back, then implement fixes directly.",
      "The result is a technically sound foundation that makes your content, links and rankings work far harder for you.",
    ],
    whoNeeds: [
      "Websites with declining or stagnant rankings",
      "Sites with many pages not showing up on Google",
      "E-commerce stores with slow product pages",
      "Any business investing in SEO but not seeing results",
    ],
    examples: [
      "A retailer fixed crawl issues and saw thousands of pages indexed",
      "A client cut load time 60% and Core Web Vitals went green",
      "A site recovered rankings after a technical penalty was resolved",
    ],
    whyMattersTitle: "Why technical SEO is the foundation of rankings",
    whyMatters: [
      "Search engines can only rank what they can crawl and understand. Technical issues silently cap your rankings no matter how good your content is.",
      "Speed and Core Web Vitals directly affect both rankings and conversion. A technically healthy site is faster, more usable and ranks better - a triple win.",
      "Fixing technical issues is often the fastest win in SEO. The same content that was invisible suddenly starts ranking once the foundation is sound.",
    ],
    whyStats: [
      { value: "40%", label: "of pages aren't indexed on avg sites" },
      { value: "90+", label: "PageSpeed scores we deliver" },
      { value: "3x", label: "ranking impact of a healthy site" },
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
      { icon: "ShieldCheck", title: "Mobile optimisation", desc: "Flawless experience across all devices." },
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
    resultsTitle: "A foundation that unlocks rankings",
    resultsRows: [
      { label: "Indexed pages", before: "1,200", after: "14,000" },
      { label: "Page load time", before: "6.5s", after: "1.4s" },
      { label: "Core Web Vitals", before: "Failing", after: "All green" },
      { label: "Crawl errors", before: "2,400", after: "0" },
    ],
    resultsStory: [
      "A large e-commerce site was spending heavily on content but ranking for almost nothing. Our technical audit uncovered thousands of unindexed pages, broken links and failing Core Web Vitals.",
      "After we fixed the issues, indexed pages jumped from 1,200 to 14,000 and load time dropped to under 1.5 seconds. Their existing content finally started ranking - proving that a sound technical foundation multiplies every other effort.",
    ],
    faqs: [
      { q: "What is technical SEO?", a: "It's optimising the technical aspects of your site - crawlability, speed, indexing and structure - so search engines can rank it well." },
      { q: "Why is it important?", a: "A technically sound site is a prerequisite for rankings. Fixing issues unlocks the value of your content and links." },
      { q: "How often should I audit?", a: "We recommend a deep audit at least quarterly, with continuous monitoring in between." },
      { q: "Do you fix the issues for me?", a: "Yes, we implement fixes directly or work with your developers to ensure they're done right." },
      { q: "Will it improve my speed?", a: "Yes. Core Web Vitals and load time are central to our technical optimisation." },
      { q: "How long until I see results?", a: "Technical fixes often unlock rankings within weeks once the issues are resolved." },
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
    tagline: "Dominate your local market",
    shortDesc:
      "Rank on Google Maps and local search to win nearby customers and calls.",
    metaTitle: "Local SEO Services | Local SEO Agency | Webamazee",
    metaDescription:
      "Local SEO services that dominate Google Maps and local search. Optimise your Google Business Profile, build citations and win nearby customers. Get a free local SEO audit.",
    keyword: "local SEO services",
    hero: {
      eyebrow: "Local SEO",
      title: "Own your local market,",
      highlight: "win nearby customers",
      subtitle:
        "We help local businesses dominate Google Maps and local search - driving more calls, visits and customers from your area.",
      trust: ["Maps optimisation", "Review growth", "Citation building"],
      stats: [
        { value: "12", label: "locations ranked #1" },
        { value: "+240%", label: "local calls" },
        { value: "5.0", label: "avg. Google rating" },
      ],
    },
    pains: [
      { title: "Invisible in local search", desc: "Nearby customers searching for you find competitors instead." },
      { title: "Not on Google Maps", desc: "If you're not in the local pack, you're missing the easiest wins." },
      { title: "Few or no reviews", desc: "Shoppers trust reviews - a lack of them sends people elsewhere." },
      { title: "Inconsistent listings", desc: "Conflicting info across directories confuses search engines and customers." },
    ],
    overview: [
      "When people search for services near them, they choose businesses that appear first. Local SEO ensures your business shows up in the right place at the right time - winning nearby customers before competitors.",
      "At Webamazee we optimise your Google Business Profile, build consistent local citations and earn reviews to put you ahead in your area. We make sure customers can find, trust and choose you.",
      "Whether you have one location or many, we build a local strategy that drives more calls, visits and customers from your community.",
    ],
    whoNeeds: [
      "Local businesses relying on nearby customers",
      "Multi-location brands and franchises",
      "Service businesses that want more calls and visits",
      "Any business competing in local search results",
    ],
    examples: [
      "A multi-location clinic ranked #1 in Maps across all 12 locations",
      "A home services firm saw local calls increase 240%",
      "A restaurant chain grew footfall with optimised local pages",
    ],
    whyMattersTitle: "Why local SEO drives revenue fast",
    whyMatters: [
      "Local searches are incredibly high-intent - people searching are often ready to buy or visit now. Ranking locally captures this demand at the moment it matters most.",
      "Google Maps and the local pack are prime real estate. Appearing there means you're seen by customers at the exact moment they're choosing a provider.",
      "Local SEO is also one of the fastest channels to see results, with improvements often appearing within weeks - making it an excellent early win.",
    ],
    whyStats: [
      { value: "46%", label: "of Google searches are local" },
      { value: "88%", label: "call or visit within a day" },
      { value: "+240%", label: "calls we've delivered" },
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
      { icon: "MapPin", title: "Google Business optimisation", desc: "A complete, optimised profile that ranks and converts." },
      { icon: "Database", title: "Citation building", desc: "Consistent NAP across directories to build trust." },
      { icon: "Star", title: "Review management", desc: "A system to earn and manage positive reviews." },
      { icon: "FileText", title: "Local landing pages", desc: "Pages targeting your local keywords and areas." },
      { icon: "Link2", title: "Local link building", desc: "Authority from local sources and partnerships." },
      { icon: "BarChart3", title: "Maps tracking", desc: "Visibility into your local pack and map rankings." },
    ],
    whyChoose: [
      { icon: "MapPin", title: "Local specialists", desc: "Deep expertise in local search and Maps." },
      { icon: "Sparkles", title: "AI-assisted", desc: "AI helps us scale and refine local strategies." },
      { icon: "Scale", title: "Multi-location", desc: "Proven for businesses with many locations." },
      { icon: "ShieldCheck", title: "White-hat", desc: "Safe tactics that protect your business." },
      { icon: "Headphones", title: "Hands-on", desc: "We manage profiles, reviews and listings for you." },
      { icon: "Globe", title: "Trusted", desc: "Reliable results worldwide." },
    ],
    industries: ["Healthcare", "Home Services", "Restaurants", "Retail", "Legal", "Automotive"],
    techStack: ["Google Business Profile", "Google Maps", "Moz Local", "BrightLocal", "Google Analytics", "Search Console", "Ahrefs"],
    resultsTitle: "Local SEO that puts you on the map",
    resultsRows: [
      { label: "Google Maps rank", before: "Not shown", after: "#1" },
      { label: "Local calls", before: "baseline", after: "+240%" },
      { label: "Google rating", before: "4.2", after: "5.0" },
      { label: "Locations ranking", before: "0", after: "12" },
    ],
    resultsStory: [
      "A multi-location clinic had great services but appeared nowhere in local search, relying entirely on referrals. Patients searching nearby were finding competitors.",
      "We optimised every Google Business Profile, built consistent citations, launched a review system and created location-specific pages. The clinic now ranks #1 in Maps across all 12 locations, with local calls up 240% and a 5.0 average rating.",
    ],
    faqs: [
      { q: "What is local SEO?", a: "It's optimising your online presence to appear in local search results and Google Maps for your service area." },
      { q: "How long before local results?", a: "Local improvements can appear within weeks, with compounding growth over months." },
      { q: "Do you manage Google Business Profiles?", a: "Yes, we set up, optimise and manage profiles to maximise visibility." },
      { q: "Is local SEO good for multiple locations?", a: "Absolutely. We build strategies that work across all your locations." },
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
    tagline: "Content that ranks and converts",
    shortDesc:
      "Search-optimised content scaled with AI and refined by expert marketers.",
    metaTitle: "AI Content Optimisation | SEO Content Services | Webamazee",
    metaDescription:
      "AI content optimisation services. Create search-optimised content at scale, powered by AI and refined by experts. Rank higher and convert more with Webamazee.",
    keyword: "AI content optimisation",
    hero: {
      eyebrow: "AI Content",
      title: "Content that earns",
      highlight: "clicks and rankings",
      subtitle:
        "We create search-optimised content at scale - powered by AI, perfected by humans, designed to rank and convert.",
      trust: ["AI + expert review", "Topical authority", "Search intent"],
      stats: [
        { value: "4x", label: "more content output" },
        { value: "+280%", label: "organic traffic" },
        { value: "98/100", label: "avg. quality score" },
      ],
    },
    pains: [
      { title: "Content that doesn't rank", desc: "Writing content that search engines and readers ignore." },
      { title: "Too slow to produce", desc: "Manual content creation can't keep pace with demand." },
      { title: "No clear strategy", desc: "Random posts that don't target the right topics or intent." },
      { title: "Inconsistent quality", desc: "An uneven voice and quality that undermines your authority." },
    ],
    overview: [
      "Content is the fuel of modern SEO. Our AI content optimisation service produces high-quality, search-optimised content faster and more effectively than traditional methods - building the topical authority that wins rankings.",
      "From strategy and briefs to writing and publishing, we build a content engine that captures demand, answers intent and drives organic growth. AI does the heavy lifting; experts perfect every piece.",
      "The result is a steady stream of content that ranks, earns clicks and builds your brand as a trusted source in your niche.",
    ],
    whoNeeds: [
      "Businesses wanting to scale content without sacrificing quality",
      "Sites that need to build topical authority to rank",
      "Marketers overwhelmed by content production",
      "Brands that want consistent, on-brand, high-ranking content",
    ],
    examples: [
      "A SaaS brand scaled to 12k monthly visitors with an AI content engine",
      "A B2B firm captured featured snippets across high-value topics",
      "An e-commerce brand built topical authority and lifted category rankings",
    ],
    whyMattersTitle: "Why content is the engine of growth",
    whyMatters: [
      "Search engines rank sites that comprehensively and helpfully answer searchers' questions. A strategic content programme builds the topical authority that makes Google trust you across your whole site.",
      "More high-quality content means more pages ranking for more keywords - capturing demand your competitors are missing and growing organic traffic compoundingly.",
      "AI lets you produce more, faster, without the quality dip that usually comes with scaling. That speed is now a competitive necessity.",
    ],
    whyStats: [
      { value: "4x", label: "content output with AI" },
      { value: "16x", label: "more pages can rank" },
      { value: "90%", label: "see ranking gains in 90 days" },
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
      { icon: "Sparkles", title: "AI-powered", desc: "Speed and scale without sacrificing quality." },
      { icon: "Users", title: "Expert-reviewed", desc: "Every piece refined by experienced editors." },
      { icon: "Award", title: "Proven rankings", desc: "Content that consistently ranks and converts." },
      { icon: "Scale", title: "Strategic", desc: "Built around topical authority, not random posts." },
      { icon: "Headphones", title: "Managed for you", desc: "We handle strategy, production and publishing." },
      { icon: "Globe", title: "Brand-aware", desc: "Content that reflects your voice and values." },
    ],
    industries: ["SaaS", "B2B", "E-Commerce", "Finance", "Healthcare", "Publishing"],
    techStack: ["OpenAI", "Claude", "Gemini", "Surfer SEO", "Clearscope", "Ahrefs", "GA4", "WordPress / Headless CMS"],
    resultsTitle: "A content engine that compounds growth",
    resultsRows: [
      { label: "Monthly content output", before: "4", after: "16" },
      { label: "Organic traffic", before: "baseline", after: "+280%" },
      { label: "Page-one keywords", before: "baseline", after: "+340%" },
      { label: "Featured snippets", before: "0", after: "14" },
    ],
    resultsStory: [
      "A SaaS company was publishing a handful of posts a month with little impact. We built an AI-assisted content engine around buyer-intent topics, with every piece expert-reviewed and on-page optimised.",
      "Output quadrupled, organic traffic grew 280% and the brand began capturing featured snippets. The systematic approach turned content from an afterthought into their primary growth channel.",
    ],
    faqs: [
      { q: "Is AI content good for SEO?", a: "Yes, when it's high-quality and expert-reviewed. We combine AI efficiency with human quality for the best results." },
      { q: "How is this different from blog writing?", a: "It's more strategic and scalable - focused on ranking, intent and measurable performance." },
      { q: "Do you write in my brand voice?", a: "We learn your brand and ensure all content reflects your voice and values." },
      { q: "Can you refresh my old content?", a: "Yes, content refreshing is a core part of our service." },
      { q: "How much content will I get?", a: "It depends on your goals and budget. We tailor output to what moves rankings for you." },
      { q: "Do you manage publishing?", a: "Yes, we handle publishing, internal linking and scheduling." },
      { q: "How fast will I see results?", a: "With consistent publishing, most clients see ranking and traffic gains within 90 days." },
      { q: "What makes your content rank?", a: "Intent-focused topics, expert quality, strong on-page SEO and topical authority." },
    ],
    related: ["ai-seo", "seo-services", "google-ranking-growth"],
  },
  {
    slug: "google-ranking-growth",
    name: "Google Ranking Growth",
    shortName: "Ranking Growth",
    icon: "TrendingUp",
    tagline: "A data-led path to page one",
    shortDesc:
      "Move your website up Google's rankings with a proven, measurable growth system.",
    metaTitle: "Google Ranking Growth Services | Rank Higher | Webamazee",
    metaDescription:
      "Google ranking growth services. A systematic, data-led approach to improve your rankings, traffic and visibility. Move up the SERPs with Webamazee.",
    keyword: "Google ranking growth",
    hero: {
      eyebrow: "Ranking Growth",
      title: "Climb Google's rankings",
      highlight: "and stay there",
      subtitle:
        "A systematic, data-led approach to improving your Google rankings for the keywords that drive your business.",
      trust: ["Daily rank tracking", "Algorithm-ready", "Transparent"],
      stats: [
        { value: "60-90", label: "days to movement" },
        { value: "180+", label: "page-one keywords" },
        { value: "4.2x", label: "avg. revenue growth" },
      ],
    },
    pains: [
      { title: "Stuck on page two", desc: "You're close but customers never see you - page two gets little traffic." },
      { title: "Unpredictable rankings", desc: "Rankings jump around and you don't know why." },
      { title: "No clear plan", desc: "Random tweaks without a strategy deliver no sustained gains." },
      { title: "Algorithm anxiety", desc: "Google updates keep wiping out your hard-won progress." },
    ],
    overview: [
      "Ranking on page one for the right keywords transforms your business. Our Google ranking growth service uses data and proven tactics to move you up the SERPs - and keep you there.",
      "We track every keyword, adapt to algorithm changes and double down on what works. The result is visible, sustainable growth in the positions that drive your revenue.",
      "Unlike one-off fixes, we build a compounding system where each improvement makes the next easier - so your rankings keep climbing.",
    ],
    whoNeeds: [
      "Sites stuck on page two or three of Google",
      "Businesses seeing traffic decline or plateau",
      "Companies that want to outrank specific competitors",
      "Brands investing in SEO without clear progress",
    ],
    examples: [
      "A SaaS startup moved from nowhere to page one in 90 days",
      "A homeware brand reached #1 for all priority keywords",
      "A B2B firm overtook competitors for high-value terms",
    ],
    whyMattersTitle: "Why ranking growth compounds into revenue",
    whyMatters: [
      "Page-one results capture the vast majority of clicks. Moving from page two to page one can multiply your traffic and enquiries overnight.",
      "Rankings compound: higher positions bring more traffic, more traffic builds authority, and authority lifts more rankings. Growth accelerates over time.",
      "A disciplined, data-led system keeps you ahead of algorithm changes, protecting and growing the rankings you've earned.",
    ],
    whyStats: [
      { value: "75%", label: "never scroll past page one" },
      { value: "10x", label: "CTR of page-one vs page-two" },
      { value: "180+", label: "page-one keywords we've delivered" },
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
      { icon: "Award", title: "Proven", desc: "A track record of page-one results." },
      { icon: "Scale", title: "Sustainable", desc: "Rankings that withstand algorithm changes." },
      { icon: "Headphones", title: "Responsive", desc: "A dedicated team on your side." },
      { icon: "Globe", title: "International", desc: "Global expertise." },
    ],
    industries: ["SaaS", "E-Commerce", "B2B", "Healthcare", "Finance", "Professional Services"],
    techStack: ["Ahrefs", "SEMrush", "Google Search Console", "GA4", "Screaming Frog", "PageSpeed Insights", "Surfer SEO"],
    resultsTitle: "Rankings that move the needle",
    resultsRows: [
      { label: "Page-one keywords", before: "3", after: "180+" },
      { label: "Organic traffic", before: "baseline", after: "+320%" },
      { label: "Organic revenue", before: "baseline", after: "4.2x" },
      { label: "Time to page one", before: "—", after: "90 days" },
    ],
    resultsStory: [
      "A B2B SaaS startup was invisible for the terms its buyers searched and needed traction quickly to support fundraising. We built a data-led ranking system around intent, content and authority.",
      "Within 90 days they reached page one for their top priority keyword, grew to 12,000 monthly visitors and increased demo signups 186%. The ranking system kept compounding from there.",
    ],
    faqs: [
      { q: "How fast will my rankings improve?", a: "You'll typically see movement within 60-90 days, with significant growth over 4-6 months." },
      { q: "Which keywords should I target?", a: "We identify keywords that balance search volume, intent and winnability for your business." },
      { q: "Can you recover from a penalty?", a: "Yes, we diagnose and fix issues that have hurt your rankings." },
      { q: "How do I know it's working?", a: "You get transparent rank tracking and reporting showing exactly what's improving." },
      { q: "Do you adapt to Google updates?", a: "Yes, we continuously adapt strategy to algorithm changes." },
      { q: "Will rankings stay after we stop?", a: "Well-earned rankings are durable, but ongoing care helps protect and grow them." },
      { q: "How is this different from basic SEO?", a: "It's a systematic, data-led growth programme, not one-off fixes." },
      { q: "How do we start?", a: "Book a free call and we'll map the fastest path to page one for your keywords." },
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
    metaTitle: "Competitor Analysis Services | SEO Competitor Intel | Webamazee",
    metaDescription:
      "Competitor analysis services that reveal your rivals' SEO, content and backlink strategies. Find winning gaps and outrank them with Webamazee.",
    keyword: "competitor analysis services",
    hero: {
      eyebrow: "Competitor Analysis",
      title: "See what your competitors",
      highlight: "are really doing",
      subtitle:
        "We reverse-engineer your competitors' SEO, content and backlink strategies to reveal the opportunities you can win.",
      trust: ["Gap analysis", "Backlink intel", "Actionable roadmap"],
      stats: [
        { value: "4x", label: "more opportunities found" },
        { value: "100+", label: "data points analysed" },
        { value: "30d", label: "to a winning plan" },
      ],
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
      "A B2B firm found keyword gaps competitors missed and overtook them",
      "A SaaS brand replicated winning backlink strategies and rose quickly",
      "A retailer spotted a market-share gap and captured high-value terms",
    ],
    whyMattersTitle: "Why competitor intelligence wins markets",
    whyMatters: [
      "Every hour you spend guessing is an hour your competitors are consolidating their lead. Understanding their strategy lets you move decisively.",
      "Competitor gaps are the fastest wins in SEO - keywords they're missing, content they've neglected and links they haven't earned. We find them for you.",
      "Data-backed decisions reduce wasted spend and focus your budget where it delivers. You stop competing in the dark and start winning.",
    ],
    whyStats: [
      { value: "4x", label: "more keyword opportunities" },
      { value: "90%", label: "of gaps are winnable" },
      { value: "30d", label: "to a full winning roadmap" },
    ],
    process: [
      { step: "01", title: "Identify rivals", desc: "We map your true competitive landscape." },
      { step: "02", title: "Deep analysis", desc: "We analyse their rankings, content and backlinks." },
      { step: "03", title: "Gap mapping", desc: "We find the opportunities they're missing." },
      { step: "04", title: "Benchmark", desc: "We establish clear performance baselines." },
      { step: "05", title: "Strategy", desc: "We prioritise the highest-impact opportunities." },
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
    resultsTitle: "Turn competitor intel into your advantage",
    resultsRows: [
      { label: "Keyword opportunities", before: "unknown", after: "4x more found" },
      { label: "Backlink gaps", before: "—", after: "120+ identified" },
      { label: "Strategy confidence", before: "Low", after: "High" },
      { label: "Winnable keywords", before: "—", after: "90%" },
    ],
    resultsStory: [
      "A B2B services firm had been outranked for years and didn't know why. Our competitor analysis revealed a large cluster of high-intent keywords competitors had overlooked, plus backlink gaps they could exploit.",
      "By executing the roadmap, they captured those keywords and overtook competitors for their most valuable terms - turning years of frustration into a clear, winnable advantage.",
    ],
    faqs: [
      { q: "Who should get a competitor analysis?", a: "Any business that wants a clear, data-backed strategy for outranking competitors in search." },
      { q: "How often should I run one?", a: "We recommend a full analysis quarterly, with ongoing tracking in between." },
      { q: "What do I get out of it?", a: "Actionable insights and a roadmap to win the opportunities competitors are missing." },
      { q: "Can you do this for my niche?", a: "Yes, we analyse competitors in any industry or market." },
      { q: "How long does it take?", a: "A comprehensive analysis and roadmap typically completes within 30 days." },
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
    metaTitle: "Link Building Services | White-Hat Backlinks | Webamazee",
    metaDescription:
      "White-hat link building services. Earn high-authority backlinks that boost your domain power and rankings. Digital PR, guest posts and outreach from Webamazee.",
    keyword: "link building services",
    hero: {
      eyebrow: "Link Building",
      title: "Backlinks that build",
      highlight: "lasting authority",
      subtitle:
        "We earn high-quality, white-hat backlinks that boost your domain authority and send rankings compounding upward.",
      trust: ["100% white-hat", "Digital PR", "Relevant authority"],
      stats: [
        { value: "100+", label: "links per programme" },
        { value: "2-4", label: "months to compound" },
        { value: "0", label: "black-hat tactics" },
      ],
    },
    pains: [
      { title: "Stuck rankings", desc: "Good content won't rank without the authority backlinks provide." },
      { title: "Fear of penalties", desc: "Risky link schemes can destroy rankings overnight." },
      { title: "No time to build", desc: "Quality outreach takes real time and skill you don't have." },
      { title: "Wrong links", desc: "Irrelevant or low-quality links do more harm than good." },
    ],
    overview: [
      "Backlinks are one of the strongest ranking signals Google uses. They tell search engines your site is trusted and worth ranking. Our link building service earns high-authority, relevant links through ethical, white-hat methods.",
      "From digital PR and guest posts to content partnerships and outreach, we build a backlink profile that boosts your domain authority and keeps competitors behind you.",
      "We never use risky schemes. Every link is earned and relevant, protecting your business and building authority that lasts.",
    ],
    whoNeeds: [
      "Sites with content that's underperforming in rankings",
      "Businesses wanting to outrank competitors in competitive niches",
      "Brands ready for digital PR and visibility",
      "Sites building authority for new keywords and markets",
    ],
    examples: [
      "A SaaS brand earned authority links and reached page one in 90 days",
      "A retailer built topical backlinks that lifted category rankings",
      "A B2B firm used digital PR to earn coverage from industry publications",
    ],
    whyMattersTitle: "Why links are the currency of authority",
    whyMatters: [
      "Google treats backlinks from authoritative, relevant sites as votes of confidence. Without them, even the best content struggles to rank.",
      "Quality links amplify all your other SEO work - sending stronger signals for every page and keyword you target.",
      "A strong backlink profile compounds over time, protecting your rankings from competitors and algorithm shifts.",
    ],
    whyStats: [
      { value: "3.5x", label: "more traffic from top-ranking sites" },
      { value: "100+", label: "high-authority links per programme" },
      { value: "0", label: "risky, penalisable tactics" },
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
      { icon: "ShieldCheck", title: "100% white-hat", desc: "Safe, ethical links that protect your business." },
      { icon: "Sparkles", title: "Digital PR", desc: "Earned, natural authority - not bought links." },
      { icon: "Award", title: "Relevant & quality", desc: "Links that actually move rankings." },
      { icon: "Scale", title: "Transparent", desc: "Clear reporting on every link earned." },
      { icon: "Headphones", title: "Hands-on", desc: "A dedicated outreach team on your side." },
      { icon: "Globe", title: "Any niche", desc: "Expertise building links across industries." },
    ],
    industries: ["SaaS", "E-Commerce", "Finance", "Healthcare", "B2B", "Publishing"],
    techStack: ["Ahrefs", "SEMrush", "BuzzStream", "Pitchbox", "Moz", "Google Search Console", "Majestic"],
    resultsTitle: "Authority that compounds into rankings",
    resultsRows: [
      { label: "Domain authority", before: "21", after: "44" },
      { label: "Referring domains", before: "80", after: "420" },
      { label: "Organic traffic", before: "baseline", after: "+250%" },
      { label: "Page-one keywords", before: "baseline", after: "+290%" },
    ],
    resultsStory: [
      "A SaaS startup had strong content but a weak backlink profile, so rankings stalled. We built a digital PR and outreach programme earning relevant, authoritative links from industry publications and trusted sites.",
      "Over several months their domain authority doubled, referring domains grew fivefold and organic traffic rose 250% - with rankings compounding as the authority accumulated.",
    ],
    faqs: [
      { q: "Are your links safe?", a: "Yes. We only use white-hat, Google-approved methods that protect your business." },
      { q: "How many links will I get?", a: "We focus on quality over quantity, earning relevant links that actually move rankings." },
      { q: "How long until links help?", a: "Quality links build authority over 2-4 months and compound from there." },
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
