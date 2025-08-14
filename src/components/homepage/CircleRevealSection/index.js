import { useEffect, useRef, useState } from 'react'
import { useIsMobile } from '../../../hooks/test_hooks/useIsMobile'
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'motion/react'
import startUp from '../../../assets/segments/startup.png'
import innovation from '../../../assets/segments/innovation.png'
import globalMarket from '../../../assets/segments/globalMarket.png'
import sustainability from '../../../assets/segments/sustainability.png'

const segments = [
  {
    title: 'Innovation & Technology',
    bgImage: innovation,
  },
  {
    title: 'Global Markets & Expansion',
    bgImage: globalMarket,
  },
  {
    title: 'Sustainability & Impact',
    bgImage: sustainability,
  },
  {
    title: 'Startup Growth & Funding',
    bgImage: startUp,
  },
  {
    title: 'Innovation & Technology',
    bgImage: innovation,
  },
  {
    title: 'Global Markets & Expansion',
    bgImage: globalMarket,
  },
]

const CircleRevealSection = () => {
  const mainRef = useRef(null)
  const containerRef = useRef(null)
  const cardsRef = useRef(null)
  const isMobile = useIsMobile()
  const [containerWidth, setContainerWidth] = useState(0)
  const [scrollWidth, setScrollWidth] = useState(0)
  const [scrollHeight, setScrollHeight] = useState(0)

  useEffect(() => {
    const updateMeasurements = () => {
      if (!cardsRef.current || !containerRef.current) return

      const containerW = containerRef.current.offsetWidth
      const scrollW = cardsRef.current.scrollWidth

      setContainerWidth(containerW)
      setScrollWidth(scrollW)

      const totalScrollDistance = scrollW - containerW + 100
      setScrollHeight(window.innerHeight * 1.5 + totalScrollDistance)
    }

    updateMeasurements()
    window.addEventListener('resize', updateMeasurements)
    return () => window.removeEventListener('resize', updateMeasurements)
  }, [])

  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ['start end', 'end start'],
  })
  const circleScale = useTransform(
    scrollYProgress,
    [0, 1],
    [0.25, isMobile ? 0.4 : 10]
  )

  const cardsX = useTransform(
    scrollYProgress,
    [0.4, 0.75],
    [100, -(scrollWidth - containerWidth) - 100]
  )

  const headerY = useTransform(scrollYProgress, [0, 0.2, 0.33], [400, 200, 0])
  const headerOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.25],
    [0, 0.75, 1]
  )
  const cardsOpacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1])
  const cardsY = useTransform(scrollYProgress, [0, 0.2, 0.33], [300, 150, 0])

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    console.log('Page Scroll:', latest)
  })

  return (
    <motion.section
      className='overflow-x-clip relative w-full z-20'
      ref={mainRef}
      style={{
        height: scrollHeight,
      }}
    >
      {/*circle that expands*/}
      <motion.div
        className='absolute top-0 left-1/4 justify-center flex items-center will-change-transform bg-white rounded-full'
        style={{ scale: circleScale, width: '85vh', height: '85vh' }}
      />

      <div
        className='h-screen w-screen flex flex-col justify-between items-center py-8 2xl:py-40'
        style={{
          position: 'sticky',
          top: 0,
        }}
      >
        <motion.h1
          className='text-black text-4xl md:text-8xl font-bold'
          style={{ y: headerY, opacity: headerOpacity }}
        >
          6 Segment Series
        </motion.h1>

        <motion.div
          ref={containerRef}
          className='relative w-full'
          style={{ opacity: cardsOpacity, y: cardsY }}
        >
          <motion.div
            ref={cardsRef}
            className='flex gap-8 px-8 w-fit'
            style={{ x: cardsX, willChange: 'transform' }}
          >
            {segments.map((segment, index) => (
              <SegmentCard key={index} segment={segment} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

const SegmentCard = ({ segment }) => {
  return (
    <div
      className='p-1 rounded-2xl overflow-hidden'
      style={{
        background: 'linear-gradient(150deg, #007fcf, #f56b0d)',
      }}
    >
      <div
        className='relative w-96 overflow-hidden rounded-lg md:rounded-2xl'
        style={{ aspectRatio: '0.85/1' }}
      >
        {segment.bgImage ? (
          <img
            src={segment.bgImage}
            alt={`${segment.title}-bgImage`}
            className='absolute inset-0 w-full h-full object-cover object-center'
          />
        ) : (
          <div className='absolute inset-0 bg-gray-900' />
        )}
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10' />
        <div className='absolute bottom-0 left-0 p-2 text-white z-20'>
          <h4 className='text-xl sm:text-xl font-bold mb-1'>{segment.title}</h4>
        </div>
      </div>
    </div>
  )
}

export default CircleRevealSection
