export interface CalendarDay {
  date: number
  month: 'prev' | 'current' | 'next'
  full: Date
}

export interface DateSelection {
  start: Date | null
  end: Date | null
}

export interface Note {
  id?: number
  year: number
  month: number
  day?: number
  content: string
  createdAt: Date
  updatedAt: Date
}
