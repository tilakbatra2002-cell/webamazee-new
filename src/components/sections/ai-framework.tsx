"use client";

import { motion } from "framer-motion";
import {
  Database,
  Sparkles,
  FileText,
  TrendingUp,
  ArrowDown,
  Bot,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui";
import { Eyebrow } from "../ui/eyebrow";
import { staggerContainer, staggerItem } from "../ui/reveal";

const layers = [
  {
    icon: Database,
    title: "1 · Data & Intent",
    desc: "We mine search intent, competitor data and your analytics.",
    tint: "from-brand-50 to-brand-100/40",
  },
  {
    icon: Bot,
    title: "2 · AI Optimisation",
    desc: "AI models map topics, entities and opportunities for you.",
    tint: "from-brand-100 to-brand-200/40",
  },
  {
    icon: FileText,
    title: "3 · Content & Build",
    desc: "Expert-reviewed content and technical pages go live.",
    tint: "from-brand-200 to-brand-300/40",
  },
  {
    icon: TrendingUp,
    title: "4 · Rank & Scale",
    desc: "Continuous tracking compounds your Google positions.",
    tint: "from-brand-300 to-brand-400/40",
  },
];

export function AIFramework() {
  return (
    <Section id="framework" className="overflow-hidden bg-gradient-to-b from-surface to-white">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow={
              <Eyebrow>
                <Sparkles className="h-3.5 w-3.5" /> AI Marketing Framework
              </Eyebrow>
            }
            title="The AI engine behind"
            highlight="every ranking"
            subtitle="Most agencies use AI as a buzzword. We use it as a system — a repeatable framework that compounds results month after month."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-8 space-y-4"
          >
            {layers.map((l) => (
              <motion.div
                key={l.title}
                variants={staggerItem}
                className="group flex items-start gap-4 rounded-2xl border border-line bg-white p-4 shadow-soft transition-all duration-300 hover:border-brand-600/25 hover:shadow-glow"
              >
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${l.tint} text-brand-700 transition-transform duration-300 group-hover:scale-110`}>
                  <l.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-ink">{l.title}</h3>
                  <p className="text-sm text-slate-500">{l.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* framework visual */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="pointer-events-none absolute inset-0 grid-pattern opacity-60 [mask-image:radial-gradient(70%_70%_at_50%_50%,black,transparent)]" />
          <div className="relative rounded-[2rem] border border-white/60 bg-white/70 p-6 shadow-lift backdrop-blur-xl sm:p-8">
            <div className="mb-6 flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display font-bold text-ink">Webamazee AI Engine</p>
                <p className="text-xs text-slate-400">Ranking growth pipeline</p>
              </div>
            </div>

            <div className="relative flex flex-col gap-0">
              {layers.map((l, i) => (
                <div key={l.title}>
                  <div className="relative z-10 flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-soft">
                    <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${l.tint} text-brand-700`}>
                      <l.icon className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="font-semibold text-ink">{l.title}</p>
                      <p className="text-xs text-slate-500">{l.desc}</p>
                    </div>
                  </div>
                  {i < layers.length - 1 && (
                    <div className="relative z-0 my-1 flex justify-center">
                      <motion.span
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.3 }}
                        className="grid h-8 w-8 place-items-center rounded-full bg-brand-100 text-brand-700"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </motion.span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
