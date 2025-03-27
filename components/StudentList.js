"use client"

import { useState, useEffect } from "react"
import { useAppStore } from "@/lib/store"
import { HiUserAdd, HiUser, HiChevronLeft, HiChevronRight, HiChevronDown } from "react-icons/hi"

export function StudentList({ showAddButton = true, studentsPerPage: initialStudentsPerPage = 16 }) {
  const students = useAppStore((state) => state.students)
  const selectedStudentId = useAppStore((state) => state.selectedStudentId)
  const selectStudent = useAppStore((state) => state.selectStudent)
  const addStudent = useAppStore((state) => state.addStudent)

  const [dialogOpen, setDialogOpen] = useState(false)
  const [newStudentName, setNewStudentName] = useState("")
  const [newStudentEmail, setNewStudentEmail] = useState("")
  const [error, setError] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [studentsPerPage, setStudentsPerPage] = useState(initialStudentsPerPage)
  const [showPerPageDropdown, setShowPerPageDropdown] = useState(false)

  // Reset to page 1 when studentsPerPage changes
  useEffect(() => {
    setCurrentPage(1)
  }, [studentsPerPage])

  // Calculate pagination
  const indexOfLastStudent = currentPage * studentsPerPage
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage
  const currentStudents =
    studentsPerPage === Number.POSITIVE_INFINITY ? students : students.slice(indexOfFirstStudent, indexOfLastStudent)
  const totalPages = Math.ceil(students.length / studentsPerPage)

  const handleAddStudent = () => {
    if (!newStudentName.trim() || !newStudentEmail.trim()) {
      setError("Please provide both name and email for the new student.")
      return
    }

    addStudent(newStudentName, newStudentEmail)
    setNewStudentName("")
    setNewStudentEmail("")
    setDialogOpen(false)
    setError("")

    // Show toast notification (simplified)
    alert(`${newStudentName} has been added successfully.`)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-gray-800">Students</h2>

        <div className="flex items-center space-x-2">
          {/* Students per page selector */}
          <div className="relative">
            <button
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => setShowPerPageDropdown(!showPerPageDropdown)}
            >
              Show: {studentsPerPage === Number.POSITIVE_INFINITY ? "All" : studentsPerPage} students
              <HiChevronDown className="ml-2 h-4 w-4" />
            </button>

            {showPerPageDropdown && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {[10, 20, 40, Number.POSITIVE_INFINITY].map((value) => (
                    <button
                      key={value}
                      className={`block px-4 py-2 text-sm text-left w-full ${studentsPerPage === value ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50"}`}
                      onClick={() => {
                        setStudentsPerPage(value)
                        setShowPerPageDropdown(false)
                      }}
                    >
                      {value === Number.POSITIVE_INFINITY ? "All" : value} students
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {showAddButton && (
            <button
              onClick={() => setDialogOpen(true)}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <HiUserAdd className="w-4 h-4 mr-1" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>

      {dialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Student</h3>

            {error && <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4 text-sm">{error}</div>}

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="Enter student name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={newStudentEmail}
                  onChange={(e) => setNewStudentEmail(e.target.value)}
                  placeholder="Enter student email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setDialogOpen(false)}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAddStudent}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Student
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentStudents.map((student) => (
          <div
            key={student.id}
            className={`bg-white border rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer overflow-hidden ${
              selectedStudentId === student.id ? "ring-2 ring-blue-500 border-transparent" : "hover:border-gray-300"
            }`}
            onClick={() => selectStudent(student.id)}
          >
            <div className="flex items-center p-4">
              {student.profileImage ? (
                <img
                  src={student.profileImage || "/placeholder.svg"}
                  alt={student.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                  <HiUser className="w-6 h-6 text-gray-500" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">{student.name}</h3>
                <p className="text-sm text-gray-500 truncate">{student.email}</p>
                <p className="text-xs text-gray-400">{student.studentNumber}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination - only show if not showing all students */}
      {studentsPerPage !== Number.POSITIVE_INFINITY && totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="inline-flex items-center px-2 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <HiChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`inline-flex items-center px-3 py-1 border ${
                currentPage === page
                  ? "border-blue-500 bg-blue-50 text-blue-600"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              } rounded-md text-sm font-medium`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="inline-flex items-center px-2 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <HiChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}

