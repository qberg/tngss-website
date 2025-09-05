import { motion, AnimatePresence } from 'motion/react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const FormModal = ({
  isOpen,
  onClose,
  type = 'success',
  title,
  message,
  redirectTo,
}) => {
  const navigate = useNavigate()

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose, redirectTo])

  const handleClose = () => {
    onClose()

    if (redirectTo) {
      navigate(redirectTo)
    } else {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className='fixed inset-0 bg-black opacity-60 backdrop-blur-sm z-50'
          />

          {/* Modal */}
          <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              className='bg-black border border-gray-700 rounded-2xl max-w-md w-full mx-4 overflow-hidden'
              style={{
                background:
                  'linear-gradient(150deg, rgba(0, 127, 207, 0.1), rgba(245, 107, 13, 0.1))',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div className='p-6'>
                {/* Icon */}
                <div className='flex justify-center mb-4'>
                  <div
                    className={`
                    w-16 h-16 rounded-full flex items-center justify-center
                    ${type === 'success' ? 'bg-green-900/50' : 'bg-red-900/50'}
                  `}
                  >
                    <ModalIcon type={type} />
                  </div>
                </div>

                {/* Content */}
                <div className='text-center'>
                  <h3 className='text-3xl font-semibold text-white mb-3'>
                    {title}
                  </h3>
                  <p
                    className='text-white text-lg'
                    style={{ lineHeight: '120%' }}
                  >
                    {message}
                  </p>
                </div>

                {/* Button */}
                <div className='mt-6 flex justify-center'>
                  <button
                    onClick={handleClose}
                    className='px-8 py-3 text-white font-medium rounded-xl hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500'
                    style={{
                      background: 'linear-gradient(150deg, #007fcf, #f56b0d)',
                    }}
                  >
                    {redirectTo ? 'Continue' : 'Close'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

const ModalIcon = ({ type }) => {
  if (type === 'success') {
    return (
      <svg
        className='w-8 h-8 text-green-400'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M5 13l4 4L19 7'
        />
      </svg>
    )
  }

  return (
    <svg
      className='w-8 h-8 text-red-400'
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M6 18L18 6M6 6l12 12'
      />
    </svg>
  )
}

export default FormModal
