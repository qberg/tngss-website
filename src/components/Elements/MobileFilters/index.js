import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useEffect } from 'react'

const MobileFilterOverlay = ({ children, isOpen, onClose, className = '' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    } else {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className={`fixed inset-0 bg-black md:hidden flex flex-col pt-24 ${className}`}
          style={{ zIndex: 1000, height: '100vh', height: '100dvh' }}
        >
          {/* Header - fixed */}
          <div className='flex items-center justify-between p-3 border-b border-bg-gray flex-shrink-0'>
            <h2 className='text-white text-xl font-semibold'>Filters</h2>
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='p-2 hover:bg-white/10 rounded-full transition-colors'
            >
              <X size={24} className='text-white' />
            </motion.button>
          </div>

          {/* Content - flex and scrollable */}
          <div className='flex flex-1 min-h-0'>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const MobileFilterSidebar = ({ children, className = '' }) => {
  return (
    <div className={`${className} w-2/5 flex flex-col border-r border-bg-gray`}>
      <div
        className='flex-1 overflow-y-auto p-4 space-y-2'
        style={{
          overscrollBehavior: 'contain', // Prevent scroll chaining
          WebkitOverflowScrolling: 'touch', // iOS momentum scrolling
        }}
        onTouchMove={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

const MobileFilterRightSection = ({ children, className = '' }) => {
  return (
    <div className={`${className} w-3/5 flex flex-col bg-black`}>
      <div
        className='flex-1 overflow-y-auto p-4'
        style={{
          overscrollBehavior: 'contain', // Prevent scroll chaining
          WebkitOverflowScrolling: 'touch', // iOS momentum scrolling
        }}
        onTouchMove={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

const MobileFilterCtas = ({ children, className = '' }) => {
  return (
    <div className={`${className} absolute bottom-0 bg-black h-auto w-full`}>
      <div className='flex p-4'>{children}</div>
    </div>
  )
}

const FilterCategory = ({ category, isActive, onClick }) => (
  <motion.button
    onClick={onClick}
    whileTap={{ scale: 0.97 }}
    className={`w-full text-left p-3 rounded-lg transition-colors focus:outline-none ${
      isActive ? 'bg-theme-blue text-white' : 'text-white/70 hover:bg-white/5'
    }`}
  >
    <div className='flex items-center justify-between'>
      <span className='font-medium'>{category.title}</span>
      {category.hasSelections && (
        <div className='w-2 h-2 bg-white rounded-full' />
      )}
    </div>
  </motion.button>
)

export {
  MobileFilterOverlay,
  MobileFilterRightSection,
  MobileFilterSidebar,
  MobileFilterCtas,
  FilterCategory,
}
export { default as FloatingButton } from './FloatingButton'
