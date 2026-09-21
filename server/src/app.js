import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

export function createApp() {
  const app = express();

  app.set('trust proxy', 1);
  app.disable('x-powered-by');

  app.use(
    helmet({
      // The API only serves JSON and binary downloads; CSP is enforced by the client host.
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    })
  );
  app.use(compression());

  const allowedOrigins = new Set([env.clientUrl, ...env.extraOrigins].filter(Boolean));
  app.use(
    cors({
      origin(origin, callback) {
        // Same-origin/server-to-server requests have no Origin header.
        if (!origin) return callback(null, true);
        if (allowedOrigins.has(origin)) return callback(null, true);
        // Sandbox/preview hosts and Vercel previews.
        if (/^https:\/\/[\w-]+\.(e2b\.app|vercel\.app)$/.test(origin)) return callback(null, true);
        if (!env.isProduction && /^http:\/\/localhost:\d+$/.test(origin)) return callback(null, true);
        return callback(new Error(`Origin not allowed by CORS: ${origin}`));
      },
      credentials: false,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    })
  );

  // Logo uploads are sent as base64 data URLs, so allow a slightly larger body.
  app.use(express.json({ limit: '6mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  if (!env.isProduction) app.use(morgan('dev'));

  app.use(
    '/api',
    rateLimit({
      windowMs: 60 * 1000,
      limit: 300,
      standardHeaders: 'draft-7',
      legacyHeaders: false,
    })
  );

  app.use('/api', routes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
