import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'motion/react'
import StaggeredCard from '../../../motion/StaggerCard'

const reasons = [
  { number: 1, text: 'Network with 1000+ Global Innovators' },
  { number: 2, text: 'Access ₹500Cr+ Investment Pool' },
  { number: 3, text: 'Learn from 50+ Industry Leaders' },
  { number: 4, text: 'Showcase to International VCs' },
  { number: 5, text: 'Build Strategic Partnerships' },
]

const WhyAttendSection = () => {
  const outerRef = useRef(null)
  const containerRef = useRef(null)
  const cardsRef = useRef(null)

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

      const totalScrollDistance = scrollW - containerW
      setScrollHeight(window.innerHeight * 1.5 + totalScrollDistance)
    }

    updateMeasurements()
    window.addEventListener('resize', updateMeasurements)
    return () => window.removeEventListener('resize', updateMeasurements)
  }, [])

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end start'],
  })

  const headingOpacity = useTransform(scrollYProgress, [0, 0.5, 0.7], [1, 1, 0])
  const headerY = useTransform(scrollYProgress, [0, 0.5, 0.7], [0, 0, -160])

  const gradientOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 0.2])
  const gradientBlur = useTransform(
    scrollYProgress,
    [0, 1],
    ['blur(70px)', 'blur(100px)']
  )

  const cardsX = useTransform(
    scrollYProgress,
    [0, 0.75],
    [600, -(scrollWidth - containerWidth) - 300]
  )

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 1])

  return (
    <motion.div
      className='relative w-full bg-black'
      ref={outerRef}
      style={{
        height: scrollHeight,
        opacity: opacity,
        willChange: 'transform',
      }}
    >
      <motion.div
        style={{
          opacity: gradientOpacity,
          filter: gradientBlur,
          transformOrigin: 'center',
          transform: 'translateY(-80%)',
          willChange: 'transform',
        }}
        className='absolute custom-gradient custom-size rounded-full'
      />

      <div
        className='h-screen flex flex-col justify-center items-center md:gap-28 xl:gap-44 2xl:gap-60 overflow-hidden'
        style={{
          position: 'sticky',
          top: 0,
        }}
      >
        <div className='relative h-fit w-full z-10'>
          <div className='w-full text-center'>
            <motion.h1
              style={{
                opacity: headingOpacity,
                y: headerY,
                willChange: 'transform',
              }}
              className='text-white will-change-transform text-6xl md:text-9xl mix-blend-lighten gradient-text-attend mt-10'
            >
              Why Attend
            </motion.h1>
          </div>
        </div>

        <div ref={containerRef} className='relative z-10 w-full'>
          <motion.div
            ref={cardsRef}
            style={{ x: cardsX, willChange: 'transform' }}
            className='flex gap-8 md:gap-20 2xl:gap-32 px-8 w-fit'
          >
            {reasons.map((reason, index) => (
              <StaggeredCard key={index} index={index}>
                <WhyAttendCard
                  key={index}
                  number={reason.number}
                  text={reason.text}
                />
              </StaggeredCard>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

const WhyAttendCard = ({ number, text, className }) => {
  return (
    <div
      className={`flex flex-col justify-between p-6 border border-white/20 border-solid bg-black/15 backdrop-blur-sm rounded-lg aspect-square w-40 md:w-80 md:h-80 2xl:w-96 2xl:h-96 flex-shrink-0 ${className}`}
    >
      <p className='text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-bold gradient-text leading-tight mb-1'>
        {number.toString().padStart(2, '0')}
      </p>
      <p className='text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold uppercase leading-tight text-white/90'>
        {text}
      </p>
    </div>
  )
}

export default WhyAttendSection
