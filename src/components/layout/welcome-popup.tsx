"use client";

/**
 * The enquiry popup shown five seconds after a visitor's first page load.
 *
 * The previous build printed two headings of equal weight — one in the pale
 * left panel, another directly above the form — so the dialog read as two
 * separate cards pushed together, and the gradient column collapsed into what
 * looked like empty space below the copy. The close control was a literal
 * "×" character in a bordered circle.
 *
 * This rebuild gives the dialog one hierarchy and one job:
 *
 *   - a navy panel carrying the brand, the single promise, what a reply
 *     includes, and the direct routes (WhatsApp, email, phone),
 *   - the form on the right under a short "tell us what you need" line rather
 *     than a competing headline,
 *   - a proper icon close button, top-right, on the white half.
 *
 * Behaviour is untouched: the 5s delay, once-per-session rule, focus trap,
 * Escape, scrollbar-compensated scroll lock, validation, honeypot and the POST
 * to /api/popup-enquiry all remain exactly as they were.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Loader2, Mail, Phone, ShieldCheck, X } from "lucide-react";
import { CONTACT_EMAIL, WHATSAPP_DISPLAY, whatsappHref } from "@/lib/chatbot/knowledge";

const STORAGE_KEY = "webamazee:welcome-popup-seen";
const OPEN_DELAY_MS = 5000;

const SERVICES = [
  "Website Development",
  "SEO Services",
  "AI SEO",
  "Social Media Marketing",
  "Digital Marketing",
  "Other",
];

const WHAT_YOU_GET = [
  "A reply from a real strategist, not a bot",
  "Scope, timeline and a fixed price range",
  "A straight view of what your site needs",
];

const EMPTY_FORM = {
  fullName: "",
  workEmail: "",
  phoneNumber: "",
  serviceRequired: "",
  projectDetails: "",
};

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<keyof typeof EMPTY_FORM, string>>;

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

function validate(values: typeof EMPTY_FORM): Errors {
  const errors: Errors = {};
  if (values.fullName.trim().length < 2) errors.fullName = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.workEmail.trim()))
    errors.workEmail = "Please enter a valid work email.";
  if (!values.serviceRequired) errors.serviceRequired = "Please choose a service.";
  if (values.projectDetails.trim().length < 10)
    errors.projectDetails = "Please tell us a little more about your project.";
  return errors;
}

export function WelcomePopup() {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const dialogRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
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
          'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);
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

  const setField =
    (key: keyof typeof EMPTY_FORM) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
    };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const firstKey = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const honeypot = String(new FormData(e.currentTarget).get("websiteConfirm") ?? "");
      const response = await fetch("/api/popup-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          pageUrl: window.location.href,
          referrer: document.referrer,
          websiteConfirm: honeypot,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error || "We could not send your request. Please try again.");
      }
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "We could not send your request. Please try again."
      );
    }
  }

  const entrance = reduceMotion
    ? { duration: 0 }
    : { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

  const inputBase =
    "w-full rounded-xl border bg-white px-3.5 py-2.5 text-[13.5px] text-ink outline-none transition-all placeholder:text-slate-400";
  const inputIdle = "border-line focus:border-brand-600 focus:ring-4 focus:ring-brand-600/10";
  const inputError = "border-rose-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10";
  const fieldClass = (key: keyof typeof EMPTY_FORM) =>
    `${inputBase} ${errors[key] ? inputError : inputIdle}`;

  const submitting = status === "submitting";
  const labelCls = "mb-1.5 block text-[12.5px] font-medium text-slate-600";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.25 }}
          onMouseDown={(e) => {
            if (!dialogRef.current?.contains(e.target as Node)) close();
          }}
        >
          <div aria-hidden className="absolute inset-0 bg-slate-900/55 backdrop-blur-md" />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-enquiry-title"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.96, y: reduceMotion ? 0 : 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: reduceMotion ? 0 : 10 }}
            transition={entrance}
            className="relative w-full max-w-[940px] overflow-hidden rounded-3xl bg-white shadow-[0_40px_110px_-30px_rgba(15,109,255,0.38),0_14px_44px_-14px_rgba(17,24,39,0.20)] ring-1 ring-slate-200/70 outline-none"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close popup"
              className="absolute right-3.5 top-3.5 z-20 grid h-9 w-9 place-items-center rounded-full border border-line bg-white text-slate-500 shadow-soft transition-all duration-200 hover:border-slate-300 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>

            <div className="max-h-[92dvh] overflow-y-auto overflow-x-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)]">
                {/* -------------------------------------------------- */}
                {/* Navy panel: one promise, one set of promises.      */}
                {/* -------------------------------------------------- */}
                <div className="relative flex flex-col justify-between overflow-hidden bg-[#0b1528] px-6 py-7 sm:px-8 sm:py-8">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full bg-brand-600/20 blur-3xl"
                  />
                  <div className="relative">
                    <Image
                      src="/images/logo-lockup-white.webp"
                      alt="Webamazee — AI-Powered Digital Marketing Company"
                      width={532}
                      height={137}
                      priority
                      className="h-9 w-auto sm:h-10"
                    />

                    <h2
                      id="popup-enquiry-title"
                      className="mt-6 font-display text-[1.55rem] font-bold leading-[1.12] tracking-[-0.03em] text-white sm:text-[1.85rem]"
                    >
                      Let&apos;s grow your business together
                    </h2>

                    <p className="mt-3 max-w-sm text-[13.5px] leading-relaxed text-slate-300">
                      Looking for a better website, stronger SEO or smarter digital
                      marketing? Tell us what you need and we will come back with a
                      straight answer.
                    </p>

                    <ul className="mt-6 space-y-2.5">
                      {WHAT_YOU_GET.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-[12.5px] leading-snug text-slate-300"
                        >
                          <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand-600/25 text-brand-300">
                            <Check className="h-2.5 w-2.5" aria-hidden />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Direct routes, so the popup is useful even if the form is not wanted. */}
                  <div className="relative mt-7 border-t border-white/10 pt-5">
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-brand-300">
                      Prefer to talk now
                    </p>
                    <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2">
                      <a
                        href={whatsappHref("Hi Webamazee, I would like to talk about my website.")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-white transition-colors hover:text-brand-300"
                      >
                        WhatsApp {WHATSAPP_DISPLAY}
                        <ArrowUpRight className="h-3 w-3" aria-hidden />
                      </a>
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="inline-flex items-center gap-1.5 text-[12.5px] text-slate-400 transition-colors hover:text-white"
                      >
                        <Mail className="h-3.5 w-3.5" aria-hidden />
                        {CONTACT_EMAIL}
                      </a>
                    </div>
                    <p className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500">
                      <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                      We never share your details.
                    </p>
                  </div>
                </div>

                {/* -------------------------------------------------- */}
                {/* Form                                              */}
                {/* -------------------------------------------------- */}
                <div className="px-5 py-7 sm:px-8 sm:py-8">
                  <h3 className="font-display text-[15px] font-bold text-ink">
                    Tell us what you need
                  </h3>
                  <p className="mt-1 text-[12px] text-slate-500">
                    Takes about a minute. Every field marked * is required.
                  </p>

                  {status === "success" ? (
                    <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/60 p-6">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-success shadow-soft">
                        <Check className="h-5 w-5" aria-hidden />
                      </span>
                      <p className="mt-3 font-display text-[15px] font-bold text-ink">
                        Thank you — your enquiry is on its way.
                      </p>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">
                        We will get back to you as soon as possible. If it is urgent,
                        WhatsApp is faster.
                      </p>
                      <a
                        href={whatsappHref()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#0f6dff] px-4 py-2 text-[12.5px] font-semibold text-white transition-colors hover:bg-[#0b57d0]"
                      >
                        Message us on WhatsApp
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                      </a>
                    </div>
                  ) : (
                    <form ref={formRef} onSubmit={handleSubmit} noValidate className="mt-5">
                      {/* Honeypot */}
                      <input
                        name="websiteConfirm"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        className="absolute -left-[9999px] h-px w-px opacity-0"
                      />

                      <div className="grid gap-3.5 sm:grid-cols-2">
                        <div>
                          <label htmlFor="pf-fullName" className={labelCls}>
                            Full Name <span className="text-brand-700">*</span>
                          </label>
                          <input
                            id="pf-fullName"
                            name="fullName"
                            type="text"
                            autoComplete="name"
                            value={values.fullName}
                            onChange={setField("fullName")}
                            disabled={submitting}
                            required
                            aria-invalid={!!errors.fullName}
                            aria-describedby={errors.fullName ? "pf-fullName-error" : undefined}
                            placeholder="Jane Sharma"
                            className={fieldClass("fullName")}
                          />
                          {errors.fullName && (
                            <p
                              id="pf-fullName-error"
                              role="alert"
                              className="mt-1 text-[11.5px] font-medium text-rose-600"
                            >
                              {errors.fullName}
                            </p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="pf-workEmail" className={labelCls}>
                            Work Email <span className="text-brand-700">*</span>
                          </label>
                          <input
                            id="pf-workEmail"
                            name="workEmail"
                            type="email"
                            autoComplete="email"
                            value={values.workEmail}
                            onChange={setField("workEmail")}
                            disabled={submitting}
                            required
                            aria-invalid={!!errors.workEmail}
                            aria-describedby={errors.workEmail ? "pf-workEmail-error" : undefined}
                            placeholder="jane@company.com"
                            className={fieldClass("workEmail")}
                          />
                          {errors.workEmail && (
                            <p
                              id="pf-workEmail-error"
                              role="alert"
                              className="mt-1 text-[11.5px] font-medium text-rose-600"
                            >
                              {errors.workEmail}
                            </p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="pf-phoneNumber" className={labelCls}>
                            Phone{" "}
                            <span className="font-normal text-slate-400">(optional)</span>
                          </label>
                          <input
                            id="pf-phoneNumber"
                            name="phoneNumber"
                            type="tel"
                            autoComplete="tel"
                            value={values.phoneNumber}
                            onChange={setField("phoneNumber")}
                            disabled={submitting}
                            placeholder="+91 98765 43210"
                            className={fieldClass("phoneNumber")}
                          />
                        </div>

                        <div>
                          <label htmlFor="pf-serviceRequired" className={labelCls}>
                            Service Required <span className="text-brand-700">*</span>
                          </label>
                          <select
                            id="pf-serviceRequired"
                            name="serviceRequired"
                            value={values.serviceRequired}
                            onChange={setField("serviceRequired")}
                            disabled={submitting}
                            required
                            aria-invalid={!!errors.serviceRequired}
                            aria-describedby={
                              errors.serviceRequired ? "pf-serviceRequired-error" : undefined
                            }
                            className={fieldClass("serviceRequired")}
                          >
                            <option value="">Select a service</option>
                            {SERVICES.map((service) => (
                              <option key={service} value={service}>
                                {service}
                              </option>
                            ))}
                          </select>
                          {errors.serviceRequired && (
                            <p
                              id="pf-serviceRequired-error"
                              role="alert"
                              className="mt-1 text-[11.5px] font-medium text-rose-600"
                            >
                              {errors.serviceRequired}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="pf-projectDetails" className={labelCls}>
                            Tell us about your project <span className="text-brand-700">*</span>
                          </label>
                          <textarea
                            id="pf-projectDetails"
                            name="projectDetails"
                            rows={3}
                            value={values.projectDetails}
                            onChange={setField("projectDetails")}
                            disabled={submitting}
                            required
                            aria-invalid={!!errors.projectDetails}
                            aria-describedby={
                              errors.projectDetails ? "pf-projectDetails-error" : undefined
                            }
                            placeholder="What are you trying to achieve?"
                            className={`${fieldClass("projectDetails")} resize-none`}
                          />
                          {errors.projectDetails && (
                            <p
                              id="pf-projectDetails-error"
                              role="alert"
                              className="mt-1 text-[11.5px] font-medium text-rose-600"
                            >
                              {errors.projectDetails}
                            </p>
                          )}
                        </div>
                      </div>

                      {status === "error" && errorMessage && (
                        <p
                          role="alert"
                          className="mt-3.5 rounded-xl bg-rose-50 px-3.5 py-2.5 text-[12.5px] font-medium text-rose-700"
                        >
                          {errorMessage}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={submitting}
                        className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0f6dff] text-[14px] font-semibold text-white transition-colors hover:bg-[#0b57d0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                            Sending…
                          </>
                        ) : (
                          "Send Enquiry"
                        )}
                      </button>

                      <p className="mt-2.5 flex items-center justify-center gap-1.5 text-center text-[11px] text-slate-400">
                        <Phone className="h-3 w-3" aria-hidden />
                        We reply as soon as possible, usually the same working day.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
