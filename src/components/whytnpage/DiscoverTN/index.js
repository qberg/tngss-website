import { useDiscoverTNWhyTN } from '../../../hooks/useQueryApi'
import ImpactNumbersCard from '../../Elements/ImpactNumbersCard'
import bg from '../../../assets/why-tn-sector-bg.png'

const DiscoverTN = () => {
  const { data: discoverTn, isLoading, error } = useDiscoverTNWhyTN()
  return (
    <div
      className='w-full p-8 md:p-0 flex flex-col md:gap-16 items-center md:py-16 relative'
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className='w-full md:w-9/12 mx-auto'>
        <div className='text-white text-6xl md:text-7xl mb-4 md:mb-0 font-medium font-urbanist gradient-text-black md:leading-relaxed text-center'>
          {discoverTn?.title}
        </div>
        <div className='font-normal font-urbanist text-base leading-none md:leading-tight  md:text-2xl text-text-gray text-justify w-full mx-auto'>
          {discoverTn?.description}
        </div>
      </div>
      <div className='flex flex-col md:flex-row w-full justify-between py-3.5 md:py-0 mx-auto md:w-10/12 md:gap-8'>
        {discoverTn?.impact_numbers.map((info) => (
          <ImpactNumbersCard key={info.id} info={info} />
        ))}
      </div>
    </div>
  )
}

export default DiscoverTN
