import { NextResponse } from "next/server";
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
      "You are an assistant analyzing an audio recording of a meeting. Your task is to provide a structured summary with a title, description, and detailed sections: \n\n" +
        "1. **Title**: A concise and informative title summarizing the key topic of the meeting.\n" +
        "2. **Description**: A short paragraph (2-3 sentences) summarizing the meeting’s purpose and main discussion points.\n" +
        "3. **Meeting Overview**: Summarize the main purpose and context of the meeting in 2-3 sentences. \n" +
        "4. **Key Points Discussed**: Provide a list of the most important points or topics covered, each with a brief explanation. Include timestamps for when these points were discussed in the audio. \n" +
        "5. **Decisions Made**: Highlight any decisions or conclusions reached during the meeting, along with their timestamps. \n" +
        "6. **Action Items**: Identify tasks or follow-up actions assigned during the meeting, specifying the assignees (if mentioned) and their timestamps. \n" +
        "7. **Additional Notes**: Mention any noteworthy details, concerns, or unresolved issues brought up during the meeting, along with timestamps.Only output the structured summary without any introductory phrases or explanations. \n\n" +
        "Use concise and clear language for each section. Ensure all timestamps are accurate and correspond to the audio content provided.",
      audioContent,
    ]);
    console.log("result: ", result);

    const response = await result.response;
    const summary = response.text();

    // Extract title and description separately
    const titleMatch = summary.match(/\*\*Title\*\*: (.+)/);
    const descriptionMatch = summary.match(
      /\*\*Description\*\*: ([\s\S]+?)(?=\*\*Meeting Overview\*\*|$)/
    );

    const title = titleMatch ? titleMatch[1].trim() : "Untitled Meeting";
    const description = descriptionMatch
      ? descriptionMatch[1].trim()
      : "No description available.";

    // Remove the unwanted introductory phrase
    const cleanedSummary = summary.replace(
      /^Okay, I will analyze the audio and provide a structured summary according to your instructions.\n\n/,
      ""
    );

    // Remove the **Title** and **Description** sections
    const cleanedSummaryWithoutTitleDesc = cleanedSummary
      .replace(/\*\*Title\*\*:.*\n/, "")
      .replace(/\*\*Description\*\*:.*\n/, "");


    return NextResponse.json({
      summary: cleanedSummaryWithoutTitleDesc.trim(),
      title,
      description,
    });

    return NextResponse.json({ summary, title, description });
  } catch (error) {
    console.error("Error processing audio:", error);
    return NextResponse.json(
      { error: "Error processing audio" },
      { status: 500 }
    );
  }
}
