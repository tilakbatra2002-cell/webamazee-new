import type { EnvDiagnostics } from "./types";

export function isMongoConfigured(): boolean {
  const uri = process.env.MONGODB_URI?.trim();
  return Boolean(uri && (uri.startsWith("mongodb://") || uri.startsWith("mongodb+srv://")));
}

export function getMongoDatabaseName(): string {
  return process.env.MONGODB_DB?.trim() || "webamazee";
}

export function isSessionSecretConfigured(): boolean {
  const secret = process.env.SESSION_SECRET?.trim();
  return Boolean(secret && secret.length >= 32);
}

export function isBlobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

export function isCronConfigured(): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  return Boolean(secret && secret.length >= 16);
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim() && process.env.EMAIL_FROM?.trim());
}

export function getCanonicalSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://www.webamazee.com";
  return raw.replace(/\/+$/, "");
}

/**
 * Returns a strictly trusted origin for security-sensitive invite & password-reset links.
 * Never reads untrusted request `Host` or `X-Forwarded-Host` headers.
 */
export function getTrustedAppBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) {
    try {
      const parsed = new URL(configured);
      const isLocalHost =
        parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1";
      if (process.env.NODE_ENV === "production" && !isLocalHost) {
        parsed.protocol = "https:";
      }
      if (parsed.protocol === "http:" || parsed.protocol === "https:") {
        return parsed.origin;
      }
    } catch {
      // Fall through to safe defaults
    }
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    const cleanHost = vercelUrl.replace(/^https?:\/\//, "").replace(/\/+$/, "");
    if (cleanHost) return `https://${cleanHost}`;
  }

  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:3000";
  }

  return "https://www.webamazee.com";
}

export function getEnvDiagnostics(): EnvDiagnostics {
  return {
    mongodbConfigured: isMongoConfigured(),
    mongodbDb: getMongoDatabaseName(),
    sessionSecretConfigured: isSessionSecretConfigured(),
    blobConfigured: isBlobConfigured(),
    cronSecretConfigured: isCronConfigured(),
    emailConfigured: isEmailConfigured(),
    siteUrl: getCanonicalSiteUrl(),
  };
}
