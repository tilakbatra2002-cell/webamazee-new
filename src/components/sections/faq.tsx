"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessageCircleQuestion, ArrowUpRight, TrendingUp } from "lucide-react";
import { Section } from "@/components/ui";
import { Eyebrow } from "../ui/eyebrow";
import { Reveal } from "../ui/reveal";
import { FaqDashboard } from "./faq-dashboard";
import { homeFaqs } from "@/lib/faqs";

function FaqAccordion({ open, setOpen }: { open: number | null; setOpen: (i: number | null) => void }) {
  return (
    <div className="space-y-3.5">
      {homeFaqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={f.q}
            className={`overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
              isOpen
                ? "border-brand-600/30 bg-white shadow-glow"
                : "border-line bg-white/70 shadow-soft hover:border-brand-600/20 hover:shadow-soft hover:-translate-y-0.5"
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className={`text-[17px] leading-snug font-semibold transition-colors ${isOpen ? "text-brand-700" : "text-ink"}`}>
                {f.q}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors ${
                  isOpen ? "bg-brand-gradient text-white shadow-glow" : "bg-surface text-slate-500"
                }`}
              >
                <Plus className="h-4 w-4" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="px-6 pb-5 text-[15px] leading-relaxed text-slate-500">
                    {f.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/** Compact premium analytics card shown on mobile (replaces the dashboard). */
function FaqCompact() {
  return (
    <div className="mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-50 to-white p-4 shadow-soft ring-1 ring-brand-100">
      <div className="flex items-center justify-between gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow">
          <TrendingUp className="h-4 w-4" />
        </span>
        <p className="font-display text-base font-bold text-ink">AI Growth Dashboard</p>
        <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-semibold text-success">
          +148% traffic
        </span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-xl bg-white/80 p-2 shadow-soft">
          <p className="text-sm font-bold text-brand-700">#1</p>
          <p className="text-[11px] text-slate-500">Ranking</p>
        </div>
        <div className="rounded-xl bg-white/80 p-2 shadow-soft">
          <p className="text-sm font-bold text-brand-700">92</p>
          <p className="text-[11px] text-slate-500">SEO Score</p>
        </div>
        <div className="rounded-xl bg-white/80 p-2 shadow-soft">
          <p className="text-sm font-bold text-brand-700">98</p>
          <p className="text-[11px] text-slate-500">Perf.</p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" className="bg-surface">
      <div className="grid gap-10 lg:grid-cols-[42fr_58fr] lg:items-center">
        {/* LEFT — illustration (desktop) */}
        <div className="order-1 lg:order-1">
          <div className="hidden lg:block">
            <Reveal>
              <FaqDashboard />
            </Reveal>
          </div>
          {/* compact card on mobile */}
          <div className="lg:hidden">
            <Reveal><FaqCompact /></Reveal>
          </div>
        </div>

        {/* RIGHT — FAQ */}
        <div className="order-2 lg:order-2">
          <Reveal>
            <Eyebrow>
              <MessageCircleQuestion className="h-3.5 w-3.5" /> Frequently Asked Questions
            </Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] text-balance">
              Everything You Need <span className="text-gradient">to Know</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg">
              Have questions about our web development, SEO, AI marketing, or
              digital growth services? Find quick answers below.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-8">
            <FaqAccordion open={open} setOpen={setOpen} />
          </Reveal>

          <Reveal className="mt-8">
            <Link
              href="/faq"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:underline"
            >
              View all frequently asked questions
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
