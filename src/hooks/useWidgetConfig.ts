'use client'

import { useState, useEffect, useCallback } from 'react'

export type WidgetId = 'clock' | 'weather' | 'quote' | 'stats' | 'miniCal' | 'pomodoro' | 'countdown' | 'mood'

export interface WidgetConfig {
  id: WidgetId
  label: string
  enabled: boolean
  order: number
}

const defaultWidgets: WidgetConfig[] = [
  { id: 'clock', label: 'Clock', enabled: true, order: 0 },
  { id: 'pomodoro', label: 'Pomodoro', enabled: true, order: 1 },
  { id: 'mood', label: 'Mood Tracker', enabled: true, order: 2 },
  { id: 'countdown', label: 'Countdown', enabled: true, order: 3 },
  { id: 'weather', label: 'Weather', enabled: true, order: 4 },
  { id: 'quote', label: 'Quote', enabled: false, order: 5 },
  { id: 'stats', label: 'Stats', enabled: false, order: 6 },
  { id: 'miniCal', label: 'Mini Calendar', enabled: false, order: 7 },
]

const STORAGE_KEY = 'calendar-widget-config'

export function useWidgetConfig() {
  const [widgets, setWidgets] = useState<WidgetConfig[]>(defaultWidgets)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as WidgetConfig[]
        const merged = defaultWidgets.map(def => {
          const found = parsed.find(p => p.id === def.id)
          return found ? { ...def, enabled: found.enabled, order: found.order } : def
        }).sort((a, b) => a.order - b.order)
        setWidgets(merged)
      } catch {
        // ignore
      }
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(widgets))
    }
  }, [widgets, mounted])

  const toggleWidget = useCallback((id: WidgetId) => {
    setWidgets(prev => prev.map(w => 
      w.id === id ? { ...w, enabled: !w.enabled } : w
    ))
  }, [])

  const reorderWidgets = useCallback((newWidgets: WidgetConfig[]) => {
    setWidgets(newWidgets)
  }, [])

  const isEnabled = useCallback((id: WidgetId) => {
    return widgets.find(w => w.id === id)?.enabled ?? true
  }, [widgets])

  return { widgets, toggleWidget, reorderWidgets, isEnabled, mounted }
}
