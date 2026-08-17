"use client";

import { motion } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Words } from "../ui/text-reveal";
import { Breadcrumb } from "./breadcrumb";

export function PageHero({
  eyebrow,
  title,
  highlight,
  subtitle,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  crumbs: { label: string; href?: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pt-36">
      <div className="pointer-events-none absolute inset-0 grid-pattern [mask-image:radial-gradient(55%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[32rem] w-[42rem] -translate-x-1/2 rounded-full bg-hero-glow blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -left-32 top-16 h-80 w-80 rounded-full bg-brand-400/10 blur-3xl animate-aurora" />
      <div aria-hidden className="pointer-events-none absolute -right-24 top-28 h-72 w-72 rounded-full bg-brand-600/8 blur-3xl animate-aurora" style={{ animationDelay: "2s" }} />

      <div className="relative mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Breadcrumb crumbs={crumbs} />
        </motion.div>

        <div className="mx-auto mt-8 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/20 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700 shadow-soft backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              {eyebrow}
            </span>
          </motion.div>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl text-balance">
            {highlight ? (
              <>
                <Words text={title} as="span" stagger={0.04} />{" "}
                <span className="text-gradient">
                  <Words text={highlight} as="span" stagger={0.04} delay={0.3} />
                </span>
              </>
            ) : (
              <Words text={title} as="span" stagger={0.04} />
            )}
          </h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-500"
            >
              {subtitle}
            </motion.p>
          )}

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8"
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
