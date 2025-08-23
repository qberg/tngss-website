import { ExternalLink } from 'lucide-react'

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

export default SpeakerProfileCard
