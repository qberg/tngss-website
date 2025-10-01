import { motion } from 'motion/react'

const SpeakerCardWrapper = ({
  children,
  className = '',
  slug = '',
  aspectRatio = 'default',
}) => {
  const aspectRatioClasses = {
    default: 'aspect-h-12 aspect-w-9',
    medium: 'aspect-h-12 aspect-w-10',
    compact: 'aspect-h-14 aspect-w-11',
  }

  const commonProps = {
    className: `${className} ${
      aspectRatioClasses[aspectRatio] || aspectRatioClasses.default
    }`,
    initial: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    whileInView: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    viewport: {
      once: true,
      amount: 0.05,
      margin: '-25px',
    },
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      opacity: { duration: 0.4 },
      scale: { duration: 0.4 },
    },
    whileHover: slug
      ? {
          y: -8,
          scale: 1.02,
          transition: {
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        }
      : undefined,
    layout: true,
    layoutId: slug ? `speaker-${slug}` : undefined,
  }

  if (!slug) {
    return <motion.div {...commonProps}>{children}</motion.div>
  }

  return (
    <motion.a href={`/speakers/${slug}`} {...commonProps}>
      {children}
    </motion.a>
  )
}

export default SpeakerCardWrapper
