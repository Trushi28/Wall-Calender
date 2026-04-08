'use client'

import { useNotes } from '@/hooks/useNotes'

interface Props {
  year: number
  month: number
}

export function NotesPanel({ year, month }: Props) {
  const { monthNote, saveMonthNote } = useNotes(year, month)

  return (
    <div className="px-4 pb-4">
      <label className="block text-xs font-medium text-muted mb-2 uppercase tracking-wide">
        Notes
      </label>
      <textarea
        value={monthNote}
        onChange={(e) => saveMonthNote(e.target.value)}
        placeholder="Add notes for this month..."
        className="w-full h-24 p-3 text-sm rounded-xl resize-none
                   bg-white/50 dark:bg-white/5 border border-white/20
                   text-main placeholder:text-muted/50
                   focus:outline-none focus:ring-2 focus:ring-accent/50
                   lined-paper"
      />
    </div>
  )
}
