import { useCallback, useEffect, useRef, useState } from 'react'

const HorizontalScroll = ({ children, className = '', maskWidth = 60 }) => {
  const [showMask, setShowMask] = useState({
    left: false,
    right: false,
  })

  const scrollRef = useRef()
  const [dragging, setDragging] = useState(false)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeftStart = useRef(0)

  const checkScrollPosition = useCallback(() => {
    const element = scrollRef.current

    if (!element) return

    const { scrollLeft, scrollWidth, clientWidth } = element

    setShowMask({
      left: scrollLeft > 0,
      right: scrollLeft + clientWidth < scrollWidth - 1,
    })
  }, [])

  const handleDown = (e) => {
    const el = scrollRef.current
    if (!el) return
    isDragging.current = true
    setDragging(true)
    const xPosition = e.touches ? e.touches[0].pageX : e.pageX
    startX.current = xPosition
    scrollLeftStart.current = el.scrollLeft
  }

  const handleMove = (e) => {
    if (!isDragging.current) return
    const el = scrollRef.current
    if (!el) return

    const xPosition =  e.touches ? e.touches[0].pageX : e.pageX
    const scrolled = xPosition - startX.current

    el.scrollLeft = scrollLeftStart.current - scrolled
  }

  const handleUp = () => {
    isDragging.current = false
    setDragging(false)
  }

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
        onMouseDown={handleDown}
        onMouseMove={handleMove}
        onMouseUp={handleUp}
        onMouseLeave={handleUp}
        onTouchStart={handleDown}
        onTouchMove={handleMove}
        onTouchEnd={handleUp}
        className='overflow-x-auto'
        style={{
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          cursor: dragging? 'grabbing': 'grab',
          touchAction: 'none'
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
