const SectionWrapper = ({ children, className, variant = 'default' }) => {
  const variants = {
    default: 'px-4 md:px-24 2xl:px-44',
    wide: 'px-4 md:px-16 2xl:px-28',
  }
  return (
    <section
      className={`${className} ${variants[variant]} bg-black pb-8 py-4 md:py-14 2xl:py-24 flex flex-col gap-8 md:gap-14 2xl:gap-14`}
    >
      {children}
    </section>
  )
}

const GradientSectionWrapper = ({ children, className }) => {
  return (
    <section className={`relative bg-black ${className}`}>
      <div
        className='w-full h-full'
        style={{
          background:
            'linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(170, 170, 170, 1) 50%, rgba(0, 0, 0, 1) 100%)',
          padding: '1px',
        }}
      >
        <div className='bg-black px-4 pb-8 md:px-24 2xl:px-44 py-4 md:py-14 2xl:py-24 flex flex-col gap-8 md:gap-14 2xl:gap-24'>
          {children}
        </div>
      </div>
    </section>
  )
}

const SectionHeader = ({ children, className }) => {
  return (
    <div className={`${children} flex flex-row justify-between items-center`}>
      {children}
    </div>
  )
}

const SectionTitle = ({ children, className }) => {
  return (
    <h2
      className={`uppercase text-3xl md:text-6xl text-white font-medium gradient-text-black  ${className}`}
    >
      {children}
    </h2>
  )
}

export { SectionWrapper, SectionHeader, SectionTitle, GradientSectionWrapper }
