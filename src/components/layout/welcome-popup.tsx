"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/layout/logo";

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

  const setField = (key: keyof typeof EMPTY_FORM) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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
      const honeypot = String(
        new FormData(e.currentTarget).get("websiteConfirm") ?? ""
      );
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
    "w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-ink outline-none transition-all placeholder:text-slate-400";
  const inputIdle = "border-line focus:border-brand-600 focus:ring-4 focus:ring-brand-600/10";
  const inputError = "border-rose-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10";
  const fieldClass = (key: keyof typeof EMPTY_FORM) =>
    `${inputBase} ${errors[key] ? inputError : inputIdle}`;

  const submitting = status === "submitting";

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
            className="relative w-full max-w-[820px] overflow-hidden rounded-[28px] bg-white shadow-[0_40px_110px_-30px_rgba(15,109,255,0.38),0_14px_44px_-14px_rgba(17,24,39,0.20)] ring-1 ring-slate-200/70 outline-none"
          >
            {/* Close */}
            <button
              type="button"
              onClick={close}
              aria-label="Close popup"
              className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full border border-line bg-white text-2xl leading-none text-slate-400 transition-all duration-200 hover:border-brand-600/30 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              &times;
            </button>

            <div className="max-h-[92vh] overflow-y-auto overflow-x-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                {/* LEFT — branding */}
                <div className="bg-gradient-to-b from-brand-50 to-white px-6 py-8 sm:px-8 lg:px-9 lg:py-10">
                  <Logo />

                  <h2
                    id="popup-enquiry-title"
                    className="mt-7 font-display text-[1.7rem] font-bold leading-[1.15] tracking-tight text-ink text-balance sm:text-[2rem]"
                  >
                    Let&apos;s Grow Your Business Together.
                  </h2>

                  <p className="mt-4 text-[15px] leading-relaxed text-slate-600 text-pretty">
                    Looking for a better website, stronger SEO or smarter digital
                    marketing? Tell us what you need. Let&apos;s make it happen.
                  </p>

                  <p className="mt-6 border-t border-brand-100 pt-5 text-[13px] font-semibold tracking-tight text-brand-700">
                    Your next digital move starts here.
                  </p>
                </div>

                {/* RIGHT — enquiry form */}
                <div className="px-6 py-8 sm:px-8 lg:px-9 lg:py-10">
                  <h3 className="font-display text-xl font-bold tracking-tight text-ink">
                    Let&apos;s Talk About Your Project
                  </h3>

                  {status === "success" ? (
                    <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/50 p-6">
                      <p className="font-display text-lg font-bold text-ink">
                        Thank you — your enquiry is on its way.
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        We&apos;ll get back to you as soon as possible.
                      </p>
                    </div>
                  ) : (
                    <form ref={formRef} onSubmit={handleSubmit} noValidate className="mt-6">
                      {/* Honeypot */}
                      <input
                        name="websiteConfirm"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        className="absolute -left-[9999px] h-px w-px opacity-0"
                      />

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                          <label htmlFor="pf-fullName" className="mb-1.5 block text-[13px] font-medium text-slate-600">
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
                            <p id="pf-fullName-error" role="alert" className="mt-1.5 text-xs font-medium text-rose-600">
                              {errors.fullName}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-1">
                          <label htmlFor="pf-workEmail" className="mb-1.5 block text-[13px] font-medium text-slate-600">
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
                            <p id="pf-workEmail-error" role="alert" className="mt-1.5 text-xs font-medium text-rose-600">
                              {errors.workEmail}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-1">
                          <label htmlFor="pf-phoneNumber" className="mb-1.5 block text-[13px] font-medium text-slate-600">
                            Phone Number <span className="font-normal text-slate-500">(optional)</span>
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

                        <div className="sm:col-span-1">
                          <label htmlFor="pf-serviceRequired" className="mb-1.5 block text-[13px] font-medium text-slate-600">
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
                            aria-describedby={errors.serviceRequired ? "pf-serviceRequired-error" : undefined}
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
                            <p id="pf-serviceRequired-error" role="alert" className="mt-1.5 text-xs font-medium text-rose-600">
                              {errors.serviceRequired}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="pf-projectDetails" className="mb-1.5 block text-[13px] font-medium text-slate-600">
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
                            aria-describedby={errors.projectDetails ? "pf-projectDetails-error" : undefined}
                            placeholder="What are you trying to achieve?"
                            className={`${fieldClass("projectDetails")} resize-none`}
                          />
                          {errors.projectDetails && (
                            <p id="pf-projectDetails-error" role="alert" className="mt-1.5 text-xs font-medium text-rose-600">
                              {errors.projectDetails}
                            </p>
                          )}
                        </div>
                      </div>

                      {status === "error" && errorMessage && (
                        <p role="alert" className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                          {errorMessage}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={submitting}
                        className="mt-5 h-[3.1rem] w-full rounded-xl bg-brand-gradient text-[15px] font-semibold tracking-tight text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                      >
                        {submitting ? "Sending…" : "Send Enquiry"}
                      </button>

                      <p className="mt-3 text-center text-xs text-slate-500">
                        We&apos;ll get back to you as soon as possible.
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
