import backgroundImg from '../../assets/organising-committee-bg-texture.png'

const OrganisingCommitteSection = ({ data }) => {
  const { title, members } = data
  if (!members.length) {
    return (
      <section className='py-16 bg-gray-50'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl md:text-5xl font-semibold text-gray-600 mb-4'>
            {title}
          </h2>
          <p className='text-gray-500'>
            Committee members will be announced soon.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section
      className='relative text-white py-16 font-urbanist'
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className='container mx-auto px-4'>
        {/*header */}
        <h2 className='text-3xl md:text-6xl font-medium text-center mb-24 lg:mb-32'>
          {title}
        </h2>

        {/*members grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 gap-y-20 lg:gap-20 lg:gap-y-32'>
          {members.map((member, index) => (
            <MemberCard key={member.id || index} member={member} />
          ))}
        </div>
      </div>
    </section>
  )
}

const MemberCard = ({ member }) => {
  const {
    name = '',
    designation = '',
    organization = '',
    image = null,
  } = member
  const imageUrl = image?.url || null

  const getSecondWordFirstChar = (text) => {
    const words = text.trim().split(/\s+/)
    return words.length >= 2 ? words[1].charAt(0).toUpperCase() : '?'
  }

  return (
    <article
      className='relative p-[2px] rounded-xl'
      style={{
        background:
          'linear-gradient(135deg, rgba(0, 85, 255, 1) 0%, rgba(24, 191, 219, 1) 16%, rgba(245, 113, 12, 1) 86%, rgba(236, 71, 62, 1) 100%)',
      }}
    >
      <div
        className='rounded-2xl p-6 flex flex-col gap-6 items-center justify-center h-full'
        style={{
          background: 'rgba(0, 0, 0, 0.8)',
        }}
      >
        {/*profile image*/}
        <div className='w-24 h-24 lg:w-36 lg:h-36 rounded-full overflow-hidden flex-shrink-0 relative -mt-20 md:-mt-16 lg:-mt-24 gradient-border'>
          {imageUrl ? (
            <>
              <img
                src={imageUrl}
                alt={image.alt || name || 'Committee member'}
                className='w-full h-full object-cover'
                loading='lazy'
              />
            </>
          ) : (
            <div className='w-full h-full bg-black  flex items-center justify-center rounded-full'>
              <span className='text-white text-2xl md:text-3xl font-bold'>
                {name ? getSecondWordFirstChar(name) : '?'}
              </span>
            </div>
          )}
        </div>

        {/*member info*/}
        <div className='flex flex-col gap-1 items-center justify-center text-center'>
          <h3 className='text-lg md:text-xl font-semibold'>{name}</h3>
          <p className='text-sm text-gray-300 line-clamp-4 flex-grow'>
            {designation}
          </p>
          <p className='text-sm text-gray-300 line-clamp-4 flex-grow'>
            {organization}
          </p>
        </div>
      </div>
    </article>
  )
}

export default OrganisingCommitteSection
