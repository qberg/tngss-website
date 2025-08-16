const SpeakerCard = ({ speaker, showName = true }) => {
  return (
    <div
      className='p-1 overflow-hidden rounded-lg md:rounded-2xl flex-shrink-0 w-full h-full'
      style={{
        background: 'linear-gradient(150deg, #007fcf, #f56b0d)',
      }}
    >
      <div className='relative w-full h-full overflow-hidden rounded-lg md:rounded-2xl'>
        {speaker?.profile_image ? (
          <img
            src={speaker.profile_image.url}
            alt={`${speaker.name}-${speaker.designation}`}
            className='absolute inset-0 w-full h-full object-cover object-center'
          />
        ) : (
          <div className='absolute inset-0 bg-gray-900' />
        )}

        {showName && (
          <>
            <div
              className='absolute inset-0 z-10'
              style={{
                background:
                  'linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2), transparent)',
              }}
            />
            <div className='absolute bottom-0 left-0 p-2 text-white z-20'>
              <h4 className='text-lg sm:text-xl font-bold mb-1 leading-tight'>
                {speaker?.name}
              </h4>
              <p className='text-xs md:text-sm text-white/80 leading-tight'>
                {speaker?.designation}, {speaker?.organization}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SpeakerCard
