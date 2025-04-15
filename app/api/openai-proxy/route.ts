import { NextResponse } from "next/server"
import OpenAI from "openai"

// Mark this function as a server-side function
export const runtime = "nodejs" // Use Node.js runtime

export async function POST(req: Request) {
  try {
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.error("OpenAI API key is missing")
      return NextResponse.json({ error: "Server configuration error: API key is missing" }, { status: 500 })
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    // Get the request body
    const body = await req.json()
    const { prompt } = body

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    // Make a simple text request to OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 100,
    })

    return NextResponse.json({
      success: true,
      content: response.choices[0].message.content,
    })
  } catch (error: any) {
    console.error("OpenAI API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || String(error),
      },
      { status: 500 },
    )
  }
}
