import { useState, useMemo, useCallback } from 'react'

const BannerImage = ({ bannerImage, priority = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [fallbackUsed, setFallbackUsed] = useState(false)

  const imageUrls = useMemo(() => {
    if (!bannerImage?.url) return null

    const baseUrl = bannerImage.url
    const urlParts = baseUrl.split('/')
    const filename = urlParts[urlParts.length - 1]
    const basePath = urlParts.slice(0, -1).join('/')

    return {
      original: baseUrl,
      webpMobile: `${basePath}/${filename}?format=webp&quality=80&width=800`,
      webpDesktop: `${basePath}/${filename}?format=webp&quality=80&width=1200`,
      originalMobile: `${basePath}/${filename}?quality=80&width=800`,
      originalDesktop: `${basePath}/${filename}?quality=80&width=1200`,
      placeholder: `${basePath}/${filename}?quality=20&width=50`,
    }
  }, [bannerImage?.url])

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
    return `${imageUrls.webpMobile} 800w, ${imageUrls.webpDesktop} 1200w`
  }

  const getOriginalSrcSet = () => {
    if (!imageUrls) return undefined
    return `${imageUrls.originalMobile} 800w, ${imageUrls.originalDesktop} 1200w`
  }

  const sizes = '100vw'
  const fallbackImage = fallbackUsed
    ? imageUrls?.original
    : imageUrls?.originalDesktop

  return (
    <div
      className='p-1 overflow-hidden rounded-lg md:rounded-2xl flex-shrink-0 w-full h-full'
      style={{
        background: 'linear-gradient(150deg, #007fcf, #f56b0d)',
      }}
    >
      <div className='relative w-full h-full overflow-hidden rounded-lg md:rounded-2xl'>
        {imageUrls && !imageError ? (
          <>
            {/* Loading state with shimmer */}
            <div
              className={`absolute inset-0 transition-opacity duration-700 ${
                imageLoaded ? 'opacity-0' : 'opacity-100'
              }`}
              style={{
                background: 'linear-gradient(150deg, #007fcf, #f56b0d)',
              }}
              aria-hidden='true'
            >
              <div className='absolute inset-0 animate-shimmer' />
            </div>

            {/* Blur placeholder */}
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
                  alt={bannerImage.alt || 'Banner image'}
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
                alt={bannerImage.alt || 'Banner image'}
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
          <div
            className='absolute inset-0'
            style={{
              background: 'linear-gradient(150deg, #007fcf, #f56b0d)',
            }}
          >
            <div className='absolute inset-0 animate-shimmer' />
          </div>
        )}
      </div>
    </div>
  )
}

export default BannerImage
