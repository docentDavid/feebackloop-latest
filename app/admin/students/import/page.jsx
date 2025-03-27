"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/store"
import { HiArrowLeft, HiUpload, HiDownload } from "react-icons/hi"
import Link from "next/link"

export default function ImportStudents() {
  const router = useRouter()
  const importStudentsFromCSV = useAppStore((state) => state.importStudentsFromCSV)

  const [csvData, setCsvData] = useState("")
  const [previewData, setPreviewData] = useState([])
  const [error, setError] = useState("")

  const handleTextareaChange = (e) => {
    const data = e.target.value
    setCsvData(data)

    if (data.trim()) {
      try {
        // Parse CSV data for preview
        const lines = data.split("\n")
        const preview = []

        // Skip header row if present
        const startIndex = lines[0].includes("name") || lines[0].includes("Name") ? 1 : 0

        for (let i = startIndex; i < Math.min(lines.length, startIndex + 5); i++) {
          const line = lines[i].trim()
          if (!line) continue

          const [name, email, studentNumber] = line.split(",").map((item) => item.trim())

          if (name && email) {
            preview.push({ name, email, studentNumber })
          }
        }

        setPreviewData(preview)
        setError("")
      } catch (err) {
        setError("Invalid CSV format. Please check your data.")
        setPreviewData([])
      }
    } else {
      setPreviewData([])
      setError("")
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const data = event.target.result
      setCsvData(data)
      handleTextareaChange({ target: { value: data } })
    }
    reader.readAsText(file)
  }

  const handleImport = () => {
    if (!csvData.trim()) {
      setError("Please enter or upload CSV data.")
      return
    }

    try {
      importStudentsFromCSV(csvData)
      router.push("/admin/students")
    } catch (err) {
      setError("Failed to import students. Please check your data format.")
    }
  }

  const downloadTemplate = () => {
    const template =
      "name,email,studentNumber\nJohn Doe,john.doe@example.com,S1001234\nJane Smith,jane.smith@example.com,S1001235"
    const blob = new Blob([template], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "student_import_template.csv"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/admin/students" className="mr-4 text-gray-500 hover:text-gray-700">
            <HiArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Import Students</h1>
            <p className="mt-1 text-sm text-gray-500">Import multiple students at once using a CSV file.</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6 space-y-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">CSV Data</h3>
              <button
                type="button"
                onClick={downloadTemplate}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <HiDownload className="mr-2 h-4 w-4" />
                Download Template
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              Enter or upload a CSV file with the following columns: name, email, studentNumber (optional). Each row
              represents a student.
            </p>

            {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">{error}</div>}

            <div className="mb-4">
              <label htmlFor="csv-upload" className="block text-sm font-medium text-gray-700 mb-2">
                Upload CSV File
              </label>
              <input
                id="csv-upload"
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            <div>
              <label htmlFor="csv-data" className="block text-sm font-medium text-gray-700 mb-2">
                Or Paste CSV Data
              </label>
              <textarea
                id="csv-data"
                rows={10}
                value={csvData}
                onChange={handleTextareaChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="name,email,studentNumber"
              />
            </div>
          </div>

          {previewData.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Student Number
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {previewData.map((student, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.studentNumber || "Auto-generated"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                {previewData.length < 5 ? "Showing all students" : "Showing first 5 students"}
              </p>
            </div>
          )}

          <div className="flex justify-end">
            <Link
              href="/admin/students"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
            >
              Cancel
            </Link>
            <button
              type="button"
              onClick={handleImport}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <HiUpload className="mr-2 h-5 w-5" />
              Import Students
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

