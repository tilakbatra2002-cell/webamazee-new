import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTABanner } from "@/components/layout/cta-banner";
import { CaseStudyHero } from "@/components/case-study/case-study-hero";
import { DeviceShowcase } from "@/components/work/device-showcase";
import {
  OverviewSection, ExecutiveSummary, BeforeWebamazeeSection, ChallengeSection, DiscoverySection,
  DesignSection, DevelopmentSection, FeatureShowcase, GallerySection,
  SeoSection, OutcomesSection, TechStackSection, RelatedServicesSection,
  RelatedCaseStudiesSection, FaqSection, CaseStudySidebar,
} from "@/components/case-study/case-study-sections";
import { BeforeAfterSection } from "@/components/case-study/before-after";
import { JsonLd } from "@/components/seo/json-ld";
import { getCaseStudy, getRelatedCaseStudies, getAllCaseStudies } from "@/lib/case-studies";
import { getCaseStudySeo } from "@/lib/content-seo";

interface Params {
  params: Promise<{ slug: string }>;
}

function industryLink(industry: string) {
  return industry.toLowerCase().includes("e-commerce")
    ? { href: "/seo-for-ecommerce", label: "SEO for E-commerce" }
    : { href: "/seo-for-tourism", label: "SEO for Tourism" };
}

export function generateStaticParams() {
  return getAllCaseStudies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  return getCaseStudySeo(slug)?.metadata ?? {};
}

export default async function CaseStudyDetail({ params }: Params) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();
  const related = getRelatedCaseStudies(slug, 3);

  return (
    <>
      <JsonLd data={getCaseStudySeo(slug)?.schema ?? []} />

      {/* 1-2. Breadcrumb + Cinematic Hero */}
      <CaseStudyHero cs={cs} />

      {/* 3. Hero showcase — device mockups */}
      <section className="bg-white pb-10">
        <DeviceShowcase title={cs.title} url={cs.liveUrl ?? "case study"} image={cs.image} />
      </section>

      {/* 3. Project Overview */}
      <OverviewSection cs={cs} />

      {/* 4. Executive Summary */}
      <ExecutiveSummary cs={cs} />

      {/* 5. What was happening before Webamazee */}
      <BeforeWebamazeeSection cs={cs} />

      {/* Two-column: main content + sticky sidebar */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-[48px]">
          <div className="min-w-0">
            {/* 5. Client Challenges */}
            <ChallengeSection cs={cs} />
            {/* 6. Discovery & Strategy */}
            <DiscoverySection cs={cs} />
            {/* 7. Design Process */}
            <DesignSection cs={cs} />
            {/* 8. Development Process */}
            <DevelopmentSection cs={cs} />
            {/* 9. Feature Showcase */}
            <FeatureShowcase cs={cs} />
          </div>

          {/* Sticky sidebar (desktop) */}
          <aside className="hidden lg:block">
            <div className="lg:sticky lg:top-[110px]">
              <CaseStudySidebar cs={cs} />
            </div>
          </aside>
        </div>
      </div>

      {/* 9b. Before & After Transformation */}
      <BeforeAfterSection cs={cs} />

      {/* 10. Visual Gallery */}
      <GallerySection cs={cs} />
      {/* 11. Performance & SEO */}
      <SeoSection cs={cs} />
      {/* 12. Business Outcomes */}
      <OutcomesSection cs={cs} />
      {/* 13. Technology Stack */}
      <TechStackSection cs={cs} />
      {/* 14. Client Testimonial (omitted — none verified) */}

      <section className="bg-white pb-4 pt-12">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-3 px-4">
          <Link href="/case-studies" className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 shadow-soft hover:shadow-glow">View All Case Studies</Link>
          <Link href={industryLink(cs.industry).href} className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 shadow-soft hover:shadow-glow">{industryLink(cs.industry).label}</Link>
        </div>
      </section>

      {/* 15. Related Services */}
      <RelatedServicesSection cs={cs} />
      {/* 16. Related Case Studies */}
      <RelatedCaseStudiesSection related={related.map((r) => ({ slug: r.slug, title: r.title, service: r.service, industry: r.industry, image: r.image }))} />
      {/* 17. FAQ */}
      <FaqSection cs={cs} />

      {/* 18. Final CTA */}
      <CTABanner
        title="Ready to Build Your Success Story?"
        subtitle="Tell us about your goals and we'll craft a tailored plan — with a free consultation to start."
        cta="Book a Free Consultation"
      />
    </>
  );
}
