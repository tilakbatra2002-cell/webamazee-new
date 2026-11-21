"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Building2,
  FolderOpen,
  Home,
  LayoutGrid,
  MapPin,
  Newspaper,
  Package,
  Scale,
  Search,
  Share2,
  X,
} from "lucide-react";
import type { SitemapLink, SitemapSection } from "@/lib/sitemap-pages";

const CONTAINER = "mx-auto max-w-[1260px] px-4 sm:px-6 lg:px-8";

const SECTION_META: Record<
  string,
  {
    navLabel: string;
    heading?: string;
    icon: typeof Home;
  }
> = {
  main: { navLabel: "Main Pages", heading: "Main Pages", icon: Home },
  services: { navLabel: "Services", heading: "Services", icon: LayoutGrid },
  social: { navLabel: "Social Media", heading: "Social Media", icon: Share2 },
  products: { navLabel: "Products", heading: "Products", icon: Package },
  industries: { navLabel: "Industries", heading: "Industries", icon: Building2 },
  work: { navLabel: "Our Work", heading: "Our Work", icon: FolderOpen },
  blog: { navLabel: "Blog & Insights", heading: "Blog & Insights", icon: Newspaper },
  locations: { navLabel: "Locations", heading: "Locations", icon: MapPin },
  legal: { navLabel: "Legal & Company", heading: "Legal & Company", icon: Scale },
};

const SUBGROUP_LABELS: Record<string, string> = {
  "Regional Service Hubs": "Regional Hubs",
  "Web Design & Development": "Website Development",
  "SEO Services": "SEO Services",
  "Digital Marketing": "Digital Marketing",
  "AI Marketing": "AI Marketing",
  Portfolio: "Portfolio",
  "Case Studies": "Case Studies",
};

const QUICK_SUGGESTIONS = [
  "SEO",
  "Website Development",
  "Industries",
  "Pricing",
  "Healthcare",
  "Chandigarh",
];

function getSectionCount(section: SitemapSection): number {
  let count = section.links?.length ?? 0;
  for (const group of section.groups ?? []) {
    count += group.links.length;
  }
  return count;
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
  const trimmed = query.trim();
  if (!trimmed) return <>{text}</>;

  const regex = new RegExp(`(${escapeRegExp(trimmed)})`, "gi");
  const parts = text.split(regex);
  const lowerQuery = trimmed.toLowerCase();

  return (
    <>
      {parts.map((part, idx) =>
        part.toLowerCase() === lowerQuery ? (
          <mark
            key={idx}
            className="rounded bg-[#dbeafe] px-0.5 font-semibold text-[#0b57d0]"
          >
            {part}
          </mark>
        ) : (
          <span key={idx}>{part}</span>
        )
      )}
    </>
  );
}

function DirectoryVisual({
  totalLinks,
  categoryCount,
}: {
  totalLinks: number;
  categoryCount: number;
}) {
  return (
    <div className="hidden min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_14px_38px_-24px_rgba(11,21,40,0.14)] lg:block">
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">
            Directory Index
          </p>
          <p className="mt-0.5 font-display text-[17px] font-bold text-[#0b1528]">
            {totalLinks} Live Pages
          </p>
        </div>

        {/* Subtle SVG directory node map */}
        <svg
          aria-hidden="true"
          viewBox="0 0 64 48"
          className="h-12 w-16 shrink-0"
          fill="none"
        >
          <rect
            x="4"
            y="18"
            width="14"
            height="12"
            rx="3.5"
            className="fill-[#eff6ff] stroke-[#0f6dff]"
            strokeWidth="1.6"
          />
          <path
            d="M18 24H28M28 10V38M28 10H40M28 24H40M28 38H40"
            className="stroke-slate-300"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <rect
            x="40"
            y="5"
            width="20"
            height="10"
            rx="3"
            className="fill-[#f8fafc] stroke-slate-300"
            strokeWidth="1.4"
          />
          <rect
            x="40"
            y="19"
            width="20"
            height="10"
            rx="3"
            className="fill-[#0f6dff] stroke-[#0f6dff]"
            strokeWidth="1.4"
          />
          <rect
            x="40"
            y="33"
            width="20"
            height="10"
            rx="3"
            className="fill-[#f8fafc] stroke-slate-300"
            strokeWidth="1.4"
          />
        </svg>
      </div>

      <dl className="mt-3.5 grid grid-cols-2 gap-3 text-[13px]">
        <div className="rounded-xl bg-[#f8fafc] px-3.5 py-2.5">
          <dt className="text-[11.5px] font-medium text-slate-500">Categories</dt>
          <dd className="mt-0.5 font-display text-[17px] font-bold text-[#0b1528]">
            {categoryCount} Sections
          </dd>
        </div>
        <div className="rounded-xl bg-[#f8fafc] px-3.5 py-2.5">
          <dt className="text-[11.5px] font-medium text-slate-500">Directory Links</dt>
          <dd className="mt-0.5 font-display text-[17px] font-bold text-[#0f6dff]">
            {totalLinks} Indexed
          </dd>
        </div>
      </dl>
    </div>
  );
}

function DirectoryLinkRow({
  link,
  query,
  categoryBadge,
}: {
  link: SitemapLink;
  query: string;
  categoryBadge?: string;
}) {
  return (
    <li>
      <Link
        href={link.href}
        className="group flex items-start justify-between gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-3 transition-colors hover:border-[#0f6dff]/45 hover:bg-[#f6f9ff]/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]"
      >
        <div className="min-w-0">
          {categoryBadge && (
            <span className="mb-1 inline-block rounded bg-[#eff6ff] px-1.5 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#0f6dff]">
              {categoryBadge}
            </span>
          )}
          <span className="block font-display text-[14.5px] font-semibold leading-snug text-[#0b1528] transition-colors group-hover:text-[#0f6dff]">
            <HighlightMatch text={link.label} query={query} />
          </span>
          {link.description && (
            <span className="mt-0.5 block text-[12.5px] leading-snug text-slate-500">
              <HighlightMatch text={link.description} query={query} />
            </span>
          )}
        </div>

        <ArrowUpRight
          aria-hidden="true"
          className="mt-0.5 h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0f6dff]"
        />
      </Link>
    </li>
  );
}

export function SitemapDirectoryClient({
  sections,
  totalLinks,
}: {
  sections: SitemapSection[];
  totalLinks: number;
}) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const isSearching = normalizedQuery.length > 0;

  const filteredSections = useMemo(() => {
    if (!normalizedQuery) return sections;

    const results: SitemapSection[] = [];

    for (const section of sections) {
      const meta = SECTION_META[section.id];
      const displayTitle = meta?.heading ?? section.title;
      const sectionMatches =
        displayTitle.toLowerCase().includes(normalizedQuery) ||
        section.title.toLowerCase().includes(normalizedQuery) ||
        (meta?.navLabel.toLowerCase().includes(normalizedQuery) ?? false);

      const matchedLinks = (section.links ?? []).filter(
        (link) =>
          sectionMatches ||
          link.label.toLowerCase().includes(normalizedQuery) ||
          (link.description?.toLowerCase().includes(normalizedQuery) ?? false)
      );

      const matchedGroups = (section.groups ?? [])
        .map((group) => {
          const displayGroup = SUBGROUP_LABELS[group.title] ?? group.title;
          const groupMatches =
            sectionMatches ||
            displayGroup.toLowerCase().includes(normalizedQuery) ||
            group.title.toLowerCase().includes(normalizedQuery);

          const links = group.links.filter(
            (link) =>
              groupMatches ||
              link.label.toLowerCase().includes(normalizedQuery) ||
              (link.description?.toLowerCase().includes(normalizedQuery) ?? false)
          );

          return { ...group, links };
        })
        .filter((group) => group.links.length > 0);

      if (matchedLinks.length > 0 || matchedGroups.length > 0) {
        results.push({
          ...section,
          links: section.links ? matchedLinks : undefined,
          groups: section.groups ? matchedGroups : undefined,
        });
      }
    }

    return results;
  }, [sections, normalizedQuery]);

  const matchedCount = useMemo(
    () =>
      filteredSections.reduce((acc, sec) => acc + getSectionCount(sec), 0),
    [filteredSections]
  );

  const handleCategoryClick = (sectionId: string) => {
    if (isSearching) {
      setQuery("");
      requestAnimationFrame(() => {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }

    document
      .getElementById(sectionId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div id="top" className="bg-white text-[#0b1528]">
      {/* HERO SECTION */}
      <section className="border-b border-slate-200 bg-[#f6f9ff] pb-12 pt-28 sm:pb-14 sm:pt-32">
        <div className={CONTAINER}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-[13px] font-medium text-slate-500">
              <li>
                <Link href="/" className="transition-colors hover:text-[#0f6dff]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-[#0b1528]">
                Sitemap
              </li>
            </ol>
          </nav>

          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0f6dff]">
                WEBSITE DIRECTORY
              </p>

              <h1 className="mt-3.5 font-display text-[2.2rem] font-bold leading-[1.08] tracking-[-0.03em] text-[#0b1528] sm:text-[2.9rem] lg:text-[3.2rem]">
                Explore the Webamazee Website
              </h1>

              <p className="mt-4 max-w-[600px] text-[15.5px] leading-[1.7] text-slate-600 sm:text-[16.5px]">
                Find everything in one place. Browse our services, industries, products, insights, projects and the markets we serve.
              </p>

              {/* Dynamic count pill on mobile / compact metadata strip */}
              <div className="mt-5 flex flex-wrap items-center gap-3 text-[13px] font-semibold text-slate-600">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-[#0f6dff]" aria-hidden="true" />
                  <span>{totalLinks} Pages Indexed</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 shadow-sm">
                  <span>{sections.length} Categories</span>
                </span>
              </div>
            </div>

            <DirectoryVisual totalLinks={totalLinks} categoryCount={sections.length} />
          </div>

          {/* PROMINENT SEARCH INPUT */}
          <div className="mt-8 max-w-[740px]">
            <label htmlFor="sitemap-search-input" className="sr-only">
              Search pages, services, industries and locations
            </label>
            <div className="relative flex items-center">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-4 h-5 w-5 text-slate-400"
              />
              <input
                id="sitemap-search-input"
                type="text"
                role="searchbox"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape" && query) {
                    setQuery("");
                  }
                }}
                placeholder="Search pages, services, industries..."
                className={`h-14 w-full rounded-2xl border border-slate-300 bg-white py-3.5 pl-11 text-[14px] text-[#0b1528] shadow-sm transition-colors placeholder:text-slate-400 focus:border-[#0f6dff] focus:outline-none focus:ring-2 focus:ring-[#0f6dff]/20 sm:pl-12 sm:text-[15px] ${
                  isSearching ? "pr-24" : "pr-4"
                }`}
              />
              {isSearching && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2.5 inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-[#f8fafc] px-3 py-1.5 text-[12px] font-semibold text-slate-600 transition-colors hover:border-[#0f6dff] hover:text-[#0f6dff]"
                >
                  <X aria-hidden="true" className="h-3.5 w-3.5" />
                  <span>Clear</span>
                </button>
              )}
            </div>

            {isSearching && (
              <div
                aria-live="polite"
                className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[13px] text-slate-600"
              >
                <p>
                  Showing{" "}
                  <span className="font-bold text-[#0b1528]">{matchedCount}</span>{" "}
                  {matchedCount === 1 ? "result" : "results"} across{" "}
                  <span className="font-bold text-[#0b1528]">
                    {filteredSections.length}
                  </span>{" "}
                  {filteredSections.length === 1 ? "category" : "categories"} for{" "}
                  <span className="font-semibold text-[#0f6dff]">
                    &ldquo;{query.trim()}&rdquo;
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* QUICK CATEGORY NAVIGATION */}
      <nav
        aria-label="Browse sitemap categories"
        className="border-b border-slate-200 bg-white py-5"
      >
        <div className={CONTAINER}>
          <div className="flex flex-wrap items-center gap-2">
            {sections.map((section) => {
              const meta = SECTION_META[section.id];
              const Icon = meta?.icon ?? LayoutGrid;
              const label = meta?.navLabel ?? section.title;
              const count = getSectionCount(section);

              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryClick(section.id);
                  }}
                  className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-[#f8fafc] px-3.5 py-2 text-[13px] font-semibold text-[#0b1528] transition-colors hover:border-[#0f6dff]/50 hover:bg-[#eff6ff] hover:text-[#0f6dff]"
                >
                  <Icon
                    aria-hidden="true"
                    className="h-3.5 w-3.5 text-[#0f6dff]"
                  />
                  <span>{label}</span>
                  <span className="rounded-md bg-white px-1.5 py-0.5 font-mono text-[11px] font-bold text-slate-500 transition-colors group-hover:text-[#0f6dff]">
                    {count}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </nav>

      {/* MAIN DIRECTORY SECTIONS OR EMPTY STATE */}
      <section className="bg-white py-6 sm:py-10">
        <div className={CONTAINER}>
          {filteredSections.length === 0 ? (
            <div className="my-8 rounded-2xl border border-slate-200 bg-[#f8fafc] px-6 py-12 text-center sm:px-10">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#0f6dff]">
                <Search aria-hidden="true" className="h-5 w-5" />
              </div>
              <h2 className="mt-4 font-display text-[1.35rem] font-bold text-[#0b1528]">
                No pages matched &ldquo;{query.trim()}&rdquo;
              </h2>
              <p className="mx-auto mt-2 max-w-[460px] text-[14.5px] leading-relaxed text-slate-600">
                Try another keyword, browse by category above, or select a common topic below.
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {QUICK_SUGGESTIONS.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[12.5px] font-semibold text-slate-700 transition-colors hover:border-[#0f6dff] hover:text-[#0f6dff]"
                  >
                    {term}
                  </button>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="inline-flex h-10 items-center justify-center rounded-xl bg-[#0f6dff] px-5 text-[13.5px] font-bold text-white transition-colors hover:bg-[#0b57d0]"
                >
                  Clear search
                </button>
                <Link
                  href="/contact"
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-5 text-[13.5px] font-bold text-[#0b1528] transition-colors hover:border-[#0b1528]"
                >
                  <span>Contact Webamazee</span>
                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {filteredSections.map((section, idx) => {
                const meta = SECTION_META[section.id];
                const Icon = meta?.icon ?? LayoutGrid;
                const displayHeading = meta?.heading ?? section.title;
                const sectionCount = getSectionCount(section);
                const categoryBadge = isSearching ? displayHeading : undefined;

                return (
                  <section
                    key={section.id}
                    id={section.id}
                    aria-labelledby={`dir-${section.id}-heading`}
                    className="scroll-mt-24 py-10 sm:py-12"
                  >
                    {/* Section Header */}
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                      <div className="flex items-start gap-3.5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#0f6dff]/15 bg-[#eff6ff] text-[#0f6dff]">
                          <Icon aria-hidden="true" className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2.5">
                            <span className="font-mono text-[11px] font-bold text-[#0f6dff]">
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                            <h2
                              id={`dir-${section.id}-heading`}
                              className="font-display text-[1.4rem] font-bold tracking-[-0.02em] text-[#0b1528] sm:text-[1.6rem]"
                            >
                              {displayHeading}
                            </h2>
                          </div>
                          {section.description && (
                            <p className="mt-1 text-[14.5px] text-slate-600">
                              {section.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <span className="inline-flex w-fit shrink-0 items-center rounded-full border border-slate-200 bg-[#f8fafc] px-3 py-1 font-mono text-[11.5px] font-bold text-slate-600">
                        {sectionCount} {sectionCount === 1 ? "page" : "pages"}
                      </span>
                    </div>

                    {/* Flat Section Links */}
                    {section.links && section.links.length > 0 && (
                      <ul
                        className={`mt-6 grid gap-3 ${
                          section.links.length <= 2
                            ? "sm:grid-cols-2"
                            : "sm:grid-cols-2 lg:grid-cols-3"
                        }`}
                      >
                        {section.links.map((link) => (
                          <DirectoryLinkRow
                            key={link.href}
                            link={link}
                            query={query}
                            categoryBadge={categoryBadge}
                          />
                        ))}
                      </ul>
                    )}

                    {/* Grouped Subsections (Our Work & Locations) */}
                    {section.groups && section.groups.length > 0 && (
                      <div
                        className={`mt-6 grid gap-6 ${
                          section.id === "work" ? "lg:grid-cols-2" : "md:grid-cols-2"
                        }`}
                      >
                        {section.groups.map((group) => {
                          const displayGroup =
                            SUBGROUP_LABELS[group.title] ?? group.title;
                          const isRegionalHubs =
                            group.title === "Regional Service Hubs";

                          return (
                            <div
                              key={group.title}
                              className={`rounded-2xl border border-slate-200 bg-[#f8fafc]/75 p-5 ${
                                isRegionalHubs ? "md:col-span-2" : ""
                              }`}
                            >
                              <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
                                <h3 className="flex items-center gap-2 font-display text-[15.5px] font-bold text-[#0b1528]">
                                  <span
                                    aria-hidden="true"
                                    className="h-2 w-2 rounded-full bg-[#0f6dff]"
                                  />
                                  <HighlightMatch
                                    text={displayGroup}
                                    query={query}
                                  />
                                  {isSearching && (
                                    <span className="rounded bg-[#eff6ff] px-1.5 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.06em] text-[#0f6dff]">
                                      {displayHeading}
                                    </span>
                                  )}
                                </h3>
                                <span className="rounded-md bg-white px-2 py-0.5 font-mono text-[11px] font-bold text-[#0f6dff]">
                                  {group.links.length}
                                </span>
                              </div>

                              <ul
                                className={`mt-4 ${
                                  isRegionalHubs
                                    ? "grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4"
                                    : section.id === "work"
                                      ? "grid gap-2.5"
                                      : "flex flex-wrap gap-2"
                                }`}
                              >
                                {group.links.map((link) =>
                                  section.id === "locations" &&
                                  !isRegionalHubs ? (
                                    <li key={link.href}>
                                      <Link
                                        href={link.href}
                                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[13px] font-medium text-slate-700 transition-colors hover:border-[#0f6dff] hover:text-[#0f6dff]"
                                      >
                                        <span>
                                          <HighlightMatch
                                            text={link.label}
                                            query={query}
                                          />
                                        </span>
                                        <ArrowUpRight
                                          aria-hidden="true"
                                          className="h-3 w-3 text-slate-400"
                                        />
                                      </Link>
                                    </li>
                                  ) : (
                                    <DirectoryLinkRow
                                      key={link.href}
                                      link={link}
                                      query={query}
                                      categoryBadge={
                                        isSearching
                                          ? `${displayHeading} · ${displayGroup}`
                                          : undefined
                                      }
                                    />
                                  )
                                )}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </section>
                );
              })}
            </div>
          )}

          {/* Subtle Back to top bar */}
          <div className="flex items-center justify-between border-t border-slate-200 py-6">
            <p className="text-[13px] text-slate-500">
              Showing {isSearching ? `${matchedCount} of ` : ""}
              {totalLinks} Webamazee pages
            </p>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-[13px] font-semibold text-[#0b1528] transition-colors hover:border-[#0f6dff] hover:text-[#0f6dff]"
            >
              <ArrowUp aria-hidden="true" className="h-3.5 w-3.5" />
              <span>Back to top</span>
            </button>
          </div>
        </div>
      </section>

      {/* COMPACT PRE-FOOTER CTA */}
      <section className="border-t border-slate-200 bg-[#f6f9ff] py-12 sm:py-14">
        <div className={CONTAINER}>
          <div className="flex flex-col justify-between gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:p-8">
            <div className="max-w-[560px]">
              <h2 className="font-display text-[1.45rem] font-bold tracking-[-0.02em] text-[#0b1528] sm:text-[1.7rem]">
                Can&apos;t Find What You&apos;re Looking For?
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
                Tell us what you need and our team will help you find the right solution.
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#0f6dff] px-6 text-[14px] font-bold text-white shadow-sm transition-colors hover:bg-[#0b57d0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]"
              >
                <span>Contact Webamazee</span>
                <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
