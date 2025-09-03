import {
  ArrowLeft,
  ExternalLink,
  MapPin,
  Calendar,
  Clock,
  Users,
  Tag,
  Album,
  CalendarFold,
} from 'lucide-react'
import { FaLinkedin } from 'react-icons/fa'
import BannerImage from './BannerImage'
import GradientBadge from '../../Elements/GradientBadge'
import EventModeTag from './EventModeTag'
import Badge from '../../Elements/Badge'
import AppButton from '../../Elements/AppButton'

const eventLabel = {
  main_event: 'Main Events',
  partner_event: 'Partner Events',
}

const EventDetails = ({ event }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getDuration = (from, to) => {
    const fromDate = new Date(from)
    const toDate = new Date(to)
    const diffMs = toDate - fromDate
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

    if (diffHours === 0) return `${diffMinutes}m`
    if (diffMinutes === 0) return `${diffHours}h`
    return `${diffHours}h ${diffMinutes}m`
  }

  return (
    <section className='relative bg-black overflow-hidden'>
      <div
        className='w-full h-full'
        style={{
          background:
            'linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(170, 170, 170, 1) 50%, rgba(0, 0, 0, 1) 100%)',
          padding: '1px',
        }}
      >
        <div className='bg-black px-4 md:px-28 2xl:px-36 py-8 md:pt-14 md:pb-7 2xl:pt-24 2xl:pb-12 w-full h-full flex flex-col gap-4 md:gap-16'>
          {/* Back button */}
          <a
            href='/agenda'
            className='w-fit flex justify-start items-center gap-4 mb-2 group hover:scale-105 transition-transform duration-200'
          >
            <div className='text-white group-hover:text-[#18BFDB] transition-colors transform group-hover:-translate-x-1 duration-300'>
              <ArrowLeft size={24} />
            </div>
            <p className='text-4xl md:text-6xl uppercase gradient-white'>
              {eventLabel[event?.main_or_partner]}
            </p>
          </a>

          {/* Event info */}
          <div className='w-full flex flex-col lg:flex-row gap-8 lg:gap-16'>
            {/* Image */}
            <div className='w-full lg:w-5/12'>
              <div className='w-full aspect-w-13 aspect-h-8'>
                {event?.banner_image?.url ? (
                  <BannerImage bannerImage={event.banner_image} />
                ) : (
                  <div className='w-full h-full bg-gradient-to-br from-[#18BFDB] to-blue-600 flex items-center justify-center'>
                    <div className='text-center text-black p-8'>
                      <Calendar size={48} className='mx-auto mb-4' />
                      <h3 className='text-xl font-bold'>
                        {event?.format?.name || 'Event'}
                      </h3>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className='w-full lg:w-7/12 flex flex-col gap-6'>
              {/*badges*/}
              <div className='flex justify-between items-center gap-2'>
                <GradientBadge label={event?.format?.name} />

                <div className='flex gap-2 items-center'>
                  {event?.registeration_mode !== 'none' && (
                    <div className='flex gap-1 items-center highlight-text font-bold font-urbanist'>
                      <Album size={14} />
                      <span>Regn. required</span>
                    </div>
                  )}

                  {event?.main_or_partner === 'partner_event' && (
                    <EventModeTag mode={event.partner_event_venue.event_mode} />
                  )}
                </div>
              </div>

              {/* Title */}
              {event?.title && (
                <h1 className='text-white text-3xl md:text-4xl 2xl:text-5xl font-semibold font-urbanist gradient-text-black leading-snug md:leading-snug 2xl:leading-normal'>
                  {event.title}
                </h1>
              )}

              {/* Tags */}
              {event?.tags && event?.tags.length > 0 && (
                <div className='flex flex-row gap-2 md:gap-4'>
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

              {/*location + time */}
              <div className='flex gap-3 md:gap-2 md:gap-x-8 flex-wrap'>
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

              {/* Quick Info Grid */}

              {/* Description */}
              {event?.about && (
                <div className=''>
                  <h3
                    className='mb-6 font-urbanist font-semibold text-xl md:text-3xl 2xl:text-4xl'
                    style={{ color: '#17bfdb' }}
                  >
                    About The Event
                  </h3>
                  <div
                    className='text-lg 2xl:text-2xl max-w-none text-justify font-normal opacity-90'
                    style={{ lineHeight: '120%' }}
                  >
                    {event.about.split('\n').map(
                      (paragraph, index) =>
                        paragraph.trim() && (
                          <p
                            key={index}
                            className={`text-gray-300 ${
                              index < event.about.split('\n').length - 1
                                ? 'mb-4'
                                : 'mb-0'
                            }`}
                          >
                            {paragraph}
                          </p>
                        )
                    )}
                  </div>
                </div>
              )}

              {/* download app */}
              {event?.registeration_mode !== 'none' && (
                <div className='mb-6'>
                  <h4 className='font-semibold font-urbanist mb-2 text-theme-blue text-2xl'>
                    Download The App to Register
                  </h4>
                  <p className='text-white font-normal text-lg leading-tight text-justify mb-4'>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EventDetails
