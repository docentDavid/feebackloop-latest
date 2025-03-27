"use client"

import { useAppStore } from "@/lib/store"
import { HiUserGroup, HiAcademicCap, HiCalendar, HiUsers } from "react-icons/hi"
import Link from "next/link"

export default function AdminDashboard() {
  const students = useAppStore((state) => state.students)
  const outcomes = useAppStore((state) => state.outcomes)
  const moments = useAppStore((state) => state.moments)
  const users = useAppStore((state) => state.users)

  const stats = [
    {
      name: "Total Students",
      value: students.length,
      icon: HiUserGroup,
      href: "/admin/students",
      color: "bg-blue-500",
    },
    {
      name: "Learning Outcomes",
      value: outcomes.length,
      icon: HiAcademicCap,
      href: "/admin/outcomes",
      color: "bg-indigo-500",
    },
    {
      name: "Assessment Moments",
      value: moments.length,
      icon: HiCalendar,
      href: "/admin/moments",
      color: "bg-purple-500",
    },
    {
      name: "Users",
      value: users.length,
      icon: HiUsers,
      href: "/admin/users",
      color: "bg-pink-500",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Manage students, learning outcomes, assessment moments, and users.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-white overflow-hidden shadow rounded-lg transition-all hover:shadow-md"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-3 ${stat.color} text-white`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <div className="font-medium text-blue-600 hover:text-blue-500">View all</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg">
          <div className="px-5 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-5">
            <div className="text-center py-8 text-gray-500">
              <p>Activity tracking will be implemented in a future update.</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-5 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/admin/students/import"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Import Students
              </Link>
              <Link
                href="/admin/students"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Manage Students
              </Link>
              <Link
                href="/admin/outcomes"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Edit Outcomes
              </Link>
              <Link
                href="/admin/moments"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Manage Moments
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

