const BannerImage = ({ bannerImage }) => {
  return (
    <div
      className='p-1 overflow-hidden rounded-lg md:rounded-2xl flex-shrink-0 w-full h-full'
      style={{
        background: 'linear-gradient(150deg, #007fcf, #f56b0d)',
      }}
    >
      <div className='relative w-full h-full overflow-hidden rounded-lg md:rounded-2xl'>
        {bannerImage ? (
          <img
            src={bannerImage.url}
            alt={`${bannerImage.alt}`}
            className='absolute inset-0 w-full h-full object-cover object-center'
          />
        ) : (
          <div className='absolute inset-0 bg-gray-900' />
        )}
      </div>
    </div>
  )
}

export default BannerImage
