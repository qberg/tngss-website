import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, animate } from 'motion/react'

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

const MobileCircleRevealSection = () => {
  // Native iOS-style swipe state
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [screenWidth, setScreenWidth] = useState(0)

  // Motion values for native-like scrolling
  const x = useMotionValue(0)
  const xSpring = useSpring(x, {
    stiffness: 300,
    damping: 30,
    mass: 0.8,
    restDelta: 0.001,
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setScreenWidth(window.innerWidth)

      const handleResize = () => {
        setScreenWidth(window.innerWidth)
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Update spring position when currentIndex changes
  useEffect(() => {
    const targetX = -currentIndex * screenWidth
    animate(x, targetX, {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      mass: 0.8,
    })
  }, [currentIndex, screenWidth, x])

  // Native iOS swipe handlers
  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDrag = (event, info) => {
    const currentX = -currentIndex * screenWidth
    const newX = currentX + info.offset.x

    // Apply rubber band effect at boundaries
    const maxIndex = segments.length - 1
    let constrainedX = newX

    if (currentIndex === 0 && info.offset.x > 0) {
      // Rubber band effect when trying to go before first item
      constrainedX = currentX + info.offset.x * 0.3
    } else if (currentIndex === maxIndex && info.offset.x < 0) {
      // Rubber band effect when trying to go after last item
      constrainedX = currentX + info.offset.x * 0.3
    }

    x.set(constrainedX)
  }

  const handleDragEnd = (event, info) => {
    setIsDragging(false)

    const threshold = 50
    const velocityThreshold = 500
    const { offset, velocity } = info

    let newIndex = currentIndex

    // Determine direction based on distance and velocity
    if (
      Math.abs(offset.x) > threshold ||
      Math.abs(velocity.x) > velocityThreshold
    ) {
      if (offset.x > 0 || velocity.x > 0) {
        // Swipe right - go to previous
        newIndex = Math.max(0, currentIndex - 1)
      } else {
        // Swipe left - go to next
        newIndex = Math.min(segments.length - 1, currentIndex + 1)
      }
    }

    setCurrentIndex(newIndex)
  }

  const goToSlide = (index) => {
    if (index >= 0 && index < segments.length && !isDragging) {
      setCurrentIndex(index)
    }
  }

  return (
    <section className='relative w-full py-20 bg-gray-50 overflow-hidden'>
      {/* Header */}
      <motion.div
        className='px-6 mb-12'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <h1 className='text-black text-4xl font-bold text-center leading-tight'>
          Key Highlights
        </h1>
      </motion.div>

      {/* Native swipe container */}
      <div className='relative overflow-hidden'>
        <motion.div
          className='flex'
          style={{
            x: xSpring,
            width: `${segments.length * 100}%`,
          }}
          drag='x'
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0}
          dragMomentum={false}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        >
          {segments.map((segment, index) => {
            const distance = Math.abs(index - currentIndex)
            const isActive = index === currentIndex
            const isPrev = index === currentIndex - 1
            const isNext = index === currentIndex + 1

            return (
              <motion.div
                key={index}
                className='flex-shrink-0 px-6 flex justify-center items-center'
                style={{
                  width: `${100 / segments.length}%`,
                  minHeight: '500px',
                }}
                animate={{
                  scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.75,
                  opacity: isActive ? 1 : isPrev || isNext ? 0.6 : 0.3,
                  y: isActive ? 0 : isPrev || isNext ? 20 : 40,
                  rotateY: distance > 1 ? (index < currentIndex ? -15 : 15) : 0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                  mass: 0.8,
                }}
              >
                <MobileSegmentCard
                  segment={segment}
                  isActive={isActive}
                  isDragging={isDragging}
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Native-style page indicators */}
      <motion.div
        className='flex justify-center mt-8 space-x-2'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.6,
        }}
      >
        {segments.map((_, index) => (
          <motion.button
            key={index}
            className={`rounded-full ${
              index === currentIndex
                ? 'bg-blue-500 w-8 h-2'
                : 'bg-gray-300 w-2 h-2'
            }`}
            onClick={() => goToSlide(index)}
            whileTap={{ scale: 0.8 }}
            layout
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
            }}
          />
        ))}
      </motion.div>

      {/* Gesture hint for first time users */}
      <motion.div
        className='absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 text-gray-500 text-sm'
        initial={{ opacity: 1 }}
        animate={{
          opacity: [1, 0.5, 1],
          x: [-5, 5, -5],
        }}
        transition={{
          duration: 2,
          repeat: 2,
          ease: 'easeInOut',
        }}
      >
        <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
          <path
            d='M9 18L15 12L9 6'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        <span>Swipe to explore</span>
      </motion.div>
    </section>
  )
}

const MobileSegmentCard = ({ segment, isActive, isDragging }) => {
  return (
    <motion.div
      className='relative rounded-3xl overflow-hidden'
      style={{
        background: 'linear-gradient(150deg, #007fcf, #f56b0d)',
        width: '300px',
        height: '400px',
        perspective: '1000px',
      }}
      animate={{
        boxShadow: isActive
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          : '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
    >
      <div className='p-1 w-full h-full'>
        <motion.div
          className='relative w-full h-full overflow-hidden rounded-3xl'
          animate={{
            rotateY: isDragging ? (Math.random() - 0.5) * 2 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
          }}
        >
          {segment.bgImage ? (
            <motion.img
              src={segment.bgImage}
              alt={`${segment.title}-bgImage`}
              className='absolute inset-0 w-full h-full object-cover'
              animate={{
                scale: isActive ? 1.05 : 1,
              }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />
          ) : (
            <div className='absolute inset-0 bg-gray-900' />
          )}

          <div
            className='absolute inset-0 z-10'
            style={{
              background:
                'linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1), transparent)',
            }}
          />

          <motion.div
            className='absolute bottom-0 left-0 right-0 p-6 text-white z-20'
            animate={{
              y: isActive ? 0 : 8,
              opacity: isActive ? 1 : 0.8,
            }}
            transition={{ duration: 0.4 }}
          >
            <h4 className='text-xl font-bold leading-tight'>{segment.title}</h4>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default MobileCircleRevealSection
