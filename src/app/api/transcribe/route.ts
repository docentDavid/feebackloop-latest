import { groq } from "@ai-sdk/groq";
import { experimental_transcribe as transcribe } from "ai";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get("audio") as File;

    if (!audioFile) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    console.log("Received audio file:", {
      name: audioFile.name,
      type: audioFile.type,
      size: audioFile.size,
    });

    // Validate file size
    if (audioFile.size > 25 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Audio file too large (max 25MB)" },
        { status: 400 }
      );
    }

    // Read audio data
    const arrayBuffer = await audioFile.arrayBuffer();

    // Check if file is not empty
    if (arrayBuffer.byteLength === 0) {
      return NextResponse.json(
        { error: "Audio file is empty" },
        { status: 400 }
      );
    }

    console.log("Audio data size:", arrayBuffer.byteLength);

    // Try different methods to send the audio
    let result;

    try {
      // Method 1: Direct as Buffer
      const buffer = Buffer.from(arrayBuffer);
      console.log("Trying with Buffer...");

      result = await transcribe({
        model: groq.transcription("whisper-large-v3"),
        audio: buffer,
      });
    } catch (bufferError) {
      console.log("Buffer method failed:", bufferError);

      try {
        // Method 2: As Uint8Array
        const uint8Array = new Uint8Array(arrayBuffer);
        console.log("Trying with Uint8Array...");

        result = await transcribe({
          model: groq.transcription("whisper-large-v3"),
          audio: uint8Array,
        });
      } catch (uint8Error) {
        console.log("Uint8Array method failed:", uint8Error);

        // Method 3: Direct as ArrayBuffer
        console.log("Trying with ArrayBuffer...");
        result = await transcribe({
          model: groq.transcription("whisper-large-v3"),
          audio: arrayBuffer,
        });
      }
    }

    console.log("Transcription successful");

    return NextResponse.json({
      transcript: result.text || "",
      success: true,
    });
  } catch (error) {
    console.error("Transcription error details:", error);
    return NextResponse.json(
      {
        error: "Failed to transcribe audio",
        details: error instanceof Error ? error.message : "Unknown error",
        success: false,
      },
      { status: 500 }
    );
  }
}
