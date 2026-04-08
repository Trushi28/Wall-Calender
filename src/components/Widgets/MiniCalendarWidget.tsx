'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, CalendarDays } from 'lucide-react'
import { format, addMonths, isSameDay } from 'date-fns'
import { getCalendarDays, isWeekend, cn } from '@/lib/utils'

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
  const today = new Date()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, delay: 0.4 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-gradient-to-br from-indigo-500/15 via-card to-purple-500/15 rounded-2xl p-5 shadow-lg 
                 border border-indigo-300/30 dark:border-indigo-500/20 relative overflow-hidden"
    >
      {/* Background decoration */}
      <motion.div
        className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-2xl"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <motion.div
              className="p-2 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500"
              whileHover={{ rotate: 15, scale: 1.1 }}
            >
              <CalendarDays className="w-4 h-4 text-white" />
            </motion.div>
            <AnimatePresence mode="wait">
              <motion.span 
                key={format(nextMonth, 'MMMM')}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
              >
                {format(nextMonth, 'MMMM yyyy')}
              </motion.span>
            </AnimatePresence>
          </div>
          <motion.button
            onClick={() => onNavigate('next')}
            className="p-2 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30"
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-4 h-4 text-indigo-500" />
          </motion.button>
        </div>
        
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {dayNames.map((d, i) => (
            <span 
              key={i} 
              className={cn(
                'text-[10px] font-bold uppercase',
                i >= 5 ? 'text-accent' : 'text-muted'
              )}
            >
              {d}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {days.slice(0, 35).map((day, i) => {
            const isToday = isSameDay(day.full, today)
            return (
              <motion.span 
                key={`${day.month}-${day.date}-${i}`}
                className={cn(
                  'text-[11px] py-1 rounded-lg transition-all relative',
                  day.month !== 'current' ? 'text-faint' : 
                  isWeekend(day.full) ? 'text-accent font-medium' : 'text-main',
                  isToday && 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-bold shadow-md'
                )}
                whileHover={{ scale: 1.3, y: -2 }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.01 }}
              >
                {day.date}
              </motion.span>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
