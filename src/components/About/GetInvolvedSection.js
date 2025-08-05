import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import CTAButton from '../Elements/CTAButton'
import backgroundImg from '../../assets/texture.png'

const BREAKPOINT_MD = 768
const SCROLL_SPEED = 0.7
const SWIPE_THRESHOLD = 50

const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < BREAKPOINT_MD)

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  return isMobile
}

const useAutoScroll = (scrollRef, isScrolling, isMobile) => {
  const animationRef = useRef(null)

  const handleScroll = useCallback(() => {
    const container = scrollRef.current
    if (!container || !isScrolling || isMobile) return

    container.scrollLeft += SCROLL_SPEED

    if (
      container.scrollLeft >=
      container.scrollWidth - container.clientWidth - 1
    ) {
      container.scrollLeft = 0
    }

    animationRef.current = requestAnimationFrame(handleScroll)
  }, [isScrolling, isMobile])

  useEffect(() => {
    if (!isMobile && isScrolling) {
      animationRef.current = requestAnimationFrame(handleScroll)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [handleScroll, isMobile, isScrolling])
}

const useSwipeGesture = (onSwipeLeft, onSwipeRight) => {
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX
  }, [])

  const handleTouchMove = useCallback((e) => {
    touchEndX.current = e.touches[0].clientX
  }, [])

  const handleTouchEnd = useCallback(() => {
    const deltaX = touchStartX.current - touchEndX.current

    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      if (deltaX > 0) {
        onSwipeLeft()
      } else {
        onSwipeRight()
      }
    }
  }, [onSwipeLeft, onSwipeRight])

  return { handleTouchStart, handleTouchMove, handleTouchEnd }
}

// Components
const ImageCard = ({ item, index }) => (
  <div
    className='p-1 rounded-xl overflow-hidden'
    style={{
      background:
        'linear-gradient(148.59deg, #0055FF 2.92%, #07BCCE 23.28%, #F7750C 80.11%, #FF0000 97.63%)',
    }}
  >
    <div className='overflow-hidden' style={{ borderRadius: 'inherit' }}>
      <img
        src={item.image.url}
        alt={`Involved item ${index + 1}`}
        className='object-cover hover:cursor-pointer w-full'
        loading='lazy'
      />
    </div>
  </div>
)

const DesktopCarousel = ({ images, scrollRef, onMouseEnter, onMouseLeave }) => (
  <div className='hidden md:block'>
    <div
      ref={scrollRef}
      className='overflow-x-auto whitespace-nowrap py-4 scrollbar-hide'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className='inline-flex gap-4 pl-4'>
        {images.map((item, index) => (
          <div
            key={item.id || index}
            className='flex-shrink-0'
            style={{ width: 'calc(33.33% - 11px)' }}
          >
            <ImageCard item={item} index={index} />
          </div>
        ))}
      </div>
    </div>
  </div>
)

const MobileCarousel = ({
  images,
  currentSlide,
  onSlideChange,
  swipeHandlers,
}) => (
  <div className='md:hidden relative'>
    <div
      className='overflow-hidden whitespace-nowrap scroll-smooth scrollbar-hide'
      {...swipeHandlers}
    >
      {images.map((item, index) => (
        <div
          key={item.id || index}
          className='inline-block w-full px-4'
          style={{ transition: 'transform 0.5s ease' }}
        >
          <div className='mx-auto max-w-sm'>
            <ImageCard item={item} index={index} />
          </div>
        </div>
      ))}
    </div>

    {/* Dots Navigation */}
    <div className='flex justify-center mt-4 space-x-2'>
      {images.map((_, index) => (
        <button
          key={index}
          onClick={() => onSlideChange(index)}
          className={`w-3 h-3 rounded-full transition-all duration-200 ${
            currentSlide === index
              ? 'bg-[#18BFDB] scale-110'
              : 'bg-gray-500 hover:bg-gray-400'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  </div>
)

const Header = ({ title, content, ctas }) => (
  <div className='md:mb-12 flex flex-wrap md:flex-nowrap gap-8 py-16 px-4 sm:px-6 md:px-12 lg:px-20'>
    <div className='w-full md:w-4/12'>
      <h2
        className='text-5xl sm:text-6xl md:text-7xl lg:text-[72px] mb-3 font-medium'
        style={{ lineHeight: '125%' }}
      >
        {title}
      </h2>
    </div>
    <div className='w-full md:w-8/12 text-base sm:text-lg text-gray-300 space-y-4'>
      {content.map((item, index) => (
        <p key={item.id || index} className='mt-6 text-xl sm:text-2xl'>
          {item.para}
        </p>
      ))}

      <div className='mt-4 flex justify-start gap-4'>
        {ctas.map((item, index) => (
          <CTAButton
            key={item.id || index}
            className='rounded-2xl mt-4'
            src={item.cta.url}
          >
            <div className='h-12 px-6 sm:px-10 flex items-center justify-center text-base sm:text-lg font-semibold'>
              {item.cta.label}
            </div>
          </CTAButton>
        ))}
      </div>
    </div>
  </div>
)

const GetInvolvedSection = ({ data }) => {
  const { title, content, images, ctas } = data
  const desktopScrollRef = useRef(null)
  const [isScrolling, setIsScrolling] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)

  const isMobile = useResponsive()

  const slideCount = useMemo(() => images?.length || 0, [images])

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index)
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slideCount)
  }, [slideCount])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount)
  }, [slideCount])

  useAutoScroll(desktopScrollRef, isScrolling, isMobile)
  const swipeHandlers = useSwipeGesture(nextSlide, prevSlide)

  if (!data || !images?.length) {
    return null
  }

  return (
    <section
      className='w-full bg-black text-white pb-5 font-urbanist'
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Header title={title} content={content} ctas={ctas} />

      <DesktopCarousel
        images={images}
        scrollRef={desktopScrollRef}
        onMouseEnter={() => setIsScrolling(false)}
        onMouseLeave={() => setIsScrolling(true)}
      />

      <MobileCarousel
        images={images}
        currentSlide={currentSlide}
        onSlideChange={goToSlide}
        swipeHandlers={swipeHandlers}
      />

      <style jsx>{`
        .scrollbar-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}

export default GetInvolvedSection
