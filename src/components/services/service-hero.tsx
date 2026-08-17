"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, Sparkles, Star } from "lucide-react";
import { Breadcrumb } from "../layout/breadcrumb";
import { Words } from "../ui/text-reveal";
import { Button } from "../ui/button";
import { ServiceIcon } from "./service-icon";

export function ServiceHero({
  icon,
  keyword,
  eyebrow,
  title,
  highlight,
  subtitle,
  trust,
  stats,
  crumbLabel,
}: {
  icon: string;
  keyword: string;
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle: string;
  trust: string[];
  stats: { value: string; label: string }[];
  crumbLabel: string;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pt-36">
      <div className="pointer-events-none absolute inset-0 grid-pattern [mask-image:radial-gradient(55%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[32rem] w-[42rem] -translate-x-1/2 rounded-full bg-hero-glow blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -left-32 top-16 h-80 w-80 rounded-full bg-brand-400/10 blur-3xl animate-aurora" />

      <div className="relative mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Breadcrumb crumbs={[{ label: "Services", href: "/services" }, { label: crumbLabel }]} />
        </motion.div>

        <div className="mt-10 grid items-center gap-12 lg:grid-cols-2">
          {/* Left copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/15 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700 shadow-soft backdrop-blur-sm">
                <ServiceIcon name={icon} className="h-3.5 w-3.5" /> {eyebrow}
              </span>
            </motion.div>

            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem] text-balance">
              <Words text={title} as="span" stagger={0.04} />{" "}
              <span className="text-gradient">
                <Words text={highlight} as="span" stagger={0.04} delay={0.35} />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-slate-500 text-pretty"
            >
              {subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <Button size="lg" href="/contact" withArrow>
                Get a Free Audit
              </Button>
              <Button size="lg" variant="secondary" href="/contact">
                Book a Consultation
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2"
            >
              {trust.map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 text-sm text-slate-500">
                  <CheckCircle2 className="h-4 w-4 text-success" /> {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right illustration */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="pointer-events-none absolute -inset-6 rounded-full bg-brand-200/20 blur-3xl" />
            <div className="relative rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-lift-lg backdrop-blur-xl">
              {/* top stat row */}
              <div className="mb-6 grid grid-cols-3 gap-3">
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 + i * 0.12 }}
                    className="rounded-2xl border border-line bg-surface/60 p-4 text-center"
                  >
                    <p className="text-gradient font-display text-2xl font-bold">{s.value}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{s.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Real dashboard image */}
              <div className="overflow-hidden rounded-2xl border border-line bg-white">
                <Image
                  src="/images/services/audit-dashboard.webp"
                  alt="Webamazee website audit and SEO analytics dashboard"
                  width={1600}
                  height={900}
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className="h-auto w-full"
                />
              </div>

              {/* floating rating badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 }}
                className="absolute -right-3 -top-4 animate-float"
              >
                <div className="glass-strong flex items-center gap-2 rounded-2xl border border-white/70 px-4 py-2.5 shadow-lift-lg">
                  <span className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </span>
                  <span className="text-sm font-semibold text-ink">4.9</span>
                </div>
              </motion.div>

              {/* floating AI badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.65 }}
                className="absolute -left-4 bottom-24 hidden animate-float-x sm:block"
              >
                <div className="glass-strong flex items-center gap-2 rounded-2xl border border-white/70 px-4 py-2.5 shadow-lift-lg">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs text-slate-500">AI Optimised</p>
                    <p className="text-sm font-bold text-ink">98 / 100</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
