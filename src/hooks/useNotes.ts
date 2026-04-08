'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { db } from '@/lib/db'
import type { Note } from '@/types'

export function useNotes(year: number, month: number) {
  const [monthNote, setMonthNote] = useState('')
  const [noteExists, setNoteExists] = useState(false)
  const debounceRef = useRef<NodeJS.Timeout>(null)

  useEffect(() => {
    const load = async () => {
      const note = await db.notes
        .where('[year+month]')
        .equals([year, month])
        .and(n => n.day === undefined)
        .first()
      
      if (note) {
        setMonthNote(note.content)
        setNoteExists(true)
      } else {
        setMonthNote('')
        setNoteExists(false)
      }
    }
    load()
  }, [year, month])

  const saveMonthNote = useCallback(async (content: string) => {
    setMonthNote(content)
    
    if (debounceRef.current) clearTimeout(debounceRef.current)
    
    debounceRef.current = setTimeout(async () => {
      const existing = await db.notes
        .where('[year+month]')
        .equals([year, month])
        .and(n => n.day === undefined)
        .first()

      const now = new Date()
      if (existing) {
        await db.notes.update(existing.id!, { content, updatedAt: now })
      } else if (content.trim()) {
        await db.notes.add({
          year, month, content,
          createdAt: now, updatedAt: now
        })
      }
      setNoteExists(!!content.trim())
    }, 500)
  }, [year, month])

  const getDayNote = useCallback(async (day: number): Promise<string> => {
    const note = await db.notes
      .where('[year+month+day]')
      .equals([year, month, day])
      .first()
    return note?.content || ''
  }, [year, month])

  const saveDayNote = useCallback(async (day: number, content: string) => {
    const existing = await db.notes
      .where('[year+month+day]')
      .equals([year, month, day])
      .first()

    const now = new Date()
    if (existing) {
      if (content.trim()) {
        await db.notes.update(existing.id!, { content, updatedAt: now })
      } else {
        await db.notes.delete(existing.id!)
      }
    } else if (content.trim()) {
      await db.notes.add({
        year, month, day, content,
        createdAt: now, updatedAt: now
      })
    }
  }, [year, month])

  return { monthNote, noteExists, saveMonthNote, getDayNote, saveDayNote }
}
