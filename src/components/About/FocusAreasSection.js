'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import backgroundImg from '../../assets/texture.png'

const BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
}

const VISIBLE_CARDS = {
  mobile: 1,
  tablet: 2,
  desktop: 4,
}

const SWIPE_THRESHOLD = 50
const AUTO_PLAY_INTERVAL = 100

function useResponsive() {
  const [screenSize, setScreenSize] = useState('desktop')

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < BREAKPOINTS.mobile) {
        setScreenSize('mobile')
      } else if (width < BREAKPOINTS.tablet) {
        setScreenSize('tablet')
      } else {
        setScreenSize('desktop')
      }
    }

    handleResize()

    let timeoutId
    const debouncedResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleResize, 100)
    }

    window.addEventListener('resize', debouncedResize)
    return () => {
      window.removeEventListener('resize', debouncedResize)
      clearTimeout(timeoutId)
    }
  }, [])

  return screenSize
}

function useSwipeGesture(onSwipeLeft, onSwipeRight, enabled = true) {
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const handleTouchStart = useCallback(
    (e) => {
      if (!enabled) return
      touchStartX.current = e.touches[0].clientX
    },
    [enabled]
  )

  const handleTouchMove = useCallback(
    (e) => {
      if (!enabled) return
      touchEndX.current = e.touches[0].clientX
    },
    [enabled]
  )

  const handleTouchEnd = useCallback(() => {
    if (!enabled) return

    const deltaX = touchStartX.current - touchEndX.current
    const absDeltaX = Math.abs(deltaX)

    if (absDeltaX > SWIPE_THRESHOLD) {
      if (deltaX > 0) {
        onSwipeLeft()
      } else {
        onSwipeRight()
      }
    }
  }, [enabled, onSwipeLeft, onSwipeRight])

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  }
}

export default function FocusAreasSection({
  sectionTitle = 'Discover Pavilion',
  data = [],
  className = '',
  autoPlay = false,
  autoPlayInterval = AUTO_PLAY_INTERVAL,
  showDots = true,
  showArrows = true,
  enableSwipe = true,
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const autoPlayRef = useRef()
  const screenSize = useResponsive()

  const visibleCards = useMemo(() => VISIBLE_CARDS[screenSize], [screenSize])
  const maxIndex = useMemo(
    () => Math.max(0, data.length - visibleCards),
    [data.length, visibleCards]
  )
  const hasMultipleCards = data.length > visibleCards

  const translateX = useMemo(() => {
    if (screenSize === 'mobile') {
      return currentIndex * 105
    } else {
      const cardPercentage = 100 / visibleCards
      return currentIndex * cardPercentage
    }
  }, [currentIndex, visibleCards, screenSize])

  const getCardWidth = useCallback(() => {
    if (screenSize === 'mobile') {
      return '100%'
    } else {
      const gapSize = 24
      return `calc(${100 / visibleCards}% - ${
        ((visibleCards - 1) * gapSize) / visibleCards
      }px)`
    }
  }, [visibleCards, screenSize])

  const nextCard = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }, [maxIndex])

  const prevCard = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }, [])

  const goToIndex = useCallback(
    (index) => {
      setCurrentIndex(Math.max(0, Math.min(index, maxIndex)))
    },
    [maxIndex]
  )

  const swipeHandlers = useSwipeGesture(
    nextCard,
    prevCard,
    enableSwipe && hasMultipleCards
  )

  useEffect(() => {
    if (!isPlaying || !hasMultipleCards) return

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        return prev >= maxIndex ? 0 : prev + 1
      })
    }, autoPlayInterval)

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isPlaying, hasMultipleCards, maxIndex, autoPlayInterval])

  const handleMouseEnter = useCallback(() => {
    if (autoPlay) setIsPlaying(false)
  }, [autoPlay])

  const handleMouseLeave = useCallback(() => {
    if (autoPlay) setIsPlaying(true)
  }, [autoPlay])

  const handleKeyDown = useCallback(
    (e) => {
      if (!hasMultipleCards) return

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          prevCard()
          break
        case 'ArrowRight':
          e.preventDefault()
          nextCard()
          break
        case 'Home':
          e.preventDefault()
          goToIndex(0)
          break
        case 'End':
          e.preventDefault()
          goToIndex(maxIndex)
          break
      }
    },
    [hasMultipleCards, prevCard, nextCard, goToIndex, maxIndex]
  )

  useEffect(() => {
    setCurrentIndex(0)
  }, [data])

  if (!data.length) {
    return null
  }

  const totalDots = maxIndex + 1
  const currentDot = currentIndex

  return (
    <section
      className={`bg-black text-white py-16 font-urbanist relative ${className}`}
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      role='region'
      aria-labelledby='focus-areas-title'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className='mx-auto container px-4'>
        <h2
          id='focus-areas-title'
          className='text-3xl md:text-6xl font-medium text-center mb-12'
        >
          {sectionTitle}
        </h2>

        <div
          className='relative px-12 sm:px-16 md:px-20'
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role='group'
          aria-label='Focus areas carousel'
        >
          {/* Navigation Arrows */}
          {showArrows && hasMultipleCards && (
            <>
              <button
                className={`absolute top-1/2 transform -translate-y-1/2 z-20
                  w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 
                  bg-orange-500 bg-opacity-80 text-white rounded-full
                  flex items-center justify-center hover:bg-opacity-100 shadow-lg
                  transition-all duration-300 hover:scale-110 orange-circle-1
                  ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                  ${
                    screenSize === 'mobile'
                      ? 'left-2'
                      : screenSize === 'tablet'
                      ? 'left-4'
                      : 'left-6'
                  }`}
                onClick={prevCard}
                aria-label={`Go to previous card. Currently showing cards starting from ${
                  currentIndex + 1
                }`}
                disabled={currentIndex === 0}
              >
                <FaArrowLeft
                  className='text-xs sm:text-sm md:text-base'
                  aria-hidden='true'
                />
              </button>

              <button
                className={`absolute top-1/2 transform -translate-y-1/2 z-20
                  w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 
                  bg-orange-500 bg-opacity-80 text-white rounded-full
                  flex items-center justify-center hover:bg-opacity-100 shadow-lg
                  transition-all duration-300 hover:scale-110 orange-circle-1
                  ${
                    currentIndex >= maxIndex
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }
                  ${
                    screenSize === 'mobile'
                      ? 'right-2'
                      : screenSize === 'tablet'
                      ? 'right-4'
                      : 'right-6'
                  }`}
                onClick={nextCard}
                aria-label={`Go to next card. Currently showing cards starting from ${
                  currentIndex + 1
                }`}
                disabled={currentIndex >= maxIndex}
              >
                <FaArrowRight
                  className='text-xs sm:text-sm md:text-base'
                  aria-hidden='true'
                />
              </button>
            </>
          )}

          {/* Carousel Container */}
          <div
            className='overflow-hidden'
            role='tabpanel'
            aria-live='polite'
            aria-atomic='false'
          >
            <div
              className='flex transition-transform duration-500 ease-out gap-4 md:gap-6'
              style={{
                transform: `translateX(-${translateX}%)`,
              }}
              {...swipeHandlers}
            >
              {data.map((item, itemIndex) => {
                const CardComponent = item.href ? 'a' : 'div'
                const isVisible =
                  itemIndex >= currentIndex &&
                  itemIndex < currentIndex + visibleCards

                return (
                  <div
                    key={item.id || itemIndex}
                    className='flex-shrink-0'
                    style={{
                      width: getCardWidth(),
                    }}
                  >
                    <CardComponent
                      href={item.href}
                      className='relative rounded-3xl overflow-hidden group focus:outline-none focus:ring-2 focus:ring-blue-400 block w-full'
                      style={{
                        background:
                          'linear-gradient(to right, #0055FF, #18BFDB, #F5710C, #EC473E)',
                        padding: '2px',
                        height: '300px',
                      }}
                      role='article'
                      aria-labelledby={`card-title-${itemIndex}`}
                      tabIndex={isVisible ? 0 : -1}
                    >
                      <div className='w-full h-full rounded-3xl overflow-hidden relative bg-black'>
                        <div
                          className='w-full h-full transition-transform duration-500 group-hover:scale-110'
                          style={{
                            backgroundImage: item.image?.url
                              ? `url(${item.image?.url})`
                              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                          role='img'
                          aria-label={
                            item.background?.alt ||
                            `Background image for ${item.title}`
                          }
                        >
                          <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/90 to-transparent'></div>
                          <div className='absolute inset-0 bg-black/50 p-4 md:p-6 flex flex-col justify-end'>
                            <h3
                              id={`card-title-${itemIndex}`}
                              className='text-lg md:text-xl font-semibold mb-1 text-white'
                            >
                              {item.title}
                            </h3>
                            <p className='text-sm mt-1 line-clamp-3 text-gray-200'>
                              {item.description}
                            </p>
                            <span
                              className='font-semibold underline mt-2 text-[#18BFDB] hover:text-white transition-colors inline-block'
                              aria-label={`Learn more about ${item.title}`}
                            >
                              {item.linkText}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardComponent>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Navigation Dots */}
          {showDots && hasMultipleCards && totalDots > 1 && (
            <div
              className='flex justify-center mt-8 space-x-2'
              role='tablist'
              aria-label='Carousel navigation'
            >
              {Array.from({ length: totalDots }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    index === currentDot
                      ? 'bg-[#18BFDB] scale-110 shadow-lg'
                      : 'bg-gray-500 hover:bg-gray-400'
                  }`}
                  role='tab'
                  aria-selected={index === currentDot}
                  aria-label={`Go to position ${index + 1} of ${totalDots}`}
                />
              ))}
            </div>
          )}

          {/* Screen Reader Only Content */}
          <div className='sr-only' aria-live='polite' aria-atomic='true'>
            Showing cards {currentIndex + 1} to{' '}
            {Math.min(currentIndex + visibleCards, data.length)} of{' '}
            {data.length}
          </div>
        </div>
      </div>
    </section>
  )
}
