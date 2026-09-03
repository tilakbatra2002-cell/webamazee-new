import type { Metadata } from "next";
import { staticMetadata } from "@/lib/static-pages";
import Link from "next/link";
import { Star, Quote, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { CTABanner } from "@/components/layout/cta-banner";
import { Reveal } from "@/components/ui/reveal";
import { testimonials, GOOGLE_REVIEWS_URL } from "@/lib/testimonials";

export const metadata: Metadata = staticMetadata("testimonials");

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="Loved by business owners"
        highlight="worldwide"
        subtitle="Real reviews from our Google Business Profile — here's what clients say about working with us."
        crumbs={[{ label: "Testimonials" }]}
      />

      <section className="bg-white pb-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={(i % 2) * 0.06}>
                <figure className="group relative flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-brand-600/20 hover:shadow-glow">
                  <Quote className="absolute right-6 top-6 h-8 w-8 text-brand-100" />
                  <div className="mb-4 flex gap-0.5 text-amber-400">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="flex-1 text-[15px] leading-relaxed text-slate-600">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-gradient font-display text-sm font-bold text-white shadow-glow">
                      {t.initials}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">{t.name}</p>
                      <p className="text-xs text-slate-500">{t.role}</p>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 text-center">
            <p className="font-display text-lg text-slate-500">
              Rated <span className="font-bold text-ink">5.0</span> on Google
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-brand-700 hover:underline"
              >
                Read our Google reviews <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:underline"
              >
                Become our next happy client <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
