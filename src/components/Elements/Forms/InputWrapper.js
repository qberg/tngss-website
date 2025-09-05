const InputWrapper = ({ children }) => (
  <div
    className='rounded-md overflow-hidden'
    style={{
      background: 'linear-gradient(150deg, #007fcf, #f56b0d)',
      padding: '1px',
    }}
  >
    <div className='bg-black rounded-md'>{children}</div>
  </div>
)

export default InputWrapper
