"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAppStore } from "@/lib/store"
import { HiHome, HiAcademicCap, HiCalendar, HiLogout } from "react-icons/hi"
import { MdOutlineFeed } from "react-icons/md"

export function StudentHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const user = useAppStore((state) => state.user)
  const logout = useAppStore((state) => state.logout)

  // Check if the current route is active
  const isActive = (path) => {
    return pathname === path
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleLogoClick = () => {
    // Navigate to student landing page
    router.push("/student-landing")
  }

  return (
    <header className="w-full bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-10 transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button onClick={handleLogoClick} className="flex items-center text-blue-500 font-medium text-lg">
              <MdOutlineFeed className="h-6 w-6" />
              <span className="ml-2">FeedbackLoop</span>
              <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Student Portal</span>
            </button>

            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <Link
                  href="/student-landing"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive("/student-landing") ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <HiHome className="w-4 h-4" />
                    <span>Dashboard</span>
                  </div>
                </Link>

                <Link
                  href="/student-view/portfolio"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive("/student-view/portfolio") ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <HiAcademicCap className="w-4 h-4" />
                    <span>My Portfolio</span>
                  </div>
                </Link>

                <Link
                  href="/student-view/schedule"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive("/student-view/schedule") ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <HiCalendar className="w-4 h-4" />
                    <span>Assessment Schedule</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Student
            </span>
            <div className="text-sm font-normal px-3 py-1">{user?.name}</div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
            >
              Logout
              <HiLogout className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="md:hidden border-t border-gray-100">
        <div className="grid grid-cols-3 divide-x divide-gray-100">
          <Link
            href="/student-landing"
            className={`flex flex-col items-center justify-center py-2 text-xs font-medium ${
              isActive("/student-landing") ? "text-blue-500" : "text-gray-500"
            }`}
          >
            <HiHome className="w-5 h-5 mb-1" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/student-view/portfolio"
            className={`flex flex-col items-center justify-center py-2 text-xs font-medium ${
              isActive("/student-view/portfolio") ? "text-blue-500" : "text-gray-500"
            }`}
          >
            <HiAcademicCap className="w-5 h-5 mb-1" />
            <span>Portfolio</span>
          </Link>

          <Link
            href="/student-view/schedule"
            className={`flex flex-col items-center justify-center py-2 text-xs font-medium ${
              isActive("/student-view/schedule") ? "text-blue-500" : "text-gray-500"
            }`}
          >
            <HiCalendar className="w-5 h-5 mb-1" />
            <span>Schedule</span>
          </Link>
        </div>
      </div>
    </header>
  )
}

