"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Edit3,
  ExternalLink,
  Loader2,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import type {
  BlogStatus,
  SerializedAdmin,
  SerializedBlog,
  SerializedCategory,
} from "@/lib/cms/types";
import { can } from "@/lib/cms/rbac";

interface BlogsTableProps {
  admin: SerializedAdmin;
  categories: SerializedCategory[];
  initialData: {
    items: SerializedBlog[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    statusCounts: Record<"all" | BlogStatus, number>;
  };
}

const STATUS_BADGES: Record<BlogStatus, string> = {
  published: "bg-emerald-50 text-emerald-700 border-emerald-200",
  draft: "bg-slate-100 text-slate-700 border-slate-200",
  scheduled: "bg-amber-50 text-amber-800 border-amber-200",
  archived: "bg-rose-50 text-rose-700 border-rose-200",
};

export function BlogsTable({ admin, categories, initialData }: BlogsTableProps) {
  const canDelete = can(admin, "blogs:delete");

  const [data, setData] = useState(initialData);
  const [status, setStatus] = useState<"all" | BlogStatus>("all");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<"updated" | "published" | "title">("updated");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadBlogs(opts?: {
    nextStatus?: "all" | BlogStatus;
    nextCategory?: string;
    nextSort?: "updated" | "published" | "title";
    nextSearch?: string;
    nextPage?: number;
  }) {
    const s = opts?.nextStatus ?? status;
    const c = opts?.nextCategory ?? category;
    const so = opts?.nextSort ?? sort;
    const q = opts?.nextSearch ?? search;
    const p = opts?.nextPage ?? page;

    setLoading(true);
    setError("");
    try {
      const qs = new URLSearchParams({
        page: String(p),
        pageSize: String(initialData.pageSize || 12),
        sort: so,
      });
      if (s !== "all") qs.set("status", s);
      if (c !== "all") qs.set("category", c);
      if (q.trim()) qs.set("q", q.trim());

      const res = await fetch(`/api/admin/blogs?${qs.toString()}`);
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Unable to fetch blogs.");
      } else {
        setData(json);
      }
    } catch {
      setError("Network error while loading blogs.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(item: SerializedBlog) {
    if (!canDelete) return;
    if (!window.confirm(`Permanently delete "${item.title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/blogs/${item.id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Unable to delete blog.");
        return;
      }
      await loadBlogs();
    } catch {
      setError("Network error while deleting blog.");
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadBlogs({ nextPage: 1, nextSearch: search });
    }, 260);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const statusTabs: { id: "all" | BlogStatus; label: string }[] = [
    { id: "all", label: "All" },
    { id: "published", label: "Published" },
    { id: "draft", label: "Drafts" },
    { id: "scheduled", label: "Scheduled" },
    { id: "archived", label: "Archived" },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-[#0b1528]">Blog Posts</h1>
          <p className="mt-1 text-sm text-slate-600">
            Search, filter, edit, schedule, or archive articles across Webamazee.
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0f6dff] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0b57d0]"
        >
          <Plus className="h-4 w-4" /> Create Article
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-4">
        <div className="flex flex-wrap gap-2">
          {statusTabs.map((tab) => {
            const count = data.statusCounts?.[tab.id] ?? 0;
            const active = status === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setStatus(tab.id);
                  setPage(1);
                  void loadBlogs({ nextStatus: tab.id, nextPage: 1 });
                }}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  active
                    ? "border-[#0f6dff] bg-[#0f6dff] text-white"
                    : "border-slate-200 bg-[#f7f9fc] text-slate-600 hover:border-[#0f6dff]"
                }`}
              >
                {tab.label}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    active ? "bg-white/20 text-white" : "bg-white text-slate-700"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_200px_180px]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              placeholder="Search title, slug, keyword, author..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-[#0f6dff]"
            />
          </div>

          <select
            aria-label="Filter by category"
            value={category}
            onChange={(e) => {
              const nextCat = e.target.value;
              setCategory(nextCat);
              setPage(1);
              void loadBlogs({ nextCategory: nextCat, nextPage: 1 });
            }}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-[#0b1528] outline-none focus:border-[#0f6dff]"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            aria-label="Sort articles"
            value={sort}
            onChange={(e) => {
              const nextSort = e.target.value as "updated" | "published" | "title";
              setSort(nextSort);
              void loadBlogs({ nextSort });
            }}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-[#0b1528] outline-none focus:border-[#0f6dff]"
          >
            <option value="updated">Recently Updated</option>
            <option value="published">Publish Date</option>
            <option value="title">Title (A–Z)</option>
          </select>
        </div>
      </div>

      {error && (
        <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </p>
      )}

      {/* Results Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {loading ? (
          <div className="flex items-center justify-center py-14 text-sm text-slate-500">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading articles...
          </div>
        ) : data.items.length === 0 ? (
          <div className="p-10 text-center">
            <p className="font-display text-base font-bold text-[#0b1528]">
              No matching blog posts
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Try adjusting your filters or create a new article.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-slate-200 bg-[#f7f9fc] text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3.5">Article</th>
                  <th className="px-4 py-3.5">Category</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5">Date / Schedule</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.items.map((item) => (
                  <tr key={item.id} className="hover:bg-[#f4f8ff]/45">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.alt || item.title}
                          className="h-11 w-16 shrink-0 rounded-lg border border-slate-200 bg-[#f7f9fc] object-cover"
                        />
                        <div className="min-w-0">
                          <Link
                            href={`/admin/blogs/${item.id}/edit`}
                            className="line-clamp-1 font-display font-bold text-[#0b1528] hover:text-[#0f6dff]"
                          >
                            {item.title}
                          </Link>
                          <p className="truncate text-xs text-slate-500">
                            /blog/{item.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="rounded-lg bg-[#f4f8ff] px-2.5 py-1 text-xs font-semibold text-[#0f6dff]">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${STATUS_BADGES[item.status]}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-600">
                      <p className="font-medium text-[#0b1528]">{item.date}</p>
                      {item.status === "scheduled" && item.scheduledFor && (
                        <p className="text-[11px] text-amber-700">
                          Cron: {new Date(item.scheduledFor).toLocaleString()}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        {item.status === "published" && (
                          <Link
                            href={`/blog/${item.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View live ${item.title}`}
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:border-[#0f6dff] hover:text-[#0f6dff]"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Link>
                        )}
                        <Link
                          href={`/admin/blogs/${item.id}/edit`}
                          aria-label={`Edit ${item.title}`}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-[#0b1528] hover:border-[#0f6dff] hover:text-[#0f6dff]"
                        >
                          <Edit3 className="h-3.5 w-3.5" /> Edit
                        </Link>
                        {canDelete && (
                          <button
                            type="button"
                            onClick={() => void handleDelete(item)}
                            aria-label={`Delete ${item.title}`}
                            className="rounded-lg border border-slate-200 p-2 text-rose-600 hover:border-rose-300 hover:bg-rose-50"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {data.totalPages > 1 && (
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-slate-600">
          <span>
            Page {data.page} of {data.totalPages} ({data.total} total)
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={data.page <= 1}
              onClick={() => {
                const next = data.page - 1;
                setPage(next);
                void loadBlogs({ nextPage: next });
              }}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 hover:border-[#0f6dff] disabled:opacity-40"
            >
              <ChevronLeft className="h-3.5 w-3.5" /> Prev
            </button>
            <button
              type="button"
              disabled={data.page >= data.totalPages}
              onClick={() => {
                const next = data.page + 1;
                setPage(next);
                void loadBlogs({ nextPage: next });
              }}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 hover:border-[#0f6dff] disabled:opacity-40"
            >
              Next <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
