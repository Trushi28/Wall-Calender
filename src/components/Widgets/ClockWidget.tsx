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

  // Calculate rotation for analog indicators
  const secRotation = (seconds / 60) * 360
  const minRotation = (minutes / 60) * 360
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      whileHover={{ y: -4, scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
      className="relative bg-gradient-to-br from-card to-card/80 backdrop-blur-sm rounded-2xl p-5 
                 shadow-lg border border-white/20 dark:border-white/10 overflow-hidden
                 hover:border-accent/30 transition-all duration-300"
    >
      {/* Animated background rings */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div 
          className="absolute -right-8 -top-8 w-32 h-32 rounded-full border border-accent"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div 
          className="absolute -right-4 -top-4 w-24 h-24 rounded-full border border-accent/50"
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 4 }}
          >
            <Clock className="w-4 h-4 text-accent" />
          </motion.div>
          <span className="text-xs font-semibold text-muted uppercase tracking-wider">Current Time</span>
        </div>
        
        <div className="flex items-baseline gap-1">
          <motion.span 
            key={`h-${displayHours}`}
            initial={{ y: -20, opacity: 0, filter: 'blur(4px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="text-5xl font-extralight text-main tabular-nums"
          >
            {pad(displayHours)}
          </motion.span>
          <motion.span 
            className="text-5xl font-extralight text-accent"
            animate={{ opacity: [1, 0.2, 1], scale: [1, 0.95, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >:</motion.span>
          <motion.span 
            key={`m-${minutes}`}
            initial={{ y: -20, opacity: 0, filter: 'blur(4px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="text-5xl font-extralight text-main tabular-nums"
          >
            {pad(minutes)}
          </motion.span>
          <div className="flex flex-col ml-2">
            <motion.span 
              key={`s-${seconds}`}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-lg font-medium text-accent tabular-nums"
            >
              {pad(seconds)}
            </motion.span>
            <span className="text-xs font-bold text-muted">{isPM ? 'PM' : 'AM'}</span>
          </div>
        </div>
        
        {/* Mini progress bar for seconds */}
        <div className="mt-3 h-1 bg-faint/30 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(seconds / 60) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        <motion.p 
          className="text-sm text-muted mt-3 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          {time.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
        </motion.p>
      </div>
    </motion.div>
  )
}
