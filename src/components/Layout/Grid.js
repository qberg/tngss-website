import React from 'react'

const SpeakersGrid = React.forwardRef(({ children, className = '' }, ref) => {
  return (
    <div
      className={`${className} grid grid-cols-2 lg:grid-cols-3 gap-2 gap-y-4 md:gap-6 2xl:gap-8`}
      ref={ref}
    >
      {children}
    </div>
  )
})

export { SpeakersGrid }
