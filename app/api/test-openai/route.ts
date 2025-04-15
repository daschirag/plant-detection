import { NextResponse } from "next/server"
import OpenAI from "openai"

export async function GET() {
  try {
    // Log the API key (first few characters only for security)
    const apiKey = process.env.OPENAI_API_KEY || ""
    console.log("API Key starts with:", apiKey.substring(0, 5) + "...")

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    // Make a simple API call to test the connection
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Using a simpler model for the test
      messages: [
        {
          role: "system",
          content: "You are a test assistant. Respond with 'OpenAI connection successful'.",
        },
        {
          role: "user",
          content: "Test connection",
        },
      ],
    })

    return NextResponse.json({
      success: true,
      message: "OpenAI API connection successful",
      response: response.choices[0].message.content,
    })
  } catch (error) {
    console.error("Error testing OpenAI connection:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to connect to OpenAI API",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
