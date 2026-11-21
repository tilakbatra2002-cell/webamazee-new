"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Save, XCircle } from "lucide-react";
import type {
  EnvDiagnostics,
  SerializedAdmin,
  SerializedCmsSettings,
} from "@/lib/cms/types";
import { can } from "@/lib/cms/rbac";

interface SettingsClientProps {
  admin: SerializedAdmin;
  initialSettings: SerializedCmsSettings;
  diagnostics: EnvDiagnostics;
}

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#0b1528] outline-none focus:border-[#0f6dff] disabled:bg-slate-50";

export function SettingsClient({
  admin,
  initialSettings,
  diagnostics,
}: SettingsClientProps) {
  const canEdit = can(admin, "settings:manage");

  const [siteName, setSiteName] = useState(initialSettings.siteName);
  const [defaultAuthor, setDefaultAuthor] = useState(initialSettings.defaultAuthor);
  const [defaultAuthorRole, setDefaultAuthorRole] = useState(
    initialSettings.defaultAuthorRole
  );
  const [defaultOgImage, setDefaultOgImage] = useState(initialSettings.defaultOgImage);
  const [postsPerPage, setPostsPerPage] = useState(initialSettings.postsPerPage);
  const [blogIndexTitle, setBlogIndexTitle] = useState(initialSettings.blogIndexTitle);
  const [blogIndexDescription, setBlogIndexDescription] = useState(
    initialSettings.blogIndexDescription
  );
  const [timezone, setTimezone] = useState(initialSettings.timezone);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canEdit) return;
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteName,
          defaultAuthor,
          defaultAuthorRole,
          defaultOgImage,
          postsPerPage: Number(postsPerPage),
          blogIndexTitle,
          blogIndexDescription,
          timezone,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Unable to update CMS settings.");
        return;
      }
      setNotice("Settings saved.");
    } catch {
      setError("Network error while saving settings.");
    } finally {
      setSaving(false);
    }
  }

  const envItems = [
    {
      label: "MongoDB Atlas (MONGODB_URI)",
      ok: diagnostics.mongodbConfigured,
      detail: diagnostics.mongodbConfigured
        ? `Connected to database "${diagnostics.mongodbDb}"`
        : "Not configured",
    },
    {
      label: "Session Signing Secret (SESSION_SECRET)",
      ok: diagnostics.sessionSecretConfigured,
      detail: diagnostics.sessionSecretConfigured
        ? "Configured (>= 32 chars)"
        : "Missing or shorter than 32 chars",
    },
    {
      label: "Vercel Blob Storage (BLOB_READ_WRITE_TOKEN)",
      ok: diagnostics.blobConfigured,
      detail: diagnostics.blobConfigured
        ? "Server-side upload token configured"
        : "Unset — media uploads disabled until configured",
    },
    {
      label: "Scheduled Publish Cron (CRON_SECRET)",
      ok: diagnostics.cronSecretConfigured,
      detail: diagnostics.cronSecretConfigured
        ? "Authorized at /api/cron/publish-scheduled"
        : "Unset — cron endpoint locked down",
    },
    {
      label: "Resend Email Invites (RESEND_API_KEY + EMAIL_FROM)",
      ok: diagnostics.emailConfigured,
      detail: diagnostics.emailConfigured
        ? "Email invites & password resets active"
        : "Unset — Super Admin gets manual one-time invite links",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-[#0b1528]">
          CMS Settings &amp; Infrastructure Status
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Default editorial settings and live server environment readiness checks.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-[#0b1528]">
              Editorial Defaults
            </h2>
            {!canEdit && (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600">
                Read-only (Super Admin required to edit)
              </span>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#0b1528]">
                Site Name
              </label>
              <input
                type="text"
                disabled={!canEdit}
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className={inputCls}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#0b1528]">
                Default Timezone
              </label>
              <input
                type="text"
                disabled={!canEdit}
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className={inputCls}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#0b1528]">
                Default Author Name
              </label>
              <input
                type="text"
                disabled={!canEdit}
                value={defaultAuthor}
                onChange={(e) => setDefaultAuthor(e.target.value)}
                className={inputCls}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#0b1528]">
                Default Author Role
              </label>
              <input
                type="text"
                disabled={!canEdit}
                value={defaultAuthorRole}
                onChange={(e) => setDefaultAuthorRole(e.target.value)}
                className={inputCls}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#0b1528]">
                Default OpenGraph Image
              </label>
              <input
                type="text"
                disabled={!canEdit}
                value={defaultOgImage}
                onChange={(e) => setDefaultOgImage(e.target.value)}
                className={inputCls}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#0b1528]">
                Posts Per Admin Page
              </label>
              <input
                type="number"
                min={3}
                max={50}
                disabled={!canEdit}
                value={postsPerPage}
                onChange={(e) => setPostsPerPage(Number(e.target.value))}
                className={inputCls}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold text-[#0b1528]">
                Blog Index Meta Title
              </label>
              <input
                type="text"
                disabled={!canEdit}
                value={blogIndexTitle}
                onChange={(e) => setBlogIndexTitle(e.target.value)}
                className={inputCls}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold text-[#0b1528]">
                Blog Index Meta Description
              </label>
              <textarea
                rows={2}
                disabled={!canEdit}
                value={blogIndexDescription}
                onChange={(e) => setBlogIndexDescription(e.target.value)}
                className={inputCls}
              />
            </div>
          </div>

          {error && (
            <p className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700">
              {error}
            </p>
          )}
          {notice && (
            <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-sm text-emerald-700">
              {notice}
            </p>
          )}

          {canEdit && (
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-[#0f6dff] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#0b57d0] disabled:opacity-60"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save Settings
            </button>
          )}
        </form>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
          <h2 className="font-display text-base font-bold text-[#0b1528]">
            Environment Readiness
          </h2>
          <p className="text-xs text-slate-500">
            Canonical Origin: <code>{diagnostics.siteUrl}</code>
          </p>
          <ul className="space-y-3">
            {envItems.map((item) => (
              <li
                key={item.label}
                className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-[#f7f9fc] p-3"
              >
                {item.ok ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                ) : (
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                )}
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#0b1528]">{item.label}</p>
                  <p className="mt-0.5 text-[11px] text-slate-600">{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
