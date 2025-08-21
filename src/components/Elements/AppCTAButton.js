import useQRCode from '../../hooks/useQRCode'
import './flip.css'
import QRHover from './QRHover'

export default function AppCTAButton({
  children = [],
  className = '',
  contCN = '',
  qrCodeUrl = '',
  showQR = false,
  icon = null,
  minWidth = '120px',
  qrPosition = 'top',
  qrSize = 'w-28 h-28',
}) {
  const { isQRVisible, qrHandlers } = useQRCode(showQR)

  return (
    <div className='relative inline-block'>
      <a href={qrCodeUrl} target='_blank' rel='noopener noreferrer'>
        <div
          role='button'
          style={{
            lineHeight: '12px',
            textAlign: 'center',
            display: 'inline-block',
            minWidth: minWidth,
          }}
          {...qrHandlers}
        >
          <div
            className={`button-wraper p-[2px] ${className} hover:scale-105 transition-all duration-500`}
          >
            <div
              className={`button-cnt ${contCN} transition-all duration-500 font-medium px-3 py-1.5 flex items-center justify-center gap-2`}
            >
              <span className='flex-1'>{children}</span>
              {icon && <span className='flex-shrink-0 ml-1'>{icon}</span>}
            </div>
          </div>
        </div>
      </a>

      {/* QR Code Overlay */}
      <QRHover isVisible={isQRVisible} qrCodeUrl={qrCodeUrl} />
    </div>
  )
}
