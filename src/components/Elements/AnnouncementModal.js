import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X } from 'lucide-react'

const AnnouncementModal = ({}) => {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const closeModal = () => {
    setIsVisible(false)
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  useEffect(() => {
    if (isVisible) {
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
  }, [isVisible])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className='fixed inset-0 flex items-center justify-center bg-opacity-90 bg-black'
          style={{ zIndex: 1000 }}
          onClick={handleBackdropClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            onClick={closeModal}
            className='absolute bottom-16 md:bottom-8 2xl:bottom-16 left-1/2 -translate-x-1/2 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200'
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
          >
            <X className='w-6 h-6 text-bg-gray' />
          </motion.button>
          <motion.a
            href='https://event.startuptn.in/booking?pass=delegate&count=1'
            className='relative w-11/12 md:max-w-5xl aspect-w-2 aspect-h-1'
            initial={{ opacity: 0, scale: 0.65 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            style={{ transformOrigin: 'bottom center' }}
          >
            <img
              src='https://dejqwog80n2lx.cloudfront.net/delegate-pass-banner-new.jpg'
              alt='Delegate pass banner'
              className='w-full h-full object-contain'
            />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AnnouncementModal
