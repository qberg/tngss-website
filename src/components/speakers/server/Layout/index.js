import { motion } from 'motion/react'

const SpeakerCardWrapper = ({ children, className = '', slug = '' }) => {
  return (
    <motion.a
      href={`/speakers/${slug}`}
      className={`${className} w-full h-64 md:h-96`}
      initial={{
        opacity: 0,
        y: 30,
        scale: 0.95,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.05,
        margin: '-25px',
      }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: {
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      }}
      layout
      layoutId={`speaker-${slug}`}
    >
      {children}
    </motion.a>
  )
}

export default SpeakerCardWrapper
