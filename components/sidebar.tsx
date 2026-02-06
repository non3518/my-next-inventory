// components/sidebar.tsx
"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  LayoutDashboard,
  Package,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "สินค้า",
    href: "/products",
    icon: Package,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" })
    router.push("/login")
    router.refresh()
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-lg shadow"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 border-r transform transition-transform lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b">
            <h1 className="text-xl font-bold">📦 Inventory</h1>
          </div>

          {/* Menu */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                )}
              >
                <item.icon size={20} />
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Theme</span>
              <ThemeToggle />
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleLogout}
            >
              <LogOut size={20} className="mr-2" />
              ออกจากระบบ
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay for Mobile */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/50"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  )
}