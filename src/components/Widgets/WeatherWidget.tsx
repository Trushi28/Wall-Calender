'use client'

import { motion } from 'framer-motion'
import { Cloud, Sun, Droplets, Wind, Thermometer } from 'lucide-react'

export function WeatherWidget() {
  // Mock weather data
  const weather = {
    temp: 24,
    condition: 'Partly Cloudy',
    high: 28,
    low: 18,
    humidity: 65,
    wind: 12
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9, rotateY: -10 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative bg-gradient-to-br from-sky-500/10 via-card to-blue-500/10 backdrop-blur-sm 
                 rounded-2xl p-5 shadow-lg border border-sky-200/30 dark:border-sky-500/20
                 overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {/* Animated clouds background */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <motion.div
          className="absolute -left-10 top-2"
          animate={{ x: [0, 80, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <Cloud className="w-16 h-16 text-sky-300" />
        </motion.div>
        <motion.div
          className="absolute right-0 bottom-4"
          animate={{ x: [0, -60, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        >
          <Cloud className="w-12 h-12 text-sky-200" />
        </motion.div>
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider mb-2">
              Weather
            </p>
            <motion.p 
              className="text-5xl font-extralight text-main"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
            >
              {weather.temp}
              <span className="text-2xl text-sky-500">°</span>
            </motion.p>
            <motion.p 
              className="text-sm text-muted mt-1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {weather.condition}
            </motion.p>
          </div>
          
          {/* Animated weather icon */}
          <motion.div
            className="relative"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <Sun className="w-8 h-8 text-amber-400 absolute -top-1 -right-1" />
            </motion.div>
            <Cloud className="w-14 h-14 text-sky-400 relative z-10" />
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div 
          className="flex items-center gap-4 mt-4 pt-3 border-t border-sky-200/30 dark:border-sky-500/20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-1.5">
            <Thermometer className="w-3 h-3 text-rose-400" />
            <span className="text-xs text-muted">H:{weather.high}° L:{weather.low}°</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Droplets className="w-3 h-3 text-sky-400" />
            <span className="text-xs text-muted">{weather.humidity}%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}>
              <Wind className="w-3 h-3 text-teal-400" />
            </motion.div>
            <span className="text-xs text-muted">{weather.wind}km/h</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
