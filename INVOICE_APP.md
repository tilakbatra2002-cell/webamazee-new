# Webamazee Invoice Generator

A production-ready MERN invoicing application for Webamazee: create, manage, and
export professional client invoices as PDF, PNG/JPG, or print.

It lives alongside the existing Next.js marketing site in this repository:

```
/shared     invoice calculation engine + THE canonical invoice template
/server     Express + Mongoose REST API (PDF/image rendering)
/client     React + Vite + Tailwind dashboard
```

---

## 1. Quick start (local)

```bash
# 1 - install
cd server && npm install
cd ../client && npm install

# 2 - configure the API
cd ../server
cp .env.example .env        # then fill in MONGODB_URI and JWT_SECRET

# 3 - database
#    Option A: you already have MongoDB / Atlas -> just set MONGODB_URI
#    Option B: no local MongoDB? start the bundled dev database:
npm run dev:db              # MongoDB-wire server on 127.0.0.1:27017 (dev only)

# 4 - demo data + admin account (development only)
npm run seed                # add --reset to wipe first

# 5 - run
npm run dev                 # API  -> http://localhost:5001
cd ../client && npm run dev # app  -> http://localhost:5173
```

Default seeded login: `admin@webamazee.com` / `Webamazee@2026`
(override with `ADMIN_EMAIL` / `ADMIN_PASSWORD` before seeding).

If no admin exists yet, the login screen automatically becomes a one-time
"create admin account" form; the register endpoint refuses to run once an
account exists.

### About `npm run dev:db`

`server/scripts/dev-db.js` starts a MongoDB wire-protocol compatible server
(SQLite-backed) purely so the app can be run end-to-end without installing
MongoDB. It is a **devDependency** — nothing in `server/src` references it, and
production is expected to use real MongoDB or MongoDB Atlas via `MONGODB_URI`.

---

## 2. Architecture

### One canonical invoice template

`shared/invoiceTemplate.js` is the **single** source of the invoice design. It
is used for all four outputs, so they can never drift apart:

| Output        | How it uses the template                                           |
| ------------- | ------------------------------------------------------------------ |
| Browser preview | `InvoiceDocument.tsx` injects `invoiceBodyHtml()` + `invoiceStyles()` |
| PDF           | Puppeteer prints `invoiceDocumentHtml()` (real vector PDF)          |
| PNG / JPG     | Puppeteer screenshots the `.wm-invoice` element at 2x DPR           |
| Print         | Print CSS hides everything except `.wm-print-root`                  |

### One calculation engine

`shared/calc.js` computes every figure using **integer minor units (cents)** to
eliminate floating-point currency drift. The client imports it for live
preview; the API imports it to recompute authoritatively on every write —
client-supplied totals are always ignored.

```
line:    base = qty × rate → discount → tax → amount
invoice: subtotal − discounts + tax + additional charges = total
```

### PDF / image rendering

`server/src/services/browser.js` resolves Chromium in this order:

1. `CHROMIUM_PATH` (Docker/Render images that ship system Chrome)
2. `@sparticuz/chromium` — the bundled build, which works on Render, Railway,
   Lambda and plain Linux hosts

Fonts (Bricolage Grotesque + Manrope, incl. `latin-ext` for the ₹ sign) are
inlined as base64 in the rendered HTML, so exports need **no network access**
and never fall back to a default font.

---

## 3. API

All routes are under `/api` and require `Authorization: Bearer <jwt>` except
`/api/health`, `/api/auth/status`, `/api/auth/login` and `/api/auth/register`.

| Method   | Route                          | Purpose                             |
| -------- | ------------------------------ | ----------------------------------- |
| `GET`    | `/health`                      | Health probe                        |
| `GET`    | `/auth/status`                 | Whether first-run setup is needed   |
| `POST`   | `/auth/login`                  | Sign in (rate limited)              |
| `POST`   | `/auth/register`               | Bootstrap the first admin only      |
| `GET`    | `/auth/me`                     | Current user                        |
| `GET`    | `/invoices`                    | List (search/filter/sort/paginate)  |
| `GET`    | `/invoices/next-number`        | Next unique invoice number          |
| `POST`   | `/invoices`                    | Create                              |
| `GET`    | `/invoices/:id`                | Read                                |
| `PUT`    | `/invoices/:id`                | Update                              |
| `PATCH`  | `/invoices/:id/status`         | Change status                       |
| `POST`   | `/invoices/:id/duplicate`      | Duplicate as a new draft            |
| `DELETE` | `/invoices/:id`                | Delete                              |
| `GET`    | `/invoices/:id/pdf`            | Download A4 PDF                     |
| `GET`    | `/invoices/:id/image`          | Download PNG (`?format=jpg` for JPG)|
| `GET`    | `/customers`                   | List with invoice count / billed    |
| `POST`   | `/customers`                   | Create                              |
| `GET`    | `/customers/:id`               | Customer + their invoices           |
| `PUT`    | `/customers/:id`               | Update                              |
| `DELETE` | `/customers/:id`               | Delete (`?force=true` if invoiced)  |
| `GET`    | `/settings`                    | Company settings singleton          |
| `PUT`    | `/settings`                    | Update settings                     |
| `GET`    | `/dashboard/stats`             | Totals, status counts, recent       |

Query parameters for `GET /invoices`:
`search`, `status`, `currency`, `customerId`, `from`, `to`,
`sort` (`newest|oldest|highest|lowest`), `page`, `limit`.

Responses are uniform:

```jsonc
{ "success": true,  "data":  { /* ... */ } }
{ "success": false, "error": { "message": "…", "details": [{ "field": "…", "message": "…" }] } }
```

---

## 4. Data model

* **Invoice** — number, dates, status, currency, **snapshotted** customer and
  company details, items, all derived totals, notes/terms.
  Snapshotting means editing a customer or your company profile never rewrites
  history on invoices you already issued.
* **Customer** — contact and tax details.
* **CompanySettings** — singleton holding the company profile, invoice
  defaults, branding and bank details.
* **User** — admin account (bcrypt hash, never serialised).

Invoice numbers follow `PREFIX-YEAR-0001` (e.g. `WM-2026-0001`). They are
generated from the settings counter but always probed against the collection
first, and a unique index is the final guard, so duplicates are impossible even
when numbers are entered by hand.

---

## 5. Validation & security

* Every request body/query is parsed with **zod** (`server/src/utils/schemas.js`);
  unknown keys are stripped, which is the primary input-sanitisation boundary.
* Mongoose runs with `sanitizeFilter` on, so user input can never inject query
  operators. Server-authored operators are marked with `mongoose.trusted(...)`
  in `server/src/utils/query.js`.
* Regex search terms are escaped before use.
* JWT auth on all data routes; bcrypt (cost 12) password hashing.
* `helmet`, CORS allow-list, and rate limiting (global + stricter on auth).
* Secrets come from environment variables only; `.env` files are git-ignored.
* Logos are stored as data URLs on the settings document — no filesystem paths
  are ever exposed, and deployments stay stateless.

Validation enforced on both client and server includes: customer name required,
invoice date required, unique invoice number, quantity > 0, non-negative
rate/tax/discount, discount capped at the applicable amount, valid email,
currency, and status, and due date ≥ invoice date.

---

## 6. Deployment

### Frontend → Vercel

Set the project **root directory** to `client`. `client/vercel.json` already
configures the SPA rewrite and security headers.

Environment variable:

```
VITE_API_URL=https://<your-api-host>/api
```

### Backend → Render / Railway

Use `server/render.yaml`, or configure manually:

* Root directory `server`, build `npm ci`, start `npm start`
* Health check path `/api/health`
* Environment: `NODE_ENV=production`, `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`

The bundled Chromium works on Render's standard Node runtime. On a slim Docker
base image, install Chromium and point `CHROMIUM_PATH` at it instead.

### Database → MongoDB Atlas

Create a cluster, add the host to the network allow-list, and set `MONGODB_URI`.

---

## 7. Seed / demo data

`server/src/seed/seed.js` is **development/demo data** and is never run
automatically. It refuses to execute when `NODE_ENV=production` unless
`ALLOW_PRODUCTION_SEED=true` is explicitly set.

It creates the Webamazee company profile, an admin account, 3 sample customers
and 4 sample invoices — including a deliberately long one that spans multiple
PDF pages, plus USD, INR, NZD and GBP examples.

---

## 8. Verified behaviour

The following were exercised end-to-end against a running stack:

* Login → dashboard → create customer → create invoice with multiple items →
  totals → save → view → edit → duplicate → status change → search → filter →
  sort → delete.
* PDF export: real vector PDF, A4, embedded subsetted fonts, automatic page
  breaks with repeating table headers, nothing clipped.
* Image export: 2x PNG and JPG of the invoice only, white background, no UI.
* Print: only the invoice renders — header, nav, buttons and toasts are hidden.
* Currencies render distinctly: `$`, `₹` (with Indian digit grouping), `£`,
  `€`, `A$`, `NZ$`.
* Settings changes flow into newly created invoices.
* Server-side rejection of invalid input, duplicate invoice numbers and
  unauthenticated requests.
* Mobile (390px): no horizontal overflow; the A4 preview scales proportionally.
* No browser console errors or failed requests across the flows above.
