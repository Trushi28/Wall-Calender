'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { format } from 'date-fns'

interface Props {
  year: number
  month: number
  theme: 'light' | 'dark'
  onPrev: () => void
  onNext: () => void
}

export function ChevronBanner({ year, month, theme, onPrev, onNext }: Props) {
  const date = new Date(year, month)
  const monthName = format(date, 'MMMM').toUpperCase()
  const isDark = theme === 'dark'

  return (
    <div className="relative -mt-14 z-20">
      <svg 
        viewBox="0 0 400 80" 
        className="w-full h-20"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="bannerLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="40%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
          <linearGradient id="bannerDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a5f" />
            <stop offset="50%" stopColor="#172554" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <filter id="bannerShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity={isDark ? "0.6" : "0.3"}/>
          </filter>
        </defs>
        
        <path 
          d="M0,0 L0,50 L80,80 L160,50 L160,0 Z" 
          fill={isDark ? "url(#bannerDark)" : "url(#bannerLight)"}
          filter="url(#bannerShadow)"
        />
        <rect 
          x="160" y="0" 
          width="240" height="50" 
          fill={isDark ? "url(#bannerDark)" : "url(#bannerLight)"}
          filter="url(#bannerShadow)"
        />
        <line 
          x1="0" y1="2" x2="400" y2="2" 
          stroke={isDark ? "rgba(56,189,248,0.2)" : "rgba(255,255,255,0.4)"} 
          strokeWidth="2"
        />
      </svg>

      <div className="absolute inset-0 flex items-start justify-between px-5 pt-3">
        <motion.button
          onClick={onPrev}
          className={`p-2.5 rounded-full transition-all duration-200 shadow-lg backdrop-blur-sm
            ${isDark 
              ? 'text-sky-200 hover:text-white bg-sky-500/10 hover:bg-sky-500/25 border border-sky-400/20' 
              : 'text-white/90 hover:text-white bg-white/25 hover:bg-white/40 border border-white/30'
            }`}
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>

        <div className="text-right pr-1">
          <motion.div 
            className={isDark ? 'text-sky-300' : 'text-white/80'}
            style={{ 
              fontSize: '1rem',
              fontWeight: 300,
              letterSpacing: '0.25em',
              textShadow: isDark 
                ? '0 2px 4px rgba(0,0,0,0.8)' 
                : '0 1px 3px rgba(0,0,0,0.4)'
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            key={year}
          >
            {year}
          </motion.div>
          <motion.div 
            style={{ 
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: isDark ? '#7dd3fc' : '#ffffff',
              textShadow: isDark 
                ? '0 2px 8px rgba(0,0,0,0.9), 0 0 20px rgba(56,189,248,0.4)' 
                : '0 2px 6px rgba(0,0,0,0.5), 0 0 15px rgba(255,255,255,0.3)'
            }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            key={monthName}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {monthName}
          </motion.div>
        </div>

        <motion.button
          onClick={onNext}
          className={`p-2.5 rounded-full transition-all duration-200 shadow-lg backdrop-blur-sm
            ${isDark 
              ? 'text-sky-200 hover:text-white bg-sky-500/10 hover:bg-sky-500/25 border border-sky-400/20' 
              : 'text-white/90 hover:text-white bg-white/25 hover:bg-white/40 border border-white/30'
            }`}
          whileHover={{ scale: 1.1, x: 2 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  )
}
