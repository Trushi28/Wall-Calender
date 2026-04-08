'use client'

import { useState, useCallback, useEffect, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, X } from 'lucide-react'
import { useCalendar } from '@/hooks/useCalendar'
import { useImageStore } from '@/hooks/useImageStore'
import { useTheme } from '@/hooks/useTheme'
import { useNotes } from '@/hooks/useNotes'
import { useWidgetConfig } from '@/hooks/useWidgetConfig'
import { SpiralBinding } from './SpiralBinding'
import { HeroImage } from './HeroImage'
import { ChevronBanner } from './ChevronBanner'
import { CalendarGrid } from './CalendarGrid'
import { NotesPanel } from './NotesPanel'
import { DateNoteModal } from './DateNoteModal'
import { ThemeToggle } from '@/components/UI/ThemeToggle'
import { ToastContainer, useToast } from '@/components/UI/Toast'
import { 
  ClockWidget, 
  WeatherWidget, 
  QuoteWidget, 
  StatsWidget, 
  MiniCalendarWidget,
  PomodoroWidget,
  CountdownWidget,
  MoodTrackerWidget,
  WidgetSettings
} from '@/components/Widgets'
import { cn } from '@/lib/utils'

export function Calendar() {
  const prefersReducedMotion = useReducedMotion()
  const [direction, setDirection] = useState(0)
  const { theme, toggle, mounted } = useTheme()
  const { toasts, show: showToast, dismiss } = useToast()
  const { widgets, toggleWidget, reorderWidgets } = useWidgetConfig()
  
  const now = new Date()
  const {
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
  } = useCalendar(now.getFullYear(), now.getMonth())

  const { image, randomize, handleDrop } = useImageStore(month)
  const { noteExists } = useNotes(year, month)
  
  const selectedDays = useMemo(() => {
    if (!selection.start || !selection.end) return selection.start ? 1 : 0
    return Math.ceil((selection.end.getTime() - selection.start.getTime()) / (1000 * 60 * 60 * 24)) + 1
  }, [selection])
  
  const monthName = format(new Date(year, month), 'MMMM')

  const handleNext = useCallback(() => {
    setDirection(1)
    nextMonth()
  }, [nextMonth])

  const handlePrev = useCallback(() => {
    setDirection(-1)
    prevMonth()
  }, [prevMonth])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (activeDay) {
        if (e.key === 'Escape') closeDayNotes()
        return
      }
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'Escape') clearSelection()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handlePrev, handleNext, closeDayNotes, clearSelection, activeDay])

  const [touchStart, setTouchStart] = useState<number | null>(null)
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const diff = e.changedTouches[0].clientX - touchStart
    if (Math.abs(diff) > 50) {
      if (diff > 0) handlePrev()
      else handleNext()
    }
    setTouchStart(null)
  }

  useEffect(() => {
    if (selection.start && selection.end) {
      const days = Math.ceil((selection.end.getTime() - selection.start.getTime()) / (1000 * 60 * 60 * 24)) + 1
      showToast(`${days} day${days > 1 ? 's' : ''} selected`, 'success')
    }
  }, [selection.start, selection.end, showToast])

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page">
        <motion.div 
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-10 h-10 border-3 border-accent border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-muted">Loading calendar...</span>
        </motion.div>
      </div>
    )
  }

  // Render widget by ID
  const renderWidget = (id: string) => {
    switch (id) {
      case 'clock': return <ClockWidget key={id} />
      case 'weather': return <WeatherWidget key={id} />
      case 'quote': return <QuoteWidget key={id} />
      case 'pomodoro': return <PomodoroWidget key={id} />
      case 'countdown': return <CountdownWidget key={id} />
      case 'mood': return <MoodTrackerWidget key={id} />
      case 'stats': return (
        <StatsWidget 
          key={id}
          selectedDays={selectedDays} 
          notesCount={noteExists ? 1 : 0}
          currentMonth={monthName}
        />
      )
      case 'miniCal': return (
        <MiniCalendarWidget 
          key={id}
          year={year} 
          month={month} 
          onNavigate={(dir) => dir === 'next' ? handleNext() : handlePrev()} 
        />
      )
      default: return null
    }
  }

  const enabledWidgets = widgets.filter(w => w.enabled)

  return (
    <div id="calendar-root" className="min-h-screen bg-page flex items-center justify-center p-4 md:p-6 lg:p-8">
      {/* Background pattern */}
      <div className="fixed inset-0 opacity-30 dark:opacity-10 pointer-events-none"
           style={{
             backgroundImage: `radial-gradient(circle at 1px 1px, var(--text-muted) 1px, transparent 0)`,
             backgroundSize: '24px 24px'
           }} 
      />
      
      {/* Theme toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle theme={theme} onToggle={toggle} />
      </div>

      {/* Main layout */}
      <div className="flex flex-col xl:flex-row items-start gap-6 w-full max-w-6xl">
        
        {/* Left widgets (desktop - first 3) */}
        <motion.div 
          className="hidden xl:flex flex-col gap-4 w-72"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {enabledWidgets.slice(0, 3).map(w => renderWidget(w.id))}
        </motion.div>

        {/* Calendar card */}
        <motion.div
          className={cn(
            'relative w-full max-w-lg mx-auto xl:mx-0',
            'bg-card rounded-3xl overflow-hidden',
            'shadow-2xl shadow-black/15 dark:shadow-black/50',
            'border border-white/60 dark:border-white/10',
            'paper-texture'
          )}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <SpiralBinding />

          <div className="pt-6">
            <HeroImage 
              image={image} 
              onDrop={handleDrop} 
              onRandomize={randomize} 
            />
          </div>

          <ChevronBanner
            year={year}
            month={month}
            theme={theme}
            onPrev={handlePrev}
            onNext={handleNext}
          />

          <div className="py-2">
            <CalendarGrid
              days={days}
              year={year}
              month={month}
              selection={selection}
              onSelect={selectDate}
              onDayDoubleClick={openDayNotes}
              direction={prefersReducedMotion ? 0 : direction}
            />
          </div>

          {/* Selection info bar */}
          <AnimatePresence>
            {selection.start && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mx-5 mb-3 rounded-xl bg-gradient-to-r from-accent/15 to-cyan-500/15 
                           border border-accent/20 overflow-hidden"
              >
                <div className="px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-accent" />
                      <p className="text-sm text-accent font-semibold">
                        {selection.end 
                          ? `${format(selection.start, 'MMM d')} → ${format(selection.end, 'MMM d, yyyy')}`
                          : `${format(selection.start, 'MMMM d')} — select end date`
                        }
                      </p>
                    </div>
                    <motion.button 
                      onClick={clearSelection}
                      className="p-1.5 rounded-full hover:bg-accent/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-4 h-4 text-accent" />
                    </motion.button>
                  </div>
                  <p className="text-xs text-muted mt-1.5 pl-6">
                    💡 Double-tap any date to add notes
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <NotesPanel year={year} month={month} />
        </motion.div>

        {/* Right widgets (desktop - remaining) */}
        <motion.div 
          className="hidden xl:flex flex-col gap-4 w-72"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {enabledWidgets.slice(3).map(w => renderWidget(w.id))}
        </motion.div>
        
        {/* Mobile widgets */}
        <motion.div 
          className="xl:hidden w-full overflow-x-auto pb-2 -mx-4 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex gap-3 w-max">
            {enabledWidgets.map(w => (
              <div key={w.id} className="w-48 flex-shrink-0">
                {renderWidget(w.id)}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted text-center mt-2">← Swipe for more widgets →</p>
        </motion.div>
      </div>

      <DateNoteModal date={activeDay} onClose={closeDayNotes} />
      
      <WidgetSettings 
        widgets={widgets} 
        onToggle={toggleWidget} 
        onReorder={reorderWidgets} 
      />
      
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </div>
  )
}
