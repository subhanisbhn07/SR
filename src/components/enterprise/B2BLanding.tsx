import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  BarChart3, 
  Shield, 
  Zap, 
  Calendar, 
  X, 
  Check, 
  Building2, 
  TrendingUp,
  Heart,
  Award,
  ArrowRight,
  Phone,
  Mail
} from 'lucide-react';
import { LanternIcon } from '../ui/LanternIcon';

const benefits = [
  {
    icon: BarChart3,
    title: 'Team Wellness Analytics',
    description: 'Real-time dashboards showing engagement trends, Lantern health scores, and wellness metrics across your entire organization.',
  },
  {
    icon: Users,
    title: 'Tribe Formation',
    description: 'Create 5-person accountability groups that boost completion rates by 3x and foster genuine team connections.',
  },
  {
    icon: Shield,
    title: 'Enterprise-Grade Privacy',
    description: 'Individual journeys stay completely private. Leadership sees only aggregate, anonymized wellness trends.',
  },
  {
    icon: Zap,
    title: '7-Minute Micro-Rituals',
    description: 'Designed for busy professionals. No hour-long sessions required — just meaningful daily moments.',
  },
  {
    icon: TrendingUp,
    title: 'Measurable ROI',
    description: 'Track improvements in team engagement, reduced burnout indicators, and increased productivity metrics.',
  },
  {
    icon: Heart,
    title: 'Culture Transformation',
    description: 'Build a workplace culture that prioritizes mental wellness and supports employees through every life challenge.',
  },
];

const testimonials = [
  {
    quote: "SignRoad transformed how our team handles stress. We've seen a 40% reduction in burnout-related turnover.",
    author: "Sarah Chen",
    role: "VP of People",
    company: "TechCorp Inc.",
  },
  {
    quote: "The Tribes feature created genuine connections between remote team members we hadn't seen before.",
    author: "Marcus Johnson",
    role: "Head of HR",
    company: "Global Solutions",
  },
  {
    quote: "Implementation took 15 minutes. The impact on our team's wellbeing has been immeasurable.",
    author: "Elena Rodriguez",
    role: "CEO",
    company: "StartupXYZ",
  },
];

const stats = [
  { value: '3x', label: 'Higher completion rates with Tribes' },
  { value: '40%', label: 'Reduction in burnout indicators' },
  { value: '7min', label: 'Average daily time investment' },
  { value: '92%', label: 'Employee satisfaction rate' },
];

interface B2BLandingProps {
  onClose?: () => void;
  isModal?: boolean;
}

export const B2BLanding: React.FC<B2BLandingProps> = ({ onClose, isModal = false }) => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    teamSize: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking request:', formData);
    setFormSubmitted(true);
  };

  const content = (
    <div className={`${isModal ? '' : 'min-h-screen'} bg-neutral-900 text-white`}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-teal-600/10 to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
        
        <div className="relative px-6 py-16 max-w-5xl mx-auto">
          {isModal && onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5 text-neutral-400" />
            </button>
          )}
          
          <div className="flex items-center gap-2 mb-6">
            <Building2 className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">SignRoad for Enterprise</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Transform Your Team's Wellbeing with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
              Mindful Micro-Rituals
            </span>
          </h1>
          
          <p className="text-xl text-neutral-300 mb-8 max-w-3xl leading-relaxed">
            Join leading companies using SignRoad to reduce burnout, build resilient teams, 
            and create a culture where employees thrive. Custom solutions with pricing 
            tailored to your organization's needs.
          </p>

          {/* Best Pricing Assurance */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-8 max-w-xl">
            <div className="flex items-start gap-3">
              <Award className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-emerald-400 mb-1">Best Pricing Guarantee</h3>
                <p className="text-sm text-neutral-300">
                  We work with companies of all sizes to create custom pricing that fits your budget. 
                  Every organization gets a tailored solution — no one-size-fits-all pricing.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setShowBookingModal(true)}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity flex items-center gap-3 shadow-lg shadow-emerald-500/25"
            >
              <Calendar className="w-5 h-5" />
              Book a Call
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-neutral-800 border border-neutral-700 rounded-xl font-semibold text-lg hover:bg-neutral-700 transition-colors flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Contact Sales
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-6 py-12 bg-neutral-800/30">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl font-bold text-emerald-400 mb-2">{stat.value}</p>
                <p className="text-sm text-neutral-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="px-6 py-16 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Leading Companies Choose SignRoad</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            A comprehensive wellness platform designed for modern teams, 
            with features that drive real engagement and measurable results.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-700/50 hover:border-emerald-500/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Team Lantern Visualization */}
      <div className="px-6 py-16 bg-gradient-to-b from-neutral-800/30 to-transparent">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Watch Your Team's Wellness Grow</h2>
              <p className="text-neutral-400 mb-6 leading-relaxed">
                The Team Lantern is a visual representation of your organization's collective wellness. 
                As more team members complete their daily rituals, the Lantern brightens — creating 
                a shared sense of progress and accountability.
              </p>
              <ul className="space-y-3">
                {[
                  'Real-time wellness visualization',
                  'Aggregate metrics protect individual privacy',
                  'Celebrate team milestones together',
                  'Identify trends before they become problems',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-neutral-300">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center items-center gap-8">
              <div className="text-center">
                <LanternIcon health={35} size="lg" showLabel={false} />
                <p className="text-sm text-neutral-500 mt-3">Week 1</p>
                <p className="text-xs text-neutral-600">Getting started</p>
              </div>
              <ArrowRight className="w-6 h-6 text-neutral-600" />
              <div className="text-center">
                <LanternIcon health={70} size="lg" showLabel={false} />
                <p className="text-sm text-neutral-500 mt-3">Week 4</p>
                <p className="text-xs text-neutral-600">Building habits</p>
              </div>
              <ArrowRight className="w-6 h-6 text-neutral-600" />
              <div className="text-center">
                <LanternIcon health={95} size="lg" showLabel={false} />
                <p className="text-sm text-neutral-500 mt-3">Week 8</p>
                <p className="text-xs text-neutral-600">Thriving team</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="px-6 py-16 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Trusted by Forward-Thinking Companies</h2>
          <p className="text-neutral-400">See what leaders are saying about SignRoad</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-700/50"
            >
              <p className="text-neutral-300 mb-6 italic">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold text-white">{testimonial.author}</p>
                <p className="text-sm text-neutral-400">{testimonial.role}</p>
                <p className="text-sm text-emerald-400">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Implementation Timeline */}
      <div className="px-6 py-16 bg-neutral-800/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get Started in Days, Not Months</h2>
            <p className="text-neutral-400">Simple implementation with dedicated support</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Discovery Call', desc: 'Understand your team\'s unique needs', icon: Phone },
              { step: '2', title: 'Custom Setup', desc: 'Tailored roads and tribe configuration', icon: Building2 },
              { step: '3', title: 'Team Onboarding', desc: 'Guided launch with your employees', icon: Users },
              { step: '4', title: 'Ongoing Support', desc: 'Dedicated success manager', icon: Heart },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-emerald-400" />
                </div>
                <div className="text-xs text-emerald-400 font-medium mb-2">STEP {item.step}</div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="px-6 py-20 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Transform Your Team's Wellbeing?
        </h2>
        <p className="text-xl text-neutral-400 mb-8 max-w-2xl mx-auto">
          Let's discuss how SignRoad can be customized for your organization. 
          Every company gets personalized pricing based on their unique needs.
        </p>
        <button
          onClick={() => setShowBookingModal(true)}
          className="px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl font-semibold text-xl hover:opacity-90 transition-opacity flex items-center gap-3 mx-auto shadow-lg shadow-emerald-500/25"
        >
          <Calendar className="w-6 h-6" />
          Schedule Your Free Consultation
          <ArrowRight className="w-6 h-6" />
        </button>
        <p className="text-sm text-neutral-500 mt-4">No commitment required. 30-minute call.</p>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setShowBookingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg bg-neutral-900 rounded-2xl p-8 border border-neutral-700"
              onClick={(e) => e.stopPropagation()}
            >
              {!formSubmitted ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold">Book a Call</h2>
                      <p className="text-neutral-400 text-sm">Let's discuss your team's wellness needs</p>
                    </div>
                    <button
                      onClick={() => setShowBookingModal(false)}
                      className="p-2 rounded-lg hover:bg-neutral-800 transition-colors"
                    >
                      <X className="w-5 h-5 text-neutral-400" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-1">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                        placeholder="John Smith"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-1">Work Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                        placeholder="john@company.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-1">Company Name</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                        placeholder="Acme Inc."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-1">Team Size</label>
                      <select
                        name="teamSize"
                        value={formData.teamSize}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="">Select team size</option>
                        <option value="10-50">10-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="501-1000">501-1000 employees</option>
                        <option value="1000+">1000+ employees</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-1">What challenges are you facing? (Optional)</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 resize-none"
                        placeholder="Tell us about your team's wellness goals..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-5 h-5" />
                      Request a Call
                    </button>
                  </form>

                  <p className="text-xs text-neutral-500 text-center mt-4">
                    We'll reach out within 24 hours to schedule your consultation.
                  </p>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
                  <p className="text-neutral-400 mb-6">
                    We've received your request. Our team will reach out within 24 hours 
                    to schedule your free consultation.
                  </p>
                  <button
                    onClick={() => {
                      setShowBookingModal(false);
                      setFormSubmitted(false);
                      setFormData({ name: '', email: '', company: '', teamSize: '', message: '' });
                    }}
                    className="px-6 py-3 bg-neutral-800 rounded-xl font-medium hover:bg-neutral-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return content;
};
