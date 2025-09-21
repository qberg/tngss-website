import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

const StaggeredFlag = ({ children, index }) => {
  const flagRef = useRef(null)
  const isInView = useInView(flagRef, {
    once: false,
    amount: 0.01,
    margin: '0px 0px -100px 0px',
  })

  const delay = index * 0.01

  return (
    <motion.div
      ref={flagRef}
      initial={{
        scale: 0,
        opacity: 0,
      }}
      animate={
        isInView
          ? {
              scale: 1,
              opacity: 1,
            }
          : {
              scale: 0,
              opacity: 0,
            }
      }
      transition={{
        duration: 0.4,
        delay: delay,
        type: 'spring',
        stiffness: 150,
        damping: 25,
      }}
      style={{
        transformOrigin: 'bottom-center',
        willChange: 'transform',
      }}
    >
      {children}
    </motion.div>
  )
}

export default StaggeredFlag
