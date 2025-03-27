"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAppStore } from "@/lib/store"
import { HiArrowLeft, HiSave } from "react-icons/hi"
import Link from "next/link"

export default function EditUser() {
  const router = useRouter()
  const params = useParams()
  const userId = params.userId

  const users = useAppStore((state) => state.users)
  const currentUser = useAppStore((state) => state.user)
  const updateUser = useAppStore((state) => state.updateUser)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    isAdmin: false,
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    const user = users.find((u) => u.id === userId)
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        isAdmin: user.isAdmin,
      })
    } else {
      router.push("/admin/users")
    }
  }, [userId, users, router])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

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

    if (!formData.role) {
      newErrors.role = "Role is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      updateUser(userId, formData)
      router.push("/admin/users")
    }
  }

  // Check if editing current user
  const isCurrentUser = currentUser && currentUser.id === userId

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/admin/users" className="mr-4 text-gray-500 hover:text-gray-700">
            <HiArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Edit User</h1>
            <p className="mt-1 text-sm text-gray-500">Update user information and permissions.</p>
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
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role *
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`mt-1 block w-full border ${
                  errors.role ? "border-red-300" : "border-gray-300"
                } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              >
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
            </div>

            <div className="flex items-center h-full pt-5">
              <input
                id="isAdmin"
                name="isAdmin"
                type="checkbox"
                checked={formData.isAdmin}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                disabled={isCurrentUser} // Prevent removing admin from yourself
              />
              <label htmlFor="isAdmin" className="ml-2 block text-sm text-gray-700">
                Grant admin privileges
                {isCurrentUser && (
                  <span className="ml-2 text-xs text-gray-500">(Cannot remove admin from yourself)</span>
                )}
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <Link
              href="/admin/users"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <HiSave className="mr-2 h-5 w-5" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

