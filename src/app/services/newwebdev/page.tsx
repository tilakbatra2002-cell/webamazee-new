import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Plus } from "lucide-react";
import { getService } from "@/lib/services";
import { CALENDLY_URL, CASE_STUDY_SHOWCASES } from "@/components/newhome/newhome-data";
import { site } from "@/lib/site";

const title = "Website Development for Your Business | Webamazee";
const description = "Explore custom website development, responsive design, e-commerce and landing pages built around your business goals by Webamazee.";
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${site.url}/services/newwebdev` },
  robots: { index: false, follow: false },
  openGraph: { title, description, url: `${site.url}/services/newwebdev`, siteName: site.name, type: "website", images: [{ url: site.ogImage, width: 1200, height: 630, alt: "Website development by Webamazee" }] },
  twitter: { card: "summary_large_image", title, description, images: [site.ogImage] },
};

const container = "mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8";
const eyebrow = "text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]";
const heading = "font-display text-[1.85rem] font-bold leading-[1.16] tracking-[-0.025em] text-[#0b1528] sm:text-[2.4rem]";
const primary = "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-[#0f6dff] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#0b57d0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]";
const secondary = "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 text-[14px] font-bold text-[#0b1528] transition-colors hover:border-[#0f6dff] hover:text-[#0f6dff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]";

const solutions = [
  { title: "Business Websites", description: "A clear home for your services, brand and customer enquiries." },
  { title: "E-commerce Websites", description: "Online stores organised around product discovery and the shopping journey." },
  { title: "Custom Website Development", description: "A website shaped around your brand, audience and project goals." },
  { title: "Responsive Website Development", description: "Layouts designed to work across phones, tablets and desktops." },
  { title: "Landing Pages", description: "Focused pages that connect campaigns and offers to a clear next step." },
];
const benefits = [
  { title: "Build trust and credibility", text: "Give visitors a considered, professional introduction to your business." },
  { title: "Be accessible across devices", text: "Help people explore your website whether they are on a phone, tablet or desktop." },
  { title: "Present what you offer", text: "Make your services, products and useful information easy to find." },
  { title: "Make enquiries easier", text: "Give interested visitors clear ways to take the next step." },
  { title: "Support digital marketing", text: "Create a destination for your search, content and campaign activity." },
];
const steps = [
  { title: "Discovery & Planning", text: "We learn about your business, goals, audience and project requirements." },
  { title: "UI/UX Design", text: "We plan the structure, user experience and visual direction around your needs." },
  { title: "Development & Testing", text: "We build the website and review its functionality and responsive layouts." },
  { title: "Launch & Handover", text: "We prepare the website for launch and hand over the completed project." },
];
const qualities = [
  { title: "Responsive design", text: "Layouts designed and reviewed for common screen sizes." },
  { title: "Clear navigation & UX", text: "An organised structure that helps visitors find what they need." },
  { title: "Performance-conscious development", text: "Page speed and Core Web Vitals considered during the build." },
  { title: "SEO-friendly structure", text: "Thoughtful page hierarchy and search foundations built into the project." },
  { title: "Conversion-focused layouts", text: "Clear content and next steps aligned with your business goals." },
  { title: "Room to evolve", text: "A considered architecture that can support your website as needs change." },
];
const projectSlugs = ["kabiroilmill", "wellingtontours", "americanlaobusinessassociation"];
const descriptions: Record<string, string> = {
  kabiroilmill: "An e-commerce storefront for an oil products business.",
  wellingtontours: "A travel website presenting tours and enquiry options.",
  americanlaobusinessassociation: "A website redesign for a US–Laos business association.",
};
const projects = projectSlugs.map((slug) => CASE_STUDY_SHOWCASES.find((project) => project.slug === slug)).filter((project): project is (typeof CASE_STUDY_SHOWCASES)[number] => Boolean(project));
const faqItems = getService("website-development")?.faqs ?? [];

export default function NewWebDevelopmentPage() {
  return (
    <div className="min-h-screen bg-white pt-16 text-[#0b1528] selection:bg-[#0f6dff]/15 selection:text-[#0b57d0] sm:pt-20">
      <div id="main-content" className="overflow-x-clip">
        <section className="border-b border-slate-200/80 bg-[#f4f8ff] py-10">
          <div className={`${container} grid items-center gap-9 lg:grid-cols-2 lg:gap-12`}>
            <div>
              <p className={eyebrow}>Website Development</p>
              <h1 className="mt-4 max-w-xl font-display text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] sm:text-[3rem] lg:text-[3.55rem]">Websites Built to <span className="text-[#0f6dff]">Grow Your Business.</span></h1>
              <p className="mt-5 max-w-xl text-[17px] leading-[1.65] text-slate-600 sm:text-[18px]">We design and develop websites that help businesses build credibility, present their services clearly and make it easier for customers to get in touch.</p>
              <div className="mt-8 flex flex-wrap gap-3"><Link href="/contact" className={primary}>Get a Website Quote <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link><a href="#selected-projects" className={secondary}>View Our Work <ArrowRight aria-hidden="true" className="h-4 w-4" /></a></div>
              <p className="mt-6 text-[13px] font-semibold text-slate-500">Thoughtful design <span aria-hidden="true" className="px-2 text-slate-300">/</span> Responsive development <span aria-hidden="true" className="px-2 text-slate-300">/</span> Clear enquiry paths</p>
            </div>
            <figure className="rounded-2xl border border-[#dce7f6] bg-white p-3 shadow-[0_20px_50px_-30px_rgba(11,21,40,0.3)] sm:p-4">
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white"><div aria-hidden="true" className="flex h-8 items-center gap-1.5 border-b border-slate-200 bg-[#f8fafc] px-3"><span className="h-2 w-2 rounded-full bg-slate-300" /><span className="h-2 w-2 rounded-full bg-slate-300" /><span className="h-2 w-2 rounded-full bg-slate-300" /><span className="ml-3 h-3 w-24 rounded bg-slate-200" /></div><div className="relative aspect-[16/10] bg-slate-100"><Image src="/images/portfolio/wellington-tours-live-homepage.webp" alt="Screenshot of the Wellington Tours website project" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-top" /></div></div>
              <figcaption className="flex items-center justify-between gap-3 px-1 pt-4"><div><p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">Selected Website Project</p><p className="mt-1 font-display text-base font-bold">Wellington Tours</p></div><Link href="/case-studies/wellingtontours" className="inline-flex items-center gap-1 text-[13px] font-bold text-[#0f6dff] hover:underline">View case study <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link></figcaption>
            </figure>
          </div>
        </section>

        <section className="bg-white py-10"><div className={container}>
          <div className="grid gap-3 lg:grid-cols-2 lg:items-end"><div><p className={eyebrow}>What We Build</p><h2 className={`${heading} mt-2 max-w-xl`}>Website Solutions for Every Business Need.</h2></div><p className="max-w-md text-[15px] leading-relaxed text-slate-600 lg:justify-self-end">From a first business website to an online store, we plan the experience around your audience and your goals.</p></div>
          <div className="mt-8 grid overflow-hidden rounded-2xl border border-slate-200 lg:grid-cols-12">
            <div className="flex flex-col justify-between bg-[#0b1528] p-6 text-white sm:p-8 lg:col-span-4"><div><p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8fb9ff]">Built around your business</p><h3 className="mt-4 font-display text-2xl font-bold tracking-tight">A clear foundation for your next step.</h3><p className="mt-3 text-[14px] leading-relaxed text-slate-300">Every project starts with an understanding of what your business needs and how people will use your website.</p></div><Link href="/contact" className="mt-6 inline-flex self-start items-center gap-2 text-sm font-bold text-white hover:underline">Discuss your project <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link></div>
            <div className="divide-y divide-slate-200 bg-white lg:col-span-8">{solutions.map((item,index) => <div key={item.title} className="grid gap-2 p-5 sm:grid-cols-[1.1fr_1.35fr_auto] sm:items-center sm:gap-5 sm:px-7"><div className="flex items-center gap-3"><span className="font-display text-[12px] font-bold text-[#0f6dff]">0{index+1}</span><h3 className="font-display text-[16px] font-bold">{item.title}</h3></div><p className="text-[13px] leading-relaxed text-slate-600">{item.description}</p><Link href="/contact" aria-label={`Enquire about ${item.title}`} className="inline-flex items-center gap-1 text-[13px] font-bold text-[#0f6dff] hover:underline">Enquire <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" /></Link></div>)}</div>
          </div>
        </div></section>

        <section className="bg-[#f7f9fc] py-10"><div className={`${container} grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}><div><p className={eyebrow}>Why It Matters</p><h2 className={`${heading} mt-2`}>Your Website Is More Than Just an Online Presence.</h2><p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-600">It is where people can understand what you do, find useful information and decide how to connect with you.</p></div><div className="grid gap-x-8 sm:grid-cols-2">{benefits.map((item,index) => <div key={item.title} className="border-t border-slate-200 py-4"><span className="text-[12px] font-bold text-[#0f6dff]">0{index+1}</span><h3 className="mt-2 font-display text-[17px] font-bold">{item.title}</h3><p className="mt-1.5 text-[14px] leading-relaxed text-slate-600">{item.text}</p></div>)}</div></div></section>

        <section className="bg-white py-10"><div className={container}><div className="max-w-2xl"><p className={eyebrow}>Our Process</p><h2 className={`${heading} mt-2`}>From Idea to Launch, Made Simple.</h2><p className="mt-3 text-[15px] leading-relaxed text-slate-600">A straightforward process, shaped around your project and the people it needs to reach.</p></div><ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{steps.map((step,index) => <li key={step.title} className="border-t-2 border-[#0f6dff] pt-4"><span className="font-display text-[13px] font-bold text-[#0f6dff]">0{index+1}</span><h3 className="mt-3 font-display text-lg font-bold">{step.title}</h3><p className="mt-2 text-[14px] leading-relaxed text-slate-600">{step.text}</p></li>)}</ol></div></section>

        <section className="border-y border-slate-200/80 bg-[#f7f9fc] py-10"><div className={`${container} grid items-center gap-8 lg:grid-cols-2 lg:gap-14`}><div><p className={eyebrow}>What Makes Our Websites Different</p><h2 className={`${heading} mt-2 max-w-xl`}>Built With Your Business Goals in Mind.</h2><p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-600">We bring design and development together to create a website that is considered from the first impression through to the next action.</p><div className="mt-6 grid gap-x-6 sm:grid-cols-2">{qualities.map((quality) => <div key={quality.title} className="flex gap-3 border-t border-slate-200 py-4"><Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[#0f6dff]" /><div><h3 className="font-display text-[15px] font-bold">{quality.title}</h3><p className="mt-1 text-[13px] leading-relaxed text-slate-600">{quality.text}</p></div></div>)}</div></div><figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 sm:p-4"><div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-100"><Image src="/images/portfolio/american-lao-business-association-live-homepage.webp" alt="Screenshot of the American-Lao Business Association website project" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-top" /></div><figcaption className="px-1 pt-3 text-[12px] font-semibold text-slate-600">American-Lao Business Association · Website redesign</figcaption></figure></div></section>

        <section id="selected-projects" className="scroll-mt-28 bg-white py-10"><div className={container}><div className="flex flex-wrap items-end justify-between gap-4"><div><p className={eyebrow}>Selected Website Projects</p><h2 className={`${heading} mt-2`}>Websites We&apos;ve Helped Bring to Life.</h2></div><Link href="/portfolio" className="inline-flex items-center gap-1 text-sm font-bold text-[#0f6dff] hover:underline">View all work <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link></div><div className="mt-8 grid gap-5 md:grid-cols-3">{projects.map((project) => <article key={project.slug} className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white"><div className="bg-[#f3f6fa] p-3"><div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-slate-200 bg-white"><Image src={project.screenshot} alt={`${project.name} website screenshot`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover object-top" /></div></div><div className="flex flex-1 flex-col p-5"><p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">{project.categoryTag}</p><h3 className="mt-2 font-display text-lg font-bold">{project.name}</h3><p className="mt-2 text-[14px] leading-relaxed text-slate-600">{descriptions[project.slug]}</p><div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-5"><a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.name} project`} className="inline-flex items-center gap-1 text-[13px] font-bold text-[#0f6dff] hover:underline">View Project <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a><Link href={project.caseStudyUrl} className="inline-flex items-center gap-1 text-[13px] font-bold text-slate-600 hover:text-[#0f6dff]">Case study <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></div></div></article>)}</div></div></section>

        <section className="bg-[#f7f9fc] py-10"><div className={`${container} grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16`}><div><p className={eyebrow}>Website Development FAQ</p><h2 className={`${heading} mt-2`}>Frequently Asked Questions.</h2><p className="mt-4 text-[15px] leading-relaxed text-slate-600">Have another question about your website project?</p><Link href="/contact" className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-bold text-[#0f6dff] hover:underline">Talk to our team <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></div><div className="divide-y divide-slate-200 border-y border-slate-200">{faqItems.map((faq) => <details key={faq.q} className="group"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-display text-[16px] font-bold leading-snug text-[#0b1528] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0f6dff] [&::-webkit-details-marker]:hidden"><span>{faq.q}</span><Plus aria-hidden="true" className="h-5 w-5 shrink-0 text-[#0f6dff] transition-transform group-open:rotate-45 motion-reduce:transition-none" /></summary><p className="max-w-2xl pb-5 text-[14px] leading-[1.7] text-slate-600">{faq.a}</p></details>)}</div></div></section>

        <section className="bg-white py-10"><div className={container}><div className="grid gap-6 rounded-2xl bg-[#0b1528] p-6 text-white sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12"><div><p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#87b4ff]">Start Your Website Project</p><h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl">Ready to Build Your Next Website?</h2><p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-300">Let&apos;s discuss your business goals and find the right website solution for your needs.</p></div><div className="flex flex-wrap gap-3"><Link href="/contact" className={primary}>Get a Website Quote <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link><a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-slate-500 px-6 text-sm font-bold text-white hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Book a Free Consultation <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a></div></div></div></section>
      </div>
    </div>
  );
}
