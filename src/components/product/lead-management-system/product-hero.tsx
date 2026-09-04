"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Words } from "@/components/ui/text-reveal";

export function ProductHero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pt-36">
      <div className="pointer-events-none absolute inset-0 grid-pattern [mask-image:radial-gradient(55%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[32rem] w-[42rem] -translate-x-1/2 rounded-full bg-hero-glow blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -left-32 top-16 h-80 w-80 rounded-full bg-brand-400/10 blur-3xl animate-aurora" />

      <div className="relative mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left copy */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-brand-600/15 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700 shadow-soft backdrop-blur-sm"
            >
              <Sparkles className="h-3.5 w-3.5" /> Webamazee Product
            </motion.span>

            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem] text-balance">
              <Words text="Lead Management System" as="span" stagger={0.04} />{" "}
              <span className="text-gradient">
                <Words text="Built for Digital Marketing Agencies" as="span" stagger={0.04} delay={0.35} />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-slate-500 text-pretty"
            >
              Capture, organize, qualify, follow up, and convert your leads from
              one powerful workspace built specifically for modern digital
              marketing agencies.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <Button size="lg" href="/contact" withArrow>
                Get Early Access
              </Button>
              <Button size="lg" variant="secondary" href="#features">
                Explore Features
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2"
            >
              {["Early Access", "Agency-focused CRM", "Cloud workspace"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 text-sm text-slate-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500" /> {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — product dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="pointer-events-none absolute -inset-6 rounded-full bg-brand-200/20 blur-3xl" />
            <div className="relative rounded-[1.75rem] bg-gradient-to-br from-brand-400/60 via-brand-100/40 to-brand-300/50 p-px shadow-lift-lg">
              <div className="relative overflow-hidden rounded-[calc(1.75rem-1px)] bg-white/90 p-5 backdrop-blur-xl sm:p-6">
                <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-200/30 blur-3xl" />

                <div className="relative overflow-hidden rounded-2xl border border-line bg-white">
                  <Image
                    src="/images/custom/product-lead-workspace.webp"
                    alt="Webamazee lead management workspace on a laptop"
                    width={1376}
                    height={768}
                    sizes="(max-width: 1024px) 100vw, 620px"
                    className="h-auto w-full"
                  />
                </div>
              </div>
            </div>

            {/* floating card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute -right-3 -top-4 hidden animate-float sm:block"
            >
              <div className="glass-strong flex items-center gap-2 rounded-2xl border border-white/70 px-3.5 py-2.5 shadow-lift">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-success/10 text-success">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[10px] text-slate-400">Conversion</p>
                  <p className="text-sm font-bold text-ink">+32% MoM</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
