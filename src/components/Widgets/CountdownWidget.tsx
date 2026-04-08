'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Target, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns'

export function CountdownWidget() {
  const [now, setNow] = useState(new Date())
  
  // Target: Next major event - configurable
  const target = useMemo(() => {
    const today = new Date()
    // Find next significant date
    const events = [
      { date: new Date(today.getFullYear(), 0, 1), name: 'New Year' },
      { date: new Date(today.getFullYear(), 0, 26), name: 'Republic Day' },
      { date: new Date(today.getFullYear(), 7, 15), name: 'Independence Day' },
      { date: new Date(today.getFullYear(), 9, 2), name: 'Gandhi Jayanti' },
      { date: new Date(today.getFullYear(), 11, 25), name: 'Christmas' },
    ]
    
    // Find next upcoming event
    for (const event of events) {
      if (event.date > today) {
        return event
      }
      // Check next year
      event.date.setFullYear(today.getFullYear() + 1)
      if (event.date > today) {
        return event
      }
    }
    return { date: new Date(today.getFullYear() + 1, 0, 1), name: 'New Year' }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const days = Math.max(0, differenceInDays(target.date, now))
  const hours = Math.max(0, differenceInHours(target.date, now) % 24)
  const minutes = Math.max(0, differenceInMinutes(target.date, now) % 60)
  const seconds = Math.max(0, differenceInSeconds(target.date, now) % 60)

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center">
      <motion.div
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center',
          'bg-gradient-to-br from-violet-500/20 to-purple-500/20',
          'border border-violet-300/30 dark:border-violet-500/20'
        )}
      >
        <span className="text-xl font-bold text-violet-600 dark:text-violet-400 tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
      </motion.div>
      <span className="text-[10px] text-muted mt-1 uppercase tracking-wide">{label}</span>
    </div>
  )

  return (
    <motion.div
      className="p-4 rounded-2xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 
                 border border-violet-300/30 dark:border-violet-500/20 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Target className="w-4 h-4 text-violet-500" />
        </motion.div>
        <span className="text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wide">
          Countdown
        </span>
        <motion.div
          className="ml-auto"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Sparkles className="w-3 h-3 text-fuchsia-400" />
        </motion.div>
      </div>

      {/* Event name */}
      <p className="text-sm font-medium text-main mb-3 text-center">
        🎯 {target.name}
      </p>

      {/* Countdown grid */}
      <div className="flex justify-center gap-2">
        <TimeUnit value={days} label="Days" />
        <TimeUnit value={hours} label="Hrs" />
        <TimeUnit value={minutes} label="Min" />
        <TimeUnit value={seconds} label="Sec" />
      </div>
    </motion.div>
  )
}
