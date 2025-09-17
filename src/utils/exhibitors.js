export const getHallFromBooth = (boothNumber) => {
  if (!boothNumber) return null

  const booth = boothNumber.toUpperCase().trim()
  const letter = booth.charAt(0)
  const number = parseInt(booth.slice(1))

  if (isNaN(number)) return null

  if (
    (letter === 'A' && number >= 69 && number <= 174) ||
    (letter === 'B' && number >= 85 && number <= 200) ||
    (letter === 'C' && number >= 1 && number <= 48)
  ) {
    return 'hall_d'
  }

  // Hall G: A175-288, B201-354
  if (
    (letter === 'A' && number >= 175 && number <= 288) ||
    (letter === 'B' && number >= 201 && number <= 354)
  ) {
    return 'hall_g'
  }

  // Hall E: A1-68, B1-84
  if (
    (letter === 'A' && number >= 1 && number <= 68) ||
    (letter === 'B' && number >= 1 && number <= 84)
  ) {
    return 'hall_e'
  }

  return null
}

export const HallLabels = {
  hall_d: 'Hall D',
  hall_g: 'Hall G',
  hall_e: 'Hall E',
}

export const generateExhibitorSlug = (name) => {
  return (
    name
      ?.toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '') || ''
  )
}
