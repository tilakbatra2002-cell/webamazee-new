import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Copy,
  Download,
  Eye,
  FileImage,
  MoreHorizontal,
  Pencil,
  Printer,
  Trash2,
} from 'lucide-react';
import { invoiceApi, ApiRequestError } from '../lib/api';
import { useToast } from '../context/ToastContext';
import type { Invoice } from '../lib/types';
import { ConfirmDialog, Spinner } from './ui';

interface Props {
  invoice: Invoice;
  onChanged: () => void;
  /** Render as a compact "…" dropdown (used inside dense tables). */
  compact?: boolean;
}

/**
 * The full action set for one invoice: view, edit, duplicate, PDF, image,
 * print and delete. Shared by the dashboard and the invoices table so the
 * behaviour never diverges.
 */
export function InvoiceActions({ invoice, onChanged, compact = true }: Props) {
  const navigate = useNavigate();
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  const run = async (key: string, fn: () => Promise<void>) => {
    setBusy(key);
    try {
      await fn();
    } catch (err) {
      toast.error(err instanceof ApiRequestError ? err.message : 'Action failed');
    } finally {
      setBusy(null);
      setOpen(false);
    }
  };

  const download = (kind: 'pdf' | 'png' | 'jpg') =>
    run(kind, async () => {
      toast.info(`Generating ${kind.toUpperCase()}…`);
      await invoiceApi.download(invoice._id, kind, `${invoice.invoiceNumber}.${kind}`);
      toast.success(`${kind.toUpperCase()} downloaded`);
    });

  const duplicate = () =>
    run('duplicate', async () => {
      const copy = await invoiceApi.duplicate(invoice._id);
      toast.success(`Duplicated as ${copy.invoiceNumber}`);
      onChanged();
      navigate(`/invoices/${copy._id}/edit`);
    });

  const remove = () =>
    run('delete', async () => {
      await invoiceApi.remove(invoice._id);
      toast.success(`Invoice ${invoice.invoiceNumber} deleted`);
      setConfirming(false);
      onChanged();
    });

  const actions = [
    { key: 'view', label: 'View', icon: Eye, onClick: () => navigate(`/invoices/${invoice._id}`) },
    { key: 'edit', label: 'Edit', icon: Pencil, onClick: () => navigate(`/invoices/${invoice._id}/edit`) },
    { key: 'duplicate', label: 'Duplicate', icon: Copy, onClick: duplicate },
    { key: 'pdf', label: 'Download PDF', icon: Download, onClick: () => download('pdf') },
    { key: 'png', label: 'Download PNG', icon: FileImage, onClick: () => download('png') },
    { key: 'jpg', label: 'Download JPG', icon: FileImage, onClick: () => download('jpg') },
    {
      key: 'print',
      label: 'Print',
      icon: Printer,
      onClick: () => navigate(`/invoices/${invoice._id}?print=1`),
    },
  ];

  return (
    <>
      {compact ? (
        <div className="relative flex justify-end">
          <button
            type="button"
            className="wm-btn-ghost wm-btn-sm"
            onClick={() => setOpen((v) => !v)}
            aria-label={`Actions for invoice ${invoice.invoiceNumber}`}
            aria-expanded={open}
          >
            {busy ? <Spinner size={14} /> : <MoreHorizontal size={15} />}
          </button>

          {open ? (
            <>
              <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} aria-hidden />
              <div
                role="menu"
                className="absolute right-0 top-9 z-30 w-52 overflow-hidden rounded-xl border border-line bg-white py-1 shadow-pop"
              >
                {actions.map(({ key, label, icon: Icon, onClick }) => (
                  <button
                    key={key}
                    type="button"
                    role="menuitem"
                    onClick={onClick}
                    disabled={busy !== null}
                    className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-sm font-medium text-ink transition-colors hover:bg-surface disabled:opacity-50"
                  >
                    {busy === key ? <Spinner size={14} /> : <Icon size={15} className="text-ink-muted" />}
                    {label}
                  </button>
                ))}
                <div className="my-1 border-t border-line" />
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setOpen(false);
                    setConfirming(true);
                  }}
                  className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  <Trash2 size={15} />
                  Delete
                </button>
              </div>
            </>
          ) : null}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {actions.map(({ key, label, icon: Icon, onClick }) => (
            <button
              key={key}
              type="button"
              onClick={onClick}
              disabled={busy !== null}
              className="wm-btn-ghost wm-btn-sm"
            >
              {busy === key ? <Spinner size={14} /> : <Icon size={14} />}
              {label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="wm-btn-sm wm-btn border border-red-200 bg-white text-red-600 hover:bg-red-50"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      )}

      <ConfirmDialog
        open={confirming}
        title="Delete invoice"
        busy={busy === 'delete'}
        message={
          <>
            Delete invoice <strong className="text-ink">{invoice.invoiceNumber}</strong> for{' '}
            <strong className="text-ink">{invoice.customer?.name}</strong>? This cannot be undone.
          </>
        }
        onConfirm={remove}
        onCancel={() => setConfirming(false)}
      />
    </>
  );
}
