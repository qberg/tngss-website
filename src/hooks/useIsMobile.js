import { useEffect, useState } from 'react'
/**
 * Custom hook to detect if the screen width is below 768px (mobile breakpoint)
 * @returns {boolean} True if screen width is less than 768px
 */

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()

    window.addEventListener('resize', checkIsMobile)

    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  return isMobile
}

export default useIsMobile
