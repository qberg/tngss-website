import React from 'react'
import InputWrapper from '../../InputWrapper'

const PhoneInput = ({ field, fieldApi, inputClasses }) => {
  const handleChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 10)
    fieldApi.handleChange(digits)
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text')
    const digits = pastedData
      .replace(/^\+91\s?/, '')
      .replace(/\D/g, '')
      .slice(0, 10)
    fieldApi.handleChange(digits)
  }

  return (
    <div className='relative'>
      <InputWrapper>
        <div className='relative'>
          {/* Input field */}
          <input
            type='tel'
            value={fieldApi.state.value || ''}
            onChange={handleChange}
            onPaste={handlePaste}
            onBlur={fieldApi.handleBlur}
            className={`${inputClasses} pl-16`}
            placeholder='9876543210'
            maxLength={10}
          />
        </div>
      </InputWrapper>

      <div className='mt-1 text-xs text-gray-500'>
        Enter 10-digit mobile number without +91
      </div>
    </div>
  )
}

export { PhoneInput as AdvancedPhoneInput, PhoneInput as SimplePhoneInput }
