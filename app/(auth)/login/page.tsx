// app/(auth)/login/page.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Zod Schema สำหรับ Validation
const loginSchema = z.object({
  email: z.string().email("กรุณากรอกอีเมลให้ถูกต้อง"),
  password: z.string().min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@example.com",
      password: "password123",
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (!result.success) {
        setError(result.error)
        return
      }

      // Login สำเร็จ - ไปหน้า Dashboard
      router.push("/dashboard")
      router.refresh()
    } catch {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-4">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">🔐 เข้าสู่ระบบ</CardTitle>
        <CardDescription>
          ระบบจัดการคลังสินค้า Inventory Management
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">อีเมล</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">รหัสผ่าน</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          ทดสอบ: admin@example.com / password123
        </p>
      </CardContent>
    </Card>
  )
}