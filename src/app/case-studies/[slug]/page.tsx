import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryCta } from "@/components/case-study-detail/industry-cta";
import {
  AssociationHero,
  CommerceHero,
  EditorialHero,
  RedesignHero,
} from "@/components/case-study-detail/heroes";
import {
  AssociationBody,
  KabirBody,
  ShineGoldBody,
  WellingtonBody,
} from "@/components/case-study-detail/bodies";
import { JsonLd } from "@/components/seo/json-ld";
import { getCaseStudy, getRelatedCaseStudies, getAllCaseStudies } from "@/lib/case-studies";
import { getCaseStudySeo } from "@/lib/content-seo";

interface Params {
  params: Promise<{ slug: string }>;
}

/**
 * Each detailed case study is composed from its own hero and body so the four
 * read as different projects rather than one template. The metadata, schema,
 * breadcrumbs, related links and CTAs are shared and come from the existing
 * content layer, so SEO output is unchanged by the redesign.
 */
const layouts = {
  kabiroilmill: { Hero: CommerceHero, Body: KabirBody },
  wellingtontours: { Hero: EditorialHero, Body: WellingtonBody },
  shinegoldtours: { Hero: RedesignHero, Body: ShineGoldBody },
  americanlaobusinessassociation: { Hero: AssociationHero, Body: AssociationBody },
} as const;

type LayoutSlug = keyof typeof layouts;

function layoutFor(slug: string) {
  return layouts[slug as LayoutSlug] ?? null;
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

  const layout = layoutFor(slug);
  // A project without a bespoke layout keeps a simple factual presentation
  // rather than silently inheriting another project's story.
  if (!layout) {
    const related = getRelatedCaseStudies(slug, 3);
    return (
      <>
        <JsonLd data={getCaseStudySeo(slug)?.schema ?? []} />
        <section className="bg-white pb-16 pt-28 sm:pt-32">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <p className="text-[11.5px] font-bold uppercase tracking-[0.17em] text-brand-700">{cs.service}</p>
            <h1 className="mt-3 font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[2.6rem]">
              {cs.title}
            </h1>
            <p className="mt-4 text-[15.5px] leading-relaxed text-slate-600">{cs.summary}</p>
          </div>
        </section>
        <IndustryCta cs={cs} related={related} />
      </>
    );
  }

  const { Hero, Body } = layout;
  const meta = {
    projectType: cs.projectType,
    industry: cs.industry,
    country: cs.country,
    completion: cs.completion,
  };

  return (
    <>
      <JsonLd data={getCaseStudySeo(slug)?.schema ?? []} />
      <Hero
        name={cs.name}
        headline={cs.title}
        intro={cs.summary}
        meta={meta}
        liveUrl={cs.liveUrl}
        image={heroImage(slug, cs.image)}
        imageAlt={heroAlt(slug, cs.name)}
        tag={cs.service}
      />
      <Body cs={cs} />
    </>
  );
}

/**
 * The hero capture per project. These are the real screenshots verified in
 * the repository; the full page shots live in the gallery further down.
 */
function heroImage(slug: string, fallback: string) {
  switch (slug) {
    case "kabiroilmill":
      return "/images/portfolio/kabir-oil-mill-live-homepage.webp";
    case "wellingtontours":
      return "/images/portfolio/wellington-tours-live-homepage.webp";
    case "shinegoldtours":
      return "/images/portfolio/shine-gold-tours-hero-crop.webp";
    case "americanlaobusinessassociation":
      return "/images/portfolio/american-lao-business-association-live-homepage.webp";
    default:
      return fallback;
  }
}

function heroAlt(slug: string, name: string) {
  switch (slug) {
    case "kabiroilmill":
      return `${name} online store homepage showing the product range and best-selling oils`;
    case "wellingtontours":
      return `${name} homepage with a New Zealand landscape hero and featured tour packages`;
    case "shinegoldtours":
      return `${name} redesigned homepage hero with the Explore India from an Indian Perspective headline`;
    case "americanlaobusinessassociation":
      return `${name} homepage with the association mission headline and its four business pillars`;
    default:
      return `${name} website`;
  }
}
