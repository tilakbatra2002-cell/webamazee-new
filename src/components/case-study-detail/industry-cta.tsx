import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/lib/case-studies";
import { container, RelatedStudies } from "@/components/case-study-detail/sections";

/**
 * Minimal, factual presentation for any case-study slug that does not have a
 * bespoke layout. Keeps the route valid and the page honest if a project is
 * added later, instead of borrowing another project's narrative.
 */
export function IndustryCta({
  cs,
  related,
}: {
  cs: CaseStudy;
  related: { slug: string; name: string; summary: string; image: string; service: string }[];
}) {
  return (
    <>
      <section className="bg-surface/50 py-10">
        <div className={container}>
          <h2 className="font-display text-[1.5rem] font-bold text-ink">Project overview</h2>
          <div className="mt-4 max-w-3xl space-y-4">
            {cs.overviewClient.map((p) => (
              <p key={p} className="text-[15px] leading-relaxed text-slate-600">
                {p}
              </p>
            ))}
          </div>
          {cs.liveUrl && (
            <a
              href={cs.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 border-b border-brand-600/35 pb-0.5 text-[13.5px] font-semibold text-brand-700 hover:border-brand-700"
            >
              Visit live website <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-white py-10">
          <div className={container}>
            <h2 className="font-display text-[1.5rem] font-bold text-ink">Related case studies</h2>
            <div className="mt-6">
              <RelatedStudies
                studies={related.map((r) => ({
                  slug: r.slug,
                  name: r.name,
                  summary: r.summary,
                  image: r.image,
                  service: r.service,
                }))}
              />
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#0b1528] py-10">
        <div className={container}>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-[1.8rem] font-bold leading-[1.12] text-white sm:text-[2.3rem]">
              Ready to build your success story?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-slate-300">
              Tell us about your goals and we will craft a tailored plan — with a free consultation to start.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex h-[3.1rem] items-center justify-center gap-2 rounded-full bg-[#0f6dff] px-7 text-[14.5px] font-semibold text-white shadow-glow transition-colors hover:bg-[#0b57d0]"
            >
              Book a free consultation <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
