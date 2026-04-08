'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, StickyNote, TrendingUp, Zap, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  selectedDays: number
  notesCount: number
  currentMonth: string
}

export function StatsWidget({ selectedDays, notesCount, currentMonth }: Props) {
  const productivity = Math.min(100, notesCount * 15 + selectedDays * 5)
  
  const stats = [
    { 
      icon: Calendar, 
      label: 'Selected', 
      value: selectedDays, 
      color: 'from-violet-400 to-purple-500',
      bgColor: 'bg-violet-500/20'
    },
    { 
      icon: StickyNote, 
      label: 'Notes', 
      value: notesCount, 
      color: 'from-sky-400 to-blue-500',
      bgColor: 'bg-sky-500/20'
    },
    { 
      icon: Zap, 
      label: 'Score', 
      value: productivity, 
      color: 'from-amber-400 to-orange-500',
      bgColor: 'bg-amber-500/20',
      suffix: '%'
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-gradient-to-br from-cyan-500/15 via-card to-blue-500/15 rounded-2xl p-5 shadow-lg 
                 border border-cyan-300/30 dark:border-cyan-500/20 relative overflow-hidden"
    >
      {/* Background glow */}
      <motion.div
        className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan-400/30 to-transparent rounded-full blur-2xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <motion.div
            className="p-2 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <BarChart3 className="w-4 h-4 text-white" />
          </motion.div>
          <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
            {currentMonth} Stats
          </span>
          <motion.div
            className="ml-auto"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </motion.div>
        </div>
        
        <div className="space-y-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className={cn('flex items-center gap-3 p-3 rounded-xl', stat.bgColor)}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 5, scale: 1.02 }}
            >
              <motion.div 
                className={cn('p-2 rounded-lg bg-gradient-to-br shadow-sm', stat.color)}
                whileHover={{ rotate: 15, scale: 1.1 }}
              >
                <stat.icon className="w-4 h-4 text-white" />
              </motion.div>
              <div className="flex-1">
                <p className="text-[10px] text-muted uppercase tracking-wide">{stat.label}</p>
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={stat.value}
                    className="text-lg font-bold text-main tabular-nums"
                    initial={{ y: -10, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                  >
                    {stat.value}{stat.suffix || ''}
                  </motion.p>
                </AnimatePresence>
              </div>
              <div className="w-12 h-2 rounded-full bg-white/30 dark:bg-white/10 overflow-hidden">
                <motion.div
                  className={cn('h-full rounded-full bg-gradient-to-r', stat.color)}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, stat.value * (stat.suffix ? 1 : 10))}%` }}
                  transition={{ duration: 1, delay: i * 0.2 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
