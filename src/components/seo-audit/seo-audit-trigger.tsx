"use client";

import { motion } from "framer-motion";
import { SearchCheck } from "lucide-react";

/**
 * Fixed "Free SEO Audit" floating button.
 * - Desktop: vertically centered on the right edge.
 * - Mobile: compact pill near the bottom right (below typical CTAs).
 * Uses a brand gradient, glow and a subtle hover lift.
 */

export function SeoAuditTrigger({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label="Free SEO Audit"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group fixed right-0 top-1/2 z-[70] hidden -translate-y-1/2 items-center gap-0 overflow-hidden rounded-l-2xl border border-r-0 border-brand-400/40 bg-brand-gradient py-4 pl-3 pr-2 text-white shadow-glow-lg transition-all duration-300 hover:pr-3 hover:shadow-glow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:flex"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 bg-white/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <SearchCheck className="h-5 w-5 shrink-0" />
      <span className="ml-1.5 max-w-0 overflow-hidden whitespace-nowrap font-display text-sm font-semibold leading-none transition-all duration-300 group-hover:ml-2 group-hover:max-w-[10rem]">
        Free SEO Audit
      </span>
    </motion.button>
  );
}

/** Compact mobile version (bottom-right, rounded-full). */
export function SeoAuditTriggerMobile({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label="Free SEO Audit"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="group fixed bottom-5 right-4 z-[70] inline-flex items-center gap-2 rounded-full bg-brand-gradient px-4 py-3 text-white shadow-glow-lg transition-all duration-300 hover:shadow-glow-xl sm:hidden"
    >
      <SearchCheck className="h-4 w-4" />
      <span className="font-display text-sm font-semibold">Free SEO Audit</span>
    </motion.button>
  );
}
