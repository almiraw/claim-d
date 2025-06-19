import React from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  buttonText?: string;
  buttonLink?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  backgroundImage,
  buttonText,
  buttonLink = '/portfolio',
}) => {
  return (
    <div 
      className="relative h-screen flex items-center justify-center text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="text-center px-4 max-w-3xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto text-neutral-100">
          {subtitle}
        </p>
        {buttonText && (
          <Link to={buttonLink}>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:bg-opacity-10"
            >
              {buttonText}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HeroSection;