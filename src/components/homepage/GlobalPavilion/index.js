import { motion } from 'framer-motion'
import bg from '../../../assets/globalPavBg.svg?url'
import austriaFlag from '../../../assets/flags/austria.png'
import belgiumFlag from '../../../assets/flags/belgium.png'
import denmarkFlag from '../../../assets/flags/denmark.png'
import franceFlag from '../../../assets/flags/france.png'
import japanFlag from '../../../assets/flags/japan.png'
import malayasiaFlag from '../../../assets/flags/malayasia.png'
import netherlandsFlag from '../../../assets/flags/netherlands.png'
import saudiArabiaFlag from '../../../assets/flags/saudi-arabia.png'
import southKoreaFlag from '../../../assets/flags/south-korea.png'
import uaeFlag from '../../../assets/flags/uae.png'
import germanyFlag from '../../../assets/flags/germany.png'
import singaporeFlag from '../../../assets/flags/singapore.png'
import srilankaFlag from '../../../assets/flags/srilanka.png'

const flags = [
  { id: 1, country: 'Austria', flag: austriaFlag, alt: 'Austria flag' },
  { id: 2, country: 'Belgium', flag: belgiumFlag, alt: 'Belgium flag' },
  {
    id: 3,
    country: 'Denmark',
    flag: denmarkFlag,
    alt: 'Denmark flag',
  },
  { id: 4, country: 'France', flag: franceFlag, alt: 'France flag' },
  { id: 5, country: 'Japan', flag: japanFlag, alt: 'Japan Flag' },
  { id: 7, country: 'Malayasia', flag: malayasiaFlag, alt: 'Malayasia flag' },
  {
    id: 8,
    country: 'Netherland',
    flag: netherlandsFlag,
    alt: 'Netherland flag',
  },
  {
    id: 9,
    country: 'Saudi Arabia',
    flag: saudiArabiaFlag,
    alt: 'Saudi Arabia flag',
  },
  { id: 10, country: 'UAE', flag: uaeFlag, alt: 'UAE flag' },
  {
    id: 11,
    country: 'southKoreaFlag',
    flag: southKoreaFlag,
    alt: 'South Korea Flag',
  },
  { id: 12, country: 'Germany Flag', flag: germanyFlag, alt: 'Germany Flag' },
  { id: 13, country: 'Singapore', flag: singaporeFlag, alt: 'singapore Flag' },
  { id: 14, country: 'Srilanka', flag: srilankaFlag, alt: 'Srilanka Flag' },
]

const content = {
  title: 'Global Pavilion',
  description:
    'Step into a world of opportunities at the Global Pavilion, where leading startup ecosystems, international accelerators, innovative startups, and global innovation hubs come together under one roof. The pavilion will showcase cutting-edge technologies, cross-border collaborations, and world-class startup success stories from across continents.',
}

const FlagMarquee = () => {
  const extendedFlags = [...flags, ...flags, ...flags]

  return (
    <div className='overflow-hidden w-full pb-12 md:pb-0'>
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
              className='w-48 h-36 md:w-40 md:h-28 xl:w-40 xl:h-28 2xl:w-96 2xl:h-64 object-cover rounded-lg shadow-xl'
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
        className='text-white will-change-transform text-6xl md:text-9xl 2xl:text-13xl mix-blend-lighten gradient-text-black mt-10 px-4'
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
        className='w-full sm:w-8/12 2xl:w-8/12 text-lg md:text-2xl text-white text-justify px-4 leading-tight mt-10 md:mt-0'
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
        className='w-full mt-16 md:mt-8'
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
