import { motion } from 'motion/react'

const SkeletonNew = ({ className }) => {
  return (
    <motion.div
      data-slot='skeleton'
      className={`bg-gray-300 animate-pulse rounded-md ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
  )
}

export default SkeletonNew
