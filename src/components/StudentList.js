"use client";

import { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import {
  HiUserAdd,
  HiUser,
  HiChevronLeft,
  HiChevronRight,
  HiChevronDown,
} from "react-icons/hi";

export function StudentList({
  showAddButton = false,
  studentsPerPage: initialStudentsPerPage = 16,
}) {
  const students = useAppStore((state) => state.students);
  const selectedStudentId = useAppStore((state) => state.selectedStudentId);
  const selectStudent = useAppStore((state) => state.selectStudent);
  const addStudent = useAppStore((state) => state.addStudent);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentEmail, setNewStudentEmail] = useState("");
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(
    initialStudentsPerPage
  );
  const [showPerPageDropdown, setShowPerPageDropdown] = useState(false);

  // Reset to page 1 when studentsPerPage changes
  useEffect(() => {
    setCurrentPage(1);
  }, [studentsPerPage]);

  // Calculate pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents =
    studentsPerPage === Number.POSITIVE_INFINITY
      ? students
      : students.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(students.length / studentsPerPage);

  const handleAddStudent = () => {
    if (!newStudentName.trim() || !newStudentEmail.trim()) {
      setError("Please provide both name and email for the new student.");
      return;
    }

    addStudent(newStudentName, newStudentEmail);
    setNewStudentName("");
    setNewStudentEmail("");
    setDialogOpen(false);
    setError("");
  };

  return (
    <div className="space-y-4">
      {showAddButton && (
        <div className="flex justify-end">
          <button
            onClick={() => setDialogOpen(true)}
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <HiUserAdd className="mr-2 h-5 w-5" />
            Add Student
          </button>
        </div>
      )}

      {dialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h3 className="mb-4 text-lg font-medium">Add New Student</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={newStudentEmail}
                  onChange={(e) => setNewStudentEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setDialogOpen(false);
                    setError("");
                  }}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddStudent}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Add Student
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentStudents.map((student) => (
          <button
            key={student.id}
            onClick={() => selectStudent(student.id)}
            className={`flex items-center space-x-3 rounded-lg border p-4 text-left transition-colors ${
              selectedStudentId === student.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
            }`}
          >
            <img
              src={student.profileImage}
              alt={student.name}
              className="h-10 w-10 rounded-full"
            />
            <div>
              <p className="font-medium text-gray-900">{student.name}</p>
              <p className="text-sm text-gray-500">{student.email}</p>
            </div>
          </button>
        ))}
      </div>

      {studentsPerPage !== Number.POSITIVE_INFINITY &&
        students.length > studentsPerPage && (
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Show</span>
                <div className="relative">
                  <button
                    onClick={() => setShowPerPageDropdown(!showPerPageDropdown)}
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    {studentsPerPage}
                    <HiChevronDown className="ml-2 h-5 w-5" />
                  </button>
                  {showPerPageDropdown && (
                    <div className="absolute left-0 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg">
                      {[4, 8, 16, 32].map((size) => (
                        <button
                          key={size}
                          onClick={() => {
                            setStudentsPerPage(size);
                            setShowPerPageDropdown(false);
                          }}
                          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-sm text-gray-700">per page</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  <HiChevronLeft className="h-5 w-5" />
                </button>
                <span className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  <HiChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
