const SizeIcon = ({
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
        d='M15.9174 14.088L18.2507 11.7547M12.4174 10.588L14.7507 8.25465M8.91741 7.08799L11.2507 4.75465M19.4174 17.588L21.7507 15.2547M23.8507 17.3547C24.1118 17.6148 24.3189 17.9239 24.4602 18.2642C24.6015 18.6046 24.6743 18.9695 24.6743 19.338C24.6743 19.7065 24.6015 20.0714 24.4602 20.4117C24.3189 20.7521 24.1118 21.0612 23.8507 21.3213L20.8174 24.3546C20.5573 24.6157 20.2482 24.8228 19.9078 24.9641C19.5675 25.1054 19.2026 25.1782 18.8341 25.1782C18.4656 25.1782 18.1007 25.1054 17.7603 24.9641C17.42 24.8228 17.1109 24.6157 16.8507 24.3546L2.15075 9.65465C1.6264 9.12776 1.33203 8.41466 1.33203 7.67132C1.33203 6.92797 1.6264 6.21488 2.15075 5.68799L5.18408 2.65465C5.71097 2.1303 6.42407 1.83594 7.16741 1.83594C7.91076 1.83594 8.62385 2.1303 9.15075 2.65465L23.8507 17.3547Z'
        stroke={finalColor}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default SizeIcon
