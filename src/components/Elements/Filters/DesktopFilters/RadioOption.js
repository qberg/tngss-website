import React from 'react'
import { motion } from 'motion/react'
import { useFilters } from '../FilterProvider'
import {
  gentleSpring,
  smoothSpring,
  snappySpring,
} from '../../../../motion/Springs'

const RadioOption = ({ filterKey, value, label, count, className = '' }) => {
  const { filters, updateFilter } = useFilters()
  const selected = filters[filterKey] === value

  const handleChange = () => {
    updateFilter(filterKey, value, false)
  }

  return (
    <motion.label
      whileHover={{
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        transition: snappySpring,
      }}
      whileTap={{
        scale: 0.97,
        transition: snappySpring,
      }}
      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer group ${className}`}
    >
      <div className='flex items-center space-x-3'>
        {/* Custom Radio Button */}
        <div className='relative'>
          {/* Hidden native input for accessibility */}
          <input
            type='radio'
            value={value}
            checked={selected}
            onChange={handleChange}
            className='sr-only'
            name={filterKey}
          />

          {/* Custom radio button design */}
          <motion.div
            animate={{
              backgroundColor: selected ? '#18BFDB' : 'transparent',
              borderColor: selected ? '#18BFDB' : 'rgba(255, 255, 255, 0.4)',
              scale: selected ? 1.05 : 1,
              transition: {
                type: 'spring',
                stiffness: 400,
                damping: 25,
                mass: 0.6,
              },
            }}
            className='w-5 h-5 rounded-full border-2 relative'
          >
            {/* Inner dot when selected */}
            <motion.div
              animate={{
                scale: selected ? 1 : 0,
                opacity: selected ? 1 : 0,
                transition: {
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                  mass: 0.4,
                },
              }}
              className='absolute inset-1 bg-white rounded-full'
            />
          </motion.div>
        </div>

        {/* Option Label */}
        <motion.span
          animate={{
            color: selected ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
            transition: smoothSpring,
          }}
          className='text-sm font-medium select-none'
        >
          {label}
        </motion.span>
      </div>

      {/* Optional Count Badge */}
      {count !== undefined && (
        <motion.span
          initial={{ scale: 0.9, opacity: 0.7 }}
          animate={{
            scale: 1,
            opacity: 1,
            transition: gentleSpring,
          }}
          className='text-xs text-white/50 bg-white/10 px-2 py-1 rounded-full font-medium'
        >
          {count}
        </motion.span>
      )}
    </motion.label>
  )
}

export default RadioOption
