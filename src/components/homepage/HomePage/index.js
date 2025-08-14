import { useMotionValueEvent, useScroll } from 'motion/react'
import { useRef, useState } from 'react'
import GlobalPavilion from '../GlobalPavilion'
import { motion, useTransform } from 'motion/react'
import SpeakersSection from '../SpeakersSection'
import PastEngagements from '../PastEngagements'
import CircleRevealSection from '../CircleRevealSection'
import bg from '../../../assets/speakersbg.svg?url'
import { useIsMobile } from '../../../hooks/test_hooks/useIsMobile'

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
    [0, 0.55, 0.7, 0.9, 1],
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

        <div className='h-screen' />

        <motion.div
          className='fixed inset-0 -z-10'
          style={{ opacity: gpOpacity }}
        >
          <GlobalPavilion shouldAnimate={shouldAnimateFlag} />
        </motion.div>

        <div className='h-screen' />
        <SpeakersSection />
      </div>

      <div
        className='relative'
        style={{ height: '20vh', transform: 'rotate(180deg) scaleX(-1)' }}
      >
        <img
          src={bg}
          alt='Background for speakers'
          className='absolute inset-0 object-cover object-center w-full h-full -z-10'
        />
      </div>

      <CircleRevealSection />

      <PastEngagements />
    </div>
  )
}

export default HomePage
