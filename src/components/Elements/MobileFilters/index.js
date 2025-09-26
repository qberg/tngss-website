import { motion, AnimatePresence } from 'motion/react'

const MobileFilterOverlay = ({ children, isOpen, onClose, className = '' }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className={`fixed inset-0 z-50 bg-black md:hidden ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { MobileFilterOverlay }
