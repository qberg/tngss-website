import { useState } from 'react'
import { motion } from 'motion/react'

import logo from '../../../assets/tngss-dark.jpeg'
import { Store } from 'lucide-react'
import SkeletonPulse from '../../Elements/Loaders/SkeletonPulse'

const ExhibitorCard = ({ children, className, delay = 0 }) => {
  return (
    <motion.div
      className={`${className} overflow-hidden rounded-lg md:rounded-xl w-full h-full`}
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
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94], // iOS-like cubic bezier easing
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
      <div className='relative w-full h-full bg-black overflow-hidden rounded-lg md:rounded-xl flex flex-col p-4 gap-3'>
        {children}
      </div>
    </motion.div>
  )
}

const StallInfoWrapper = ({ children, className }) => {
  return (
    <div className={`${className} gap-3 md:gap-2 md:gap-x-8 grid grid-cols-2`}>
      {children}
    </div>
  )
}

const InfoBadge = ({
  label,
  icon: Icon = Store,
  iconColor = 'text-theme-blue',
  className = '',
}) => {
  return (
    <div
      className={`${className} text-sm font-montserrat font-medium flex flex-row gap-1 items-center`}
    >
      <Icon size={14} className={iconColor} />
      <span>{label}</span>
    </div>
  )
}

const ExhibitorCardRow = ({ children, className }) => {
  return (
    <div
      className={`${className} flex flex-row gap-2 md:gap-4 items-center flex-wrap`}
    >
      {children}
    </div>
  )
}

const ExhibitorLogo = ({ src, alt, className, skeleton = false }) => {
  const [imageError, setImageError] = useState(false)

  if (skeleton) {
    return (
      <div
        className={`${className} relative w-full h-44 md:h-36 2xl:h-40 overflow-hidden rounded-md md:rounded-lg bg-white p-2`}
      >
        <SkeletonPulse className='w-full h-full rounded' />
      </div>
    )
  }

  const imageSrc = !src || imageError ? logo : src
  const imageAlt = !src || imageError ? 'StartupTN Logo' : alt
  const padding = !src || imageError ? 'p-1' : 'p-2'

  return (
    <div
      className={`${className} relative w-full h-44 md:h-36 2xl:h-40 overflow-hidden rounded-md md:rounded-lg bg-white ${padding}`}
    >
      <div className='relative w-full h-full'>
        <img
          src={imageSrc}
          alt={imageAlt}
          className='absolute inset-0 w-full h-full object-contain object-center'
          onError={() => setImageError(true)}
          loading='lazy'
        />
      </div>
    </div>
  )
}

const ExhibitorCardTitle = ({ children, className, skeleton = false }) => {
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
      className={`${className} font-bold font-urbanist text-white text-lg md:text-xl h-8 md:h-16 2xl:h-16`}
      style={{
        lineHeight: '120%',
      }}
    >
      {children}
    </h3>
  )
}

const ExhibitorCardDescription = ({ children, className }) => {
  return (
    <div
      className={`${className} text-lg text-left font-normal opacity-90 overflow-hidden`}
      style={{
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        lineHeight: '120%',
      }}
    >
      {children}
    </div>
  )
}

export {
  ExhibitorCard,
  ExhibitorLogo,
  ExhibitorCardTitle,
  ExhibitorCardDescription,
  ExhibitorCardRow,
  StallInfoWrapper,
  InfoBadge,
}
