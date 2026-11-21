import "server-only";

import { del, put } from "@vercel/blob";
import { ObjectId } from "mongodb";
import { getCollections } from "@/lib/db/mongodb";
import { isBlobConfigured } from "./config";
import { RepoError } from "./blogs-repo";
import {
  ALLOWED_IMAGE_MIME_TYPES,
  MAX_IMAGE_BYTES,
  detectImageMimeFromBytes,
  sanitizeImageFilename,
} from "./image-validation";
import { assertCan } from "./rbac";
import type { BlogDocument, MediaAssetDocument, SerializedAdmin, SerializedMediaAsset } from "./types";

export { MAX_IMAGE_BYTES, ALLOWED_IMAGE_MIME_TYPES, detectImageMimeFromBytes, sanitizeImageFilename };

function collectReferencedMediaUrls(blog: Pick<BlogDocument, "slug" | "image" | "ogImage" | "content">): Set<string> {
  const urls = new Set<string>();
  if (blog.image) urls.add(blog.image.trim());
  if (blog.ogImage) urls.add(blog.ogImage.trim());
  for (const block of blog.content ?? []) {
    if (block.type === "image" && block.src) {
      urls.add(block.src.trim());
    }
  }
  return urls;
}

export async function findMediaReferences(urlOrPathname: string): Promise<string[]> {
  const { blogs } = await getCollections();
  const docs = await blogs
    .find(
      {},
      { projection: { slug: 1, image: 1, ogImage: 1, content: 1 } }
    )
    .toArray();

  const matchedSlugs: string[] = [];
  for (const blog of docs) {
    const refs = collectReferencedMediaUrls(blog);
    if (refs.has(urlOrPathname)) {
      matchedSlugs.push(blog.slug);
    }
  }
  return matchedSlugs;
}

function serializeMedia(
  doc: MediaAssetDocument,
  refMap: Map<string, string[]>
): SerializedMediaAsset {
  const usedInSlugs = refMap.get(doc.url) ?? [];
  return {
    id: doc._id.toHexString(),
    url: doc.url,
    pathname: doc.pathname,
    filename: doc.filename,
    contentType: doc.contentType,
    size: doc.size,
    width: doc.width,
    height: doc.height,
    alt: doc.alt,
    uploadedBy: doc.uploadedBy,
    uploadedByEmail: doc.uploadedByEmail,
    usageCount: usedInSlugs.length,
    usedInSlugs,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
}

export async function listMediaAssets(q?: string): Promise<SerializedMediaAsset[]> {
  const { media, blogs } = await getCollections();
  const filter = q?.trim()
    ? {
        $or: [
          { filename: new RegExp(q.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i") },
          { alt: new RegExp(q.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i") },
        ],
      }
    : {};

  const [assets, allBlogs] = await Promise.all([
    media.find(filter).sort({ createdAt: -1 }).limit(200).toArray(),
    blogs
      .find({}, { projection: { slug: 1, image: 1, ogImage: 1, content: 1 } })
      .toArray(),
  ]);

  const refMap = new Map<string, string[]>();
  for (const blog of allBlogs) {
    const refs = collectReferencedMediaUrls(blog);
    for (const ref of refs) {
      const list = refMap.get(ref) ?? [];
      list.push(blog.slug);
      refMap.set(ref, list);
    }
  }

  return assets.map((asset) => serializeMedia(asset, refMap));
}

export async function authorizeMediaReplacement(
  replaceAssetId: string,
  actor: SerializedAdmin
): Promise<{
  existing: MediaAssetDocument;
  affectedBlogs: BlogDocument[];
}> {
  assertCan(
    actor,
    "media:edit",
    "You do not have permission to edit existing media assets."
  );
  assertCan(
    actor,
    "media:replace",
    "You do not have permission to replace existing media assets."
  );

  if (!ObjectId.isValid(replaceAssetId)) {
    throw new RepoError("Invalid asset ID for replacement.", 400);
  }

  const { media, blogs } = await getCollections();
  const existing = await media.findOne({ _id: new ObjectId(replaceAssetId) });
  if (!existing) {
    throw new RepoError("Target media asset to replace was not found.", 404);
  }

  const oldUrl = existing.url;
  const affectedBlogs = await blogs
    .find({
      $or: [{ image: oldUrl }, { ogImage: oldUrl }, { "content.src": oldUrl }],
    })
    .toArray();

  for (const blog of affectedBlogs) {
    assertCan(
      actor,
      "blogs:edit",
      `You do not have permission to modify blog post "${blog.slug}" via media replacement.`
    );
    if (blog.status === "published" || blog.status === "scheduled") {
      assertCan(
        actor,
        "blogs:publish",
        `Publishing permission is required to replace assets used by ${blog.status} post "${blog.slug}".`
      );
    }
  }

  return { existing, affectedBlogs };
}

export async function uploadMediaAsset(input: {
  buffer: Buffer;
  originalFilename: string;
  declaredMime: string;
  alt: string;
  replaceAssetId?: string;
  actor: SerializedAdmin;
}): Promise<SerializedMediaAsset> {
  if (input.replaceAssetId) {
    // Enforce authorization and gather affected blogs BEFORE validating/uploading any Blob object
    const { existing, affectedBlogs } = await authorizeMediaReplacement(
      input.replaceAssetId,
      input.actor
    );

    if (!isBlobConfigured()) {
      throw new RepoError("BLOB_READ_WRITE_TOKEN is not configured on the server.", 503);
    }
    if (input.buffer.length === 0) {
      throw new RepoError("Uploaded file is empty.", 400);
    }
    if (input.buffer.length > MAX_IMAGE_BYTES) {
      throw new RepoError("Image exceeds the maximum 5 MB file size limit.", 400);
    }

    const detectedMime = detectImageMimeFromBytes(input.buffer);
    if (!detectedMime || !ALLOWED_IMAGE_MIME_TYPES.has(detectedMime)) {
      throw new RepoError(
        "Unsupported or invalid image file. Only WebP, PNG, and JPEG images are permitted.",
        400
      );
    }
    if (input.declaredMime && input.declaredMime !== detectedMime) {
      if (!(input.declaredMime === "image/jpg" && detectedMime === "image/jpeg")) {
        throw new RepoError("File content does not match its declared image type.", 400);
      }
    }
    const alt = input.alt.trim();
    if (!alt) {
      throw new RepoError("Descriptive alt text is required for uploaded images.", 400);
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN!.trim();
    const safeFilename = sanitizeImageFilename(input.originalFilename, detectedMime);
    const blobPath = `blog/${safeFilename}`;
    const { media, blogs } = await getCollections();

    const uploaded = await put(blobPath, input.buffer, {
      access: "public",
      contentType: detectedMime,
      token,
      addRandomSuffix: false,
    });

    const oldUrl = existing.url;
    const now = new Date();
    const updatedBlogRollbacks: BlogDocument[] = [];
    let mediaUpdated = false;

    try {
      await media.updateOne(
        { _id: existing._id },
        {
          $set: {
            url: uploaded.url,
            pathname: uploaded.pathname,
            filename: safeFilename,
            contentType: detectedMime,
            size: input.buffer.length,
            alt,
            uploadedBy: input.actor.name,
            uploadedByEmail: input.actor.email,
            updatedAt: now,
          },
        }
      );
      mediaUpdated = true;

      for (const b of affectedBlogs) {
        const updatedBlocks = (b.content ?? []).map((block) =>
          block.type === "image" && block.src === oldUrl
            ? { ...block, src: uploaded.url }
            : block
        );
        await blogs.updateOne(
          { _id: b._id },
          {
            $set: {
              image: b.image === oldUrl ? uploaded.url : b.image,
              ...(b.ogImage === oldUrl ? { ogImage: uploaded.url } : {}),
              content: updatedBlocks,
              updatedAt: now,
            },
          }
        );
        updatedBlogRollbacks.push(b);
      }
    } catch (err) {
      // Restore DB records best-effort and delete the newly uploaded Blob so no orphan or broken reference remains
      for (const prev of updatedBlogRollbacks) {
        await blogs
          .updateOne(
            { _id: prev._id },
            {
              $set: {
                image: prev.image,
                ...(prev.ogImage !== undefined ? { ogImage: prev.ogImage } : {}),
                content: prev.content,
                updatedAt: prev.updatedAt,
              },
            }
          )
          .catch(() => undefined);
      }
      if (mediaUpdated) {
        await media
          .updateOne(
            { _id: existing._id },
            {
              $set: {
                url: existing.url,
                pathname: existing.pathname,
                filename: existing.filename,
                contentType: existing.contentType,
                size: existing.size,
                alt: existing.alt,
                uploadedBy: existing.uploadedBy,
                uploadedByEmail: existing.uploadedByEmail,
                updatedAt: existing.updatedAt,
              },
            }
          )
          .catch(() => undefined);
      }
      await del(uploaded.url, { token }).catch(() => undefined);
      throw err;
    }

    if (oldUrl !== uploaded.url) {
      await del(oldUrl, { token }).catch(() => undefined);
    }

    const updatedAsset = await media.findOne({ _id: existing._id });
    const refs = await findMediaReferences(uploaded.url);
    const refMap = new Map([[uploaded.url, refs]]);
    return serializeMedia(updatedAsset!, refMap);
  }

  assertCan(input.actor, "media:upload");

  if (!isBlobConfigured()) {
    throw new RepoError("BLOB_READ_WRITE_TOKEN is not configured on the server.", 503);
  }

  if (input.buffer.length === 0) {
    throw new RepoError("Uploaded file is empty.", 400);
  }
  if (input.buffer.length > MAX_IMAGE_BYTES) {
    throw new RepoError("Image exceeds the maximum 5 MB file size limit.", 400);
  }

  const detectedMime = detectImageMimeFromBytes(input.buffer);
  if (!detectedMime || !ALLOWED_IMAGE_MIME_TYPES.has(detectedMime)) {
    throw new RepoError(
      "Unsupported or invalid image file. Only WebP, PNG, and JPEG images are permitted.",
      400
    );
  }

  if (input.declaredMime && input.declaredMime !== detectedMime) {
    if (!(input.declaredMime === "image/jpg" && detectedMime === "image/jpeg")) {
      throw new RepoError("File content does not match its declared image type.", 400);
    }
  }

  const alt = input.alt.trim();
  if (!alt) {
    throw new RepoError("Descriptive alt text is required for uploaded images.", 400);
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN!.trim();
  const safeFilename = sanitizeImageFilename(input.originalFilename, detectedMime);
  const blobPath = `blog/${safeFilename}`;

  const { media } = await getCollections();

  const uploaded = await put(blobPath, input.buffer, {
    access: "public",
    contentType: detectedMime,
    token,
    addRandomSuffix: false,
  });

  const now = new Date();
  const doc: MediaAssetDocument = {
    _id: new ObjectId(),
    url: uploaded.url,
    pathname: uploaded.pathname,
    filename: safeFilename,
    contentType: detectedMime,
    size: input.buffer.length,
    alt,
    uploadedBy: input.actor.name,
    uploadedByEmail: input.actor.email,
    createdAt: now,
    updatedAt: now,
  };

  try {
    await media.insertOne(doc);
  } catch (err) {
    await del(uploaded.url, { token }).catch(() => undefined);
    throw err;
  }

  return serializeMedia(doc, new Map());
}

export async function updateMediaAlt(id: string, alt: string): Promise<SerializedMediaAsset> {
  if (!ObjectId.isValid(id)) throw new RepoError("Invalid media ID.", 400);
  const { media } = await getCollections();
  const updated = await media.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { alt: alt.trim(), updatedAt: new Date() } },
    { returnDocument: "after" }
  );
  if (!updated) throw new RepoError("Media asset not found.", 404);
  const refs = await findMediaReferences(updated.url);
  return serializeMedia(updated, new Map([[updated.url, refs]]));
}

export async function deleteMediaAsset(id: string): Promise<{ url: string }> {
  if (!ObjectId.isValid(id)) throw new RepoError("Invalid media ID.", 400);
  if (!isBlobConfigured()) {
    throw new RepoError("BLOB_READ_WRITE_TOKEN is not configured on the server.", 503);
  }

  const { media } = await getCollections();
  const objectId = new ObjectId(id);
  const asset = await media.findOne({ _id: objectId });
  if (!asset) throw new RepoError("Media asset not found.", 404);

  const refs = await findMediaReferences(asset.url);
  if (refs.length > 0) {
    throw new RepoError(
      `Cannot delete "${asset.filename}" because it is referenced by blog post(s): ${refs.join(", ")}. Remove or replace the image in those posts first.`,
      409
    );
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN!.trim();
  await del(asset.url, { token });
  await media.deleteOne({ _id: objectId });

  return { url: asset.url };
}
