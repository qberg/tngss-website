import { useState, useRef, useEffect, createContext, useContext } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, ChevronDown, X } from 'lucide-react'

const CheckboxDropdownContext = createContext({
  isOpen: false,
  setIsOpen: () => {},
  selectedValues: [],
  onSelectionChange: () => {},
  options: [],
})

const CheckboxDropdown = ({
  children,
  selectedValues = '',
  onSelectionChange = () => {},
  options = [],
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const selectedArray = selectedValues
    ? selectedValues.split(',').filter(Boolean)
    : []

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const contextValue = {
    isOpen,
    setIsOpen,
    selectedValues: selectedArray,
    onSelectionChange,
    options,
    dropdownRef,
  }

  return (
    <CheckboxDropdownContext.Provider value={contextValue}>
      <div className='relative' ref={dropdownRef}>
        {children}
      </div>
    </CheckboxDropdownContext.Provider>
  )
}

const CheckboxDropdownLabel = ({ children, className = '' }) => {
  return (
    <motion.label
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`block text-sm font-medium text-gray-700 mb-2 ${className}`}
    >
      {children}
    </motion.label>
  )
}

const CheckboxDropdownTrigger = ({
  className = '',
  placeholder = 'Select options...',
  maxDisplayItems = 2,
  children,
}) => {
  const { isOpen, setIsOpen, selectedValues, onSelectionChange, options } =
    useContext(CheckboxDropdownContext)

  const getDisplayText = () => {
    if (selectedValues.length === 0) return placeholder
    if (selectedValues.length <= maxDisplayItems) {
      return selectedValues
        .map((slug) => options.find((opt) => opt.slug === slug)?.name)
        .filter(Boolean)
        .join(', ')
    }
    return `${selectedValues.length} selected`
  }

  const clearAll = (e) => {
    e.stopPropagation()
    onSelectionChange('')
  }

  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => setIsOpen(!isOpen)}
      className={`
        relative w-full px-6 py-3 text-left bg-black border-2  border-bg-gray 
        shadow-sm transition-all duration-200 flex items-center justify-between text-base
        ${isOpen ? 'shadow-md' : 'hover:shadow-md'} ${className}
      `}
      style={{
        borderRadius: '16px',
      }}
    >
      <span
        className={`truncate pr-2 ${
          selectedValues.length > 0 ? 'text-white' : 'text-white'
        }`}
      >
        {getDisplayText()}
      </span>

      <div className='flex items-center space-x-1 flex-shrink-0'>
        {/* Clear button */}
        {selectedValues.length > 0 && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={clearAll}
            className='p-1 rounded hover:bg-gray-100 transition-colors'
          >
            <X className='w-3 h-3 text-gray-400' />
          </motion.button>
        )}

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className='w-4 h-4 text-gray-400' />
        </motion.div>
      </div>
    </motion.button>
  )
}

const CheckboxDropdownContent = ({ className = '', children }) => {
  const { isOpen } = useContext(CheckboxDropdownContext)
  const contentRef = useRef(null)

  useEffect(() => {
    const handleWheel = (e) => {
      if (contentRef.current && contentRef.current.contains(e.target)) {
        // Prevent the page from scrolling when scrolling inside the dropdown
        e.stopPropagation()

        // Get the scrollable container (CheckboxDropdownItems)
        const scrollContainer = contentRef.current.querySelector(
          '[data-scroll-container]'
        )
        if (scrollContainer) {
          const { scrollTop, scrollHeight, clientHeight } = scrollContainer
          const isAtTop = scrollTop === 0
          const isAtBottom = scrollTop + clientHeight >= scrollHeight

          // Only prevent default if we're not at the boundaries or if we're scrolling in a direction that would stay within bounds
          if (!isAtTop && !isAtBottom) {
            e.preventDefault()
          } else if (isAtTop && e.deltaY < 0) {
            e.preventDefault()
          } else if (isAtBottom && e.deltaY > 0) {
            e.preventDefault()
          }
        }
      }
    }

    if (isOpen) {
      document.addEventListener('wheel', handleWheel, { passive: false })
    }

    return () => {
      document.removeEventListener('wheel', handleWheel)
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15, ease: 'easeInOut' }}
          className={`absolute z-50 w-full mt-2 bg-black border-2 border-bg-gray shadow-lg rounded-lg overflow-hidden ${className}`}
          style={{
            maxHeight: '256px',
            minHeight: '80px',
            borderRadius: '16px',
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const CheckboxDropdownHeader = ({
  className = '',
  children,
  showClearAll = true,
}) => {
  const { selectedValues, onSelectionChange } = useContext(
    CheckboxDropdownContext
  )

  if (selectedValues.length === 0) return null

  return (
    <div
      className={`px-3 py-2 bg-gray-50 border-b border-gray-100 flex items-center justify-between ${className}`}
    >
      <span className='text-xs text-black font-medium'>
        {selectedValues.length} selected
      </span>
      {showClearAll && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectionChange('')}
          className='text-xs text-red-600 hover:text-red-700 font-medium'
        >
          Clear all
        </motion.button>
      )}
      {children}
    </div>
  )
}

const CheckboxDropdownItem = ({ value, className = '', children }) => {
  const { selectedValues, onSelectionChange, options } = useContext(
    CheckboxDropdownContext
  )

  const isSelected = selectedValues.includes(value)

  const handleToggle = () => {
    let newSelection
    if (isSelected) {
      newSelection = selectedValues.filter((item) => item !== value)
    } else {
      newSelection = [...selectedValues, value]
    }
    onSelectionChange(newSelection.join(','))
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      className={`
        px-3 py-2 cursor-pointer transition-colors duration-150
         flex items-center space-x-3 last:border-b-0 hover:bg-bg-gray ${className}
      `}
      onClick={handleToggle}
    >
      <div
        className={`
        w-4 h-4 rounded border-2 flex items-center justify-center 
        transition-all duration-200 flex-shrink-0
        ${
          isSelected
            ? 'text-theme-blue'
            : 'border-gray-300 hover:border-blue-400'
        }
      `}
      >
        {isSelected && (
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Check className='w-3 h-3 text-white' strokeWidth={3} />
          </motion.div>
        )}
      </div>

      {/* Content */}
      <span
        className={`
        text-base transition-colors font-normal
        ${isSelected ? 'text-theme-blue' : 'text-white'}
      `}
      >
        {children}
      </span>
    </motion.div>
  )
}

const CheckboxDropdownItems = ({ children, className = '' }) => {
  return (
    <div
      data-scroll-container
      className={`overflow-y-auto ${className}`}
      style={{
        maxHeight: '200px',
        scrollbarWidth: 'thin',
        scrollbarColor: '#CBD5E0 transparent',
      }}
    >
      {children}
    </div>
  )
}

export {
  CheckboxDropdown,
  CheckboxDropdownLabel,
  CheckboxDropdownTrigger,
  CheckboxDropdownContent,
  CheckboxDropdownHeader,
  CheckboxDropdownItem,
  CheckboxDropdownItems,
}
