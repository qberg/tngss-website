import BlueBlob from '../../Elements/BlueBlob'

const WhyStartupTNSection = ({ data }) => {
  return (
    <section className='relative bg-cover bg-center bg-no-repeat p-4 md:p-16 2xl:p-28 flex flex-col items-start justify-center md:items-center md:justify-start gap-4 md:gap-8'>
      {/*background blob */}
      <div className='absolute inset-0 -z-10 overflow-hidden'>
        <div className='absolute bottom-64 md:bottom-0 left-0'>
          <BlueBlob />
        </div>
      </div>
      <h1 className='font-urbanist font-medium text-3xl md:text-6xl'>
        {data.title}
      </h1>

      <p className='font-urbanist font-normal text-lg md:text-2xl w-full md:w-10/12 mx-auto text-justify'>
        {data.description}
      </p>

      {/*vision*/}
      {data?.vision && <Prose {...data.vision} />}

      {/*Mission*/}
      {data?.mission && <Prose {...data.mission} />}

      {/*key highlights*/}
      {data?.keyHighlights && data.keyHighlights?.points.length > 0 && (
        <KeyHighlights {...data.keyHighlights} />
      )}
    </section>
  )
}

const KeyHighlights = ({ title, points }) => {
  return (
    <div className='flex flex-col gap-2 md:gap-6 items-start mx-auto w-full md:w-10/12'>
      <h2 className='font-urbanist font-bold text-lg md:text-3xl'>{title}:</h2>

      {/*points*/}
      <ul className='flex flex-col gap-2 md:gap-6'>
        {points.map((point) => (
          <Point key={point.id} point={point} />
        ))}
      </ul>
    </div>
  )
}

const Point = ({ point }) => {
  return (
    <div className='flex gap-4 items-start justify-start'>
      <div className='w-1.5 h-1.5 bg-white rounded-full mt-2 md:mt-4 overflow-hidden' />

      <p
        className='font-urbanist font-normal text-lg md:text-2xl'
        style={{ lineHeight: '120%' }}
      >
        {point.text}
      </p>
    </div>
  )
}

const Prose = ({ title, description }) => {
  return (
    <div className='flex flex-col gap-2 md:gap-6 items-start mx-auto w-full md:w-10/12'>
      <h2 className='font-urbanist font-bold text-lg md:text-3xl'>{title}:</h2>

      <p className='font-urbanist font-normal flex-1 text-lg md:text-2xl mx-auto text-justify'>
        {description}
      </p>
    </div>
  )
}

export default WhyStartupTNSection
