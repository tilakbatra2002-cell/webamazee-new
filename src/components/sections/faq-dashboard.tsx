"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BarChart3, Sparkles, TrendingUp, Zap } from "lucide-react";

const visual = "/images/custom/faq-strategy-studio.webp";

function StatStrip() {
  return (
    <div className="grid grid-cols-3 gap-2.5 rounded-2xl border border-white/70 bg-white/90 p-3 shadow-soft backdrop-blur">
      <div className="rounded-xl bg-brand-50/80 p-2.5 text-center">
        <p className="text-sm font-bold text-brand-700">+148%</p>
        <p className="text-[10px] text-slate-500">Traffic</p>
      </div>
      <div className="rounded-xl bg-surface p-2.5 text-center">
        <p className="text-sm font-bold text-brand-700">92</p>
        <p className="text-[10px] text-slate-500">SEO score</p>
      </div>
      <div className="rounded-xl bg-success/10 p-2.5 text-center">
        <p className="text-sm font-bold text-success">98/100</p>
        <p className="text-[10px] text-slate-500">Performance</p>
      </div>
    </div>
  );
}

/** Branded editorial strategy visual used in place of the former SVG dashboard. */
export function FaqDashboard() {
  return (
    <div className="relative mx-auto max-w-md">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-200/25 blur-3xl" />

      <div className="rounded-[1.75rem] bg-gradient-to-br from-brand-400/60 via-brand-100/40 to-brand-300/50 p-px shadow-lift-lg">
        <div className="relative overflow-hidden rounded-[calc(1.75rem-1px)] bg-white/85 p-3 backdrop-blur-xl sm:p-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface">
            <Image
              src={visual}
              alt="Webamazee strategist shaping a clear digital growth plan"
              fill
              sizes="(max-width: 1024px) 100vw, 448px"
              className="object-cover object-center"
            />
            <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2 sm:inset-x-4 sm:top-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-700 shadow-soft backdrop-blur">
                <Sparkles className="h-3 w-3" /> AI Growth Studio
              </span>
              <span className="rounded-full bg-ink/80 px-2.5 py-1.5 text-[10px] font-semibold text-white backdrop-blur">
                Human strategy
              </span>
            </div>
            <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
              <StatStrip />
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="absolute -left-3 -top-4 hidden animate-float sm:block"
      >
        <div className="glass-strong flex items-center gap-2 rounded-2xl border border-white/70 px-3.5 py-2.5 shadow-lift">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient text-white shadow-glow">
            <Zap className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[10px] text-slate-400">Google Ranking</p>
            <p className="text-sm font-bold text-ink">#1 <span className="text-xs font-medium text-success">▲ 6</span></p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.55, duration: 0.6 }}
        className="absolute -right-3 -bottom-5 hidden animate-float-x sm:block"
      >
        <div className="glass-strong flex items-center gap-2 rounded-2xl border border-white/70 px-3.5 py-2.5 shadow-lift">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-brand-700"><BarChart3 className="h-4 w-4" /></span>
          <div>
            <p className="text-[10px] text-slate-400">Keyword Growth</p>
            <p className="text-sm font-bold text-ink">+320%</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function FaqCompact() {
  return (
    <div className="mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-50 to-white p-3 shadow-soft ring-1 ring-brand-100">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
        <Image
          src={visual}
          alt="Webamazee strategist shaping a clear digital growth plan"
          fill
          sizes="(max-width: 1024px) 100vw, 680px"
          className="object-cover object-center"
        />
        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-700 shadow-soft backdrop-blur">
          <TrendingUp className="h-3 w-3" /> AI Growth Dashboard
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-xl bg-white/80 p-2 shadow-soft">
          <p className="text-sm font-bold text-brand-700">#1</p>
          <p className="text-[11px] text-slate-500">Ranking</p>
        </div>
        <div className="rounded-xl bg-white/80 p-2 shadow-soft">
          <p className="text-sm font-bold text-brand-700">92</p>
          <p className="text-[11px] text-slate-500">SEO Score</p>
        </div>
        <div className="rounded-xl bg-white/80 p-2 shadow-soft">
          <p className="text-sm font-bold text-brand-700">98</p>
          <p className="text-[11px] text-slate-500">Perf.</p>
        </div>
      </div>
    </div>
  );
}
