"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight, Clock, Eye, FolderOpen, Layers, Monitor, Users,
} from "lucide-react";
import type { CaseStudy } from "@/lib/case-studies";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

function fade(delay = 0) {
  return {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.6, delay, ease },
  };
}

/**
 * Compact project-information strip shown immediately below the hero.
 * Four quiet columns — deliberately low-height so it reads as metadata,
 * not as another content block.
 */
export function ProjectInfoBar({ cs }: { cs: CaseStudy }) {
  const cells = [
    { label: "Client", value: cs.name },
    { label: "Industry", value: cs.industry },
    { label: "Project", value: cs.tag },
    { label: "Market", value: cs.country },
  ];
  return (
    <section className="bg-white pb-4">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <motion.div {...fade()} className="overflow-hidden rounded-3xl border border-line bg-white shadow-soft">
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {cells.map((c, i) => (
              <div
                key={c.label}
                className={cn(
                  "p-5 sm:p-6",
                  i % 2 === 1 && "border-l border-line",
                  i >= 2 && "border-t border-line lg:border-t-0",
                  i === 2 && "lg:border-l",
                  i === 3 && "lg:border-l"
                )}
              >
                <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">{c.label}</dt>
                <dd className="mt-1.5 text-sm font-semibold leading-snug text-ink">{c.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
        <motion.p {...fade(0.1)} className="mt-4 text-center text-xs text-slate-400">
          Completed {cs.completion}
          {cs.liveUrl && (
            <>
              {" · "}
              <a href={cs.liveUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-700 underline decoration-brand-300 underline-offset-4 transition-colors hover:text-brand-800">
                Live at {cs.liveUrl.replace("https://", "")}
              </a>
            </>
          )}
        </motion.p>
      </div>
    </section>
  );
}

/**
 * Editorial overview: two-column client & brief, a distinct
 * "business at a glance" insight block, a clean objectives grid and a
 * three-column scope / timeline / team information row.
 */
export function OverviewEditorial({ cs }: { cs: CaseStudy }) {
  const info = [
    { icon: Layers, title: "Project Scope", body: cs.scope },
    { icon: Clock, title: "Timeline", body: cs.timeline },
    { icon: Users, title: "Team", body: cs.team },
  ];
  return (
    <section id="overview" className="scroll-mt-24 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        {/* Client & brief — two columns on desktop, stacked on mobile */}
        <div className="grid gap-10 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-16">
          <motion.div {...fade()}>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/15 bg-brand-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
              <FolderOpen className="h-3.5 w-3.5" /> Project Overview
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-4xl text-balance">
              The client and <span className="text-gradient">the brief</span>
            </h2>
            <div className="mt-6 h-1 w-16 rounded-full bg-brand-gradient" />
          </motion.div>
          <div className="max-w-3xl space-y-5">
            {cs.overviewClient.map((p, i) => (
              <motion.p key={i} {...fade(i * 0.08)} className="text-[16px] leading-[1.85] text-slate-600 sm:text-[17px]">
                {p}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Business at a glance — distinct insight block */}
        <motion.div {...fade()} className="mt-14 grid gap-6 rounded-3xl border border-brand-600/20 bg-brand-gradient-soft p-7 shadow-soft sm:p-9 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
          <div className="flex items-start gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow">
              <Eye className="h-4 w-4" />
            </span>
            <p className="pt-2 text-xs font-bold uppercase tracking-[0.14em] text-brand-700">
              Business at a glance
            </p>
          </div>
          <p className="text-[16px] font-medium leading-relaxed text-slate-700 sm:text-[17px]">
            {cs.overviewBusiness}
          </p>
        </motion.div>

        {/* Objectives — clean numbered card grid */}
        <div className="mt-16">
          <motion.div {...fade()} className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-[1.75rem]">Objectives</h3>
            <span className="text-sm text-slate-400">What the project set out to achieve</span>
          </motion.div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {cs.objectives.map((o, i) => (
              <motion.div
                key={o}
                {...fade(i * 0.06)}
                className={cn(
                  "flex items-start gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft transition-all duration-300 hover:border-brand-600/20 hover:shadow-glow sm:p-6",
                  i === cs.objectives.length - 1 && cs.objectives.length % 2 === 1 && "sm:col-span-2"
                )}
              >
                <span className="font-display text-sm font-bold text-brand-600">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-[15px] leading-relaxed text-slate-600">{o}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scope / Timeline / Team — three-column information grid */}
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {info.map((b, i) => (
            <motion.div key={b.title} {...fade(i * 0.08)} className="rounded-2xl border border-line bg-surface/60 p-6 transition-colors duration-300 hover:bg-surface">
              <b.icon className="h-4 w-4 text-brand-600" />
              <h4 className="mt-3 font-display text-base font-bold text-ink">{b.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{b.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Large, prominent showcase of the redesigned website — the visual proof
 * of the project. Replaces the small thumbnail gallery for premium layouts.
 */
export function WebsiteShowcase({ cs }: { cs: CaseStudy }) {
  const highlights = [
    "Mission-led homepage",
    "Connect · Promote · Support · Grow",
    "Upcoming events",
    "News & insights",
    "Sponsors & members",
  ];
  return (
    <section id="gallery" className="scroll-mt-24 bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/15 bg-brand-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
            <Monitor className="h-3.5 w-3.5" /> Website Showcase
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] text-balance">
            The redesigned <span className="text-gradient">experience</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-500 sm:text-lg">
            The live website presents the association&apos;s mission, pillars, events, news and community in one clear, responsive experience.
          </p>
        </div>

        <motion.div {...fade()} className="mx-auto mt-12 max-w-6xl">
          <div className="overflow-hidden rounded-3xl border border-line bg-white p-2.5 shadow-lift-lg">
            <div className="flex items-center gap-1.5 border-b border-line bg-surface/70 px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
              <span className="ml-2 flex-1 truncate rounded-md bg-white px-2.5 py-1 text-[10px] text-slate-400 ring-1 ring-line">
                {cs.liveUrl ? cs.liveUrl.replace("https://", "") : cs.name}
              </span>
            </div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-white">
              <Image
                src={cs.image}
                alt={`${cs.name} redesigned website`}
                fill
                sizes="(max-width: 1024px) 100vw, 1100px"
                className="object-cover object-top"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-slate-500">
              The redesigned {cs.name} homepage — live at {cs.liveUrl ? cs.liveUrl.replace("https://", "") : "the client website"}.
            </p>
            {cs.liveUrl && (
              <Link
                href={cs.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:shadow-glow-lg"
              >
                Visit live website
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            )}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {highlights.map((h, i) => (
              <motion.span key={h} {...fade(i * 0.05)} className="rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-soft">
                {h}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
