import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import bg from '../../../assets/speakersbg.svg?url'
import { motion, useMotionValue } from 'motion/react'
import CTAButton from '../../Elements/CTAButton'
import { animate } from 'motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useFeaturedSpeakers } from '../../../hooks/useQueryApi'

const SpeakersSection = ({ isMobile }) => {
  const { data, isLoading: loading, error } = useFeaturedSpeakers()
  const dragX = useMotionValue(0)
  const [isDragging, setIsDragging] = useState(false)
  const [currentX, setCurrentX] = useState(0)
  const [isLooping, setIsLooping] = useState(false)
  const animationRef = useRef(null)

  const speakersData = useMemo(() => data?.docs || [], [data?.docs])

  const calculations = useMemo(() => {
    const cardWidth = 280 + 21
    const totalWidth = speakersData.length * cardWidth
    const containerWidth =
      typeof window !== 'undefined' ? window.innerWidth : 1200
    const containerPadding = 250
    const availableWidth = containerWidth - containerPadding
    const maxDrag =
      totalWidth > availableWidth ? -(totalWidth - availableWidth) : 0
    const cardsToMove = isMobile ? 2.5 : 1.1
    const moveDistance = cardWidth * cardsToMove

    return { cardWidth, totalWidth, maxDrag, moveDistance }
  }, [speakersData.length, isMobile])

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.stop()
      }
    }
  }, [])

  const dragSettings = useMemo(() => {
    return isMobile
      ? {
          dragElastic: 0.05,
          dragMomentum: true,
          dragTransition: {
            power: 0.2,
            timeConstant: 100,
            bounceDamping: 10,
            bounceStiffness: 300,
          },
        }
      : {
          dragElastic: 0.1,
          dragMomentum: true,
          dragTransition: { power: 0.1, timeConstant: 200 },
        }
  }, [isMobile])

  const buttonStates = useMemo(() => {
    const canScrollLeft = currentX < 0
    const canScrollRight = currentX > calculations.maxDrag || isLooping
    return { canScrollLeft, canScrollRight }
  }, [currentX, calculations.maxDrag, isLooping])

  const performLoopBack = useCallback(async () => {
    if (isLooping) return

    setIsLooping(true)

    if (animationRef.current) {
      animationRef.current.stop()
    }

    try {
      animationRef.current = animate(dragX, 0, {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        mass: 0.8,
        duration: 1.2,
      })

      await animationRef.current
      setCurrentX(0)
    } finally {
      setIsLooping(false)
    }
  }, [dragX, isLooping])

  const scrollLeft = useCallback(async () => {
    if (isLooping) return

    const currentPosition = dragX.get()
    const newX = Math.min(0, currentPosition + calculations.moveDistance)

    if (animationRef.current) {
      animationRef.current.stop()
    }

    try {
      animationRef.current = animate(dragX, newX, {
        type: 'tween',
        ease: [0.25, 0.46, 0.45, 0.94],
        duration: 1.0,
      })

      await animationRef.current
      setCurrentX(newX)
    } catch (error) {
      console.warn('Animation interrupted:', error)
    }
  }, [dragX, calculations.moveDistance, isLooping])

  const scrollRight = useCallback(async () => {
    if (isLooping) return

    const currentPosition = dragX.get()
    const newX = Math.max(
      calculations.maxDrag,
      currentPosition - calculations.moveDistance
    )

    if (animationRef.current) {
      animationRef.current.stop()
    }

    try {
      if (newX <= calculations.maxDrag) {
        animationRef.current = animate(dragX, newX, {
          type: 'tween',
          ease: [0.25, 0.46, 0.45, 0.94],
          duration: 1.0,
        })

        await animationRef.current
        setCurrentX(newX)

        const timeoutId = setTimeout(() => {
          performLoopBack()
        }, 800)

        return () => clearTimeout(timeoutId)
      } else {
        animationRef.current = animate(dragX, newX, {
          type: 'tween',
          ease: [0.25, 0.46, 0.45, 0.94],
          duration: 1.0,
        })

        await animationRef.current
        setCurrentX(newX)
      }
    } catch (error) {
      console.warn('Animation interrupted:', error)
    }
  }, [
    dragX,
    calculations.maxDrag,
    calculations.moveDistance,
    isLooping,
    performLoopBack,
  ])

  const handleDragEnd = useCallback(
    async (event, info) => {
      if (isLooping) return

      setIsDragging(false)
      const finalX = dragX.get()
      const constrainedX = Math.max(calculations.maxDrag, Math.min(0, finalX))

      if (finalX !== constrainedX) {
        if (animationRef.current) {
          animationRef.current.stop()
        }

        try {
          animationRef.current = animate(dragX, constrainedX, {
            type: 'spring',
            stiffness: 300,
            damping: 30,
            duration: 0.5,
          })

          await animationRef.current
        } catch (error) {
          console.warn('Animation interrupted:', error)
        }
      }

      setCurrentX(constrainedX)

      if (
        constrainedX <= calculations.maxDrag &&
        Math.abs(info.velocity.x) < 100
      ) {
        const timeoutId = setTimeout(() => {
          performLoopBack()
        }, 500)

        return () => clearTimeout(timeoutId)
      }
    },
    [dragX, calculations.maxDrag, isLooping, performLoopBack]
  )

  const handleDragStart = useCallback(() => {
    if (isLooping) return

    if (animationRef.current) {
      animationRef.current.stop()
    }

    setIsDragging(true)
    setCurrentX(dragX.get())
  }, [dragX, isLooping])

  if (loading) {
    return (
      <section className='relative h-svh md:h-screen flex items-center justify-center'>
        <img
          src={bg}
          alt='Background for speakers'
          className='absolute inset-0 object-cover object-center w-full h-full -z-10'
          loading='lazy'
        />
        <div className='text-white text-center py-8 text-2xl'>
          Loading featured speakers...
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className='relative h-svh md:h-screen flex items-center justify-center'>
        <img
          src={bg}
          alt='Background for speakers'
          className='absolute inset-0 object-cover object-center w-full h-full -z-10'
          loading='lazy'
        />
        <div className='text-white text-center py-8'>
          An error has occurred: {error.message}
        </div>
      </section>
    )
  }

  // Show message if no featured speakers
  if (!speakersData || speakersData.length === 0) {
    return (
      <section className='relative h-svh md:h-screen flex items-center justify-center'>
        <img
          src={bg}
          alt='Background for speakers'
          className='absolute inset-0 object-cover object-center w-full h-full -z-10'
          loading='lazy'
        />
        <div className='text-white text-center py-8 text-xl'>
          No featured speakers available at the moment.
        </div>
      </section>
    )
  }

  return (
    <section className='relative h-svh md:h-screen flex flex-col gap-4 md:gap-6 xl:gap-8 2xl:gap-24 justify-center'>
      <img
        src={bg}
        alt='Background for speakers'
        className='absolute inset-0 object-cover object-center w-full h-full -z-10'
        loading='lazy'
      />

      <h1 className='text-white will-change-transform text-6xl 2xl:text-8xl mix-blend-lighten gradient-text-black mt-2 md:mt-4 px-4 md:px-14 2xl:px-20'>
        Featured Speakers at TNGSS 2025
      </h1>

      <motion.div className='flex flex-col gap-8 md:gap-6 2xl:gap-8 px-4 md:px-14 2xl:px-24 mt-10 md:mt-0'>
        {/* Navigation arrows */}
        <div className='w-full hidden md:flex justify-end'>
          <div className='flex gap-4'>
            <button
              onClick={scrollLeft}
              disabled={!buttonStates.canScrollLeft || isLooping}
              className={`w-6 h-6 flex items-center transition-opacity ${
                !buttonStates.canScrollLeft || isLooping
                  ? 'opacity-50 cursor-not-allowed'
                  : 'opacity-100 hover:opacity-100'
              }`}
              aria-label='Scroll left'
            >
              <ArrowLeft size={16} />
            </button>

            <button
              onClick={scrollRight}
              disabled={isLooping}
              className={`w-6 h-6 flex items-center transition-opacity ${
                isLooping
                  ? 'opacity-50 cursor-not-allowed'
                  : 'opacity-100 hover:opacity-100'
              }`}
              aria-label='Scroll right'
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Draggable container */}
        <motion.div
          className={`flex gap-6 2xl:gap-8 ${
            isLooping ? 'cursor-wait' : 'cursor-grab active:cursor-grabbing'
          }`}
          drag={isLooping ? false : 'x'}
          dragConstraints={{
            left: calculations.maxDrag,
            right: 0,
          }}
          {...dragSettings}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          style={{ x: dragX }}
          animate={isLooping ? { opacity: [1, 0.8, 1] } : {}}
          transition={isLooping ? { duration: 0.3, repeat: 2 } : {}}
        >
          {speakersData.map((speaker) => (
            <SpeakerCard speaker={speaker} key={speaker.id} />
          ))}
        </motion.div>

        {/* CTA Button */}
        <div className='w-full flex justify-center'>
          <CTAButton
            src='/speakers'
            className='rounded-2xl w-full md:w-auto mt-5'
          >
            <div className='w-60 h-12 px-6 flex items-center justify-center md:justify-center text-lg md:text-xl '>
              View All Speakers
            </div>
          </CTAButton>
        </div>
      </motion.div>
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
      <div className='relative w-80 h-96 overflow-hidden rounded-lg md:rounded-2xl'>
        {speaker.profile_image ? (
          <img
            src={speaker.profile_image.url}
            alt={
              speaker.profile_image.alt ||
              `${speaker.name}-${speaker.designation}`
            }
            className='absolute inset-0 w-full h-full object-cover object-center'
            loading='lazy'
          />
        ) : (
          <div className='absolute inset-0 bg-gray-900 flex items-center justify-center'>
            <span className='text-white text-lg'>No Image</span>
          </div>
        )}

        <div
          className='absolute inset-0 z-10'
          style={{
            background:
              'linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2), transparent)',
          }}
        />
        <div className='absolute bottom-0 left-0 p-2 text-white z-20'>
          <h4 className='text-xl sm:text-xl font-bold mb-1'>{speaker.name}</h4>
          <p className='text-sm text-white/80 leading-tight'>
            {speaker.designation}, {speaker.organization}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SpeakersSection
