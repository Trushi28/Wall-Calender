import Dexie, { type EntityTable } from 'dexie'
import type { Note } from '@/types'

const db = new Dexie('CalendarDB') as Dexie & {
  notes: EntityTable<Note, 'id'>
}

db.version(1).stores({
  notes: '++id, [year+month], [year+month+day]'
})

export { db }
