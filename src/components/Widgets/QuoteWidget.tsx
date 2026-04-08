'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "The future belongs to those who believe in beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
]

export function QuoteWidget() {
  const [quote, setQuote] = useState(quotes[0])
  
  useEffect(() => {
    const idx = Math.floor(Math.random() * quotes.length)
    setQuote(quotes[idx])
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.2 }}
      whileHover={{ y: -2 }}
      className="bg-card/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/10
                 hover:shadow-xl hover:border-accent/20 transition-all duration-300"
    >
      <Quote className="w-5 h-5 text-accent mb-3" />
      <p className="text-sm text-main italic leading-relaxed">&ldquo;{quote.text}&rdquo;</p>
      <p className="text-xs text-muted mt-2">— {quote.author}</p>
    </motion.div>
  )
}
