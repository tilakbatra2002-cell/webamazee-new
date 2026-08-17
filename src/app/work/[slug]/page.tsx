import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTABanner } from "@/components/layout/cta-banner";
import { CaseStudyHero } from "@/components/work/case-study-hero";
import { DeviceShowcase } from "@/components/work/device-showcase";
import {
  OverviewSection, ChallengeSection, SolutionSection, FeaturesDelivered,
  TechStackSection, ProcessSection, SeoSection, GallerySection,
  TestimonialSection, FaqSection, RelatedProjects,
} from "@/components/work/case-study-sections";
import { JsonLd } from "@/components/seo/json-ld";
import { getProject, getRelatedProjects, getAllProjects } from "@/lib/portfolio";
import { getPortfolioSeo } from "@/lib/content-seo";

interface Params {
  params: Promise<{ slug: string }>;
}

function industryPageFor(industry: string): { href: string; label: string } | undefined {
  const value = industry.toLowerCase();
  if (value.includes("travel")) return { href: "/seo-for-tourism", label: "SEO for travel and tourism" };
  if (value.includes("beauty") || value.includes("product") || value.includes("consumer")) return { href: "/seo-for-ecommerce", label: "SEO for e-commerce businesses" };
  return undefined;
}

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  return getPortfolioSeo(slug)?.metadata ?? {};
}

export default async function WorkDetail({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const related = getRelatedProjects(slug, 3);

  return (
    <>
      <JsonLd data={getPortfolioSeo(slug)?.schema ?? []} />

      {/* 1-2. Breadcrumb + Hero */}
      <CaseStudyHero
        title={project.title}
        summary={project.summary}
        category={project.category}
        industry={project.industry}
        country={project.country}
        url={project.url}
        year={project.year}
        stack={project.stack}
        crumbLabel={project.title}
      />

      {/* 3. Hero Showcase — device mockups */}
      <section className="bg-white pb-10">
        <DeviceShowcase title={project.title} url={project.url} image={project.image} />
      </section>

      {/* 4. Project Overview */}
      <OverviewSection overview={project.overview} goals={project.goals} requirements={project.requirements} />

      <section className="bg-white pb-12">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-sm leading-relaxed text-slate-600">
            This project brought together{" "}
            {project.services.map((service, index) => (
              <span key={service.slug}>
                {index > 0 && (index === project.services.length - 1 ? " and " : ", ")}
                <Link href={`/services/${service.slug}`} className="font-semibold text-brand-700 hover:underline">
                  {service.name}
                </Link>
              </span>
            ))}
            {" "}to support the client’s website and customer journey.
          </p>
          {industryPageFor(project.industry) && (
            <Link href={industryPageFor(project.industry)!.href} className="mt-5 inline-flex rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 shadow-soft transition-all hover:border-brand-600/30 hover:shadow-glow">
              Explore {industryPageFor(project.industry)!.label}
            </Link>
          )}
        </div>
      </section>

      {/* 5. The Challenge */}
      <ChallengeSection challenges={project.challenges} />

      {/* 6. Our Solution */}
      <SolutionSection solution={project.solution} solutionAreas={project.solutionAreas} />

      {/* 7-12. Design showcase / features / stack / process / seo / gallery */}
      <GallerySection gallery={project.gallery} image={project.image} />
      <FeaturesDelivered features={project.features} />
      <TechStackSection stack={project.techStack} />
      <ProcessSection process={project.process} />
      <SeoSection seo={project.seo} />

      {/* 13. Testimonial (only if authentic testimonial available) */}
      <TestimonialSection testimonial={project.testimonial} />

      {/* FAQ */}
      <FaqSection faqs={project.faqs} title={project.title} />

      {/* 14. Related projects */}
      <RelatedProjects related={related.map((r) => ({ slug: r.slug, title: r.title, category: r.category, image: r.image }))} />

      {/* 15. Final CTA */}
      <CTABanner
        title="Like what you see? Let's build something amazing together."
        subtitle="Tell us about your project and we'll craft a tailored plan — with a free audit and consultation."
        cta="Start Your Project"
      />
    </>
  );
}
