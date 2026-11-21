import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, Home, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "404 | Page Not Found",
  description:
    "The page you're looking for may have moved, been removed, or never existed. Explore Webamazee's services or return to the homepage.",
  robots: { index: false, follow: false },
};

const HELPFUL_LINKS = [
  {
    num: "01",
    label: "Home",
    href: "/",
    hint: "Return to Webamazee's main overview and core capabilities.",
  },
  {
    num: "02",
    label: "About Us",
    href: "/about",
    hint: "Learn how our engineering, SEO, and marketing teams collaborate.",
  },
  {
    num: "03",
    label: "Services",
    href: "/services",
    hint: "Explore web development, SEO, digital marketing, and AI workflows.",
  },
  {
    num: "04",
    label: "Products",
    href: "/products",
    hint: "See our Academy CRM and Logistics CRM software solutions.",
  },
  {
    num: "05",
    label: "Industries",
    href: "/industries",
    hint: "Sector strategies across SaaS, e-commerce, healthcare, and tourism.",
  },
  {
    num: "06",
    label: "Blog",
    href: "/blog",
    hint: "Read practical guides on technical SEO, web builds, and growth.",
  },
  {
    num: "07",
    label: "Contact",
    href: "/contact",
    hint: "Reach our team directly if a link looks broken or you need guidance.",
  },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white pt-20 text-[#0b1528] selection:bg-[#0f6dff]/15 selection:text-[#0b57d0] sm:pt-24">
      <div className="overflow-x-clip">
        {/* HERO SECTION */}
        <section className="relative border-b border-slate-200/80 bg-gradient-to-b from-[#f4f8ff] via-white to-white py-14 sm:py-20 lg:py-24">
          {/* Subtle architectural blueprint background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 grid-pattern opacity-80 [mask-image:radial-gradient(70%_65%_at_50%_15%,black,transparent)]"
          />

          <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
              {/* Left Copy & CTAs */}
              <div className="lg:col-span-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#0f6dff]/20 bg-white px-3.5 py-1.5 shadow-[0_2px_10px_rgba(15,109,255,0.06)]">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#0f6dff]" />
                  <span className="whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.16em] text-[#0b1528]">
                    PAGE NOT FOUND
                  </span>
                </div>

                <h1 className="mt-6 font-display text-[2.35rem] font-bold leading-[1.06] tracking-[-0.03em] text-[#0b1528] sm:text-[3.2rem] lg:text-[3.65rem]">
                  Oops! You&apos;ve Taken a{" "}
                  <span className="text-[#0f6dff]">Wrong Turn.</span>
                </h1>

                <p className="mt-5 max-w-lg text-[16.5px] leading-[1.7] text-slate-600 sm:text-[17.5px]">
                  The page you&apos;re looking for may have moved, been removed,
                  or never existed. Let&apos;s get you back on track.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <Link
                    href="/"
                    className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0f6dff] px-7 py-3 text-[14.5px] font-semibold text-white shadow-[0_12px_30px_-10px_rgba(15,109,255,0.65)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0b57d0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]"
                  >
                    <Home aria-hidden="true" className="h-4 w-4" />
                    Back to Homepage
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </Link>

                  <Link
                    href="/services"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3 text-[14.5px] font-semibold text-[#0b1528] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0f6dff]/50 hover:text-[#0f6dff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]"
                  >
                    <Compass aria-hidden="true" className="h-4 w-4 text-[#0f6dff]" />
                    Explore Our Services
                  </Link>
                </div>
              </div>

              {/* Right Creative 404 Digital-Space & Broken-Page Visual */}
              <div className="lg:col-span-6" aria-hidden="true">
                <div className="relative mx-auto max-w-[540px] select-none py-4 sm:py-6">
                  {/* Soft ambient radial accent */}
                  <div className="pointer-events-none absolute inset-6 rounded-full bg-[#0f6dff]/[0.07] blur-3xl" />

                  {/* Main Framed Composition */}
                  <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-[0_28px_70px_-30px_rgba(11,21,40,0.22)] sm:p-8">
                    {/* Subtle blueprint header strip */}
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-4">
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-slate-200" />
                        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-slate-200" />
                        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#0f6dff]" />
                        <span className="ml-1 truncate rounded-md bg-slate-100 px-2.5 py-0.5 font-mono text-[11px] text-slate-500">
                          webamazee.com / 404
                        </span>
                      </div>
                      <span className="shrink-0 whitespace-nowrap rounded-full bg-[#0b1528] px-2.5 py-0.5 font-mono text-[10.5px] font-bold tracking-wider text-[#7bb2ff]">
                        HTTP 404
                      </span>
                    </div>

                    {/* Typographic 404 + Orbital Broken-Route SVG */}
                    <div className="relative flex flex-col items-center justify-center py-8 sm:py-10">
                      {/* Giant 4 [Orbital Signal] 4 */}
                      <div className="relative flex items-center justify-center gap-2 sm:gap-4">
                        <span className="font-display text-[5.5rem] font-bold leading-none tracking-[-0.05em] text-[#0b1528] sm:text-[7.5rem]">
                          4
                        </span>

                        {/* Custom Orbital Compass / Broken Link Core */}
                        <div className="relative flex h-24 w-24 items-center justify-center sm:h-32 sm:w-32">
                          {/* Expanding pulse ring */}
                          <span className="animate-ring absolute inset-2 rounded-full border border-[#0f6dff]/35" />

                          {/* Rotating dashed orbit SVG */}
                          <svg
                            viewBox="0 0 140 140"
                            fill="none"
                            className="animate-spin-slow h-full w-full"
                          >
                            <circle
                              cx="70"
                              cy="70"
                              r="58"
                              stroke="#0f6dff"
                              strokeOpacity="0.25"
                              strokeWidth="1.5"
                              strokeDasharray="6 6"
                            />
                            <circle
                              cx="70"
                              cy="12"
                              r="4.5"
                              fill="#0f6dff"
                            />
                            <circle
                              cx="70"
                              cy="128"
                              r="3"
                              fill="#0b1528"
                            />
                          </svg>

                          {/* Central Detached Page / Broken Link Icon */}
                          <div className="animate-float absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#0f6dff]/25 bg-[#f4f8ff] shadow-[0_10px_25px_-10px_rgba(15,109,255,0.35)] sm:h-16 sm:w-16">
                            <svg
                              viewBox="0 0 48 48"
                              fill="none"
                              className="h-8 w-8 sm:h-9 sm:w-9"
                            >
                              {/* Torn / misaligned page sheet */}
                              <path
                                d="M12 10C12 8.89543 12.8954 8 14 8H28L36 16V23L29 20.5L23 25L18 22L12 25V10Z"
                                fill="#ffffff"
                                stroke="#0b1528"
                                strokeWidth="2.2"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M12 31L18 28L23 31L29 26.5L36 29V38C36 39.1046 35.1046 40 34 40H14C12.8954 40 12 39.1046 12 38V31Z"
                                fill="#dbeafe"
                                stroke="#0f6dff"
                                strokeWidth="2.2"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M17 15H25"
                                stroke="#0f6dff"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                              />
                            </svg>
                          </div>
                        </div>

                        <span className="font-display text-[5.5rem] font-bold leading-none tracking-[-0.05em] text-[#0b1528] sm:text-[7.5rem]">
                          4
                        </span>
                      </div>

                      {/* Floating coordinate / disconnected node fragments */}
                      <div className="animate-float-x mt-6 flex flex-wrap items-center justify-center gap-2.5">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-[#f8fbff] px-3 py-1 font-mono text-[11px] font-medium text-slate-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#0f6dff]" />
                          Signal detached
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 font-mono text-[11px] font-medium text-slate-600">
                          Redirect not found
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0b1528] px-3 py-1 font-mono text-[11px] font-medium text-white">
                          Ready to reroute
                          <ArrowRight className="h-3 w-3 text-[#7bb2ff]" />
                        </span>
                      </div>
                    </div>

                    {/* Clean diagnostic footer strip */}
                    <div className="grid grid-cols-3 gap-2 rounded-2xl border border-slate-200/80 bg-[#f8fbff] p-3 text-center">
                      <div className="rounded-xl bg-white px-2 py-2 ring-1 ring-slate-200/60">
                        <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0f6dff]">
                          Status
                        </p>
                        <p className="mt-0.5 font-display text-xs font-bold text-[#0b1528]">
                          404 Error
                        </p>
                      </div>
                      <div className="rounded-xl bg-white px-2 py-2 ring-1 ring-slate-200/60">
                        <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0f6dff]">
                          Recovery
                        </p>
                        <p className="mt-0.5 font-display text-xs font-bold text-[#0b1528]">
                          7 Core Paths
                        </p>
                      </div>
                      <div className="rounded-xl bg-white px-2 py-2 ring-1 ring-slate-200/60">
                        <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0f6dff]">
                          Support
                        </p>
                        <p className="mt-0.5 font-display text-xs font-bold text-[#0b1528]">
                          Live Routing
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HELPFUL NAVIGATION DIRECTORY */}
        <section
          aria-labelledby="helpful-nav-heading"
          className="bg-white py-16 sm:py-20"
        >
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              {/* Left Editorial Guidance Column */}
              <div className="lg:col-span-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">
                  Quick Wayfinding
                </p>
                <h2
                  id="helpful-nav-heading"
                  className="mt-2.5 font-display text-[1.875rem] font-bold leading-[1.14] tracking-[-0.025em] text-[#0b1528] sm:text-[2.25rem]"
                >
                  Explore our main destinations
                </h2>
                <p className="mt-4 text-[15px] leading-[1.7] text-slate-600">
                  Use the directory to jump straight to our core website
                  services, software products, industry solutions, or editorial
                  resources.
                </p>

                <div className="mt-8 rounded-2xl border border-slate-200 bg-[#f8fbff] p-6">
                  <p className="font-display text-base font-bold text-[#0b1528]">
                    Still can&apos;t find what you need?
                  </p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-600">
                    Let our team point you to the right service page or audit
                    report directly.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex items-center gap-2 text-[13.5px] font-semibold text-[#0f6dff] transition-colors hover:text-[#0b57d0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]"
                  >
                    <Mail aria-hidden="true" className="h-4 w-4" />
                    Message Webamazee
                    <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right Clean 7-Link Directory */}
              <div className="lg:col-span-8">
                <ul className="divide-y divide-slate-200 border-y border-slate-200">
                  {HELPFUL_LINKS.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group flex items-center justify-between gap-4 py-5 transition-colors hover:bg-[#f8fbff] sm:px-4 sm:py-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0f6dff]"
                      >
                        <div className="flex items-start gap-4 sm:items-center sm:gap-6">
                          <span className="mt-0.5 font-mono text-xs font-bold tracking-[0.14em] text-[#0f6dff] sm:mt-0">
                            {item.num}
                          </span>
                          <div>
                            <span className="block font-display text-lg font-bold text-[#0b1528] transition-colors group-hover:text-[#0f6dff] sm:text-xl">
                              {item.label}
                            </span>
                            <span className="mt-0.5 block text-[13.5px] leading-relaxed text-slate-500">
                              {item.hint}
                            </span>
                          </div>
                        </div>

                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-[#0b1528] transition-all duration-200 group-hover:border-[#0f6dff] group-hover:bg-[#0f6dff] group-hover:text-white">
                          <ArrowRight
                            aria-hidden="true"
                            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                          />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
