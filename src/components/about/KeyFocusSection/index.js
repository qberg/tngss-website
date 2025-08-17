'use client'
import { useState, useEffect, useRef } from 'react'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import backgroundImg from '../../../assets/texture.png'

const KeyFocusSection = ({ sectionTitle, data }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsMobile(width < 640)
      setIsTablet(width >= 640 && width < 1024)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const cardsPerView = isMobile ? 1 : isTablet ? 2 : 3
  const totalSlides = Math.ceil((data?.length || 0) / cardsPerView)

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  const goToSlide = (index) => setCurrentSlide(index)

  // Touch Handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const deltaX = touchStartX.current - touchEndX.current
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) handleNext()
      else handlePrev()
    }
  }

  if (!data?.length) {
    return null
  }

  return (
    <section
      className='relative bg-black text-white py-16 font-urbanist'
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className='mx-auto px-4 container'>
        <h2 className='text-3xl md:text-6xl font-medium text-center mb-12'>
          {sectionTitle}
        </h2>

        <div className='relative px-12 sm:px-16 md:px-20'>
          {/* Navigation Arrows - Responsive positioning */}
          {totalSlides > 1 && (
            <>
              {/* Previous Arrow */}
              <button
                className={`absolute top-1/2 transform -translate-y-1/2 z-20
                  w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 
                  bg-orange-500 bg-opacity-80 text-white rounded-full
                  flex items-center justify-center hover:bg-opacity-100 shadow-lg
                  transition-all duration-300 hover:scale-110 orange-circle-1
                  ${isMobile ? 'left-2' : isTablet ? 'left-4' : 'left-8'}`}
                onClick={handlePrev}
                aria-label='Previous slide'
              >
                <FaArrowLeft className='text-xs sm:text-sm md:text-base' />
              </button>

              {/* Next Arrow */}
              <button
                className={`absolute top-1/2 transform -translate-y-1/2 z-20
                  w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 
                  bg-orange-500 bg-opacity-80 text-white rounded-full
                  flex items-center justify-center hover:bg-opacity-100 shadow-lg
                  transition-all duration-300 hover:scale-110 orange-circle-1
                  ${isMobile ? 'right-2' : isTablet ? 'right-4' : 'right-8'}`}
                onClick={handleNext}
                aria-label='Next slide'
              >
                <FaArrowRight className='text-xs sm:text-sm md:text-base' />
              </button>
            </>
          )}

          {/* Carousel container */}
          <div
            className='relative overflow-hidden rounded-2xl'
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className='flex transition-transform duration-500 ease-in-out'
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => {
                const startIndex = slideIndex * cardsPerView
                const endIndex = Math.min(
                  startIndex + cardsPerView,
                  data.length
                )
                const slideCards = data.slice(startIndex, endIndex)

                return (
                  <div
                    key={slideIndex}
                    className='w-full flex-shrink-0 px-2 md:px-4'
                  >
                    <div
                      className={`grid gap-4 md:gap-6 ${
                        isMobile
                          ? 'grid-cols-1'
                          : isTablet
                          ? 'grid-cols-2'
                          : 'grid-cols-3'
                      }`}
                    >
                      {slideCards.map((item, itemIndex) => (
                        <div
                          key={startIndex + itemIndex}
                          className='rounded-3xl overflow-hidden'
                          style={{
                            background:
                              'linear-gradient(to right, #0055FF, #18BFDB, #F5710C, #EC473E)',
                            padding: '2px',
                            height: '280px',
                          }}
                        >
                          <div className='w-full h-full rounded-3xl bg-black p-6 flex flex-col'>
                            <img
                              src={
                                item?.icon?.url ||
                                '/placeholder.svg?height=48&width=48'
                              }
                              alt={item.title}
                              className='w-12 h-12 mb-4 object-contain highlight-text'
                            />
                            <h3 className='text-lg md:text-xl font-semibold mb-2'>
                              {item.title}
                            </h3>
                            <p className='text-sm text-gray-300 mb-4 line-clamp-4 flex-grow'>
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Navigation dots */}
          {totalSlides > 1 && (
            <div className='flex justify-center mt-8 space-x-2'>
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                    currentSlide === index
                      ? 'bg-[#18BFDB] scale-110 shadow-lg'
                      : 'bg-gray-500 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Slide counter for mobile */}
          {isMobile && totalSlides > 1 && (
            <div className='text-center mt-4 text-sm text-gray-400'>
              {/* {currentSlide + 1} / {totalSlides} */}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default KeyFocusSection
