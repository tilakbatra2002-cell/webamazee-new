"use client";

import { motion } from "framer-motion";
import { Sparkles, Check } from "lucide-react";
import { Button } from "../ui/button";
import { Words } from "../ui/text-reveal";
import { HeroDashboard } from "./hero-dashboard";
import { clientsServedStat, formatGlobalStat } from "@/lib/stats";

const particles = [
  { x: "12%", y: "20%", s: 5, d: 0 },
  { x: "85%", y: "15%", s: 4, d: 1.2 },
  { x: "70%", y: "38%", s: 3, d: 0.6 },
  { x: "20%", y: "55%", s: 4, d: 1.8 },
  { x: "92%", y: "60%", s: 3, d: 0.9 },
  { x: "38%", y: "12%", s: 3, d: 2.2 },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-12 pt-32 sm:pb-16 sm:pt-40">
      {/* background */}
      <div className="pointer-events-none absolute inset-0 grid-pattern [mask-image:radial-gradient(60%_55%_at_50%_0%,black,transparent)]" />
      {/* aurora blobs */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[36rem] w-[44rem] -translate-x-1/2 rounded-full bg-hero-glow blur-2xl" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-24 h-96 w-96 rounded-full bg-brand-400/12 blur-3xl animate-aurora"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-40 h-[26rem] w-[26rem] rounded-full bg-brand-600/10 blur-3xl animate-aurora"
        style={{ animationDelay: "2s" }}
      />

      {/* particles */}
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute rounded-full bg-brand-500/40 blur-[1px]"
          style={{ left: p.x, top: p.y, width: p.s, height: p.s }}
          animate={{ y: [0, -18, 0], opacity: [0.15, 0.6, 0.15] }}
          transition={{ duration: 6, delay: p.d, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="relative mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* AI badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 flex justify-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/15 bg-white/80 px-4 py-2 text-sm font-medium text-brand-700 shadow-soft backdrop-blur-sm">
              <span className="relative grid h-5 w-5 place-items-center rounded-full bg-brand-gradient">
                <Sparkles className="h-3 w-3 text-white" />
                <span className="absolute inset-0 animate-ping rounded-full bg-brand-500/30" />
              </span>
              AI-Powered Digital Marketing Company
              <span className="ml-1 hidden rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-700 sm:inline">
                Trusted by {formatGlobalStat(clientsServedStat)} clients
              </span>
            </span>
          </motion.div>

          {/* Headline */}
          <Words
            as="h1"
            text="Grow your brand with AI-powered marketing that ranks."
            className="font-display text-[2.6rem] font-bold leading-[1.04] tracking-tight text-ink sm:text-6xl lg:text-[4.4rem] text-balance"
            delay={0.15}
            stagger={0.045}
          />
          <span className="mt-2 inline-block">
            <Words
              as="span"
              text="We build, optimise & rank."
              className="text-gradient font-display text-[2.6rem] font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.4rem] text-balance"
              delay={0.9}
              stagger={0.045}
            />
          </span>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-slate-500 text-pretty sm:text-xl"
          >
            Webamazee blends website development, AI SEO and data-driven
            strategy to turn clicks into customers — for businesses around
            the world.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button size="lg" href="/contact" withArrow>
              Start Your Project
            </Button>
            <Button size="lg" variant="secondary" href="/services">
              Explore Services
            </Button>
          </motion.div>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
          >
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 font-semibold text-success">
                <Check className="h-3.5 w-3.5" /> Serving businesses worldwide
              </span>
              <span>Websites live &amp; ranking on Google</span>
            </div>
          </motion.div>
        </div>

        {/* Dashboard */}
        <div className="mt-16 sm:mt-20">
          <HeroDashboard />
        </div>

        {/* scroll cue */}
        <div className="mt-14 flex flex-col items-center gap-2 text-slate-400">
          <span className="text-[11px] font-medium uppercase tracking-[0.2em]">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-9 w-6 items-start justify-center rounded-full border border-line bg-white p-1 shadow-soft"
          >
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-brand-600"
              animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
