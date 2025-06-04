import { create } from "zustand";

export const useAppStore = create((set, get) => ({
  // State
  isRecording: false,
  audioBlob: null,
  audioUrl: null,
  transcription: null,
  isProcessing: false,
  selectedStudentId: null,
  selectedMomentId: null,
  students: [],
  moments: [],

  // Actions
  setIsRecording: (isRecording) => set({ isRecording }),
  setAudioBlob: (audioBlob) => set({ audioBlob }),
  setAudioUrl: (audioUrl) => set({ audioUrl }),
  setTranscription: (transcription) => set({ transcription }),
  setIsProcessing: (isProcessing) => set({ isProcessing }),
  setSelectedStudentId: (studentId) => set({ selectedStudentId: studentId }),
  setSelectedMomentId: (momentId) => set({ selectedMomentId: momentId }),
  setStudents: (students) => set({ students }),
  setMoments: (moments) => set({ moments }),
}));
