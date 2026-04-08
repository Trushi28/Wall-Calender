'use client'

import { useState, useCallback } from 'react'
import { getCalendarDays } from '@/lib/utils'
import type { CalendarDay, DateSelection } from '@/types'

export function useCalendar(initialYear: number, initialMonth: number) {
  const [year, setYear] = useState(initialYear)
  const [month, setMonth] = useState(initialMonth)
  const [selection, setSelection] = useState<DateSelection>({ start: null, end: null })
  const [activeDay, setActiveDay] = useState<Date | null>(null)

  const days: CalendarDay[] = getCalendarDays(year, month)

  const nextMonth = useCallback(() => {
    if (month === 11) {
      setMonth(0)
      setYear(y => y + 1)
    } else {
      setMonth(m => m + 1)
    }
  }, [month])

  const prevMonth = useCallback(() => {
    if (month === 0) {
      setMonth(11)
      setYear(y => y - 1)
    } else {
      setMonth(m => m - 1)
    }
  }, [month])

  const selectDate = useCallback((date: Date) => {
    setSelection(prev => {
      if (!prev.start || (prev.start && prev.end)) {
        return { start: date, end: null }
      }
      if (date < prev.start) {
        return { start: date, end: prev.start }
      }
      return { start: prev.start, end: date }
    })
  }, [])

  const clearSelection = useCallback(() => {
    setSelection({ start: null, end: null })
  }, [])

  const openDayNotes = useCallback((date: Date) => {
    setActiveDay(date)
  }, [])

  const closeDayNotes = useCallback(() => {
    setActiveDay(null)
  }, [])

  return {
    year,
    month,
    days,
    selection,
    activeDay,
    nextMonth,
    prevMonth,
    selectDate,
    clearSelection,
    openDayNotes,
    closeDayNotes,
  }
}
