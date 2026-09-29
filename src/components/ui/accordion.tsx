"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Accordion({
  items,
  defaultOpen = 0,
  idPrefix = "faq",
}: {
  items: { q: string; a: string }[];
  defaultOpen?: number | null;
  /** Prefix for the generated aria ids, so multiple accordions stay unique. */
  idPrefix?: string;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="space-y-3">
      {items.map((f, i) => {
        const isOpen = open === i;
        const panelId = `${idPrefix}-panel-${i}`;
        const buttonId = `${idPrefix}-trigger-${i}`;
        return (
          <div
            key={f.q}
            className={cn(
              "overflow-hidden rounded-2xl border bg-white transition-all duration-300",
              isOpen
                ? "border-brand-600/25 shadow-glow"
                : "border-line shadow-soft"
            )}
          >
            <button
              type="button"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/40"
            >
              <span className="font-semibold text-ink">{f.q}</span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors",
                  isOpen ? "bg-brand-gradient text-white" : "bg-surface text-slate-500"
                )}
              >
                <Plus className="h-4 w-4" />
              </motion.span>
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
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="px-6 pb-5 text-[15px] leading-relaxed text-slate-500">
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
