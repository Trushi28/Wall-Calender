'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ImageIcon, Shuffle, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  image: string
  onDrop: (file: File) => void
  onRandomize: () => void
}

export function HeroImage({ image, onDrop, onRandomize }: Props) {
  const [isDragging, setIsDragging] = useState(false)
  const [loadState, setLoadState] = useState<'loading' | 'loaded' | 'error'>('loading')

  // Reset loading state when image changes
  useEffect(() => {
    if (image) {
      setLoadState('loading')
    }
  }, [image])

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

  const handleRetry = () => {
    setLoadState('loading')
    onRandomize()
  }

  return (
    <div 
      className={cn(
        'relative h-52 md:h-64 mx-5 rounded-2xl overflow-hidden',
        'bg-gradient-to-br from-accent/20 via-accent/10 to-cyan-500/20',
        'transition-all duration-300',
        isDragging && 'ring-4 ring-accent ring-offset-2 ring-offset-card scale-[1.02]'
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {image && loadState !== 'error' ? (
        <>
          {loadState === 'loading' && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent/20 to-cyan-500/20">
              <motion.div 
                className="w-10 h-10 border-3 border-accent border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          )}
          <motion.img
            src={image}
            alt="Calendar month"
            className={cn(
              'w-full h-full object-cover',
              loadState === 'loading' && 'opacity-0'
            )}
            onLoad={() => setLoadState('loaded')}
            onError={() => setLoadState('error')}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ 
              opacity: loadState === 'loaded' ? 1 : 0,
              scale: loadState === 'loaded' ? 1 : 1.05
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-muted gap-3">
          <ImageIcon className="w-14 h-14 opacity-40" />
          {loadState === 'error' ? (
            <>
              <p className="text-sm">Failed to load image</p>
              <motion.button
                onClick={handleRetry}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className="w-4 h-4" />
                Try another
              </motion.button>
            </>
          ) : (
            <p className="text-sm">Drop an image here</p>
          )}
        </div>
      )}
      
      {/* Shuffle button */}
      <motion.button
        onClick={() => { setLoadState('loading'); onRandomize() }}
        className="absolute bottom-4 right-4 p-2.5 rounded-full bg-black/50 backdrop-blur-md
                   text-white/90 hover:text-white hover:bg-black/70 transition-colors
                   shadow-lg"
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Random image"
      >
        <Shuffle className="w-5 h-5" />
      </motion.button>

      {/* Drop overlay */}
      {isDragging && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-accent/40 backdrop-blur-sm flex items-center justify-center"
        >
          <p className="text-white font-semibold text-lg">Drop image here</p>
        </motion.div>
      )}
    </div>
  )
}
