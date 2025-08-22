import { useState, useRef, useCallback, useMemo } from 'react'
import bg from '../../../assets/speakersbg.svg?url'
import { motion, useMotionValue, animate } from 'motion/react'
import CTAButton from '../../Elements/CTAButton'
import { useFeaturedSpeakers } from '../../../hooks/useQueryApi'
import SpeakerCard from './SpeakerCard'

const MobileSpeakersSection = () => {
  const { data, isLoading: loading, error } = useFeaturedSpeakers()

  const dragX = useMotionValue(0)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)

  const speakersData = useMemo(() => data?.docs || [], [data?.docs])

  const config = useMemo(() => {
    const viewportWidth =
      typeof window !== 'undefined' ? window.innerWidth : 375
    const padding = 32
    const gap = 16
    const cardWidth = Math.max(280, viewportWidth * 0.8)
    const totalWidth = speakersData.length * (cardWidth + gap) - gap
    const maxScroll = Math.max(0, totalWidth - (viewportWidth - padding))

    return {
      cardWidth,
      gap,
      maxScroll: -maxScroll,
      totalCards: speakersData.length,
      cardStep: cardWidth + gap,
    }
  }, [speakersData.length])

  const snapToCard = useCallback(
    (velocity = 0) => {
      const currentX = dragX.get()
      const { cardStep, totalCards, maxScroll } = config

      // Find current card index
      const currentIndex = -currentX / cardStep

      // Determine snap direction based on velocity
      let targetIndex
      if (Math.abs(velocity) > 500) {
        // High velocity - snap in direction of movement
        targetIndex =
          velocity > 0 ? Math.floor(currentIndex) : Math.ceil(currentIndex)
      } else {
        // Low velocity - snap to nearest
        targetIndex = Math.round(currentIndex)
      }

      // Clamp to bounds
      targetIndex = Math.max(0, Math.min(totalCards - 1, targetIndex))
      const snapTarget = -targetIndex * cardStep
      const finalTarget = Math.max(maxScroll, Math.min(0, snapTarget))

      // Simple, fast spring animation
      animate(dragX, finalTarget, {
        type: 'spring',
        stiffness: 400,
        damping: 30,
        mass: 0.5,
      })
    },
    [dragX, config]
  )

  if (loading) {
    return (
      <section className='relative h-screen flex items-center justify-center'>
        <img
          src={bg}
          alt='Background for speakers'
          className='absolute inset-0 object-cover object-center w-full h-full -z-10'
          loading='lazy'
        />
        <div className='text-white text-center py-8 text-xl'>
          Loading speakers...
        </div>
      </section>
    )
  }

  if (error || !speakersData || speakersData.length === 0) {
    return (
      <section className='relative h-screen flex items-center justify-center'>
        <img
          src={bg}
          alt='Background for speakers'
          className='absolute inset-0 object-cover object-center w-full h-full -z-10'
          loading='lazy'
        />
        <div className='text-white text-center py-8 text-lg'>
          {error ? `Error: ${error.message}` : 'No speakers available'}
        </div>
      </section>
    )
  }

  return (
    <section className='relative h-screen flex flex-col justify-center overflow-hidden'>
      <img
        src={bg}
        alt='Background for speakers'
        className='absolute inset-0 object-cover object-center w-full h-full -z-10'
        loading='lazy'
      />

      {/* Header */}
      <div className='px-4 mb-12'>
        <h1 className='text-white text-5xl sm:text-6xl leading-tight gradient-text-black'>
          Speakers at
          <br />
          TNGSS 2025
        </h1>
      </div>

      {/* Simple, smooth speakers carousel */}
      <div ref={containerRef} className='relative overflow-hidden'>
        <motion.div
          className='flex gap-4 px-4'
          style={{
            x: dragX,
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          drag='x'
          dragMomentum={true}
          dragElastic={0.1}
          dragConstraints={{
            left: config.maxScroll - 10,
            right: 10,
          }}
          dragTransition={{
            power: 0.3,
            timeConstant: 150,
            modifyTarget: (target) => {
              // Snap to nearest card
              const cardStep = config.cardStep
              const snapIndex = Math.round(-target / cardStep)
              const clampedIndex = Math.max(
                0,
                Math.min(config.totalCards - 1, snapIndex)
              )
              return -clampedIndex * cardStep
            },
          }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(_, { velocity }) => {
            setIsDragging(false)
            // Let dragTransition handle the snapping
          }}
          style={{
            touchAction: 'pan-x',
            WebkitUserSelect: 'none',
            userSelect: 'none',
          }}
        >
          {speakersData.map((speaker, index) => (
            <motion.div
              key={speaker.id}
              className='flex-shrink-0'
              style={{ width: config.cardWidth }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.05,
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <SpeakerCard speaker={speaker} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA Button */}
      <div className='flex justify-center px-4 mt-8'>
        <CTAButton src='/speakers' className='rounded-2xl'>
          <div className='w-60 h-12 flex items-center justify-center text-lg font-semibold'>
            View All Speakers
          </div>
        </CTAButton>
      </div>
    </section>
  )
}

export default MobileSpeakersSection
