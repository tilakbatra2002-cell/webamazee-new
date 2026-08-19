"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Boxes } from "lucide-react";
import { Eyebrow } from "./eyebrow";
import { staggerContainer, staggerItem } from "./reveal";
import { SpotlightCard } from "./spotlight-card";

export function SectionHeader({
  eyebrow,
  title,
  highlight,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <div className="mb-5">
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] text-balance">
        {title}
        {highlight && (
          <>
            {" "}
            <span className="text-gradient">{highlight}</span>
          </>
        )}
      </h2>
      {subtitle && (
        <p className="mt-5 text-base leading-relaxed text-slate-500 sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function BenefitsGrid({
  benefits,
  bg = "bg-white",
}: {
  benefits: { title: string; desc: string }[];
  bg?: string;
}) {
  return (
    <div className={bg}>
      <div className="mx-auto max-w-[1350px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {benefits.map((b) => (
            <motion.div key={b.title} variants={staggerItem} className="h-full">
              <SpotlightCard className="h-full rounded-3xl">
                <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-600/20 hover:shadow-glow-lg">
                  <span className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-400/0 blur-2xl transition-all duration-500 group-hover:bg-brand-400/25" />
                  <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <BadgeCheck className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-base font-bold text-ink">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{b.desc}</p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export function ProcessSteps({
  steps,
  bg = "bg-surface",
}: {
  steps: { step: string; title: string; desc: string }[];
  bg?: string;
}) {
  return (
    <div className={bg}>
      <div className="mx-auto max-w-[1350px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="relative mt-4 grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent lg:block" />
          {steps.map((s) => (
            <motion.div key={s.step} variants={staggerItem} className="relative text-center lg:text-left">
              <div className="relative z-10 mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl border border-brand-600/15 bg-white text-brand-700 shadow-soft transition-all duration-300 hover:bg-brand-gradient hover:text-white hover:shadow-glow lg:mx-0">
                <span className="font-display text-lg font-bold">{s.step}</span>
              </div>
              <h3 className="font-display text-lg font-bold text-ink">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-slate-500 lg:mx-0">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export function FeatureGrid({
  features,
  bg = "bg-white",
}: {
  features: { title: string; desc: string }[];
  bg?: string;
}) {
  return (
    <div className={bg}>
      <div className="mx-auto max-w-[1350px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((f) => (
            <motion.div key={f.title} variants={staggerItem} className="h-full">
              <SpotlightCard className="h-full rounded-3xl">
                <div className="group flex h-full items-start gap-4 rounded-3xl border border-line bg-surface/50 p-6 shadow-soft transition-all duration-300 hover:border-brand-600/20 hover:bg-white hover:shadow-glow">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white">
                    <Boxes className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-ink">{f.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{f.desc}</p>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
