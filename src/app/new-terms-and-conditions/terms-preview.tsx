"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUp, ChevronDown, FileCheck2, Mail, Scale } from "lucide-react";

interface TermsClause {
  id: string;
  number: string;
  heading: string;
  paragraphs: string[];
}

const TERMS_CLAUSES: TermsClause[] = [
  {
    id: "acceptance-of-terms",
    number: "01",
    heading: "Acceptance of Terms",
    paragraphs: [
      "By accessing or using the Webamazee website and services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.",
    ],
  },
  {
    id: "our-services",
    number: "02",
    heading: "Our Services",
    paragraphs: [
      "Webamazee provides digital marketing and web development services, including website development, redesign, landing pages, e-commerce, SEO and related offerings.",
      "Specific deliverables, timelines and pricing are agreed in individual proposals and contracts. In the event of a conflict, the terms of your signed agreement take precedence.",
    ],
  },
  {
    id: "intellectual-property",
    number: "03",
    heading: "Intellectual Property",
    paragraphs: [
      "All content on this website, including text, graphics, logos and software, is the property of Webamazee or its licensors and is protected by intellectual property laws.",
      "Upon full payment, work products created for you are owned by you as set out in your agreement. We retain ownership of our underlying tools, frameworks and pre-existing materials.",
    ],
  },
  {
    id: "client-responsibilities",
    number: "04",
    heading: "Client Responsibilities",
    paragraphs: [
      "You agree to provide accurate information and timely feedback, and to grant us the access and approvals needed to perform our services.",
      "You are responsible for the accuracy and legality of any content or materials you provide to us.",
    ],
  },
  {
    id: "limitation-of-liability",
    number: "05",
    heading: "Limitation of Liability",
    paragraphs: [
      "To the maximum extent permitted by law, Webamazee shall not be liable for indirect, incidental, consequential or punitive damages arising from the use of our services.",
      "Our total liability for any claim is limited to the amount you paid us for the relevant services, except where prohibited by law.",
    ],
  },
  {
    id: "termination",
    number: "06",
    heading: "Termination",
    paragraphs: [
      "Either party may terminate an engagement in accordance with the terms of the relevant agreement. On termination, you remain responsible for amounts due for services already provided.",
    ],
  },
  {
    id: "governing-law",
    number: "07",
    heading: "Governing Law",
    paragraphs: [
      "These Terms and Conditions are governed by the applicable laws of Webamazee's registered jurisdiction. Any disputes shall be subject to the exclusive jurisdiction of the applicable courts.",
    ],
  },
  {
    id: "changes-to-these-terms",
    number: "08",
    heading: "Changes to These Terms",
    paragraphs: [
      "We may update these Terms from time to time. The latest version will always be available on this page, and continued use of our services constitutes acceptance of any changes.",
    ],
  },
];

const CONTAINER = "mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8";

function AgreementVisual() {
  return (
    <div className="relative min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_14px_38px_-24px_rgba(11,21,40,0.14)] sm:p-6">
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eff6ff] text-[#0f6dff]">
            <Scale aria-hidden="true" className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">
              Agreement Structure
            </p>
            <p className="truncate font-display text-[15px] font-bold text-[#0b1528]">
              Service &amp; Website Terms
            </p>
          </div>
        </div>
        <FileCheck2 aria-hidden="true" className="h-5 w-5 shrink-0 text-slate-400" />
      </div>

      {/* Subtle legal agreement document linework illustration */}
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
        <svg
          aria-hidden="true"
          viewBox="0 0 112 92"
          className="hidden h-24 w-28 shrink-0 sm:block"
          fill="none"
        >
          <rect
            x="16"
            y="6"
            width="80"
            height="80"
            rx="10"
            className="fill-[#f8fafc] stroke-slate-200"
            strokeWidth="1.5"
          />
          <path
            d="M30 24H58"
            className="stroke-[#0f6dff]"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M30 35H82M30 44H74M30 53H80"
            className="stroke-slate-300"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle
            cx="74"
            cy="67"
            r="11"
            className="fill-[#eff6ff] stroke-[#0f6dff]"
            strokeWidth="1.6"
          />
          <path
            d="M69.5 67L72.5 70L79 63.5"
            className="stroke-[#0f6dff]"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="min-w-0 flex-1 space-y-2 text-[13px]">
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-2">
            <span className="text-slate-500">Updated</span>
            <span className="font-semibold text-[#0b1528]">August 6, 2026</span>
          </div>
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-2">
            <span className="text-slate-500">Sections</span>
            <span className="font-semibold text-[#0b1528]">8 Numbered Terms</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-500">Contact</span>
            <a
              href="mailto:info@webamazee.com"
              className="truncate font-semibold text-[#0f6dff] transition-colors hover:text-[#0b57d0]"
            >
              info@webamazee.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TermsPreview() {
  const [activeId, setActiveId] = useState<string>(TERMS_CLAUSES[0].id);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  useEffect(() => {
    let rafId = 0;

    const updateActiveSection = () => {
      const offsetTop = 260;
      let currentId = TERMS_CLAUSES[0].id;

      for (const clause of TERMS_CLAUSES) {
        const el = document.getElementById(clause.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= offsetTop) {
          currentId = clause.id;
        }
      }

      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 40;
      if (nearBottom) {
        currentId = TERMS_CLAUSES[TERMS_CLAUSES.length - 1].id;
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

  const activeClause =
    TERMS_CLAUSES.find((c) => c.id === activeId) ?? TERMS_CLAUSES[0];

  return (
    <div id="top" className="bg-white text-[#0b1528]">
      {/* HERO SECTION */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-[#f6f9ff] to-white pb-12 pt-28 sm:pb-16 sm:pt-32">
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
                Terms &amp; Conditions
              </li>
            </ol>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2.5">
                <span className="h-[2px] w-6 bg-[#0f6dff]" aria-hidden="true" />
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0f6dff]">
                  LEGAL &amp; TRANSPARENCY
                </p>
              </div>

              <h1 className="mt-4 font-display text-[2.35rem] font-bold leading-[1.06] tracking-[-0.03em] text-[#0b1528] sm:text-[3.1rem] lg:text-[3.4rem]">
                Terms &amp; <span className="text-[#0f6dff]">Conditions</span>
              </h1>

              <p className="mt-5 max-w-[590px] text-[16px] leading-[1.7] text-slate-600 sm:text-[17px]">
                These terms explain the conditions that apply when you access Webamazee&apos;s website and use our digital services.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-slate-200/80 pt-5 text-[13.5px] text-slate-600">
                <span className="inline-flex items-center gap-2 font-medium">
                  <span className="h-2 w-2 rounded-full bg-[#0f6dff]" aria-hidden="true" />
                  <span>Last updated: August 6, 2026</span>
                </span>
                <span className="hidden text-slate-300 sm:inline" aria-hidden="true">
                  |
                </span>
                <a
                  href="#terms-contact-panel"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("terms-contact-panel")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="font-semibold text-[#0f6dff] transition-colors hover:text-[#0b57d0]"
                >
                  Need clarification? Contact us
                </a>
              </div>
            </div>

            <AgreementVisual />
          </div>
        </div>
      </section>

      {/* TWO-COLUMN EDITORIAL LEGAL DOCUMENT */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={CONTAINER}>
          {/* Mobile Collapsible Table of Contents */}
          <div className="mb-8 rounded-xl border border-slate-200 bg-[#f8fafc] lg:hidden">
            <button
              type="button"
              aria-expanded={mobileTocOpen}
              aria-controls="mobile-terms-toc"
              onClick={() => setMobileTocOpen((prev) => !prev)}
              className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left"
            >
              <div className="min-w-0">
                <span className="block text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">
                  On This Page
                </span>
                <span className="mt-0.5 block truncate font-display text-[14.5px] font-bold text-[#0b1528]">
                  {activeClause.number}. {activeClause.heading}
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
                id="mobile-terms-toc"
                aria-label="Terms and conditions sections"
                className="border-t border-slate-200 bg-white px-2.5 py-2.5"
              >
                <ol className="space-y-1">
                  {TERMS_CLAUSES.map((clause) => {
                    const isActive = clause.id === activeId;
                    return (
                      <li key={clause.id}>
                        <a
                          href={`#${clause.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleTocClick(clause.id);
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
                            {clause.number}
                          </span>
                          <span>{clause.heading}</span>
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </nav>
            )}
          </div>

          {/* Desktop 2-Column Editorial Layout */}
          <div className="grid items-start gap-12 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)] xl:gap-16">
            {/* Desktop Sticky Table of Contents (Editorial Spine Style) */}
            <aside className="hidden lg:sticky lg:top-28 lg:block">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                Sections
              </p>

              <nav aria-label="Terms and conditions table of contents" className="mt-4">
                <ol className="border-l border-slate-200">
                  {TERMS_CLAUSES.map((clause) => {
                    const isActive = clause.id === activeId;
                    return (
                      <li key={clause.id}>
                        <a
                          href={`#${clause.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleTocClick(clause.id);
                          }}
                          aria-current={isActive ? "true" : undefined}
                          className={`group -ml-px flex items-center gap-3 border-l-2 py-2.5 pl-4 pr-2 text-[13.5px] transition-colors ${
                            isActive
                              ? "border-[#0f6dff] bg-[#f6f9ff] font-semibold text-[#0f6dff]"
                              : "border-transparent font-medium text-slate-600 hover:border-slate-300 hover:text-[#0b1528]"
                          }`}
                        >
                          <span
                            className={`font-mono text-[11.5px] font-bold transition-colors ${
                              isActive
                                ? "text-[#0f6dff]"
                                : "text-slate-400 group-hover:text-slate-600"
                            }`}
                          >
                            {clause.number}
                          </span>
                          <span className="leading-snug">{clause.heading}</span>
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </nav>

              <div className="mt-6 rounded-xl border border-slate-200 bg-[#f8fafc] p-4">
                <p className="text-[12px] font-semibold text-[#0b1528]">
                  Questions on these terms?
                </p>
                <a
                  href="mailto:info@webamazee.com"
                  className="mt-1.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0f6dff] transition-colors hover:text-[#0b57d0]"
                >
                  <Mail aria-hidden="true" className="h-3.5 w-3.5" />
                  <span>info@webamazee.com</span>
                </a>
              </div>
            </aside>

            {/* Right Column: Legal Clauses */}
            <article className="min-w-0 max-w-[760px]">
              <div className="divide-y divide-slate-200">
                {TERMS_CLAUSES.map((clause, idx) => (
                  <section
                    key={clause.id}
                    id={clause.id}
                    aria-labelledby={`${clause.id}-heading`}
                    className={`scroll-mt-28 ${
                      idx === 0 ? "pb-10" : "py-10"
                    }`}
                  >
                    <span className="inline-block rounded-md bg-[#eff6ff] px-2.5 py-1 font-mono text-[11px] font-bold tracking-wider text-[#0f6dff]">
                      CLAUSE {clause.number}
                    </span>

                    <h2
                      id={`${clause.id}-heading`}
                      className="mt-3 font-display text-[1.4rem] font-bold tracking-[-0.02em] text-[#0b1528] sm:text-[1.6rem]"
                    >
                      {idx + 1}. {clause.heading}
                    </h2>

                    <div className="mt-4 space-y-4">
                      {clause.paragraphs.map((paragraph, pIdx) => (
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

              {/* REFINED CONTACT PANEL */}
              <div
                id="terms-contact-panel"
                className="scroll-mt-28 mt-6 rounded-2xl bg-[#0b1528] p-6 text-white shadow-[0_18px_46px_-26px_rgba(11,21,40,0.45)] sm:p-8"
              >
                <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                  <div className="max-w-[460px]">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#60a5fa]">
                      Legal Enquiries
                    </p>
                    <h2 className="mt-2 font-display text-[1.45rem] font-bold tracking-[-0.02em] text-white sm:text-[1.65rem]">
                      Need Clarification About These Terms?
                    </h2>
                    <p className="mt-2.5 text-[15px] leading-[1.7] text-slate-300">
                      If you have questions about these Terms &amp; Conditions or your engagement with Webamazee, contact our team.
                    </p>
                  </div>

                  <div className="shrink-0">
                    <a
                      href="mailto:info@webamazee.com"
                      className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-[#0f6dff] px-5 text-[14px] font-bold text-white transition-colors hover:bg-[#3b82f6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <Mail aria-hidden="true" className="h-4 w-4 shrink-0" />
                      <span>info@webamazee.com</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* SUBTLE BACK-TO-TOP BAR */}
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
