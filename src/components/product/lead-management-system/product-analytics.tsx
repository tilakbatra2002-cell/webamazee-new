"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/sections-blocks";
import {
  Users, BadgeCheck, TrendingUp, Radio, LineChart, DollarSign,
} from "lucide-react";

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
            <div className="relative h-44 w-full overflow-hidden rounded-2xl border border-line bg-white">
              <Image
                src="/images/custom/product-analytics-studio.webp"
                alt="Webamazee lead intelligence studio with connected growth signals"
                fill
                sizes="(max-width: 1024px) 100vw, 620px"
                className="object-cover object-bottom"
              />
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
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-500">Lead Sources</p>
              <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-700">Live mix</span>
            </div>
            <div className="relative mt-3 h-44 overflow-hidden rounded-2xl border border-line bg-white">
              <Image
                src="/images/custom/hero-growth-studio.webp"
                alt="Webamazee growth studio showing multiple lead source signals"
                fill
                sizes="(max-width: 1024px) 100vw, 620px"
                className="object-cover object-top"
              />
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
