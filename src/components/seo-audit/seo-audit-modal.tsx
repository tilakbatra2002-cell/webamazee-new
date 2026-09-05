"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Sparkles, X } from "lucide-react";
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
          aria-label="Free Website Audit"
        >
          <motion.div
            ref={focusRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/60 bg-white shadow-2xl"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-hero-glow" />
            <button
              onClick={onClose}
              aria-label="Close audit"
              className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-white/80 text-slate-500 shadow-soft backdrop-blur transition-all hover:rotate-90 hover:text-brand-700"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative flex flex-1 flex-col overflow-y-auto">
              {step === "form" && (
                <div className="grid flex-1 md:grid-cols-2">
                  <div className="relative hidden flex-col justify-center overflow-hidden border-r border-line bg-gradient-to-br from-brand-50 to-white p-8 md:flex">
                    <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-400/20 blur-3xl" />
                    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-700 shadow-soft">
                      <Sparkles className="h-3.5 w-3.5" /> Free Website Audit
                    </span>
                    <h3 className="mt-5 font-display text-3xl font-bold leading-tight text-ink">
                      How healthy is your website?
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600">
                      Live checks of technical SEO, on-page SEO, performance, mobile, security, structured
                      data and AI search readiness.
                    </p>
                    <ul className="mt-6 space-y-2.5">
                      {CHECKS.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-success" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col justify-center p-6 sm:p-8">
                    <div className="md:hidden">
                      <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700">
                        <Sparkles className="h-3.5 w-3.5" /> Free Website Audit
                      </span>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <SeoAuditForm
                        url={url}
                        onUrlChange={setUrl}
                        onSubmit={() => analyze()}
                        urlError={urlError}
                        apiError={apiError}
                        inputRef={urlRef}
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === "progress" && <SeoAuditProgress url={url} activeIndex={progressStep} />}

              {step === "result" && result && (
                <div className="px-5 py-8 sm:px-10">
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
