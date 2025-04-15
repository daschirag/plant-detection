import { NextResponse } from "next/server"
import { getFallbackResponse } from "../analyze-plant/fallback"

// Explicitly set the runtime to edge
export const runtime = "edge"

export async function POST(req: Request) {
  try {
    console.log("Starting fallback plant analysis request")

    const formData = await req.formData()
    const imageFile = formData.get("image") as File

    if (!imageFile) {
      console.log("No image file provided")
      return NextResponse.json(getFallbackResponse("No image file provided"), { status: 200 })
    }

    // Log file information for debugging
    console.log("Image file received in fallback route:", {
      name: imageFile.name,
      type: imageFile.type,
      size: imageFile.size,
    })

    // Return a static analysis result
    const staticResult = {
      isHealthy: false,
      disease: "Leaf Spot",
      description:
        "Leaf spot is a common plant disease characterized by brown or black spots on leaves. It's typically caused by fungal pathogens and can affect a wide range of plants.",
      severity: "Moderate",
      cause:
        "Leaf spot is typically caused by fungal pathogens that thrive in warm, humid conditions. The disease is often spread by water splashing on leaves, carrying fungal spores from infected to healthy plant tissue.",
      organicTreatments: [
        {
          name: "Neem Oil Spray",
          description:
            "Mix 2 teaspoons of neem oil with 1 teaspoon of mild liquid soap and 1 quart of water. Spray on affected areas weekly.",
          pros: ["Natural fungicide", "Also controls insects", "Biodegradable", "Safe for most plants"],
          cons: [
            "Needs frequent application",
            "Strong odor",
            "May harm beneficial insects",
            "Less effective in rainy conditions",
          ],
          estimatedPrice: "₹200-₹400",
        },
        {
          name: "Baking Soda Solution",
          description:
            "Mix 1 tablespoon of baking soda with 1 teaspoon of mild liquid soap and 1 gallon of water. Apply to affected areas weekly.",
          pros: ["Household ingredients", "Inexpensive", "Non-toxic", "Easy to prepare"],
          cons: [
            "Less effective than commercial products",
            "Needs frequent reapplication",
            "May cause leaf burn if too concentrated",
            "Preventative rather than curative",
          ],
          estimatedPrice: "₹50-₹100",
        },
      ],
      chemicalTreatments: [
        {
          name: "Copper Fungicide",
          description:
            "Apply according to package directions, typically 1-2 tablespoons per gallon of water. Spray on affected plants every 7-10 days.",
          pros: ["Highly effective", "Long-lasting protection", "Works on many fungal diseases", "Readily available"],
          cons: [
            "Can build up in soil",
            "May harm beneficial microorganisms",
            "Environmental concerns",
            "Requires protective equipment",
          ],
          estimatedPrice: "₹300-₹500",
        },
        {
          name: "Chlorothalonil Spray",
          description: "Apply as directed on the product label, typically every 7-14 days as a preventative measure.",
          pros: ["Broad-spectrum protection", "Rain-resistant", "Long shelf life", "Economical for large areas"],
          cons: [
            "Potential environmental impact",
            "Not for edible plants close to harvest",
            "Requires protective gear",
            "Can affect beneficial organisms",
          ],
          estimatedPrice: "₹400-₹600",
        },
      ],
      preventiveMeasures: [
        "Remove and destroy infected leaves promptly",
        "Avoid overhead watering to keep foliage dry",
        "Ensure proper spacing between plants for air circulation",
        "Apply preventative treatments during humid conditions",
        "Use disease-resistant varieties when possible",
      ],
      recommendedProducts: [
        {
          name: "Organic Neem Oil Spray by Green Gobbler",
          type: "organic",
          price: "₹349",
          amazonLink: "Organic Neem Oil Spray by Green Gobbler",
          flipkartLink: "Organic Neem Oil Spray by Green Gobbler",
          recommendation: "This product is more affordable and effective for regular use.",
        },
        {
          name: "Bonide Copper Fungicide Ready-To-Use",
          type: "chemical",
          price: "₹599",
          amazonLink: "Bonide Copper Fungicide Ready-To-Use",
          flipkartLink: "Bonide Copper Fungicide Ready-To-Use",
          recommendation: "This is more expensive but provides longer-lasting protection.",
        },
      ],
    }

    console.log("Returning static fallback analysis")
    return NextResponse.json(staticResult)
  } catch (error: any) {
    console.error("Error in fallback route:", error)
    return NextResponse.json(getFallbackResponse("Error in fallback analysis route"), { status: 200 })
  }
}
