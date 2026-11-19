import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CASE_STUDY_SHOWCASES } from "@/components/newhome/newhome-data";
import { site } from "@/lib/site";
import { AboutEffects } from "./about-effects";

const title = "About Webamazee | Digital Marketing & Web Development";
const description =
  "Meet Webamazee, an AI-powered digital marketing and web development company helping businesses build a stronger online presence.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${site.url}/newaboutus` },
  robots: { index: false, follow: false },
  openGraph: {
    title,
    description,
    url: `${site.url}/newaboutus`,
    siteName: site.name,
    type: "website",
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: "Webamazee — digital marketing and web development" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [site.ogImage],
  },
};

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

const projectDescriptions: Record<string, string> = {
  kabiroilmill: "Cold-pressed oil store.",
  wellingtontours: "A tour and transfer website.",
  shinegoldtours: "An India travel site redesign.",
  americanlaobusinessassociation: "US–Laos business network.",
};

const eyebrow = "text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]";
const heading = "font-display text-3xl font-bold tracking-[-0.025em] text-[#0b1528] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]";
const container = "mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8";

export default function NewAboutUsPage() {
  return (
    <div id="new-about-content" className="min-h-screen bg-white pt-16 text-[#0b1528] selection:bg-[#0f6dff]/15 selection:text-[#0b57d0] sm:pt-20">
      <AboutEffects />
      <div id="main-content" className="overflow-x-clip">
        <section className="border-b border-slate-200/80 bg-[#f4f8ff] py-10">
          <div className={container} data-about-reveal>
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <p className={eyebrow}>About Webamazee</p>
                <h1 className="mt-5 max-w-3xl font-display text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] text-[#0b1528] sm:text-[3rem] lg:text-[3.55rem]">
                  Building Digital Experiences That <span className="text-[#0f6dff]">Move Businesses Forward.</span>
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
                    <Image src="/images/portfolio/kabir-oil-mill-live-homepage.webp" alt="Kabir Oil Mill website project" fill priority sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover object-top" />
                  </div>
                  <div className="flex items-center justify-between gap-4 px-1 pb-1 pt-4">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">Selected Work</p>
                      <p className="mt-1 font-display text-base font-bold text-[#0b1528]">Kabir Oil Mill</p>
                    </div>
                    <Link href="/case-studies/kabiroilmill" className="inline-flex items-center gap-1 text-[13px] font-semibold text-slate-600 hover:text-[#0f6dff]">
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
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {CASE_STUDY_SHOWCASES.map((project) => (
                <article key={project.slug} data-about-tilt className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_10px_30px_-20px_rgba(11,21,40,0.18)] transition-transform duration-200 ease-out motion-reduce:transition-none">
                  <div className="bg-[#eef3f9] p-3">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-slate-200/90 bg-white">
                      <Image src={project.screenshot} alt={`${project.name} website screenshot`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="self-start rounded-md bg-[#eef5ff] px-2.5 py-1 text-[11px] font-bold text-[#0f6dff]">{project.categoryTag}</span>
                    <h3 className="mt-3 min-h-[47px] font-display text-[17px] font-bold leading-snug tracking-tight text-[#0b1528]">{project.name}</h3>
                    <p className="mt-1 truncate text-[13px] text-slate-500">{projectDescriptions[project.slug]}</p>
                    <Link href={project.caseStudyUrl} aria-label={`View ${project.name} project`} className="mt-auto inline-flex self-start items-center gap-1.5 pt-5 text-[13px] font-bold text-[#0f6dff] hover:underline">
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
            <div className="grid gap-6 rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <p className={eyebrow}>Meet the Founder</p>
                <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#0b1528]">Tilak R.</h2>
                <p className="mt-1 text-[14px] font-semibold text-slate-500">Founder, Webamazee</p>
              </div>
              <div className="border-t border-slate-200 pt-5 lg:col-span-8 lg:border-l lg:border-t-0 lg:py-1 lg:pl-10">
                <p className="max-w-2xl text-[16px] leading-relaxed text-slate-600">Tilak R. founded Webamazee with a focus on building websites, SEO strategies, AI-powered search optimization and digital growth solutions for businesses.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-10">
          <div className={container} data-about-reveal>
            <div className="grid items-center gap-8 rounded-3xl border border-[#1a2c4e] bg-[#0b1528] px-6 py-10 text-white sm:px-12 lg:grid-cols-12 lg:px-16">
              <div className="lg:col-span-8">
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#8ec5ff]">Start a Conversation</p>
                <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold tracking-[-0.025em] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">Let&apos;s Build Something That Moves Your Business Forward.</h2>
                <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-slate-300">Tell us what you&apos;re working on and let&apos;s find the right place to start.</p>
              </div>
              <div className="lg:col-span-4 lg:flex lg:justify-end">
                <Link href="/contact" className="inline-flex h-[52px] items-center justify-center gap-2.5 rounded-xl bg-[#0f6dff] px-7 text-[15px] font-semibold text-white transition-colors hover:bg-[#257bff]">
                  Get in Touch <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
