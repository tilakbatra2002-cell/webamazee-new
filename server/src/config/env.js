import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const SERVER_ROOT = path.resolve(__dirname, '../..');
export const REPO_ROOT = path.resolve(SERVER_ROOT, '..');

dotenv.config({ path: path.join(SERVER_ROOT, '.env') });

const required = (key, fallback) => {
  const value = process.env[key] ?? fallback;
  if (value === undefined || value === '') {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  port: Number(process.env.PORT || 5001),
  mongoUri: required('MONGODB_URI', 'mongodb://127.0.0.1:27017/webamazee_invoices'),
  jwtSecret: required(
    'JWT_SECRET',
    process.env.NODE_ENV === 'production' ? undefined : 'dev-only-insecure-secret-change-me'
  ),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  serverUrl: process.env.SERVER_URL || `http://localhost:${Number(process.env.PORT || 5001)}`,
  // Comma separated list of extra allowed origins (e.g. preview hosts).
  extraOrigins: (process.env.EXTRA_CORS_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  adminEmail: process.env.ADMIN_EMAIL || 'admin@webamazee.com',
  adminPassword: process.env.ADMIN_PASSWORD || '',
  // Optional explicit Chromium path (Render/Railway/Docker images).
  chromiumPath: process.env.CHROMIUM_PATH || '',
  maxUploadBytes: Number(process.env.MAX_UPLOAD_BYTES || 2 * 1024 * 1024),
};
