import { motion } from 'motion/react'

const ProductCard = ({ children, className = '' }) => {
  return (
    <motion.div
      className={`${className} bg-bg-gray rounded-2xl w-full flex flex-col md:flex-row items-start p-4 gap-4 md:gap-8 md:p-8 w-full`}
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.05,
        margin: '-25px',
      }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94], // iOS-like cubic bezier easing
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: {
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      }}
    >
      {children}
    </motion.div>
  )
}

const ProductImage = ({ imageSrc, className = '' }) => {
  return (
    <div
      className={`${className} relative w-full md:w-5/12 aspect-w-12 aspect-h-10 md:aspect-h-4 overflow-hidden rounded-2xl`}
    >
      <img
        src={imageSrc}
        alt='Product Image'
        className='absolute inset-0 object-cover object-center'
        loading='lazy'
      />
    </div>
  )
}

const ProductDivider = ({ className = '' }) => {
  return (
    <div
      className={`${className} bg-white opacity-20 w-full h-px md:h-auto md:self-stretch`}
      style={{ width: '1px' }}
    />
  )
}

const ProductBody = ({ children, className = '' }) => {
  return (
    <div className={`${className} flex flex-col gap-2 w-full md:w-7/12`}>
      {children}
    </div>
  )
}

const ProductTitle = ({ children, className = '' }) => {
  return (
    <h5
      className={`${className} font-urbanist font-semibold text-white text-lg md:text-xl 2xl:text-2xl w-full`}
      style={{ lineHeight: '120%' }}
    >
      {children}
    </h5>
  )
}

const ProductContent = ({ children, className = '' }) => {
  return (
    <p
      className={`${className} font-urbanist font-normal text-gray-300 text-sm`}
    >
      {children}
    </p>
  )
}

export {
  ProductCard,
  ProductImage,
  ProductDivider,
  ProductBody,
  ProductTitle,
  ProductContent,
}
