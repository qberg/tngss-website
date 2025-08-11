import { useMotionValueEvent, useScroll } from 'motion/react'
import CMSection from '../CMSection'
import StatsSection from '../StatsSection'
import { useRef } from 'react'

const { default: HeroSection } = require('../HeroSection')

const ScrollAnimsFirst = () => {
  const mainContainerRef = useRef()

  const { scrollYProgress } = useScroll({
    target: mainContainerRef,
    offset: ['start start', 'end start'],
  })

  return (
    <div ref={mainContainerRef}>
      <HeroSection scrollYProgress={scrollYProgress} />
      <div style={{ height: '75vh' }} />
      <CMSection scrollYProgress={scrollYProgress} />
      <StatsSection scrollYProgress={scrollYProgress} />
      <div style={{ height: '50vh' }} />
    </div>
  )
}

export default ScrollAnimsFirst
