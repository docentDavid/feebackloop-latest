"use client"

import { useAppStore } from "@/lib/store"
import { HiCalendar, HiClock, HiLocationMarker } from "react-icons/hi"

export default function StudentSchedule() {
  const moments = useAppStore((state) => state.moments)

  // Sort moments by date
  const sortedMoments = [...moments].sort((a, b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-semibold text-gray-900">Assessment Schedule</h1>
          <p className="text-gray-500 mt-1">View your upcoming assessment moments</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-medium text-gray-900">Upcoming Assessments</h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {sortedMoments.map((moment) => {
              const momentDate = new Date(moment.date)
              const isPast = momentDate < new Date()

              return (
                <div
                  key={moment.id}
                  className={`flex border rounded-lg overflow-hidden ${
                    isPast ? "border-gray-200 bg-gray-50" : "border-blue-100 bg-blue-50"
                  }`}
                >
                  <div className={`w-2 ${isPast ? "bg-gray-300" : "bg-blue-500"}`}></div>
                  <div className="flex-1 p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{moment.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{moment.description}</p>
                      </div>
                      <div className="mt-2 md:mt-0 flex flex-col md:items-end">
                        <div className="flex items-center text-sm text-gray-500">
                          <HiCalendar className="mr-1.5 h-4 w-4 text-gray-400" />
                          {momentDate.toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <HiClock className="mr-1.5 h-4 w-4 text-gray-400" />
                          Week {moment.week}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <HiLocationMarker className="mr-1.5 h-4 w-4 text-gray-400" />
                          Online
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          isPast ? "bg-gray-100 text-gray-800" : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {isPast ? "Completed" : "Upcoming"}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

