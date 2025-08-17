import { useMemo, useState } from 'react'
import { useSpeakersData } from '../../../hooks/useApi'
import { ChevronDown, Filter, Search, X, Check } from 'lucide-react'
import SpeakerCard from '../../Elements/SpeakerCard'
import useMeasure from 'react-use-measure'
import { motion, AnimatePresence } from 'motion/react'

const springConfig = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 0.8,
}

const gentleSpring = {
  type: 'spring',
  stiffness: 200,
  damping: 25,
  mass: 1,
}

const snappySpring = {
  type: 'spring',
  stiffness: 400,
  damping: 35,
  mass: 0.6,
}

const smoothSpring = {
  type: 'spring',
  stiffness: 250,
  damping: 28,
  mass: 0.9,
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: springConfig,
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
  animate: {
    transition: {
      staggerChildren: 0.03,
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
}

const scaleOnHover = {
  hover: {
    y: -12,
    scale: 1.02,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 30,
      mass: 0.5,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      type: 'spring',
      stiffness: 600,
      damping: 25,
      mass: 0.4,
    },
  },
}

const SpeakersListing = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpeakerType, setSelectedSpeakerType] = useState('all')
  const [selectedEventType, setSelectedEventType] = useState('all')
  const [selectedTags, setSelectedTags] = useState([])
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false)
  const [eventTypeDropdownOpen, setEventTypeDropdownOpen] = useState(false)
  const [tagsDropdownOpen, setTagsDropdownOpen] = useState(false)

  const {
    data: speakersData,
    isLoading: speakersLoading,
    error: speakersError,
  } = useSpeakersData()

  const allSpeakers = useMemo(() => {
    const speakers = speakersData?.docs || []
    return speakers.filter((speaker) => {
      const speakerType =
        typeof speaker.speaker_type === 'object'
          ? speaker.speaker_type.slug
          : speaker.speaker_type?.toLowerCase()
      return speakerType === 'international' || speakerType === 'domestic'
    })
  }, [speakersData])

  const speakerTypeCounts = useMemo(() => {
    const counts = { all: allSpeakers.length, international: 0, domestic: 0 }
    allSpeakers.forEach((speaker) => {
      const type =
        typeof speaker.speaker_type === 'object'
          ? speaker.speaker_type.slug
          : speaker.speaker_type?.toLowerCase()
      if (counts.hasOwnProperty(type)) {
        counts[type]++
      }
    })
    return counts
  }, [allSpeakers])

  const eventTypeCounts = useMemo(() => {
    const counts = { all: allSpeakers.length, main_event: 0, partner_event: 0 }

    allSpeakers.forEach((speaker) => {
      const events = speaker.speaking_events?.docs || []
      const hasMainEvent = events.some(
        (event) => event.main_or_partner === 'main_event'
      )
      const hasPartnerEvent = events.some(
        (event) => event.main_or_partner === 'partner_event'
      )

      if (hasMainEvent) counts.main_event++
      if (hasPartnerEvent) counts.partner_event++
    })

    return counts
  }, [allSpeakers])

  const availableTags = useMemo(() => {
    const tagMap = new Map()

    allSpeakers.forEach((speaker) => {
      if (speaker.tags && Array.isArray(speaker.tags)) {
        speaker.tags.forEach((tag) => {
          const tagObj = typeof tag === 'object' ? tag : { id: tag, name: tag }
          if (tagObj.id && !tagMap.has(tagObj.id)) {
            tagMap.set(tagObj.id, tagObj)
          }
        })
      }
    })

    return Array.from(tagMap.values()).sort((a, b) =>
      (a.name || '').localeCompare(b.name || '')
    )
  }, [allSpeakers])

  const tagCounts = useMemo(() => {
    const counts = {}
    allSpeakers.forEach((speaker) => {
      if (speaker.tags && Array.isArray(speaker.tags)) {
        speaker.tags.forEach((tag) => {
          const tagId = typeof tag === 'object' ? tag.id : tag
          counts[tagId] = (counts[tagId] || 0) + 1
        })
      }
    })
    return counts
  }, [allSpeakers])

  const filteredSpeakers = useMemo(() => {
    let filtered = allSpeakers

    if (selectedSpeakerType !== 'all') {
      filtered = filtered.filter((speaker) => {
        const speakerType =
          typeof speaker.speaker_type === 'object'
            ? speaker.speaker_type.slug
            : speaker.speaker_type.toLowerCase()
        return speakerType === selectedSpeakerType
      })
    }

    if (selectedEventType !== 'all') {
      filtered = filtered.filter((speaker) => {
        const events = speaker.speaking_events?.docs || []
        return events.some(
          (event) => event.main_or_partner === selectedEventType
        )
      })
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((speaker) => {
        if (!speaker.tags || speaker.tags.length === 0) return false

        const speakerTagIds = speaker.tags.map((tag) =>
          typeof tag === 'object' ? tag.id : tag
        )

        return selectedTags.some((tagId) => speakerTagIds.includes(tagId))
      })
    }

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase().trim()
      filtered = filtered.filter((speaker) => {
        const searchableText = [speaker.name, speaker.organization]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        return searchableText.includes(search)
      })
    }

    return filtered
  }, [
    allSpeakers,
    searchTerm,
    selectedTags,
    selectedSpeakerType,
    selectedEventType,
  ])

  const handleSearchClear = () => {
    console.log('Search Cleared')
  }

  const handleTagToggle = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    )
  }

  const clearAllFilters = () => {
    setSelectedTags([])
    setSelectedSpeakerType('all')
    setSelectedEventType('all')
    setSearchTerm('')
    setTypeDropdownOpen(false)
    setEventTypeDropdownOpen(false)
    setTagsDropdownOpen(false)
  }

  const hasActiveFilters =
    selectedTags.length > 0 ||
    selectedSpeakerType !== 'all' ||
    selectedEventType !== 'all' ||
    searchTerm.trim()

  const speakerTypeOptions = [
    { value: 'all', label: 'All Types', count: speakerTypeCounts.all },
    {
      value: 'international',
      label: 'International',
      count: speakerTypeCounts.international,
    },
    { value: 'domestic', label: 'Domestic', count: speakerTypeCounts.domestic },
  ]

  const eventTypeOptions = [
    { value: 'all', label: 'All Events', count: eventTypeCounts.all },
    {
      value: 'main_event',
      label: 'Main Events',
      count: eventTypeCounts.main_event,
    },
    {
      value: 'partner_event',
      label: 'Partner Events',
      count: eventTypeCounts.partner_event,
    },
  ]

  return (
    <section className='h-auto bg-black px-4 md:px-28 2xl:px-44 py-4 md:py-14 2xl:py-24'>
      {/* Header with search */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={gentleSpring}
        className='w-full flex flex-col md:flex-row justify-between gap-4 mb-8 md:mb-14 2xl:mb-24'
      >
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            ...springConfig,
            delay: 0.1,
          }}
          className='uppercase text-5xl md:text-6xl text-white font-medium'
        >
          Speakers
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            ...springConfig,
            delay: 0.2,
          }}
        >
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder='Search...'
            onClear={handleSearchClear}
          />
        </motion.div>
      </motion.div>

      {/* Speakers grid with filters */}
      <div className='flex gap-12'>
        {/* Left side filters */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            ...gentleSpring,
            delay: 0.2,
          }}
          className='hidden md:flex flex-col md:w-3/12 gap-8'
        >
          {/* Applied filters header */}
          <motion.div
            whileHover={{
              scale: 1.02,
              transition: snappySpring,
            }}
            whileTap={{
              scale: 0.98,
              transition: snappySpring,
            }}
            className='w-full bg-[#18BFDB] px-4 py-4 flex justify-between items-center rounded-2xl shadow-lg backdrop-blur-sm'
          >
            <p className='text-lg font-semibold text-white'>Filters</p>
            <Filter size={16} className='text-white' />
          </motion.div>

          <AnimatePresence>
            {hasActiveFilters && (
              <motion.button
                {...fadeInUp}
                onClick={clearAllFilters}
                whileHover={{
                  scale: 1.05,
                  transition: snappySpring,
                }}
                whileTap={{
                  scale: 0.95,
                  transition: snappySpring,
                }}
                className='text-sm text-red-400 hover:text-red-300 underline self-start font-medium'
              >
                Clear all filters
              </motion.button>
            )}
          </AnimatePresence>

          {/* Filters */}
          <motion.div
            className='flex flex-col gap-8'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              ...smoothSpring,
              delay: 0.3,
            }}
          >
            <FilterDropdown
              title='Speaker Type'
              isOpen={typeDropdownOpen}
              onToggle={() => setTypeDropdownOpen(!typeDropdownOpen)}
            >
              <div className='space-y-1'>
                {speakerTypeOptions.map((option) => (
                  <RadioOption
                    key={option.value}
                    value={option.value}
                    label={option.label}
                    count={option.count}
                    selected={selectedSpeakerType === option.value}
                    onChange={setSelectedSpeakerType}
                  />
                ))}
              </div>
            </FilterDropdown>

            <FilterDropdown
              title='Event Type'
              isOpen={eventTypeDropdownOpen}
              onToggle={() => setEventTypeDropdownOpen(!eventTypeDropdownOpen)}
            >
              <div className='space-y-1'>
                {eventTypeOptions.map((option) => (
                  <RadioOption
                    key={option.value}
                    value={option.value}
                    label={option.label}
                    count={option.count}
                    selected={selectedEventType === option.value}
                    onChange={setSelectedEventType}
                  />
                ))}
              </div>
            </FilterDropdown>

            <FilterDropdown
              title='Tags'
              isOpen={tagsDropdownOpen}
              onToggle={() => setTagsDropdownOpen(!tagsDropdownOpen)}
            >
              <div className='space-y-1 max-h-64 overflow-y-auto'>
                {availableTags.length > 0 ? (
                  <>
                    <AnimatePresence>
                      {selectedTags.length > 0 && (
                        <motion.div
                          {...fadeInUp}
                          className='flex items-center justify-between pb-2 mb-2 border-b border-white/10'
                        >
                          <span className='text-xs text-white/70 font-medium'>
                            {selectedTags.length} selected
                          </span>
                          <motion.button
                            onClick={() => setSelectedTags([])}
                            whileHover={{
                              scale: 1,
                              transition: snappySpring,
                            }}
                            whileTap={{ scale: 0.9, transition: snappySpring }}
                            className='text-xs text-red-400 hover:text-red-300'
                          >
                            Clear
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {availableTags.map((tag) => (
                      <CheckboxOption
                        key={tag.id}
                        value={tag.id}
                        label={tag.name}
                        count={tagCounts[tag.id] || 0}
                        selected={selectedTags.includes(tag.id)}
                        onChange={() => handleTagToggle(tag.id)}
                      />
                    ))}
                  </>
                ) : (
                  <div className='text-white/50 text-sm py-2'>
                    No tags available
                  </div>
                )}
              </div>
            </FilterDropdown>
          </motion.div>
        </motion.div>

        {/* Speakers grid */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            ...gentleSpring,
            delay: 0.3,
          }}
          className='w-full md:w-9/12'
        >
          <AnimatePresence mode='wait'>
            {filteredSpeakers.length === 0 ? (
              <motion.div
                key='empty-state'
                {...fadeInUp}
                className='text-center py-12'
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={springConfig}
                  className='text-gray-400 text-lg mb-4'
                >
                  {searchTerm
                    ? 'No speakers found matching your search'
                    : 'No speakers available'}
                </motion.div>
                {(searchTerm || hasActiveFilters) && (
                  <motion.div
                    className='space-x-4'
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      ...springConfig,
                      delay: 0.1,
                    }}
                  >
                    {searchTerm && (
                      <motion.button
                        onClick={() => setSearchTerm('')}
                        whileHover={{ scale: 1.05, transition: snappySpring }}
                        whileTap={{ scale: 0.95, transition: snappySpring }}
                        className='text-red-400 hover:text-red-300 underline'
                      >
                        Clear search
                      </motion.button>
                    )}
                    {hasActiveFilters && (
                      <motion.button
                        onClick={clearAllFilters}
                        whileHover={{ scale: 1.05, transition: snappySpring }}
                        whileTap={{ scale: 0.95, transition: snappySpring }}
                        className='text-red-400 hover:text-red-300 underline'
                      >
                        Clear all filters
                      </motion.button>
                    )}
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key='speakers-grid'
                variants={staggerContainer}
                initial='initial'
                animate='animate'
                className='grid grid-cols-2 md:grid-cols-3 gap-2 gap-y-8 md:gap-10 2xl:gap-16'
              >
                {filteredSpeakers.map((speaker, index) => (
                  <motion.a
                    key={speaker.id || index}
                    href={`/speakers/${speaker.slug}`}
                    className='w-full h-64 md:h-96'
                    variants={cardVariant}
                    whileHover={scaleOnHover.hover}
                    whileTap={scaleOnHover.tap}
                    layout
                    layoutId={`speaker-${speaker.id}`}
                  >
                    <SpeakerCard speaker={speaker} />
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

const FilterDropdown = ({ title, isOpen, onToggle, children }) => {
  const [ref, bounds] = useMeasure()

  return (
    <div>
      <motion.button
        onClick={onToggle}
        className='border-b border-white/20 flex justify-between items-center pb-3 focus:outline-none w-full group'
        whileHover={{
          borderColor: 'rgba(255, 255, 255, 0.4)',
          transition: snappySpring,
        }}
        whileTap={{
          scale: 0.98,
          transition: snappySpring,
        }}
      >
        <p className='text-lg text-white font-medium'>{title}</p>
        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
            transition: {
              type: 'spring',
              stiffness: 350,
              damping: 30,
              mass: 0.7,
            },
          }}
          className='text-white/70 group-hover:text-white'
        >
          <ChevronDown size={16} />
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
                initial={{ opacity: 0, y: -10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: 'spring',
                    stiffness: 400,
                    damping: 30,
                    mass: 0.6,
                  },
                }}
                exit={{
                  opacity: 0,
                  y: 0,
                  transition: {
                    type: 'spring',
                    stiffness: 500,
                    damping: 40,
                    mass: 0.5,
                  },
                }}
                className='pt-4 pb-2'
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

const RadioOption = ({ value, label, selected, onChange, count }) => (
  <motion.label
    whileHover={{
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      transition: snappySpring,
    }}
    whileTap={{
      scale: 0.97,
      transition: snappySpring,
    }}
    className='flex items-center justify-between p-3 rounded-lg cursor-pointer group'
  >
    <div className='flex items-center space-x-3'>
      <div className='relative'>
        <input
          type='radio'
          value={value}
          checked={selected}
          onChange={() => onChange(value)}
          className='sr-only'
        />
        <motion.div
          animate={{
            backgroundColor: selected ? '#18BFDB' : 'transparent',
            borderColor: selected ? '#18BFDB' : 'rgba(255, 255, 255, 0.4)',
            scale: selected ? 1.05 : 1,
            transition: {
              type: 'spring',
              stiffness: 400,
              damping: 25,
              mass: 0.6,
            },
          }}
          className='w-5 h-5 rounded-full border-2'
        >
          <motion.div
            animate={{
              scale: selected ? 1 : 0,
              opacity: selected ? 1 : 0,
              transition: {
                type: 'spring',
                stiffness: 500,
                damping: 30,
                mass: 0.4,
              },
            }}
            className='absolute inset-1 bg-white rounded-full'
          />
        </motion.div>
      </div>
      <motion.span
        animate={{
          color: selected ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
          transition: smoothSpring,
        }}
        className='text-sm font-medium'
      >
        {label}
      </motion.span>
    </div>
    {count !== undefined && (
      <motion.span
        initial={{ scale: 0.9, opacity: 0.7 }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: gentleSpring,
        }}
        className='text-xs text-white/50 bg-white/10 px-2 py-1 rounded-full'
      >
        {count}
      </motion.span>
    )}
  </motion.label>
)

const CheckboxOption = ({ label, selected, onChange, count }) => (
  <motion.label
    whileHover={{
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      transition: snappySpring,
    }}
    whileTap={{
      scale: 0.97,
      transition: snappySpring,
    }}
    className='flex items-center justify-between p-3 rounded-lg cursor-pointer group'
  >
    <div className='flex items-center space-x-3'>
      <div className='relative'>
        <input
          type='checkbox'
          checked={selected}
          onChange={onChange}
          className='sr-only'
        />
        <motion.div
          animate={{
            backgroundColor: selected ? '#18BFDB' : 'transparent',
            borderColor: selected ? '#18BFDB' : 'rgba(255, 255, 255, 0.4)',
            scale: selected ? 1 : 1,
            transition: {
              type: 'spring',
              stiffness: 400,
              damping: 25,
              mass: 0.6,
            },
          }}
          className='w-5 h-5 rounded border-2 flex items-center justify-center'
        >
          <motion.div
            animate={{
              scale: selected ? 1 : 0,
              opacity: selected ? 1 : 0,
              rotate: selected ? 0 : 180,
              transition: {
                type: 'spring',
                stiffness: 500,
                damping: 30,
                mass: 0.4,
              },
            }}
          >
            <Check size={12} className='text-white' />
          </motion.div>
        </motion.div>
      </div>
      <motion.span
        animate={{
          color: selected ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
          transition: smoothSpring,
        }}
        className='text-sm font-medium'
      >
        {label}
      </motion.span>
    </div>
    {count !== undefined && (
      <motion.span
        initial={{ scale: 0.9, opacity: 0.7 }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: gentleSpring,
        }}
        className='text-xs text-white/50 bg-white/10 px-2 py-1 rounded-full'
      >
        {count}
      </motion.span>
    )}
  </motion.label>
)

const SearchBar = ({ value, onChange, onClear, placeholder }) => {
  const handleInputChange = (e) => {
    onChange(e.target.value)
  }

  const handleClearClick = () => {
    onChange('')
    onClear?.()
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={springConfig}
      whileHover={{
        scale: 1.02,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        transition: snappySpring,
      }}
      whileFocus={{
        scale: 1.02,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        transition: snappySpring,
      }}
      className='w-full md:w-96 border-white/30 border-2 border-solid relative rounded-full flex items-center justify-between p-3 md:p-4 bg-white/5 backdrop-blur-sm'
    >
      <div className='inline-flex gap-3 flex-1'>
        <motion.div
          animate={{
            scale: value ? 1.1 : 1,
            color: value ? '#18BFDB' : 'rgba(255, 255, 255, 0.7)',
            transition: snappySpring,
          }}
        >
          <Search size={24} className='mt-0.5' />
        </motion.div>
        <input
          type='text'
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          className='text-xl text-white placeholder-white/50 w-full focus:outline-none bg-transparent'
        />
      </div>
      <AnimatePresence>
        {value && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
              transition: {
                type: 'spring',
                stiffness: 400,
                damping: 25,
                mass: 0.5,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
              rotate: 90,
              transition: {
                type: 'spring',
                stiffness: 500,
                damping: 30,
                mass: 0.4,
              },
            }}
            whileHover={{
              scale: 1.2,
              rotate: 90,
              transition: snappySpring,
            }}
            whileTap={{
              scale: 0.9,
              transition: snappySpring,
            }}
            onClick={handleClearClick}
            aria-label='Clear Search'
            className='text-white/70 hover:text-white ml-2'
          >
            <X size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default SpeakersListing
