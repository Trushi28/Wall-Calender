// Curated seasonal images from Unsplash
const monthImages: Record<number, string[]> = {
  0: [ // January
    'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?w=800&q=80',
    'https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=800&q=80',
  ],
  1: [ // February
    'https://images.unsplash.com/photo-1486496146582-9ffcd0b2b2b7?w=800&q=80',
    'https://images.unsplash.com/photo-1455156218388-5e61b526818b?w=800&q=80',
  ],
  2: [ // March
    'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80',
    'https://images.unsplash.com/photo-1462275646964-a0e3571f4f7b?w=800&q=80',
  ],
  3: [ // April
    'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&q=80',
    'https://images.unsplash.com/photo-1462530260150-162092dbf011?w=800&q=80',
  ],
  4: [ // May
    'https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?w=800&q=80',
    'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=800&q=80',
  ],
  5: [ // June
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
  ],
  6: [ // July
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    'https://images.unsplash.com/photo-1414609245224-afa02bfb3fda?w=800&q=80',
  ],
  7: [ // August
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
  ],
  8: [ // September
    'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&q=80',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80',
  ],
  9: [ // October
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=800&q=80',
  ],
  10: [ // November
    'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80',
    'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',
  ],
  11: [ // December
    'https://images.unsplash.com/photo-1482139378415-7fb3dfa89784?w=800&q=80',
    'https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=800&q=80',
  ],
}

export function getImagesForMonth(month: number): string[] {
  return monthImages[month] || monthImages[0]
}

export function getRandomImage(month: number): string {
  const images = getImagesForMonth(month)
  return images[Math.floor(Math.random() * images.length)]
}
