"use client"

import { useAppStore } from "@/lib/store"
import { HiChatAlt } from "react-icons/hi"

export function TranscriptionView() {
  const transcription = useAppStore((state) => state.transcription)

  if (!transcription) {
    return (
      <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg">
        <div className="p-6 flex flex-col items-center justify-center min-h-[200px] text-center">
          <HiChatAlt className="h-10 w-10 text-gray-300 mb-3" />
          <h3 className="text-lg font-medium text-gray-400">No Transcription Available</h3>
          <p className="text-sm text-gray-400 mt-1">Record and process a conversation to see the transcription here.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden shadow-md rounded-lg border">
      <div className="bg-gray-50 border-b border-gray-100 pb-3 p-4">
        <h3 className="text-lg font-medium flex items-center">
          <HiChatAlt className="h-5 w-5 mr-2 text-blue-500" />
          Conversation Transcription
        </h3>
      </div>
      <div className="p-0">
        <div className="h-[300px] p-4 overflow-auto">
          <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">{transcription}</div>
        </div>
      </div>
    </div>
  )
}

