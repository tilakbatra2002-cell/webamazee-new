"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/sections-blocks";
import { Flame, ShieldCheck, Clock, Snowflake, Sparkles } from "lucide-react";

const scoreTiers = [
  { icon: Flame, label: "Hot Lead", score: "80–100", color: "text-rose-600", bar: "bg-rose-500", w: "w-full" },
  { icon: Sparkles, label: "High Intent", score: "60–79", color: "text-amber-600", bar: "bg-amber-500", w: "w-3/4" },
  { icon: ShieldCheck, label: "Qualified", score: "40–59", color: "text-brand-600", bar: "bg-brand-500", w: "w-1/2" },
  { icon: Clock, label: "Needs Follow-up", score: "20–39", color: "text-slate-600", bar: "bg-slate-400", w: "w-1/3" },
  { icon: Snowflake, label: "Cold", score: "0–19", color: "text-slate-400", bar: "bg-slate-300", w: "w-1/4" },
];

export function ProductLeadIntelligence() {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Lead Intelligence"
          title="Know Which Leads Deserve"
          highlight="Your Attention"
          subtitle="AI-assisted scoring tells your team exactly where to focus next."
        />

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {scoreTiers.map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl border border-line bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
            >
              <span className={`grid h-10 w-10 place-items-center rounded-xl bg-surface ${t.color}`}>
                <t.icon className="h-5 w-5" />
              </span>
              <p className={`mt-3 font-display text-base font-bold ${t.color}`}>{t.label}</p>
              <p className="text-xs text-slate-400">Score {t.score}</p>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-surface">
                <div className={`h-full rounded-full ${t.bar} ${t.w}`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
