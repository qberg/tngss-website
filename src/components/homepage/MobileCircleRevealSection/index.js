import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'

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
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % segments.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + segments.length) % segments.length)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  return (
    <section className='relative w-full py-16 bg-gray-50 overflow-hidden'>
      {/* Header */}
      <div className='px-6 mb-12'>
        <h1 className='text-black text-4xl font-bold text-center leading-tight'>
          Key Highlights
        </h1>
      </div>

      {/* Carousel Container */}
      <div className='relative h-96 flex items-center justify-center px-4'>
        <div className='relative w-full max-w-sm flex items-center justify-center'>
          {/* Render all cards with proper positioning */}
          {segments.map((segment, index) => {
            const position =
              (index - currentIndex + segments.length) % segments.length
            const isVisible = position <= 1 || position >= segments.length - 1

            if (!isVisible) return null

            let x = 0
            let scale = 0.85
            let opacity = 0.7
            let zIndex = 10
            let y = 0

            if (position === 0) {
              // Current card
              x = 0
              y = 0
              scale = 1
              opacity = 1
              zIndex = 30
            } else if (position === 1) {
              // Next card - positioned behind and to the right
              x = 40
              y = 20
              scale = 0.85
              opacity = 0.7
              zIndex = 20
            } else if (position === segments.length - 1) {
              // Previous card - positioned behind and to the left
              x = -40
              y = 20
              scale = 0.85
              opacity = 0.7
              zIndex = 20
            }

            return (
              <motion.div
                key={index}
                className={`absolute ${
                  position === 0
                    ? 'cursor-grab active:cursor-grabbing'
                    : 'cursor-pointer'
                }`}
                style={{ zIndex }}
                animate={{
                  x,
                  y,
                  scale,
                  opacity,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 30,
                  mass: 0.8,
                }}
                drag={position === 0 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={
                  position === 0
                    ? (e, { offset, velocity }) => {
                        if (offset.x > 100 || velocity.x > 500) {
                          prevSlide()
                        } else if (offset.x < -100 || velocity.x < -500) {
                          nextSlide()
                        }
                      }
                    : undefined
                }
                onClick={() => {
                  if (position === 1) nextSlide()
                  else if (position === segments.length - 1) prevSlide()
                }}
              >
                <CarouselCard segment={segment} isActive={position === 0} />
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Page Indicators */}
      <div className='flex justify-center mt-8 gap-2'>
        {segments.map((_, index) => (
          <motion.button
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-blue-500 w-8' : 'bg-gray-300 w-2'
            }`}
            onClick={() => goToSlide(index)}
            whileTap={{ scale: 0.8 }}
            animate={{
              backgroundColor: index === currentIndex ? '#3b82f6' : '#d1d5db',
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </section>
  )
}

const CarouselCard = ({ segment, isActive }) => {
  return (
    <motion.div
      className='relative rounded-3xl overflow-hidden cursor-pointer'
      style={{
        background: 'linear-gradient(150deg, #007fcf, #f56b0d)',
        width: '280px',
        height: '360px',
      }}
      whileHover={isActive ? { y: -8 } : { scale: 0.85 }}
      whileTap={{ scale: isActive ? 0.95 : 0.75 }}
      animate={{
        boxShadow: isActive
          ? '0 25px 50px rgba(0, 0, 0, 0.2)'
          : '0 10px 25px rgba(0, 0, 0, 0.1)',
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
        duration: 0.3,
      }}
    >
      <div className='p-1 w-full h-full'>
        <div className='relative w-full h-full overflow-hidden rounded-3xl bg-gray-900'>
          {/* Background Image */}
          <motion.img
            src={segment.bgImage}
            alt={segment.title}
            className='absolute inset-0 w-full h-full object-cover'
            animate={{
              scale: isActive ? 1.05 : 1.1,
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />

          {/* iOS-style Gradient Overlay */}
          <div
            className='absolute inset-0 z-10'
            style={{
              background: isActive
                ? 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)'
                : 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
            }}
          />

          {/* Content */}
          <motion.div
            className='absolute bottom-0 left-0 right-0 p-6 text-white z-20'
            animate={{
              opacity: isActive ? 1 : 0.8,
              y: isActive ? 0 : 5,
            }}
            transition={{ duration: 0.3 }}
          >
            <h4 className='text-lg font-bold leading-tight tracking-tight'>
              {segment.title}
            </h4>
          </motion.div>

          {/* iOS-style shine effect */}
          {isActive && (
            <motion.div
              className='absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 z-30'
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                duration: 1.5,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatDelay: 3,
              }}
              style={{ transform: 'skewX(-20deg)' }}
            />
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default MobileCircleRevealSection
