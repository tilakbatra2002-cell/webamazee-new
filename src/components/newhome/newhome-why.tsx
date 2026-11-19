"use client";

import { ArrowRight, Phone, Mail, CheckCircle2 } from "lucide-react";
import { VERIFIED_CONTACT, WHY_CHOOSE_PILLARS } from "./newhome-data";
import { triggerConsultationForm } from "./enquiry-event";

export function NewHomeWhy() {
  return (
    <section
      id="why-webamazee"
      className="scroll-mt-24 bg-white py-10"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Sticky Agency Manifesto */}
          <div className="lg:sticky lg:top-28 lg:col-span-5">
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">
              Why Choose Webamazee
            </p>
            <h2 className="mt-2.5 font-display text-3xl font-bold tracking-[-0.025em] text-[#0b1528] sm:text-4xl lg:text-[2.5rem] lg:leading-[1.12]">
              One accountable digital team — built around practical business
              growth.
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-slate-600">
              Too many businesses lose time coordinating a separate web
              developer, an SEO freelancer, and a social media vendor who never
              speak to one another. At Webamazee, your website, search
              foundations, and marketing work together from day one.
            </p>

            {/* Concrete commitment checklist */}
            <ul className="mt-6 space-y-2.5 text-[14px] font-medium text-[#1e293b]">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0f6dff]" />
                No inflated promises or unverified vanity metrics
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0f6dff]" />
                Direct collaboration from Chandigarh Tricity to global time zones
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0f6dff]" />
                Written scope, clear deliverables, and upfront rate cards
              </li>
            </ul>

            {/* Direct agency contact card */}
            <div className="mt-8 rounded-2xl border border-slate-200/90 bg-[#f8fafc] p-6">
              <p className="font-display text-base font-bold text-[#0b1528]">
                Have questions before starting?
              </p>
              <p className="mt-1 text-[13.5px] text-slate-600">
                Speak directly with our team about your website, store, or
                search goals.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-[13.5px] font-semibold text-[#0b1528]">
                <a
                  href={VERIFIED_CONTACT.phoneHref}
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-[#0f6dff]"
                >
                  <Phone className="h-4 w-4 text-[#0f6dff]" />
                  {VERIFIED_CONTACT.phone}
                </a>
                <a
                  href={`mailto:${VERIFIED_CONTACT.email}`}
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-[#0f6dff]"
                >
                  <Mail className="h-4 w-4 text-[#0f6dff]" />
                  {VERIFIED_CONTACT.email}
                </a>
              </div>
              <button
                type="button"
                onClick={() => triggerConsultationForm()}
                className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl bg-[#0f6dff] px-5 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#0b57d0]"
              >
                Request a Free Consultation
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Right Column — 5 Architectural Trust Pillars */}
          <div className="lg:col-span-7">
            <div className="divide-y divide-slate-200/90 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_10px_30px_-18px_rgba(11,21,40,0.08)]">
              {WHY_CHOOSE_PILLARS.map((pillar) => (
                <div
                  key={pillar.number}
                  className="flex flex-col gap-4 p-6 transition-colors hover:bg-[#fafcff] sm:flex-row sm:items-start sm:gap-6 sm:p-8"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#0f6dff]/20 bg-[#eef5ff] font-display text-sm font-bold text-[#0f6dff]">
                    {pillar.number}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold tracking-tight text-[#0b1528]">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
