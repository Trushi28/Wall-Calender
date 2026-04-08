'use client'

import { motion } from 'framer-motion'
import { Calendar, StickyNote, TrendingUp } from 'lucide-react'

interface Props {
  selectedDays: number
  notesCount: number
  currentMonth: string
}

export function StatsWidget({ selectedDays, notesCount, currentMonth }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.3 }}
      whileHover={{ y: -2 }}
      className="bg-card/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/10
                 hover:shadow-xl hover:border-accent/20 transition-all duration-300"
    >
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-4 h-4 text-accent" />
        <span className="text-xs font-medium text-muted uppercase tracking-wide">{currentMonth} Stats</span>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted" />
            <span className="text-sm text-muted">Selected</span>
          </div>
          <span className="text-lg font-semibold text-main">{selectedDays}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StickyNote className="w-4 h-4 text-muted" />
            <span className="text-sm text-muted">Notes</span>
          </div>
          <span className="text-lg font-semibold text-main">{notesCount}</span>
        </div>
      </div>
    </motion.div>
  )
}
