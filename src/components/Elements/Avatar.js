import { motion } from 'motion/react'
import { useState } from 'react'

const getDiceBearAvatar = () => {
  const seed = encodeURIComponent(Math.random().toString(36).substring(2))
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`
}

const Avatar = ({ children, className = '' }) => {
  return (
    <div
      className={`${className} relative flex flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden`}
    >
      {children}
    </div>
  )
}

const AvatarImage = ({ src, alt = '', className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  if (!src || hasError) {
    return (
      <img
        src={getDiceBearAvatar()}
        alt={alt}
        className={`${className} object-cover h-full w-full`}
      />
    )
  }

  return (
    <>
      {!isLoaded && (
        <div className='absolute inset-0 bg-gray-200 animate-pulse' />
      )}
      <motion.img
        src={src}
        alt={alt}
        className={`${className} object-cover h-full w-full`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    </>
  )
}

const AvatarFallback = ({ name, className = '' }) => {
  if (!name) {
    return (
      <img
        src={getDiceBearAvatar()}
        alt='Avatar'
        className={`${className} object-cover h-full w-full`}
      />
    )
  }

  const getInitials = (name) => {
    const names = name.trim().split(' ')
    if (names.length === 1) {
      return names[0].substring(0, 2).toUpperCase()
    }
    return (names[0][0] + names[names.length - 1][0]).toUpperCase()
  }

  return (
    <div
      className={`${className} bg-bg-gray flex items-center justify-center h-full w-full text-white font-semibold text-xl md:text-2xl`}
    >
      {getInitials(name)}
    </div>
  )
}

const AvatarInfo = ({ children, className = '' }) => {
  return <div className={`${className} flex flex-col`}>{children}</div>
}

const AvatarTitle = ({ children, className = '' }) => {
  return (
    <h5
      className={`${className} font-urbanist font-semibold text-white text-lg md:text-xl 2xl:text-2xl w-full truncate`}
      style={{ lineHeight: '120%' }}
    >
      {children}
    </h5>
  )
}

const AvatarBody = ({ children, className = '' }) => {
  return (
    <p
      className={`${className} font-urbanist font-normal text-gray-300 text-sm truncate`}
    >
      {children}
    </p>
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarInfo,
  AvatarTitle,
  AvatarBody,
}
