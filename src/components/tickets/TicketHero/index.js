import {
  TicketCard,
  TicketFeatures,
  TicketPrice,
  TicketTitle,
} from '../TicketCard'

import blueCardBg from '../../../assets/blue-cardbg.svg?url'
import purpleCardBg from '../../../assets/purple-cardbg.svg?url'
import { useTicketsBySlug } from '../../../hooks/useQueryApi'
import SimpleButton from '../../Elements/SimpleButton'

const TicketHero = ({ headers, applyBorder = true }) => {
  const {
    data: passData,
    isLoading,
    error,
  } = useTicketsBySlug(['delegate-pass', 'visitor-pass'])

  const visitorTicket = passData?.docs?.find(
    (ticket) => ticket.slug === 'visitor-pass'
  )

  const delegateTicket = passData?.docs?.find(
    (ticket) => ticket.slug === 'delegate-pass'
  )

  const handleVisitorPassClick = () => {
    window.location.href = 'https://event.startuptn.in/booking?pass=visitor'
  }

  const handleDelegatePassClick = () => {
    window.location.href = 'https://event.startuptn.in/booking?pass=delegate'
  }

  return (
    <section
      id='pass'
      className='pb-0.5'
      style={{
        background: applyBorder
          ? 'linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(170, 170, 170, 1) 50%, rgba(0, 0, 0, 1) 100%)'
          : '',
        scrollBehavior: 'smooth',
      }}
    >
      <div className='w-full bg-black px-4 md:px-16 pt-36 pb-8 md:pb-16 flex flex-col gap-5 md:gap-16 2xl:gap-24 items-center justify-center mx-auto'>
        {/*title*/}
        <div className='flex flex-col items-center gap-4'>
          <h2 className='font-medium text-3xl md:text-4xl 2xl:text-6xl gradient-text-black'>
            {headers?.title}
          </h2>

          <p className='text-lg md:text-xl 2xl:text-3xl text-center'>
            {headers?.description}
          </p>
        </div>

        {/*ticket cards*/}
        <div className='w-full flex flex-col md:flex-row md:items-stretch md:justify-center gap-7 md:gap-14'>
          <div className='w-full md:w-4/12'>
            <TicketCard variant='blue' backgroundImage={blueCardBg}>
              <TicketTitle
                title={visitorTicket?.name}
                description={visitorTicket?.description}
                icon={true}
              />
              <TicketPrice pricing={visitorTicket?.pricing} />
              <SimpleButton onClick={handleVisitorPassClick} variant='blue'>
                Select Visitor Pass
              </SimpleButton>
              <TicketFeatures features={visitorTicket?.features} />
            </TicketCard>
          </div>

          <div className='w-full md:w-4/12'>
            <TicketCard
              variant='purple'
              backgroundImage={purpleCardBg}
              ribbon={delegateTicket?.badge_text}
            >
              <TicketTitle
                title={delegateTicket?.name}
                description={delegateTicket?.description}
                icon={true}
              />
              <TicketPrice pricing={delegateTicket?.pricing} />
              <SimpleButton
                onClick={handleDelegatePassClick}
                variant='purple'
                fill
              >
                Select Delegate Pass
              </SimpleButton>
              <TicketFeatures features={delegateTicket?.features} />
            </TicketCard>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TicketHero
