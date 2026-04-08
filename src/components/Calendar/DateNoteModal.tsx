'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { useNotes } from '@/hooks/useNotes'

interface Props {
  date: Date | null
  onClose: () => void
}

export function DateNoteModal({ date, onClose }: Props) {
  const [note, setNote] = useState('')
  const year = date?.getFullYear() ?? 0
  const month = date?.getMonth() ?? 0
  const day = date?.getDate() ?? 0
  
  const { getDayNote, saveDayNote } = useNotes(year, month)

  useEffect(() => {
    if (date) {
      getDayNote(day).then(setNote)
    }
  }, [date, day, getDayNote])

  const handleSave = () => {
    if (date) {
      saveDayNote(day, note)
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {date && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                       w-[90%] max-w-md bg-card rounded-2xl shadow-2xl
                       border border-white/10 overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                <h3 className="font-semibold text-main">
                  {format(date, 'EEEE, MMMM d, yyyy')}
                </h3>
              </div>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-muted" />
              </motion.button>
            </div>
            
            <div className="p-4">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note for this day..."
                className="w-full h-32 p-3 text-sm rounded-xl resize-none
                           bg-white/50 dark:bg-white/5 border border-white/20
                           text-main placeholder:text-muted/50
                           focus:outline-none focus:ring-2 focus:ring-accent/50"
                autoFocus
              />
            </div>
            
            <div className="flex justify-end gap-2 p-4 border-t border-white/10">
              <motion.button
                onClick={onClose}
                className="px-4 py-2 text-sm text-muted hover:text-main rounded-lg
                           hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={handleSave}
                className="px-4 py-2 text-sm text-white bg-accent rounded-lg
                           hover:bg-accent-dark transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Save
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
