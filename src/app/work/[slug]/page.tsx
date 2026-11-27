import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyHero } from "@/components/work/case-study-hero";
import { DeviceShowcase } from "@/components/work/device-showcase";
import { RelatedProjects } from "@/components/work/case-study-sections";
import {
  CommerceHero,
  RedesignHero,
  TravelHero,
} from "@/components/work/case-study-heroes";
import {
  CaseStudyCta,
  KabirBody,
  ShineGoldBody,
  WellingtonBody,
  type CaseProject,
} from "@/components/work/case-study-bodies";
import { JsonLd } from "@/components/seo/json-ld";
import { getProject, getRelatedProjects, getAllProjects } from "@/lib/portfolio";
import { getPortfolioSeo } from "@/lib/content-seo";

interface Params {
  params: Promise<{ slug: string }>;
}

/**
 * Each case study is composed from its own hero and body so the three read as
 * distinct projects rather than one template. Unknown slugs fall back to the
 * generic presentation, which keeps the route valid if a project is added.
 */
const layouts: Record<
  string,
  {
    Hero: typeof CommerceHero | typeof TravelHero | typeof RedesignHero;
    Body: typeof KabirBody | typeof WellingtonBody | typeof ShineGoldBody;
  }
> = {
  "kabir-oil-mill": { Hero: CommerceHero, Body: KabirBody },
  "wellington-tours": { Hero: TravelHero, Body: WellingtonBody },
  "shine-gold-tours-india": { Hero: RedesignHero, Body: ShineGoldBody },
};

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
  const layout = layouts[slug];

  return (
    <>
      <JsonLd data={getPortfolioSeo(slug)?.schema ?? []} />

      {layout ? (
        <>
          <layout.Hero
            title={project.title}
            summary={project.summary}
            category={project.category}
            industry={project.industry}
            country={project.country}
            year={project.year}
            url={project.url}
            image={project.image}
            stack={project.stack}
          />
          <layout.Body project={project as CaseProject} />
        </>
      ) : (
        <>
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
          <section className="bg-white pb-10">
            <DeviceShowcase title={project.title} url={project.url} image={project.image} />
          </section>
        </>
      )}

      <RelatedProjects
        related={related.map((r) => ({
          slug: r.slug,
          title: r.title,
          category: r.category,
          image: r.image,
        }))}
      />

      <CaseStudyCta title={project.title} />
    </>
  );
}
