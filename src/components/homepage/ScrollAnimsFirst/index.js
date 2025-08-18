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
      <div style={{ height: !isMobile ? '25vh' : '' }} />
      <CMSection scrollYProgress={scrollYProgress} isMobile={isMobile} />
      <StatsSection scrollYProgress={scrollYProgress} isMobile={isMobile} />
      <div style={{ height: !isMobile ? '30vh' : '' }} />
    </div>
  )
}

export default ScrollAnimsFirst
