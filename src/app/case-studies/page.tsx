import type { Metadata } from "next";
import { staticMetadata } from "@/lib/static-pages";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { CTABanner } from "@/components/layout/cta-banner";
import { Reveal } from "@/components/ui/reveal";
import { caseStudies } from "@/lib/case-studies";

export const metadata: Metadata = staticMetadata("caseStudies");

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="How we solve"
        highlight="real business problems"
        subtitle="Explore the strategy, design and development work behind three real Webamazee client projects."
        crumbs={[{ label: "Case Studies" }]}
      />

      <section className="bg-white pb-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {caseStudies.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.06}>
                <Link
                  href={`/case-studies/${c.slug}`}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glow"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={c.image}
                      alt={`${c.name} — Webamazee case study`}
                      fill
                      sizes="(max-width: 768px) 100vw, 420px"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60" />
                    <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-700 backdrop-blur">
                      {c.tag}
                    </div>
                    <div className="absolute bottom-4 left-4 rounded-xl bg-white/90 px-3 py-2 shadow-lift backdrop-blur">
                      <span className="text-sm font-bold text-ink">{c.projectType}</span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-medium text-brand-600">{c.service}</p>
                    <h3 className="mt-1.5 font-display text-xl font-bold leading-snug text-ink">
                      {c.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                      {c.summary}
                    </p>
                    <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                      <div>
                        <p className="text-xs text-slate-400">{c.industry}</p>
                        <p className="text-xs text-slate-400">{c.country}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                        View Case Study
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Your business could be our next success story"
        subtitle="See how we can solve your challenges — book a free consultation."
      />
    </>
  );
}
