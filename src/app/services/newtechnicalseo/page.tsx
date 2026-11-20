import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Plus } from "lucide-react";
import { CALENDLY_URL } from "@/components/newhome/newhome-data";
import { GOOGLE_REVIEWS_URL, testimonials } from "@/lib/testimonials";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { site } from "@/lib/site";

const title = "Technical SEO Services | Website Audits & Optimisation | Webamazee";
const description =
  "Improve your website's technical SEO with Webamazee. Get technical audits, crawlability and indexation fixes, Core Web Vitals optimisation, schema markup and website performance improvements.";
const pageUrl = `${site.url}/services/newtechnicalseo`;

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
        alt: "Technical SEO services by Webamazee",
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

const technicalProblems = [
  {
    title: "Important pages are not being discovered",
    text: "Crawl paths, internal links, robots rules or sitemap issues can make it harder for search engines to reach the pages a site intends to make available.",
  },
  {
    title: "Indexation is unclear",
    text: "Unexpected noindex directives, canonical signals or duplicate URL variants may make it harder to understand which pages should be considered.",
  },
  {
    title: "Pages feel slow or unstable",
    text: "Heavy assets, third-party scripts or rendering issues can affect page loading and the experience visitors have on key templates.",
  },
  {
    title: "Site structure hides useful content",
    text: "A confusing hierarchy or weak internal linking can make important pages harder for people and crawlers to navigate.",
  },
  {
    title: "Redirects and errors accumulate",
    text: "Broken links, unhelpful redirects and not-found responses can disrupt user journeys and technical site health.",
  },
  {
    title: "Technical changes go unreviewed",
    text: "Releases, migrations and new page templates can change technical signals, so a clear monitoring plan matters.",
  },
];

const technicalServices = [
  {
    title: "Technical SEO Audits",
    text: "Crawl and review the site, identify technical issues and prioritise recommendations around impact and implementation constraints.",
  },
  {
    title: "Crawlability and Indexation",
    text: "Check whether important pages can be discovered, crawled and presented with the intended indexability signals.",
  },
  {
    title: "XML Sitemap and robots.txt Review",
    text: "Review sitemap coverage and robots.txt rules so they align with the pages the site intends to expose to crawlers.",
  },
  {
    title: "Canonical Tags and Duplicate Content Signals",
    text: "Assess canonical signals and similar URL variants, then plan changes according to the site's actual content and URL structure.",
  },
  {
    title: "Core Web Vitals and Page Speed",
    text: "Review loading, responsiveness and visual stability on key templates and identify performance work appropriate to the site.",
  },
  {
    title: "Structured Data and Schema Markup",
    text: "Check whether structured data is relevant, accurate and consistent with visible page content; rich results are not guaranteed.",
  },
  {
    title: "Website Architecture and Internal Linking",
    text: "Review page hierarchy and internal paths so important sections are easier to navigate and understand.",
  },
  {
    title: "Redirects, Broken Links and 404 Responses",
    text: "Review redirect behaviour, broken destinations and HTTP errors, then agree which corrections should be implemented.",
  },
  {
    title: "Mobile Usability",
    text: "Review responsive behaviour and key page interactions across common screen sizes.",
  },
  {
    title: "Technical SEO Monitoring",
    text: "Recheck agreed technical indicators after changes or releases, with cadence and reporting set by the engagement.",
  },
];

const performanceReviews = [
  {
    title: "Review key templates",
    text: "Assess representative pages and their loading behaviour rather than relying on a single site-wide assumption.",
  },
  {
    title: "Find likely constraints",
    text: "Consider page assets, scripts, rendering, hosting and other factors that can affect load and interaction.",
  },
  {
    title: "Prioritise practical changes",
    text: "Agree which optimisations are appropriate for the codebase, platform and available development resources.",
  },
  {
    title: "Recheck after implementation",
    text: "Review the available field or lab data after changes; results vary by page, device, network and site setup.",
  },
];

const crawlChecks = [
  "Important URLs and crawl paths",
  "Indexability directives and canonical signals",
  "XML sitemap coverage and robots.txt rules",
  "HTTP responses, redirects and not-found pages",
];

const schemaChecks = [
  "Is structured data appropriate for the visible page content?",
  "Do required properties and values match the page?",
  "Are there validation errors or conflicting signals to review?",
  "Has the change been checked after implementation?",
];

const healthAreas = [
  {
    title: "Architecture and internal links",
    text: "Review the hierarchy between key pages and how visitors and crawlers move through the site.",
  },
  {
    title: "Canonical and duplicate URL signals",
    text: "Check how similar pages and URL variants are represented, based on the site's content and intended URLs.",
  },
  {
    title: "Redirects and broken destinations",
    text: "Find relevant redirect chains, broken links and not-found responses that should be reviewed.",
  },
  {
    title: "Mobile and technical behaviour",
    text: "Review responsive rendering and usability on common devices alongside the technical audit findings.",
  },
];

const processSteps = [
  {
    title: "Deep Audit",
    text: "Crawl and review the site's technical setup, key templates and current search-access signals.",
  },
  {
    title: "Prioritise",
    text: "Group and rank issues according to user impact, search accessibility, dependencies and effort.",
  },
  {
    title: "Fix Crawlability",
    text: "Implement agreed changes to crawl paths, robots rules, sitemaps or indexation signals, subject to access and scope.",
  },
  {
    title: "Optimise Performance",
    text: "Address agreed speed and Core Web Vitals opportunities based on the site's code, hosting and integrations.",
  },
  {
    title: "Refine Structure",
    text: "Review architecture, structured data, canonical signals and internal links for consistency.",
  },
  {
    title: "Monitor",
    text: "Recheck agreed technical-health indicators and report findings at the cadence set for the engagement.",
  },
];

const deliverables = [
  "Technical crawl and issue summary",
  "Crawlability, indexation, sitemap and robots review",
  "Core Web Vitals and page-speed review",
  "Structured data and schema checks",
  "Architecture, canonical and internal-link review",
  "Redirect, broken-link and mobile-usability checks",
];

const differentiators = [
  {
    title: "Technical-first diagnosis",
    text: "Look for causes across crawlability, indexation, performance and architecture—not just isolated warnings.",
  },
  {
    title: "Priorities in context",
    text: "Recommendations consider the site's platform, business goals, dependencies and available implementation resources.",
  },
  {
    title: "AI-assisted issue discovery",
    text: "AI can help surface potential technical issues; technical expertise informs the review and priorities.",
  },
  {
    title: "Hands-on implementation options",
    text: "The existing service supports implementing fixes directly or working with your developers, as agreed in scope.",
  },
  {
    title: "Performance-aware work",
    text: "Consider loading, interaction and visual stability as part of website health and user experience.",
  },
  {
    title: "Clear reporting",
    text: "Review the baseline, work completed and remaining issues using the data available to your business.",
  },
];

const tools = [
  "Screaming Frog",
  "Google Search Console",
  "PageSpeed Insights",
  "Lighthouse",
  "Ahrefs",
  "SEMrush",
  "Google Analytics 4",
  "Schema.org",
];

const reportAreas = [
  "Crawlability and indexation",
  "Core Web Vitals and page performance",
  "Structured data and schema validation",
  "Technical errors, redirects and mobile usability",
];

const faqItems = [
  {
    q: "What is technical SEO?",
    a: "Technical SEO reviews aspects of a website such as crawlability, indexation, performance, architecture and structured data. The aim is to make the site easier for search engines to access and interpret; rankings are influenced by many factors.",
  },
  {
    q: "Why is technical SEO important?",
    a: "Technical issues can make important pages harder to access, render or understand. Addressing relevant issues supports search accessibility and user experience, but does not guarantee rankings or indexing.",
  },
  {
    q: "How often should I run a technical SEO audit?",
    a: "Audit frequency depends on site size, release cadence and how much the website changes. We can agree an audit and monitoring schedule around your site and available resources.",
  },
  {
    q: "Do you implement technical SEO fixes?",
    a: "The existing service supports implementing agreed fixes directly or working with your developers. Specific tasks depend on the platform, access, complexity and scope confirmed for the engagement.",
  },
  {
    q: "Will technical SEO improve my website speed?",
    a: "A review can identify performance opportunities, and agreed changes can be implemented where practical. Outcomes depend on code, hosting, assets and third-party services; no particular score or ranking change is guaranteed.",
  },
  {
    q: "Does passing Core Web Vitals guarantee higher rankings?",
    a: "No. Core Web Vitals are one part of page experience and technical review. Passing them does not guarantee a ranking improvement or a specific search position.",
  },
  {
    q: "Can you guarantee that Google will index my pages?",
    a: "No. We can review crawlability, indexation signals, sitemaps and related issues, but search engines decide what to crawl and index.",
  },
  {
    q: "How long until I see technical SEO results?",
    a: "Timing depends on the issue, implementation, crawling and the wider search context. We review findings and agree a practical schedule without promising a fixed timeline.",
  },
  {
    q: "Can you help with a Google penalty or manual action?",
    a: "We can review the technical issues and available notices, then discuss appropriate remediation within scope. Google determines any review outcome, and we cannot guarantee reinstatement or ranking changes.",
  },
  {
    q: "Do I need ongoing technical SEO monitoring?",
    a: "Monitoring can help identify issues introduced by releases, content changes or platform updates. Whether ongoing monitoring is appropriate, and how often it occurs, depends on your site and agreement.",
  },
  {
    q: "What information does Webamazee need to plan a technical SEO audit?",
    a: "Useful starting information includes your website, business goals, priority pages, recent migrations or releases, platform details and any available Search Console or analytics data.",
  },
  {
    q: "Can technical SEO be combined with other Webamazee services?",
    a: "Yes. Where relevant, technical SEO can be coordinated with SEO, website development, redesign or content work. Deliverables and responsibilities are agreed for the project.",
  },
];

const relatedServices = [
  {
    title: "SEO Services",
    description: "Broader organic search planning and optimisation.",
    href: "/services/seo-services",
  },
  {
    title: "Website Development",
    description: "Website design and development for business requirements.",
    href: "/services/website-development",
  },
  {
    title: "Google Ranking Growth",
    description: "Search visibility support aligned with your goals.",
    href: "/services/google-ranking-growth",
  },
];

const serviceStructuredData = serviceSchema({
  name: "Technical SEO Services",
  description,
  slug: "newtechnicalseo",
  keywords: [
    "Technical SEO Services",
    "Technical SEO Audit",
    "Technical SEO Company",
    "Website Technical Optimisation",
    "crawlability and indexation",
    "Core Web Vitals optimisation",
    "schema markup",
    "technical website performance",
  ],
  related: [
    { name: "SEO Services", slug: "seo-services" },
    { name: "Website Development", slug: "website-development" },
    { name: "Google Ranking Growth", slug: "google-ranking-growth" },
  ],
});
const breadcrumbStructuredData = breadcrumbSchema(
  [
    { label: "Services", href: "/services" },
    { label: "Technical SEO" },
  ],
  "/services/newtechnicalseo",
);
const faqStructuredData = faqSchema(faqItems);

export default function NewTechnicalSeoPage() {
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
                <li aria-current="page" className="text-slate-700">Technical SEO</li>
              </ol>
            </nav>
            <div className="grid items-center gap-9 lg:grid-cols-2 lg:gap-12">
              <div>
                <p className={eyebrow}>Technical SEO Services</p>
                <h1 className="mt-4 max-w-3xl font-display text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] sm:text-[3rem] lg:text-[3.55rem]">
                  Technical SEO That Builds a Stronger Foundation for Search Growth.
                </h1>
                <p className="mt-5 max-w-2xl text-[17px] leading-[1.65] text-slate-600 sm:text-[18px]">
                  Identify and resolve technical website issues affecting crawlability, indexation, site performance and search visibility. Webamazee audits and prioritises work around your platform, implementation access and business goals—without guaranteeing rankings or indexation.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/contact" className={primary}>
                    Get a Free Technical SEO Audit <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className={secondary}>
                    Book a Consultation <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </a>
                </div>
                <p className="mt-4 text-[13px] leading-relaxed text-slate-500">On the existing contact form, select Technical SEO as your service.</p>
                <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[12px] font-semibold text-slate-600">
                  <li>Crawl &amp; Indexation</li>
                  <li aria-hidden="true" className="text-slate-300">/</li>
                  <li>Core Web Vitals</li>
                  <li aria-hidden="true" className="text-slate-300">/</li>
                  <li>Technical Audits</li>
                </ul>
              </div>
              <figure className="rounded-2xl border border-[#dce7f6] bg-white p-3 shadow-[0_20px_50px_-30px_rgba(11,21,40,0.3)] sm:p-4">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <Image
                    src="/images/custom/service-seo.webp"
                    alt="Marketing specialist reviewing a performance dashboard on a laptop"
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-center"
                  />
                </div>
                <figcaption className="px-1 pt-3 text-[12px] font-semibold text-slate-600">Technical website foundations · existing Webamazee visual</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="bg-white py-10">
          <div className={container}>
            <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
              <div>
                <p className={eyebrow}>Common Technical SEO Problems</p>
                <h2 className={`${heading} mt-2 max-w-2xl`}>Technical Issues That Can Make Search Discovery Harder.</h2>
              </div>
              <p className="max-w-2xl text-[15px] leading-relaxed text-slate-600 lg:justify-self-end">
                Technical problems can affect how a website is accessed, rendered or interpreted. An audit helps identify issues; resolving them does not guarantee a ranking or indexing outcome.
              </p>
            </div>
            <ol className="mt-8 grid gap-x-9 sm:grid-cols-2 lg:grid-cols-3">
              {technicalProblems.map((item, index) => (
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
                <p className={eyebrow}>Technical SEO Services</p>
                <h2 className={`${heading} mt-2`}>What Website Technical Optimisation Covers.</h2>
                <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-slate-600">
                  A technical SEO company should explain what it audits, what it can implement and what depends on the site's platform or development resources. Webamazee reviews and addresses technical issues according to the engagement scope.
                </p>
              </div>
              <ol className="divide-y divide-slate-200 border-y border-slate-200 bg-white">
                {technicalServices.map((service, index) => (
                  <li key={service.title} className="grid gap-2 p-4 sm:grid-cols-[34px_0.8fr_1.2fr] sm:items-start sm:gap-4 sm:px-5">
                    <span className="font-display text-[12px] font-bold text-[#0f6dff]">{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="font-display text-[15px] font-bold">{service.title}</h3>
                    <p className="text-[13px] leading-relaxed text-slate-600">{service.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="bg-white py-10">
          <div className={`${container} grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}>
            <div>
              <p className={eyebrow}>Core Web Vitals & Performance</p>
              <h2 className={`${heading} mt-2`}>Review Speed, Responsiveness and Visual Stability.</h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-600">
                Technical SEO performance reviews examine how representative pages load and behave. Core Web Vitals are one part of technical health and user experience; passing them does not guarantee higher rankings.
              </p>
              <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-slate-500">
                Findings can depend on page templates, hosting, assets, code and third-party scripts. We prioritise practical changes and agree who will implement them.
              </p>
            </div>
            <ol className="divide-y divide-slate-200 border-y border-slate-200">
              {performanceReviews.map((item, index) => (
                <li key={item.title} className="grid gap-2 py-4 sm:grid-cols-[42px_0.75fr_1.25fr] sm:gap-4">
                  <span className="font-display text-[12px] font-bold text-[#0f6dff]">0{index + 1}</span>
                  <h3 className="font-display text-[16px] font-bold">{item.title}</h3>
                  <p className="text-[14px] leading-relaxed text-slate-600">{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-[#f7f9fc] py-10">
          <div className={`${container} grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}>
            <div>
              <p className={eyebrow}>Crawlability & Indexation</p>
              <h2 className={`${heading} mt-2`}>Help Search Engines Access the Pages You Intend to Share.</h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-600">
                An audit can review crawl paths, indexability directives, XML sitemaps, robots.txt rules, canonical signals and response codes. Search engines decide what to crawl and index, so technical fixes cannot guarantee inclusion.
              </p>
            </div>
            <ul className="divide-y divide-slate-200 border-y border-slate-200">
              {crawlChecks.map((item, index) => (
                <li key={item} className="grid grid-cols-[38px_1fr] gap-3 py-4">
                  <span className="font-display text-[12px] font-bold text-[#0f6dff]">0{index + 1}</span>
                  <span className="text-[14px] font-semibold leading-relaxed text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-white py-10">
          <div className={`${container} grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}>
            <div>
              <p className={eyebrow}>Structured Data & Schema</p>
              <h2 className={`${heading} mt-2`}>Use Structured Data That Matches the Page.</h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-600">
                Structured data can help search systems interpret page content when the markup is relevant and accurate. Technical SEO work reviews schema against visible content and validation feedback; it does not guarantee a rich result.
              </p>
            </div>
            <ul className="divide-y divide-slate-200 border-y border-slate-200">
              {schemaChecks.map((item, index) => (
                <li key={item} className="grid grid-cols-[38px_1fr] gap-3 py-4">
                  <span className="font-display text-[12px] font-bold text-[#0f6dff]">0{index + 1}</span>
                  <span className="text-[14px] font-semibold leading-relaxed text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-[#f7f9fc] py-10">
          <div className={container}>
            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
              <div>
                <p className={eyebrow}>Website Architecture & Technical Health</p>
                <h2 className={`${heading} mt-2`}>Keep Structure, Links and Technical Signals Coherent.</h2>
              </div>
              <p className="max-w-2xl text-[15px] leading-relaxed text-slate-600 lg:justify-self-end">
                Site changes, content growth and migrations can introduce technical inconsistencies. Reviews focus on the pages, routes and signals that matter to your website and its users.
              </p>
            </div>
            <ol className="mt-8 grid gap-x-8 sm:grid-cols-2">
              {healthAreas.map((item, index) => (
                <li key={item.title} className="border-t border-slate-300 py-4">
                  <span className="font-display text-[12px] font-bold text-[#0f6dff]">0{index + 1}</span>
                  <h3 className="mt-2 font-display text-[16px] font-bold">{item.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-slate-600">{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="technical-seo-process" className="scroll-mt-24 bg-white py-10">
          <div className={container}>
            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
              <div>
                <p className={eyebrow}>Our Six-Step Technical SEO Process</p>
                <h2 className={`${heading} mt-2`}>From Audit Findings to an Agreed Technical Plan.</h2>
              </div>
              <p className="max-w-2xl text-[15px] leading-relaxed text-slate-600 lg:justify-self-end">
                The process follows Webamazee&apos;s existing technical SEO methodology. Implementation responsibilities, priorities and monitoring cadence are agreed for each engagement.
              </p>
            </div>
            <ol className="mt-8 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
              {processSteps.map((step, index) => (
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
          <div className={container}>
            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
              <div>
                <p className={eyebrow}>Deliverables & Reporting</p>
                <h2 className={`${heading} mt-2`}>Understand the Findings, Fixes and Next Steps.</h2>
              </div>
              <p className="max-w-2xl text-[15px] leading-relaxed text-slate-600 lg:justify-self-end">
                Audit outputs and implementation are scoped to your site. Reports describe observed technical conditions and completed work—not guaranteed ranking, speed-score or indexing outcomes.
              </p>
            </div>
            <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
              <div className="space-y-5">
                <ul className="grid gap-x-8 sm:grid-cols-2">
                  {deliverables.map((item, index) => (
                    <li key={item} className="border-t border-slate-300 py-4">
                      <span className="font-display text-[12px] font-bold text-[#0f6dff]">0{index + 1}</span>
                      <p className="mt-2 text-[14px] font-semibold leading-relaxed text-slate-700">{item}</p>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-slate-300 pt-4">
                  <h3 className="font-display text-[16px] font-bold">Reporting can cover</h3>
                  <ul className="mt-3 grid gap-x-5 gap-y-2 sm:grid-cols-2">
                    {reportAreas.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[13px] leading-relaxed text-slate-600">
                        <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6dff]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-[12px] leading-relaxed text-slate-500">Reporting reflects the available data and the goals agreed for the engagement.</p>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
                <p className={eyebrow}>Scope & Pricing</p>
                <h3 className="mt-3 font-display text-xl font-bold">Request a Custom Quote</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-600">
                  The published pricing page and repository do not list a separate Technical SEO package or rate. We can review your audit needs, implementation requirements and reporting scope before preparing a quote.
                </p>
                <Link href="/contact" className={`${primary} mt-5`}>
                  Request a Custom Quote <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                <p className="mt-3 text-[12px] leading-relaxed text-slate-500">On the existing contact form, select Technical SEO as your service.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-10">
          <div className={container}>
            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
              <div>
                <p className={eyebrow}>Why Webamazee</p>
                <h2 className={`${heading} mt-2`}>A Technical SEO Partner Focused on Practical, Verifiable Work.</h2>
              </div>
              <p className="max-w-2xl text-[15px] leading-relaxed text-slate-600 lg:justify-self-end">
                Strong technical foundations support search accessibility and user experience. Priorities are based on your site's condition, dependencies and the work agreed.
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

        <section className="bg-[#f7f9fc] py-10">
          <div className={`${container} grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}>
            <div>
              <p className={eyebrow}>Tools & Platforms</p>
              <h2 className={`${heading} mt-2`}>Use Tools That Fit the Audit and Website.</h2>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-slate-600">
                These tools and technologies are listed in Webamazee&apos;s existing Technical SEO service information. Selection depends on site access, the questions being investigated and the agreed scope; not every tool is used for every engagement.
              </p>
            </div>
            <ul className="flex flex-wrap content-start gap-2.5">
              {tools.map((tool) => (
                <li key={tool} className="rounded-md border border-slate-200 bg-white px-4 py-3 text-[13px] font-semibold text-slate-700">{tool}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-[#f7f9fc] py-10">
          <div className={container}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className={eyebrow}>Client Testimonials</p>
                <h2 className={`${heading} mt-2`}>What Our Clients Say.</h2>
                <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-slate-600">
                  Genuine reviews from Webamazee&apos;s Google Business Profile; they are not presented as Technical SEO-specific case results.
                </p>
              </div>
              <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[13px] font-bold text-[#0f6dff] hover:underline">
                Reviews from Google <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-7 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
              {testimonials.map((review) => (
                <figure key={review.name} className="flex flex-col border-t border-slate-200 py-5">
                  <blockquote className="flex-1 text-[14px] leading-[1.7] text-slate-700">&ldquo;{review.quote}&rdquo;</blockquote>
                  <figcaption className="mt-4 text-[13px] font-bold text-[#0b1528]">
                    {review.name}
                    <span className="mt-0.5 block text-[12px] font-medium text-slate-500">{review.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-10">
          <div className={`${container} grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16`}>
            <div>
              <p className={eyebrow}>Technical SEO FAQ</p>
              <h2 className={`${heading} mt-2`}>Frequently Asked Questions About Technical SEO.</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-600">Have another question about an audit, implementation or ongoing monitoring?</p>
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

        <section className="bg-[#f7f9fc] py-10">
          <div className={container}>
            <div>
              <p className={eyebrow}>Related SEO Services</p>
              <h2 className={`${heading} mt-2`}>Explore Related Webamazee Services.</h2>
            </div>
            <ul className="mt-7 grid gap-x-6 sm:grid-cols-3">
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

        <section className="bg-white py-10">
          <div className={container}>
            <div className="grid gap-6 rounded-2xl bg-[#0b1528] p-6 text-white sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#87b4ff]">Start With a Technical Review</p>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl">Ready to Strengthen Your Website&apos;s Technical Foundation?</h2>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-300">
                  Tell us about your website, platform and priorities. We&apos;ll discuss a technical SEO audit, practical fixes and a reporting approach suited to your project.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className={primary}>
                  Get a Free Technical SEO Audit <ArrowRight aria-hidden="true" className="h-4 w-4" />
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
