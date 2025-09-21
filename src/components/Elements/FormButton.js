export default function FormButton({
  children,
  className = '',
  contCN = '',
  disabled = false,
  type = 'button',
  onClick,
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`button-wraper p-[2px] ${className} hover:scale-105 transition-all duration-500 before:animate-spin disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
    >
      <div
        className={`button-cnt ${contCN} transition-all duration-500 font-medium`}
      >
        {children}
      </div>
    </button>
  )
}
