"use client";

import { useState, type FormEvent } from "react";
import {
  AlertCircle,
  Check,
  Copy,
  Loader2,
  RefreshCw,
  Search,
  Trash2,
  Upload,
} from "lucide-react";
import type { SerializedAdmin, SerializedMediaAsset } from "@/lib/cms/types";
import { can } from "@/lib/cms/rbac";

interface MediaLibraryClientProps {
  admin: SerializedAdmin;
  initialAssets: SerializedMediaAsset[];
  blobConfigured: boolean;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function MediaLibraryClient({
  admin,
  initialAssets,
  blobConfigured,
}: MediaLibraryClientProps) {
  const canDelete = can(admin, "media:delete");
  const canReplace = can(admin, "media:replace") && can(admin, "media:edit");

  const [assets, setAssets] = useState<SerializedMediaAsset[]>(initialAssets);
  const [search, setSearch] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [alt, setAlt] = useState("");
  const [uploading, setUploading] = useState(false);
  const [replacingId, setReplacingId] = useState<string | null>(null);
  const [editingAltId, setEditingAltId] = useState<string | null>(null);
  const [editingAltValue, setEditingAltValue] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function refreshList(query = search) {
    const res = await fetch(
      `/api/admin/media${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`
    );
    const json = await res.json();
    if (res.ok) setAssets(json.items ?? []);
  }

  async function handleUpload(e: FormEvent) {
    e.preventDefault();
    if (!file) {
      setError("Choose a WebP, PNG, or JPEG file to upload.");
      return;
    }
    if (!alt.trim()) {
      setError("Descriptive alt text is required.");
      return;
    }

    setUploading(true);
    setError("");
    setNotice("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("alt", alt.trim());

      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Upload failed.");
        return;
      }

      setFile(null);
      setAlt("");
      setNotice(`Uploaded "${json.asset.filename}" to Vercel Blob.`);
      await refreshList();
    } catch {
      setError("Network error while uploading image.");
    } finally {
      setUploading(false);
    }
  }

  async function handleReplaceFile(asset: SerializedMediaAsset, nextFile: File) {
    setReplacingId(asset.id);
    setError("");
    setNotice("");
    try {
      const formData = new FormData();
      formData.append("file", nextFile);
      formData.append("alt", asset.alt);
      formData.append("replaceAssetId", asset.id);

      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Unable to replace image.");
        return;
      }

      setNotice(`Replaced image and synced ${json.asset.usageCount} referencing post(s).`);
      await refreshList();
    } catch {
      setError("Network error while replacing image.");
    } finally {
      setReplacingId(null);
    }
  }

  async function saveAlt(assetId: string) {
    if (!editingAltValue.trim()) return;
    setError("");
    const res = await fetch(`/api/admin/media/${assetId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ alt: editingAltValue.trim() }),
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error || "Unable to update alt text.");
      return;
    }
    setEditingAltId(null);
    await refreshList();
  }

  async function handleDelete(asset: SerializedMediaAsset) {
    if (!canDelete) return;
    if (!window.confirm(`Delete "${asset.filename}" from Vercel Blob?`)) return;

    setError("");
    setNotice("");
    const res = await fetch(`/api/admin/media/${asset.id}`, {
      method: "DELETE",
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error || "Unable to delete asset.");
      return;
    }
    setNotice(`Deleted "${asset.filename}".`);
    await refreshList();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-[#0b1528]">Media Library</h1>
        <p className="mt-1 text-sm text-slate-600">
          Upload WebP, PNG, or JPEG blog images (up to 5 MB) to Vercel Blob and track where each image is referenced.
        </p>
      </div>

      {!blobConfigured && (
        <div className="flex items-start gap-2.5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            <code>BLOB_READ_WRITE_TOKEN</code> is not configured on this server. Uploads and Blob deletions are disabled until the token is configured in environment variables.
          </span>
        </div>
      )}

      {/* Upload Box */}
      <form
        onSubmit={handleUpload}
        className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4"
      >
        <h2 className="font-display text-base font-bold text-[#0b1528]">
          Upload New Blog Image
        </h2>
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] md:items-end">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#0b1528]">
              Image File (WebP, PNG, JPEG · max 5 MB)
            </label>
            <input
              type="file"
              accept="image/webp,image/png,image/jpeg"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="block w-full rounded-xl border border-slate-200 bg-[#f7f9fc] p-2 text-xs file:mr-3 file:rounded-lg file:border-0 file:bg-[#0f6dff] file:px-3 py-1.5 file:text-xs file:font-semibold file:text-white"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#0b1528]">
              Alt Text *
            </label>
            <input
              type="text"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="Descriptive alt text for accessibility and SEO..."
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#0f6dff]"
            />
          </div>
          <button
            type="submit"
            disabled={uploading || !blobConfigured}
            className="inline-flex h-[42px] items-center justify-center gap-2 rounded-xl bg-[#0f6dff] px-5 text-xs font-semibold text-white hover:bg-[#0b57d0] disabled:opacity-50"
          >
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            Upload Image
          </button>
        </div>
      </form>

      {error && (
        <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </p>
      )}
      {notice && (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {notice}
        </p>
      )}

      {/* Search */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search uploaded files or alt text..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#0f6dff]"
          />
        </div>
        <button
          type="button"
          onClick={() => void refreshList()}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-[#0b1528] hover:border-[#0f6dff]"
        >
          Search
        </button>
      </div>

      {/* Grid */}
      {assets.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
          No Vercel Blob assets uploaded yet. Existing static images on the 13 migrated posts remain safely preserved in <code>/public/images/</code>.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white"
            >
              <div className="relative aspect-video bg-[#f7f9fc]">
                <img
                  src={asset.url}
                  alt={asset.alt}
                  className="h-full w-full object-contain"
                />
                <span
                  className={`absolute top-2.5 right-2.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                    asset.usageCount > 0
                      ? "bg-[#0f6dff] text-white"
                      : "bg-slate-800/80 text-white"
                  }`}
                >
                  {asset.usageCount > 0
                    ? `Used in ${asset.usageCount} post${asset.usageCount === 1 ? "" : "s"}`
                    : "Unused"}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-4 space-y-3">
                <div>
                  <p className="truncate font-display text-sm font-bold text-[#0b1528]">
                    {asset.filename}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {formatBytes(asset.size)} · {asset.contentType}
                  </p>
                </div>

                {editingAltId === asset.id ? (
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={editingAltValue}
                      onChange={(e) => setEditingAltValue(e.target.value)}
                      className="flex-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs outline-none focus:border-[#0f6dff]"
                    />
                    <button
                      type="button"
                      onClick={() => void saveAlt(asset.id)}
                      className="rounded-lg bg-[#0f6dff] px-2.5 py-1 text-xs font-semibold text-white"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingAltId(asset.id);
                      setEditingAltValue(asset.alt);
                    }}
                    className="text-left text-xs text-slate-600 hover:text-[#0f6dff]"
                  >
                    <span className="font-semibold text-[#0b1528]">Alt:</span> {asset.alt}{" "}
                    <span className="underline">(edit)</span>
                  </button>
                )}

                {asset.usedInSlugs.length > 0 && (
                  <p className="text-[11px] text-slate-500">
                    Refs: {asset.usedInSlugs.join(", ")}
                  </p>
                )}

                <div className="mt-auto flex flex-wrap gap-1.5 border-t border-slate-100 pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      void navigator.clipboard.writeText(asset.url);
                      setCopiedId(asset.id);
                      setTimeout(() => setCopiedId(null), 1500);
                    }}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-[#0b1528] hover:border-[#0f6dff]"
                  >
                    {copiedId === asset.id ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-600" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" /> Copy URL
                      </>
                    )}
                  </button>

                  {canReplace && (
                    <label className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-[#0b1528] hover:border-[#0f6dff]">
                      {replacingId === asset.id ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <RefreshCw className="h-3 w-3" />
                      )}
                      Replace
                      <input
                        type="file"
                        accept="image/webp,image/png,image/jpeg"
                        disabled={!blobConfigured || replacingId === asset.id}
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) void handleReplaceFile(asset, f);
                        }}
                        className="hidden"
                      />
                    </label>
                  )}

                  {canDelete && (
                    <button
                      type="button"
                      disabled={asset.usageCount > 0}
                      title={
                        asset.usageCount > 0
                          ? "Referenced by blog posts — remove references before deleting"
                          : "Delete asset"
                      }
                      onClick={() => void handleDelete(asset)}
                      className="ml-auto inline-flex items-center gap-1 rounded-lg border border-rose-200 px-2.5 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Trash2 className="h-3 w-3" /> Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
