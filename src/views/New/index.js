import { Helmet } from 'react-helmet'
import { motion } from 'motion/react'
import StackingSections from '../../components/Homepage/FirstSections/StackingSections'
import HeroSection from '../../components/homepage/HeroSection'
import ScrollAnimsFirst from '../../components/homepage/ScrollAnimsFirst'
import CurtainSection from '../../components/Homepage/CurtainSection/CurtainSection'
import SpeakersSection from '../../components/WhyAttend/SpeakersSection'
import ShowcaseSection from '../../components/Homepage/showcase_section/ShowcaseSection'
import PastEngagements from '../../components/Homepage/past_engagements'
import PreFooter from '../../components/Homepage/Prefooter/PreFooter'
import BottomGlow from '../../components/Elements/BottomGlow'
import WhyAttend from '../../components/homepage/WhyAttendSection'

const NewHome = () => {
  return (
    <>
      <Helmet className='font-urbanist'>
        <title>
          Tamil Nadu Global Startup Summit 2025 | Empowering Innovation &
          Entrepreneurship
        </title>
        <meta
          name='description'
          content='Join the Tamil Nadu Global Startup Summit 2025 – a premier platform connecting startups, investors, policymakers, and global innovators. Explore opportunities, network, and drive impact. Powered by StartupTN.'
        />
      </Helmet>

      <div className='home-fade-in text-white font-urbanist'>
        <ScrollAnimsFirst />
        <WhyAttend />
        <div className='h-screen border-2 border-red-50 border-solid' />
      </div>
    </>
  )
}

export default NewHome
