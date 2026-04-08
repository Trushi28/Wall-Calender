'use client'

import { motion } from 'framer-motion'

export function SpiralBinding() {
  const rings = Array.from({ length: 12 }, (_, i) => i)
  
  return (
    <div className="absolute top-0 left-0 right-0 h-5 flex justify-around px-8 z-30">
      {rings.map(i => (
        <motion.div
          key={i}
          className="w-4 h-4 rounded-full border-2 border-gray-400 dark:border-gray-600 
                     bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800
                     shadow-sm -translate-y-1/2"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: i * 0.03, type: 'spring', stiffness: 300 }}
        />
      ))}
    </div>
  )
}
