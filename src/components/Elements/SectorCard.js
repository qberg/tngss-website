import GradientBdrCard from './GradientBorderCard'

const SectorCard = ({ title, description }) => {
  return (
    <GradientBdrCard className='flex w-full md:w-1/5 rounded-3xl' style={{}}>
      <div
        className='rounded-3xl'
        style={{
          background: '#F4F4F4',
        }}
      >
        <div className='p-4 overflow-hidden'>
          <div className='font-urbanist font-normal md:leading:tight text-xl md:text-2xl 2xl:text-4xl'>
            {title}
          </div>
          <div className='font-urbanist font-light opacity-80 md:mt-4'>
            {description}
          </div>
        </div>
      </div>
    </GradientBdrCard>
  )
}

export default SectorCard
