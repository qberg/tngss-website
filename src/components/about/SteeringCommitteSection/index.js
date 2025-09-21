import backgroundImg from '../../../assets/organising-committee-bg-texture.png'

const SteeringCommitteSection = ({ data }) => {
  const { title, members } = data

  if (!members.length) {
    return (
      <section className='py-16 bg-gray-50'>
        <div className='mx-auto px-4 text-center'>
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
      <div className='px-4 md:px-16 2xl:px-28'>
        {/*header */}
        <h2 className='text-3xl md:text-6xl font-medium text-center mb-12 md:mb-16'>
          {title}
        </h2>

        {/*members flexbox */}
        <div className='flex flex-wrap justify-center gap-4 lg:gap-20'>
          {members.map((member, index) => (
            <div
              key={member.id || index}
              className='w-full md:w-3/12 flex-shrink-0'
            >
              <MemberCard member={member} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const MemberCard = ({ member }) => {
  const { name = '', designation = '', organization = '' } = member

  return (
    <article
      className='relative p-1 rounded-xl h-full'
      style={{
        background:
          'linear-gradient(135deg, rgba(0, 85, 255, 1) 0%, rgba(24, 191, 219, 1) 16%, rgba(245, 113, 12, 1) 86%, rgba(236, 71, 62, 1) 100%)',
      }}
    >
      <div
        className='rounded-xl p-6 flex flex-col gap-6 items-center justify-center h-full'
        style={{
          background: 'rgba(0, 0, 0, 0.8)',
        }}
      >
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

export default SteeringCommitteSection
