import { useMemo, useState } from 'react'
import FilterButton from '../../Elements/FilterButton'
import { Calendar } from 'lucide-react'
import SpeakerEventCard from '../../Elements/SpeakerEventCard'
import {
  useEventsByIds,
  useSpeakerBySlugEff,
  useSpeakerEvents,
} from '../../../hooks/useQueryApi'
import { motion, AnimatePresence } from 'motion/react'
import {
  gentleSpring,
  smoothSpring,
  snappySpring,
  springConfig,
} from '../../../motion/Springs'

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: smoothSpring,
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
      mass: 0.5,
    },
  },
}

const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const cardVariant = {
  initial: { opacity: 0, y: 30, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: smoothSpring,
  },
  exit: {
    opacity: 0,
    y: 0,
    scale: 0.95,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 30,
      mass: 0.5,
    },
  },
}

const filterButtonVariant = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: springConfig,
  },
}

const SpeakerEventsListing = ({ speaker }) => {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const {
    data: speakerData,
    isLoading,
    error,
  } = useSpeakerBySlugEff(speaker?.slug)

  const events = speakerData?.events || []

  const filteredEvents = useMemo(() => {
    if (selectedFilter === 'all') return events
    return events.filter((event) => event.main_or_partner === selectedFilter)
  }, [events, selectedFilter])

  const eventCounts = useMemo(() => {
    return {
      all: events.length,
      main_event: events.filter(
        (event) => event.main_or_partner === 'main_event'
      ).length,
      partner_event: events.filter(
        (event) => event.main_or_partner === 'partner_event'
      ).length,
    }
  }, [events])

  const handleFilterChange = (newFilter) => {
    setSelectedFilter(newFilter)
  }

  if (isLoading) {
    return (
      <section className='bg-black px-4 md:px-28 2xl:px-36 py-8 md:py-14 2xl:py-24 w-full h-full flex flex-col gap-4 md:gap-16 flex md:justify-end'>
        <div className='w-full md:w-8/12 mx-auto'>
          <motion.div
            className='flex items-center justify-center py-16'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={springConfig}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className='w-8 h-8 border-2 border-[#18BFDB] border-t-transparent rounded-full'
            />
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <motion.section
      className='bg-black px-4 md:px-28 2xl:px-36 py-8 md:py-14 2xl:py-24 w-full h-full flex flex-col gap-4 md:gap-16 flex md:justify-end'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={gentleSpring}
    >
      <motion.div
        className='w-full md:w-8/12 mx-auto'
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={smoothSpring}
      >
        {/* Filter Buttons */}
        <motion.div
          className='flex flex-wrap gap-3 mb-4 md:mb-8 justify-center'
          variants={staggerContainer}
          initial='initial'
          animate='animate'
        >
          <motion.div variants={filterButtonVariant}>
            <FilterButton
              value='all'
              label='All Events'
              count={eventCounts.all}
              isActive={selectedFilter === 'all'}
              onClick={() => handleFilterChange('all')}
            />
          </motion.div>

          <motion.div variants={filterButtonVariant}>
            <FilterButton
              value='main_event'
              label='Main Events'
              count={eventCounts.main_event}
              isActive={selectedFilter === 'main_event'}
              onClick={() => handleFilterChange('main_event')}
            />
          </motion.div>

          <motion.div variants={filterButtonVariant}>
            <FilterButton
              value='partner_event'
              label='Partner Events'
              count={eventCounts.partner_event}
              isActive={selectedFilter === 'partner_event'}
              onClick={() => handleFilterChange('partner_event')}
            />
          </motion.div>
        </motion.div>

        {/* Event Cards */}
        <AnimatePresence mode='wait'>
          {filteredEvents.length > 0 ? (
            <motion.div
              key={`events-${selectedFilter}`}
              className='grid grid-cols-1 gap-6 md:gap-12'
              variants={staggerContainer}
              initial='initial'
              animate='animate'
              exit='exit'
            >
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  variants={cardVariant}
                  layout
                  layoutId={`event-${event.id}`}
                  whileTap={{
                    scale: 0.99,
                    transition: snappySpring,
                  }}
                  style={{ willChange: 'transform' }}
                >
                  <SpeakerEventCard event={event} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={`empty-${selectedFilter}`}
              className='text-center py-16'
              {...fadeInUp}
            >
              <motion.div
                className='bg-gray-900/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'
                initial={{ scale: 0, rotate: -180 }}
                animate={{
                  scale: 1,
                  rotate: 0,
                  transition: {
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                    mass: 0.8,
                  },
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 10,
                  transition: snappySpring,
                }}
              >
                <Calendar size={24} className='text-gray-500' />
              </motion.div>

              <motion.h3
                className='text-gray-300 text-lg font-medium mb-2'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springConfig, delay: 0.1 }}
              >
                No events found
              </motion.h3>

              <motion.p
                className='text-gray-500'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springConfig, delay: 0.2 }}
              >
                No events match the selected filter criteria.
              </motion.p>

              {/* Animated suggestion */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springConfig, delay: 0.3 }}
                className='mt-6'
              >
                <motion.button
                  onClick={() => handleFilterChange('all')}
                  className='text-[#18BFDB] hover:text-white transition-colors'
                  whileHover={{
                    scale: 1.05,
                    transition: snappySpring,
                  }}
                  whileTap={{
                    scale: 0.95,
                    transition: snappySpring,
                  }}
                >
                  {selectedFilter !== 'all'
                    ? 'View all events'
                    : 'Check back later'}
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  )
}

export default SpeakerEventsListing
