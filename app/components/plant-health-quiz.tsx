"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X, ArrowRight, Leaf, AlertTriangle, Info, ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

type Question = {
  id: number
  text: string
  image?: string
  options: {
    id: string
    text: string
    correct: boolean
    explanation: string
  }[]
}

type Result = {
  title: string
  description: string
  icon: React.ReactNode
  color: string
  recommendations: string[]
  nextSteps: {
    text: string
    link: string
    icon: React.ReactNode
  }[]
}

export function PlantHealthQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [quizComplete, setQuizComplete] = useState(false)

  const questions: Question[] = [
    {
      id: 1,
      text: "What do you see on these leaves?",
      image: "/images/powdery-mildew.png",
      options: [
        {
          id: "a",
          text: "White powdery spots",
          correct: true,
          explanation:
            "Correct! The white powdery substance on the leaves is a classic sign of powdery mildew, a common fungal disease.",
        },
        {
          id: "b",
          text: "Yellow spots with brown centers",
          correct: false,
          explanation:
            "Not quite. The image shows white powdery patches, which is characteristic of powdery mildew, not leaf spot.",
        },
        {
          id: "c",
          text: "Small insects",
          correct: false,
          explanation:
            "These are not insects. The white patches you see are fungal growth (powdery mildew) on the leaf surface.",
        },
        {
          id: "d",
          text: "Webbing",
          correct: false,
          explanation: "There's no webbing visible. The white substance is powdery mildew, a fungal disease.",
        },
      ],
    },
    {
      id: 2,
      text: "What are these tiny yellow-green insects on the leaf?",
      image: "/images/aphids.png",
      options: [
        {
          id: "a",
          text: "Spider mites",
          correct: false,
          explanation: "Spider mites are much smaller and typically appear as tiny moving dots. These are aphids.",
        },
        {
          id: "b",
          text: "Aphids",
          correct: true,
          explanation:
            "Correct! These are aphids, small sap-sucking insects that can quickly colonize plants and cause damage.",
        },
        {
          id: "c",
          text: "Whiteflies",
          correct: false,
          explanation: "Whiteflies are white and fly when disturbed. These stationary yellow-green insects are aphids.",
        },
        {
          id: "d",
          text: "Scale insects",
          correct: false,
          explanation:
            "Scale insects typically have a protective shell-like covering. These exposed insects are aphids.",
        },
      ],
    },
    {
      id: 3,
      text: "What type of damage pattern is shown on these leaves?",
      image: "/images/spider-mites.png",
      options: [
        {
          id: "a",
          text: "Chewing damage",
          correct: false,
          explanation:
            "Chewing damage would show irregular holes or notches in leaves. This shows stippling (tiny dots).",
        },
        {
          id: "b",
          text: "Bacterial infection",
          correct: false,
          explanation:
            "Bacterial infections typically cause water-soaked spots or blotches. This stippled pattern is characteristic of spider mites.",
        },
        {
          id: "c",
          text: "Stippling from spider mites",
          correct: true,
          explanation:
            "Correct! This stippled or speckled appearance with tiny light-colored dots is classic spider mite damage.",
        },
        {
          id: "d",
          text: "Nutrient deficiency",
          correct: false,
          explanation:
            "Nutrient deficiencies typically cause more uniform discoloration. This pattern of tiny dots is spider mite damage.",
        },
      ],
    },
    {
      id: 4,
      text: "What is the best first step when you notice a plant disease?",
      options: [
        {
          id: "a",
          text: "Immediately apply fungicides",
          correct: false,
          explanation:
            "It's better to identify the problem first. Not all plant issues require fungicides, and using the wrong treatment can be ineffective or harmful.",
        },
        {
          id: "b",
          text: "Identify the specific problem",
          correct: true,
          explanation: "Correct! Proper identification is crucial for selecting the right treatment approach.",
        },
        {
          id: "c",
          text: "Remove the entire plant",
          correct: false,
          explanation:
            "This is too drastic for most plant problems. Many issues can be treated without removing the entire plant.",
        },
        {
          id: "d",
          text: "Increase watering",
          correct: false,
          explanation:
            "Increasing water can actually worsen many plant diseases, especially fungal ones that thrive in moist conditions.",
        },
      ],
    },
    {
      id: 5,
      text: "Which of these is an effective organic treatment for aphids?",
      options: [
        {
          id: "a",
          text: "Baking soda spray",
          correct: false,
          explanation: "Baking soda spray is more effective against fungal diseases like powdery mildew, not aphids.",
        },
        {
          id: "b",
          text: "Strong jet of water",
          correct: true,
          explanation:
            "Correct! A strong spray of water can dislodge aphids from plants and is an effective first treatment step.",
        },
        {
          id: "c",
          text: "Epsom salt solution",
          correct: false,
          explanation: "Epsom salt (magnesium sulfate) is used as a nutrient supplement, not as an insect control.",
        },
        {
          id: "d",
          text: "Coffee grounds",
          correct: false,
          explanation:
            "While coffee grounds can benefit soil, they're not an effective treatment for aphid infestations.",
        },
      ],
    },
  ]

  const results: Result[] = [
    {
      title: "Plant Health Novice",
      description:
        "You're just starting your plant care journey. With a bit more knowledge, you'll be saving plants in no time!",
      icon: <Leaf className="h-8 w-8 text-white" />,
      color: "from-amber-500 to-orange-400",
      recommendations: [
        "Start with our beginner's guide to plant diseases",
        "Focus on prevention techniques for common issues",
        "Practice identifying basic symptoms on your plants",
      ],
      nextSteps: [
        {
          text: "Read Plant Basics Guide",
          link: "/guides/basics",
          icon: <Info className="h-4 w-4" />,
        },
        {
          text: "Try Disease Detection",
          link: "/detect",
          icon: <ArrowUpRight className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "Growing Gardener",
      description: "You have a good foundation of plant health knowledge. Keep learning to become an expert!",
      icon: <Leaf className="h-8 w-8 text-white" />,
      color: "from-emerald-500 to-green-400",
      recommendations: [
        "Expand your knowledge of treatment options",
        "Learn to distinguish between similar-looking diseases",
        "Practice early detection of plant problems",
      ],
      nextSteps: [
        {
          text: "Explore Disease Guide",
          link: "/disease-guide",
          icon: <Info className="h-4 w-4" />,
        },
        {
          text: "Try Disease Detection",
          link: "/detect",
          icon: <ArrowUpRight className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "Plant Health Expert",
      description: "Impressive! You have excellent knowledge of plant diseases and treatments.",
      icon: <Leaf className="h-8 w-8 text-white" />,
      color: "from-blue-500 to-indigo-400",
      recommendations: [
        "Share your knowledge with other gardeners",
        "Explore advanced treatment techniques",
        "Learn about less common plant diseases",
      ],
      nextSteps: [
        {
          text: "Join Community Forum",
          link: "/community",
          icon: <Info className="h-4 w-4" />,
        },
        {
          text: "Try Disease Detection",
          link: "/detect",
          icon: <ArrowUpRight className="h-4 w-4" />,
        },
      ],
    },
  ]

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId)
    setShowExplanation(true)

    const selectedOption = questions[currentQuestion].options.find((option) => option.id === optionId)
    if (selectedOption?.correct) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    setSelectedOption(null)
    setShowExplanation(false)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizComplete(true)
    }
  }

  const getResult = () => {
    const percentage = (score / questions.length) * 100
    if (percentage < 40) return results[0]
    if (percentage < 80) return results[1]
    return results[2]
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedOption(null)
    setShowExplanation(false)
    setScore(0)
    setQuizComplete(false)
  }

  const currentQuestionData = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.2)]">
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-4 md:p-6">
        <div className="flex items-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 mr-3">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white">Plant Health Assessment</h2>
        </div>
      </div>

      <div className="p-4 md:p-6">
        <AnimatePresence mode="wait">
          {!quizComplete ? (
            <motion.div
              key="question"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2 text-sm">
                  <span className="text-white/70">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="text-white/70">
                    Score: {score}/{currentQuestion}
                  </span>
                </div>
                <Progress
                  value={progress}
                  className="h-2 bg-white/10"
                  indicatorClassName="bg-gradient-to-r from-emerald-500 to-green-400"
                />
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold">{currentQuestionData.text}</h3>

                {currentQuestionData.image && (
                  <div className="relative h-48 md:h-64 rounded-lg overflow-hidden border border-white/20">
                    <Image
                      src={currentQuestionData.image || "/placeholder.svg"}
                      alt="Plant disease image"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="space-y-3">
                  {currentQuestionData.options.map((option) => (
                    <motion.button
                      key={option.id}
                      className={`w-full text-left p-4 rounded-lg border transition-all ${
                        selectedOption === option.id
                          ? option.correct
                            ? "bg-emerald-500/20 border-emerald-500/50"
                            : "bg-red-500/20 border-red-500/50"
                          : "bg-white/5 border-white/20 hover:bg-white/10"
                      } ${selectedOption !== null && selectedOption !== option.id ? "opacity-60" : ""}`}
                      onClick={() => !selectedOption && handleOptionSelect(option.id)}
                      disabled={selectedOption !== null}
                      whileHover={{ scale: selectedOption === null ? 1.02 : 1 }}
                      whileTap={{ scale: selectedOption === null ? 0.98 : 1 }}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                            selectedOption === option.id
                              ? option.correct
                                ? "bg-emerald-500 text-white"
                                : "bg-red-500 text-white"
                              : "bg-white/10 text-white/70"
                          }`}
                        >
                          {selectedOption === option.id ? (
                            option.correct ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <X className="h-4 w-4" />
                            )
                          ) : (
                            option.id
                          )}
                        </div>
                        <span>{option.text}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <AnimatePresence>
                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`p-4 rounded-lg ${
                        currentQuestionData.options.find((o) => o.id === selectedOption)?.correct
                          ? "bg-emerald-500/20 border border-emerald-500/30"
                          : "bg-amber-500/20 border border-amber-500/30"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {currentQuestionData.options.find((o) => o.id === selectedOption)?.correct ? (
                          <Check className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                        )}
                        <div>
                          <p className="text-white/90">
                            {currentQuestionData.options.find((o) => o.id === selectedOption)?.explanation}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-end">
                  <Button
                    onClick={handleNextQuestion}
                    disabled={!selectedOption}
                    className={`bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-600 hover:to-green-500 text-black font-medium ${
                      !selectedOption ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="mb-8">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center mb-4">
                  {getResult().icon}
                </div>
                <h3 className="text-2xl font-bold mb-2">{getResult().title}</h3>
                <p className="text-white/70">
                  You scored {score} out of {questions.length}
                </p>

                <div className="w-full bg-white/10 h-2 rounded-full mt-6 mb-2">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${getResult().color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(score / questions.length) * 100}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
                <p className="text-sm text-white/50">{Math.round((score / questions.length) * 100)}% correct</p>
              </div>

              <div className="text-left mb-8">
                <h4 className="text-lg font-bold mb-3">About Your Result</h4>
                <p className="text-white/80 mb-4">{getResult().description}</p>

                <h4 className="text-lg font-bold mb-3">Recommendations</h4>
                <ul className="space-y-2 mb-6">
                  {getResult().recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="bg-emerald-500/20 rounded-full p-1 mt-0.5 flex-shrink-0">
                        <Check className="h-3 w-3 text-emerald-400" />
                      </div>
                      <span className="text-white/80">{recommendation}</span>
                    </li>
                  ))}
                </ul>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {getResult().nextSteps.map((step, index) => (
                    <Link href={step.link} key={index}>
                      <Button
                        variant="outline"
                        className="w-full border-white/20 text-white hover:bg-white/10 justify-start"
                      >
                        {step.icon}
                        <span className="ml-2">{step.text}</span>
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>

              <Button
                onClick={resetQuiz}
                className="bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-600 hover:to-green-500 text-black font-medium"
              >
                Take Quiz Again
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
