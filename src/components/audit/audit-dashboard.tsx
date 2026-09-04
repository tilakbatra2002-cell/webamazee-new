"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Zap, ShieldCheck, Search, Star, Check } from "lucide-react";

const bullets = [
  "Technical SEO Analysis",
  "Core Web Vitals Report",
  "UX Review",
  "Conversion Optimization",
  "AI SEO Opportunities",
];

function GaugeRing({ value, label }: { value: number; label: string }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative flex flex-col items-center">
      <div className="relative h-16 w-16">
        <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
          <circle cx="32" cy="32" r={r} fill="none" stroke="#EAF3FF" strokeWidth="7" />
          <motion.circle
            cx="32" cy="32" r={r} fill="none" stroke="#1E88FF" strokeWidth="7" strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: c * (1 - value / 100) }}
            transition={{ duration: 1.6, ease: "easeOut", delay: 0.4 }}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-sm font-bold text-brand-700">
          {value}
        </span>
      </div>
      <span className="mt-1 text-[10px] font-medium text-slate-500">{label}</span>
    </div>
  );
}

export function AuditDashboard() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-l-3xl bg-gradient-to-br from-brand-50 via-white to-brand-100/50 p-7">
      {/* subtle animated background */}
      <div aria-hidden className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-brand-200/30 blur-3xl animate-aurora" />
      <div aria-hidden className="pointer-events-none absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-brand-300/25 blur-3xl animate-aurora" style={{ animationDelay: "2s" }} />
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-pattern opacity-30 [mask-image:radial-gradient(70%_70%_at_50%_40%,black,transparent)]" />

      <div className="relative">
        {/* badge */}
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/15 bg-white/80 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-700 shadow-soft backdrop-blur">
          <Sparkles className="h-3.5 w-3.5" /> AI-Powered Analysis
        </span>

        <h3 className="mt-4 font-display text-2xl font-bold leading-tight text-ink sm:text-[1.6rem]">
          Get Your FREE{" "}
          <span className="text-gradient">AI Website Audit</span>
        </h3>

        {/* bullets */}
        <ul className="mt-4 space-y-1.5">
          {bullets.map((b) => (
            <li key={b} className="flex items-center gap-2 text-[13px] font-medium text-slate-600">
              <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700">
                <Check className="h-2.5 w-2.5" />
              </span>
              {b}
            </li>
          ))}
        </ul>

        {/* score cards row */}
        <div className="mt-5 grid grid-cols-3 gap-2.5">
          <div className="rounded-2xl border border-white/70 bg-white/80 p-3 text-center shadow-soft backdrop-blur">
            <GaugeRing value={92} label="Lighthouse" />
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/80 p-3 text-center shadow-soft backdrop-blur">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-50 text-brand-700 mx-auto">
              <Zap className="h-4 w-4" />
            </span>
            <p className="mt-1 font-display text-lg font-bold text-ink">1.2s</p>
            <p className="text-[10px] font-medium text-slate-500">Speed</p>
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/80 p-3 text-center shadow-soft backdrop-blur">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-success/10 text-success mx-auto">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <p className="mt-1 font-display text-lg font-bold text-ink">98/100</p>
            <p className="text-[10px] font-medium text-slate-500">SEO Score</p>
          </div>
        </div>

        {/* Custom branded SEO strategy visual */}
        <div className="mt-5 overflow-hidden rounded-2xl border border-white/70 bg-white shadow-soft backdrop-blur">
          <Image
            src="/images/custom/service-seo.webp"
            alt="Webamazee SEO strategist reviewing search visibility and performance"
            width={1376}
            height={768}
            sizes="(max-width: 768px) 100vw, 560px"
            className="h-auto w-full"
          />
        </div>

        {/* floating cards */}
        <div className="relative mt-4 h-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute -left-2 -top-4 hidden animate-float sm:block"
          >
            <div className="glass-strong flex items-center gap-2 rounded-xl border border-white/70 px-3 py-2 shadow-lift">
              <Search className="h-3.5 w-3.5 text-brand-600" />
              <div>
                <p className="text-[10px] text-slate-400">AI Analysis</p>
                <p className="text-xs font-bold text-ink">Keywords found</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="absolute -right-2 -top-8 hidden animate-float-x sm:block"
          >
            <div className="glass-strong flex items-center gap-2 rounded-xl border border-white/70 px-3 py-2 shadow-lift">
              <Star className="h-3.5 w-3.5 text-amber-400 fill-current" />
              <div>
                <p className="text-[10px] text-slate-400">UX Review</p>
                <p className="text-xs font-bold text-ink">Score 94</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
