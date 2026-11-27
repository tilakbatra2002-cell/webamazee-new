"use client";

/**
 * The free-website-audit modal.
 *
 * The previous build repeated the same heading on both halves of the dialog —
 * "How healthy is your website?" appeared once in the marketing column and
 * again above the field on the right — which made the panel read as two
 * competing cards rather than one flow. This rebuild gives the dialog a single
 * hierarchy:
 *
 *   - a navy left panel that states what the audit checks and how long it
 *     takes, using the same shell as the case-study and legal heroes,
 *   - one heading for the whole dialog, on the navy side only,
 *   - the form on the right reduced to a field, its hint and one action,
 *   - a header rule so the close affordance has somewhere to sit.
 *
 * All state, focus handling, Esc-to-close and scroll locking are unchanged.
 */
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, ShieldCheck, Sparkles, X, Zap } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { SeoAuditForm } from "./seo-audit-form";
import { SeoAuditProgress } from "./seo-audit-progress";
import { SeoAuditResults } from "./seo-audit-results";
import { useSeoAuditRun } from "./use-seo-audit-run";

const CHECKS = [
  "Technical SEO",
  "On-page SEO",
  "Performance",
  "Mobile readiness",
  "Security",
  "Structured data",
  "AI Search Readiness",
];

export function SeoAuditModal({
  open,
  onClose,
  initialUrl = "",
}: {
  open: boolean;
  onClose: () => void;
  initialUrl?: string;
}) {
  const { step, url, setUrl, urlError, apiError, progressStep, result, analyze, reset } =
    useSeoAuditRun(initialUrl);
  const focusRef = useRef<HTMLDivElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      reset(initialUrl);
      trackEvent("seo_audit_opened");
      const t = setTimeout(() => urlRef.current?.focus(), 350);
      return () => clearTimeout(t);
    }
  }, [open, initialUrl, reset]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    focusRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-900/60 p-3 backdrop-blur-md sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="audit-modal-title"
        >
          <motion.div
            ref={focusRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[92vh] w-full max-w-[980px] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            {/* Close sits above both halves, on the panel's own edge. */}
            <button
              onClick={onClose}
              aria-label="Close audit"
              // The button straddles the navy panel on mobile and the white form on
              // desktop, so it needs a solid chip with a visible ring rather
              // than a translucent one that disappears into either side.
              className="absolute right-3.5 top-3.5 z-30 grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-slate-600 shadow-soft transition-colors hover:border-slate-300 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              <X className="h-[18px] w-[18px]" />
            </button>

            <div className="relative flex flex-1 flex-col overflow-y-auto">
              {step === "form" && (
                <div className="grid flex-1 md:grid-cols-[0.95fr_1.05fr]">
                  {/* ------------------------------------------------ */}
                  {/* Navy panel: the one place the dialog states itself */}
                  {/* ------------------------------------------------ */}
                  <div className="relative flex flex-col justify-between overflow-hidden bg-[#0b1528] px-6 pb-7 pt-8 sm:px-8 sm:pb-8">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-brand-600/20 blur-3xl"
                    />
                    <div className="relative">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.15em] text-brand-300">
                        <Sparkles className="h-3.5 w-3.5" aria-hidden /> Free Website Audit
                      </span>
                      <h2
                        id="audit-modal-title"
                        className="mt-5 font-display text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-[2.15rem]"
                      >
                        See what is holding
                        <br />
                        your website back
                      </h2>
                      <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-slate-300">
                        A live read of the signals that decide whether your site
                        gets found, loads quickly and earns trust.
                      </p>

                      {/* Two columns keep the panel short enough that the
                          dialog stays proportionate to a single-field form. */}
                      <ul className="mt-6 grid gap-x-4 gap-y-2.5 sm:grid-cols-2">
                        {CHECKS.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2 text-[13px] text-slate-300"
                          >
                            <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand-600/20 text-brand-300">
                              <Check className="h-2.5 w-2.5" aria-hidden />
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="relative mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-5">
                      <span className="flex items-center gap-1.5 text-[12px] text-slate-400">
                        <Zap className="h-3.5 w-3.5 text-brand-300" aria-hidden />
                        Under two minutes
                      </span>
                      <span className="flex items-center gap-1.5 text-[12px] text-slate-400">
                        <ShieldCheck className="h-3.5 w-3.5 text-brand-300" aria-hidden />
                        No credit card
                      </span>
                    </div>
                  </div>

                  {/* ------------------------------------------------ */}
                  {/* Form column: field, hint, one action.             */}
                  {/* ------------------------------------------------ */}
                  <div className="flex flex-col justify-center px-5 pb-8 pt-7 sm:px-9">
                    <SeoAuditForm
                      url={url}
                      onUrlChange={setUrl}
                      onSubmit={() => analyze()}
                      urlError={urlError}
                      apiError={apiError}
                      inputRef={urlRef}
                      compact
                    />

                    <a
                      href="/free-seo-audit"
                      className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-slate-500 transition-colors hover:text-brand-700"
                    >
                      Read how the audit works
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  </div>
                </div>
              )}

              {step === "progress" && (
                <div className="bg-white">
                  <SeoAuditProgress url={url} activeIndex={progressStep} />
                </div>
              )}

              {step === "result" && result && (
                <div className="bg-white px-5 py-8 sm:px-10">
                  <SeoAuditResults result={result} onClose={onClose} />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
