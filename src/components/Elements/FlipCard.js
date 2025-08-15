import React, { forwardRef, useState } from 'react'
import { motion } from 'motion/react'

const FlipCard = forwardRef(
  ({ children, className = '', flipinvert = false, refEl }, ref) => {
    const [isFlipped, setIsFlipped] = useState(false)

    const childrenArray = Array.isArray(children) ? children : [children]
    const frontContent = childrenArray[0] || 'Front'
    const backContent = childrenArray[1] || 'Back'

    const handleClick = () => {
      setIsFlipped((prev) => !prev)
    }

    const cardVariants = {
      front: {
        rotateY: flipinvert ? 0 : 0,
      },
      back: {
        rotateY: flipinvert ? -180 : 180,
      },
    }

    const frontVariants = {
      front: {
        rotateY: 0,
        opacity: 1,
      },
      back: {
        rotateY: flipinvert ? 90 : -90,
        opacity: 0,
      },
    }

    const backVariants = {
      front: {
        rotateY: flipinvert ? -90 : 90,
        opacity: 0,
      },
      back: {
        rotateY: 0,
        opacity: 1,
      },
    }

    return (
      <div
        ref={refEl || ref}
        className={`relative w-72 h-96 ${className}`}
        style={{ perspective: '1000px' }}
        onClick={handleClick}
      >
        <motion.div
          className='relative w-full h-full cursor-pointer'
          style={{ transformStyle: 'preserve-3d' }}
          variants={cardVariants}
          animate={isFlipped ? 'back' : 'front'}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1], // ease-in-out equivalent
          }}
          whileHover={
            !('ontouchstart' in window) ? (isFlipped ? 'front' : 'back') : {}
          }
        >
          {/* Front Face */}
          <motion.div
            className='absolute inset-0 w-full h-full rounded-2xl flex justify-center items-center bg-transparent'
            style={{ backfaceVisibility: 'hidden' }}
            variants={frontVariants}
            animate={isFlipped ? 'back' : 'front'}
            transition={{
              duration: 0.25,
              ease: 'easeInOut',
            }}
          >
            {frontContent}
          </motion.div>

          {/* Back Face */}
          <motion.div
            className='absolute inset-0 w-full h-full rounded-2xl flex justify-center items-center bg-transparent'
            style={{
              backfaceVisibility: 'hidden',
              transform: flipinvert ? 'rotateY(-180deg)' : 'rotateY(180deg)',
            }}
            variants={backVariants}
            animate={isFlipped ? 'back' : 'front'}
            transition={{
              duration: 0.25,
              ease: 'easeInOut',
              delay: 0.25,
            }}
          >
            {backContent}
          </motion.div>
        </motion.div>
      </div>
    )
  }
)

export default FlipCard
