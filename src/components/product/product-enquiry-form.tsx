"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { submitWebsiteForm } from "@/lib/forms/submit-form";
import { trackEvent } from "@/lib/analytics";

const schema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name"),
  workEmail: z.string().trim().email("Enter a valid work email"),
  companyName: z.string().trim().min(2, "Please enter your company name"),
  phone: z.string().trim().min(6, "Please enter a valid phone number"),
  businessType: z.string().trim().min(1, "Please enter your business type"),
  employees: z.string().min(1, "Select number of employees"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const employeeRanges = ["1 – 10", "11 – 50", "51 – 200", "200+"];

const inputCls =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-slate-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-600/10";
const labelCls = "mb-1.5 block text-sm font-medium text-slate-600";

export function ProductEnquiryForm({
  productName,
  requestType,
  onSuccess,
}: {
  /** e.g. "Logistics CRM" or "Academy CRM" — auto-populated, not user-editable. */
  productName: string;
  /** "Try for Free" or "Book a Demo" — captured so the team knows the intent. */
  requestType: "Try for Free" | "Book a Demo";
  onSuccess?: () => void;
}) {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    setSent(false);
    setSubmitError("");
    reset();
  }, [productName, requestType, reset]);

  async function onSubmit(data: FormData, event?: React.BaseSyntheticEvent) {
    setSubmitting(true);
    setSubmitError("");
    try {
      const form = event?.currentTarget as HTMLFormElement | undefined;
      const honeypot = form ? String(new window.FormData(form).get("websiteConfirm") ?? "") : "";
      await submitWebsiteForm(
        "Product Enquiry",
        {
          requestType,
          productInterestedIn: productName,
          fullName: data.fullName,
          workEmail: data.workEmail,
          companyName: data.companyName,
          phone: data.phone,
          businessType: data.businessType,
          employees: data.employees,
          message: data.message || "",
        },
        honeypot
      );
      setSent(true);
      trackEvent("product_enquiry_submitted", { product: productName, requestType });
      reset();
      onSuccess?.();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "We could not send your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-3xl border border-line bg-white p-6 text-center shadow-soft sm:p-8">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/10 text-success">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="mt-4 font-display text-xl font-bold text-ink">Request received</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Thanks for your interest in {productName}. Our team will reach out within 24 hours to help you get started.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-8"
    >
      <input
        name="websiteConfirm"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px opacity-0"
      />

      <div className="space-y-4">
        <div>
          <label htmlFor="pe-product" className={labelCls}>
            Product Interested In
          </label>
          <input
            id="pe-product"
            type="text"
            value={productName}
            readOnly
            aria-readonly="true"
            className={`${inputCls} cursor-not-allowed bg-surface font-semibold text-brand-700`}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="pe-fullName" className={labelCls}>
              Full Name
            </label>
            <input id="pe-fullName" {...register("fullName")} placeholder="Your full name" className={inputCls} />
            {errors.fullName && <p className="mt-1 text-xs font-medium text-rose-500">{errors.fullName.message}</p>}
          </div>
          <div>
            <label htmlFor="pe-workEmail" className={labelCls}>
              Work Email
            </label>
            <input
              id="pe-workEmail"
              type="email"
              {...register("workEmail")}
              placeholder="you@company.com"
              className={inputCls}
            />
            {errors.workEmail && <p className="mt-1 text-xs font-medium text-rose-500">{errors.workEmail.message}</p>}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="pe-companyName" className={labelCls}>
              Company Name
            </label>
            <input id="pe-companyName" {...register("companyName")} placeholder="Your company" className={inputCls} />
            {errors.companyName && (
              <p className="mt-1 text-xs font-medium text-rose-500">{errors.companyName.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="pe-phone" className={labelCls}>
              Phone Number
            </label>
            <input id="pe-phone" type="tel" {...register("phone")} placeholder="+91 00000 00000" className={inputCls} />
            {errors.phone && <p className="mt-1 text-xs font-medium text-rose-500">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="pe-businessType" className={labelCls}>
              Business Type
            </label>
            <input
              id="pe-businessType"
              {...register("businessType")}
              placeholder="e.g. Transport company, Coaching institute"
              className={inputCls}
            />
            {errors.businessType && (
              <p className="mt-1 text-xs font-medium text-rose-500">{errors.businessType.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="pe-employees" className={labelCls}>
              Number of Employees
            </label>
            <select id="pe-employees" {...register("employees")} className={inputCls} defaultValue="">
              <option value="" disabled>
                Select a range
              </option>
              {employeeRanges.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            {errors.employees && <p className="mt-1 text-xs font-medium text-rose-500">{errors.employees.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="pe-message" className={labelCls}>
            Message (optional)
          </label>
          <textarea
            id="pe-message"
            {...register("message")}
            placeholder="Tell us a bit about your business or requirements"
            rows={3}
            className={`${inputCls} resize-none`}
          />
        </div>

        {submitError && (
          <p role="alert" className="rounded-xl bg-rose-50 px-3 py-2.5 text-sm font-medium text-rose-600">
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-brand-gradient py-3.5 text-sm font-semibold text-white shadow-glow transition-all hover:shadow-glow-lg disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              {requestType === "Book a Demo" ? "Request Demo" : "Send Request"}
              <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </>
          )}
        </button>
        <p className="text-center text-xs text-slate-400">We'll get back within 24 hours.</p>
      </div>
    </form>
  );
}
