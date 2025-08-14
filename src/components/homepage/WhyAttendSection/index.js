import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'motion/react'
import StaggeredCard from '../../../motion/StaggerCard'
import CTAButton from '../../Elements/CTAButton'

const reasons = [
  {
    number: 1,
    title: 'Startups',
    text: 'Starting, building, or scaling your Startup? The Tamil Nadu Global Startup Summit 2025 is your launchpad to success.',
  },

  {
    number: 2,
    title: 'Investors',
    text: ' Discover high-potential startups and game-changing innovations at Tamil Nadu Global Startup Summit 2025.',
  },
  {
    number: 3,
    title: 'Aspirants',
    text: "Whether you're a student, aspiring entrepreneur, or young innovator, this is your chance to gain knowledge, find opportunities, and take the first step toward building something extraordinary.",
  },
  {
    number: 4,
    title: 'Corporates',
    text: 'Explore emerging innovations, engage with future-ready startups and collaborate for strategic growth opportunities.',
  },
  {
    title: 'Ecosystem Enablers',
    number: 5,
    text: ' Connect with global stakeholders, discover high-impact startups, and collaborate to strengthen the innovation ecosystem.',
  },
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
  const buttonY = useTransform(scrollYProgress, [0, 0.5, 0.7], [0, 0, -80])

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
        className='h-screen flex flex-col justify-center items-center md:gap-20 2xl:gap-48 overflow-hidden'
        style={{
          position: 'sticky',
          top: 0,
        }}
      >
        <div className='relative h-fit w-full z-10'>
          <div className='w-full text-center flex flex-col gap-2 2xl:gap-4 items-center justify-center'>
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

            <motion.div
              style={{
                opacity: headingOpacity,
                y: buttonY,
                willChange: 'transform',
              }}
            >
              <CTAButton
                src='/why-attend'
                className='rounded-2xl w-full md:w-auto mt-5'
              >
                <div className='w-60 h-12 px-6 flex items-center justify-center md:justify-center text-lg md:text-xl '>
                  Know More
                </div>
              </CTAButton>
            </motion.div>
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
                  title={reason.title}
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

const WhyAttendCard = ({ number, title, text, className }) => {
  return (
    <div
      className='p-1 rounded-lg overflow-hidden'
      style={{
        background: 'linear-gradient(150deg, #007fcf, #f56b0d)',
      }}
    >
      <div
        className={`flex flex-col justify-between p-6 border-solid bg-black backdrop-blur-sm rounded-lg aspect-square w-40 md:w-80 md:h-80 2xl:w-96 2xl:h-96 flex-shrink-0 ${className}`}
      >
        <div className='leading-tight mb-1'>
          <p className='font-semibold text-lg sm:text-xl md:text-2xl lg:text-2xl 2xl:text-4xl text-blue-400'></p>
          <p className='text-xl sm:text-2xl md:text-3xl lg:text-3xl 2xl:text-6xl font-bold gradient-text leading-tight mb-1'>
            {title}
          </p>
        </div>
        <p className='text-white opacity-90 text-[8px] sm:text-xs md:text-sm lg:text-base 2xl:text-lg leading-tight'>
          {text}
        </p>
      </div>
    </div>
  )
}

export default WhyAttendSection
