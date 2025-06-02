"use client"

import { create } from "zustand"

// Update the mockMoments array with the new format and dates
const mockMoments = [
  {
    id: "1",
    name: "Feedback moment 1",
    week: 6,
    date: "2025-03-28",
    description: "First iteration of your portfolio",
  },
  {
    id: "2",
    name: "Feedback moment 2",
    week: 10,
    date: "2025-04-25",
    description: "Second iteration of your portfolio",
  },
  {
    id: "3",
    name: "Feedback moment 3",
    week: 15,
    date: "2025-05-30",
    description: "Third iteration of your portfolio",
  },
  {
    id: "4",
    name: "Feedback moment 4",
    week: 18,
    date: "2025-06-20",
    description: "Fourth/Final iteration of your portfolio",
  },
]

// Update the mockOutcomes array with the new learning outcomes
const mockOutcomes = [
  {
    id: "1",
    title: "LO1 - Conceptualize, design, and develop interactive media products",
    description:
      "You create engaging concepts and translate them into interactive validated media products by applying user-centred design principles, and visual design techniques and by exploring emerging trends and developments in media, design and technologies.",
    level: "undefined",
    feedback: "",
    feedforward: "",
  },
  {
    id: "2",
    title: "LO2 - Transferable production",
    description:
      "You document and comment on your code using version control in a personal and team context and communicate technical recommendations.",
    level: "undefined",
    feedback: "",
    feedforward: "",
  },
  {
    id: "3",
    title: "LO3 - Creative iterations",
    description:
      "You present the successive iterations of your creative process, and the connections between them, of your methodically substantiated, iterative design and development process.",
    level: "undefined",
    feedback: "",
    feedforward: "",
  },
  {
    id: "4",
    title: "LO4 - Professional standards",
    description:
      "Both individually and in teams, you apply a relevant methodological approach used in the professional field to formulate project goals, involve stakeholders, conduct applied (BA) or action-oriented (AD) research, provide advice, make decisions, and deliver reports. In doing so, you consider the relevant ethical, intercultural, and sustainable aspects.",
    level: "undefined",
    feedback: "",
    feedforward: "",
  },
  {
    id: "5",
    title: "LO5 - Personal leadership",
    description:
      "You are aware of your strengths and weaknesses, both in ICT and your personal development. You choose actions aligning with your core values to promote your personal growth and develop your learning attitude.",
    level: "undefined",
    feedback: "",
    feedforward: "",
  },
]

// Update the mockStudents array with Dutch names and student.fontys.nl email addresses
const mockStudents = [
  {
    id: "1",
    name: "Daan de Vries",
    email: "d.devries@student.fontys.nl",
    studentNumber: "S1001234",
    profileImage: "https://i.pravatar.cc/150?img=1",
    outcomes: {},
  },
  {
    id: "2",
    name: "Lieke Bakker",
    email: "l.bakker@student.fontys.nl",
    studentNumber: "S1001235",
    profileImage: "https://i.pravatar.cc/150?img=2",
    outcomes: {},
  },
  {
    id: "3",
    name: "Tim van Dijk",
    email: "t.vandijk@student.fontys.nl",
    studentNumber: "S1001236",
    profileImage: "https://i.pravatar.cc/150?img=3",
    outcomes: {},
  },
  {
    id: "4",
    name: "Sanne Jansen",
    email: "s.jansen@student.fontys.nl",
    studentNumber: "S1001237",
    profileImage: "https://i.pravatar.cc/150?img=4",
    outcomes: {},
  },
  {
    id: "5",
    name: "Niels Visser",
    email: "n.visser@student.fontys.nl",
    studentNumber: "S1001238",
    profileImage: "https://i.pravatar.cc/150?img=5",
    outcomes: {},
  },
  {
    id: "6",
    name: "Femke Smit",
    email: "f.smit@student.fontys.nl",
    studentNumber: "S1001239",
    profileImage: "https://i.pravatar.cc/150?img=6",
    outcomes: {},
  },
  {
    id: "7",
    name: "Bram Vermeulen",
    email: "b.vermeulen@student.fontys.nl",
    studentNumber: "S1001240",
    profileImage: "https://i.pravatar.cc/150?img=7",
    outcomes: {},
  },
  {
    id: "8",
    name: "Eva Mulder",
    email: "e.mulder@student.fontys.nl",
    studentNumber: "S1001241",
    profileImage: "https://i.pravatar.cc/150?img=8",
    outcomes: {},
  },
  {
    id: "9",
    name: "Ruben de Jong",
    email: "r.dejong@student.fontys.nl",
    studentNumber: "S1001242",
    profileImage: "https://i.pravatar.cc/150?img=9",
    outcomes: {},
  },
  {
    id: "10",
    name: "Lisa van den Berg",
    email: "l.vandenberg@student.fontys.nl",
    studentNumber: "S1001243",
    profileImage: "https://i.pravatar.cc/150?img=10",
    outcomes: {},
  },
  {
    id: "11",
    name: "Thijs Hendriks",
    email: "t.hendriks@student.fontys.nl",
    studentNumber: "S1001244",
    profileImage: "https://i.pravatar.cc/150?img=11",
    outcomes: {},
  },
  {
    id: "12",
    name: "Anne Bosman",
    email: "a.bosman@student.fontys.nl",
    studentNumber: "S1001245",
    profileImage: "https://i.pravatar.cc/150?img=12",
    outcomes: {},
  },
  {
    id: "13",
    name: "Jeroen Kuijpers",
    email: "j.kuijpers@student.fontys.nl",
    studentNumber: "S1001246",
    profileImage: "https://i.pravatar.cc/150?img=13",
    outcomes: {},
  },
  {
    id: "14",
    name: "Marieke Peeters",
    email: "m.peeters@student.fontys.nl",
    studentNumber: "S1001247",
    profileImage: "https://i.pravatar.cc/150?img=14",
    outcomes: {},
  },
  {
    id: "15",
    name: "Wouter Jacobs",
    email: "w.jacobs@student.fontys.nl",
    studentNumber: "S1001248",
    profileImage: "https://i.pravatar.cc/150?img=15",
    outcomes: {},
  },
  {
    id: "16",
    name: "Anouk Martens",
    email: "a.martens@student.fontys.nl",
    studentNumber: "S1001249",
    profileImage: "https://i.pravatar.cc/150?img=16",
    outcomes: {},
  },
  {
    id: "17",
    name: "Sophie van Leeuwen",
    email: "s.vanleeuwen@student.fontys.nl",
    studentNumber: "S1001250",
    profileImage: "https://i.pravatar.cc/150?img=17",
    outcomes: {},
  },
  {
    id: "18",
    name: "Thomas Bakker",
    email: "t.bakker@student.fontys.nl",
    studentNumber: "S1001251",
    profileImage: "https://i.pravatar.cc/150?img=18",
    outcomes: {},
  },
  {
    id: "19",
    name: "Julia de Groot",
    email: "j.degroot@student.fontys.nl",
    studentNumber: "S1001252",
    profileImage: "https://i.pravatar.cc/150?img=19",
    outcomes: {},
  },
  {
    id: "20",
    name: "Max Willemsen",
    email: "m.willemsen@student.fontys.nl",
    studentNumber: "S1001253",
    profileImage: "https://i.pravatar.cc/150?img=20",
    outcomes: {},
  },
]

// Initialize outcomes for each student
mockStudents.forEach((student) => {
  mockMoments.forEach((moment) => {
    student.outcomes[moment.id] = JSON.parse(JSON.stringify(mockOutcomes))
  })
})

// Update mock users with Dutch names and Fontys email addresses
const mockUsers = [
  {
    id: "1",
    name: "Frank van der Meer",
    email: "f.vandermeer@fontys.nl",
    role: "teacher",
    isAdmin: false,
  },
  {
    id: "2",
    name: "William Janssen",
    email: "w.janssen@fontys.nl",
    role: "admin",
    isAdmin: true,
  },
  {
    id: "3",
    name: "Jancien Klaassen",
    email: "j.klaassen@fontys.nl",
    role: "teacher",
    isAdmin: true,
  },
]

export const useAppStore = create((set, get) => ({
  user: mockUsers[1], // Default to admin for demo
  moments: mockMoments,
  students: mockStudents,
  users: mockUsers,
  outcomes: mockOutcomes,
  recordings: [],
  selectedMomentId: mockMoments[0].id,
  selectedStudentId: null,
  isRecording: false,
  transcription: null,
  isAuthenticated: false, // Not authenticated by default

  // User actions
  setUser: (user) => set({ user }),
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

  login: (email, password) => {
    // In a real app, this would validate against a backend
    const user = mockUsers.find((u) => u.email === email)
    if (user) {
      set({ user, isAuthenticated: true })
      return true
    }
    return false
  },

  logout: () => set({ user: null, isAuthenticated: false }),

  // Student management
  selectMoment: (momentId) => set({ selectedMomentId: momentId }),

  selectStudent: (studentId) => set({ selectedStudentId: studentId }),

  addStudent: (name, email, studentNumber = null) =>
    set((state) => {
      const newStudentNumber = studentNumber || `S${1000000 + state.students.length + 1}`

      const newStudent = {
        id: Date.now().toString(),
        name,
        email,
        studentNumber: newStudentNumber,
        profileImage: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        outcomes: {},
      }

      // Initialize outcomes for the new student
      state.moments.forEach((moment) => {
        newStudent.outcomes[moment.id] = JSON.parse(JSON.stringify(state.outcomes))
      })

      return { students: [...state.students, newStudent] }
    }),

  updateStudent: (studentId, updatedData) =>
    set((state) => {
      const students = state.students.map((student) => {
        if (student.id !== studentId) return student
        return { ...student, ...updatedData }
      })

      return { students }
    }),

  deleteStudent: (studentId) =>
    set((state) => {
      const students = state.students.filter((student) => student.id !== studentId)
      return { students, selectedStudentId: state.selectedStudentId === studentId ? null : state.selectedStudentId }
    }),

  importStudentsFromCSV: (csvData) =>
    set((state) => {
      // Parse CSV data and create new students
      // Format expected: name,email,studentNumber
      const lines = csvData.split("\n")
      const newStudents = [...state.students]

      // Skip header row if present
      const startIndex = lines[0].includes("name") || lines[0].includes("Name") ? 1 : 0

      for (let i = startIndex; i < lines.length; i++) {
        const line = lines[i].trim()
        if (!line) continue

        const [name, email, studentNumber] = line.split(",").map((item) => item.trim())

        if (name && email) {
          const newStudent = {
            id: Date.now().toString() + i,
            name,
            email,
            studentNumber: studentNumber || `S${1000000 + newStudents.length + 1}`,
            profileImage: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
            outcomes: {},
          }

          // Initialize outcomes for the new student
          state.moments.forEach((moment) => {
            newStudent.outcomes[moment.id] = JSON.parse(JSON.stringify(state.outcomes))
          })

          newStudents.push(newStudent)
        }
      }

      return { students: newStudents }
    }),

  // Recording functionality
  startRecording: () => set({ isRecording: true }),

  stopRecording: (audioUrl, duration) =>
    set((state) => {
      if (!state.selectedStudentId || !state.selectedMomentId) return state

      const newRecording = {
        id: Date.now().toString(),
        studentId: state.selectedStudentId,
        momentId: state.selectedMomentId,
        date: new Date().toISOString(),
        audioUrl,
        duration,
      }

      return {
        isRecording: false,
        recordings: [...state.recordings, newRecording],
      }
    }),

  setTranscription: (transcription) => set({ transcription }),

  // Learning outcomes management
  updateOutcomeLevel: (studentId, momentId, outcomeId, level) =>
    set((state) => {
      const students = state.students.map((student) => {
        if (student.id !== studentId) return student

        const updatedOutcomes = { ...student.outcomes }
        if (updatedOutcomes[momentId]) {
          updatedOutcomes[momentId] = updatedOutcomes[momentId].map((outcome) => {
            if (outcome.id !== outcomeId) return outcome
            return { ...outcome, level }
          })
        }

        return { ...student, outcomes: updatedOutcomes }
      })

      return { students }
    }),

  updateOutcomeFeedback: (studentId, momentId, outcomeId, feedback, feedforward) =>
    set((state) => {
      const students = state.students.map((student) => {
        if (student.id !== studentId) return student

        const updatedOutcomes = { ...student.outcomes }
        if (updatedOutcomes[momentId]) {
          updatedOutcomes[momentId] = updatedOutcomes[momentId].map((outcome) => {
            if (outcome.id !== outcomeId) return outcome
            return { ...outcome, feedback, feedforward }
          })
        }

        return { ...student, outcomes: updatedOutcomes }
      })

      return { students }
    }),

  // Admin functions for learning outcomes
  addOutcome: (title, description) =>
    set((state) => {
      const newOutcome = {
        id: Date.now().toString(),
        title,
        description,
        level: "undefined",
        feedback: "",
        feedforward: "",
      }

      const updatedOutcomes = [...state.outcomes, newOutcome]

      // Add the new outcome to all students
      const students = state.students.map((student) => {
        const updatedStudentOutcomes = { ...student.outcomes }

        state.moments.forEach((moment) => {
          if (updatedStudentOutcomes[moment.id]) {
            updatedStudentOutcomes[moment.id] = [...updatedStudentOutcomes[moment.id], { ...newOutcome }]
          }
        })

        return { ...student, outcomes: updatedStudentOutcomes }
      })

      return { outcomes: updatedOutcomes, students }
    }),

  updateOutcome: (outcomeId, updatedData) =>
    set((state) => {
      const outcomes = state.outcomes.map((outcome) => {
        if (outcome.id !== outcomeId) return outcome
        return { ...outcome, ...updatedData }
      })

      // Update the outcome for all students
      const students = state.students.map((student) => {
        const updatedStudentOutcomes = { ...student.outcomes }

        state.moments.forEach((moment) => {
          if (updatedStudentOutcomes[moment.id]) {
            updatedStudentOutcomes[moment.id] = updatedStudentOutcomes[moment.id].map((outcome) => {
              if (outcome.id !== outcomeId) return outcome
              return {
                ...outcome,
                ...updatedData,
                level: outcome.level,
                feedback: outcome.feedback,
                feedforward: outcome.feedforward,
              }
            })
          }
        })

        return { ...student, outcomes: updatedStudentOutcomes }
      })

      return { outcomes, students }
    }),

  deleteOutcome: (outcomeId) =>
    set((state) => {
      const outcomes = state.outcomes.filter((outcome) => outcome.id !== outcomeId)

      // Remove the outcome from all students
      const students = state.students.map((student) => {
        const updatedStudentOutcomes = { ...student.outcomes }

        state.moments.forEach((moment) => {
          if (updatedStudentOutcomes[moment.id]) {
            updatedStudentOutcomes[moment.id] = updatedStudentOutcomes[moment.id].filter(
              (outcome) => outcome.id !== outcomeId,
            )
          }
        })

        return { ...student, outcomes: updatedStudentOutcomes }
      })

      return { outcomes, students }
    }),

  // Assessment moment management
  addMoment: (name, date, description) =>
    set((state) => {
      const newMoment = {
        id: Date.now().toString(),
        name,
        date,
        description,
      }

      const updatedMoments = [...state.moments, newMoment]

      // Initialize outcomes for the new moment for all students
      const students = state.students.map((student) => {
        const updatedOutcomes = { ...student.outcomes }
        updatedOutcomes[newMoment.id] = JSON.parse(JSON.stringify(state.outcomes))
        return { ...student, outcomes: updatedOutcomes }
      })

      return { moments: updatedMoments, students }
    }),

  updateMoment: (momentId, updatedData) =>
    set((state) => {
      const moments = state.moments.map((moment) => {
        if (moment.id !== momentId) return moment
        return { ...moment, ...updatedData }
      })

      return { moments }
    }),

  deleteMoment: (momentId) =>
    set((state) => {
      const moments = state.moments.filter((moment) => moment.id !== momentId)

      // Remove the moment from all students
      const students = state.students.map((student) => {
        const { [momentId]: _, ...updatedOutcomes } = student.outcomes
        return { ...student, outcomes: updatedOutcomes }
      })

      return {
        moments,
        students,
        selectedMomentId: state.selectedMomentId === momentId ? moments[0]?.id || null : state.selectedMomentId,
      }
    }),

  // User management
  addUser: (name, email, role, isAdmin) =>
    set((state) => {
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        role,
        isAdmin,
      }

      return { users: [...state.users, newUser] }
    }),

  updateUser: (userId, updatedData) =>
    set((state) => {
      const users = state.users.map((user) => {
        if (user.id !== userId) return user
        return { ...user, ...updatedData }
      })

      // If the current user is updated, update the current user as well
      const currentUser = state.user
      if (currentUser && currentUser.id === userId) {
        return { users, user: { ...currentUser, ...updatedData } }
      }

      return { users }
    }),

  deleteUser: (userId) =>
    set((state) => {
      // Prevent deleting the current user
      if (state.user && state.user.id === userId) {
        return state
      }

      const users = state.users.filter((user) => user.id !== userId)
      return { users }
    }),
}))

