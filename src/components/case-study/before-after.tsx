"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ImageOff } from "lucide-react";
import { ImageComparisonSlider } from "./image-comparison-slider";
import { BeforeMockView, AfterMockView } from "./before-after-mockups";
import { SpotlightCard } from "../ui/spotlight-card";
import { staggerContainer, staggerItem } from "../ui/reveal";
import type { CaseStudy } from "@/lib/case-studies";

const ease = [0.22, 1, 0.36, 1] as const;

export function BeforeAfterSection({ cs }: { cs: CaseStudy }) {
  const items = cs.beforeAfter ?? [];
  if (items.length === 0) return null;

  return (
    <section id="before-after" className="scroll-mt-24 bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/15 bg-brand-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
            <ArrowRight className="h-3.5 w-3.5" /> Before &amp; After
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] text-balance">
            Before &amp; After <span className="text-gradient">Transformation</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-500 sm:text-lg">
            See how thoughtful design, performance optimization and strategic
            improvements transformed this website. Drag the handle to compare.
          </p>
          <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-400">
            <ImageOff className="h-3.5 w-3.5" /> Stylised previews for illustration
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2"
        >
          {items.map((item, i) => (
            <motion.div key={i} variants={staggerItem} className="h-full">
              <SpotlightCard className="h-full rounded-3xl">
                <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-3 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-600/20 hover:shadow-glow-lg">
                  <ImageComparisonSlider
                    before={<BeforeMockView variant={item.variant} />}
                    after={<AfterMockView variant={item.variant} />}
                    className="border border-line"
                    aspectRatio={item.aspect ?? "16 / 10"}
                  />

                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-lg font-bold text-ink">
                        {item.title}
                      </h3>
                      {item.improvementTag && (
                        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-700">
                          <CheckCircle2 className="h-3 w-3" /> {item.improvementTag}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
