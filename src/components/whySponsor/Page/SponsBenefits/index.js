import { useSponsBenefits } from '../../../../hooks/useQueryApi'
import BenefitCard from '../../../Elements/BenefitCard'
import ShineButton from '../../../Elements/ShineButton'

const SponsBenefits = () => {
  const { data: sponsBenefits, isLoading, error } = useSponsBenefits()
  return (
    <div className='w-full h-full px-8 md:px-16 2xl:px-28 py-4 md:py-12 2xl:py-28'>
      <div className='w-full text-white text-4xl md:text-6xl my-8 2xl:my-20 font-medium font-urbanist gradient-text-black md:leading-relaxed text-left'>
        <h3 className='uppercase'>{sponsBenefits?.title}</h3>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 p-4 auto-rows-fr'>
        {sponsBenefits?.cards.map((benefit) => (
          <BenefitCard
            key={benefit.id}
            image={benefit.icon}
            title={benefit.title}
            description={benefit.description}
          />
        ))}
      </div>
      <div>
        <div className='mt-8 2xl:mt-20 flex flex-col items-center justify-center'>
          <h3 className='uppercase text-4xl md:text-6xl text-center'>
            Partner with TNGSS Today
          </h3>

          <ShineButton
            src='/sponsor-form'
            className='!hover:bg-black w-full justify-center text-white mt-4 md:mt-8 2xl:mt-12'
            contCN='!bg-none py-3 px-4 w-full'
          >
            Get the Sponsorship Brochure
          </ShineButton>
        </div>
      </div>
    </div>
  )
}

export default SponsBenefits
