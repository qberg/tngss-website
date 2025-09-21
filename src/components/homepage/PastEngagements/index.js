import { useRef, useState } from 'react'
import pastbg from '../../../assets/pastengbg.svg?url'
import pastvd from '../../../assets/pasteng.png'

export default function PastEngagements() {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <section
      className='relative px-6 md:px-20 py-16 md:py-10 w-screen h-auto md:min-h-screen overflow-hidden bg-white text-white flex justify-center items-start isolate md:z-50'
      style={{
        backgroundImage: `url(${pastbg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='w-full z-10'>
        {/* Heading and Text */}
        <div className='flex flex-col md:flex-row md:justify-between md:mb-16 space-y-6 md:space-y-0'>
          <h1 className='text-4xl md:text-5xl lg:text-7xl font-semibold text-left md:text-center'>
            Past Engagements
          </h1>
        </div>

        {/* Video Section */}
        <div className='flex justify-center items-center w-full mt-8 md:mt-0 relative'>
          <div
            className='w-full md:w-full h-fit overflow-hidden rounded-2xl relative'
            style={{ border: `4px solid #fff` }}
          >
            {/* Video */}
            <video
              ref={videoRef}
              src='../../assets/past_tngss.mp4'
              poster={pastvd}
              className='w-full h-auto object-fill'
              preload='true'
              controls={true}
            />

            {/* Custom Play Button */}
            {!isPlaying && (
              <button
                onClick={handlePlay}
                className='absolute inset-0 flex items-center justify-center'
                style={{
                  background:
                    'linear-gradient(to top, rgba(0, 0, 0, 0.8) 3%, rgba(0, 0, 0, 0))',
                }}
              >
                <div className='p-4 md:p-5 rounded-full bg-accent'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className=' h-14 w-14 md:h-20 md:w-20 text-white'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M8 5v14l11-7z' />
                  </svg>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
