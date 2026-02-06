// app/(dashboard)/dashboard/page.tsx
import { cookies } from "next/headers"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Package, DollarSign, TrendingUp, Users } from "lucide-react"

async function getStats() {
  // ในโปรเจกต์จริงดึงจาก Database
  return {
    totalProducts: 150,
    totalValue: 125000,
    lowStock: 12,
    categories: 8,
  }
}

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get("session")
  const user = session ? JSON.parse(session.value) : null
  const stats = await getStats()

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">👋 สวัสดี, {user?.name}</h1>
        <p className="text-gray-500 mt-1">
          ยินดีต้อนรับสู่ระบบจัดการคลังสินค้า
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">สินค้าทั้งหมด</CardTitle>
            <Package className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-gray-500">รายการ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">มูลค่ารวม</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ฿{stats.totalValue.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">บาท</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">สินค้าใกล้หมด</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">
              {stats.lowStock}
            </div>
            <p className="text-xs text-gray-500">รายการ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">หมวดหมู่</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.categories}</div>
            <p className="text-xs text-gray-500">หมวดหมู่</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>🚀 Quick Actions</CardTitle>
          <CardDescription>ทางลัดสำหรับจัดการคลังสินค้า</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <a
            href="/products"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
          >
            📦 จัดการสินค้า
          </a>
          <a
            href="/products?action=add"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:opacity-90"
          >
            ➕ เพิ่มสินค้าใหม่
          </a>
        </CardContent>
      </Card>
    </div>
  )
}