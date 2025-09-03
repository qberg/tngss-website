import useMeasure from 'react-use-measure'
import {
  gentleSpring,
  smoothSpring,
  snappySpring,
  springConfig,
} from './variants'

import { motion, AnimatePresence } from 'motion/react'
import { Check, ChevronDown, Search, X } from 'lucide-react'

export const MobileFilterSection = ({ title, isOpen, onToggle, children }) => {
  const [ref, bounds] = useMeasure()

  return (
    <div className='bg-white/5 rounded-2xl border border-white/10 overflow-hidden'>
      <motion.button
        onClick={onToggle}
        className='w-full p-4 flex justify-between items-center focus:outline-none'
        whileHover={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          transition: snappySpring,
        }}
        whileTap={{
          scale: 0.98,
          transition: snappySpring,
        }}
      >
        <p className='text-lg text-white font-semibold'>{title}</p>
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
          className='text-white/70'
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>

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
                className='px-4 pb-4'
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

// Mobile Radio Option Component
export const MobileRadioOption = ({
  value,
  label,
  selected,
  onChange,
  count,
}) => (
  <motion.label
    whileHover={{
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      transition: snappySpring,
    }}
    whileTap={{
      scale: 0.98,
      transition: snappySpring,
    }}
    className='flex items-center justify-between p-2 rounded-xl cursor-pointer bg-white/3 border border-white/5'
  >
    <div className='flex items-center space-x-4'>
      <div className='relative'>
        <input
          type='radio'
          value={value}
          checked={selected}
          onChange={() => onChange(value)}
          className='sr-only'
        />
        <motion.div
          animate={{
            backgroundColor: selected ? '#18BFDB' : 'transparent',
            borderColor: selected ? '#18BFDB' : 'rgba(255, 255, 255, 0.3)',
            scale: selected ? 1.05 : 1,
            transition: {
              type: 'spring',
              stiffness: 400,
              damping: 25,
              mass: 0.6,
            },
          }}
          className='w-6 h-6 rounded-full border-2'
        >
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
      <motion.span
        animate={{
          color: selected ? '#ffffff' : 'rgba(255, 255, 255, 0.8)',
          transition: smoothSpring,
        }}
        className='text-base font-medium'
      >
        {label}
      </motion.span>
    </div>
    {count !== undefined && (
      <motion.span
        initial={{ scale: 0.9, opacity: 0.7 }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: gentleSpring,
        }}
        className='text-sm text-white/60 bg-white/10 px-3 py-1 rounded-full font-medium'
      >
        {count}
      </motion.span>
    )}
  </motion.label>
)

// Mobile Checkbox Option Component
export const MobileCheckboxOption = ({ label, selected, onChange, count }) => (
  <motion.label
    whileHover={{
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      transition: snappySpring,
    }}
    whileTap={{
      scale: 0.98,
      transition: snappySpring,
    }}
    className='flex items-center justify-between p-4 rounded-xl cursor-pointer bg-white/3 border border-white/5'
  >
    <div className='flex items-center space-x-4'>
      <div className='relative'>
        <input
          type='checkbox'
          checked={selected}
          onChange={onChange}
          className='sr-only'
        />
        <motion.div
          animate={{
            backgroundColor: selected ? '#18BFDB' : 'transparent',
            borderColor: selected ? '#18BFDB' : 'rgba(255, 255, 255, 0.3)',
            transition: {
              type: 'spring',
              stiffness: 400,
              damping: 25,
              mass: 0.6,
            },
          }}
          className='w-6 h-6 rounded-md border-2 flex items-center justify-center'
        >
          <motion.div
            animate={{
              scale: selected ? 1 : 0,
              opacity: selected ? 1 : 0,
              rotate: selected ? 0 : 180,
              transition: {
                type: 'spring',
                stiffness: 500,
                damping: 30,
                mass: 0.4,
              },
            }}
          >
            <Check size={14} className='text-white' />
          </motion.div>
        </motion.div>
      </div>
      <motion.span
        animate={{
          color: selected ? '#ffffff' : 'rgba(255, 255, 255, 0.8)',
          transition: smoothSpring,
        }}
        className='text-base font-medium'
      >
        {label}
      </motion.span>
    </div>
    {count !== undefined && (
      <motion.span
        initial={{ scale: 0.9, opacity: 0.7 }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: gentleSpring,
        }}
        className='text-sm text-white/60 bg-white/10 px-3 py-1 rounded-full font-medium'
      >
        {count}
      </motion.span>
    )}
  </motion.label>
)

// Desktop Filter Dropdown Component (unchanged)
export const FilterDropdown = ({ title, isOpen, onToggle, children }) => {
  const [ref, bounds] = useMeasure()

  return (
    <div>
      <motion.button
        onClick={onToggle}
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
          className='text-white/70 group-hover:text-white'
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.button>

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

export const RadioOption = ({ value, label, selected, onChange, count }) => (
  <motion.label
    whileHover={{
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      transition: snappySpring,
    }}
    whileTap={{
      scale: 0.97,
      transition: snappySpring,
    }}
    className='flex items-center justify-between p-3 rounded-lg cursor-pointer group'
  >
    <div className='flex items-center space-x-3'>
      <div className='relative'>
        <input
          type='radio'
          value={value}
          checked={selected}
          onChange={() => onChange(value)}
          className='sr-only'
        />
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
          className='w-5 h-5 rounded-full border-2'
        >
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
      <motion.span
        animate={{
          color: selected ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
          transition: smoothSpring,
        }}
        className='text-sm font-medium'
      >
        {label}
      </motion.span>
    </div>
    {count !== undefined && (
      <motion.span
        initial={{ scale: 0.9, opacity: 0.7 }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: gentleSpring,
        }}
        className='text-xs text-white/50 bg-white/10 px-2 py-1 rounded-full'
      >
        {count}
      </motion.span>
    )}
  </motion.label>
)

export const CheckboxOption = ({ label, selected, onChange, count }) => (
  <motion.label
    whileHover={{
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      transition: snappySpring,
    }}
    whileTap={{
      scale: 0.97,
      transition: snappySpring,
    }}
    className='flex items-center justify-between p-3 rounded-lg cursor-pointer group'
  >
    <div className='flex items-center space-x-3'>
      <div className='relative'>
        <input
          type='checkbox'
          checked={selected}
          onChange={onChange}
          className='sr-only'
        />
        <motion.div
          animate={{
            backgroundColor: selected ? '#18BFDB' : 'transparent',
            borderColor: selected ? '#18BFDB' : 'rgba(255, 255, 255, 0.4)',
            scale: selected ? 1 : 1,
            transition: {
              type: 'spring',
              stiffness: 400,
              damping: 25,
              mass: 0.6,
            },
          }}
          className='w-5 h-5 rounded border-2 flex items-center justify-center'
        >
          <motion.div
            animate={{
              scale: selected ? 1 : 0,
              opacity: selected ? 1 : 0,
              rotate: selected ? 0 : 180,
              transition: {
                type: 'spring',
                stiffness: 500,
                damping: 30,
                mass: 0.4,
              },
            }}
          >
            <Check size={12} className='text-white' />
          </motion.div>
        </motion.div>
      </div>
      <motion.span
        animate={{
          color: selected ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
          transition: smoothSpring,
        }}
        className='text-sm font-medium'
      >
        {label}
      </motion.span>
    </div>
    {count !== undefined && (
      <motion.span
        initial={{ scale: 0.9, opacity: 0.7 }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: gentleSpring,
        }}
        className='text-xs text-white/50 bg-white/10 px-2 py-1 rounded-full'
      >
        {count}
      </motion.span>
    )}
  </motion.label>
)

export const SearchBar = ({ value, onChange, onClear, placeholder }) => {
  const handleInputChange = (e) => {
    onChange(e.target.value)
  }

  const handleClearClick = () => {
    onChange('')
    onClear?.()
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={springConfig}
      whileHover={{
        scale: 1.02,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        transition: snappySpring,
      }}
      whileFocus={{
        scale: 1.02,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        transition: snappySpring,
      }}
      className='w-full md:w-96 border-white/30 border-2 border-solid relative rounded-full flex items-center justify-between p-3 md:p-4 bg-white/5 backdrop-blur-sm'
    >
      <div className='inline-flex gap-3 flex-1'>
        <motion.div
          animate={{
            scale: value ? 1.1 : 1,
            color: value ? '#18BFDB' : 'rgba(255, 255, 255, 0.7)',
            transition: snappySpring,
          }}
        >
          <Search size={24} className='mt-0.5' />
        </motion.div>
        <input
          type='text'
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          className='text-xl text-white placeholder-white/50 w-full focus:outline-none bg-transparent'
        />
      </div>
      <AnimatePresence>
        {value && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
              transition: {
                type: 'spring',
                stiffness: 400,
                damping: 25,
                mass: 0.5,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
              rotate: 90,
              transition: {
                type: 'spring',
                stiffness: 500,
                damping: 30,
                mass: 0.4,
              },
            }}
            whileHover={{
              scale: 1.2,
              rotate: 90,
              transition: snappySpring,
            }}
            whileTap={{
              scale: 0.9,
              transition: snappySpring,
            }}
            onClick={handleClearClick}
            aria-label='Clear Search'
            className='text-white/70 hover:text-white ml-2'
          >
            <X size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
