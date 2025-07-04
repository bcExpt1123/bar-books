import { Database } from 'sqlite3';
import { config } from 'dotenv';
import { resolve } from 'path';

config();

const dbPath = resolve(__dirname, '..', process.env.DB_PATH || 'db/dev.sqlite');

export const db = new Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to connect to SQLite:', err.message);
  } else {
    console.log('✅ Connected to SQLite');
  }
});
