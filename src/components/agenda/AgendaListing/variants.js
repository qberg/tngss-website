export const contentVariants = {
  slideInRight: {
    initial: {
      x: '100%',
      opacity: 0,
      scale: 0.95,
      filter: 'blur(4px)',
    },

    animate: {
      x: '0%',
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 0.8,
        duration: 0.6,
      },
    },

    exit: {
      x: '-100%',
      opacity: 0,
      scale: 1.05,
      filter: 'blur(4px)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 35,
        mass: 0.6,
        duration: 0.4,
      },
    },
  },

  slideInLeft: {
    initial: {
      x: '-100%',
      opacity: 0,
      scale: 0.95,
      filter: 'blur(4px)',
    },

    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 0.8,
        duration: 0.6,
      },
    },

    exit: {
      x: '100%',
      opacity: 0,
      scale: 1.05,
      filter: 'blur(4px)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 35,
        mass: 0.6,
        duration: 0.4,
      },
    },
  },
}

export const contentYVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
    filter: 'blur(4px)',
  },

  animate: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      mass: 0.8,
      duration: 0.6,
    },
  },

  exit: {
    opacity: 0,
    scale: 0.98,
    filter: 'blur(4px)',
    transition: {
      type: 'spring',
      stiffness: 600,
      damping: 35,
      mass: 0.6,
      duration: 0.4,
    },
  },
}

export const dateBlockContainerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

export const dateBlockVariants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },

  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
      mass: 0.7,
    },
  },
}
