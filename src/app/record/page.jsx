"use client";

import { Header } from "@/components/Header";
import { StudentList } from "@/components/StudentList";
import { MomentSelector } from "@/components/MomentSelector";
import RecordingView from "@/components/RecordingView";
import { TranscriptionView } from "@/components/TranscriptionView";
import { LearningOutcomeCard } from "@/components/LearningOutcomeCard";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HiArrowLeft, HiSave, HiBookOpen } from "react-icons/hi";
import { HiUser } from "react-icons/hi2";

export default function Record() {
  const router = useRouter();
  const selectedStudentId = useAppStore((state) => state.selectedStudentId);
  const selectedMomentId = useAppStore((state) => state.selectedMomentId);
  const transcription = useAppStore((state) => state.transcription);
  const students = useAppStore((state) => state.students);
  const moments = useAppStore((state) => state.moments);

  const selectedStudent = students.find((s) => s.id === selectedStudentId);
  const selectedMoment = moments.find((m) => m.id === selectedMomentId);

  const handleSaveFeedback = () => {
    if (!selectedStudentId || !selectedMomentId) {
      return;
    }
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <HiArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
          <button
            onClick={handleSaveFeedback}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <HiSave className="w-5 h-5 mr-2" />
            Save Feedback
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Student & Assessment
                  </h2>
                  <p className="text-gray-600">
                    Select a student and assessment moment to begin
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student
                  </label>
                  <StudentList />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assessment Moment
                  </label>
                  <MomentSelector />
                </div>
              </div>
            </div>

            {selectedStudentId && selectedMomentId ? (
              <>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Record Conversation
                  </h2>
                  <RecordingView />
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <TranscriptionView />
                </div>
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center py-8">
                  <HiUser className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Select a Student and Assessment Moment
                  </h3>
                  <p className="text-gray-600">
                    Please select a student and assessment moment to begin
                    recording and providing feedback.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-6">
                <HiBookOpen className="w-5 h-5 text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Learning Outcomes
                </h2>
              </div>
              <div className="space-y-4">
                <LearningOutcomeCard
                  title="Communication Skills"
                  description="Demonstrates effective verbal and written communication"
                  level={3}
                />
                <LearningOutcomeCard
                  title="Problem Solving"
                  description="Shows ability to analyze and solve complex problems"
                  level={2}
                />
                <LearningOutcomeCard
                  title="Team Collaboration"
                  description="Works effectively in team settings"
                  level={4}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
