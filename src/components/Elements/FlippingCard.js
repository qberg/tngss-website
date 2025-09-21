// In FlippingCard.jsx
import React, { forwardRef, useRef } from 'react'
import './flip.css'
import { useIsMobile } from '../../hooks/test_hooks/useIsMobile'

const FlippingCard = forwardRef(
  ({ children, className = '', flipinvert = false, refEl }, ref) => {
    const isMobile = useIsMobile()
    const childrenArray = Array.isArray(children) ? children : [children]
    const frontContent = childrenArray[0] || 'Front'
    const backContent = childrenArray[1] || 'Back'
    const flipped = useRef(false)

    function handleTouch(e) {
      const el = e.currentTarget

      flipped.current = !flipped.current

      // Toggle inline styles
      if (flipped.current) {
        el.style.transform = 'rotateY(180deg)'
      } else {
        el.style.transform = 'rotateY(0deg)'
      }
    }

    return (
      <div ref={refEl} className={`flip-card radius-2xl ${className}`}>
        <div
          onClick={handleTouch}
          className={`flip-inner radius-2xl ${flipinvert ? 'invert' : ''}`}
        >
          <div className='flip-front'>{frontContent}</div>
          <div className='flip-back'>{backContent}</div>
        </div>
      </div>
    )
  }
)

export default FlippingCard
