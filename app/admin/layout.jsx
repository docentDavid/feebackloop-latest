"use client"
import { useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { AdminSidebar } from "@/components/AdminSidebar"
import { useAppStore } from "@/lib/store"

export default function AdminLayout({ children }) {
  const router = useRouter()
  const user = useAppStore((state) => state.user)

  // No authentication check, allow access to admin pages

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="flex-1 flex">
        <AdminSidebar />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

