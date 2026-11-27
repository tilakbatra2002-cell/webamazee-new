"use client";

/**
 * SEO cluster navigation.
 *
 * Every SEO service page carries the same cluster block so the five pages,
 * the two adjacent services (link building, competitor analysis, AI content
 * optimisation), the free audit and the industry SEO pages are all one or two
 * clicks apart. Each page marks itself as the current page instead of linking
 * to itself.
 */
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { ServiceIcon } from "@/components/services/service-icon";
import { container, eyebrow, heading, lead } from "./seo-theme";

export type ClusterService = {
  slug: string;
  name: string;
  icon: string;
  text: string;
};

export const SEO_CLUSTER: ClusterService[] = [
  {
    slug: "seo-services",
    name: "SEO Services",
    icon: "Search",
    text: "The full search programme: technical, on-page, content and authority.",
  },
  {
    slug: "ai-seo",
    name: "AI SEO",
    icon: "Brain",
    text: "Search intent, entities and topical coverage, with human review.",
  },
  {
    slug: "technical-seo",
    name: "Technical SEO",
    icon: "Settings2",
    text: "Crawlability, indexation, Core Web Vitals and structured data.",
  },
  {
    slug: "local-seo",
    name: "Local SEO",
    icon: "MapPin",
    text: "Business profile, citations, reviews and location pages.",
  },
  {
    slug: "google-ranking-growth",
    name: "Google Ranking Growth",
    icon: "TrendingUp",
    text: "Opportunity research, on-page work, tracking and reporting.",
  },
  {
    slug: "link-building",
    name: "Link Building",
    icon: "Link2",
    text: "Relevance-led links, mentions and authority building.",
  },
  {
    slug: "competitor-analysis",
    name: "Competitor Analysis",
    icon: "Target",
    text: "What currently answers your target searches, and why.",
  },
  {
    slug: "ai-content-optimization",
    name: "AI Content Optimisation",
    icon: "FilePen",
    text: "Question-led content planning and editorial review.",
  },
];

export const INDUSTRY_SEO_LINKS = [
  { label: "SEO for E-Commerce", href: "/seo-for-ecommerce" },
  { label: "SEO for SaaS", href: "/seo-for-saas" },
  { label: "SEO for Healthcare", href: "/seo-for-healthcare" },
  { label: "SEO for Tourism", href: "/seo-for-tourism" },
  { label: "SEO for Professional Services", href: "/seo-for-professional-services" },
  { label: "SEO for Local Business", href: "/seo-for-local-business" },
];

export function SeoClusterBlock({ currentSlug }: { currentSlug: string }) {
  const others = SEO_CLUSTER.filter((s) => s.slug !== currentSlug);

  return (
    <section className="bg-[#f7f9fc] py-12 sm:py-14">
      <div className={container}>
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
          <div>
            <p className={eyebrow}>The SEO cluster</p>
            <h2 className={`${heading} mt-2`}>Related search services</h2>
          </div>
          <p className={`${lead} max-w-2xl lg:justify-self-end`}>
            These pages cover the rest of the search programme. Most engagements combine two or
            three of them, sequenced around your starting point rather than sold as a bundle.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-[#0f6dff]/40"
            >
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#eef4ff] text-[#0f6dff]">
                  <ServiceIcon name={s.icon} className="h-4 w-4" />
                </span>
                <h3 className="font-display text-[14.5px] font-bold leading-snug group-hover:text-[#0b57d0]">
                  {s.name}
                </h3>
              </div>
              <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-slate-600">{s.text}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-bold text-[#0f6dff]">
                Read more{" "}
                <ArrowRight
                  aria-hidden="true"
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="font-display text-[13.5px] font-bold">Industry-specific SEO pages</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {INDUSTRY_SEO_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-[#f7f9fc] px-3 py-2 text-[12.5px] font-semibold text-slate-700 transition-colors hover:border-[#0f6dff]/40 hover:text-[#0b57d0]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-[#0b1528] p-5 text-white">
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8fb9ff]">
              Not sure where to start?
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-slate-300">
              Run the free audit first. It shows what your site currently does well and what is
              holding it back before you commit to any service.
            </p>
            <Link
              href="/free-seo-audit"
              className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-bold text-white hover:underline"
            >
              Start with a free SEO audit
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <p className="mt-4 flex items-start gap-2 text-[12px] leading-relaxed text-slate-400">
              <CheckCircle2 aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#87b4ff]" />
              No obligation, no sales call required.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
