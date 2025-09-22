import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'motion/react'

function ScrollArea({
  children,
  className = '',
  maxHeight = '200px',
  showScrollbar = true,
  scrollbarWidth = 8,
  thumbColor = '#94a3b8',
  thumbHoverColor = '#64748b',
  trackColor = '#f1f5f9',
  ...props
}) {
  const [isScrolling, setIsScrolling] = useState(false)
  const [showThumb, setShowThumb] = useState(false)
  const [thumbHeight, setThumbHeight] = useState(0)
  const [thumbTop, setThumbTop] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartY, setDragStartY] = useState(0)
  const [dragStartScrollTop, setDragStartScrollTop] = useState(0)

  const scrollContainerRef = useRef(null)
  const thumbRef = useRef(null)
  const scrollTimeoutRef = useRef(null)

  // Update scrollbar visibility and position
  const updateScrollbar = useCallback(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const { scrollTop, scrollHeight, clientHeight } = container

    // Check if scrolling is needed
    const hasOverflow = scrollHeight > clientHeight
    setShowThumb(hasOverflow && showScrollbar)

    if (hasOverflow) {
      // Calculate thumb height as a percentage of the container height
      const thumbHeightPercentage = clientHeight / scrollHeight
      const minThumbHeight = 20
      const calculatedHeight = Math.max(
        minThumbHeight,
        clientHeight * thumbHeightPercentage
      )
      setThumbHeight(calculatedHeight)

      // Calculate thumb position
      const scrollPercentage = scrollTop / (scrollHeight - clientHeight)
      const maxThumbPosition = clientHeight - calculatedHeight
      setThumbTop(scrollPercentage * maxThumbPosition)
    }
  }, [showScrollbar])

  // Handle scroll events
  const handleScroll = useCallback(() => {
    updateScrollbar()
    setIsScrolling(true)

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    // Hide scrollbar after inactivity
    scrollTimeoutRef.current = setTimeout(() => {
      if (!isDragging) {
        setIsScrolling(false)
      }
    }, 1500)
  }, [updateScrollbar, isDragging])

  // Handle mouse down on thumb
  const handleMouseDown = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()

    setIsDragging(true)
    setDragStartY(e.clientY)
    setDragStartScrollTop(scrollContainerRef.current?.scrollTop || 0)
    setIsScrolling(true)
  }, [])

  // Handle mouse move (dragging)
  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging || !scrollContainerRef.current) return

      e.preventDefault()

      const container = scrollContainerRef.current
      const { scrollHeight, clientHeight } = container

      const deltaY = e.clientY - dragStartY
      const maxScrollTop = scrollHeight - clientHeight

      // Convert pixel movement to scroll movement
      const scrollRatio = deltaY / (clientHeight - thumbHeight)
      const newScrollTop = dragStartScrollTop + scrollRatio * maxScrollTop

      // Clamp the scroll position
      container.scrollTop = Math.max(0, Math.min(maxScrollTop, newScrollTop))
    },
    [isDragging, dragStartY, dragStartScrollTop, thumbHeight]
  )

  // Handle mouse up (stop dragging)
  const handleMouseUp = useCallback(() => {
    setIsDragging(false)

    // Start fade out timer
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false)
    }, 1500)
  }, [])

  // Handle track click
  const handleTrackClick = useCallback((e) => {
    if (!scrollContainerRef.current || e.target === thumbRef.current) return

    const container = scrollContainerRef.current
    const rect = e.currentTarget.getBoundingClientRect()
    const clickY = e.clientY - rect.top

    const { scrollHeight, clientHeight } = container
    const maxScrollTop = scrollHeight - clientHeight

    // Calculate target scroll position
    const targetScrollTop = (clickY / clientHeight) * maxScrollTop

    container.scrollTo({
      top: Math.max(0, Math.min(maxScrollTop, targetScrollTop)),
      behavior: 'smooth',
    })
  }, [])

  // Global mouse events for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.userSelect = 'none'
      document.body.style.cursor = 'grabbing'

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.body.style.userSelect = ''
        document.body.style.cursor = ''
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  // Initialize and handle resize
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    // Initial calculation
    updateScrollbar()

    // Create ResizeObserver to watch for size changes
    const resizeObserver = new ResizeObserver(() => {
      updateScrollbar()
    })

    resizeObserver.observe(container)

    return () => {
      resizeObserver.disconnect()
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [updateScrollbar])

  return (
    <div
      className={`relative ${className}`}
      style={{ height: maxHeight, maxHeight }}
      {...props}
    >
      {/* Main scrollable container with hidden scrollbars */}
      <div
        ref={scrollContainerRef}
        className='h-full overflow-y-auto pr-4'
        onScroll={handleScroll}
        style={{
          /* Hide scrollbars in all browsers */
          scrollbarWidth: 'none' /* Firefox */,
          msOverflowStyle: 'none' /* IE and Edge */,
          marginRight: showThumb ? `-${scrollbarWidth + 4}px` : '0px',
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
          }
        `}</style>
        {children}
      </div>

      {/* Custom scrollbar track and thumb */}
      {showThumb && (
        <div
          className='absolute top-0 right-0 rounded-full transition-opacity duration-200 z-10'
          style={{
            width: scrollbarWidth,
            height: '100%',
            backgroundColor: trackColor,
            opacity: isScrolling || isDragging ? 0.8 : 0.4,
          }}
          onClick={handleTrackClick}
        >
          {/* Scrollbar thumb */}
          <motion.div
            ref={thumbRef}
            className='absolute right-0 rounded-full cursor-grab active:cursor-grabbing'
            style={{
              width: scrollbarWidth,
              height: thumbHeight,
              backgroundColor: thumbColor,
              top: thumbTop,
            }}
            whileHover={{
              backgroundColor: thumbHoverColor,
            }}
            animate={{
              opacity: isScrolling || isDragging ? 1 : 0.8,
            }}
            transition={{ duration: 0.2 }}
            onMouseDown={handleMouseDown}
          />
        </div>
      )}
    </div>
  )
}

export default ScrollArea
