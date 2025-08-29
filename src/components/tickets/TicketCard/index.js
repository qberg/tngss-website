import { Currency } from 'lucide-react'
import TicketIcon from '../TicketIcon'
import SizeIcon from '../SizeIcon'
import PriceIcon from '../PriceIcon'

const TicketCard = ({
  children,
  variant = 'blue',
  backgroundImage,
  ribbon,
}) => {
  const variants = {
    blue: 'linear-gradient(135deg,rgba(0, 85, 255, 1) 0%, rgba(24, 191, 219, 1) 100%)',
    purple:
      'linear-gradient(135deg, rgba(148, 75, 255, 0.8) 0%, rgba(37, 0, 249, 0.8) 100%)',
    green:
      'linear-gradient(135deg, rgba(52, 168, 83, 1) 0%, rgba(34, 197, 94, 1) 100%)',
    yellow:
      'linear-gradient(135deg, rgba(253, 182, 51, 1) 0%, rgba(251, 146, 60, 1) 100%)',
    cyan: 'linear-gradient(135deg, rgba(23, 191, 219, 1) 0%, rgba(14, 165, 233, 1) 100%)',
  }
  return (
    <article
      className='w-full h-full relative rounded-lg md:rounded-2xl overflow-hidden p-0.5'
      style={{
        background: variants[variant] || variants.blue,
      }}
    >
      <div className='w-full h-full overflow-hidden rounded-lg md:rounded-2xl bg-black p-4 md:p-5 2xl:p-8 relative'>
        {backgroundImage && (
          <div
            className='w-full absolute top-0 left-0 bg-cover bg-center bg-no-repeat z-0'
            style={{
              height: '18.5vh',
              minHeight: '150px',
              backgroundImage: `url(${backgroundImage})`,
            }}
          >
            <div
              className='absolute inset-0'
              style={{
                background:
                  'linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2), transparent)',
              }}
            />
          </div>
        )}
        <div className='relative z-10 flex flex-col gap-4 md:gap-6'>
          {children}
        </div>
      </div>
    </article>
  )
}

const TicketTitle = ({
  title,
  description,
  icon,
  IconComponent = TicketIcon,
}) => {
  return (
    <div className='flex gap-2 md:gap-4 2xl:gap-6 items-center'>
      {/*icon*/}
      {icon && (
        <div className=''>
          <IconComponent responsive={true} />
        </div>
      )}

      {(title || description) && (
        <div className='flex flex-col gap-0.5'>
          <h3
            className='font-medium gradient-text-black text-lg md:text-2xl 2xl:text-4xl font-urbanist'
            style={{ lineHeight: '120%' }}
          >
            {title}
          </h3>
          <p
            className='font-montserrat font-normal leading-none text-xs md:text-base text-pale-gray md:leading-none'
            style={{
              maxWidth: '40ch',
            }}
          >
            {description}
          </p>
        </div>
      )}
    </div>
  )
}

const TicketPrice = ({
  pricing,
  currency = 'INR',
  showSize = false,
  variant = 'green',
}) => {
  if (pricing?.is_free) {
    return (
      <div className='flex flex-col gap-2 2xl:gap-2 h-12 md:h-16 2xl:h-24'>
        {/*price*/}
        <div className='flex items-center justify-center'>
          <h4
            className='font-medium font-urbanist gradient-text text-2xl md:text-3xl 2xl:text-5xl'
            style={{ lineHeight: '120%' }}
          >
            Free
          </h4>
        </div>
        {/*notes*/}
      </div>
    )
  }

  const currentPricing = pricing?.currency_prices?.find(
    (price) => price.currency === currency
  )

  if (!currentPricing) {
    return null
  }

  const displayPrice =
    currentPricing.discounted_price || currentPricing.actual_price
  const originalPrice = currentPricing.actual_price
  const hasDiscount =
    currentPricing.discounted_price &&
    currentPricing.discounted_price < currentPricing.actual_price

  const getCurrencySymbol = (curr) => {
    const symbols = {
      INR: '₹',
      USD: '$',
      EUR: '€',
      GBP: '£',
    }
    return symbols[curr] || curr
  }

  const currencySymbol = getCurrencySymbol(currency)

  if (showSize) {
    return (
      <div className='flex flex-col gap-2 2xl:gap-2'>
        {/*size*/}
        <div className='flex gap-4 items-center'>
          <SizeIcon variant={variant} responsive />
          <h5 className='gradient-text-gray font-urbanist font-medium text-xl 2xl:text-3xl'>
            {currentPricing.unit} Feet
          </h5>
        </div>

        {/*price*/}
        <div className='flex gap-4 items-center'>
          <PriceIcon variant={variant} responsive />

          <h5 className='gradient-text-gray font-urbanist font-medium text-xl 2xl:text-3xl'>
            {currencySymbol}
            {displayPrice} + GST
          </h5>
        </div>

        <div className='flex gap-4'></div>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-2 2xl:gap-2 h-12 md:h-16 2xl:h-24'>
      {/*price*/}
      <div className='flex items-center justify-center gap-2'>
        {hasDiscount && (
          <span className='text-light-gray line-through font-medium font-urbanist text-xl md:text-2xl 2xl:text-4xl'>
            {currencySymbol}
            {originalPrice}
          </span>
        )}
        <h4
          className='font-medium font-urbanist gradient-text text-2xl md:text-3xl 2xl:text-5xl'
          style={{ lineHeight: '120%' }}
        >
          {currencySymbol}
          {displayPrice} + GST
        </h4>
        <span className='text-light-gray text-sm md:text-base 2xl:text-lg'></span>
      </div>

      {/*notes*/}
      <p className='text-light-gray text-center leading-none text-xs md:text-sm 2xl:text-base'>
        {currentPricing.currency_notes}
      </p>
    </div>
  )
}

const TicketFeatures = ({ features }) => {
  if (!features || features?.length === 0) {
    return null
  }

  return (
    <div
      className='pt-0.5'
      style={{
        background:
          'linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(170, 170, 170, 1) 50%, rgba(0, 0, 0, 1) 100%)',
      }}
    >
      <div className='bg-black'>
        {/*features list*/}
        <div className='space-y-0 pt-6'>
          {features.map((feature, index) => (
            <div
              key={feature.id || index}
              className='flex items-start gap-2 md:gap-3'
            >
              {/* Bullet point */}
              <div className='w-0.5 h-0.5 bg-light-gray rounded-full flex-shrink-0 mt-2.5'></div>

              {/* Feature text */}
              <p className='text-light-gray text-sm md:text-base font-montserrat leading-normal md:leading-normal'>
                {typeof feature === 'string' ? feature : feature.feature}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { TicketCard, TicketTitle, TicketPrice, TicketFeatures }
