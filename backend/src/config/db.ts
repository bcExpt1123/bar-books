import { Database } from 'sqlite3';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? '.env' : '.env.dev';
config({ path: resolve(__dirname, '..', '..', envFile) });

const dbPath = resolve(__dirname, '..', process.env.DB_PATH || 'db/dev.sqlite');

export const db = new Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to connect to SQLite:', err.message);
  } else {
    console.log('✅ Connected to SQLite');
  }
});
