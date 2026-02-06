// app/actions/product-actions.ts
"use server"

import { revalidatePath } from "next/cache"
import { query, queryOne } from "@/lib/db"

export type Product = {
  id: number
  name: string
  description: string | null
  price: number
  quantity: number
  category: string | null
  image_url: string | null
  created_at: Date
  updated_at: Date
}

// ดึงสินค้าทั้งหมด
export async function getProducts(search?: string, category?: string) {
  let sql = "SELECT * FROM products"
  const params: unknown[] = []
  const conditions: string[] = []

  if (search) {
    conditions.push(`name ILIKE $${params.length + 1}`)
    params.push(`%${search}%`)
  }

  if (category) {
    conditions.push(`category = $${params.length + 1}`)
    params.push(category)
  }

  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ")
  }

  sql += " ORDER BY created_at DESC"

  return query<Product>(sql, params)
}

// ดึงสินค้าตาม ID
export async function getProduct(id: number) {
  return queryOne<Product>("SELECT * FROM products WHERE id = $1", [id])
}

// เพิ่มสินค้า
export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const price = parseFloat(formData.get("price") as string)
  const quantity = parseInt(formData.get("quantity") as string) || 0
  const category = formData.get("category") as string

  await query(
    `INSERT INTO products (name, description, price, quantity, category)
     VALUES ($1, $2, $3, $4, $5)`,
    [name, description || null, price, quantity, category || null]
  )

  revalidatePath("/products")
  return { success: true }
}

// แก้ไขสินค้า
export async function updateProduct(id: number, formData: FormData) {
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const price = parseFloat(formData.get("price") as string)
  const quantity = parseInt(formData.get("quantity") as string) || 0
  const category = formData.get("category") as string

  await query(
    `UPDATE products 
     SET name = $1, description = $2, price = $3, quantity = $4, 
         category = $5, updated_at = CURRENT_TIMESTAMP
     WHERE id = $6`,
    [name, description || null, price, quantity, category || null, id]
  )

  revalidatePath("/products")
  return { success: true }
}

// ลบสินค้า
export async function deleteProduct(id: number) {
  await query("DELETE FROM products WHERE id = $1", [id])
  revalidatePath("/products")
  return { success: true }
}

// ดึงหมวดหมู่ทั้งหมด
export async function getCategories() {
  const result = await query<{ category: string }>(
    "SELECT DISTINCT category FROM products WHERE category IS NOT NULL"
  )
  return result.map((r) => r.category)
}