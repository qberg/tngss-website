import './flip.css'
export default function CTAButton({
  children = [],
  className = '',
  contCN = '',
  src = '/',
}) {
  return (
    <a href={src}>
      <a
        role='button'
        style={{
          lineHeight: '12px',
          textAlign: 'center',
          display: 'inline-block',
        }}
      >
        <div
          className={`button-wraper p-[2px] ${className} hover:scale-105 transition-all duration-500`}
        >
          <div
            className={`button-cnt ${contCN} transition-all duration-500 font-medium`}
          >
            {children}
          </div>
        </div>
      </a>
    </a>
  )
}
