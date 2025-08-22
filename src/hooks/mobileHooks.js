import { useEffect, useRef, useState } from 'react'

export const useMobileOldStickyTrigger = () => {
  const [isSticky, setIsSticky] = useState(true)
  const triggerRef = useRef(null)

  useEffect(() => {
    const trigger = triggerRef.current
    if (!trigger) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log('🔄 Intersection:', {
          intersectionRatio: entry.intersectionRatio,
          isIntersecting: entry.isIntersecting,
          currentIsSticky: isSticky,
        })

        if (entry.intersectionRatio >= 0.2) {
          console.log('📍 Setting isSticky to FALSE')
          setIsSticky(false)
        } else {
          console.log('📍 Setting isSticky to TRUE')
          setIsSticky(true)
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
        rootMargin: '0px', // Remove negative margin initially for testing
      }
    )

    observer.observe(trigger)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    console.log('🎯 isSticky changed to:', isSticky)
  }, [isSticky])

  return { isSticky, triggerRef }
}

export const useMobileStickyTrigger = () => {
  const [isSticky, setIsSticky] = useState(true)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY
          const threshold = window.innerHeight * 3

          // console.log('📏 Scroll check:', {
          //   scrollY,
          //   threshold,
          //   shouldBeSticky: scrollY < threshold,
          // })

          if (scrollY >= threshold && isSticky) {
            //console.log('📍 Passed 330vh - Setting isSticky to FALSE')
            setIsSticky(false)
          } else if (scrollY < threshold && !isSticky) {
            //console.log('📍 Before 330vh - Setting isSticky to TRUE')
            setIsSticky(true)
          }

          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Check initial position
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isSticky])

  return { isSticky }
}
