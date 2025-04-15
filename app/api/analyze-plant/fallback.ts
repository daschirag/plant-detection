// This file provides a fallback response when the OpenAI API fails

export const getFallbackResponse = (errorMessage: string) => {
  return {
    disease: "Unknown Plant Condition",
    description:
      "We couldn't accurately identify a specific disease from the provided image. This could be due to image quality, lighting conditions, or the plant might be healthy. For more accurate results, please try uploading a clearer image with good lighting that focuses on the affected area of the plant.",
    severity: "Unknown",
    organicTreatments: [
      {
        name: "General Plant Health Boost",
        description:
          "Apply organic compost tea to improve overall plant health and resistance. Mix 1 part compost with 5 parts water, let it steep for 24-48 hours, then strain and apply to soil around the plant base.",
        pros: [
          "Improves overall plant health",
          "Adds beneficial microorganisms to soil",
          "Environmentally friendly",
          "Safe for edible plants",
        ],
        cons: [
          "Slower acting than chemical alternatives",
          "Requires preparation time",
          "Results may vary",
          "May need repeated applications",
        ],
        estimatedPrice: "$5-$15",
      },
      {
        name: "Neem Oil Treatment",
        description:
          "Apply diluted neem oil as a preventative measure against common pests and diseases. Mix 2 teaspoons of neem oil with 1 teaspoon of mild liquid soap and 1 quart of water. Spray on all plant surfaces until completely wet.",
        pros: [
          "Natural pest deterrent",
          "Safe for beneficial insects when dry",
          "Has antifungal properties",
          "Biodegradable",
        ],
        cons: [
          "Strong odor",
          "Needs frequent reapplication (every 7-14 days)",
          "Can harm some beneficial insects if directly contacted",
          "Less effective in rainy conditions",
        ],
        estimatedPrice: "$10-$20",
      },
    ],
    chemicalTreatments: [
      {
        name: "Broad-Spectrum Fungicide",
        description:
          "Apply a copper-based fungicide following package instructions. Typically mix 1-2 tablespoons per gallon of water and spray all plant surfaces thoroughly. Apply every 7-10 days as needed.",
        pros: [
          "Effective against many fungal diseases",
          "Long-lasting protection",
          "Rain-resistant after drying",
          "Readily available at garden centers",
        ],
        cons: [
          "Can affect beneficial soil organisms",
          "May require protective equipment during application",
          "Environmental concerns with runoff",
          "Can build up in soil with repeated use",
        ],
        estimatedPrice: "$15-$25",
      },
      {
        name: "Systemic Insecticide",
        description:
          "Apply a systemic insecticide if pest damage is suspected. Products containing imidacloprid can be applied to soil around the plant base. Follow specific product instructions for application rates.",
        pros: [
          "Long-lasting protection (up to 12 months)",
          "Protects new growth",
          "Resistant to washing off",
          "Treats hard-to-reach pests",
        ],
        cons: [
          "Can harm beneficial insects including pollinators",
          "Environmental concerns",
          "Not suitable for edible plants in many cases",
          "May take time to show results (1-2 weeks)",
        ],
        estimatedPrice: "$20-$30",
      },
    ],
    preventiveMeasures: [
      "Ensure proper watering - avoid overwatering and water at the base of plants to keep foliage dry",
      "Improve air circulation around plants by proper spacing and pruning when necessary",
      "Remove and dispose of any fallen or diseased leaves promptly to prevent spread of pathogens",
      "Rotate crops annually if growing vegetables to prevent buildup of soil-borne diseases",
      "Use disease-resistant varieties when possible for your growing zone",
      "Maintain proper soil nutrition with regular fertilization appropriate to your plant type",
      "Inspect plants regularly for early signs of problems and treat promptly",
    ],
    recommendedProducts: [
      {
        name: "Dr. Earth Final Stop Organic Disease Control Fungicide",
        type: "organic",
        price: "$24.99",
        amazonLink: "dr-earth-final-stop-organic-disease-control",
        flipkartLink: "dr-earth-final-stop-organic-disease-control",
      },
      {
        name: "Bonide Neem Oil Concentrate",
        type: "organic",
        price: "$19.99",
        amazonLink: "bonide-neem-oil-concentrate",
        flipkartLink: "bonide-neem-oil-concentrate",
      },
      {
        name: "Bonide Copper Fungicide Spray",
        type: "chemical",
        price: "$18.99",
        amazonLink: "bonide-copper-fungicide-spray",
        flipkartLink: "bonide-copper-fungicide-spray",
      },
      {
        name: "Bayer Advanced 12 Month Tree & Shrub Protect & Feed",
        type: "chemical",
        price: "$29.99",
        amazonLink: "bayer-advanced-tree-shrub-protect-feed",
        flipkartLink: "bayer-advanced-tree-shrub-protect-feed",
      },
    ],
    error: errorMessage,
  }
}
