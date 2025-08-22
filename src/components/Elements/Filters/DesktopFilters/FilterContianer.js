import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Filter } from 'lucide-react'
import { useFilters } from '../FilterProvider'

const gentleSpring = {
  type: 'spring',
  stiffness: 200,
  damping: 25,
  mass: 1,
}

const snappySpring = {
  type: 'spring',
  stiffness: 400,
  damping: 35,
  mass: 0.6,
}

const smoothSpring = {
  type: 'spring',
  stiffness: 250,
  damping: 28,
  mass: 0.9,
}

const springConfig = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 0.8,
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: springConfig,
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
      mass: 0.5,
    },
  },
}

const DesktopFilterContainer = ({
  children,
  className = '',
  title = 'Filters',
}) => {
  const { hasActiveFilters, clearAllFilters } = useFilters()

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        ...gentleSpring,
        delay: 0.2,
      }}
      className={`hidden md:flex flex-col md:w-3/12 gap-8 ${className}`}
    >
      {/* Filter Header */}
      <motion.div
        whileHover={{
          scale: 1.02,
          transition: snappySpring,
        }}
        whileTap={{
          scale: 0.98,
          transition: snappySpring,
        }}
        className='w-full bg-bg-gray px-4 py-4 flex justify-between items-center rounded-2xl shadow-lg backdrop-blur-sm'
      >
        <p className='text-lg font-semibold text-white'>{title}</p>
        <Filter size={16} className='text-white' />
      </motion.div>

      <AnimatePresence>
        {hasActiveFilters && (
          <motion.button
            {...fadeInUp}
            onClick={clearAllFilters}
            whileHover={{
              scale: 1.05,
              transition: snappySpring,
            }}
            whileTap={{
              scale: 0.95,
              transition: snappySpring,
            }}
            className='text-sm text-theme-orange hover:text-theme-orange-40 underline self-start font-medium transition-colors duration-200'
          >
            Clear all filters
          </motion.button>
        )}
      </AnimatePresence>

      <motion.div
        className='flex flex-col gap-8'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          ...smoothSpring,
          delay: 0.3,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export default DesktopFilterContainer
