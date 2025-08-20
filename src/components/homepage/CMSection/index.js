import React from 'react'
import CM from '../../../assets/CM.png'
import CMbg from '../../../assets/CMbg.svg?url'
import { motion, useTransform } from 'motion/react'

export default function CMSection({ scrollYProgress, isMobile }) {
  const wholeScale = !isMobile
    ? useTransform(scrollYProgress, [0, 0.1, 0.15], [0.8, 0.8, 1])
    : 1

  const wholeY = !isMobile
    ? useTransform(scrollYProgress, [0.3, 0.35, 0.4], [0, -40, -160])
    : 0

  const borderRadius = !isMobile
    ? useTransform(
        scrollYProgress,
        [0, 0.19, 0.39, 0.45],
        ['1.25rem', '1.25rem', '0rem', '0rem']
      )
    : '0rem'

  const innerBorderRadius = !isMobile
    ? useTransform(
        scrollYProgress,
        [0, 0.19, 0.38],
        ['1.5rem', '1.5rem', '0.75rem']
      )
    : '1.5rem'

  return (
    <motion.div
      style={{
        background:
          'linear-gradient(148.59deg, #0055FF 2.92%, #07BCCE 23.28%, #F7750C 80.11%, #FF0000 97.63%)',
        borderRadius: borderRadius,
        scale: wholeScale,
        transformOrigin: 'top center',
      }}
      className='sticky top-0 overflow-hidden w-full h-svh z-10 p-2'
    >
      <section
        className='cm-cont h-full w-full bg-white z-20 flex  flex-col-reverse md:flex-row rounded items-center justify-end md:justify-center overflow-hidden text-black px-4 will-change-transform'
        style={{
          backgroundImage: `url(${CMbg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: innerBorderRadius,
        }}
      >
        {/* Text Section */}
        <div className='flex flex-col items-start justify-center w-full md:w-1/2 space-y-1 px-4 md:px-6 text-left mb-4 md:mb-0'>
          <p className='text-base md:text-4xl'>
            “The government is focusing on{' '}
            <b>Integrated Industrial Development</b> in the State, and the
            contribution of StartupTN to this effort is significant. StartupTN’s
            activities align perfectly with the State Government’s initiatives
            to make <b>Tamil Nadu</b> the{' '}
            <span className='animate-floatUpBounce bg-gradient-to-r from-blue-500 to-blue-200 text-black px-2 py-0.5 rounded-md'>
              Number One State
            </span>{' '}
            in all fields.”
          </p>
          <span className='font-semibold text-lg md:text-3xl'>
            - Thiru. M.K. Stalin
          </span>
          <span className='text-sm md:text-xl !mt-0'>
            Hon'ble Chief Minister <br /> Government of Tamil Nadu
          </span>
        </div>

        {/* Image Section */}
        <div className='w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center mt-20 md:mt-0'>
          <img
            alt='Chief Minister'
            src={CM}
            className='h-[40%] max-w-3xl max-h-72 md:max-h-full object-contain object-center z-10'
          />
        </div>
      </section>
    </motion.div>
  )
}
