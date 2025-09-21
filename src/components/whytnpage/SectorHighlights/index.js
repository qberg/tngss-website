import React from 'react'
import introBackground from '../../../assets/img/about-sec-pg.png'
import GradientBdrCard from '../../Elements/GradientBorderCard'
import { useSectorHighlightsData } from '../../../hooks/useQueryApi'
import useEmblaCarousel from 'embla-carousel-react'
import { NextButton, PrevButton, usePrevNextButtons } from './Buttons'

const SectorHighlights = () => {
  const { data: sectorHighlights, isLoading, error } = useSectorHighlightsData()

  return (
    <GradientBdrCard>
      <div
        className='text-black py-4 md:py-12 2xl:py-28'
        style={{
          backgroundImage: `url(${introBackground})`,
        }}
      >
        <h3 className='font-urbanist font-medium text-2xl md:text-5xl 2xl:text-6xl px-4 md:px-16 2xl:px-28 '>
          {sectorHighlights?.title}
        </h3>
        <div className='font-urbanist font-medium text-xl md:text-2xl my-4 2xl:text-4xl md:leading-tight md:my-4 2xl:my-6 px-4 md:px-16 2xl:px-28 '>
          {sectorHighlights?.powerhouse.title}
        </div>
        <div className='mb-12 px-4 md:px-16 2xl:px-28 '>
          {sectorHighlights?.powerhouse.points.map((point) => (
            <Point key={point.id} point={point} />
          ))}
        </div>
        {/*cards carousel */}
        {sectorHighlights?.leadership &&
          sectorHighlights.leadership?.sector_cards.length > 0 && (
            <CardsCarousel
              title={sectorHighlights.leadership.title}
              cards={sectorHighlights.leadership.sector_cards}
            />
          )}
      </div>
    </GradientBdrCard>
  )
}

const CardsCarousel = ({ title, cards }) => {
  const options = {
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 },
      '(min-width: 1440px)': { slidesToScroll: 3 },
    },
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi)

  return (
    <div className=''>
      <div className='flex w-full items-center justify-between mb-6 md:mb-8 2xl:mb-12 px-4 md:px-16 2xl:px-28'>
        <h3 className='font-urbanist font-medium text-xl md:text-2xl 2xl:text-4xl md:leading-tight'>
          {title}
        </h3>

        <div className='mt-6 md:mt-8 2xl:mt-12 flex justify-between items-center'>
          <div className='flex gap-3 md:gap-4'>
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        </div>
      </div>

      <section className='embla px-4 md:px-16 2xl:px-28'>
        <div className='embla__viewport' ref={emblaRef}>
          <div className='embla__container flex'>
            {cards.map((card, index) => (
              <div
                className='embla__slide flex-none w-3/4 md:w-1/2 lg:w-1/4 pr-4 md:pr-6 2xl:pr-8 h-60 md:h-80 2xl:h-96'
                key={card.id || index}
              >
                <SectorCard title={card.title} description={card.description} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

const SectorCard = ({ title, description }) => {
  return (
    <GradientBdrCard className='rounded-2xl h-full'>
      <div
        className='flex flex-col w-full p-4 md:p-6 2xl:p-8 gap-3 md:gap-5 2xl:gap-8 rounded-2xl h-full'
        style={{ background: '#F4F4F4' }}
      >
        <h4
          className='font-normal text-2xl md:text-3xl 2xl:text-4xl'
          style={{ lineHeight: '120%' }}
        >
          {title || 'Auto & Auto Components'}
        </h4>
        <p
          className='font-light font-urbanist text-xs md:text-base text-text-gray'
          style={{ lineHeight: '110%' }}
        >
          {description ||
            "One of India's largest producers. Chennai, known as the Detroit of Asia, houses global majors like Hyundai, BMW, BYD, Ashok Leyland and TVS."}
        </p>
      </div>
    </GradientBdrCard>
  )
}

const Point = ({ point }) => {
  return (
    <p className='font-normal font-urbanist text-base leading-none md:text-2xl text-black'>
      <span className='font-bold'>•</span>
      <span className='font-normal ml-2 md:ml-4' style={{ lineHeight: '120%' }}>
        {point.point}
      </span>
    </p>
  )
}

export default SectorHighlights
