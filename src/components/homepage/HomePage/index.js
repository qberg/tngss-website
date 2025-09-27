import { useScroll } from 'motion/react'
import { lazy, Suspense, useRef } from 'react'
import { motion, useTransform } from 'motion/react'

import { useIsMobile } from '../../../hooks/test_hooks/useIsMobile'
import ShowcaseSection from '../../Homepage/showcase_section/ShowcaseSection'
import bg from '../../../assets/speakersbg.svg?url'
import ScrollAnimsFirst from '../ScrollAnimsFirst'
import WhyAttendSection from '../WhyAttendSection'
import MobileHeroSection from '../MobileHeroSection'
import MobileCMSection from '../MobileCMSection'
import MobileStatsSection from '../MobileStatsSection'
import { useMobileStickyTrigger } from '../../../hooks/mobileHooks'

const SpeakersSection = lazy(() => import('../SpeakersSection'))
const GlobalPavilion = lazy(() => import('../GlobalPavilion'))
const CircleRevealSection = lazy(() => import('../CircleRevealSection'))
const PastEngagements = lazy(() => import('../PastEngagements'))

const MobileWhyAttendSection = lazy(() => import('../MobileWhyAttendSection'))
const MobileSpeakersSection = lazy(() => import('../MobileSpeakersSection'))
const MobileCircleRevealSection = lazy(() =>
  import('../MobileCircleRevealSection')
)

const LoadingSpinner = ({ className = '' }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-theme-blue'></div>
  </div>
)

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
        <Suspense fallback={<LoadingSpinner className='h-full' />}>
          <MobileWhyAttendSection />
        </Suspense>
        <div className='h-lvh'>
          <Suspense fallback={<LoadingSpinner className='h-full' />}>
            <GlobalPavilion />
          </Suspense>
        </div>
        <Suspense fallback={<LoadingSpinner className='h-full' />}>
          <MobileSpeakersSection />
        </Suspense>
        <Suspense fallback={<LoadingSpinner className='h-full' />}>
          <MobileCircleRevealSection />
        </Suspense>
        <Suspense fallback={<LoadingSpinner className='h-full' />}>
          <PastEngagements />
        </Suspense>
      </div>
    )
  }

  return (
    <div className='text-white font-urbanist'>
      <div ref={homepageRef}>
        <ScrollAnimsFirst />
        <WhyAttendSection />
        <div className='h-screen' />
        <motion.div
          className='fixed inset-0 -z-10'
          style={{ opacity: gpOpacity }}
        >
          <Suspense fallback={<LoadingSpinner className='h-full' />}>
            <GlobalPavilion />
          </Suspense>
        </motion.div>
        <div style={{ height: '25vh' }} />

        <Suspense fallback={<LoadingSpinner className='h-full' />}>
          <SpeakersSection isMobile={isMobile} />
        </Suspense>
      </div>

      <div style={{ height: '25vh' }} className='relative'>
        <img
          src={bg}
          alt='Background for speakers'
          className='absolute inset-0 object-cover object-center w-full h-full -z-10'
          style={{ transform: 'rotate(180deg) scaleX(-1)' }}
          loading='lazy'
        />
      </div>
      <div>
        <Suspense fallback={<LoadingSpinner className='h-full' />}>
          <CircleRevealSection />
        </Suspense>
      </div>

      <div>
        <Suspense fallback={<LoadingSpinner className='h-full' />}>
          <PastEngagements />
        </Suspense>
      </div>
      <ShowcaseSection />
    </div>
  )
}

export default HomePage
