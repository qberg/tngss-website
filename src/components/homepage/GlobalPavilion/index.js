import { motion } from 'framer-motion'
import bg from '../../../assets/globalPavBg.svg?url'
import usFlag from '../../../assets/flags/usa.svg?url'
import ukFlag from '../../../assets/flags/uk.svg?url'
import indiaFlag from '../../../assets/flags/india.svg?url'

const flags = [
  { id: 1, country: 'United States', flag: usFlag, alt: 'United States flag' },
  { id: 2, country: 'Canada', flag: ukFlag, alt: 'Canada flag' },
  {
    id: 3,
    country: 'United Kingdom',
    flag: usFlag,
    alt: 'United Kingdom flag',
  },
  { id: 4, country: 'Germany', flag: indiaFlag, alt: 'Germany flag' },
  { id: 5, country: 'France', flag: usFlag, alt: 'France flag' },
  { id: 6, country: 'Japan', flag: ukFlag, alt: 'Japan flag' },
  { id: 7, country: 'South Korea', flag: indiaFlag, alt: 'South Korea flag' },
  { id: 8, country: 'China', flag: usFlag, alt: 'China flag' },
  { id: 9, country: 'India', flag: indiaFlag, alt: 'India flag' },
  { id: 10, country: 'Australia', flag: ukFlag, alt: 'Australia flag' },
  { id: 11, country: 'Brazil', flag: usFlag, alt: 'Brazil flag' },
  { id: 12, country: 'Mexico', flag: ukFlag, alt: 'Mexico flag' },
  { id: 13, country: 'Italy', flag: indiaFlag, alt: 'Italy flag' },
  { id: 14, country: 'Spain', flag: usFlag, alt: 'Spain flag' },
  { id: 15, country: 'Netherlands', flag: ukFlag, alt: 'Netherlands flag' },
]

const content = {
  title: 'Global Pavilion',
  description:
    'A vibrant showcase of startups, scale-ups, and ecosystem leaders from across continents. Explore groundbreaking products, discover emerging market trends, and connect with global innovators shaping the future. Whether youre seeking partnerships, investment opportunities, or fresh ideas, the Global Pavilion is your gateway to international collaboration and cross-border growth.',
}

const FlagMarquee = () => {
  const extendedFlags = [...flags, ...flags, ...flags]

  return (
    <div className='overflow-hidden w-full'>
      <motion.div
        className='flex gap-12 items-center will-change-transform'
        animate={{
          x: ['0%', '-33.333%'],
        }}
        transition={{
          duration: 45,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        }}
        style={{
          width: 'max-content',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          perspective: 1000,
        }}
      >
        {extendedFlags.map((flag, index) => (
          <motion.div
            key={`${flag.id}-${Math.floor(index / flags.length)}-${
              index % flags.length
            }`}
            className='flex-shrink-0'
            style={{
              transform: 'translateZ(0)',
              willChange: 'transform',
            }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
            }}
          >
            <img
              src={flag.flag}
              alt={flag.alt}
              className='w-40 h-28 md:w-40 md:h-28 xl:w-40 xl:h-28 2xl:w-96 2xl:h-64 object-cover rounded-lg shadow-xl'
              style={{
                imageRendering: 'crisp-edges',
                backfaceVisibility: 'hidden',
              }}
              loading='lazy'
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

const GlobalPavilion = ({ shouldAnimate = false }) => {
  return (
    <section className='relative h-full w-full flex flex-col gap-4 md:gap-6 xl:gap-8 2xl:gap-24 items-center justify-center py-4'>
      <img
        alt=''
        src={bg}
        className='absolute inset-0 object-cover object-center w-full h-full -z-10'
      />
      <motion.h1
        className='text-white will-change-transform text-6xl md:text-9xl 2xl:text-13xl mix-blend-lighten gradient-text-attend mt-10 px-4'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {content.title}
      </motion.h1>

      <motion.p
        className='w-full sm:w-6/12 text-2xl text-white text-left px-4'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {content.description}
      </motion.p>

      <motion.div
        className='w-full mt-8'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <FlagMarquee />
      </motion.div>
    </section>
  )
}

export default GlobalPavilion
