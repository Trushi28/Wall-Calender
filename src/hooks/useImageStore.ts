'use client'

import { useState, useEffect, useCallback } from 'react'
import { getRandomImage } from '@/lib/images'

export function useImageStore(month: number) {
  const [image, setImage] = useState<string>('')

  useEffect(() => {
    const key = `calendar-image-${month}`
    const stored = localStorage.getItem(key)
    if (stored) {
      setImage(stored)
    } else {
      const img = getRandomImage(month)
      setImage(img)
      localStorage.setItem(key, img)
    }
  }, [month])

  const randomize = useCallback(() => {
    const img = getRandomImage(month)
    setImage(img)
    localStorage.setItem(`calendar-image-${month}`, img)
  }, [month])

  const handleDrop = useCallback((file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      setImage(dataUrl)
      localStorage.setItem(`calendar-image-${month}`, dataUrl)
    }
    reader.readAsDataURL(file)
  }, [month])

  return { image, randomize, handleDrop }
}
