import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CASE_STUDY_SHOWCASES } from "./newhome-data";

const PROJECT_DESCRIPTIONS: Record<string, string> = {
  kabiroilmill: "Cold-pressed oil store.",
  wellingtontours: "A tour and transfer website.",
  shinegoldtours: "An India travel site redesign.",
  americanlaobusinessassociation: "US–Laos business network.",
};

export function NewHomeCaseStudies() {
  return (
    <section
      id="case-studies"
      className="scroll-mt-24 border-y border-slate-200/80 bg-[#f7f9fc] py-10"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">
              Selected Work
            </p>
            <h2 className="mt-2.5 font-display text-3xl font-bold tracking-[-0.025em] text-[#0b1528] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
              A closer look at our work.
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex shrink-0 items-center gap-1.5 text-[13.5px] font-bold text-[#0f6dff] hover:underline"
          >
            View All Projects
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CASE_STUDY_SHOWCASES.map((project) => {
            // The live Shine Gold site is currently unavailable; its existing
            // project case study remains a working destination.
            const projectUrl =
              project.slug === "shinegoldtours"
                ? project.caseStudyUrl
                : project.liveUrl;
            const isExternal = projectUrl.startsWith("https://");

            return (
              <article
                key={project.slug}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_10px_30px_-20px_rgba(11,21,40,0.18)] transition-shadow duration-300 hover:shadow-[0_18px_40px_-20px_rgba(11,21,40,0.25)]"
              >
                <div className="bg-[#eef3f9] p-3">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-slate-200/90 bg-white">
                    <Image
                      src={project.screenshot}
                      alt={`${project.name} website screenshot`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <span className="self-start rounded-md bg-[#eef5ff] px-2.5 py-1 text-[11px] font-bold text-[#0f6dff]">
                    {project.categoryTag}
                  </span>
                  <h3 className="mt-3 min-h-[47px] font-display text-[17px] font-bold leading-snug tracking-tight text-[#0b1528]">
                    {project.name}
                  </h3>
                  <p className="mt-1 truncate text-[13px] text-slate-500">
                    {PROJECT_DESCRIPTIONS[project.slug]}
                  </p>
                  <a
                    href={projectUrl}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    aria-label={`View ${project.name} project`}
                    className="mt-auto inline-flex self-start items-center gap-1.5 pt-5 text-[13px] font-bold text-[#0f6dff] hover:underline"
                  >
                    View Project
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
