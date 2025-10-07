import { useAgenda } from '../server/context/MainAgendaContext'

const MainAgendaHallContent = () => {
  const { draftFilters, filterOptions } = useAgenda()

  const selectedHallSlug = draftFilters.hall || 'all'
  const selectedHall = filterOptions?.available?.halls?.find(
    (hall) => hall.slug === selectedHallSlug
  )

  if (!selectedHall || selectedHallSlug === 'all') {
    return null
  }

  return (
    <div className='border-2 border-bg-gray flex flex-col gap-2 p-4 w-full rounded-lg'>
      <div className='w-full md:w-7/12 mx-auto'>
        <div className='flex flex-col gap-2'>
          <h3
            className='font-semibold gradient-text-black text-2xl md:text-3xl'
            style={{
              lineHeight: '110%',
              padding: '2px',
            }}
          >
            {selectedHall.name}
          </h3>
          {selectedHall.content && (
            <p className='text-white'>{selectedHall.content}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default MainAgendaHallContent
