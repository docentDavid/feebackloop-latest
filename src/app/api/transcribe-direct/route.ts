import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get("audio") as File;

    if (!audioFile) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    if (audioFile.size > 25 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Audio file too large (max 25MB)" },
        { status: 400 }
      );
    }

    console.log("Received audio file:", {
      name: audioFile.name,
      type: audioFile.type,
      size: audioFile.size,
    });

    const audioData = await audioFile.arrayBuffer();
    console.log("Audio data size:", audioData.byteLength);

    try {
      // Create a mock transcription for now
      // In a real implementation, we would use a proper speech-to-text service
      const mockTranscription =
        "This is a mock transcription of the recorded conversation. In a real implementation, this would be replaced with actual speech-to-text conversion.";

      return NextResponse.json({ transcript: mockTranscription });
    } catch (error) {
      console.error("Error transcribing audio:", error);
      return NextResponse.json(
        { error: "Failed to transcribe audio" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
