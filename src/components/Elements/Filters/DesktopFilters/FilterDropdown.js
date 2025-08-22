import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import useMeasure from 'react-use-measure'
import { useFilters } from '../FilterProvider'
import { snappySpring } from '../../../../motion/Springs'

const FilterDropdown = ({ filterKey, title, children, className = '' }) => {
  const { isDropdownOpen, toggleDropdown } = useFilters()
  const [ref, bounds] = useMeasure()

  const isOpen = isDropdownOpen(filterKey)

  return (
    <div className={className}>
      {/* Dropdown Header Button */}
      <motion.button
        onClick={() => toggleDropdown(filterKey)}
        className='border-b border-white/20 flex justify-between items-center pb-3 focus:outline-none w-full group'
        whileHover={{
          borderColor: 'rgba(255, 255, 255, 0.4)',
          transition: snappySpring,
        }}
        whileTap={{
          scale: 0.98,
          transition: snappySpring,
        }}
      >
        <p className='text-lg text-white font-medium'>{title}</p>

        {/* Animated Chevron */}
        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
            transition: {
              type: 'spring',
              stiffness: 350,
              damping: 30,
              mass: 0.7,
            },
          }}
          className='text-white/70 group-hover:text-white transition-colors duration-200'
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.button>

      {/* Collapsible Content Container */}
      <motion.div
        animate={{
          height: isOpen ? bounds.height : 0,
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 35,
            mass: 0.8,
          },
        }}
        className='overflow-hidden'
      >
        {/* Content Wrapper for Measurement */}
        <div ref={ref}>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: 'spring',
                    stiffness: 400,
                    damping: 30,
                    mass: 0.6,
                  },
                }}
                exit={{
                  opacity: 0,
                  y: 0,
                  transition: {
                    type: 'spring',
                    stiffness: 500,
                    damping: 40,
                    mass: 0.5,
                  },
                }}
                className='pt-4 pb-2'
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

export default FilterDropdown
