import { useState } from 'react'
import bg from '../../../assets/speakersbg.svg?url'
import { useSpeakersData } from '../../../hooks/useApi'
import { motion, useMotionValue } from 'motion/react'
import CTAButton from '../../Elements/CTAButton'
import { animate } from 'motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const SpeakersSection = () => {
  const { data, loading, error, refresh } = useSpeakersData()
  const dragX = useMotionValue(0)
  const [isDragging, setIsDragging] = useState(false)
  const [currentX, setCurrentX] = useState(0)

  if (loading) {
    return 'Loading...'
  }
  if (error) return 'An error has occurred: ' + error.message

  const speakersData = data?.docs || []

  const cardWidth = 280 + 21
  const totalWidth = speakersData.length * cardWidth
  const containerWidth =
    typeof window !== 'undefined' ? window.innerWidth : 1200

  const containerPadding = 250
  const availableWidth = containerWidth - containerPadding

  const maxDrag =
    totalWidth > availableWidth ? -(totalWidth - availableWidth) : 0

  const cardsToMove = 1.1
  const moveDistance = cardWidth * cardsToMove

  const scrollLeft = () => {
    const currentPosition = dragX.get()
    const newX = Math.min(0, currentPosition + moveDistance)

    animate(dragX, newX, {
      type: 'tween',
      ease: [0.25, 0.46, 0.45, 0.94],
      duration: 1.0,
    }).then(() => {
      setCurrentX(newX)
    })
  }

  const scrollRight = () => {
    const currentPosition = dragX.get()
    const newX = Math.max(maxDrag, currentPosition - moveDistance)

    animate(dragX, newX, {
      type: 'tween',
      ease: [0.25, 0.46, 0.45, 0.94],
      duration: 1.0,
    }).then(() => {
      setCurrentX(newX)
    })
  }

  const canScrollLeft = currentX < 0
  const canScrollRight = currentX > maxDrag

  const handleDragEnd = (event, info) => {
    setIsDragging(false)
    const finalX = dragX.get()
    setCurrentX(finalX)
    console.log('Drag ended at:', info.point.x, 'Final X:', finalX)
  }

  const handleDragStart = () => {
    setIsDragging(true)
    setCurrentX(dragX.get())
  }

  return (
    <section className='relative h-auto md:h-screen flex flex-col gap-4 md:gap-6 xl:gap-8 2xl:gap-24 justify-center'>
      <img
        src={bg}
        alt='Background for speakers'
        className='absolute inset-0 object-cover object-center w-full h-full -z-10'
      />

      <h1 className='text-white will-change-transform text-6xl 2xl:text-9xl mix-blend-lighten gradient-text-attend mt-2 md:mt-4 px-4 md:px-14 2xl:px-20'>
        Speakers at TNGSS 2025
      </h1>

      {/*outer vertical flex box for layout*/}
      <motion.div className='flex flex-col gap-8 md:gap-6 2xl:gap-8 px-4 md:px-14 2xl:px-24'>
        {/*arrows*/}
        <div className='w-full hidden md:flex justify-end'>
          <div className='flex gap-4'>
            <button
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              className={`w-6 h-6 flex items-center transition-opacity ${
                !canScrollLeft
                  ? 'opacity-50 cursor-not-allowed'
                  : 'opacity-100 hover:opacity-100'
              }`}
            >
              <ArrowLeft size={16} />
            </button>

            <button
              onClick={scrollRight}
              disabled={!canScrollRight}
              className={`w-6 h-6 flex items-center transition-opacity ${
                !canScrollRight
                  ? 'opacity-50 cursor-not-allowed'
                  : 'opacity-100 hover:opacity-100'
              }`}
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <motion.div
          className='flex gap-6 2xl:gap-8 cursor-grab active:cursor-grabbing'
          drag='x'
          dragConstraints={{
            left: maxDrag,
            right: 0,
          }}
          dragElastic={0.1}
          dragMomentum={true}
          dragTransition={{ power: 0.1, timeConstant: 200 }}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          style={{ x: dragX }}
        >
          {speakersData.map((speaker) => (
            <SpeakerCard speaker={speaker} key={speaker.id} />
          ))}
        </motion.div>

        {/*cta*/}
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
            alt={`${speaker.name}-${speaker.designation}`}
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
