import React, { useState, useEffect, useRef } from 'react'
import logo from '../../assets/Nav_logo.png'
import NavBar from '../../components/Elements/NavBar'
import Footer from '../../components/Elements/Footer/Footer'
import HeroSection from '../../components/About/HeroSection'
import IntroMissionSection from '../../components/About/IntroMissionSection'
import FocusAreasSection from '../../components/About/FocusAreasSection'
import WhyTamilNaduSection from '../../components/About/WhyTamilNaduSection'
import KeyFocusSection from '../../components/About/KeyFocusSection'
import GetInvolvedSection from '../../components/About/GetInvolvedSection'
import bgImage from '../../assets/img/image.png'
import { useAboutData } from '../../hooks/useApi'
import OrganisingCommitteSection from '../../components/About/OrganisingCommitteSection'

const About = () => {
  const { data, loading, error, refresh } = useAboutData()

  if (loading) {
    return (
      <div className='min-h-screen bg-black flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen bg-black flex items-center justify-center text-white'>
        <div className='text-center'>
          <h2 className='text-xl mb-4'>Failed to load content</h2>
          <p className='mb-6 text-gray-300'>{error}</p>
          <button
            onClick={refresh}
            className='px-6 py-3 bg-blue-600 rounded hover:bg-blue-700'
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const {
    hero,
    introduction,
    mission,
    committe,
    whyTN,
    pavilion,
    pavilionTitle,
    highlights,
    highlightsTitle,
    getInvolved,
  } = data || {}

  return (
    <div style={{ backgroundColor: 'black' }}>
      <div
        className='bg-cover bg-center flex w-full h-[80vh] items-center md:pl-20'
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className='w-full max-w-7xl px-4 flex'>
          {/* Left col-6 with centered content */}
          <div className='w-full md:w-1/2 flex flex-col  gap-5 font-urbanist '>
            <h1 className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] 2xl:text-[11rem] text-gradient animate-gradient'>
              {hero.title}
            </h1>
            <p className='text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl animate-fadeInLeft delay-200'>
              {hero.desc}
            </p>
          </div>

          {/* Right col-6 empty */}
          <div className='hidden md:block w-1/2'></div>
        </div>
      </div>

      <IntroMissionSection introData={introduction} missionData={mission} />
      <WhyTamilNaduSection data={whyTN} />
      <OrganisingCommitteSection data={committe} />
      <FocusAreasSection sectionTitle={pavilionTitle} data={pavilion} />
      <KeyFocusSection sectionTitle={highlightsTitle} data={highlights} />
      <GetInvolvedSection data={getInvolved} />
    </div>
  )
}
export default About
