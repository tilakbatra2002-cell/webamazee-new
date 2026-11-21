"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowUp, ChevronDown, Mail, ShieldCheck } from "lucide-react";

interface PolicySection {
  id: string;
  number: string;
  heading: string;
  paragraphs: ReactNode[];
}

const POLICY_SECTIONS: PolicySection[] = [
  {
    id: "information-we-collect",
    number: "01",
    heading: "Information We Collect",
    paragraphs: [
      "When you use our website or services, we may collect information you provide directly — such as your name, email address, phone number and the details of your enquiry.",
      "We also collect certain information automatically, including your IP address, browser type, device information and pages you visit, to help us improve our website and services.",
    ],
  },
  {
    id: "how-we-use-your-information",
    number: "02",
    heading: "How We Use Your Information",
    paragraphs: [
      "We use your information to respond to enquiries, provide our services, process transactions, send relevant communications you have requested, and improve our website and offerings.",
      "We may also use aggregated, anonymised data for analytics and marketing purposes.",
    ],
  },
  {
    id: "cookies-and-tracking",
    number: "03",
    heading: "Cookies & Tracking",
    paragraphs: [
      "We use cookies and similar technologies to enhance your experience, remember your preferences and understand how our site is used.",
      "You can control or disable cookies through your browser settings. Note that some features may not function fully without cookies.",
    ],
  },
  {
    id: "data-sharing-and-security",
    number: "04",
    heading: "Data Sharing & Security",
    paragraphs: [
      "We do not sell your personal information. We may share data with trusted service providers who help us operate our business, subject to appropriate safeguards.",
      "We take reasonable measures to protect your information, but no method of transmission over the internet is 100% secure.",
    ],
  },
  {
    id: "your-rights",
    number: "05",
    heading: "Your Rights",
    paragraphs: [
      <>
        Depending on your location, you may have rights to access, correct, delete or restrict the use of your personal information. To exercise these rights, contact us at{" "}
        <a
          href="mailto:info@webamazee.com"
          className="font-semibold text-[#0f6dff] underline decoration-[#0f6dff]/35 underline-offset-4 transition-colors hover:text-[#0b57d0] hover:decoration-[#0f6dff]"
        >
          info@webamazee.com
        </a>
        .
      </>,
      "You may also opt out of marketing communications at any time by following the unsubscribe instructions in our emails.",
    ],
  },
  {
    id: "contact-us",
    number: "06",
    heading: "Contact Us",
    paragraphs: [
      <>
        If you have any questions about this Privacy Policy or how we handle your data, please contact us at{" "}
        <a
          href="mailto:info@webamazee.com"
          className="font-semibold text-[#0f6dff] underline decoration-[#0f6dff]/35 underline-offset-4 transition-colors hover:text-[#0b57d0] hover:decoration-[#0f6dff]"
        >
          info@webamazee.com
        </a>
        .
      </>,
    ],
  },
];

const CONTAINER = "mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8";

function PrivacyEmblem() {
  return (
    <div className="relative rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_14px_38px_-24px_rgba(11,21,40,0.14)] sm:p-6">
      <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#0f6dff]/15 bg-[#eff6ff] text-[#0f6dff]">
            <ShieldCheck aria-hidden="true" className="h-6 w-6 stroke-[1.8]" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">
              Policy Overview
            </p>
            <p className="mt-0.5 font-display text-[17px] font-bold text-[#0b1528]">
              Webamazee Privacy Policy
            </p>
          </div>
        </div>

        {/* Minimal architectural document-lock SVG motif */}
        <svg
          aria-hidden="true"
          viewBox="0 0 64 64"
          className="h-12 w-12 shrink-0"
          fill="none"
        >
          <rect
            x="4"
            y="4"
            width="56"
            height="56"
            rx="14"
            className="fill-[#f8fafc] stroke-slate-200"
            strokeWidth="1.5"
          />
          <path
            d="M25 28V23.5C25 19.9 28.1 17 32 17C35.9 17 39 19.9 39 23.5V28"
            className="stroke-[#0f6dff]"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <rect
            x="21"
            y="28"
            width="22"
            height="17"
            rx="4"
            className="fill-[#eff6ff] stroke-[#0b1528]"
            strokeWidth="1.8"
          />
          <circle cx="32" cy="36.5" r="2.2" className="fill-[#0f6dff]" />
        </svg>
      </div>

      <dl className="mt-4 divide-y divide-slate-100 text-[13.5px]">
        <div className="flex items-center justify-between gap-4 py-2.5">
          <dt className="font-medium text-slate-500">Last updated</dt>
          <dd className="font-semibold text-[#0b1528]">August 6, 2026</dd>
        </div>
        <div className="flex items-center justify-between gap-4 py-2.5">
          <dt className="font-medium text-slate-500">Sections covered</dt>
          <dd className="font-semibold text-[#0b1528]">6 Policy Sections</dd>
        </div>
        <div className="flex items-center justify-between gap-4 py-2.5">
          <dt className="font-medium text-slate-500">Privacy enquiries</dt>
          <dd>
            <a
              href="mailto:info@webamazee.com"
              className="font-semibold text-[#0f6dff] transition-colors hover:text-[#0b57d0]"
            >
              info@webamazee.com
            </a>
          </dd>
        </div>
      </dl>
    </div>
  );
}

export function PrivacyPolicyPreview() {
  const [activeId, setActiveId] = useState<string>(POLICY_SECTIONS[0].id);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  useEffect(() => {
    let rafId = 0;

    const updateActiveSection = () => {
      const offsetTop = 260;
      let currentId = POLICY_SECTIONS[0].id;

      for (const section of POLICY_SECTIONS) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= offsetTop) {
          currentId = section.id;
        }
      }

      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 40;
      if (nearBottom) {
        currentId = POLICY_SECTIONS[POLICY_SECTIONS.length - 1].id;
      }

      setActiveId(currentId);
    };

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const handleTocClick = (id: string) => {
    setActiveId(id);
    setMobileTocOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeSection =
    POLICY_SECTIONS.find((s) => s.id === activeId) ?? POLICY_SECTIONS[0];

  return (
    <div id="top" className="bg-white text-[#0b1528]">
      {/* SECTION A: REFINED LEGAL HERO */}
      <section className="border-b border-slate-200 bg-[#f6f9ff] pb-14 pt-28 sm:pb-16 sm:pt-32">
        <div className={CONTAINER}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex items-center gap-2 text-[13px] font-medium text-slate-500">
              <li>
                <Link href="/" className="transition-colors hover:text-[#0f6dff]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-[#0b1528]">
                Privacy Policy
              </li>
            </ol>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0f6dff]">
                PRIVACY &amp; DATA PROTECTION
              </p>

              <h1 className="mt-4 font-display text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] text-[#0b1528] sm:text-[3rem] lg:text-[3.25rem]">
                Your Privacy Matters to Us
              </h1>

              <p className="mt-5 max-w-[600px] text-[16px] leading-[1.7] text-slate-600 sm:text-[17px]">
                Learn how Webamazee collects, uses, protects and manages your personal information when you visit our website or interact with our services.
              </p>

              <div className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-600 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#0f6dff]" aria-hidden="true" />
                <span>Last updated: August 6, 2026</span>
              </div>
            </div>

            <PrivacyEmblem />
          </div>
        </div>
      </section>

      {/* SECTION B & C: TWO-COLUMN EDITORIAL PRIVACY DOCUMENT */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={CONTAINER}>
          {/* Mobile Collapsible Table of Contents */}
          <div className="mb-8 rounded-xl border border-slate-200 bg-[#f8fafc] lg:hidden">
            <button
              type="button"
              aria-expanded={mobileTocOpen}
              aria-controls="mobile-policy-toc"
              onClick={() => setMobileTocOpen((prev) => !prev)}
              className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left"
            >
              <div className="min-w-0">
                <span className="block text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">
                  Table of Contents
                </span>
                <span className="mt-0.5 block truncate font-display text-[14.5px] font-bold text-[#0b1528]">
                  {activeSection.number}. {activeSection.heading}
                </span>
              </div>
              <ChevronDown
                aria-hidden="true"
                className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${
                  mobileTocOpen ? "rotate-180 text-[#0f6dff]" : ""
                }`}
              />
            </button>

            {mobileTocOpen && (
              <nav
                id="mobile-policy-toc"
                aria-label="Privacy policy sections"
                className="border-t border-slate-200 bg-white px-2.5 py-2.5"
              >
                <ol className="space-y-1">
                  {POLICY_SECTIONS.map((section) => {
                    const isActive = section.id === activeId;
                    return (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleTocClick(section.id);
                          }}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] transition-colors ${
                            isActive
                              ? "bg-[#eff6ff] font-semibold text-[#0f6dff]"
                              : "font-medium text-slate-600 hover:bg-slate-50 hover:text-[#0b1528]"
                          }`}
                        >
                          <span
                            className={`font-mono text-[12px] font-bold ${
                              isActive ? "text-[#0f6dff]" : "text-slate-400"
                            }`}
                          >
                            {section.number}
                          </span>
                          <span>{section.heading}</span>
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </nav>
            )}
          </div>

          {/* Desktop 2-Column Editorial Layout */}
          <div className="grid items-start gap-12 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)] xl:gap-16">
            {/* Desktop Sticky Table of Contents */}
            <aside className="hidden lg:sticky lg:top-28 lg:block">
              <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-5">
                <p className="px-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                  Contents
                </p>

                <nav aria-label="Privacy policy table of contents" className="mt-3">
                  <ol className="space-y-1">
                    {POLICY_SECTIONS.map((section) => {
                      const isActive = section.id === activeId;
                      return (
                        <li key={section.id}>
                          <a
                            href={`#${section.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleTocClick(section.id);
                            }}
                            aria-current={isActive ? "true" : undefined}
                            className={`group flex items-center gap-3 rounded-xl border px-3 py-2.5 text-[13.5px] transition-colors ${
                              isActive
                                ? "border-[#0f6dff]/25 bg-white font-semibold text-[#0f6dff] shadow-sm"
                                : "border-transparent font-medium text-slate-600 hover:bg-white/80 hover:text-[#0b1528]"
                            }`}
                          >
                            <span
                              className={`font-mono text-[11.5px] font-bold transition-colors ${
                                isActive
                                  ? "text-[#0f6dff]"
                                  : "text-slate-400 group-hover:text-slate-600"
                              }`}
                            >
                              {section.number}
                            </span>
                            <span className="leading-snug">{section.heading}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ol>
                </nav>

                <div className="mt-5 border-t border-slate-200 px-2 pt-4">
                  <p className="text-[12px] text-slate-500">
                    Questions about your data?
                  </p>
                  <a
                    href="mailto:info@webamazee.com"
                    className="mt-1 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0f6dff] transition-colors hover:text-[#0b57d0]"
                  >
                    <Mail aria-hidden="true" className="h-3.5 w-3.5" />
                    <span>info@webamazee.com</span>
                  </a>
                </div>
              </div>
            </aside>

            {/* Right Column: Legal Document Content */}
            <article className="max-w-[740px]">
              <div className="divide-y divide-slate-200">
                {POLICY_SECTIONS.map((section, idx) => (
                  <section
                    key={section.id}
                    id={section.id}
                    aria-labelledby={`${section.id}-heading`}
                    className={`scroll-mt-28 ${
                      idx === 0 ? "pb-10" : "py-10"
                    }`}
                  >
                    <div className="flex items-baseline gap-3.5">
                      <span className="font-mono text-[13px] font-bold tracking-wider text-[#0f6dff]">
                        {section.number}
                      </span>
                      <h2
                        id={`${section.id}-heading`}
                        className="font-display text-[1.4rem] font-bold tracking-[-0.02em] text-[#0b1528] sm:text-[1.6rem]"
                      >
                        {idx + 1}. {section.heading}
                      </h2>
                    </div>

                    <div className="mt-4 space-y-4 sm:pl-9">
                      {section.paragraphs.map((paragraph, pIdx) => (
                        <p
                          key={pIdx}
                          className="text-[16px] leading-[1.8] text-slate-600"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              {/* SECTION D: DISTINCT CONTACT PANEL */}
              <div
                id="privacy-contact-panel"
                className="mt-6 rounded-2xl border border-[#0f6dff]/20 bg-[#f6f9ff] p-6 sm:p-8"
              >
                <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                  <div className="max-w-[460px]">
                    <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">
                      <Mail aria-hidden="true" className="h-3.5 w-3.5" />
                      <span>Privacy Support</span>
                    </div>
                    <h2 className="mt-2 font-display text-[1.4rem] font-bold tracking-[-0.02em] text-[#0b1528] sm:text-[1.6rem]">
                      Questions About Your Privacy?
                    </h2>
                    <p className="mt-2.5 text-[15px] leading-[1.7] text-slate-600">
                      If you have questions about this Privacy Policy or how we handle your information, our team is available to help.
                    </p>
                  </div>

                  <div className="shrink-0">
                    <a
                      href="mailto:info@webamazee.com"
                      className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-[#0f6dff] px-5 text-[14px] font-bold text-white shadow-sm transition-colors hover:bg-[#0b57d0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]"
                    >
                      <Mail aria-hidden="true" className="h-4 w-4 shrink-0" />
                      <span>info@webamazee.com</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* SECTION E: SUBTLE BACK-TO-TOP INTERACTION */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
                <p className="text-[13px] text-slate-500">
                  Last updated: August 6, 2026
                </p>

                <button
                  type="button"
                  onClick={handleBackToTop}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-[13px] font-semibold text-[#0b1528] transition-colors hover:border-[#0f6dff] hover:text-[#0f6dff]"
                >
                  <ArrowUp aria-hidden="true" className="h-3.5 w-3.5" />
                  <span>Back to top</span>
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
