const PrimaryContentBlockWrapper = ({ className, children }) => {
  return (
    <div
      className={`w-full flex flex-col lg:flex-row gap-8 lg:gap-16 ${className}`}
    >
      {children}
    </div>
  )
}

const PrimaryImageWrapper = ({ className, children }) => {
  return (
    <div className={`w-full lg:w-5/12 ${className}`}>
      <div className='w-full aspect-w-13 aspect-h-8'>{children}</div>
    </div>
  )
}

const PrimaryContentWrapper = ({ className, children }) => {
  return (
    <div className={`w-full lg:w-7/12 flex flex-col gap-2 ${className}`}>
      {children}
    </div>
  )
}

const PrimaryContentTitle = ({ className, children, variant = 'primary' }) => {
  const baseClasses = 'font-urbanist font-semibold'

  const variants = {
    primary: `text-white text-3xl md:text-4xl 2xl:text-5xl gradient-text-black ${baseClasses}`,
    secondary: `mt-4 mb-0 text-xl md:text-3xl 2xl:text-4xl ${baseClasses}`,
  }

  const variantStyles = {
    secondary: { color: '#17bfdb' },
    primary: { lineHeight: '115%' },
  }

  const tags = {
    primary: 'h1',
    secondary: 'h3',
  }

  const Tag = tags[variant]

  return (
    <Tag
      className={`${variants[variant]} ${className}`}
      style={variantStyles[variant]}
    >
      {children}
    </Tag>
  )
}

const PrimaryContentRow = ({ className, children }) => {
  return (
    <div
      className={`${className} flex flex-row gap-2 md:gap-4 items-center flex-wrap`}
    >
      {children}
    </div>
  )
}

const PrimaryContentGrid = ({ className, children }) => {
  return (
    <div
      className={`${className} gap-3 md:gap-2 md:gap-x-8 grid grid-cols-3 md:grid-cols-5 2xl:grid-cols-6 2xl:gap-x-6`}
    >
      {children}
    </div>
  )
}

export {
  PrimaryContentBlockWrapper,
  PrimaryImageWrapper,
  PrimaryContentWrapper,
  PrimaryContentTitle,
  PrimaryContentRow,
  PrimaryContentGrid,
}
