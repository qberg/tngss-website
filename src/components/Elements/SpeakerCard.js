import { useState, useMemo, useCallback } from 'react'

const SpeakerCard = ({ speaker, showName = true, priority = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [fallbackUsed, setFallbackUsed] = useState(false)

  const imageUrls = useMemo(() => {
    if (!speaker?.profile_image?.url) return null

    const baseUrl = speaker.profile_image.url
    const urlParts = baseUrl.split('/')
    const filename = urlParts[urlParts.length - 1]
    const basePath = urlParts.slice(0, -1).join('/')

    return {
      original: baseUrl,
      webpMobile: `${basePath}/${filename}?format=webp&quality=80&width=400`,
      webpDesktop: `${basePath}/${filename}?format=webp&quality=80&width=600`,
      originalMobile: `${basePath}/${filename}?quality=80&width=400`,
      originalDesktop: `${basePath}/${filename}?quality=80&width=600`,
      placeholder: `${basePath}/${filename}?quality=20&width=50`,
    }
  }, [speaker?.profile_image?.url])

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true)
  }, [])

  const handleImageError = useCallback(() => {
    if (!fallbackUsed && imageUrls?.original) {
      setFallbackUsed(true)
    } else {
      setImageError(true)
    }
  }, [fallbackUsed, imageUrls?.original])

  const getWebPSrcSet = () => {
    if (!imageUrls) return undefined
    return `${imageUrls.webpMobile} 400w, ${imageUrls.webpDesktop} 600w`
  }

  const getOriginalSrcSet = () => {
    if (!imageUrls) return undefined
    return `${imageUrls.originalMobile} 400w, ${imageUrls.originalDesktop} 600w`
  }

  const sizes = '(max-width: 768px) 50vw, 33vw'
  const fallbackImage = fallbackUsed
    ? imageUrls?.original
    : imageUrls?.originalDesktop

  return (
    <div
      className='overflow-hidden rounded-lg md:rounded-2xl flex-shrink-0 w-full h-full'
      style={{
        background: 'linear-gradient(150deg, #007fcf, #f56b0d)',
        padding: '1px',
      }}
    >
      <div className='relative w-full h-full overflow-hidden rounded-lg md:rounded-2xl'>
        {imageUrls && !imageError ? (
          <>
            <div
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
                imageLoaded ? 'opacity-0' : 'opacity-100'
              }`}
              style={{
                backgroundImage: `url(${imageUrls.placeholder})`,
                filter: 'blur(10px) brightness(0.6)',
                transform: 'scale(1.05)',
              }}
              aria-hidden='true'
            />

            {/* Main image */}
            {!fallbackUsed ? (
              <picture>
                <source
                  srcSet={getWebPSrcSet()}
                  sizes={sizes}
                  type='image/webp'
                />
                <source srcSet={getOriginalSrcSet()} sizes={sizes} />
                <img
                  src={imageUrls.originalDesktop}
                  alt={`${speaker.name} - ${speaker.designation}`}
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading={priority ? 'eager' : 'lazy'}
                  decoding='async'
                  fetchPriority={priority ? 'high' : 'auto'}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              </picture>
            ) : (
              <img
                src={fallbackImage}
                alt={`${speaker.name} - ${speaker.designation}`}
                className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                loading={priority ? 'eager' : 'lazy'}
                decoding='async'
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            )}
          </>
        ) : (
          <div className='absolute inset-0 bg-gray-900 flex items-center justify-center'>
            <div className='w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center'>
              <span className='text-2xl text-gray-400 font-semibold'>
                {speaker?.name?.charAt(0)?.toUpperCase() || '?'}
              </span>
            </div>
          </div>
        )}

        {showName && (
          <>
            <div
              className='absolute inset-0'
              style={{
                background:
                  'linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2), transparent)',
              }}
            />
            <div className='absolute bottom-0 left-0 p-2 text-white'>
              <h4 className='text-lg sm:text-xl font-bold mb-1 leading-tight'>
                {speaker?.name}
              </h4>
              <p className='text-xs md:text-sm text-white/80 leading-tight'>
                {speaker?.designation}
                {speaker?.organization && `, ${speaker.organization}`}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SpeakerCard
