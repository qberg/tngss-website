import { FaGooglePlay, FaApple } from 'react-icons/fa'
import useQRCode from '../../hooks/useQRCode'
import QRHover from './QRHover'

const AppButton = ({ variant, url = '#', className = '', showQR = true }) => {
  const { isQRVisible, qrHandlers } = useQRCode(showQR)
  console.log(isQRVisible)

  const variants = {
    playstore: {
      icon: <FaGooglePlay />,
      title: 'GET IT ON',
      subtitle: 'Google Play',
      bgColor: 'bg-black hover:bg-gray-800',
      textColor: 'text-white',
    },
    appstore: {
      icon: <FaApple />,
      title: 'Download on the',
      subtitle: 'App Store',
      bgColor: 'bg-black hover:bg-gray-800',
      textColor: 'text-white',
    },
  }

  const config = variants[variant]

  if (!config) {
    console.warn(
      `AppButton: Invalid variant "${variant}". Use "playstore" or "appstore".`
    )
    return null
  }

  return (
    <div className='inline-block relative'>
      <a
        href={url}
        target='_blank'
        rel='noopener noreferrer'
        className={`
          ${config.bgColor} 
          ${config.textColor} 
          inline-flex items-center gap-3 
          rounded-lg border-2 border-white
          transition-all duration-200 
          hover:scale-105 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
          px-4 py-2
          min-w-[160px] h-[60px]
          ${className}
        `}
        {...qrHandlers}
      >
        {/* Icon */}
        <div className='text-2xl flex-shrink-0'>{config.icon}</div>

        {/* Text Content */}
        <div className='flex flex-col items-start justify-center flex-1'>
          <span className='text-xs font-normal leading-none uppercase tracking-wide text-white whitespace-nowrap'>
            {config.title}
          </span>
          <span className='text-sm font-semibold leading-tight text-white whitespace-nowrap'>
            {config.subtitle}
          </span>
        </div>
      </a>

      {/* QR Code Overlay */}
      <QRHover isVisible={isQRVisible} qrCodeUrl={url} />
    </div>
  )
}

export default AppButton
