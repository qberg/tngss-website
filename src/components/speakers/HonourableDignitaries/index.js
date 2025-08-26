import { useGovtDignitaries } from '../../../hooks/useQueryApi'
import SpeakerCard from '../../Elements/SpeakerCard'
import { motion } from 'motion/react'

const scaleOnHover = {
  hover: {
    y: -12,
    scale: 1.02,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 30,
      mass: 0.5,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      type: 'spring',
      stiffness: 600,
      damping: 25,
      mass: 0.4,
    },
  },
}

const HonourableDignitaries = () => {
  const { data: dignitariesData, isLoading, error } = useGovtDignitaries()

  const dignitaries = dignitariesData?.docs || []

  if (dignitaries.length === 0) {
    return null
  }

  return (
    <section className='relative overflow-hidden'>
      <div
        className='w-full h-full pb-0.5'
        style={{
          background:
            'linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(170, 170, 170, 1) 50%, rgba(0, 0, 0, 1) 100%)',
        }}
      >
        <div className='h-auto bg-black px-4 md:px-24 2xl:px-44 py-8 md:py-14 2xl:py-24'>
          <h2 className='uppercase text-3xl md:text-6xl text-white font-medium gradient-text-black mb-4 md:mb-7 2xl:mb-12'>
            Honourable Dignitaries
          </h2>

          <div className='grid grid-cols-2 md:grid-cols-3 gap-2 gap-y-4 md:gap-16 2xl:gap-24'>
            {dignitaries.map((speaker) => (
              <motion.a
                key={speaker.id}
                href={`/speakers/${speaker.slug}`}
                whileHover={scaleOnHover.hover}
                whileTap={scaleOnHover.tap}
                className='w-full aspect-w-9 aspect-h-11'
              >
                <SpeakerCard speaker={speaker} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HonourableDignitaries
