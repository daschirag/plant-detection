"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Send, X, Leaf, ChevronDown, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

type Message = {
  role: "user" | "assistant" | "system"
  content: string
}

export function PlantChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your plant care assistant powered by PlantBot AI. I can answer questions about plant diseases, care, and prevention. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/plant-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages.filter((msg) => msg.role !== "system"), userMessage],
        }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }])
    } catch (error) {
      console.error("Error sending message:", error)
      setError("Failed to get a response. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 shadow-[0_0_50px_rgba(16,185,129,0.3)] w-80 sm:w-96 mb-4 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 mr-3">
                  <Leaf className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Plant Care Assistant</h3>
                  <p className="text-xs text-white/70">Powered by PlantBot AI</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="h-80 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-emerald-600 scrollbar-track-transparent">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${message.role === "user" ? "ml-auto max-w-[80%]" : "mr-auto max-w-[80%]"}`}
                >
                  <div
                    className={`p-3 rounded-lg ${
                      message.role === "user"
                        ? "bg-emerald-500/20 border border-emerald-500/30 text-white"
                        : "bg-white/10 border border-white/20 text-white/90"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="mr-auto max-w-[80%] mb-4">
                  <div className="p-3 rounded-lg bg-white/10 border border-white/20">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" />
                      <div
                        className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <div
                        className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              {error && (
                <div className="mx-auto max-w-[90%] mb-4">
                  <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-white/90">{error}</p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-white/10">
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="bg-white/5 border border-white/10 rounded-lg p-2 text-xs text-white/70">
                  <p>I can only answer questions about plants, plant diseases, and plant care.</p>
                </div>
                <div className="flex gap-2">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about plant diseases..."
                    className="min-h-[40px] max-h-[120px] bg-white/5 border-white/20 text-white resize-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSubmit(e)
                      }
                    }}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading || !input.trim()}
                    className="bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-600 hover:to-green-500 text-black"
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-600 hover:to-green-500 text-black rounded-full p-4 shadow-[0_0_20px_rgba(16,185,129,0.5)] flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <ChevronDown className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </motion.button>
    </div>
  )
}
