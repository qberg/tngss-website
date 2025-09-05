import { useEventHighlights } from "../../../../hooks/useQueryApi"
import EventHighlightsNumber from "../../../Elements/EventHighlightsNumber"
import GradientBdrCard from "../../../Elements/GradientBorderCard"

const EventHighlights = () => {
    const { data: eventHighlights, isLoading, error } = useEventHighlights()
    return (
        <GradientBdrCard
            className='p-0.5 w-full h-fit md:w-11/12 rounded-3xl mx-2 md:mx-auto my-12'
            style={{
                
            }}
        >
            <div
              className='px-10 md:pl-20 md:pr-12 py-10 bg-black rounded-3xl flex flex-col'
              style={{
                  backgroundImage: `url('/assets/spons-bg.png)`
              }}
            >
                <div className='w-full text-white text-5xl md:text-7xl mb-8 2xl:mb-20 font-medium font-urbanist gradient-text-black md:leading-relaxed text-center md:text-left'>
                    <h3 className='uppercase'>
                        {eventHighlights?.title}
                    </h3>
                </div>
                <div
                    className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-8 auto-rows-fr auto-cols-fr'
                    style={{
                        gridTemplateRows: 'fit-content(200px)'
                    }}
                >
                    {eventHighlights?.impact_numbers.map((info) => (
                        <EventHighlightsNumber
                            key={info.id}
                            number={info.number}
                            description={info.description}
                        />
                    ))}
                </div>
            </div>
        </GradientBdrCard>
    )
}

export default EventHighlights