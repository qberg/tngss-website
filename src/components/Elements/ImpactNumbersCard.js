const ImpactNumbersCard = ({ info }) => {
  return (
    <div
      className='w-full md:w-2/5 p-4 flex flex-col items-center text-center justify-start gap-1'
      style={{
        background: '#FFFFFF14',
        borderRadius: '30px',
      }}
    >
      <div className='text-white text-6xl md:text-7xl mb-4 md:mb-0 font-medium font-urbanist gradient-text-black md:leading-snug'>
        {info.number}
      </div>
      <div
        className='font-normal font-urbanist text-base leading-none md:leading-tight md:text-xl text-text-gray text-center w-full md:w-10/12 mx-auto'
        style={{ lineHeight: '120%' }}
      >
        {info.description}
      </div>
    </div>
  )
}

export default ImpactNumbersCard
