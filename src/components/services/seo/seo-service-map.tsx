"use client";

/**
 * SEO Services (hub) — the one comprehensive SEO page.
 *
 * Its distinctive element is the service map: the five SEO disciplines as a
 * linked index, so this page acts as the entry point for the whole cluster.
 */
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ServiceIcon } from "@/components/services/service-icon";
import { card, container, eyebrow, heading, lead } from "./seo-theme";

export type ServiceMapItem = {
  slug: string;
  name: string;
  icon: string;
  summary: string;
  focus: string[];
};

export function SeoServiceMap({ items }: { items: ServiceMapItem[] }) {
  return (
    <section id="seo-services-map" className="scroll-mt-28 bg-white py-12 sm:py-14">
      <div className={container}>
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
          <div>
            <p className={eyebrow}>The SEO service cluster</p>
            <h2 className={`${heading} mt-2`}>Five disciplines, one search programme</h2>
          </div>
          <p className={`${lead} max-w-2xl lg:justify-self-end`}>
            Technical foundations, on-page work, content, authority and local visibility are
            related rather than interchangeable. Most engagements combine several of them, in
            an order set by your starting point.
          </p>
        </div>

        <ol className="mt-8 grid overflow-hidden rounded-2xl border border-slate-200 lg:grid-cols-12">
          <li className="flex flex-col justify-between bg-[#0b1528] p-6 text-white sm:p-8 lg:col-span-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8fb9ff]">
                Start here
              </p>
              <h3 className="mt-4 font-display text-2xl font-bold tracking-tight">
                A clear foundation for search.
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-slate-300">
                Every SEO engagement starts with an audit of your current position, not a
                template. Priorities are agreed before any work begins.
              </p>
            </div>
            <Link
              href="/free-seo-audit"
              className="mt-6 inline-flex self-start items-center gap-2 text-sm font-bold text-white hover:underline"
            >
              Run a free SEO audit <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </li>
          <li className="divide-y divide-slate-200 bg-white lg:col-span-8">
            <ol className="divide-y divide-slate-200">
              {items.map((item, index) => (
                <li
                  key={item.slug}
                  className="grid gap-2 p-5 sm:grid-cols-[auto_1.1fr_1.35fr_auto] sm:items-center sm:gap-5 sm:px-7"
                >
                  <span className="font-display text-[12px] font-bold text-[#0f6dff]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="flex items-center gap-2 font-display text-[15px] font-bold">
                      <ServiceIcon name={item.icon} className="h-4 w-4 shrink-0 text-[#0f6dff]" />
                      <span className="truncate">{item.name}</span>
                    </h3>
                    <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.1em] text-slate-400">
                      {item.focus.join(" · ")}
                    </p>
                  </div>
                  <p className="text-[13px] leading-relaxed text-slate-600">{item.summary}</p>
                  <Link
                    href={`/services/${item.slug}`}
                    aria-label={`Learn about ${item.name}`}
                    className="inline-flex items-center gap-1 text-[13px] font-bold text-[#0f6dff] hover:underline"
                  >
                    Details <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </Link>
                </li>
              ))}
            </ol>
          </li>
        </ol>
      </div>
    </section>
  );
}

/**
 * Pillar layout: the four pillars of organic search, each with the activities
 * that belong to it. Used to place keyword research, content, authority and
 * reporting side by side rather than as another generic card grid.
 */
export function SeoPillars({
  pillars,
}: {
  pillars: { number: string; title: string; intro: string; points: string[] }[];
}) {
  return (
    <section className="bg-[#f7f9fc] py-12 sm:py-14">
      <div className={container}>
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
          <div>
            <p className={eyebrow}>What the work involves</p>
            <h2 className={`${heading} mt-2`}>Four pillars of organic growth</h2>
          </div>
          <p className={`${lead} max-w-2xl lg:justify-self-end`}>
            Each pillar can be scoped on its own, but they reinforce each other. A page that is
            technically sound but built around the wrong intent will not perform, and neither
            will well-researched content on a site search engines struggle to crawl.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {pillars.map((p) => (
            <article key={p.title} className={`${card} bg-white p-6`}>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-[12px] font-bold text-[#0f6dff]">{p.number}</span>
                <h3 className="font-display text-lg font-bold">{p.title}</h3>
              </div>
              <p className="mt-2 text-[14px] leading-relaxed text-slate-600">{p.intro}</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-[13px] leading-relaxed text-slate-600">
                    <span aria-hidden="true" className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#0f6dff]" />
                    {pt}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
