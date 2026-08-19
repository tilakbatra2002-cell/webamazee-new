"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Sparkles, Send, CheckCircle2, CalendarCheck, ShieldCheck, Loader2 } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui";
import { Eyebrow } from "../ui/eyebrow";
import { clientsServedStat, formatGlobalStat } from "@/lib/stats";
import { submitWebsiteForm } from "@/lib/forms/submit-form";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  service: z.string().min(1, "Select a service"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const services = [
  "Website Development",
  "Website Redesign",
  "SEO / AI SEO",
  "E-Commerce Development",
  "Landing Page",
  "Something else",
];

const inputCls =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-slate-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-600/10";

export function FinalCTA() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData, event?: React.BaseSyntheticEvent) {
    setSubmitting(true);
    setSubmitError("");
    try {
      const form = event?.currentTarget as HTMLFormElement | undefined;
      const honeypot = form ? String(new window.FormData(form).get("websiteConfirm") ?? "") : "";
      await submitWebsiteForm("Homepage Proposal", data, honeypot);
      setSent(true);
      reset();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "We could not send your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Section id="cta" className="relative overflow-hidden bg-surface">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="grain relative overflow-hidden rounded-[2rem] bg-brand-gradient p-8 shadow-glow-xl sm:p-12 lg:p-16"
        >
          <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl animate-aurora" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-brand-300/30 blur-3xl animate-aurora" style={{ animationDelay: "2.5s" }} />
          <div className="pointer-events-none absolute inset-0 grid-pattern opacity-10" />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full opacity-40 blur-2xl"
            style={{
              background: "conic-gradient(from 90deg, transparent, rgba(255,255,255,0.35), transparent 40%)",
              animation: "spin-slow 24s linear infinite",
            }}
          />

          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            <div className="text-white">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> Free 30-min Strategy Call
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl text-balance">
                Ready to grow with AI-powered marketing?
              </h2>
              <p className="mt-4 max-w-md text-white/80">
                Tell us about your business and we'll reply with a personalised
                roadmap — free, no strings attached.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "Free personalised growth roadmap",
                  "Response within 24 hours",
                  "No lock-ins, no hidden fees",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-white/90">
                    <CheckCircle2 className="h-5 w-5 text-white" /> {t}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/80">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur">
                  <CalendarCheck className="h-4 w-4" /> Worldwide
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur">
                  <ShieldCheck className="h-4 w-4" /> Trusted by {formatGlobalStat(clientsServedStat)} clients
                </span>
              </div>
            </div>

            {/* form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-3xl border border-white/40 bg-white/95 p-6 shadow-lift backdrop-blur-xl sm:p-8"
            >
              <input name="websiteConfirm" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />
              <h3 className="font-display text-xl font-bold text-ink">
                Get your free proposal
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                We'll get back within 24 hours.
              </p>

              <div className="mt-5 space-y-4">
                <div>
                  <input
                    {...register("name")}
                    placeholder="Your name"
                    className={inputCls}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs font-medium text-rose-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register("email")}
                    placeholder="Email address"
                    className={inputCls}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs font-medium text-rose-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <select {...register("service")} className={inputCls} defaultValue="">
                    <option value="" disabled>
                      What do you need help with?
                    </option>
                    {services.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="mt-1 text-xs font-medium text-rose-500">
                      {errors.service.message}
                    </p>
                  )}
                </div>
                <div>
                  <textarea
                    {...register("message")}
                    placeholder="Tell us about your project (optional)"
                    rows={3}
                    className={inputCls + " resize-none"}
                  />
                </div>

                {submitError && <p role="alert" className="text-sm font-medium text-rose-600">{submitError}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-brand-gradient py-3.5 text-sm font-semibold text-white shadow-glow transition-all hover:shadow-glow-lg disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
                  ) : sent ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" /> Request sent — we'll be in touch!
                    </>
                  ) : (
                    <>
                      Send Request
                      <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
