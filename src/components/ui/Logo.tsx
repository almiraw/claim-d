import React from 'react';

interface LogoProps {
  variant?: 'dark' | 'light';
}

const Logo: React.FC<LogoProps> = ({ variant = 'dark' }) => {
  return (
    <div className="flex items-center">
      <img 
        src="/WhatsApp Image 2025-06-23 at 15.36.01.jpeg" 
        alt="Claim'D Logo" 
        className="h-10 w-auto"
      />
    </div>
  );
};

export default Logo;