import youtubeLogo from '../../assets/youtubelogo.png'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X } from 'lucide-react'

const YouTubeCard = ({ videoId, thumbnail, isMobile }) => {
  const [isVisible, setIsVisible] = useState(false)

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

  const closeModal = () => {
    setIsVisible(false)
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }
  return (
    <div
      className='rounded-2xl relative w-96 aspect-video p-0.5 overflow-hidden cursor-pointer'
      style={{
        background: `linear-gradient(
              148.59deg,
              #0055ff 2.92%,
              #07bcce 23.28%,
              #f7750c 80.11%,
              #ff0000 97.63%
            )`,
      }}
    >
      <div
        className='rounded-2xl w-full h-full bg-black overflow-hidden'
        onClick={() => setIsVisible(true)}
      >
        <div className='hover:opacity-80'>
          <img
            src={thumbnail}
            alt='Video'
            className='w-full h-full object-contain z-10'
          />
          <img
            src={youtubeLogo}
            alt=''
            className='absolute top-1/2 left-1/2 w-16 h-fit z-20 -translate-x-1/2 -translate-y-1/2 opacity-100'
          />
        </div>
      </div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className='fixed left-0 bottom-0 right-0 flex items-center justify-center bg-opacity-80 bg-black'
            style={{ top: '85px', zIndex: 1000 }}
            onClick={handleBackdropClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              onClick={closeModal}
              className={`absolute top-14 ${isMobile?" right-10":"right-20"} z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200`}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
            >
              <X className='w-6 h-6 text-bg-gray' />
            </motion.button>
            <motion.div
              className={`relative ${isMobile? "w-full h-auto aspect-w-2 aspect-h-1":"w-2/3 h-full py-12"}`}
              initial={{ opacity: 0, scale: 0.65 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              style={{ transformOrigin: 'bottom center' }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                width="100%"
                height="100%"
                allow='accelerometer; fullscreen'
                allowFullScreen
                className='object-contain'
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default YouTubeCard

