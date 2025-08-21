export const SquareTabButton = ({ tab, isActive, onClick, count }) => {
  return (
    <button
      onClick={onClick}
      className={`
	relative px-4 py-5 text-lg font-bold rounded-xl
	transition-all duration-300 ease-out 
	focus:outline-none border-none
        w-20
	${isActive ? 'text-white bg-theme-blue' : 'text-white bg-inactive-blue'}
   `}
    >
      {/*content*/}
      <span className='relative z-10 items-center gap-0.5 flex flex-col justify-center'>
        {tab.label.split(' ').map((word, index) => (
          <span key={index} className='leading-none'>
            {word}
          </span>
        ))}
      </span>
    </button>
  )
}

export const TabButton = ({ tab, isActive, onClick, count }) => {
  return (
    <button
      onClick={onClick}
      className={`
	relative px-6 py-3 text-base font-bold rounded-full
	transition-all duration-300 ease-out 
	focus:outline-none border-none
	${isActive ? 'text-white bg-[#18BFDB]' : 'text-theme-blue'}
   `}
    >
      {/*content*/}
      <span className='relative z-10 flex items-center gap-2'>{tab.label}</span>
    </button>
  )
}
