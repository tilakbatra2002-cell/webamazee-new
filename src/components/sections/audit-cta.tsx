"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, SearchCheck } from "lucide-react";
import { useSeoAudit } from "@/components/seo-audit/seo-audit-provider";

export function AuditCta() {
  const { openAudit } = useSeoAudit();

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2rem] border border-line bg-surface p-8 shadow-soft sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-400/15 blur-3xl" />
          <div className="relative max-w-xl">
            <h2 className="font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
              How healthy is your website?
            </h2>
            <p className="mt-3 text-slate-500">
              Find the SEO, performance and technical issues holding your website back.
            </p>
          </div>
          <div className="relative mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center lg:mt-0">
            <button
              type="button"
              onClick={() => openAudit()}
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-brand-gradient px-6 text-sm font-semibold text-white shadow-glow transition-all hover:shadow-glow-lg"
            >
              <SearchCheck className="h-4 w-4" />
              Get My Free SEO Audit
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <Link href="/free-seo-audit" className="text-sm font-semibold text-brand-700 hover:underline">
              See how it works
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
