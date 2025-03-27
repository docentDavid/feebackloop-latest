"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAppStore } from "@/lib/store"
import { HiHome, HiMicrophone, HiUserGroup, HiBookOpen, HiCog, HiLogout } from "react-icons/hi"

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const user = useAppStore((state) => state.user)
  const selectStudent = useAppStore((state) => state.selectStudent)
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
    // Navigate to landing page
    router.push("/")
  }

  return (
    <header className="w-full bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-10 transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button onClick={handleLogoClick} className="flex items-center space-x-2 text-blue-500 font-medium text-lg">
              <HiBookOpen className="w-6 h-6" />
              <span>FeedbackLoop</span>
            </button>

            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive("/dashboard") ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => selectStudent(null)}
                >
                  <div className="flex items-center space-x-2">
                    <HiHome className="w-4 h-4" />
                    <span>Dashboard</span>
                  </div>
                </Link>

                <Link
                  href="/record"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive("/record") ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <HiMicrophone className="w-4 h-4" />
                    <span>Record</span>
                  </div>
                </Link>

                <Link
                  href="/students"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive("/students") ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <HiUserGroup className="w-4 h-4" />
                    <span>Students</span>
                  </div>
                </Link>

                <Link
                  href="/student-view"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive("/student-view") ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <HiBookOpen className="w-4 h-4" />
                    <span>Student View</span>
                  </div>
                </Link>

                {user && user.isAdmin && (
                  <Link
                    href="/admin"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      pathname.startsWith("/admin") ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <HiCog className="w-4 h-4" />
                      <span>Admin</span>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {user?.role === "admin" ? "Admin" : user?.role === "teacher" ? "Teacher" : "Student"}
            </span>
            <div className="relative group">
              <button className="text-sm font-normal px-3 py-1 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors">
                {user?.name}
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                {user?.isAdmin && (
                  <Link href="/admin/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile Settings
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    <HiLogout className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="md:hidden border-t border-gray-100">
        <div className="grid grid-cols-5 divide-x divide-gray-100">
          <Link
            href="/dashboard"
            className={`flex flex-col items-center justify-center py-2 text-xs font-medium ${
              isActive("/dashboard") ? "text-blue-500" : "text-gray-500"
            }`}
            onClick={() => selectStudent(null)}
          >
            <HiHome className="w-5 h-5 mb-1" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/record"
            className={`flex flex-col items-center justify-center py-2 text-xs font-medium ${
              isActive("/record") ? "text-blue-500" : "text-gray-500"
            }`}
          >
            <HiMicrophone className="w-5 h-5 mb-1" />
            <span>Record</span>
          </Link>

          <Link
            href="/students"
            className={`flex flex-col items-center justify-center py-2 text-xs font-medium ${
              isActive("/students") ? "text-blue-500" : "text-gray-500"
            }`}
          >
            <HiUserGroup className="w-5 h-5 mb-1" />
            <span>Students</span>
          </Link>

          <Link
            href="/student-view"
            className={`flex flex-col items-center justify-center py-2 text-xs font-medium ${
              isActive("/student-view") ? "text-blue-500" : "text-gray-500"
            }`}
          >
            <HiBookOpen className="w-5 h-5 mb-1" />
            <span>Student</span>
          </Link>

          {user && user.isAdmin && (
            <Link
              href="/admin"
              className={`flex flex-col items-center justify-center py-2 text-xs font-medium ${
                pathname.startsWith("/admin") ? "text-blue-500" : "text-gray-500"
              }`}
            >
              <HiCog className="w-5 h-5 mb-1" />
              <span>Admin</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

