import http from "node:http";
import https from "node:https";
import { gunzipSync, brotliDecompressSync, inflateSync } from "node:zlib";
import { assertSafeHost } from "./ssrf";

export interface SafeFetchResult {
  status: number;
  headers: http.IncomingHttpHeaders;
  body: string;
  finalUrl: string;
  responseTimeMs: number;
  redirectCount: number;
  truncated: boolean;
  tlsInsecure: boolean;
}

const MAX_REDIRECTS = 5;
const TIMEOUT_MS = 10_000;
const MAX_BYTES = 3_000_000;
const USER_AGENT =
  "Mozilla/5.0 (compatible; WebamazeeSEOAudit/1.0; +https://www.webamazee.com)";

const CERT_ERROR_CODES = new Set([
  "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
  "CERT_HAS_EXPIRED",
  "DEPTH_ZERO_SELF_SIGNED_CERT",
  "ERR_TLS_CERT_ALTNAME_INVALID",
  "CERT_UNTRUSTED",
  "UNABLE_TO_GET_ISSUER_CERT_LOCALLY",
  "SELF_SIGNED_CERT_IN_CHAIN",
]);

function decodeBody(buffer: Buffer, encoding: string | undefined): string {
  const enc = (encoding || "").toLowerCase();
  try {
    if (enc.includes("br")) return brotliDecompressSync(buffer).toString("utf8");
    if (enc.includes("gzip")) return gunzipSync(buffer).toString("utf8");
    if (enc.includes("deflate")) return inflateSync(buffer).toString("utf8");
  } catch {
    return buffer.toString("utf8");
  }
  return buffer.toString("utf8");
}

function isCertError(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const code = (err as { code?: string }).code;
  return !!code && CERT_ERROR_CODES.has(code);
}

/**
 * Fetches a URL safely: validates SSRF for every hop (including redirects),
 * enforces a timeout and a response size cap, and only allows http/https.
 */
export async function safeFetch(urlStr: string): Promise<SafeFetchResult> {
  let url: URL;
  try {
    url = new URL(urlStr);
  } catch {
    throw new Error("INVALID_URL");
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("INVALID_SCHEME");
  }
  await assertSafeHost(url.hostname);

  const startedAt = Date.now();

  try {
    return await fetchHop(url, startedAt, 0, true);
  } catch (err) {
    if (url.protocol === "https:" && isCertError(err)) {
      const result = await fetchHop(url, startedAt, 0, false);
      return { ...result, tlsInsecure: true };
    }
    throw err;
  }
}

async function fetchHop(
  url: URL,
  startedAt: number,
  redirectCount: number,
  verifyTls: boolean
): Promise<SafeFetchResult> {
  const remaining = TIMEOUT_MS - (Date.now() - startedAt);
  if (remaining < 400) throw new Error("TIMEOUT");

  const isHttps = url.protocol === "https:";
  const transport = isHttps ? https : http;
  const agent = isHttps
    ? new https.Agent({ rejectUnauthorized: verifyTls, keepAlive: false })
    : new http.Agent({ keepAlive: false });

  const result = await new Promise<SafeFetchResult>((resolve, reject) => {
    const timer = setTimeout(() => {
      req.destroy(new Error("TIMEOUT"));
    }, remaining);

    const req = transport.request(
      {
        hostname: url.hostname,
        port: url.port || (isHttps ? 443 : 80),
        path: url.pathname + url.search,
        method: "GET",
        headers: {
          "User-Agent": USER_AGENT,
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "close",
        },
        agent,
      },
      (res) => {
        const status = res.statusCode ?? 0;
        const location = res.headers.location;

        if (location && status >= 300 && status < 400) {
          res.resume();
          if (redirectCount >= MAX_REDIRECTS) {
            clearTimeout(timer);
            reject(new Error("TOO_MANY_REDIRECTS"));
            return;
          }
          let next: URL;
          try {
            next = new URL(location, url);
          } catch {
            clearTimeout(timer);
            reject(new Error("BLOCKED_REDIRECT"));
            return;
          }
          if (next.protocol !== "http:" && next.protocol !== "https:") {
            clearTimeout(timer);
            reject(new Error("BLOCKED_REDIRECT"));
            return;
          }
          assertSafeHost(next.hostname)
            .then(() => {
              clearTimeout(timer);
              return fetchHop(next, startedAt, redirectCount + 1, verifyTls);
            })
            .then(resolve, reject);
          return;
        }

        let size = 0;
        const chunks: Buffer[] = [];
        let truncated = false;

        res.on("data", (chunk: Buffer) => {
          size += chunk.length;
          if (size > MAX_BYTES) {
            truncated = true;
            chunks.push(chunk.subarray(0, Math.max(0, MAX_BYTES - (size - chunk.length))));
            res.destroy();
            return;
          }
          chunks.push(chunk);
        });

        res.on("error", (err) => {
          clearTimeout(timer);
          reject(err);
        });

        res.on("end", () => {
          clearTimeout(timer);
          const buffer = Buffer.concat(chunks);
          const encoding = Array.isArray(res.headers["content-encoding"])
            ? res.headers["content-encoding"][0]
            : res.headers["content-encoding"];
          const body = decodeBody(buffer, encoding);
          resolve({
            status,
            headers: res.headers,
            body,
            finalUrl: url.href,
            responseTimeMs: Date.now() - startedAt,
            redirectCount,
            truncated,
            tlsInsecure: !verifyTls && isHttps,
          });
        });
      }
    );

    req.on("error", (err) => {
      clearTimeout(timer);
      const message = err instanceof Error ? err.message : "";
      if (message === "TIMEOUT" || (err as { code?: string }).code === "ABORT_ERR") {
        reject(new Error("TIMEOUT"));
      } else if (isCertError(err)) {
        reject(err);
      } else {
        reject(new Error("REQUEST_FAILED"));
      }
    });

    req.end();
  });

  return result;
}

/** A very small helper to fetch plain text (robots.txt / sitemap.xml). */
export async function safeFetchText(urlStr: string): Promise<{
  status: number;
  text: string;
} | null> {
  try {
    const res = await safeFetch(urlStr);
    return { status: res.status, text: res.body };
  } catch {
    return null;
  }
}
