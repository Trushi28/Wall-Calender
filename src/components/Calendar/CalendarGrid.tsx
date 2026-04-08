'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { cn, isSameDay } from '@/lib/utils'
import { DayCell } from './DayCell'
import type { CalendarDay, DateSelection } from '@/types'

const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

interface Props {
  days: CalendarDay[]
  year: number
  month: number
  selection: DateSelection
  onSelect: (date: Date) => void
  onDayDoubleClick: (date: Date) => void
  direction: number
}

export function CalendarGrid({ 
  days, 
  year, 
  month, 
  selection, 
  onSelect, 
  onDayDoubleClick,
  direction 
}: Props) {
  const today = new Date()

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 })
  }

  return (
    <div className="px-5 pb-6">
      {/* Day headers */}
      <div className="grid grid-cols-7 gap-2 mb-3">
        {dayNames.map((name, i) => (
          <div
            key={name}
            className={cn(
              'text-center text-xs font-semibold py-2',
              i >= 5 ? 'text-accent' : 'text-muted'
            )}
          >
            {name}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={`${year}-${month}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="grid grid-cols-7 gap-2"
        >
          {days.map((day, i) => (
            <DayCell
              key={i}
              day={day}
              year={year}
              month={month}
              selection={selection}
              isToday={isSameDay(day.full, today)}
              onSelect={() => onSelect(day.full)}
              onDoubleClick={() => onDayDoubleClick(day.full)}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
