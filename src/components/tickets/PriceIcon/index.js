const PriceIcon = ({
  variant = 'green',
  color,
  width = 26,
  height = 27,
  strokeWidth = 2,
  className = '',
  responsive = false,
}) => {
  const colorVariants = {
    green: '#34A853',
    yellow: '#FDB633',
    cyan: '#17BFDB',
  }
  const responsiveClasses = responsive
    ? 'w-4 h-4 md:w-6 md:h-6 2xl:w-8 2xl:h-8'
    : ''

  const finalColor = color || colorVariants[variant] || colorVariants.green

  return (
    <svg
      width={responsive ? undefined : width}
      height={responsive ? undefined : height}
      viewBox='0 0 26 27'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`${responsiveClasses} ${className}`}
    >
      <path
        d='M20.1037 11.6009C21.2066 12.0121 22.1879 12.6947 22.9571 13.5857C23.7262 14.4766 24.2583 15.5471 24.5041 16.6982C24.7499 17.8492 24.7014 19.0437 24.3633 20.1711C24.0251 21.2985 23.4081 22.3224 22.5694 23.1481C21.7306 23.9739 20.6972 24.5748 19.5647 24.8954C18.4322 25.2159 17.2371 25.2457 16.09 24.982C14.9429 24.7183 13.8808 24.1695 13.002 23.3866C12.1232 22.6037 11.4559 21.6117 11.062 20.5026M7.16537 6.5026H8.33203V11.1693M18.4937 15.6959L19.3104 16.5243L16.0204 19.8143M15.332 8.83594C15.332 12.7019 12.198 15.8359 8.33203 15.8359C4.46604 15.8359 1.33203 12.7019 1.33203 8.83594C1.33203 4.96994 4.46604 1.83594 8.33203 1.83594C12.198 1.83594 15.332 4.96994 15.332 8.83594Z'
        stroke={finalColor}
        strokeWidth={strokeWidth}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  )
}

export default PriceIcon
