// Reliable seasonal images - using picsum for consistency
// Each month gets themed colors via seed parameter
const monthSeeds: Record<number, number[]> = {
  0: [1015, 1016, 1018],  // January - winter
  1: [1019, 1024, 1025],  // February - soft colors
  2: [1029, 1031, 1032],  // March - spring blooms
  3: [1033, 1035, 1036],  // April - spring greens
  4: [1037, 1039, 1041],  // May - flowers
  5: [1043, 1044, 1047],  // June - summer
  6: [1050, 1051, 1053],  // July - blue skies
  7: [1055, 1057, 1058],  // August - warm
  8: [1060, 1063, 1066],  // September - autumn
  9: [1067, 1069, 1070],  // October - fall colors
  10: [1072, 1073, 1074], // November - late autumn
  11: [1076, 1078, 1080], // December - winter
}

export function getImagesForMonth(month: number): string[] {
  const seeds = monthSeeds[month] || monthSeeds[0]
  return seeds.map(seed => `https://picsum.photos/seed/${seed}/800/400`)
}

export function getRandomImage(month: number): string {
  const images = getImagesForMonth(month)
  const idx = Math.floor(Math.random() * images.length)
  // Add timestamp to bust cache when needed
  return `${images[idx]}?t=${Date.now()}`
}

export function getDefaultImage(month: number): string {
  const seeds = monthSeeds[month] || monthSeeds[0]
  return `https://picsum.photos/seed/${seeds[0]}/800/400`
}
