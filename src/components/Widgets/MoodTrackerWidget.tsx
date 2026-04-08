'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export function MoodTrackerWidget() {
  const [mood, setMood] = useState<number | null>(null)
  const [streak, setStreak] = useState(0)
  const [justSelected, setJustSelected] = useState(false)

  const moods = [
    { emoji: '😔', label: 'Low', color: 'from-slate-400 to-slate-500', bg: 'bg-slate-100 dark:bg-slate-800' },
    { emoji: '😐', label: 'Meh', color: 'from-amber-400 to-orange-400', bg: 'bg-amber-100 dark:bg-amber-900/30' },
    { emoji: '🙂', label: 'Okay', color: 'from-lime-400 to-green-400', bg: 'bg-lime-100 dark:bg-lime-900/30' },
    { emoji: '😊', label: 'Good', color: 'from-emerald-400 to-teal-400', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
    { emoji: '🤩', label: 'Great', color: 'from-pink-400 to-rose-400', bg: 'bg-pink-100 dark:bg-pink-900/30' },
  ]

  useEffect(() => {
    const today = new Date().toDateString()
    const stored = localStorage.getItem('mood-tracker')
    if (stored) {
      const data = JSON.parse(stored)
      if (data.date === today) setMood(data.mood)
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
      
      if (diffDays === 1) newStreak = (data.streak || 0) + 1
      else if (diffDays === 0) newStreak = data.streak || 1
    }

    setMood(index)
    setStreak(newStreak)
    setJustSelected(true)
    setTimeout(() => setJustSelected(false), 1500)
    localStorage.setItem('mood-tracker', JSON.stringify({ date: today, mood: index, streak: newStreak }))
  }

  return (
    <motion.div
      className={cn(
        'p-5 rounded-2xl shadow-lg border overflow-hidden relative transition-colors duration-500',
        mood !== null ? moods[mood].bg : 'bg-gradient-to-br from-pink-500/15 via-card to-rose-500/15',
        'border-pink-300/30 dark:border-pink-500/20'
      )}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 200, delay: 0.25 }}
    >
      {/* Celebration particles */}
      <AnimatePresence>
        {justSelected && mood !== null && mood >= 3 && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-lg"
                initial={{ x: '50%', y: '50%', scale: 0, opacity: 1 }}
                animate={{ 
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  scale: [0, 1, 0],
                  opacity: [1, 1, 0],
                  rotate: Math.random() * 360
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, delay: i * 0.05 }}
              >
                {['✨', '💫', '⭐', '🌟'][i % 4]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-5 h-5 text-pink-500" fill={mood !== null ? '#ec4899' : 'none'} />
            </motion.div>
            <span className="text-xs font-bold text-pink-600 dark:text-pink-400 uppercase tracking-wider">
              Daily Mood
            </span>
          </div>
          <AnimatePresence>
            {streak > 0 && (
              <motion.div 
                className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-amber-500/20"
                initial={{ scale: 0, x: 20 }}
                animate={{ scale: 1, x: 0 }}
                exit={{ scale: 0 }}
              >
                <TrendingUp className="w-3 h-3 text-amber-500" />
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400">{streak}🔥</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.p 
          className="text-sm text-muted mb-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          How are you feeling today?
        </motion.p>

        <div className="flex justify-center gap-2">
          {moods.map((m, i) => (
            <motion.button
              key={i}
              onClick={() => selectMood(i)}
              className={cn(
                'relative w-12 h-12 rounded-2xl text-2xl flex items-center justify-center transition-all',
                mood === i 
                  ? `bg-gradient-to-br ${m.color} shadow-lg ring-2 ring-white/50` 
                  : 'bg-white/60 dark:bg-white/10 hover:bg-white/90 dark:hover:bg-white/20'
              )}
              whileHover={{ scale: 1.2, y: -5, rotate: [0, -10, 10, 0] }}
              whileTap={{ scale: 0.9 }}
              animate={mood === i ? { y: [0, -5, 0] } : {}}
              transition={{ duration: 0.3 }}
            >
              <motion.span
                animate={mood === i ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                {m.emoji}
              </motion.span>
              {mood === i && (
                <motion.div
                  className="absolute -bottom-1 w-2 h-2 rounded-full bg-white shadow"
                  layoutId="mood-dot"
                  transition={{ type: 'spring', stiffness: 500 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {mood !== null && (
            <motion.div
              key={mood}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center mt-4"
            >
              <p className="text-sm font-medium text-main">
                Feeling <span className={cn(
                  'font-bold',
                  mood >= 3 ? 'text-emerald-500' : mood >= 1 ? 'text-amber-500' : 'text-slate-500'
                )}>{moods[mood].label}</span> today
                {mood >= 3 && ' ✨'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
