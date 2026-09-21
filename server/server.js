import { createApp } from './src/app.js';
import { env } from './src/config/env.js';
import { connectDatabase, disconnectDatabase } from './src/config/database.js';
import { closeBrowser } from './src/services/browser.js';

async function main() {
  await connectDatabase();
  console.log('[server] MongoDB connected');

  const app = createApp();
  const server = app.listen(env.port, '0.0.0.0', () => {
    console.log(`[server] Webamazee Invoice API listening on http://0.0.0.0:${env.port}`);
  });

  const shutdown = async (signal) => {
    console.log(`[server] ${signal} received, shutting down`);
    server.close();
    await closeBrowser();
    await disconnectDatabase();
    process.exit(0);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

main().catch((err) => {
  console.error('[server] fatal startup error:', err);
  process.exit(1);
});
