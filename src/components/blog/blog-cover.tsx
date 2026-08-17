"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";

export function BlogCover({
  title,
  category,
  image,
}: {
  title: string;
  category: string;
  image?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-brand-50 via-white to-brand-100/40 shadow-lift"
    >
      {image && (
        <Image
          src={image}
          alt={`${title} — featured image`}
          fill
          sizes="(max-width: 1024px) 100vw, 900px"
          priority
          className="object-cover object-top"
        />
      )}
      {/* readability overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-white/55 to-white/10" />

      <div className="relative flex aspect-[16/8] flex-col justify-between p-7 sm:p-10">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-3.5 py-1.5 text-xs font-semibold text-white shadow-glow">
            <Sparkles className="h-3.5 w-3.5" /> {category}
          </span>
          <span className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/80 text-brand-700 shadow-soft backdrop-blur">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        <h2 className="mt-4 max-w-2xl font-display text-2xl font-bold leading-snug tracking-tight text-ink sm:text-3xl text-balance">
          {title}
        </h2>
      </div>
    </motion.div>
  );
}
