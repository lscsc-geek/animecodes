import React from 'react';

export const LogoIcon = ({ className = '' }: { className?: string }) => (
  <svg 
    className={className}
    width="40" 
    height="40" 
    viewBox="0 0 40 40" 
    fill="none"
  >
    <rect width="40" height="40" rx="8" fill="#4F46E5"/>
    <path d="M20 10l8 20H12l8-20z" fill="white"/>
  </svg>
); 