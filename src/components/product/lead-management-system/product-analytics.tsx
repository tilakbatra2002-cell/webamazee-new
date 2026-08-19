"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/sections-blocks";
import {
  Users, BadgeCheck, TrendingUp, Radio, LineChart, DollarSign,
} from "lucide-react";

function AreaChart() {
  return (
    <svg viewBox="0 0 300 110" className="h-full w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="prodArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E88FF" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#1E88FF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 96 C 30 88, 50 60, 78 66 C 106 72, 124 40, 152 48 C 180 56, 200 24, 230 30 C 250 34, 275 16, 300 14 L300 110 L0 110 Z" fill="url(#prodArea)" />
      <path d="M0 96 C 30 88, 50 60, 78 66 C 106 72, 124 40, 152 48 C 180 56, 200 24, 230 30 C 250 34, 275 16, 300 14" fill="none" stroke="#1E88FF" strokeWidth="3" strokeLinecap="round" />
      <circle cx="300" cy="14" r="4" fill="#fff" stroke="#1E88FF" strokeWidth="2.5" />
    </svg>
  );
}

function Bars() {
  const h = [40, 55, 46, 68, 60, 82, 74];
  return (
    <div className="flex h-20 items-end gap-1.5">
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

const stats = [
  { icon: Users, label: "Leads Generated", value: "1,248" },
  { icon: BadgeCheck, label: "Qualified Leads", value: "640" },
  { icon: TrendingUp, label: "Conversion Rate", value: "5.2%" },
  { icon: Radio, label: "Lead Sources", value: "8" },
  { icon: LineChart, label: "Monthly Growth", value: "+32%" },
  { icon: DollarSign, label: "Pipeline Value", value: "$84k" },
];

export function ProductAnalytics() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Analytics"
          title="Measure What"
          highlight="Matters"
          subtitle="Dashboards and reports that show real agency performance."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* chart card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-line bg-surface/50 p-6 shadow-soft"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-500">Lead Growth</p>
              <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-xs font-semibold text-success">
                <TrendingUp className="h-3 w-3" /> +148%
              </span>
            </div>
            <div className="h-44 w-full"><AreaChart /></div>
            <div className="mt-2 flex justify-between text-[10px] text-slate-400">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            </div>
          </motion.div>

          {/* sources card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-line bg-surface/50 p-6 shadow-soft"
          >
            <p className="text-sm font-semibold text-slate-500">Lead Sources</p>
            <div className="mt-3"><Bars /></div>
            <div className="mt-2 flex justify-between text-[10px] text-slate-400">
              <span>SEO</span><span>Web</span><span>AI SEO</span><span>E-com</span><span>Local</span><span>Ads</span><span>Referral</span>
            </div>
          </motion.div>
        </div>

        {/* stat cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-4 rounded-3xl border border-line bg-surface/40 p-5 shadow-soft transition-all duration-300 hover:border-brand-600/20 hover:shadow-glow">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700">
                <s.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-xl font-bold text-ink">{s.value}</p>
                <p className="text-sm text-slate-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
