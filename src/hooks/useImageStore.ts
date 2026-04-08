'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { getRandomImage, getDefaultImage } from '@/lib/images'

export function useImageStore(month: number) {
  const [image, setImage] = useState<string>('')
  const initialized = useRef(false)

  useEffect(() => {
    const key = `calendar-img-${month}`
    const stored = localStorage.getItem(key)
    
    if (stored && stored.startsWith('data:')) {
      // User uploaded image - use it
      setImage(stored)
    } else if (!initialized.current) {
      // First load for this month - get fresh image
      const img = getDefaultImage(month)
      setImage(img)
      initialized.current = true
    } else {
      // Month changed - load default for new month
      const img = getDefaultImage(month)
      setImage(img)
    }
  }, [month])

  const randomize = useCallback(() => {
    const img = getRandomImage(month)
    setImage(img)
    // Don't cache random images, only user uploads
  }, [month])

  const handleDrop = useCallback((file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      setImage(dataUrl)
      // Only persist user-uploaded images
      localStorage.setItem(`calendar-img-${month}`, dataUrl)
    }
    reader.readAsDataURL(file)
  }, [month])

  return { image, randomize, handleDrop }
}
