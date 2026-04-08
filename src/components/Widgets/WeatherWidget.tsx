'use client'

import { motion } from 'framer-motion'
import { Cloud, Sun, CloudRain } from 'lucide-react'

export function WeatherWidget() {
  // Mock weather data
  const weather = {
    temp: 24,
    condition: 'Partly Cloudy',
    high: 28,
    low: 18
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.1 }}
      whileHover={{ y: -2 }}
      className="bg-card/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/10
                 hover:shadow-xl hover:border-accent/20 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted uppercase tracking-wide mb-1">Weather</p>
          <p className="text-4xl font-light text-main">{weather.temp}°</p>
          <p className="text-sm text-muted">{weather.condition}</p>
        </div>
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Cloud className="w-12 h-12 text-accent" />
        </motion.div>
      </div>
      <div className="flex gap-4 mt-3 pt-3 border-t border-white/10">
        <span className="text-xs text-muted">H: {weather.high}°</span>
        <span className="text-xs text-muted">L: {weather.low}°</span>
      </div>
    </motion.div>
  )
}
