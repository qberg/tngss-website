// In FlippingCard.jsx
import React, { forwardRef } from 'react';
import './flip.css';

const FlippingCardNarrow = forwardRef(({ children, className = '', flipinvert = false, refEl }, ref) => {
  const childrenArray = Array.isArray(children) ? children : [children];
  const frontContent = childrenArray[0] || 'Front';
  const backContent = childrenArray[1] || 'Back';

  return (
    <div
      ref={refEl}
      className={`flip-card w-72 h-96 radius-2xl ${className}`}
    >
      <div className={`flip-inner radius-2xl ${flipinvert ? 'invert' : ''}`}>
        <div className="flip-front">{frontContent}</div>
        <div className="flip-back">{backContent}</div>
      </div>
    </div>
  );
});

export default FlippingCardNarrow;
