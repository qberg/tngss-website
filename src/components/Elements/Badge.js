import { motion } from 'motion/react'
import { snappySpring } from '../../motion/Springs'

const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center font-medium rounded-full transition-all cursor-default'

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  }

  const variantClasses = {
    primary: 'bg-[#18BFDB]/20 text-[#18BFDB] border border-[#18BFDB]/30',
    secondary: 'bg-white/10 text-white/80 border border-white/20',
    success: 'bg-green-500/20 text-green-400 border border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    error: 'bg-red-500/20 text-red-400 border border-red-500/30',
    purple: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    orange: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
    blue: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  }

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`

  const MotionComponent = onClick ? motion.button : motion.span

  return (
    <MotionComponent
      className='text-white px-3 py-1.5 text-sm rounded-full'
      style={{
        backgroundColor: '#1A1A1A',
        boxShadow: '0 8px 32px 8px rgba(245,112,12,0.11)',
      }}
      onClick={onClick}
      whileHover={
        onClick
          ? {
              scale: 1.05,
              transition: snappySpring,
            }
          : {
              scale: 1.02,
              transition: snappySpring,
            }
      }
      whileTap={
        onClick
          ? {
              scale: 0.95,
              transition: snappySpring,
            }
          : undefined
      }
      {...props}
    >
      {children}
    </MotionComponent>
  )
}

export default Badge
