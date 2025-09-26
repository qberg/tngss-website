const SpeakerCardSkeleton = ({ showName = true }) => {
  return (
    <div
      className='overflow-hidden rounded-lg md:rounded-2xl flex-shrink-0 w-full h-64 md:h-96'
      style={{
        background: 'linear-gradient(150deg, #007fcf, #f56b0d)',
        padding: '1px',
      }}
    >
      <div className='relative w-full h-full overflow-hidden rounded-lg md:rounded-2xl bg-gray-300'>
        {/* Image skeleton with shimmer */}
        <div className='absolute inset-0 skeleton-shimmer-dark'></div>

        {showName && (
          <>
            {/* Gradient overlay skeleton */}
            <div
              className='absolute inset-0'
              style={{
                background:
                  'linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2), transparent)',
              }}
            />

            {/* Text skeleton */}
            <div className='absolute bottom-0 left-0 p-2'>
              {/* Name skeleton */}
              <div className='rounded h-5 sm:h-6 w-32 sm:w-40 mb-2 skeleton-shimmer-light'></div>

              {/* Designation skeleton */}
              <div className='rounded h-3 md:h-4 w-24 sm:w-32 skeleton-shimmer-lighter'></div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SpeakerCardSkeleton
