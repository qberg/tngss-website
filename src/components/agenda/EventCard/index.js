import { useState } from 'react'
import useMeasure from 'react-use-measure'
import { formatDate, formatTime } from '../../../utils/dateHelpers'
import GradientBadge from '../../Elements/GradientBadge'
import {
  Album,
  CalendarFold,
  ChevronDown,
  ChevronUp,
  Clock,
  MapPin,
  Ticket,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import AppButton from '../../Elements/AppButton'
import SpeakerProfileCard from '../SpeakerProfileCard'
import ShineButton from '../../Elements/ShineButton'
import Badge from '../../Elements/Badge'

const EventCard = ({ event, isLast = false, isDropDown = true }) => {
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

        {/*tags*/}
        {event?.tags && event?.tags.length > 0 && (
          <div className='flex flex-row gap-2 md:gap-4 mb-6 md:mb-6'>
            {event.tags.map((tag, index) => {
              const tagName = typeof tag === 'object' ? tag.name : tag
              const colors = ['primary']
              const variant = colors[index % colors.length]

              return (
                <Badge variant={variant} size='md'>
                  {tagName}
                </Badge>
              )
            })}
          </div>
        )}

        {/*location + time info */}
        <div className='flex gap-3 md:gap-x-8 mb-6 flex-wrap'>
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
            <a
              href={event?.partner_event_venue?.map_url}
              target='_blank'
              className='flex items-center gap-1 text-gray-300 font-semibold font-urbanist underline'
              style={{
                color: '#17bfdb',
                lineHeight: '100%',
              }}
            >
              <MapPin size={14} className='' />
              <span>{event.partner_event_venue.venue}</span>
            </a>
          )}

          {event?.hall && (
            <div className='flex items-center gap-1 text-gray-300 font-semibold font-urbanist'>
              <MapPin size={14} className='' />
              <span>{event.hall.name}</span>
            </div>
          )}
        </div>

        {/*height animated content */}
        {isDropDown && (
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
                    </div>

                    {/*download app*/}
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
                          {event.agenda.map((agenda, index) => (
                            <div key={agenda.id || index} className=''>
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
        )}

        {/* cta button */}
        <div className='w-full flex justify-center md:justify-end'>
          {isDropDown ? (
            <button
              onClick={toggleExpanded}
              className='rounded-2xl w-full md:w-auto mt-5 focus:outline-none'
            >
              <div className='w-full md:w-32 h-8 px-3 flex items-center justify-center bg-black rounded-2xl text-white font-semibold font-urbanist'>
                <span className='mr-2'>
                  {isExpanded ? 'Show Less' : 'View More'}
                </span>
                {isExpanded ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </div>
            </button>
          ) : (
            <ShineButton
              src={`/agenda/${event.slug}`}
              className='!hover:bg-black w-full justify-center text-white'
              contCN='!bg-none py-1.5 px-2.5 w-full'
            >
              View More
            </ShineButton>
          )}
        </div>
      </div>
    </article>
  )
}

export default EventCard
