export default function ShineButton({
  children = [],
  className = '',
  contCN = '',
  src = '/',
}) {
  return (
    <a
      className=''
      href={src}
      role='button'
      style={{
        lineHeight: '',
        textAlign: 'center',
        display: 'inline-block',
      }}
    >
      <div
        className={`button-wraper p-[2px] ${className} hover:scale-105 transition-all duration-500 before:animate-spin`}
      >
        <div
          className={`button-cnt ${contCN} transition-all duration-500  font-medium`}
        >
          {children}
        </div>
      </div>
    </a>
  )
}
