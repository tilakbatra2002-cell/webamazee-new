import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';
import { env } from '../config/env.js';

let browserPromise = null;
let sparticuz = null;

/**
 * Resolves a Chromium executable, in priority order:
 *   1. CHROMIUM_PATH env var (Docker / Render images with system Chrome)
 *   2. @sparticuz/chromium bundled build (works on Vercel/Lambda/Render and here)
 *
 * The @sparticuz build is compiled against Amazon Linux 2023, so on other
 * distros we also inflate its bundled shared libraries and prepend them to
 * LD_LIBRARY_PATH before launching.
 */
async function resolveExecutable() {
  if (env.chromiumPath && fs.existsSync(env.chromiumPath)) {
    return { executablePath: env.chromiumPath, args: [] };
  }

  if (!sparticuz) sparticuz = (await import('@sparticuz/chromium')).default;

  // The package restricts its "exports" map, so resolve the install directory
  // from the entry point rather than from package.json.
  const entry = fileURLToPath(import.meta.resolve('@sparticuz/chromium'));
  const pkgDir = path.resolve(path.dirname(entry), '..');
  const al2023 = path.join(pkgDir, 'bin', 'al2023.tar.br');

  if (fs.existsSync(al2023)) {
    try {
      const { inflate } = await import(path.join(pkgDir, 'build', 'lambdafs.js'));
      const libDir = await inflate(al2023);
      const resolvedLib = path.join(libDir, 'lib');
      const current = process.env.LD_LIBRARY_PATH || '';
      if (!current.split(':').includes(resolvedLib)) {
        process.env.LD_LIBRARY_PATH = [resolvedLib, current].filter(Boolean).join(':');
      }
    } catch (err) {
      console.warn('[browser] could not stage bundled libraries:', err.message);
    }
  }

  return { executablePath: await sparticuz.executablePath(), args: sparticuz.args };
}

/** Lazily launches and reuses one headless browser for the process. */
export async function getBrowser() {
  if (browserPromise) {
    const browser = await browserPromise.catch(() => null);
    if (browser && browser.connected) return browser;
    browserPromise = null;
  }

  browserPromise = (async () => {
    const { executablePath, args } = await resolveExecutable();
    return puppeteer.launch({
      executablePath,
      headless: 'shell',
      args: [...new Set([...args, '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--font-render-hinting=none'])],
    });
  })();

  return browserPromise;
}

export async function closeBrowser() {
  if (!browserPromise) return;
  const browser = await browserPromise.catch(() => null);
  browserPromise = null;
  if (browser) await browser.close().catch(() => {});
}

/** Runs `fn` with a fresh page and always cleans it up. */
export async function withPage(fn) {
  const browser = await getBrowser();
  const page = await browser.newPage();
  try {
    // The invoice document is self-contained (inlined fonts + data-URI logo).
    // Only https is additionally permitted, for remotely hosted logos.
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const url = req.url();
      const allowed =
        url.startsWith('data:') ||
        url.startsWith('about:') ||
        url.startsWith('blob:') ||
        url.startsWith('https:');
      if (allowed) req.continue().catch(() => {});
      else req.abort().catch(() => {});
    });
    return await fn(page);
  } finally {
    await page.close().catch(() => {});
  }
}
