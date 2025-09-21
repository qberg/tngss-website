import { motion } from 'motion/react'
import bg from '../../../assets/globalPavBg.svg?url'
import { useGlobalPavilionData } from '../../../hooks/useQueryApi'

const FlagMarquee = ({ flags = [] }) => {
  if (!flags || flags.length === 0) {
    return null
  }

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
        {extendedFlags.map((flagData, index) => (
          <motion.div
            key={`${flagData.id}-${Math.floor(index / flags.length)}-${
              index % flags.length
            }`}
            className='flex-shrink-0 flex flex-col items-center gap-3'
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
              src={flagData.flag?.url}
              alt={flagData.flag?.alt || `${flagData.country} flag`}
              className='w-48 h-36 md:w-40 md:h-28 xl:w-40 xl:h-28 2xl:w-60 2xl:h-36 object-cover rounded-lg shadow-xl'
              style={{
                imageRendering: 'crisp-edges',
                backfaceVisibility: 'hidden',
              }}
              loading='lazy'
            />
            <span className='text-white text-center text-sm md:text-base xl:text-lg 2xl:text-2xl font-medium px-2'>
              {flagData.country}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

const GlobalPavilion = () => {
  const { data: pavilionData, isLoading, error } = useGlobalPavilionData()

  if (isLoading) {
    return (
      <section className='relative h-full w-full flex items-center justify-center py-4'>
        <img
          alt=''
          src={bg}
          className='absolute inset-0 object-cover object-center w-full h-full -z-10'
        />
        <div className='text-white text-2xl'>Loading...</div>
      </section>
    )
  }

  if (error) {
    return (
      <section className='relative h-full w-full flex items-center justify-center py-4'>
        <img
          alt=''
          src={bg}
          className='absolute inset-0 object-cover object-center w-full h-full -z-10'
        />
        <div className='text-red-500 text-2xl'>
          Failed to load pavilion data
        </div>
      </section>
    )
  }

  const content = {
    title: pavilionData?.title || 'Global Pavilion',
    description:
      pavilionData?.description ||
      'Step into a world of opportunities at the Global Pavilion...',
  }

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
        className='w-full mt-16 md:mt-8 2xl:mt-32'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <FlagMarquee flags={pavilionData?.flags || []} />
      </motion.div>
    </section>
  )
}

export default GlobalPavilion
