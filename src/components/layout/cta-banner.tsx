"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export function CTABanner({
  title = "Ready to grow with AI-powered marketing?",
  subtitle = "Tell us about your business and we'll reply with a personalised roadmap — free, no strings attached.",
  cta = "Get Your Free Website Audit",
}: {
  title?: string;
  subtitle?: string;
  cta?: string;
}) {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="grain relative overflow-hidden rounded-[2rem] bg-brand-gradient p-8 shadow-glow-lg sm:p-12 lg:p-14"
        >
          <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl animate-aurora" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-brand-300/30 blur-3xl animate-aurora" style={{ animationDelay: "2s" }} />
          <div className="pointer-events-none absolute inset-0 grid-pattern opacity-10" />
          <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-white/20 blur-3xl" />

          <div className="relative flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> Free 30 minute Strategy Call
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:text-4xl text-balance">
                {title}
              </h2>
              <p className="mt-4 text-white/80">{subtitle}</p>
              <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 lg:justify-start">
                {[
                  "Free personalised roadmap",
                  "Reply within 24 hours",
                  "No lock in",
                ].map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-2 text-sm text-white/90"
                  >
                    <CheckCircle2 className="h-4 w-4 text-white" /> {t}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/contact"
              className="group relative inline-flex h-14 shrink-0 items-center gap-2 overflow-hidden rounded-full bg-white px-8 text-base font-semibold text-brand-700 shadow-lift-lg transition-all duration-300 hover:shadow-lift hover:brightness-105"
            >
              <span aria-hidden className="absolute inset-y-0 left-0 w-1/3 bg-brand-50 blur-md [transform:translateX(-150%)] transition-transform duration-700 group-hover:[transform:translateX(400%)]" />
              <span className="relative">{cta}</span>
              <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
