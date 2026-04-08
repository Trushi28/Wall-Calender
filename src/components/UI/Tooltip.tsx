'use client'

import { useState, useRef, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  children: ReactNode
  content: string
}

export function Tooltip({ children, content }: Props) {
  const [show, setShow] = useState(false)
  const timeout = useRef<NodeJS.Timeout>(null)

  const handleEnter = () => {
    timeout.current = setTimeout(() => setShow(true), 400)
  }

  const handleLeave = () => {
    if (timeout.current) clearTimeout(timeout.current)
    setShow(false)
  }

  return (
    <div 
      className="relative w-full h-full"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 
                       bg-main text-card text-xs rounded shadow-lg whitespace-nowrap pointer-events-none"
          >
            {content}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 
                            border-transparent border-t-main" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
