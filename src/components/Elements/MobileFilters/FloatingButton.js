import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Filter } from 'lucide-react'

const FloatingButton = ({
  onOpen,
  hasActiveFilters,
  scrollThreshold = 300,
  hideFromBottom = 200,
  className = '',
}) => {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const documentHeight = document.documentElement.scrollHeight
      const windowHeight = window.innerHeight
      const distanceFromBottom = documentHeight - (scrollY + windowHeight)

      setShowButton(
        scrollY > scrollThreshold && distanceFromBottom > hideFromBottom
      )
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollThreshold, hideFromBottom])

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          onClick={onOpen}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className='fixed md:hidden bottom-6 left-4 bg-theme-blue text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-2 z-50'
        >
          <Filter size={20} />
          <span className='font-medium'>Filters</span>
          {hasActiveFilters && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className='w-2 h-2 bg-white rounded-full'
            />
          )}
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default FloatingButton
