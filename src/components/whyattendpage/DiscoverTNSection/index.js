const { useDiscoverTNFromBase } = require('../../../hooks/useQueryApi')

const DiscoverTNSection = ({ applyBorder = true }) => {
  const { data: discoverTN, isLoading, error } = useDiscoverTNFromBase()

  return (
    <section className='relative overflow-hidden'>
      <div
        className='w-full h-full p-1'
        style={{
          background: applyBorder
            ? 'linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(170, 170, 170, 1) 50%, rgba(0, 0, 0, 1) 100%)'
            : '',
        }}
      >
        <div className='w-full h-full flex flex-col items-center gap-3 md:gap-5 2xl:gap-7 justify-center px-4 md:px-16 2xl:px-28 py-4 md:py-28 bg-black overflow-hidden'>
          {discoverTN?.title && (
            <h2 className='text-white text-4xl md:text-6xl font-semibold font-urbanist gradient-text-black leading-tight md:leading-snug 2xl:leading-normal'>
              {discoverTN.title}
            </h2>
          )}

          {/*content */}
          {discoverTN?.content && discoverTN.content.length > 1 && (
            <div className='flex flex-col gap-2 md:gap-4 2xl:gap-6'>
              {discoverTN.content.map((item) => (
                <div
                  key={item.id}
                  className='font-normal font-urbanist text-base leading-none md:leading-tight md:text-2xl text-text-gray text-justify w-full md:w-10/12 mx-auto'
                >
                  {item.para}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default DiscoverTNSection
