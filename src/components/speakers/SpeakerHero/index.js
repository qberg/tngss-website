import { ArrowLeft, ExternalLink, MapPin } from 'lucide-react'
import SpeakerCard from '../../Elements/SpeakerCard'
import Badge from '../../Elements/Badge'
import { FaLinkedin } from 'react-icons/fa'
import { motion } from 'motion/react'
import {
  gentleSpring,
  smoothSpring,
  snappySpring,
  springConfig,
} from '../../../motion/Springs'

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: smoothSpring,
  },
}

const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: smoothSpring,
  },
}

const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: smoothSpring,
  },
}

const SpeakerDetailHero = ({ speaker }) => {
  const hasLocation = speaker?.location
  const hasLinkedIn = speaker?.linkedin_url

  return (
    <motion.section
      className='relative min-h-screen bg-black overflow-hidden'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className='w-full h-full p-1'
        style={{
          background:
            'linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(170, 170, 170, 1) 50%, rgba(0, 0, 0, 1) 100%)',
        }}
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        transition={gentleSpring}
      >
        <div className='bg-black px-4 md:px-28 2xl:px-36 py-8 md:py-14 2xl:py-24 w-full h-full flex flex-col gap-4 md:gap-16'>
          {/* Back button */}
          <motion.a
            href='/speakers'
            className='w-fit flex justify-start items-center gap-4 mb-2 group'
            whileHover='hover'
            whileTap={{
              scale: 0.98,
              transition: snappySpring,
            }}
          >
            <motion.div
              variants={{
                hover: {
                  x: [-2.5, 2.5, -2.5],
                  transition: {
                    duration: 1.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                },
              }}
              className='text-white group-hover:text-[#18BFDB] transition-colors'
            >
              <ArrowLeft size={24} />
            </motion.div>
            <motion.p
              className='text-4xl md:text-6xl uppercase text-white group-hover:text-[#18BFDB] transition-colors'
              whileHover={{
                scale: 1.02,
                transition: snappySpring,
              }}
            >
              {speaker?.speaker_type?.name}
            </motion.p>
          </motion.a>

          {/* Speaker info */}
          <motion.div
            className='w-full flex flex-col md:flex-row gap-4 md:gap-16'
            variants={staggerContainer}
            initial='initial'
            animate='animate'
          >
            {/* Image */}
            <motion.div className='w-full md:w-4/12' variants={fadeInLeft}>
              <div className='aspect-w-9 aspect-h-10'>
                <SpeakerCard speaker={speaker} showName={false} />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              className='w-full md:w-8/12 flex flex-col gap-4'
              variants={fadeInRight}
            >
              {/* Tags */}
              {speaker?.tags && speaker?.tags.length > 0 && (
                <motion.div
                  className='flex flex-row gap-2'
                  variants={staggerContainer}
                  initial='initial'
                  animate='animate'
                >
                  {speaker.tags.map((tag, index) => {
                    const tagName = typeof tag === 'object' ? tag.name : tag
                    const colors = ['primary']
                    const variant = colors[index % colors.length]

                    return (
                      <motion.div
                        key={index}
                        variants={{
                          initial: { opacity: 0, scale: 0.8, y: 20 },
                          animate: {
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            transition: {
                              ...springConfig,
                              delay: index * 0.05,
                            },
                          },
                        }}
                        whileHover={{
                          scale: 1.05,
                          y: -2,
                          transition: snappySpring,
                        }}
                        style={{ willChange: 'transform' }}
                      >
                        <Badge variant={variant} size='md'>
                          {tagName}
                        </Badge>
                      </motion.div>
                    )
                  })}
                </motion.div>
              )}

              {/* Personal Info */}
              <motion.div className='' variants={fadeInUp}>
                {speaker?.name && (
                  <motion.h2
                    className='text-white text-4xl md:text-6xl font-semibold font-urbanist gradient-text-black leading-tight md:leading-snug 2xl:leading-normal'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...springConfig, delay: 0.3 }}
                  >
                    {speaker.name}
                  </motion.h2>
                )}

                {speaker?.designation && speaker?.organization && (
                  <motion.h3
                    className='text-white text-xl md:text-3xl font-semibold font-urbanist gradient-text-black'
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...springConfig, delay: 0.4 }}
                  >
                    {speaker.designation}
                  </motion.h3>
                )}

                {speaker?.organization && (
                  <motion.h3
                    className='text-white text-xl md:text-3xl font-semibold font-urbanist gradient-text-black mb-2'
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...springConfig, delay: 0.5 }}
                  >
                    {speaker.organization}
                  </motion.h3>
                )}

                {(hasLocation || hasLinkedIn) && (
                  <motion.div
                    className='flex flex-row gap-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...springConfig, delay: 0.6 }}
                  >
                    {hasLocation && (
                      <motion.div
                        className='flex items-center gap-1'
                        whileHover={{
                          scale: 1.05,
                          transition: snappySpring,
                        }}
                      >
                        <motion.div
                          whileHover={{
                            scale: 1.2,
                            rotate: 10,
                            transition: snappySpring,
                          }}
                        >
                          <MapPin size={14} className='highlight-text' />
                        </motion.div>
                        <span className='text-lg'>
                          {speaker.location.city}, {speaker.location.country}
                        </span>
                      </motion.div>
                    )}

                    {hasLinkedIn && (
                      <motion.a
                        className='flex items-center gap-2 group'
                        href={speaker.linkedin_url}
                        target='_blank'
                        rel='noopener noreferrer'
                        whileHover={{
                          scale: 1.05,
                          transition: snappySpring,
                        }}
                        whileTap={{
                          scale: 0.95,
                          transition: snappySpring,
                        }}
                      >
                        <span className='text-lg group-hover:text-[#18BFDB] transition-colors'>
                          LinkedIn
                        </span>
                        <motion.div
                          whileHover={{
                            scale: 1.1,
                            rotate: 5,
                            transition: snappySpring,
                          }}
                        >
                          <ExternalLink size={14} />
                        </motion.div>
                        <motion.div
                          whileHover={{
                            scale: 1.2,
                            rotate: -5,
                            transition: snappySpring,
                          }}
                        >
                          <FaLinkedin size={18} className='highlight-text' />
                        </motion.div>
                      </motion.a>
                    )}
                  </motion.div>
                )}
              </motion.div>

              {/* Bio */}
              {speaker?.summary && (
                <motion.p
                  className='text-lg text-xl 2xl:text-2xl text-justify'
                  variants={fadeInUp}
                  initial='initial'
                  animate='animate'
                  transition={{ delay: 0.7 }}
                >
                  {speaker.summary}
                </motion.p>
              )}

              {/* Experience */}
              {speaker?.experience?.length > 0 && (
                <motion.div
                  className=''
                  variants={fadeInUp}
                  initial='initial'
                  animate='animate'
                  transition={{ delay: 0.8 }}
                >
                  <motion.h4 className='text-lg highlight-text font-medium mb-1'>
                    Experience
                  </motion.h4>
                  <motion.div
                    className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8'
                    variants={staggerContainer}
                    initial='initial'
                    animate='animate'
                  >
                    {speaker.experience.map((item, index) => (
                      <motion.div
                        key={index}
                        variants={{
                          initial: { opacity: 0, y: 20 },
                          animate: {
                            opacity: 1,
                            y: 0,
                            transition: {
                              ...springConfig,
                              delay: 0.9 + index * 0.1,
                            },
                          },
                        }}
                      >
                        <BioCard
                          title={item.company}
                          location={item.area}
                          description={item.designation}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {/* Education */}
              {speaker?.alma_matter && speaker?.alma_matter.length > 0 && (
                <motion.div
                  variants={fadeInUp}
                  initial='initial'
                  animate='animate'
                  transition={{ delay: 1.0 }}
                >
                  <motion.h4 className='text-lg highlight-text font-medium mb-1'>
                    Education
                  </motion.h4>
                  <motion.div
                    className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8'
                    variants={staggerContainer}
                    initial='initial'
                    animate='animate'
                  >
                    {speaker.alma_matter.map((item, index) => (
                      <motion.div
                        key={index}
                        variants={{
                          initial: { opacity: 0, y: 20 },
                          animate: {
                            opacity: 1,
                            y: 0,
                            transition: {
                              ...springConfig,
                              delay: 1.1 + index * 0.1,
                            },
                          },
                        }}
                      >
                        <BioCard
                          title={item.college}
                          location={item.city}
                          description={item.degree}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  )
}

const BioCard = ({ title, location, description }) => {
  return (
    <motion.article className='flex flex-col gap-1 font-montserrat'>
      {title && (
        <motion.h4
          className='font-semibold text-lg text-white'
          whileHover={{
            color: '#18BFDB',
            transition: smoothSpring,
          }}
        >
          {title}
        </motion.h4>
      )}
      {location && (
        <motion.p
          className='font-normal'
          initial={{ opacity: 0.7 }}
          whileHover={{
            opacity: 1,
            transition: smoothSpring,
          }}
        >
          {location}
        </motion.p>
      )}
      {description && (
        <motion.p
          className='pl-1.5 border-l-2 border-white font-normal'
          whileHover={{
            borderColor: '#18BFDB',
            paddingLeft: '8px',
            transition: smoothSpring,
          }}
        >
          {description}
        </motion.p>
      )}
    </motion.article>
  )
}

export default SpeakerDetailHero
