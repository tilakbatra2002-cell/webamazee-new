"use client";

import { motion } from "framer-motion";
import {
  TrendingUp, Search, Gauge, Target, Sparkles, ArrowUpRight, Zap, BarChart3,
} from "lucide-react";

function GrowthLine() {
  return (
    <svg viewBox="0 0 260 90" className="h-full w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="faqArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E88FF" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#1E88FF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 78 C 30 70, 45 44, 70 52 C 95 60, 110 24, 140 32 C 170 40, 195 14, 225 20 C 240 23, 250 12, 260 10 L260 90 L0 90 Z"
        fill="url(#faqArea)"
      />
      <path
        d="M0 78 C 30 70, 45 44, 70 52 C 95 60, 110 24, 140 32 C 170 40, 195 14, 225 20 C 240 23, 250 12, 260 10"
        fill="none"
        stroke="#1E88FF"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="260" cy="10" r="4.5" fill="#fff" stroke="#1E88FF" strokeWidth="2.5" />
    </svg>
  );
}

function Donut({ value = 78 }: { value?: number }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-20 w-20">
      <svg viewBox="0 0 72 72" className="h-full w-full -rotate-90">
        <circle cx="36" cy="36" r={r} fill="none" stroke="#EAF3FF" strokeWidth="8" />
        <motion.circle
          cx="36" cy="36" r={r} fill="none" stroke="#1E88FF" strokeWidth="8" strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c * (1 - value / 100) }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center text-sm font-bold text-brand-700">
        {value}%
      </span>
    </div>
  );
}

function MiniBars() {
  const h = [30, 44, 36, 58, 50, 72, 62];
  return (
    <div className="flex h-12 items-end gap-1">
      {h.map((x, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${x}%` }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full rounded-t bg-gradient-to-t from-brand-700/30 to-brand-500/70"
        />
      ))}
    </div>
  );
}

/** Premium AI / Digital Marketing dashboard illustration. */
export function FaqDashboard() {
  return (
    <div className="relative mx-auto max-w-md">
      {/* soft glow behind */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-200/25 blur-3xl" />

      {/* gradient border + glass main card */}
      <div className="rounded-[1.75rem] bg-gradient-to-br from-brand-400/60 via-brand-100/40 to-brand-300/50 p-px shadow-lift-lg">
        <div className="relative overflow-hidden rounded-[calc(1.75rem-1px)] bg-white/85 p-5 backdrop-blur-xl sm:p-6">
          <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-200/30 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-brand-100/40 blur-3xl" />

          {/* header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">AI Growth Dashboard</p>
                <p className="text-[11px] text-slate-400">AI-optimised · realtime</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-[11px] font-semibold text-success">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              Live
            </span>
          </div>

          {/* SEO ranking + organic traffic */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="col-span-2 rounded-2xl border border-line bg-surface/60 p-3.5">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                  <TrendingUp className="h-3.5 w-3.5 text-brand-600" /> Organic Traffic
                </p>
                <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-success">
                  +148% <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
              <div className="mt-2 h-16 w-full"><GrowthLine /></div>
            </div>
            <div className="flex flex-col justify-center rounded-2xl border border-line bg-surface/60 p-3.5 text-center">
              <p className="text-[11px] font-medium text-slate-500">SEO Score</p>
              <div className="mx-auto mt-1"><Donut value={92} /></div>
            </div>
          </div>

          {/* metric cards */}
          <div className="mt-3 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-line bg-surface/60 p-3">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-50 text-brand-700"><Gauge className="h-4 w-4" /></span>
              <p className="mt-2 font-display text-lg font-bold text-ink">98/100</p>
              <p className="text-[11px] text-slate-500">Perf.</p>
            </div>
            <div className="rounded-2xl border border-line bg-surface/60 p-3">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-success/10 text-success"><Target className="h-4 w-4" /></span>
              <p className="mt-2 font-display text-lg font-bold text-ink">5.2%</p>
              <p className="text-[11px] text-slate-500">Conv.</p>
            </div>
            <div className="rounded-2xl border border-line bg-surface/60 p-3">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-50 text-brand-700"><Search className="h-4 w-4" /></span>
              <div className="mt-2"><MiniBars /></div>
              <p className="text-[11px] text-slate-500">Keywords</p>
            </div>
          </div>
        </div>
      </div>

      {/* floating metric cards */}
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
