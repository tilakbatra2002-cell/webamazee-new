"use client";

import { useState, type FormEvent } from "react";
import { Edit3, Loader2, Plus, Trash2 } from "lucide-react";
import type { SerializedAdmin, SerializedCategory } from "@/lib/cms/types";
import { can } from "@/lib/cms/rbac";

interface CategoriesClientProps {
  admin: SerializedAdmin;
  initialCategories: SerializedCategory[];
}

export function CategoriesClient({
  admin,
  initialCategories,
}: CategoriesClientProps) {
  const canManage = can(admin, "categories:manage");
  const [categories, setCategories] = useState(initialCategories);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function reload() {
    const res = await fetch("/api/admin/categories");
    const json = await res.json();
    if (res.ok) setCategories(json.items ?? []);
  }

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    if (!canManage || !name.trim()) return;
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), description: description.trim() }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Unable to create category.");
        return;
      }
      setName("");
      setDescription("");
      setNotice(`Category "${json.category.name}" created.`);
      await reload();
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveEdit(id: string) {
    if (!canManage || !editName.trim()) return;
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editName.trim(),
          description: editDesc.trim(),
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Unable to update category.");
        return;
      }
      setEditingId(null);
      setNotice(`Updated category "${json.category.name}".`);
      await reload();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(cat: SerializedCategory) {
    if (!canManage) return;
    if (!window.confirm(`Delete category "${cat.name}"?`)) return;
    setError("");
    setNotice("");
    const res = await fetch(`/api/admin/categories/${cat.id}`, { method: "DELETE" });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error || "Unable to delete category.");
      return;
    }
    setNotice(`Deleted category "${cat.name}".`);
    await reload();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-[#0b1528]">Categories</h1>
        <p className="mt-1 text-sm text-slate-600">
          Organize blog posts by topic. Renaming a category updates all matching articles automatically.
        </p>
      </div>

      {canManage && (
        <form
          onSubmit={handleCreate}
          className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4"
        >
          <h2 className="font-display text-base font-bold text-[#0b1528]">
            Create Category
          </h2>
          <div className="grid gap-3 md:grid-cols-[240px_minmax(0,1fr)_auto]">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category name (e.g., AI SEO)"
              required
              className="rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#0f6dff]"
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description (optional)"
              className="rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#0f6dff]"
            />
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0f6dff] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#0b57d0] disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Add Category
            </button>
          </div>
        </form>
      )}

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

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-[#f7f9fc] text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3.5">Name &amp; Description</th>
                <th className="px-4 py-3.5">Slug</th>
                <th className="px-4 py-3.5">Posts</th>
                {canManage && <th className="px-4 py-3.5 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td className="px-5 py-4">
                    {editingId === cat.id ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm"
                        />
                        <input
                          type="text"
                          value={editDesc}
                          onChange={(e) => setEditDesc(e.target.value)}
                          placeholder="Description"
                          className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs"
                        />
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => void handleSaveEdit(cat.id)}
                            className="rounded-lg bg-[#0f6dff] px-3 py-1 text-xs font-semibold text-white"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingId(null)}
                            className="rounded-lg border border-slate-200 px-3 py-1 text-xs text-slate-600"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="font-display font-bold text-[#0b1528]">
                          {cat.name}
                        </p>
                        {cat.description && (
                          <p className="mt-0.5 text-xs text-slate-500">
                            {cat.description}
                          </p>
                        )}
                      </>
                    )}
                  </td>
                  <td className="px-4 py-4 font-mono text-xs text-slate-500">
                    {cat.slug}
                  </td>
                  <td className="px-4 py-4 font-semibold text-[#0b1528]">
                    {cat.postCount}
                  </td>
                  {canManage && (
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(cat.id);
                            setEditName(cat.name);
                            setEditDesc(cat.description);
                          }}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-[#0b1528] hover:border-[#0f6dff]"
                        >
                          <Edit3 className="h-3.5 w-3.5" /> Rename
                        </button>
                        <button
                          type="button"
                          disabled={cat.postCount > 0}
                          title={
                            cat.postCount > 0
                              ? "Cannot delete a category with assigned posts"
                              : "Delete category"
                          }
                          onClick={() => void handleDelete(cat)}
                          className="rounded-lg border border-rose-200 p-2 text-rose-600 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
