import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Plus } from "lucide-react";
import { CALENDLY_URL } from "@/components/newhome/newhome-data";
import { GOOGLE_REVIEWS_URL, testimonials } from "@/lib/testimonials";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { site } from "@/lib/site";

const title = "Local SEO Services | Google Maps & Local Search Optimisation | Webamazee";
const description =
  "Grow your local visibility with Webamazee Local SEO services. Optimise your Google Business Profile, improve Google Maps presence and help nearby customers find your business.";
const pageUrl = `${site.url}/services/newlocalseo`;

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
        alt: "Local SEO services by Webamazee",
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

const localProblems = [
  {
    title: "Hard to find in nearby searches",
    text: "People looking for a service in your area may not see useful, accurate information about your business when they compare local options.",
  },
  {
    title: "An incomplete business profile",
    text: "Missing, outdated or inconsistent profile details can make it harder for customers to understand what you offer and where you operate.",
  },
  {
    title: "Different details across directories",
    text: "Conflicting business names, addresses or phone numbers can create confusion for people and make local information harder to maintain.",
  },
  {
    title: "Location pages that do not reflect real service areas",
    text: "Generic or unclear location content may not answer local customers' questions or accurately explain where the business serves.",
  },
  {
    title: "Few genuine customer reviews",
    text: "A small or outdated set of reviews can leave people with less context when they compare local providers.",
  },
  {
    title: "No clear way to assess progress",
    text: "Without a baseline and agreed measures, it can be difficult to understand profile engagement, local visibility or enquiry activity.",
  },
];

const localServices = [
  {
    title: "Google Business Profile Optimisation",
    text: "Review profile completeness, categories, business details, service information and available photos—subject to Google's eligibility rules and the agreed scope.",
  },
  {
    title: "Google Maps Visibility",
    text: "Improve the accuracy and usefulness of local business information that people see as they search and compare providers on Maps.",
  },
  {
    title: "Local Keyword Research",
    text: "Research relevant local queries and service-area language to inform profile content, website pages and campaign priorities.",
  },
  {
    title: "Citation Building and NAP Consistency",
    text: "Review relevant directory listings and work toward consistent name, address and phone details across appropriate sources.",
  },
  {
    title: "Review Management",
    text: "Plan a compliant way to invite genuine feedback and manage responses. Reviews are never bought, fabricated or manipulated.",
  },
  {
    title: "Location-Specific Landing Pages",
    text: "Plan useful pages for locations the business genuinely serves, with accurate local information and clear next steps.",
  },
  {
    title: "Local Link Building",
    text: "Assess relevant local sources, organisations and partnerships as possible authority-building opportunities.",
  },
  {
    title: "Local SEO Tracking and Reporting",
    text: "Review agreed local visibility, profile engagement, calls or enquiries and review activity using available data.",
  },
];

const mapsWork = [
  {
    title: "Check eligibility and profile access",
    text: "Confirm the business can use a Google Business Profile under Google's current rules before profile work is planned.",
  },
  {
    title: "Review profile accuracy",
    text: "Check business details, categories, hours, service information and the areas a business genuinely serves.",
  },
  {
    title: "Improve useful profile information",
    text: "Organise accurate descriptions, services and available photos so local customers can make an informed comparison.",
  },
  {
    title: "Connect the profile with the website",
    text: "Align profile details with relevant website pages and maintain consistent contact paths and business information.",
  },
];

const processSteps = [
  {
    title: "Local Audit",
    text: "Review the Google Business Profile, listings, website, service areas and current local-search position.",
  },
  {
    title: "Profile Optimisation",
    text: "Improve profile completeness, categories and business information when the business is eligible and access is available.",
  },
  {
    title: "Citation Building",
    text: "Identify relevant directories and address business-detail inconsistencies across the agreed listing set.",
  },
  {
    title: "Review Process",
    text: "Set up an appropriate way to invite genuine feedback and manage responses in line with platform policies.",
  },
  {
    title: "Local Content",
    text: "Plan service-area pages and content around locations the business actually serves and customer needs.",
  },
  {
    title: "Track & Review",
    text: "Monitor agreed local visibility, profile engagement and enquiry indicators; use findings to review next steps.",
  },
];

const publishedPackageFeatures = [
  "Local Keyword Research",
  "Google Business Profile Optimization",
  "Local On-Page SEO",
  "Citation & Directory Optimization",
  "Monthly SEO Report",
];

const additionalActivities = [
  "Review management and response process",
  "Location-specific landing pages",
  "Local link-building opportunities",
  "Google Maps and local visibility tracking",
];

const differentiators = [
  {
    title: "Local-search focus",
    text: "Profile information, local listings, service areas and nearby customer journeys are considered together.",
  },
  {
    title: "Accurate, policy-aware work",
    text: "Profile and review activity is planned around platform rules, business eligibility and genuine information.",
  },
  {
    title: "Multi-location planning",
    text: "Where the business has multiple locations, the plan can reflect each eligible profile and genuine service area.",
  },
  {
    title: "Human-reviewed assistance",
    text: "AI-assisted research can support the workflow, with recommendations and deliverables reviewed by people.",
  },
  {
    title: "Hands-on support by scope",
    text: "Profile, listing, review and location-page tasks are agreed before work begins—not assumed to be included by default.",
  },
  {
    title: "Clear progress reviews",
    text: "Agree a baseline and review the local indicators that are available and relevant to your goals.",
  },
];

const industries = [
  {
    name: "Healthcare",
    text: "Keep service details, location information and contact routes accurate and easy to understand.",
  },
  {
    name: "Home Services",
    text: "Clarify service areas and the specific work a local business offers to nearby customers.",
  },
  {
    name: "Restaurants",
    text: "Maintain useful location, hours, contact and service information for people choosing where to visit.",
  },
  {
    name: "Retail",
    text: "Help customers confirm store locations, opening details and relevant product or service information.",
  },
  {
    name: "Legal",
    text: "Present practice areas, office details and service locations clearly, with accurate descriptions.",
  },
  {
    name: "Automotive",
    text: "Make services, location details and customer contact options straightforward to find.",
  },
];

const tools = [
  "Google Business Profile",
  "Google Maps",
  "Moz Local",
  "BrightLocal",
  "Google Analytics",
  "Google Search Console",
  "Ahrefs",
];

const progressMeasures = [
  "Local search visibility",
  "Business-profile engagement",
  "Calls and enquiries, where tracking is available",
  "Review activity",
];

const faqItems = [
  {
    q: "What is Local SEO?",
    a: "Local SEO is work on a business's online presence to help people discover accurate information in local search results and Google Maps for the areas it serves. Visibility depends on the business, its location, competition and Google's systems.",
  },
  {
    q: "How long before Local SEO results appear?",
    a: "Timing depends on the starting point, local competition, business eligibility and how quickly agreed changes can be implemented. We review progress against agreed measures and do not promise a fixed number of days.",
  },
  {
    q: "Can you guarantee a top-three Google Maps ranking?",
    a: "No. Google Maps positions and local-pack placement cannot be guaranteed. We focus on accurate business information, relevant local content and agreed improvements, then review available data over time.",
  },
  {
    q: "Do you manage Google Business Profiles?",
    a: "Webamazee's Local SEO service includes profile review and management activities, subject to Google's eligibility rules, account access and the scope agreed for the engagement.",
  },
  {
    q: "Is every business eligible for a Google Business Profile?",
    a: "No. Google sets eligibility requirements and policies for profiles. We can review the relevant requirements, but Google determines eligibility and approval.",
  },
  {
    q: "How can you help us get more reviews?",
    a: "We can help plan a straightforward process for inviting genuine customers to share honest feedback and for responding appropriately. Reviews are not bought, fabricated or manipulated.",
  },
  {
    q: "Do you build local citations?",
    a: "Yes. Citation work can include reviewing relevant directories and working toward consistent business name, address and phone details across the listings agreed for the project.",
  },
  {
    q: "Can you support a business with multiple locations?",
    a: "Yes. A plan can account for multiple eligible profiles, locations and genuine service areas. The number of locations and required work are confirmed in the scope.",
  },
  {
    q: "What information does Webamazee need to plan Local SEO?",
    a: "Useful starting details include your business goals, service areas, locations, current website, existing profile or listing information, priority services and available analytics or Search Console data.",
  },
  {
    q: "How do we get started?",
    a: "Request a Local SEO consultation or audit through the contact form and select Local SEO as your service. The team can review your starting point and discuss appropriate next steps.",
  },
  {
    q: "Can Local SEO be combined with other Webamazee services?",
    a: "Yes. Where it supports the goal, Local SEO can be coordinated with services such as SEO, website development or relevant location-page work. Deliverables and fees are agreed separately in the project scope.",
  },
];

const relatedServices = [
  {
    title: "SEO Services",
    description: "Technical, on-page and broader organic search support.",
    href: "/services/seo-services",
  },
  {
    title: "Google Ranking Growth",
    description: "Search visibility planning for relevant customer queries.",
    href: "/services/google-ranking-growth",
  },
  {
    title: "Website Development",
    description: "Responsive website foundations for your business.",
    href: "/services/website-development",
  },
];

const serviceStructuredData = serviceSchema({
  name: "Local SEO Services",
  description,
  slug: "newlocalseo",
  keywords: [
    "Local SEO Services",
    "Local SEO Company",
    "Google Maps SEO",
    "Google Business Profile Optimisation",
    "local keyword research",
    "local citations",
    "local link building",
    "local SEO reporting",
  ],
  related: [
    { name: "SEO Services", slug: "seo-services" },
    { name: "Google Ranking Growth", slug: "google-ranking-growth" },
    { name: "Website Development", slug: "website-development" },
  ],
});
const breadcrumbStructuredData = breadcrumbSchema(
  [
    { label: "Services", href: "/services" },
    { label: "Local SEO" },
  ],
  "/services/newlocalseo",
);
const faqStructuredData = faqSchema(faqItems);

export default function NewLocalSeoPage() {
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
                <li aria-current="page" className="text-slate-700">Local SEO</li>
              </ol>
            </nav>
            <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
              <div>
                <p className={eyebrow}>Local SEO Services</p>
                <h1 className="mt-4 max-w-3xl font-display text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] sm:text-[3rem] lg:text-[3.55rem]">
                  Get Found by More Customers in Your Local Area.
                </h1>
                <p className="mt-5 max-w-2xl text-[17px] leading-[1.65] text-slate-600 sm:text-[18px]">
                  Help nearby customers discover your business through Google Maps, local search optimisation and a stronger Google Business Profile. Webamazee plans local SEO around accurate business details, the areas you genuinely serve and useful paths from search to contact.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/contact" className={primary}>
                    Get a Free Local SEO Audit <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className={secondary}>
                    Book a Consultation <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </a>
                </div>
                <p className="mt-4 text-[13px] leading-relaxed text-slate-500">On the existing contact form, select Local SEO as your service.</p>
              </div>
              <aside className="border-l-2 border-[#0f6dff] pl-6 sm:pl-8">
                <p className={eyebrow}>Local search starts with clear information</p>
                <h2 className="mt-3 max-w-sm font-display text-2xl font-bold leading-tight tracking-[-0.02em]">Make it easier for nearby customers to understand your business.</h2>
                <ol className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
                  {[
                    "Accurate profile and listing details",
                    "Useful pages for genuine service areas",
                    "A clear route from discovery to contact",
                    "Progress reviewed against a baseline",
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
                <p className={eyebrow}>Common Local Search Problems</p>
                <h2 className={`${heading} mt-2 max-w-2xl`}>Local Search Challenges That Can Make Discovery Harder.</h2>
              </div>
              <p className="max-w-2xl text-[15px] leading-relaxed text-slate-600 lg:justify-self-end">
                These are practical issues a local audit can help assess. Results depend on business eligibility, location, competition, available information and implementation.
              </p>
            </div>
            <ol className="mt-8 grid gap-x-9 sm:grid-cols-2 lg:grid-cols-3">
              {localProblems.map((item, index) => (
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
                <p className={eyebrow}>What Local SEO Includes</p>
                <h2 className={`${heading} mt-2`}>Local SEO Services Built Around Your Business.</h2>
                <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-slate-600">
                  A local SEO company should be clear about how profile work, listings, pages and reporting fit together. Webamazee&apos;s Local SEO service addresses these areas according to the business, eligibility and agreed engagement.
                </p>
              </div>
              <ol className="divide-y divide-slate-200 border-y border-slate-200 bg-white">
                {localServices.map((service, index) => (
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
              <p className={eyebrow}>Google Maps & Google Business Profile</p>
              <h2 className={`${heading} mt-2`}>Make Your Local Business Information Clear and Consistent.</h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-600">
                Google Maps SEO begins with useful, accurate information and an eligible profile. We review local profile details and their connection to your website, helping customers compare providers without promising a particular map position.
              </p>
              <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-slate-500">
                Google determines profile eligibility and approval. Profile work is planned in line with its current guidelines and the access available for your business.
              </p>
            </div>
            <ol className="divide-y divide-slate-200 border-y border-slate-200">
              {mapsWork.map((item, index) => (
                <li key={item.title} className="grid gap-2 py-4 sm:grid-cols-[42px_0.75fr_1.25fr] sm:gap-4">
                  <span className="font-display text-[12px] font-bold text-[#0f6dff]">0{index + 1}</span>
                  <h3 className="font-display text-[16px] font-bold">{item.title}</h3>
                  <p className="text-[14px] leading-relaxed text-slate-600">{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="local-seo-process" className="scroll-mt-24 bg-[#f7f9fc] py-10">
          <div className={container}>
            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
              <div>
                <p className={eyebrow}>Our Six-Step Local SEO Process</p>
                <h2 className={`${heading} mt-2`}>A Practical Path From Audit to Review.</h2>
              </div>
              <p className="max-w-2xl text-[15px] leading-relaxed text-slate-600 lg:justify-self-end">
                The sequence follows Webamazee&apos;s existing local SEO approach. Activities, access requirements and review cadence are confirmed for each engagement.
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

        <section className="bg-white py-10">
          <div className={container}>
            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
              <div>
                <p className={eyebrow}>Deliverables & Campaign Activities</p>
                <h2 className={`${heading} mt-2`}>Know What Is Included and What Is Scoped.</h2>
              </div>
              <p className="max-w-2xl text-[15px] leading-relaxed text-slate-600 lg:justify-self-end">
                The published Local SEO package has a defined feature list. Other activities from the Local SEO service are planned and priced according to the agreed engagement; they are not assumed to be included in every package.
              </p>
            </div>
            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
              <div className="rounded-2xl border border-slate-200 bg-[#f7f9fc] p-6 sm:p-7">
                <p className={eyebrow}>Published Local SEO Package</p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {publishedPackageFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-slate-700">
                      <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6dff]" />{feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-l-2 border-[#0f6dff] pl-5 sm:pl-7">
                <p className={eyebrow}>Activities to scope where relevant</p>
                <ul className="mt-4 space-y-3">
                  {additionalActivities.map((activity) => (
                    <li key={activity} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-slate-600">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0f6dff]" />{activity}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[13px] leading-relaxed text-slate-500">Exact deliverables, implementation and reporting cadence are confirmed in the project scope.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f7f9fc] py-10">
          <div className={container}>
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-14">
              <div>
                <p className={eyebrow}>Why Webamazee</p>
                <h2 className={`${heading} mt-2`}>A Local SEO Partner Focused on Useful, Trustworthy Work.</h2>
              </div>
              <p className="max-w-2xl text-[15px] leading-relaxed text-slate-600 lg:justify-self-end">
                Local visibility depends on accurate information, eligibility, search context and consistent implementation. Our approach focuses on these foundations rather than a promised rank.
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

        <section className="bg-white py-10">
          <div className={container}>
            <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-14">
              <div>
                <p className={eyebrow}>Industries We Support</p>
                <h2 className={`${heading} mt-2`}>Local Search Planning for Different Business Types.</h2>
              </div>
              <p className="max-w-2xl text-[15px] leading-relaxed text-slate-600 lg:justify-self-end">
                These industries are listed in Webamazee&apos;s existing Local SEO service information. The notes describe common information needs, not client-specific results or case studies.
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

        <section className="bg-[#f7f9fc] py-10">
          <div className={`${container} grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}>
            <div>
              <p className={eyebrow}>Tools & Platforms</p>
              <h2 className={`${heading} mt-2`}>Use the Tools That Fit the Local Search Work.</h2>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-slate-600">
                Webamazee&apos;s existing Local SEO service lists the platforms below. The tools used for a specific engagement depend on account access, location count, reporting needs and agreed scope.
              </p>
            </div>
            <ul className="flex flex-wrap content-start gap-2.5">
              {tools.map((tool) => (
                <li key={tool} className="rounded-md border border-slate-200 bg-white px-4 py-3 text-[13px] font-semibold text-slate-700">{tool}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="pricing" className="scroll-mt-24 bg-white py-10">
          <div className={`${container} grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}>
            <div>
              <p className={eyebrow}>Local SEO Pricing</p>
              <h2 className={`${heading} mt-2`}>One Published Local SEO Package.</h2>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-slate-600">
                The rates below match Webamazee&apos;s current pricing page and repository pricing configuration. India and International rates are separate market prices, not currency conversions.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="border-b border-slate-200 bg-[#f4f8ff] px-6 py-5 sm:px-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0f6dff]">Local SEO</p>
                <p className="mt-1 text-[13px] text-slate-600">Per month · billed monthly</p>
              </div>
              <div className="grid sm:grid-cols-2">
                <div className="border-b border-slate-200 px-6 py-5 sm:border-b-0 sm:border-r sm:px-8">
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">International</p>
                  <p className="mt-2 font-display text-3xl font-bold tracking-tight text-[#0b1528]">$649</p>
                  <p className="text-[13px] text-slate-500">Per month · billed monthly</p>
                </div>
                <div className="px-6 py-5 sm:px-8">
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">India</p>
                  <p className="mt-2 font-display text-3xl font-bold tracking-tight text-[#0b1528]">₹19,999</p>
                  <p className="text-[13px] text-slate-500">Per month · billed monthly</p>
                </div>
              </div>
              <div className="border-t border-slate-200 px-6 py-6 sm:px-8">
                <p className="text-[13px] font-bold text-[#0b1528]">Published package features</p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {publishedPackageFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-[13px] leading-relaxed text-slate-600">
                      <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6dff]" />{feature}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={`${primary} mt-6`}>
                  Request Local SEO <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                <p className="mt-3 text-[12px] leading-relaxed text-slate-500">On the existing contact form, select Local SEO as your service.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f7f9fc] py-10">
          <div className={`${container} grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}>
            <div>
              <p className={eyebrow}>Local SEO Measurement</p>
              <h2 className={`${heading} mt-2`}>Review Progress Against Your Starting Point.</h2>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-slate-600">
                We agree which measures are relevant and review what the available data can show. Local rankings vary by location, competition, profile eligibility and search context; no top-three placement or timeline is promised.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold">Measures we can review</h3>
              <ul className="mt-4 divide-y divide-slate-200 border-y border-slate-200">
                {progressMeasures.map((item, index) => (
                  <li key={item} className="grid grid-cols-[36px_1fr] gap-3 py-4">
                    <span className="font-display text-[12px] font-bold text-[#0f6dff]">0{index + 1}</span>
                    <span className="text-[14px] font-semibold leading-relaxed text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[13px] leading-relaxed text-slate-500">Reporting reflects the data available to your business and the goals agreed for the engagement.</p>
            </div>
          </div>
        </section>

        <section className="bg-white py-10">
          <div className={container}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className={eyebrow}>Client Testimonials</p>
                <h2 className={`${heading} mt-2`}>What Our Clients Say.</h2>
                <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-slate-600">
                  These genuine Google reviews are from Webamazee&apos;s wider work. They are not presented as Local SEO-specific endorsements.
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

        <section className="bg-[#f7f9fc] py-10">
          <div className={`${container} grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16`}>
            <div>
              <p className={eyebrow}>Local SEO FAQ</p>
              <h2 className={`${heading} mt-2`}>Frequently Asked Questions About Local SEO.</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-600">Have another question about local visibility, eligibility or scope?</p>
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

        <section className="bg-[#f7f9fc] py-10">
          <div className={container}>
            <div className="grid gap-6 rounded-2xl bg-[#0b1528] p-6 text-white sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#87b4ff]">Start With a Conversation</p>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl">Ready to Help Nearby Customers Find You?</h2>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-300">
                  Tell us about your locations, service areas and business goals. We&apos;ll discuss a practical Local SEO starting point and the measures that make sense for your business.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className={primary}>
                  Get a Free Local SEO Audit <ArrowRight aria-hidden="true" className="h-4 w-4" />
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
