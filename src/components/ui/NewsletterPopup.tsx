import React from 'react';
import { X } from 'lucide-react';
import NewsletterForm from './NewsletterForm';

interface NewsletterPopupProps {
  onClose: () => void;
}

const NewsletterPopup: React.FC<NewsletterPopupProps> = ({ onClose }) => {
  const handleSubmit = (email: string, name: string, preferences: string) => {
    // In a real application, this would send the data to your backend
    console.log('Newsletter subscription:', { email, name, preferences });
    
    // Close popup after successful submission
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-md w-full p-8 relative animate-fade-in-up">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-900"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-serif mb-2">Join Our Community</h2>
          <p className="text-neutral-600">
            Subscribe to our newsletter and get 10% off your first purchase.
          </p>
        </div>
        
        <NewsletterForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default NewsletterPopup;