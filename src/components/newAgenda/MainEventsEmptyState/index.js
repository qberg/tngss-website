import { Calendar } from 'lucide-react'
import {
  fadeInUp,
  snappySpring,
  springConfig,
} from '../../speakers/SpeakersListing/variants'

import { motion } from 'motion/react'

const MainEventsEmptyState = ({ onResetFilters }) => {
  return (
    <motion.div className='text-center py-4' {...fadeInUp}>
      <motion.div
        className='bg-gray-900/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'
        initial={{ scale: 0, rotate: -180 }}
        animate={{
          scale: 1,
          rotate: 0,
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
            mass: 0.8,
          },
        }}
        whileHover={{
          scale: 1.1,
          rotate: 10,
          transition: snappySpring,
        }}
      >
        <Calendar size={24} className='text-gray-500' />
      </motion.div>

      <motion.h3
        className='text-gray-300 text-lg font-medium mb-2'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfig, delay: 0.1 }}
      >
        No events found
      </motion.h3>

      <motion.p
        className='text-gray-500'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfig, delay: 0.2 }}
      >
        No events match the selected filter criteria.
      </motion.p>

      {/* Animated suggestion */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfig, delay: 0.3 }}
        className='mt-6'
      >
        <motion.button
          onClick={onResetFilters}
          className='text-white hover:text-theme-blue transition-colors underline'
          whileHover={{
            scale: 1.05,
            transition: snappySpring,
          }}
          whileTap={{
            scale: 0.95,
            transition: snappySpring,
          }}
        >
          Reset All Filters
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default MainEventsEmptyState
