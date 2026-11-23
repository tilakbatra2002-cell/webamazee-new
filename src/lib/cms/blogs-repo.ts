import "server-only";

import { ObjectId, type Collection, type Filter } from "mongodb";
import { getCollections } from "@/lib/db/mongodb";
import { formatDisplayDate, parseDisplayDate, slugify } from "./slugify";
import { can, ForbiddenError } from "./rbac";
import type {
  BlogDocument,
  BlogStatus,
  CategoryDocument,
  CmsSettingsDocument,
  SerializedAdmin,
  SerializedBlog,
  SerializedCategory,
  SerializedCmsSettings,
} from "./types";
import type { ContentBlock } from "@/lib/blog-types";
import { buildToc, MIN_TOC_HEADINGS, withCanonicalHeadingIds } from "@/lib/blog-headings";

export class RepoError extends Error {
  readonly status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.name = "RepoError";
    this.status = status;
  }
}

/**
 * Heading anchors and the table of contents are derived from article content,
 * never typed by hand. The API recomputes both on every write so the stored
 * `content[].id` values always match the anchors the public page renders.
 */
function deriveContentAndToc(blocks: ContentBlock[]): {
  canonicalContent: ContentBlock[];
  generatedToc: { text: string; id: string; level: 2 | 3 }[];
} {
  const canonicalContent = withCanonicalHeadingIds(blocks);
  const generatedToc = buildToc(canonicalContent);
  return { canonicalContent, generatedToc };
}

export function serializeBlog(doc: BlogDocument): SerializedBlog {
  return {
    id: doc._id.toHexString(),
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    image: doc.image,
    ...(doc.imageWidth != null ? { imageWidth: doc.imageWidth } : {}),
    ...(doc.imageHeight != null ? { imageHeight: doc.imageHeight } : {}),
    ...(doc.inlineCover ? { inlineCover: doc.inlineCover } : {}),
    alt: doc.alt,
    ...(doc.seoTitle ? { seoTitle: doc.seoTitle } : {}),
    ...(doc.absoluteTitle ? { absoluteTitle: doc.absoluteTitle } : {}),
    ...(doc.metaDescription ? { metaDescription: doc.metaDescription } : {}),
    ...(doc.canonicalUrl ? { canonicalUrl: doc.canonicalUrl } : {}),
    ...(doc.primaryKeyword ? { primaryKeyword: doc.primaryKeyword } : {}),
    secondaryKeywords: doc.secondaryKeywords ?? [],
    metaKeywords: doc.metaKeywords ?? [],
    ...(doc.ogTitle ? { ogTitle: doc.ogTitle } : {}),
    ...(doc.ogDescription ? { ogDescription: doc.ogDescription } : {}),
    ...(doc.ogImage ? { ogImage: doc.ogImage } : {}),
    ...(doc.noindex ? { noindex: doc.noindex } : {}),
    ...(doc.nofollow ? { nofollow: doc.nofollow } : {}),
    category: doc.category,
    date: doc.date,
    ...(doc.updatedDate ? { updatedDate: doc.updatedDate } : {}),
    readTime: doc.readTime,
    author: doc.author,
    authorRole: doc.authorRole,
    faqs: doc.faqs ?? [],
    toc: doc.toc ?? [],
    content: doc.content ?? [],
    status: doc.status,
    publishedAt: doc.publishedAt ? doc.publishedAt.toISOString() : null,
    scheduledFor: doc.scheduledFor ? doc.scheduledFor.toISOString() : null,
    source: doc.source ?? "cms",
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
    createdBy: doc.createdBy,
    updatedBy: doc.updatedBy,
  };
}

export interface BlogInputPayload {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  image: string;
  imageWidth?: number | null;
  imageHeight?: number | null;
  inlineCover?: boolean;
  alt: string;
  seoTitle?: string;
  absoluteTitle?: boolean;
  metaDescription?: string;
  canonicalUrl?: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  metaKeywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  noindex?: boolean;
  nofollow?: boolean;
  faqs?: { q: string; a: string }[] | null;
  toc?: { text: string; id: string; level?: 2 | 3 }[] | null;
  content: ContentBlock[];
  status: BlogStatus;
  publishedAt?: string | null;
  scheduledFor?: string | null;
}

/**
 * Resolves a category by exact name OR normalized slug before inserting.
 * Avoids E11000 duplicate-key collisions between equivalent names like
 * "AI SEO" and "AI & SEO" and safely handles concurrent creation.
 */
export async function resolveOrCreateCategoryName(
  categories: Collection<CategoryDocument>,
  rawCategoryName: string,
  now: Date
): Promise<string> {
  const categoryName = rawCategoryName.trim();
  const catSlug = slugify(categoryName) || "general";

  const existing = await categories.findOne({
    $or: [{ slug: catSlug }, { name: categoryName }],
  });
  if (existing) {
    return existing.name;
  }

  try {
    await categories.updateOne(
      { slug: catSlug },
      {
        $setOnInsert: {
          _id: new ObjectId(),
          name: categoryName,
          slug: catSlug,
          description: "",
          sortOrder: 50,
          createdAt: now,
          updatedAt: now,
        },
      },
      { upsert: true }
    );
    const createdOrExisting = await categories.findOne({ slug: catSlug });
    return createdOrExisting?.name ?? categoryName;
  } catch (err) {
    if ((err as { code?: number })?.code === 11000) {
      const winner = await categories.findOne({
        $or: [{ slug: catSlug }, { name: categoryName }],
      });
      if (winner) return winner.name;
    }
    throw err;
  }
}

export async function listAdminBlogs(params: {
  q?: string;
  status?: string;
  category?: string;
  page?: number;
  pageSize?: number;
  sort?: "updated" | "published" | "title";
}): Promise<{
  items: SerializedBlog[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  statusCounts: Record<"all" | BlogStatus, number>;
}> {
  const { blogs } = await getCollections();
  const page = Math.max(1, params.page ?? 1);
  const pageSize = Math.min(50, Math.max(1, params.pageSize ?? 12));

  const filter: Filter<BlogDocument> = {};
  if (
    params.status === "draft" ||
    params.status === "published" ||
    params.status === "scheduled" ||
    params.status === "archived"
  ) {
    filter.status = params.status;
  }
  if (params.category && params.category !== "all") {
    filter.category = params.category;
  }
  if (params.q?.trim()) {
    const escaped = params.q.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escaped, "i");
    filter.$or = [
      { title: regex },
      { slug: regex },
      { excerpt: regex },
      { primaryKeyword: regex },
      { category: regex },
      { author: regex },
    ];
  }

  const sortSpec: Record<string, 1 | -1> =
    params.sort === "title"
      ? { title: 1, updatedAt: -1 }
      : params.sort === "published"
        ? { publishedAt: -1, updatedAt: -1 }
        : { updatedAt: -1, createdAt: -1 };

  const [docs, total, groupedCounts] = await Promise.all([
    blogs
      .find(filter)
      .sort(sortSpec)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray(),
    blogs.countDocuments(filter),
    blogs
      .aggregate<{ _id: BlogStatus; count: number }>([
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ])
      .toArray(),
  ]);

  const statusCounts: Record<"all" | BlogStatus, number> = {
    all: 0,
    published: 0,
    draft: 0,
    scheduled: 0,
    archived: 0,
  };
  for (const row of groupedCounts) {
    if (row._id in statusCounts) {
      statusCounts[row._id] = row.count;
      statusCounts.all += row.count;
    }
  }

  return {
    items: docs.map(serializeBlog),
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
    statusCounts,
  };
}

export async function getAdminBlogById(id: string): Promise<SerializedBlog | null> {
  if (!ObjectId.isValid(id)) return null;
  const { blogs } = await getCollections();
  const doc = await blogs.findOne({ _id: new ObjectId(id) });
  return doc ? serializeBlog(doc) : null;
}

export async function getDashboardOverview(): Promise<{
  counts: Record<"total" | BlogStatus, number>;
  mediaCount: number;
  categoryCount: number;
  adminCount: number;
  upcomingScheduled: SerializedBlog[];
  recentPosts: SerializedBlog[];
}> {
  const { blogs, media, categories, admins } = await getCollections();

  const [grouped, mediaCount, categoryCount, adminCount, scheduledDocs, recentDocs] =
    await Promise.all([
      blogs
        .aggregate<{ _id: BlogStatus; count: number }>([
          { $group: { _id: "$status", count: { $sum: 1 } } },
        ])
        .toArray(),
      media.countDocuments(),
      categories.countDocuments(),
      admins.countDocuments({ isActive: true }),
      blogs
        .find({ status: "scheduled" })
        .sort({ scheduledFor: 1 })
        .limit(5)
        .toArray(),
      blogs.find({}).sort({ updatedAt: -1 }).limit(6).toArray(),
    ]);

  const counts: Record<"total" | BlogStatus, number> = {
    total: 0,
    published: 0,
    draft: 0,
    scheduled: 0,
    archived: 0,
  };

  for (const row of grouped) {
    if (row._id in counts) {
      counts[row._id] = row.count;
      counts.total += row.count;
    }
  }

  return {
    counts,
    mediaCount,
    categoryCount,
    adminCount,
    upcomingScheduled: scheduledDocs.map(serializeBlog),
    recentPosts: recentDocs.map(serializeBlog),
  };
}

function resolveWorkflowDates(
  nextStatus: BlogStatus,
  input: BlogInputPayload,
  timezone: string,
  existing?: BlogDocument
): { publishedAt: Date | null; scheduledFor: Date | null; displayDate: string } {
  const now = new Date();

  if (nextStatus === "published") {
    const parsedExplicit = input.publishedAt ? new Date(input.publishedAt) : null;
    const publishedAt =
      parsedExplicit && !Number.isNaN(parsedExplicit.getTime())
        ? parsedExplicit
        : existing?.publishedAt ?? parseDisplayDate(input.date) ?? now;
    return {
      publishedAt,
      scheduledFor: null,
      displayDate: input.date?.trim() || formatDisplayDate(publishedAt, timezone),
    };
  }

  if (nextStatus === "scheduled") {
    const scheduled = input.scheduledFor ? new Date(input.scheduledFor) : null;
    if (!scheduled || Number.isNaN(scheduled.getTime())) {
      throw new RepoError("Valid scheduledFor timestamp is required for scheduled posts.", 400);
    }
    if (scheduled.getTime() <= now.getTime() && existing?.status !== "scheduled") {
      throw new RepoError("Scheduled publish time must be in the future.", 400);
    }
    return {
      publishedAt: null,
      scheduledFor: scheduled,
      displayDate: input.date?.trim() || formatDisplayDate(scheduled, timezone),
    };
  }

  return {
    publishedAt: existing?.publishedAt ?? null,
    scheduledFor: null,
    displayDate: input.date?.trim() || existing?.date || formatDisplayDate(now, timezone),
  };
}

function enforceStatusPermission(
  actor: SerializedAdmin,
  nextStatus: BlogStatus,
  previousStatus?: BlogStatus
): void {
  const involvesPublish =
    nextStatus === "published" ||
    nextStatus === "scheduled" ||
    previousStatus === "published" ||
    previousStatus === "scheduled";

  if (involvesPublish && !can(actor, "blogs:publish")) {
    throw new ForbiddenError(
      "Your Editor role can manage drafts and archive, but does not have publishing permission."
    );
  }
}

export async function createAdminBlog(
  input: BlogInputPayload,
  actor: SerializedAdmin
): Promise<SerializedBlog> {
  enforceStatusPermission(actor, input.status);

  const { blogs, categories } = await getCollections();
  const slug = slugify(input.slug);
  const conflict = await blogs.findOne({ slug });
  if (conflict) {
    throw new RepoError(`A blog post with slug "${slug}" already exists.`, 409);
  }

  const { canonicalContent, generatedToc } = deriveContentAndToc(input.content);

  const now = new Date();
  const settings = await getCmsSettings();
  const { publishedAt, scheduledFor, displayDate } = resolveWorkflowDates(
    input.status,
    input,
    settings.timezone
  );

  const categoryName = await resolveOrCreateCategoryName(categories, input.category, now);

  const doc: BlogDocument = {
    _id: new ObjectId(),
    slug,
    title: input.title,
    excerpt: input.excerpt,
    image: input.image,
    ...(typeof input.imageWidth === "number" ? { imageWidth: input.imageWidth } : {}),
    ...(typeof input.imageHeight === "number" ? { imageHeight: input.imageHeight } : {}),
    ...(input.inlineCover ? { inlineCover: input.inlineCover } : {}),
    alt: input.alt,
    ...(input.seoTitle?.trim() ? { seoTitle: input.seoTitle.trim() } : {}),
    ...(input.absoluteTitle ? { absoluteTitle: input.absoluteTitle } : {}),
    ...(input.metaDescription?.trim()
      ? { metaDescription: input.metaDescription.trim() }
      : {}),
    ...(input.canonicalUrl?.trim() ? { canonicalUrl: input.canonicalUrl.trim() } : {}),
    ...(input.primaryKeyword?.trim()
      ? { primaryKeyword: input.primaryKeyword.trim() }
      : {}),
    ...(input.secondaryKeywords?.length
      ? { secondaryKeywords: input.secondaryKeywords }
      : {}),
    ...(input.metaKeywords?.length ? { metaKeywords: input.metaKeywords } : {}),
    ...(input.ogTitle?.trim() ? { ogTitle: input.ogTitle.trim() } : {}),
    ...(input.ogDescription?.trim()
      ? { ogDescription: input.ogDescription.trim() }
      : {}),
    ...(input.ogImage?.trim() ? { ogImage: input.ogImage.trim() } : {}),
    ...(input.noindex ? { noindex: input.noindex } : {}),
    ...(input.nofollow ? { nofollow: input.nofollow } : {}),
    category: categoryName,
    date: displayDate,
    readTime: input.readTime,
    author: input.author,
    authorRole: input.authorRole,
    ...(input.faqs?.length ? { faqs: input.faqs } : {}),
    // Seed with canonical heading anchors; the TOC is only written once the
    // article has at least one heading (an empty TOC is never persisted).
    ...(generatedToc.length >= MIN_TOC_HEADINGS ? { toc: generatedToc } : {}),
    content: canonicalContent,
    status: input.status,
    publishedAt,
    scheduledFor,
    source: "cms",
    createdAt: now,
    updatedAt: now,
    createdBy: actor.email,
    updatedBy: actor.email,
  };

  await blogs.insertOne(doc);
  return serializeBlog(doc);
}

/**
 * Applies optional string field semantics cleanly for MongoDB `$set` vs `$unset`:
 * - `undefined` (omitted from update payload): preserves existing DB value.
 * - `""` (explicit empty string): removes field via `$unset` (never writes BSON null).
 * - non-empty string: updates via `$set`.
 */
function applyOptionalStringUpdate(
  field: keyof BlogDocument,
  value: string | undefined,
  setFields: Record<string, unknown>,
  unsetFields: Record<string, "">
): void {
  if (value === undefined) return;
  const trimmed = value.trim();
  if (trimmed === "") {
    unsetFields[field] = "";
  } else {
    setFields[field] = trimmed;
  }
}

export async function updateAdminBlog(
  id: string,
  input: BlogInputPayload,
  actor: SerializedAdmin
): Promise<{ blog: SerializedBlog; previousSlug: string; previousStatus: BlogStatus }> {
  if (!ObjectId.isValid(id)) {
    throw new RepoError("Invalid blog ID.", 400);
  }
  const { blogs, categories } = await getCollections();
  const objectId = new ObjectId(id);
  const existing = await blogs.findOne({ _id: objectId });
  if (!existing) {
    throw new RepoError("Blog post not found.", 404);
  }

  enforceStatusPermission(actor, input.status, existing.status);

  const slug = slugify(input.slug);
  if (slug !== existing.slug) {
    const conflict = await blogs.findOne({ slug, _id: { $ne: objectId } });
    if (conflict) {
      throw new RepoError(`Another blog post already uses slug "${slug}".`, 409);
    }
  }

  const { canonicalContent, generatedToc } = deriveContentAndToc(input.content);

  const now = new Date();
  const settings = await getCmsSettings();
  const { publishedAt, scheduledFor, displayDate } = resolveWorkflowDates(
    input.status,
    input,
    settings.timezone,
    existing
  );

  const categoryName = await resolveOrCreateCategoryName(categories, input.category, now);

  const setFields: Record<string, unknown> = {
    slug,
    title: input.title,
    excerpt: input.excerpt,
    image: input.image,
    alt: input.alt,
    category: categoryName,
    date: displayDate,
    readTime: input.readTime,
    author: input.author,
    authorRole: input.authorRole,
    content: canonicalContent,
    status: input.status,
    publishedAt,
    scheduledFor,
    updatedAt: now,
    updatedBy: actor.email,
  };
  const unsetFields: Record<string, ""> = {};

  if (existing.status === "published" && input.status === "published") {
    setFields.updatedDate = now.toISOString();
  }

  // Preserve image dimensions when image is unchanged and caller did not explicitly clear/change them
  const imageChanged = input.image.trim() !== existing.image.trim();
  if (typeof input.imageWidth === "number") {
    setFields.imageWidth = input.imageWidth;
  } else if (input.imageWidth === null || (imageChanged && input.imageWidth === undefined)) {
    unsetFields.imageWidth = "";
  }

  if (typeof input.imageHeight === "number") {
    setFields.imageHeight = input.imageHeight;
  } else if (input.imageHeight === null || (imageChanged && input.imageHeight === undefined)) {
    unsetFields.imageHeight = "";
  }

  if (input.inlineCover !== undefined) {
    if (input.inlineCover) setFields.inlineCover = true;
    else unsetFields.inlineCover = "";
  }
  if (input.absoluteTitle !== undefined) {
    if (input.absoluteTitle) setFields.absoluteTitle = true;
    else unsetFields.absoluteTitle = "";
  }
  if (input.noindex !== undefined) {
    if (input.noindex) setFields.noindex = true;
    else unsetFields.noindex = "";
  }
  if (input.nofollow !== undefined) {
    if (input.nofollow) setFields.nofollow = true;
    else unsetFields.nofollow = "";
  }

  applyOptionalStringUpdate("seoTitle", input.seoTitle, setFields, unsetFields);
  applyOptionalStringUpdate("metaDescription", input.metaDescription, setFields, unsetFields);
  applyOptionalStringUpdate("canonicalUrl", input.canonicalUrl, setFields, unsetFields);
  applyOptionalStringUpdate("primaryKeyword", input.primaryKeyword, setFields, unsetFields);
  applyOptionalStringUpdate("ogTitle", input.ogTitle, setFields, unsetFields);
  applyOptionalStringUpdate("ogDescription", input.ogDescription, setFields, unsetFields);
  applyOptionalStringUpdate("ogImage", input.ogImage, setFields, unsetFields);

  if (input.secondaryKeywords !== undefined) {
    if (input.secondaryKeywords.length > 0) setFields.secondaryKeywords = input.secondaryKeywords;
    else unsetFields.secondaryKeywords = "";
  }
  if (input.metaKeywords !== undefined) {
    if (input.metaKeywords.length > 0) setFields.metaKeywords = input.metaKeywords;
    else unsetFields.metaKeywords = "";
  }
  // FAQ editing was removed from the CMS. Stored FAQ data is never deleted by a
  // normal save — it is only replaced when a payload explicitly carries FAQs.
  if (input.faqs != null && input.faqs.length > 0) {
    setFields.faqs = input.faqs;
  }

  // TOC is always derived from the article's H2/H3 headings.
  if (generatedToc.length >= MIN_TOC_HEADINGS) setFields.toc = generatedToc;
  else unsetFields.toc = "";

  const updateOp: {
    $set: Record<string, unknown>;
    $unset?: Record<string, "">;
  } = { $set: setFields };
  if (Object.keys(unsetFields).length > 0) {
    updateOp.$unset = unsetFields;
  }

  const updated = await blogs.findOneAndUpdate(
    { _id: objectId },
    updateOp,
    { returnDocument: "after" }
  );

  if (!updated) {
    throw new RepoError("Blog post not found.", 404);
  }

  return {
    blog: serializeBlog(updated),
    previousSlug: existing.slug,
    previousStatus: existing.status,
  };
}

export async function deleteAdminBlog(id: string): Promise<{ slug: string }> {
  if (!ObjectId.isValid(id)) {
    throw new RepoError("Invalid blog ID.", 400);
  }
  const { blogs } = await getCollections();
  const deleted = await blogs.findOneAndDelete({ _id: new ObjectId(id) });
  if (!deleted) {
    throw new RepoError("Blog post not found.", 404);
  }
  return { slug: deleted.slug };
}

export async function publishDueScheduledPosts(): Promise<{
  publishedCount: number;
  publishedSlugs: string[];
  failedSlugs: string[];
}> {
  const { blogs } = await getCollections();
  const now = new Date();
  const due = await blogs
    .find({ status: "scheduled", scheduledFor: { $ne: null, $lte: now } })
    .project<{ _id: ObjectId; slug: string }>({ _id: 1, slug: 1 })
    .toArray();

  const publishedSlugs: string[] = [];
  const failedSlugs: string[] = [];

  for (const candidate of due) {
    try {
      // Atomic check-and-publish guarantees idempotent publish-once behavior across concurrent runs
      const claimed = await blogs.findOneAndUpdate(
        { _id: candidate._id, status: "scheduled", scheduledFor: { $ne: null, $lte: now } },
        [
          {
            $set: {
              status: "published",
              publishedAt: { $ifNull: ["$scheduledFor", now] },
              publishedByCronAt: now,
              scheduledFor: null,
              updatedAt: now,
              updatedBy: "cron:publish-scheduled",
            },
          },
        ],
        { returnDocument: "after" }
      );
      if (claimed) {
        publishedSlugs.push(claimed.slug);
      }
    } catch {
      failedSlugs.push(candidate.slug);
    }
  }

  return {
    publishedCount: publishedSlugs.length,
    publishedSlugs,
    failedSlugs,
  };
}

// ============================================================================
// Categories CRUD
// ============================================================================

export async function listCategories(): Promise<SerializedCategory[]> {
  const { categories, blogs } = await getCollections();
  const [cats, counts] = await Promise.all([
    categories.find({}).sort({ sortOrder: 1, name: 1 }).toArray(),
    blogs
      .aggregate<{ _id: string; count: number }>([
        { $group: { _id: "$category", count: { $sum: 1 } } },
      ])
      .toArray(),
  ]);

  const countMap = new Map<string, number>();
  for (const c of counts) countMap.set(c._id, c.count);

  return cats.map((c) => ({
    id: c._id.toHexString(),
    name: c.name,
    slug: c.slug,
    description: c.description ?? "",
    sortOrder: c.sortOrder ?? 0,
    postCount: countMap.get(c.name) ?? 0,
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
  }));
}

export async function createCategory(input: {
  name: string;
  slug?: string;
  description?: string;
  sortOrder?: number;
}): Promise<SerializedCategory> {
  const { categories } = await getCollections();
  const name = input.name.trim();
  const slug = slugify(input.slug || name);
  const existing = await categories.findOne({ $or: [{ name }, { slug }] });
  if (existing) {
    throw new RepoError(`Category "${name}" or slug "${slug}" already exists.`, 409);
  }
  const now = new Date();
  const doc = {
    _id: new ObjectId(),
    name,
    slug,
    description: input.description ?? "",
    sortOrder: input.sortOrder ?? 0,
    createdAt: now,
    updatedAt: now,
  };
  await categories.insertOne(doc);
  return {
    id: doc._id.toHexString(),
    name: doc.name,
    slug: doc.slug,
    description: doc.description,
    sortOrder: doc.sortOrder,
    postCount: 0,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
}

export async function updateCategory(
  id: string,
  input: { name: string; slug?: string; description?: string; sortOrder?: number }
): Promise<{ category: SerializedCategory; touchedSlugs: string[] }> {
  if (!ObjectId.isValid(id)) throw new RepoError("Invalid category ID.", 400);
  const { categories, blogs } = await getCollections();
  const objectId = new ObjectId(id);
  const existing = await categories.findOne({ _id: objectId });
  if (!existing) throw new RepoError("Category not found.", 404);

  const name = input.name.trim();
  const slug = slugify(input.slug || name);
  const conflict = await categories.findOne({
    _id: { $ne: objectId },
    $or: [{ name }, { slug }],
  });
  if (conflict) {
    throw new RepoError(`Another category already uses name "${name}" or slug "${slug}".`, 409);
  }

  const now = new Date();
  await categories.updateOne(
    { _id: objectId },
    {
      $set: {
        name,
        slug,
        description: input.description ?? "",
        sortOrder: input.sortOrder ?? existing.sortOrder,
        updatedAt: now,
      },
    }
  );

  let touchedSlugs: string[] = [];
  if (name !== existing.name) {
    const affected = await blogs
      .find({ category: existing.name })
      .project({ slug: 1 })
      .toArray();
    touchedSlugs = affected.map((b) => b.slug);
    await blogs.updateMany({ category: existing.name }, { $set: { category: name, updatedAt: now } });
  }

  const count = await blogs.countDocuments({ category: name });
  return {
    category: {
      id: existing._id.toHexString(),
      name,
      slug,
      description: input.description ?? "",
      sortOrder: input.sortOrder ?? existing.sortOrder,
      postCount: count,
      createdAt: existing.createdAt.toISOString(),
      updatedAt: now.toISOString(),
    },
    touchedSlugs,
  };
}

export async function deleteCategory(id: string): Promise<void> {
  if (!ObjectId.isValid(id)) throw new RepoError("Invalid category ID.", 400);
  const { categories, blogs } = await getCollections();
  const objectId = new ObjectId(id);
  const existing = await categories.findOne({ _id: objectId });
  if (!existing) throw new RepoError("Category not found.", 404);

  const inUseCount = await blogs.countDocuments({ category: existing.name });
  if (inUseCount > 0) {
    throw new RepoError(
      `Cannot delete "${existing.name}" because ${inUseCount} blog post(s) use it. Reassign those posts first.`,
      409
    );
  }

  await categories.deleteOne({ _id: objectId });
}

// ============================================================================
// CMS Settings
// ============================================================================

export const DEFAULT_CMS_SETTINGS: Omit<CmsSettingsDocument, "_id" | "updatedAt"> = {
  key: "default",
  siteName: "Webamazee",
  defaultAuthor: "Webamazee",
  defaultAuthorRole: "Digital Growth Team",
  defaultOgImage: "/images/og-image.png",
  postsPerPage: 12,
  blogIndexTitle: "Digital Marketing, SEO & Web Development Blog",
  blogIndexDescription:
    "Practical guides on SEO, AI marketing, website development, local search and measuring ROI - insights to help your business grow online.",
  timezone: "Asia/Calcutta",
};

export async function getCmsSettings(): Promise<SerializedCmsSettings> {
  const { settings } = await getCollections();
  const doc = await settings.findOne({ key: "default" });
  if (!doc) {
    return {
      siteName: DEFAULT_CMS_SETTINGS.siteName,
      defaultAuthor: DEFAULT_CMS_SETTINGS.defaultAuthor,
      defaultAuthorRole: DEFAULT_CMS_SETTINGS.defaultAuthorRole,
      defaultOgImage: DEFAULT_CMS_SETTINGS.defaultOgImage,
      postsPerPage: DEFAULT_CMS_SETTINGS.postsPerPage,
      blogIndexTitle: DEFAULT_CMS_SETTINGS.blogIndexTitle,
      blogIndexDescription: DEFAULT_CMS_SETTINGS.blogIndexDescription,
      timezone: DEFAULT_CMS_SETTINGS.timezone,
      updatedAt: new Date(0).toISOString(),
    };
  }
  return {
    siteName: doc.siteName,
    defaultAuthor: doc.defaultAuthor,
    defaultAuthorRole: doc.defaultAuthorRole,
    defaultOgImage: doc.defaultOgImage,
    postsPerPage: doc.postsPerPage,
    blogIndexTitle: doc.blogIndexTitle,
    blogIndexDescription: doc.blogIndexDescription,
    timezone: doc.timezone,
    updatedAt: doc.updatedAt.toISOString(),
    updatedBy: doc.updatedBy,
  };
}

export async function updateCmsSettings(
  input: Omit<SerializedCmsSettings, "updatedAt" | "updatedBy">,
  actor: SerializedAdmin
): Promise<SerializedCmsSettings> {
  const { settings } = await getCollections();
  const now = new Date();
  await settings.updateOne(
    { key: "default" },
    {
      $set: {
        ...input,
        key: "default",
        updatedAt: now,
        updatedBy: actor.email,
      },
    },
    { upsert: true }
  );
  return {
    ...input,
    updatedAt: now.toISOString(),
    updatedBy: actor.email,
  };
}
