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
  Users,
  Calendar,
  Compass,
  Headphones,
  Trophy,
  Eye,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Check
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
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-teal-500">SignRoad</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-text-primary hover:text-teal-500 transition-colors relative group">
            How It Works
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-500 transition-all group-hover:w-full" />
          </a>
          <a href="#pricing" className="text-text-primary hover:text-teal-500 transition-colors relative group">
            Pricing
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-500 transition-all group-hover:w-full" />
          </a>
          <a href="#faq" className="text-text-primary hover:text-teal-500 transition-colors relative group">
            FAQ
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-500 transition-all group-hover:w-full" />
          </a>
          <button 
            onClick={onLoginClick}
            className="px-5 py-2.5 bg-gold-500 hover:bg-gold-600 text-text-primary font-medium rounded-lg transition-colors"
          >
            Login / Sign Up
          </button>
        </div>

        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t border-surface-border px-6 py-4 space-y-4"
        >
          <a href="#how-it-works" className="block text-text-primary hover:text-teal-500 py-2">How It Works</a>
          <a href="#pricing" className="block text-text-primary hover:text-teal-500 py-2">Pricing</a>
          <a href="#faq" className="block text-text-primary hover:text-teal-500 py-2">FAQ</a>
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

const HeroSection: React.FC<{ onStartJourney: () => void }> = ({ onStartJourney }) => {
  return (
    <section className="bg-[#FBFBFB] py-16 md:py-24 relative overflow-hidden">
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
        <div className="max-w-[700px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-200 mb-6"
          >
            <Sparkles className="w-4 h-4 text-teal-500" />
            <span className="text-sm text-teal-600 font-medium">Your manifestation journey starts here</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[32px] md:text-[44px] font-bold text-text-primary leading-[1.2] mb-6"
          >
            Master your manifestation journey in just{' '}
            <span className="text-teal-500">10 minutes a day</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-text-secondary mb-8 max-w-[600px] mx-auto"
          >
            From spotting signs from the universe to manifesting your goals—discover your life's purpose with structure, guidance, and proof.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center gap-4"
          >
            <button 
              onClick={onStartJourney}
              className="px-8 py-4 bg-gold-500 hover:bg-gold-600 text-text-primary font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 text-lg"
            >
              Start Your 7-Day Free Journey
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-sm text-text-secondary">
              No credit card required. $11.11/month after trial.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center gap-4 mt-12"
          >
            {[
              { icon: <Target className="w-5 h-5" />, label: 'Set Goal' },
              { icon: <Eye className="w-5 h-5" />, label: 'Find Signs' },
              { icon: <Headphones className="w-5 h-5" />, label: 'Daily Audio' },
              { icon: <Trophy className="w-5 h-5" />, label: 'Get Receipt' },
            ].map((item, index) => (
              <div 
                key={index}
                className="flex flex-col items-center gap-2 px-4 py-3 bg-white rounded-xl shadow-sm border border-neutral-100"
              >
                <div className="text-teal-500">{item.icon}</div>
                <span className="text-xs text-text-secondary font-medium">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 2: TRUST BAR
// ============================================

const TrustBar: React.FC = () => {
  const stats = [
    { value: '12,000+', label: 'Active manifesters', icon: <Users className="w-5 h-5" /> },
    { value: '47,293', label: 'Universe Receipts generated', icon: <Trophy className="w-5 h-5" /> },
    { value: '3.2 days', label: 'Average time to first sign', icon: <Calendar className="w-5 h-5" /> },
  ];

  return (
    <section className="bg-white py-8 border-y border-neutral-100">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="text-teal-500">{stat.icon}</div>
              <div>
                <div className="text-xl font-bold text-teal-500">{stat.value}</div>
                <div className="text-sm text-text-secondary">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 3: WHY SIGNROAD IS DIFFERENT
// ============================================

const WhyDifferentSection: React.FC = () => {
  const features = [
    {
      icon: <Eye className="w-7 h-7" />,
      title: "Signs from the Universe, Not Just Tracks",
      description: "Every day, you receive a sign challenge: \"Look for a white feather.\" When you see it in the real world, you log it. The universe plays back.",
      preview: (
        <div className="bg-neutral-50 rounded-xl p-4 mt-4">
          <div className="text-xs text-teal-500 font-medium mb-1">TODAY'S SIGN</div>
          <div className="flex items-center gap-2">
            <span className="text-lg">🪶</span>
            <span className="text-sm text-text-primary">Look for a white feather</span>
          </div>
        </div>
      )
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: "Progress That Never Resets, Only Dims",
      description: "Your Lantern dims when you rest, but never goes out. No harsh streak resets. No shame. Just gentle encouragement to rekindle your flame.",
      preview: (
        <div className="bg-neutral-50 rounded-xl p-4 mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-teal-500 font-medium">YOUR LANTERN</span>
            <span className="text-lg font-bold text-teal-500">82%</span>
          </div>
          <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
            <div className="h-full w-[82%] bg-teal-500 rounded-full" />
          </div>
          <p className="text-xs text-text-secondary mt-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-gold-500" />
            Sparks earned only, never purchased
          </p>
        </div>
      )
    },
    {
      icon: <Share2 className="w-7 h-7" />,
      title: "Receipts and Tribes That Prove It Works",
      description: "When you manifest something, you get a shareable Universe Receipt showing the odds you beat. Walk the road with 5-person accountability tribes.",
      preview: (
        <div className="bg-neutral-50 rounded-xl p-4 mt-4">
          <div className="text-xs text-teal-500 font-medium mb-2">LATEST WIN</div>
          <p className="text-sm text-text-primary font-medium">"Got my dream job"</p>
          <div className="flex gap-4 mt-2 text-xs text-text-secondary">
            <span>21 days</span>
            <span>18 signs</span>
            <span className="text-teal-500 font-medium">Beat 91.7% odds</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="bg-[#F6F7F8] py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-[32px] font-bold text-text-primary mb-4">
            Why SignRoad is Unlike Calm or Headspace
          </h2>
          <p className="text-text-secondary max-w-[600px] mx-auto">
            We're not another meditation library. We're a manifestation journey where the universe responds to you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center mb-4">
                <div className="text-teal-500">{feature.icon}</div>
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">{feature.title}</h3>
              <p className="text-sm text-text-secondary">{feature.description}</p>
              {feature.preview}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 4: HOW IT WORKS (7 STEPS)
// ============================================

const HowItWorksSection: React.FC<{ onStartJourney: () => void }> = ({ onStartJourney }) => {
  const steps = [
    { icon: <Target className="w-6 h-6" />, title: 'Create your manifestation goal', description: 'Set a clear intention for what you want to manifest' },
    { icon: <Eye className="w-6 h-6" />, title: 'Get signs to look for', description: 'Receive daily signs from the universe to spot in real life' },
    { icon: <Headphones className="w-6 h-6" />, title: 'Complete daily audio lessons', description: '10-minute guided sessions teaching manifestation techniques' },
    { icon: <Feather className="w-6 h-6" />, title: 'Spot your signs', description: 'Train your awareness to notice synchronicities around you' },
    { icon: <TrendingUp className="w-6 h-6" />, title: 'Track your progress', description: 'Monitor sessions completed, signs found, and streaks built' },
    { icon: <CheckCircle className="w-6 h-6" />, title: 'Achieve your goal', description: 'Watch as the universe delivers what you manifested' },
    { icon: <Trophy className="w-6 h-6" />, title: 'Get your Universe Receipt', description: 'Receive proof of your manifestation with real data to share' },
  ];

  return (
    <section id="how-it-works" className="bg-white py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-[32px] font-bold text-text-primary mb-4">
            How It Works: 7 Steps to Mastery
          </h2>
          <p className="text-text-secondary max-w-[600px] mx-auto">
            A structured path from setting your intention to manifesting your dreams
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {steps.slice(0, 4).map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-neutral-50 rounded-xl p-5 relative"
            >
              <div className="absolute -top-3 -left-3 w-7 h-7 bg-teal-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {index + 1}
              </div>
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-3">
                <div className="text-teal-500">{step.icon}</div>
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-1">{step.title}</h3>
              <p className="text-sm text-text-secondary">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[900px] mx-auto mb-12">
          {steps.slice(4).map((step, index) => (
            <motion.div
              key={index + 4}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index + 4) * 0.1 }}
              className="bg-neutral-50 rounded-xl p-5 relative"
            >
              <div className="absolute -top-3 -left-3 w-7 h-7 bg-teal-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {index + 5}
              </div>
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-3">
                <div className="text-teal-500">{step.icon}</div>
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-1">{step.title}</h3>
              <p className="text-sm text-text-secondary">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <button 
            onClick={onStartJourney}
            className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-text-primary font-medium rounded-lg transition-colors inline-flex items-center gap-2"
          >
            Start Your Journey
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 5: DAILY LEARNING (AUDIO + MESSAGE)
// ============================================

const DailyLearningSection: React.FC = () => {
  return (
    <section className="bg-[#FBFBFB] py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-[32px] font-bold text-text-primary mb-4">
            Sequential Learning Journey
          </h2>
          <p className="text-text-secondary max-w-[600px] mx-auto">
            1,000+ audio lessons teaching manifestation & meditation. Everyone follows the same proven path.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-teal-100"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center">
                <Headphones className="w-7 h-7 text-teal-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary">Daily Audio Lessons</h3>
                <p className="text-teal-500 text-sm">10 minutes of guided learning</p>
              </div>
            </div>
            
            <ul className="space-y-3 mb-6">
              {[
                'Sequential curriculum - Step 1 to Step 1000',
                'Unlock next lesson after completing current',
                'Topics: awareness, manifestation, meditation',
                'AI-generated voices with 12 background sounds',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-text-secondary">
                  <Play className="w-4 h-4 text-teal-500 mt-1 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-100">
              <div className="text-xs text-teal-500 font-medium mb-1">Now Playing: Step 3</div>
              <div className="text-text-primary font-medium mb-2">"How to Spot Signs"</div>
              <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-teal-500 rounded-full" />
              </div>
              <div className="flex justify-between text-xs text-text-secondary mt-1">
                <span>6:42</span>
                <span>10:00</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-gold-200"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gold-50 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-7 h-7 text-gold-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary">Daily Personalized Message</h3>
                <p className="text-gold-600 text-sm">Wisdom tailored just for you</p>
              </div>
            </div>
            
            <ul className="space-y-3 mb-6">
              {[
                '1,000+ unique messages in our database',
                'Personalized with your name',
                'Daily encouragement and validation',
                'Free forever - even after trial ends',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-text-secondary">
                  <Sparkles className="w-4 h-4 text-gold-500 mt-1 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <div className="bg-gold-50 rounded-xl p-4 border border-gold-100">
              <div className="text-xs text-gold-600 font-medium mb-2">Today's Message</div>
              <p className="text-text-primary italic text-sm">
                "Sarah, the universe is aligning in your favor today. Trust the signs you're about to receive—they're meant specifically for you."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 6: USER STORIES
// ============================================

const UserStoriesSection: React.FC = () => {
  const stories = [
    {
      name: 'Emma R.',
      role: 'Marketing Manager',
      avatar: 'E',
      quote: "I was skeptical at first, but after finding my third sign in one week, I knew something was different. Manifested my dream job in 18 days.",
      result: 'Dream job at tech startup',
      days: 18,
      signs: 5,
    },
    {
      name: 'Marcus T.',
      role: 'Software Engineer',
      avatar: 'M',
      quote: "The structured approach is what sold me. No more random affirmations—this actually tracks your progress and shows you proof.",
      result: 'Relationship with soulmate',
      days: 34,
      signs: 12,
    },
    {
      name: 'Aisha K.',
      role: 'Freelance Designer',
      avatar: 'A',
      quote: "My tribe keeps me accountable. Seeing their wins motivates me to keep going. Already manifested 3 goals in 2 months.",
      result: '$10K client contract',
      days: 21,
      signs: 8,
    },
  ];

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-[32px] font-bold text-text-primary mb-4">
            Real Stories, Real Results
          </h2>
          <p className="text-text-secondary max-w-[600px] mx-auto">
            Join thousands who have transformed their lives through structured manifestation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-neutral-50 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center text-text-primary font-bold">
                  {story.avatar}
                </div>
                <div>
                  <div className="font-semibold text-text-primary">{story.name}</div>
                  <div className="text-sm text-text-secondary">{story.role}</div>
                </div>
              </div>
              
              <p className="text-text-secondary text-sm mb-4 italic">"{story.quote}"</p>
              
              <div className="bg-white rounded-xl p-4 border border-neutral-200">
                <div className="text-xs text-teal-500 font-medium mb-1">Manifested</div>
                <div className="font-semibold text-text-primary text-sm mb-2">{story.result}</div>
                <div className="flex gap-4 text-xs text-text-secondary">
                  <span>{story.days} days</span>
                  <span>{story.signs} signs found</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 7: UNIVERSE RECEIPTS (PROOF)
// ============================================

const ProofSection: React.FC = () => {
  const receipts = [
    {
      goal: 'Got promoted to Senior Developer',
      user: 'Alex M.',
      days: 21,
      signs: 18,
      sessions: 24,
      streak: 7,
    },
    {
      goal: 'Found my soulmate',
      user: 'Jessica L.',
      days: 45,
      signs: 32,
      sessions: 41,
      streak: 14,
    },
    {
      goal: 'Launched successful business',
      user: 'David K.',
      days: 67,
      signs: 48,
      sessions: 58,
      streak: 21,
    },
  ];

  return (
    <section className="bg-[#F6F7F8] py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-[32px] font-bold text-text-primary mb-4">
            Proof It Works
          </h2>
          <p className="text-text-secondary max-w-[600px] mx-auto">
            Real Universe Receipts from our community. Every stat is tracked and verified.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {receipts.map((receipt, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-2xl"
              style={{ fontFamily: 'monospace' }}
            >
              <div className="bg-[#fdfaf4] p-6 text-neutral-800">
                <div className="absolute top-0 left-0 right-0 h-3 bg-[repeating-linear-gradient(90deg,transparent,transparent_8px,#fdfaf4_8px,#fdfaf4_16px)]" style={{ borderBottom: '2px dashed #d4c5a9' }} />
                
                <div className="pt-4">
                  <div className="text-center mb-4">
                    <div className="text-sm font-bold tracking-widest text-neutral-700">UNIVERSE RECEIPT</div>
                    <div className="text-xs text-neutral-500">================================</div>
                  </div>

                  <div className="text-center mb-4">
                    <div className="text-xs text-neutral-500">{receipt.user} manifested:</div>
                    <div className="text-sm font-bold text-neutral-900 mt-1">"{receipt.goal}"</div>
                  </div>

                  <div className="text-xs text-neutral-500 text-center mb-3">- - - - - - - - - - - - -</div>
                  <div className="space-y-1 text-xs mb-4">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Days on the road</span>
                      <span className="font-bold text-neutral-900">{receipt.days}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Signs logged</span>
                      <span className="font-bold text-neutral-900">{receipt.signs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Sessions completed</span>
                      <span className="font-bold text-neutral-900">{receipt.sessions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Best streak</span>
                      <span className="font-bold text-neutral-900">{receipt.streak} days</span>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="px-4 py-2 border-2 border-teal-600 rounded-full text-teal-600 text-xs font-bold transform -rotate-6">
                      VERIFIED
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-3 bg-[repeating-linear-gradient(90deg,transparent,transparent_8px,#fdfaf4_8px,#fdfaf4_16px)]" style={{ borderTop: '2px dashed #d4c5a9' }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 8: TRIBES
// ============================================

const TribesSection: React.FC = () => {
  const tribeMembers = [
    { name: 'Sarah', health: 92 },
    { name: 'Marcus', health: 85 },
    { name: 'Emma', health: 78 },
    { name: 'David', health: 88 },
    { name: 'Aisha', health: 95 },
  ];

  const avgHealth = Math.round(tribeMembers.reduce((sum, m) => sum + m.health, 0) / tribeMembers.length * 10) / 10;

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-[32px] font-bold text-text-primary mb-4">
              Join Your Tribe
            </h2>
            <p className="text-text-secondary mb-6">
              5-person accountability groups that keep you motivated and on track. See others' wins, share your progress, and grow together.
            </p>
            
            <ul className="space-y-3">
              {[
                'Matched with like-minded manifesters',
                'See real-time progress of tribe members',
                'Collective Tribe Lantern shows group energy',
                'Celebrate wins together',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-text-secondary">
                  <Check className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-neutral-50 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-teal-500" />
                <span className="font-semibold text-text-primary">Manifestation Masters</span>
              </div>
              <span className="text-xs bg-teal-100 text-teal-600 px-2 py-1 rounded-full font-medium">5/5 Active</span>
            </div>

            <div className="space-y-3 mb-6">
              {tribeMembers.map((member, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center text-text-primary font-bold text-sm">
                    {member.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-text-primary">{member.name}</span>
                      <span className="text-xs text-text-secondary">{member.health}%</span>
                    </div>
                    <div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-teal-500 rounded-full transition-all"
                        style={{ width: `${member.health}%` }}
                      />
                    </div>
                  </div>
                  <CheckCircle className="w-4 h-4 text-teal-500" />
                </div>
              ))}
            </div>

            <div className="bg-teal-50 rounded-xl p-4 text-center border border-teal-100">
              <div className="text-xs text-teal-600 font-medium mb-1">Tribe Lantern</div>
              <div className="text-2xl font-bold text-teal-500">{avgHealth}%</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 9: PRICING
// ============================================

const PricingSection: React.FC<{ onStartJourney: () => void }> = ({ onStartJourney }) => {
  return (
    <section id="pricing" className="bg-[#FBFBFB] py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-[32px] font-bold text-text-primary mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-text-secondary">
            Start free for 7 days. Cancel anytime.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-[800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200"
          >
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-text-primary mb-2">Monthly</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-text-primary">$11.11</span>
                <span className="text-text-secondary">/month</span>
              </div>
              <p className="text-sm text-teal-500 mt-1">Angel number pricing for manifesters</p>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                'All 1000+ sequential audio lessons',
                '3 active signs to find',
                'Unlimited goals & receipts',
                'Tribe access',
                '12 background sounds',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-text-secondary text-sm">
                  <Check className="w-4 h-4 text-teal-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={onStartJourney}
              className="w-full py-3 border-2 border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white font-medium rounded-lg transition-colors"
            >
              Start Free Trial
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-8 shadow-sm border-2 border-gold-400 relative"
          >
            <div className="absolute -top-3 right-6 bg-gold-500 text-text-primary text-xs font-bold px-3 py-1 rounded-full">
              Save 33%
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-text-primary mb-2">Annual</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-text-primary">$88.88</span>
                <span className="text-text-secondary">/year</span>
              </div>
              <p className="text-sm text-gold-600 mt-1">That's just $7.40/month</p>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                'Everything in Monthly',
                'Priority support',
                'Premium receipt designs',
                'Private Tribes',
                'Early access to new features',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-text-secondary text-sm">
                  <Check className="w-4 h-4 text-gold-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={onStartJourney}
              className="w-full py-3 bg-gold-500 hover:bg-gold-600 text-text-primary font-medium rounded-lg transition-colors"
            >
              Start Free Trial
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <h3 className="font-semibold text-text-primary mb-4">What Stays Free Forever</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Daily personalized message',
              '3 background sounds',
              '1 active sign',
              'Public Tribe access',
              'Basic Universe Receipt',
            ].map((item, i) => (
              <span key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                <Sparkles className="w-4 h-4 text-gold-500" />
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 10: FAQ
// ============================================

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How do signs work?',
      answer: 'Each day, you receive a sign to look for in your daily life (like a white feather, a specific number, or a butterfly). When you spot it, you log it in the app. This trains your awareness and helps you notice the synchronicities the universe sends your way.',
    },
    {
      question: "What if I don't achieve my goal during the trial?",
      answer: "That's completely normal! Manifestation is a journey, not a race. Your progress, signs logged, and sessions completed are all tracked. Many users see their first signs within days, but achieving larger goals can take weeks or months. The 7-day trial lets you experience the full platform.",
    },
    {
      question: 'Can I share my Universe Receipts?',
      answer: 'Absolutely! Universe Receipts are designed to be shared. They show your real stats (days, signs, sessions, streak) and can be downloaded as images or shared directly to social media. Many users share them to inspire others.',
    },
    {
      question: "What's included in free vs. premium?",
      answer: 'Free forever: Daily personalized message, 1 active sign, 3 background sounds, public Tribe access, and basic Universe Receipts. Premium adds: All 1000+ audio lessons, 3 active signs, 12 background sounds, unlimited goals, premium receipt designs, and private Tribes.',
    },
    {
      question: 'Why $11.11 and $88.88?',
      answer: "These are angel numbers! In numerology, 11:11 represents spiritual awakening and manifestation, while 8 symbolizes abundance and prosperity. We chose these prices intentionally to align with the manifestation journey you're embarking on.",
    },
    {
      question: 'How is this different from other meditation apps?',
      answer: "Most apps give you meditation tracks to listen to passively. SignRoad is an active manifestation journey with goals, sign challenges, progress tracking, accountability tribes, and proof of your manifestations through Universe Receipts. It's structured, gamified, and results-oriented.",
    },
  ];

  return (
    <section id="faq" className="bg-white py-16 md:py-20">
      <div className="max-w-[800px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-[32px] font-bold text-text-primary mb-4">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="border border-neutral-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left bg-white hover:bg-neutral-50 transition-colors"
              >
                <span className="font-medium text-text-primary">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-teal-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-text-secondary flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-4"
                >
                  <p className="text-text-secondary text-sm leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 11: FOOTER
// ============================================

const LandingFooter: React.FC = () => {
  return (
    <footer className="bg-[#121E1D] py-12">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-white">SignRoad</span>
          </div>

          <div className="flex gap-6">
            <a href="#" className="text-sm text-neutral-400 hover:text-teal-400 transition-colors">Privacy</a>
            <a href="#" className="text-sm text-neutral-400 hover:text-teal-400 transition-colors">Terms</a>
            <a href="#" className="text-sm text-neutral-400 hover:text-teal-400 transition-colors">Contact</a>
          </div>

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

  return (
    <div className="min-h-screen bg-[#FBFBFB]">
      <Navbar onLoginClick={onLoginClick} />
      <HeroSection onStartJourney={handleStartJourney} />
      <TrustBar />
      <WhyDifferentSection />
      <HowItWorksSection onStartJourney={handleStartJourney} />
      <DailyLearningSection />
      <UserStoriesSection />
      <ProofSection />
      <TribesSection />
      <PricingSection onStartJourney={handleStartJourney} />
      <FAQSection />
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
