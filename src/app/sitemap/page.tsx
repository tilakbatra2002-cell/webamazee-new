import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Home,
  LayoutGrid,
  Package,
  Building2,
  FolderOpen,
  Newspaper,
  MapPin,
  Scale,
  Share2,
} from "lucide-react";
import { staticMetadata } from "@/lib/static-pages";
import { PageHero } from "@/components/layout/page-hero";
import { CTABanner } from "@/components/layout/cta-banner";
import { Reveal } from "@/components/ui/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { buildSitemap, countSitemapLinks, type SitemapLink, type SitemapSection } from "@/lib/sitemap-pages";

export const metadata: Metadata = staticMetadata("sitemap");

const sectionIcons: Record<string, typeof Home> = {
  main: Home,
  services: LayoutGrid,
  social: Share2,
  products: Package,
  industries: Building2,
  work: FolderOpen,
  blog: Newspaper,
  locations: MapPin,
  legal: Scale,
};

function SitemapLinkItem({ link }: { link: SitemapLink }) {
  return (
    <li>
      <Link
        href={link.href}
        className="group flex items-start gap-3 rounded-2xl border border-line bg-white p-4 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-600/25 hover:shadow-glow"
      >
        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700 transition-colors duration-300 group-hover:bg-brand-gradient group-hover:text-white">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
        <span className="min-w-0">
          <span className="block font-display text-[15px] font-semibold leading-snug text-ink transition-colors group-hover:text-brand-700">
            {link.label}
          </span>
          {link.description && (
            <span className="mt-0.5 block text-sm leading-snug text-slate-500">
              {link.description}
            </span>
          )}
        </span>
      </Link>
    </li>
  );
}

function SectionBlock({ section, index }: { section: SitemapSection; index: number }) {
  const Icon = sectionIcons[section.id] ?? LayoutGrid;
  const linkCount = section.links?.length ?? 0;
  const colClass =
    linkCount <= 1
      ? "sm:grid-cols-1"
      : section.groups
        ? "lg:grid-cols-2"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <Reveal delay={Math.min(index * 0.04, 0.3)}>
      <section
        id={section.id}
        aria-labelledby={`sitemap-${section.id}-title`}
        className="scroll-mt-28 rounded-3xl border border-line bg-surface/60 p-6 shadow-soft sm:p-8"
      >
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow">
            <Icon className="h-6 w-6" />
          </span>
          <div>
            <h2
              id={`sitemap-${section.id}-title`}
              className="font-display text-2xl font-bold tracking-tight text-ink"
            >
              {section.title}
            </h2>
            {section.description && (
              <p className="mt-1 text-[15px] text-slate-500">{section.description}</p>
            )}
          </div>
        </div>

        {section.links && section.links.length > 0 && (
          <ul className={`mt-6 grid gap-3 ${colClass}`}>
            {section.links.map((link) => (
              <SitemapLinkItem key={link.href} link={link} />
            ))}
          </ul>
        )}

        {section.groups && (
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {section.groups.map((group) => (
              <div
                key={group.title}
                className="rounded-2xl border border-line bg-white p-5 shadow-soft"
              >
                <h3 className="flex items-center gap-2 font-display text-base font-semibold text-ink">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                  {group.title}
                  <span className="ml-auto rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
                    {group.links.length}
                  </span>
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/60 hover:bg-brand-500/10 hover:text-brand-700"
                      >
                        {link.label}
                        <ArrowUpRight className="h-3.5 w-3.5 text-brand-600/70" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>
    </Reveal>
  );
}

export default function SitemapPage() {
  const sections = buildSitemap();
  const totalLinks = countSitemapLinks(sections);

  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ label: "Sitemap" }], "/sitemap")]} />

      <PageHero
        eyebrow="Sitemap"
        title="Every page,"
        highlight="in one place"
        subtitle="A complete, organised directory of the Webamazee website — services, work, insights, industries and the regions we serve."
        crumbs={[{ label: "Sitemap" }]}
      >
        <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-sm font-medium text-slate-600 shadow-soft">
          <LayoutGrid className="h-4 w-4 text-brand-600" />
          {totalLinks} pages and counting
        </p>
      </PageHero>

      <section className="bg-white pb-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          {/* Quick jump nav */}
          <nav aria-label="Jump to sitemap section" className="mb-10">
            <ul className="flex flex-wrap justify-center gap-2.5">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="inline-flex items-center rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/60 hover:bg-brand-500/10 hover:text-brand-700"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-8">
            {sections.map((section, i) => (
              <SectionBlock key={section.id} section={section} index={i} />
            ))}
          </div>

          <Reveal className="mt-12 text-center">
            <p className="text-slate-500">
              Can&apos;t find what you&apos;re looking for?{" "}
              <Link href="/contact" className="font-semibold text-brand-700 hover:underline">
                Get in touch <ArrowUpRight className="inline h-4 w-4" />
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
