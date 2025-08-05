import React from 'react'
import introBackground from '../../assets/img/about-sec-pg.png'
import GradientBdrCard from '../Elements/GradientBorderCard'

const IntroMissionSection = ({ introData, missionData }) => {
  const { title: introTitle, description: introDescription = [] } = introData

  const {
    title: missionTitle,
    description: missionDescription = [],
    image: missionImage = null,
  } = missionData

  const renderDescription = (descriptionArray) => {
    if (!descriptionArray?.length) return null

    return descriptionArray.map((item, index) => (
      <p key={index} className='mb-4 leading-relaxed'>
        {item.point}
      </p>
    ))
  }

  return (
    <GradientBdrCard className='min-h-screen p-1 rounded-md  font-urbanist '>
      <div
        style={{
          backgroundImage: `url(${introBackground})`,
        }}
        className='bg-cover bg-center bg-no-repeat'
      >
        <div className=' backdrop-blur-sm rounded-xl p-6 md:p-10  min-h-screen'>
          {/* Introduction */}
          <h2 className='text-3xl md:text-5xl lg:text-6xl font-semibold text-black mb-4'>
            {introTitle}
          </h2>

          {introDescription.length > 0 && (
            <div className='text-gray-800 mb-3 text-lg md:text-xl'>
              {renderDescription(introDescription)}
            </div>
          )}

          {/* Image and Mission */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:mt-12 items-start'>
            {/* Image */}
            <GradientBdrCard className='flex justify-center items-center'>
              <img
                src={missionImage.url}
                alt='about'
                className='  flex justify-center items-center  w-full h-auto object-cover'
              />
            </GradientBdrCard>

            {/* Mission */}
            <div className='flex flex-col mt-10 h-full'>
              <h2 className='text-3xl md:text-5xl lg:text-6xl font-semibold text-black mb-4'>
                {missionTitle}
              </h2>
              {missionDescription.length > 0 && (
                <div className='text-gray-800 mb-3 text-lg md:text-xl'>
                  {renderDescription(missionDescription)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Overlay to make text readable */}
    </GradientBdrCard>
  )
}

export default IntroMissionSection
