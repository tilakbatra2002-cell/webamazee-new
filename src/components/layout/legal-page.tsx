import type { Metadata } from "next";
import { PageHero } from "./page-hero";
import { Reveal } from "../ui/reveal";

export function LegalLayout({
  eyebrow,
  title,
  highlight,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  updated: string;
  sections: { heading: string; body: string[] }[];
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        highlight={highlight}
        subtitle={`Last updated: ${updated}`}
        crumbs={[{ label: eyebrow }]}
      />
      <section className="bg-white pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {sections.map((s, i) => (
              <Reveal key={i}>
                <div>
                  <h2 className="font-display text-2xl font-bold text-ink">
                    {i + 1}. {s.heading}
                  </h2>
                  {s.body.map((p, j) => (
                    <p key={j} className="mt-3 text-[15px] leading-relaxed text-slate-600">
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
