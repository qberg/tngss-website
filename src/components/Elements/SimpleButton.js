const SimpleButton = ({
  children,
  variant = 'blue',
  fill = false,
  className = '',
  disabled = false,
  onClick,
  ...props
}) => {
  const variants = {
    blue: 'linear-gradient(135deg,rgba(0, 85, 255, 1) 0%, rgba(24, 191, 219, 1) 100%)',
    purple:
      'linear-gradient(135deg, rgba(148, 75, 255, 0.8) 0%, rgba(37, 0, 249, 0.8) 100%)',
    green:
      'linear-gradient(135deg, rgba(52, 168, 83, 1) 0%, rgba(34, 197, 94, 1) 100%)',
    yellow:
      'linear-gradient(135deg, rgba(253, 182, 51, 1) 0%, rgba(251, 146, 60, 1) 100%)',
    cyan: 'linear-gradient(135deg, rgba(23, 191, 219, 1) 0%, rgba(14, 165, 233, 1) 100%)',
  }

  const baseClasses =
    'rounded-lg font-medium font-montserrat text-base disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 focus:outline-none'

  if (fill) {
    return (
      <button
        className={`${baseClasses} text-white px-2.5 py-3.5 ${className}`}
        style={{
          background: variants[variant] || variants.blue,
          lineHeight: '120%',
        }}
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    )
  }

  return (
    <div
      className='p-0.5 rounded-lg'
      style={{
        background: variants[variant] || variants.blue,
      }}
    >
      <button
        className={`${baseClasses} bg-black rounded-md w-full px-2 py-3 ${className}`}
        style={{
          lineHeight: '120%',
        }}
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    </div>
  )
}

export default SimpleButton
