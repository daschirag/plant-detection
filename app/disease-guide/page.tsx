"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Search, Info, ArrowUpRight, Check, X, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

type DiseaseCategory = "fungal" | "bacterial" | "viral" | "pest" | "all"

type Disease = {
  id: string
  name: string
  category: "fungal" | "bacterial" | "viral" | "pest"
  description: string
  symptoms: string[]
  treatments: {
    organic: string[]
    chemical: string[]
  }
  preventionTips: string[]
  image: string
}

export default function DiseaseGuidePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<DiseaseCategory>("all")
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null)
  const [showTreatments, setShowTreatments] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  // Sample disease data
  const diseases: Disease[] = [
    {
      id: "powdery-mildew",
      name: "Powdery Mildew",
      category: "fungal",
      description:
        "A fungal disease that appears as a white to gray powdery growth on leaf surfaces, stems, and sometimes fruit. It's one of the most common and easily recognizable plant diseases.",
      symptoms: [
        "White powdery spots on leaves and stems",
        "Yellowing or browning of leaves",
        "Distorted or stunted growth",
        "Premature leaf drop",
      ],
      treatments: {
        organic: [
          "Neem oil spray",
          "Baking soda solution (1 tbsp baking soda, 1/2 tsp liquid soap, 1 gallon water)",
          "Milk spray (1 part milk to 9 parts water)",
        ],
        chemical: ["Sulfur-based fungicides", "Potassium bicarbonate", "Trifloxystrobin"],
      },
      preventionTips: [
        "Improve air circulation around plants",
        "Avoid overhead watering to keep foliage dry",
        "Space plants properly to reduce humidity",
        "Remove and destroy infected plant parts",
      ],
      image: "/images/powdery-mildew.png",
    },
    {
      id: "leaf-spot",
      name: "Leaf Spot",
      category: "fungal",
      description:
        "A common term for a group of diseases affecting the foliage of plants and trees. These diseases are characterized by spots on the leaves and are usually caused by fungi.",
      symptoms: [
        "Dark brown or black spots with yellow halos",
        "Spots that grow and merge together",
        "Leaves turning yellow and falling off",
        "Defoliation in severe cases",
      ],
      treatments: {
        organic: ["Copper-based fungicides", "Compost tea spray", "Garlic extract spray"],
        chemical: ["Chlorothalonil", "Mancozeb", "Propiconazole"],
      },
      preventionTips: [
        "Remove and destroy infected leaves",
        "Avoid wetting leaves when watering",
        "Ensure proper spacing for air circulation",
        "Apply preventative treatments during humid conditions",
      ],
      image: "/images/leaf-spot.png",
    },
    {
      id: "black-spot",
      name: "Black Spot",
      category: "fungal",
      description:
        "A fungal disease that primarily affects roses but can also impact other plants. It appears as black spots on leaves and can cause significant defoliation if left untreated.",
      symptoms: [
        "Circular black spots with feathery margins",
        "Yellowing around the black spots",
        "Leaves dropping prematurely",
        "Reduced plant vigor",
      ],
      treatments: {
        organic: ["Baking soda solution", "Neem oil", "Compost tea"],
        chemical: ["Chlorothalonil", "Myclobutanil", "Tebuconazole"],
      },
      preventionTips: [
        "Plant resistant varieties",
        "Provide good air circulation",
        "Avoid overhead watering",
        "Clean up fallen leaves promptly",
      ],
      image: "/images/black-spot.png",
    },
    {
      id: "fire-blight",
      name: "Fire Blight",
      category: "bacterial",
      description:
        "A destructive bacterial disease that affects plants in the Rosaceae family, including apple, pear, and crabapple. It gets its name from the scorched appearance of infected plant tissue.",
      symptoms: [
        "Blackened leaves and stems that look burned",
        "Wilting and death of blossoms and shoots",
        "Bacterial ooze from infected areas",
        "Shepherd's crook appearance of wilted branch tips",
      ],
      treatments: {
        organic: [
          "Prune infected areas (sterilize tools between cuts)",
          "Copper-based bactericides",
          "Biological controls with beneficial bacteria",
        ],
        chemical: ["Streptomycin (during bloom)", "Oxytetracycline", "Kasugamycin"],
      },
      preventionTips: [
        "Plant resistant varieties",
        "Avoid excessive nitrogen fertilization",
        "Prune during dormant season",
        "Control insect pests that can spread the bacteria",
      ],
      image: "/images/fire-blight.png",
    },
    {
      id: "bacterial-leaf-spot",
      name: "Bacterial Leaf Spot",
      category: "bacterial",
      description:
        "A bacterial disease that causes spots on the foliage of plants. It can affect a wide range of plants including vegetables, fruits, and ornamentals.",
      symptoms: [
        "Water-soaked spots that turn brown or black",
        "Yellow halos around spots",
        "Spots with angular shapes (often limited by leaf veins)",
        "Leaf drop in severe infections",
      ],
      treatments: {
        organic: [
          "Copper-based bactericides",
          "Remove and destroy infected plant parts",
          "Avoid working with plants when wet",
        ],
        chemical: ["Copper hydroxide", "Copper sulfate", "Copper octanoate"],
      },
      preventionTips: [
        "Use disease-free seeds and plants",
        "Rotate crops",
        "Avoid overhead irrigation",
        "Space plants for good air circulation",
      ],
      image: "/images/bacterial-leaf-spot.png",
    },
    {
      id: "mosaic-virus",
      name: "Mosaic Virus",
      category: "viral",
      description:
        "A plant virus that causes mottled and discolored plant foliage. It affects many plants including vegetables, fruits, and flowers.",
      symptoms: [
        "Mottled pattern of yellow, white, and light/dark green on leaves",
        "Distorted or curled leaves",
        "Stunted growth",
        "Reduced yield",
      ],
      treatments: {
        organic: [
          "Remove and destroy infected plants",
          "Control insect vectors like aphids",
          "No cure available - focus on prevention",
        ],
        chemical: [
          "No effective chemical treatments",
          "Insecticides to control vectors",
          "Disinfectants for tools and equipment",
        ],
      },
      preventionTips: [
        "Use certified virus-free seeds and plants",
        "Control insect pests that spread viruses",
        "Wash hands and disinfect tools between plants",
        "Remove and destroy infected plants immediately",
      ],
      image: "/images/mosaic-virus.png",
    },
    {
      id: "aphids",
      name: "Aphids",
      category: "pest",
      description:
        "Small sap-sucking insects that can cause significant damage to plants. They reproduce quickly and can transmit plant viruses.",
      symptoms: [
        "Curled, stunted, or yellowing leaves",
        "Sticky honeydew on leaves or ground",
        "Black sooty mold growing on honeydew",
        "Visible clusters of small insects on stems and leaf undersides",
      ],
      treatments: {
        organic: [
          "Strong water spray to dislodge aphids",
          "Insecticidal soap",
          "Neem oil",
          "Introduce beneficial insects (ladybugs, lacewings)",
        ],
        chemical: ["Pyrethrins", "Imidacloprid", "Acetamiprid"],
      },
      preventionTips: [
        "Monitor plants regularly for early detection",
        "Encourage beneficial insects",
        "Avoid excessive nitrogen fertilization",
        "Use reflective mulch to deter aphids",
      ],
      image: "/images/aphids.png",
    },
    {
      id: "spider-mites",
      name: "Spider Mites",
      category: "pest",
      description:
        "Tiny arachnids that feed on plant cells, causing stippling on leaves. They thrive in hot, dry conditions and can reproduce rapidly.",
      symptoms: [
        "Fine webbing on leaves and between stems",
        "Stippled or speckled leaves (tiny yellow or white spots)",
        "Bronzing or yellowing of leaves",
        "Leaf drop in severe infestations",
      ],
      treatments: {
        organic: ["Strong water spray, especially leaf undersides", "Insecticidal soap", "Neem oil", "Predatory mites"],
        chemical: ["Abamectin", "Bifenthrin", "Spiromesifen"],
      },
      preventionTips: [
        "Maintain proper humidity (mites prefer dry conditions)",
        "Regular misting of plants",
        "Introduce predatory mites preventatively",
        "Avoid drought stress",
      ],
      image: "/images/spider-mites.png",
    },
  ]

  // Filter diseases based on search query and category
  const filteredDiseases = diseases.filter((disease) => {
    const matchesSearch =
      disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disease.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || disease.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleDiseaseClick = (disease: Disease) => {
    setSelectedDisease(disease)
    setShowTreatments(false)
  }

  const handleCloseModal = () => {
    setSelectedDisease(null)
  }

  // Handle click outside modal to close it
  const handleModalBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleCloseModal()
    }
  }

  // Particle animation effect
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    color:
      i % 5 === 0
        ? "rgba(16, 185, 129, 0.8)"
        : i % 5 === 1
          ? "rgba(52, 211, 153, 0.6)"
          : i % 5 === 2
            ? "rgba(5, 150, 105, 0.4)"
            : i % 5 === 3
              ? "rgba(139, 92, 246, 0.3)"
              : "rgba(96, 165, 250, 0.5)",
  }))

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
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: particle.color,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 5 + Math.random() * 10,
              ease: "easeInOut",
              delay: Math.random() * 5,
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

        <div className="max-w-6xl mx-auto">
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
              <span>Plant Health Knowledge</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-200 to-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Disease Identification Guide
            </motion.h1>

            <motion.p
              className="text-white/70 text-lg max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Learn to identify common plant diseases, understand their symptoms, and discover effective treatment
              options.
            </motion.p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
              <div className="grid md:grid-cols-5 gap-4">
                <div className="md:col-span-3 relative">
                  <Input
                    type="text"
                    placeholder="Search diseases..."
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50 pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                </div>
                <div className="md:col-span-2 flex flex-wrap gap-2">
                  {[
                    { id: "all", label: "All" },
                    { id: "fungal", label: "Fungal" },
                    { id: "bacterial", label: "Bacterial" },
                    { id: "viral", label: "Viral" },
                    { id: "pest", label: "Pests" },
                  ].map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id as DiseaseCategory)}
                      className={
                        selectedCategory === category.id
                          ? "bg-gradient-to-r from-emerald-500 to-green-400 text-black border-0"
                          : "border-white/20 text-white hover:bg-white/10"
                      }
                    >
                      {category.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Disease Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredDiseases.length > 0 ? (
              filteredDiseases.map((disease, index) => (
                <motion.div
                  key={disease.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                >
                  <Card
                    className="border-0 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-2xl overflow-hidden h-full hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all duration-500 cursor-pointer group"
                    onClick={() => handleDiseaseClick(disease)}
                  >
                    <div className="relative h-48">
                      <Image
                        src={disease.image || "/placeholder.svg"}
                        alt={disease.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex justify-between items-center">
                          <h3 className="text-xl font-bold text-white">{disease.name}</h3>
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              disease.category === "fungal"
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                : disease.category === "bacterial"
                                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                  : disease.category === "viral"
                                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                    : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            }`}
                          >
                            {disease.category.charAt(0).toUpperCase() + disease.category.slice(1)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-white/70 text-sm line-clamp-3">{disease.description}</p>
                      <div className="mt-4 flex justify-between items-center">
                        <div className="text-xs text-white/50">
                          {disease.symptoms.length} symptoms •{" "}
                          {disease.treatments.organic.length + disease.treatments.chemical.length} treatments
                        </div>
                        <div className="flex items-center text-emerald-400 text-sm font-medium group-hover:underline">
                          View Details
                          <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4">
                  <Info className="h-8 w-8 text-white/70" />
                </div>
                <h3 className="text-xl font-bold mb-2">No diseases found</h3>
                <p className="text-white/70">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>

          {/* CTA Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-4">Detect Plant Diseases Instantly</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
                Upload a photo of your plant and our AI will identify any diseases and provide personalized treatment
                recommendations.
              </p>
              <Link href="/detect">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-600 hover:to-green-500 text-black font-medium border-0 h-12 px-8 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                >
                  Detect Disease Now
                  <ArrowUpRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Disease Detail Modal */}
      <AnimatePresence>
        {selectedDisease && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleModalBackdropClick}
          >
            <motion.div
              ref={modalRef}
              className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 md:h-80">
                <Image
                  src={selectedDisease.image || "/placeholder.svg"}
                  alt={selectedDisease.name}
                  fill
                  className="object-cover rounded-t-2xl"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-4 right-4 bg-black/50 border-white/20 text-white hover:bg-white/10 z-10"
                  onClick={handleCloseModal}
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="absolute bottom-6 left-6 right-6">
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                      selectedDisease.category === "fungal"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : selectedDisease.category === "bacterial"
                          ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          : selectedDisease.category === "viral"
                            ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    }`}
                  >
                    {selectedDisease.category.charAt(0).toUpperCase() + selectedDisease.category.slice(1)} Disease
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">{selectedDisease.name}</h2>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-white">About</h3>
                    <p className="text-white/80">{selectedDisease.description}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3 text-white">Common Symptoms</h3>
                    <ul className="space-y-2">
                      {selectedDisease.symptoms.map((symptom, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="bg-emerald-500/20 rounded-full p-1 mt-0.5 flex-shrink-0">
                            <Check className="h-3 w-3 text-emerald-400" />
                          </div>
                          <span className="text-white/80">{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-bold text-white">Treatment Options</h3>
                      <div className="flex gap-2">
                        <Button
                          variant={!showTreatments ? "default" : "outline"}
                          size="sm"
                          onClick={() => setShowTreatments(false)}
                          className={
                            !showTreatments
                              ? "bg-gradient-to-r from-emerald-500 to-green-400 text-black border-0"
                              : "border-white/20 text-white hover:bg-white/10"
                          }
                        >
                          Organic
                        </Button>
                        <Button
                          variant={showTreatments ? "default" : "outline"}
                          size="sm"
                          onClick={() => setShowTreatments(true)}
                          className={
                            showTreatments
                              ? "bg-gradient-to-r from-emerald-500 to-green-400 text-black border-0"
                              : "border-white/20 text-white hover:bg-white/10"
                          }
                        >
                          Chemical
                        </Button>
                      </div>
                    </div>

                    <AnimatePresence mode="wait">
                      {!showTreatments ? (
                        <motion.div
                          key="organic"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm rounded-xl border border-white/10 p-4">
                            <ul className="space-y-2">
                              {selectedDisease.treatments.organic.map((treatment, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <div className="bg-emerald-500/20 rounded-full p-1 mt-0.5 flex-shrink-0">
                                    <Check className="h-3 w-3 text-emerald-400" />
                                  </div>
                                  <span className="text-white/80">{treatment}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="chemical"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm rounded-xl border border-white/10 p-4">
                            <ul className="space-y-2">
                              {selectedDisease.treatments.chemical.map((treatment, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <div className="bg-emerald-500/20 rounded-full p-1 mt-0.5 flex-shrink-0">
                                    <Check className="h-3 w-3 text-emerald-400" />
                                  </div>
                                  <span className="text-white/80">{treatment}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3 text-white">Prevention Tips</h3>
                    <div className="bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm rounded-xl border border-white/10 p-4">
                      <ul className="space-y-2">
                        {selectedDisease.preventionTips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="bg-emerald-500/20 rounded-full p-1 mt-0.5 flex-shrink-0">
                              <Check className="h-3 w-3 text-emerald-400" />
                            </div>
                            <span className="text-white/80">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <Button
                    variant="outline"
                    onClick={handleCloseModal}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Close
                  </Button>
                  <Link href="/detect">
                    <Button className="bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-600 hover:to-green-500 text-black font-medium border-0">
                      Detect This Disease
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
