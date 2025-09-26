import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { snappySpring } from '../../../motion/Springs'

const NewFilterDropdown = ({ children, className = '' }) => {
  return (
    <div data-slot='filter-dropdown' className={`${className}`}>
      {children}
    </div>
  )
}

const NewFilterDropdownTrigger = ({
  children,
  className = '',
  isOpen,
  onToggle,
}) => {
  return (
    <motion.button
      data-slot='filter-dropdown-trigger'
      onClick={onToggle}
      className={`${className} w-full border-b border-white flex justify-between items-center pb-3 group focus:outline-none`}
      whileHover={{
        borderColor: 'rgba(255, 255, 255, 0.4)',
        transition: snappySpring,
      }}
      whileTap={{
        scale: 0.98,
        transition: snappySpring,
      }}
    >
      <span className='text-lg font-medium text-white'>{children}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        <ChevronDown size={16} />
      </motion.div>
    </motion.button>
  )
}

const NewFilterDropdownContent = ({ children, isOpen, className = '' }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 300,
            opacity: { duration: 0.2 },
          }}
          className='overflow-hidden'
          data-slot='filter-dropdown-content'
        >
          <div
            className={`${className} px-3 pt-4 pb-0 overflow-y-auto overflow-x-hidden`}
            style={{
              WebkitOverflowScrolling: 'touch',
              overscrollBehavior: 'contain',
              scrollbarGutter: 'stable',
              WebkitTouchCallout: 'none',
              WebkitUserSelect: 'none',
              maxHeight: '200px',
              isolation: 'isolate',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent',
              // Webkit scrollbar styling
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '3px',
                transition: 'background-color 0.2s ease',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              },
            }}
            onWheel={(e) => {
              const element = e.currentTarget
              const { scrollTop, scrollHeight, clientHeight } = element

              const isAtTop = scrollTop === 0
              const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1

              if (
                (!isAtTop && !isAtBottom) ||
                (isAtTop && e.deltaY > 0) ||
                (isAtBottom && e.deltaY < 0)
              ) {
                e.stopPropagation()
              }
            }}
            onTouchStart={(e) => {
              e.stopPropagation()
            }}
            onTouchMove={(e) => {
              e.stopPropagation()
            }}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { NewFilterDropdown, NewFilterDropdownTrigger, NewFilterDropdownContent }
