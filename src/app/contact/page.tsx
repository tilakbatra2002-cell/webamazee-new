import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { staticMetadata } from "@/lib/static-pages";
import { site } from "@/lib/site";
import { ProjectEnquiryForm } from "@/components/contact/project-enquiry-form";

/** Booking link, kept local per the existing /faq and /products pattern. */
const CALENDLY_URL = "https://calendly.com/webamazee0411/30min";

/** Production metadata for /contact. */
export const metadata: Metadata = staticMetadata("contact");

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white pt-16 text-[#0b1528] selection:bg-[#0f6dff]/15 selection:text-[#0b57d0] sm:pt-20">
      <div id="main-content" className="overflow-x-clip">
        <section className="border-b border-slate-200/80 bg-[#f4f8ff] py-10">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
            <div className="grid items-start gap-9 lg:grid-cols-12 lg:gap-12 xl:gap-16">
              <div className="lg:col-span-5 lg:py-3">
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">Contact Webamazee</p>
                <h1 className="mt-4 max-w-xl font-display text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] text-[#0b1528] sm:text-[3rem] lg:text-[3.55rem]">
                  Let&apos;s Talk About Your <span className="text-[#0f6dff]">Next Big Idea.</span>
                </h1>
                <p className="mt-5 max-w-xl text-[17px] leading-[1.65] text-slate-600 sm:text-[18.5px]">
                  Tell us what you&apos;re planning. Whether you need a new website, better search visibility or a complete digital marketing strategy, let&apos;s explore how we can help.
                </p>
                <div className="mt-9 max-w-lg border-t border-slate-200">
                  <div className="grid gap-1 border-b border-slate-200 py-4 sm:grid-cols-[120px_1fr] sm:gap-4">
                    <span className="text-[13px] font-semibold text-slate-500">Email</span>
                    <a href={`mailto:${site.email}`} className="break-all text-[15px] font-semibold text-[#0b1528] transition-colors hover:text-[#0f6dff]">{site.email}</a>
                  </div>
                  <div className="grid gap-1 border-b border-slate-200 py-4 sm:grid-cols-[120px_1fr] sm:gap-4">
                    <span className="text-[13px] font-semibold text-slate-500">Phone</span>
                    <a href={`tel:${site.phoneIntl}`} className="text-[15px] font-semibold text-[#0b1528] transition-colors hover:text-[#0f6dff]">{site.phone}</a>
                  </div>
                  <div className="grid gap-1 border-b border-slate-200 py-4 sm:grid-cols-[120px_1fr] sm:gap-4">
                    <span className="text-[13px] font-semibold text-slate-500">Availability</span>
                    <span className="text-[15px] font-semibold text-[#0b1528]">Serving businesses worldwide</span>
                  </div>
                </div>
              </div>
              <div className="min-w-0 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_20px_50px_-25px_rgba(11,21,40,0.22)] sm:p-8 lg:col-span-7">
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">Start a Project</p>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.025em] text-[#0b1528] sm:text-3xl">Tell us what you have in mind.</h2>
                <p className="mt-2 text-[14px] leading-relaxed text-slate-600">Share a few details and we&apos;ll take it from there.</p>
                <ProjectEnquiryForm />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-10">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-6 rounded-2xl border border-slate-200/90 bg-[#f7f9fc] p-6 sm:p-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-8">
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">Prefer to Talk?</p>
                <h2 className="mt-2 font-display text-3xl font-bold tracking-[-0.025em] text-[#0b1528] sm:text-4xl">Not Sure Where to Start?</h2>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-600 sm:text-[16px]">Book a free 30-minute conversation and let&apos;s identify the right next step for your business.</p>
              </div>
              <div className="lg:col-span-4 lg:flex lg:justify-end">
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex h-[52px] items-center justify-center gap-2.5 rounded-xl bg-[#0f6dff] px-7 text-[15px] font-semibold text-white shadow-[0_10px_26px_-6px_rgba(15,109,255,0.4)] transition-colors hover:bg-[#0b57d0]">
                  Book a Free Consultation <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
