import fs from "fs";
import path from "path";
import { posts as legacyPosts } from "@/lib/blogs";
import { isMongoConfigured } from "@/lib/cms/config";
import { migrateLegacyBlogPosts } from "@/lib/cms/migrate-posts";
import { getMongoClient } from "@/lib/db/connection";

function loadEnvFile(filename: string): void {
  const fullPath = path.resolve(process.cwd(), filename);
  if (!fs.existsSync(fullPath)) return;
  const lines = fs.readFileSync(fullPath, "utf8").split(/\r?\n/);
  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eqIdx = line.indexOf("=");
    if (eqIdx === -1) continue;
    const key = line.slice(0, eqIdx).trim();
    let val = line.slice(eqIdx + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) {
      process.env[key] = val;
    }
  }
}

async function main(): Promise<void> {
  loadEnvFile(".env.local");
  loadEnvFile(".env");

  const args = new Set(process.argv.slice(2));
  const dryRun = args.has("--dry-run");
  const overwrite = args.has("--overwrite");
  const confirmOverwrite = args.has("--confirm-overwrite");

  if (overwrite && !confirmOverwrite) {
    console.error(
      "Aborted: --overwrite requires explicit confirmation flag --confirm-overwrite. Take a MongoDB backup/snapshot before overwriting existing documents."
    );
    process.exit(1);
  }

  if (!isMongoConfigured()) {
    if (dryRun) {
      console.log(
        `[Dry Run - Offline Source Verification] MONGODB_URI is not configured.`
      );
      console.log(`Source posts found in src/lib/blogs.ts: ${legacyPosts.length}`);
      for (const p of legacyPosts) {
        console.log(
          `  - ${p.slug} | ${p.category} | ${p.date} | ${p.content.length} blocks | image: ${p.image}`
        );
      }
      process.exit(0);
    }
    console.error("Error: MONGODB_URI must be configured to run migration.");
    process.exit(1);
  }

  if (overwrite && !dryRun) {
    console.log(
      "Reminder: Ensure you have a recent MongoDB Atlas snapshot or mongodump backup before overwriting existing blog documents."
    );
  }

  const report = await migrateLegacyBlogPosts({ dryRun, overwrite });
  console.log(JSON.stringify(report, null, 2));

  await getMongoClient().then((c) => c.close());
}

main().catch((err) => {
  console.error("Migration failed:", err instanceof Error ? err.message : err);
  process.exit(1);
});
