import { FaLinkedin } from 'react-icons/fa'
import SpeakerProfileCard from '../SpeakerProfileCard'

const EventDetailsExtra = ({ event }) => {
  const hasAgenda = event?.agenda && event.agenda.length > 0
  const hasSpeakers = event?.speakers && event?.speakers.length > 0

  if (!hasAgenda && !hasSpeakers) {
    return null
  }

  return (
    <div className='bg-black px-4 md:px-28 2xl:px-36 py-8 md:pt-7 md:pb-14 2xl:pt-12 2xl:pb-24 w-full h-full flex flex-col md:flex-row gap-4 md:gap-16 2xl:gap-16'>
      {/* Left column - Agenda only */}
      <div className='w-full md:w-5/12'>
        {hasAgenda && (
          <>
            <h3
              className='font-semibold mb-4 flex items-center gap-2 text-base md:text-xl 2xl:text-2xl text-theme-light-blue'
              style={{ lineHeight: '120%' }}
            >
              Agenda
            </h3>
            <div className='flex flex-col gap-2'>
              {event.agenda.map((agenda) => (
                <AgendaCard key={agenda.id} agenda={agenda} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Right column - Speakers always here when they exist */}
      <div className='w-full md:w-7/12'>
        {hasSpeakers && (
          <div>
            <h3
              className='font-semibold mb-4 flex items-center gap-2 text-base md:text-xl 2xl:text-2xl text-theme-light-blue'
              style={{ lineHeight: '120%' }}
            >
              Featured Speakers ({event.speakers.length})
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {event.speakers.map((speakerObj, index) => (
                <div
                  key={index}
                  className='transform hover:scale-102 transition-all duration-200'
                >
                  {hasAgenda ? (
                    <SpeakerProfileCard speaker={speakerObj.speaker} />
                  ) : (
                    <SpeakerCard speaker={speakerObj.speaker} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const AgendaCard = ({ agenda }) => {
  return (
    <article
      className='rounded-lg p-2 md:p-6 flex items-center justify-start w-full gap-3 md:gap-4 2xl:gap-6'
      style={{
        backgroundColor: '#191919',
      }}
    >
      {/*time*/}
      <div className='p-2 md:p-4 border-r border-text-gray font-medium text-lg md:text-xl whitespace-nowrap flex-shrink-0'>
        {agenda.time}
      </div>

      {/*description*/}
      <div
        className='font-normal text-lg md:text-xl flex-1'
        style={{ lineHeight: '120%' }}
      >
        {agenda.description}
      </div>
    </article>
  )
}

const SpeakerCard = ({ speaker }) => {
  const handleCardClick = () => {
    window.location.href = `/speakers/${speaker.slug}`
  }
  return (
    <div
      className='rounded-lg p-4 hover:bg-gray-800 transition-all duration-300 group cursor-pointer'
      style={{
        backgroundColor: '#191919',
      }}
      role='button'
      onClick={handleCardClick}
    >
      <div className='flex items-center gap-4'>
        <div className='w-12 h-12 rounded-full flex items-center justify-center text-black font-bold text-lg group-hover:scale-110 transition-transform duration-300 overflow-hidden'>
          {speaker?.profile_image ? (
            <img
              src={speaker.profile_image.url}
              alt={speaker.name || 'Speaker'}
              className='h-full w-full object-cover rounded-full'
            />
          ) : (
            <div className='bg-gradient-to-br from-theme-blue to-theme-orange w-full h-full rounded-full flex items-center justify-center'>
              {speaker.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
          )}
        </div>
        <div className='flex-1'>
          <h4 className='text-white font-semibold group-hover:text-[#18BFDB] transition-colors'>
            {speaker.name}
          </h4>
          <p className='text-gray-400 text-sm'>{speaker.designation}</p>
          <p className='text-gray-500 text-xs'>{speaker.organization}</p>
        </div>
        {speaker.linkedin_url && (
          <a
            href={speaker.linkedin_url}
            target='_blank'
            rel='noopener noreferrer'
            className='text-[#18BFDB] hover:text-theme-blue transition-colors'
            onClick={(e) => e.stopPropagation()}
          >
            <FaLinkedin size={20} />
          </a>
        )}
      </div>
    </div>
  )
}

export default EventDetailsExtra
