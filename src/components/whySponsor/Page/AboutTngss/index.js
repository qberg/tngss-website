import { useAboutTngss } from "../../../../hooks/useQueryApi"
import { useState } from "react"

const AboutTngss = () => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const { data: aboutTngss, isLoading, error } = useAboutTngss()
  return (
    <section className='relative overflow-hidden'>
      <div className='w-full h-full px-1 pb-1'>
        <div className='w-full h-full flex flex-col items-start gap-3 md:gap-5 2xl:gap-7 justify-start px-8 md:px-16 2xl:px-28 py-4 md:py-12 2xl:py-28 bg-black overflow-hidden'>
          {/*header*/}
          <div className='w-full text-white text-6xl md:text-7xl mb-8 2xl:mb-20 font-medium font-urbanist gradient-text-black md:leading-relaxed text-left'>
            <h3 className='uppercase'>
                {aboutTngss?.title}
            </h3>
          </div>

          {/*content+image*/}
          <div
            className={'flex flex-col w-full md:gap-16 2xl:gap-20 md:flex-row-reverse'}
          >
            {/*content*/}
            <div className='w-full md:w-1/2 mb-6 md:mb-2'>
              <div className='h-full flex flex-col justify-center gap-4 md:gap-4 2xl:gap-4 text-white/80 leading-tight md:text-xl whitespace-pre-wrap'>
                {aboutTngss?.content}
              </div>
            </div>

            {/*image*/}
            <div className='w-full md:w-1/2 flex flex-col items-center justify-center flex-1'>
                <div
                  className='relative p-0.5 w-full h-fit overflow-hidden'
                  style={{
                    maxHeight: '400px',
                    background: 'linear-gradient(170deg, #0055FF 0%, #18BFDB 16%, #F5710C 86%, #EC473E 100%)',
                    borderRadius: '32px',
                  }}
                >
                    <div
                    className='p-1 w-full h-fit overflow-hidden'
                    style={{
                        background: '#0a0a0a',
                        borderRadius: '32px',
                    }}
                    >
                    <img
                        src={aboutTngss?.image_block.image.url}
                        alt={aboutTngss?.image_block.image.alt || 'About TNGSS image'}
                        className={`w-full h-auto object-cover transition-all duration-700 ${
                        imageLoaded ? 'blur-0' : 'blur-md'
                        }`}
                        style={{
                        borderRadius: '32px',
                        }}
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageLoaded(true)}
                    />
                    <div
                        className='absolute inset-0'
                        style={{
                          background:
                            'linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), transparent)'
                        }}
                    />
                    <div className='absolute bottom-0 left-0 p-8 text-white'>
                        <h4 className='text-xl sm:text-2xl font-bold mb-1 leading-tight'>
                            {aboutTngss?.image_block.caption}
                        </h4>
                        <p className='text-xs md:text-sm text-white/80 leading-tight'>
                            {aboutTngss?.image_block.description}
                        </p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutTngss