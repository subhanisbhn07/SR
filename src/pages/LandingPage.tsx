import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Menu, 
  X, 
  Sparkles, 
  Target, 
  MessageCircle, 
  Share2,
  Zap,
  Feather,
  CheckCircle,
  Play,
  ArrowRight,
  Star,
  Users,
  Calendar,
  Heart,
  Compass,
  Sun,
  DollarSign
} from 'lucide-react';

// ============================================
// SECTION 1: HERO WITH NAVBAR
// ============================================

interface NavbarProps {
  onLoginClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-[#FBFBFB]">
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-teal-500">SignRoad</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#explore" className="text-text-primary hover:text-teal-500 transition-colors relative group">
            Explore Signs
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-500 transition-all group-hover:w-full" />
          </a>
          <a href="#daily-message" className="text-text-primary hover:text-teal-500 transition-colors relative group">
            Daily Message
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-500 transition-all group-hover:w-full" />
          </a>
          <a href="#blog" className="text-text-primary hover:text-teal-500 transition-colors relative group">
            Blog
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-500 transition-all group-hover:w-full" />
          </a>
          <button 
            onClick={onLoginClick}
            className="px-5 py-2.5 bg-gold-500 hover:bg-gold-600 text-text-primary font-medium rounded-lg transition-colors"
          >
            Login / Sign Up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t border-surface-border px-6 py-4 space-y-4"
        >
          <a href="#explore" className="block text-text-primary hover:text-teal-500 py-2">Explore Signs</a>
          <a href="#daily-message" className="block text-text-primary hover:text-teal-500 py-2">Daily Message</a>
          <a href="#blog" className="block text-text-primary hover:text-teal-500 py-2">Blog</a>
          <button 
            onClick={onLoginClick}
            className="w-full px-5 py-2.5 bg-gold-500 hover:bg-gold-600 text-text-primary font-medium rounded-lg transition-colors"
          >
            Login / Sign Up
          </button>
        </motion.div>
      )}
    </nav>
  );
};

const HeroSection: React.FC<{ onStartJourney: () => void; onExploreSignsClick: () => void }> = ({ 
  onStartJourney, 
  onExploreSignsClick 
}) => {
  return (
    <section className="bg-[#FBFBFB] py-16 md:py-24 relative overflow-hidden">
      {/* Subtle background illustration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full opacity-[0.15] pointer-events-none">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <path 
            d="M50 350 Q200 200 350 100" 
            stroke="#0E7A77" 
            strokeWidth="2" 
            fill="none"
            strokeDasharray="8 4"
          />
          <circle cx="350" cy="100" r="20" fill="#0E7A77" opacity="0.3" />
          <circle cx="200" cy="200" r="10" fill="#EEC76A" opacity="0.5" />
        </svg>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="max-w-[620px]">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[28px] md:text-[36px] font-semibold text-teal-500 leading-[1.2] mb-6"
          >
            SignRoad: A Path with Infinite Possibilities
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base md:text-lg text-text-primary mb-8"
          >
            Find your signs. Create your goals. Follow your daily guidance from the Universe.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button 
              onClick={onStartJourney}
              className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-text-primary font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Start Your Journey
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={onExploreSignsClick}
              className="px-6 py-3 border-2 border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white font-medium rounded-lg transition-colors"
            >
              Explore Signs to Look Out For
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 2: BENEFITS (4-CARD GRID)
// ============================================

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description }) => {
  return (
    <motion.div 
      whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)' }}
      className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all"
    >
      <div className="w-12 h-12 bg-teal-soft-50 rounded-xl flex items-center justify-center mb-4">
        <div className="text-teal-soft-500">{icon}</div>
      </div>
      <h3 className="text-lg font-medium text-text-primary mb-2">{title}</h3>
      <p className="text-sm text-text-secondary">{description}</p>
    </motion.div>
  );
};

const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Discover Signs in Your Life",
      description: "Recognize Universe signals like coins, feathers, and synchronicities."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Create & Track Personal Goals",
      description: "Define your intentions manually and update them as you progress."
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Receive Daily Message & Audio",
      description: "Get one message and guided audio daily to stay aligned."
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "Generate Shareable Receipts",
      description: "Mark signs found or goals achieved and auto-create proof posters."
    }
  ];

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <BenefitCard {...benefit} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 3: SOCIAL PROOF & COMMUNITY WINS
// ============================================

interface TestimonialCardProps {
  avatar: string;
  name: string;
  testimonial: string;
  hasBadge?: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ avatar, name, testimonial, hasBadge }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] min-w-[300px] md:min-w-0">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-semibold flex-shrink-0">
          {avatar}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-text-primary">{name}</span>
            {hasBadge && (
              <span className="px-2 py-0.5 bg-gold-500 text-xs font-medium rounded-full">
                Manifested Win
              </span>
            )}
          </div>
          <p className="text-sm text-text-secondary">{testimonial}</p>
        </div>
      </div>
    </div>
  );
};

const SocialProofSection: React.FC = () => {
  const testimonials = [
    {
      avatar: "JM",
      name: "Jessica M.",
      testimonial: "I found a white feather the day after setting my intention. SignRoad helped me see it as a sign!",
      hasBadge: true
    },
    {
      avatar: "RK",
      name: "Ryan K.",
      testimonial: "The daily messages keep me grounded. It's like having a spiritual guide in my pocket.",
      hasBadge: false
    },
    {
      avatar: "AL",
      name: "Amanda L.",
      testimonial: "I manifested my dream job within 3 weeks of using SignRoad. The Universe Receipt feature is amazing!",
      hasBadge: true
    }
  ];

  const metrics = [
    { icon: <Sparkles className="w-5 h-5" />, value: "12,400+", label: "Signs Logged" },
    { icon: <Target className="w-5 h-5" />, value: "8,900+", label: "Goals Achieved" },
    { icon: <Calendar className="w-5 h-5" />, value: "31,000+", label: "Daily Messages Delivered" }
  ];

  return (
    <section className="bg-[#F6F7F8] py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Metrics Row */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12">
          {metrics.map((metric, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="text-teal-soft-500">{metric.icon}</div>
              <div>
                <div className="text-lg font-medium text-teal-soft-500">{metric.value}</div>
                <div className="text-sm text-text-secondary">{metric.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 4: HOW IT WORKS (3 STEPS)
// ============================================

interface StepCardProps {
  step: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ step, icon, title, description }) => {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-teal-soft-50 rounded-2xl flex items-center justify-center mx-auto mb-4 relative">
        <div className="text-teal-soft-500">{icon}</div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
          {step}
        </div>
      </div>
      <h3 className="text-lg font-medium text-text-primary mb-2">{title}</h3>
      <p className="text-sm text-text-secondary max-w-[280px] mx-auto">{description}</p>
    </div>
  );
};

const HowItWorksSection: React.FC<{ onCreateGoal: () => void }> = ({ onCreateGoal }) => {
  const steps = [
    {
      icon: <Zap className="w-7 h-7" />,
      title: "Set Your First Goal",
      description: "Create a goal that represents what you want to manifest."
    },
    {
      icon: <Feather className="w-7 h-7" />,
      title: "Watch for Universe Signs",
      description: "Coin, feather, bird, numbers — when you see it, tap 'Found'."
    },
    {
      icon: <CheckCircle className="w-7 h-7" />,
      title: "Record & Share Your Win",
      description: "Enter the time → receipt auto-generated → share anywhere."
    }
  ];

  return (
    <section className="bg-[#FBFBFB] py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-[28px] font-semibold text-text-primary text-center mb-12"
        >
          How It Works
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <StepCard step={index + 1} {...step} />
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <button 
            onClick={onCreateGoal}
            className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-text-primary font-medium rounded-lg transition-colors inline-flex items-center gap-2"
          >
            Create Your First Goal
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 5: EXPLORE YOUR PATH (FEATURE MODULE)
// ============================================

interface PathCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onStart: () => void;
}

const PathCard: React.FC<PathCardProps> = ({ icon, title, description, onStart }) => {
  return (
    <motion.div 
      whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)' }}
      className="bg-white rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all"
    >
      <div className="w-10 h-10 bg-teal-soft-50 rounded-xl flex items-center justify-center mb-3">
        <div className="text-teal-soft-500">{icon}</div>
      </div>
      <h3 className="text-base font-medium text-text-primary mb-1">{title}</h3>
      <p className="text-sm text-text-secondary mb-4">{description}</p>
      <button 
        onClick={onStart}
        className="text-sm text-teal-500 hover:text-teal-600 font-medium transition-colors flex items-center gap-1"
      >
        Start Path
        <ArrowRight className="w-3 h-3" />
      </button>
    </motion.div>
  );
};

const ExplorePathsSection: React.FC<{ onPathSelect: (path: string) => void }> = ({ onPathSelect }) => {
  const paths = [
    { icon: <Zap className="w-5 h-5" />, title: "Motivation", description: "Ignite your inner drive" },
    { icon: <Star className="w-5 h-5" />, title: "Career Growth", description: "Advance your professional path" },
    { icon: <Heart className="w-5 h-5" />, title: "Inner Peace", description: "Find calm within chaos" },
    { icon: <DollarSign className="w-5 h-5" />, title: "Abundance", description: "Attract prosperity" },
    { icon: <Users className="w-5 h-5" />, title: "Relationship Clarity", description: "Understand your connections" },
    { icon: <Compass className="w-5 h-5" />, title: "Signs of Alignment", description: "Recognize your path" }
  ];

  return (
    <section id="explore" className="bg-white py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-[28px] font-semibold text-text-primary text-center mb-4"
        >
          Explore Your Path
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-text-secondary text-center mb-12 max-w-[500px] mx-auto"
        >
          Choose an intention that resonates with where you are in your journey
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {paths.map((path, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <PathCard {...path} onStart={() => onPathSelect(path.title)} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 6: DAILY MESSAGE & AUDIO
// ============================================

const DailyMessageSection: React.FC<{ onPlayAudio: () => void; onReadMessage: () => void }> = ({ 
  onPlayAudio, 
  onReadMessage 
}) => {
  return (
    <section id="daily-message" className="bg-teal-500 py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 md:p-12 max-w-[600px] mx-auto text-center"
        >
          <div className="w-16 h-16 bg-teal-soft-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Sun className="w-8 h-8 text-teal-soft-500" />
          </div>
          <h2 className="text-2xl md:text-[28px] font-semibold text-text-primary mb-6">
            Your Daily Message from the Universe Awaits
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onPlayAudio}
              className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-text-primary font-medium rounded-lg transition-colors inline-flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              Play Today's Audio
            </button>
            <button 
              onClick={onReadMessage}
              className="px-6 py-3 border-2 border-white text-text-primary hover:bg-neutral-50 font-medium rounded-lg transition-colors"
            >
              Read Today's Message
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 7: STRONG CTA
// ============================================

const StrongCTASection: React.FC<{ onStartJourney: () => void }> = ({ onStartJourney }) => {
  return (
    <section className="bg-[#FBFBFB] py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xl md:text-2xl text-text-primary mb-2"
        >
          Your next sign could appear today.
        </motion.p>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl md:text-2xl text-text-primary mb-8"
        >
          Are you ready to see it?
        </motion.p>
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          onClick={onStartJourney}
          className="px-8 py-4 bg-gold-500 hover:bg-gold-600 text-text-primary font-medium rounded-lg transition-colors text-lg inline-flex items-center gap-2"
        >
          Start Your Journey
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </section>
  );
};

// ============================================
// SECTION 8: BLOG SECTION (3 POSTS)
// ============================================

interface BlogCardProps {
  image: string;
  title: string;
  excerpt: string;
  onReadMore: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ image, title, excerpt, onReadMore }) => {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all"
    >
      <div className="h-48 bg-neutral-200 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-medium text-text-primary mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm text-text-secondary mb-4 line-clamp-3">{excerpt}</p>
        <button 
          onClick={onReadMore}
          className="text-sm text-teal-500 hover:text-teal-600 font-medium transition-colors relative group"
        >
          Read More
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-500 transition-all group-hover:w-full" />
        </button>
      </div>
    </motion.div>
  );
};

const BlogSection: React.FC = () => {
  const posts = [
    {
      image: "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "5 Signs the Universe is Trying to Tell You Something",
      excerpt: "Learn to recognize the subtle messages that appear in your daily life and what they might mean for your journey."
    },
    {
      image: "https://images.pexels.com/photos/1557238/pexels-photo-1557238.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "The Science Behind Manifestation",
      excerpt: "Discover how setting intentions and focusing your energy can create real changes in your life."
    },
    {
      image: "https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Creating a Daily Ritual for Alignment",
      excerpt: "Simple practices you can incorporate into your morning routine to stay connected with your goals."
    }
  ];

  return (
    <section id="blog" className="bg-white py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-[28px] font-semibold text-text-primary text-center mb-12"
        >
          Insights & Reflections
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <BlogCard {...post} onReadMore={() => {}} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 9: NEWSLETTER SIGN-UP
// ============================================

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border border-teal-200 rounded-2xl p-8 md:p-12 max-w-[600px] mx-auto text-center"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-text-primary mb-4">
            Get weekly guidance, signs, and insights.
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white border border-surface-border rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
              required
            />
            <button 
              type="submit"
              className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-text-primary font-medium rounded-lg transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 10: FOOTER
// ============================================

const LandingFooter: React.FC = () => {
  const footerLinks = {
    product: [
      { label: "How It Works", href: "#how-it-works" },
      { label: "Explore Signs", href: "#explore" },
      { label: "Daily Message", href: "#daily-message" }
    ],
    company: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#blog" },
      { label: "Contact", href: "#" }
    ],
    legal: [
      { label: "Terms", href: "#" },
      { label: "Privacy", href: "#" }
    ]
  };

  return (
    <footer className="bg-[#121E1D] py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-white">SignRoad</span>
            </div>
            <p className="text-sm text-neutral-400">
              Find signs, set goals, and manifest progress with daily guidance.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-medium mb-4">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-sm text-neutral-400 hover:text-teal-400 transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 transition-all group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-sm text-neutral-400 hover:text-teal-400 transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 transition-all group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-medium mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-sm text-neutral-400 hover:text-teal-400 transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 transition-all group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#253333] pt-8 text-center">
          <p className="text-sm text-neutral-400">
            &copy; {new Date().getFullYear()} SignRoad. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// ============================================
// MAIN LANDING PAGE COMPONENT
// ============================================

interface LandingPageProps {
  onLoginClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLoginClick }) => {
  const handleStartJourney = () => {
    onLoginClick();
  };

  const handleExploreSignsClick = () => {
    const element = document.getElementById('explore');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePathSelect = (path: string) => {
    console.log('Selected path:', path);
    onLoginClick();
  };

  const handlePlayAudio = () => {
    onLoginClick();
  };

  const handleReadMessage = () => {
    onLoginClick();
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB]">
      <Navbar onLoginClick={onLoginClick} />
      <HeroSection 
        onStartJourney={handleStartJourney} 
        onExploreSignsClick={handleExploreSignsClick} 
      />
      <BenefitsSection />
      <SocialProofSection />
      <HowItWorksSection onCreateGoal={handleStartJourney} />
      <ExplorePathsSection onPathSelect={handlePathSelect} />
      <DailyMessageSection onPlayAudio={handlePlayAudio} onReadMessage={handleReadMessage} />
      <StrongCTASection onStartJourney={handleStartJourney} />
      <BlogSection />
      <NewsletterSection />
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
