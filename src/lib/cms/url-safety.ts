const CONTROL_CHARS_RE = /[\u0000-\u001F\u007F]/;

const BLOB_HOST_RE =
  /^([a-z0-9-]+\.)?(public\.)?blob\.vercel-storage\.com$/;

export function isSafeLinkOrPath(value: string): boolean {
  const v = value.trim();
  if (!v || CONTROL_CHARS_RE.test(v)) return false;

  if (v.startsWith("/")) {
    return !v.startsWith("//") && !v.startsWith("/\\");
  }

  if (v.startsWith("#")) {
    return v.length > 1 && !/\s/.test(v);
  }

  try {
    const url = new URL(v);
    if (url.protocol === "https:") return true;
    if (
      url.protocol === "http:" &&
      (url.hostname === "localhost" || url.hostname === "127.0.0.1")
    ) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export function isApprovedMediaPathOrUrl(value: string): boolean {
  const v = value.trim();
  if (!v || CONTROL_CHARS_RE.test(v)) return false;

  if (v.startsWith("/")) {
    return !v.startsWith("//") && !v.startsWith("/\\");
  }

  try {
    const url = new URL(v);
    if (url.protocol !== "https:") return false;
    return BLOB_HOST_RE.test(url.hostname.toLowerCase());
  } catch {
    return false;
  }
}

export function findUnsafeMarkdownLinks(text: string): string[] {
  const unsafe: string[] = [];
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match: RegExpExecArray | null;
  while ((match = linkRe.exec(text)) !== null) {
    const href = match[2]?.trim() ?? "";
    if (!isSafeLinkOrPath(href)) {
      unsafe.push(href);
    }
  }
  return unsafe;
}

export function hasOnlySafeMarkdownLinks(text: string): boolean {
  return findUnsafeMarkdownLinks(text).length === 0;
}
