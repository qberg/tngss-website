import {
  TicketCard,
  TicketFeatures,
  TicketPrice,
  TicketTitle,
} from '../TicketCard'

import blueCardBg from '../../../assets/blue-cardbg.svg?url'
import purpleCardBg from '../../../assets/purple-cardbg.svg?url'
import mixedCardBg from '../../../assets/mixed-cardbg.svg?url'
import SimpleButton from '../../Elements/SimpleButton'
import { tickets } from '../utils'

const TicketHero = ({ applyBorder = true }) => {
  const visitorTicket = tickets[0]

  const delegateTicket = tickets[1]

  const networkingDinner = tickets[2]

  const handleVisitorPassClick = () => {
    window.location.href = 'https://event.startuptn.in/booking?pass=visitor'
  }

  const handleDelegatePassClick = () => {
    window.location.href =
      'https://event.startuptn.in/booking?pass=delegate&count=1'
  }

  const handleNetworkingDinnerClick = () => {
    window.location.href =
      'https://event.startuptn.in/booking?pass=networking&count=1'
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
            Choose your Pass
          </h2>

          <p className='text-lg md:text-xl 2xl:text-3xl text-center'>
            Select the perfect pass that suits your needs and get ready for an
            unforgettable experience.
          </p>
        </div>

        {/*ticket cards*/}
        <div className='w-full flex flex-col md:flex-row md:items-stretch md:justify-center gap-7 md:gap-14'>
          <div className='w-full md:w-4/12 2xl:w-4/12'>
            <TicketCard variant='blue' backgroundImage={blueCardBg}>
              <TicketTitle
                title={visitorTicket?.name}
                description={visitorTicket?.description}
                icon={true}
              />
              <TicketPrice pricing={visitorTicket?.pricing} />
              <SimpleButton variant='blue'>Closed</SimpleButton>
              <TicketFeatures features={visitorTicket?.features} />
            </TicketCard>
          </div>

          <div className='w-full md:w-4/12 2xl:w-4/12'>
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
              <SimpleButton variant='purple' fill>
                Closed
              </SimpleButton>
              <TicketFeatures features={delegateTicket?.features} />
            </TicketCard>
          </div>

          <div className='w-full md:w-4/12 2xl:w-4/12'>
            <TicketCard variant='mixed' backgroundImage={mixedCardBg}>
              <TicketTitle
                title={networkingDinner?.name}
                description={networkingDinner?.description}
                icon={true}
              />
              <TicketPrice pricing={networkingDinner?.pricing} />
              <SimpleButton variant='mixed'>Closed</SimpleButton>
              <TicketFeatures features={networkingDinner?.features} />
            </TicketCard>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TicketHero
