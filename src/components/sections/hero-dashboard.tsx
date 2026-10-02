"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TrendingUp, Sparkles, Target, ShieldCheck } from "lucide-react";

export function HeroDashboard() {
  return (
    <div className="relative mx-auto max-w-5xl">
      {/* rotating conic ring (decorative) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-2xl"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgba(30,136,255,0.12) 60deg, transparent 120deg, transparent 240deg, rgba(15,109,255,0.10) 300deg, transparent 360deg)",
          animation: "spin-slow 30s linear infinite",
        }}
      />

      {/* illustrative strategy workspace */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-3 shadow-lift-lg backdrop-blur-xl sm:p-5"
      >
        <div className="pointer-events-none absolute -inset-px rounded-3xl bg-brand-gradient opacity-5" />
        <div className="shimmer-line pointer-events-none absolute inset-x-0 top-0 h-px rounded-full bg-brand-300/60" />

        <div className="mb-3 flex flex-wrap items-center justify-between gap-3 px-1.5 sm:px-2">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600/10 text-brand-700 ring-1 ring-brand-600/10">
              <TrendingUp className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">Growth strategy</p>
              <p className="text-xs text-slate-400">Planning · delivery · measurement</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-slate-500 shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            Project overview
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-line bg-white">
          <Image
            src="/images/custom/hero-growth-studio.webp"
            alt="Illustrative digital strategy and analytics workspace"
            width={1376}
            height={768}
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="h-auto w-full"
          />
        </div>
      </motion.div>

      {/* focus: search foundations */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -left-4 top-24 hidden animate-float sm:block lg:-left-14"
      >
        <div className="glass-strong flex items-center gap-3 rounded-2xl border border-white/70 px-4 py-3 shadow-lift-lg">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-white shadow-soft ring-1 ring-line">
            <Target className="h-5 w-5 text-brand-600" />
          </span>
          <div>
            <p className="text-xs text-slate-500">Search visibility</p>
            <p className="text-sm font-bold text-ink">Intent-led SEO</p>
          </div>
        </div>
      </motion.div>

      {/* focus: AI with human review */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -right-4 top-6 hidden animate-float-x sm:block lg:-right-14"
      >
        <div className="glass-strong flex items-center gap-3 rounded-2xl border border-white/70 px-4 py-3 shadow-lift-lg">
          <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow">
            <Sparkles className="h-5 w-5" />
            <span className="absolute inset-0 animate-ring rounded-xl bg-brand-400/40" />
          </span>
          <div>
            <p className="text-xs text-slate-500">AI-assisted</p>
            <p className="text-sm font-bold text-ink">Human-reviewed work</p>
          </div>
        </div>
      </motion.div>

      {/* focus: project goals */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.45, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -bottom-5 right-8 hidden animate-float sm:flex lg:right-20"
      >
        <div className="glass-strong flex items-center gap-2 rounded-2xl border border-white/70 px-4 py-3 shadow-lift-lg">
          <ShieldCheck className="h-5 w-5 shrink-0 text-brand-600" />
          <div>
            <p className="text-sm font-semibold text-ink">Project-first</p>
            <p className="text-xs font-medium text-slate-500">Built around your goals</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
