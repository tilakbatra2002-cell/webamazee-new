import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CALENDLY_URL, CASE_STUDY_SHOWCASES } from "@/components/newhome/newhome-data";
import { site } from "@/lib/site";

const title = "Case Studies | Webamazee Digital Projects";
const description =
  "Explore real Webamazee projects across website development, redesign and e-commerce, with case studies for businesses and organisations.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${site.url}/newcasestudies` },
  robots: { index: false, follow: false },
  openGraph: {
    title,
    description,
    url: `${site.url}/newcasestudies`,
    siteName: site.name,
    type: "website",
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: "Webamazee — website and digital project case studies",
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

export default function NewCaseStudiesPage() {
  return (
    <div className="min-h-screen bg-white pt-16 text-[#0b1528] selection:bg-[#0f6dff]/15 selection:text-[#0b57d0] sm:pt-20">
      <div id="main-content" className="overflow-x-clip">
        <section className="border-b border-slate-200/80 bg-white py-10">
          <div className={container}>
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">Selected Case Studies</p>
            <div className="mt-4 grid items-end gap-7 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-8">
                <h1 className="max-w-4xl font-display text-[2.7rem] font-bold leading-[1.04] tracking-[-0.045em] text-[#0b1528] sm:text-[4rem] lg:text-[5.1rem] xl:text-[5.6rem]">
                  Work That Speaks <span className="text-[#0f6dff]">for Itself.</span>
                </h1>
              </div>
              <div className="max-w-md lg:col-span-4 lg:pb-1">
                <p className="text-[16px] leading-relaxed text-slate-600 sm:text-[17px]">
                  Real digital experiences, built around the businesses and people they serve.
                </p>
                <a href="#selected-work" className="mt-5 inline-flex items-center gap-2 border-b border-[#0f6dff]/35 pb-1.5 text-[14px] font-bold text-[#0f6dff] transition-colors hover:border-[#0f6dff]">
                  Explore the work <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {CASE_STUDY_SHOWCASES.map((project, index) => {
          const reversed = index % 2 === 1;
          return (
            <section
              key={project.slug}
              id={index === 0 ? "selected-work" : undefined}
              className={`scroll-mt-24 border-b border-slate-200/80 py-10 ${reversed ? "bg-[#f7f9fc]" : "bg-white"}`}
            >
              <div className={container}>
                <article className="grid items-center gap-7 lg:grid-cols-12 lg:gap-12 xl:gap-16">
                  <Link
                    href={project.caseStudyUrl}
                    aria-label={`Explore ${project.name} case study`}
                    className={`group block min-w-0 overflow-hidden rounded-2xl border border-slate-200/90 bg-[#eef3f9] p-2.5 transition-shadow duration-300 hover:shadow-[0_20px_50px_-30px_rgba(11,21,40,0.3)] sm:p-4 lg:col-span-7 ${reversed ? "lg:order-2" : ""}`}
                  >
                    <div className={`relative overflow-hidden rounded-xl border border-slate-200/90 bg-white ${reversed ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
                      <Image
                        src={project.screenshot}
                        alt={`${project.name} website screenshot`}
                        fill
                        sizes="(max-width: 1023px) 100vw, (max-width: 1320px) 58vw, 720px"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
                      />
                    </div>
                  </Link>

                  <div className={`min-w-0 lg:col-span-5 ${reversed ? "lg:order-1" : ""}`}>
                    <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
                      <span aria-hidden className="font-display text-[3rem] font-bold leading-none tracking-[-0.04em] text-[#0f6dff] sm:text-[3.5rem] lg:text-[4rem]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">Selected Project</span>
                    </div>
                    <p className="mt-6 text-[12px] font-bold uppercase tracking-[0.14em] text-[#0f6dff]">{project.industry}</p>
                    <h2 className="mt-2 font-display text-[1.85rem] font-bold leading-[1.12] tracking-[-0.03em] text-[#0b1528] sm:text-[2.4rem]">
                      {project.name}
                    </h2>
                    <p className="mt-4 line-clamp-2 max-w-xl text-[15.5px] leading-relaxed text-slate-600">
                      {project.headline}
                    </p>
                    <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">Service</span>
                      <span className="text-[14px] font-semibold text-[#0b1528]">{project.categoryTag}</span>
                    </div>
                    <Link
                      href={project.caseStudyUrl}
                      aria-label={`Explore ${project.name} case study`}
                      className="group mt-7 inline-flex items-center gap-2 border-b border-[#0f6dff]/35 pb-1.5 text-[14px] font-bold text-[#0f6dff] transition-colors hover:border-[#0f6dff]"
                    >
                      Explore Case Study
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
                    </Link>
                  </div>
                </article>
              </div>
            </section>
          );
        })}

        <section className="bg-[#0f6dff] py-10 text-white">
          <div className={`${container} grid items-end gap-7 lg:grid-cols-12 lg:gap-12`}>
            <div className="lg:col-span-8">
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-white/75">Start a Conversation</p>
              <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl lg:text-[3.2rem] lg:leading-[1.12]">
                Ready to Create Something Meaningful?
              </h2>
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-white/85 sm:text-[17px]">
                Let&apos;s turn your next business challenge into a digital opportunity.
              </p>
            </div>
            <div className="lg:col-span-4 lg:flex lg:justify-end lg:pb-1">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[52px] items-center justify-center gap-2.5 rounded-xl bg-white px-7 text-[15px] font-semibold text-[#0b57d0] transition-colors hover:bg-[#eef5ff]"
              >
                Book a Free Consultation <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
