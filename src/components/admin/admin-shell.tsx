"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  FolderTree,
  Users,
  Settings,
  LogOut,
  Plus,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";
import type { SerializedAdmin } from "@/lib/cms/types";
import { ROLE_LABELS, can } from "@/lib/cms/rbac";
import { cn } from "@/lib/utils";

interface AdminShellProps {
  admin: SerializedAdmin;
  children: React.ReactNode;
}

export function AdminShell({ admin, children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      visible: true,
      exact: true,
    },
    {
      label: "Blog Posts",
      href: "/admin/blogs",
      icon: FileText,
      visible: can(admin, "blogs:read"),
    },
    {
      label: "Media Library",
      href: "/admin/media",
      icon: ImageIcon,
      visible: can(admin, "media:read"),
    },
    {
      label: "Categories",
      href: "/admin/categories",
      icon: FolderTree,
      visible: can(admin, "categories:read"),
    },
    {
      label: "Admins & Roles",
      href: "/admin/admins",
      icon: Users,
      visible: can(admin, "admins:manage"),
    },
    {
      label: "Settings",
      href: "/admin/settings",
      icon: Settings,
      visible: can(admin, "settings:read"),
    },
  ].filter((item) => item.visible);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
    } finally {
      router.push("/admin/login");
      router.refresh();
    }
  }

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname === href || pathname?.startsWith(`${href}/`);
  }

  const sidebarBody = (
    <div className="flex h-full flex-col bg-[#0b1528] text-white">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
        <Link
          href="/admin"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2.5"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#0f6dff] font-display text-sm font-bold text-white shadow-[0_8px_20px_-6px_rgba(15,109,255,0.65)]">
            W
          </span>
          <div>
            <p className="font-display text-[15px] font-bold leading-tight text-white">
              Webamazee
            </p>
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#8ec5ff]">
              Blog CMS
            </p>
          </div>
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation menu"
          className="rounded-lg p-1.5 text-slate-300 hover:bg-white/10 lg:hidden"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="px-4 pt-5 pb-3">
        <Link
          href="/admin/blogs/new"
          onClick={() => setMobileOpen(false)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0f6dff] px-4 py-2.5 text-[13.5px] font-semibold text-white shadow-[0_10px_24px_-8px_rgba(15,109,255,0.65)] transition-colors hover:bg-[#247bff]"
        >
          <Plus className="h-4 w-4" /> New Blog Post
        </Link>
      </div>

      <nav aria-label="Admin sidebar navigation" className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13.5px] font-medium transition-colors",
                active
                  ? "bg-white/12 text-white shadow-sm"
                  : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0",
                  active ? "text-[#8ec5ff]" : "text-slate-400"
                )}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4 space-y-3">
        <Link
          href="/blog"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[12.5px] font-medium text-slate-200 transition-colors hover:bg-white/10"
        >
          <span>View Live Blog</span>
          <ExternalLink className="h-3.5 w-3.5 text-[#8ec5ff]" />
        </Link>

        <div className="rounded-xl border border-white/10 bg-white/[0.05] p-3">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#0f6dff]/25 text-[#8ec5ff]">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-white">
                {admin.name}
              </p>
              <p className="truncate text-[11px] text-slate-400">{admin.email}</p>
            </div>
          </div>
          <div className="mt-2.5 flex items-center justify-between gap-2">
            <span className="inline-flex items-center rounded-full bg-[#0f6dff]/20 px-2.5 py-0.5 text-[11px] font-semibold text-[#8ec5ff]">
              {ROLE_LABELS[admin.role]}
            </span>
            <button
              type="button"
              disabled={loggingOut}
              onClick={handleLogout}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[12px] font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-60"
            >
              <LogOut className="h-3.5 w-3.5" />
              {loggingOut ? "Signing out..." : "Sign out"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f4f8ff] text-[#0b1528] lg:flex">
      {/* Desktop persistent sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:block lg:w-64">
        {sidebarBody}
      </aside>

      {/* Mobile header */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
        <Link href="/admin" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#0f6dff] font-display text-xs font-bold text-white">
            W
          </span>
          <span className="font-display text-[15px] font-bold text-[#0b1528]">
            Webamazee CMS
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/blogs/new"
            className="inline-flex items-center gap-1 rounded-lg bg-[#0f6dff] px-3 py-1.5 text-[12.5px] font-semibold text-white"
          >
            <Plus className="h-3.5 w-3.5" /> New
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            className="rounded-lg border border-slate-200 p-2 text-[#0b1528]"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-[#0b1528]/60 backdrop-blur-xs"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-10 w-72 max-w-[85vw]">{sidebarBody}</div>
        </div>
      )}

      {/* Main content area */}
      <main className="min-w-0 flex-1 lg:pl-64">
        <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
