import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

// Don't throw check to allow build to pass without env var
// The app will still fail at runtime if DB is accessed without valid URL
const connectionString = process.env.DATABASE_URL || "postgres://placeholder:placeholder@localhost:5432/placeholder";

if (!process.env.DATABASE_URL) {
  console.warn("⚠️ DATABASE_URL is not defined used placeholder. DB operations will fail.");
}

const pool = new Pool({
  connectionString,
});

export const db = drizzle(pool);
