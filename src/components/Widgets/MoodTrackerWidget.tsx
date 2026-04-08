'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Activity, TrendingUp, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

export function MoodTrackerWidget() {
  const [mood, setMood] = useState<number | null>(null)
  const [streak, setStreak] = useState(0)

  const moods = [
    { emoji: '😔', label: 'Low', color: 'from-slate-400 to-slate-500' },
    { emoji: '😐', label: 'Meh', color: 'from-amber-400 to-orange-400' },
    { emoji: '🙂', label: 'Okay', color: 'from-lime-400 to-green-400' },
    { emoji: '😊', label: 'Good', color: 'from-emerald-400 to-teal-400' },
    { emoji: '🤩', label: 'Great', color: 'from-pink-400 to-rose-400' },
  ]

  useEffect(() => {
    const today = new Date().toDateString()
    const stored = localStorage.getItem('mood-tracker')
    if (stored) {
      const data = JSON.parse(stored)
      if (data.date === today) {
        setMood(data.mood)
      }
      setStreak(data.streak || 0)
    }
  }, [])

  const selectMood = (index: number) => {
    const today = new Date().toDateString()
    const stored = localStorage.getItem('mood-tracker')
    let newStreak = 1
    
    if (stored) {
      const data = JSON.parse(stored)
      const lastDate = new Date(data.date)
      const todayDate = new Date(today)
      const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))
      
      if (diffDays === 1) {
        newStreak = (data.streak || 0) + 1
      } else if (diffDays === 0) {
        newStreak = data.streak || 1
      }
    }

    setMood(index)
    setStreak(newStreak)
    localStorage.setItem('mood-tracker', JSON.stringify({ date: today, mood: index, streak: newStreak }))
  }

  return (
    <motion.div
      className="p-4 rounded-2xl bg-gradient-to-br from-pink-500/10 to-rose-500/10 
                 border border-pink-300/30 dark:border-pink-500/20 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-pink-500" />
          <span className="text-xs font-semibold text-pink-600 dark:text-pink-400 uppercase tracking-wide">
            Mood
          </span>
        </div>
        {streak > 0 && (
          <motion.div 
            className="flex items-center gap-1 text-xs text-amber-500"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <TrendingUp className="w-3 h-3" />
            <span>{streak} day streak</span>
          </motion.div>
        )}
      </div>

      {/* Today's question */}
      <p className="text-sm text-muted mb-3 text-center">
        How are you feeling today?
      </p>

      {/* Mood selector */}
      <div className="flex justify-center gap-2">
        {moods.map((m, i) => (
          <motion.button
            key={i}
            onClick={() => selectMood(i)}
            className={cn(
              'relative w-10 h-10 rounded-xl text-xl transition-all',
              mood === i 
                ? `bg-gradient-to-br ${m.color} shadow-lg` 
                : 'bg-white/50 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/20'
            )}
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.95 }}
            animate={mood === i ? { y: [0, -3, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            {m.emoji}
            {mood === i && (
              <motion.div
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-current"
                layoutId="mood-indicator"
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Selected mood label */}
      {mood !== null && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-xs text-muted mt-2"
        >
          Feeling <span className="font-medium text-main">{moods[mood].label}</span> today
        </motion.p>
      )}
    </motion.div>
  )
}
