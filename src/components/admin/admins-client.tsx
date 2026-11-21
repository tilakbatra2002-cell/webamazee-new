"use client";

import { useState, type FormEvent } from "react";
import {
  Check,
  Copy,
  KeyRound,
  Loader2,
  Search,
  ShieldAlert,
  UserPlus,
} from "lucide-react";
import type { AdminRole, SerializedAdmin } from "@/lib/cms/types";
import { ROLE_LABELS } from "@/lib/cms/rbac";

interface AdminsClientProps {
  currentAdminId: string;
  initialAdmins: SerializedAdmin[];
  emailConfigured: boolean;
}

export function AdminsClient({
  currentAdminId,
  initialAdmins,
  emailConfigured,
}: AdminsClientProps) {
  const [admins, setAdmins] = useState<SerializedAdmin[]>(initialAdmins);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<AdminRole>("editor");
  const [canPublish, setCanPublish] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [oneTimeLink, setOneTimeLink] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  async function reload(q = search) {
    const res = await fetch(
      `/api/admin/admins${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ""}`
    );
    const json = await res.json();
    if (res.ok) setAdmins(json.items ?? []);
  }

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setNotice("");
    setOneTimeLink("");
    try {
      const res = await fetch("/api/admin/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          role,
          canPublish: role === "editor" ? canPublish : true,
          isActive: true,
          sendInviteEmail: true,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Unable to create admin.");
        return;
      }

      const fullLink =
        json.setupPath && typeof window !== "undefined"
          ? `${window.location.origin}${json.setupPath}`
          : json.setupPath || "";

      setName("");
      setEmail("");
      setCanPublish(false);
      setOneTimeLink(fullLink);
      setNotice(
        json.emailSent
          ? `Created ${json.admin.email} and emailed their password setup link.`
          : `Created ${json.admin.email}. Email delivery is unavailable (${json.emailNote || "not configured"}) — share the single-use setup link below securely.`
      );
      await reload();
    } finally {
      setSubmitting(false);
    }
  }

  async function updateAdmin(
    targetId: string,
    patch: {
      role?: AdminRole;
      canPublish?: boolean;
      isActive?: boolean;
      action?: "revoke_sessions" | "create_reset_link";
    }
  ) {
    setError("");
    setNotice("");
    setOneTimeLink("");
    const res = await fetch(`/api/admin/admins/${targetId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error || "Unable to update admin account.");
      return;
    }

    if (json.resetPath) {
      const fullLink =
        typeof window !== "undefined"
          ? `${window.location.origin}${json.resetPath}`
          : json.resetPath;
      setOneTimeLink(fullLink);
      setNotice(
        json.emailSent
          ? `Sent password reset link to ${json.admin.email}.`
          : `Generated single-use reset link for ${json.admin.email} (valid 1 hour).`
      );
    } else if (patch.action === "create_reset_link") {
      setNotice(
        json.emailSent
          ? `Sent password reset link to ${json.admin.email}.`
          : `Password reset initiated for ${json.admin.email}.`
      );
    } else if (patch.action === "revoke_sessions") {
      setNotice(`Revoked all active sessions for ${json.admin.email}.`);
    } else {
      setNotice(`Updated permissions for ${json.admin.email}.`);
    }

    await reload();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-[#0b1528]">
          Admins &amp; Roles
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Super Admin management for dashboard team accounts, roles, publishing permissions, and session revocation.
        </p>
      </div>

      {!emailConfigured && (
        <div className="flex items-start gap-2.5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            <code>RESEND_API_KEY</code> / <code>EMAIL_FROM</code> is not configured. New admin invites and password resets will generate a single-use link directly below for you to share securely.
          </span>
        </div>
      )}

      {/* Create Admin Form */}
      <form
        onSubmit={handleCreate}
        className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4"
      >
        <h2 className="font-display text-base font-bold text-[#0b1528]">
          Add Team Administrator
        </h2>

        <div className="grid gap-3 md:grid-cols-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            required
            className="rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#0f6dff]"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@webamazee.com"
            required
            className="rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#0f6dff]"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as AdminRole)}
            className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#0b1528] outline-none focus:border-[#0f6dff]"
          >
            <option value="editor">Editor (Drafts &amp; Optional Publish)</option>
            <option value="admin">Admin (Full Blog, Media, Categories)</option>
            <option value="super_admin">Super Admin (Full System + Team)</option>
          </select>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          {role === "editor" ? (
            <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={canPublish}
                onChange={(e) => setCanPublish(e.target.checked)}
              />
              Allow this Editor to publish &amp; schedule articles directly
            </label>
          ) : (
            <span className="text-xs text-slate-500">
              {ROLE_LABELS[role]} accounts have full publishing permissions by default.
            </span>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0f6dff] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#0b57d0] disabled:opacity-60"
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <UserPlus className="h-4 w-4" />
            )}
            Create Admin &amp; Generate Setup Link
          </button>
        </div>
      </form>

      {error && (
        <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </p>
      )}
      {notice && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900 space-y-2.5">
          <p className="font-medium">{notice}</p>
          {oneTimeLink && (
            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-emerald-300 bg-white p-2.5">
              <code className="min-w-0 flex-1 break-all text-xs text-[#0b1528]">
                {oneTimeLink}
              </code>
              <button
                type="button"
                onClick={() => {
                  void navigator.clipboard.writeText(oneTimeLink);
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 1500);
                }}
                className="inline-flex items-center gap-1 rounded-lg bg-[#0f6dff] px-3 py-1.5 text-xs font-semibold text-white"
              >
                {copiedLink ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copiedLink ? "Copied" : "Copy Once"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Search */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search admins by name or email..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#0f6dff]"
          />
        </div>
        <button
          type="button"
          onClick={() => void reload()}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-[#0b1528] hover:border-[#0f6dff]"
        >
          Search
        </button>
      </div>

      {/* Admins Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-[#f7f9fc] text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3.5">Administrator</th>
                <th className="px-4 py-3.5">Role</th>
                <th className="px-4 py-3.5">Publish Access</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Last Login</th>
                <th className="px-4 py-3.5 text-right">Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {admins.map((item) => {
                const isSelf = item.id === currentAdminId;
                return (
                  <tr key={item.id}>
                    <td className="px-5 py-4">
                      <p className="font-display font-bold text-[#0b1528]">
                        {item.name} {isSelf && <span className="text-xs text-[#0f6dff]">(You)</span>}
                      </p>
                      <p className="text-xs text-slate-500">{item.email}</p>
                    </td>
                    <td className="px-4 py-4">
                      <select
                        disabled={isSelf}
                        value={item.role}
                        onChange={(e) =>
                          void updateAdmin(item.id, { role: e.target.value as AdminRole })
                        }
                        className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-[#0b1528] disabled:opacity-60"
                      >
                        <option value="super_admin">Super Admin</option>
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                      </select>
                    </td>
                    <td className="px-4 py-4">
                      {item.role === "editor" ? (
                        <button
                          type="button"
                          onClick={() =>
                            void updateAdmin(item.id, { canPublish: !item.canPublish })
                          }
                          className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                            item.canPublish
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {item.canPublish ? "Can Publish" : "Drafts Only"}
                        </button>
                      ) : (
                        <span className="text-xs font-semibold text-emerald-700">
                          Full Publish
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                          item.isActive
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-rose-50 text-rose-700"
                        }`}
                      >
                        {item.isActive ? "Active" : "Deactivated"}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-500">
                      {item.lastLoginAt
                        ? new Date(item.lastLoginAt).toLocaleString()
                        : "Never"}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() =>
                            void updateAdmin(item.id, { action: "create_reset_link" })
                          }
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-[#0b1528] hover:border-[#0f6dff]"
                        >
                          <KeyRound className="h-3 w-3" /> Reset Link
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            void updateAdmin(item.id, { action: "revoke_sessions" })
                          }
                          className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:border-[#0f6dff]"
                        >
                          Revoke Sessions
                        </button>
                        {!isSelf && (
                          <button
                            type="button"
                            onClick={() =>
                              void updateAdmin(item.id, { isActive: !item.isActive })
                            }
                            className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold ${
                              item.isActive
                                ? "border-rose-200 text-rose-600 hover:bg-rose-50"
                                : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                            }`}
                          >
                            {item.isActive ? "Deactivate" : "Reactivate"}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
