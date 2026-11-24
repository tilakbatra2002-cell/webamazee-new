"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

/**
 * FAQ board for the Zirakpur page.
 *
 * One contained panel rather than a stack of cards: numbered chips on the
 * left, the question as the main line, and the answer opening into a tinted
 * block that is clearly nested inside its row. Reads as a single composed
 * object instead of six floating boxes.
 */
export function FaqPanel({
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
    <div className="overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_36px_70px_-52px_rgba(11,21,40,.55)]">
      {/* thin brand strip, purely decorative */}
      <div aria-hidden className="h-1 w-full bg-gradient-to-r from-brand-600 via-brand-500 to-brand-600/20" />

      <div className="divide-y divide-slate-100">
        {items.map((f, i) => {
          const isOpen = open === i;
          const panelId = `${idPrefix}-panel-${i}`;
          const buttonId = `${idPrefix}-trigger-${i}`;
          return (
            <div key={f.q} className={isOpen ? "bg-slate-50/40" : "bg-white"}>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-start gap-3.5 px-5 py-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-600/40 sm:gap-5 sm:px-7"
              >
                <span
                  aria-hidden="true"
                  className={`mt-px grid h-7 w-7 shrink-0 place-items-center rounded-lg border font-display text-[10.5px] font-bold tabular-nums transition-all duration-300 ${
                    isOpen
                      ? "border-brand-600 bg-brand-600 text-white shadow-[0_6px_14px_-6px_rgba(15,109,255,.8)]"
                      : "border-slate-200 bg-slate-50 text-slate-400 group-hover:border-brand-600/40 group-hover:text-brand-700"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span
                  className={`flex-1 pt-0.5 font-display text-[15.5px] font-bold leading-snug transition-colors sm:text-[17px] ${
                    isOpen ? "text-brand-700" : "text-ink group-hover:text-brand-700"
                  }`}
                >
                  {f.q}
                </span>

                <span
                  className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                    isOpen
                      ? "rotate-45 bg-brand-600 text-white"
                      : "bg-slate-100 text-slate-500 group-hover:bg-brand-50 group-hover:text-brand-700"
                  }`}
                >
                  <Plus className="h-3.5 w-3.5" />
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
                    transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-6 pl-[3.6rem] sm:px-7 sm:pl-[5.1rem]">
                      <div className="rounded-xl border border-brand-600/15 bg-brand-50/60 px-4 py-3.5">
                        <p className="text-[13.5px] leading-[1.75] text-slate-600 sm:text-[14px]">{f.a}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
