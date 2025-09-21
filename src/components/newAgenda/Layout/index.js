const HeaderSectionWrapper = ({ children, className }) => {
  return <div className={`flex flex-col gap-8 ${className}`}>{children}</div>
}

const TabsHeaderWrapper = ({ children, className }) => {
  return (
    <div
      className={`${className} flex flex-col gap-10 md:flex-row p-3 md:justify-between items-center rounded-md`}
      style={{
        background: '#222222',
        minHeight: '90px',
      }}
    >
      {children}
    </div>
  )
}

export { HeaderSectionWrapper, TabsHeaderWrapper }
