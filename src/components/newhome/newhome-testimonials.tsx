import Link from "next/link";
import { Star, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { testimonials, GOOGLE_REVIEWS_URL } from "@/lib/testimonials";

export function NewHomeTestimonials() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-24 bg-white py-10"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        {/* Header with Google Business Profile verification */}
        <div className="flex flex-col justify-between gap-6 border-b border-slate-200/80 pb-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">
              Client Feedback
            </p>
            <h2 className="mt-2.5 font-display text-3xl font-bold tracking-[-0.025em] text-[#0b1528] sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]">
              Genuine reviews from our Google Business Profile.
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-slate-600">
              Published verbatim from business owners who worked with Webamazee
              on their websites and online presence.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl border border-slate-200 bg-[#f8fafc] px-4 py-2.5 text-[13.5px] font-semibold text-[#0b1528] transition-colors hover:border-[#0f6dff] hover:text-[#0f6dff]"
            >
              <span className="flex items-center gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </span>
              <span>View on Google</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>

            <Link
              href="/testimonials"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[13.5px] font-semibold text-slate-700 transition-colors hover:border-[#0f6dff] hover:text-[#0f6dff]"
            >
              Testimonials Page
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* 4 Verbatim Google Reviews */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((review) => (
            <figure
              key={review.name}
              className="flex h-full flex-col justify-between rounded-2xl border border-slate-200/90 bg-[#fafcff] p-6 shadow-[0_8px_24px_-18px_rgba(11,21,40,0.1)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0f6dff]/35 hover:bg-white"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div
                    className="flex items-center gap-0.5 text-amber-400"
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#0f6dff]" />
                    {review.role}
                  </span>
                </div>

                <blockquote className="mt-4 text-[14.5px] leading-[1.68] text-slate-700">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
              </div>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-200/70 pt-4">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0b1528] font-display text-xs font-bold text-white">
                  {review.initials}
                </span>
                <div>
                  <p className="text-[14px] font-bold text-[#0b1528]">
                    {review.name}
                  </p>
                  <p className="text-[12px] text-slate-500">{review.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
