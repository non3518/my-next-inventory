// app/(dashboard)/layout.tsx
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Sidebar } from "@/components/sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // ตรวจสอบ Authentication
  const cookieStore = await cookies()
  const session = cookieStore.get("session")

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <main className="lg:ml-64 p-4 lg:p-8">{children}</main>
    </div>
  )
}