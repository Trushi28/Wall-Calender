'use client'

import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { format, addMonths } from 'date-fns'
import { getCalendarDays, isWeekend } from '@/lib/utils'

interface Props {
  year: number
  month: number
  onNavigate: (dir: 'prev' | 'next') => void
}

export function MiniCalendarWidget({ year, month, onNavigate }: Props) {
  const nextMonth = addMonths(new Date(year, month), 1)
  const nextYear = nextMonth.getFullYear()
  const nextMo = nextMonth.getMonth()
  const days = getCalendarDays(nextYear, nextMo)
  const dayNames = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.4 }}
      whileHover={{ y: -2 }}
      className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/10
                 hover:shadow-xl hover:border-accent/20 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-muted uppercase tracking-wide">
          {format(nextMonth, 'MMMM yyyy')}
        </span>
        <motion.button
          onClick={() => onNavigate('next')}
          className="p-1 rounded hover:bg-white/10"
          whileHover={{ x: 2 }}
        >
          <ChevronRight className="w-4 h-4 text-muted" />
        </motion.button>
      </div>
      
      <div className="grid grid-cols-7 gap-0.5 text-center">
        {dayNames.map((d, i) => (
          <span key={i} className={`text-[10px] ${i >= 5 ? 'text-accent' : 'text-muted'}`}>{d}</span>
        ))}
        {days.slice(0, 35).map((day, i) => (
          <span 
            key={i} 
            className={`text-[10px] py-0.5 ${
              day.month !== 'current' ? 'text-faint' : 
              isWeekend(day.full) ? 'text-accent' : 'text-main'
            }`}
          >
            {day.date}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
