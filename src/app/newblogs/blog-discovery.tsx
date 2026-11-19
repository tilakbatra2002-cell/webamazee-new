"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type BlogSummary = {
  slug: string;
  image: string;
  alt: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
};

export function BlogDiscovery({ articles }: { articles: BlogSummary[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = [...new Set(articles.map((article) => article.category))];
  const visibleArticles = articles.filter((article) =>
    activeCategory === "All" || article.category === activeCategory
  );

  return (
    <div className="mt-8">
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-end">
        <div role="group" aria-label="Filter articles by category" className="flex flex-wrap gap-2">
          {["All", ...categories].map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-xl border px-4 py-2.5 text-[13px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff] ${
                activeCategory === category
                  ? "border-[#0f6dff] bg-[#0f6dff] text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-[#0f6dff]/50 hover:text-[#0f6dff]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <p aria-live="polite" className="shrink-0 text-[13px] font-medium text-slate-500">
          {visibleArticles.length} {visibleArticles.length === 1 ? "article" : "articles"}
        </p>
      </div>

      {visibleArticles.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {visibleArticles.map((article) => {
            const showFullExcerpt = article.slug === "how-to-choose-digital-marketing-agency-chandigarh";
            return (
              <article key={article.slug} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_10px_30px_-20px_rgba(11,21,40,0.15)]">
                <Link href={`/blog/${article.slug}`} aria-label={`Read ${article.title}`} className="flex min-w-0 items-center bg-[#eef3f9] p-3">
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-white">
                    <Image src={article.image} alt={article.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-contain" />
                  </div>
                </Link>
                <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">{article.category}</p>
                  <h3 className="mt-2 break-words font-display text-xl font-bold leading-snug tracking-tight text-[#0b1528]">{article.title}</h3>
                  <p className={`mt-2 text-[14px] leading-relaxed text-slate-600 ${showFullExcerpt ? "" : "line-clamp-2"}`}>{article.excerpt}</p>
                  <div className="mt-auto pt-5">
                    <p className="text-[12px] font-medium text-slate-500">{article.date} <span aria-hidden="true" className="px-1">·</span> {article.readTime}</p>
                    <Link href={`/blog/${article.slug}`} aria-label={`Read more: ${article.title}`} className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-bold text-[#0f6dff] hover:underline">
                      Read More <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="py-8 text-[15px] text-slate-600">No articles are available in this category yet.</p>
      )}
    </div>
  );
}
