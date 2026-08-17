import type { Metadata } from "next";
import {
  serviceEntry,
  blogEntry,
  caseStudyEntry,
  portfolioEntry,
} from "@/data";
import { generateMetadata } from "./metadata";
import {
  serviceSchema,
  articleSchema,
  caseStudySchema,
  portfolioSchema,
  faqSchema,
  breadcrumbSchema,
} from "./schema";
import { getService, getRelatedServices } from "@/lib/services";
import { getPost } from "@/lib/blogs";
import { getCaseStudy } from "@/lib/case-studies";
import { getProject } from "@/lib/portfolio";

/**
 * One-call builders that return BOTH the Next.js Metadata object and the
 * JSON-LD schema array for a given content type — keeping page files thin.
 */

export function getServiceSeo(slug: string): { metadata: Metadata; schema: Record<string, unknown>[] } | undefined {
  const entry = serviceEntry(slug);
  const service = getService(slug);
  if (!entry || !service) return undefined;
  const related = getRelatedServices(service);
  const schema = [
    serviceSchema({
      name: service.name,
      description: service.shortDesc,
      slug: service.slug,
      keywords: [service.keyword, ...service.techStack],
      related: related.map((r) => ({ name: r.name, slug: r.slug })),
      offers: service.included.map((f) => ({ name: f.title, description: f.desc })),
    }),
    breadcrumbSchema([{ label: "Services", href: "/services" }, { label: service.shortName }]),
    faqSchema(service.faqs),
  ];
  return { metadata: generateMetadata(entry), schema };
}

export function getBlogSeo(slug: string): { metadata: Metadata; schema: Record<string, unknown>[] } | undefined {
  const entry = blogEntry(slug);
  const post = getPost(slug);
  if (!entry || !post) return undefined;
  const schema = [
    articleSchema({
      headline: post.title,
      description: post.metaDescription ?? post.excerpt,
      slug: post.slug,
      image: post.image,
      datePublished: post.date,
      dateModified: post.date,
      author: post.author,
      authorRole: post.authorRole,
      keywords: [post.primaryKeyword, ...(post.secondaryKeywords ?? []), post.category].filter(Boolean) as string[],
      category: post.category,
    }),
    breadcrumbSchema([{ label: "Blog", href: "/blog" }, { label: post.title }]),
  ];
  return { metadata: generateMetadata(entry), schema };
}

export function getCaseStudySeo(slug: string): { metadata: Metadata; schema: Record<string, unknown>[] } | undefined {
  const entry = caseStudyEntry(slug);
  const cs = getCaseStudy(slug);
  if (!entry || !cs) return undefined;
  const schema = [
    caseStudySchema({
      headline: cs.title,
      description: cs.summary,
      slug: cs.slug,
      image: cs.image,
      client: cs.overviewBusiness,
      industry: cs.industry,
      date: cs.completion,
      result: cs.outcomes,
    }),
    breadcrumbSchema([{ label: "Case Studies", href: "/case-studies" }, { label: cs.title }]),
    faqSchema(cs.faqs),
  ];
  return { metadata: generateMetadata(entry), schema };
}

export function getPortfolioSeo(slug: string): { metadata: Metadata; schema: Record<string, unknown>[] } | undefined {
  const entry = portfolioEntry(slug);
  const p = getProject(slug);
  if (!entry || !p) return undefined;
  const schema = [
    portfolioSchema({ name: p.title, description: p.summary, slug: p.slug, image: p.image }),
    breadcrumbSchema([{ label: "Portfolio", href: "/portfolio" }, { label: p.title }]),
    faqSchema(p.faqs),
  ];
  return { metadata: generateMetadata(entry), schema };
}
