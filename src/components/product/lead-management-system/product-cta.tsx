"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export function ProductCTA() {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="grain relative overflow-hidden rounded-[2rem] bg-brand-gradient p-8 shadow-glow-xl sm:p-12 lg:p-16"
        >
          <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl animate-aurora" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-brand-300/30 blur-3xl animate-aurora" style={{ animationDelay: "2s" }} />
          <div className="pointer-events-none absolute inset-0 grid-pattern opacity-10" />

          <div className="relative mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Early Access
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl text-balance">
              Turn More Leads Into Clients
            </h2>
            <p className="mt-4 text-lg text-white/85">
              Bring your agency's lead generation and sales workflow into one
              powerful workspace.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="group relative inline-flex h-14 items-center gap-2 overflow-hidden rounded-full bg-white px-8 text-base font-semibold text-brand-700 shadow-lift-lg transition-all duration-300 hover:shadow-lift"
              >
                <span aria-hidden className="absolute inset-y-0 left-0 w-1/3 bg-brand-100 blur-md [transform:translateX(-150%)] transition-transform duration-700 group-hover:[transform:translateX(400%)]" />
                <span className="relative">Get Early Access</span>
                <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-14 items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur transition-all duration-300 hover:bg-white/20"
              >
                Talk to Our Team
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/70">
              No obligation · Response within 24 hours
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
