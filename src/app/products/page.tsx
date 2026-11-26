import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Layers3, Workflow, ListChecks, BellRing } from "lucide-react";
import { AcademyPreview, LogisticsPreview } from "@/components/product/product-previews";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, productSchema } from "@/lib/schema";
import { staticMetadata } from "@/lib/static-pages";
import { products, type Product } from "@/lib/products";
import { TryButton } from "./try-button";

export const metadata: Metadata = staticMetadata("products");

/** Booking link, same destination used site-wide (navbar, footer). */
const CALENDLY_URL = "https://calendly.com/webamazee0411/30min";

/** Structured data: the page breadcrumb plus each product's SoftwareApplication. */
const productLd = products.map((p) =>
  productSchema({
    name: p.name,
    description: p.description,
    slug: p.slug,
    category: p.industry,
    features: p.capabilities.map((c) => c.title),
  }),
);

const container = "mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8";
const eyebrow = "text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]";
const primary = "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#0f6dff] px-5 text-sm font-bold text-white transition-colors hover:bg-[#0b57d0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]";
const secondary = "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-bold text-[#0b1528] transition-colors hover:border-[#0f6dff] hover:text-[#0f6dff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]";

function ProductVisual({ product, compact = false }: { product: Product; compact?: boolean }) {
  const Preview = product.slug === "logistics-crm" ? LogisticsPreview : AcademyPreview;
  return (
    <div className="min-w-0 rounded-2xl border border-[#dce7f6] bg-[#edf4ff] p-3 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3 px-1">
        <div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#0f6dff]">{product.industry}</p><p className="mt-1 font-display text-lg font-bold text-[#0b1528]">{product.name}</p></div>
        <span className="rounded-full border border-[#d5e4fa] bg-white px-3 py-1 text-[10px] font-bold text-[#426287]">Illustration</span>
      </div>
      <Preview compact={compact} />
      <p className="mt-3 px-1 text-[11px] leading-relaxed text-slate-500">Illustrative preview with fictional demo data; not an actual product screenshot.</p>
    </div>
  );
}

function ProductShowcase({ product, index }: { product: Product; index: number }) {
  return (
    <article className="grid items-center gap-7 border-t border-slate-200 py-8 lg:grid-cols-2 lg:gap-12 lg:py-10">
      <div className={index % 2 ? "lg:order-2" : ""}>
        <p className={eyebrow}>{product.industry}</p>
        <h3 className="mt-2 font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl">{product.name}</h3>
        <p className="mt-4 max-w-xl text-[16px] leading-[1.7] text-slate-600">{product.description}</p>
        <ul className="mt-6 grid gap-x-5 gap-y-3 sm:grid-cols-2">
          {product.cardFeatures.map((feature) => <li key={feature} className="flex items-start gap-2.5 text-sm font-semibold leading-6 text-slate-700"><Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[#0f6dff]" />{feature}</li>)}
        </ul>
        <div className="mt-7 flex flex-wrap gap-3"><Link href={product.path} className={primary}>Explore {product.shortName} <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link><TryButton productName={product.name} /></div>
      </div>
      <div className={index % 2 ? "lg:order-1" : ""}><ProductVisual product={product} compact /></div>
    </article>
  );
}

const reasons = [
  { icon: Workflow, title: "Industry-focused workflows", text: "From shipment management to student admissions, each product is shaped around its industry's day-to-day work." },
  { icon: Layers3, title: "A central place to manage", text: "Bring customers, operations and financial records together within the product built for your business." },
  { icon: BellRing, title: "Practical automation", text: "Academy CRM supports automatic notifications for students, parents and staff." },
  { icon: ListChecks, title: "Built around operations", text: "Manage the details that matter to your team, from fleet and invoices to batches and attendance." },
];
const steps = [
  { title: "Explore the products", text: "Choose the CRM that fits your logistics business or academy and explore its capabilities." },
  { title: "Request a demo or trial", text: "Book a conversation or send a product enquiry through the Try for Free form." },
  { title: "Discuss your next steps", text: "Share your business requirements with the Webamazee team and discuss the right way forward." },
];

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ label: "Products" }]), ...productLd]} />
      <div className="min-h-screen bg-white pt-16 text-[#0b1528] sm:pt-20">
      <div id="main-content" className="overflow-x-clip">
        <section className="border-b border-slate-200 bg-[#f4f8ff] py-10">
          <div className={`${container} grid items-center gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12`}>
            <div><p className={eyebrow}>Webamazee Products</p><h1 className="mt-4 max-w-[620px] font-display text-[2.35rem] font-bold leading-[1.06] tracking-[-0.035em] sm:text-[3.3rem] xl:text-[4rem]">Business Software Built Around Your Workflow</h1><p className="mt-5 max-w-xl text-[16px] leading-[1.7] text-slate-600 sm:text-lg">Industry-focused business software for logistics companies and academies, designed to bring the details of daily operations together in one place.</p><div className="mt-7 flex flex-wrap gap-3"><a href="#featured-products" className={primary}>Explore Products <ArrowRight aria-hidden="true" className="h-4 w-4" /></a><a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className={secondary}>Book a Demo <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a></div></div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">{products.map((product) => <ProductVisual key={product.slug} product={product} compact />)}</div>
          </div>
        </section>
        <section id="featured-products" className="scroll-mt-28 bg-white py-10">
          <div className={container}><div className="mb-7 grid gap-3 md:grid-cols-2 md:items-end"><div><p className={eyebrow}>Featured Products</p><h2 className="mt-2 font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl">Purpose-built for the work you do.</h2></div><p className="max-w-lg text-[15px] leading-relaxed text-slate-600 md:justify-self-end">Explore software tailored to the workflows of logistics teams and education businesses.</p></div>{products.map((product, index) => <ProductShowcase key={product.slug} product={product} index={index} />)}</div>
        </section>
        <section className="bg-[#f7f9fc] py-10"><div className={container}><div className="max-w-2xl"><p className={eyebrow}>Why Webamazee Products</p><h2 className="mt-2 font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl">Made for real business workflows.</h2><p className="mt-3 text-[15px] leading-relaxed text-slate-600">The right tools bring your everyday work into focus.</p></div><div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{reasons.map(({ icon: Icon, title, text }) => <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5"><Icon aria-hidden="true" className="h-6 w-6 text-[#0f6dff]" /><h3 className="mt-5 font-display text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p></div>)}</div></div></section>
        <section className="bg-white py-10"><div className={container}><div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"><div><p className={eyebrow}>How It Works</p><h2 className="mt-2 max-w-md font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl">A straightforward place to start.</h2><p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-600">Find the right product, tell us about your business and take the next step with our team.</p></div><ol className="divide-y divide-slate-200 border-y border-slate-200">{steps.map((step, index) => <li key={step.title} className="grid grid-cols-[44px_1fr] gap-4 py-5"><span className="font-display text-lg font-bold text-[#0f6dff]">0{index + 1}</span><div><h3 className="font-display text-lg font-bold">{step.title}</h3><p className="mt-1 text-sm leading-relaxed text-slate-600">{step.text}</p></div></li>)}</ol></div></div></section>
        {/* Restored from the production /products page: cross-link to marketing services */}
        <section className="bg-white py-10"><div className={container}><div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center"><div><h2 className="font-display text-2xl font-bold tracking-[-0.025em] text-[#0b1528] sm:text-3xl">Looking for a marketing partner instead?</h2><p className="mt-2 max-w-xl text-[15px] leading-relaxed text-slate-600">Webamazee also offers full digital marketing and web development services.</p></div><Link href="/contact" className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0f6dff] px-6 text-sm font-bold text-white transition-colors hover:bg-[#0b57d0]">Talk to Our Team <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></div></div></div></section>

        <section className="bg-[#f7f9fc] py-10"><div className={container}><div className="grid gap-6 rounded-2xl bg-[#0b1528] p-6 text-white sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12"><div><p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#87b4ff]">Let&apos;s Talk</p><h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl">Ready to Simplify Your Business Operations?</h2><p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-300">Explore our products or book a conversation about your business needs.</p></div><div className="flex flex-wrap gap-3"><a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className={primary}>Book a Demo <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a><a href="#featured-products" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-500 px-5 text-sm font-bold text-white hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Explore Products <ArrowRight aria-hidden="true" className="h-4 w-4" /></a></div></div></div></section>
      </div>
      </div>
    </>
  );
}