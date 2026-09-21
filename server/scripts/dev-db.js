/**
 * Local development database.
 *
 * Starts a MongoDB wire-protocol compatible server (SQLite backed) so the app
 * can be run end-to-end without installing MongoDB locally. Production and
 * staging are expected to use a real MongoDB / MongoDB Atlas instance via
 * MONGODB_URI - nothing in src/ depends on this script.
 *
 *   npm run dev:db
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const port = process.env.DEV_DB_PORT || '27017';
const dataDir = path.join(__dirname, '..', '.devdata');

let bin;
try {
  bin = require.resolve('@rckflr/easydb-server/bin/easydb-server.js');
} catch {
  console.error(
    '[dev-db] @rckflr/easydb-server is not installed. Run `npm install` inside /server,\n' +
      '         or point MONGODB_URI at a real MongoDB instance instead.'
  );
  process.exit(1);
}

console.log(`[dev-db] starting development database on mongodb://127.0.0.1:${port}`);
console.log(`[dev-db] data directory: ${dataDir}`);

const child = spawn(
  process.execPath,
  [bin, '--port', port, '--adapter', 'sqlite', '--data', dataDir],
  { stdio: 'inherit' }
);

const stop = () => child.kill('SIGTERM');
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
child.on('exit', (code) => process.exit(code ?? 0));
