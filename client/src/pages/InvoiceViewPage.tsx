import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Copy, Download, FileImage, Pencil, Printer, Trash2 } from 'lucide-react';
import { invoiceApi, ApiRequestError } from '../lib/api';
import { useToast } from '../context/ToastContext';
import type { Invoice, InvoiceStatus } from '../lib/types';
import { formatMoney } from '../lib/format';
import { ALL_STATUSES, ConfirmDialog, PageLoader, STATUS_LABELS, Spinner } from '../components/ui';
import { InvoiceDocument } from '../components/InvoiceDocument';

export function InvoiceViewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const [params, setParams] = useSearchParams();

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);
  const autoPrinted = useRef(false);

  const load = useCallback(async () => {
    if (!id) return;
    try {
      setInvoice(await invoiceApi.get(id));
    } catch (err) {
      toast.error(err instanceof ApiRequestError ? err.message : 'Could not load invoice');
      navigate('/invoices');
    } finally {
      setLoading(false);
    }
  }, [id, navigate, toast]);

  useEffect(() => {
    void load();
  }, [load]);

  const print = useCallback(() => {
    // Print CSS hides everything except .wm-print-root, so the output is the
    // invoice alone - no navigation, buttons or dashboard chrome.
    window.print();
  }, []);

  // Support deep-linking straight into the print dialog (?print=1).
  useEffect(() => {
    if (!invoice || autoPrinted.current || params.get('print') !== '1') return;
    autoPrinted.current = true;
    const next = new URLSearchParams(params);
    next.delete('print');
    setParams(next, { replace: true });
    setTimeout(print, 450);
  }, [invoice, params, setParams, print]);

  const download = async (kind: 'pdf' | 'png' | 'jpg') => {
    if (!invoice) return;
    setBusy(kind);
    try {
      toast.info(`Generating ${kind.toUpperCase()}…`);
      await invoiceApi.download(invoice._id, kind, `${invoice.invoiceNumber}.${kind}`);
      toast.success(`${kind.toUpperCase()} downloaded`);
    } catch (err) {
      toast.error(err instanceof ApiRequestError ? err.message : `Could not generate ${kind}`);
    } finally {
      setBusy(null);
    }
  };

  const changeStatus = async (status: InvoiceStatus) => {
    if (!invoice) return;
    setBusy('status');
    try {
      setInvoice(await invoiceApi.setStatus(invoice._id, status));
      toast.success(`Status changed to ${STATUS_LABELS[status]}`);
    } catch (err) {
      toast.error(err instanceof ApiRequestError ? err.message : 'Could not update status');
    } finally {
      setBusy(null);
    }
  };

  const duplicate = async () => {
    if (!invoice) return;
    setBusy('duplicate');
    try {
      const copy = await invoiceApi.duplicate(invoice._id);
      toast.success(`Duplicated as ${copy.invoiceNumber}`);
      navigate(`/invoices/${copy._id}/edit`);
    } catch (err) {
      toast.error(err instanceof ApiRequestError ? err.message : 'Could not duplicate');
    } finally {
      setBusy(null);
    }
  };

  const remove = async () => {
    if (!invoice) return;
    setBusy('delete');
    try {
      await invoiceApi.remove(invoice._id);
      toast.success(`Invoice ${invoice.invoiceNumber} deleted`);
      navigate('/invoices');
    } catch (err) {
      toast.error(err instanceof ApiRequestError ? err.message : 'Could not delete invoice');
      setBusy(null);
    }
  };

  if (loading) return <PageLoader label="Loading invoice…" />;
  if (!invoice) return null;

  return (
    <div className="space-y-5">
      <div className="wm-no-print flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link to="/invoices" className="wm-btn-ghost wm-btn-sm" aria-label="Back to invoices">
            <ArrowLeft size={15} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-ink">{invoice.invoiceNumber}</h1>
            <p className="mt-0.5 text-sm text-ink-muted">
              {invoice.customer?.name} · {formatMoney(invoice.total, invoice.currency)}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            className="wm-input w-auto py-1.5 text-xs font-semibold"
            value={invoice.status}
            disabled={busy === 'status'}
            onChange={(e) => changeStatus(e.target.value as InvoiceStatus)}
            aria-label="Invoice status"
          >
            {ALL_STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>

          <Link to={`/invoices/${invoice._id}/edit`} className="wm-btn-ghost wm-btn-sm">
            <Pencil size={14} />
            Edit
          </Link>
          <button type="button" className="wm-btn-ghost wm-btn-sm" onClick={duplicate} disabled={!!busy}>
            {busy === 'duplicate' ? <Spinner size={14} /> : <Copy size={14} />}
            Duplicate
          </button>
          <button type="button" className="wm-btn-ghost wm-btn-sm" onClick={print}>
            <Printer size={14} />
            Print
          </button>
          <button
            type="button"
            className="wm-btn-ghost wm-btn-sm"
            onClick={() => download('png')}
            disabled={!!busy}
          >
            {busy === 'png' ? <Spinner size={14} /> : <FileImage size={14} />}
            PNG
          </button>
          <button
            type="button"
            className="wm-btn-ghost wm-btn-sm"
            onClick={() => download('jpg')}
            disabled={!!busy}
          >
            {busy === 'jpg' ? <Spinner size={14} /> : <FileImage size={14} />}
            JPG
          </button>
          <button
            type="button"
            className="wm-btn-primary wm-btn-sm"
            onClick={() => download('pdf')}
            disabled={!!busy}
          >
            {busy === 'pdf' ? <Spinner size={14} /> : <Download size={14} />}
            Download PDF
          </button>
          <button
            type="button"
            className="wm-btn-sm wm-btn border border-red-200 bg-white text-red-600 hover:bg-red-50"
            onClick={() => setConfirming(true)}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* The only element that survives the print stylesheet. */}
      <div className="wm-print-root wm-card overflow-hidden p-3 sm:p-5">
        <InvoiceDocument invoice={invoice} />
      </div>

      <ConfirmDialog
        open={confirming}
        title="Delete invoice"
        busy={busy === 'delete'}
        message={
          <>
            Delete invoice <strong className="text-ink">{invoice.invoiceNumber}</strong>? This cannot
            be undone.
          </>
        }
        onConfirm={remove}
        onCancel={() => setConfirming(false)}
      />
    </div>
  );
}
