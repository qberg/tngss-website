import { useCallback, useEffect, useRef, useState } from 'react'

const HorizontalScroll = ({ children, className = '', maskWidth = 60 }) => {
  const [showMask, setShowMask] = useState({
    left: false,
    right: false,
  })

  const scrollRef = useRef()
  const [isTouch, setIsTouch] = useState(false)

  const checkScrollPosition = useCallback(() => {
    const element = scrollRef.current

    if (!element) return

    const { scrollLeft, scrollWidth, clientWidth } = element

    setShowMask({
      left: scrollLeft > 0,
      right: scrollLeft + clientWidth < scrollWidth - 1,
    })
  }, [])

  useEffect(() => {
    const element = scrollRef.current
    if (!element) return

    const controller = new AbortController()
    const { signal } = controller

    checkScrollPosition()

    const resizeObservor = new ResizeObserver(() => {
      checkScrollPosition()
    })
    resizeObservor.observe(element)

    element.addEventListener('scroll', checkScrollPosition, { signal })
    window.addEventListener('resize', checkScrollPosition)

    return () => {
      controller.abort()
      resizeObservor.disconnect()
    }
  }, [checkScrollPosition])

  return (
    <div className='relative'>
      <div
        ref={scrollRef}
        onScroll={checkScrollPosition}
        className='overflow-x-auto'
        style={{
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {children}
      </div>

      <div
        className={`
          pointer-events-none absolute left-0 top-0 bottom-0
          bg-gradient-to-r from-gray-900 to-transparent
          transition-opacity duration-300
          ${showMask.left ? 'opacity-100' : 'opacity-0'}
        `}
        style={{ width: `${maskWidth}px` }}
      />

      {/* Right Gradient Mask */}
      <div
        className={`
          pointer-events-none absolute right-0 top-0 bottom-0
          bg-gradient-to-l from-gray-900 to-transparent
          transition-opacity duration-300
          ${showMask.right ? 'opacity-100' : 'opacity-0'}
        `}
        style={{ width: `${maskWidth}px` }}
      />
    </div>
  )
}

export default HorizontalScroll
