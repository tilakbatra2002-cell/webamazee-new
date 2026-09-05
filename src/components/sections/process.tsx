"use client";

import { motion } from "framer-motion";
import { Search, PencilRuler, Wand2, TrendingUp } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui";
import { Eyebrow } from "../ui/eyebrow";
import { staggerContainer, staggerItem } from "../ui/reveal";
import { SpotlightCard } from "../ui/spotlight-card";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Discover",
    desc: "We audit your market, competitors and current performance to find the highest-leverage opportunities.",
  },
  {
    icon: PencilRuler,
    step: "02",
    title: "Design & Build",
    desc: "We craft a premium, conversion-focused experience — engineered for speed, SEO and clarity.",
  },
  {
    icon: Wand2,
    step: "03",
    title: "Optimise",
    desc: "AI-powered SEO, technical fixes and content put your pages in front of buyers on Google.",
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Grow & Iterate",
    desc: "We track, test and refine continuously to compound rankings, traffic and revenue.",
  },
];

export function Process() {
  return (
    <Section id="process" className="bg-white py-16 sm:py-20">
      <SectionHeading
        eyebrow={
          <Eyebrow>
            <Wand2 className="h-3.5 w-3.5" /> Our Process
          </Eyebrow>
        }
        title="A proven path from"
        highlight="brief to growth"
        subtitle="No guesswork. A transparent, four-step system refined across hundreds of launches."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
      >
        {/* connecting line (desktop) */}
        <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent lg:block" />

        {steps.map((s) => (
          <motion.div
            key={s.step}
            variants={staggerItem}
            className="relative text-center lg:text-left"
          >
            <SpotlightCard className="rounded-3xl">
              <div className="relative z-10 mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl border border-brand-600/15 bg-white text-brand-700 shadow-soft transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white group-hover:shadow-glow lg:mx-0">
                <s.icon className="h-7 w-7" />
              </div>
            </SpotlightCard>
            <span className="font-display text-xs font-bold tracking-[0.25em] text-brand-600">
              {s.step}
            </span>
            <h3 className="mt-2 font-display text-xl font-bold text-ink">{s.title}</h3>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-slate-500 lg:mx-0">
              {s.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
