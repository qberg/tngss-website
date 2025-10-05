import { ExhibitorCard } from '../ExhibitorCard'
import { motion } from 'motion/react'

const ExhibitorCardLink = ({ to, children, id, className = '' }) => {
  return (
    <motion.a
      href={to}
      className={`${className} block focus:outline-none rounded-lg md:rounded-xl`}
      layout={true}
      layoutId={id}
    >
      <ExhibitorCard>{children}</ExhibitorCard>
    </motion.a>
  )
}

export { ExhibitorCardLink }
