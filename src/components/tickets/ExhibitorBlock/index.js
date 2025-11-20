import {
  useTicketGuidelines,
  useTicketsBySlug,
} from '../../../hooks/useQueryApi'
import SimpleButton from '../../Elements/SimpleButton'
import {
  TicketCard,
  TicketFeatures,
  TicketPrice,
  TicketTitle,
} from '../TicketCard'

import greenCardBg from '../../../assets/green-cardbg.svg?url'
import yellowCardBg from '../../../assets/yellow-cardbg.svg?url'
import cyanCardBg from '../../../assets/cyan-cardbg.svg?url'
import StallIcon from '../StallIcon'

const ExhibitorBlock = ({ headers, guidelinesData }) => {
  const {
    data: exhibitorData,
    isLoading,
    error,
  } = useTicketsBySlug('contains:exhibitor')

  const exhibitors = exhibitorData?.docs || []

  const exhibitorGuidelines = guidelinesData.find(
    (guideline) => guideline.name === 'Exhibitor Guidelines'
  )

  const exhibitorSmall = exhibitors[0]
  const exhibitorMedium = exhibitors[1]
  const exhibitorLarge = exhibitors[2]

  const handleExhibitorClick = () => {
    window.location.href = 'https://event.startuptn.in/expo-booking'
  }

  return (
    <section
      id='stall'
      className='w-full bg-black px-4 md:px-16 pt-16 md:pt-20 2xl:pt-24 pb-8 md:pb-16 flex flex-col gap-5 md:gap-12 2xl:gap-16 items-center justify-center mx-auto'
      style={{
        scrollMarginTop: '20px',
      }}
    >
      <div className='flex flex-col items-center gap-4'>
        <h2 className='font-medium text-3xl md:text-4xl 2xl:text-6xl gradient-text-black'>
          {headers?.title || 'Stall Availability For Exhibitors'}
        </h2>

        <p className='text-lg md:text-xl 2xl:text-3xl text-center'>
          {headers?.description ||
            'Select the perfect stall that suits your needs to best represent your brand.'}
        </p>
      </div>

      {/*exhibitor cards */}

      <div className='w-full flex flex-col md:flex-row md:items-stretch md:justify-center gap-7 md:gap-14'>
        <div className='w-full md:w-3/12'>
          <TicketCard variant='green' backgroundImage={greenCardBg}>
            <TicketTitle icon={true} IconComponent={StallIcon} />
            <TicketPrice
              pricing={exhibitorSmall?.pricing}
              variant='green'
              showSize
            />
            <SimpleButton variant='green'>
              <div className='text-red-500'>Closed</div>
            </SimpleButton>
            <TicketFeatures features={exhibitorSmall?.features} />
          </TicketCard>
        </div>

        <div className='w-full md:w-3/12'>
          <TicketCard variant='yellow' backgroundImage={yellowCardBg}>
            <TicketTitle icon={true} IconComponent={StallIcon} />
            <TicketPrice
              pricing={exhibitorMedium?.pricing}
              variant='yellow'
              showSize
            />
            <SimpleButton variant='yellow'>
              <div className='text-red-500'>Closed</div>
            </SimpleButton>
            <TicketFeatures features={exhibitorMedium?.features} />
          </TicketCard>
        </div>

        <div className='w-full md:w-3/12'>
          <TicketCard variant='cyan' backgroundImage={cyanCardBg}>
            <TicketTitle icon={true} IconComponent={StallIcon} />
            <TicketPrice
              pricing={exhibitorLarge?.pricing}
              variant='cyan'
              showSize
            />
            <SimpleButton variant='cyan'>
              <div className='text-red-500'>Closed</div>
            </SimpleButton>
            <TicketFeatures features={exhibitorLarge?.features} />
          </TicketCard>
        </div>
      </div>

      <div className='flex flex-col items-center justify-center w-full'>
        <div className='w-full md:w-10/12 mx-auto'>
          <h3 className='font-medium text-xl md:text-2xl 2xl:text-4xl gradient-text-gray text-left mb-4 md:mb-6'>
            Guidelines
          </h3>

          <ul className='text-gray-300'>
            {exhibitorGuidelines &&
              exhibitorGuidelines?.points.length > 0 &&
              exhibitorGuidelines.points.map((item) => (
                <li key={item.id} className='flex items-start'>
                  <span className='mr-3'>•</span>
                  <span className='text-sm md:text-base leading-relaxed'>
                    {item.point}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ExhibitorBlock
