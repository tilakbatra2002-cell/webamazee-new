import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * Flat ESLint config for Next.js 16 (which no longer ships `next lint`).
 * Uses the native flat configs exported by `eslint-config-next`.
 */
const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "next-env.d.ts",
      "tsconfig.tsbuildinfo",
      "public/**",
    ],
  },
];

export default eslintConfig;
