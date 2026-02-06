// app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server"
import { query, queryOne } from "@/lib/db"

// Type สำหรับ Product
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

// GET /api/products - ดึงสินค้าทั้งหมด
export async function GET(request: NextRequest) {
  try {
    // ดึง Query Parameters
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    let sql = "SELECT * FROM products"
    const params: unknown[] = []
    const conditions: string[] = []

    // Filter by category
    if (category) {
      conditions.push(`category = $${params.length + 1}`)
      params.push(category)
    }

    // Search by name
    if (search) {
      conditions.push(`name ILIKE $${params.length + 1}`)
      params.push(`%${search}%`)
    }

    if (conditions.length > 0) {
      sql += " WHERE " + conditions.join(" AND ")
    }

    sql += " ORDER BY created_at DESC"

    const products = await query<Product>(sql, params)

    return NextResponse.json({
      success: true,
      data: products,
      total: products.length,
    })
  } catch (error) {
    console.error("GET /api/products error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    )
  }
}

// POST /api/products - เพิ่มสินค้าใหม่
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, price, quantity, category, image_url } = body

    // Validation
    if (!name || !price) {
      return NextResponse.json(
        { success: false, error: "Name and price are required" },
        { status: 400 }
      )
    }

    const sql = `
      INSERT INTO products (name, description, price, quantity, category, image_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `
    const params = [
      name,
      description || null,
      price,
      quantity || 0,
      category || null,
      image_url || null,
    ]

    const product = await queryOne<Product>(sql, params)

    return NextResponse.json(
      { success: true, data: product },
      { status: 201 }
    )
  } catch (error) {
    console.error("POST /api/products error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 }
    )
  }
}