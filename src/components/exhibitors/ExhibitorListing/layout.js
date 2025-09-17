const ExhibitorListingGrid = ({ children, className = '' }) => {
  return (
    <div
      className={`${className} grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8`}
    >
      {children}
    </div>
  )
}

export { ExhibitorListingGrid }
