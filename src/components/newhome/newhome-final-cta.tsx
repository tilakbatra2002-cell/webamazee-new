"use client";

import { ArrowUpRight, Calendar, Mail, Phone } from "lucide-react";
import { CALENDLY_URL, VERIFIED_CONTACT } from "./newhome-data";
import { triggerConsultationForm } from "./enquiry-event";

export function NewHomeFinalCta() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-[#1a2c4e] bg-[#0b1528] px-6 py-14 text-white shadow-[0_24px_60px_-24px_rgba(11,21,40,0.45)] sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          {/* Subtle architectural top accent + blueprint grid */}
          <div className="absolute inset-x-0 top-0 h-1 bg-[#0f6dff]" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(77,163,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(77,163,255,0.12) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />

          <div className="relative grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#0f6dff]/40 bg-[#0f6dff]/15 px-3.5 py-1 text-xs font-semibold tracking-wide text-[#8ec5ff]">
                <Calendar className="h-3.5 w-3.5" />
                30-Minute Discovery &amp; Strategy Call
              </span>

              <h2 className="mt-5 font-display text-3xl font-bold tracking-[-0.025em] text-white sm:text-4xl lg:text-[2.85rem] lg:leading-[1.1]">
                Ready to Grow Your Business Online?
              </h2>

              <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-slate-300 sm:text-lg">
                Let&apos;s discuss your website, SEO and digital marketing
                goals.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13.5px] font-medium text-slate-300">
                <a
                  href={VERIFIED_CONTACT.phoneHref}
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 text-[#4da3ff]" />
                  {VERIFIED_CONTACT.phone}
                </a>
                <a
                  href={`mailto:${VERIFIED_CONTACT.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 text-[#4da3ff]" />
                  {VERIFIED_CONTACT.email}
                </a>
              </div>
            </div>

            <div className="flex flex-col items-stretch gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-end">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[54px] w-full items-center justify-center gap-2.5 rounded-xl bg-[#0f6dff] px-8 text-[16px] font-semibold text-white shadow-[0_12px_28px_-6px_rgba(15,109,255,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#257bff] sm:w-auto lg:w-full"
              >
                Let&apos;s Talk
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={() => triggerConsultationForm()}
                className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 text-[14px] font-semibold text-slate-200 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white sm:w-auto lg:w-full"
              >
                Or Send Written Project Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
