import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import useMeasure from 'react-use-measure'
import { formatDate, formatTime } from '../../../utils/dateHelpers'
import GradientBadge from '../../Elements/GradientBadge'
import {
  Album,
  Calendar,
  CalendarFold,
  ChevronDown,
  ChevronUp,
  Clock,
  ExternalLink,
  MapPin,
  Ticket,
} from 'lucide-react'
import { SquareTabButton, TabButton } from '../../Elements/TabButtons'
import AppButton from '../../Elements/AppButton'
import {
  smoothSpring,
  snappySpring,
  superSnappySpring,
} from '../../../motion/Springs'
import { useEventsData } from '../../../hooks/useQueryApi'
import {
  contentVariants,
  contentYVariants,
  dateBlockContainerVariants,
  dateBlockVariants,
} from './variants'
import { variants } from 'tailwindcss/stubs/defaultConfig.stub'

const AgendaListing = () => {
  const [selectedEvent, setSelectedEvent] = useState('main_event')
  const [selectedDate, setSelectedDate] = useState('all')
  const [previousEvent, setPreviousEvent] = useState('main_event')

  const { data: eventsData, isLoading, error, isError } = useEventsData()

  const tabs = [
    { key: 'main_event', label: 'Main Events' },
    { key: 'partner_event', label: 'Partner Events' },
  ]

  const { groupedEvents, eventCounts, availableDates, dateCounts } =
    useMemo(() => {
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

      let filteredByType = validEvents

      if (selectedEvent === 'main_event' || selectedEvent === 'partner_event') {
        filteredByType = validEvents.filter(
          (event) => event.main_or_partner === selectedEvent
        )
      }

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
      }
    }, [eventsData, selectedEvent, selectedDate])

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
    setPreviousEvent(selectedEvent)
    setSelectedEvent(eventTabKey)
    setSelectedDate('all')

    if (navigator.vibrate) {
      navigator.vibrate(5)
    }
  }

  return (
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
        {/*Filters for desktop, will be added later*/}

        {/*agendas list*/}
        <div className='w-full md:w-9/12 mx-auto flex flex-col gap-2 md:gap-4 2xl:gap-8'>
          <AnimatePresence mode='wait' initial={false}>
            {groupedEvents.length === 0 ? (
              <motion.div
                key={`empty-${selectedEvent}`}
                variants={contentYVariants}
                initial='initial'
                animate='animate'
                exit='exit'
                className='text-center py-16'
              >
                <div className='bg-gray-900/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
                  <Calendar size={24} className='text-gray-500' />
                </div>

                <h3 className='text-gray-300 text-lg font-medium mb-2'>
                  No events found
                </h3>

                <p className='text-gray-500 mb-6'>
                  No events match the selected filter criteria.
                </p>

                <button
                  onClick={() => console.log('Reset filters')}
                  className='text-[#18BFDB] hover:text-white transition-colors'
                >
                  Check back later
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={`events-${selectedEvent}`}
                variants={contentYVariants}
                initial='initial'
                animate='animate'
                exit='exit'
              >
                <motion.div
                  variants={dateBlockContainerVariants}
                  initial='initial'
                  animate='animate'
                >
                  {groupedEvents.map(({ date, events }, index) => {
                    return (
                      <motion.div
                        key={`${date}-${selectedEvent}`}
                        variants={dateBlockVariants}
                      >
                        <DateEventBlock date={date} events={events} />
                      </motion.div>
                    )
                  })}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
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
    <article className='flex flex-col gap-4 md:gap-8 2xl:gap-12'>
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

const EventCard = ({ event, isLast = false }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [ref, bounds] = useMeasure()

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <article className='flex gap-2 relative'>
      {/*time*/}
      <div className='hidden md:flex justify-center w-2/12 font-urbanist text-bold text-lg'>
        {formatTime(event.schedule.from_date)}
      </div>

      {/*event info*/}
      <div
        className={`w-full md:w-10/12 px-4 md:px-5 2xl:px-8 border-l-2 border-bg-gray relative ${
          isLast ? '' : 'pb-4 md:pb-8 2xl:pb-12'
        }`}
      >
        {/* orange ball*/}
        <div
          className='absolute top-0 left-0 w-4 h-4 rounded-full bg-theme-orange'
          style={{ transform: 'translateX(-55%)' }}
        />

        <div className='block md:hidden mb-8'>
          {formatTime(event.schedule.from_date)}
        </div>
        {/*tags + acces level + regn badge */}
        <div className='flex gap-2 md:gap-4 mb-6 md:mb-8 text-xs md:text-base flex-wrap'>
          <GradientBadge label={event?.format?.name} />

          {event?.registeration_mode !== 'none' && (
            <div className='flex gap-1 items-center highlight-text font-bold font-urbanist'>
              <Album size={14} />
              <span>Regn. required</span>
            </div>
          )}

          {event?.access_level && (
            <div className='flex gap-1 items-center font-bold font-urbanist'>
              <Ticket size={14} />
              <span>{event.access_level.name}</span>
            </div>
          )}
        </div>

        {/*title*/}
        <h3 className='font-urbanist text-white text-2xl md:text-3xl 2xl:text-4xl font-semibold mb-2 md:mb-4'>
          {event.title}
        </h3>

        {/*location + time info */}

        <div className='flex gap-3 md:gap-8 mb-6 flex-wrap'>
          {/* Date */}
          {event?.schedule && (
            <div className='flex gap-1 items-center font-semibold font-urbanist text-gray-300'>
              <CalendarFold size={14} />
              <span>{formatDate(event.schedule.from_date)}</span>
            </div>
          )}
          {/* Time */}
          {event?.schedule && (
            <div className='flex gap-1 items-center font-semibold font-urbanist text-gray-300'>
              <Clock size={14} />
              <span>
                {formatTime(event.schedule.from_date)} -{' '}
                {formatTime(event.schedule.to_date)}
              </span>
            </div>
          )}

          {event?.partner_event_venue?.venue && (
            <div className='flex items-center gap-1 text-gray-300 font-semibold font-urbanist'>
              <MapPin size={14} className='' />
              <span>{event.partner_event_venue.venue}</span>
            </div>
          )}

          {event?.hall && (
            <div className='flex items-center gap-1 text-gray-300 font-semibold font-urbanist'>
              <MapPin size={14} className='' />
              <span>{event.hall.name}</span>
            </div>
          )}
        </div>

        {/*heght animated content */}
        <motion.div
          animate={{ height: bounds.height }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className='overflow-hidden'
        >
          <div ref={ref}>
            <AnimatePresence mode='wait'>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  className='mb-6'
                >
                  {/* Event Description */}
                  <div className='mb-6'>
                    <h4 className='font-semibold font-urbanist mb-2 text-theme-blue text-2xl'>
                      About This Event
                    </h4>
                    <p className='text-white font-normal text-lg leading-tight text-justify'>
                      {event?.about}
                    </p>
                  </div>

                  {/*donwload app*/}
                  {event?.registeration_mode !== 'none' && (
                    <div className='mb-6'>
                      <h4 className='font-semibold font-urbanist mb-2 text-theme-blue text-2xl'>
                        Download The App to Register
                      </h4>
                      <p className='text-white font-normal text-lg leading-tight text-justify mb-8'>
                        Spots Are Going Fast! Download the app now to join the
                        waitlist and lock in your place.
                      </p>

                      <div className='flex gap-4'>
                        <AppButton
                          variant='playstore'
                          url='https://play.google.com/store/apps/details?id=in.tngss.app'
                        />

                        <AppButton
                          variant='appstore'
                          url='https://apps.apple.com/in/app/tngss/id6744852527'
                        />
                      </div>
                    </div>
                  )}

                  {/*speakers + agenda */}
                  <div className='flex flex-col md:flex-row md:justify-between gap-6'>
                    {/*speakers*/}
                    {event?.speakers && event.speakers.length > 0 && (
                      <div className='flex flex-col gap-2 order-2 md:order-1 w-full md:w-1/2'>
                        <h4 className='text-theme-blue font-semibold font-urbanist text-2xl'>
                          Speakers
                        </h4>
                        {event.speakers.map((speakerData) => (
                          <SpeakerProfileCard
                            key={speakerData.id}
                            speaker={speakerData.speaker}
                          />
                        ))}
                      </div>
                    )}

                    {/*agenda*/}
                    {event?.agenda && event.agenda.length > 0 && (
                      <div className='flex flex-col gap-2 order-1 md:order-2 w-full md:w-1/2'>
                        <h4 className='text-theme-blue font-semibold font-urbanist text-2xl'>
                          Agenda
                        </h4>
                        {event.agenda.map((agenda) => (
                          <div className=''>
                            <h5 className='font-urbanist font-bold text-base'>
                              {agenda.time}
                            </h5>

                            <p className='font-urbanist font-normal text-base'>
                              {agenda.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* cta button */}
        <div className='w-full flex justify-end'>
          <button
            onClick={toggleExpanded}
            className='rounded-2xl w-full md:w-auto mt-5 focus:outline-none'
          >
            <div className='w-full md:w-32 h-8 px-3 flex items-center justify-center bg-black rounded-2xl text-white font-semibold font-urbanist'>
              <span className='mr-2'>
                {isExpanded ? 'Show Less' : 'View More'}
              </span>
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </button>
        </div>
      </div>
    </article>
  )
}

const SpeakerProfileCard = ({ speaker }) => {
  return (
    <div className='flex items-center gap-2'>
      {/*profile image */}
      <div className='w-12 h-12 rounded-full overflow-hidden flex-shrink-0'>
        {speaker?.profile_image ? (
          <img
            src={speaker.profile_image.url}
            alt={speaker.name || 'Speaker'}
            className='h-full w-full object-cover'
          />
        ) : (
          <div className='w-full h-full bg-gradient-to-br from-theme-blue to-theme-orange flex items-center justify-center'>
            <span className='text-white font-semibold text-sm'>{'S'}</span>
          </div>
        )}
      </div>

      {/*speaker info */}
      <div className='flex-1 min-w-0'>
        {/* Name with External Link */}
        {speaker?.slug && (
          <a
            className='flex items-center gap-2 mb-0'
            href={`/speakers/${speaker.slug}`}
          >
            <h5 className='font-urbanist font-semibold text-white text-base truncate'>
              {speaker?.name || 'Speaker Name'}
            </h5>
            <div className='text-theme-blue hover:text-theme-orange transition-colors duration-200 flex-shrink-0'>
              <ExternalLink size={14} />
            </div>
          </a>
        )}
        {speaker?.designation && speaker?.organization && (
          <p className='font-urbanist font-normal text-gray-300 text-sm truncate'>
            {speaker.designation}, {speaker.organization}
          </p>
        )}
      </div>
    </div>
  )
}

export default AgendaListing
