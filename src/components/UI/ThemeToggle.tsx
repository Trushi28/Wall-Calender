'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Props {
  theme: 'light' | 'dark'
  onToggle: () => void
}

// Custom sun icon with animated rays
function SunIcon() {
  return (
    <motion.svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-amber-500"
    >
      <motion.circle 
        cx="12" 
        cy="12" 
        r="4"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      />
      {/* Animated rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <motion.line
          key={angle}
          x1="12"
          y1="2"
          x2="12"
          y2="4"
          style={{ transformOrigin: '12px 12px', transform: `rotate(${angle}deg)` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.03, duration: 0.2 }}
        />
      ))}
    </motion.svg>
  )
}

// Custom moon with stars
function MoonIcon() {
  return (
    <motion.div className="relative">
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-sky-300"
        initial={{ rotate: -90, scale: 0.5 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      </motion.svg>
      {/* Sparkle stars */}
      <motion.span
        className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-sky-200 rounded-full"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 1, 0.5, 1], scale: [0, 1.2, 0.8, 1] }}
        transition={{ delay: 0.2, duration: 0.5 }}
      />
      <motion.span
        className="absolute top-0 right-2 w-1 h-1 bg-sky-100 rounded-full"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 1, 0.7, 1], scale: [0, 1, 0.7, 1] }}
        transition={{ delay: 0.35, duration: 0.4 }}
      />
    </motion.div>
  )
}

export function ThemeToggle({ theme, onToggle }: Props) {
  const isDark = theme === 'dark'

  return (
    <motion.button
      onClick={onToggle}
      className={cn(
        'relative w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden',
        'shadow-lg border-2 transition-all duration-300',
        isDark 
          ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-sky-400/30 shadow-sky-500/20' 
          : 'bg-gradient-to-br from-amber-50 to-orange-100 border-amber-300/50 shadow-amber-500/20',
        'hover:shadow-xl hover:scale-105 active:scale-95'
      )}
      whileHover={{ 
        boxShadow: isDark 
          ? '0 0 30px rgba(56, 189, 248, 0.3)' 
          : '0 0 30px rgba(251, 191, 36, 0.4)'
      }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Glow effect */}
      <motion.div
        className={cn(
          'absolute inset-0 opacity-50',
          isDark 
            ? 'bg-gradient-to-tr from-sky-500/20 via-transparent to-purple-500/20'
            : 'bg-gradient-to-tr from-yellow-300/30 via-transparent to-orange-300/30'
        )}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Icon container with smooth swap */}
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ y: 20, opacity: 0, rotate: -30 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -20, opacity: 0, rotate: 30 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {isDark ? <MoonIcon /> : <SunIcon />}
        </motion.div>
      </AnimatePresence>

      {/* Orbiting particles for light mode */}
      {!isDark && (
        <>
          <motion.span
            className="absolute w-1 h-1 bg-amber-400 rounded-full"
            animate={{
              x: [0, 8, 0, -8, 0],
              y: [-8, 0, 8, 0, -8],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
          <motion.span
            className="absolute w-0.5 h-0.5 bg-orange-300 rounded-full"
            animate={{
              x: [6, 0, -6, 0, 6],
              y: [0, 6, 0, -6, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </>
      )}

      {/* Twinkling stars for dark mode */}
      {isDark && (
        <>
          <motion.span
            className="absolute top-2 left-2 w-0.5 h-0.5 bg-white rounded-full"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.span
            className="absolute bottom-3 right-2 w-0.5 h-0.5 bg-sky-200 rounded-full"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.span
            className="absolute top-3 right-3 w-1 h-1 bg-sky-100 rounded-full"
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        </>
      )}
    </motion.button>
  )
}
