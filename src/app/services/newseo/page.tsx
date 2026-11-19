import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Plus } from "lucide-react";
import { CALENDLY_URL, CASE_STUDY_SHOWCASES } from "@/components/newhome/newhome-data";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { site } from "@/lib/site";

const title = "SEO Services | Professional SEO Company for Business Growth | Webamazee";
const description =
  "Improve your search visibility with Webamazee SEO services. Get technical SEO, on-page optimisation, keyword research, content strategy and link building.";
const pageUrl = `${site.url}/services/newseo`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: pageUrl },
  robots: { index: false, follow: false },
  openGraph: {
    title,
    description,
    url: pageUrl,
    siteName: site.name,
    type: "website",
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: "SEO services by Webamazee",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [site.ogImage],
  },
};

const container = "mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8";
const eyebrow = "text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]";
const heading =
  "font-display text-[1.85rem] font-bold leading-[1.16] tracking-[-0.025em] text-[#0b1528] sm:text-[2.4rem]";
const primary =
  "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-[#0f6dff] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#0b57d0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]";
const secondary =
  "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 text-[14px] font-bold text-[#0b1528] transition-colors hover:border-[#0f6dff] hover:text-[#0f6dff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]";

const seoProject = CASE_STUDY_SHOWCASES.find((item) => item.slug === "kabiroilmill")!;

const problems = [
  {
    title: "Important pages are hard to discover",
    text: "Crawlability, indexation or site-structure issues can make it harder for search engines to access the pages that matter.",
  },
  {
    title: "Search traffic has the wrong intent",
    text: "A page can attract visits without answering the questions or needs that are relevant to the business.",
  },
  {
    title: "Content does not answer customer questions",
    text: "Thin, unclear or poorly organised information can leave people without the context they need to evaluate an offer.",
  },
  {
    title: "Technical issues are difficult to prioritise",
    text: "Indexing, performance, redirects and site architecture can create a long list of possible fixes without a clear order.",
  },
  {
    title: "Local customers cannot find useful details",
    text: "Incomplete or inconsistent business information can make it harder for nearby searchers to understand where and how you operate.",
  },
  {
    title: "Progress is unclear",
    text: "Without a starting baseline and agreed measures, it can be difficult to see which search changes are useful to review.",
  },
];

const seoServices = [
  {
    title: "Technical SEO",
    text: "Review crawlability, indexation, site architecture, redirects, structured data and performance considerations.",
    href: "/services/technical-seo",
  },
  {
    title: "On-Page SEO",
    text: "Improve page titles, metadata, headings, internal links and content clarity in line with relevant search intent.",
  },
  {
    title: "Keyword Research",
    text: "Identify search topics by considering user intent, business relevance, demand and the competitive landscape.",
  },
  {
    title: "Content Optimisation",
    text: "Review existing pages and plan useful content that answers real customer questions.",
    href: "/services/ai-content-optimization",
  },
  {
    title: "Local SEO",
    text: "Support accurate local profiles, listings and service information for the markets a business genuinely serves.",
    href: "/services/local-seo",
  },
  {
    title: "Link Building",
    text: "Use a relevance- and quality-led approach to link opportunities as part of a broader SEO plan.",
    href: "/services/link-building",
  },
  {
    title: "SEO Audits",
    text: "Review a website, market and search context to identify issues and prioritise practical opportunities.",
  },
  {
    title: "Performance Monitoring & Reporting",
    text: "Review agreed visibility, relevant traffic, enquiries and technical-health indicators against a baseline.",
  },
];

const approachSteps = [
  {
    title: "Audit",
    text: "Review the website, search visibility, market and competitors to understand the starting point.",
  },
  {
    title: "Strategy",
    text: "Set priorities and build a keyword and content plan around business goals and search intent.",
  },
  {
    title: "Technical SEO",
    text: "Identify crawlability, indexation, speed and architecture issues; agree the fixes to address.",
  },
  {
    title: "On-Page Optimisation",
    text: "Improve the structure, metadata, internal links and useful content of agreed pages.",
  },
  {
    title: "Authority Building",
    text: "Explore relevant, ethical link opportunities that fit the site and its broader SEO foundations.",
  },
  {
    title: "Measure & Review",
    text: "Compare agreed measures with the baseline and use available evidence to inform the next priorities.",
  },
];

const technicalChecks = [
  "Crawlability and indexation signals",
  "Site structure, canonical and redirect checks",
  "Page speed and Core Web Vitals considerations",
  "Structured data and technical hygiene",
];

const onPageChecks = [
  "Search intent and page purpose",
  "Titles, descriptions, headings and page copy",
  "Internal links and content hierarchy",
  "Relevant product, service or location information",
];

const contentWorkflow = [
  {
    title: "Understand the search",
    text: "Group queries by intent and the questions people are trying to answer.",
  },
  {
    title: "Map topics to useful pages",
    text: "Connect relevant themes to existing or planned pages, rather than forcing every keyword into every page.",
  },
  {
    title: "Improve what is already there",
    text: "Review clarity, completeness and internal links on pages that match an agreed priority.",
  },
  {
    title: "Plan future content",
    text: "Identify useful content opportunities for the business and agree their place in the wider site structure.",
  },
];

const linkSteps = [
  {
    title: "Review the existing profile",
    text: "Understand current referring sites, relevance and potential risks before planning new activity.",
  },
  {
    title: "Assess relevance and fit",
    text: "Prioritise legitimate sites, publishers and opportunities that make sense for the subject and audience.",
  },
  {
    title: "Build useful reasons to reference",
    text: "Consider content, partnerships or outreach opportunities based on the scope and available resources.",
  },
  {
    title: "Report on the work",
    text: "Review agreed placements and link-quality indicators; no fixed link count or ranking outcome is promised.",
  },
];

const reportMeasures = [
  "Organic search visibility",
  "Relevant organic traffic",
  "Qualified enquiries, where tracking is available",
  "Crawlability, indexation and technical health",
];

const tools = [
  "Google Analytics",
  "Google Search Console",
  "Ahrefs",
  "SEMrush",
  "Screaming Frog",
  "PageSpeed Insights",
  "Surfer SEO",
  "Clearscope",
];

const industries = [
  {
    name: "SaaS",
    text: "Organise product and solution information around the questions buyers research before evaluating software.",
  },
  {
    name: "E-Commerce",
    text: "Plan category, product and informational content so shoppers can discover relevant parts of a catalogue.",
  },
  {
    name: "Professional Services",
    text: "Clarify service pages and the expertise, audience and locations each service is intended to address.",
  },
  {
    name: "Healthcare",
    text: "Keep service information clear, accurate and responsibly presented for people researching care options.",
  },
  {
    name: "Real Estate",
    text: "Structure location and property information to help people navigate relevant market pages.",
  },
  {
    name: "B2B",
    text: "Address detailed buyer questions and the research journey across related service and solution pages.",
  },
];

const differentiators = [
  {
    title: "White-hat SEO practices",
    text: "Use ethical, search-guideline-aware methods rather than shortcuts or promises of guaranteed positions.",
  },
  {
    title: "Human-reviewed work",
    text: "Research and AI-assisted workflows are reviewed by people before recommendations or content are delivered.",
  },
  {
    title: "Baseline-first measurement",
    text: "Agree what to review and use the available data to understand progress in context.",
  },
  {
    title: "Priorities tied to your business",
    text: "Select work according to your goals, website condition, search opportunity and practical constraints.",
  },
  {
    title: "Clear reporting and communication",
    text: "Explain what was reviewed, what changed and what the next agreed priorities are.",
  },
  {
    title: "Transparent scope",
    text: "Set expectations about research, content, implementation and reporting before work begins.",
  },
];

const seoPlans = [
  {
    name: "SEO Starter",
    international: "$449",
    india: "₹12,999",
    features: [
      "Keyword Research",
      "On-Page SEO",
      "Technical SEO Basics",
      "Google Search Console",
      "Monthly SEO Report",
    ],
  },
  {
    name: "Local SEO",
    international: "$649",
    india: "₹19,999",
    features: [
      "Local Keyword Research",
      "Google Business Profile Optimization",
      "Local On-Page SEO",
      "Citation & Directory Optimization",
      "Monthly SEO Report",
    ],
  },
  {
    name: "SEO Growth",
    international: "$999",
    india: "₹32,999",
    features: [
      "Advanced Keyword Research",
      "Technical & On-Page SEO",
      "Content Optimization",
      "Competitor Analysis",
      "Monthly Growth Report",
    ],
  },
  {
    name: "SEO Professional",
    international: "$1,499",
    india: "₹49,999",
    features: [
      "Advanced Technical SEO",
      "National & Global SEO",
      "Content Strategy",
      "Competitor & SERP Analysis",
      "Advanced Performance Reporting",
    ],
  },
];

const faqItems = [
  {
    q: "How long until I see SEO results?",
    a: "SEO timing depends on your website's starting point, competition and how quickly agreed recommendations can be implemented. We review progress against a baseline and do not promise a fixed deadline.",
  },
  {
    q: "Do you guarantee rankings?",
    a: "No. Search positions and traffic depend on many factors outside any provider's control. We agree practical priorities, work to search guidelines and report on the measures relevant to your engagement.",
  },
  {
    q: "Do you use white-hat SEO?",
    a: "Webamazee's SEO approach focuses on ethical, search-guideline-aware methods. The planned research, content, technical work and link activity are discussed as part of the project scope.",
  },
  {
    q: "What SEO reporting do I get?",
    a: "The published SEO packages include monthly reporting, with advanced performance reporting in the Professional plan. Reporting is based on agreed measures and available data; dashboard access and tracking setup should be confirmed for your engagement.",
  },
  {
    q: "Which keywords should my business target?",
    a: "Keyword choices depend on customer intent, business relevance, demand and the competitive landscape. Research helps identify topics worth prioritising for your site and resources.",
  },
  {
    q: "Can you fix existing SEO problems?",
    a: "An audit can identify technical and content issues and help prioritise them. Which fixes Webamazee implements depends on the issue, site access and the agreed scope; some changes may involve your development team.",
  },
  {
    q: "Is SEO worth it compared with paid advertising?",
    a: "That depends on your goals, time horizon, market and available budget. SEO and paid advertising can serve different roles, and we can discuss how they fit your wider marketing plan.",
  },
  {
    q: "How do we get started?",
    a: "Share your website, target market and business goals through the contact form. Webamazee can discuss an SEO consultation and the appropriate audit or next steps for your situation.",
  },
  {
    q: "What information does Webamazee need to plan SEO?",
    a: "Useful starting information includes your goals, target audience, current website, priority services or products, target markets, existing analytics or Search Console access, and any practical constraints.",
  },
  {
    q: "Can SEO be combined with other Webamazee services?",
    a: "Yes. Where it supports the goal, SEO can be coordinated with website development, redesign, content work, local SEO or landing pages. Each service and its deliverables should be agreed in the project scope.",
  },
];

const relatedServices = [
  {
    title: "Technical SEO",
    description: "Crawlability, indexation, architecture and technical site reviews.",
    href: "/services/technical-seo",
  },
  {
    title: "Local SEO",
    description: "Local profiles, listings and service-area search foundations.",
    href: "/services/local-seo",
  },
  {
    title: "Link Building",
    description: "Relevance-focused link opportunities as part of broader SEO work.",
    href: "/services/link-building",
  },
  {
    title: "AI Content Optimisation",
    description: "Search-focused content planned around intent and human review.",
    href: "/services/ai-content-optimization",
  },
  {
    title: "AI SEO",
    description: "Explore Webamazee's separate AI search optimisation service.",
    href: "/services/ai-seo",
  },
];

const serviceStructuredData = serviceSchema({
  name: "SEO Services",
  description,
  slug: "newseo",
  keywords: [
    "SEO services",
    "professional SEO company",
    "technical SEO",
    "on-page SEO",
    "keyword research",
    "SEO content optimisation",
    "local SEO",
    "link building",
    "SEO audits",
    "performance monitoring and reporting",
  ],
  related: [
    { name: "Technical SEO", slug: "technical-seo" },
    { name: "Local SEO", slug: "local-seo" },
    { name: "Link Building", slug: "link-building" },
    { name: "AI Content Optimisation", slug: "ai-content-optimization" },
    { name: "AI SEO", slug: "ai-seo" },
  ],
});
const breadcrumbStructuredData = breadcrumbSchema(
  [
    { label: "Services", href: "/services" },
    { label: "SEO Services" },
  ],
  "/services/newseo",
);
const faqStructuredData = faqSchema(faqItems);

export default function NewSeoPage() {
  return (
    <div className="min-h-screen bg-white pt-16 text-[#0b1528] selection:bg-[#0f6dff]/15 selection:text-[#0b57d0] sm:pt-20">
      <div id="main-content" className="overflow-x-clip">
        <section className="border-b border-slate-200/80 bg-[#f4f8ff] py-10">
          <div className={container}>
            <nav aria-label="Breadcrumb" className="mb-7">
              <ol className="flex flex-wrap items-center gap-2 text-[12px] font-medium text-slate-500">
                <li><Link href="/" className="hover:text-[#0f6dff]">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/services" className="hover:text-[#0f6dff]">Services</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-slate-700">SEO Services</li>
              </ol>
            </nav>
            <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
              <div>
                <p className={eyebrow}>SEO Services</p>
                <h1 className="mt-4 max-w-3xl font-display text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] sm:text-[3rem] lg:text-[3.55rem]">
                  SEO Services That Help Your Business Get Found and Grow.
                </h1>
                <p className="mt-5 max-w-2xl text-[17px] leading-[1.65] text-slate-600 sm:text-[18px]">
                  Webamazee helps businesses improve search visibility, attract relevant organic traffic and generate qualified enquiries through technical SEO, on-page optimisation, keyword research and useful content. We set priorities around your goals and review progress against an agreed baseline—without promising rankings or a fixed timeline.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/contact" className={primary}>
                    Get an SEO Consultation <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                  <a href="#seo-approach" className={secondary}>
                    View Our SEO Approach <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </a>
                </div>
                <p className="mt-4 text-[13px] leading-relaxed text-slate-500">On the existing contact form, select SEO / AI SEO as your service.</p>
              </div>
              <aside className="border-l-2 border-[#0f6dff] pl-6 sm:pl-8">
                <p className={eyebrow}>A considered search programme</p>
                <h2 className="mt-3 max-w-sm font-display text-2xl font-bold leading-tight tracking-[-0.02em]">Start with what your website and audience need.</h2>
                <ol className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
                  {[
                    "Technical accessibility",
                    "Relevant search intent",
                    "Useful, well-structured pages",
                    "Measures tied to a baseline",
                  ].map((item, index) => (
                    <li key={item} className="flex items-center gap-4 py-3.5 text-[14px] font-semibold text-slate-700">
                      <span className="font-display text-[11px] font-bold text-[#0f6dff]">0{index + 1}</span>{item}
                    </li>
                  ))}
                </ol>
              </aside>
            </div>
          </div>
        </section>

        <section className="bg-white py-10">
          <div className={container}>
            <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
              <div>
                <p className={eyebrow}>Common SEO Problems</p>
                <h2 className={`${heading} mt-2 max-w-2xl`}>Search Challenges That Can Hold a Business Back.</h2>
              </div>
              <p className="max-w-2xl text-[15px] leading-relaxed text-slate-600 lg:justify-self-end">
                Search performance is shaped by the site, its content, the competition and how work is implemented. These are practical issues an SEO review can help assess—not promised results.
              </p>
            </div>
            <ol className="mt-8 grid gap-x-9 sm:grid-cols-2 lg:grid-cols-3">
              {problems.map((item, index) => (
                <li key={item.title} className="border-t border-slate-200 py-5">
                  <span className="font-display text-[12px] font-bold text-[#0f6dff]">0{index + 1}</span>
                  <h3 className="mt-3 font-display text-[17px] font-bold">{item.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-slate-600">{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-[#f7f9fc] py-10">
          <div className={container}>
            <div className="grid gap-7 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
              <div>
                <p className={eyebrow}>SEO Services</p>
                <h2 className={`${heading} mt-2`}>Search Support Across the Work That Matters.</h2>
                <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-slate-600">
                  A professional SEO company should make clear what is being researched, recommended and implemented. Webamazee&apos;s SEO service covers technical, on-page, content and authority work, with deliverables agreed for each engagement.
                </p>
                <Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0f6dff] hover:underline">
                  Discuss your SEO requirements <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
              <ol className="divide-y divide-slate-200 border-y border-slate-200 bg-white">
                {seoServices.map((service, index) => (
                  <li key={service.title} className="grid gap-2 p-4 sm:grid-cols-[34px_0.8fr_1.2fr_auto] sm:items-start sm:gap-4 sm:px-5">
                    <span className="font-display text-[12px] font-bold text-[#0f6dff]">{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="font-display text-[15px] font-bold">{service.title}</h3>
                    <p className="text-[13px] leading-relaxed text-slate-600">{service.text}</p>
                    {service.href ? (
                      <Link href={service.href} aria-label={`Learn about ${service.title}`} className="inline-flex items-center gap-1 text-[12px] font-bold text-[#0f6dff] hover:underline">
                        Details <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                      </Link>
                    ) : <span aria-hidden="true" className="hidden sm:block" />}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="seo-approach" className="scroll-mt-24 bg-white py-10">
          <div className={container}>
            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
              <div>
                <p className={eyebrow}>Our SEO Approach</p>
                <h2 className={`${heading} mt-2`}>A Clear Method, From Audit to Review.</h2>
              </div>
              <p className="max-w-2xl text-[15px] leading-relaxed text-slate-600 lg:justify-self-end">
                The order and depth of work depend on your starting point. Priorities, implementation responsibilities and reporting are agreed before the engagement begins.
              </p>
            </div>
            <ol className="mt-8 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
              {approachSteps.map((step, index) => (
                <li key={step.title} className="border-t-2 border-[#0f6dff] py-4">
                  <span className="font-display text-[12px] font-bold text-[#0f6dff]">0{index + 1}</span>
                  <h3 className="mt-3 font-display text-[17px] font-bold">{step.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-slate-600">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-[#f7f9fc] py-10">
          <div className={`${container} grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}>
            <div>
              <p className={eyebrow}>Technical & On-Page SEO</p>
              <h2 className={`${heading} mt-2`}>Make Important Pages Easier to Understand and Find.</h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-600">
                Technical SEO and on-page optimisation address different parts of the same foundation. An audit helps identify what needs attention; implementation is prioritised according to impact, access and agreed scope.
              </p>
              <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-slate-500">
                Some changes may require access to your content platform or development team. Any implementation work is confirmed as part of the engagement.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
              <div>
                <h3 className="border-b border-slate-300 pb-3 font-display text-lg font-bold">Technical SEO review</h3>
                <ul className="mt-2 divide-y divide-slate-200">
                  {technicalChecks.map((item) => (
                    <li key={item} className="flex gap-3 py-3 text-[14px] leading-relaxed text-slate-600">
                      <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6dff]" />{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="border-b border-slate-300 pb-3 font-display text-lg font-bold">On-page optimisation</h3>
                <ul className="mt-2 divide-y divide-slate-200">
                  {onPageChecks.map((item) => (
                    <li key={item} className="flex gap-3 py-3 text-[14px] leading-relaxed text-slate-600">
                      <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6dff]" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-10">
          <div className={`${container} grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}>
            <div>
              <p className={eyebrow}>Keyword & Content Strategy</p>
              <h2 className={`${heading} mt-2`}>Connect Search Intent With Useful Pages.</h2>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-slate-600">
                Keyword research informs which topics deserve attention. Content planning then connects those topics to pages that are useful for customers and relevant to your business—not a list of phrases to repeat.
              </p>
            </div>
            <ol className="divide-y divide-slate-200 border-y border-slate-200">
              {contentWorkflow.map((step, index) => (
                <li key={step.title} className="grid gap-2 py-4 sm:grid-cols-[42px_0.75fr_1.25fr] sm:gap-4">
                  <span className="font-display text-[12px] font-bold text-[#0f6dff]">0{index + 1}</span>
                  <h3 className="font-display text-[16px] font-bold">{step.title}</h3>
                  <p className="text-[14px] leading-relaxed text-slate-600">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-[#f7f9fc] py-10">
          <div className={container}>
            <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div>
                <p className={eyebrow}>Link Building</p>
                <h2 className={`${heading} mt-2`}>Build Authority With Relevance and Care.</h2>
                <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-slate-600">
                  Link building is considered alongside content quality and technical foundations. The focus is on relevant opportunities and ethical methods—not buying a promised number of links or guaranteeing ranking changes.
                </p>
                <Link href="/services/link-building" className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[#0f6dff] hover:underline">
                  Explore Link Building <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
              <ol className="grid gap-x-8 sm:grid-cols-2">
                {linkSteps.map((step, index) => (
                  <li key={step.title} className="border-t border-slate-300 py-4">
                    <span className="font-display text-[12px] font-bold text-[#0f6dff]">0{index + 1}</span>
                    <h3 className="mt-2 font-display text-[16px] font-bold">{step.title}</h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-slate-600">{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="bg-white py-10">
          <div className={`${container} grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}>
            <div>
              <p className={eyebrow}>SEO Reporting & Measurement</p>
              <h2 className={`${heading} mt-2`}>Measure Progress Against a Starting Point.</h2>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-slate-600">
                Before work begins, agree which indicators are relevant and what data is available. Reporting describes observed movement and completed work; it does not promise rankings, traffic or enquiries.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <li key={tool} className="rounded-md border border-slate-200 bg-[#f7f9fc] px-3 py-2 text-[12px] font-semibold text-slate-700">{tool}</li>
                ))}
              </ul>
              <p className="mt-3 text-[12px] leading-relaxed text-slate-500">Tools vary by engagement, account access and reporting needs; not every tool is used for every project.</p>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold">Measures we can review when relevant data is available</h3>
              <ul className="mt-4 divide-y divide-slate-200 border-y border-slate-200">
                {reportMeasures.map((item, index) => (
                  <li key={item} className="grid grid-cols-[36px_1fr] gap-3 py-4">
                    <span className="font-display text-[12px] font-bold text-[#0f6dff]">0{index + 1}</span>
                    <span className="text-[14px] font-semibold leading-relaxed text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[13px] leading-relaxed text-slate-500">Reporting cadence and deliverables follow the selected package and agreed project scope.</p>
            </div>
          </div>
        </section>

        <section className="bg-[#f7f9fc] py-10">
          <div className={container}>
            <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-14">
              <div>
                <p className={eyebrow}>Industries We Support</p>
                <h2 className={`${heading} mt-2`}>SEO Planning for Different Business Contexts.</h2>
              </div>
              <p className="max-w-2xl text-[15px] leading-relaxed text-slate-600 lg:justify-self-end">
                These industries are listed in Webamazee&apos;s existing SEO service information. The notes describe common search-planning considerations, not client results or industry-specific case studies.
              </p>
            </div>
            <ul className="mt-8 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
              {industries.map((item, index) => (
                <li key={item.name} className="border-t border-slate-300 py-4">
                  <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">0{index + 1}</span>
                  <h3 className="mt-2 font-display text-[16px] font-bold">{item.name}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-white py-10">
          <div className={container}>
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-14">
              <div>
                <p className={eyebrow}>Why Webamazee</p>
                <h2 className={`${heading} mt-2`}>An SEO Partner Focused on Clear, Sustainable Work.</h2>
              </div>
              <p className="max-w-2xl text-[15px] leading-relaxed text-slate-600 lg:justify-self-end">
                SEO needs ongoing attention, but plans should stay grounded in evidence, clear communication and the work agreed for your site.
              </p>
            </div>
            <div className="mt-8 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
              {differentiators.map((item, index) => (
                <div key={item.title} className="border-t border-slate-200 py-5">
                  <span className="text-[12px] font-bold text-[#0f6dff]">0{index + 1}</span>
                  <h3 className="mt-3 font-display text-[17px] font-bold">{item.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="selected-work" className="scroll-mt-28 bg-[#f7f9fc] py-10">
          <div className={container}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className={eyebrow}>A Real Website Project</p>
                <h2 className={`${heading} mt-2`}>Search-Aware Foundations in a Live Store Build.</h2>
              </div>
              <Link href="/case-studies/kabiroilmill" className="inline-flex items-center gap-1 text-sm font-bold text-[#0f6dff] hover:underline">
                Read the case study <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
            <article className="mt-7 grid overflow-hidden rounded-2xl border border-slate-200 bg-white lg:grid-cols-[1.05fr_0.95fr]">
              <div className="bg-[#edf2f8] p-3 sm:p-4">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <Image
                    src={seoProject.screenshot}
                    alt="Kabir Oil Mill e-commerce website screenshot showing product categories and products"
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">Website & E-Commerce Development · Kabir Oil Mill</p>
                <h3 className="mt-3 font-display text-2xl font-bold">A product catalogue with search-friendly structure.</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-600">
                  The published case study describes product categories and pages, responsive implementation, metadata foundations and internal-link structure. This is a genuine website project—not an SEO campaign case study—and no ranking, traffic or enquiry results are claimed here.
                </p>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                  <Link href={seoProject.caseStudyUrl} className="inline-flex items-center gap-1 text-[13px] font-bold text-[#0f6dff] hover:underline">
                    Case study <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                  <a href={seoProject.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[13px] font-bold text-slate-700 hover:text-[#0f6dff]">
                    Visit live website <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section id="pricing" className="bg-white py-10">
          <div className={container}>
            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
              <div>
                <p className={eyebrow}>Published SEO Packages</p>
                <h2 className={`${heading} mt-2`}>SEO Services Pricing.</h2>
              </div>
              <p className="max-w-2xl text-[15px] leading-relaxed text-slate-600 lg:justify-self-end">
                These monthly rates and inclusions match Webamazee&apos;s current pricing page and repository pricing configuration. India and International prices are separate market rates, not currency conversions.
              </p>
            </div>
            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="hidden grid-cols-[minmax(0,1.3fr)_minmax(130px,0.55fr)_minmax(130px,0.55fr)] gap-5 bg-[#f4f8ff] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-600 md:grid">
                <span>SEO package and published features</span>
                <span>International · USD</span>
                <span>India · INR</span>
              </div>
              {seoPlans.map((plan) => (
                <article key={plan.name} className="grid gap-5 border-t border-slate-200 p-5 first:border-t-0 sm:p-6 md:grid-cols-[minmax(0,1.3fr)_minmax(130px,0.55fr)_minmax(130px,0.55fr)] md:items-start md:gap-5">
                  <div>
                    <h3 className="font-display text-lg font-bold">{plan.name}</h3>
                    <p className="mt-1 text-[12px] text-slate-500">Per month · billed monthly</p>
                    <ul className="mt-3 grid gap-x-5 gap-y-2 sm:grid-cols-2">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-[13px] leading-relaxed text-slate-600">
                          <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6dff]" />{feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 md:hidden">International · USD</p>
                    <p className="mt-1 font-display text-2xl font-bold tracking-tight text-[#0b1528]">{plan.international}</p>
                    <p className="text-[12px] text-slate-500">Monthly · billed monthly</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 md:hidden">India · INR</p>
                    <p className="mt-1 font-display text-2xl font-bold tracking-tight text-[#0b1528]">{plan.india}</p>
                    <p className="text-[12px] text-slate-500">Monthly · billed monthly</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-4 text-[12px] leading-relaxed text-slate-500">
              Package features are shown as published. Any additional work, implementation requirements or third-party costs should be confirmed in the project scope.
            </p>
            <Link href="/contact" className={`${primary} mt-6`}>
              Get an SEO Consultation <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <p className="mt-3 text-[12px] leading-relaxed text-slate-500">On the existing contact form, select SEO / AI SEO as your service.</p>
          </div>
        </section>

        <section className="bg-[#f7f9fc] py-10">
          <div className={`${container} grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16`}>
            <div>
              <p className={eyebrow}>SEO FAQ</p>
              <h2 className={`${heading} mt-2`}>Frequently Asked Questions About SEO Services.</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-600">Have another question about your search visibility or scope?</p>
              <Link href="/contact" className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-bold text-[#0f6dff] hover:underline">
                Talk to our team <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {faqItems.map((faq) => (
                <details key={faq.q} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-display text-[16px] font-bold leading-snug text-[#0b1528] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0f6dff] [&::-webkit-details-marker]:hidden">
                    <span>{faq.q}</span>
                    <Plus aria-hidden="true" className="h-5 w-5 shrink-0 text-[#0f6dff] transition-transform group-open:rotate-45 motion-reduce:transition-none" />
                  </summary>
                  <p className="max-w-2xl pb-5 text-[14px] leading-[1.7] text-slate-600">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-10">
          <div className={container}>
            <div>
              <p className={eyebrow}>Related Services</p>
              <h2 className={`${heading} mt-2`}>Explore Related Search and Content Services.</h2>
            </div>
            <ul className="mt-7 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-5">
              {relatedServices.map((service) => (
                <li key={service.title}>
                  <Link href={service.href} className="group flex h-full flex-col border-t border-slate-200 py-5 hover:text-[#0f6dff]">
                    <span className="flex items-center justify-between gap-3 font-display text-[16px] font-bold">
                      {service.title}
                      <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 text-[#0f6dff]" />
                    </span>
                    <span className="mt-2 text-[13px] leading-relaxed text-slate-600">{service.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-[#f7f9fc] py-10">
          <div className={container}>
            <div className="grid gap-6 rounded-2xl bg-[#0b1528] p-6 text-white sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#87b4ff]">Start With a Conversation</p>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl">Ready to Make Search Work Harder for Your Business?</h2>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-300">
                  Tell us about your website, audience and business goals. We&apos;ll discuss a practical SEO plan, the right starting point and how progress can be reviewed.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className={primary}>
                  Get an SEO Consultation <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-slate-500 px-6 text-sm font-bold text-white hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  Book a Consultation <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
    </div>
  );
}
