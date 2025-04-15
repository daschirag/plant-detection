import { NextResponse } from "next/server"
import { getFallbackResponse } from "../analyze-plant/fallback"

// Explicitly set the runtime to edge
export const runtime = "edge"

export async function POST(req: Request) {
  try {
    console.log("Starting plant analysis request (v2)")

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.error("OpenAI API key is missing")
      return NextResponse.json(getFallbackResponse("Server configuration error: API key is missing"), { status: 200 })
    }

    const formData = await req.formData()
    const imageFile = formData.get("image") as File

    if (!imageFile) {
      console.log("No image file provided")
      return NextResponse.json(getFallbackResponse("No image file provided"), { status: 200 })
    }

    // Log file information for debugging
    console.log("Image file received:", {
      name: imageFile.name,
      type: imageFile.type,
      size: imageFile.size,
    })

    // Validate image size and type
    if (imageFile.size > 10 * 1024 * 1024) {
      console.log("Image file too large")
      return NextResponse.json(getFallbackResponse("Image file too large. Maximum size is 10MB."), { status: 200 })
    }

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"]
    if (!validTypes.includes(imageFile.type)) {
      console.log("Invalid image format")
      return NextResponse.json(getFallbackResponse("Invalid image format. Supported formats: JPG, PNG, WEBP."), {
        status: 200,
      })
    }

    try {
      // Convert the file to a base64 string
      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const base64Image = buffer.toString("base64")

      console.log("Image converted to base64, length:", base64Image.length)

      // Create the prompt for GPT-4o
      const prompt = `
      Analyze this plant image and provide a detailed assessment following these steps:

      1. Determine if the plant is healthy or unhealthy.
      2. If unhealthy, identify the specific disease or issue.
      3. Explain the cause of the disease or issue.
      4. Suggest one organic solution (natural/home remedy).
      5. Suggest one inorganic solution (chemical treatment).
      6. Recommend two specific products available on Amazon or Flipkart India for the inorganic treatment, including:
         - Product name
         - Price (in INR)
         - Link (just the product name for search purposes)
      7. Compare the two products and suggest which one is cheaper and better.

      Format your response in JSON with the following structure:
      {
        "isHealthy": boolean,
        "disease": string (if unhealthy),
        "description": string (detailed description of the disease or health status),
        "severity": "Low" | "Moderate" | "High" (if unhealthy),
        "cause": string (explanation of the cause),
        "organicTreatments": [
          {
            "name": string,
            "description": string,
            "pros": string[],
            "cons": string[],
            "estimatedPrice": string
          }
        ],
        "chemicalTreatments": [
          {
            "name": string,
            "description": string,
            "pros": string[],
            "cons": string[],
            "estimatedPrice": string
          }
        ],
        "preventiveMeasures": string[],
        "recommendedProducts": [
          {
            "name": string,
            "type": "organic" | "chemical",
            "price": string,
            "amazonLink": string,
            "flipkartLink": string,
            "recommendation": string
          }
        ]
      }
      
      Ensure your response is in valid JSON format only, with no additional text.
      `

      // Use fetch directly to call OpenAI API instead of using the OpenAI client
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content:
                "You are a plant disease expert who analyzes plant images and provides detailed assessments and treatment recommendations.",
            },
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: prompt,
                },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:${imageFile.type};base64,${base64Image}`,
                  },
                },
              ],
            },
          ],
          response_format: { type: "json_object" },
        }),
      })

      if (!response.ok) {
        throw new Error(`OpenAI API returned ${response.status}: ${await response.text()}`)
      }

      const responseData = await response.json()
      const content = responseData.choices[0].message.content || ""
      console.log("OpenAI response received:", content.substring(0, 100) + "...")

      try {
        // Parse the JSON response
        const result = JSON.parse(content)
        console.log("Successfully processed plant analysis")
        return NextResponse.json(result)
      } catch (jsonError) {
        console.error("Error parsing JSON response:", jsonError)
        // If JSON parsing fails, return the raw content in a structured format
        return NextResponse.json({
          disease: "Analysis Result",
          description: content,
          severity: "Unknown",
          organicTreatments: [
            {
              name: "See detailed analysis",
              description: "Please refer to the detailed analysis provided.",
              pros: ["Comprehensive analysis"],
              cons: ["Format error occurred"],
              estimatedPrice: "N/A",
            },
          ],
          chemicalTreatments: [],
          preventiveMeasures: ["See detailed analysis"],
          recommendedProducts: [],
        })
      }
    } catch (openaiError: any) {
      console.error("OpenAI API error:", openaiError)
      return NextResponse.json(getFallbackResponse(`OpenAI API error: ${openaiError.message || String(openaiError)}`), {
        status: 200,
      })
    }
  } catch (error: any) {
    console.error("Error processing request:", error)
    // Always return a 200 response with fallback data
    return NextResponse.json(getFallbackResponse(error instanceof Error ? error.message : String(error)), {
      status: 200,
    })
  }
}
