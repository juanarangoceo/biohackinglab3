import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { sql } from 'drizzle-orm';

// Load .env from the app directory
dotenv.config({ path: 'c:\\Users\\USUARIO\\Desarrollo\\Biohackinglab3.0\\Landingpage\\app\\.env' });

async function checkConnection() {
  const connectionString = process.env.DATABASE_URL;
  console.log('Testing connection to:', connectionString?.replace(/:([^@]+)@/, ':****@')); // Hide password in logs

  if (!connectionString) {
    console.error('❌ DATABASE_URL is missing in .env');
    process.exit(1);
  }

  const pool = new Pool({ connectionString });
  const db = drizzle(pool);

  try {
    console.log('1. Pinging database...');
    await db.execute(sql`SELECT 1`);
    console.log('✅ Connection successful!');

    console.log('2. Checking for "posts" table...');
    const result = await db.execute(sql`SELECT * FROM information_schema.tables WHERE table_name = 'posts'`);
    
    if (result.rows.length > 0) {
      console.log('✅ Table "posts" exists!');
    } else {
      console.error('❌ Table "posts" DOES NOT exist. You need to run the migration script.');
    }

  } catch (error) {
    console.error('❌ Connection failed:', error);
  } finally {
    await pool.end();
  }
}

checkConnection();
