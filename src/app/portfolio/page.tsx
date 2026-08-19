import type { Metadata } from "next";
import { staticMetadata } from "@/lib/static-pages";
import { Suspense } from "react";
import { PageHero } from "@/components/layout/page-hero";
import { CTABanner } from "@/components/layout/cta-banner";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { SectionHeader } from "@/components/ui/sections-blocks";
import { projects } from "@/lib/portfolio";

export const metadata: Metadata = staticMetadata("portfolio");

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Selected work that"
        highlight="speaks for itself"
        subtitle="A glimpse into the premium websites, stores and campaigns we've shipped for clients worldwide."
        crumbs={[{ label: "Portfolio" }]}
      />

      <section className="bg-white pb-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Case Studies"
            title="Three client projects,"
            highlight="three focused solutions"
          />
          <div className="mt-12">
          <Suspense fallback={<div className="py-10 text-center text-sm text-slate-400">Loading projects…</div>}>
            <PortfolioGrid projects={projects} />
          </Suspense>
          </div>
        </div>
      </section>

      <CTABanner
        title="Want results like these?"
        subtitle="Let's build something your customers will love — and that grows your business."
      />
    </>
  );
}
