"use client";

import { useAppStore } from "@/lib/store";
import { HiChatAlt } from "react-icons/hi";

export default function TranscriptionView() {
  const { transcription, isProcessing } = useAppStore();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-4">
        <HiChatAlt className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">
          Conversation Transcription
        </h2>
      </div>

      <div className="min-h-[200px] max-h-[400px] overflow-y-auto">
        {!transcription ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p className="text-center">
              {isProcessing
                ? "Processing recording..."
                : "No transcription available. Record and process a conversation to see the transcription here."}
            </p>
          </div>
        ) : (
          <div className="prose prose-sm max-w-none">
            <p className="whitespace-pre-wrap">{transcription}</p>
          </div>
        )}
      </div>
    </div>
  );
}
