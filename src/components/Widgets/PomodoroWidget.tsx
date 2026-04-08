'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw, Coffee, Brain } from 'lucide-react'
import { cn } from '@/lib/utils'

type Mode = 'work' | 'break'

const WORK_MINUTES = 25
const BREAK_MINUTES = 5

export function PomodoroWidget() {
  const [mode, setMode] = useState<Mode>('work')
  const [seconds, setSeconds] = useState(WORK_MINUTES * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [sessions, setSessions] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const totalSeconds = mode === 'work' ? WORK_MINUTES * 60 : BREAK_MINUTES * 60
  const progress = ((totalSeconds - seconds) / totalSeconds) * 100
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60

  useEffect(() => {
    if (isRunning && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => s - 1)
      }, 1000)
    } else if (seconds === 0) {
      // Time's up - switch modes
      if (mode === 'work') {
        setSessions(s => s + 1)
        setMode('break')
        setSeconds(BREAK_MINUTES * 60)
      } else {
        setMode('work')
        setSeconds(WORK_MINUTES * 60)
      }
      setIsRunning(false)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning, seconds, mode])

  const toggle = useCallback(() => setIsRunning(r => !r), [])
  
  const reset = useCallback(() => {
    setIsRunning(false)
    setSeconds(mode === 'work' ? WORK_MINUTES * 60 : BREAK_MINUTES * 60)
  }, [mode])

  const switchMode = useCallback(() => {
    setIsRunning(false)
    const newMode = mode === 'work' ? 'break' : 'work'
    setMode(newMode)
    setSeconds(newMode === 'work' ? WORK_MINUTES * 60 : BREAK_MINUTES * 60)
  }, [mode])

  return (
    <motion.div
      className={cn(
        'p-4 rounded-2xl shadow-lg border overflow-hidden relative',
        mode === 'work' 
          ? 'bg-gradient-to-br from-rose-500/10 to-orange-500/10 border-rose-300/30 dark:border-rose-500/20'
          : 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-300/30 dark:border-emerald-500/20'
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
    >
      {/* Progress ring background */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
        <circle
          cx="50" cy="50" r="45"
          fill="none"
          stroke={mode === 'work' ? '#f43f5e' : '#10b981'}
          strokeWidth="2"
          strokeDasharray={`${progress * 2.83} 283`}
          transform="rotate(-90 50 50)"
          className="transition-all duration-1000"
        />
      </svg>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
              >
                {mode === 'work' 
                  ? <Brain className="w-4 h-4 text-rose-500" />
                  : <Coffee className="w-4 h-4 text-emerald-500" />
                }
              </motion.div>
            </AnimatePresence>
            <span className={cn(
              'text-xs font-semibold uppercase tracking-wide',
              mode === 'work' ? 'text-rose-500' : 'text-emerald-500'
            )}>
              {mode === 'work' ? 'Focus' : 'Break'}
            </span>
          </div>
          <button 
            onClick={switchMode}
            className="text-xs text-muted hover:text-main transition-colors"
          >
            Switch
          </button>
        </div>

        {/* Timer display */}
        <motion.div 
          className="text-center mb-3"
          key={`${mins}:${secs}`}
        >
          <span className={cn(
            'text-4xl font-bold tabular-nums',
            mode === 'work' ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
          )}>
            {String(mins).padStart(2, '0')}
            <motion.span
              animate={{ opacity: isRunning ? [1, 0.3, 1] : 1 }}
              transition={{ duration: 1, repeat: isRunning ? Infinity : 0 }}
            >:</motion.span>
            {String(secs).padStart(2, '0')}
          </span>
        </motion.div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <motion.button
            onClick={reset}
            className="p-2 rounded-full bg-white/50 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <RotateCcw className="w-4 h-4 text-muted" />
          </motion.button>
          
          <motion.button
            onClick={toggle}
            className={cn(
              'p-3 rounded-full shadow-md',
              mode === 'work'
                ? 'bg-gradient-to-br from-rose-500 to-orange-500'
                : 'bg-gradient-to-br from-emerald-500 to-teal-500'
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isRunning 
              ? <Pause className="w-5 h-5 text-white" />
              : <Play className="w-5 h-5 text-white ml-0.5" />
            }
          </motion.button>
        </div>

        {/* Sessions counter */}
        <p className="text-center text-xs text-muted mt-3">
          {sessions} session{sessions !== 1 ? 's' : ''} completed
        </p>
      </div>
    </motion.div>
  )
}
