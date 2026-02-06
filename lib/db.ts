// lib/db.ts
import { Pool } from "pg"

// สร้าง Connection Pool
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME || "inventory_db",
  ssl: process.env.DB_SSLMODE === "require" ? { rejectUnauthorized: false } : false,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

// ทดสอบ Connection
pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL")
})

pool.on("error", (err) => {
  console.error("❌ PostgreSQL Error:", err)
})

// Helper function สำหรับ Query
export async function query<T>(text: string, params?: unknown[]): Promise<T[]> {
  const client = await pool.connect()
  try {
    const result = await client.query(text, params)
    return result.rows as T[]
  } finally {
    client.release()
  }
}

// Helper function สำหรับ Single Row
export async function queryOne<T>(
  text: string,
  params?: unknown[]
): Promise<T | null> {
  const rows = await query<T>(text, params)
  return rows[0] || null
}

export default pool