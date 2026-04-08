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

    const current = theme
    const next = current === 'light' ? 'dark' : 'light'
    setIsTransitioning(true)

    const root = document.documentElement
    
    // Create overlay with CURRENT theme colors (to hide the instant change)
    const overlay = document.createElement('div')
    overlay.id = 'theme-overlay'
    
    // This overlay covers the screen with the OLD theme color
    // and has a diagonal clip that will shrink to reveal the NEW theme
    const oldBg = current === 'light' ? '#e8e4dc' : '#0a0a0a'
    const lineColor = next === 'dark' ? '#38bdf8' : '#f59e0b'
    
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 99999;
      pointer-events: none;
      background: ${oldBg};
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      transition: clip-path 500ms cubic-bezier(0.4, 0, 0.2, 1);
    `
    
    // Diagonal glowing line
    const line = document.createElement('div')
    line.style.cssText = `
      position: fixed;
      width: 200vw;
      height: 4px;
      background: linear-gradient(90deg, transparent, ${lineColor}, transparent);
      box-shadow: 0 0 20px ${lineColor}, 0 0 40px ${lineColor};
      transform: rotate(-45deg);
      transform-origin: center;
      left: -50vw;
      top: -50vh;
      z-index: 100000;
      transition: top 500ms cubic-bezier(0.4, 0, 0.2, 1);
    `
    
    document.body.appendChild(overlay)
    document.body.appendChild(line)

    // Apply the NEW theme immediately (hidden by overlay)
    setTheme(next)
    localStorage.setItem('calendar-theme', next)
    root.classList.toggle('dark', next === 'dark')

    // Animate: shrink the overlay diagonally to reveal new theme
    requestAnimationFrame(() => {
      // Clip from full screen to nothing (diagonal from top-right to bottom-left)
      overlay.style.clipPath = 'polygon(0 0, 0 0, 0 0, 0 0)'
      line.style.top = '150vh'
    })

    // Cleanup
    setTimeout(() => {
      overlay.remove()
      line.remove()
      setIsTransitioning(false)
    }, 550)
  }, [theme, isTransitioning])

  return { theme, toggle, mounted, isTransitioning }
}
