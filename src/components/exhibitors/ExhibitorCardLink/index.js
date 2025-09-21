import { Link } from 'react-router-dom'
import { ExhibitorCard } from '../ExhibitorCard'

const ExhibitorCardLink = ({
  to,
  exhibitor,
  children,
  className,
  onClick,
  ...props
}) => {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e, exhibitor)
    }
  }

  return (
    <Link
      to={to}
      onClick={handleClick}
      className={`${className} block focus:outline-none rounded-lg md:rounded-xl`}
      {...props}
    >
      <ExhibitorCard>{children}</ExhibitorCard>
    </Link>
  )
}

export { ExhibitorCardLink }
