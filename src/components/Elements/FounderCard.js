import { motion } from 'motion/react'

const FounderCard = ({ children, className = '' }) => {
  return (
    <motion.div
      className={`${className} overflow-hidden rounded-lg md:rounded-xl`}
      style={{
        background: 'linear-gradient(150deg, #007fcf, #f56b0d)',
        padding: '1px',
      }}
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
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
    >
      <div className='relative w-full h-full bg-black overflow-hidden rounded-lg md:rounded-xl flex flex-col p-4 md:p-9 gap-3'>
        {children}
      </div>
    </motion.div>
  )
}

const FounderCardRow = ({ children, className }) => {
  return (
    <div className={`${className} flex flex-row gap-3 md:gap-8`}>
      {children}
    </div>
  )
}

export { FounderCard, FounderCardRow }
