/**
 * THE canonical Webamazee invoice template.
 *
 * This single module produces the markup + styles used by all four outputs:
 *   1. Browser preview  (React injects `invoiceBodyHtml` + `invoiceStyles`)
 *   2. PDF              (Puppeteer renders `invoiceDocumentHtml`)
 *   3. PNG / JPG        (Puppeteer screenshots `invoiceDocumentHtml`)
 *   4. Print            (the preview page's print stylesheet isolates `.wm-invoice`)
 *
 * There is intentionally no second design anywhere in the codebase.
 */
import { formatMoney, CURRENCIES } from './money.js';

const A4 = { width: 794, height: 1123 }; // px @96dpi

export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Escapes text but keeps author-entered line breaks. */
function escapeMultiline(value) {
  return escapeHtml(value).replace(/\r?\n/g, '<br/>');
}

export function formatDate(value) {
  if (!value) return '—';
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return '—';
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(d);
}

export const STATUS_LABELS = {
  draft: 'Draft',
  sent: 'Sent',
  paid: 'Paid',
  'partially-paid': 'Partially Paid',
  pending: 'Pending',
  overdue: 'Overdue',
  cancelled: 'Cancelled',
};

function safeColor(value, fallback = '#0F6DFF') {
  return /^#[0-9a-fA-F]{3,8}$/.test(String(value || '')) ? value : fallback;
}

/** Only allow image sources we generate ourselves (data URI) or plain https. */
function safeImageSrc(value) {
  const v = String(value || '').trim();
  if (/^data:image\/(png|jpeg|jpg|webp|gif|svg\+xml);base64,[A-Za-z0-9+/=\s]+$/i.test(v)) return v;
  if (/^https:\/\/[^\s"'<>]+$/i.test(v)) return v;
  return '';
}

function joinParts(parts, separator = ', ') {
  return parts.filter((p) => String(p || '').trim()).join(separator);
}

/* ------------------------------------------------------------------ styles */

export function invoiceStyles(primaryColor = '#0F6DFF') {
  const accent = safeColor(primaryColor);
  return `
.wm-invoice{
  --wm-accent:${accent};
  --wm-ink:#0B0D12;
  --wm-muted:#5A6373;
  --wm-line:#E4E8EF;
  --wm-soft:#F6F8FB;
  width:${A4.width}px;
  min-height:${A4.height}px;
  margin:0 auto;
  background:#FFFFFF;
  color:var(--wm-ink);
  font-family:'Manrope',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
  font-size:12px;
  line-height:1.55;
  box-sizing:border-box;
  display:flex;
  flex-direction:column;
  -webkit-font-smoothing:antialiased;
}
.wm-invoice *{box-sizing:border-box;}
.wm-invoice h1,.wm-invoice h2,.wm-invoice h3,.wm-invoice .wm-display{
  font-family:'Bricolage Grotesque','Manrope',sans-serif;
  font-weight:700;
  letter-spacing:-0.02em;
  margin:0;
}
.wm-pad{padding:52px 56px;}
.wm-grow{flex:1 1 auto;}

/* header */
.wm-head{display:flex;justify-content:space-between;align-items:flex-start;gap:32px;}
.wm-brand{max-width:340px;}
.wm-logo{max-height:52px;max-width:220px;object-fit:contain;display:block;margin-bottom:14px;}
.wm-brand-name{font-size:24px;line-height:1.15;}
.wm-brand-mark{
  display:inline-flex;align-items:center;gap:9px;margin-bottom:14px;
}
.wm-brand-badge{
  width:34px;height:34px;border-radius:9px;background:var(--wm-accent);
  color:#fff;display:flex;align-items:center;justify-content:center;
  font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:17px;line-height:1;
}
.wm-company-meta{color:var(--wm-muted);font-size:11.5px;margin-top:8px;}
.wm-company-meta div{margin-top:2px;}
.wm-doc{text-align:right;min-width:240px;}
.wm-doc-title{font-size:34px;line-height:1;color:var(--wm-ink);}
.wm-doc-accent{height:3px;width:56px;background:var(--wm-accent);margin:12px 0 12px auto;border-radius:2px;}
.wm-doc-rows{font-size:11.5px;}
.wm-doc-row{display:flex;justify-content:flex-end;gap:14px;margin-top:4px;}
.wm-doc-row span:first-child{color:var(--wm-muted);}
.wm-doc-row span:last-child{font-weight:600;min-width:104px;text-align:right;}
.wm-status{
  display:inline-block;margin-top:12px;padding:5px 12px;border-radius:999px;
  font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;
  border:1px solid var(--wm-line);background:var(--wm-soft);color:var(--wm-muted);
}
.wm-status[data-status="paid"]{background:#E9F8EF;border-color:#BFE8CE;color:#116B36;}
.wm-status[data-status="partially-paid"]{background:#EAF2FF;border-color:#C3D9FF;color:#0B4FBF;}
.wm-status[data-status="overdue"]{background:#FDECEC;border-color:#F6C9C9;color:#A51B1B;}
.wm-status[data-status="pending"],.wm-status[data-status="sent"]{background:#FFF6E6;border-color:#FAE0B0;color:#8A5A06;}
.wm-status[data-status="cancelled"]{background:#F3F4F6;border-color:#E0E3E9;color:#4B5563;}

/* parties */
.wm-parties{display:flex;gap:28px;margin-top:38px;}
.wm-party{flex:1;}
.wm-label{
  font-size:9.5px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;
  color:var(--wm-muted);margin-bottom:8px;
}
.wm-party-name{font-size:14px;font-weight:700;}
.wm-party-line{color:var(--wm-muted);font-size:11.5px;margin-top:2px;}

/* items */
.wm-items{width:100%;border-collapse:collapse;margin-top:30px;}
.wm-items thead th{
  background:var(--wm-soft);
  font-size:9.5px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;
  color:var(--wm-muted);text-align:right;padding:11px 10px;
  border-top:1px solid var(--wm-line);border-bottom:1px solid var(--wm-line);
}
.wm-items thead th:first-child{text-align:left;padding-left:14px;}
.wm-items thead th:last-child{padding-right:14px;}
.wm-items tbody td{
  padding:12px 10px;text-align:right;font-size:11.5px;
  border-bottom:1px solid var(--wm-line);vertical-align:top;
}
.wm-items tbody td:first-child{text-align:left;padding-left:14px;}
.wm-items tbody td:last-child{padding-right:14px;font-weight:600;}
.wm-item-desc{font-weight:600;color:var(--wm-ink);}
.wm-item-idx{color:var(--wm-muted);font-weight:500;margin-right:6px;}
.wm-items tbody tr{page-break-inside:avoid;break-inside:avoid;}

/* totals */
.wm-bottom{display:flex;gap:32px;margin-top:26px;align-items:flex-start;}
.wm-bottom-left{flex:1.15;}
.wm-totals{width:290px;margin-left:auto;}
.wm-total-row{display:flex;justify-content:space-between;font-size:11.5px;padding:6px 0;}
.wm-total-row span:first-child{color:var(--wm-muted);}
.wm-total-row span:last-child{font-weight:600;}
.wm-total-sep{height:1px;background:var(--wm-line);margin:6px 0;}
.wm-total-grand{
  display:flex;justify-content:space-between;align-items:center;
  background:var(--wm-accent);color:#fff;border-radius:10px;
  padding:13px 16px;margin-top:10px;
}
.wm-total-grand .wm-grand-label{
  font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;opacity:.9;
}
.wm-total-grand .wm-grand-value{font-family:'Bricolage Grotesque',sans-serif;font-size:19px;font-weight:700;}
.wm-total-due{
  display:flex;justify-content:space-between;font-size:11.5px;font-weight:700;
  padding:9px 16px;margin-top:6px;border:1px solid var(--wm-line);border-radius:10px;
}

/* blocks */
.wm-block{margin-top:16px;page-break-inside:avoid;break-inside:avoid;}
.wm-block-body{font-size:11.5px;color:var(--wm-muted);white-space:normal;}
.wm-pay{
  border:1px solid var(--wm-line);border-radius:10px;padding:14px 16px;background:var(--wm-soft);
}
.wm-pay-grid{display:flex;flex-wrap:wrap;gap:6px 26px;margin-top:2px;}
.wm-pay-item{font-size:11.5px;min-width:120px;}
.wm-pay-item b{display:block;font-size:9.5px;letter-spacing:0.09em;text-transform:uppercase;color:var(--wm-muted);font-weight:700;}

/* footer */
.wm-foot{
  margin-top:34px;border-top:1px solid var(--wm-line);
  padding:16px 56px 34px;display:flex;justify-content:space-between;
  align-items:center;gap:20px;font-size:10.5px;color:var(--wm-muted);
}
.wm-foot-brand{font-family:'Bricolage Grotesque',sans-serif;font-weight:700;color:var(--wm-ink);font-size:12px;}
.wm-foot-links{text-align:right;}

/* screen-only responsive scaling of the fixed A4 canvas */
@media screen and (max-width:900px){
  .wm-invoice-scaler{overflow-x:auto;}
}
`;
}

/* ------------------------------------------------------------------ markup */

export function invoiceBodyHtml(invoice) {
  const company = invoice.company || {};
  const customer = invoice.customer || {};
  const currency = CURRENCIES[invoice.currency] ? invoice.currency : 'USD';
  const money = (v) => escapeHtml(formatMoney(v, currency));
  const accent = safeColor(company.primaryColor);
  const logo = safeImageSrc(company.logo);

  const companyAddress = joinParts([
    company.address,
    joinParts([company.city, company.state]),
    joinParts([company.country, company.postalCode], ' '),
  ], '<br/>');

  const customerAddress = joinParts([
    customer.address,
    joinParts([customer.city, customer.state]),
    joinParts([customer.country, customer.postalCode], ' '),
  ], '<br/>');

  const items = Array.isArray(invoice.items) ? invoice.items : [];

  const itemRows = items
    .map((item, i) => {
      const discountLabel =
        Number(item.discountValue) > 0
          ? item.discountType === 'percentage'
            ? `${escapeHtml(item.discountValue)}%`
            : money(item.discountAmount)
          : '—';
      const taxLabel = Number(item.taxRate) > 0 ? `${escapeHtml(item.taxRate)}%` : '—';
      const qty = Number(item.quantity);
      return `<tr>
  <td><span class="wm-item-idx">${i + 1}.</span><span class="wm-item-desc">${escapeMultiline(item.description)}</span></td>
  <td>${escapeHtml(Number.isInteger(qty) ? qty : qty.toFixed(2))}</td>
  <td>${money(item.rate)}</td>
  <td>${discountLabel}</td>
  <td>${taxLabel}</td>
  <td>${money(item.amount)}</td>
</tr>`;
    })
    .join('\n');

  const totalRow = (label, value, show = true) =>
    show ? `<div class="wm-total-row"><span>${label}</span><span>${value}</span></div>` : '';

  const bank = company.bankDetails || {};
  const payItems = [
    ['Bank', bank.bankName],
    ['Account Holder', bank.accountHolder],
    ['Account Number', bank.accountNumber],
    ['IFSC / SWIFT', bank.ifscSwift],
    ['UPI', bank.upi],
  ]
    .filter(([, v]) => String(v || '').trim())
    .map(([k, v]) => `<div class="wm-pay-item"><b>${escapeHtml(k)}</b>${escapeHtml(v)}</div>`)
    .join('');

  const hasPayBlock = payItems || String(bank.paymentInfo || '').trim();

  const brandMark = logo
    ? `<img class="wm-logo" src="${logo}" alt="${escapeHtml(company.companyName || 'Company')} logo"/>`
    : `<div class="wm-brand-mark">
         <div class="wm-brand-badge">${escapeHtml((company.companyName || 'W').trim().charAt(0).toUpperCase())}</div>
         <div class="wm-brand-name wm-display">${escapeHtml(company.companyName || 'Webamazee')}</div>
       </div>`;

  const footerContacts = joinParts([company.website, company.email, company.phone], ' &nbsp;·&nbsp; ');

  return `<article class="wm-invoice" style="--wm-accent:${accent}">
  <div class="wm-pad wm-grow">
    <header class="wm-head">
      <div class="wm-brand">
        ${brandMark}
        ${logo ? `<div class="wm-brand-name wm-display" style="font-size:16px">${escapeHtml(company.companyName || '')}</div>` : ''}
        <div class="wm-company-meta">
          ${companyAddress ? `<div>${companyAddress}</div>` : ''}
          ${company.email ? `<div>${escapeHtml(company.email)}</div>` : ''}
          ${company.phone ? `<div>${escapeHtml(company.phone)}</div>` : ''}
          ${company.website ? `<div>${escapeHtml(company.website)}</div>` : ''}
          ${company.taxNumber ? `<div>GST / VAT: ${escapeHtml(company.taxNumber)}</div>` : ''}
        </div>
      </div>
      <div class="wm-doc">
        <h1 class="wm-doc-title">INVOICE</h1>
        <div class="wm-doc-accent"></div>
        <div class="wm-doc-rows">
          <div class="wm-doc-row"><span>Invoice #</span><span>${escapeHtml(invoice.invoiceNumber)}</span></div>
          <div class="wm-doc-row"><span>Invoice Date</span><span>${escapeHtml(formatDate(invoice.invoiceDate))}</span></div>
          <div class="wm-doc-row"><span>Due Date</span><span>${escapeHtml(formatDate(invoice.dueDate))}</span></div>
          <div class="wm-doc-row"><span>Currency</span><span>${escapeHtml(currency)}</span></div>
        </div>
        <div class="wm-status" data-status="${escapeHtml(invoice.status)}">${escapeHtml(STATUS_LABELS[invoice.status] || invoice.status)}</div>
      </div>
    </header>

    <section class="wm-parties">
      <div class="wm-party">
        <div class="wm-label">Bill To</div>
        <div class="wm-party-name">${escapeHtml(customer.name)}</div>
        ${customer.company ? `<div class="wm-party-line">${escapeHtml(customer.company)}</div>` : ''}
        ${customerAddress ? `<div class="wm-party-line">${customerAddress}</div>` : ''}
        ${customer.email ? `<div class="wm-party-line">${escapeHtml(customer.email)}</div>` : ''}
        ${customer.phone ? `<div class="wm-party-line">${escapeHtml(customer.phone)}</div>` : ''}
        ${customer.taxNumber ? `<div class="wm-party-line">GST / VAT: ${escapeHtml(customer.taxNumber)}</div>` : ''}
      </div>
      <div class="wm-party" style="flex:0 0 232px">
        <div class="wm-label">Amount Due</div>
        <div class="wm-party-name" style="font-size:20px;font-family:'Bricolage Grotesque',sans-serif">${money(invoice.amountDue ?? invoice.total)}</div>
        <div class="wm-party-line">Due ${escapeHtml(formatDate(invoice.dueDate))}</div>
      </div>
    </section>

    <table class="wm-items">
      <thead>
        <tr>
          <th style="width:42%">Description</th>
          <th style="width:8%">Qty</th>
          <th style="width:13%">Rate</th>
          <th style="width:12%">Discount</th>
          <th style="width:9%">Tax</th>
          <th style="width:16%">Amount</th>
        </tr>
      </thead>
      <tbody>
${itemRows}
      </tbody>
    </table>

    <section class="wm-bottom">
      <div class="wm-bottom-left">
        ${
          hasPayBlock
            ? `<div class="wm-block wm-pay">
                 <div class="wm-label">Payment Information</div>
                 <div class="wm-pay-grid">${payItems}</div>
                 ${bank.paymentInfo ? `<div class="wm-block-body" style="margin-top:8px">${escapeMultiline(bank.paymentInfo)}</div>` : ''}
               </div>`
            : ''
        }
        ${
          invoice.notes
            ? `<div class="wm-block"><div class="wm-label">Notes</div><div class="wm-block-body">${escapeMultiline(invoice.notes)}</div></div>`
            : ''
        }
        ${
          invoice.paymentTerms
            ? `<div class="wm-block"><div class="wm-label">Terms &amp; Conditions</div><div class="wm-block-body">${escapeMultiline(invoice.paymentTerms)}</div></div>`
            : ''
        }
        ${
          invoice.additionalInfo
            ? `<div class="wm-block"><div class="wm-label">Additional Information</div><div class="wm-block-body">${escapeMultiline(invoice.additionalInfo)}</div></div>`
            : ''
        }
      </div>
      <div class="wm-totals">
        ${totalRow('Subtotal', money(invoice.subtotal))}
        ${totalRow('Discount', `− ${money(invoice.discountTotal)}`, Number(invoice.discountTotal) > 0)}
        ${totalRow('Tax', money(invoice.taxTotal), Number(invoice.taxTotal) > 0)}
        ${totalRow('Additional Charges', money(invoice.additionalCharges), Number(invoice.additionalCharges) > 0)}
        <div class="wm-total-sep"></div>
        <div class="wm-total-grand">
          <span class="wm-grand-label">Total</span>
          <span class="wm-grand-value">${money(invoice.total)}</span>
        </div>
        ${
          Number(invoice.amountPaid) > 0
            ? `<div class="wm-total-row" style="padding-top:8px"><span>Amount Paid</span><span>− ${money(invoice.amountPaid)}</span></div>
               <div class="wm-total-due"><span>Amount Due</span><span>${money(invoice.amountDue)}</span></div>`
            : ''
        }
      </div>
    </section>
  </div>

  <footer class="wm-foot">
    <div class="wm-foot-brand">${escapeHtml(company.companyName || 'Webamazee')}</div>
    <div class="wm-foot-links">${footerContacts || ''}</div>
  </footer>
</article>`;
}

/**
 * Full standalone HTML document for Puppeteer (PDF + image).
 * `fontCss` carries base64-inlined webfonts so rendering needs no network.
 */
export function invoiceDocumentHtml(invoice, { fontCss = '', mode = 'pdf' } = {}) {
  const accent = safeColor(invoice?.company?.primaryColor);
  const pageCss =
    mode === 'pdf'
      ? `@page{size:A4;margin:0;}
         html,body{margin:0;padding:0;background:#fff;}
         .wm-invoice{box-shadow:none;margin:0;}`
      : `html,body{margin:0;padding:0;background:#fff;}
         .wm-invoice{box-shadow:none;margin:0;}`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=${A4.width}"/>
<title>Invoice ${escapeHtml(invoice.invoiceNumber)}</title>
<style>${fontCss}</style>
<style>${invoiceStyles(accent)}</style>
<style>${pageCss}</style>
</head>
<body>
${invoiceBodyHtml(invoice)}
</body>
</html>`;
}

export const A4_PX = A4;
