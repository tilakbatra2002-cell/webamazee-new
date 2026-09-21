import { useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  FilePlus2,
  Users,
  Settings as SettingsIcon,
  ChevronDown,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';

const NAV = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/invoices', label: 'Invoices', icon: FileText, end: false },
  { to: '/invoices/new', label: 'Create Invoice', icon: FilePlus2, end: true },
  { to: '/customers', label: 'Customers', icon: Users, end: false },
  { to: '/settings', label: 'Settings', icon: SettingsIcon, end: false },
];

function BrandMark() {
  const { settings } = useSettings();
  const name = settings?.companyName || 'Webamazee';

  return (
    <div className="flex items-center gap-2.5">
      {settings?.logo ? (
        <img src={settings.logo} alt={`${name} logo`} className="h-8 max-w-[132px] object-contain" />
      ) : (
        <>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand font-display text-base font-bold text-white">
            {name.charAt(0).toUpperCase()}
          </span>
          <span className="font-display text-lg font-bold text-ink">{name}</span>
        </>
      )}
    </div>
  );
}

function ProfileMenu() {
  const { user, logout } = useAuth();
  const { settings } = useSettings();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  const initials = (user?.name || 'A')
    .split(' ')
    .slice(0, 2)
    .map((p) => p.charAt(0).toUpperCase())
    .join('');

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-xl border border-line bg-white px-2 py-1.5 text-sm transition-colors hover:bg-surface"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-xs font-bold text-brand">
          {initials}
        </span>
        <span className="hidden max-w-[128px] truncate font-semibold text-ink sm:inline">
          {settings?.companyName || user?.name}
        </span>
        <ChevronDown size={15} className="text-ink-muted" />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-40 mt-2 w-60 overflow-hidden rounded-xl border border-line bg-white shadow-pop"
        >
          <div className="border-b border-line px-4 py-3">
            <p className="truncate text-sm font-bold text-ink">{user?.name}</p>
            <p className="truncate text-xs text-ink-muted">{user?.email}</p>
          </div>
          <button
            type="button"
            role="menuitem"
            onClick={logout}
            className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-semibold text-ink transition-colors hover:bg-surface"
          >
            <LogOut size={15} className="text-ink-muted" />
            Sign out
          </button>
        </div>
      ) : null}
    </div>
  );
}

export function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setMobileOpen(false), [location.pathname]);

  return (
    <div className="min-h-screen bg-surface">
      <header className="wm-no-print sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 lg:px-8">
          <div className="flex items-center gap-8">
            <BrandMark />
            <nav className="hidden items-center gap-1 lg:flex">
              {NAV.map(({ to, label, icon: Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                      isActive ? 'bg-brand-50 text-brand' : 'text-ink-muted hover:bg-surface hover:text-ink'
                    }`
                  }
                >
                  <Icon size={16} />
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <ProfileMenu />
            <button
              type="button"
              className="rounded-xl border border-line p-2 text-ink lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <nav className="border-t border-line bg-white px-4 py-2 lg:hidden">
            {NAV.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${
                    isActive ? 'bg-brand-50 text-brand' : 'text-ink-muted'
                  }`
                }
              >
                <Icon size={17} />
                {label}
              </NavLink>
            ))}
          </nav>
        ) : null}
      </header>

      <main className="mx-auto max-w-[1400px] px-4 py-6 lg:px-8 lg:py-8">
        <Outlet />
      </main>
    </div>
  );
}
