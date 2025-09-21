const GenericLink = ({
  href,
  label,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  target = '_blank',
  className = '',
  iconSize = 14,
  style = {},
}) => {
  const defaultStyle = {
    color: '#17bfdb',
    lineHeight: '100%',
    ...style,
  }

  return (
    <a
      href={href}
      target={target}
      className={`flex items-center gap-1 text-gray-300 font-semibold font-urbanist underline ${className}`}
      style={defaultStyle}
    >
      {LeftIcon && <LeftIcon size={iconSize} />}
      <span>{label}</span>
      {RightIcon && <RightIcon size={iconSize} />}
    </a>
  )
}

export default GenericLink
