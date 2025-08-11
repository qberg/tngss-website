import useStackingAnimation from '../../../hooks/useStackingAnimation'
import StatsSection from './StatsSection'
import HeroSection from './HeroSection'
import { useRef } from 'react'
import CMSection from './CMSection'

export default function StackingSections() {
  const stackcontainer = useRef(null)
  useStackingAnimation(stackcontainer)

  return (
    <div
      ref={stackcontainer}
      className='relative isolate overflow-clip will-change-transform z-20'
    >
      <HeroSection />
      <CMSection />
      <StatsSection />
    </div>
  )
}
