;<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
  {/* Date & Time */}
  {event?.schedule && (
    <div className='bg-gray-900 rounded-xl p-4 hover:bg-gray-800 transition-all duration-300 border border-transparent hover:border-[#18BFDB]/30'>
      <div className='flex items-start gap-3'>
        <Calendar size={20} className='text-[#18BFDB] mt-1 flex-shrink-0' />
        <div>
          <h4 className='text-[#18BFDB] font-semibold text-sm uppercase tracking-wider mb-1'>
            Schedule
          </h4>
          <p className='text-white font-medium'>
            {formatDate(event.schedule.from_date)}
          </p>
          <p className='text-gray-400 text-sm'>
            {formatTime(event.schedule.from_date)} -{' '}
            {formatTime(event.schedule.to_date)}
          </p>
          <p className='text-gray-500 text-xs mt-1'>
            Duration:{' '}
            {getDuration(event.schedule.from_date, event.schedule.to_date)}
          </p>
        </div>
      </div>
    </div>
  )}

  {/* Venue */}
  {event?.partner_event_venue && (
    <div className='bg-gray-900 rounded-xl p-4 hover:bg-gray-800 transition-all duration-300 border border-transparent hover:border-[#18BFDB]/30'>
      <div className='flex items-start gap-3'>
        <MapPin size={20} className='text-[#18BFDB] mt-1 flex-shrink-0' />
        <div className='flex-1'>
          <h4 className='text-[#18BFDB] font-semibold text-sm uppercase tracking-wider mb-1'>
            Venue
          </h4>
          <p className='text-white font-medium text-sm leading-relaxed'>
            {event.partner_event_venue.venue}
          </p>
          <p className='text-gray-400 text-sm'>
            {event.partner_event_venue.city.name}
          </p>
          <span className='inline-block mt-2 px-2 py-1 bg-green-900 text-green-300 text-xs rounded-full'>
            {event.partner_event_venue.event_mode}
          </span>
        </div>
      </div>
    </div>
  )}

  {/* Capacity */}
  {event?.fcfs_settings?.capacity_settings && (
    <div className='bg-gray-900 rounded-xl p-4 hover:bg-gray-800 transition-all duration-300 border border-transparent hover:border-[#18BFDB]/30'>
      <div className='flex items-start gap-3'>
        <Users size={20} className='text-[#18BFDB] mt-1 flex-shrink-0' />
        <div>
          <h4 className='text-[#18BFDB] font-semibold text-sm uppercase tracking-wider mb-1'>
            Capacity
          </h4>
          <p className='text-white font-medium'>
            {event.current_registerations || 0} /{' '}
            {event.fcfs_settings.capacity_settings.max_capacity}
          </p>
          <div className='mt-2 w-full bg-gray-700 rounded-full h-2'>
            <div
              className='bg-gradient-to-r from-[#18BFDB] to-blue-500 h-2 rounded-full transition-all duration-500'
              style={{
                width: `${
                  ((event.current_registerations || 0) /
                    event.fcfs_settings.capacity_settings.max_capacity) *
                  100
                }%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )}

  {/* Map Link */}
  {event?.partner_event_venue?.map_url && (
    <div className='bg-gray-900 rounded-xl p-4 hover:bg-gray-800 transition-all duration-300 border border-transparent hover:border-[#18BFDB]/30'>
      <a
        href={event.partner_event_venue.map_url}
        target='_blank'
        rel='noopener noreferrer'
        className='flex items-start gap-3 group'
      >
        <ExternalLink
          size={20}
          className='text-[#18BFDB] mt-1 flex-shrink-0 group-hover:scale-110 transition-transform'
        />
        <div>
          <h4 className='text-[#18BFDB] font-semibold text-sm uppercase tracking-wider mb-1 group-hover:text-blue-400'>
            Location
          </h4>
          <p className='text-white font-medium group-hover:text-gray-300'>
            View on Maps
          </p>
          <p className='text-gray-400 text-sm'>Get directions</p>
        </div>
      </a>
    </div>
  )}
</div>
