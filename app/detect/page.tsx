"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  Upload,
  Leaf,
  X,
  AlertCircle,
  Check,
  Zap,
  ArrowUpRight,
  ShoppingCart,
  ExternalLink,
  Info,
  ThumbsUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PlantChatbot } from "@/app/components/plant-chatbot"
import { LoadingAnimation } from "./loading-animation"

type DiseaseResult = {
  isHealthy?: boolean
  disease: string
  description: string
  severity: "Low" | "Moderate" | "High" | "Unknown"
  cause?: string
  organicTreatments: {
    name: string
    description: string
    pros: string[]
    cons: string[]
    estimatedPrice: string
  }[]
  chemicalTreatments: {
    name: string
    description: string
    pros: string[]
    cons: string[]
    estimatedPrice: string
  }[]
  preventiveMeasures: string[]
  recommendedProducts: {
    name: string
    type: "organic" | "chemical"
    price: string
    amazonLink: string
    flipkartLink: string
    recommendation?: string
  }[]
  error?: string
  originalError?: string
}

export default function DetectPage() {
  const [stage, setStage] = useState<"upload" | "processing" | "results">("upload")
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showAnimation, setShowAnimation] = useState(false)
  const [activeTab, setActiveTab] = useState<"organic" | "chemical">("organic")
  const [diseaseResult, setDiseaseResult] = useState<DiseaseResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [imageError, setImageError] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // For the 3D effect on upload box
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const uploadBoxRef = useRef<HTMLDivElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]

      // Validate file size
      if (selectedFile.size > 10 * 1024 * 1024) {
        // 10MB
        setError("Image file too large. Maximum size is 10MB.")
        return
      }

      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"]
      if (!validTypes.includes(selectedFile.type)) {
        setError("Invalid image format. Supported formats: JPG, PNG, WEBP.")
        return
      }

      setFile(selectedFile)
      setError(null)
      setImageError(false)

      // Create object URL for preview
      const objectUrl = URL.createObjectURL(selectedFile)
      setPreview(objectUrl)
    }
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]

      // Validate file size
      if (droppedFile.size > 10 * 1024 * 1024) {
        // 10MB
        setError("Image file too large. Maximum size is 10MB.")
        return
      }

      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"]
      if (!validTypes.includes(droppedFile.type)) {
        setError("Invalid image format. Supported formats: JPG, PNG, WEBP.")
        return
      }

      setFile(droppedFile)
      setError(null)
      setImageError(false)

      // Create object URL for preview
      const objectUrl = URL.createObjectURL(droppedFile)
      setPreview(objectUrl)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleUploadBoxMouseMove = (e: React.MouseEvent) => {
    if (uploadBoxRef.current) {
      const rect = uploadBoxRef.current.getBoundingClientRect()
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      // Calculate rotation based on mouse position
      setRotateX((e.clientY - rect.top - centerY) / 25)
      setRotateY(-(e.clientX - rect.left - centerX) / 25)
    }
  }

  const handleUploadBoxMouseLeave = () => {
    // Reset rotation when mouse leaves
    setRotateX(0)
    setRotateY(0)
  }

  const handleImageError = () => {
    setImageError(true)
    setError("Failed to load image preview. Please try a different image.")
  }

  // Default fallback data
  const getDefaultFallbackData = (): DiseaseResult => {
    return {
      disease: "Unknown Plant Condition",
      description:
        "We couldn't analyze your plant image due to a technical issue. Here are some general recommendations for plant care.",
      severity: "Unknown",
      organicTreatments: [
        {
          name: "General Organic Care",
          description:
            "Apply organic compost tea to improve overall plant health. Mix 1 part compost with 5 parts water, steep for 24 hours, then apply to soil.",
          pros: [
            "Improves plant immunity",
            "Adds beneficial microorganisms",
            "Environmentally friendly",
            "Safe for all plants",
          ],
          cons: ["Slow acting", "Requires preparation", "Results vary by plant", "Needs regular application"],
          estimatedPrice: "$5-$15",
        },
      ],
      chemicalTreatments: [
        {
          name: "General Purpose Fungicide",
          description: "Apply a copper-based fungicide following package instructions for preventative care.",
          pros: ["Broad spectrum protection", "Long lasting", "Readily available", "Preventative"],
          cons: [
            "May affect beneficial organisms",
            "Environmental concerns",
            "Requires protective gear",
            "Not specific to your plant's needs",
          ],
          estimatedPrice: "$15-$25",
        },
      ],
      preventiveMeasures: [
        "Ensure proper watering - avoid overwatering and water at the base",
        "Improve air circulation around plants",
        "Remove and dispose of any fallen or diseased leaves",
        "Rotate crops annually if growing vegetables",
        "Use disease-resistant varieties when possible",
      ],
      recommendedProducts: [
        {
          name: "Neem Oil Organic Spray",
          type: "organic",
          price: "$12.99",
          amazonLink: "neem-oil-spray",
          flipkartLink: "neem-oil-spray",
        },
        {
          name: "Copper Fungicide",
          type: "chemical",
          price: "$18.99",
          amazonLink: "copper-fungicide",
          flipkartLink: "copper-fungicide",
        },
      ],
    }
  }

  const analyzePlantImage = async () => {
    if (!file || isSubmitting) return

    setIsSubmitting(true)
    setStage("processing")
    setShowAnimation(true)
    setError(null)

    // Simulate initial progress
    let currentProgress = 0
    const progressInterval = setInterval(() => {
      currentProgress += 2
      setProgress(Math.min(currentProgress, 90)) // Cap at 90% until we get the actual result

      if (currentProgress >= 90) {
        clearInterval(progressInterval)
      }
    }, 100)

    try {
      // Create form data to send the image
      const formData = new FormData()
      formData.append("image", file)

      console.log("Sending image for analysis:", file.name, file.type, file.size)

      // Set a timeout to prevent hanging requests
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Request timed out after 60 seconds")), 60000)
      })

      // Try the new API route first
      let response: Response
      try {
        // Send the image to our API route with timeout
        const fetchPromise = fetch("/api/analyze-plant-v2", {
          method: "POST",
          body: formData,
        })

        // Race between the fetch and the timeout
        response = (await Promise.race([fetchPromise, timeoutPromise])) as Response
      } catch (mainApiError) {
        console.error("Error with main API route, trying fallback:", mainApiError)

        // If the main API route fails, try the fallback route
        const fallbackFetchPromise = fetch("/api/analyze-plant-fallback", {
          method: "POST",
          body: formData,
        })

        response = (await Promise.race([fallbackFetchPromise, timeoutPromise])) as Response
      }

      // Check if the response is ok (status in the range 200-299)
      if (!response.ok) {
        console.error("Server responded with status:", response.status)

        // Try to get the error message from the response
        let errorMessage = `Server error (${response.status}). Using fallback recommendations.`
        try {
          const errorData = await response.json()
          if (errorData && errorData.error) {
            errorMessage = errorData.error
          }
        } catch (e) {
          // If we can't parse the JSON, just use the status code message
          console.error("Failed to parse error response:", e)
        }

        throw new Error(errorMessage)
      }

      // Get the response as JSON
      const result = await response.json()

      // Complete the progress
      clearInterval(progressInterval)
      setProgress(100)

      // Set the disease result
      setDiseaseResult(result)

      // If there's an error in the result but we have fallback data, show a warning
      if (result.error || result.originalError) {
        setError(`Note: ${result.error || result.originalError}. Showing general recommendations.`)
      }

      // Transition to results after a short delay
      setTimeout(() => {
        setShowAnimation(false)
        setTimeout(() => {
          setStage("results")
          setIsSubmitting(false)
        }, 300)
      }, 500)
    } catch (err) {
      clearInterval(progressInterval)
      console.error("Error in image analysis:", err)

      // Provide a more user-friendly error message
      const errorMessage =
        err instanceof Error ? err.message : "Failed to analyze the image. Using fallback recommendations."

      setError(errorMessage)

      // Use default fallback data
      const fallbackData = getDefaultFallbackData()
      setDiseaseResult(fallbackData)

      // Complete the progress animation
      setProgress(100)

      // Short delay before showing results
      setTimeout(() => {
        setShowAnimation(false)
        setTimeout(() => {
          setStage("results")
          setIsSubmitting(false)
        }, 300)
      }, 500)
    }
  }

  const resetUpload = () => {
    if (preview) {
      URL.revokeObjectURL(preview)
    }
    setFile(null)
    setPreview(null)
    setProgress(0)
    setStage("upload")
    setDiseaseResult(null)
    setError(null)
    setImageError(false)
    setIsSubmitting(false)
  }

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  // Particle animation effect
  const [particles, setParticles] = useState<
    Array<{ x: number; y: number; size: number; speed: number; opacity: number; color: string }>
  >([])

  useEffect(() => {
    // Create particles
    const newParticles = Array.from({ length: 70 }, () => ({
      x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
      y: Math.random() * (typeof window !== "undefined" ? window.innerHeight * 3 : 3000),
      size: Math.random() * 4 + 1,
      speed: Math.random() * 1 + 0.2,
      opacity: Math.random() * 0.5 + 0.1,
      color:
        Math.random() > 0.7
          ? "rgba(16, 185, 129, 0.8)"
          : Math.random() > 0.5
            ? "rgba(52, 211, 153, 0.6)"
            : "rgba(5, 150, 105, 0.4)",
    }))

    setParticles(newParticles)
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Low":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
      case "Moderate":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30"
      case "High":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      default:
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
    }
  }

  const openProductLink = (link: string, platform: string) => {
    // In a real app, these would be actual product links
    let url = ""
    if (platform === "amazon") {
      // For Amazon, we'd typically use a product ID in the URL
      url = `https://www.amazon.in/s?k=${encodeURIComponent(link)}`
    } else if (platform === "flipkart") {
      // For Flipkart, we'd use their product URL structure
      url = `https://www.flipkart.com/search?q=${encodeURIComponent(link)}`
    }

    if (url) {
      // Open in a new tab
      window.open(url, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 via-black to-black opacity-80"></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(16,185,129,0.15)_0%,rgba(0,0,0,0)_60%)]"></div>
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.3)_0%,rgba(0,0,0,0)_70%)] blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.2)_0%,rgba(0,0,0,0)_70%)] blur-3xl"></div>
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,1)_25%,transparent_80%)]"></div>

        {/* Floating particles */}
        {particles.map((particle, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full"
            initial={{
              x: particle.x,
              y: particle.y,
              opacity: 0,
            }}
            animate={{
              y: [particle.y, particle.y - 1000],
              opacity: [0, particle.opacity, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 20 / particle.speed,
              delay: index * 0.02,
              ease: "linear",
            }}
            style={{
              left: `${particle.x}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: particle.color,
            }}
          />
        ))}
      </div>

      <div className="container px-4 md:px-6 py-8 relative z-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-white/70 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-emerald-400"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
              <span>AI-Powered Analysis</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-200 to-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Plant Disease Detection
            </motion.h1>

            <motion.p
              className="text-white/70 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Upload a clear image of your plant leaf to identify diseases and get personalized treatment
              recommendations
            </motion.p>
          </motion.div>

          <AnimatePresence mode="wait">
            {stage === "upload" && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-0 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                  <div className="p-8">
                    {!preview ? (
                      <motion.div
                        ref={uploadBoxRef}
                        className={`bg-gradient-to-b from-emerald-900/50 to-emerald-950/50 rounded-xl border-2 border-dashed ${
                          dragActive ? "border-emerald-400" : "border-emerald-500/30"
                        } p-12 flex flex-col items-center justify-center gap-6 transition-all duration-300`}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onClick={() => fileInputRef.current?.click()}
                        onMouseMove={handleUploadBoxMouseMove}
                        onMouseLeave={handleUploadBoxMouseLeave}
                        style={{
                          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                          transformStyle: "preserve-3d",
                        }}
                        whileHover={{ scale: 1.01 }}
                      >
                        <motion.div
                          className="relative w-24 h-24"
                          animate={{
                            y: [0, -10, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        >
                          <div
                            className={`absolute inset-0 bg-emerald-500 rounded-full blur-md opacity-50 ${dragActive ? "animate-pulse" : ""}`}
                          ></div>
                          <div className="relative bg-gradient-to-br from-emerald-400 to-green-500 rounded-full p-5 flex items-center justify-center">
                            <Upload className="h-12 w-12 text-white" />
                          </div>
                        </motion.div>
                        <div className="text-center">
                          <motion.h3
                            className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-200"
                            animate={{ scale: dragActive ? 1.05 : 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            Upload Your Plant Image
                          </motion.h3>
                          <p className="text-white/70 mb-2">Drag and drop your leaf image here</p>
                          <p className="text-sm text-white/50">or click to browse</p>
                        </div>
                        <input
                          type="file"
                          id="file-upload"
                          ref={fileInputRef}
                          className="hidden"
                          accept="image/jpeg,image/png,image/webp,image/jpg"
                          onChange={handleFileChange}
                        />
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button className="bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-600 hover:to-green-500 text-black font-medium border-0 h-12 px-6 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                            Select Image
                          </Button>
                        </motion.div>
                        <p className="text-xs text-white/50 mt-2">Supported formats: JPG, PNG, WEBP. Max size: 10MB</p>

                        {/* 3D elements */}
                        <motion.div
                          className="absolute -right-6 -bottom-6 w-32 h-32 bg-gradient-to-r from-emerald-500/10 to-green-400/10 rounded-full blur-xl z-0"
                          style={{ transform: "translateZ(-10px)" }}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5],
                          }}
                          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                        />
                        <motion.div
                          className="absolute -left-4 -top-4 w-24 h-24 bg-gradient-to-r from-emerald-500/10 to-green-400/10 rounded-full blur-xl z-0"
                          style={{ transform: "translateZ(-5px)" }}
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0.2, 0.5],
                          }}
                          transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="relative">
                          <motion.div
                            className="aspect-video rounded-lg overflow-hidden bg-black/50 relative border border-emerald-500/30"
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            {imageError ? (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                <div className="text-center p-4">
                                  <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-2" />
                                  <p className="text-white/90">Failed to load image preview</p>
                                </div>
                              </div>
                            ) : (
                              <Image
                                src={preview || "/placeholder.svg"}
                                alt="Plant leaf preview"
                                fill
                                className="object-contain"
                                onError={handleImageError}
                                unoptimized // Skip image optimization to avoid potential issues
                              />
                            )}
                            <div className="absolute inset-0 border border-emerald-500/20 rounded-lg"></div>
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            <Button
                              variant="outline"
                              size="icon"
                              className="absolute top-2 right-2 bg-black/50 border-white/20 text-white hover:bg-white/10"
                              onClick={resetUpload}
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">Remove image</span>
                            </Button>
                          </motion.div>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-white/70">
                            <span className="inline-flex items-center bg-emerald-950 border border-emerald-500/30 rounded-full px-2 py-0.5 text-xs mr-2">
                              <Check className="h-3 w-3 text-emerald-400 mr-1" />
                              Image ready
                            </span>
                            Click Analyze to continue
                          </p>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              className="bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-600 hover:to-green-500 text-black font-medium border-0 relative overflow-hidden group"
                              onClick={analyzePlantImage}
                              disabled={imageError || isSubmitting}
                            >
                              <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                              <span className="relative flex items-center">
                                {isSubmitting ? "Processing..." : "Analyze Image"}
                                <ArrowUpRight className="ml-2 h-4 w-4" />
                              </span>
                            </Button>
                          </motion.div>
                        </div>

                        {error && (
                          <motion.div
                            className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mt-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            <div className="flex items-start gap-3">
                              <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-white/90">{error}</p>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </Card>
              </motion.div>
            )}

            {stage === "processing" && (
              <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-0 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                  <div className="p-8">
                    <LoadingAnimation progress={progress} />
                  </div>
                </Card>
              </motion.div>
            )}

            {stage === "results" && diseaseResult && (
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="border-0 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                    <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-6">
                      <div className="flex items-center">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 mr-3">
                          <Leaf className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">
                          {diseaseResult.isHealthy === true
                            ? "Plant Health: Healthy"
                            : `Disease Detected: ${diseaseResult.disease}`}
                        </h2>
                      </div>
                    </div>
                    <div className="p-8">
                      {error && (
                        <motion.div
                          className="bg-amber-500/20 border border-amber-500/30 rounded-lg p-3 mb-6"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <div className="flex items-start gap-3">
                            <Info className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-white/90">{error}</p>
                          </div>
                        </motion.div>
                      )}

                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <motion.div
                            className="aspect-video rounded-lg overflow-hidden bg-black/50 relative mb-6 border border-white/10"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            {imageError ? (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center p-4">
                                  <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-2" />
                                  <p className="text-white/90">Image preview unavailable</p>
                                </div>
                              </div>
                            ) : (
                              <Image
                                src={preview || "/placeholder.svg?height=300&width=400"}
                                alt="Plant leaf"
                                fill
                                className="object-contain"
                                onError={() => setImageError(true)}
                                unoptimized
                              />
                            )}
                            <div className="absolute inset-0 border-4 border-emerald-500/30 rounded-lg"></div>
                            <motion.div
                              className={`absolute bottom-3 right-3 ${
                                diseaseResult.isHealthy === true ? "bg-emerald-500" : "bg-amber-500"
                              } text-black text-xs font-bold px-3 py-1 rounded-full`}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5, type: "spring" }}
                            >
                              {diseaseResult.isHealthy === true ? "HEALTHY" : "ISSUE DETECTED"}
                            </motion.div>

                            {/* Detected areas highlight - these would be dynamically positioned in a real app */}
                            {diseaseResult.isHealthy !== true && (
                              <>
                                <motion.div
                                  className="absolute w-12 h-12 border-2 border-red-400 rounded-full"
                                  style={{ left: "30%", top: "40%" }}
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 0.8, scale: 1 }}
                                  transition={{ delay: 0.7 }}
                                >
                                  <div className="absolute -top-5 -left-2 bg-red-400 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                    95%
                                  </div>
                                </motion.div>

                                <motion.div
                                  className="absolute w-10 h-10 border-2 border-yellow-400 rounded-full"
                                  style={{ left: "60%", top: "35%" }}
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 0.8, scale: 1 }}
                                  transition={{ delay: 0.8 }}
                                >
                                  <div className="absolute -top-5 -left-2 bg-yellow-400 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                    82%
                                  </div>
                                </motion.div>
                              </>
                            )}
                          </motion.div>

                          {diseaseResult.isHealthy !== true && (
                            <motion.div
                              className="bg-gradient-to-r from-amber-900/30 to-amber-800/30 backdrop-blur-sm border border-amber-500/30 rounded-lg p-4 flex items-start gap-3"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="font-bold text-amber-400 text-sm">Severity: {diseaseResult.severity}</h4>
                                <p className="text-xs text-white/70 mt-1">
                                  {diseaseResult.severity === "Low" &&
                                    "This infection is in its early stages. Prompt treatment can prevent further spread."}
                                  {diseaseResult.severity === "Moderate" &&
                                    "This infection is in its middle stages. Prompt treatment is recommended to prevent further spread."}
                                  {diseaseResult.severity === "High" &&
                                    "This infection is severe. Immediate treatment is necessary to save the plant."}
                                  {diseaseResult.severity === "Unknown" &&
                                    "The severity of this condition could not be determined. Consider consulting with a plant specialist."}
                                </p>
                              </div>
                            </motion.div>
                          )}

                          {diseaseResult.isHealthy === true && (
                            <motion.div
                              className="bg-gradient-to-r from-emerald-900/30 to-emerald-800/30 backdrop-blur-sm border border-emerald-500/30 rounded-lg p-4 flex items-start gap-3"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              <ThumbsUp className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="font-bold text-emerald-400 text-sm">Good News!</h4>
                                <p className="text-xs text-white/70 mt-1">
                                  Your plant appears to be healthy. Continue with your current care routine.
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </div>
                        <div className="space-y-6">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            <h3 className="text-xl font-bold mb-3 text-white">
                              {diseaseResult.isHealthy === true
                                ? "About Your Healthy Plant"
                                : `About ${diseaseResult.disease}`}
                            </h3>
                            <p className="text-white/70">{diseaseResult.description}</p>
                          </motion.div>

                          {diseaseResult.cause && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.5 }}
                            >
                              <h3 className="text-xl font-bold mb-3 text-white">Cause</h3>
                              <p className="text-white/70">{diseaseResult.cause}</p>
                            </motion.div>
                          )}

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                          >
                            <h3 className="text-xl font-bold mb-3 text-white">
                              {diseaseResult.isHealthy === true ? "Maintenance Tips" : "Preventive Measures"}
                            </h3>
                            <ul className="text-white/70 space-y-2">
                              {diseaseResult.preventiveMeasures.map((measure, index) => (
                                <motion.li
                                  key={index}
                                  className="flex items-start gap-2"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.6 + index * 0.1 }}
                                >
                                  <div className="bg-emerald-500/20 rounded-full p-1 mt-0.5">
                                    <Check className="h-3 w-3 text-emerald-400" />
                                  </div>
                                  <span>{measure}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>

                          {/* AI Confidence visualization */}
                          <motion.div
                            className="bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm rounded-lg border border-white/10 p-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                          >
                            <h4 className="text-sm font-bold mb-3 text-white/90">AI Confidence Rating</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-white/70">
                                  {diseaseResult.isHealthy === true ? "Healthy Plant" : diseaseResult.disease}
                                </span>
                                <span className="text-emerald-400 font-bold">96%</span>
                              </div>
                              <div className="h-1.5 bg-emerald-900/50 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-gradient-to-r from-emerald-500 to-green-400"
                                  initial={{ width: 0 }}
                                  animate={{ width: "96%" }}
                                  transition={{ delay: 0.8, duration: 0.8 }}
                                />
                              </div>

                              <div className="flex justify-between text-xs mb-1 mt-2">
                                <span className="text-white/70">
                                  {diseaseResult.isHealthy === true ? "Potential Issues" : "Other Possibilities"}
                                </span>
                                <span className="text-white/70 font-bold">4%</span>
                              </div>
                              <div className="h-1.5 bg-emerald-900/50 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-white/30"
                                  initial={{ width: 0 }}
                                  animate={{ width: "4%" }}
                                  transition={{ delay: 0.9, duration: 0.8 }}
                                />
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="border-0 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                    <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-6">
                      <div className="flex items-center">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 mr-3">
                          <Zap className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">
                          {diseaseResult.isHealthy === true ? "Care Recommendations" : "Treatment Options"}
                        </h2>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="space-y-8">
                        {/* Treatment tabs */}
                        <div className="flex justify-center gap-2 mb-6">
                          {[
                            { id: "organic", label: "Organic Solutions" },
                            { id: "chemical", label: "Chemical Treatments" },
                          ].map((tab) => (
                            <motion.button
                              key={tab.id}
                              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all relative ${
                                activeTab === tab.id ? "text-black" : "text-white/70 hover:text-white"
                              }`}
                              onClick={() => setActiveTab(tab.id as "organic" | "chemical")}
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {activeTab === tab.id && (
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-400 rounded-full -z-10"
                                  layoutId="active-tab"
                                  transition={{ type: "spring", duration: 0.5 }}
                                />
                              )}
                              {tab.label}
                            </motion.button>
                          ))}
                        </div>

                        <AnimatePresence mode="wait">
                          {activeTab === "organic" ? (
                            <motion.div
                              key="organic"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                              className="grid md:grid-cols-2 gap-6"
                            >
                              {diseaseResult.organicTreatments.map((treatment, index) => (
                                <motion.div
                                  key={index}
                                  className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-500 group hover:border-emerald-500/30"
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  whileHover={{ y: -5 }}
                                >
                                  <div className="space-y-4">
                                    <div className="flex gap-4">
                                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-green-500/20 rounded-lg flex-shrink-0 flex items-center justify-center border border-emerald-500/30 group-hover:from-emerald-400/30 group-hover:to-green-500/30 transition-all">
                                        <motion.div
                                          className="w-10 h-10 rounded-full bg-emerald-500/30 flex items-center justify-center group-hover:bg-emerald-500/50 transition-all"
                                          whileHover={{ rotate: 360 }}
                                          transition={{ duration: 0.7 }}
                                        >
                                          <Leaf className="h-5 w-5 text-emerald-400" />
                                        </motion.div>
                                      </div>
                                      <div>
                                        <h4 className="font-bold text-white text-lg">{treatment.name}</h4>
                                        <p className="text-white/70 text-sm">{treatment.description}</p>
                                        <div className="text-sm text-emerald-400 font-medium mt-1">
                                          {treatment.estimatedPrice}
                                        </div>
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mt-4">
                                      <div>
                                        <h5 className="text-xs font-semibold text-white/70 mb-2">PROS</h5>
                                        <ul className="space-y-1">
                                          {treatment.pros.map((pro, i) => (
                                            <li key={i} className="flex items-start gap-2 text-xs text-white/70">
                                              <Check className="h-3 w-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                                              <span>{pro}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                      <div>
                                        <h5 className="text-xs font-semibold text-white/70 mb-2">CONS</h5>
                                        <ul className="space-y-1">
                                          {treatment.cons.map((con, i) => (
                                            <li key={i} className="flex items-start gap-2 text-xs text-white/70">
                                              <X className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                                              <span>{con}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </motion.div>
                          ) : (
                            <motion.div
                              key="chemical"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                              className="grid md:grid-cols-2 gap-6"
                            >
                              {diseaseResult.chemicalTreatments.map((treatment, index) => (
                                <motion.div
                                  key={index}
                                  className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-500 group hover:border-emerald-500/30"
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  whileHover={{ y: -5 }}
                                >
                                  <div className="space-y-4">
                                    <div className="flex gap-4">
                                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-green-500/20 rounded-lg flex-shrink-0 flex items-center justify-center border border-emerald-500/30 group-hover:from-emerald-400/30 group-hover:to-green-500/30 transition-all">
                                        <motion.div
                                          className="w-10 h-10 rounded-full bg-emerald-500/30 flex items-center justify-center group-hover:bg-emerald-500/50 transition-all"
                                          whileHover={{ rotate: 360 }}
                                          transition={{ duration: 0.7 }}
                                        >
                                          <Zap className="h-5 w-5 text-emerald-400" />
                                        </motion.div>
                                      </div>
                                      <div>
                                        <h4 className="font-bold text-white text-lg">{treatment.name}</h4>
                                        <p className="text-white/70 text-sm">{treatment.description}</p>
                                        <div className="text-sm text-emerald-400 font-medium mt-1">
                                          {treatment.estimatedPrice}
                                        </div>
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mt-4">
                                      <div>
                                        <h5 className="text-xs font-semibold text-white/70 mb-2">PROS</h5>
                                        <ul className="space-y-1">
                                          {treatment.pros.map((pro, i) => (
                                            <li key={i} className="flex items-start gap-2 text-xs text-white/70">
                                              <Check className="h-3 w-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                                              <span>{pro}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                      <div>
                                        <h5 className="text-xs font-semibold text-white/70 mb-2">CONS</h5>
                                        <ul className="space-y-1">
                                          {treatment.cons.map((con, i) => (
                                            <li key={i} className="flex items-start gap-2 text-xs text-white/70">
                                              <X className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                                              <span>{con}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Recommended Products */}
                        {diseaseResult.recommendedProducts.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-8"
                          >
                            <h3 className="text-xl font-bold mb-4 text-white flex items-center">
                              <ShoppingCart className="h-5 w-5 mr-2 text-emerald-400" />
                              Recommended Products
                            </h3>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {diseaseResult.recommendedProducts.map((product, index) => (
                                <motion.div
                                  key={index}
                                  className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-lg border border-white/20 p-4 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.5 + index * 0.1 }}
                                  whileHover={{ y: -3 }}
                                >
                                  <div className="flex flex-col h-full">
                                    <div className="mb-3">
                                      <span
                                        className={`text-xs px-2 py-1 rounded-full ${
                                          product.type === "organic"
                                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                            : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                        }`}
                                      >
                                        {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
                                      </span>
                                    </div>

                                    <h4 className="font-medium text-white">{product.name}</h4>
                                    <p className="text-emerald-400 text-sm font-bold mt-1 mb-3">{product.price}</p>

                                    {product.recommendation && (
                                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-md p-2 mb-3">
                                        <p className="text-xs text-white/80">{product.recommendation}</p>
                                      </div>
                                    )}

                                    <div className="mt-auto grid grid-cols-2 gap-2">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-white/20 text-white hover:bg-white/10 flex items-center justify-center"
                                        onClick={() => openProductLink(product.amazonLink, "amazon")}
                                      >
                                        <span className="flex items-center text-xs">
                                          Amazon
                                          <ExternalLink className="ml-1 h-3 w-3" />
                                        </span>
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-white/20 text-white hover:bg-white/10 flex items-center justify-center"
                                        onClick={() => openProductLink(product.flipkartLink, "flipkart")}
                                      >
                                        <span className="flex items-center text-xs">
                                          Flipkart
                                          <ExternalLink className="ml-1 h-3 w-3" />
                                        </span>
                                      </Button>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex justify-between"
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      onClick={resetUpload}
                      className="border-white/20 text-white hover:bg-white/10 group"
                    >
                      <span className="flex items-center">
                        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Analyze Another Plant
                      </span>
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-600 hover:to-green-500 text-black font-medium border-0 relative overflow-hidden group">
                      <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                      <span className="relative flex items-center">
                        Save Results
                        <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-[-2px] group-hover:translate-x-[2px]" />
                      </span>
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Plant Chatbot */}
      <PlantChatbot />
    </div>
  )
}
