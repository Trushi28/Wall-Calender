'use client'

import { motion } from 'framer-motion'
import { cn, isSameDay, isInRange, isWeekend } from '@/lib/utils'
import { getHoliday } from '@/lib/holidays'
import { Tooltip } from '@/components/UI/Tooltip'
import type { CalendarDay, DateSelection } from '@/types'

interface Props {
  day: CalendarDay
  year: number
  month: number
  selection: DateSelection
  isToday: boolean
  onSelect: () => void
  onDoubleClick: () => void
}

export function DayCell({ 
  day, 
  year, 
  month, 
  selection, 
  isToday, 
  onSelect,
  onDoubleClick 
}: Props) {
  const isStart = isSameDay(selection.start, day.full)
  const isEnd = isSameDay(selection.end, day.full)
  const inRange = isInRange(day.full, selection.start, selection.end)
  const weekend = isWeekend(day.full)
  const holiday = day.month === 'current' ? getHoliday(year, month, day.date) : null
  const notCurrent = day.month !== 'current'
  const isSelected = isStart || isEnd

  const cell = (
    <motion.button
      onClick={onSelect}
      onDoubleClick={onDoubleClick}
      className={cn(
        'relative w-full aspect-square flex items-center justify-center',
        'text-sm md:text-base font-medium rounded-xl',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
        'transition-colors duration-150',
        
        notCurrent && 'text-faint opacity-40',
        !notCurrent && weekend && 'text-accent font-semibold',
        !notCurrent && !weekend && 'text-main',
        
        !isSelected && !inRange && 'hover:bg-accent/10',
        inRange && 'bg-accent/15 text-accent',
        isSelected && 'bg-gradient-to-br from-accent to-accent-dark text-white shadow-md',
        isToday && !isSelected && 'ring-2 ring-accent/50 ring-offset-1 ring-offset-card'
      )}
      whileHover={{ scale: isSelected ? 1 : 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {day.date}
      {holiday && !isSelected && (
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-orange-500" />
      )}
    </motion.button>
  )

  return holiday ? <Tooltip content={holiday.name}>{cell}</Tooltip> : cell
}
