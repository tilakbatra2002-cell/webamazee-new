"use client";

/**
 * Social cluster navigation.
 *
 * The six social service pages cross-link each other here, and point back to
 * the search programme at the end. The presentation deliberately mirrors
 * `SeoClusterBlock` so the two clusters read as parts of one website rather
 * than two separately designed systems.
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

export const SOCIAL_CLUSTER: ClusterService[] = [
  {
    slug: "social-media-management",
    name: "Social Media Management",
    icon: "Share2",
    text: "Ongoing planning, publishing and community management across your platforms.",
  },
  {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    icon: "Megaphone",
    text: "Campaigns built around audiences, messaging and measurable objectives.",
  },
  {
    slug: "instagram-marketing",
    name: "Instagram Marketing",
    icon: "Instagram",
    text: "Feed, Reels and Stories strategy for a visual audience.",
  },
  {
    slug: "facebook-marketing",
    name: "Facebook Marketing",
    icon: "Facebook",
    text: "Audience targeting, local awareness and enquiry generation.",
  },
  {
    slug: "linkedin-marketing",
    name: "LinkedIn Marketing",
    icon: "Linkedin",
    text: "B2B positioning, thought leadership and decision-maker engagement.",
  },
  {
    slug: "social-media-advertising",
    name: "Social Media Advertising",
    icon: "Target",
    text: "Paid campaigns, retargeting, conversion tracking and budget control.",
  },
];

/** Plain, contextual links back into the search programme. */
const SEARCH_LINKS = [
  { href: "/services/ai-content-optimization", label: "AI Content Optimisation" },
  { href: "/services/seo-services", label: "SEO Services" },
  { href: "/services/local-seo", label: "Local SEO" },
  { href: "/seo-services-zirakpur", label: "SEO Services in Zirakpur" },
];

export function SocialClusterBlock({ currentSlug }: { currentSlug: string }) {
  const others = SOCIAL_CLUSTER.filter((s) => s.slug !== currentSlug);

  return (
    <section className="bg-[#f7f9fc] py-12 sm:py-14">
      <div className={container}>
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
          <div>
            <p className={eyebrow}>The social cluster</p>
            <h2 className={`${heading} mt-2`}>Related social services</h2>
          </div>
          <p className={`${lead} max-w-2xl lg:justify-self-end`}>
            Management, campaign work and paid advertising solve different problems. Most
            engagements start with one and add another once the first is working.
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
                <p className="font-display text-[14.5px] font-bold leading-snug group-hover:text-[#0b57d0]">
                  {s.name}
                </p>
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
            <p className="font-display text-[13.5px] font-bold">Where social connects to search</p>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-600">
              Social builds attention and demand. Search captures the people already looking.
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {SEARCH_LINKS.map((l) => (
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
              A free audit reviews your profiles, content and current activity before you commit
              to any service.
            </p>
            <Link
              href="/free-seo-audit"
              className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-bold text-white hover:underline"
            >
              Start with a free audit
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
