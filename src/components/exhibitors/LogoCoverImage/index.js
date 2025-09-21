import { useState } from 'react'
import SkeletonPulse from '../../Elements/Loaders/SkeletonPulse'
import logo from '../../../assets/tngss-dark.jpeg'

const LogoCoverImage = ({ src, alt, className, skeleton = false }) => {
  const [imageError, setImageError] = useState(false)

  if (skeleton) {
    return (
      <div
        className={`${className} relative w-full h-full overflow-hidden rounded-md md:rounded-lg bg-white p-2`}
      >
        <SkeletonPulse className='w-full h-full rounded' />
      </div>
    )
  }

  const imageSrc = !src || imageError ? logo : src
  const imageAlt = !src || imageError ? 'StartupTN Logo' : alt
  const padding = !src || imageError ? 'p-1' : 'p-2'

  return (
    <div
      className={`${className} w-full h-full overflow-hidden rounded-md md:rounded-lg bg-white ${padding}`}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        className='absolute inset-0 w-full h-full object-contain object-center'
        onError={() => setImageError(true)}
        loading='lazy'
      />
    </div>
  )
}

export default LogoCoverImage
