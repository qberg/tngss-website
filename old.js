import { useRef } from 'react'
import { useIsMobile } from '../../../hooks/test_hooks/useIsMobile'
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'motion/react'

const CircleRevealSection = () => {
  const mainRef = useRef(null)
  const isMobile = useIsMobile()

  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ['start end', 'end start'],
  })

  const circleScale = useTransform(
    scrollYProgress,
    [0, 1],
    [0.25, isMobile ? 0.4 : 3.5]
  )

  const headerY = useTransform(scrollYProgress, [0, 0.2, 0.46], [100, 50, 0])

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    console.log('Page Scroll:', latest)
  })

  return (
    <section className='overflow-x-clip relative w-full z-30'>
      <div
        ref={mainRef}
        className='flex flex-col relative justify-center items-center w-screen'
      >
        <motion.div
          className='absolute top-0 will-change-transform bg-white rounded-full mx-auto'
          style={{ scale: circleScale, width: '85vh', height: '85vh' }}
        />

        <div
          className='min-h-screen z-50 sticky top-0'
          style={{ paddingTop: '20vh' }}
        >
          <motion.h1
            className='text-black md:text-center md:text-8xl font-bold z-50'
            style={{ y: headerY }}
          >
            Key Highlights
          </motion.h1>
        </div>
      </div>
    </section>
  )
}

export default CircleRevealSection
