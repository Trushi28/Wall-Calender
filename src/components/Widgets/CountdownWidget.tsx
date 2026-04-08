'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Target, Sparkles, PartyPopper } from 'lucide-react'
import { cn } from '@/lib/utils'
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns'

export function CountdownWidget() {
  const [now, setNow] = useState(new Date())
  
  const target = useMemo(() => {
    const today = new Date()
    const events = [
      { date: new Date(today.getFullYear(), 0, 1), name: 'New Year', emoji: '🎉' },
      { date: new Date(today.getFullYear(), 0, 26), name: 'Republic Day', emoji: '🇮🇳' },
      { date: new Date(today.getFullYear(), 7, 15), name: 'Independence Day', emoji: '🇮🇳' },
      { date: new Date(today.getFullYear(), 9, 2), name: 'Gandhi Jayanti', emoji: '🕊️' },
      { date: new Date(today.getFullYear(), 11, 25), name: 'Christmas', emoji: '🎄' },
    ]
    
    for (const event of events) {
      if (event.date > today) return event
      event.date.setFullYear(today.getFullYear() + 1)
      if (event.date > today) return event
    }
    return { date: new Date(today.getFullYear() + 1, 0, 1), name: 'New Year', emoji: '🎉' }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const days = Math.max(0, differenceInDays(target.date, now))
  const hours = Math.max(0, differenceInHours(target.date, now) % 24)
  const minutes = Math.max(0, differenceInMinutes(target.date, now) % 60)
  const seconds = Math.max(0, differenceInSeconds(target.date, now) % 60)

  const TimeUnit = ({ value, label, color }: { value: number, label: string, color: string }) => (
    <motion.div 
      className="flex flex-col items-center"
      whileHover={{ scale: 1.1, y: -2 }}
    >
      <motion.div
        className={cn(
          'w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden',
          'bg-gradient-to-br border shadow-lg',
          color
        )}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        />
        <AnimatePresence mode="wait">
          <motion.span 
            key={value}
            className="text-xl font-bold text-white tabular-nums relative z-10"
            initial={{ y: -20, opacity: 0, rotateX: 90 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            exit={{ y: 20, opacity: 0, rotateX: -90 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {String(value).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
      </motion.div>
      <span className="text-[10px] text-muted mt-1.5 uppercase tracking-wider font-medium">{label}</span>
    </motion.div>
  )

  return (
    <motion.div
      className="p-5 rounded-2xl bg-gradient-to-br from-violet-500/15 via-card to-fuchsia-500/15 
                 border border-violet-300/30 dark:border-violet-500/20 shadow-lg relative overflow-hidden"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
    >
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-violet-400 rounded-full"
            animate={{
              y: [0, -30, 0],
              x: [0, (i % 2 === 0 ? 10 : -10), 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
            style={{ left: `${15 + i * 15}%`, top: `${60 + (i % 3) * 10}%` }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Target className="w-5 h-5 text-violet-500" />
            </motion.div>
            <span className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider">
              Countdown
            </span>
          </div>
          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4 text-fuchsia-400" />
          </motion.div>
        </div>

        <motion.p 
          className="text-base font-semibold text-main mb-4 text-center flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-lg">{target.emoji}</span>
          {target.name}
        </motion.p>

        <div className="flex justify-center gap-2">
          <TimeUnit value={days} label="Days" color="from-violet-500 to-violet-600 border-violet-400/50" />
          <TimeUnit value={hours} label="Hrs" color="from-fuchsia-500 to-fuchsia-600 border-fuchsia-400/50" />
          <TimeUnit value={minutes} label="Min" color="from-purple-500 to-purple-600 border-purple-400/50" />
          <TimeUnit value={seconds} label="Sec" color="from-indigo-500 to-indigo-600 border-indigo-400/50" />
        </div>
      </div>
    </motion.div>
  )
}
