import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import bg from '../../../assets/speakersbg.svg?url'
import { motion, useMotionValue, useTransform, animate } from 'motion/react'
import CTAButton from '../../Elements/CTAButton'
import { useFeaturedSpeakers } from '../../../hooks/useQueryApi'

const MobileSpeakersSection = () => {
  const { data, isLoading: loading, error } = useFeaturedSpeakers()
  const dragX = useMotionValue(0)
  const [isDragging, setIsDragging] = useState(false)
  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef(null)
  const animationRef = useRef(null)

  const speakersData = useMemo(() => data?.docs || [], [data?.docs])

  // Mobile-optimized calculations
  const calculations = useMemo(() => {
    if (typeof window === 'undefined')
      return { cardWidth: 280, totalWidth: 0, maxDrag: 0, visibleCards: 1.2 }

    const viewportWidth = window.innerWidth
    const padding = 32 // 16px on each side
    const gap = 16

    // Card width: show 1.2 cards on mobile for peek effect
    const visibleCards = 1.2
    const cardWidth =
      (viewportWidth - padding - gap * (visibleCards - 1)) / visibleCards

    const totalWidth = speakersData.length * (cardWidth + gap) - gap
    const maxDrag = Math.min(0, -(totalWidth - (viewportWidth - padding)))

    return {
      cardWidth: Math.max(cardWidth, 260), // Minimum card width
      totalWidth,
      maxDrag,
      visibleCards,
      gap,
    }
  }, [speakersData.length, containerWidth])

  // Update container width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  // Cleanup animations
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.stop()
      }
    }
  }, [])

  // Strict drag constraints - no over-dragging
  const dragConstraints = useMemo(() => {
    return {
      left: calculations.maxDrag,
      right: 0,
    }
  }, [calculations.maxDrag])

  // No transform needed - direct dragX value
  const constrainedX = dragX

  const snapToPosition = useCallback(
    async (targetX) => {
      if (animationRef.current) {
        animationRef.current.stop()
      }

      try {
        animationRef.current = animate(dragX, targetX, {
          type: 'spring',
          stiffness: 400,
          damping: 40,
          mass: 0.8,
        })
        await animationRef.current
      } catch (error) {
        // Animation was interrupted
      }
    },
    [dragX]
  )

  const handleDragStart = useCallback(() => {
    setIsDragging(true)
    if (animationRef.current) {
      animationRef.current.stop()
    }
  }, [])

  const handleDragEnd = useCallback(
    async (event, info) => {
      setIsDragging(false)

      const currentX = dragX.get()
      const velocity = info.velocity.x

      // Calculate target position with momentum
      let targetX = currentX + velocity * 0.2

      // Snap to card boundaries for better UX
      const cardStep = calculations.cardWidth + calculations.gap
      const snapIndex = Math.round(-targetX / cardStep)
      const snapPosition = -snapIndex * cardStep

      // Apply strict constraints - no over-dragging
      targetX = Math.max(calculations.maxDrag, Math.min(0, snapPosition))

      await snapToPosition(targetX)
    },
    [dragX, calculations, snapToPosition]
  )

  // Touch-friendly drag settings with strict bounds
  const dragSettings = {
    drag: 'x',
    dragConstraints: dragConstraints,
    dragElastic: 0, // Remove elastic behavior
    dragMomentum: true,
    dragTransition: {
      power: 0.3,
      timeConstant: 150,
    },
    whileDrag: { cursor: 'grabbing' },
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
  }

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
      <div className='px-4 mb-16'>
        <h1 className='text-white text-5xl sm:text-6xl leading-tight gradient-text-black'>
          Speakers at
          <br />
          TNGSS 2025
        </h1>
      </div>

      {/* Draggable speakers container */}
      <div ref={containerRef} className='relative overflow-hidden'>
        <motion.div
          className='flex gap-4 px-4 cursor-grab active:cursor-grabbing'
          style={{ x: constrainedX }}
          {...dragSettings}
        >
          {speakersData.map((speaker, index) => (
            <motion.div
              key={speaker.id}
              className='flex-shrink-0'
              style={{ width: calculations.cardWidth }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <SpeakerCard speaker={speaker} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA Button */}
      <div className='flex justify-center px-4 mt-12'>
        <CTAButton src='/speakers' className='rounded-2xl'>
          <div className='w-60 h-12 flex items-center justify-center text-lg font-semibold'>
            View All Speakers
          </div>
        </CTAButton>
      </div>
    </section>
  )
}

const SpeakerCard = ({ speaker }) => {
  return (
    <div
      className='p-1 overflow-hidden rounded-lg md:rounded-2xl flex-shrink-0'
      style={{
        background: 'linear-gradient(150deg, #007fcf, #f56b0d)',
      }}
    >
      <div className='relative w-full h-80 overflow-hidden rounded-lg md:rounded-2xl bg-gray-900'>
        {speaker.profile_image ? (
          <img
            src={speaker.profile_image.url}
            alt={speaker.profile_image.alt || `${speaker.name}`}
            className='absolute inset-0 w-full h-full object-cover object-center'
            loading='lazy'
          />
        ) : (
          <div className='absolute inset-0 bg-gray-800 flex items-center justify-center'>
            <span className='text-white/60 text-lg'>No Image</span>
          </div>
        )}

        {/* Gradient overlay */}
        <div
          className='absolute inset-0 z-10'
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
          }}
        />

        {/* Speaker info */}
        <div className='absolute bottom-0 left-0 right-0 p-3 text-white z-20'>
          <h4 className='text-lg font-bold mb-1 leading-tight'>
            {speaker.name}
          </h4>
          <p className='text-sm text-white/80 leading-tight'>
            {speaker.designation}, {speaker.organization}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MobileSpeakersSection
