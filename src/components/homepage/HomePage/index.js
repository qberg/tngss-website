import { useMotionValueEvent, useScroll } from 'motion/react'
import { useRef, useState } from 'react'
import GlobalPavilion from '../GlobalPavilion'
import { motion, useTransform } from 'motion/react'
import SpeakersSection from '../SpeakersSection'
import PastEngagements from '../PastEngagements'
import CircleRevealSection from '../CircleRevealSection'
import MobileCircleRevealSection from '../MobileCircleRevealSection'
import { useIsMobile } from '../../../hooks/test_hooks/useIsMobile'
import ShowcaseSection from '../../Homepage/showcase_section/ShowcaseSection'
import bg from '../../../assets/speakersbg.svg?url'
import ScrollAnimsFirst from '../ScrollAnimsFirst'
import WhyAttendSection from '../WhyAttendSection'
import MobileHeroSection from '../MobileHeroSection'
import MobileCMSection from '../MobileCMSection'
import MobileStatsSection from '../MobileStatsSection'
import MobileWhyAttendSection from '../MobileWhyAttendSection'
import { useMobileStickyTrigger } from '../../../hooks/mobileHooks'
import MobileSpeakersSection from '../MobileSpeakersSection'

const HomePage = () => {
  const homepageRef = useRef(null)
  const isMobile = useIsMobile()
  const mobileEffects = useMobileStickyTrigger()

  const { scrollYProgress } = useScroll({
    target: homepageRef,
    offset: ['start start', 'end start'],
  })

  const gpOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.65, 0.85, 1],
    [0, 0, 1, 0, 0]
  )

  if (isMobile) {
    return (
      <div className='text-white font-urbanist'>
        <MobileHeroSection isSticky={mobileEffects.isSticky} />
        <MobileCMSection isSticky={mobileEffects.isSticky} />
        <MobileStatsSection isSticky={mobileEffects.isSticky} />
        <MobileWhyAttendSection />
        <div className='h-lvh'>
          <GlobalPavilion />
        </div>
        <MobileSpeakersSection />
        <MobileCircleRevealSection />
        <PastEngagements />
      </div>
    )
  }

  return (
    <div className='text-white font-urbanist'>
      <div ref={homepageRef}>
        <ScrollAnimsFirst />
        <WhyAttendSection />
        {!isMobile && <div className='h-screen' />}
        <motion.div
          className={isMobile ? 'h-lvh py-8' : 'fixed inset-0 -z-10'}
          style={{ opacity: isMobile ? 1 : gpOpacity }}
        >
          <GlobalPavilion />
        </motion.div>
        {!isMobile && <div style={{ height: '25vh' }} />}

        <SpeakersSection isMobile={isMobile} />
      </div>

      {!isMobile && (
        <div style={{ height: '25vh' }} className='relative'>
          <img
            src={bg}
            alt='Background for speakers'
            className='absolute inset-0 object-cover object-center w-full h-full -z-10'
            style={{ transform: 'rotate(180deg) scaleX(-1)' }}
            loading='lazy'
          />
        </div>
      )}
      {isMobile ? <MobileCircleRevealSection /> : <CircleRevealSection />}

      <PastEngagements />
      <ShowcaseSection />
    </div>
  )
}

export default HomePage
