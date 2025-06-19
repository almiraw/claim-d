import React from 'react';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import ContactForm from '../components/ui/ContactForm';
import NewsletterForm from '../components/ui/NewsletterForm';

const Contact: React.FC = () => {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Get in Touch</h1>
          <p className="text-xl text-neutral-700 leading-relaxed mb-10">
            We'd love to hear from you. Reach out for collaborations, questions, or just to say hello.
          </p>
        </div>
      </section>

      {/* Contact Information and Form */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-serif mb-8">Send Us a Message</h2>
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-serif mb-8">Contact Information</h2>
            
            <div className="mb-10">
              <div className="flex items-start mb-6">
                <MapPin className="text-neutral-900 mt-1 mr-4" size={20} />
                <div>
                  <h3 className="font-medium mb-2">Our Studio</h3>
                  <address className="not-italic text-neutral-600">
                    <p>RE_CLAIM.D Studios</p>
                    <p>123 Fashion Avenue</p>
                    <p>New York, NY 10001</p>
                    <p>United States</p>
                  </address>
                </div>
              </div>
              
              <div className="flex items-start mb-6">
                <Mail className="text-neutral-900 mt-1 mr-4" size={20} />
                <div>
                  <h3 className="font-medium mb-2">Email Us</h3>
                  <p className="text-neutral-600">
                    <a href="mailto:info@reclaimd.com" className="hover:text-neutral-900 transition-colors">
                      info@reclaimd.com
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="text-neutral-900 mt-1 mr-4" size={20} />
                <div>
                  <h3 className="font-medium mb-2">Call Us</h3>
                  <p className="text-neutral-600">
                    <a href="tel:+12125551234" className="hover:text-neutral-900 transition-colors">
                      +1 (212) 555-1234
                    </a>
                  </p>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-serif mb-6">Follow Us</h2>
            <div className="flex space-x-4 mb-10">
              <a
                href="https://instagram.com/re_claim.d"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-neutral-900 text-white rounded-full flex items-center justify-center hover:bg-neutral-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-neutral-900 text-white rounded-full flex items-center justify-center hover:bg-neutral-700 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-neutral-900 text-white rounded-full flex items-center justify-center hover:bg-neutral-700 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
            
            <div className="bg-neutral-100 p-6">
              <h2 className="text-xl font-serif mb-6">Join Our Mailing List</h2>
              <p className="text-neutral-600 mb-6">
                Subscribe to receive updates on new collections, events, and exclusive offers.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 mb-8">
          <h2 className="text-2xl font-serif mb-8 text-center">Visit Our Studio</h2>
        </div>
        <div className="h-[400px] bg-neutral-200 relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425872426733!3d40.74076983539318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a3f81d549f%3A0xb2a39bb5cacc7da0!2s123%20W%2018th%20St%2C%20New%20York%2C%20NY%2010011%2C%20USA!5e0!3m2!1sen!2sca!4v1650000000000!5m2!1sen!2sca" 
            width="100%" 
            height="400" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="RE_CLAIM.D Studio Location"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Contact;