"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Newspaper, ArrowUpRight, CalendarDays, Clock } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui";
import { Eyebrow } from "../ui/eyebrow";
import { staggerContainer, staggerItem } from "../ui/reveal";
import { getAllPosts } from "@/lib/blogs";

export function Blog() {
  const posts = [...getAllPosts()]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
  return (
    <Section id="blog" className="bg-white py-16 sm:py-20">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          align="left"
          eyebrow={
            <Eyebrow>
              <Newspaper className="h-3.5 w-3.5" /> Latest Insights
            </Eyebrow>
          }
          title="From our"
          highlight="blog"
          subtitle="Actionable marketing, SEO and AI strategies — no fluff."
        />
        <a
          href="/blog"
          className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand-700 hover:underline"
        >
          View all articles <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-14 grid gap-6 md:grid-cols-3"
      >
        {posts.map((p) => (
          <motion.a
            key={p.slug}
            href={`/blog/${p.slug}`}
            variants={staggerItem}
            className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-600/20 hover:shadow-glow"
          >
            <div className="relative h-44 overflow-hidden">
              <Image
                src={p.image}
                alt={`${p.title} — featured image`}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute bottom-4 left-4 rounded-full bg-brand-gradient px-3 py-1 text-xs font-semibold text-white shadow-glow">
                {p.category}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display text-lg font-bold leading-snug text-ink transition-colors group-hover:text-brand-700">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {p.excerpt}
              </p>
              <div className="mt-auto flex items-center gap-4 pt-5 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" /> {p.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> {p.readTime}
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </Section>
  );
}
