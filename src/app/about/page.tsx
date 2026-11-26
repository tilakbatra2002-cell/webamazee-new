import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles, Rocket, Handshake, ShieldCheck, Globe2, LineChart } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { staticMetadata } from "@/lib/static-pages";
import { projects } from "@/lib/portfolio";
import { AgencyEvidence } from "@/components/sections/agency-evidence";
import { CTABanner } from "@/components/layout/cta-banner";
import { BenefitsGrid } from "@/components/ui/sections-blocks";
import { AboutEffects } from "./about-effects";

export const metadata: Metadata = staticMetadata("about");

/**
 * Breadcrumb for the About page. `staticMetadata` is preserved as the single
 * source of metadata truth, exactly as on the pre-redesign page.
 */
const aboutSchema = breadcrumbSchema([{ label: "About" }]);

/** Original production story-card pillars, restored verbatim from HEAD. */
const storyPillars = [
  { title: "Intent-led", description: "Research starts with your customers and business goals." },
  { title: "Thoughtful design", description: "Clear, responsive journeys for real people." },
  { title: "Fit-for-purpose build", description: "Technology and scope shaped around the brief." },
  { title: "Measured progress", description: "Reporting tied to your agreed priorities." },
];

const approach = [
  {
    title: "Understand the business",
    description: "Start with your goals, customers and the challenges you want to solve.",
  },
  {
    title: "Build the right strategy",
    description: "Define a practical plan around your priorities and the people you want to reach.",
  },
  {
    title: "Execute with the right technology",
    description: "Bring the plan to life with thoughtful design, development and modern tools.",
  },
  {
    title: "Measure and improve",
    description: "Review what matters, learn from the work and make informed improvements.",
  },
];

const services = [
  {
    title: "Website Development",
    description: "Responsive websites built around your business and customers.",
    href: "/services/website-development",
  },
  {
    title: "Search Engine Optimization",
    description: "Search foundations and content that help people find you.",
    href: "/services/seo-services",
  },
  {
    title: "AI SEO",
    description: "Clear, structured content for search and AI-powered discovery.",
    href: "/services/ai-seo",
  },
  {
    title: "Digital Marketing",
    description: "Connected digital strategies shaped around your goals.",
    href: "/services",
  },
  {
    title: "Social Media Marketing",
    description: "A consistent presence across the channels your audience uses.",
    href: "/services/social-media-marketing",
  },
];

const reasons = [
  {
    title: "Practical, business-focused solutions",
    description: "The work starts with what your business needs, not a one-size-fits-all checklist.",
  },
  {
    title: "Transparent communication",
    description: "Clear conversations about priorities, scope and the next steps.",
  },
  {
    title: "Modern technology, thoughtfully used",
    description: "We use modern tools and AI-assisted workflows alongside human judgement.",
  },
  {
    title: "A focus on long-term growth",
    description: "Build useful foundations, then keep learning and improving over time.",
  },
];

const values = [
  { icon: Rocket, title: "Results over hype", desc: "We measure success in rankings, revenue and real growth — not vanity metrics." },
  { icon: ShieldCheck, title: "White-hat always", desc: "Ethical, Google-safe tactics that protect your business for the long term." },
  { icon: Handshake, title: "Partnership mindset", desc: "We act like part of your team, invested in your outcomes." },
  { icon: LineChart, title: "Data-driven", desc: "Every decision is backed by analytics, testing and evidence." },
  { icon: Globe2, title: "Global perspective", desc: "We work across markets with local context and a global perspective." },
  { icon: Sparkles, title: "AI-powered", desc: "We combine AI with human expertise to move faster and smarter." },
];

const eyebrow = "text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]";
const heading = "font-display text-3xl font-bold tracking-[-0.025em] text-[#0b1528] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]";
const container = "mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8";

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutSchema} />
    <div id="about-content" className="min-h-screen bg-white pt-16 text-[#0b1528] selection:bg-[#0f6dff]/15 selection:text-[#0b57d0] sm:pt-20">
      <AboutEffects />
      <div id="main-content" className="overflow-x-clip">
        <section className="border-b border-slate-200/80 bg-[#f4f8ff] py-10">
          <div className={container} data-about-reveal>
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <p className={eyebrow}>About Webamazee</p>
                <h1 className="mt-5 max-w-3xl font-display text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] text-[#0b1528] sm:text-[3rem] lg:text-[3.55rem]">
                  We&apos;re the growth partner behind <span className="text-[#0f6dff]">your success</span>
                </h1>
                <p className="mt-5 max-w-2xl text-[17px] leading-[1.65] text-slate-600 sm:text-[18.5px]">
                  Webamazee brings websites, search and digital marketing together to help businesses build a stronger presence online.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/contact" className="inline-flex h-[52px] items-center justify-center gap-2.5 rounded-xl bg-[#0f6dff] px-7 text-[15px] font-semibold text-white shadow-[0_10px_26px_-6px_rgba(15,109,255,0.4)] transition-colors hover:bg-[#0b57d0]">
                    Let&apos;s Work Together <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a href="#our-work" className="inline-flex h-[52px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 text-[15px] font-semibold text-[#0b1528] transition-colors hover:border-[#0f6dff] hover:text-[#0f6dff]">
                    Explore Our Work
                  </a>
                </div>
              </div>
              <div className="relative isolate lg:col-span-5">
                <div aria-hidden className="absolute inset-0 -z-10 translate-x-2 translate-y-2 rounded-2xl border border-[#0f6dff]/15 bg-[#e8f1ff]" />
                <div data-about-tilt className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-3 shadow-[0_20px_50px_-25px_rgba(11,21,40,0.25)] transition-transform duration-200 ease-out motion-reduce:transition-none sm:p-4">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-100">
                    <Image src={projects[0].image} alt={`${projects[0].title} website project`} fill priority sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover object-top" />
                  </div>
                  <div className="flex items-center justify-between gap-4 px-1 pb-1 pt-4">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">Selected Work</p>
                      <p className="mt-1 font-display text-base font-bold text-[#0b1528]">{projects[0].title}</p>
                    </div>
                    <Link href={`/work/${projects[0].slug}`} className="inline-flex items-center gap-1 text-[13px] font-semibold text-slate-600 hover:text-[#0f6dff]">
                      View project <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-10" id="who-we-are">
          <div className={`${container} grid gap-6 lg:grid-cols-12 lg:gap-12`} data-about-reveal>
            <div className="lg:col-span-5">
              <p className={eyebrow}>Who We Are</p>
              <h2 className={`${heading} mt-2.5`}>Digital work with a clear purpose.</h2>
            </div>
            <div className="space-y-4 text-[16px] leading-relaxed text-slate-600 lg:col-span-7 lg:pt-1">
              <p>Webamazee is an AI-powered digital marketing and web development company. We help businesses create useful websites, improve search visibility and communicate clearly with the people they want to reach.</p>
              <p>From website development and SEO to AI SEO and digital marketing, we bring the pieces together around your goals. Technology supports the work; thoughtful strategy and human judgement guide it.</p>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200/80 bg-[#f7f9fc] py-10" id="our-approach">
          <div className={container} data-about-reveal>
            <div className="max-w-2xl">
              <p className={eyebrow}>Our Approach</p>
              <h2 className={`${heading} mt-2.5`}>A practical path from idea to improvement.</h2>
            </div>
            <ol className="mt-8 grid gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
              {approach.map((step, index) => (
                <li key={step.title} className="border-t-2 border-[#0f6dff]/25 pt-4">
                  <span className="font-display text-sm font-bold text-[#0f6dff]">0{index + 1}</span>
                  <h3 className="mt-2 font-display text-lg font-bold leading-snug text-[#0b1528]">{step.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-slate-600">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-white py-10" id="what-we-do">
          <div className={`${container} grid gap-8 lg:grid-cols-12 lg:gap-12`} data-about-reveal>
            <div className="lg:col-span-4">
              <p className={eyebrow}>What We Do</p>
              <h2 className={`${heading} mt-2.5`}>Connected services for a stronger presence.</h2>
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-slate-600">The right mix of capabilities depends on where your business is today and where you want to go.</p>
            </div>
            <div className="divide-y divide-slate-200 border-y border-slate-200 lg:col-span-8">
              {services.map((service) => (
                <Link key={service.title} href={service.href} className="group flex items-center justify-between gap-4 py-5 transition-colors hover:text-[#0f6dff]">
                  <div>
                    <h3 className="font-display text-lg font-bold tracking-tight">{service.title}</h3>
                    <p className="mt-1 text-[14px] leading-relaxed text-slate-600">{service.description}</p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-[#0f6dff] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200/80 bg-[#f7f9fc] py-10" id="our-work">
          <div className={container} data-about-reveal>
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className={eyebrow}>Our Work</p>
                <h2 className={`${heading} mt-2.5`}>Real projects, thoughtfully built.</h2>
              </div>
              <Link href="/portfolio" className="inline-flex shrink-0 items-center gap-1.5 text-[13.5px] font-bold text-[#0f6dff] hover:underline">
                View All Projects <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <article key={project.slug} data-about-tilt className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_10px_30px_-20px_rgba(11,21,40,0.18)] transition-transform duration-200 ease-out motion-reduce:transition-none">
                  <div className="bg-[#eef3f9] p-3">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-slate-200/90 bg-white">
                      <Image src={project.image} alt={`${project.title} website screenshot`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="self-start rounded-md bg-[#eef5ff] px-2.5 py-1 text-[11px] font-bold text-[#0f6dff]">{project.category}</span>
                    <h3 className="mt-3 min-h-[47px] font-display text-[17px] font-bold leading-snug tracking-tight text-[#0b1528]">{project.title}</h3>
                    <p className="mt-1 line-clamp-2 text-[13px] text-slate-500">{project.summary}</p>
                    <Link href={`/work/${project.slug}`} aria-label={`View ${project.title} project`} className="mt-auto inline-flex self-start items-center gap-1.5 pt-5 text-[13px] font-bold text-[#0f6dff] hover:underline">
                      View Project <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-10" id="why-webamazee">
          <div className={`${container} grid gap-8 lg:grid-cols-12 lg:gap-12`} data-about-reveal>
            <div className="lg:col-span-5">
              <p className={eyebrow}>Why Webamazee</p>
              <h2 className={`${heading} mt-2.5`}>Good work begins with a better partnership.</h2>
              <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-slate-600">We believe digital work should be understandable, useful and connected to the business behind it.</p>
            </div>
            <div className="divide-y divide-slate-200 border-y border-slate-200 lg:col-span-7">
              {reasons.map((reason) => (
                <div key={reason.title} className="py-5">
                  <h3 className="font-display text-lg font-bold tracking-tight text-[#0b1528]">{reason.title}</h3>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-slate-600">{reason.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200/80 bg-[#f7f9fc] py-10" id="founder">
          <div className={container} data-about-reveal>
            <div className="grid overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_16px_45px_-28px_rgba(11,21,40,0.18)] lg:grid-cols-12">
              <div className="flex min-h-[260px] flex-col justify-between border-b border-slate-200/80 bg-[#eef5ff] p-7 sm:p-10 lg:col-span-5 lg:min-h-[350px] lg:border-b-0 lg:border-r">
                <p className={eyebrow}>Founder Spotlight</p>
                <div className="py-8">
                  <h2 className="font-display text-[2.75rem] font-bold leading-none tracking-[-0.035em] text-[#0b1528] sm:text-[3.75rem]">
                    Tilak <span className="text-[#0f6dff]">R.</span>
                  </h2>
                  <p className="mt-4 text-[15px] font-semibold text-slate-600">Founder, Webamazee</p>
                </div>
                <p className="border-t border-[#0f6dff]/15 pt-4 text-[13px] font-semibold text-slate-500">Thoughtful digital work, grounded in business.</p>
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10 lg:col-span-7 lg:px-12 lg:py-10">
                <p className={eyebrow}>The vision behind Webamazee</p>
                <h3 className="mt-3 max-w-xl font-display text-2xl font-bold leading-tight tracking-[-0.025em] text-[#0b1528] sm:text-3xl">
                  Digital solutions should serve the business behind them.
                </h3>
                <p className="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-slate-600">
                  Tilak R. built Webamazee to help businesses grow digitally by bringing web development, SEO and digital marketing together with modern AI-assisted technology. The focus is on practical solutions to real business challenges.
                </p>
                <blockquote className="mt-7 border-l-2 border-[#0f6dff] pl-5">
                  <p className="max-w-2xl font-display text-[17px] font-semibold leading-relaxed text-[#0b1528] sm:text-lg">
                    &ldquo;I want our work to make digital challenges feel manageable, and give businesses a clear way forward.&rdquo;
                  </p>
                  <footer className="mt-3 text-[13px] font-semibold text-slate-500">&mdash; Tilak R.</footer>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Preserved from the production /about page: our story */}
        <section className="border-y border-slate-200/80 bg-[#f7f9fc] py-10" id="our-story">
          <div className={`${container} grid items-center gap-8 lg:grid-cols-12 lg:gap-12`} data-about-reveal>
            <div className="lg:col-span-7">
              <p className={eyebrow}>Our Story</p>
              <h2 className={`${heading} mt-2.5`}>
                Built by marketers who believe in{" "}
                <span className="text-[#0f6dff]">measurable growth</span>
              </h2>
              <div className="mt-5 space-y-4 text-[15.5px] leading-relaxed text-slate-600">
                <p>
                  Webamazee was founded on a simple conviction: businesses deserve a digital partner that blends premium
                  design, world-class engineering and cutting-edge AI — without the hype, jargon or empty promises.
                </p>
                <p>
                  Today we help business owners, startups and SMEs build high-performing websites, improve their search
                  visibility and grow sustainably. Our AI Marketing Framework sits at the heart of everything we do.
                </p>
                <p>
                  Webamazee was founded by Tilak R., who focuses on building high-performance websites, SEO strategies,
                  AI-powered search optimization and digital growth solutions for businesses.
                </p>
                <p>
                  We stay deliberately focused. No bloated agency overheads, no obscure reports, no shady tactics. Just a
                  clear strategy, expert execution and results you can see in the numbers.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_10px_30px_-20px_rgba(11,21,40,0.18)]">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">The AI Marketing Framework</p>
                <p className="mt-3 font-display text-xl font-bold leading-snug text-[#0b1528]">
                  Data → AI Optimisation → Content → Rank &amp; Scale
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {storyPillars.map((item) => (
                    <div key={item.title} className="rounded-xl border border-slate-200 bg-[#f7f9fc] p-4">
                      <p className="font-display text-[15px] font-bold text-[#0b1528]">{item.title}</p>
                      <p className="mt-1 text-[13px] leading-relaxed text-slate-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Preserved from the production /about page: agency proof */}
        <AgencyEvidence />

        {/* Preserved from the production /about page: our values */}
        <section className="bg-white py-10" id="our-values">
          <div className={container} data-about-reveal>
            <div className="max-w-2xl">
              <p className={eyebrow}>Our Values</p>
              <h2 className={`${heading} mt-2.5`}>
                The principles behind <span className="text-[#0f6dff]">every engagement</span>
              </h2>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((v) => (
                <div key={v.title} className="group h-full rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_10px_30px_-20px_rgba(11,21,40,0.18)] transition-transform duration-200 ease-out motion-reduce:transition-none">
                  <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-[#eef5ff] text-[#0f6dff]">
                    <v.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-[#0b1528]">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Preserved from the production /about page: why choose us */}
        <div className="bg-[#f7f9fc]">
          <div className={container}>
            <div className="pt-10">
              <p className={eyebrow}>Why Choose Webamazee</p>
              <h2 className={`${heading} mt-2.5`}>
                A partner built for <span className="text-[#0f6dff]">growth</span>
              </h2>
            </div>
          </div>
        </div>
        <BenefitsGrid
          bg="bg-[#f7f9fc]"
          benefits={[
            { title: "Premium quality", desc: "Design and engineering that rivals the best agencies anywhere." },
            { title: "AI advantage", desc: "Proprietary AI workflows that accelerate results." },
            { title: "Transparent pricing", desc: "Clear proposals with no hidden fees or surprises." },
            { title: "Full accountability", desc: "Live dashboards and honest monthly reporting." },
          ]}
        />

        <CTABanner
          title="Let's build your growth story"
          subtitle="Whether you're launching, redesigning or scaling — we'd love to hear about your business."
        />
      </div>
    </div>
    </>
  );
}