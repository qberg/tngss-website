import { useEffect } from 'react'
import { useIntersectionObserver } from './useIntersectionObserver'

const InfiniteScrollTrigger = ({
  onLoadMore,
  hasMore,
  isLoading,
  children,
  className = '',
  text = 'Loading more exhibitors...',
  margin = '200px',
}) => {
  const { setElement, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: margin,
    triggerOnce: false,
  })

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading) {
      onLoadMore()
    }
  }, [isIntersecting, hasMore, isLoading, onLoadMore])

  if (!hasMore) {
    return null
  }

  return (
    <div
      ref={setElement}
      className={`${className} w-full flex justify-center py-8`}
    >
      {isLoading ? (
        <div className='flex items-center gap-2'>
          <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-theme-blue'></div>
          <span className='text-gray-600'>{text}</span>
        </div>
      ) : (
        children || <div className='h-1' />
      )}
    </div>
  )
}

export default InfiniteScrollTrigger
