import { ObjectId } from "mongodb";
import type { Post } from "@/lib/blog-types";
import { posts as legacyPosts } from "@/lib/blogs";
import { getCollections } from "@/lib/db/connection";
import { parseDisplayDate, slugify } from "./slugify";
import type { BlogDocument } from "./types";

export interface MigrationReport {
  dryRun: boolean;
  overwrite: boolean;
  totalSourcePosts: number;
  insertedSlugs: string[];
  updatedSlugs: string[];
  skippedSlugs: string[];
  categoriesEnsured: string[];
}

const ALL_OPTIONAL_LEGACY_OR_CMS_FIELDS = [
  "imageWidth",
  "imageHeight",
  "inlineCover",
  "seoTitle",
  "absoluteTitle",
  "metaDescription",
  "canonicalUrl",
  "primaryKeyword",
  "secondaryKeywords",
  "metaKeywords",
  "ogTitle",
  "ogDescription",
  "ogImage",
  "noindex",
  "nofollow",
  "updatedDate",
  "faqs",
  "toc",
  "publishedByCronAt",
] as const;

function legacyPostToDocument(post: Post, now: Date): Omit<BlogDocument, "_id"> {
  const parsedDate = parseDisplayDate(post.date) ?? now;
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    image: post.image,
    ...(post.imageWidth !== undefined ? { imageWidth: post.imageWidth } : {}),
    ...(post.imageHeight !== undefined ? { imageHeight: post.imageHeight } : {}),
    ...(post.inlineCover !== undefined ? { inlineCover: post.inlineCover } : {}),
    alt: post.alt,
    ...(post.seoTitle !== undefined ? { seoTitle: post.seoTitle } : {}),
    ...(post.absoluteTitle !== undefined ? { absoluteTitle: post.absoluteTitle } : {}),
    ...(post.metaDescription !== undefined ? { metaDescription: post.metaDescription } : {}),
    ...(post.primaryKeyword !== undefined ? { primaryKeyword: post.primaryKeyword } : {}),
    ...(post.secondaryKeywords !== undefined
      ? { secondaryKeywords: [...post.secondaryKeywords] }
      : {}),
    ...(post.metaKeywords !== undefined ? { metaKeywords: [...post.metaKeywords] } : {}),
    category: post.category,
    date: post.date,
    readTime: post.readTime,
    author: post.author,
    authorRole: post.authorRole,
    ...(post.faqs !== undefined ? { faqs: structuredClone(post.faqs) } : {}),
    ...(post.toc !== undefined ? { toc: structuredClone(post.toc) } : {}),
    content: structuredClone(post.content),
    status: "published",
    publishedAt: parsedDate,
    scheduledFor: null,
    source: "seed",
    createdAt: parsedDate,
    updatedAt: now,
    createdBy: "migration:seed",
    updatedBy: "migration:seed",
  };
}

function buildOverwriteUnset(docPayload: Omit<BlogDocument, "_id">): Record<string, ""> {
  const unsetFields: Record<string, ""> = {};
  for (const field of ALL_OPTIONAL_LEGACY_OR_CMS_FIELDS) {
    if (!(field in docPayload)) {
      unsetFields[field] = "";
    }
  }
  return unsetFields;
}

export async function migrateLegacyBlogPosts(options: {
  dryRun?: boolean;
  overwrite?: boolean;
}): Promise<MigrationReport> {
  const dryRun = Boolean(options.dryRun);
  const overwrite = Boolean(options.overwrite);
  const { blogs, categories } = await getCollections();
  const now = new Date();

  const existingDocs = await blogs
    .find({})
    .project<{ slug: string }>({ slug: 1 })
    .toArray();
  const existingSlugs = new Set(existingDocs.map((d) => d.slug));

  const insertedSlugs: string[] = [];
  const updatedSlugs: string[] = [];
  const skippedSlugs: string[] = [];
  const categorySet = new Set<string>();

  for (const post of legacyPosts) {
    categorySet.add(post.category);
    const exists = existingSlugs.has(post.slug);

    if (exists && !overwrite) {
      skippedSlugs.push(post.slug);
      continue;
    }

    const docPayload = legacyPostToDocument(post, now);

    if (exists && overwrite) {
      if (!dryRun) {
        const unsetFields = buildOverwriteUnset(docPayload);
        await blogs.updateOne(
          { slug: post.slug },
          {
            $set: docPayload,
            ...(Object.keys(unsetFields).length > 0 ? { $unset: unsetFields } : {}),
          }
        );
      }
      updatedSlugs.push(post.slug);
    } else {
      if (!dryRun) {
        await blogs.insertOne({
          _id: new ObjectId(),
          ...docPayload,
        });
      }
      insertedSlugs.push(post.slug);
    }
  }

  const categoryNames = [...categorySet];
  if (!dryRun) {
    let order = 1;
    for (const name of categoryNames) {
      const catSlug = slugify(name);
      await categories.updateOne(
        { slug: catSlug },
        {
          $setOnInsert: {
            _id: new ObjectId(),
            name,
            slug: catSlug,
            description: `Articles covering ${name}`,
            sortOrder: order,
            createdAt: now,
            updatedAt: now,
          },
        },
        { upsert: true }
      );
      order += 1;
    }
  }

  return {
    dryRun,
    overwrite,
    totalSourcePosts: legacyPosts.length,
    insertedSlugs,
    updatedSlugs,
    skippedSlugs,
    categoriesEnsured: categoryNames,
  };
}
