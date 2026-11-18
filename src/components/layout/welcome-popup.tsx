"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Gift, Sparkles, X } from "lucide-react";

const STORAGE_KEY = "webamazee:welcome-popup-seen";
const OPEN_DELAY_MS = 5000;
const CALENDLY_URL = "https://calendly.com/webamazee0411/30min";

function readSeen() {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    // sessionStorage can be unavailable (private mode, blocked cookies).
    // Fail open: simply do not show the popup in that case.
    return true;
  }
}

function writeSeen() {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function WelcomePopup() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  // Appears automatically 5s after load, at most once per browser session.
  useEffect(() => {
    if (readSeen()) return;
    const timer = window.setTimeout(() => {
      writeSeen();
      setOpen(true);
    }, OPEN_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const close = useCallback(() => {
    writeSeen();
    setOpen(false);
  }, []);

  // Escape to close, Tab kept inside the dialog, background scroll locked.
  useEffect(() => {
    if (!open) return;

    restoreFocusRef.current = document.activeElement as HTMLElement | null;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const root = dialogRef.current;
      if (!root) return;
      const focusables = Array.from(
        root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    // Lock the real scroll container (documentElement) as well as body, and
    // pad for the reclaimed scrollbar width so the page does not jump.
    const html = document.documentElement;
    const body = document.body;
    const scrollbar = window.innerWidth - html.clientWidth;
    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPaddingRight: body.style.paddingRight,
    };
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    document.addEventListener("keydown", onKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      html.style.overflow = prev.htmlOverflow;
      body.style.overflow = prev.bodyOverflow;
      body.style.paddingRight = prev.bodyPaddingRight;
      restoreFocusRef.current?.focus?.();
    };
  }, [open, close]);

  const spring = reduceMotion
    ? { duration: 0 }
    : { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.25 }}
          onMouseDown={(e) => {
            if (!dialogRef.current?.contains(e.target as Node)) close();
          }}
        >
          <div aria-hidden className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-popup-title"
            aria-describedby="welcome-popup-description"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.94, y: reduceMotion ? 0 : 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: reduceMotion ? 0 : 10 }}
            transition={spring}
            className="relative max-h-[90vh] w-full max-w-md overflow-y-auto overflow-x-hidden rounded-[28px] bg-white p-7 shadow-[0_30px_80px_-24px_rgba(15,109,255,0.45)] ring-1 ring-brand-100 outline-none sm:p-8"
          >
            {/* Decorative accents */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-8 top-0 h-1 rounded-full bg-brand-gradient"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-400/20 blur-2xl"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-brand-600/10 blur-2xl"
            />

            {/* Close */}
            <button
              type="button"
              onClick={close}
              aria-label="Close popup"
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-line bg-white text-slate-400 shadow-soft transition-all duration-300 hover:border-brand-600/30 hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Badge */}
            <div className="relative flex items-center gap-3">
              <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow">
                <Gift className="h-6 w-6" />
                {!reduceMotion && (
                  <span className="absolute inset-0 animate-ping rounded-2xl bg-brand-500/20" />
                )}
              </span>
              <div className="flex flex-col gap-1">
                <Sparkles className="h-4 w-4 text-brand-400" aria-hidden />
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700">
                  From Team Webamazee
                </span>
              </div>
            </div>

            {/* Copy */}
            <h2
              id="welcome-popup-title"
              className="relative mt-5 font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-[1.7rem] text-balance"
            >
              A Little Something for Your Business ✨
            </h2>

            <div id="welcome-popup-description" className="relative mt-3 space-y-2">
              <p className="text-[15px] font-medium leading-relaxed text-slate-700 text-pretty">
                Ready to give your business a better digital presence?
              </p>
              <p className="text-[15px] leading-relaxed text-slate-500 text-pretty">
                Let&apos;s talk about your website, SEO and digital growth.
              </p>
            </div>

            {/* CTA */}
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="group relative mt-6 flex h-[3.25rem] w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-brand-gradient px-6 text-[15px] font-semibold tracking-tight text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-1/3 bg-white/20 blur-md [transform:translateX(-150%)] transition-transform duration-700 group-hover:[transform:translateX(340%)]"
              />
              <span className="relative inline-flex items-center gap-2">
                Let&apos;s Talk
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </a>

            <p className="relative mt-3 text-center text-xs text-slate-400">
              Free 30-minute call · no obligations
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
