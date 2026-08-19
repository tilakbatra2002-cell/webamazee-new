"use client";

import { motion } from "framer-motion";
import { Globe, MapPin, CalendarDays, Layers, ArrowUpRight, ArrowRight } from "lucide-react";
import { Breadcrumb } from "../layout/breadcrumb";
import { Button } from "../ui/button";
import { Words } from "../ui/text-reveal";
import { DeviceShowcase } from "../work/device-showcase";
import type { CaseStudy } from "@/lib/case-studies";

function MiniBars() {
  const h = [42, 58, 48, 70, 62, 84, 74];
  return (
    <div className="flex h-16 items-end gap-1.5">
      {h.map((x, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${x}%` }}
          transition={{ delay: 0.9 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 rounded-t bg-gradient-to-t from-brand-700/30 to-brand-500/70"
        />
      ))}
    </div>
  );
}

export function CaseStudyHero({ cs }: { cs: CaseStudy }) {
  const meta = [
    { icon: Layers, label: "Project Type", value: cs.projectType },
    { icon: MapPin, label: "Industry", value: cs.industry },
    { icon: Globe, label: "Country", value: cs.country },
    { icon: CalendarDays, label: "Completion", value: cs.completion },
  ];

  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pt-36">
      <div className="pointer-events-none absolute inset-0 grid-pattern [mask-image:radial-gradient(55%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[32rem] w-[42rem] -translate-x-1/2 rounded-full bg-hero-glow blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -left-32 top-16 h-80 w-80 rounded-full bg-brand-400/10 blur-3xl animate-aurora" />
      <div aria-hidden className="pointer-events-none absolute -right-24 top-28 h-72 w-72 rounded-full bg-brand-600/8 blur-3xl animate-aurora" style={{ animationDelay: "2s" }} />

      <div className="relative mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
          <Breadcrumb crumbs={[{ label: "Case Studies", href: "/case-studies" }, { label: cs.title }]} />
        </motion.div>

        <div className="mx-auto mt-10 max-w-4xl text-center">
          <motion.span initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="inline-flex items-center gap-2 rounded-full border border-brand-600/15 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700 shadow-soft backdrop-blur-sm">
            {cs.service}
          </motion.span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl text-balance">
            <Words text={cs.title} as="span" stagger={0.04} />
          </h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-500 text-pretty">
            {cs.summary}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.55 }} className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label} className="rounded-2xl border border-line bg-white/80 p-4 text-center shadow-soft backdrop-blur">
                <m.icon className="mx-auto h-4 w-4 text-brand-600" />
                <p className="mt-1.5 text-[11px] font-medium uppercase tracking-wider text-slate-400">{m.label}</p>
                <p className="mt-0.5 text-sm font-semibold text-ink">{m.value}</p>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" href="/contact" withArrow>Start Your Project</Button>
            <Button size="lg" variant="secondary" href="/contact">Book Free Consultation</Button>
            {cs.liveUrl && (
              <a href={cs.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:underline">
                <Globe className="h-4 w-4" /> Live website <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </motion.div>

          {/* animated stat strip */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.9 }} className="mx-auto mt-8 flex max-w-md items-center gap-5 rounded-2xl border border-line bg-white/80 p-4 shadow-soft backdrop-blur">
            <div className="flex-1"><MiniBars /></div>
            <div className="text-left">
              <p className="text-xs font-medium text-slate-400">Focus area</p>
              <p className="text-sm font-bold text-ink">{cs.service}</p>
              <p className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-brand-700">
                <ArrowRight className="h-3 w-3" /> Process-led engagement
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
