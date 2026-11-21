import fs from "fs";
import path from "path";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import { ObjectId } from "mongodb";
import { z } from "zod";
import { getCollections, getMongoClient } from "@/lib/db/connection";
import { isMongoConfigured } from "@/lib/cms/config";
import { hashPassword } from "@/lib/cms/password";
import { strongPasswordSchema } from "@/lib/cms/validation";

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

  if (!isMongoConfigured()) {
    console.error("Error: MONGODB_URI must be configured before running cms:bootstrap-admin.");
    process.exit(1);
  }

  const { admins } = await getCollections();
  const existingSuperAdmin = await admins.findOne({ role: "super_admin" });
  if (existingSuperAdmin) {
    console.error(
      `Aborted: A Super Admin account already exists (${existingSuperAdmin.email}). Duplicate Super Admin bootstrapping is blocked.`
    );
    await getMongoClient().then((c) => c.close());
    process.exit(1);
  }

  let name = process.env.BOOTSTRAP_ADMIN_NAME?.trim() || "";
  let email = process.env.BOOTSTRAP_ADMIN_EMAIL?.trim().toLowerCase() || "";
  let password = process.env.BOOTSTRAP_ADMIN_PASSWORD || "";

  if (!name || !email || !password) {
    const rl = readline.createInterface({ input, output });
    try {
      if (!name) {
        name = (await rl.question("Super Admin Full Name: ")).trim();
      }
      if (!email) {
        email = (await rl.question("Super Admin Work Email: ")).trim().toLowerCase();
      }
      if (!password) {
        password = await rl.question(
          "Initial Strong Password (>=10 chars, upper, lower, number/symbol): "
        );
      }
    } finally {
      rl.close();
    }
  }

  const emailCheck = z.string().email().safeParse(email);
  if (!name || name.length < 2) {
    console.error("Error: Name must be at least 2 characters.");
    process.exit(1);
  }
  if (!emailCheck.success) {
    console.error("Error: Invalid email address.");
    process.exit(1);
  }

  const passCheck = strongPasswordSchema.safeParse(password);
  if (!passCheck.success) {
    console.error(`Error: ${passCheck.error.issues[0]?.message || "Weak password."}`);
    process.exit(1);
  }

  const emailConflict = await admins.findOne({ email });
  if (emailConflict) {
    console.error(`Error: An admin account already exists for ${email}.`);
    process.exit(1);
  }

  const passwordHash = await hashPassword(password);
  const now = new Date();
  await admins.insertOne({
    _id: new ObjectId(),
    name,
    email,
    passwordHash,
    role: "super_admin",
    canPublish: true,
    isActive: true,
    tokenVersion: 1,
    lastLoginAt: null,
    createdAt: now,
    updatedAt: now,
    createdBy: "cli:bootstrap-super-admin",
  });

  console.log(`Success: Initial Super Admin account created for ${email}.`);
  await getMongoClient().then((c) => c.close());
}

main().catch((err) => {
  console.error("Bootstrap failed:", err instanceof Error ? err.message : err);
  process.exit(1);
});
