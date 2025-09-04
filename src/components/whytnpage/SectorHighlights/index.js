import introBackground from '../../../assets/img/about-sec-pg.png'
import GradientBdrCard from '../../Elements/GradientBorderCard'
import { useSectorHighlightsData } from '../../../hooks/useQueryApi'
import SectorCard from '../../Elements/SectorCard'

const SectorHighlights = () => {
  const { data: sectorHighlights, isLoading, error } = useSectorHighlightsData()
  return (
    <GradientBdrCard>
      <div
        className='text-black p-12'
        style={{
          backgroundImage: `url(${introBackground})`,
        }}
      >
        <h3 className='font-urbanist font-medium text-2xl md:text-5xl 2xl:text-6xl'>
          {sectorHighlights?.title}
        </h3>
        <div className='font-urbanist font-medium text-xl md:text-2xl 2xl:text-4xl md:leading-tight md:my-4'>
          {sectorHighlights?.powerhouse.title}
        </div>
        {sectorHighlights?.powerhouse.points.map((point) => (
          <p key={point.id}>
            <span className='text-black font-bold text-2xl md:mb-0'>•</span>
            <span className='font-urbanist font-normal md:leading-tight ml-4'>
              {point.point}
            </span>
          </p>
        ))}
        <div className='font-urbanist font-medium text-xl md:text-2xl 2xl:text-4xl md:leading-tight md:mb-4 md:mt-8 '>
          {sectorHighlights?.leadership.title}
        </div>
        <div className='flex flex-row'>
          {sectorHighlights?.leadership.sector_cards.map((card) => (
            <SectorCard
              key={card.id}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </GradientBdrCard>
  )
}

export default SectorHighlights
