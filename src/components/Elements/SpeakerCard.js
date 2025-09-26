import { useState } from 'react'

const SpeakerCard = ({ speaker, showName = true }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <div
      className='overflow-hidden rounded-lg md:rounded-2xl flex-shrink-0 w-full h-full'
      style={{
        background: 'linear-gradient(150deg, #007fcf, #f56b0d)',
        padding: '1px',
      }}
    >
      <div className='relative w-full h-full overflow-hidden rounded-lg md:rounded-2xl'>
        {speaker?.profile_image?.url && !imageError ? (
          <>
            {!imageLoaded && (
              <div
                className='absolute inset-0 bg-cover bg-center transition-opacity duration-300'
                style={{
                  backgroundImage: `url(${speaker.profile_image.url})`,
                  filter: 'blur(20px) brightness(0.6)',
                  transform: 'scale(1.1)',
                }}
                aria-hidden='true'
              />
            )}

            {/* Main image */}
            <img
              src={speaker.profile_image.url}
              alt={`${speaker.name} - ${speaker.designation}`}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading='lazy'
              decoding='async'
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          </>
        ) : (
          <div className='absolute inset-0 bg-gray-900 flex items-center justify-center'>
            <div className='w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center'>
              <span className='text-2xl text-gray-400 font-semibold'>
                {speaker?.name?.charAt(0)?.toUpperCase() || '?'}
              </span>
            </div>
          </div>
        )}

        {showName && (
          <>
            <div
              className='absolute inset-0'
              style={{
                background:
                  'linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2), transparent)',
              }}
            />
            <div className='absolute bottom-0 left-0 p-2 text-white'>
              <h4 className='text-lg sm:text-xl font-bold mb-1 leading-tight'>
                {speaker?.name}
              </h4>
              <p className='text-xs md:text-sm text-white/80 leading-tight'>
                {speaker?.designation}
                {speaker?.organization && `, ${speaker.organization}`}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SpeakerCard
