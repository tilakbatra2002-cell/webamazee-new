"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  Archive,
  ArrowLeft,
  CalendarClock,
  CheckCircle2,
  Clock,
  ExternalLink,
  Eye,
  FileEdit,
  HelpCircle,
  Image as ImageIcon,
  Info,
  Loader2,
  Plus,
  Save,
  Send,
  Sparkles,
  Trash2,
} from "lucide-react";
import type { ContentBlock } from "@/lib/blog-types";
import type {
  BlogStatus,
  SerializedAdmin,
  SerializedBlog,
  SerializedCategory,
  SerializedCmsSettings,
} from "@/lib/cms/types";
import { can } from "@/lib/cms/rbac";
import { estimateReadTime, extractTocFromBlocks } from "@/lib/cms/reading-time";
import { analyzeSeoGuidance } from "@/lib/cms/seo-diagnostics";
import { formatDisplayDate, slugify } from "@/lib/cms/slugify";
import { BlogCover } from "@/components/blog/blog-cover";
import { RichContent } from "@/components/blog/rich-content";
import { BlockEditor } from "./block-editor";
import { MediaPickerModal } from "./media-picker-modal";

interface BlogEditorProps {
  admin: SerializedAdmin;
  categories: SerializedCategory[];
  settings: SerializedCmsSettings;
  initialBlog?: SerializedBlog;
}

function isoToLocalDatetimeInput(iso?: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

function localDatetimeInputToIso(localVal: string): string | null {
  if (!localVal.trim()) return null;
  const parsed = new Date(localVal);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toISOString();
}

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-[14px] text-[#0b1528] outline-none transition-colors placeholder:text-slate-400 focus:border-[#0f6dff]";
const labelCls = "block text-[12.5px] font-semibold text-[#0b1528] mb-1.5";

export function BlogEditor({
  admin,
  categories,
  settings,
  initialBlog,
}: BlogEditorProps) {
  const router = useRouter();
  const isEditing = Boolean(initialBlog);
  const canPublish = can(admin, "blogs:publish");
  const canDelete = can(admin, "blogs:delete");

  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [activeTab, setActiveTab] = useState<"content" | "seo" | "faq">("content");

  const [title, setTitle] = useState(initialBlog?.title ?? "");
  const [slug, setSlug] = useState(initialBlog?.slug ?? "");
  const [slugLocked, setSlugLocked] = useState(Boolean(initialBlog));
  const [excerpt, setExcerpt] = useState(initialBlog?.excerpt ?? "");
  const [category, setCategory] = useState(
    initialBlog?.category ?? categories[0]?.name ?? "SEO"
  );
  const [author, setAuthor] = useState(initialBlog?.author ?? settings.defaultAuthor);
  const [authorRole, setAuthorRole] = useState(
    initialBlog?.authorRole ?? settings.defaultAuthorRole
  );
  const [date, setDate] = useState(
    initialBlog?.date ?? formatDisplayDate(new Date(), settings.timezone)
  );
  const [readTime, setReadTime] = useState(initialBlog?.readTime ?? "5 min read");

  const [image, setImage] = useState(initialBlog?.image ?? "");
  const [imageWidth, setImageWidth] = useState<number | undefined>(
    initialBlog?.imageWidth
  );
  const [imageHeight, setImageHeight] = useState<number | undefined>(
    initialBlog?.imageHeight
  );
  const [alt, setAlt] = useState(initialBlog?.alt ?? "");
  const [inlineCover, setInlineCover] = useState(Boolean(initialBlog?.inlineCover));

  const [seoTitle, setSeoTitle] = useState(initialBlog?.seoTitle ?? "");
  const [absoluteTitle, setAbsoluteTitle] = useState(
    Boolean(initialBlog?.absoluteTitle)
  );
  const [metaDescription, setMetaDescription] = useState(
    initialBlog?.metaDescription ?? ""
  );
  const [canonicalUrl, setCanonicalUrl] = useState(initialBlog?.canonicalUrl ?? "");
  const [primaryKeyword, setPrimaryKeyword] = useState(
    initialBlog?.primaryKeyword ?? ""
  );
  const [secondaryKeywordsText, setSecondaryKeywordsText] = useState(
    (initialBlog?.secondaryKeywords ?? []).join(", ")
  );
  const [metaKeywordsText, setMetaKeywordsText] = useState(
    (initialBlog?.metaKeywords ?? []).join(", ")
  );
  const [ogTitle, setOgTitle] = useState(initialBlog?.ogTitle ?? "");
  const [ogDescription, setOgDescription] = useState(
    initialBlog?.ogDescription ?? ""
  );
  const [ogImage, setOgImage] = useState(initialBlog?.ogImage ?? "");
  const [noindex, setNoindex] = useState(Boolean(initialBlog?.noindex));
  const [nofollow, setNofollow] = useState(Boolean(initialBlog?.nofollow));

  const [faqs, setFaqs] = useState<{ q: string; a: string }[]>(
    initialBlog?.faqs ?? []
  );
  const [toc, setToc] = useState<{ text: string; id: string; level?: 2 | 3 }[]>(
    initialBlog?.toc ?? []
  );
  const [content, setContent] = useState<ContentBlock[]>(
    initialBlog?.content ?? [{ type: "paragraph", text: "" }]
  );

  const [status, setStatus] = useState<BlogStatus>(initialBlog?.status ?? "draft");
  const [scheduledLocal, setScheduledLocal] = useState(
    isoToLocalDatetimeInput(initialBlog?.scheduledFor)
  );

  const [mediaModalFor, setMediaModalFor] = useState<"cover" | "og" | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const seoGuidance = useMemo(
    () =>
      analyzeSeoGuidance({
        title,
        slug,
        excerpt,
        seoTitle,
        metaDescription,
        canonicalUrl,
        primaryKeyword,
        image,
        alt,
        faqs,
        content,
      }),
    [
      title,
      slug,
      excerpt,
      seoTitle,
      metaDescription,
      canonicalUrl,
      primaryKeyword,
      image,
      alt,
      faqs,
      content,
    ]
  );

  function handleTitleChange(val: string) {
    setTitle(val);
    if (!slugLocked) {
      setSlug(slugify(val));
    }
  }

  function parseCsvList(raw: string): string[] {
    return raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  async function saveWithStatus(targetStatus: BlogStatus) {
    setErrorMessage("");
    setSuccessMessage("");

    const scheduledIso =
      targetStatus === "scheduled" ? localDatetimeInputToIso(scheduledLocal) : null;
    if (targetStatus === "scheduled" && !scheduledIso) {
      setErrorMessage("Please choose a valid future schedule date and time.");
      return;
    }

    setSaving(true);
    try {
      const imageMatchesInitial =
        initialBlog && image.trim() === initialBlog.image.trim();
      const payload = {
        title,
        slug,
        excerpt,
        category,
        author,
        authorRole,
        date,
        readTime,
        image,
        ...(imageWidth !== undefined
          ? { imageWidth }
          : isEditing && !imageMatchesInitial
            ? { imageWidth: null }
            : {}),
        ...(imageHeight !== undefined
          ? { imageHeight }
          : isEditing && !imageMatchesInitial
            ? { imageHeight: null }
            : {}),
        inlineCover,
        alt,
        seoTitle: seoTitle.trim(),
        absoluteTitle,
        metaDescription: metaDescription.trim(),
        canonicalUrl: canonicalUrl.trim(),
        primaryKeyword: primaryKeyword.trim(),
        secondaryKeywords: parseCsvList(secondaryKeywordsText),
        metaKeywords: parseCsvList(metaKeywordsText),
        ogTitle: ogTitle.trim(),
        ogDescription: ogDescription.trim(),
        ogImage: ogImage.trim(),
        noindex,
        nofollow,
        faqs: faqs.filter((f) => f.q.trim() && f.a.trim()),
        toc: toc.filter((t) => t.text.trim() && t.id.trim()),
        content,
        status: targetStatus,
        publishedAt: initialBlog?.publishedAt ?? null,
        scheduledFor: scheduledIso,
      };

      const url = isEditing
        ? `/api/admin/blogs/${initialBlog!.id}`
        : "/api/admin/blogs";
      const method = isEditing ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || "Unable to save blog post.");
        return;
      }

      setStatus(data.blog.status);
      setSuccessMessage(
        targetStatus === "published"
          ? "Post saved and published live."
          : targetStatus === "scheduled"
            ? "Post scheduled for automated publication."
            : targetStatus === "archived"
              ? "Post archived and hidden from public pages."
              : "Draft saved."
      );

      if (!isEditing && data.blog?.id) {
        router.replace(`/admin/blogs/${data.blog.id}/edit`);
      } else {
        router.refresh();
      }
    } catch {
      setErrorMessage("Network error while saving blog post.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!initialBlog || !canDelete) return;
    if (
      !window.confirm(
        `Permanently delete "${title}"? This removes it from MongoDB and unpublishes /blog/${slug}.`
      )
    ) {
      return;
    }

    setDeleting(true);
    setErrorMessage("");
    try {
      const res = await fetch(`/api/admin/blogs/${initialBlog.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || "Could not delete post.");
        return;
      }
      router.push("/admin/blogs");
      router.refresh();
    } catch {
      setErrorMessage("Network error while deleting post.");
    } finally {
      setDeleting(false);
    }
  }

  const statusBadgeColors: Record<BlogStatus, string> = {
    published: "bg-emerald-50 text-emerald-700 border-emerald-200",
    draft: "bg-slate-100 text-slate-700 border-slate-200",
    scheduled: "bg-amber-50 text-amber-800 border-amber-200",
    archived: "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <div className="space-y-6">
      {/* Top Action Header */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="min-w-0">
          <Link
            href="/admin/blogs"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0f6dff]"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Blog Posts
          </Link>
          <div className="mt-1.5 flex flex-wrap items-center gap-2.5">
            <h1 className="truncate font-display text-xl font-bold text-[#0b1528] sm:text-2xl">
              {isEditing ? "Edit Blog Article" : "New Blog Article"}
            </h1>
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${statusBadgeColors[status]}`}
            >
              {status}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-xl border border-slate-200 bg-[#f7f9fc] p-1">
            <button
              type="button"
              onClick={() => setMode("edit")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold ${
                mode === "edit" ? "bg-white text-[#0b1528] shadow-xs" : "text-slate-600"
              }`}
            >
              <FileEdit className="h-3.5 w-3.5" /> Write
            </button>
            <button
              type="button"
              onClick={() => setMode("preview")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold ${
                mode === "preview" ? "bg-white text-[#0b1528] shadow-xs" : "text-slate-600"
              }`}
            >
              <Eye className="h-3.5 w-3.5" /> Preview
            </button>
          </div>

          {status === "published" && slug && (
            <Link
              href={`/blog/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-[#0b1528] hover:border-[#0f6dff]"
            >
              View Live <ExternalLink className="h-3.5 w-3.5 text-[#0f6dff]" />
            </Link>
          )}

          <button
            type="button"
            disabled={saving}
            onClick={() => void saveWithStatus("draft")}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-[#0b1528] hover:border-[#0f6dff] disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
            Save Draft
          </button>

          {canPublish && (
            <button
              type="button"
              disabled={saving}
              onClick={() => void saveWithStatus("published")}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#0f6dff] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0b57d0] disabled:opacity-60"
            >
              {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
              {status === "published" ? "Update Published" : "Publish Now"}
            </button>
          )}
        </div>
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div
          role="status"
          className="flex items-start gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {mode === "preview" ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10">
          <div className="mx-auto max-w-[780px]">
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">
              {category}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-[#0b1528] sm:text-4xl">
              {title || "Untitled Article"}
            </h2>
            <p className="mt-3 text-sm font-medium text-slate-500">
              {author} ({authorRole}) · {date} · {readTime}
            </p>
            <div className="mt-6">
              {!inlineCover && image && (
                <BlogCover title={title} category={category} image={image} alt={alt} />
              )}
              <RichContent blocks={content} />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          {/* MAIN LEFT COLUMN */}
          <div className="min-w-0 space-y-5">
            {/* Sub-navigation Tabs */}
            <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2">
              {(
                [
                  { id: "content", label: "Article Content", icon: FileEdit },
                  { id: "seo", label: "SEO, Canonical & Social", icon: Sparkles },
                  { id: "faq", label: "FAQs & Table of Contents", icon: HelpCircle },
                ] as const
              ).map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-colors ${
                      activeTab === tab.id
                        ? "bg-[#0f6dff] text-white"
                        : "text-slate-600 hover:bg-[#f4f8ff] hover:text-[#0b1528]"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {activeTab === "content" && (
              <div className="space-y-5">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
                  <div>
                    <label htmlFor="blog-title" className={labelCls}>
                      Article Title *
                    </label>
                    <input
                      id="blog-title"
                      type="text"
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="e.g., How to Choose a Digital Marketing Agency in Chandigarh"
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="blog-slug" className={labelCls}>
                        URL Slug *
                      </label>
                      {slugLocked && (
                        <button
                          type="button"
                          onClick={() => setSlugLocked(false)}
                          className="text-[11px] font-semibold text-[#0f6dff] hover:underline"
                        >
                          Sync from title
                        </button>
                      )}
                    </div>
                    <div className="flex items-center rounded-xl border border-slate-200 bg-[#f7f9fc] focus-within:border-[#0f6dff]">
                      <span className="pl-3.5 text-xs font-medium text-slate-500">
                        /blog/
                      </span>
                      <input
                        id="blog-slug"
                        type="text"
                        value={slug}
                        onChange={(e) => {
                          setSlugLocked(true);
                          setSlug(slugify(e.target.value));
                        }}
                        placeholder="your-article-slug"
                        className="w-full bg-transparent px-1.5 py-2.5 text-[14px] text-[#0b1528] outline-none"
                      />
                    </div>
                    {isEditing && initialBlog && slug !== initialBlog.slug && (
                      <p className="mt-1 text-xs font-medium text-amber-700">
                        Note: changing the slug changes the public article URL. Keep original slugs on migrated posts to preserve SEO rankings.
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="blog-excerpt" className={labelCls}>
                      Excerpt / Summary *
                    </label>
                    <textarea
                      id="blog-excerpt"
                      rows={3}
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="Concise summary shown on /blog listing cards and fallback descriptions..."
                      className={inputCls}
                    />
                  </div>
                </div>

                <BlockEditor blocks={content} onChange={setContent} />
              </div>
            )}

            {activeTab === "seo" && (
              <div className="space-y-5">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
                  <h2 className="font-display text-base font-bold text-[#0b1528]">
                    Search Engine Metadata
                  </h2>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <div className="flex items-center justify-between">
                        <label htmlFor="seo-title" className={labelCls}>
                          SEO Title (Meta Title)
                        </label>
                        <span className="text-[11px] font-medium text-slate-500">
                          {(seoTitle || title).length} chars
                        </span>
                      </div>
                      <input
                        id="seo-title"
                        type="text"
                        value={seoTitle}
                        onChange={(e) => setSeoTitle(e.target.value)}
                        placeholder={title || "Defaults to Article Title"}
                        className={inputCls}
                      />
                      <label className="mt-2 inline-flex items-center gap-2 text-xs font-medium text-slate-600">
                        <input
                          type="checkbox"
                          checked={absoluteTitle}
                          onChange={(e) => setAbsoluteTitle(e.target.checked)}
                        />
                        Use exact SEO title without appending &ldquo;| Webamazee&rdquo;
                      </label>
                    </div>

                    <div className="sm:col-span-2">
                      <div className="flex items-center justify-between">
                        <label htmlFor="meta-desc" className={labelCls}>
                          Meta Description
                        </label>
                        <span className="text-[11px] font-medium text-slate-500">
                          {(metaDescription || excerpt).length} chars
                        </span>
                      </div>
                      <textarea
                        id="meta-desc"
                        rows={3}
                        value={metaDescription}
                        onChange={(e) => setMetaDescription(e.target.value)}
                        placeholder={excerpt || "Defaults to Excerpt"}
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label htmlFor="primary-keyword" className={labelCls}>
                        Primary Focus Keyword
                      </label>
                      <input
                        id="primary-keyword"
                        type="text"
                        value={primaryKeyword}
                        onChange={(e) => setPrimaryKeyword(e.target.value)}
                        placeholder="e.g., digital marketing agency in Chandigarh"
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label htmlFor="canonical-url" className={labelCls}>
                        Canonical URL Override (optional)
                      </label>
                      <input
                        id="canonical-url"
                        type="text"
                        value={canonicalUrl}
                        onChange={(e) => setCanonicalUrl(e.target.value)}
                        placeholder={`/blog/${slug || "your-slug"}`}
                        className={inputCls}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="secondary-keywords" className={labelCls}>
                        Secondary Keywords (comma-separated)
                      </label>
                      <input
                        id="secondary-keywords"
                        type="text"
                        value={secondaryKeywordsText}
                        onChange={(e) => setSecondaryKeywordsText(e.target.value)}
                        placeholder="keyword one, keyword two, ..."
                        className={inputCls}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="meta-keywords" className={labelCls}>
                        Curated Meta Keywords (comma-separated, optional)
                      </label>
                      <input
                        id="meta-keywords"
                        type="text"
                        value={metaKeywordsText}
                        onChange={(e) => setMetaKeywordsText(e.target.value)}
                        placeholder="Optional curated keyword list"
                        className={inputCls}
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
                  <h2 className="font-display text-base font-bold text-[#0b1528]">
                    OpenGraph &amp; Indexing Controls
                  </h2>

                  <div>
                    <label htmlFor="og-title" className={labelCls}>
                      OpenGraph Title Override
                    </label>
                    <input
                      id="og-title"
                      type="text"
                      value={ogTitle}
                      onChange={(e) => setOgTitle(e.target.value)}
                      placeholder="Defaults to SEO Title"
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label htmlFor="og-description" className={labelCls}>
                      OpenGraph Description Override
                    </label>
                    <textarea
                      id="og-description"
                      rows={2}
                      value={ogDescription}
                      onChange={(e) => setOgDescription(e.target.value)}
                      placeholder="Defaults to Meta Description"
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className={labelCls}>OpenGraph Social Image Override</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={ogImage}
                        onChange={(e) => setOgImage(e.target.value)}
                        placeholder={`Defaults to Featured Cover Image (${settings.defaultOgImage} fallback)`}
                        className={`${inputCls} flex-1`}
                      />
                      <button
                        type="button"
                        onClick={() => setMediaModalFor("og")}
                        className="rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-[#0b1528] hover:border-[#0f6dff]"
                      >
                        Choose
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-6 pt-1">
                    <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        checked={noindex}
                        onChange={(e) => setNoindex(e.target.checked)}
                      />
                      noindex (exclude from search engine results)
                    </label>
                    <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        checked={nofollow}
                        onChange={(e) => setNofollow(e.target.checked)}
                      />
                      nofollow (do not follow outbound links)
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "faq" && (
              <div className="space-y-5">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-display text-base font-bold text-[#0b1528]">
                        Article FAQs ({faqs.length})
                      </h2>
                      <p className="text-xs text-slate-500">
                        Automatically emitted as FAQPage JSON-LD structured data on the live post.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFaqs([...faqs, { q: "", a: "" }])}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#0f6dff] px-3.5 py-2 text-xs font-semibold text-white"
                    >
                      <Plus className="h-3.5 w-3.5" /> Add FAQ
                    </button>
                  </div>

                  {faqs.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-slate-300 bg-[#f7f9fc] p-5 text-center text-xs text-slate-500">
                      No structured FAQs added yet.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {faqs.map((faq, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl border border-slate-200 bg-[#f7f9fc] p-4 space-y-2.5"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-[#0f6dff]">
                              FAQ #{idx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => setFaqs(faqs.filter((_, i) => i !== idx))}
                              className="text-rose-500 hover:text-rose-700"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <input
                            type="text"
                            value={faq.q}
                            onChange={(e) => {
                              const next = [...faqs];
                              next[idx] = { ...faq, q: e.target.value };
                              setFaqs(next);
                            }}
                            placeholder="Question..."
                            className={inputCls}
                          />
                          <textarea
                            rows={2}
                            value={faq.a}
                            onChange={(e) => {
                              const next = [...faqs];
                              next[idx] = { ...faq, a: e.target.value };
                              setFaqs(next);
                            }}
                            placeholder="Answer..."
                            className={inputCls}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h2 className="font-display text-base font-bold text-[#0b1528]">
                        Sidebar Table of Contents ({toc.length})
                      </h2>
                      <p className="text-xs text-slate-500">
                        Optional explicit TOC items. If left empty, the article page derives H2 links automatically.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setToc(extractTocFromBlocks(content))}
                        className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-[#0b1528] hover:border-[#0f6dff]"
                      >
                        Extract from Headings
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setToc([...toc, { text: "", id: "", level: 2 }])
                        }
                        className="inline-flex items-center gap-1 rounded-xl bg-[#0f6dff] px-3 py-1.5 text-xs font-semibold text-white"
                      >
                        <Plus className="h-3.5 w-3.5" /> Add Item
                      </button>
                    </div>
                  </div>

                  {toc.length > 0 && (
                    <div className="space-y-2">
                      {toc.map((item, idx) => (
                        <div
                          key={idx}
                          className="grid gap-2 sm:grid-cols-[80px_minmax(0,1fr)_160px_36px]"
                        >
                          <select
                            value={item.level ?? 2}
                            onChange={(e) => {
                              const next = [...toc];
                              next[idx] = {
                                ...item,
                                level: Number(e.target.value) === 3 ? 3 : 2,
                              };
                              setToc(next);
                            }}
                            className={inputCls}
                          >
                            <option value={2}>H2</option>
                            <option value={3}>H3</option>
                          </select>
                          <input
                            type="text"
                            value={item.text}
                            onChange={(e) => {
                              const next = [...toc];
                              next[idx] = {
                                ...item,
                                text: e.target.value,
                                id: item.id || slugify(e.target.value),
                              };
                              setToc(next);
                            }}
                            placeholder="Heading label"
                            className={inputCls}
                          />
                          <input
                            type="text"
                            value={item.id}
                            onChange={(e) => {
                              const next = [...toc];
                              next[idx] = { ...item, id: slugify(e.target.value) };
                              setToc(next);
                            }}
                            placeholder="anchor-id"
                            className={inputCls}
                          />
                          <button
                            type="button"
                            onClick={() => setToc(toc.filter((_, i) => i !== idx))}
                            className="grid place-items-center rounded-xl border border-slate-200 text-rose-500 hover:bg-rose-50"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR INSPECTOR */}
          <aside className="space-y-5">
            {/* Publishing & Scheduling */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
              <h2 className="font-display text-base font-bold text-[#0b1528]">
                Publishing &amp; Schedule
              </h2>

              {!canPublish ? (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
                  Your Editor account can create drafts and archive posts, but does not have live publishing permission.
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label htmlFor="schedule-dt" className={labelCls}>
                      Schedule Future Publish (Default TZ: {settings.timezone})
                    </label>
                    <input
                      id="schedule-dt"
                      type="datetime-local"
                      value={scheduledLocal}
                      onChange={(e) => setScheduledLocal(e.target.value)}
                      className={inputCls}
                    />
                    {scheduledLocal && localDatetimeInputToIso(scheduledLocal) && (
                      <p className="mt-1 text-[11px] text-slate-500">
                        UTC: {localDatetimeInputToIso(scheduledLocal)}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    disabled={saving || !scheduledLocal}
                    onClick={() => void saveWithStatus("scheduled")}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2 text-xs font-bold text-amber-900 hover:bg-amber-100 disabled:opacity-50"
                  >
                    <CalendarClock className="h-3.5 w-3.5" /> Schedule Article
                  </button>
                </div>
              )}

              <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-3">
                <button
                  type="button"
                  disabled={saving || (status === "published" && !canPublish)}
                  onClick={() => void saveWithStatus("archived")}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                >
                  <Archive className="h-3.5 w-3.5" /> Archive
                </button>
                {isEditing && canDelete && (
                  <button
                    type="button"
                    disabled={deleting}
                    onClick={() => void handleDelete()}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 disabled:opacity-50"
                  >
                    {deleting ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" />
                    )}
                    Delete
                  </button>
                )}
              </div>
            </div>

            {/* Cover Image & Alt Text */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3.5">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-base font-bold text-[#0b1528]">
                  Featured Image
                </h2>
                <button
                  type="button"
                  onClick={() => setMediaModalFor("cover")}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#0f6dff] hover:underline"
                >
                  <ImageIcon className="h-3.5 w-3.5" /> Browse / Upload
                </button>
              </div>

              {image && (
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-[#f7f9fc]">
                  <img
                    src={image}
                    alt={alt || "Featured cover preview"}
                    className="aspect-video w-full object-contain"
                  />
                </div>
              )}

              <div>
                <label htmlFor="cover-image" className={labelCls}>
                  Image URL / Path *
                </label>
                <input
                  id="cover-image"
                  type="text"
                  value={image}
                  onChange={(e) => {
                    const nextUrl = e.target.value;
                    setImage(nextUrl);
                    if (initialBlog && nextUrl.trim() === initialBlog.image.trim()) {
                      setImageWidth(initialBlog.imageWidth);
                      setImageHeight(initialBlog.imageHeight);
                    } else {
                      setImageWidth(undefined);
                      setImageHeight(undefined);
                    }
                  }}
                  placeholder="/images/custom/... or Vercel Blob URL"
                  className={inputCls}
                />
                {imageWidth && imageHeight && (
                  <p className="mt-1 text-[11px] text-slate-500">
                    Preserved dimensions: {imageWidth} × {imageHeight}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="cover-alt" className={labelCls}>
                  Image Alt Text *
                </label>
                <input
                  id="cover-alt"
                  type="text"
                  value={alt}
                  onChange={(e) => setAlt(e.target.value)}
                  placeholder="Descriptive alt text"
                  className={inputCls}
                />
              </div>

              <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-600">
                <input
                  type="checkbox"
                  checked={inlineCover}
                  onChange={(e) => setInlineCover(e.target.checked)}
                />
                Render cover inline inside article body instead of above it
              </label>
            </div>

            {/* Category, Author & Meta */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3.5">
              <h2 className="font-display text-base font-bold text-[#0b1528]">
                Metadata &amp; Attribution
              </h2>

              <div>
                <label htmlFor="post-category" className={labelCls}>
                  Category *
                </label>
                <input
                  id="post-category"
                  list="cms-categories-list"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={inputCls}
                />
                <datalist id="cms-categories-list">
                  {categories.map((c) => (
                    <option key={c.id} value={c.name} />
                  ))}
                </datalist>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="post-author" className={labelCls}>
                    Author *
                  </label>
                  <input
                    id="post-author"
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="post-role" className={labelCls}>
                    Author Role *
                  </label>
                  <input
                    id="post-role"
                    type="text"
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value)}
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="post-date" className={labelCls}>
                    Display Date *
                  </label>
                  <input
                    id="post-date"
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Nov 18, 2026"
                    className={inputCls}
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="post-readtime" className={labelCls}>
                      Read Time *
                    </label>
                    <button
                      type="button"
                      onClick={() => setReadTime(estimateReadTime(content, faqs))}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0f6dff] hover:underline"
                    >
                      <Clock className="h-3 w-3" /> Estimate
                    </button>
                  </div>
                  <input
                    id="post-readtime"
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="6 min read"
                    className={inputCls}
                  />
                </div>
              </div>
            </div>

            {/* Honest SEO Readiness Checklist */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-[#0f6dff]" />
                <h2 className="font-display text-base font-bold text-[#0b1528]">
                  SEO Readiness Checks
                </h2>
              </div>
              <ul className="space-y-2.5 text-xs">
                {seoGuidance.checks.map((c) => (
                  <li key={c.id} className="flex items-start gap-2">
                    <span
                      className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                        c.status === "good"
                          ? "bg-emerald-500"
                          : c.status === "warning"
                            ? "bg-amber-500"
                            : "bg-slate-400"
                      }`}
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-[#0b1528]">{c.label}</p>
                      <p className="break-words text-slate-500">{c.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      )}

      <MediaPickerModal
        key={mediaModalFor ?? "closed"}
        open={mediaModalFor !== null}
        onClose={() => setMediaModalFor(null)}
        initialUrl={mediaModalFor === "cover" ? image : ogImage}
        onSelect={({ url, alt: selectedAlt, width, height }) => {
          if (mediaModalFor === "cover") {
            setImage(url);
            if (initialBlog && url.trim() === initialBlog.image.trim()) {
              setImageWidth(initialBlog.imageWidth);
              setImageHeight(initialBlog.imageHeight);
            } else {
              setImageWidth(width);
              setImageHeight(height);
            }
            if (!alt.trim() && selectedAlt) setAlt(selectedAlt);
          } else if (mediaModalFor === "og") {
            setOgImage(url);
          }
        }}
      />
    </div>
  );
}
