"use client";

import { useState, useRef, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { HiMicrophone, HiStop, HiPlay, HiPause } from "react-icons/hi";

export default function RecordingView() {
  const {
    isRecording,
    setIsRecording,
    audioBlob,
    setAudioBlob,
    audioUrl,
    setAudioUrl,
    setTranscription,
    isProcessing,
    setIsProcessing,
  } = useAppStore();

  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [status, setStatus] = useState("");
  const [hasMicrophoneAccess, setHasMicrophoneAccess] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  // Request microphone access on component mount
  useEffect(() => {
    const requestMicrophoneAccess = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        stream.getTracks().forEach((track) => track.stop()); // Stop the stream immediately
        setHasMicrophoneAccess(true);
        setStatus("Ready to record");
      } catch (error) {
        console.error("Error requesting microphone access:", error);
        setStatus(
          "Microphone access denied. Please allow microphone access to record."
        );
      }
    };

    requestMicrophoneAccess();
  }, []);

  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const startRecording = async () => {
    if (!hasMicrophoneAccess) {
      setStatus("Please allow microphone access to start recording");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        console.log("Data available:", event.data.size);
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        console.log(
          "Recording stopped, processing chunks:",
          audioChunksRef.current.length
        );
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        console.log("Created audio blob:", audioBlob.size);
        setAudioBlob(audioBlob);
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        await handleProcessAudio();
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setStatus("Recording in progress...");
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error starting recording:", error);
      setStatus("Error starting recording. Please try again.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setIsRecording(false);
      setStatus("Processing recording...");
      clearInterval(timerRef.current);
    }
  };

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProcessAudio = async () => {
    if (!audioBlob) {
      console.error("No audio blob available");
      setStatus("Error: No audio data available");
      return;
    }

    setIsProcessing(true);
    setStatus("Processing recording...");

    try {
      console.log("Creating form data with audio blob:", audioBlob.size);
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");

      console.log("Sending request to transcribe-direct API");
      const response = await fetch("/api/transcribe-direct", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status}, details: ${JSON.stringify(
            errorData
          )}`
        );
      }

      const data = await response.json();
      console.log("Received transcription response:", data);

      if (data.transcript) {
        setTranscription(data.transcript);
        setStatus("Recording completed and transcribed");
      } else {
        throw new Error("No transcript in response");
      }
    } catch (error) {
      console.error("Error transcribing audio:", error);
      setStatus("Error processing recording. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        {!isRecording && !audioUrl ? (
          <button
            onClick={startRecording}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            disabled={!hasMicrophoneAccess || isProcessing}
          >
            <HiMicrophone className="w-5 h-5" />
            Start Recording
          </button>
        ) : isRecording ? (
          <button
            onClick={stopRecording}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            disabled={isProcessing}
          >
            <HiStop className="w-5 h-5" />
            Stop Recording
          </button>
        ) : null}

        {audioUrl && (
          <button
            onClick={togglePlayback}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            disabled={isProcessing}
          >
            {isPlaying ? (
              <HiPause className="w-5 h-5" />
            ) : (
              <HiPlay className="w-5 h-5" />
            )}
            {isPlaying ? "Pause" : "Play"}
          </button>
        )}

        {isRecording && (
          <span className="text-gray-600">{formatTime(recordingTime)}</span>
        )}
      </div>

      {status && (
        <p
          className={`text-sm ${
            isProcessing ? "text-blue-600" : "text-gray-600"
          }`}
        >
          {status}
        </p>
      )}

      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => setIsPlaying(false)}
          className="w-full"
        />
      )}
    </div>
  );
}
