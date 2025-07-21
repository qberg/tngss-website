import React from 'react';

export default function GradientBdrCard({ className = '', children }) {
  return (
    <div className={`gradient-border ${className} overflow-hidden`}>
      <div className="gradient-inner overflow-hidden ">
        {children}
      </div>
    </div>
  );
}
