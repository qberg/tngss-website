import React from 'react'
import introBackground from '../../../assets/img/about-sec-pg.png'
import GradientBdrCard from '../../Elements/GradientBorderCard'

const IntroSection = ({ introData, missionData }) => {
  // Safely destructure introData with fallback to empty object
  const { title: introTitle = '', description: introDescription = [] } =
    introData || {}

  const {
    title: missionTitle = '',
    description: missionDescription = [],
    image: missionImage = null,
  } = missionData || {}

  const renderDescription = (descriptionArray) => {
    if (!descriptionArray?.length) return null
    return descriptionArray.map((item, index) => (
      <p key={index} className='mb-4 leading-relaxed'>
        {item.point}
      </p>
    ))
  }

  // Early return if critical data is missing
  if (!introData && !missionData) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <GradientBdrCard className='p-1 rounded-md font-urbanist'>
      <div
        style={{
          backgroundImage: `url(${introBackground})`,
        }}
        className='bg-cover bg-center bg-no-repeat p-4 md:p-16 2xl:p-28'
      >
        <div className='backdrop-blur-sm rounded-xl p-4'>
          {/* Introduction - Only render if introData exists */}
          {introData && (
            <>
              <h2 className='text-3xl md:text-5xl lg:text-6xl font-semibold text-black mb-4'>
                {introTitle}
              </h2>
              {introDescription.length > 0 && (
                <div className='text-gray-800 mb-3 text-lg md:text-xl text-justify'>
                  {renderDescription(introDescription)}
                </div>
              )}
            </>
          )}

          {/* Image and Mission - Only render if missionData exists */}
          {missionData && (
            <div className='flex flex-col md:flex-row md:items-center justify-center gap-8 md:mt-12 items-start text-justify'>
              {/* Image - Only render if missionImage exists */}
              {missionImage?.url && (
                <GradientBdrCard className='p-1 w-full md:w-1/2'>
                  <div className='w-full aspect-w-12 aspect-h-8'>
                    <img
                      src={missionImage.url}
                      alt='about'
                      className='w-full h-full object-cover rounded-lg'
                    />
                  </div>
                </GradientBdrCard>
              )}

              {/* Mission */}
              <div className='flex flex-col w-full md:w-1/2'>
                <h2 className='text-3xl md:text-5xl lg:text-6xl font-semibold text-black mb-4'>
                  {missionTitle}
                </h2>
                {missionDescription.length > 0 && (
                  <div className='text-gray-800 mb-3 text-lg md:text-xl text-justify'>
                    {renderDescription(missionDescription)}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </GradientBdrCard>
  )
}

export default IntroSection
