import http from "node:http";
import https from "node:https";
import { assertSafeHost } from "./ssrf";

export interface SafeFetchResult {
  status: number;
  headers: http.IncomingHttpHeaders;
  body: string;
  finalUrl: string;
  responseTimeMs: number;
}

const MAX_REDIRECTS = 4;
const TIMEOUT_MS = 8000;
const MAX_BYTES = 2_500_000; // ~2.4MB
const USER_AGENT =
  "Mozilla/5.0 (compatible; WebamazeeSEOAudit/1.0; +https://www.webamazee.com)";

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
  const redirects: string[] = [];

  return fetchHop(url, startedAt, redirects);
}

async function fetchHop(
  url: URL,
  startedAt: number,
  redirects: string[]
): Promise<SafeFetchResult> {
  const isHttps = url.protocol === "https:";
  const transport = isHttps ? https : http;

  const result = await new Promise<SafeFetchResult>((resolve, reject) => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      controller.abort();
      reject(new Error("TIMEOUT"));
    }, TIMEOUT_MS);

    const req = transport.request(
      {
        hostname: url.hostname,
        port: url.port || (isHttps ? 443 : 80),
        path: url.pathname + url.search,
        method: "GET",
        headers: {
          "User-Agent": USER_AGENT,
          Accept: "text/html,application/xhtml+xml,*/*;q=0.8",
          "Accept-Language": "en",
          Connection: "close",
        },
        signal: controller.signal,
        // Explicitly ignore self-signed certs in a controlled way so that
        // audits of http sites and mixed environments still return data.
        rejectUnauthorized: false,
      },
      (res) => {
        const status = res.statusCode ?? 0;
        const location = res.headers.location;

        if (location && status >= 300 && status < 400) {
          res.resume();
          const next = new URL(location, url);
          if (redirects.length >= MAX_REDIRECTS) {
            clearTimeout(timer);
            reject(new Error("TOO_MANY_REDIRECTS"));
            return;
          }
          // Validate the redirect target before following.
          if (next.protocol !== "http:" && next.protocol !== "https:") {
            clearTimeout(timer);
            reject(new Error("BLOCKED_REDIRECT"));
            return;
          }
          assertSafeHost(next.hostname)
            .then(() => {
              clearTimeout(timer);
              redirects.push(url.href);
              return fetchHop(next, startedAt, redirects);
            })
            .then(resolve, reject);
          return;
        }

        // Non-HTML or too large guard.
        let size = 0;
        const chunks: Buffer[] = [];
        let tooLarge = false;

        res.on("data", (chunk: Buffer) => {
          size += chunk.length;
          if (size > MAX_BYTES) {
            tooLarge = true;
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
          if (tooLarge) {
            reject(new Error("RESPONSE_TOO_LARGE"));
            return;
          }
          const body = Buffer.concat(chunks).toString("utf8");
          resolve({
            status,
            headers: res.headers,
            body,
            finalUrl: url.href,
            responseTimeMs: Date.now() - startedAt,
          });
        });
      }
    );

    req.on("error", (err) => {
      clearTimeout(timer);
      if (err.name === "AbortError") {
        reject(new Error("TIMEOUT"));
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
