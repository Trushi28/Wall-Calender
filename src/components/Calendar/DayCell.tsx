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
        'relative w-full aspect-square flex flex-col items-center justify-center',
        'text-sm md:text-base font-medium rounded-xl',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
        'transition-colors duration-150',
        'p-1',
        
        notCurrent && 'text-faint opacity-40',
        !notCurrent && weekend && 'text-accent font-semibold',
        !notCurrent && !weekend && 'text-main',
        
        !isSelected && !inRange && 'hover:bg-accent/10',
        inRange && 'bg-accent/15 text-accent',
        isSelected && 'bg-gradient-to-br from-accent to-accent-dark text-white shadow-lg',
        isToday && !isSelected && 'ring-2 ring-accent/60 ring-offset-2 ring-offset-card'
      )}
      whileHover={{ scale: isSelected ? 1 : 1.08 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <span>{day.date}</span>
      {holiday && !isSelected && (
        <span className="absolute bottom-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 shadow-sm" />
      )}
    </motion.button>
  )

  return holiday ? <Tooltip content={holiday.name}>{cell}</Tooltip> : cell
}
