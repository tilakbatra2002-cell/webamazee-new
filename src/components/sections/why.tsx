"use client";

import { motion } from "framer-motion";
import {
  Rocket,
  LineChart,
  ShieldCheck,
  Globe2,
  Headphones,
  Scale,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui";
import { Eyebrow } from "../ui/eyebrow";
import { staggerContainer, staggerItem } from "../ui/reveal";
import { SpotlightCard } from "../ui/spotlight-card";

const reasons = [
  {
    icon: Rocket,
    title: "AI-first strategy",
    desc: "Every campaign is accelerated by proprietary AI workflows and human expertise.",
  },
  {
    icon: LineChart,
    title: "Measurable results",
    desc: "Transparent reporting on rankings, traffic and revenue — not vanity metrics.",
  },
  {
    icon: ShieldCheck,
    title: "White-hat only",
    desc: "Ethical, Google-safe tactics that protect and compound your rankings long-term.",
  },
  {
    icon: Globe2,
    title: "Global specialists",
    desc: "Global market fluency with strategies that work anywhere.",
  },
  {
    icon: Scale,
    title: "Transparent pricing",
    desc: "Clear proposals, no lock-ins, and a partnership built on outcomes.",
  },
  {
    icon: Headphones,
    title: "Dedicated team",
    desc: "A responsive team of strategists, developers and SEO experts on your side.",
  },
];

export function Why() {
  return (
    <Section id="why" className="bg-surface">
      <SectionHeading
        eyebrow={
          <Eyebrow>
            <ShieldCheck className="h-3.5 w-3.5" /> Why Webamazee
          </Eyebrow>
        }
        title="A partner built for"
        highlight="growth"
        subtitle="We combine premium design, engineering and AI-driven SEO into one accountable team — so you grow faster, smarter and more sustainably."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {reasons.map((r) => (
          <motion.div key={r.title} variants={staggerItem} className="h-full">
            <SpotlightCard className="h-full rounded-3xl">
              <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-600/20 hover:shadow-glow-lg">
                <span className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-400/0 blur-2xl transition-all duration-500 group-hover:bg-brand-400/25" />
                <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  <r.icon className="h-6 w-6" />
                </span>
                <h3 className="font-display text-lg font-bold text-ink">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{r.desc}</p>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
