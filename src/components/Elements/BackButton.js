const { ArrowLeft } = require('lucide-react')

const BackButton = ({ href, label }) => {
  return (
    <a
      href={href}
      className='w-fit flex justify-start items-center gap-4 mb-2 group hover:scale-105 transition-transform duration-200'
    >
      <div className='text-white group-hover:text-[#18BFDB] transition-colors transform group-hover:-translate-x-1 duration-300'>
        <ArrowLeft size={24} />
      </div>
      <p className='text-4xl md:text-6xl uppercase gradient-white'>{label}</p>
    </a>
  )
}

export default BackButton
