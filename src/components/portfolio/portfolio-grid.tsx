"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Search, ArrowUpRight, LayoutGrid, X, FolderSearch } from "lucide-react";
import type { Project } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

export const portfolioCategories = [
  { slug: "all", label: "All Projects" },
  { slug: "website-development", label: "Website Development" },
  { slug: "website-redesign", label: "Website Redesign" },
  { slug: "landing-pages", label: "Landing Pages" },
  { slug: "ecommerce", label: "E-commerce" },
  { slug: "seo", label: "SEO" },
  { slug: "local-seo", label: "Local SEO" },
  { slug: "ai-seo", label: "AI SEO" },
  { slug: "wordpress", label: "WordPress" },
  { slug: "react-nextjs", label: "React / Next.js" },
];

function BrowserPreview({ title, image }: { title: string; image: string }) {
  return (
    <div className="flex h-44 flex-col overflow-hidden rounded-t-2xl border-b border-line bg-white sm:h-48">
      <div className="flex items-center gap-1.5 border-b border-line bg-surface/70 px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
        <span className="ml-2 flex-1 truncate rounded-md bg-white px-2 py-1 text-[10px] text-slate-400 ring-1 ring-line">
          {title.toLowerCase().replace(/\s+/g, "-")}.com
        </span>
      </div>
      <div className="relative flex-1 overflow-hidden">
        <Image
          src={image}
          alt={`${title} website preview`}
          fill
          sizes="(max-width: 640px) 100vw, 400px"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    </div>
  );
}

const catLabel: Record<string, string> = Object.fromEntries(
  portfolioCategories.map((c) => [c.slug, c.label])
);

export function PortfolioGrid({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  const active = searchParams.get("category") ?? "all";
  const validActive = portfolioCategories.some((c) => c.slug === active)
    ? active
    : "all";

  const setCategory = useCallback(
    (slug: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (slug === "all") params.delete("category");
      else params.set("category", slug);
      const qs = params.toString();
      router.replace(qs ? `/portfolio?${qs}` : "/portfolio", { scroll: false });
    },
    [router, searchParams]
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return projects.filter((p) => {
      const catMatch =
        validActive === "all" || p.categories.includes(validActive);
      if (!catMatch) return false;
      if (!term) return true;
      const haystack = [
        p.title,
        p.industry,
        p.country,
        p.category,
        p.summary,
        p.services?.map((s) => s.name).join(" "),
        p.categories.map((c) => catLabel[c] ?? c).join(" "),
        p.techStack?.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(term);
    });
  }, [projects, validActive, query]);

  return (
    <div>
      {/* Filter bar: tabs + search */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-3.5 py-1.5 text-xs font-semibold text-white shadow-glow">
              <LayoutGrid className="h-3.5 w-3.5" /> Filter by category
            </span>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-80">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, industry, tech, service..."
              className="w-full rounded-full border border-line bg-white py-2.5 pl-10 pr-10 text-sm text-ink shadow-soft outline-none transition-all placeholder:text-slate-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-600/10"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 grid h-5 w-5 -translate-y-1/2 place-items-center rounded-full bg-surface text-slate-500 hover:text-brand-700"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2">
          {portfolioCategories.map((c) => {
            const isActive = validActive === c.slug;
            return (
              <button
                key={c.slug}
                onClick={() => setCategory(c.slug)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                  isActive
                    ? "text-white shadow-glow"
                    : "border border-line bg-white text-slate-600 shadow-soft hover:border-brand-600/30 hover:text-brand-700"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="portfolio-active-tab"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-brand-gradient"
                  />
                )}
                <span className="relative z-10">{c.label}</span>
              </button>
            );
          })}
        </div>

        {/* Result count */}
        <div className="flex items-center justify-between text-sm text-slate-500">
          <p>
            Showing{" "}
            <span className="font-semibold text-ink">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "Project" : "Projects"}
          </p>
          {(validActive !== "all" || query) && (
            <button
              onClick={() => {
                setCategory("all");
                setQuery("");
              }}
              className="text-sm font-semibold text-brand-700 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      <LayoutGroup>
        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={`/work/${p.slug}`}
                  className="group block h-full overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-600/20 hover:shadow-glow"
                >
                  <BrowserPreview title={p.title} image={p.image} />
                  <div className="flex flex-col p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-brand-600">{p.category}</p>
                      <span className="text-xs text-slate-400">{p.year}</span>
                    </div>

                    <h3 className="mt-1 font-display text-lg font-bold text-ink transition-colors group-hover:text-brand-700">
                      {p.title}
                    </h3>

                    {/* industry + country */}
                    <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                      <span>{p.industry}</span>
                      <span className="text-slate-300">·</span>
                      <span>{p.country}</span>
                    </p>

                    {/* category + service badges */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.categories.map((c) => (
                        <span
                          key={c}
                          className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[11px] font-medium text-brand-700"
                        >
                          {catLabel[c] ?? c}
                        </span>
                      ))}
                      {p.services?.slice(0, 2).map((s) => (
                        <span
                          key={s.name}
                          className="rounded-full bg-surface px-2.5 py-0.5 text-[11px] font-medium text-slate-500"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
                      <div>
                        <p className="text-xs text-slate-400">{p.client}</p>
                        <p className="text-sm font-semibold text-success">{p.outcome}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 opacity-0 transition-all duration-300 group-hover:opacity-100">
                        View Case Study
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {/* Empty state */}
      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto mt-10 flex max-w-md flex-col items-center rounded-3xl border border-dashed border-line bg-surface/50 p-10 text-center shadow-soft"
        >
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600">
            <FolderSearch className="h-7 w-7" />
          </span>
          <h3 className="mt-4 font-display text-xl font-bold text-ink">
            No projects found
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            We couldn't find any projects matching your filters. Try a different
            category or search term.
          </p>
          <button
            onClick={() => {
              setCategory("all");
              setQuery("");
            }}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition-all hover:shadow-glow-lg"
          >
            View All Projects
          </button>
        </motion.div>
      )}
    </div>
  );
}
