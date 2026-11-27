/**
 * Shared theme primitives for the SEO service pages.
 *
 * These are the exact token strings used by the already-promoted production
 * pages (the Task C service merge, /pricing, /portfolio, /case-studies) so
 * that every SEO page reads as part of one designed system rather than a
 * separate template. Keep them here rather than re-declaring per page.
 */

export const container = "mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8";

export const eyebrow =
  "text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]";

export const heading =
  "font-display text-[1.85rem] font-bold leading-[1.16] tracking-[-0.025em] text-[#0b1528] sm:text-[2.4rem]";

export const subheading =
  "font-display text-xl font-bold tracking-[-0.02em] text-[#0b1528] sm:text-2xl";

export const lead = "text-[15px] leading-relaxed text-slate-600 sm:text-base";

export const body = "text-[14px] leading-relaxed text-slate-600";

export const primary =
  "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-[#0f6dff] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#0b57d0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]";

export const secondary =
  "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 text-[14px] font-bold text-[#0b1528] transition-colors hover:border-[#0f6dff] hover:text-[#0f6dff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]";

export const secondaryOnDark =
  "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-slate-500 px-6 text-sm font-bold text-white hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/** Card surface used across the service pages. */
export const card =
  "rounded-2xl border border-slate-200 bg-white transition-colors hover:border-[#0f6dff]/40";

export const cardMuted = "rounded-2xl border border-slate-200 bg-[#f7f9fc]";

/** Section background rhythm: white / #f7f9fc alternating. */
export const sectionWhite = "bg-white py-12 sm:py-14";
export const sectionMuted = "bg-[#f7f9fc] py-12 sm:py-14";
export const sectionDark = "bg-[#0b1528] py-12 text-white sm:py-14";
export const heroBg = "border-b border-slate-200/80 bg-[#f4f8ff] py-10";

/** Industry names that production already links to a matching SEO page. */
export const INDUSTRY_ROUTES: Record<string, string> = {
  "E-Commerce": "/seo-for-ecommerce",
  SaaS: "/seo-for-saas",
  Healthcare: "/seo-for-healthcare",
  Travel: "/seo-for-tourism",
  "Professional Services": "/seo-for-professional-services",
  "Local Business": "/seo-for-local-business",
};
