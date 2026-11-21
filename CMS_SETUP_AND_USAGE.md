# Webamazee Blog Admin CMS — Setup & Usage Guide

This project includes a MongoDB Atlas + Vercel Blob powered multi-admin Blog CMS inside the existing Next.js 16 App Router application.

## 1. Required Environment Variables

Copy `.env.example` to `.env.local` (for local use) and add the same variables in **Vercel Project Settings -> Environment Variables**:

- `MONGODB_URI` — MongoDB Atlas SRV connection string (`mongodb+srv://...`).
- `MONGODB_DB` — Database name inside the cluster (default: `webamazee`).
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob read-write token for image uploads (kept strictly server-side).
- `SESSION_SECRET` — Random high-entropy secret of at least 32 characters used to sign HTTP-only session cookies (`openssl rand -base64 48`).
- `CRON_SECRET` — Random high-entropy secret (`openssl rand -hex 32`) used by Vercel Cron to authorize `/api/cron/publish-scheduled`.
- `NEXT_PUBLIC_SITE_URL` — Canonical site origin (`https://www.webamazee.com`).
- `RESEND_API_KEY` & `EMAIL_FROM` *(optional for CMS invites)* — Enables automated invite and password-reset emails via Resend. If unset, Super Admins receive a copyable one-time setup link directly in the UI.

## 2. Database Indexes

Indexes are created automatically on first server/CLI connection via `src/lib/db/connection.ts`:

- `blogs`: unique `slug`, `{ status, publishedAt, createdAt }`, `{ status, scheduledFor }`, `{ category, status }`, `{ updatedAt }`
- `categories`: unique `slug`, unique `name`, `{ sortOrder, name }`
- `admins`: unique `email`, `{ role, isActive }`
- `admin_sessions`: unique `sessionId`, `adminId`, TTL `expiresAt`
- `admin_tokens`: unique `tokenHash`, `adminId`, TTL `expiresAt`
- `media_assets`: unique `url`, unique `pathname`, `{ createdAt }`
- `cms_settings`: unique `key`
- `login_attempts`: unique `key`, TTL `expiresAt`

## 3. Bootstrap the Initial Super Admin

There is **no public signup**. Create the first Super Admin from the CLI after configuring `MONGODB_URI`:

```bash
npm run cms:bootstrap-admin
```

You can also pass `BOOTSTRAP_ADMIN_NAME`, `BOOTSTRAP_ADMIN_EMAIL`, and `BOOTSTRAP_ADMIN_PASSWORD` in your shell without interactive prompts. The script refuses to run if a `super_admin` already exists and never logs passwords.

## 4. Migrate the 13 Existing Blog Posts

All 13 posts in `src/lib/blogs.ts` are preserved 1:1 (slugs, dates, categories, images in `/images/blog/` and `/images/custom/`, FAQs, TOCs, SEO metadata, and all 11 content block types).

1. Preview without writing (`--dry-run`):
   ```bash
   npm run cms:migrate -- --dry-run
   ```
2. Run idempotent live migration (inserts missing posts & categories, skips existing slugs):
   ```bash
   npm run cms:migrate
   ```
3. Only if you intentionally want to reset existing migrated slugs back to `src/lib/blogs.ts` (take a MongoDB Atlas snapshot / `mongodump` backup first — this overwrites matching slugs AND unsets CMS-only overrides such as custom `canonicalUrl`, `ogTitle`, `ogDescription`, `ogImage`, `noindex`, `nofollow`, and `updatedDate` back to `src/lib/blogs.ts`):
   ```bash
   npm run cms:migrate -- --overwrite --confirm-overwrite
   ```

> **Important rollout & slug notes:**
> - **Pre-cutover ordering:** Once `MONGODB_URI` is configured in production, public routes read directly from MongoDB rather than `src/lib/blogs.ts`. Run `npm run cms:migrate` against your production database **before** or immediately upon enabling `MONGODB_URI` in deployment, otherwise un-migrated slugs will return `404`.
> - **Slug renames:** Keep original slugs on migrated posts to preserve SEO URLs. Because migration matches by `slug`, renaming a migrated post's slug in the CMS causes future `npm run cms:migrate` runs to insert a fresh copy under the original slug unless you keep the slug unchanged or delete the duplicate.

## 5. Scheduled Publishing & Vercel Cron

`vercel.json` configures:

```json
{
  "path": "/api/cron/publish-scheduled",
  "schedule": "0 0 * * *"
}
```

- **Vercel Hobby plans** only support daily cron schedules (`0 0 * * *`).
- **Vercel Pro plans** can increase precision (e.g., `"*/5 * * * *"` every 5 minutes) by editing `vercel.json`.
- Every invocation must present `Authorization: Bearer <CRON_SECRET>`. The endpoint atomically transitions due `scheduled` posts (`scheduledFor <= now` UTC) to `published`, sets `publishedAt`, and calls `revalidateTag` / `revalidatePath` on `/blog`, `/newblogs`, `/blog/[slug]`, `/sitemap.xml`, `/sitemap`, `/new-sitemap`, and `/faq`.

## 6. Roles & Security Model

- **Super Admin**: Full access to blogs, media, categories, CMS settings, and team admin management (`/admin/admins`). Cannot self-deactivate, self-demote, or remove the last active Super Admin.
- **Admin**: Full access to create, edit, publish, schedule, archive, and delete blogs, manage categories, and upload/delete unreferenced media assets.
- **Editor**: Can create/edit drafts and archive posts; publishing/scheduling is blocked unless explicitly enabled per Editor (`canPublish: true`) by a Super Admin. Cannot delete blogs or manage admins/settings.
- **Media Deletion Protection**: Deleting an asset from `/admin/media` checks all `draft`, `published`, `scheduled`, and `archived` posts and returns `409 Conflict` if any post references that image.
- **SEO & Layout Isolation**: `/admin/*` returns `noindex, nofollow` metadata + `X-Robots-Tag: noindex, nofollow`, omits public navbar/footer/popups, and is excluded from `/sitemap.xml`, `/sitemap`, and `/new-sitemap`.
