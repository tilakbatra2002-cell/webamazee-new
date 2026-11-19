import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Globe2 } from "lucide-react";
import { CASE_STUDY_SHOWCASES } from "./newhome-data";

export function NewHomeCaseStudies() {
  return (
    <section
      id="case-studies"
      className="scroll-mt-24 border-y border-slate-200/80 bg-[#f7f9fc] py-10"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">
              Selected Work &amp; Case Studies
            </p>
            <h2 className="mt-2.5 font-display text-3xl font-bold tracking-[-0.025em] text-[#0b1528] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
              Real websites built around clarity, usability, and enquiries.
            </h2>
          </div>
          <div className="flex flex-col items-start gap-2 lg:items-end">
            <p className="max-w-md text-[15px] leading-relaxed text-slate-600 lg:text-right">
              Explore live projects delivered across India, New Zealand, the
              United States, and Laos — documented honestly around real project
              scope and outcomes.
            </p>
            <div className="flex items-center gap-5 pt-1">
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-[#0f6dff] hover:underline"
              >
                All Case Studies
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-slate-600 hover:text-[#0f6dff]"
              >
                Full Portfolio
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Editorial Case Study Showcases */}
        <div className="mt-12 space-y-10">
          {CASE_STUDY_SHOWCASES.map((project, index) => {
            const reverseDesktop = index % 2 === 1;

            return (
              <article
                key={project.slug}
                className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_14px_40px_-22px_rgba(11,21,40,0.12)]"
              >
                <div className="grid items-stretch lg:grid-cols-12">
                  {/* Browser Screenshot Column */}
                  <div
                    className={`flex flex-col justify-center border-b border-slate-200/80 bg-[#eef3f9] p-4 sm:p-6 lg:col-span-7 lg:border-b-0 ${
                      reverseDesktop
                        ? "lg:order-2 lg:border-l"
                        : "lg:order-1 lg:border-r"
                    }`}
                  >
                    <div className="overflow-hidden rounded-xl border border-slate-300/80 bg-white shadow-[0_16px_38px_-16px_rgba(11,21,40,0.2)]">
                      {/* Realistic clean browser bar */}
                      <div className="flex items-center justify-between border-b border-slate-200 bg-[#f8fafc] px-3.5 py-2.5">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                        </div>
                        <div className="flex items-center gap-1.5 rounded-md border border-slate-200/90 bg-white px-3 py-1 text-[11.5px] font-medium text-slate-500">
                          <Globe2 className="h-3 w-3 text-[#0f6dff]" />
                          <span>{project.domain}</span>
                        </div>
                        <span className="text-[11px] font-semibold text-slate-400">
                          {project.year}
                        </span>
                      </div>

                      {/* High-resolution actual project screenshot */}
                      <Link
                        href={project.caseStudyUrl}
                        aria-label={`Read ${project.name} case study`}
                        className="group block overflow-hidden bg-slate-100"
                      >
                        <div className="relative aspect-[16/10] w-full overflow-hidden">
                          <Image
                            src={project.screenshot}
                            alt={`${project.name} live website screenshot`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 58vw"
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                          />
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Editorial Case Study Details Column */}
                  <div
                    className={`flex flex-col justify-between p-6 sm:p-8 lg:col-span-5 ${
                      reverseDesktop ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div>
                      {/* Client logo + meta tags */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                        <div className="flex items-center gap-3">
                          <Image
                            src={project.logo}
                            alt={`${project.name} logo`}
                            width={project.logoWidth}
                            height={project.logoHeight}
                            className="h-9 w-auto object-contain"
                          />
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="rounded-md bg-[#eef5ff] px-2.5 py-1 text-[11.5px] font-bold text-[#0f6dff]">
                            {project.categoryTag}
                          </span>
                          <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11.5px] font-semibold text-slate-600">
                            {project.country}
                          </span>
                        </div>
                      </div>

                      {/* Project Name & Headline */}
                      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {project.name} · {project.industry}
                      </p>
                      <h3 className="mt-1 font-display text-[1.35rem] font-bold leading-snug tracking-tight text-[#0b1528] sm:text-[1.45rem]">
                        {project.headline}
                      </h3>

                      {/* Structured Challenge / Solution / Outcome */}
                      <dl className="mt-5 space-y-3.5 text-[13.5px] leading-relaxed">
                        <div>
                          <dt className="font-bold text-[#0b1528]">
                            Project Need
                          </dt>
                          <dd className="mt-0.5 text-slate-600">
                            {project.challenge}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-bold text-[#0b1528]">
                            What Webamazee Built
                          </dt>
                          <dd className="mt-0.5 text-slate-600">
                            {project.solution}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-bold text-[#0b1528]">
                            Delivered Outcome
                          </dt>
                          <dd className="mt-0.5 text-slate-600">
                            {project.outcome}
                          </dd>
                        </div>
                      </dl>

                      {/* Scope deliverables */}
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {project.deliverables.map((item) => (
                          <span
                            key={item}
                            className="rounded-md border border-slate-200/90 bg-[#f8fafc] px-2.5 py-1 text-[11.5px] font-medium text-slate-600"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Case study & Live URL actions */}
                    <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5">
                      <Link
                        href={project.caseStudyUrl}
                        className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-[#0b1528] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#0f6dff]"
                      >
                        Read Full Case Study
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 text-[13px] font-semibold text-slate-700 transition-colors hover:border-[#0f6dff] hover:text-[#0f6dff]"
                      >
                        Visit {project.domain}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
