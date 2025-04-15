"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MessageSquare, Leaf, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function PlantAssistantShowcase() {
  const [activeQuestion, setActiveQuestion] = useState(0)

  const sampleQuestions = [
    {
      question: "How do I identify powdery mildew on my plants?",
      answer:
        "Powdery mildew appears as white to gray powdery spots on leaf surfaces, stems, and sometimes fruit. Look for white powdery patches, yellowing leaves, distorted growth, and premature leaf drop. It's most common in humid conditions with poor air circulation.",
    },
    {
      question: "What's the best organic treatment for aphids?",
      answer:
        "For aphids, try these organic solutions: 1) Strong water spray to dislodge them, 2) Insecticidal soap spray, 3) Neem oil solution, or 4) Introducing beneficial insects like ladybugs. For severe infestations, apply these treatments every 5-7 days until controlled.",
    },
    {
      question: "How often should I water my indoor plants?",
      answer:
        "Indoor plant watering depends on the plant type, pot size, and environment. Generally, water when the top 1-2 inches of soil feels dry. Most houseplants need watering once every 1-2 weeks. Signs of overwatering include yellowing leaves and soggy soil, while underwatering causes wilting and dry soil.",
    },
  ]

  return (
    <Card className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.2)]">
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-6">
        <div className="flex items-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 mr-3">
            <MessageSquare className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Plant Care Assistant</h2>
            <p className="text-white/70">Powered by PlantBot AI</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <p className="text-white/80">
            Our AI assistant is specialized in plant care and can answer your questions about:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              "Plant disease identification and symptoms",
              "Treatment options (organic and chemical)",
              "Plant care best practices",
              "Gardening techniques and tips",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="bg-emerald-500/20 rounded-full p-1 mt-0.5">
                  <Leaf className="h-3 w-3 text-emerald-400" />
                </div>
                <span className="text-white/70">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm rounded-xl border border-white/10 p-4 mb-6">
          <h3 className="text-lg font-medium mb-3 flex items-center">
            <MessageSquare className="h-4 w-4 mr-2 text-emerald-400" />
            Example Conversations
          </h3>

          <div className="space-y-4">
            {sampleQuestions.map((item, index) => (
              <motion.div
                key={index}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  activeQuestion === index
                    ? "bg-emerald-500/20 border border-emerald-500/30"
                    : "bg-white/5 border border-white/10 hover:bg-white/10"
                }`}
                onClick={() => setActiveQuestion(index)}
                whileHover={{ y: -2 }}
              >
                <p className="font-medium text-white">{item.question}</p>
                {activeQuestion === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 text-sm text-white/70 border-t border-white/10 pt-3"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-white/70 mb-4">Have a question about your plants? Our AI assistant is here to help!</p>
          <Button className="bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-600 hover:to-green-500 text-black font-medium">
            Ask the Plant Assistant
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
