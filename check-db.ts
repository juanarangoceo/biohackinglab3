import { pgTable, uuid, varchar, text, timestamp, jsonb, real, boolean } from "drizzle-orm/pg-core";
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { sql } from "drizzle-orm";

dotenv.config({ path: '.env' });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("No DATABASE_URL found");
  process.exit(1);
}

const pool = new Pool({ connectionString });
const db = drizzle(pool);

async function main() {
  console.log("Connecting to:", connectionString?.replace(/:([^@]+)@/, ':****@'));
  
  try {
    const res = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log("Tables in public schema:");
    res.rows.forEach(r => console.log(` - ${r.table_name}`));

    const subscribersTable = res.rows.find(r => r.table_name === 'subscribers');
    if (subscribersTable) {
        console.log("\nFound 'subscribers' table. Checking columns...");
        
        // Try Insertion
        const testEmail = `test-${Date.now()}@example.com`;
        console.log(`\nAttempting to insert test user: ${testEmail}`);
        
        try {
            await pool.query(`
                INSERT INTO subscribers (email, source, tags, status)
                VALUES ($1, 'test-script', '["test"]', 'active')
            `, [testEmail]);
            console.log("✅ Insert successful!");
            
            const count = await pool.query('SELECT count(*) FROM subscribers');
            console.log(`Typical Row Count: ${count.rows[0].count}`);
        } catch (insertError) {
            console.error("❌ Insert FAILED:", insertError);
        }

    } else {
        console.log("\n❌ 'subscribers' table NOT found!");
    }

  } catch (err) {
    console.error("Error querying database:", err);
  } finally {
    await pool.end();
  }
}

main();
