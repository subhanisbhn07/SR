import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Instagram, Twitter, Facebook, Youtube, Mail, X, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate?: (tab: string) => void;
}

// Legal content for modals
const legalContent: Record<string, { title: string; content: string }> = {
  privacy: {
    title: 'Privacy Policy',
    content: `Last updated: December 2024

SignRoad ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information.

**Information We Collect**
- Account information (email, name)
- Usage data (courses completed, mood entries, journal entries)
- Device information for app optimization

**How We Use Your Information**
- To provide and improve our services
- To personalize your wellness journey
- To send relevant notifications (with your consent)

**Data Security**
We use industry-standard encryption to protect your data. Your journal entries and mood data are encrypted at rest.

**Your Rights**
You can request to view, export, or delete your data at any time through your Profile settings.

**Contact Us**
For privacy questions: privacy@signroad.com`
  },
  terms: {
    title: 'Terms of Service',
    content: `Last updated: December 2024

Welcome to SignRoad. By using our service, you agree to these terms.

**Acceptance of Terms**
By accessing SignRoad, you agree to be bound by these Terms of Service and our Privacy Policy.

**Use of Service**
- You must be 13 years or older to use SignRoad
- You are responsible for maintaining the security of your account
- You agree not to misuse our services

**Intellectual Property**
All content, including courses, meditations, and materials, is owned by SignRoad and protected by copyright.

**Disclaimer**
SignRoad provides wellness tools but is not a substitute for professional medical advice.

**Limitation of Liability**
SignRoad is provided "as is" without warranties of any kind.

**Contact**
Questions: legal@signroad.com`
  },
  cookies: {
    title: 'Cookie Policy',
    content: `Last updated: December 2024

**What Are Cookies?**
Cookies are small text files stored on your device that help us improve your experience.

**Cookies We Use**
- Essential cookies: Required for app functionality
- Analytics cookies: Help us understand how you use SignRoad
- Preference cookies: Remember your settings

**Managing Cookies**
You can control cookies through your browser settings. Note that disabling essential cookies may affect app functionality.

**Updates**
We may update this policy periodically. Continued use of SignRoad constitutes acceptance of any changes.`
  },
  refund: {
    title: 'Refund Policy',
    content: `Last updated: December 2024

**Free Trial**
SignRoad offers a free trial period. No payment is required during the trial.

**Subscription Refunds**
- Annual subscriptions: Full refund within 14 days of purchase
- Monthly subscriptions: Prorated refund available within 7 days

**How to Request a Refund**
Contact support@signroad.com with your account email and reason for refund.

**Processing Time**
Refunds are processed within 5-10 business days.`
  },
  faq: {
    title: 'Frequently Asked Questions',
    content: `**What is SignRoad?**
SignRoad is a 1,000-step manifestation journey where you track signs from the universe, complete wellness courses, and join accountability tribes.

**How do I earn Sparks?**
You earn Sparks by completing daily rituals, logging signs, finishing courses, and maintaining streaks.

**What are Tribes?**
Tribes are 5-person accountability groups. When all members show up, your collective Lantern grows brighter.

**How does the Lantern work?**
Your Lantern health (0-100) reflects your consistency. Daily check-ins, completed sessions, and active engagement keep it bright.

**Can I use SignRoad offline?**
Yes! SignRoad is a Progressive Web App. Once installed, core features work offline.

**How do I cancel my subscription?**
Go to Profile > Settings > Subscription to manage or cancel anytime.`
  },
  help: {
    title: 'Help Center',
    content: `**Getting Started**
1. Complete the onboarding to select your road
2. Do your first daily check-in
3. Start with a short course
4. Log your first sign from the universe

**Contact Support**
Email: support@signroad.com
Response time: Within 24 hours

**Report a Bug**
Email: bugs@signroad.com

**Feature Requests**
We love hearing your ideas: feedback@signroad.com`
  },
  accessibility: {
    title: 'Accessibility Statement',
    content: `**Our Commitment**
SignRoad is committed to ensuring digital accessibility for people with disabilities.

**Standards**
We aim to conform to WCAG 2.1 Level AA guidelines.

**Features**
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Adjustable text sizes

**Feedback**
If you encounter accessibility barriers, please contact: accessibility@signroad.com`
  }
};

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [modalContent, setModalContent] = useState<{ title: string; content: string } | null>(null);

  const handleLinkClick = (e: React.MouseEvent, tab?: string) => {
    e.preventDefault();
    if (tab && onNavigate) {
      onNavigate(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openModal = (key: string) => {
    const content = legalContent[key];
    if (content) {
      setModalContent(content);
    }
  };

  // Format content with markdown-like styling
  const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <p key={index} className="font-semibold text-neutral-900 dark:text-white mt-4 mb-2">
            {line.replace(/\*\*/g, '')}
          </p>
        );
      }
      if (line.startsWith('- ')) {
        return (
          <li key={index} className="ml-4 text-neutral-600 dark:text-neutral-300">
            {line.substring(2)}
          </li>
        );
      }
      if (line.match(/^\d+\./)) {
        return (
          <li key={index} className="ml-4 text-neutral-600 dark:text-neutral-300">
            {line}
          </li>
        );
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return (
        <p key={index} className="text-neutral-600 dark:text-neutral-300">
          {line}
        </p>
      );
    });
  };

  return (
    <>
      {/* Footer content - rendered inside SectionCard wrapper in Homepage */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-neutral-900 dark:text-white">SignRoad</span>
            </div>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-4">
              A 1,000-step manifestation road where the universe sends you signs back.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/signroadapp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 flex items-center justify-center transition-all group"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-4 h-4 text-neutral-500 dark:text-neutral-400 group-hover:text-white" />
              </a>
              <a
                href="https://twitter.com/signroadapp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-blue-400 flex items-center justify-center transition-all group"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="w-4 h-4 text-neutral-500 dark:text-neutral-400 group-hover:text-white" />
              </a>
              <a
                href="https://facebook.com/signroadapp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-blue-600 flex items-center justify-center transition-all group"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-4 h-4 text-neutral-500 dark:text-neutral-400 group-hover:text-white" />
              </a>
              <a
                href="https://youtube.com/@signroadapp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-red-500 flex items-center justify-center transition-all group"
                aria-label="Subscribe on YouTube"
              >
                <Youtube className="w-4 h-4 text-neutral-500 dark:text-neutral-400 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-neutral-900 dark:text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'home')}
                  className="text-neutral-500 dark:text-neutral-400 hover:text-teal-600 dark:hover:text-teal-400 text-sm transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'courses')}
                  className="text-neutral-500 dark:text-neutral-400 hover:text-teal-600 dark:hover:text-teal-400 text-sm transition-colors text-left"
                >
                  Courses
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'mood')}
                  className="text-neutral-500 dark:text-neutral-400 hover:text-teal-600 dark:hover:text-teal-400 text-sm transition-colors text-left"
                >
                  Mood Check-in
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'journal')}
                  className="text-neutral-500 dark:text-neutral-400 hover:text-teal-600 dark:hover:text-teal-400 text-sm transition-colors text-left"
                >
                  Journal
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'profile')}
                  className="text-neutral-500 dark:text-neutral-400 hover:text-teal-600 dark:hover:text-teal-400 text-sm transition-colors text-left"
                >
                  Profile
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-neutral-900 dark:text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'home')}
                  className="text-neutral-500 dark:text-neutral-400 hover:text-teal-600 dark:hover:text-teal-400 text-sm transition-colors text-left"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => openModal('help')}
                  className="text-neutral-500 dark:text-neutral-400 hover:text-teal-600 dark:hover:text-teal-400 text-sm transition-colors text-left"
                >
                  Help Center
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'home')}
                  className="text-neutral-500 dark:text-neutral-400 hover:text-teal-600 dark:hover:text-teal-400 text-sm transition-colors text-left"
                >
                  Community
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'home')}
                  className="text-neutral-500 dark:text-neutral-400 hover:text-teal-600 dark:hover:text-teal-400 text-sm transition-colors text-left"
                >
                  Testimonials
                </button>
              </li>
              <li>
                <button
                  onClick={() => openModal('faq')}
                  className="text-neutral-500 dark:text-neutral-400 hover:text-teal-600 dark:hover:text-teal-400 text-sm transition-colors text-left"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="text-neutral-900 dark:text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => openModal('privacy')}
                  className="text-neutral-500 dark:text-neutral-400 hover:text-teal-600 dark:hover:text-teal-400 text-sm transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => openModal('terms')}
                  className="text-neutral-500 dark:text-neutral-400 hover:text-teal-600 dark:hover:text-teal-400 text-sm transition-colors text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => openModal('cookies')}
                  className="text-neutral-500 dark:text-neutral-400 hover:text-teal-600 dark:hover:text-teal-400 text-sm transition-colors text-left"
                >
                  Cookie Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => openModal('refund')}
                  className="text-neutral-500 dark:text-neutral-400 hover:text-teal-600 dark:hover:text-teal-400 text-sm transition-colors text-left"
                >
                  Refund Policy
                </button>
              </li>
            </ul>

            <h3 className="text-neutral-900 dark:text-white font-semibold mt-6 mb-3">Contact</h3>
            <div className="space-y-2">
              <a
                href="mailto:hello@signroad.com"
                className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 hover:text-teal-600 dark:hover:text-teal-400 text-sm transition-colors"
              >
                <Mail className="w-4 h-4" />
                hello@signroad.com
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-neutral-200 dark:border-neutral-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-neutral-500 text-sm">
              &copy; {new Date().getFullYear()} SignRoad. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <button
                onClick={() => openModal('accessibility')}
                className="text-neutral-500 hover:text-teal-600 dark:hover:text-teal-400 text-sm transition-colors"
              >
                Accessibility
              </button>
              <button
                onClick={(e) => handleLinkClick(e, 'home')}
                className="text-neutral-500 hover:text-teal-600 dark:hover:text-teal-400 text-sm transition-colors"
              >
                Sitemap
              </button>
              <span className="flex items-center gap-1.5 text-neutral-500 text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                All Systems Operational
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Legal/Resource Modal */}
      <AnimatePresence>
        {modalContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setModalContent(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl max-h-[80vh] bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800">
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white">{modalContent.title}</h2>
                <button
                  onClick={() => setModalContent(null)}
                  className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-500" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="prose prose-sm dark:prose-invert">
                  {formatContent(modalContent.content)}
                </div>
              </div>
              <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50">
                <button
                  onClick={() => setModalContent(null)}
                  className="w-full py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-xl transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
