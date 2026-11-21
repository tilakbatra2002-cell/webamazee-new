"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Image as ImageIcon, Loader2, Search, Upload, X, Check } from "lucide-react";
import type { SerializedMediaAsset } from "@/lib/cms/types";

interface MediaPickerModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (selection: { url: string; alt: string; width?: number; height?: number }) => void;
  initialUrl?: string;
}

export function MediaPickerModal({
  open,
  onClose,
  onSelect,
  initialUrl = "",
}: MediaPickerModalProps) {
  const [tab, setTab] = useState<"library" | "upload" | "url">("library");
  const [assets, setAssets] = useState<SerializedMediaAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [loadError, setLoadError] = useState("");

  // Upload state
  const [file, setFile] = useState<File | null>(null);
  const [uploadAlt, setUploadAlt] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Direct URL / local path state
  const [customUrl, setCustomUrl] = useState(initialUrl);
  const [customAlt, setCustomAlt] = useState("");

  async function fetchAssets(query: string) {
    setLoading(true);
    setLoadError("");
    try {
      const res = await fetch(
        `/api/admin/media${query ? `?q=${encodeURIComponent(query)}` : ""}`
      );
      const data = await res.json();
      if (!res.ok) {
        setLoadError(data.error || "Unable to load media assets.");
      } else {
        setAssets(data.items ?? []);
      }
    } catch {
      setLoadError("Network error while loading media library.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!open) return;
    let active = true;
    const params = "";
    fetch(`/api/admin/media${params}`)
      .then(async (res) => {
        const data = await res.json();
        if (!active) return;
        if (!res.ok) {
          setLoadError(data.error || "Unable to load media assets.");
        } else {
          setAssets(data.items ?? []);
        }
      })
      .catch(() => {
        if (active) setLoadError("Network error while loading media library.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [open]);

  async function handleUpload(e: FormEvent) {
    e.preventDefault();
    if (!file) {
      setUploadError("Select a WebP, PNG, or JPEG image file.");
      return;
    }
    if (!uploadAlt.trim()) {
      setUploadError("Please provide descriptive alt text.");
      return;
    }

    setUploading(true);
    setUploadError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("alt", uploadAlt.trim());

      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setUploadError(data.error || "Upload failed.");
        return;
      }

      onSelect({
        url: data.asset.url,
        alt: data.asset.alt,
        width: data.asset.width,
        height: data.asset.height,
      });
      onClose();
    } catch {
      setUploadError("Network error while uploading image.");
    } finally {
      setUploading(false);
    }
  }

  function handleCustomUrlSubmit(e: FormEvent) {
    e.preventDefault();
    if (!customUrl.trim()) return;
    onSelect({ url: customUrl.trim(), alt: customAlt.trim() });
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b1528]/60 p-4 backdrop-blur-xs">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="media-picker-title"
        className="flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 id="media-picker-title" className="font-display text-lg font-bold text-[#0b1528]">
            Select or Upload Image
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close media picker"
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex border-b border-slate-200 bg-[#f7f9fc] px-5 pt-2">
          {(
            [
              { id: "library", label: "Media Library", icon: ImageIcon },
              { id: "upload", label: "Upload to Vercel Blob", icon: Upload },
              { id: "url", label: "Local Path / URL", icon: Check },
            ] as const
          ).map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-[13px] font-semibold transition-colors ${
                  tab === t.id
                    ? "border-[#0f6dff] text-[#0f6dff]"
                    : "border-transparent text-slate-600 hover:text-[#0b1528]"
                }`}
              >
                <Icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {tab === "library" && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search filename or alt text..."
                    className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-[#0f6dff]"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => void fetchAssets(search)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#0b1528] hover:border-[#0f6dff]"
                >
                  Search
                </button>
              </div>

              {loadError && (
                <p className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700">
                  {loadError}
                </p>
              )}

              {loading ? (
                <div className="flex items-center justify-center py-12 text-sm text-slate-500">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading assets...
                </div>
              ) : assets.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-[#f7f9fc] p-8 text-center">
                  <p className="text-sm font-medium text-slate-600">
                    No uploaded Vercel Blob images found yet.
                  </p>
                  <button
                    type="button"
                    onClick={() => setTab("upload")}
                    className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#0f6dff] px-4 py-2 text-xs font-semibold text-white"
                  >
                    <Upload className="h-3.5 w-3.5" /> Upload Your First Image
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {assets.map((asset) => (
                    <button
                      key={asset.id}
                      type="button"
                      onClick={() => {
                        onSelect({
                          url: asset.url,
                          alt: asset.alt,
                          width: asset.width,
                          height: asset.height,
                        });
                        onClose();
                      }}
                      className="group overflow-hidden rounded-xl border border-slate-200 bg-white text-left transition-all hover:border-[#0f6dff] hover:shadow-sm"
                    >
                      <div className="aspect-video w-full overflow-hidden bg-slate-100">
                        <img
                          src={asset.url}
                          alt={asset.alt}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="p-2.5">
                        <p className="truncate text-xs font-semibold text-[#0b1528]">
                          {asset.filename}
                        </p>
                        <p className="mt-0.5 truncate text-[11px] text-slate-500">
                          {asset.alt}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === "upload" && (
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0b1528]">
                  Image File (WebP, PNG, or JPEG — max 5 MB)
                </label>
                <input
                  type="file"
                  accept="image/webp,image/png,image/jpeg"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  className="mt-2 block w-full rounded-xl border border-slate-200 bg-[#f7f9fc] p-2.5 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-[#0f6dff] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0b1528]">
                  Alt Text (Required for SEO &amp; Accessibility)
                </label>
                <input
                  type="text"
                  value={uploadAlt}
                  onChange={(e) => setUploadAlt(e.target.value)}
                  placeholder="Describe what the image shows..."
                  required
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#0f6dff]"
                />
              </div>

              {uploadError && (
                <p className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700">
                  {uploadError}
                </p>
              )}

              <button
                type="submit"
                disabled={uploading}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0f6dff] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0b57d0] disabled:opacity-60"
              >
                {uploading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" /> Upload &amp; Select
                  </>
                )}
              </button>
            </form>
          )}

          {tab === "url" && (
            <form onSubmit={handleCustomUrlSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0b1528]">
                  Existing Site Path or Vercel Blob Image URL
                </label>
                <input
                  type="text"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="/images/custom/example.webp or https://*.public.blob.vercel-storage.com/..."
                  required
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#0f6dff]"
                />
                <p className="mt-1 text-[11px] text-slate-500">
                  Only local <code>/images/...</code> paths and approved Vercel Blob URLs are permitted so live pages stay reliable.
                </p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0b1528]">
                  Alt Text (optional if keeping existing)
                </label>
                <input
                  type="text"
                  value={customAlt}
                  onChange={(e) => setCustomAlt(e.target.value)}
                  placeholder="Descriptive alt text..."
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#0f6dff]"
                />
              </div>
              <button
                type="submit"
                className="rounded-xl bg-[#0f6dff] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0b57d0]"
              >
                Use This Image
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
