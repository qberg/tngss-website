export const springConfig = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 0.8,
}

export const gentleSpring = {
  type: 'spring',
  stiffness: 200,
  damping: 25,
  mass: 1,
}

export const snappySpring = {
  type: 'spring',
  stiffness: 400,
  damping: 35,
  mass: 0.6,
}

export const smoothSpring = {
  type: 'spring',
  stiffness: 250,
  damping: 28,
  mass: 0.9,
}

export const iosDrawerVariants = {
  closed: {
    x: '-100%',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
      mass: 0.8,
    },
  },
  open: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 350,
      damping: 35,
      mass: 0.9,
    },
  },
}

export const iosOverlayVariants = {
  closed: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
    transition: {
      duration: 0.3,
      ease: [0.4, 0.0, 0.2, 1],
    },
  },
  open: {
    opacity: 1,
    backdropFilter: 'blur(10px)',
    transition: {
      duration: 0.4,
      ease: [0.4, 0.0, 0.2, 1],
    },
  },
}

export const iosContentVariants = {
  closed: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.2,
      ease: [0.4, 0.0, 0.2, 1],
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.1,
      ease: [0.4, 0.0, 0.2, 1],
    },
  },
}

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: springConfig,
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
      mass: 0.5,
    },
  },
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
    },
  },
}

export const cardVariant = {
  initial: { opacity: 0, y: 30, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: smoothSpring,
  },
}

export const scaleOnHover = {
  hover: {
    y: -12,
    scale: 1.02,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 30,
      mass: 0.5,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      type: 'spring',
      stiffness: 600,
      damping: 25,
      mass: 0.4,
    },
  },
}
