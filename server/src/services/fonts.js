import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

/**
 * Fonts are embedded as base64 data URIs inside the invoice HTML so that
 * headless Chromium never depends on network access (Google Fonts) and the
 * PDF/PNG output always renders with the correct Webamazee typography.
 *
 * `latin-ext` is included because the Rupee sign (U+20B9) lives there.
 */
const FACES = [
  { pkg: '@fontsource/bricolage-grotesque', family: 'Bricolage Grotesque', weights: [600, 700], subsets: ['latin', 'latin-ext'] },
  { pkg: '@fontsource/manrope', family: 'Manrope', weights: [400, 500, 600, 700], subsets: ['latin', 'latin-ext'] },
];

let cachedCss = null;

async function fileToDataUri(file) {
  const buf = await fs.readFile(file);
  return `data:font/woff2;base64,${buf.toString('base64')}`;
}

/** Builds (once per process) a @font-face stylesheet with inlined woff2 data. */
export async function getEmbeddedFontCss() {
  if (cachedCss) return cachedCss;

  const blocks = [];
  for (const face of FACES) {
    const pkgDir = path.dirname(require.resolve(`${face.pkg}/package.json`));
    const slug = face.pkg.split('/')[1];
    for (const subset of face.subsets) {
      for (const weight of face.weights) {
        const file = path.join(pkgDir, 'files', `${slug}-${subset}-${weight}-normal.woff2`);
        try {
          const uri = await fileToDataUri(file);
          blocks.push(
            `@font-face{font-family:'${face.family}';font-style:normal;font-weight:${weight};font-display:block;src:url(${uri}) format('woff2');}`
          );
        } catch {
          // Subset/weight not shipped for this family - skip silently.
        }
      }
    }
  }

  cachedCss = blocks.join('\n');
  return cachedCss;
}
