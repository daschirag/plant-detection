"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowRight, Leaf, Upload, Zap, ShieldCheck, Star, Check, ArrowUpRight, Play, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { SeasonalCareCalendar } from "@/app/components/seasonal-care-calendar"
// Import the PlantAssistantShowcase component
import { PlantAssistantShowcase } from "@/app/components/plant-assistant-showcase"

const MOBILE_BREAKPOINT = 768

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const featuresSectionRef = useRef<HTMLDivElement>(null)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const [showFloatingButton, setShowFloatingButton] = useState(false)
  const isMobile = useMobile(MOBILE_BREAKPOINT)

  // For parallax effect
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -300])

  // Particles
  const [particles, setParticles] = useState<
    Array<{ x: number; y: number; size: number; speed: number; opacity: number }>
  >([])

  // For the 3D tilt effect
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setShowFloatingButton(window.scrollY > 300)
    }

    // Create particles
    const newParticles = Array.from({ length: 80 }, () => ({
      x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
      y: Math.random() * (typeof window !== "undefined" ? window.innerHeight * 3 : 3000),
      size: Math.random() * 4 + 1,
      speed: Math.random() * 1 + 0.2,
      opacity: Math.random() * 0.5 + 0.1,
    }))

    setParticles(newParticles)

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // For feature showcase auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect()
      setCursorPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })

      // Calculate tilt based on mouse position
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      setRotateX((e.clientY - rect.top - centerY) / 30)
      setRotateY(-(e.clientX - rect.left - centerX) / 30)
    }
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    // Reset tilt when mouse leaves
    setRotateX(0)
    setRotateY(0)
  }

  const features = [
    {
      icon: <Leaf className="h-6 w-6 text-white" />,
      title: "Accurate Disease Detection",
      description:
        "Our AI model is trained on millions of plant images to provide highly accurate disease identification.",
      color: "from-emerald-500 to-green-400",
    },
    {
      icon: <Zap className="h-6 w-6 text-white" />,
      title: "Instant Results",
      description:
        "Get disease detection results and treatment recommendations within seconds of uploading your image.",
      color: "from-cyan-500 to-blue-400",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-white" />,
      title: "Personalized Recommendations",
      description: "Get tailored treatment plans and medicine recommendations based on your specific plant condition.",
      color: "from-violet-500 to-purple-400",
    },
    {
      icon: <Info className="h-6 w-6 text-white" />,
      title: "Disease Identification Guide",
      description:
        "Access our comprehensive library of plant diseases, symptoms, treatments, and prevention strategies.",
      color: "from-amber-500 to-yellow-400",
    },
    {
      icon: <Upload className="h-6 w-6 text-white" />,
      title: "Easy to Use",
      description: "Our intuitive interface makes it simple for anyone to get the help they need for their plants.",
      color: "from-pink-500 to-rose-400",
    },
    {
      icon: <Check className="h-6 w-6 text-white" />,
      title: "Direct Purchase Links",
      description: "Easily find and purchase recommended treatments and medicines with our integrated shopping links.",
      color: "from-teal-500 to-green-400",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 via-black to-black opacity-90"></div>

        {/* Motion-based background */}
        <motion.div className="absolute inset-0" style={{ y }}>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(16,185,129,0.15)_0%,rgba(0,0,0,0)_60%)]"></div>
          <div className="absolute top-0 right-0 w-1/2 h-2/3 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.3)_0%,rgba(0,0,0,0)_70%)] blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-2/3 h-1/2 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.2)_0%,rgba(0,0,0,0)_70%)] blur-3xl"></div>
          <div className="absolute top-1/3 left-1/4 w-1/3 h-1/3 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.15)_0%,rgba(0,0,0,0)_70%)] blur-3xl"></div>
        </motion.div>

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
              y: [particle.y, particle.y - 500],
              opacity: [0, particle.opacity, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 10 / particle.speed,
              delay: index * 0.05,
              ease: "linear",
            }}
            style={{
              left: `${particle.x}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background:
                index % 5 === 0
                  ? "linear-gradient(to right, #10b981, #34d399)"
                  : index % 5 === 1
                    ? "linear-gradient(to right, #8b5cf6, #a78bfa)"
                    : index % 5 === 2
                      ? "linear-gradient(to right, #059669, #10b981)"
                      : index % 5 === 3
                        ? "linear-gradient(to right, #60a5fa, #3b82f6)"
                        : "linear-gradient(to right, #f59e0b, #fbbf24)",
            }}
          />
        ))}
      </div>
      {/* Floating Action Button */}
      <AnimatePresence>
        {showFloatingButton && (
          <motion.div
            className="fixed bottom-8 right-8 z-50"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link href="/detect">
              <Button className="rounded-full h-16 w-16 bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-600 hover:to-green-500 shadow-[0_0_20px_rgba(16,185,129,0.5)] p-0">
                <Leaf className="h-7 w-7 text-black" />
                <span className="sr-only">Detect Disease</span>
              </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Header */}
      <motion.header
        className="sticky top-0 z-50 backdrop-blur-lg bg-black/20 border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <div className="container flex h-20 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-400 rounded-full animate-pulse blur-sm opacity-70"></div>
              <div className="relative flex items-center justify-center w-full h-full bg-black/30 backdrop-blur-sm rounded-full border border-white/20">
                <Leaf className="h-5 w-5 text-white" />
              </div>
            </div>
            <div>
              <motion.span
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                CropCure
              </motion.span>
              <div className="text-[10px] text-white/50">AI PLANT DISEASE DETECTION</div>
            </div>
          </Link>

          <nav className="hidden md:flex gap-8">
            {["How It Works", "Features", "Disease Guide", "Resources", "About"].map((item, index) => (
              <Link
                key={item}
                href={item === "Disease Guide" ? "/disease-guide" : `#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="group relative text-sm font-medium text-white/70 hover:text-white transition-colors flex flex-col items-center"
              >
                <span>{item}</span>
                <motion.span
                  className="block h-0.5 w-0 bg-gradient-to-r from-emerald-500 to-green-400 group-hover:w-full transition-all duration-300"
                  whileHover={{ width: "100%" }}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden md:block">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 border border-white/0 hover:border-white/20 transition-colors"
              >
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-600 hover:to-green-500 text-black font-medium border-0 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                Get Started
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.header>
      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative min-h-[90vh] overflow-hidden flex items-center"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={handleMouseLeave}
        >
          {isHovering && !isMobile && (
            <motion.div
              className="absolute bg-gradient-to-r from-emerald-500/20 to-green-400/20 rounded-full blur-3xl pointer-events-none"
              animate={{
                x: cursorPosition.x - 150,
                y: cursorPosition.y - 150,
              }}
              transition={{ type: "spring", damping: 15 }}
              style={{
                width: "300px",
                height: "300px",
                opacity: 0.5,
              }}
            />
          )}

          <div className="container px-4 md:px-6 relative">
            <motion.div
              className="absolute top-1/4 right-1/4 w-32 h-32 md:w-64 md:h-64 bg-emerald-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 left-1/4 w-32 h-32 md:w-64 md:h-64 bg-violet-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.1, 0.2],
              }}
              transition={{
                duration: 7,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 1,
              }}
            />

            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                ref={heroContentRef}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-emerald-400"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <span>AI-Powered Plant Disease Detection</span>
                </div>

                <div>
                  <motion.h1
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <div className="overflow-hidden">
                      <motion.span
                        className="block"
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      >
                        Save Your
                      </motion.span>
                    </div>
                    <div className="overflow-hidden mt-1">
                      <motion.span
                        className="block"
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-300">
                          Crops
                        </span>
                      </motion.span>
                    </div>
                  </motion.h1>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <div className="h-1 w-24 md:w-32 bg-gradient-to-r from-emerald-500 to-green-400 mt-6 rounded-full" />
                  </motion.div>
                </div>

                <motion.p
                  className="text-xl text-white/70 md:text-2xl max-w-[600px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  Identify plant diseases instantly using advanced AI and get personalized treatment recommendations.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <Link href="/detect">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-600 hover:to-green-500 text-black font-medium border-0 h-14 px-8 shadow-[0_0_20px_rgba(16,185,129,0.3)] rounded-lg relative overflow-hidden group"
                    >
                      <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                      <span className="relative flex items-center">
                        Detect Disease Now
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 h-14 px-8 rounded-lg group"
                    >
                      <span className="flex items-center">
                        See How It Works
                        <motion.div
                          className="ml-2 bg-gradient-to-r from-emerald-500 to-green-400 rounded-full p-1"
                          whileHover={{ scale: 1.2 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <Play className="h-3 w-3 text-black fill-black" />
                        </motion.div>
                      </span>
                    </Button>
                  </Link>
                </motion.div>

                <motion.div
                  className="flex items-center gap-4 text-white/70"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <div className="flex -space-x-3">
                    {[
                      "from-pink-500 to-purple-500",
                      "from-yellow-500 to-orange-500",
                      "from-blue-500 to-indigo-500",
                      "from-emerald-500 to-green-500",
                    ].map((gradient, i) => (
                      <motion.div
                        key={i}
                        className={`w-10 h-10 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center text-white text-xs border-2 border-black`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 + i * 0.1 }}
                      >
                        {String.fromCharCode(65 + i)}
                      </motion.div>
                    ))}
                  </div>
                  <span className="text-sm">
                    <span className="text-white font-bold">15,000+</span> farmers trust us
                  </span>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                style={{
                  perspective: 1000,
                  transform: isMobile ? "none" : `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                }}
                className="relative mx-auto lg:mx-0 w-full max-w-[500px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-green-400/30 rounded-3xl blur-3xl"></div>
                <div className="relative bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/20 p-6 h-full shadow-[0_0_50px_rgba(16,185,129,0.3)]">
                  {/* 3D floating elements */}
                  <motion.div
                    className="absolute -right-8 -top-8 w-16 h-16 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full blur-xl"
                    animate={{
                      y: [0, -15, 0],
                      opacity: [0.6, 0.8, 0.6],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  />
                  <motion.div
                    className="absolute -left-4 bottom-10 w-20 h-20 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-full blur-xl"
                    animate={{
                      y: [0, 15, 0],
                      opacity: [0.6, 0.4, 0.6],
                    }}
                    transition={{
                      duration: 7,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  />

                  <div className="flex flex-col h-full justify-between">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <motion.div className="w-3 h-3 rounded-full bg-red-400" whileHover={{ scale: 1.3 }} />
                        <motion.div className="w-3 h-3 rounded-full bg-yellow-400" whileHover={{ scale: 1.3 }} />
                        <motion.div className="w-3 h-3 rounded-full bg-green-400" whileHover={{ scale: 1.3 }} />
                      </div>
                      <div className="text-xs text-white/50 flex items-center">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
                        Crop Health Scanner v2.0
                      </div>
                    </div>

                    <motion.div
                      className="bg-gradient-to-b from-emerald-900/50 to-emerald-950/50 rounded-xl border border-emerald-500/20 p-8 flex flex-col items-center justify-center gap-4"
                      whileHover={{
                        boxShadow: "0 0 30px rgba(16,185,129,0.3)",
                        borderColor: "rgba(16,185,129,0.5)",
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <motion.div
                        className="relative w-20 h-20"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                      >
                        <div className="absolute inset-0 bg-emerald-500 rounded-full blur-md opacity-50 animate-pulse"></div>
                        <div className="relative bg-gradient-to-br from-emerald-400 to-green-500 rounded-full p-4 flex items-center justify-center">
                          <Upload className="h-10 w-10 text-white" />
                        </div>
                      </motion.div>
                      <p className="text-sm text-white/70 text-center">
                        Drag and drop your leaf image here or click to browse
                      </p>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button className="bg-white text-emerald-900 hover:bg-white/90 relative overflow-hidden group">
                          <span className="absolute top-0 right-full w-full h-full bg-emerald-200 opacity-30 transform group-hover:translate-x-full transition-transform duration-700" />
                          <span className="relative">Upload Image</span>
                        </Button>
                      </motion.div>
                    </motion.div>

                    <div className="mt-6 grid grid-cols-3 gap-2">
                      {[
                        { label: "Instant Results", icon: Zap },
                        { label: "99% Accuracy", icon: Check },
                        { label: "Expert Advice", icon: Star },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3 text-center hover:bg-white/10 transition-colors cursor-pointer relative overflow-hidden group"
                          whileHover={{ y: -5 }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/10 group-hover:to-emerald-500/20 transition-all duration-500" />
                          <div className="flex flex-col items-center">
                            <item.icon className="h-4 w-4 text-emerald-400 mb-1" />
                            <p className="text-xs text-white/70 relative z-10">{item.label}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Brands Section */}
        <motion.section
          className="py-12 border-t border-white/10 backdrop-blur-sm bg-black/30 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.1)_0%,rgba(0,0,0,0)_70%)]"></div>

          <div className="container px-4 md:px-6">
            <div className="text-center mb-8">
              <p className="text-sm text-white/50 tracking-wider">TRUSTED BY LEADING ORGANIZATIONS</p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              {[1, 2, 3, 4, 5].map((brand) => (
                <motion.div
                  key={brand}
                  initial={{ opacity: 0.3 }}
                  whileHover={{ opacity: 1, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  className="opacity-50 hover:opacity-100 transition-opacity"
                >
                  <div className="w-32 h-16 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/10 hover:border-white/30 transition-all">
                    <span className="text-lg font-bold text-white/80 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                      Brand {brand}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.15)_0%,rgba(0,0,0,0)_70%)]"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm mb-4">
                <span>Simple Process</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">How It Works</h2>
              <p className="text-white/70 max-w-[700px] mx-auto text-lg">
                Our advanced AI technology makes plant disease detection simple, accurate, and accessible to everyone.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Animated Connection Lines */}
              <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-emerald-500 to-green-400 transform -translate-y-1/2 z-0">
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-full bg-white"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  style={{ opacity: 0.5 }}
                />
              </div>
              <div className="hidden md:block absolute top-1/2 right-1/4 left-3/4 h-0.5 bg-gradient-to-r from-green-400 to-emerald-500 transform -translate-y-1/2 z-0">
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-full bg-white"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: 1 }}
                  style={{ opacity: 0.5 }}
                />
              </div>

              {[
                {
                  icon: <Upload className="h-8 w-8 text-white" />,
                  number: 1,
                  title: "Upload",
                  description:
                    "Take a clear photo of the affected leaf and upload it to our platform. Our system accepts various image formats.",
                  delay: 0.1,
                },
                {
                  icon: <Zap className="h-8 w-8 text-white" />,
                  number: 2,
                  title: "Analyze",
                  description:
                    "Our AI instantly analyzes the image to identify the disease, its severity, and potential spread patterns.",
                  delay: 0.3,
                },
                {
                  icon: <ShieldCheck className="h-8 w-8 text-white" />,
                  number: 3,
                  title: "Treatment",
                  description:
                    "Receive personalized treatment recommendations and medicine options with direct purchase links.",
                  delay: 0.5,
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: step.delay }}
                >
                  <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20 relative overflow-hidden group hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-500 h-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative">
                      <motion.div
                        className="bg-gradient-to-br from-emerald-400 to-green-500 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 1, type: "spring" }}
                      >
                        {step.icon}
                      </motion.div>
                      <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-white flex items-center justify-center text-emerald-900 font-bold">
                        {step.number}
                      </div>
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-emerald-400 transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-white/70">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Link href="/detect">
                <Button className="bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-600 hover:to-green-500 text-black font-medium border-0 h-14 px-8 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  Try It Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Seasonal Care Calendar Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/50 to-black/50"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm">
                  <span>Personalized Care</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                  <span className="block">Seasonal Plant Care</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-300">
                    Calendar
                  </span>
                </h2>
                <p className="text-white/70 text-lg">
                  Never miss an important plant care task with our personalized seasonal reminders. Get customized care
                  schedules based on your plant types and local climate.
                </p>
                <ul className="space-y-4">
                  {[
                    "Season-specific care recommendations",
                    "Custom reminders for your unique plants",
                    "Sync with your calendar app",
                    "Prioritized tasks to keep plants healthy",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      <div className="bg-gradient-to-br from-emerald-400 to-green-500 rounded-full p-1 mt-0.5">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <SeasonalCareCalendar />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Showcase Section */}
        <section ref={featuresSectionRef} id="features" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-5"></div>
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15)_0%,rgba(0,0,0,0)_70%)] blur-3xl"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm mb-4">
                <span>Advanced Capabilities</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Powerful Features</h2>
              <p className="text-white/70 max-w-[700px] mx-auto text-lg">
                CropCure combines cutting-edge AI technology with expert plant knowledge to provide comprehensive care
                solutions.
              </p>
            </motion.div>

            {/* Interactive Feature Showcase */}
            <div className="max-w-6xl mx-auto mb-16">
              <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-10 border border-white/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/50"></div>

                {/* Feature Preview */}
                <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      key={activeFeature}
                      className="space-y-2"
                    >
                      <div
                        className={`bg-gradient-to-br ${features[activeFeature].color} rounded-full w-12 h-12 flex items-center justify-center`}
                      >
                        {features[activeFeature].icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white mt-4">{features[activeFeature].title}</h3>
                      <p className="text-white/70">{features[activeFeature].description}</p>
                    </motion.div>

                    <div className="pt-4">
                      <Link href="/features">
                        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 group">
                          <span className="flex items-center">
                            Explore All Features
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="relative aspect-video bg-black/50 rounded-xl overflow-hidden border border-white/10">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        key={activeFeature}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center p-6"
                      >
                        <div
                          className={`w-20 h-20 mx-auto bg-gradient-to-br ${features[activeFeature].color} rounded-full flex items-center justify-center mb-4`}
                        >
                          {features[activeFeature].icon}
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">{features[activeFeature].title}</h4>
                      </motion.div>
                    </div>

                    {/* Animated background */}
                    <div className="absolute inset-0 opacity-20">
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${features[activeFeature].color} blur-2xl`}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Feature Navigation */}
                <div className="mt-10 relative z-10">
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {features.map((feature, index) => (
                      <motion.button
                        key={index}
                        className={`p-2 rounded-lg transition-all duration-300 ${
                          activeFeature === index
                            ? `bg-gradient-to-r ${feature.color} text-white`
                            : "bg-white/5 text-white/60 hover:bg-white/10"
                        }`}
                        onClick={() => setActiveFeature(index)}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="text-center">
                          <div className="mx-auto w-8 h-8 flex items-center justify-center">{feature.icon}</div>
                          <p className="text-xs mt-1 font-medium">{feature.title.split(" ")[0]}</p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 h-full relative overflow-hidden hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all duration-500">
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color}`}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative">
                      <div
                        className={`bg-gradient-to-br ${feature.color} rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}
                      >
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-white/70">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.1)_0%,rgba(0,0,0,0)_70%)]"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm mb-4">
                <span>Success Stories</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">What Our Users Say</h2>
              <p className="text-white/70 max-w-[700px] mx-auto text-lg">
                Hear from gardeners and plant enthusiasts who have saved their plants with CropCure.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Home Gardener",
                  content:
                    "CropCure saved my tomato plants! I was about to give up when I discovered this app. The disease detection was spot on, and the treatment worked perfectly.",
                  delay: 0.1,
                  gradient: "from-emerald-500 to-green-400",
                },
                {
                  name: "Michael Chen",
                  role: "Urban Farmer",
                  content:
                    "As someone who manages multiple plant varieties, this tool has been invaluable. The accuracy and speed of diagnosis have helped me prevent disease spread across my urban farm.",
                  delay: 0.3,
                  gradient: "from-violet-500 to-purple-400",
                },
                {
                  name: "Emily Rodriguez",
                  role: "Plant Enthusiast",
                  content:
                    "I love how easy it is to use! Take a photo, upload, and within seconds I know exactly what's wrong with my plants and how to fix it. Absolutely worth every penny.",
                  delay: 0.5,
                  gradient: "from-cyan-500 to-blue-400",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: testimonial.delay }}
                  whileHover={{ y: -10 }}
                >
                  <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20 h-full relative overflow-hidden group hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all duration-500">
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${testimonial.gradient}`}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative">
                      <div className="flex items-center mb-6">
                        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonial.gradient} mr-4 p-0.5`}>
                          <div className="w-full h-full rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
                            <span className="text-lg font-bold text-white">{testimonial.name[0]}</span>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-white">{testimonial.name}</h4>
                          <p className="text-sm text-white/70">{testimonial.role}</p>
                        </div>
                      </div>
                      <div className="mb-4 flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 text-yellow-400 ${star <= 4 ? "fill-yellow-400" : ""}`}
                          />
                        ))}
                      </div>
                      <p className="text-white/70 italic">"{testimonial.content}"</p>

                      {/* Quote mark */}
                      <div className="absolute top-2 right-2 text-5xl font-serif text-white/10">"</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Plant Assistant Showcase Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black to-emerald-950/30"></div>
          <div className="container px-4 md:px-6 relative">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm mb-4">
                <span>AI-Powered Assistance</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Crop Care Assistant</h2>
              <p className="text-white/70 max-w-[700px] mx-auto text-lg">
                Get expert advice on plant diseases, care, and prevention with our specialized AI assistant powered by
                PlantBot AI
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              <PlantAssistantShowcase />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 to-black"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-10"></div>

          {/* Animated particles */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-emerald-500/30 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            style={{ transform: "translate(-50%, -50%)" }}
          />

          <div className="container px-4 md:px-6 relative">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span>Limited Time Offer</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
                  <span className="block">Ready to save your</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-400 animate-gradient">
                    crops today?
                  </span>
                </h2>
                <p className="text-white/70 text-xl max-w-2xl mx-auto">
                  Join thousands of gardeners and plant enthusiasts who trust CropCure to keep their plants healthy and
                  thriving.
                </p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <Link href="/detect">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-600 hover:to-green-500 text-black font-medium border-0 h-14 px-8 shadow-[0_0_20px_rgba(16,185,129,0.3)] rounded-lg relative overflow-hidden group"
                    >
                      <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                      <span className="relative flex items-center">
                        Detect Disease Now
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Button>
                  </Link>
                  <Link href="/disease-guide">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 h-14 px-8 rounded-lg group"
                    >
                      <span className="flex items-center">
                        Disease Guide
                        <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                      </span>
                    </Button>
                  </Link>
                </motion.div>
                <motion.p
                  className="text-white/50 text-sm flex items-center justify-center gap-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <Check className="h-4 w-4 text-emerald-400" />
                  No credit card required. 7-day free trial.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      ;
      <footer className="border-t border-white/10 bg-black/50 backdrop-blur-sm relative z-10">
        <div className="container px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 bg-emerald-500 rounded-full blur-sm opacity-70"></div>
                  <div className="relative flex items-center justify-center w-full h-full">
                    <Leaf className="h-5 w-5 text-white" />
                  </div>
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-300">
                  CropCure
                </span>
              </Link>
              <p className="text-sm text-white/70">
                AI-powered plant disease detection and treatment recommendations for healthier plants.
              </p>
              <div className="flex gap-4">
                {["Twitter", "Instagram", "Facebook"].map((social) => (
                  <Link
                    key={social}
                    href="#"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white/50 hover:bg-white/20 hover:text-white transition-colors"
                    aria-label={social}
                  >
                    {social[0]}
                  </Link>
                ))}
              </div>
            </div>

            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "FAQ"],
              },
              {
                title: "Resources",
                links: ["Blog", "Plant Guides", "Disease Library"],
              },
              {
                title: "Company",
                links: ["About Us", "Contact", "Privacy Policy", "Terms of Service"],
              },
            ].map((section) => (
              <div key={section.title}>
                <h3 className="text-white font-bold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <Link
                        href={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-white/70 hover:text-white transition-colors text-sm flex items-center group"
                      >
                        <span>{link}</span>
                        <ArrowRight className="ml-1 h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 text-sm text-white/50 flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} CropCure. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/sitemap" className="hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
