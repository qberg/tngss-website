import { motion } from 'motion/react'
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
  const duplicatedFlags = [...flags, ...flags] // Duplicate for seamless loop

  return (
    <div className='overflow-hidden whitespace-nowrap w-full'>
      <motion.div
        className='flex gap-12 items-center'
        animate={{
          x: ['0%', '-50%'],
        }}
        transition={{
          duration: 30,
          ease: 'linear',
          repeat: Infinity,
        }}
        style={{ width: 'max-content' }}
      >
        {duplicatedFlags.map((flag, index) => (
          <div key={`${flag.id}-${index}`} className='flex-shrink-0'>
            <img
              src={flag.flag}
              alt={flag.alt}
              className='w-24 h-16 md:w-32 md:h-20 xl:w-40 xl:h-28 2xl:w-96 2xl:h-64 object-cover rounded-lg shadow-xl'
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

const GlobalPavilion = ({ shouldAnimate = false }) => {
  return (
    <section className='relative h-full w-full flex flex-col gap-4 md:gap-6 xl:gap-8 2xl:gap-24 items-center justify-center'>
      <img
        alt=''
        src={bg}
        className='absolute inset-0 object-cover object-center w-full h-full -z-10'
      />
      <h1 className='text-white will-change-transform text-6xl md:text-9xl 2xl:text-13xl mix-blend-lighten gradient-text-attend mt-10'>
        {content.title}
      </h1>
      <p className='w-6/12 text-2xl text-white text-center'>
        {content.description}
      </p>

      {/* Single row infinite marquee scroll of flags */}
      <div className='w-full mt-8'>
        <FlagMarquee />
      </div>
    </section>
  )
}

export default GlobalPavilion
