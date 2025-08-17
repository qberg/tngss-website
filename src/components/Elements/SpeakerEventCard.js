import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import useMeasure from 'react-use-measure'
import {
  Album,
  CalendarFold,
  Clock,
  Ticket,
  MapPin,
  Users,
  ChevronDown,
  ChevronUp,
  Globe,
  Video,
} from 'lucide-react'

const SpeakerEventCard = ({ event }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [ref, bounds] = useMeasure()

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'Asia/Kolkata',
    })
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata',
    })
  }

  const getEventTypeLabel = (type) => {
    return type === 'main_event' ? 'Main Event' : 'Partner Event'
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <article
      className='p-1 overflow-hidden rounded-2xl'
      style={{
        background: 'linear-gradient(150deg, #007fcf, #f56b0d)',
      }}
    >
      <div className='w-full h-full bg-black rounded-2xl overflow-hidden p-3 md:p-6'>
        {/* Badges */}
        <div className='flex gap-2 md:gap-4 mb-4 text-xs md:text-base flex-wrap'>
          <Badge label={getEventTypeLabel(event?.main_or_partner)} />
          {event?.registeration_mode !== 'none' && (
            <div className='flex gap-1 items-center highlight-text font-bold font-urbanist'>
              <Album size={14} />
              <span>Regn. required</span>
            </div>
          )}
          <div className='flex gap-1 items-center font-bold font-urbanist'>
            <Ticket size={14} />
            <span>Delegate Pass Only</span>
          </div>
        </div>

        {/* Title */}
        <h3 className='font-urbanist font-semibold text-xl md:text-2xl mb-4 text-white'>
          {event?.title}
        </h3>

        {/* Date + Venue Info */}
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
        </div>

        {/* Animated Expandable Content */}
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
                    <h4 className='text-white font-semibold font-urbanist mb-2'>
                      About This Event
                    </h4>
                    <p className='text-gray-300 text-sm leading-relaxed'>
                      {event?.about}
                    </p>
                  </div>

                  {/* Speakers Count (if available) */}
                  {event?.speakers && event.speakers.length > 0 && (
                    <div className='flex items-center gap-3 text-gray-300 text-sm mb-4'>
                      <Users size={16} className='text-yellow-400' />
                      <span>
                        {event.speakers.length} Speaker
                        {event.speakers.length > 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* CTA Button */}
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

const Badge = ({ label }) => {
  return (
    <section
      className='p-1 overflow-hidden rounded-lg'
      style={{
        background: 'linear-gradient(150deg, #007fcf, #f56b0d)',
      }}
    >
      <div
        className='w-full h-full rounded-lg overflow-hidden px-2.5 py-1 md:px-3 md:py-1.5 font-bold font-urbanist text-white text-xs md:text-base'
        style={{ background: '#191919' }}
      >
        {label}
      </div>
    </section>
  )
}

export default SpeakerEventCard
