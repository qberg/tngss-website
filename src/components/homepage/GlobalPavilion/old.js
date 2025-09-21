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
  title: 'The World Of Innovation',
  description:
    'A vibrant showcase of startups, scale-ups, and ecosystem leaders from across continents. Explore groundbreaking products, discover emerging market trends, and connect with global innovators shaping the future. Whether youre seeking partnerships, investment opportunities, or fresh ideas, the Global Pavilion is your gateway to international collaboration and cross-border growth.',
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const flagVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const GlobalPavilion = ({ shouldAnimate = false }) => {
  return (
    <section className='relative h-full w-full flex flex-col gap-4 md:gap-6 xl:gap-8 2xl:gap-24 items-center justify-center'>
      <img
        alt=''
        src={bg}
        className='absolute inset-0 object-cover object-center w-full h-full -z-10'
      />
      <h1 className='text-white will-change-transform text-6xl md:text-9xl mix-blend-lighten gradient-text-attend mt-10'>
        Global Pavilion
      </h1>
      <div className='w-full flex flex-col md:flex-row md:justify-center gap-4 md:gap-6 xl:gap-8 2xl:gap-16 px-4 md:px-20 2xl:px-32'>
        {/*flags*/}
        <div className='flex-2 order-2 md:order-1'>
          <motion.div
            className='grid grid-cols-3 sm:grid-cols-4 2xl:grid-cols-5 gap-4 2xl:gap-x-8 2xl:gap-y-12'
            variants={containerVariants}
            initial='hidden'
            animate={shouldAnimate ? 'visible' : 'hidden'}
          >
            {flags.map((flagData) => (
              <motion.div
                key={flagData.id}
                className='p-1 2xl:p-2 md:rounded-xl 2xl:rounded-2xl overflow-hidden'
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.4)',
                  willChange: 'transform',
                }}
                variants={flagVariants}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              >
                <div className='group relative aspect-flag md:rounded-xl 2xl:rounded-2xl overflow-hidden'>
                  <img
                    src={flagData.flag}
                    alt={flagData.alt}
                    className='w-full h-full object-cover object-center'
                    loading='lazy'
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        {/*content*/}
        <motion.div
          className='flex-1 order-1 md:order-2 flex flex-col items-start justify-center gap-2 md:gap-4'
          initial={{ opacity: 0, x: -30 }}
          animate={
            shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
          }
          style={{ willChange: 'transform' }}
        >
          <h3 className='text-6xl text-left'>{content.title}</h3>
          <p className='text-lg leading-relaxed'>{content.description}</p>
        </motion.div>
      </div>
    </section>
  )
}

export default GlobalPavilion
