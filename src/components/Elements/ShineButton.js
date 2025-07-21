export default function ShineButton({
  children = [],
  className = '',
  contCN = '',
  src = '/'
}) {
  return (
      <a 
      className=""
      href={src}
        role="button" 
        style={{
          lineHeight: '',
          textAlign : 'center',
          display: 'inline-block'
        }}
            >
        {/* The wrapper is responsible for padding */}
            {/* padding will work as border width */}
            <div  className={`button-wraper p-[2px] ${className} hover:scale-105 transition-all duration-500 before:animate-spin`}
            // style={{
            //   .button-wraper::before {
            //     content: '';
            //     position: absolute;
            //     top: 0;
            //     left: 0;
            //     width: 100%;
            //     height: 100%;
            //     border: 2px solid transparent; /* Adjust as needed */
            //     border-radius: inherit; /* Match the button's border radius */
            //     animation: spin 1s linear infinite;
            //   }

            //   @keyframes spin {
            //     0% { transform: rotate(0deg); }
            //     100% { transform: rotate(360deg); }
            //   }
            // }}
            >
            <div className={`button-cnt ${contCN} transition-all duration-500  font-medium`} >
                
            {children}
            </div>
        </div>
      </a>
  );
}
