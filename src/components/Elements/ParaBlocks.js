const ParaSplitBlocks = ({ paras }) => {
  return (
    <div
      className='text-lg 2xl:text-2xl max-w-none text-justify font-normal opacity-90'
      style={{ lineHeight: '120%' }}
    >
      {paras.split('\n').map(
        (paragraph, index) =>
          paragraph.trim() && (
            <p
              key={index}
              className={`text-gray-300 ${
                index < paras.split('\n').length - 1 ? 'mb-4' : 'mb-0'
              }`}
            >
              {paragraph}
            </p>
          )
      )}
    </div>
  )
}

export default ParaSplitBlocks
