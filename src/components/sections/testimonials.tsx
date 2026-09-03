"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Quote, Star, ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui";
import { Eyebrow } from "../ui/eyebrow";
import { staggerContainer, staggerItem, Reveal } from "../ui/reveal";
import { SpotlightCard } from "../ui/spotlight-card";
import { testimonials, GOOGLE_REVIEWS_URL } from "@/lib/testimonials";


export function Testimonials() {
  return (
    <Section id="testimonials" className="bg-white">
      <SectionHeading
        eyebrow={
          <Eyebrow>
            <Quote className="h-3.5 w-3.5" /> Testimonials
          </Eyebrow>
        }
        title="Loved by business owners"
        highlight="worldwide"
        subtitle="Real reviews from our Google Business Profile — here's what clients say about working with us."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-14 grid gap-6 sm:grid-cols-2"
      >
        {testimonials.map((t) => (
          <motion.figure key={t.name} variants={staggerItem} className="h-full">
            <SpotlightCard className="h-full rounded-3xl">
              <div className="group relative flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-brand-600/20 hover:shadow-glow-lg">
                <Quote className="absolute right-6 top-6 h-8 w-8 text-brand-100 transition-colors group-hover:text-brand-200" />
                <div className="mb-4 flex gap-0.5 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="flex-1 text-[15px] leading-relaxed text-slate-600">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-gradient font-display text-sm font-bold text-white shadow-glow">
                    {t.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </figcaption>
              </div>
            </SpotlightCard>
          </motion.figure>
        ))}
      </motion.div>
      <Reveal className="mt-10 text-center">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:underline"
          >
            Read all testimonials <ArrowUpRight className="h-4 w-4" />
          </Link>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-brand-700 hover:underline"
          >
            Reviews from Google <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
