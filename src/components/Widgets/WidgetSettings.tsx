'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, X, Eye, EyeOff, ArrowUp, ArrowDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { WidgetId, WidgetConfig } from '@/hooks/useWidgetConfig'

interface Props {
  widgets: WidgetConfig[]
  onToggle: (id: WidgetId) => void
  onReorder: (newOrder: WidgetConfig[]) => void
}

export function WidgetSettings({ widgets, onToggle, onReorder }: Props) {
  const [open, setOpen] = useState(false)

  const moveUp = (idx: number) => {
    if (idx === 0) return
    const arr = [...widgets]
    ;[arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]]
    onReorder(arr.map((w, i) => ({ ...w, order: i })))
  }

  const moveDown = (idx: number) => {
    if (idx === widgets.length - 1) return
    const arr = [...widgets]
    ;[arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]]
    onReorder(arr.map((w, i) => ({ ...w, order: i })))
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-40 p-3 rounded-full
                   bg-card/90 backdrop-blur-lg shadow-xl border border-white/20
                   hover:shadow-2xl hover:scale-105 transition-all duration-300"
        whileHover={{ rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Widget settings"
      >
        <Settings className="w-5 h-5 text-muted" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-80 
                         bg-card/95 backdrop-blur-xl shadow-2xl border-l border-white/10"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h2 className="text-lg font-semibold text-main">Widget Settings</h2>
                <motion.button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5 text-muted" />
                </motion.button>
              </div>

              <div className="p-4 space-y-2">
                {widgets.map((widget, idx) => (
                  <motion.div
                    key={widget.id}
                    layout
                    className={cn(
                      'flex items-center gap-2 p-3 rounded-xl',
                      'bg-white/5 border border-white/10'
                    )}
                  >
                    <div className="flex flex-col gap-0.5">
                      <button 
                        onClick={() => moveUp(idx)}
                        disabled={idx === 0}
                        className="p-1 rounded hover:bg-white/10 disabled:opacity-30"
                      >
                        <ArrowUp className="w-3 h-3 text-muted" />
                      </button>
                      <button 
                        onClick={() => moveDown(idx)}
                        disabled={idx === widgets.length - 1}
                        className="p-1 rounded hover:bg-white/10 disabled:opacity-30"
                      >
                        <ArrowDown className="w-3 h-3 text-muted" />
                      </button>
                    </div>
                    
                    <span className={cn(
                      'flex-1 text-sm',
                      widget.enabled ? 'text-main' : 'text-muted line-through'
                    )}>
                      {widget.label}
                    </span>
                    
                    <motion.button
                      onClick={() => onToggle(widget.id)}
                      className={cn(
                        'p-2 rounded-lg transition-colors',
                        widget.enabled ? 'bg-accent/20 text-accent' : 'bg-white/5 text-muted'
                      )}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {widget.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </motion.button>
                  </motion.div>
                ))}
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-xs text-muted text-center">Use arrows to reorder</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
