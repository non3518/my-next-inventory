// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from "next/server"
import { query, queryOne } from "@/lib/db"
import { Product } from "../route"

type Params = { params: Promise<{ id: string }> }

// GET /api/products/[id] - ดึงสินค้าตาม ID
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params

    const product = await queryOne<Product>(
      "SELECT * FROM products WHERE id = $1",
      [id]
    )

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: product })
  } catch (error) {
    console.error("GET /api/products/[id] error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch product" },
      { status: 500 }
    )
  }
}

// PUT /api/products/[id] - แก้ไขสินค้า
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, description, price, quantity, category, image_url } = body

    // ตรวจสอบว่ามีสินค้านี้หรือไม่
    const existing = await queryOne<Product>(
      "SELECT id FROM products WHERE id = $1",
      [id]
    )

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      )
    }

    const sql = `
      UPDATE products 
      SET name = $1, description = $2, price = $3, quantity = $4, 
          category = $5, image_url = $6, updated_at = CURRENT_TIMESTAMP
      WHERE id = $7
      RETURNING *
    `
    const params_arr = [
      name,
      description || null,
      price,
      quantity || 0,
      category || null,
      image_url || null,
      id,
    ]

    const product = await queryOne<Product>(sql, params_arr)

    return NextResponse.json({ success: true, data: product })
  } catch (error) {
    console.error("PUT /api/products/[id] error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update product" },
      { status: 500 }
    )
  }
}

// DELETE /api/products/[id] - ลบสินค้า
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params

    // ตรวจสอบว่ามีสินค้านี้หรือไม่
    const existing = await queryOne<Product>(
      "SELECT id FROM products WHERE id = $1",
      [id]
    )

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      )
    }

    await query("DELETE FROM products WHERE id = $1", [id])

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    })
  } catch (error) {
    console.error("DELETE /api/products/[id] error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to delete product" },
      { status: 500 }
    )
  }
}