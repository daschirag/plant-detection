import { NextResponse } from "next/server"
import OpenAI from "openai"

// Explicitly set the runtime to nodejs
export const runtime = "nodejs"

export async function GET() {
  try {
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.error("OpenAI API key is missing")
      return NextResponse.json({ success: false, message: "OpenAI API key is missing" }, { status: 200 })
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    // Test the connection with a simple request
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "Hello, this is a test message to verify the OpenAI API connection.",
        },
      ],
      max_tokens: 50,
    })

    return NextResponse.json({
      success: true,
      message: "OpenAI API connection successful",
      response: response.choices[0].message,
    })
  } catch (error: any) {
    console.error("OpenAI API connection test failed:", error)

    return NextResponse.json(
      {
        success: false,
        message: "OpenAI API connection failed",
        error: error.message || String(error),
      },
      { status: 200 },
    ) // Still return 200 to avoid cascading errors
  }
}
