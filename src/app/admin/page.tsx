import Link from "next/link";
import {
  AlertTriangle,
  Archive,
  CalendarClock,
  CheckCircle2,
  FileEdit,
  FileText,
  FolderTree,
  Image as ImageIcon,
  Plus,
  Users,
} from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { requirePageAdmin } from "@/lib/cms/auth";
import { getDashboardOverview } from "@/lib/cms/blogs-repo";
import { ROLE_LABELS, can } from "@/lib/cms/rbac";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const sp = await searchParams;
  const { admin } = await requirePageAdmin();
  const overview = await getDashboardOverview();

  const stats = [
    {
      label: "Published Posts",
      value: overview.counts.published,
      icon: CheckCircle2,
      href: "/admin/blogs",
      accent: "text-emerald-600 bg-emerald-50",
    },
    {
      label: "Drafts",
      value: overview.counts.draft,
      icon: FileEdit,
      href: "/admin/blogs",
      accent: "text-[#0f6dff] bg-[#f4f8ff]",
    },
    {
      label: "Scheduled",
      value: overview.counts.scheduled,
      icon: CalendarClock,
      href: "/admin/blogs",
      accent: "text-amber-700 bg-amber-50",
    },
    {
      label: "Archived",
      value: overview.counts.archived,
      icon: Archive,
      href: "/admin/blogs",
      accent: "text-rose-600 bg-rose-50",
    },
    {
      label: "Media Assets",
      value: overview.mediaCount,
      icon: ImageIcon,
      href: "/admin/media",
      accent: "text-[#0f6dff] bg-[#f4f8ff]",
    },
    {
      label: "Categories",
      value: overview.categoryCount,
      icon: FolderTree,
      href: "/admin/categories",
      accent: "text-[#0f6dff] bg-[#f4f8ff]",
    },
  ];

  return (
    <AdminShell admin={admin}>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0f6dff]">
              {ROLE_LABELS[admin.role]} Workspace
            </p>
            <h1 className="mt-1 font-display text-2xl font-bold text-[#0b1528] sm:text-3xl">
              Welcome back, {admin.name}
            </h1>
          </div>
          <Link
            href="/admin/blogs/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0f6dff] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0b57d0]"
          >
            <Plus className="h-4 w-4" /> Write New Article
          </Link>
        </div>

        {sp.error === "forbidden" && (
          <div className="flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>Your account role does not have access to that section.</span>
          </div>
        )}

        {overview.counts.total === 0 && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
            <p className="font-display font-bold">
              No articles in MongoDB yet
            </p>
            <p className="mt-1 leading-relaxed">
              Run <code>npm run cms:migrate -- --dry-run</code> followed by{" "}
              <code>npm run cms:migrate</code> to import all 13 existing posts from{" "}
              <code>src/lib/blogs.ts</code> into MongoDB cleanly without altering any slug or SEO field.
            </p>
          </div>
        )}

        {/* Live Metric Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.label}
                href={stat.href}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-[#0f6dff]"
              >
                <div>
                  <p className="text-xs font-semibold text-slate-500">{stat.label}</p>
                  <p className="mt-1 font-display text-3xl font-bold text-[#0b1528]">
                    {stat.value}
                  </p>
                </div>
                <span className={`grid h-11 w-11 place-items-center rounded-xl ${stat.accent}`}>
                  <Icon className="h-5 w-5" />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recently Edited */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-display text-base font-bold text-[#0b1528]">
                <FileText className="h-4 w-4 text-[#0f6dff]" /> Recently Updated Articles
              </h2>
              <Link href="/admin/blogs" className="text-xs font-semibold text-[#0f6dff] hover:underline">
                View all ({overview.counts.total})
              </Link>
            </div>
            {overview.recentPosts.length === 0 ? (
              <p className="text-sm text-slate-500">No articles created yet.</p>
            ) : (
              <ul className="divide-y divide-slate-100">
                {overview.recentPosts.map((post) => (
                  <li key={post.id} className="py-3 first:pt-0 last:pb-0">
                    <Link
                      href={`/admin/blogs/${post.id}/edit`}
                      className="flex items-center justify-between gap-3 group"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#0b1528] group-hover:text-[#0f6dff]">
                          {post.title}
                        </p>
                        <p className="text-xs text-slate-500">
                          {post.category} · {post.date}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full border border-slate-200 bg-[#f7f9fc] px-2.5 py-0.5 text-[10px] font-bold uppercase text-slate-700">
                        {post.status}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Upcoming Scheduled Queue + Quick Links */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
              <h2 className="flex items-center gap-2 font-display text-base font-bold text-[#0b1528]">
                <CalendarClock className="h-4 w-4 text-[#0f6dff]" /> Scheduled Queue
              </h2>
              {overview.upcomingScheduled.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No posts currently scheduled for future publication.
                </p>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {overview.upcomingScheduled.map((post) => (
                    <li key={post.id} className="py-2.5 first:pt-0 last:pb-0">
                      <Link
                        href={`/admin/blogs/${post.id}/edit`}
                        className="flex items-center justify-between gap-3 hover:text-[#0f6dff]"
                      >
                        <span className="truncate text-sm font-semibold">{post.title}</span>
                        <span className="shrink-0 text-xs font-medium text-amber-700">
                          {post.scheduledFor
                            ? new Date(post.scheduledFor).toLocaleString()
                            : post.date}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {can(admin, "admins:manage") && (
              <div className="rounded-2xl border border-slate-200 bg-[#0b1528] p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8ec5ff]">
                      Team Access
                    </p>
                    <p className="mt-1 font-display text-lg font-bold">
                      {overview.adminCount} Active Administrator{overview.adminCount === 1 ? "" : "s"}
                    </p>
                  </div>
                  <Link
                    href="/admin/admins"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#0f6dff] px-4 py-2 text-xs font-semibold text-white"
                  >
                    <Users className="h-3.5 w-3.5" /> Manage Team
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
