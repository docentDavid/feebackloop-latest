"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HiUserGroup, HiUserAdd, HiAcademicCap, HiCalendar, HiUsers, HiCog } from "react-icons/hi"

export function AdminSidebar() {
  const pathname = usePathname()

  const isActive = (path) => {
    return pathname === path
  }

  const menuItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: HiCog,
    },
    {
      name: "Students",
      href: "/admin/students",
      icon: HiUserGroup,
    },
    {
      name: "Import Students",
      href: "/admin/students/import",
      icon: HiUserAdd,
    },
    {
      name: "Learning Outcomes",
      href: "/admin/outcomes",
      icon: HiAcademicCap,
    },
    {
      name: "Assessment Moments",
      href: "/admin/moments",
      icon: HiCalendar,
    },
    {
      name: "User Management",
      href: "/admin/users",
      icon: HiUsers,
    },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 hidden md:block">
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">Admin Panel</h2>
          <p className="text-sm text-gray-500">Manage your feedback system</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive(item.href) ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            <p>FeedbackLoop Admin</p>
            <p>Version 1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  )
}

