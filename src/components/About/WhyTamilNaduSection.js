import React, { useRef, useEffect, useState } from 'react'
import background from '../../assets/img/why-tamilnadu-background.png'

const WhyTamilNaduSection = ({ data }) => {
  const sectionRef = useRef(null)

  const { title = '', description = '', image = null } = data

  useEffect(() => {
    const section = sectionRef.current
    const rect = section.getBoundingClientRect()
    if (rect.top < 0 && rect.bottom > window.innerHeight) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className='min-h-screen bg-cover bg-center bg-no-repeat flex items-center text-white font-urbanist'
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className='container mx-auto p-4 sm:px-4 sm:py-0'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 items-center'>
          {/* Gradient Image Frame */}
          <div className='flex justify-center'>
            <div className='p-[3px] '>
              <div className=' rounded-3xl p-2'>
                <img
                  src={image.url}
                  alt='Why Tamil Nadu'
                  className='w-[80%] md:w-[60%] mx-auto rounded-[25px] shadow-xl border-4 border-white  rounded-2xl object-cover transition-opacity duration-700'
                />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div>
            <h2 className='text-3xl md:text-5xl lg:text-6xl mb-6 font-medium'>
              {title}
            </h2>

            <p className='text-base md:text-lg lg:text-xl leading-relaxed'>
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyTamilNaduSection
