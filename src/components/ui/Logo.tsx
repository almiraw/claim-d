import React from 'react';
import { Scissors } from 'lucide-react';

interface LogoProps {
  variant?: 'dark' | 'light';
}

const Logo: React.FC<LogoProps> = ({ variant = 'dark' }) => {
  const textColor = variant === 'light' ? 'text-white' : 'text-neutral-900';
  
  return (
    <div className="flex items-center">
      <Scissors className={`mr-2 ${textColor}`} size={20} />
      <span className={`font-serif text-xl ${textColor}`}>
        RE_CLAIM.D
      </span>
    </div>
  );
};

export default Logo;