import { useEffect, type ReactNode } from 'react';
import { AlertTriangle, Loader2, X } from 'lucide-react';
import type { InvoiceStatus } from '../lib/types';

/* ------------------------------------------------------------------ spinner */

export function Spinner({ size = 18, className = '' }: { size?: number; className?: string }) {
  return <Loader2 size={size} className={`animate-spin ${className}`} aria-hidden />;
}

export function PageLoader({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center gap-3 text-ink-muted">
      <Spinner size={26} className="text-brand" />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}

/* -------------------------------------------------------------- empty state */

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      {icon ? (
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand">
          {icon}
        </div>
      ) : null}
      <h3 className="text-lg font-bold text-ink">{title}</h3>
      {description ? (
        <p className="mt-1.5 max-w-sm text-sm text-ink-muted">{description}</p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

/* --------------------------------------------------------------- status pill */

const STATUS_STYLES: Record<InvoiceStatus, string> = {
  draft: 'bg-slate-100 text-slate-700 border-slate-200',
  sent: 'bg-amber-50 text-amber-800 border-amber-200',
  pending: 'bg-amber-50 text-amber-800 border-amber-200',
  paid: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  'partially-paid': 'bg-brand-50 text-brand-700 border-brand-200',
  overdue: 'bg-red-50 text-red-800 border-red-200',
  cancelled: 'bg-slate-100 text-slate-500 border-slate-200',
};

export const STATUS_LABELS: Record<InvoiceStatus, string> = {
  draft: 'Draft',
  sent: 'Sent',
  paid: 'Paid',
  'partially-paid': 'Partially Paid',
  pending: 'Pending',
  overdue: 'Overdue',
  cancelled: 'Cancelled',
};

export const ALL_STATUSES = Object.keys(STATUS_LABELS) as InvoiceStatus[];

export function StatusPill({ status }: { status: InvoiceStatus }) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-bold ${
        STATUS_STYLES[status] ?? STATUS_STYLES.draft
      }`}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}

/* --------------------------------------------------------------------- modal */

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  width = 'max-w-lg',
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  width?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="wm-no-print fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`relative z-10 w-full ${width} max-h-[90vh] overflow-auto rounded-2xl bg-white shadow-pop`}
      >
        <header className="sticky top-0 flex items-center justify-between gap-4 border-b border-line bg-white px-5 py-4">
          <h2 className="text-base font-bold text-ink">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-ink-muted transition-colors hover:bg-surface hover:text-ink"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </header>
        <div className="px-5 py-4">{children}</div>
        {footer ? (
          <footer className="sticky bottom-0 flex justify-end gap-2 border-t border-line bg-white px-5 py-4">
            {footer}
          </footer>
        ) : null}
      </div>
    </div>
  );
}

/* -------------------------------------------------------- confirm delete */

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Delete',
  busy = false,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message: ReactNode;
  confirmLabel?: string;
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Modal
      open={open}
      onClose={busy ? () => {} : onCancel}
      title={title}
      width="max-w-md"
      footer={
        <>
          <button type="button" className="wm-btn-ghost" onClick={onCancel} disabled={busy}>
            Cancel
          </button>
          <button type="button" className="wm-btn-danger" onClick={onConfirm} disabled={busy}>
            {busy ? <Spinner size={15} /> : null}
            {confirmLabel}
          </button>
        </>
      }
    >
      <div className="flex gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
          <AlertTriangle size={19} />
        </div>
        <div className="text-sm leading-relaxed text-ink-muted">{message}</div>
      </div>
    </Modal>
  );
}

/* --------------------------------------------------------------------- field */

export function Field({
  label,
  error,
  children,
  hint,
  required,
  className = '',
}: {
  label: string;
  error?: string;
  children: ReactNode;
  hint?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="wm-label">
        {label}
        {required ? <span className="ml-0.5 text-red-500">*</span> : null}
      </label>
      {children}
      {error ? <p className="wm-error">{error}</p> : null}
      {!error && hint ? <p className="mt-1 text-xs text-ink-soft">{hint}</p> : null}
    </div>
  );
}
