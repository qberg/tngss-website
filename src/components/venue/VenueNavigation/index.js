import { useState, useCallback } from 'react'
import { useHallsData } from '../../../hooks/useQueryApi'
import { motion, AnimatePresence } from 'motion/react'
import {
  MapPin,
  Users,
  Ruler,
  Calendar,
  ChevronDown,
  Building2,
} from 'lucide-react'
import Badge from '../../Elements/Badge'
import useMeasure from 'react-use-measure'
import {
  smoothSpring,
  snappySpring,
  springConfig,
} from '../../../motion/Springs'
import venueLayout from '../../../assets/venue-layout.png'

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
  const [selectedView, setSelectedView] = useState('venue')
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false)
  const [imageError, setImageError] = useState(false)

  const halls = hallsData?.docs || []

  const activeHall = selectedView === 'venue' ? null : selectedHall || halls[0]
  const zones = activeHall?.zones?.docs || []
  const allZones = halls.flatMap((hall) => hall.zones?.docs || []) // All zones for venue overview

  const handleHallSelect = useCallback((hall) => {
    setSelectedHall(hall)
    setSelectedView('hall')
    setIsMobileDropdownOpen(false)
    setImageError(false)
  }, [])

  const handleVenueSelect = useCallback(() => {
    setSelectedView('venue')
    setSelectedHall(null)
    setIsMobileDropdownOpen(false)
    setImageError(false)
  }, [])

  const handleMobileDropdownToggle = useCallback(() => {
    setIsMobileDropdownOpen(!isMobileDropdownOpen)
  }, [isMobileDropdownOpen])

  const handleImageError = useCallback(() => {
    setImageError(true)
  }, [])

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

      {/* Mobile Navigation Dropdown */}
      <motion.div className='block md:hidden mb-8' variants={fadeInUp}>
        <MobileNavigationDropdown
          halls={halls}
          activeHall={activeHall}
          selectedView={selectedView}
          isOpen={isMobileDropdownOpen}
          onToggle={handleMobileDropdownToggle}
          onSelectHall={handleHallSelect}
          onSelectVenue={handleVenueSelect}
        />
      </motion.div>

      {/* Layouts */}
      <div className='flex flex-col md:flex-row gap-4 md:gap-10 2xl:gap-20 md:justify-between'>
        {/* Navigation tabs */}
        <motion.div className='hidden md:block md:w-3/12' variants={fadeInLeft}>
          <div className='rounded-2xl border-2 border-white/20 bg-white/5 backdrop-blur-sm p-4'>
            <motion.h3 className='text-white text-xl font-semibold mb-4 flex items-center gap-2'>
              <MapPin size={20} className='text-[#18BFDB]' />
              Navigate
            </motion.h3>

            <motion.div
              className='space-y-1.5'
              variants={staggerContainer}
              initial='initial'
              animate='animate'
            >
              {/* Venue Overview Tab */}
              <VenueTabButton
                isActive={selectedView === 'venue'}
                onClick={handleVenueSelect}
                index={0}
              />

              {/* Individual Hall Tabs */}
              {halls.map((hall, index) => (
                <HallTabButton
                  key={hall.id}
                  hall={hall}
                  isActive={activeHall?.id === hall.id}
                  onClick={() => handleHallSelect(hall)}
                  index={index + 1}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Layout image with info panel */}
        <motion.div
          className='w-full md:w-8/12 overflow-hidden p-1 rounded-2xl'
          style={{
            background: 'linear-gradient(150deg, #007fcf, #f56b0d)',
          }}
          variants={fadeInRight}
        >
          <div className='bg-black w-full h-full rounded-2xl flex flex-col md:flex-row p-4 2xl:py-8 2xl:px-10 2xl:pl-16 gap-8 2xl:gap-10'>
            {/* Image */}
            <motion.div
              className='w-full md:w-7/12 min-h-[400px] md:h-[500px] 2xl:h-[400px] rounded-xl bg-gray-900/50 relative'
              variants={fadeIn}
            >
              <AnimatePresence mode='wait'>
                {selectedView === 'venue' ? (
                  // Venue Overview Image
                  imageError ? (
                    <ImagePlaceholder
                      key='venue-placeholder'
                      text='Complete Venue Layout'
                    />
                  ) : (
                    <motion.img
                      key='venue-overview'
                      src={venueLayout}
                      alt='Complete Venue Layout'
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
                      onError={handleImageError}
                    />
                  )
                ) : // Individual Hall Image
                activeHall?.image?.url && !imageError ? (
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
                    onError={handleImageError}
                  />
                ) : (
                  <ImagePlaceholder
                    key={activeHall?.id || 'hall-placeholder'}
                    text={
                      activeHall?.name
                        ? `${activeHall.name} Layout`
                        : 'Hall Layout'
                    }
                  />
                )}
              </AnimatePresence>
            </motion.div>

            {/* Info Panel */}
            <motion.div className='w-full md:w-5/12' variants={fadeIn}>
              <div className='rounded-2xl border-2 border-white/20 bg-white/5 backdrop-blur-sm p-4 h-fit overflow-hidden'>
                <AnimatePresence mode='wait'>
                  {selectedView === 'venue' ? (
                    <VenueOverviewPanel
                      key='venue-panel'
                      halls={halls}
                      allZones={allZones}
                    />
                  ) : (
                    <HallInfoPanel
                      key={activeHall?.id || 'hall-info'}
                      activeHall={activeHall}
                      zones={zones}
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

const ImagePlaceholder = ({ text }) => {
  return (
    <motion.div
      className='w-full h-full flex items-center justify-center'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: springConfig }}
      exit={{ opacity: 0 }}
    >
      <div className='text-center'>
        <Building2 size={48} className='text-white/30 mx-auto mb-4' />
        <p className='text-white/50 text-lg'>{text}</p>
      </div>
    </motion.div>
  )
}

const VenueOverviewPanel = ({ halls, allZones }) => {
  return (
    <motion.div
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
      <motion.h3 className='text-white text-lg font-semibold mb-4 flex items-center gap-2'>
        <Building2 size={20} className='text-[#18BFDB]' />
        Venue Overview
      </motion.h3>

      <div className='space-y-4 max-h-[500px] overflow-y-auto'>
        {/* Venue Stats */}
        <div className='grid grid-cols-2 gap-3'>
          <div className='p-3 rounded-lg bg-white/5 border border-white/10'>
            <p className='text-white/60 text-xs mb-1'>Total Halls</p>
            <p className='text-white text-xl font-semibold'>{halls.length}</p>
          </div>
          <div className='p-3 rounded-lg bg-white/5 border border-white/10'>
            <p className='text-white/60 text-xs mb-1'>Total Zones</p>
            <p className='text-white text-xl font-semibold'>
              {allZones.length}
            </p>
          </div>
        </div>

        {/* Halls Summary */}
        <div>
          <h4 className='text-white font-medium text-sm mb-3 flex items-center gap-2'>
            <MapPin size={16} className='text-[#18BFDB]' />
            All Halls
          </h4>
          <div className='space-y-2'>
            {halls.map((hall, index) => (
              <motion.div
                key={hall.id}
                className='p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all'
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    ...springConfig,
                    delay: index * 0.05,
                  },
                }}
                whileHover={{
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  transition: snappySpring,
                }}
              >
                <div className='flex items-center justify-between'>
                  <div>
                    <h5 className='text-white font-medium text-sm'>
                      {hall.name}
                    </h5>
                    <p className='text-white/60 text-xs'>
                      {hall.zones?.docs?.length || 0} zones
                    </p>
                  </div>
                  <div className='w-2 h-2 rounded-full bg-[#18BFDB]/60' />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const HallInfoPanel = ({ activeHall, zones }) => {
  return (
    <motion.div
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
      <motion.h3 className='text-white text-lg font-semibold mb-4 flex items-center gap-2'>
        Zones ({zones.length})
      </motion.h3>

      <div className='space-y-0.5 max-h-[500px] overflow-y-auto'>
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
            <Calendar size={32} className='text-white/30 mx-auto mb-2' />
            <p className='text-white/50 text-sm'>No zones configured</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

const VenueTabButton = ({ isActive, onClick, index }) => {
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
        <div className='flex items-center gap-2'>
          <Building2
            size={16}
            className={
              isActive
                ? 'text-[#18BFDB]'
                : 'text-white/70 group-hover:text-[#18BFDB]'
            }
          />
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
            Venue Overview
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

const MobileNavigationDropdown = ({
  halls,
  activeHall,
  selectedView,
  isOpen,
  onToggle,
  onSelectHall,
  onSelectVenue,
}) => {
  const [ref, bounds] = useMeasure({
    scroll: false,
    debounce: { scroll: 50, resize: 0 },
  })

  const getDisplayText = () => {
    if (selectedView === 'venue') return 'Venue Overview'
    return activeHall?.name || 'Select View'
  }

  const getDisplaySubtext = () => {
    if (selectedView === 'venue') return 'Complete layout'
    return activeHall
      ? `${activeHall.zones_count || 0} zones`
      : 'Choose navigation'
  }

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
          {selectedView === 'venue' ? (
            <Building2 size={20} className='text-[#18BFDB]' />
          ) : (
            <MapPin size={20} className='text-[#18BFDB]' />
          )}
          <div className='text-left'>
            <p className='text-white/60 text-sm'>Current View</p>
            <h3 className='text-white text-lg font-semibold group-hover:text-[#18BFDB] transition-colors'>
              {getDisplayText()}
            </h3>
            <p className='text-white/50 text-xs'>{getDisplaySubtext()}</p>
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
                  {/* Venue Overview Option */}
                  <motion.button
                    onClick={onSelectVenue}
                    className={`w-full p-3 rounded-lg text-left transition-all group ${
                      selectedView === 'venue'
                        ? 'bg-[#18BFDB]/20 border-[#18BFDB]/50 border'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                    whileHover={{
                      x: 2,
                      backgroundColor:
                        selectedView === 'venue'
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
                      <div className='flex items-center gap-3'>
                        <Building2
                          size={16}
                          className={
                            selectedView === 'venue'
                              ? 'text-[#18BFDB]'
                              : 'text-white/70'
                          }
                        />
                        <div>
                          <h4
                            className={`font-medium text-lg ${
                              selectedView === 'venue'
                                ? 'text-[#18BFDB]'
                                : 'text-white group-hover:text-[#18BFDB]'
                            } transition-colors`}
                          >
                            Venue Overview
                          </h4>
                          <p className='text-white/60 text-sm'>
                            Complete layout
                          </p>
                        </div>
                      </div>

                      {selectedView === 'venue' && (
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

                  {/* Individual Halls */}
                  {halls.map((hall) => (
                    <motion.button
                      key={hall.id}
                      onClick={() => onSelectHall(hall)}
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
                        <div className='flex items-center gap-3'>
                          <MapPin
                            size={16}
                            className={
                              activeHall?.id === hall.id
                                ? 'text-[#18BFDB]'
                                : 'text-white/70'
                            }
                          />
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
                              {hall.zones_count || 0} zones
                            </p>
                          </div>
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
