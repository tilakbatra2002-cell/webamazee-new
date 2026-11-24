"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus } from "lucide-react";

/**
 * FAQ presentation for the Zirakpur page.
 *
 * Different from the site-wide card accordion on purpose: a numbered ledger
 * where every question sits on a shared rule, the number acts as the marker and
 * an open answer reads as a short footnote under its own line. No boxes, no
 * rounded cards, so it does not repeat the card language used above it.
 */
export function FaqLedger({
  items,
  defaultOpen = 0,
  idPrefix = "faq",
}: {
  items: { q: string; a: string }[];
  defaultOpen?: number | null;
  idPrefix?: string;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="border-t border-slate-200">
      {items.map((f, i) => {
        const isOpen = open === i;
        const panelId = `${idPrefix}-panel-${i}`;
        const buttonId = `${idPrefix}-trigger-${i}`;
        return (
          <div key={f.q} className="border-b border-slate-200">
            <button
              type="button"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : i)}
              className="group flex w-full items-start gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40 sm:gap-6"
            >
              <span
                aria-hidden="true"
                className={`mt-[3px] shrink-0 font-display text-[11px] font-bold tabular-nums transition-colors ${
                  isOpen ? "text-brand-600" : "text-slate-300 group-hover:text-brand-600/70"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <span
                className={`flex-1 font-display text-[15.5px] font-bold leading-snug transition-colors sm:text-[17px] ${
                  isOpen ? "text-brand-700" : "text-ink group-hover:text-brand-700"
                }`}
              >
                {f.q}
              </span>

              <span
                className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors ${
                  isOpen
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-slate-300 text-slate-400 group-hover:border-brand-600/50 group-hover:text-brand-700"
                }`}
              >
                {isOpen ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[68ch] pb-6 pl-[30px] pr-10 text-[14px] leading-[1.75] text-slate-600 sm:pl-[38px]">
                    {f.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
