import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'motion/react'
import CTAButton from '../../Elements/CTAButton'
import FlippingCard from '../../Elements/FlippingCard'
import GradientBdrCard from '../../Elements/GradientBorderCard'

import Frame1 from '../../../assets/attendees/2.webp'
import Frame2 from '../../../assets/attendees/4.webp'
import Frame3 from '../../../assets/attendees/1.webp'
import Frame4 from '../../../assets/attendees/3.webp'
import Frame5 from '../../../assets/attendees/5.webp'

const data = [
  {
    img: Frame3,
    title: 'Startups',
    des: 'Starting, building, or scaling your Startup? The Tamil Nadu Global Startup Summit 2025 is your launchpad to success.',
    foot: 'Scale faster, network smarter, and fund your startup.',
  },
  {
    img: Frame1,
    title: 'Investors',
    des: 'Discover high-potential startups and game-changing innovations at Tamil Nadu Global Startup Summit 2025.',
    foot: 'Discover, connect, and invest in the next big startup.',
  },
  {
    img: Frame4,
    title: 'Aspirants',
    des: "Whether you're a student, aspiring entrepreneur, or young innovator, this is your chance to gain knowledge, find opportunities, and take the first step toward building something extraordinary.",
    foot: 'Your future starts here: network, learn, and grow.',
  },
  {
    img: Frame2,
    title: 'Corporates',
    des: 'Explore emerging innovations, engage with future-ready startups and collaborate for strategic growth opportunities.',
    foot: 'Collaborate and Transform',
  },
  {
    img: Frame5,
    title: 'Ecosystem Enablers',
    des: 'Connect with global stakeholders, discover high-impact startups, and collaborate to strengthen the innovation ecosystem.',
    foot: '',
  },
]

const MobileWhyAttendSection = () => {
  const outerRef = useRef(null)
  const cardsRef = useRef(null)

  const cardHoverVariants = {
    rest: { rotateZ: 0 },
    hover: {
      rotateZ: (index) => (index % 2 === 0 ? 3 : -3),
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 300,
      },
    },
  }

  return (
    <motion.div
      className='relative w-full bg-black h-auto md:h-screen z-20'
      ref={outerRef}
    >
      {/* Background Gradient */}
      <motion.div
        className='absolute custom-gradient custom-size rounded-full'
        style={{
          opacity: 0.5,
          filter: 'blur(100px)',
          transformOrigin: 'center',
          transform: 'translateY(-40%)',
          willChange: 'transform',
        }}
      />

      <div className='h-auto md:h-full flex flex-col justify-center items-center md:gap-20 2xl:gap-28 overflow-hidden'>
        {/* Header Section */}
        <div className='relative h-fit w-full z-10'>
          <div className='w-full text-center flex flex-col gap-2 2xl:gap-4 items-center justify-center'>
            <motion.h1 className='text-white will-change-transform text-6xl md:text-9xl mix-blend-lighten gradient-text-black mt-24 md:mt-10 2xl:mt-24'>
              Why Attend
            </motion.h1>

            <motion.div>
              <CTAButton
                src='/why-attend'
                className='hidden rounded-2xl w-full md:w-auto mt-5'
              >
                <div className='w-60 h-12 px-6 flex items-center justify-center md:justify-center text-lg md:text-xl'>
                  Know More
                </div>
              </CTAButton>
            </motion.div>
          </div>
        </div>

        {/* Flipping Cards Section */}
        <motion.div
          ref={cardsRef}
          className='relative z-20 w-full pt-4 pb-16 md:py-0 px-4 md:px-8 lg:px-16 flex-1 flex flex-col items-center justify-start'
        >
          <motion.div className='flex flex-col md:flex-row justify-center items-center gap-16 md:gap-4 2xl:gap-6 min-w-max mx-auto'>
            {data.map((item, index) => {
              return (
                <motion.div key={index} className='hover:z-50 isolate'>
                  <motion.div
                    className='will-change-transform'
                    variants={cardHoverVariants}
                    initial='rest'
                    whileHover='hover'
                    custom={index}
                  >
                    <FlippingCard
                      flipinvert
                      className={`${
                        index % 2 === 0 ? 'rotate-3' : '-rotate-3'
                      } rounded-2xl transform-gpu`}
                    >
                      {/* Front Face */}
                      <GradientBdrCard className='w-64 h-80 md:w-56 md:h-72 2xl:w-72 2xl:h-96 rounded-2xl overflow-hidden bg-black'>
                        <motion.div className='relative w-full h-full flex isolate rounded-2xl overflow-hidden'>
                          <motion.img
                            src={item.img}
                            className='w-full h-full object-cover object-center absolute inset-0 rounded-2xl'
                            alt={item.title}
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                          />
                          <motion.div
                            className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              duration: 0.6,
                              delay: index * 0.1 + 0.3,
                            }}
                          />
                          <motion.div
                            className='absolute bottom-0 left-0 right-0 p-6'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.6,
                              delay: index * 0.1 + 0.5,
                            }}
                          >
                            <motion.p
                              className='text-white text-xl md:text-2xl font-bold'
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.5,
                                delay: index * 0.1 + 0.7,
                              }}
                            >
                              {item.title}
                            </motion.p>
                          </motion.div>
                        </motion.div>
                      </GradientBdrCard>

                      {/* Back Face */}
                      <GradientBdrCard className='text-left w-64 h-80 md:w-56 md:h-72 2xl:w-72 2xl:h-96 rounded-2xl overflow-hidden bg-black'>
                        <motion.div
                          className='flex flex-col w-full h-full p-5 md:p-6 text-white'
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                        >
                          <motion.p
                            className='text-2xl 2xl:text-3xl font-bold py-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500'
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                          >
                            {item.title}
                          </motion.p>
                          <motion.p
                            className='flex-1 text-sm 2xl:text-base leading-tight text-gray-300'
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                          >
                            {item.des}
                          </motion.p>
                          {item.foot && (
                            <motion.p
                              className='mt-auto text-sm font-medium text-blue-400 border-t border-gray-700 pt-3'
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: 0.5 }}
                            >
                              {item.foot}
                            </motion.p>
                          )}
                        </motion.div>
                      </GradientBdrCard>
                    </FlippingCard>
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default MobileWhyAttendSection
