import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './flip.css'

export default function AppCTAButton({
  children = [],
  className = '',
  contCN = '',
  qrCodeUrl = '',
  showQR = false,
  icon = null,
  minWidth = '240px',
}) {
  const [isQRVisible, setIsQRVisible] = useState(false)

  const handleQRToggle = (e) => {
    e.preventDefault()
    setIsQRVisible(!isQRVisible)
  }

  return (
    <div className='relative inline-block'>
      <a href={qrCodeUrl} target='_blank' rel='noopener noreferrer'>
        <a
          role='button'
          style={{
            lineHeight: '12px',
            textAlign: 'center',
            display: 'inline-block',
            minWidth: minWidth,
          }}
          onMouseEnter={showQR ? handleQRToggle : undefined}
          onMouseLeave={showQR ? handleQRToggle : undefined}
        >
          <div
            className={`button-wraper p-[2px] ${className} hover:scale-105 transition-all duration-500`}
          >
            <div
              className={`button-cnt ${contCN} transition-all duration-500 font-medium px-3 py-1.5 flex items-center justify-center gap-2`}
            >
              <span className='flex-1'>{children}</span>
              {icon && <span className='flex-shrink-0 ml-1'>{icon}</span>}
            </div>
          </div>
        </a>
      </a>

      {/* QR Code Overlay */}
      <AnimatePresence>
        {isQRVisible && (
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
              <div className='w-32 h-32 bg-gray-100 flex items-center justify-center text-base text-black border-2 border-dashed border-gray-300'>
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
              <div className='absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white'></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
