import { readFileSync } from 'fs';
import { join, resolve } from 'path';
import sqlite3 from 'sqlite3';
import { config } from 'dotenv';

// Load environment variables based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? '.env' : '.env.dev';
config({ path: resolve(__dirname, '..', '..', envFile) });

// Paths must be based on compiled directory structure (usually in dist/)
const dbPath = resolve(__dirname, '..', process.env.DB_PATH || './dev.sqlite');

const schemaPath = join(__dirname, '..', 'schema', 'schema.sql');
const seedPath = join(__dirname, '..', 'seed', 'order.sql');

const schema = readFileSync(schemaPath, 'utf-8');
const seed = readFileSync(seedPath, 'utf-8');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to open DB:', err.message);
    return;
  }

  db.exec(schema, (err) => {
    if (err) {
      console.error('Failed to run schema:', err.message);
      return;
    }

    db.exec(seed, (err) => {
      if (err) {
        console.error('Failed to seed DB:', err.message);
        return;
      }

      console.log('✅ Database initialized with mock data.');
    });
  });
});
