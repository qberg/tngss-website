const StickyBarSectionWrapper = ({ children, className = '' }) => {
  return <div className={`${className} flex gap-12`}>{children}</div>
}

const StickyBarWrapper = ({ children, className = '' }) => {
  return (
    <div className={`${className} hidden md:block md:w-3/12`}>{children}</div>
  )
}

const StickyBar = ({ children, className = '' }) => {
  return (
    <div
      className={`${className} hidden md:flex flex-col w-full gap-8 sticky md:top-14 2xl:top-28 overflow-hidden`}
    >
      {children}
    </div>
  )
}

const StickyBarSectionContentWrapper = ({ children, className = '' }) => {
  return <div className={`${className} w-full md:w-9/12`}>{children}</div>
}

export {
  StickyBarSectionWrapper,
  StickyBarWrapper,
  StickyBar,
  StickyBarSectionContentWrapper,
}
