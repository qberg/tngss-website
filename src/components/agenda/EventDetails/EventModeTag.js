const EventModeTag = ({ mode }) => {
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

  return (
    <div className='text-white px-3 py-1.5 text-sm rounded-full inline-flex items-center gap-1.5'>
      {/* Pulse indicator */}
      <div className='relative'>
        <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse' />
        <div className='absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-75' />
      </div>

      {/* Mode text */}
      {capitalize(mode)}
    </div>
  )
}

export default EventModeTag
