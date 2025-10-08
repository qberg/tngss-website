import { motion } from 'motion/react'
import SkeletonPulse from '../../Elements/Loaders/SkeletonPulse'

const MainEventCard = ({ children, className, delay = 0, href, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (href) {
      window.location.href = href
    }
  }
  return (
    <motion.div
      className={`${className} overflow-hidden rounded-lg md:rounded-xl w-full h-full`}
      style={{
        background: 'linear-gradient(150deg, #007fcf, #f56b0d)',
        padding: '1px',
      }}
      initial={{
        opacity: 0,
        y: 60,
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
        delay: delay,
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
      onClick={handleClick}
    >
      <div className='relative w-full h-full bg-black overflow-hidden rounded-lg md:rounded-xl flex flex-col p-6 justify-between gap-3 cursor-pointer'>
        {children}
      </div>
    </motion.div>
  )
}

const MainEventCardContent = ({ children, className = '' }) => {
  return <div className={`${className} flex flex-col gap-3`}>{children}</div>
}

const MainEventCardCardRow = ({ children, className }) => {
  return (
    <div
      className={`${className} flex flex-row gap-2 md:gap-4 items-center flex-wrap`}
    >
      {children}
    </div>
  )
}

const MainEventCardTitle = ({ children, className, skeleton = false }) => {
  if (skeleton) {
    return (
      <div className='space-y-2'>
        <SkeletonPulse className='w-3/4 h-6 rounded' />
        <SkeletonPulse className='w-1/2 h-6 rounded' />
      </div>
    )
  }

  return (
    <h3
      className={`${className} font-semibold font-urbanist text-white text-2xl md:text-3xl 2xl:text-4xl heading-height line-clamp-2`}
    >
      {children}
    </h3>
  )
}

const MainEventCardCta = ({ children, className = '' }) => {
  return <div className={`${className} flex justify-end`}>{children}</div>
}

export {
  MainEventCard,
  MainEventCardContent,
  MainEventCardCardRow,
  MainEventCardTitle,
  MainEventCardCta,
}
