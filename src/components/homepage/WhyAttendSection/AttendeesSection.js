import React from 'react'
import { motion, useInView, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import useIsMobile from '../../../hooks/useIsMobile'
import FlippingCard from '../../Elements/FlippingCard'
import GradientBdrCard from '../../Elements/GradientBorderCard'

export default function AtendeesSection({ data }) {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' })
  const isMobile = useIsMobile()

  // Scroll-based animation setup
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end center'],
  })

  // Transform scroll progress to animation values
  const sectionY = useTransform(scrollYProgress, [0, 1], [50, 0])
  const sectionScale = useTransform(scrollYProgress, [0, 1], [0.95, 1])

  if (!data) {
    return null
  }

  // Animation variants for cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: (index) => ({
      y: isMobile ? (index % 2 === 0 ? -50 : 50) : index % 2 === 0 ? -100 : 50,
      scale: 0.96,
      opacity: 0,
      rotateX: -10,
    }),
    visible: {
      y: 0,
      scale: 1,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
        duration: 0.8,
      },
    },
    hover: {
      scale: 1.05,
      y: -10,
      rotateY: 5,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 200,
      },
    },
  }

  const cardHoverVariants = {
    rest: { scale: 1, rotateZ: 0 },
    hover: {
      scale: 1.02,
      rotateZ: (index) => (index % 2 === 0 ? 8 : -8),
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 300,
      },
    },
  }

  return (
    <motion.section
      ref={sectionRef}
      className='attendees-section flex flex-col w-screen min-h-screen justify-center items-center bg-black py-20 px-20 overflow-y-visible'
      style={{ y: sectionY, scale: sectionScale }}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      <motion.div
        className='flex max-md:flex-col isolate md:mr-14 mt-24 items-center md:gap-1'
        variants={containerVariants}
      >
        {data?.map((item, index) => (
          <motion.div
            key={index}
            className='mt-32 md:mt-0 hover:z-50 isolate'
            custom={index}
            variants={cardVariants}
            whileHover='hover'
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
          >
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
                  index % 2 === 0 ? 'rotate-6' : '-rotate-6'
                } rounded-2xl`}
              >
                {/* Front Face */}
                <motion.div
                  className='relative w-80 h-96 flex isolate rounded-2xl overflow-hidden'
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                >
                  <motion.img
                    src={item.background.url}
                    className='w-full h-full object-cover object-center absolute inset-0 radius-2xl gradient-border'
                    alt={item.title}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  />
                  <motion.div
                    className='pt-14 self-end bg-gradient-to-t from-black to-transparent'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  >
                    <motion.p
                      className='text-2xl font-semibold absolute bottom-[20px] left-[20px]'
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                    >
                      {item.title}
                    </motion.p>
                  </motion.div>
                </motion.div>

                {/* Back Face */}
                <GradientBdrCard className='text-left w-80 h-96 rounded-2xl overflow-hidden bg-black'>
                  <motion.div
                    className='flex flex-col w-full h-full p-5 text-white'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <motion.p
                      className='text-3xl py-2'
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      {item.title}
                    </motion.p>
                    <motion.p
                      className='flex-1'
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    >
                      {item.description}
                    </motion.p>
                    <motion.p
                      className='mt-auto'
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                    >
                      {item.foot}
                    </motion.p>
                  </motion.div>
                </GradientBdrCard>
              </FlippingCard>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
