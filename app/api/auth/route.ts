// app/api/auth/route.ts
import { NextRequest, NextResponse } from "next/server"
import { queryOne } from "@/lib/db"
import { cookies } from "next/headers"

type User = {
  id: number
  email: string
  password: string
  name: string
  role: string
}

// POST /api/auth - Login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      )
    }

    // ค้นหา User จาก Database
    // ⚠️ ในโปรเจกต์จริงต้อง Hash Password ด้วย bcrypt
    const user = await queryOne<User>(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    )

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      )
    }

    // สร้าง Session Cookie
    const cookieStore = await cookies()
    cookieStore.set("session", JSON.stringify({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("POST /api/auth error:", error)
    return NextResponse.json(
      { success: false, error: "Authentication failed" },
      { status: 500 }
    )
  }
}

// DELETE /api/auth - Logout
export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
  
  return NextResponse.json({ success: true, message: "Logged out" })
}

// GET /api/auth - Get Current User
export async function GET() {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get("session")

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      )
    }

    const user = JSON.parse(session.value)
    return NextResponse.json({ success: true, data: user })
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid session" },
      { status: 401 }
    )
  }
}