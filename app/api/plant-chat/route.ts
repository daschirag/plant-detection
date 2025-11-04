import { NextResponse } from "next/server"

// Use nodejs runtime for AWS Amplify compatibility (edge runtime has limited env var access)
export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.error("OpenAI API key is missing")
      return NextResponse.json(
        { content: "Sorry, the AI assistant is not properly configured. Please try again later." },
        { status: 500 },
      )
    }

    // Create a strong system prompt to constrain the model to plant-related topics only
    const systemPrompt = `You are a specialized plant disease and care assistant with expertise in botany, plant pathology, and horticulture. 
    
    IMPORTANT INSTRUCTIONS:
    - You MUST ONLY answer questions related to plants, plant diseases, plant care, gardening, and horticulture.
    - If a user asks about anything unrelated to plants, politely decline to answer with: "I'm specialized in plant care and can only answer questions related to plants, gardening, and plant diseases. Please ask me about your plant concerns instead."
    - Do not provide any information on topics unrelated to plants, even if the user insists.
    
    You can provide helpful, accurate information about:
    - Plant disease identification and symptoms
    - Treatment options for plant diseases (both organic and chemical)
    - Plant care best practices and maintenance
    - Gardening techniques and tips
    - Horticulture information and plant selection
    - Soil, fertilization, and watering needs
    - Pest management for plants
    
    Be concise but thorough in your responses. When possible, structure your answers with bullet points for clarity.
    
    If you're unsure about a specific plant issue, acknowledge the limitations and suggest the user consult with a local plant expert or extension service.`

    // Use fetch API directly to avoid OpenAI client browser detection issues
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Using GPT-3.5 as requested
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API returned ${response.status}: ${await response.text()}`)
    }

    const responseData = await response.json()
    const content = responseData.choices[0].message.content

    return NextResponse.json({ content })
  } catch (error) {
    console.error("Error in plant chat:", error)
    return NextResponse.json(
      { content: "Sorry, I encountered an error processing your request. Please try again." },
      { status: 500 },
    )
  }
}
