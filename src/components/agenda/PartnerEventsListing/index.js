import { useMemo } from 'react'
import { Calendar } from 'lucide-react'
import {
  FilterProvider,
  DesktopFilterContainer,
  FilterDropdown,
  CheckboxOption,
  useFilters,
} from '../../Elements/Filters'
import ClearFiltersButton from '../ClearFilterButton'
import EventCard from '../EventCard'
import { usePartnerEvents } from '../../newAgenda/context/PartnerEventsContext'

const PartnerEventsListing = () => {
  const { selectedDate, filteredEvents, isLoading } = usePartnerEvents()

  const initialFilters = {
    tags: [],
    formats: [],
    timeSlots: [],
    eventMode: [],
    cities: [],
  }

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
    availableTags,
    availableFormats,
    availableTimeSlots,
    availableEventModes,
    availableCities,
    tagCounts,
    formatCounts,
    timeSlotCounts,
    eventModeCounts,
    cityCounts,
  } = useMemo(() => {
    const events = filteredEvents || []

    const tagMap = new Map()
    const formatMap = new Map()
    const timeSlotMap = new Map()
    const eventModeMap = new Map()
    const cityMap = new Map()

    events.forEach((event) => {
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

      // Extract time slots
      if (event.schedule?.from_date) {
        const startTime = new Date(event.schedule.from_date)
        const timeSlot = getTimeSlot(startTime)
        if (timeSlot && !timeSlotMap.has(timeSlot.id)) {
          timeSlotMap.set(timeSlot.id, timeSlot)
        }
      }

      // Extract event modes
      if (event.partner_event_venue?.event_mode) {
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
      return a.id.localeCompare(b.id)
    })

    const allEventModes = Array.from(eventModeMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    )

    const allCities = Array.from(cityMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    )

    // Calculate counts
    const tagCountsMap = {}
    const formatCountsMap = {}
    const timeSlotCountsMap = {}
    const eventModeCountsMap = {}
    const cityCountsMap = {}

    events.forEach((event) => {
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

      // Count time slots
      if (event.schedule?.from_date) {
        const startTime = new Date(event.schedule.from_date)
        const timeSlot = getTimeSlot(startTime)
        if (timeSlot) {
          timeSlotCountsMap[timeSlot.id] =
            (timeSlotCountsMap[timeSlot.id] || 0) + 1
        }
      }

      // Count event modes
      if (event.partner_event_venue?.event_mode) {
        const eventMode = event.partner_event_venue.event_mode
        eventModeCountsMap[eventMode] = (eventModeCountsMap[eventMode] || 0) + 1
      }

      // Count cities (only for offline partner events)
      if (
        event.partner_event_venue?.event_mode === 'offline' &&
        event.partner_event_venue?.city?.name
      ) {
        const cityName = event.partner_event_venue.city.name
        cityCountsMap[cityName] = (cityCountsMap[cityName] || 0) + 1
      }
    })

    // Group events by date
    const grouped = events.reduce((groups, event) => {
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
      availableTags: allTags,
      availableFormats: allFormats,
      availableTimeSlots: allTimeSlots,
      availableEventModes: allEventModes,
      availableCities: allCities,
      tagCounts: tagCountsMap,
      formatCounts: formatCountsMap,
      timeSlotCounts: timeSlotCountsMap,
      eventModeCounts: eventModeCountsMap,
      cityCounts: cityCountsMap,
    }
  }, [filteredEvents])

  // Function to apply filters to grouped events
  const applyFiltersToEvents = (filters) => {
    if (
      !filters ||
      (!filters.tags?.length &&
        !filters.formats?.length &&
        !filters.timeSlots?.length &&
        !filters.eventMode?.length &&
        !filters.cities?.length)
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

          // Filter by time slots
          if (filters.timeSlots?.length > 0) {
            if (!event.schedule?.from_date) return false

            const startTime = new Date(event.schedule.from_date)
            const eventTimeSlot = getTimeSlot(startTime)

            if (!eventTimeSlot || !filters.timeSlots.includes(eventTimeSlot.id))
              return false
          }

          // Filter by event mode
          if (filters.eventMode?.length > 0) {
            const eventMode = event.partner_event_venue?.event_mode
            if (!eventMode || !filters.eventMode.includes(eventMode))
              return false
          }

          // Filter by cities (only for offline partner events)
          if (filters.cities?.length > 0) {
            const cityName = event.partner_event_venue?.city?.name
            if (!cityName || !filters.cities.includes(cityName)) return false
          }

          return true
        }),
      }))
      .filter(({ events }) => events.length > 0) // Remove date groups with no events
  }

  const handleFiltersChange = (newFilters) => {
    console.log('Partner event filters changed:', newFilters)
  }

  if (isLoading) {
    return (
      <div className='text-center py-16'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
        <p className='text-gray-600 mt-4'>Loading partner events...</p>
      </div>
    )
  }

  return (
    <FilterProvider
      initialFilters={initialFilters}
      onFiltersChange={handleFiltersChange}
    >
      <div className='flex gap-12'>
        <div className='hidden md:block md:w-3/12'>
          <DesktopFilterContainer title='Partner Event Filters'>
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
                    No formats available
                  </div>
                )}
              </div>
            </FilterDropdown>

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
                    No tags available
                  </div>
                )}
              </div>
            </FilterDropdown>

            {/* Time Slots Filter */}
            <FilterDropdown filterKey='timeSlots' title='Starting Time Slots'>
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
                    No time slots available
                  </div>
                )}
              </div>
            </FilterDropdown>

            {/* Event Mode Filter */}
            <FilterDropdown filterKey='eventMode' title='Event Modes'>
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

            {/* Cities Filter */}
            {availableCities.length > 0 && (
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
        </div>

        {/* Partner events listing */}
        <div className='w-full md:w-9/12 flex flex-col gap-2 md:gap-4 2xl:gap-8'>
          <FilteredPartnerEventsDisplay
            applyFiltersToEvents={applyFiltersToEvents}
          />
        </div>
      </div>
    </FilterProvider>
  )
}

const FilteredPartnerEventsDisplay = ({ applyFiltersToEvents }) => {
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
            No partner events found
          </h3>

          <p className='text-gray-500 mb-6'>
            No partner events match the selected filter criteria.
          </p>

          <ClearFiltersButton />
        </div>
      ) : (
        <div className='h-auto overflow-visible'>
          {filteredGroupedEvents.map(({ date, events }) => {
            return <DateEventBlock key={date} date={date} events={events} />
          })}
        </div>
      )}
    </div>
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
    <article className='flex flex-col gap-4 md:gap-8 2xl:gap-12 mb-4 md:mb-8 overflow-visible relative'>
      {/* date header */}
      <div
        className='w-full rounded-md py-5 flex items-center justify-center z-30'
        style={{
          background:
            'linear-gradient(90deg,rgba(6, 48, 55, 1) 0%, rgba(62, 29, 3, 1) 100%)',
        }}
      >
        <h2 className='font-urbanist font-bold text-xl text-white'>
          {formatDateHeader(date)}
        </h2>
      </div>

      {/* event cards */}
      <div className='z-20'>
        {events.map((event, index) => (
          <div key={event.id} className='w-full md:w-11/12'>
            <EventCard
              event={event}
              isLast={index === events.length - 1}
              isDropDown={false}
            />
          </div>
        ))}
      </div>
    </article>
  )
}

export default PartnerEventsListing
