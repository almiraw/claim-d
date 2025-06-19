import React, { useState } from 'react';
import Button from './Button';

interface NewsletterFormProps {
  variant?: 'light' | 'dark';
  onSubmit?: (email: string, name: string, preferences: string) => void;
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({ 
  variant = 'dark',
  onSubmit 
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [preferences, setPreferences] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const textColor = variant === 'light' ? 'text-white' : 'text-neutral-900';
  const borderColor = variant === 'light' ? 'border-neutral-700' : 'border-neutral-300';
  const labelColor = variant === 'light' ? 'text-neutral-300' : 'text-neutral-600';
  const inputBg = variant === 'light' ? 'bg-neutral-800' : 'bg-white';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // In a real app, this would be an API call to your backend
      // For now, we'll simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Call the onSubmit callback if provided
      if (onSubmit) {
        onSubmit(email, name, preferences);
      }

      // Store the email in localStorage to remember this user has subscribed
      localStorage.setItem('subscribedEmail', email);
      
      // Show success message
      setIsSuccess(true);
      
      // Reset form
      setEmail('');
      setName('');
      setPreferences('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={`text-center ${textColor}`}>
        <h3 className="text-lg font-medium mb-2">Thank you for subscribing!</h3>
        <p>Your 10% discount code will be sent to your email shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-4">
        <label htmlFor="name" className={`block text-sm font-medium mb-2 ${labelColor}`}>
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full px-3 py-2 border ${borderColor} ${inputBg} focus:outline-none focus:ring-1 focus:ring-neutral-900`}
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="email" className={`block text-sm font-medium mb-2 ${labelColor}`}>
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full px-3 py-2 border ${borderColor} ${inputBg} focus:outline-none focus:ring-1 focus:ring-neutral-900`}
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="preferences" className={`block text-sm font-medium mb-2 ${labelColor}`}>
          Style Preferences
        </label>
        <select
          id="preferences"
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
          className={`w-full px-3 py-2 border ${borderColor} ${inputBg} focus:outline-none focus:ring-1 focus:ring-neutral-900`}
          required
        >
          <option value="">Select your style preference</option>
          <option value="casual">Casual</option>
          <option value="formal">Formal</option>
          <option value="streetwear">Streetwear</option>
          <option value="minimalist">Minimalist</option>
          <option value="vintage">Vintage</option>
        </select>
      </div>
      
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      
      <Button
        type="submit"
        variant={variant === 'light' ? 'outline' : 'primary'}
        textColor="white"
        fullWidth
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Subscribing...' : 'Subscribe & Get 10% Off'}
      </Button>
    </form>
  );
};

export default NewsletterForm;