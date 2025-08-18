import { useMotionValueEvent, useScroll } from 'motion/react'
import { useRef, useState } from 'react'
import GlobalPavilion from '../GlobalPavilion'
import { motion, useTransform } from 'motion/react'
import SpeakersSection from '../SpeakersSection'
import PastEngagements from '../PastEngagements'
import CircleRevealSection from '../CircleRevealSection'
import { useIsMobile } from '../../../hooks/test_hooks/useIsMobile'
import ShowcaseSection from '../../Homepage/showcase_section/ShowcaseSection'

const { default: ScrollAnimsFirst } = require('../ScrollAnimsFirst')
const { default: WhyAttendSection } = require('../WhyAttendSection')

const HomePage = () => {
  const homepageRef = useRef(null)
  const [shouldAnimateFlag, setShouldAnimateFlag] = useState(false)
  const isMobile = useIsMobile()

  const { scrollYProgress } = useScroll({
    target: homepageRef,
    offset: ['start start', 'end start'],
  })

  const gpOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.65, 0.9, 1],
    [0, 0, 1, 0, 0]
  )

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest > 0.65 && !shouldAnimateFlag) {
      setShouldAnimateFlag(true)
    }
  })

  return (
    <div className='home-fade-in text-white font-urbanist'>
      <div ref={homepageRef}>
        <ScrollAnimsFirst />
        <WhyAttendSection />

        {!isMobile && <div className='h-screen' />}

        <motion.div
          className={isMobile ? 'h-lvh py-8' : 'fixed inset-0 -z-10'}
          style={{ opacity: gpOpacity }}
        >
          <GlobalPavilion shouldAnimate={shouldAnimateFlag} />
        </motion.div>

        {!isMobile && <div className='h-screen' />}
        <SpeakersSection />
      </div>

      {/*rain section*/}
      <ShowcaseSection />

      <CircleRevealSection />

      <PastEngagements />
    </div>
  )
}

export default HomePage
