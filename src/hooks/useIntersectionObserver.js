import { useEffect, useState } from 'react'

export const useIntersectionObserver = (options = {}) => {
  const [element, setElement] = useState(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  const { threshold = 0.1, rootMargin = '100px', triggerOnce = false } = options

  useEffect(() => {
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting

        if (triggerOnce && isElementIntersecting) {
          setIsIntersecting(true)
          observer.unobserve(element)
        } else {
          setIsIntersecting(isElementIntersecting)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [element, threshold, rootMargin, triggerOnce])

  return { setElement, isIntersecting }
}
