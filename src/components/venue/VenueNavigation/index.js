import { useState } from 'react'
import { useHallsData } from '../../../hooks/useQueryApi'
import { motion, AnimatePresence } from 'motion/react'
import { MapPin, Users, Ruler, Calendar, ChevronDown } from 'lucide-react'
import Badge from '../../Elements/Badge'
import useMeasure from 'react-use-measure'
import {
  smoothSpring,
  snappySpring,
  springConfig,
} from '../../../motion/Springs'

const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
    },
  },
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: smoothSpring,
  },
}

const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: smoothSpring,
  },
}

const fadeInRight = {
  initial: { opacity: 0, x: 20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: smoothSpring,
  },
}

const fadeIn = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: springConfig,
  },
}

const VenueNavigation = () => {
  const { data: hallsData, isLoading, error } = useHallsData()
  const [selectedHall, setSelectedHall] = useState(null)
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false)

  const halls = hallsData?.docs || []

  // Set first hall as default when data loads
  const activeHall = selectedHall || halls[0]
  const zones = activeHall?.zones?.docs || []

  const handleHallSelect = (hall) => {
    setSelectedHall(hall)
    setIsMobileDropdownOpen(false) // Close dropdown when selecting
  }

  const handleMobileDropdownToggle = () => {
    setIsMobileDropdownOpen(!isMobileDropdownOpen)
  }

  if (isLoading) {
    return (
      <section className='h-auto bg-black px-4 md:px-28 2xl:px-44 py-4 md:py-14 2xl:py-24'>
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
      </section>
    )
  }

  if (error || !halls.length) {
    return (
      <section className='h-auto bg-black px-4 md:px-28 2xl:px-44 py-4 md:py-14 2xl:py-24'>
        <motion.div
          className='text-center py-16'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springConfig}
        >
          <p className='text-red-400 text-lg'>Failed to load venue data</p>
        </motion.div>
      </section>
    )
  }

  return (
    <motion.section
      className='h-auto bg-black px-4 md:px-28 2xl:px-44 py-4 md:py-14 2xl:py-24'
      variants={staggerContainer}
      initial='initial'
      animate='animate'
    >
      <motion.h2
        className='uppercase text-3xl md:text-6xl text-white font-medium mb-4 md:mb-14 2xl:mb-24'
        variants={fadeInUp}
      >
        Venue Navigation
      </motion.h2>

      {/* Mobile Hall Dropdown */}
      <motion.div className='block md:hidden mb-8' variants={fadeInUp}>
        <MobileHallDropdown
          halls={halls}
          activeHall={activeHall}
          isOpen={isMobileDropdownOpen}
          onToggle={handleMobileDropdownToggle}
          onSelect={handleHallSelect}
        />
      </motion.div>

      {/* Layouts */}
      <div className='flex flex-col md:flex-row gap-4 md:gap-10 2xl:gap-20 md:justify-between'>
        {/* Halls list tabs */}
        <motion.div className='hidden md:block md:w-3/12' variants={fadeInLeft}>
          <div className='rounded-2xl border-2 border-white/20 bg-white/5 backdrop-blur-sm p-4'>
            <motion.h3 className='text-white text-xl font-semibold mb-4 flex items-center gap-2'>
              <MapPin size={20} className='text-[#18BFDB]' />
              Select Hall
            </motion.h3>

            <motion.div
              className='space-y-1.5'
              variants={staggerContainer}
              initial='initial'
              animate='animate'
            >
              {halls.map((hall, index) => (
                <HallTabButton
                  key={hall.id}
                  hall={hall}
                  isActive={activeHall?.id === hall.id}
                  onClick={() => handleHallSelect(hall)}
                  index={index}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Layout image with legend */}
        <motion.div
          className='w-full md:w-8/12 overflow-hidden p-1 rounded-2xl'
          style={{
            background: 'linear-gradient(150deg, #007fcf, #f56b0d)',
          }}
          variants={fadeInRight}
        >
          <div className='bg-black w-full h-full rounded-2xl flex flex-col md:flex-row p-4 2xl:px-10 2xl:pl-16 gap-8 2xl:gap-10'>
            {/* Image */}
            <motion.div
              className='w-full md:w-7/12 min-h-[400px] md:h-[500px] 2xl:h-[700px] rounded-xl overflow-hidden bg-gray-900/50'
              variants={fadeIn}
            >
              <AnimatePresence mode='wait'>
                {activeHall?.image?.url ? (
                  <motion.img
                    key={activeHall.id}
                    src={activeHall.image.url}
                    alt={activeHall.name}
                    className='w-full h-full object-contain'
                    initial={{ opacity: 0, y: 50 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: smoothSpring,
                    }}
                    exit={{
                      opacity: 0,
                      y: -100,
                      transition: { duration: 0.2 },
                    }}
                  />
                ) : (
                  <motion.div
                    key='placeholder'
                    className='w-full h-full flex items-center justify-center'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: springConfig }}
                    exit={{ opacity: 0 }}
                  >
                    <div className='text-center'>
                      <MapPin
                        size={48}
                        className='text-white/30 mx-auto mb-4'
                      />
                      <p className='text-white/50 text-lg'>
                        {activeHall?.name} Layout
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Legend of zones */}
            <motion.div className='w-full md:w-5/12' variants={fadeIn}>
              <div className='rounded-2xl border-2 border-white/20 bg-white/5 backdrop-blur-sm p-4 h-fit overflow-hidden'>
                <motion.h3 className='text-white text-lg font-semibold mb-4 flex items-center gap-2'>
                  Zones ({zones.length})
                </motion.h3>

                <AnimatePresence mode='wait'>
                  <motion.div
                    key={activeHall?.id}
                    className='space-y-0.5 max-h-[500px]'
                    initial={{ opacity: 0, y: 50 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: smoothSpring,
                    }}
                    exit={{
                      opacity: 0,
                      y: -50,
                      transition: { duration: 0.2 },
                    }}
                  >
                    {zones.length > 0 ? (
                      zones.map((zone, index) => (
                        <ZoneCard key={zone.id} zone={zone} index={index} />
                      ))
                    ) : (
                      <motion.div
                        className='text-center py-8'
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: 1,
                          transition: springConfig,
                        }}
                      >
                        <Calendar
                          size={32}
                          className='text-white/30 mx-auto mb-2'
                        />
                        <p className='text-white/50 text-sm'>
                          No zones configured
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

const MobileHallDropdown = ({
  halls,
  activeHall,
  isOpen,
  onToggle,
  onSelect,
}) => {
  const [ref, bounds] = useMeasure()

  return (
    <div className='w-full'>
      <motion.button
        onClick={onToggle}
        className='w-full rounded-2xl border-2 border-white/20 bg-white/5 backdrop-blur-sm p-4 flex items-center justify-between group'
        whileHover={{
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          borderColor: 'rgba(255, 255, 255, 0.3)',
          transition: snappySpring,
        }}
        whileTap={{
          scale: 0.98,
          transition: snappySpring,
        }}
      >
        <div className='flex items-center gap-3'>
          <MapPin size={20} className='text-[#18BFDB]' />
          <div className='text-left'>
            <p className='text-white/60 text-sm'>Selected Hall</p>
            <h3 className='text-white text-lg font-semibold group-hover:text-[#18BFDB] transition-colors'>
              {activeHall?.name || 'Select Hall'}
            </h3>
          </div>
        </div>

        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
            transition: {
              type: 'spring',
              stiffness: 300,
              damping: 25,
              mass: 0.7,
            },
          }}
          className='text-white/70 group-hover:text-[#18BFDB] transition-colors'
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>

      <motion.div
        animate={{
          height: isOpen ? bounds.height : 0,
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 35,
            mass: 0.8,
          },
        }}
        className='overflow-hidden'
      >
        <div ref={ref}>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: {
                    type: 'spring',
                    stiffness: 400,
                    damping: 30,
                    mass: 0.6,
                  },
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    type: 'spring',
                    stiffness: 500,
                    damping: 40,
                    mass: 0.5,
                  },
                }}
                className='rounded-2xl border-2 border-white/20 bg-white/5 backdrop-blur-sm p-2'
              >
                <motion.div className='space-y-1'>
                  {halls.map((hall, index) => (
                    <motion.button
                      key={hall.id}
                      onClick={() => onSelect(hall)}
                      className={`w-full p-3 rounded-lg text-left transition-all group ${
                        activeHall?.id === hall.id
                          ? 'bg-[#18BFDB]/20 border-[#18BFDB]/50 border'
                          : 'bg-white/5 border border-white/10 hover:bg-white/10'
                      }`}
                      whileHover={{
                        x: 2,
                        backgroundColor:
                          activeHall?.id === hall.id
                            ? 'rgba(24, 191, 219, 0.25)'
                            : 'rgba(255, 255, 255, 0.12)',
                        transition: snappySpring,
                      }}
                      whileTap={{
                        scale: 0.98,
                        transition: snappySpring,
                      }}
                    >
                      <div className='flex items-center justify-between'>
                        <div>
                          <h4
                            className={`font-medium text-lg ${
                              activeHall?.id === hall.id
                                ? 'text-[#18BFDB]'
                                : 'text-white group-hover:text-[#18BFDB]'
                            } transition-colors`}
                          >
                            {hall.name}
                          </h4>
                          <p className='text-white/60 text-sm'>
                            {hall.zones_count} zones
                          </p>
                        </div>

                        {activeHall?.id === hall.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{
                              scale: 1,
                              transition: snappySpring,
                            }}
                            className='w-2 h-2 rounded-full bg-[#18BFDB]'
                          />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

const HallTabButton = ({ hall, isActive, onClick, index }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`w-full p-1 rounded-lg text-left transition-all group ${
        isActive
          ? 'bg-[#18BFDB]/20 border-[#18BFDB]/50 border'
          : 'bg-white/5 border border-white/10 hover:bg-white/10'
      }`}
      variants={{
        initial: { opacity: 0, x: -15 },
        animate: {
          opacity: 1,
          x: 0,
          transition: {
            ...springConfig,
            delay: index * 0.04,
          },
        },
      }}
      whileHover={{
        x: 3,
        backgroundColor: isActive
          ? 'rgba(24, 191, 219, 0.25)'
          : 'rgba(255, 255, 255, 0.12)',
        transition: snappySpring,
      }}
      whileTap={{
        x: 1,
        transition: snappySpring,
      }}
    >
      <div className='flex items-center justify-between'>
        <div>
          <motion.h4
            className={`font-medium text-xl ${
              isActive
                ? 'text-[#18BFDB]'
                : 'text-white group-hover:text-[#18BFDB]'
            } transition-colors`}
            animate={{
              color: isActive ? '#18BFDB' : '#ffffff',
              transition: smoothSpring,
            }}
          >
            {hall.name}
          </motion.h4>
        </div>

        <motion.div
          animate={{
            scale: isActive ? 1.1 : 1,
            rotate: isActive ? 90 : 0,
            backgroundColor: isActive ? '#18BFDB' : 'rgba(255, 255, 255, 0.3)',
            transition: snappySpring,
          }}
          className='w-2 h-2 rounded-full'
        />
      </div>
    </motion.button>
  )
}

const ZoneCard = ({ zone, index }) => {
  return (
    <motion.div
      className='p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all group cursor-pointer'
      whileHover={{
        y: -2,
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        borderColor: 'rgba(255, 255, 255, 0.25)',
        transition: snappySpring,
      }}
      whileTap={{
        y: 0,
        transition: snappySpring,
      }}
    >
      <div className='flex items-start gap-3'>
        <motion.div
          className='w-4 h-4 flex-shrink-0 mt-0.5 rounded-sm border border-white/20'
          style={{ backgroundColor: zone.hex_code || '#18BFDB' }}
          whileHover={{
            borderColor: 'rgba(255, 255, 255, 0.4)',
            transition: snappySpring,
          }}
        />

        <div className='flex-1 min-w-0'>
          <motion.h5 className='text-white font-medium text-sm group-hover:text-[#18BFDB] transition-colors leading-tight'>
            {zone.name}
          </motion.h5>

          {zone.description && (
            <p className='text-white/60 text-xs mt-1 line-clamp-2'>
              {zone.description}
            </p>
          )}

          <div className='flex flex-wrap gap-1 mt-2'>
            {zone.capacity && (
              <Badge variant='secondary' size='sm'>
                <Users size={10} className='mr-1' />
                {zone.capacity}
              </Badge>
            )}

            {zone.dimensions && (
              <Badge variant='secondary' size='sm'>
                <Ruler size={10} className='mr-1' />
                {zone.dimensions}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default VenueNavigation
