import { ArrowLeft, ExternalLink, MapPin } from 'lucide-react'
import SpeakerCard from '../../Elements/SpeakerCard'
import Badge from '../../Elements/Badge'

import { motion } from 'motion/react'
import { springConfig } from '../../../motion/Springs'

const SpeakerDetailHero = ({ speaker }) => {
  const hasLocation = speaker?.location
  const hasLinkedIn = speaker?.linkedin_url
  return (
    <section className='relative h-screen bg-black overflow-hidden'>
      <div
        className='w-full h-full p-1'
        style={{
          background:
            'linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(170, 170, 170, 1) 50%, rgba(0, 0, 0, 1) 100%)',
        }}
      >
        <div className='bg-black px-4 md:px-28 2xl:px-36 py-8 md:py-14 2xl:py-24 w-full h-full flex flex-col gap-4 md:gap-16'>
          {/* back button*/}
          <a
            href='/speakers'
            className='w-full flex justify-start items-center gap-4 mb-2'
          >
            <ArrowLeft size={24} />
            <p className='text-4xl md:text-6xl uppercase'>
              {speaker?.speaker_type?.name}
            </p>
          </a>

          {/*speaker info*/}
          <div className='w-full flex flex-col md:flex-row gap-4 md:gap-16'>
            {/*image*/}
            <div className='w-full md:w-4/12'>
              <div className='aspect-w-9 aspect-h-10'>
                <SpeakerCard speaker={speaker} showName={false} />
              </div>
            </div>

            {/*content*/}
            <div className='w-full md:w-8/12 flex flex-col gap-4'>
              {/*Tags*/}
              {speaker?.tags && speaker?.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...springConfig, delay: 0.6 }}
                  className='flex flex-row gap-2'
                >
                  {speaker.tags.map((tag, index) => {
                    const tagName = typeof tag === 'object' ? tag.name : tag

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          ...springConfig,
                          delay: 0.7 + index * 0.05,
                        }}
                        style={{ willChange: 'transform' }}
                      >
                        <Badge variant='primary' size='md'>
                          {tagName}
                        </Badge>
                      </motion.div>
                    )
                  })}
                </motion.div>
              )}

              {/*Personal Info*/}
              <div className=''>
                {speaker?.name && (
                  <h2 className='text-white text-4xl md:text-6xl font-semibold font-urbanist gradient-text-black leading-tight md:leading-normal'>
                    {speaker.name}
                  </h2>
                )}

                {speaker?.designation && speaker?.organization && (
                  <h3 className='text-white text-xl md:text-3xl font-semibold font-urbanist gradient-text-black'>
                    {speaker.designation}
                  </h3>
                )}

                {speaker?.organization && (
                  <h3 className='text-white text-xl md:text-3xl font-semibold font-urbanist gradient-text-black mb-2'>
                    {speaker.organization}
                  </h3>
                )}

                {(hasLocation || hasLinkedIn) && (
                  <div className='flex flex-row gap-8'>
                    {hasLocation && (
                      <div className='flex items-center gap-1'>
                        <MapPin size={14} className='text-[#18BFDB]' />
                        <span className='text-lg'>
                          {speaker.location.city}, {speaker.location.country}
                        </span>
                      </div>
                    )}

                    {hasLinkedIn && (
                      <a className='flex items-center gap-1'>
                        <span className='text-lg'>LinkedIn</span>
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/*Bio*/}

              {/* Education */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SpeakerDetailHero
