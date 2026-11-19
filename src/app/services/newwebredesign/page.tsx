import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Plus } from "lucide-react";
import { getService } from "@/lib/services";
import { testimonials, GOOGLE_REVIEWS_URL } from "@/lib/testimonials";
import { CALENDLY_URL, CASE_STUDY_SHOWCASES } from "@/components/newhome/newhome-data";
import { site } from "@/lib/site";

const title = "Website Redesign Services | Modern, SEO-Friendly Websites | Webamazee";
const description = "Upgrade your outdated website with Webamazee. Get modern website design, better user experience, mobile responsiveness and SEO-conscious website migration.";
export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical: `${site.url}/services/newwebredesign` },
  robots: { index: false, follow: false },
  openGraph: { title, description, url: `${site.url}/services/newwebredesign`, siteName: site.name, type: "website", images: [{ url: site.ogImage, width: 1200, height: 630, alt: "Website redesign by Webamazee" }] },
  twitter: { card: "summary_large_image", title, description, images: [site.ogImage] },
};

const container = "mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8";
const eyebrow = "text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]";
const heading = "font-display text-[1.85rem] font-bold leading-[1.16] tracking-[-0.025em] text-[#0b1528] sm:text-[2.4rem]";
const primary = "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-[#0f6dff] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#0b57d0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]";
const secondary = "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 text-[14px] font-bold text-[#0b1528] transition-colors hover:border-[#0f6dff] hover:text-[#0f6dff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]";

const problems = [
  { title: "Outdated Design", text: "Your website no longer reflects your brand." },
  { title: "Poor Mobile Experience", text: "Visitors struggle to browse on mobile devices." },
  { title: "Confusing Navigation", text: "Important information and services are difficult to find." },
  { title: "Slow Performance", text: "Website speed and usability need improvement." },
  { title: "Weak Enquiry Journey", text: "Visitors struggle to find or take the next step." },
];
const covers = ["Website design and visual refresh", "UX and conversion audit", "Navigation and information architecture", "Content and page structure review", "SEO-conscious migration planning", "Performance and usability improvements", "Responsive design", "Launch planning and testing"];
const benefits = [
  { title: "A professional brand image", text: "Present your business in a way that reflects where it is today." },
  { title: "Easier-to-find information", text: "Help visitors navigate services, content and important pages." },
  { title: "A better mobile experience", text: "Make your website easier to browse on smaller screens." },
  { title: "Clearer enquiry paths", text: "Help people understand the next step and how to get in touch." },
  { title: "More manageable content", text: "Review how content is organised and maintained as part of the project." },
  { title: "A marketing foundation", text: "Prepare a clearer destination for future search and campaign activity." },
];
const steps = [
  { title: "Deep Audit", text: "Review the current website, user experience, performance, content and SEO structure." },
  { title: "Strategy", text: "Define the new website structure, user journeys and design direction." },
  { title: "Design", text: "Create a visual experience aligned with the business and its audience." },
  { title: "Development", text: "Build the redesigned website using a technology stack suited to the project." },
  { title: "SEO-Conscious Migration", text: "Plan relevant redirects, preserve important URLs where appropriate and review technical SEO changes." },
  { title: "Launch & Measurement", text: "Test the website, prepare the launch and review agreed performance indicators." },
];
const deliverables = [
  { title: "UX & Conversion Audit", text: "Review the current experience and identify points of friction." },
  { title: "Modern Website Redesign", text: "Refresh the visual experience around your brand and audience." },
  { title: "SEO-Conscious Migration Planning", text: "Review relevant URLs, redirects and technical changes before launch." },
  { title: "Speed & Performance Improvements", text: "Review loading and usability priorities for your existing website." },
  { title: "Future-Friendly Website Rebuild", text: "Plan a maintainable structure and technology approach for your needs." },
  { title: "Support & Maintenance", text: "Ongoing help and care can be discussed as part of your agreed scope." },
];
const reasons = [
  { title: "Business-focused design", text: "Design decisions start with your business, audience and goals." },
  { title: "Careful migration planning", text: "Relevant redirects and URL reviews help reduce avoidable search disruption." },
  { title: "Performance-conscious development", text: "Performance and usability are considered alongside design." },
  { title: "Premium visual execution", text: "A refreshed presentation is shaped around your brand and content." },
  { title: "Clear project proposals", text: "The work and its scope are discussed before the project begins." },
  { title: "Remote collaboration", text: "A clear process supports working with your team remotely." },
];
const service = getService("website-redesign");
const faqItems = (service?.faqs ?? []).map((faq) => {
  if (faq.q === "Is there downtime during the redesign?") return { ...faq, a: "We can build the redesigned website while your existing site remains live and plan the migration to minimise disruption. Any downtime depends on the site and launch requirements." };
  if (faq.q === "What makes your redesigns different?") return { ...faq, a: "We combine considered design with SEO-conscious migration planning and a focus on clear conversion paths." };
  return faq;
});
const projectSlugs = ["americanlaobusinessassociation", "shinegoldtours"];
const projects = projectSlugs.map((slug) => CASE_STUDY_SHOWCASES.find((project) => project.slug === slug)).filter((project): project is (typeof CASE_STUDY_SHOWCASES)[number] => Boolean(project));
const projectDescriptions: Record<string, string> = {
  americanlaobusinessassociation: "A redesigned digital home for a US–Laos business association.",
  shinegoldtours: "A travel website redesign with clearer destination browsing and enquiry paths.",
};

export default function NewWebsiteRedesignPage() {
  return (
    <div className="min-h-screen bg-white pt-16 text-[#0b1528] selection:bg-[#0f6dff]/15 selection:text-[#0b57d0] sm:pt-20">
      <div id="main-content" className="overflow-x-clip">
        <section className="border-b border-slate-200/80 bg-[#f4f8ff] py-10"><div className={`${container} grid items-center gap-9 lg:grid-cols-2 lg:gap-12`}>
          <div><p className={eyebrow}>Website Redesign</p><h1 className="mt-4 max-w-2xl font-display text-[2.15rem] font-bold leading-[1.1] tracking-[-0.03em] sm:text-[2.8rem] lg:text-[3.2rem]">Give Your Website a Fresh Look. <span className="text-[#0f6dff]">A Better Experience.</span> A Stronger Purpose.</h1><p className="mt-5 max-w-xl text-[17px] leading-[1.65] text-slate-600">We help businesses refresh outdated websites with modern design, clearer navigation, better user experiences and carefully planned migration.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/contact" className={primary}>Get a Free Website Audit <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link><a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className={secondary}>Book a Consultation <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a></div><p className="mt-6 text-[13px] font-semibold text-slate-500">Thoughtful design <span aria-hidden="true" className="px-2 text-slate-300">/</span> Clearer journeys <span aria-hidden="true" className="px-2 text-slate-300">/</span> Planned migration</p></div>
          <figure className="overflow-hidden rounded-2xl border border-[#dce7f6] bg-white p-3 shadow-[0_20px_50px_-30px_rgba(11,21,40,0.3)] sm:p-4">
            <Image
              src="/images/portfolio/american-lao-business-association-live-homepage.webp"
              alt="Screenshot of the redesigned American-Lao Business Association website"
              width={1600}
              height={1000}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-auto w-full rounded-xl border border-slate-200"
            />
            <figcaption className="flex flex-wrap items-center justify-between gap-3 px-1 pt-4">
              <div><p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">Selected Redesign Project</p><p className="mt-1 font-display text-base font-bold">American-Lao Business Association</p></div>
              <Link href="/case-studies/americanlaobusinessassociation" className="inline-flex items-center gap-1 text-[13px] font-bold text-[#0f6dff] hover:underline">View case study <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link>
            </figcaption>
          </figure>
        </div></section>

        <section className="bg-white py-10"><div className={`${container} grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}><div><p className={eyebrow}>Problems We Solve</p><h2 className={`${heading} mt-2`}>Is Your Website Holding Your Business Back?</h2><p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-600">An unclear or outdated experience can make it harder for visitors to understand your business and get in touch.</p></div><div className="divide-y divide-slate-200 border-y border-slate-200">{problems.map((item,index) => <div key={item.title} className="grid grid-cols-[34px_1fr] gap-4 py-4 sm:grid-cols-[34px_0.8fr_1fr]"><span className="font-display text-[13px] font-bold text-[#0f6dff]">0{index+1}</span><h3 className="font-display text-[17px] font-bold">{item.title}</h3><p className="col-start-2 text-[14px] leading-relaxed text-slate-600 sm:col-start-auto">{item.text}</p></div>)}</div></div></section>

        <section className="bg-[#f7f9fc] py-10"><div className={container}><div className="grid gap-3 lg:grid-cols-2 lg:items-end"><div><p className={eyebrow}>What the Service Covers</p><h2 className={`${heading} mt-2 max-w-2xl`}>A Complete Website Refresh, Planned Around Your Goals.</h2></div><p className="max-w-md text-[15px] leading-relaxed text-slate-600 lg:justify-self-end">We review what works, identify what needs attention and agree a scope that fits your website and business priorities.</p></div><ul className="mt-8 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">{covers.map((item) => <li key={item} className="flex items-start gap-3 border-t border-slate-200 py-4 text-[14px] font-semibold leading-relaxed text-slate-700"><Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[#0f6dff]" />{item}</li>)}</ul></div></section>

        <section className="bg-white py-10"><div className={`${container} grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}><div><p className={eyebrow}>Why a Redesign Matters</p><h2 className={`${heading} mt-2`}>A Better Website Can Create a Better First Impression.</h2><p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-600">A redesign gives you the opportunity to revisit how your website presents your business and guides visitors.</p></div><div className="grid gap-x-8 sm:grid-cols-2">{benefits.map((item,index) => <div key={item.title} className="border-t border-slate-200 py-4"><span className="text-[12px] font-bold text-[#0f6dff]">0{index+1}</span><h3 className="mt-2 font-display text-[17px] font-bold">{item.title}</h3><p className="mt-1.5 text-[14px] leading-relaxed text-slate-600">{item.text}</p></div>)}</div></div></section>

        <section className="bg-[#f7f9fc] py-10"><div className={`${container} grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16`}><div><p className={eyebrow}>Our Six-Step Process</p><h2 className={`${heading} mt-2`}>A Clear Process From Audit to Launch.</h2><p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-600">A considered approach to the experience, the build and the move from your existing website.</p></div><ol className="divide-y divide-slate-200 border-y border-slate-200">{steps.map((step,index) => <li key={step.title} className="grid grid-cols-[42px_1fr] gap-4 py-5 sm:grid-cols-[42px_0.8fr_1fr]"><span className="font-display text-[15px] font-bold text-[#0f6dff]">0{index+1}</span><h3 className="font-display text-[17px] font-bold">{step.title}</h3><p className="col-start-2 text-[14px] leading-relaxed text-slate-600 sm:col-start-auto">{step.text}</p></li>)}</ol></div></section>

        <section className="bg-white py-10"><div className={container}><div className="max-w-3xl"><p className={eyebrow}>What&apos;s Included</p><h2 className={`${heading} mt-2`}>Everything Your Redesign Project Needs.</h2><p className="mt-3 text-[15px] leading-relaxed text-slate-600">The final deliverables and any ongoing support depend on your requirements and the scope agreed for your project.</p></div><div className="mt-8 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">{deliverables.map((item,index) => <div key={item.title} className="border-t border-slate-200 py-5"><span className="text-[12px] font-bold text-[#0f6dff]">0{index+1}</span><h3 className="mt-3 font-display text-lg font-bold">{item.title}</h3><p className="mt-2 text-[14px] leading-relaxed text-slate-600">{item.text}</p></div>)}</div></div></section>

        <section className="border-y border-slate-200/80 bg-[#f7f9fc] py-10"><div className={container}><div className="max-w-2xl"><p className={eyebrow}>Why Webamazee</p><h2 className={`${heading} mt-2`}>A Redesign Partner That Looks Beyond Appearance.</h2></div><div className="mt-8 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">{reasons.map((reason) => <div key={reason.title} className="border-t border-slate-200 py-4"><h3 className="font-display text-[17px] font-bold">{reason.title}</h3><p className="mt-2 text-[14px] leading-relaxed text-slate-600">{reason.text}</p></div>)}</div><p className="mt-4 max-w-4xl rounded-xl border border-[#d7e6fb] bg-white px-5 py-4 text-[13px] leading-relaxed text-slate-600">Migration planning can help reduce avoidable SEO disruption, but no migration can guarantee that rankings will remain unchanged.</p></div></section>

        <section className="bg-white py-10"><div className={`${container} grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16`}><div><p className={eyebrow}>Tools & Technologies</p><h2 className={`${heading} mt-2`}>The right tools for the work.</h2><p className="mt-3 max-w-lg text-[15px] leading-relaxed text-slate-600">We choose tools according to the website and its requirements; not every project uses every technology.</p></div><ul className="flex flex-wrap gap-2.5">{service?.techStack.map((tool) => <li key={tool} className="rounded-lg border border-slate-200 bg-[#f7f9fc] px-4 py-3 text-[14px] font-semibold text-slate-700">{tool}</li>)}</ul></div></section>

        <section className="bg-[#f7f9fc] py-10"><div className={container}><div className="flex flex-wrap items-end justify-between gap-4"><div><p className={eyebrow}>Selected Work</p><h2 className={`${heading} mt-2`}>See What Better Digital Experiences Look Like.</h2></div><Link href="/portfolio" className="inline-flex items-center gap-1 text-sm font-bold text-[#0f6dff] hover:underline">View all work <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link></div><div className="mt-8 grid gap-5 md:grid-cols-2">{projects.map((project) => {const isShine = project.slug === "shinegoldtours";return <article key={project.slug} className="overflow-hidden rounded-2xl border border-slate-200 bg-white"><div className="bg-[#edf2f8] p-3"><div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-slate-200 bg-white"><Image src={project.screenshot} alt={`${project.name} website screenshot`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-top" /></div></div><div className="p-5"><p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">{project.categoryTag}</p><h3 className="mt-2 font-display text-xl font-bold">{project.name}</h3><p className="mt-2 text-[14px] leading-relaxed text-slate-600">{projectDescriptions[project.slug]}</p><div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">{isShine ? <Link href={project.caseStudyUrl} aria-label={`View ${project.name} project case study`} className="inline-flex items-center gap-1 text-[13px] font-bold text-[#0f6dff] hover:underline">View Project <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link> : <><a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.name} project`} className="inline-flex items-center gap-1 text-[13px] font-bold text-[#0f6dff] hover:underline">View Project <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a><Link href={project.caseStudyUrl} className="inline-flex items-center gap-1 text-[13px] font-bold text-slate-600 hover:text-[#0f6dff]">Case study <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></>}</div>{isShine && <p className="mt-2 text-[12px] text-slate-500">Opens the project case study.</p>}</div></article>})}</div></div></section>

        <section className="bg-white py-10"><div className={container}><div className="flex flex-wrap items-end justify-between gap-4"><div><p className={eyebrow}>Client Reviews</p><h2 className={`${heading} mt-2`}>What Our Clients Say.</h2><p className="mt-2 text-[14px] text-slate-600">Reviews already shared on Webamazee&apos;s Google Business Profile.</p></div><a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[13px] font-bold text-[#0f6dff] hover:underline">Reviews from Google <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a></div><div className="mt-7 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">{testimonials.map((review) => <figure key={review.name} className="flex flex-col border-t border-slate-200 py-5"><blockquote className="flex-1 text-[14px] leading-[1.7] text-slate-700">&ldquo;{review.quote}&rdquo;</blockquote><figcaption className="mt-4 text-[13px] font-bold text-[#0b1528]">{review.name}<span className="mt-0.5 block text-[12px] font-medium text-slate-500">{review.role}</span></figcaption></figure>)}</div></div></section>

        <section className="bg-[#f7f9fc] py-10"><div className={`${container} grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16`}><div><p className={eyebrow}>Website Redesign FAQ</p><h2 className={`${heading} mt-2`}>Questions About Website Redesign?</h2><p className="mt-4 text-[15px] leading-relaxed text-slate-600">Have another question about your website?</p><Link href="/contact" className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-bold text-[#0f6dff] hover:underline">Talk to our team <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></div><div className="divide-y divide-slate-200 border-y border-slate-200">{faqItems.map((faq) => <details key={faq.q} className="group"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-display text-[16px] font-bold leading-snug text-[#0b1528] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0f6dff] [&::-webkit-details-marker]:hidden"><span>{faq.q}</span><Plus aria-hidden="true" className="h-5 w-5 shrink-0 text-[#0f6dff] transition-transform group-open:rotate-45 motion-reduce:transition-none" /></summary><p className="max-w-2xl pb-5 text-[14px] leading-[1.7] text-slate-600">{faq.a}</p></details>)}</div></div></section>

        <section className="bg-white py-10"><div className={container}><div><p className={eyebrow}>Related Services</p><h2 className={`${heading} mt-2`}>Explore complementary services.</h2></div><div className="mt-7 grid gap-x-6 sm:grid-cols-3">{(service?.related ?? []).map((slug) => {const related = getService(slug);return related ? <Link key={slug} href={`/services/${slug}`} className="group flex items-center justify-between gap-4 border-t border-slate-200 py-5 font-display text-[17px] font-bold hover:text-[#0f6dff]"><span>{related.name}</span><ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 text-[#0f6dff]" /></Link> : null;})}</div></div></section>

        <section className="bg-[#f7f9fc] py-10"><div className={container}><div className="grid gap-6 rounded-2xl bg-[#0b1528] p-6 text-white sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12"><div><p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#87b4ff]">Start Your Redesign</p><h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl">Ready to Give Your Website a Fresh Start?</h2><p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-300">Get a website review and discuss a redesign strategy based on your business goals.</p></div><div className="flex flex-wrap gap-3"><Link href="/contact" className={primary}>Get Your Free Website Audit <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link><a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-slate-500 px-6 text-sm font-bold text-white hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Book a Consultation <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a></div></div></div></section>
      </div>
    </div>
  );
}
