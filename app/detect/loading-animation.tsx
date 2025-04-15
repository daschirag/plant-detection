"use client"

import { motion } from "framer-motion"
import { Leaf } from "lucide-react"

interface LoadingAnimationProps {
  progress: number
}

export function LoadingAnimation({ progress }: LoadingAnimationProps) {
  return (
    <div className="text-center space-y-8 py-12">
      <motion.div
        className="relative w-32 h-32 mx-auto"
        animate={{
          rotateZ: [0, 360],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 border-dashed"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-500 animate-spin"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative w-20 h-20"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <div className="absolute inset-0 bg-emerald-500 rounded-full blur-md opacity-50 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-emerald-400 to-green-500 rounded-full p-4 flex items-center justify-center">
              <Leaf className="h-10 w-10 text-white" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h3 className="text-3xl font-bold mb-3">Analyzing your plant...</h3>
        <p className="text-white/70 text-lg mb-6">Our AI is examining the leaf image to identify any diseases</p>
        <div className="max-w-md mx-auto">
          <div className="h-2 bg-emerald-950/50 rounded-full overflow-hidden mb-1 relative">
            <motion.div
              className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-emerald-500 to-green-400 rounded-full"
              style={{ width: `${progress}%` }}
              initial={{ width: "0%" }}
            />
            <motion.div
              className="absolute top-0 bottom-0 left-0 right-0 bg-white/30"
              animate={{ x: ["0%", "100%"] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1,
                ease: "linear",
              }}
              style={{ width: "30%", opacity: 0.5 }}
            />
          </div>
          <p className="text-sm text-white/50 flex justify-between">
            <span>Analyzing image...</span>
            <span>{progress}%</span>
          </p>
        </div>
      </motion.div>

      {/* Analysis visualization */}
      <motion.div
        className="max-w-md mx-auto mt-6 grid grid-cols-10 gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="h-1.5 bg-emerald-500/30 rounded-full"
            initial={{ scaleY: 0 }}
            animate={{
              scaleY: Math.random() * 3 + 0.2,
              opacity: Math.random() * 0.8 + 0.2,
              backgroundColor: `rgba(${16 + Math.floor(Math.random() * 20)}, ${185 - Math.floor(Math.random() * 40)}, ${129 - Math.floor(Math.random() * 30)}, ${0.3 + Math.random() * 0.5})`,
            }}
            transition={{
              duration: 0.2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: i * 0.02,
            }}
            style={{ transformOrigin: "bottom" }}
          />
        ))}
      </motion.div>

      <div className="text-sm text-white/50 mt-8 max-w-md mx-auto">
        <p>Our AI is analyzing:</p>
        <ul className="mt-2 space-y-1">
          <motion.li
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="flex items-center"
          >
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
            Leaf patterns and discoloration
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 }}
            className="flex items-center"
          >
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
            Identifying disease markers
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2 }}
            className="flex items-center"
          >
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
            Matching with known plant pathogens
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.5 }}
            className="flex items-center"
          >
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
            Generating treatment recommendations
          </motion.li>
        </ul>
      </div>
    </div>
  )
}
