"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CASE_STUDY_SHOWCASES } from "@/components/newhome/newhome-data";

const filters = [
  { label: "All", category: "all" },
  { label: "Website Development", category: "Website Development" },
  { label: "Website Redesign", category: "Website Redesign" },
  { label: "E-Commerce", category: "E-Commerce Development" },
] as const;

type Category = (typeof filters)[number]["category"];

const descriptions: Record<string, string> = {
  kabiroilmill: "An online store for cold-pressed oils.",
  wellingtontours: "A website for New Zealand tours and transfers.",
  shinegoldtours: "A redesigned website for Indian travel experiences.",
  americanlaobusinessassociation: "A digital home for a US–Laos business association.",
};

export function ProjectGrid() {
  const [category, setCategory] = useState<Category>("all");
  const projects = CASE_STUDY_SHOWCASES.filter(
    (project) => category === "all" || project.categoryTag === category
  );

  return (
    <div className="mt-8">
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center">
        <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.category}
              type="button"
              aria-pressed={category === filter.category}
              onClick={() => setCategory(filter.category)}
              className={`rounded-xl border px-4 py-2.5 text-[13px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff] ${
                category === filter.category
                  ? "border-[#0f6dff] bg-[#0f6dff] text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-[#0f6dff]/50 hover:text-[#0f6dff]"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <p aria-live="polite" className="shrink-0 text-[13px] font-medium text-slate-500">
          {projects.length} {projects.length === 1 ? "project" : "projects"}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
        {projects.map((project) => {
          // Use the existing case study while the Shine Gold live site is unavailable.
          const projectUrl = project.slug === "shinegoldtours" ? project.caseStudyUrl : project.liveUrl;
          const isExternal = projectUrl.startsWith("https://");

          return (
            <article key={project.slug} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_10px_30px_-20px_rgba(11,21,40,0.18)] transition-shadow duration-300 hover:shadow-[0_18px_40px_-20px_rgba(11,21,40,0.25)]">
              <Link href={project.caseStudyUrl} aria-label={`View ${project.name} project details`} className="block bg-[#eef3f9] p-3 sm:p-4">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-slate-200/90 bg-white">
                  <Image
                    src={project.screenshot}
                    alt={`${project.name} website screenshot`}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1320px) 50vw, 630px"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
                  />
                </div>
              </Link>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <span className="self-start rounded-md bg-[#eef5ff] px-2.5 py-1 text-[11px] font-bold text-[#0f6dff]">
                  {project.categoryTag}
                </span>
                <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-[#0b1528]">{project.name}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-slate-600">{descriptions[project.slug]}</p>
                <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-5">
                  <a
                    href={projectUrl}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    aria-label={`View ${project.name} project`}
                    className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-[#0f6dff] hover:underline"
                  >
                    View Project <ArrowUpRight className="h-4 w-4" />
                  </a>
                  {isExternal && (
                    <Link href={project.caseStudyUrl} className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-slate-600 hover:text-[#0f6dff]">
                      View Case Study <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
