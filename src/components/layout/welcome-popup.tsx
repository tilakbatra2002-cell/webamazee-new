"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, TrendingUp, X } from "lucide-react";

const STORAGE_KEY = "webamazee:welcome-popup-seen";
const OPEN_DELAY_MS = 5000;
const CALENDLY_URL = "https://calendly.com/webamazee0411/30min";

function readSeen() {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    // sessionStorage can be unavailable (private mode, blocked cookies).
    // Fail closed: simply do not show the popup in that case.
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

/** Four-point sparkle, used for tasteful decorative accents. */
function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
    </svg>
  );
}

/**
 * Bespoke "digital growth" illustration: a 3D-tilted analytics card with a
 * rising bar chart and trend line, plus layered depth elements. Hand-built
 * from SVG and CSS so there is no stock imagery and no extra dependency.
 */
function GrowthIllustration({ animate }: { animate: boolean }) {
  const float = (delay: number, distance: number) =>
    animate
      ? {
          animate: { y: [0, -distance, 0] },
          transition: { duration: 5 + delay, delay, repeat: Infinity, ease: "easeInOut" as const },
        }
      : {};

  return (
    <div className="relative h-full w-full">
      {/* Soft light wash + dot grid behind the composition */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-[26px] bg-[radial-gradient(115%_85%_at_72%_12%,rgba(66,165,255,0.30),transparent_62%)]"
      />
      <div aria-hidden className="dot-pattern absolute inset-0 rounded-[26px] opacity-40" />

      <div className="absolute inset-0 [perspective:1200px]">
        {/* Depth layer: accent tile peeking out behind the dashboard card */}
        <div
          aria-hidden
          className="absolute right-[6%] top-[8%] h-20 w-20 rounded-2xl bg-brand-gradient opacity-70 shadow-glow sm:h-24 sm:w-24"
          style={{ transform: "rotate(14deg)" }}
        />
        <div
          aria-hidden
          className="absolute bottom-[10%] left-[4%] h-12 w-12 rounded-xl bg-brand-200/60"
          style={{ transform: "rotate(-12deg)" }}
        />

        {/* Main dashboard card, tilted in 3D */}
        <div
          className="absolute left-1/2 top-1/2 w-[80%] rounded-2xl border border-white/70 bg-white/95 p-4 shadow-[0_34px_70px_-24px_rgba(15,109,255,0.45)] backdrop-blur-sm lg:w-[86%]"
          style={{ transform: "translate(-50%,-50%) rotateX(10deg) rotateY(-16deg)" }}
        >
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-brand-400" />
            <span className="h-2 w-2 rounded-full bg-brand-300" />
            <span className="h-2 w-2 rounded-full bg-brand-200" />
            <span className="ml-1 h-1.5 w-9 rounded-full bg-slate-100" />
          </div>
          <p className="mt-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
            Growth overview
          </p>

          <svg viewBox="0 0 200 130" className="mt-1.5 w-full" aria-hidden="true" focusable="false">
            <defs>
              <linearGradient id="wpBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5BA4FF" />
                <stop offset="100%" stopColor="#0F6DFF" />
              </linearGradient>
              <linearGradient id="wpArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1E88FF" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#1E88FF" stopOpacity="0" />
              </linearGradient>
            </defs>

            <line
              x1="6"
              y1="112"
              x2="194"
              y2="112"
              stroke="#E5E7EB"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path d="M25 68 L73 50 L121 62 L169 18 L169 112 L25 112 Z" fill="url(#wpArea)" />
            <rect x="8" y="68" width="34" height="44" rx="8" fill="url(#wpBar)" />
            <rect x="56" y="50" width="34" height="62" rx="8" fill="url(#wpBar)" />
            <rect x="104" y="62" width="34" height="50" rx="8" fill="url(#wpBar)" />
            <rect x="152" y="18" width="34" height="94" rx="8" fill="url(#wpBar)" />
            <path
              d="M25 68 L73 50 L121 62 L169 18"
              fill="none"
              stroke="#0F6DFF"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="169" cy="18" r="6" fill="#ffffff" stroke="#0F6DFF" strokeWidth="3.5" />
          </svg>
        </div>

        {/* Floating badge, lifted off the card for depth */}
        <motion.div
          {...float(0.4, 6)}
          className="absolute bottom-[4%] left-0 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-[0_16px_34px_-12px_rgba(15,109,255,0.5)] ring-1 ring-brand-100"
        >
          <TrendingUp className="h-3.5 w-3.5 text-brand-600" />
          <span className="text-[11px] font-bold text-brand-700">Organic growth</span>
        </motion.div>
      </div>

      {/* Tasteful sparkles */}
      <motion.div {...float(0.8, 7)} className="absolute left-[3%] top-[20%] text-brand-400">
        <Sparkle className="h-4 w-4" />
      </motion.div>
      <motion.div {...float(1.6, 5)} className="absolute right-[5%] top-[30%] text-brand-300">
        <Sparkle className="h-3 w-3" />
      </motion.div>
      <motion.div {...float(2.2, 6)} className="absolute bottom-[16%] right-[10%] text-brand-500">
        <Sparkle className="h-2.5 w-2.5" />
      </motion.div>
    </div>
  );
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

  const entrance = reduceMotion
    ? { duration: 0 }
    : { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.28 }}
          onMouseDown={(e) => {
            if (!dialogRef.current?.contains(e.target as Node)) close();
          }}
        >
          <div aria-hidden className="absolute inset-0 bg-slate-900/55 backdrop-blur-md" />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-popup-title"
            aria-describedby="welcome-popup-description"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.93, y: reduceMotion ? 0 : 22 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: reduceMotion ? 0 : 12 }}
            transition={entrance}
            className="relative w-full max-w-[720px] rounded-[32px] bg-gradient-to-br from-white via-white to-brand-50 shadow-[0_44px_120px_-30px_rgba(15,109,255,0.45),0_12px_44px_-14px_rgba(17,24,39,0.20)] ring-1 ring-white/70 outline-none"
          >
            {/* Ambient corner light. Wrapped in an inset clipping layer so the
                blobs cannot extend the dialog's scrollable height. */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px]"
            >
              <span className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-brand-300/25 blur-3xl" />
              <span className="absolute -bottom-24 -left-16 h-52 w-52 rounded-full bg-brand-500/15 blur-3xl" />
            </span>

            {/* Close */}
            <button
              type="button"
              onClick={close}
              aria-label="Close popup"
              className="absolute right-5 top-5 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/80 bg-white/85 text-slate-500 shadow-soft backdrop-blur transition-all duration-300 hover:rotate-90 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              <X className="h-[18px] w-[18px]" />
            </button>

            {/* Only the content scrolls, so the close button stays put on
                short viewports. */}
            <div className="relative z-10 max-h-[92vh] overflow-y-auto overflow-x-hidden rounded-[32px]">
            <div className="grid grid-cols-1 items-center lg:grid-cols-[1.04fr_0.96fr]">
              {/* Illustration — top on mobile, right column on desktop */}
              <div className="order-1 px-5 pt-7 sm:px-8 lg:order-2 lg:flex lg:items-center lg:py-9 lg:pl-3 lg:pr-9">
                <div className="relative mx-auto aspect-[5/4] w-full max-w-[280px] lg:aspect-auto lg:h-[280px] lg:max-w-none">
                  <GrowthIllustration animate={!reduceMotion} />
                </div>
              </div>

              {/* Copy + CTA */}
              <div className="order-2 px-6 pb-8 pt-6 sm:px-9 sm:pb-9 lg:order-1 lg:py-10 lg:pl-10 lg:pr-6">
                <div className="relative flex items-center gap-2">
                  <Sparkle className="h-3.5 w-3.5 text-brand-500" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-brand-700">
                    WEB AMAZEE
                  </span>
                </div>

                <h2
                  id="welcome-popup-title"
                  className="relative mt-4 font-display text-[1.85rem] font-bold leading-[1.08] tracking-tight text-ink text-balance sm:text-[2.15rem]"
                >
                  Your Next Big Digital Move Starts Here.
                </h2>

                <p
                  id="welcome-popup-description"
                  className="relative mt-4 text-[15px] leading-relaxed text-slate-600 text-pretty"
                >
                  Let&apos;s make your business stand out with a better website,
                  stronger SEO and smarter digital marketing.
                </p>

                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="group relative mt-7 flex h-[3.25rem] w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-brand-gradient px-8 text-[15px] font-semibold tracking-tight text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 lg:w-auto lg:px-9"
                >
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-1/3 bg-white/20 blur-md [transform:translateX(-150%)] transition-transform duration-700 group-hover:[transform:translateX(340%)]"
                  />
                  <span className="relative inline-flex items-center gap-2">
                    Let&apos;s Grow Together
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </a>

                <p className="relative mt-4 text-[13px] text-slate-500">
                  Have a project in mind? Let&apos;s talk.
                </p>
              </div>
            </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
