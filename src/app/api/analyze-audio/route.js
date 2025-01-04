import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google AI SDK
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

export async function POST(req) {
  console.log("req: ", req);
  try {
    // Check if the request is multipart form-data
    if (!req.headers.get("content-type")?.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }

    // Parse the multipart form data
    const formData = await req.formData();
    const audioFile = formData.get("audio");

    if (!audioFile) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    // Read the audio file as an ArrayBuffer
    const arrayBuffer = await audioFile.arrayBuffer();
    const audioBytes = new Uint8Array(arrayBuffer);

    // Initialize the Gemini Pro Vision model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    // Prepare the audio content for the model
    const audioContent = {
      inlineData: {
        data: Buffer.from(audioBytes).toString("base64"),
        mimeType: audioFile.type,
      },
    };

    // Generate content using Gemini
    const result = await model.generateContent([
      "You are an assistant analyzing an audio recording of a meeting. Your task is to provide a detailed summary of the meeting content, organized into the following sections: \n\n" +
        "1. **Meeting Overview**: Summarize the main purpose and context of the meeting in 2-3 sentences. \n" +
        "2. **Key Points Discussed**: Provide a list of the most important points or topics covered, each with a brief explanation. Include timestamps for when these points were discussed in the audio. \n" +
        "3. **Decisions Made**: Highlight any decisions or conclusions reached during the meeting, along with their timestamps. \n" +
        "4. **Action Items**: Identify tasks or follow-up actions assigned during the meeting, specifying the assignees (if mentioned) and their timestamps. \n" +
        "5. **Additional Notes**: Mention any noteworthy details, concerns, or unresolved issues brought up during the meeting, along with timestamps. \n\n" +
        "Use concise and clear language for each section. Ensure all timestamps are accurate and correspond to the audio content provided.",
      audioContent,
    ]);
    const response = await result.response;
    const summary = response.text();

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Error processing audio:", error);
    return NextResponse.json(
      { error: "Error processing audio" },
      { status: 500 }
    );
  }
}
