"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

const services = [
  "Website Development",
  "Website Redesign",
  "SEO Services",
  "AI SEO",
  "Digital Marketing",
  "Social Media Marketing",
  "E-Commerce Development",
  "Other",
];
const budgets = ["Not decided yet", "Under $500", "$500–$1,000", "$1,000–$3,000", "$3,000+"];

type RequiredField = "fullName" | "workEmail" | "serviceInterestedIn" | "projectDetails";
type FieldErrors = Partial<Record<RequiredField, string>>;

const fieldClass = "mt-2 block w-full min-w-0 rounded-xl border border-slate-200 bg-[#f8fafc] px-4 text-[14px] text-[#0b1528] outline-none transition-colors placeholder:text-slate-400 focus:border-[#0f6dff] focus:ring-4 focus:ring-[#0f6dff]/10";
const labelClass = "block text-[13px] font-bold text-[#0b1528]";

export function ProjectEnquiryForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const submittingRef = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const fields = {
      fullName: value("fullName"),
      workEmail: value("workEmail"),
      phoneNumber: value("phoneNumber"),
      companyWebsite: value("companyWebsite"),
      serviceInterestedIn: value("serviceInterestedIn"),
      estimatedBudget: value("estimatedBudget"),
      projectDetails: value("projectDetails"),
    };
    const nextErrors: FieldErrors = {};
    if (!fields.fullName) nextErrors.fullName = "Please enter your full name.";
    if (!fields.workEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.workEmail)) {
      nextErrors.workEmail = "Please enter a valid work email.";
    }
    if (!services.includes(fields.serviceInterestedIn)) nextErrors.serviceInterestedIn = "Please select a service.";
    if (!fields.projectDetails) nextErrors.projectDetails = "Please tell us about your project.";

    setErrors(nextErrors);
    setErrorMessage("");
    setStatus("idle");
    const firstError = Object.keys(nextErrors)[0] as RequiredField | undefined;
    if (firstError) {
      (form.elements.namedItem(firstError) as HTMLElement | null)?.focus();
      return;
    }

    submittingRef.current = true;
    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "Project Enquiry",
          fields,
          pageUrl: window.location.href,
          referrer: document.referrer,
          websiteConfirm: value("websiteConfirm"),
        }),
      });
      const result = (await response.json().catch(() => ({}))) as { success?: boolean; error?: string };
      if (!response.ok || result.success !== true) {
        throw new Error(result.error || "We could not send your enquiry. Please try again.");
      }
      form.reset();
      setStatus("success");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "We could not send your enquiry. Please try again.");
      setStatus("error");
    } finally {
      submittingRef.current = false;
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative mt-6">
      <input type="text" name="websiteConfirm" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />
      <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
        <div>
          <label htmlFor="newcontact-name" className={labelClass}>Full Name <span aria-hidden="true" className="text-[#0f6dff]">*</span></label>
          <input id="newcontact-name" name="fullName" required maxLength={200} autoComplete="name" placeholder="Your full name" aria-invalid={!!errors.fullName} aria-describedby={errors.fullName ? "newcontact-name-error" : undefined} className={`${fieldClass} h-12`} />
          {errors.fullName && <p id="newcontact-name-error" className="mt-1.5 text-[12px] text-rose-700">{errors.fullName}</p>}
        </div>
        <div>
          <label htmlFor="newcontact-email" className={labelClass}>Work Email <span aria-hidden="true" className="text-[#0f6dff]">*</span></label>
          <input id="newcontact-email" name="workEmail" type="email" required maxLength={254} autoComplete="email" placeholder="you@company.com" aria-invalid={!!errors.workEmail} aria-describedby={errors.workEmail ? "newcontact-email-error" : undefined} className={`${fieldClass} h-12`} />
          {errors.workEmail && <p id="newcontact-email-error" className="mt-1.5 text-[12px] text-rose-700">{errors.workEmail}</p>}
        </div>
        <div>
          <label htmlFor="newcontact-phone" className={labelClass}>Phone Number <span className="font-normal text-slate-500">(optional)</span></label>
          <input id="newcontact-phone" name="phoneNumber" type="tel" maxLength={100} autoComplete="tel" placeholder="Your phone number" className={`${fieldClass} h-12`} />
        </div>
        <div>
          <label htmlFor="newcontact-company" className={labelClass}>Company / Website <span className="font-normal text-slate-500">(optional)</span></label>
          <input id="newcontact-company" name="companyWebsite" maxLength={300} autoComplete="organization" placeholder="Company or website" className={`${fieldClass} h-12`} />
        </div>
        <div>
          <label htmlFor="newcontact-service" className={labelClass}>Service Interested In <span aria-hidden="true" className="text-[#0f6dff]">*</span></label>
          <select id="newcontact-service" name="serviceInterestedIn" defaultValue="" required aria-invalid={!!errors.serviceInterestedIn} aria-describedby={errors.serviceInterestedIn ? "newcontact-service-error" : undefined} className={`${fieldClass} h-12`}>
            <option value="" disabled>Select a service</option>
            {services.map((service) => <option key={service} value={service}>{service}</option>)}
          </select>
          {errors.serviceInterestedIn && <p id="newcontact-service-error" className="mt-1.5 text-[12px] text-rose-700">{errors.serviceInterestedIn}</p>}
        </div>
        <div>
          <label htmlFor="newcontact-budget" className={labelClass}>Estimated Budget <span className="font-normal text-slate-500">(optional)</span></label>
          <select id="newcontact-budget" name="estimatedBudget" defaultValue="" className={`${fieldClass} h-12`}>
            <option value="">Select a budget</option>
            {budgets.map((budget) => <option key={budget} value={budget}>{budget}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="newcontact-project" className={labelClass}>Tell us about your project <span aria-hidden="true" className="text-[#0f6dff]">*</span></label>
          <textarea id="newcontact-project" name="projectDetails" required maxLength={5000} rows={4} placeholder="Your goals, challenges or anything else you'd like us to know" aria-invalid={!!errors.projectDetails} aria-describedby={errors.projectDetails ? "newcontact-project-error" : undefined} className={`${fieldClass} resize-y py-3 leading-relaxed`} />
          {errors.projectDetails && <p id="newcontact-project-error" className="mt-1.5 text-[12px] text-rose-700">{errors.projectDetails}</p>}
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === "submitting"} className="inline-flex h-[52px] items-center justify-center gap-2.5 rounded-xl bg-[#0f6dff] px-7 text-[15px] font-semibold text-white shadow-[0_10px_26px_-6px_rgba(15,109,255,0.4)] transition-colors hover:bg-[#0b57d0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff] disabled:cursor-not-allowed disabled:opacity-70">
          {status === "submitting" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <>Send Project Enquiry <ArrowRight className="h-4 w-4" /></>}
        </button>
        <p className="text-[12px] text-slate-500"><span aria-hidden="true" className="text-[#0f6dff]">*</span> Required fields</p>
      </div>
      {status === "success" && <p role="status" className="mt-4 text-[14px] font-medium text-emerald-700">Thank you — your project enquiry has been sent.</p>}
      {status === "error" && <p role="alert" className="mt-4 text-[14px] font-medium text-rose-700">{errorMessage}</p>}
    </form>
  );
}
