import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown } from 'lucide-react'

const DropdownPortalContext = createContext(null)

const FilterDropdownPortal = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef(null)

  return (
    <DropdownPortalContext.Provider value={{ isOpen, setIsOpen, triggerRef }}>
      <div className='relative inline-block w-full'>{children}</div>
    </DropdownPortalContext.Provider>
  )
}

const useDropdownPortal = () => {
  const context = useContext(DropdownPortalContext)
  if (!context) {
    throw new Error('Must be  used within FilterDropdownPortal')
  }
  return context
}

const FilterDropdownPortalTrigger = ({ children, className = '' }) => {
  const { isOpen, setIsOpen, triggerRef } = useDropdownPortal()

  return (
    <motion.div
      ref={triggerRef}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => setIsOpen(!isOpen)}
      className={`
        relative w-full px-6 py-3 text-left bg-black border-2  border-bg-gray 
        shadow-sm transition-all duration-200 flex items-center gap-2 justify-between
        cursor-pointer focus:outline-none
        rounded-2xl ${className}
      `}
      data-slot='filter-dropdown-portal-trigger'
      style={{
        minWidth: '300px',
      }}
    >
      <span className='text-lg font-medium text-white'>{children}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        <ChevronDown size={16} />
      </motion.div>
    </motion.div>
  )
}

const FilterDropdownPortalContent = ({
  children,
  className = '',
  maxHeight = '264px',
}) => {
  const { isOpen, setIsOpen, triggerRef } = useDropdownPortal()

  const contentRef = useRef(null)
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width,
      })
    }
  }, [isOpen, triggerRef])

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, setIsOpen, triggerRef])

  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, setIsOpen])

  if (!mounted) {
    return null
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15, ease: 'easeInOut' }}
          className={`bg-black border-2 border-bg-gray shadow-lg rounded-2xl overflow-hidden ${className}`}
          style={{
            position: 'absolute',
            top: position.top,
            left: position.left,
            minWidth: position.width,
            zIndex: 9999,
          }}
          data-slot='filter-dropdown-portal-content'
        >
          <div
            className={`${className} px-6 py-3 overflow-y-auto overflow-x-hidden flex flex-col gap-2`}
            style={{
              WebkitOverflowScrolling: 'touch',
              overscrollBehavior: 'contain',
              scrollbarGutter: 'stable',
              WebkitTouchCallout: 'none',
              WebkitUserSelect: 'none',
              maxHeight: maxHeight,
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
    </AnimatePresence>,
    document.body
  )
}

export {
  FilterDropdownPortal,
  useDropdownPortal,
  FilterDropdownPortalTrigger,
  FilterDropdownPortalContent,
}
