"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Section } from "@/components/ui";
import { avgAiScoreStat, formatGlobalStat } from "@/lib/stats";

const steps = [
  {
    n: "01",
    title: "Understand intent",
    body: "We start with the questions your customers actually ask — not vanity keywords. Every strategy begins with a deep map of search intent, competitors and opportunity.",
    stat: "12k+",
    statLabel: "intent signals analysed",
  },
  {
    n: "02",
    title: "Engineer the build",
    body: "Premium design and engineering go hand in hand. We craft fast, accessible, beautiful experiences that search engines love and users trust at a glance.",
    stat: "< 1s",
    statLabel: "target load time",
  },
  {
    n: "03",
    title: "Optimise with AI",
    body: "Our AI layer maps topics, refines content and earns authority — then humans perfect the voice. The result is content that ranks and converts.",
    stat: formatGlobalStat(avgAiScoreStat),
    statLabel: "Avg. AI Score",
  },
  {
    n: "04",
    title: "Compound the growth",
    body: "We track, test and iterate relentlessly. Rankings build on each other until organic growth becomes your most reliable channel.",
    stat: "4.2×",
    statLabel: "average revenue growth",
  },
];

export function Storytelling() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const lineScale = useTransform(scrollYProgress, [0.05, 0.9], [0, 1]);

  return (
    <Section className="overflow-hidden bg-white">
      <div ref={ref} className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/15 bg-brand-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
              <Sparkles className="h-3.5 w-3.5" /> The Method
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl text-balance">
              A system that turns clicks into{" "}
              <span className="text-gradient">compounding growth</span>
            </h2>
          </div>
        </div>

        <div className="relative">
          {/* progress line */}
          <div className="absolute left-4 top-0 h-full w-px bg-line sm:left-5">
            <motion.div
              className="h-full w-full origin-top bg-brand-gradient"
              style={{ scaleY: lineScale }}
            />
          </div>

          <div className="space-y-16">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-14 sm:pl-20"
              >
                {/* node */}
                <div className="absolute left-4 top-1 -translate-x-1/2 sm:left-5">
                  <span className="relative grid h-8 w-8 place-items-center rounded-full border border-brand-600/20 bg-white text-brand-700 shadow-soft">
                    <span className="font-display text-xs font-bold">{s.n}</span>
                  </span>
                </div>

                <div className="grid items-center gap-6 lg:grid-cols-5">
                  <div className="lg:col-span-3">
                    <h3 className="font-display text-2xl font-bold text-ink">{s.title}</h3>
                    <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-500 text-pretty">
                      {s.body}
                    </p>
                  </div>
                  <div className="lg:col-span-2 lg:text-right">
                    <div className="inline-flex flex-col rounded-2xl border border-line bg-surface/60 px-6 py-4 shadow-soft">
                      <span className="text-gradient font-display text-4xl font-bold">
                        {s.stat}
                      </span>
                      <span className="text-sm text-slate-500">{s.statLabel}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
