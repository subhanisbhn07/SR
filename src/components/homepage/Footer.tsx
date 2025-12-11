import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Instagram, Twitter, Facebook, Youtube, Mail, MapPin, Phone } from 'lucide-react';

interface FooterProps {
  onNavigate?: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent, tab?: string) => {
    e.preventDefault();
    if (tab && onNavigate) {
      onNavigate(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-neumo-bg mt-12"
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-neumo bg-neumo-bg shadow-neumo-sm flex items-center justify-center">
                <Flame className="w-5 h-5 text-neumo-text-secondary" />
              </div>
              <span className="text-xl font-bold text-neumo-text">SignRoad</span>
            </div>
            <p className="text-neumo-text-secondary text-sm mb-4">
              A 1,000-step manifestation road where the universe sends you signs back.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-neumo bg-neumo-bg shadow-neumo-sm hover:shadow-neumo-inset flex items-center justify-center transition-all">
                <Instagram className="w-4 h-4 text-neumo-text-secondary" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-neumo bg-neumo-bg shadow-neumo-sm hover:shadow-neumo-inset flex items-center justify-center transition-all">
                <Twitter className="w-4 h-4 text-neumo-text-secondary" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-neumo bg-neumo-bg shadow-neumo-sm hover:shadow-neumo-inset flex items-center justify-center transition-all">
                <Facebook className="w-4 h-4 text-neumo-text-secondary" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-neumo bg-neumo-bg shadow-neumo-sm hover:shadow-neumo-inset flex items-center justify-center transition-all">
                <Youtube className="w-4 h-4 text-neumo-text-secondary" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-neumo-text font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" onClick={(e) => handleLinkClick(e, 'home')} className="text-neumo-text-secondary hover:text-neumo-text text-sm transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => handleLinkClick(e, 'courses')} className="text-neumo-text-secondary hover:text-neumo-text text-sm transition-colors">
                  Courses
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => handleLinkClick(e, 'mood')} className="text-neumo-text-secondary hover:text-neumo-text text-sm transition-colors">
                  Mood Check-in
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => handleLinkClick(e, 'journal')} className="text-neumo-text-secondary hover:text-neumo-text text-sm transition-colors">
                  Journal
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => handleLinkClick(e, 'profile')} className="text-neumo-text-secondary hover:text-neumo-text text-sm transition-colors">
                  Profile
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-neumo-text font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => document.getElementById('blog-section')?.scrollIntoView({ behavior: 'smooth' })} className="text-neumo-text-secondary hover:text-neumo-text text-sm transition-colors text-left">
                  Blog
                </button>
              </li>
              <li>
                <a href="mailto:hello@signroad.com" className="text-neumo-text-secondary hover:text-neumo-text text-sm transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <button onClick={() => document.getElementById('stories-section')?.scrollIntoView({ behavior: 'smooth' })} className="text-neumo-text-secondary hover:text-neumo-text text-sm transition-colors text-left">
                  Community
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('stories-section')?.scrollIntoView({ behavior: 'smooth' })} className="text-neumo-text-secondary hover:text-neumo-text text-sm transition-colors text-left">
                  Testimonials
                </button>
              </li>
              <li>
                <a href="mailto:hello@signroad.com?subject=FAQ" className="text-neumo-text-secondary hover:text-neumo-text text-sm transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="text-neumo-text font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:hello@signroad.com?subject=Privacy%20Policy" className="text-neumo-text-secondary hover:text-neumo-text text-sm transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="mailto:hello@signroad.com?subject=Terms%20of%20Service" className="text-neumo-text-secondary hover:text-neumo-text text-sm transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="mailto:hello@signroad.com?subject=Cookie%20Policy" className="text-neumo-text-secondary hover:text-neumo-text text-sm transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="mailto:hello@signroad.com?subject=Refund%20Policy" className="text-neumo-text-secondary hover:text-neumo-text text-sm transition-colors">
                  Refund Policy
                </a>
              </li>
            </ul>
            
            <h3 className="text-neumo-text font-semibold mt-6 mb-3">Contact</h3>
            <div className="space-y-2">
              <a href="mailto:hello@signroad.com" className="flex items-center gap-2 text-neumo-text-secondary hover:text-neumo-text text-sm transition-colors">
                <Mail className="w-4 h-4" />
                hello@signroad.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neumo-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-neumo-text-secondary text-sm">
              &copy; {new Date().getFullYear()} SignRoad. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="mailto:hello@signroad.com?subject=Accessibility" className="text-neumo-text-secondary hover:text-neumo-text text-sm transition-colors">
                Accessibility
              </a>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-neumo-text-secondary hover:text-neumo-text text-sm transition-colors">
                Back to Top
              </button>
              <a href="mailto:hello@signroad.com?subject=Support" className="text-neumo-text-secondary hover:text-neumo-text text-sm transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
