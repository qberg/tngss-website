import { useState } from 'react'

const useQRCode = (showQR = false) => {
  const [isQRVisible, setIsQRVisible] = useState(false)

  const handleQRToggle = (e) => {
    e.preventDefault()
    setIsQRVisible(!isQRVisible)
  }

  const qrHandlers = showQR
    ? {
        onMouseEnter: handleQRToggle,
        onMouseLeave: handleQRToggle,
      }
    : {}

  return {
    isQRVisible,
    setIsQRVisible,
    handleQRToggle,
    qrHandlers,
  }
}

export default useQRCode
