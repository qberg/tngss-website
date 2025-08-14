import { useMotionValueEvent, useScroll } from 'motion/react'
import CMSection from '../CMSection'
import StatsSection from '../StatsSection'
import { useRef } from 'react'
import { useIsMobile } from '../../../hooks/test_hooks/useIsMobile'

const { default: HeroSection } = require('../HeroSection')

const ScrollAnimsFirst = () => {
  const mainContainerRef = useRef()
  const isMobile = useIsMobile()

  const { scrollYProgress } = useScroll({
    target: mainContainerRef,
    offset: ['start start', 'end start'],
  })

  const scrollValue = isMobile ? null : scrollYProgress

  return (
    <div ref={mainContainerRef}>
      <HeroSection scrollYProgress={scrollValue} isMobile={isMobile} />
      <div style={{ height: '75vh' }} />
      <CMSection scrollYProgress={scrollYProgress} />
      <StatsSection scrollYProgress={scrollYProgress} />
      <div style={{ height: '50vh' }} />
    </div>
  )
}

export default ScrollAnimsFirst
