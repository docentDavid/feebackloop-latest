"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/store"
import { HiArrowLeft, HiSave } from "react-icons/hi"
import Link from "next/link"

export default function AddStudent() {
  const router = useRouter()
  const addStudent = useAppStore((state) => state.addStudent)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentNumber: "",
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (formData.studentNumber && !/^[A-Za-z0-9]+$/.test(formData.studentNumber)) {
      newErrors.studentNumber = "Student number should only contain letters and numbers"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      addStudent(formData.name, formData.email, formData.studentNumber || null)
      router.push("/admin/students")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/admin/students" className="mr-4 text-gray-500 hover:text-gray-700">
            <HiArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Add New Student</h1>
            <p className="mt-1 text-sm text-gray-500">Create a new student account in the system.</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 block w-full border ${
                  errors.name ? "border-red-300" : "border-gray-300"
                } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full border ${
                  errors.email ? "border-red-300" : "border-gray-300"
                } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="studentNumber" className="block text-sm font-medium text-gray-700">
                Student Number
              </label>
              <input
                type="text"
                name="studentNumber"
                id="studentNumber"
                value={formData.studentNumber}
                onChange={handleChange}
                className={`mt-1 block w-full border ${
                  errors.studentNumber ? "border-red-300" : "border-gray-300"
                } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                placeholder="Leave blank to auto-generate"
              />
              {errors.studentNumber && <p className="mt-1 text-sm text-red-600">{errors.studentNumber}</p>}
            </div>
          </div>

          <div className="flex justify-end">
            <Link
              href="/admin/students"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <HiSave className="mr-2 h-5 w-5" />
              Save Student
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

