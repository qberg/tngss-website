import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

const StaggeredCard = ({ children, index }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, {
    once: false,
    amount: 0.01,
    margin: '0px 0px -100px 0px',
  })

  const delay = index * 0.01

  return (
    <motion.div
      ref={cardRef}
      initial={{
        x: '25%',
        opacity: 0,
      }}
      animate={
        isInView
          ? {
              x: '0%',
              opacity: 1,
              y: 0,
            }
          : {
              x: '25%',
              opacity: 0,
              y: 60,
            }
      }
      transition={{
        duration: 0.4,
        delay: delay,
        type: 'spring',
        stiffness: 150,
        damping: 25,
      }}
      className='will-change-transform'
    >
      {children}
    </motion.div>
  )
}

export default StaggeredCard
