"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Monitor, Tablet, Smartphone } from "lucide-react";

export function DeviceShowcase({
  title,
  url,
  image = "/images/portfolio/kabir-oil-mill-live-homepage.webp",
}: {
  title: string;
  url: string;
  image?: string;
}) {
  return (
    <div className="relative mx-auto max-w-5xl">
      {/* glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[120%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-200/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        {/* Desktop */}
        <div className="relative overflow-hidden rounded-2xl border border-line bg-white shadow-lift-lg">
          <div className="flex items-center gap-1.5 border-b border-line bg-surface/70 px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
            <span className="ml-2 flex-1 truncate rounded-md bg-white px-2.5 py-1 text-[10px] text-slate-400 ring-1 ring-line">
              {url.replace("https://", "")}
            </span>
          </div>
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={image}
              alt={`${title} website on desktop`}
              fill
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover object-top"
            />
            <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-brand-700 shadow-soft backdrop-blur">
              <Monitor className="h-3 w-3" /> Desktop
            </span>
          </div>
        </div>

        {/* Tablet + Mobile overlapping */}
        <div className="mt-6 flex items-end justify-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-40 sm:w-48"
          >
            <div className="relative overflow-hidden rounded-xl border border-line bg-white p-1.5 shadow-lift">
              <div className="mx-auto h-1.5 w-1/3 rounded-full bg-surface" />
              <div className="relative mt-1.5 aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={image}
                  alt={`${title} website on tablet`}
                  fill
                  sizes="200px"
                  className="object-cover object-top"
                />
              </div>
            </div>
            <p className="mt-2 text-center text-xs text-slate-400">
              <Tablet className="mr-1 inline h-3 w-3" /> Tablet
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="w-28 sm:w-32"
          >
            <div className="relative overflow-hidden rounded-[1.4rem] border-2 border-slate-800 bg-slate-900 p-1.5 shadow-lift-lg">
              <div className="relative aspect-[9/19] overflow-hidden rounded-[1.1rem]">
                <Image
                  src={image}
                  alt={`${title} website on mobile`}
                  fill
                  sizes="128px"
                  className="object-cover object-top"
                />
              </div>
            </div>
            <p className="mt-2 text-center text-xs text-slate-400">
              <Smartphone className="mr-1 inline h-3 w-3" /> Mobile
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
