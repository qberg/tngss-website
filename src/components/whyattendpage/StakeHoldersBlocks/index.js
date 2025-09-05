import { useState } from 'react'
import { useStakeholdersFromBase } from '../../../hooks/useQueryApi'

const StakeHoldersBlock = ({ info, isEven, applyBorder = true }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  return (
    <section className='relative overflow-hidden'>
      <div
        className='w-full h-full px-1 pb-1'
        style={{
          background: applyBorder
            ? 'linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(170, 170, 170, 1) 50%, rgba(0, 0, 0, 1) 100%)'
            : '',
        }}
      >
        <div className='w-full h-full flex flex-col items-start gap-3 md:gap-5 2xl:gap-7 justify-start px-4 md:px-16 2xl:px-28 py-4 md:py-12 2xl:py-28 bg-black overflow-hidden'>
          {/*header*/}
          <div className='mb-4 md:mb-8 2xl:mb-20'>
            <h3 className='text-2xl md:text-5xl 2xl:text-6xl uppercase text-white group-hover:text-[#18BFDB] transition-colors font-medium mb-2'>
              {info.title}
            </h3>

            <p className='font-medium font-urbanist text-white text-lg md:text-2xl 2xl:text-3xl'>
              {info.sub_title}
            </p>
          </div>

          {/*content+image*/}
          <div
            className={`flex flex-col w-full md:gap-16 2xl:gap-20 ${
              isEven ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/*content*/}
            <div className='w-full md:w-1/2 mb-2'>
              <h4 className='font-urbanist font-medium text-white text-xl md:text-3xl 2xl:text-4xl mb-4 md:mb-4 2xl:mb-8 text-left'>
                {info.description}
              </h4>

              <div className='w-full md:hidden flex flex-col items-center justify-center relative flex-1 mb-4'>
                <div
                  className='p-1 w-full h-fit overflow-hidden'
                  style={{
                    maxHeight: '400px',
                    background:
                      'linear-gradient(135deg,rgba(0, 85, 255, 1) 0%, rgba(24, 191, 219, 1) 15%, rgba(245, 113, 12, 1) 85%, rgba(236, 71, 62, 1) 100%)',
                    borderRadius: '32px',
                  }}
                >
                  <img
                    src={info?.image.url}
                    alt={info.image.alt || 'Stakeholder image'}
                    className={`w-full h-auto object-cover transition-all duration-700 ${
                      imageLoaded ? 'blur-0' : 'blur-md'
                    }`}
                    style={{
                      borderRadius: '32px',
                    }}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageLoaded(true)}
                  />
                </div>
              </div>

              {/*points*/}
              <div className='flex flex-col gap-4md:gap-2 2xl:gap-4'>
                {info.points.map((content) => (
                  <p
                    key={content.id}
                    className='text-text-gray text-base md:text-xl 2xl:text-2xl text-justify flex items-start gap-2'
                  >
                    <span className='text-white font-bold text-2xl md:mb-0'>
                      •
                    </span>
                    <div>
                      <span className='font-bold'>{content.title} </span>

                      <span className='font-normal'>{content.description}</span>
                    </div>
                  </p>
                ))}
              </div>
            </div>

            {/*image*/}
            <div className='hidden w-full md:w-1/2 md:flex flex-col items-center justify-center relative flex-1'>
              <div
                className='p-1 w-full h-fit overflow-hidden'
                style={{
                  maxHeight: '400px',
                  background:
                    'linear-gradient(135deg,rgba(0, 85, 255, 1) 0%, rgba(24, 191, 219, 1) 15%, rgba(245, 113, 12, 1) 85%, rgba(236, 71, 62, 1) 100%)',
                  borderRadius: '32px',
                }}
              >
                <img
                  src={info?.image.url}
                  alt={info.image.alt || 'Stakeholder image'}
                  className={`w-full h-auto object-cover transition-all duration-700 ${
                    imageLoaded ? 'blur-0' : 'blur-md'
                  }`}
                  style={{
                    borderRadius: '32px',
                  }}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageLoaded(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const StakeHoldersSection = () => {
  const { data: stakeholdersData, isLoading, error } = useStakeholdersFromBase()

  return (
    <div className='pb-4 md:pb-28'>
      {stakeholdersData &&
        stakeholdersData.map((info, index) => (
          <StakeHoldersBlock
            key={info.id}
            info={info}
            isEven={index % 2 === 0}
          />
        ))}
    </div>
  )
}

export default StakeHoldersSection
