import { readFileSync } from 'fs';
import { join, resolve } from 'path';
import sqlite3 from 'sqlite3';

const dbPath = resolve(__dirname, '..', './dev.sqlite');
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
