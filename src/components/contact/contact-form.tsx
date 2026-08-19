"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { submitWebsiteForm } from "@/lib/forms/submit-form";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  service: z.string().min(1, "Select a service"),
  budget: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export const contactServices = [
  "Website Development",
  "Website Redesign",
  "Landing Page Development",
  "E-Commerce Development",
  "SEO / AI SEO",
  "Technical SEO",
  "Local SEO",
  "AI Content Optimisation",
  "Link Building",
  "Something else",
];

const inputCls =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-slate-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-600/10";

export function ContactForm({ light = false }: { light?: boolean }) {
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
      await submitWebsiteForm("Contact Form", data, honeypot);
      setSent(true);
      reset();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "We could not send your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const labelCls = light
    ? "mb-1.5 block text-sm font-medium text-white/90"
    : "mb-1.5 block text-sm font-medium text-slate-600";
  const fieldCls = light
    ? inputCls.replace("bg-white", "bg-white/10 text-white placeholder:text-white/50 border-white/25")
    : inputCls;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl border border-line bg-white p-6 shadow-lift sm:p-8"
    >
      <input name="websiteConfirm" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />
      <h3 className="font-display text-xl font-bold text-ink">
        Send us a message
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        We'll get back within 24 hours.
      </p>

      <div className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Name</label>
            <input {...register("name")} placeholder="Your name" className={fieldCls} />
            {errors.name && (
              <p className="mt-1 text-xs font-medium text-rose-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className={labelCls}>Email</label>
            <input {...register("email")} placeholder="you@company.com" className={fieldCls} />
            {errors.email && (
              <p className="mt-1 text-xs font-medium text-rose-500">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Service</label>
            <select {...register("service")} className={fieldCls} defaultValue="">
              <option value="" disabled>
                What do you need?
              </option>
              {contactServices.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errors.service && (
              <p className="mt-1 text-xs font-medium text-rose-500">{errors.service.message}</p>
            )}
          </div>
          <div>
            <label className={labelCls}>Budget (optional)</label>
            <select {...register("budget")} className={fieldCls} defaultValue="">
              <option value="">Select a range</option>
              <option>Under $2,000</option>
              <option>$2,000 – $5,000</option>
              <option>$5,000 – $10,000</option>
              <option>$10,000+</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelCls}>Project details (optional)</label>
          <textarea
            {...register("message")}
            placeholder="Tell us a bit about your project"
            rows={4}
            className={fieldCls + " resize-none"}
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
              Send Message
              <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
