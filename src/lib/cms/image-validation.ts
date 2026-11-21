import crypto from "crypto";
import { slugify } from "./slugify";

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB

export const ALLOWED_IMAGE_MIME_TYPES = new Set([
  "image/webp",
  "image/png",
  "image/jpeg",
]);

const EXT_FOR_MIME: Record<string, string> = {
  "image/webp": "webp",
  "image/png": "png",
  "image/jpeg": "jpg",
};

export function detectImageMimeFromBytes(
  buffer: Buffer
): "image/webp" | "image/png" | "image/jpeg" | null {
  if (buffer.length < 12) return null;

  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "image/jpeg";
  }

  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return "image/png";
  }

  if (
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    return "image/webp";
  }

  return null;
}

export function sanitizeImageFilename(originalName: string, mime: string): string {
  const base = originalName.replace(/\.[^/.]+$/, "");
  const cleanBase = slugify(base).slice(0, 60) || "blog-image";
  const ext = EXT_FOR_MIME[mime] ?? "webp";
  const suffix = crypto.randomBytes(4).toString("hex");
  return `${cleanBase}-${Date.now()}-${suffix}.${ext}`;
}
