'use client'

import { useState, useEffect, useCallback } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('calendar-theme') as 'light' | 'dark' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial = stored || (prefersDark ? 'dark' : 'light')
    setTheme(initial)
    document.documentElement.classList.toggle('dark', initial === 'dark')
    setMounted(true)
  }, [])

  const toggle = useCallback(() => {
    if (isTransitioning) return

    const next = theme === 'light' ? 'dark' : 'light'
    setIsTransitioning(true)

    // Get main content wrapper
    const content = document.getElementById('calendar-root')
    if (content) {
      content.style.transition = 'transform 300ms ease, filter 300ms ease, opacity 300ms ease'
      content.style.transform = 'scale(0.98)'
      content.style.filter = 'blur(2px)'
      content.style.opacity = '0.8'
    }

    // Apply theme after brief delay
    setTimeout(() => {
      setTheme(next)
      localStorage.setItem('calendar-theme', next)
      document.documentElement.classList.toggle('dark', next === 'dark')
    }, 150)

    // Restore content
    setTimeout(() => {
      if (content) {
        content.style.transform = 'scale(1)'
        content.style.filter = 'blur(0px)'
        content.style.opacity = '1'
      }
    }, 200)

    setTimeout(() => {
      if (content) {
        content.style.transition = ''
      }
      setIsTransitioning(false)
    }, 550)
  }, [theme, isTransitioning])

  return { theme, toggle, mounted, isTransitioning }
}
