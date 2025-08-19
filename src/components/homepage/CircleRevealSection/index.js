import { useEffect, useRef, useState } from 'react'
import { useIsMobile } from '../../../hooks/test_hooks/useIsMobile'
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'motion/react'

import bg1 from '../../../assets/ke0.jpeg'
import bg2 from '../../../assets/ke1.jpg'
import bg3 from '../../../assets/ke2.jpg'
import bg4 from '../../../assets/ke3.jpg'

const segments = [
  {
    title: 'Elite Investor & Founder Networking Hub',
    bgImage: bg1,
  },
  {
    title: 'Connect & Collaborate at the Pavilion',
    bgImage: bg2,
  },
  {
    title: 'Startup Accelerator Bootcamp',
    bgImage: bg3,
  },
  {
    title: 'Startup Showcase & Thought Leadership Stages',
    bgImage: bg4,
  },
]

const CircleRevealSection = () => {
  const mainRef = useRef(null)
  const containerRef = useRef(null)
  const cardsRef = useRef(null)
  const isMobile = useIsMobile()
  const [containerWidth, setContainerWidth] = useState(0)
  const [scrollWidth, setScrollWidth] = useState(0)
  const [scrollHeight, setScrollHeight] = useState(0)

  // Mobile swipe state
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const updateMeasurements = () => {
      if (!cardsRef.current || !containerRef.current) return

      const containerW = containerRef.current.offsetWidth
      const scrollW = cardsRef.current.scrollWidth

      setContainerWidth(containerW)
      setScrollWidth(scrollW)

      const totalScrollDistance = scrollW - containerW + 100
      setScrollHeight(window.innerHeight * 1.5 + totalScrollDistance)
    }

    updateMeasurements()
    window.addEventListener('resize', updateMeasurements)
    return () => window.removeEventListener('resize', updateMeasurements)
  }, [])

  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ['start end', 'end start'],
  })

  const circleScale = useTransform(scrollYProgress, [0, 1], [0.25, 8])

  const cardsX = useTransform(
    scrollYProgress,
    [0.4, 0.75],
    [100, -(scrollWidth - containerWidth) - 100]
  )

  const headerY = useTransform(scrollYProgress, [0, 0.2, 0.33], [400, 200, 0])
  const headerOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.25],
    [0, 0.75, 1]
  )
  const cardsOpacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1])
  const cardsY = useTransform(scrollYProgress, [0, 0.2, 0.33], [300, 150, 0])

  // Mobile swipe handlers
  const handleDragEnd = (event, info) => {
    const threshold = 50
    const { offset, velocity } = info

    if (offset.x > threshold || velocity.x > 500) {
      // Swipe right - go to previous
      setCurrentIndex((prev) => Math.max(0, prev - 1))
    } else if (offset.x < -threshold || velocity.x < -500) {
      // Swipe left - go to next
      setCurrentIndex((prev) => Math.min(segments.length - 1, prev + 1))
    }
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    console.log('Page Scroll:', latest)
  })

  // Mobile version
  if (isMobile) {
    return (
      <section className='relative w-full py-16 bg-gray-50'>
        <div className='px-6 mb-8'>
          <h1 className='text-black text-4xl font-bold text-center'>
            Key Highlights
          </h1>
        </div>

        <div className='relative overflow-hidden'>
          <motion.div
            className='flex'
            animate={{ x: -currentIndex * 100 + '%' }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            }}
            drag='x'
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
          >
            {segments.map((segment, index) => (
              <motion.div
                key={index}
                className='w-full flex-shrink-0 px-6'
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: index === currentIndex ? 1 : 0.7,
                  y: 0,
                  scale: index === currentIndex ? 1 : 0.95,
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94], // iOS easing curve
                }}
              >
                <MobileSegmentCard segment={segment} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Page indicator dots */}
        <div className='flex justify-center mt-6 space-x-2'>
          {segments.map((_, index) => (
            <motion.button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-blue-500 w-6' : 'bg-gray-300'
              }`}
              onClick={() => goToSlide(index)}
              whileTap={{ scale: 0.8 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 30,
              }}
            />
          ))}
        </div>

        {/* Navigation arrows */}
        <div className='absolute top-1/2 left-4 transform -translate-y-1/2'>
          <motion.button
            className={`p-3 rounded-full bg-white shadow-lg ${
              currentIndex === 0 ? 'opacity-50' : 'opacity-90'
            }`}
            onClick={() => goToSlide(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 30,
            }}
          >
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M15 18L9 12L15 6'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </motion.button>
        </div>

        <div className='absolute top-1/2 right-4 transform -translate-y-1/2'>
          <motion.button
            className={`p-3 rounded-full bg-white shadow-lg ${
              currentIndex === segments.length - 1 ? 'opacity-50' : 'opacity-90'
            }`}
            onClick={() =>
              goToSlide(Math.min(segments.length - 1, currentIndex + 1))
            }
            disabled={currentIndex === segments.length - 1}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 30,
            }}
          >
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M9 18L15 12L9 6'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </motion.button>
        </div>
      </section>
    )
  }

  // Desktop version (unchanged)
  return (
    <motion.section
      className='overflow-x-clip relative w-full z-20'
      ref={mainRef}
      style={{
        height: scrollHeight,
      }}
    >
      {/*circle that expands*/}
      <motion.div
        className='absolute top-0 left-1/4 justify-center flex items-center will-change-transform bg-white rounded-full'
        style={{ scale: circleScale, width: '90vh', height: '90vh' }}
      />

      <div
        className='h-screen w-screen flex flex-col justify-between items-center py-8 2xl:py-40'
        style={{
          position: 'sticky',
          top: 0,
        }}
      >
        <motion.h1
          className='text-black text-4xl md:text-8xl font-bold'
          style={{ y: headerY, opacity: headerOpacity }}
        >
          Key Highlights
        </motion.h1>

        <motion.div
          ref={containerRef}
          className='relative w-full'
          style={{ opacity: cardsOpacity, y: cardsY }}
        >
          <motion.div
            ref={cardsRef}
            className='flex gap-8 px-8 w-fit'
            style={{ x: cardsX, willChange: 'transform' }}
          >
            {segments.map((segment, index) => (
              <SegmentCard key={index} segment={segment} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

const SegmentCard = ({ segment }) => {
  return (
    <div
      className='p-1 rounded-2xl overflow-hidden'
      style={{
        background: 'linear-gradient(150deg, #007fcf, #f56b0d)',
      }}
    >
      <div
        className='relative w-96 overflow-hidden rounded-lg md:rounded-2xl'
        style={{ aspectRatio: '0.85/1' }}
      >
        {segment.bgImage ? (
          <img
            src={segment.bgImage}
            alt={`${segment.title}-bgImage`}
            className='absolute inset-0 w-full h-full object-cover object-center'
          />
        ) : (
          <div className='absolute inset-0 bg-gray-900' />
        )}
        <div
          className='absolute inset-0 z-10'
          style={{
            background:
              'linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2), transparent)',
          }}
        />
        <div className='absolute bottom-0 left-0 p-2 text-white z-20'>
          <h4 className='text-xl sm:text-xl font-bold mb-1'>{segment.title}</h4>
        </div>
      </div>
    </div>
  )
}

const MobileSegmentCard = ({ segment }) => {
  return (
    <motion.div
      className='p-1 rounded-2xl overflow-hidden mx-auto'
      style={{
        background: 'linear-gradient(150deg, #007fcf, #f56b0d)',
        maxWidth: '320px',
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
      }}
    >
      <div
        className='relative w-full overflow-hidden rounded-xl'
        style={{ aspectRatio: '0.85/1' }}
      >
        {segment.bgImage ? (
          <img
            src={segment.bgImage}
            alt={`${segment.title}-bgImage`}
            className='absolute inset-0 w-full h-full object-cover object-center'
          />
        ) : (
          <div className='absolute inset-0 bg-gray-900' />
        )}
        <div
          className='absolute inset-0 z-10'
          style={{
            background:
              'linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2), transparent)',
          }}
        />
        <div className='absolute bottom-0 left-0 p-4 text-white z-20'>
          <h4 className='text-lg font-bold leading-tight'>{segment.title}</h4>
        </div>
      </div>
    </motion.div>
  )
}

export default CircleRevealSection
