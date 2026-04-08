'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'

export function ClockWidget() {
  const [time, setTime] = useState<Date | null>(null)
  
  useEffect(() => {
    setTime(new Date())
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])
  
  if (!time) return null
  
  const hours = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()
  const isPM = hours >= 12
  const displayHours = hours % 12 || 12
  
  const pad = (n: number) => n.toString().padStart(2, '0')
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      whileHover={{ y: -2 }}
      className="bg-card/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/10 
                 hover:shadow-xl hover:border-accent/20 transition-all duration-300"
    >
      <div className="flex items-center gap-2 mb-3">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <Clock className="w-4 h-4 text-accent" />
        </motion.div>
        <span className="text-xs font-medium text-muted uppercase tracking-wide">Current Time</span>
      </div>
      
      <div className="flex items-baseline gap-1">
        <motion.span 
          key={`h-${displayHours}`}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-light text-main tabular-nums"
        >
          {pad(displayHours)}
        </motion.span>
        <motion.span 
          className="text-4xl font-light text-accent"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >:</motion.span>
        <motion.span 
          key={`m-${minutes}`}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-light text-main tabular-nums"
        >
          {pad(minutes)}
        </motion.span>
        <motion.span 
          key={`s-${seconds}`}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-lg text-muted ml-1 tabular-nums"
        >
          {pad(seconds)}
        </motion.span>
        <span className="text-sm font-medium text-accent ml-2">{isPM ? 'PM' : 'AM'}</span>
      </div>
      
      <p className="text-sm text-muted mt-2">
        {time.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
      </p>
    </motion.div>
  )
}
