"use client"

import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/store"
import { HiAcademicCap, HiCalendar, HiChartBar, HiBookOpen } from "react-icons/hi"

export default function StudentLanding() {
  const router = useRouter()
  const user = useAppStore((state) => state.user)
  const students = useAppStore((state) => state.students)

  // For demo purposes, we'll use the first student's data
  const student = students[0]

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-sm border border-blue-100 overflow-hidden">
        <div className="p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name || student.name}</h1>
              <p className="text-lg text-gray-600 mt-2">Your student dashboard</p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                Student Portal
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          onClick={() => router.push("/student-view/portfolio")}
          className="bg-white rounded-lg border shadow-sm overflow-hidden transition-all hover:shadow-md cursor-pointer"
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                <HiAcademicCap className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-900">My Portfolio</h2>
                <p className="text-gray-500 mt-1">View your learning outcomes and feedback</p>
              </div>
            </div>
          </div>
          <div className="p-6 bg-gray-50">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">View your progress and feedback</span>
              <span className="text-blue-600 text-sm font-medium">View Portfolio →</span>
            </div>
          </div>
        </div>

        <div
          onClick={() => router.push("/student-view/schedule")}
          className="bg-white rounded-lg border shadow-sm overflow-hidden transition-all hover:shadow-md cursor-pointer"
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                <HiCalendar className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-900">Assessment Schedule</h2>
                <p className="text-gray-500 mt-1">View upcoming assessment moments</p>
              </div>
            </div>
          </div>
          <div className="p-6 bg-gray-50">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Check your upcoming assessments</span>
              <span className="text-indigo-600 text-sm font-medium">View Schedule →</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                <HiChartBar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-900">Progress Overview</h2>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                  <span className="text-sm font-medium text-gray-700">65%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Portfolio Completion</span>
                  <span className="text-sm font-medium text-gray-700">80%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "80%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Assessments Completed</span>
                  <span className="text-sm font-medium text-gray-700">50%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-500 h-2 rounded-full" style={{ width: "50%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                <HiBookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Feedback</h2>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="border-l-4 border-purple-500 pl-3 py-1">
                <p className="text-sm text-gray-600">
                  "Great progress on your project. Keep focusing on the user experience aspects."
                </p>
                <p className="text-xs text-gray-500 mt-1">Feedback Moment 2 - 2 weeks ago</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-3 py-1">
                <p className="text-sm text-gray-600">
                  "Your documentation has improved significantly. Consider adding more visual elements."
                </p>
                <p className="text-xs text-gray-500 mt-1">Feedback Moment 1 - 4 weeks ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                <HiCalendar className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-900">Next Assessment</h2>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-gray-900">May 30, 2025</div>
              <div className="text-sm text-gray-500 mt-1">Feedback moment 3</div>
              <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                2 weeks away
              </div>
              <div className="mt-4">
                <button
                  onClick={() => router.push("/student-view/schedule")}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View all assessments →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

