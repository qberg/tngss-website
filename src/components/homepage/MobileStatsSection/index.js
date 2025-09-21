'use client'
import { useMemo, useRef } from 'react'
import useCounterAnimation from '../../../hooks/useCounterAnimation'
import '../../Elements/custom.css'
import BG from '../../../assets/statsbg.svg?url'
import { motion } from 'motion/react'

const MobileStatsSection = ({ isSticky = true }) => {
  const contentRef = useRef(null)
  const counterRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ]

  // Create fallback motion value

  const data = useMemo(
    () => [
      { count: 50, tag: 'Global Startups Stakeholders' },
      { count: 30000, tag: 'Attendees' },
      { count: 50, tag: 'Showcasing Power Brands Of TN' },
      { count: 150, tag: 'International & National Speakers' },
      { count: 750, tag: 'Stalls' },
      { count: 75, tag: 'Incubations Participation' },
      { count: 10, tag: 'Unicorns/ Soonicorns' },
      { count: 100, tag: 'Investors Participation' },
      { count: 150, tag: 'Student Startups Showcasing' },
      { count: 100, tag: 'Investment Commitment', suffix: 'Crore' },
      { count: 500, tag: 'Speed Meetings With Investors/ Mentors' },
      { count: 100, tag: 'Partner Events' },
    ],
    []
  )

  useCounterAnimation(
    data.map((item, index) => ({
      ref: counterRefs[index],
      end: item.count,
      suffix: item.suffix,
    }))
  )

  return (
    <motion.section
      ref={contentRef}
      style={{
        background:
          'linear-gradient(148.59deg, #0055FF 2.92%, #07BCCE 23.28%, #F7750C 80.11%, #FF0000 97.63%)',
      }}
      className={`overflow-hidden ${
        isSticky ? 'sticky top-0' : 'relative'
      } w-full h-svh z-10 p-2 mt-24 bg-transparent`}
      id='stats-section'
    >
      <div
        className='flex flex-col lg:flex-row items-center justify-center gap-3 bg-white w-full h-full lg:h-full relative px-3 py-6'
        style={{
          borderRadius: '25px',
          background: `url(${BG})`,
        }}
      >
        {/* Mobile Title */}
        <div className='block lg:hidden text-center mb-4 w-full'>
          <p className='text-black text-3xl sm:text-xl md:text-2xl font-semibold px-2'>
            Grow With A Dynamic Community
          </p>
        </div>
        {/* Stats Grid */}
        <div className='grid grid-cols-2 gap-x-4 gap-y-4 sm:gap-x-6 sm:gap-y-6 lg:grid-cols-3 lg:gap-x-16 lg:gap-y-12 z-10 max-w-4xl w-full'>
          {data.map((item, index) => (
            <div
              key={index}
              className='flex flex-col items-center lg:items-start text-center lg:text-left'
            >
              <p
                ref={counterRefs[index]}
                className='text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-bold gradient-text leading-tight mb-1'
              >
                0{item.suffix ? ` ${item.suffix}` : '+'}
              </p>
              <p className='text-black text-[8px] sm:text-xs md:text-sm lg:text-base xl:text-lg leading-tight px-1'>
                {item.tag}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default MobileStatsSection
