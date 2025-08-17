import bg from '../../../assets/about-us-intro.svg?url'

const WhyTamilNaduSection = ({ title, description }) => {
  return (
    <section className='relative bg-cover bg-center bg-no-repeat p-4 md:p-16 2xl:p-28 flex flex-col items-start justify-center md:items-center md:justify-start gap-4 md:gap-8'>
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20'
        style={{ backgroundImage: `url(${bg})` }}
      />

      <h1 className='font-urbanist font-medium text-3xl md:text-6xl'>
        {title}
      </h1>

      <p className='text-left font-urbanist font-normal text-lg md:text-2xl w-full md:w-3/4 mx-auto'>
        {description}
      </p>
    </section>
  )
}

export default WhyTamilNaduSection
