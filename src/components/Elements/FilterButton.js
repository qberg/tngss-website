const FilterButton = ({ label, count, isActive, onClick }) => {
  return (
    <button
      className={`px-4 py-2.5 rounded-xl font-medium flex items-center gap-2 focus:outline-none
        ${isActive ? 'text-white' : 'bg-white highlight-text'} `}
      onClick={onClick}
      style={{ backgroundColor: isActive ? '#18bfdb' : '#ffffff' }}
    >
      <span className='text-lg font-bold'>{label}</span>
      <span
        className={`
        px-2 py-0.5 rounded-full text-xs font-semibold
        ${isActive ? 'bg-black/10 text-black' : 'bg-gray-600/50 text-gray-400'}
      `}
      >
        {count}
      </span>
    </button>
  )
}

export default FilterButton
