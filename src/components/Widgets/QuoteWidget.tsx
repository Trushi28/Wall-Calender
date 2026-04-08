'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, RefreshCw, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "The future belongs to those who believe in beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { text: "Be the change you wish to see in the world.", author: "Mahatma Gandhi" },
  { text: "Success is not final, failure is not fatal.", author: "Winston Churchill" },
]

export function QuoteWidget() {
  const [idx, setIdx] = useState(0)
  const [isChanging, setIsChanging] = useState(false)
  
  useEffect(() => {
    setIdx(Math.floor(Math.random() * quotes.length))
  }, [])

  const nextQuote = useCallback(() => {
    setIsChanging(true)
    setTimeout(() => {
      setIdx(i => (i + 1) % quotes.length)
      setIsChanging(false)
    }, 300)
  }, [])

  const quote = quotes[idx]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative bg-gradient-to-br from-amber-500/10 via-card to-orange-500/10 backdrop-blur-sm 
                 rounded-2xl p-5 shadow-lg border border-amber-200/30 dark:border-amber-500/20
                 overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {/* Decorative quote marks */}
      <div className="absolute top-2 left-2 opacity-[0.07]">
        <Quote className="w-8 h-8 text-amber-500" />
      </div>
      <div className="absolute bottom-2 right-2 opacity-[0.07] rotate-180">
        <Quote className="w-6 h-6 text-amber-500" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
            </motion.div>
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Daily Inspiration
            </span>
          </div>
          <motion.button
            onClick={nextQuote}
            className="p-1.5 rounded-full hover:bg-amber-500/20 transition-colors"
            whileHover={{ rotate: 180 }}
            whileTap={{ scale: 0.9 }}
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-500" />
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm text-main italic leading-relaxed font-medium">
              &ldquo;{quote.text}&rdquo;
            </p>
            <motion.p 
              className="text-xs text-amber-600 dark:text-amber-400 mt-3 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              — {quote.author}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
