"use client";

import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { SectionHeader } from "@/components/ui/sections-blocks";
import { staggerContainer, staggerItem } from "@/components/ui/reveal";
import {
  AlertTriangle, CalendarX, SearchX, GitBranch, EyeOff, Wrench, LineChart,
} from "lucide-react";

const problems = [
  { icon: GitBranch, title: "Leads scattered across tools", desc: "Contact info lives in email, chat, spreadsheets and forms — nowhere you can see the full picture." },
  { icon: CalendarX, title: "Missed follow-ups", desc: "Hot leads go cold because no one knows who needs a follow-up or when." },
  { icon: SearchX, title: "Difficult lead tracking", desc: "No single view of where each lead is, what they need, or what's been discussed." },
  { icon: EyeOff, title: "No clear sales pipeline", desc: "You can't see what's coming in, what's moving, and what's stuck." },
  { icon: Wrench, title: "Poor source visibility", desc: "You don't know which marketing channel actually generates the best leads." },
  { icon: LineChart, title: "Manual lead management", desc: "Copy-pasting, spreadsheets and sticky notes waste hours every week." },
  { icon: AlertTriangle, title: "Hard to measure conversion", desc: "Without structured tracking, proving marketing ROI is guesswork." },
];

export function ProductProblem() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="The Problem"
          title="Your Leads Shouldn't Be"
          highlight="Lost Across Tools"
          subtitle="Every disconnected tool and manual step costs your agency time, revenue, and trust."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {problems.map((p) => (
            <motion.div key={p.title} variants={staggerItem} className="h-full">
              <SpotlightCard className="h-full rounded-3xl">
                <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-600/20 hover:shadow-glow-lg">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{p.desc}</p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
