"use client"

import { Header } from "@/components/Header"
import { StudentHeader } from "@/components/StudentHeader"
import { useAppStore } from "@/lib/store"
import { usePathname } from "next/navigation"

export default function StudentViewLayout({ children }) {
  const user = useAppStore((state) => state.user)
  const pathname = usePathname()

  // Determine if the user is a student or admin/teacher
  const isStudent = user?.role === "student"

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Use StudentHeader for students, regular Header for admin/teachers */}
      {isStudent ? <StudentHeader /> : <Header />}

      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">{children}</main>

      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">© 2025 FeedbackLoop Student Portal</p>
            <p className="text-sm text-gray-500">Need help? Contact your teacher</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

