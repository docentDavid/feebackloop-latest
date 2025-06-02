"use client"

import { useState } from "react"
import { useAppStore } from "@/lib/store"
import { HiAcademicCap, HiDocumentText, HiChevronRight } from "react-icons/hi"

export default function StudentPortfolio() {
  const user = useAppStore((state) => state.user)
  const students = useAppStore((state) => state.students)
  const moments = useAppStore((state) => state.moments)

  // For demo purposes, we'll use the first student's data
  const studentId = students[0].id
  const student = students.find((s) => s.id === studentId)

  const [selectedMoment, setSelectedMoment] = useState(moments[0])

  if (!student) return null

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-semibold text-gray-900">My Portfolio</h1>
          <p className="text-gray-500 mt-1">View and manage your learning portfolio</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-medium text-gray-900">Assessment Moments</h2>
            </div>
            <div className="p-2">
              <ul className="divide-y divide-gray-100">
                {moments.map((moment) => (
                  <li key={moment.id}>
                    <button
                      onClick={() => setSelectedMoment(moment)}
                      className={`w-full flex items-center justify-between p-3 text-left rounded-md ${
                        selectedMoment.id === moment.id ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <div className="flex items-center">
                        <HiDocumentText className="h-5 w-5 mr-3 text-gray-400" />
                        <span className="text-sm font-medium">{moment.name}</span>
                      </div>
                      <HiChevronRight className="h-4 w-4 text-gray-400" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-medium text-gray-900">{selectedMoment.name}</h2>
              <p className="text-gray-500 mt-1">
                {new Date(selectedMoment.date).toLocaleDateString()} - {selectedMoment.description}
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex items-center">
                  <HiAcademicCap className="h-5 w-5 mr-2 text-blue-500" />
                  <h3 className="text-lg font-medium">Learning Outcomes</h3>
                </div>

                <div className="space-y-6">
                  {student.outcomes[selectedMoment.id]?.map((outcome) => (
                    <div key={outcome.id} className="bg-white border rounded-lg overflow-hidden">
                      <div className="pb-2 p-4 border-b">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-lg font-medium">{outcome.title}</h3>
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-medium level-${outcome.level} ml-2 flex-shrink-0`}
                          >
                            {outcome.level.charAt(0).toUpperCase() + outcome.level.slice(1)}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">{outcome.description}</p>
                      </div>
                      <div className="p-4 space-y-4">
                        {outcome.feedback && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-gray-700">Feedback</h4>
                            <div className="bg-gray-50 p-3 rounded-md text-sm">{outcome.feedback}</div>
                          </div>
                        )}

                        {outcome.feedforward && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-gray-700">Feedforward</h4>
                            <div className="bg-gray-50 p-3 rounded-md text-sm">{outcome.feedforward}</div>
                          </div>
                        )}

                        {!outcome.feedback && !outcome.feedforward && (
                          <div className="text-sm text-gray-500 italic">
                            No feedback has been provided yet for this learning outcome.
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

