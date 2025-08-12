import { useMotionValueEvent, useScroll } from 'motion/react'
import { useRef, useState } from 'react'
import GlobalPavilion from '../GlobalPavilion'
import { motion, useTransform } from 'motion/react'

const { default: ScrollAnimsFirst } = require('../ScrollAnimsFirst')
const { default: WhyAttendSection } = require('../WhyAttendSection')

const HomePage = () => {
  const homepageRef = useRef(null)
  const [shouldAnimateFlag, setShouldAnimateFlag] = useState(false)

  const { scrollYProgress } = useScroll({
    target: homepageRef,
    offset: ['start start', 'end start'],
  })

  const gpOpacity = useTransform(
    scrollYProgress,
    [0, 0.55, 0.7, 1],
    [0, 0, 1, 1]
  )

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    console.log('Page scroll: ', latest)

    if (latest > 0.65 && !shouldAnimateFlag) {
      setShouldAnimateFlag(true)
    }
  })

  return (
    <div className='home-fade-in text-white font-urbanist' ref={homepageRef}>
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
      <div className='h-screen bg-black' />
    </div>
  )
}

export default HomePage
