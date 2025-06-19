import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import Logo from '../ui/Logo';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-200 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="flex flex-col items-start">
            <div className="mb-4 text-white">
              <Logo variant="light" />
            </div>
            <p className="text-sm font-light leading-relaxed mb-6">
              Modern, sustainable fashion that reclaims the future of design. Each piece
              tells a story of conscious craftsmanship and innovative style.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/re_claim.d"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="mailto:info@reclaimd.com"
                className="text-neutral-300 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:pl-12">
            <h3 className="text-sm uppercase tracking-widest font-medium mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-neutral-400 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-400 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-neutral-400 hover:text-white transition-colors text-sm">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/instagram" className="text-neutral-400 hover:text-white transition-colors text-sm">
                  Instagram
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-400 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-sm uppercase tracking-widest font-medium mb-6">Contact Us</h3>
            <address className="not-italic">
              <p className="text-sm text-neutral-400 mb-2">RE_CLAIM.D Studios</p>
              <p className="text-sm text-neutral-400 mb-2">123 Fashion Avenue</p>
              <p className="text-sm text-neutral-400 mb-2">New York, NY 10001</p>
              <p className="text-sm text-neutral-400 mb-6">United States</p>
              <p className="text-sm text-neutral-400">
                <a href="mailto:info@reclaimd.com" className="hover:text-white transition-colors">
                  info@reclaimd.com
                </a>
              </p>
              <p className="text-sm text-neutral-400">
                <a href="tel:+12125551234" className="hover:text-white transition-colors">
                  +1 (212) 555-1234
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-8 text-center">
          <p className="text-xs text-neutral-500">
            &copy; {currentYear} RE_CLAIM.D. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;