export const slowSpring = {
  type: 'spring',
  stiffness: 100,
  damping: 25,
  mass: 0.8,
}

export const customSpring = {
  type: 'spring',
  stiffness: 150,
  damping: 25,
  mass: 0.8,
}

export const logoVariants = {
  hidden: {
    scale: 0.3,
    y: 350,
  },
  visible: {
    scale: 1,
    y: 0,
    transition: {
      ...slowSpring,
    },
  },
}

export const eventDetailsVariants = {
  hidden: {
    opacity: 0,
    y: 80,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...customSpring,
      staggerChildren: 1.6,
      delay: 1,
    },
  },
}

export const eventChildVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: customSpring,
  },
}

export const ctaVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...customSpring,
      delay: 2,
    },
  },
}
