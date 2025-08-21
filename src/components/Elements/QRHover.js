import { motion, AnimatePresence } from 'motion/react'

const QRHover = ({ isVisible, qrCodeUrl }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0,
            y: 0,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: -10,
          }}
          exit={{
            opacity: 0,
            scale: 0,
            y: 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 25,
            duration: 0.3,
          }}
          style={{
            transformOrigin: 'bottom center',
          }}
          className='absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full z-50 mb-2'
        >
          <div className='bg-white p-4 rounded-lg shadow-2xl border-2 border-gray-200'>
            <div className='w-14 h-14 bg-gray-100 flex items-center justify-center text-base text-black border-2 border-dashed border-gray-300'>
              {qrCodeUrl ? (
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=${encodeURIComponent(
                    qrCodeUrl
                  )}`}
                  alt='QR Code'
                  className='w-full h-full'
                />
              ) : (
                'Coming Soon !'
              )}
            </div>
            <div className='absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-white'></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default QRHover
