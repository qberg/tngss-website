const SectionWrapper = ({ children, className }) => {
  return (
    <section
      className={`${className} bg-black px-4 pb-8 md:px-24 2xl:px-44 py-4 md:py-14 2xl:py-24 flex flex-col gap-8 md:gap-14 2xl:gap-24`}
    >
      {children}
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

export { SectionWrapper, SectionHeader, SectionTitle }
