"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  Loader2,
  Star,
  Calendar,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { submitWebsiteForm } from "@/lib/forms/submit-form";
import { GOOGLE_REVIEWS_URL } from "@/lib/testimonials";
import {
  CALENDLY_URL,
  HERO_SERVICE_OPTIONS,
  VERIFIED_CONTACT,
} from "./newhome-data";
import {
  SELECT_SERVICE_EVENT,
  triggerConsultationForm,
} from "./enquiry-event";

const heroFormSchema = z.object({
  websiteUrl: z
    .string()
    .trim()
    .max(300, "Website URL is too long")
    .optional()
    .or(z.literal("")),
  name: z.string().trim().min(2, "Please enter your name"),
  workEmail: z.string().trim().email("Please enter a valid work email"),
  serviceInterestedIn: z
    .string()
    .trim()
    .min(1, "Please select a service you are interested in"),
});

type HeroFormValues = z.infer<typeof heroFormSchema>;

export function NewHomeHero() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [highlighted, setHighlighted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<HeroFormValues>({
    resolver: zodResolver(heroFormSchema),
    defaultValues: {
      websiteUrl: "",
      name: "",
      workEmail: "",
      serviceInterestedIn: "",
    },
  });

  useEffect(() => {
    const onSelectService = (event: Event) => {
      const custom = event as CustomEvent<{ service?: string }>;
      if (custom.detail?.service) {
        setValue("serviceInterestedIn", custom.detail.service, {
          shouldValidate: true,
        });
      }
      setSubmitted(false);
      setHighlighted(true);
      const timer = window.setTimeout(() => setHighlighted(false), 1600);
      return () => window.clearTimeout(timer);
    };

    window.addEventListener(SELECT_SERVICE_EVENT, onSelectService);
    return () =>
      window.removeEventListener(SELECT_SERVICE_EVENT, onSelectService);
  }, [setValue]);

  async function onSubmit(
    values: HeroFormValues,
    event?: React.BaseSyntheticEvent
  ) {
    setSubmitting(true);
    setSubmitError("");
    try {
      const formEl = event?.currentTarget as HTMLFormElement | undefined;
      const honeypot = formEl
        ? String(new window.FormData(formEl).get("websiteConfirm") ?? "")
        : "";

      await submitWebsiteForm(
        "Newhome Hero Consultation",
        {
          websiteUrl: values.websiteUrl?.trim() || "Not provided",
          name: values.name.trim(),
          workEmail: values.workEmail.trim(),
          serviceInterestedIn: values.serviceInterestedIn,
        },
        honeypot
      );

      setSubmitted(true);
      reset();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "We could not send your request right now. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  const inputBase =
    "h-11 w-full rounded-xl border border-slate-200 bg-[#f8fafc] px-3.5 text-[14px] text-[#0b1528] outline-none transition-all placeholder:text-slate-400 focus:border-[#0f6dff] focus:bg-white focus:ring-4 focus:ring-[#0f6dff]/10";

  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-[#f4f8ff] via-white to-white py-10">
      {/* Subtle architectural blueprint lines — understated, zero clutter */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-[0.38]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15,109,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,109,255,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* LEFT COLUMN — Headline, value proposition, CTAs, agency credentials */}
          <div className="lg:col-span-7">
            {/* Location line */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#0f6dff]/20 bg-white px-4 py-1.5 shadow-[0_2px_10px_rgba(15,109,255,0.06)]">
              <span className="h-2 w-2 rounded-full bg-[#0f6dff]" />
              <span className="text-[13px] font-semibold tracking-tight text-[#0b1528] sm:text-[13.5px]">
                Serving Chandigarh Tricity and businesses worldwide.
              </span>
            </div>

            {/* Required H1 */}
            <h1 className="mt-6 font-display text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] text-[#0b1528] sm:text-[3rem] lg:text-[3.55rem]">
              Websites &amp; Digital Marketing That{" "}
              <span className="text-[#0f6dff]">Grow Your Business.</span>
            </h1>

            {/* Required supporting text */}
            <p className="mt-5 max-w-2xl text-[17px] leading-[1.65] text-slate-600 sm:text-[18.5px]">
              From professional websites to SEO and digital marketing, we help
              businesses build a stronger online presence.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => triggerConsultationForm()}
                className="inline-flex h-[52px] items-center justify-center gap-2.5 rounded-xl bg-[#0f6dff] px-7 text-[15px] font-semibold text-white shadow-[0_10px_26px_-6px_rgba(15,109,255,0.48)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0b57d0] hover:shadow-[0_14px_30px_-6px_rgba(15,109,255,0.56)]"
              >
                Get a Free Consultation
                <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href="#case-studies"
                className="inline-flex h-[52px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 text-[15px] font-semibold text-[#0b1528] transition-all duration-200 hover:border-[#0f6dff] hover:text-[#0f6dff]"
              >
                Explore Our Work
              </a>
            </div>

            {/* Factual agency trust & capability bar — zero invented stats */}
            <div className="mt-10 grid gap-5 border-t border-slate-200/90 pt-7 sm:grid-cols-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <div
                    className="flex items-center gap-0.5 text-amber-400"
                    aria-label="5 out of 5 stars on Google"
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#0b1528]">5.0</span>
                </div>
                <a
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-[13px] font-semibold text-slate-600 transition-colors hover:text-[#0f6dff]"
                >
                  Verified Google Reviews
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>

              <div className="sm:border-l sm:border-slate-200 sm:pl-5">
                <p className="text-[13px] font-bold text-[#0b1528]">
                  Web &amp; Growth Under One Roof
                </p>
                <p className="mt-0.5 text-[12.5px] leading-snug text-slate-500">
                  Design, development, SEO, AI SEO &amp; social media aligned.
                </p>
              </div>

              <div className="sm:border-l sm:border-slate-200 sm:pl-5">
                <p className="text-[13px] font-bold text-[#0b1528]">
                  Clear Scope &amp; Pricing
                </p>
                <p className="mt-0.5 text-[12.5px] leading-snug text-slate-500">
                  Upfront INR &amp; USD packages with defined deliverables.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Integrated Hero Enquiry Form */}
          <div className="lg:col-span-5">
            <div
              id="hero-enquiry"
              className={`relative overflow-hidden rounded-2xl border bg-white p-6 transition-all duration-300 sm:p-8 ${
                highlighted
                  ? "border-[#0f6dff] ring-4 ring-[#0f6dff]/15 shadow-[0_24px_60px_-15px_rgba(15,109,255,0.28)]"
                  : "border-slate-200/90 shadow-[0_20px_50px_-20px_rgba(11,21,40,0.14)]"
              }`}
            >
              {/* Crisp top brand accent bar */}
              <div className="absolute inset-x-0 top-0 h-1 bg-[#0f6dff]" />

              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0f6dff]">
                    Free Project &amp; Growth Review
                  </span>
                  <h2 className="mt-1 font-display text-[1.35rem] font-bold tracking-tight text-[#0b1528]">
                    Request Your Free Consultation
                  </h2>
                </div>
                <span className="hidden shrink-0 items-center gap-1 rounded-full bg-[#eef5ff] px-2.5 py-1 text-[11px] font-semibold text-[#0f6dff] sm:inline-flex">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  No Obligation
                </span>
              </div>

              <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-500">
                Tell us what you are building or improving. Our team will review
                your goals and reply personally.
              </p>

              {submitted ? (
                <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/70 p-5">
                  <div className="flex items-center gap-2.5 text-emerald-800">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                    <p className="font-display text-base font-bold">
                      Thank you — we&apos;ve received your consultation request.
                    </p>
                  </div>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-emerald-900/80">
                    Our team will review your details and get back to you
                    shortly. Want to pick a time right away?
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <a
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#0f6dff] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0b57d0]"
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      Book a 30-Min Call
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="text-xs font-semibold text-slate-600 underline hover:text-[#0b1528]"
                    >
                      Send another enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="mt-5 space-y-4"
                >
                  {/* Honeypot field matching /api/contact */}
                  <input
                    name="websiteConfirm"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute -left-[9999px] h-px w-px opacity-0"
                  />

                  <div>
                    <label
                      htmlFor="nh-websiteUrl"
                      className="mb-1.5 flex items-center justify-between text-[13px] font-semibold text-[#1e293b]"
                    >
                      <span>Website URL</span>
                      <span className="text-[11.5px] font-normal text-slate-400">
                        Optional
                      </span>
                    </label>
                    <div className="relative">
                      <Globe className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        id="nh-websiteUrl"
                        type="text"
                        inputMode="url"
                        autoComplete="url"
                        placeholder="https://yourbusiness.com"
                        {...register("websiteUrl")}
                        className={`${inputBase} pl-9`}
                      />
                    </div>
                    {errors.websiteUrl && (
                      <p
                        role="alert"
                        className="mt-1 text-xs font-medium text-rose-600"
                      >
                        {errors.websiteUrl.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="nh-name"
                        className="mb-1.5 block text-[13px] font-semibold text-[#1e293b]"
                      >
                        Name <span className="text-[#0f6dff]">*</span>
                      </label>
                      <input
                        id="nh-name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        aria-invalid={!!errors.name}
                        {...register("name")}
                        className={inputBase}
                      />
                      {errors.name && (
                        <p
                          role="alert"
                          className="mt-1 text-xs font-medium text-rose-600"
                        >
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="nh-workEmail"
                        className="mb-1.5 block text-[13px] font-semibold text-[#1e293b]"
                      >
                        Work Email <span className="text-[#0f6dff]">*</span>
                      </label>
                      <input
                        id="nh-workEmail"
                        type="email"
                        autoComplete="email"
                        placeholder="you@company.com"
                        aria-invalid={!!errors.workEmail}
                        {...register("workEmail")}
                        className={inputBase}
                      />
                      {errors.workEmail && (
                        <p
                          role="alert"
                          className="mt-1 text-xs font-medium text-rose-600"
                        >
                          {errors.workEmail.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="nh-serviceInterestedIn"
                      className="mb-1.5 block text-[13px] font-semibold text-[#1e293b]"
                    >
                      Service Interested In{" "}
                      <span className="text-[#0f6dff]">*</span>
                    </label>
                    <select
                      id="nh-serviceInterestedIn"
                      aria-invalid={!!errors.serviceInterestedIn}
                      {...register("serviceInterestedIn")}
                      className={inputBase}
                    >
                      <option value="">Select a service...</option>
                      {HERO_SERVICE_OPTIONS.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                    {errors.serviceInterestedIn && (
                      <p
                        role="alert"
                        className="mt-1 text-xs font-medium text-rose-600"
                      >
                        {errors.serviceInterestedIn.message}
                      </p>
                    )}
                  </div>

                  {submitError && (
                    <div
                      role="alert"
                      className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-xs font-medium text-rose-700"
                    >
                      <p>{submitError}</p>
                      <p className="mt-1 text-rose-600/90">
                        You can also email us directly at{" "}
                        <a
                          href={`mailto:${VERIFIED_CONTACT.email}`}
                          className="font-semibold underline"
                        >
                          {VERIFIED_CONTACT.email}
                        </a>{" "}
                        or{" "}
                        <a
                          href={CALENDLY_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold underline"
                        >
                          schedule a call on Calendly
                        </a>
                        .
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0f6dff] px-6 text-[15px] font-semibold text-white shadow-[0_10px_24px_-6px_rgba(15,109,255,0.5)] transition-all duration-200 hover:bg-[#0b57d0] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending Request...
                      </>
                    ) : (
                      <>
                        Get My Free Consultation
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[12px] text-slate-500">
                    <span>Direct review by our team</span>
                    <a
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-[#0f6dff] hover:underline"
                    >
                      Or book a 30-min call
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
