import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Calendar } from 'lucide-react'
import { SquareTabButton, TabButton } from '../../Elements/TabButtons'
import { superSnappySpring } from '../../../motion/Springs'
import { useEventsData } from '../../../hooks/useQueryApi'
import {
  contentYVariants,
  dateBlockContainerVariants,
  dateBlockVariants,
} from './variants'

import {
  FilterProvider,
  DesktopFilterContainer,
  FilterDropdown,
  CheckboxOption,
  RadioOption,
  useFilters,
} from '../../Elements/Filters'
import EventCard from './EventCard'

const AgendaListing = () => {
  const [selectedEvent, setSelectedEvent] = useState('main_event')
  const [selectedDate, setSelectedDate] = useState('all')

  const { data: eventsData, isLoading, error, isError } = useEventsData()

  const tabs = [
    { key: 'main_event', label: 'Main Events' },
    { key: 'partner_event', label: 'Partner Events' },
  ]

  // Initial filter state
  const initialFilters = {
    tags: [],
    formats: [],
    timeSlots: [],
    eventMode: [],
    cities: [],
    accessLevel: null,
    halls: [],
  }

  // Function to generate 30-minute time slot from a date
  const getTimeSlot = (date) => {
    const hours = date.getHours()
    const minutes = date.getMinutes()

    const slotMinutes = minutes < 30 ? 0 : 30
    const slotHour = hours

    const endMinutes = slotMinutes === 0 ? 30 : 0
    const endHour = slotMinutes === 0 ? slotHour : slotHour + 1

    const formatTime12Hour = (hour, min) => {
      const period = hour >= 12 ? 'PM' : 'AM'
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
      const displayMin = min.toString().padStart(2, '0')
      return `${displayHour}:${displayMin} ${period}`
    }

    const startTime = formatTime12Hour(slotHour, slotMinutes)
    const endTime = formatTime12Hour(endHour, endMinutes)

    const startId = `${slotHour.toString().padStart(2, '0')}:${slotMinutes
      .toString()
      .padStart(2, '0')}`

    return {
      id: startId,
      name: `${startTime} - ${endTime}`,
      startHour: slotHour,
      startMinutes: slotMinutes,
      endHour: endHour,
      endMinutes: endMinutes,
    }
  }

  const {
    groupedEvents,
    eventCounts,
    availableDates,
    dateCounts,
    availableTags,
    availableFormats,
    availableTimeSlots,
    availableEventModes,
    availableCities,
    availableAccessLevels,
    availableHalls,
    tagCounts,
    formatCounts,
    timeSlotCounts,
    eventModeCounts,
    cityCounts,
    accessLevelCounts,
    hallCounts,
  } = useMemo(() => {
    const events = eventsData?.docs || []

    const validEvents = events.filter((event) => {
      const eventType = event.main_or_partner
      const isValidType =
        eventType === 'main_event' || eventType === 'partner_event'
      const isPublic = event.isPublic === true
      return isValidType && isPublic
    })

    const allDates = [
      ...new Set(
        validEvents
          .filter((event) => event.schedule?.from_date)
          .map((event) => new Date(event.schedule.from_date).toDateString())
      ),
    ].sort((a, b) => new Date(a) - new Date(b))

    const counts = {
      all: validEvents.length,
      main_event: validEvents.filter(
        (event) => event.main_or_partner === 'main_event'
      ).length,
      partner_event: validEvents.filter(
        (event) => event.main_or_partner === 'partner_event'
      ).length,
    }

    // Filter by event type first
    let filteredByType = validEvents
    if (selectedEvent === 'main_event' || selectedEvent === 'partner_event') {
      filteredByType = validEvents.filter(
        (event) => event.main_or_partner === selectedEvent
      )
    }

    const tagMap = new Map()
    const formatMap = new Map()
    const timeSlotMap = new Map()
    const eventModeMap = new Map()
    const cityMap = new Map()
    const accessLevelMap = new Map()
    const hallMap = new Map()

    filteredByType.forEach((event) => {
      // Extract tags
      if (event.tags && Array.isArray(event.tags)) {
        event.tags.forEach((tag) => {
          const tagObj = typeof tag === 'object' ? tag : { id: tag, name: tag }
          if (tagObj.id && !tagMap.has(tagObj.id)) {
            tagMap.set(tagObj.id, tagObj)
          }
        })
      }

      // Extract formats
      if (event.format) {
        const formatObj =
          typeof event.format === 'object'
            ? event.format
            : { id: event.format, name: event.format }
        if (formatObj.id && !formatMap.has(formatObj.id)) {
          formatMap.set(formatObj.id, formatObj)
        }
      }

      // Extract access levels (only for main events)
      if (event.main_or_partner === 'main_event' && event?.access_level) {
        const accessLevelObj =
          typeof event.access_level === 'object'
            ? event.access_level
            : { id: event.access_level, name: event.access_level }

        if (accessLevelObj.id && !accessLevelMap.has(accessLevelObj.id)) {
          accessLevelMap.set(accessLevelObj.id, accessLevelObj)
        }
      }

      // Extract halls
      if (event.main_or_partner === 'main_event' && event?.hall) {
        const hallObj =
          typeof event.hall === 'object'
            ? event.hall
            : { id: event.hall, name: event.hall }

        if (hallObj.id && !hallMap.has(hallObj.id)) {
          hallMap.set(hallObj.id, hallObj)
        }
      }

      // Extract time slots
      if (event.schedule?.from_date) {
        const startTime = new Date(event.schedule.from_date)
        const timeSlot = getTimeSlot(startTime)
        if (timeSlot && !timeSlotMap.has(timeSlot.id)) {
          timeSlotMap.set(timeSlot.id, timeSlot)
        }
      }

      // Extract event modes (only for partner events)
      if (
        event.main_or_partner === 'partner_event' &&
        event.partner_event_venue?.event_mode
      ) {
        const eventMode = event.partner_event_venue.event_mode
        if (!eventModeMap.has(eventMode)) {
          eventModeMap.set(eventMode, {
            id: eventMode,
            name: eventMode === 'online' ? 'Online' : 'Offline',
          })
        }
      }

      // Extract cities (only for offline partner events)
      if (
        event.main_or_partner === 'partner_event' &&
        event.partner_event_venue?.event_mode === 'offline' &&
        event.partner_event_venue?.city?.name
      ) {
        const cityName = event.partner_event_venue.city.name
        if (!cityMap.has(cityName)) {
          cityMap.set(cityName, {
            id: cityName,
            name: cityName,
          })
        }
      }
    })

    const allTags = Array.from(tagMap.values()).sort((a, b) =>
      (a.name || '').localeCompare(b.name || '')
    )

    const allFormats = Array.from(formatMap.values()).sort((a, b) =>
      (a.name || '').localeCompare(b.name || '')
    )

    const allTimeSlots = Array.from(timeSlotMap.values()).sort((a, b) => {
      // Sort by start time (24-hour format for proper sorting)
      return a.id.localeCompare(b.id)
    })

    const allEventModes = Array.from(eventModeMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    )

    const allCities = Array.from(cityMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    )

    const allAccessLevels = Array.from(accessLevelMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    )

    const allHalls = Array.from(hallMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    )

    // Calculate counts
    const tagCountsMap = {}
    const formatCountsMap = {}
    const timeSlotCountsMap = {}
    const eventModeCountsMap = {}
    const cityCountsMap = {}
    const accessLevelCountsMap = {}
    const hallCountsMap = {}

    filteredByType.forEach((event) => {
      // Count tags
      if (event.tags && Array.isArray(event.tags)) {
        event.tags.forEach((tag) => {
          const tagId = typeof tag === 'object' ? tag.id : tag
          tagCountsMap[tagId] = (tagCountsMap[tagId] || 0) + 1
        })
      }

      // Count formats
      if (event.format) {
        const formatId =
          typeof event.format === 'object' ? event.format.id : event.format
        formatCountsMap[formatId] = (formatCountsMap[formatId] || 0) + 1
      }

      // Count halls
      if (event.main_or_partner === 'main_event' && event?.hall) {
        const hallId = event.hall.id
        hallCountsMap[hallId] = (hallCountsMap[hallId] || 0) + 1
      }

      // Count time slots
      if (event.schedule?.from_date) {
        const startTime = new Date(event.schedule.from_date)
        const timeSlot = getTimeSlot(startTime)
        if (timeSlot) {
          timeSlotCountsMap[timeSlot.id] =
            (timeSlotCountsMap[timeSlot.id] || 0) + 1
        }
      }

      // Count event modes (only for partner events)
      if (
        event.main_or_partner === 'partner_event' &&
        event.partner_event_venue?.event_mode
      ) {
        const eventMode = event.partner_event_venue.event_mode
        eventModeCountsMap[eventMode] = (eventModeCountsMap[eventMode] || 0) + 1
      }

      // Count cities (only for offline partner events)
      if (
        event.main_or_partner === 'partner_event' &&
        event.partner_event_venue?.event_mode === 'offline' &&
        event.partner_event_venue?.city?.name
      ) {
        const cityName = event.partner_event_venue.city.name
        cityCountsMap[cityName] = (cityCountsMap[cityName] || 0) + 1
      }

      // Count access levels (only for main events)
      if (event.main_or_partner === 'main_event' && event.access_level) {
        const accessLevelId =
          typeof event.access_level === 'object'
            ? event.access_level.id
            : event.access_level
        accessLevelCountsMap[accessLevelId] =
          (accessLevelCountsMap[accessLevelId] || 0) + 1
      }
    })

    // Filter by date
    let filteredByDate = filteredByType
    if (selectedDate !== 'all') {
      filteredByDate = filteredByType.filter((event) => {
        if (!event.schedule?.from_date) return false
        const eventDate = new Date(event.schedule?.from_date).toDateString()
        return eventDate === selectedDate
      })
    }

    const dateEventCounts = {
      all: filteredByType.length,
      ...allDates.reduce((acc, date) => {
        acc[date] = filteredByType.filter((event) => {
          if (!event.schedule?.from_date) return false
          return new Date(event.schedule.from_date).toDateString() === date
        }).length
        return acc
      }, {}),
    }

    const grouped = filteredByDate.reduce((groups, event) => {
      if (!event.schedule?.from_date) return groups

      const date = new Date(event.schedule.from_date)
      const dateKey = date.toDateString()

      if (!groups[dateKey]) {
        groups[dateKey] = []
      }
      groups[dateKey].push(event)
      return groups
    }, {})

    const groupedArray = Object.entries(grouped)
      .map(([date, events]) => ({ date, events }))
      .sort((a, b) => new Date(a.date) - new Date(b.date))

    return {
      groupedEvents: groupedArray,
      eventCounts: counts,
      availableDates: allDates,
      dateCounts: dateEventCounts,
      availableTags: allTags,
      availableFormats: allFormats,
      availableTimeSlots: allTimeSlots,
      availableEventModes: allEventModes,
      availableCities: allCities,
      availableAccessLevels: allAccessLevels,
      availableHalls: allHalls,
      tagCounts: tagCountsMap,
      formatCounts: formatCountsMap,
      timeSlotCounts: timeSlotCountsMap,
      eventModeCounts: eventModeCountsMap,
      cityCounts: cityCountsMap,
      accessLevelCounts: accessLevelCountsMap,
      hallCounts: hallCountsMap,
    }
  }, [eventsData, selectedEvent, selectedDate])

  // Function to apply filters to grouped events
  const applyFiltersToEvents = (filters) => {
    if (
      !filters ||
      (!filters.tags?.length &&
        !filters.formats?.length &&
        !filters.timeSlots?.length &&
        !filters.eventMode?.length &&
        !filters.cities?.length &&
        !filters.accessLevel &&
        !filters.halls?.length)
    ) {
      return groupedEvents
    }

    return groupedEvents
      .map(({ date, events }) => ({
        date,
        events: events.filter((event) => {
          // Filter by tags
          if (filters.tags?.length > 0) {
            const eventTagIds =
              event.tags?.map((tag) =>
                typeof tag === 'object' ? tag.id : tag
              ) || []

            const hasMatchingTag = filters.tags.some((tagId) =>
              eventTagIds.includes(tagId)
            )

            if (!hasMatchingTag) return false
          }

          // Filter by formats
          if (filters.formats?.length > 0) {
            const eventFormatId =
              typeof event.format === 'object' ? event.format.id : event.format

            if (!filters.formats.includes(eventFormatId)) return false
          }

          // Filter by access levels (only for main events)
          if (event.main_or_partner === 'main_event' && filters.accessLevel) {
            const eventAccessLevelId =
              typeof event.access_level === 'object'
                ? event.access_level.id
                : event.access_level

            if (eventAccessLevelId !== filters.accessLevel) return false
          }

          // Filter by halls (only for main events)
          if (
            event.main_or_partner === 'main_event' &&
            filters.halls?.length > 0
          ) {
            const eventHallId = event.hall?.id

            if (!filters.halls.includes(eventHallId)) return false
          }

          // Filter by time slots
          if (filters.timeSlots?.length > 0) {
            if (!event.schedule?.from_date) return false

            const startTime = new Date(event.schedule.from_date)
            const eventTimeSlot = getTimeSlot(startTime)

            if (!eventTimeSlot || !filters.timeSlots.includes(eventTimeSlot.id))
              return false
          }

          // Filter by event mode (only for partner events)
          if (
            filters.eventMode?.length > 0 &&
            event.main_or_partner === 'partner_event'
          ) {
            const eventMode = event.partner_event_venue?.event_mode
            if (!eventMode || !filters.eventMode.includes(eventMode))
              return false
          }

          // Filter by cities (only for offline partner events)
          if (
            filters.cities?.length > 0 &&
            event.main_or_partner === 'partner_event'
          ) {
            const cityName = event.partner_event_venue?.city?.name
            if (!cityName || !filters.cities.includes(cityName)) return false
          }

          return true
        }),
      }))
      .filter(({ events }) => events.length > 0) // Remove date groups with no events
  }

  const formatDateDisplay = (dateString) => {
    if (dateString === 'all') {
      return 'ALL DAYS'
    }

    const date = new Date(dateString)
    const dayOfWeek = date
      .toLocaleDateString('en-US', { month: 'short' })
      .toUpperCase()
    const dayOfMonth = date.getDate().toString().padStart(2, '0')

    return `${dayOfWeek} ${dayOfMonth}`
  }

  const dateTabs = [
    { key: 'all', label: 'ALL DAYS' },
    ...availableDates.map((date) => ({
      key: date,
      label: formatDateDisplay(date),
    })),
  ]

  const handleEventTabChange = (eventTabKey) => {
    setSelectedEvent(eventTabKey)
    setSelectedDate('all')

    if (navigator.vibrate) {
      navigator.vibrate(5)
    }
  }

  const handleFiltersChange = (newFilters) => {
    console.log('Filters changed:', newFilters)
  }

  return (
    <FilterProvider
      initialFilters={initialFilters}
      onFiltersChange={handleFiltersChange}
    >
      <section className='h-auto bg-black px-4 pb-8 md:px-24 2xl:px-44 py-4 md:py-14 2xl:py-24'>
        {/*Date + Event Type tabs*/}
        <div
          className='flex flex-col gap-10 md:flex-row p-3 md:justify-between items-center rounded-md mb-6 md:mb-12 2xl:mb-20'
          style={{ background: '#222222' }}
        >
          {/*event date tabs */}
          <div className='flex gap-6 order-2 md:order-1 flex-wrap items-center justify-center'>
            {/*available dates*/}
            {dateTabs.map((dateTab, index) => {
              const count = dateCounts[dateTab.key] || 0
              if (dateTab.key !== 'all' && count === 0) return null

              return (
                <motion.div
                  key={dateTab.key}
                  layout
                  layoutId={`date-tab-${dateTab.key}`}
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    transition: {
                      type: 'spring',
                      stiffness: 400,
                      damping: 25,
                      mass: 0.6,
                      delay: index * 0.03,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    x: -20,
                    transition: {
                      type: 'spring',
                      stiffness: 500,
                      damping: 30,
                      mass: 0.4,
                    },
                  }}
                  whileTap={{
                    scale: 0.98,
                    transition: superSnappySpring,
                  }}
                  className='relative'
                >
                  <SquareTabButton
                    tab={dateTab}
                    isActive={selectedDate === dateTab.key}
                    onClick={() => setSelectedDate(dateTab.key)}
                    count={count}
                  />
                  {selectedDate === dateTab.key && (
                    <motion.div
                      layoutId='activeDateTabIndicator'
                      className='absolute inset-0 bg-theme-blue rounded-xl'
                      transition={{ ...superSnappySpring }}
                    />
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* event type tabs */}
          <div className='rounded-full inline-flex bg-white max-h-14 order-1 md:order-2'>
            {tabs.map((tab) => (
              <motion.div
                key={tab.key}
                whileTap={{
                  scale: 0.98,
                  transition: superSnappySpring,
                }}
                className='relative'
              >
                <TabButton
                  tab={tab}
                  isActive={selectedEvent === tab.key}
                  onClick={() => handleEventTabChange(tab.key)}
                  count={eventCounts[tab.key] || 0}
                />
                {selectedEvent === tab.key && (
                  <motion.div
                    layoutId='activeTabIndicator'
                    className='absolute inset-0 bg-theme-blue rounded-full'
                    transition={{
                      ...superSnappySpring,
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className='flex gap-12'>
          {/* Desktop Filters */}
          <DesktopFilterContainer title='Event Filters'>
            {/* Tags Filter */}
            <FilterDropdown filterKey='tags' title='Tags'>
              <div className='space-y-1'>
                {availableTags.length > 0 ? (
                  availableTags.map((tag) => (
                    <CheckboxOption
                      key={tag.id}
                      filterKey='tags'
                      value={tag.id}
                      label={tag.name}
                      count={tagCounts[tag.id] || 0}
                    />
                  ))
                ) : (
                  <div className='text-white/50 text-sm py-2'>
                    No tags available for{' '}
                    {selectedEvent === 'main_event'
                      ? 'main events'
                      : 'partner events'}
                  </div>
                )}
              </div>
            </FilterDropdown>

            {/* Formats Filter */}
            <FilterDropdown filterKey='formats' title='Event Formats'>
              <div className='space-y-1'>
                {availableFormats.length > 0 ? (
                  availableFormats.map((format) => (
                    <CheckboxOption
                      key={format.id}
                      filterKey='formats'
                      value={format.id}
                      label={format.name}
                      count={formatCounts[format.id] || 0}
                    />
                  ))
                ) : (
                  <div className='text-white/50 text-sm py-2'>
                    No formats available for{' '}
                    {selectedEvent === 'main_event'
                      ? 'main events'
                      : 'partner events'}
                  </div>
                )}
              </div>
            </FilterDropdown>

            {/* Time Slots Filter */}
            <FilterDropdown filterKey='timeSlots' title='Time Slots'>
              <div className='space-y-1'>
                {availableTimeSlots.length > 0 ? (
                  availableTimeSlots.map((timeSlot) => (
                    <CheckboxOption
                      key={timeSlot.id}
                      filterKey='timeSlots'
                      value={timeSlot.id}
                      label={timeSlot.name}
                      count={timeSlotCounts[timeSlot.id] || 0}
                    />
                  ))
                ) : (
                  <div className='text-white/50 text-sm py-2'>
                    No time slots available for{' '}
                    {selectedEvent === 'main_event'
                      ? 'main events'
                      : 'partner events'}
                  </div>
                )}
              </div>
            </FilterDropdown>

            {/* Access Level Filter - Only for Main Events */}
            {selectedEvent === 'main_event' &&
              availableAccessLevels.length > 0 && (
                <FilterDropdown filterKey='accessLevel' title='Access Level'>
                  <div className='space-y-1'>
                    {availableAccessLevels.map((accessLevel) => (
                      <RadioOption
                        key={accessLevel.id}
                        filterKey='accessLevel'
                        value={accessLevel.id}
                        label={accessLevel.name}
                        count={accessLevelCounts[accessLevel.id] || 0}
                      />
                    ))}
                  </div>
                </FilterDropdown>
              )}

            {/* Halls Filter - Only for Main Events */}
            {selectedEvent === 'main_event' && availableHalls.length > 0 && (
              <FilterDropdown filterKey='halls' title='Hall'>
                <div className='space-y-1'>
                  {availableHalls.length > 0 ? (
                    availableHalls.map((hall) => (
                      <CheckboxOption
                        key={hall.id}
                        filterKey='halls'
                        value={hall.id}
                        label={hall.name}
                        count={hallCounts[hall.id] || 0}
                      />
                    ))
                  ) : (
                    <div className='text-white/50 text-sm py-2'>
                      No halls available
                    </div>
                  )}
                </div>
              </FilterDropdown>
            )}

            {/* Event Mode Filter - Only for Partner Events */}
            {selectedEvent === 'partner_event' && (
              <FilterDropdown filterKey='eventMode' title='Event Mode'>
                <div className='space-y-1'>
                  {availableEventModes.length > 0 ? (
                    availableEventModes.map((mode) => (
                      <CheckboxOption
                        key={mode.id}
                        filterKey='eventMode'
                        value={mode.id}
                        label={mode.name}
                        count={eventModeCounts[mode.id] || 0}
                      />
                    ))
                  ) : (
                    <div className='text-white/50 text-sm py-2'>
                      No event modes available
                    </div>
                  )}
                </div>
              </FilterDropdown>
            )}

            {/* Cities Filter - Only for Partner Events */}
            {selectedEvent === 'partner_event' &&
              availableCities.length > 0 && (
                <FilterDropdown filterKey='cities' title='Cities'>
                  <div className='space-y-1'>
                    {availableCities.map((city) => (
                      <CheckboxOption
                        key={city.id}
                        filterKey='cities'
                        value={city.id}
                        label={city.name}
                        count={cityCounts[city.id] || 0}
                      />
                    ))}
                  </div>
                </FilterDropdown>
              )}
          </DesktopFilterContainer>

          {/*agendas list*/}
          <div className='w-full md:w-9/12 flex flex-col gap-2 md:gap-4 2xl:gap-8'>
            <FilteredEventsDisplay
              selectedEvent={selectedEvent}
              applyFiltersToEvents={applyFiltersToEvents}
            />
          </div>
        </div>
      </section>
    </FilterProvider>
  )
}

const FilteredEventsDisplay = ({ selectedEvent, applyFiltersToEvents }) => {
  const { filters } = useFilters()

  // Apply filters to get the final filtered events
  const filteredGroupedEvents = applyFiltersToEvents(filters)

  return (
    <div>
      {filteredGroupedEvents.length === 0 ? (
        <div className='text-center py-16'>
          <div className='bg-gray-900/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
            <Calendar size={24} className='text-gray-500' />
          </div>

          <h3 className='text-gray-300 text-lg font-medium mb-2'>
            No events found
          </h3>

          <p className='text-gray-500 mb-6'>
            No events match the selected filter criteria.
          </p>

          <ClearFiltersButton />
        </div>
      ) : (
        <div>
          {filteredGroupedEvents.map(({ date, events }) => {
            return (
              <motion.div key={`${date}-${selectedEvent}`}>
                <DateEventBlock date={date} events={events} />
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}

const ClearFiltersButton = () => {
  const { clearAllFilters, hasActiveFilters } = useFilters()

  if (!hasActiveFilters) {
    return (
      <button
        onClick={() => console.log('Check back later')}
        className='text-[#18BFDB] hover:text-white transition-colors'
      >
        Check back later
      </button>
    )
  }

  return (
    <button
      onClick={clearAllFilters}
      className='text-[#18BFDB] hover:text-white transition-colors'
    >
      Clear filters to see all events
    </button>
  )
}

const DateEventBlock = ({ date, events }) => {
  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th'

    switch (day % 10) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  }

  const formatDateHeader = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const isToday = date.toDateString() === today.toDateString()
    const isTomorrow = date.toDateString() === tomorrow.toDateString()

    if (isToday) return 'Today'
    if (isTomorrow) return 'Tomorrow'

    const day = date.getDate()
    const month = date.toLocaleDateString('en-US', { month: 'long' })
    const year = date.getFullYear()

    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`
  }

  return (
    <article className='flex flex-col gap-4 md:gap-8 2xl:gap-12 mb-4 md:mb-8'>
      {/* date header*/}
      <div
        className='w-full rounded-md py-5 flex items-center justify-center'
        style={{
          background:
            'linear-gradient(90deg,rgba(24, 191, 219, 0.25) 0%, rgba(245, 113, 12, 0.25) 100%)',
        }}
      >
        <h2 className='font-urbanist font-bold text-xl text-white'>
          {formatDateHeader(date)}
        </h2>
      </div>

      {/*event cards */}
      <div className=''>
        {events.map((event, index) => (
          <div key={event.id} className='w-full md:w-11/12'>
            <EventCard event={event} isLast={index === events.length - 1} />
          </div>
        ))}
      </div>
    </article>
  )
}

export default AgendaListing
