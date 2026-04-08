'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ImageIcon, Shuffle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  image: string
  onDrop: (file: File) => void
  onRandomize: () => void
}

export function HeroImage({ image, onDrop, onRandomize }: Props) {
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file?.type.startsWith('image/')) {
      onDrop(file)
    }
  }, [onDrop])

  return (
    <div 
      className={cn(
        'relative h-48 md:h-56 mx-4 rounded-xl overflow-hidden',
        'bg-gradient-to-br from-accent/20 to-accent/5',
        'transition-all duration-300',
        isDragging && 'ring-4 ring-accent ring-offset-2 ring-offset-card scale-[1.02]'
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {image && !hasError ? (
        <>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-accent/10">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          <motion.img
            src={image}
            alt="Calendar hero"
            className={cn(
              'w-full h-full object-cover kenburns',
              isLoading && 'opacity-0'
            )}
            onLoad={() => setIsLoading(false)}
            onError={() => { setHasError(true); setIsLoading(false) }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoading ? 0 : 1 }}
            transition={{ duration: 0.5 }}
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-muted">
          <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
          <p className="text-sm">Drop an image here</p>
        </div>
      )}
      
      {/* Shuffle button */}
      <motion.button
        onClick={() => { setIsLoading(true); setHasError(false); onRandomize() }}
        className="absolute bottom-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-sm
                   text-white/80 hover:text-white hover:bg-black/60 transition-colors"
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Random image"
      >
        <Shuffle className="w-4 h-4" />
      </motion.button>

      {/* Drop overlay */}
      {isDragging && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-accent/30 backdrop-blur-sm flex items-center justify-center"
        >
          <p className="text-white font-medium">Drop image here</p>
        </motion.div>
      )}
    </div>
  )
}
