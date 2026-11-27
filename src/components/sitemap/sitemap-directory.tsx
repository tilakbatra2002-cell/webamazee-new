"use client";

/**
 * Human-readable sitemap directory.
 *
 * The page is fully rendered as crawlable HTML by the server component that
 * owns the data; this file only adds a client-side filter on top. Every link
 * is present in the initial markup, so search enhances the page rather than
 * gating access to it, and every link is a real <a href>.
 */
import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
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

const container = "mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8";

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

/** Count links in a section, including its subgroups. */
function sectionCount(section: SitemapSection): number {
  return (
    (section.links?.length ?? 0) +
    (section.groups ?? []).reduce((total, group) => total + group.links.length, 0)
  );
}

function matches(link: SitemapLink, query: string): boolean {
  return (
    link.label.toLowerCase().includes(query) ||
    (link.description?.toLowerCase().includes(query) ?? false) ||
    link.href.toLowerCase().includes(query)
  );
}

export function SitemapDirectory({
  sections,
  totalLinks,
}: {
  sections: SitemapSection[];
  totalLinks: number;
}) {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();
  const isSearching = normalized.length > 0;

  const filtered = useMemo(() => {
    if (!normalized) return sections;
    const out: SitemapSection[] = [];
    for (const section of sections) {
      const sectionMatches =
        section.title.toLowerCase().includes(normalized) ||
        (section.description?.toLowerCase().includes(normalized) ?? false);

      const links = sectionMatches
        ? section.links
        : section.links?.filter((link) => matches(link, normalized));

      const groups = (section.groups ?? [])
        .map((group) => ({
          ...group,
          links: sectionMatches || group.title.toLowerCase().includes(normalized)
            ? group.links
            : group.links.filter((link) => matches(link, normalized)),
        }))
        .filter((group) => group.links.length > 0);

      if ((links && links.length > 0) || groups.length > 0) {
        out.push({ ...section, links, groups: section.groups ? groups : undefined });
      }
    }
    return out;
  }, [sections, normalized]);

  const matchedCount = useMemo(
    () => filtered.reduce((total, section) => total + sectionCount(section), 0),
    [filtered]
  );

  return (
    <div id="main-content" className="overflow-x-clip bg-white">
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-b border-slate-200/80 bg-[#f4f8ff] pb-10 pt-28 sm:pb-12 sm:pt-32">
        <div className={container}>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-[12.5px] text-slate-500">
              <li>
                <Link href="/" className="hover:text-[#0b57d0]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-[#0b1528]" aria-current="page">
                Sitemap
              </li>
            </ol>
          </nav>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">
                Website Directory
              </p>
              <h1 className="mt-2 font-display text-[2rem] font-bold leading-[1.08] tracking-tight text-[#0b1528] sm:text-[2.6rem] lg:text-[2.9rem]">
                Explore the Webamazee Website
              </h1>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-600 sm:text-base">
                Find our services, products, resources, portfolio, company information and
                locations in one organised directory.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12.5px]">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 font-semibold text-[#0b1528]">
                  <LayoutGrid aria-hidden="true" className="h-3.5 w-3.5 text-[#0f6dff]" />
                  {totalLinks} pages
                </span>
                <span className="text-slate-500">{sections.length} categories</span>
                <span className="text-slate-500">Updated automatically</span>
              </div>
            </div>

            {/* Subtle directory visual: an index card stack */}
            <div aria-hidden="true" className="hidden lg:block">
              <div className="relative mx-auto max-w-[320px]">
                <div className="absolute left-3 top-3 h-full w-full rounded-2xl border border-slate-200 bg-white/70" />
                <div className="absolute left-1.5 top-1.5 h-full w-full rounded-2xl border border-slate-200 bg-white/85" />
                <div className="relative rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-slate-400">
                    Index
                  </p>
                  <ul className="mt-2.5 space-y-1.5">
                    {sections.slice(0, 6).map((section) => (
                      <li
                        key={section.id}
                        className="flex items-center justify-between rounded-lg bg-[#f7f9fc] px-2.5 py-1.5"
                      >
                        <span className="truncate text-[11.5px] font-semibold text-slate-600">
                          {section.title}
                        </span>
                        <span className="ml-2 shrink-0 font-display text-[10.5px] font-bold text-[#0f6dff]">
                          {String(sectionCount(section)).padStart(2, "0")}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-[10.5px] text-slate-400">+ 3 more categories</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Search + category navigation                                      */}
      {/* ---------------------------------------------------------------- */}
      <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className={container}>
          <div className="flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:gap-5">
            <div className="relative w-full lg:max-w-sm">
              <label htmlFor="sitemap-search" className="sr-only">
                Search pages by title or description
              </label>
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              />
              <input
                id="sitemap-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, services or locations…"
                autoComplete="off"
                className="h-11 w-full rounded-xl border border-slate-200 bg-[#f7f9fc] pl-10 pr-10 text-[13.5px] text-[#0b1528] outline-none transition-colors placeholder:text-slate-400 focus:border-[#0f6dff]/50 focus:bg-white focus:ring-2 focus:ring-[#0f6dff]/15"
              />
              {isSearching && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#0b1528]"
                >
                  <X aria-hidden="true" className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <p
              aria-live="polite"
              className="shrink-0 text-[12.5px] text-slate-500 lg:order-last lg:ml-auto"
            >
              {isSearching
                ? `${matchedCount} ${matchedCount === 1 ? "page" : "pages"} matching “${query.trim()}”`
                : `${totalLinks} pages across ${sections.length} categories`}
            </p>

            <nav aria-label="Jump to a category" className="min-w-0 flex-1">
              <ul className="flex gap-1.5 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible lg:pb-0">
                {sections.map((section) => (
                  <li key={section.id} className="shrink-0">
                    <a
                      href={`#${section.id}`}
                      onClick={() => {
                        if (isSearching) setQuery("");
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[12px] font-semibold text-slate-600 transition-colors hover:border-[#0f6dff]/40 hover:bg-[#eef4ff] hover:text-[#0b57d0]"
                    >
                      {section.title}
                      <span className="font-display text-[10.5px] font-bold text-slate-400">
                        {sectionCount(section)}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Directory                                                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-10 sm:py-12">
        <div className={container}>
          <p className="sr-only">
            This page lists every page on the Webamazee website, grouped by category. All links
            below are standard HTML links and remain available without JavaScript.
          </p>

          {isSearching && filtered.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-[#f7f9fc] px-6 py-14 text-center">
              <span className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-white text-slate-400">
                <Search aria-hidden="true" className="h-5 w-5" />
              </span>
              <p className="mt-4 font-display text-[16px] font-bold text-[#0b1528]">
                No pages match “{query.trim()}”
              </p>
              <p className="mx-auto mt-1.5 max-w-md text-[13px] leading-relaxed text-slate-600">
                Try a shorter word, check the spelling, or browse a category instead.
              </p>
              <button
                type="button"
                onClick={() => setQuery("")}
                className="mt-5 inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-[#0f6dff] px-4 text-[13px] font-bold text-white transition-colors hover:bg-[#0b57d0]"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="space-y-10">
              {filtered.map((section) => {
                const Icon = sectionIcons[section.id] ?? LayoutGrid;
                const count = sectionCount(section);
                if (count === 0) return null;

                return (
                  <section
                    key={section.id}
                    id={section.id}
                    aria-labelledby={`sitemap-${section.id}-heading`}
                    className="scroll-mt-32"
                  >
                    <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-200 pb-3">
                      <div className="flex items-start gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#eef4ff] text-[#0f6dff]">
                          <Icon aria-hidden="true" className="h-4 w-4" />
                        </span>
                        <div>
                          <h2
                            id={`sitemap-${section.id}-heading`}
                            className="font-display text-[1.25rem] font-bold leading-tight tracking-tight text-[#0b1528] sm:text-[1.45rem]"
                          >
                            {section.title}
                          </h2>
                          {section.description && (
                            <p className="mt-0.5 max-w-2xl text-[13px] leading-relaxed text-slate-500">
                              {section.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#f7f9fc] px-2.5 py-1 text-[11.5px] font-semibold text-slate-500">
                        {count} {count === 1 ? "page" : "pages"}
                      </span>
                    </div>

                    {section.links && section.links.length > 0 && (
                      <ul className="mt-3 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
                        {section.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className="group flex items-start gap-2 rounded-xl border border-transparent px-2.5 py-2 transition-colors hover:border-slate-200 hover:bg-[#f7f9fc]"
                            >
                              <span className="min-w-0 flex-1">
                                <span className="block text-[13px] font-semibold leading-snug text-[#0b1528] group-hover:text-[#0b57d0]">
                                  {link.label}
                                </span>
                                {link.description && (
                                  <span className="mt-0.5 block text-[11.5px] leading-snug text-slate-500">
                                    {link.description}
                                  </span>
                                )}
                              </span>
                              <ArrowUpRight
                                aria-hidden="true"
                                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-300 transition-colors group-hover:text-[#0f6dff]"
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.groups && section.groups.length > 0 && (
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        {section.groups.map((group) => (
                          <div
                            key={group.title}
                            className="rounded-2xl border border-slate-200 bg-white p-4"
                          >
                            <h3 className="flex items-center gap-2 font-display text-[13px] font-bold text-[#0b1528]">
                              <span
                                aria-hidden="true"
                                className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0f6dff]"
                              />
                              {group.title}
                              <span className="ml-auto rounded-full bg-[#f7f9fc] px-2 py-0.5 text-[10.5px] font-bold text-slate-500">
                                {group.links.length}
                              </span>
                            </h3>
                            <ul className="mt-2.5 grid gap-1 sm:grid-cols-2">
                              {group.links.map((link) => (
                                <li key={link.href}>
                                  <Link
                                    href={link.href}
                                    className="group flex items-center gap-1.5 rounded-lg px-1.5 py-1 text-[12.5px] text-slate-600 transition-colors hover:bg-[#eef4ff] hover:text-[#0b57d0]"
                                  >
                                    <span className="min-w-0 flex-1 truncate">{link.label}</span>
                                    <ArrowRight
                                      aria-hidden="true"
                                      className="h-3 w-3 shrink-0 text-slate-300 transition-colors group-hover:text-[#0f6dff]"
                                    />
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                );
              })}
            </div>
          )}

          <p className="mt-10 border-t border-slate-200 pt-5 text-[12.5px] text-slate-500">
            Can&apos;t find what you need?{" "}
            <Link href="/contact" className="font-semibold text-[#0b57d0] hover:underline">
              Get in touch
            </Link>{" "}
            or run a{" "}
            <Link href="/free-seo-audit" className="font-semibold text-[#0b57d0] hover:underline">
              free SEO audit
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
