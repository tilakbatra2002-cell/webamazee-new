import type { Metadata } from "next";
import Link from "next/link";
import {
  Star,
  Quote,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { staticMetadata } from "@/lib/static-pages";
import { testimonials, GOOGLE_REVIEWS_URL } from "@/lib/testimonials";

export const metadata: Metadata = staticMetadata("testimonials");

const CONTAINER = "mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8";

const strategyCallHighlights = [
  "Free personalised roadmap",
  "Personal follow-up from our team",
  "No lock in",
];

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-white pt-16 text-[#0b1528] selection:bg-[#0f6dff]/15 selection:text-[#0b57d0] sm:pt-20">
      <div id="main-content" className="overflow-x-clip">
        {/* 1. EDITORIAL HERO SECTION */}
        <section className="relative overflow-hidden border-b border-slate-200/80 bg-[#f4f8ff] py-12 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgba(15,109,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,109,255,0.045)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_75%_85%_at_75%_25%,black,transparent)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#0f6dff]/[0.09] blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-[#0f6dff]/[0.05] blur-3xl"
          />

          <div className={`relative ${CONTAINER}`}>
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-1.5 text-[12.5px] font-medium text-slate-500">
                <li>
                  <Link href="/" className="transition-colors hover:text-[#0f6dff]">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                </li>
                <li aria-current="page" className="font-semibold text-[#0b1528]">
                  Testimonials
                </li>
              </ol>
            </nav>

            <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-8">
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">
                  Testimonials
                </p>

                <h1 className="mt-3 max-w-3xl font-display text-[2.25rem] font-bold leading-[1.07] tracking-[-0.03em] text-[#0b1528] sm:text-[3rem] lg:text-[3.5rem] text-balance">
                  What clients say about{" "}
                  <span className="text-[#0f6dff]">working with us</span>
                </h1>

                <p className="mt-4 max-w-2xl text-[16.5px] leading-[1.65] text-slate-600 sm:text-[18px]">
                  First-hand feedback from clients on our Google Business Profile.
                </p>
              </div>

              <div className="lg:col-span-4 lg:flex lg:justify-end">
                <a
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-full items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white/95 px-5 py-4 shadow-[0_14px_34px_-22px_rgba(11,21,40,0.22)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0f6dff]/45 sm:w-auto"
                >
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0f6dff]">
                      Google Business Profile
                    </p>
                    <p className="mt-0.5 font-display text-[14.5px] font-bold text-[#0b1528]">
                      Read our Google reviews
                    </p>
                  </div>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#f4f8ff] text-[#0f6dff] transition-colors group-hover:bg-[#0f6dff] group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. CLIENT TESTIMONIALS GRID */}
        <section className="bg-white py-14 sm:py-16">
          <div className={CONTAINER}>
            <div className="grid gap-6 sm:grid-cols-2 lg:gap-7">
              {testimonials.map((t) => (
                <figure
                  key={t.name}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-7 shadow-[0_12px_34px_-24px_rgba(11,21,40,0.16)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0f6dff]/35 hover:shadow-[0_22px_48px_-24px_rgba(15,109,255,0.22)] sm:p-9"
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#0f6dff] via-[#4a93ff] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />

                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <div
                        className="flex items-center gap-1 text-amber-400"
                        aria-label={`${t.rating} out of 5 stars`}
                      >
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <Star
                            key={j}
                            className="h-4 w-4 fill-current"
                            aria-hidden="true"
                          />
                        ))}
                      </div>

                      <Quote
                        className="h-7 w-7 shrink-0 text-[#0f6dff]/15 transition-colors duration-300 group-hover:text-[#0f6dff]/35"
                        aria-hidden="true"
                      />
                    </div>

                    <blockquote className="mt-6 text-[17px] font-medium leading-[1.7] tracking-[-0.01em] text-[#0b1528] sm:text-[18px]">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                  </div>

                  <figcaption className="mt-8 flex items-center gap-3.5 border-t border-slate-200/80 pt-5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#0b1528] font-display text-xs font-bold text-white transition-colors duration-300 group-hover:bg-[#0f6dff]">
                      {t.initials}
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-[15px] font-bold leading-snug text-[#0b1528] sm:text-[15.5px]">
                        {t.name}
                      </p>
                      <p className="mt-0.5 inline-flex items-center gap-1.5 text-[12px] font-medium text-slate-500">
                        <CheckCircle2
                          className="h-3.5 w-3.5 shrink-0 text-[#0f6dff]"
                          aria-hidden="true"
                        />
                        {t.role}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* 3. GOOGLE REVIEWS CTA BAND */}
        <section className="border-y border-slate-200/80 bg-[#f7f9fc] py-12 sm:py-14">
          <div className={CONTAINER}>
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">
                  Google Business Profile
                </p>
                <h2 className="mt-2 font-display text-[1.75rem] font-bold leading-tight tracking-[-0.025em] text-[#0b1528] sm:text-[2.1rem]">
                  A selection of client reviews
                </h2>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-[14px] font-bold text-[#0b1528] shadow-xs transition-colors hover:border-[#0f6dff] hover:text-[#0f6dff]"
                >
                  Read our Google reviews
                  <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>

                <Link
                  href="/contact"
                  className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-[#0f6dff] px-6 text-[14px] font-bold text-white shadow-[0_12px_26px_-8px_rgba(15,109,255,0.45)] transition-colors hover:bg-[#0b57d0]"
                >
                  Become our next happy client
                  <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 4. FINAL STRATEGY CALL CONVERSION SECTION */}
        <section className="bg-white py-14 sm:py-16">
          <div className={CONTAINER}>
            <div className="relative overflow-hidden rounded-3xl border border-[#1a2c4e] bg-[#0b1528] p-7 text-white shadow-[0_26px_64px_-28px_rgba(11,21,40,0.5)] sm:p-12 lg:p-14">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#0f6dff] to-transparent"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#0f6dff]/25 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-28 left-1/4 h-72 w-72 rounded-full bg-[#0f6dff]/15 blur-3xl"
              />

              <div className="relative grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-8">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.14em] text-[#8ec5ff]">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    Free 30 minute Strategy Call
                  </span>

                  <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold leading-[1.1] tracking-[-0.025em] text-white sm:text-4xl lg:text-[2.6rem] text-balance">
                    Ready to grow with AI-powered marketing?
                  </h2>

                  <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-slate-300 sm:text-[16.5px]">
                    Tell us about your business and we&apos;ll reply with a personalised
                    roadmap — free, no strings attached.
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5">
                    {strategyCallHighlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-[14px] font-medium text-slate-200"
                      >
                        <CheckCircle2
                          className="h-4 w-4 shrink-0 text-[#8ec5ff]"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-4 lg:flex lg:justify-end">
                  <Link
                    href="/contact"
                    className="inline-flex min-h-[54px] w-full items-center justify-center gap-2.5 rounded-xl bg-[#0f6dff] px-7 text-[15px] font-bold text-white shadow-[0_14px_32px_-8px_rgba(15,109,255,0.6)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#257bff] sm:w-auto"
                  >
                    Get Your Free Website Audit
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
