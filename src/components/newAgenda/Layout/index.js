const HeaderSectionWrapper = ({ children, className }) => {
  return <div className={`flex flex-col gap-8 ${className}`}>{children}</div>
}

const TabsHeaderWrapper = ({ children, className }) => {
  return (
    <div
      className={`${className} flex flex-col gap-10 md:flex-row p-3 md:gap-28 2xl:gap-40 items-center rounded-md`}
      style={{
        background: '#222222',
        minHeight: '90px',
      }}
    >
      {children}
    </div>
  )
}

const EventsListingGrid = ({ children, className = '' }) => {
  return (
    <div className={`${className} grid grid-cols-1 md:grid-cols-2 gap-8`}>
      {children}
    </div>
  )
}

export { HeaderSectionWrapper, TabsHeaderWrapper, EventsListingGrid }
