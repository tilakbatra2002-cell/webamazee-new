import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Plus } from "lucide-react";
import { CALENDLY_URL, CASE_STUDY_SHOWCASES } from "@/components/newhome/newhome-data";
import { testimonials, GOOGLE_REVIEWS_URL } from "@/lib/testimonials";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { site } from "@/lib/site";

const title = "E-Commerce Website Development Services | Webamazee";
const description =
  "Build a professional online store with Webamazee. Get e-commerce website design, Shopify development, payment integration, responsive shopping experiences and SEO-ready store architecture.";
const pageUrl = `${site.url}/services/newecommerce`;

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
        alt: "E-commerce website development services by Webamazee",
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

const project = CASE_STUDY_SHOWCASES.find((item) => item.slug === "kabiroilmill")!;

const problems = [
  {
    title: "Difficult Product Discovery",
    text: "When categories, navigation or search are hard to understand, shoppers can struggle to reach the products that fit their needs.",
  },
  {
    title: "Complicated Checkout",
    text: "Unclear steps, unexpected information requests or a confusing payment journey can interrupt a customer who is ready to order.",
  },
  {
    title: "Poor Mobile Experience",
    text: "Small controls, cramped product details and awkward forms make browsing and checkout harder on phones.",
  },
  {
    title: "Weak Product Pages",
    text: "Incomplete descriptions, unclear options or missing practical details leave shoppers with questions before they can decide.",
  },
  {
    title: "Slow Storefront",
    text: "Heavy pages and poorly optimised assets can make a storefront feel sluggish and frustrating to use.",
  },
  {
    title: "Limited Scalability",
    text: "A platform or catalogue structure that no longer fits the business can make new products, workflows or integrations harder to manage.",
  },
];

const services = [
  {
    title: "E-Commerce Website Design",
    text: "Plan the store's visual system, navigation and shopping journeys around the brand, products and customers.",
  },
  {
    title: "Online Store Development",
    text: "Build a responsive storefront on a platform selected for the catalogue, operations and project requirements.",
  },
  {
    title: "Shopify Website Development",
    text: "Use Shopify where its store management and commerce features fit the business and its planned workflows.",
  },
  {
    title: "Custom E-Commerce Development",
    text: "Scope custom functionality separately when a store needs workflows or behaviour beyond a standard setup.",
  },
  {
    title: "Product and Category Setup",
    text: "Organise agreed product and category information to support product catalogue management and clearer browsing.",
  },
  {
    title: "Payment Gateway Integration",
    text: "Connect the selected payment gateway according to the agreed store requirements and provider setup.",
  },
  {
    title: "Shopping Cart and Checkout",
    text: "Plan the journey from a product selection through cart review and checkout, within the agreed platform scope.",
  },
  {
    title: "Mobile-Responsive Store Design",
    text: "Create layouts and shopping controls that adapt to phones, tablets and desktop screens.",
  },
  {
    title: "E-Commerce SEO Foundations",
    text: "Give categories and product pages a considered structure, with basic SEO foundations defined in the package scope.",
  },
  {
    title: "Analytics Integration",
    text: "Set up the agreed basic analytics foundation; custom events and advanced measurement are scoped separately.",
  },
];

const benefits = [
  {
    title: "Present products professionally",
    text: "Clear product layouts help shoppers understand the range, options and details available.",
  },
  {
    title: "Make discovery easier",
    text: "Thoughtful navigation and category structure can make a growing catalogue easier to browse.",
  },
  {
    title: "Create a clearer checkout journey",
    text: "A considered route from product to payment helps customers understand what to do at each step.",
  },
  {
    title: "Support mobile shopping",
    text: "Responsive pages make it easier to explore products and use key store controls on smaller screens.",
  },
  {
    title: "Organise products and categories",
    text: "A maintainable catalogue structure gives teams a clearer foundation for managing store content.",
  },
  {
    title: "Build an organic-search foundation",
    text: "Useful product information and logical page structure can help search engines understand the store; rankings are not guaranteed.",
  },
  {
    title: "Plan for future requirements",
    text: "Choosing a suitable platform and clear scope helps the store adapt as business needs change.",
  },
];

const platforms = [
  {
    group: "Commerce platforms",
    items: [
      { name: "Shopify", detail: "Hosted store platform when its commerce tools suit the business." },
      { name: "WooCommerce", detail: "Used for the verified Kabir Oil Mill online store." },
      { name: "Headless Commerce", detail: "A custom storefront approach, scoped to the catalogue and technical requirements." },
      { name: "Next.js", detail: "A front-end option for custom storefront projects where appropriate." },
    ],
  },
  {
    group: "Payments, operations & measurement",
    items: [
      { name: "Stripe", detail: "A payment provider option, subject to account and project requirements." },
      { name: "PayPal", detail: "A payment option where it fits the store and market." },
      { name: "Klaviyo", detail: "An email-platform connection when included in the agreed scope." },
      { name: "Google Analytics 4", detail: "Analytics setup and measurement according to project requirements." },
      { name: "Google Search Console", detail: "A tool for reviewing search visibility and technical signals." },
      { name: "ShipStation", detail: "A shipping workflow integration to assess for the store's operations." },
    ],
  },
];

const processSteps = [
  {
    title: "Strategy",
    text: "Define the catalogue, platform, integrations and business goals before settling the store scope.",
  },
  {
    title: "UX & Design",
    text: "Plan a considered shopping experience around the brand, product range and customer needs.",
  },
  {
    title: "Development",
    text: "Build the online store on the selected platform and implement the agreed features.",
  },
  {
    title: "Integrations",
    text: "Configure relevant payment, shipping, email and analytics integrations when included in the project scope.",
  },
  {
    title: "SEO & Performance",
    text: "Review website architecture, product pages, technical SEO foundations and performance considerations.",
  },
  {
    title: "Launch & Optimisation",
    text: "Test the agreed store experience, prepare for launch and review improvement opportunities included in the agreement.",
  },
];

const packageInclusions = [
  "Online Store Development",
  "Product & Category Setup",
  "Payment Gateway Integration",
  "Mobile Responsive Design",
  "Basic SEO & Analytics",
];

const industries = [
  {
    name: "Fashion and Apparel",
    text: "Product variants, sizing details and category browsing need to be easy to understand.",
  },
  {
    name: "Home and Lifestyle",
    text: "A varied range benefits from useful category structure and clear product specifications.",
  },
  {
    name: "Beauty and Personal Care",
    text: "Product details, ingredients, options and usage information need clear presentation.",
  },
  {
    name: "Electronics",
    text: "Specifications, compatibility details and filters can help shoppers compare products.",
  },
  {
    name: "Food and Beverage",
    text: "Product ranges, pack options and practical product information shape the catalogue.",
  },
  {
    name: "Health and Wellness",
    text: "Clear product information and careful, accurate wording matter throughout the experience.",
  },
  {
    name: "Technology and Accessories",
    text: "Compatibility, product attributes and organised categories can support product discovery.",
  },
];

const faqItems = [
  {
    q: "Which e-commerce platform do you recommend?",
    a: "It depends on your catalogue, operations, budget and feature requirements. Webamazee works with Shopify and headless commerce approaches; the verified Kabir Oil Mill store is built with WooCommerce. We discuss the platform fit before defining the project scope.",
  },
  {
    q: "Can you migrate my existing online store?",
    a: "An existing store can be reviewed for platform, catalogue, content and URL requirements. Migration tasks, data transfer, redirects and launch checks are planned and priced according to the store; the exact scope is confirmed before work begins.",
  },
  {
    q: "Is my e-commerce website optimised for SEO?",
    a: "The published one-time package includes basic SEO and analytics. Store structure, product content and technical requirements can be reviewed within the agreed scope. SEO work does not guarantee rankings, traffic or sales, and ongoing SEO is a separate service.",
  },
  {
    q: "Can you integrate payment gateways?",
    a: "Payment Gateway Integration is listed in the published package. The provider, account setup and required payment methods are confirmed for each project. Complex or bespoke payment flows are custom-quoted, and provider transaction fees are separate.",
  },
  {
    q: "Can you connect shipping and inventory systems?",
    a: "Shipping, inventory and ERP connections depend on the systems, data and workflows involved. These integrations are not listed as standard package inclusions; custom or ERP integrations are scoped and quoted separately.",
  },
  {
    q: "How long does e-commerce website development take?",
    a: "Timing depends on catalogue size, content readiness, platform choice, integrations and review cycles. Webamazee can provide a project schedule after the requirements and responsibilities are agreed.",
  },
  {
    q: "Will my online store work on mobile devices?",
    a: "Mobile Responsive Design is part of the published package. The layout and key shopping journeys are planned for common screen sizes and reviewed as part of the agreed build.",
  },
  {
    q: "Can you help improve checkout usability?",
    a: "The shopping journey can be reviewed and the cart and checkout experience can be designed within the agreed platform and project scope. Usability improvements do not guarantee a particular conversion rate or reduction in cart abandonment.",
  },
  {
    q: "Do you provide ongoing maintenance?",
    a: "Ongoing maintenance is not automatically included in the one-time website package. Webamazee's service information describes care plans; availability, coverage and pricing should be agreed separately for your store.",
  },
  {
    q: "What information is required to start an e-commerce project?",
    a: "It helps to share your business goals, product range, categories, brand materials, preferred markets, payment and shipping needs, existing platform details and any required integrations. The team can then identify what needs to be supplied and agree the scope.",
  },
  {
    q: "Can I add more products and categories later?",
    a: "The store can be structured around the catalogue and the platform selected for the project. Product volumes and catalogue-management needs should be agreed up front; large catalogues or additional custom functionality are quoted separately.",
  },
  {
    q: "Can e-commerce development be combined with SEO services?",
    a: "Yes. E-commerce development and SEO can be planned together, but ongoing SEO services are separate from the one-time store package unless explicitly included in a written project agreement.",
  },
];

const relatedServices = [
  {
    title: "Website Development",
    text: "Business websites and custom development.",
    href: "/services/website-development",
  },
  {
    title: "Website Redesign",
    text: "Refresh an existing website's design and structure.",
    href: "/services/website-redesign",
  },
  {
    title: "SEO Services",
    text: "Discuss search optimisation as a separate or connected project.",
    href: "/services/seo-services",
  },
  {
    title: "Landing Page Development",
    text: "Focused pages for campaigns and offers.",
    href: "/services/landing-page-development",
  },
  {
    title: "Digital Marketing",
    text: "Explore Webamazee's wider digital services.",
    href: "/services",
  },
];

const whyWebamazee = [
  {
    title: "Business-focused planning",
    text: "Start with the product range, customer journey and practical business requirements.",
  },
  {
    title: "Product discovery and navigation",
    text: "Give categories, products and key shopping actions a clear information structure.",
  },
  {
    title: "Conversion-conscious design",
    text: "Use clear product information and next steps without promising specific sales outcomes.",
  },
  {
    title: "Performance-conscious development",
    text: "Consider page weight, responsive behaviour and store performance during the build.",
  },
  {
    title: "SEO-aware architecture",
    text: "Plan product and category structure with basic search foundations in mind.",
  },
  {
    title: "Platform selection with context",
    text: "Choose a platform after considering catalogue size, operations, budget and requirements.",
  },
  {
    title: "Transparent project scope",
    text: "Set out package inclusions, optional integrations and custom-quote work before development.",
  },
];

const serviceStructuredData = serviceSchema({
  name: "E-Commerce Website Development Services",
  description,
  slug: "newecommerce",
  keywords: [
    "E-Commerce Website Development",
    "E-Commerce Website Development Services",
    "E-Commerce Website Design",
    "E-Commerce Website Development Company",
    "Online Store Development",
    "Shopify Website Development",
    "Custom E-Commerce Development",
    "E-Commerce SEO",
    "Payment Gateway Integration",
    "Product Catalogue Management",
  ],
  related: [
    { name: "Website Development", slug: "website-development" },
    { name: "Website Redesign", slug: "website-redesign" },
    { name: "SEO Services", slug: "seo-services" },
    { name: "Landing Page Development", slug: "landing-page-development" },
  ],
});
const breadcrumbStructuredData = breadcrumbSchema(
  [
    { label: "Services", href: "/services" },
    { label: "E-Commerce Development" },
  ],
  "/services/newecommerce",
);
const faqStructuredData = faqSchema(faqItems);

export default function NewEcommercePage() {
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
                <li aria-current="page" className="text-slate-700">E-Commerce Development</li>
              </ol>
            </nav>
            <div className="grid items-center gap-9 lg:grid-cols-2 lg:gap-12">
              <div>
                <p className={eyebrow}>E-Commerce Website Development</p>
                <h1 className="mt-4 max-w-2xl font-display text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] sm:text-[3rem] lg:text-[3.55rem]">
                  E-Commerce Websites Built to Turn Browsers Into Buyers.
                </h1>
                <p className="mt-5 max-w-xl text-[17px] leading-[1.65] text-slate-600 sm:text-[18px]">
                  Webamazee helps businesses build professional online stores with intuitive product discovery, responsive shopping experiences, payment gateway integration and SEO-conscious website architecture. From Shopify website development to a tailored storefront plan, the platform and scope are shaped around your products, operations and requirements.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/contact" className={primary}>
                    Get an E-Commerce Website Quote <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                  <a href="#selected-work" className={secondary}>
                    Explore Our Work <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </a>
                </div>
                <p className="mt-6 text-[13px] font-semibold text-slate-500">
                  Clear product journeys <span aria-hidden="true" className="px-2 text-slate-300">/</span>
                  Responsive store design <span aria-hidden="true" className="px-2 text-slate-300">/</span>
                  Scope-led integrations
                </p>
              </div>
              <figure className="rounded-2xl border border-[#dce7f6] bg-white p-3 shadow-[0_20px_50px_-30px_rgba(11,21,40,0.3)] sm:p-4">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <Image
                    src={project.screenshot}
                    alt="Kabir Oil Mill online store homepage with product categories and oil products"
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                <figcaption className="flex items-center justify-between gap-3 px-1 pt-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">Verified E-Commerce Project</p>
                    <p className="mt-1 font-display text-base font-bold">Kabir Oil Mill</p>
                  </div>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[13px] font-bold text-[#0f6dff] hover:underline">
                    Visit store <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </a>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="bg-white py-10">
          <div className={container}>
            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-12">
              <div>
                <p className={eyebrow}>Common E-Commerce Problems</p>
                <h2 className={`${heading} mt-2 max-w-2xl`}>Is Your Online Store Making Shopping Harder Than It Should Be?</h2>
              </div>
              <p className="max-w-xl text-[15px] leading-relaxed text-slate-600 lg:justify-self-end">
                A useful store experience makes product information, navigation and the next step clear. We plan development around the parts of the shopping journey your customers need to use.
              </p>
            </div>
            <ol className="mt-8 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
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
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div className="flex flex-col justify-between rounded-2xl bg-[#0b1528] p-6 text-white sm:p-8">
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#8fb9ff]">E-Commerce Development Services</p>
                  <h2 className="mt-3 font-display text-[1.85rem] font-bold leading-[1.16] tracking-[-0.025em] sm:text-[2.4rem]">Everything Your Business Needs to Sell Online.</h2>
                  <p className="mt-4 text-[14px] leading-relaxed text-slate-300">
                    Choosing an e-commerce website development company is about more than visual design: the store&apos;s catalogue, platform, operations and required integrations all shape the plan. Final features depend on the scope agreed for your store.
                  </p>
                </div>
                <Link href="/contact" className="mt-6 inline-flex self-start items-center gap-2 text-sm font-bold text-white hover:underline">
                  Discuss your store <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
              <ol className="divide-y divide-slate-200 border-y border-slate-200 bg-white">
                {services.map((item, index) => (
                  <li key={item.title} className="grid gap-2 p-4 sm:grid-cols-[36px_0.9fr_1.2fr] sm:items-start sm:gap-4 sm:px-5">
                    <span className="font-display text-[12px] font-bold text-[#0f6dff]">{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="font-display text-[15px] font-bold">{item.title}</h3>
                    <p className="text-[13px] leading-relaxed text-slate-600">{item.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="bg-white py-10">
          <div className={`${container} grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}>
            <div>
              <p className={eyebrow}>A Better Shopping Experience</p>
              <h2 className={`${heading} mt-2`}>Create a Shopping Experience Customers Can Trust.</h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-600">
                Professional e-commerce development brings product presentation, navigation and checkout into one considered experience. The aim is to make the store clearer and more manageable—not to promise a particular sales outcome.
              </p>
            </div>
            <ul className="divide-y divide-slate-200 border-y border-slate-200">
              {benefits.map((item, index) => (
                <li key={item.title} className="grid gap-2 py-4 sm:grid-cols-[40px_0.8fr_1.2fr] sm:gap-4">
                  <span className="font-display text-[12px] font-bold text-[#0f6dff]">0{index + 1}</span>
                  <h3 className="font-display text-[16px] font-bold">{item.title}</h3>
                  <p className="text-[14px] leading-relaxed text-slate-600">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-[#f7f9fc] py-10">
          <div className={container}>
            <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
              <div>
                <p className={eyebrow}>Platforms & Technologies</p>
                <h2 className={`${heading} mt-2`}>The Right Technology for Your Online Store.</h2>
                <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-slate-600">
                  Shopify and headless commerce are among the approaches described in Webamazee&apos;s e-commerce service. The verified Kabir Oil Mill project uses WooCommerce. Platform and tool selection depends on catalogue size, operations, budget and business requirements; not every technology is included in every project.
                </p>
              </div>
              <div className="space-y-7">
                {platforms.map((group) => (
                  <div key={group.group}>
                    <h3 className="border-b border-slate-300 pb-2 font-display text-[15px] font-bold">{group.group}</h3>
                    <ul className="grid gap-x-6 sm:grid-cols-2">
                      {group.items.map((item) => (
                        <li key={item.name} className="border-b border-slate-200 py-3">
                          <p className="font-display text-[14px] font-bold">{item.name}</p>
                          <p className="mt-1 text-[13px] leading-relaxed text-slate-600">{item.detail}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-10">
          <div className={`${container} grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}>
            <div>
              <p className={eyebrow}>Our Six-Step Process</p>
              <h2 className={`${heading} mt-2`}>From Store Planning to Launch.</h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-600">
                Each stage is tied to agreed deliverables, decisions and review points for your e-commerce project.
              </p>
            </div>
            <ol className="divide-y divide-slate-200 border-y border-slate-200">
              {processSteps.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[42px_1fr] gap-4 py-5 sm:grid-cols-[42px_0.8fr_1fr]">
                  <span className="font-display text-[15px] font-bold text-[#0f6dff]">0{index + 1}</span>
                  <h3 className="font-display text-[17px] font-bold">{step.title}</h3>
                  <p className="col-start-2 text-[14px] leading-relaxed text-slate-600 sm:col-start-auto">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-[#f7f9fc] py-10">
          <div className={container}>
            <div className="max-w-3xl">
              <p className={eyebrow}>What's Included</p>
              <h2 className={`${heading} mt-2`}>Built Around Your Store&apos;s Requirements.</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
                The one-time package inclusions below match Webamazee&apos;s published E-Commerce Website pricing. Anything beyond those items is confirmed in the project scope.
              </p>
            </div>
            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
                <p className={eyebrow}>Published Package Inclusions</p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {packageInclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-slate-700">
                      <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6dff]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-l-2 border-[#0f6dff] pl-5 sm:pl-7">
                <p className={eyebrow}>Custom Quote or Separate Costs</p>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-600">
                  Custom development, ERP integrations, large catalogues, headless commerce and complex integrations are scoped and quoted separately. Shipping or inventory connections are not listed as standard package inclusions.
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-600">
                  Hosting, a domain, premium themes, paid plugins and third-party subscriptions are not specified as included in the published package; confirm any required services and costs in the project quote.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-10">
          <div className={container}>
            <div className="max-w-2xl">
              <p className={eyebrow}>Why Webamazee</p>
              <h2 className={`${heading} mt-2`}>More Than a Store. A Better Shopping Experience.</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
                E-commerce website development combines product, platform and customer-journey decisions. Webamazee&apos;s approach starts by making those requirements and the project scope clear.
              </p>
            </div>
            <div className="mt-8 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
              {whyWebamazee.map((item, index) => (
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
          <div className={container}>
            <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-14">
              <div>
                <p className={eyebrow}>Industries We Support</p>
                <h2 className={`${heading} mt-2`}>E-Commerce Solutions Across Different Industries.</h2>
              </div>
              <p className="max-w-2xl text-[15px] leading-relaxed text-slate-600 lg:justify-self-end">
                These are examples of product and catalogue considerations—not claims of industry-specific client projects. The right store structure depends on your products and customers.
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

        <section id="pricing" className="bg-white py-10">
          <div className={container}>
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
              <div>
                <p className={eyebrow}>One-Time Store Package</p>
                <h2 className={`${heading} mt-2`}>E-Commerce Website Development Pricing.</h2>
                <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-slate-600">
                  A starting price for the published E-Commerce Website package, with scope confirmed around your product range and requirements. International and India prices are separate market rates, not currency conversions.
                </p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[#f7f9fc]">
                <div className="border-b border-slate-200 bg-white px-6 py-5 sm:px-8">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0f6dff]">E-Commerce Website</p>
                  <p className="mt-1 text-[13px] text-slate-600">One-time project · starting prices by market</p>
                </div>
                <div className="grid sm:grid-cols-2">
                  <div className="border-b border-slate-200 bg-white p-6 sm:border-b-0 sm:border-r sm:p-8">
                    <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-slate-500">International</p>
                    <p className="mt-3 font-display text-4xl font-bold tracking-tight text-[#0b1528] sm:text-[2.75rem]">$1,499</p>
                    <p className="mt-2 text-[13px] font-semibold text-slate-600">One-time starting price</p>
                  </div>
                  <div className="bg-white p-6 sm:p-8">
                    <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-slate-500">India</p>
                    <p className="mt-3 font-display text-4xl font-bold tracking-tight text-[#0b1528] sm:text-[2.75rem]">₹79,999</p>
                    <p className="mt-2 text-[13px] font-semibold text-slate-600">One-time starting price</p>
                  </div>
                </div>
                <div className="border-t border-slate-200 px-6 py-6 sm:px-8">
                  <p className="text-[13px] font-bold text-[#0b1528]">Published package inclusions</p>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {packageInclusions.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[13px] leading-relaxed text-slate-600">
                        <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6dff]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-[13px] leading-relaxed text-slate-600">
                    Custom development, ERP integrations, large catalogues, headless commerce and complex integrations are quoted separately. Other third-party or platform costs should be confirmed in your quote.
                  </p>
                  <Link href="/contact" className={`${primary} mt-6`}>
                    Build My Store <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                  <p className="mt-3 text-[12px] leading-relaxed text-slate-500">On the contact form, select E-Commerce Development as your service.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="selected-work" className="scroll-mt-28 bg-[#f7f9fc] py-10">
          <div className={container}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className={eyebrow}>Selected Work</p>
                <h2 className={`${heading} mt-2`}>E-Commerce Experiences and Websites We&apos;ve Built.</h2>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-600">
                  A verified online store project, presented without sales, revenue, traffic or conversion claims.
                </p>
              </div>
              <Link href="/portfolio" className="inline-flex items-center gap-1 text-sm font-bold text-[#0f6dff] hover:underline">
                View all work <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
            <article className="mt-8 grid overflow-hidden rounded-2xl border border-slate-200 bg-white lg:grid-cols-[1.05fr_0.95fr]">
              <div className="bg-[#edf2f8] p-3 sm:p-4">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <Image
                    src={project.screenshot}
                    alt="Kabir Oil Mill e-commerce project screenshot showing its online product catalogue"
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">{project.categoryTag} · {project.industry}</p>
                <h3 className="mt-3 font-display text-2xl font-bold">{project.name}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
                  A WooCommerce online store for oil products, organised around product categories, product details, a shopping cart and checkout. The project provides a real example of Webamazee&apos;s e-commerce work, not a claim that every store uses the same platform.
                </p>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[13px] font-bold text-[#0f6dff] hover:underline">
                    View live store <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </a>
                  <Link href={project.caseStudyUrl} className="inline-flex items-center gap-1 text-[13px] font-bold text-slate-700 hover:text-[#0f6dff]">
                    Read case study <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="bg-white py-10">
          <div className={container}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className={eyebrow}>Client Testimonials</p>
                <h2 className={`${heading} mt-2`}>What Our Clients Say.</h2>
                <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-slate-600">
                  These are genuine reviews shared on Webamazee&apos;s Google Business Profile. They reflect Webamazee&apos;s wider work and are not presented as e-commerce-specific endorsements.
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
              <p className={eyebrow}>E-Commerce Development FAQ</p>
              <h2 className={`${heading} mt-2`}>Frequently Asked Questions About E-Commerce Development.</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
                Have a question about platforms, integrations, pricing or the project scope?
              </p>
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
            <ul className="mt-7 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-5">
              {relatedServices.map((service) => (
                <li key={service.title}>
                  <Link href={service.href} className="group flex h-full flex-col border-t border-slate-200 py-5 hover:text-[#0f6dff]">
                    <span className="flex items-center justify-between gap-3 font-display text-[16px] font-bold">
                      {service.title}
                      <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 text-[#0f6dff]" />
                    </span>
                    <span className="mt-2 text-[13px] leading-relaxed text-slate-600">{service.text}</span>
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
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#87b4ff]">Plan Your Online Store</p>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl">Ready to Build Your Online Store?</h2>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-300">
                  Tell us about your products, business goals and requirements. We&apos;ll help you plan an e-commerce solution that fits your business.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className={primary}>
                  Get an E-Commerce Quote <ArrowRight aria-hidden="true" className="h-4 w-4" />
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
