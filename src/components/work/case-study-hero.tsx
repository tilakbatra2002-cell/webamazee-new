"use client";

import { motion } from "framer-motion";
import { Globe, MapPin, CalendarDays, Layers, ArrowUpRight } from "lucide-react";
import { Breadcrumb } from "../layout/breadcrumb";
import { Button } from "../ui/button";
import { Words } from "../ui/text-reveal";

export function CaseStudyHero({
  title, summary, category, industry, country, url, year, stack, crumbLabel,
}: {
  title: string;
  summary: string;
  category: string;
  industry: string;
  country: string;
  url: string;
  year: string;
  stack: string[];
  crumbLabel: string;
}) {
  const meta = [
    { icon: Layers, label: "Category", value: category },
    { icon: MapPin, label: "Industry", value: industry },
    { icon: Globe, label: "Country", value: country },
    { icon: CalendarDays, label: "Year", value: year },
  ];

  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pt-36">
      <div className="pointer-events-none absolute inset-0 grid-pattern [mask-image:radial-gradient(55%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[32rem] w-[42rem] -translate-x-1/2 rounded-full bg-hero-glow blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -left-32 top-16 h-80 w-80 rounded-full bg-brand-400/10 blur-3xl animate-aurora" />

      <div className="relative mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
          <Breadcrumb crumbs={[{ label: "Portfolio", href: "/portfolio" }, { label: crumbLabel }]} />
        </motion.div>

        <div className="mx-auto mt-10 max-w-4xl text-center">
          <motion.span initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="inline-flex items-center gap-2 rounded-full border border-brand-600/15 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700 shadow-soft backdrop-blur-sm">
            {category}
          </motion.span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl text-balance">
            <Words text={title} as="span" stagger={0.04} />
          </h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-500 text-pretty">
            {summary}
          </motion.p>

          {/* meta grid */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.55 }} className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label} className="rounded-2xl border border-line bg-white/80 p-4 text-center shadow-soft backdrop-blur">
                <m.icon className="mx-auto h-4 w-4 text-brand-600" />
                <p className="mt-1.5 text-[11px] font-medium uppercase tracking-wider text-slate-400">{m.label}</p>
                <p className="mt-0.5 text-sm font-semibold text-ink">{m.value}</p>
              </div>
            ))}
          </motion.div>

          {/* stack */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }} className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {stack.slice(0, 6).map((t) => (
              <span key={t} className="rounded-full border border-line bg-surface/70 px-3 py-1 text-xs font-medium text-slate-500">{t}</span>
            ))}
          </motion.div>

          {/* CTA row */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:underline">
              <Globe className="h-4 w-4" /> Visit the live site
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <Button size="lg" href="/contact" withArrow>Start a Project Like This</Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
