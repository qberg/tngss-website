import { motion } from 'motion/react'

const NewFilterDropdownRadioGroup = ({ children, className = '' }) => {
  return (
    <div
      className={`${className} flex flex-col gap-2`}
      role='radiogroup'
      data-slot='filter-dropdown-radio-group'
    >
      {children}
    </div>
  )
}

const NewFilterDropdownRadioItem = ({
  value,
  selectedValue,
  onChange,
  children,
  count,
  className = '',
}) => {
  const isSelected = selectedValue === value

  const handleChange = () => {
    onChange?.(value)
  }

  return (
    <motion.label
      whileHover={{
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        transition: { type: 'spring', stiffness: 400, damping: 25 },
      }}
      whileTap={{
        scale: 0.97,
        transition: { type: 'spring', stiffness: 400, damping: 25 },
      }}
      className={`flex items-center justify-between pl-3 py-1.5 rounded-lg cursor-pointer group ${className}`}
      data-slot='filter-dropdown-radio-item'
    >
      <div className='flex items-center space-x-3'>
        {/* Custom Radio Button */}
        <div className='relative'>
          {/* Hidden native input for accessibility */}
          <input
            type='radio'
            value={value}
            checked={isSelected}
            onChange={handleChange}
            className='sr-only'
          />
          {/* Custom radio design */}
          <motion.div
            animate={{
              backgroundColor: isSelected ? '#18BFDB' : 'transparent',
              borderColor: isSelected ? '#18BFDB' : 'rgba(255, 255, 255, 0.4)',
              scale: isSelected ? 1.05 : 1,
              transition: {
                type: 'spring',
                stiffness: 400,
                damping: 25,
                mass: 0.6,
              },
            }}
            className='w-5 h-5 rounded-full border-2 flex items-center justify-center'
          >
            {/* Inner dot when selected */}
            <motion.div
              animate={{
                scale: isSelected ? 1 : 0,
                opacity: isSelected ? 1 : 0,
                transition: {
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                  mass: 0.4,
                },
              }}
              className='w-2 h-2 bg-white rounded-full'
            />
          </motion.div>
        </div>

        {/* Option Label */}
        <motion.span
          animate={{
            color: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
            transition: { type: 'spring', stiffness: 300, damping: 20 },
          }}
          className='text-base font-medium select-none'
        >
          {children}
        </motion.span>
      </div>

      {/* Optional Count Badge */}
      {count !== undefined && (
        <motion.span
          initial={{ scale: 0.9, opacity: 0.7 }}
          animate={{
            scale: 1,
            opacity: 1,
            transition: { type: 'spring', stiffness: 300, damping: 20 },
          }}
          className='text-xs text-theme-blue bg-bg-gray px-2 py-1 rounded-full font-medium flex items-center'
        >
          {count}
        </motion.span>
      )}
    </motion.label>
  )
}

export { NewFilterDropdownRadioGroup, NewFilterDropdownRadioItem }
