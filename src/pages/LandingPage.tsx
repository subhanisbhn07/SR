import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Target, MessageCircle, Receipt, Play, BookOpen, ArrowRight, Check, ChevronDown, Star, Sparkles, Users, Clock, Zap } from 'lucide-react';
import { useConfigStore } from '../store/configStore';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const { freeTrialDays } = useConfigStore();
  const [email, setEmail] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault();
    onGetStarted();
  };

  const features = [
    {
      icon: Eye,
      title: 'Explore Signs to Look Out For',
      description: 'Recognize Universe signals like coins, feathers, and synchronicities.',
    },
    {
      icon: Target,
      title: 'Create & Track Personal Goals',
      description: 'Define your intentions manually and update them as you progress.',
    },
    {
      icon: MessageCircle,
      title: 'Receive Daily Message & Audio',
      description: 'Get one message and guided audio daily to stay aligned.',
    },
    {
      icon: Receipt,
      title: 'Generate Shareable Receipts',
      description: 'Mark signs found or goals achieved and auto-create proof posters.',
    },
  ];

  const stats = [
    { value: '12,400+', label: 'Signs Logged' },
    { value: '8,900+', label: 'Goals Achieved' },
    { value: '31,000+', label: 'Daily Messages Delivered' },
  ];

  const testimonials = [
    {
      name: 'Jessica M.',
      initials: 'JM',
      type: 'Manifested Win',
      quote: 'I found a white feather the day after setting my intention. SignRoad helped me see it as a sign!',
    },
    {
      name: 'Ryan K.',
      initials: 'RK',
      quote: 'The daily messages keep me grounded. It\'s like having a spiritual guide in my pocket.',
    },
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Set Your First Goal',
      description: 'Create a goal that represents what you want to manifest.',
    },
    {
      step: 2,
      title: 'Watch for Universe Signs',
      description: 'Coin, feather, bird, numbers — when you see it, tap \'Found\'.',
    },
    {
      step: 3,
      title: 'Record & Share Your Win',
      description: 'Enter the time → receipt auto-generated → share anywhere.',
    },
  ];

  const intentions = [
    { emoji: '🔥', title: 'Motivation', description: 'Ignite your inner drive' },
    { emoji: '📈', title: 'Career Growth', description: 'Advance your professional path' },
    { emoji: '🕊️', title: 'Inner Peace', description: 'Find calm within chaos' },
    { emoji: '💰', title: 'Abundance', description: 'Attract prosperity' },
    { emoji: '💝', title: 'Relationship Clarity', description: 'Understand your connections' },
    { emoji: '✨', title: 'Signs of Alignment', description: 'Recognize your path' },
  ];

  const realStories = [
    {
      name: 'Emma R.',
      initials: 'E',
      role: 'Marketing Manager',
      quote: 'I was skeptical at first, but after finding my third sign in one week, I knew something was different. Manifested my dream job in 18 days.',
      manifested: 'Dream job at tech startup',
      days: 18,
      signs: 5,
    },
    {
      name: 'Marcus T.',
      initials: 'M',
      role: 'Software Engineer',
      quote: 'The structured approach is what sold me. No more random affirmations—this actually tracks your progress and shows you proof.',
      manifested: '$10K client contract',
      days: 34,
      signs: 8,
    },
    {
      name: 'Aisha K.',
      initials: 'A',
      role: 'Freelance Designer',
      quote: 'My tribe keeps me accountable. Seeing their wins motivates me to keep going. Already manifested 3 goals in 2 months.',
      manifested: 'Relationship with soulmate',
      days: 21,
      signs: 12,
    },
  ];

  // Sign Found Receipts - for when users spot universe signs
  const signReceipts = [
    {
      type: 'sign' as const,
      signSpotted: 'White feather on doorstep',
      dayOnRoad: 3,
      timesSeenToday: 1,
      synchronicityScore: 89,
    },
    {
      type: 'sign' as const,
      signSpotted: '11:11 on the clock',
      dayOnRoad: 7,
      timesSeenToday: 3,
      synchronicityScore: 94,
    },
    {
      type: 'sign' as const,
      signSpotted: 'Cardinal at window',
      dayOnRoad: 12,
      timesSeenToday: 2,
      synchronicityScore: 91,
    },
  ];

  // Goal Achieved Receipts - for when users manifest goals
  const goalReceipts = [
    {
      type: 'goal' as const,
      manifested: 'New job at dream company',
      days: 21,
      signs: 18,
      sessions: 24,
      probability: 91.7,
    },
    {
      type: 'goal' as const,
      manifested: 'Found my soulmate',
      days: 45,
      signs: 32,
      sessions: 41,
      probability: 87.3,
    },
    {
      type: 'goal' as const,
      manifested: 'Started own business',
      days: 67,
      signs: 48,
      sessions: 58,
      probability: 94.2,
    },
  ];

  const faqs = [
    {
      question: 'How do signs work?',
      answer: 'Each day, you receive a sign to look for in your daily life. When you spot it, you log it in the app. This builds awareness and helps you recognize the universe\'s guidance.',
    },
    {
      question: 'What if I don\'t achieve my goal during the trial?',
      answer: 'That\'s completely normal! Manifestation is a journey, not a race. The trial helps you experience the system and build the habit. Many users see their first signs within days.',
    },
    {
      question: 'Can I share my Universe Receipts?',
      answer: 'Absolutely! Universe Receipts are designed to be shared on social media, with friends, or kept as personal proof of your manifestation journey.',
    },
    {
      question: 'What\'s included in free vs. premium?',
      answer: 'Free includes daily messages, 1 active sign, 3 background sounds, and public Tribe access. Premium unlocks 1000+ audio lessons, unlimited goals, 12 background sounds, and private Tribes.',
    },
    {
      question: 'Why $11.11 and $88.88?',
      answer: 'These are angel numbers that hold special significance in manifestation. 11:11 represents alignment and new beginnings, while 8 symbolizes abundance and infinite possibilities.',
    },
    {
      question: 'How is this different from other meditation apps?',
      answer: 'Unlike Calm or Headspace, SignRoad is a manifestation journey with real-world engagement. You look for signs, track goals, and get proof when things manifest. It\'s interactive, not passive.',
    },
  ];

  const blogPosts = [
    {
      title: '5 Signs the Universe is Trying to Tell You...',
      excerpt: 'Learn to recognize the subtle messages that appear in your daily life...',
    },
    {
      title: 'The Science Behind Manifestation',
      excerpt: 'Discover how setting intentions and focusing your energy can create real results...',
    },
    {
      title: 'Creating a Daily Ritual for Alignment',
      excerpt: 'Simple practices you can incorporate into your morning routine to stay aligned...',
    },
  ];

  return (
    <div className="min-h-screen bg-neumo-bg text-neumo-text overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-neumo-bg/95 backdrop-blur-sm border-b border-neumo-border">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-neumo-accent rounded-full flex items-center justify-center shadow-neumo-sm">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-neumo-text">SignRoad</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#signs" className="text-sm text-neumo-text-secondary hover:text-neumo-text transition-colors">Explore Signs</a>
            <a href="#daily-message" className="text-sm text-neumo-text-secondary hover:text-neumo-text transition-colors">Daily Message</a>
            <a href="#blog" className="text-sm text-neumo-text-secondary hover:text-neumo-text transition-colors">Blog</a>
          </div>
          <button
            onClick={onGetStarted}
            className="px-4 py-2 bg-neumo-accent text-white text-sm font-medium rounded-neumo shadow-neumo-sm hover:shadow-neumo-inset transition-all"
          >
            Login / Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neumo-text mb-6 leading-tight">
              SignRoad: A Path with Infinite<br />
              <span className="text-neumo-accent">Possibilities</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-neumo-text-secondary mb-8 max-w-3xl mx-auto">
              Find your signs. Create your goals. Follow your daily guidance from the Universe.
            </p>

            <button
              onClick={onGetStarted}
              className="px-10 py-4 bg-neumo-accent text-white text-lg font-semibold rounded-neumo shadow-neumo-sm hover:shadow-neumo-inset transition-all inline-flex items-center gap-3"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-neumo-text-secondary" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="signs" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-neumo-bg rounded-neumo-lg p-6 shadow-neumo"
                >
                  <div className="w-12 h-12 bg-neumo-bg rounded-neumo flex items-center justify-center mb-4 shadow-neumo-sm">
                    <Icon className="w-6 h-6 text-neumo-accent" />
                  </div>
                  <h3 className="font-semibold text-neumo-text mb-2">{feature.title}</h3>
                  <p className="text-sm text-neumo-text-secondary">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats & Testimonials Section */}
      <section className="py-16 px-4 bg-neumo-surface">
        <div className="max-w-6xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-2xl md:text-3xl font-bold text-neumo-accent">{stat.value}</p>
                <p className="text-sm text-neumo-text-secondary">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-neumo-bg rounded-neumo-lg p-6 shadow-neumo"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-neumo-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-neumo-accent">{testimonial.initials}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-neumo-text">{testimonial.name}</span>
                      {testimonial.type && (
                        <span className="text-xs px-2 py-0.5 bg-neumo-accent/10 text-neumo-accent rounded-full">
                          {testimonial.type}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-neumo-text-secondary italic">"{testimonial.quote}"</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neumo-text mb-4">What You Can Do on SignRoad</h2>
          </motion.div>

          <div className="space-y-6">
            {howItWorks.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 bg-neumo-accent rounded-full flex items-center justify-center flex-shrink-0 shadow-neumo-sm">
                  <span className="text-white font-bold">{item.step}</span>
                </div>
                <div className="flex-1 bg-neumo-bg rounded-neumo-lg p-5 shadow-neumo">
                  <h3 className="font-semibold text-neumo-text mb-1">{item.title}</h3>
                  <p className="text-sm text-neumo-text-secondary">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <button
              onClick={onGetStarted}
              className="px-6 py-3 bg-neumo-accent text-white font-semibold rounded-neumo shadow-neumo-sm hover:shadow-neumo-inset transition-all"
            >
              Create Your First Goal
            </button>
            <button
              onClick={onGetStarted}
              className="px-6 py-3 bg-neumo-bg text-neumo-text font-semibold rounded-neumo shadow-neumo hover:shadow-neumo-inset transition-all"
            >
              Explore Your Path
            </button>
          </div>
        </div>
      </section>

      {/* Intentions Section */}
      <section className="py-20 px-4 bg-neumo-surface">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neumo-text mb-4">
              Choose an intention that resonates with where you are in your journey
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {intentions.map((intention, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={onGetStarted}
                className="bg-neumo-bg rounded-neumo-lg p-5 shadow-neumo hover:shadow-neumo-inset transition-all text-left"
              >
                <span className="text-2xl mb-2 block">{intention.emoji}</span>
                <h3 className="font-semibold text-neumo-text mb-1">{intention.title}</h3>
                <p className="text-xs text-neumo-text-secondary">{intention.description}</p>
                <span className="text-xs text-neumo-accent mt-2 inline-block">Start Path →</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Message Section */}
      <section id="daily-message" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neumo-text mb-4">
              Your Daily Message from the Universe Awaits
            </h2>
            
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <button
                onClick={onGetStarted}
                className="px-6 py-3 bg-neumo-accent text-white font-semibold rounded-neumo shadow-neumo-sm hover:shadow-neumo-inset transition-all inline-flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Play Today's Audio
              </button>
              <button
                onClick={onGetStarted}
                className="px-6 py-3 bg-neumo-bg text-neumo-text font-semibold rounded-neumo shadow-neumo hover:shadow-neumo-inset transition-all inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Read Today's Message
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Real Stories Section */}
      <section className="py-20 px-4 bg-neumo-surface">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neumo-text mb-4">
              Real Stories, Real Results
            </h2>
            <p className="text-neumo-text-secondary">
              Join thousands who have transformed their lives through structured manifestation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {realStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-neumo-bg rounded-neumo-lg p-6 shadow-neumo"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-neumo-accent/20 rounded-full flex items-center justify-center">
                    <span className="font-bold text-neumo-accent">{story.initials}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-neumo-text">{story.name}</p>
                    <p className="text-xs text-neumo-text-muted">{story.role}</p>
                  </div>
                </div>
                <p className="text-sm text-neumo-text-secondary mb-4 italic">"{story.quote}"</p>
                <div className="bg-neumo-surface rounded-neumo p-3 shadow-neumo-inset-sm">
                  <p className="text-xs text-neumo-text-muted mb-1">Manifested</p>
                  <p className="text-sm font-medium text-neumo-text mb-2">{story.manifested}</p>
                  <div className="flex items-center gap-3 text-xs text-neumo-text-secondary">
                    <span>{story.days} days</span>
                    <span>{story.signs} signs found</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Receipts Section */}
      <section className="py-20 px-4 bg-neumo-surface">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neumo-text mb-4">
              Universe Receipts
            </h2>
            <p className="text-neumo-text-secondary max-w-2xl mx-auto">
              SignRoad generates two types of shareable receipts: one for signs you spot in daily life, 
              and one for goals you manifest. Here are examples of each.
            </p>
          </motion.div>

          {/* Sign Receipts */}
          <div className="mb-16">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xl font-semibold text-neumo-text mb-6 flex items-center gap-2"
            >
              <span className="w-8 h-8 rounded-full bg-neumo-bg shadow-neumo-sm flex items-center justify-center text-sm">
                <Eye className="w-4 h-4 text-neumo-accent" />
              </span>
              Sign Receipts
              <span className="text-sm font-normal text-neumo-text-secondary ml-2">— When you spot a universe sign</span>
            </motion.h3>
            
            <div className="grid md:grid-cols-3 gap-6 items-stretch">
              {signReceipts.map((receipt, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full"
                >
                  {/* Neumorphism outer wrapper */}
                  <div className="bg-neumo-bg rounded-neumo-lg p-3 shadow-neumo h-full">
                    {/* Receipt Paper Style */}
                    <div 
                      className="rounded-neumo overflow-hidden relative h-full flex flex-col"
                      style={{ 
                        fontFamily: "'Courier New', Courier, monospace",
                        backgroundColor: '#f8f5f0',
                        minHeight: '420px'
                      }}
                    >
                      {/* Top dashed border */}
                      <div className="w-full h-3 flex items-center">
                        <div className="w-full border-t-2 border-dashed" style={{ borderColor: '#d4cfc5' }}></div>
                      </div>
                      
                      {/* Receipt Content */}
                      <div className="px-5 py-4 flex-1 flex flex-col">
                        {/* Title */}
                        <h4 className="text-center text-lg font-bold tracking-[0.2em] mb-2" style={{ color: '#4a5568' }}>
                          SIGN RECEIPT
                        </h4>
                        
                        {/* Subtitle badge */}
                        <div className="text-center mb-3">
                          <span className="inline-block px-2 py-0.5 text-[10px] rounded-full" style={{ backgroundColor: '#e8e4dc', color: '#718096' }}>
                            A sign has appeared
                          </span>
                        </div>
                        
                        {/* Equals separator */}
                        <div className="text-center text-xs mb-3" style={{ color: '#a0aec0', letterSpacing: '0.05em' }}>
                          ========================
                        </div>
                        
                        {/* Cosmos message */}
                        <p className="text-center text-sm italic mb-4" style={{ color: '#718096' }}>
                          The cosmos has sent you a sign
                        </p>
                        
                        {/* Sign spotted */}
                        <div className="text-center mb-4 flex-shrink-0">
                          <p className="text-xs mb-1" style={{ color: '#a0aec0' }}>sign spotted:</p>
                          <p className="text-base font-bold" style={{ color: '#2d3748' }}>
                            "{receipt.signSpotted}"
                          </p>
                        </div>
                        
                        {/* Dashed separator */}
                        <div className="flex items-center justify-center my-3">
                          <div className="flex-1 border-t border-dashed" style={{ borderColor: '#c4b8a8' }}></div>
                        </div>
                        
                        {/* Sign Stats */}
                        <div className="mb-3 flex-1">
                          <p className="text-xs font-bold tracking-wider mb-2" style={{ color: '#4a5568' }}>
                            SIGN STATS:
                          </p>
                          <div className="space-y-1.5 text-sm">
                            <div className="flex justify-between">
                              <span style={{ color: '#718096' }}>Day on the road</span>
                              <span className="font-bold" style={{ color: '#2d3748' }}>Day {receipt.dayOnRoad}</span>
                            </div>
                            <div className="flex justify-between">
                              <span style={{ color: '#718096' }}>Times seen today</span>
                              <span className="font-bold" style={{ color: '#2d3748' }}>{receipt.timesSeenToday}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Dashed separator */}
                        <div className="flex items-center justify-center my-3">
                          <div className="flex-1 border-t border-dashed" style={{ borderColor: '#c4b8a8' }}></div>
                        </div>
                        
                        {/* Synchronicity Score */}
                        <div className="text-center mb-3">
                          <p className="text-xs mb-1" style={{ color: '#718096' }}>Synchronicity score:</p>
                          <p className="text-3xl font-bold" style={{ color: '#4a5568' }}>{receipt.synchronicityScore}%</p>
                          <p className="text-xs mt-1" style={{ color: '#a0aec0' }}>The universe is speaking.</p>
                        </div>
                        
                        {/* CTA */}
                        <div className="text-center mt-auto pt-2">
                          <p className="text-[10px]" style={{ color: '#a0aec0' }}>Start your road:</p>
                          <p className="text-xs font-bold" style={{ color: '#4a5568' }}>signroad.com</p>
                        </div>
                      </div>
                      
                      {/* Sign Found Stamp */}
                      <div className="absolute bottom-12 right-3">
                        <div 
                          className="w-16 h-16 rounded-full border-2 flex flex-col items-center justify-center transform -rotate-12"
                          style={{ 
                            borderColor: '#718096',
                            backgroundColor: 'rgba(255, 255, 255, 0.95)'
                          }}
                        >
                          <span className="text-[9px] font-bold" style={{ color: '#718096' }}>SIGN</span>
                          <span className="text-[8px]" style={{ color: '#718096' }}>FOUND</span>
                        </div>
                      </div>
                      
                      {/* Bottom dashed border */}
                      <div className="w-full h-3 flex items-center">
                        <div className="w-full border-t-2 border-dashed" style={{ borderColor: '#d4cfc5' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Goal Receipts */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xl font-semibold text-neumo-text mb-6 flex items-center gap-2"
            >
              <span className="w-8 h-8 rounded-full bg-neumo-bg shadow-neumo-sm flex items-center justify-center text-sm">
                <Target className="w-4 h-4 text-neumo-accent" />
              </span>
              Goal Receipts
              <span className="text-sm font-normal text-neumo-text-secondary ml-2">— When you manifest a goal</span>
            </motion.h3>
            
            <div className="grid md:grid-cols-3 gap-6 items-stretch">
              {goalReceipts.map((receipt, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full"
                >
                  {/* Neumorphism outer wrapper */}
                  <div className="bg-neumo-bg rounded-neumo-lg p-3 shadow-neumo h-full">
                    {/* Receipt Paper Style */}
                    <div 
                      className="rounded-neumo overflow-hidden relative h-full flex flex-col"
                      style={{ 
                        fontFamily: "'Courier New', Courier, monospace",
                        backgroundColor: '#f5f0e8',
                        minHeight: '420px'
                      }}
                    >
                      {/* Top dashed border */}
                      <div className="w-full h-3 flex items-center">
                        <div className="w-full border-t-2 border-dashed" style={{ borderColor: '#c4b8a8' }}></div>
                      </div>
                      
                      {/* Receipt Content */}
                      <div className="px-5 py-4 flex-1 flex flex-col">
                        {/* Title */}
                        <h4 className="text-center text-lg font-bold tracking-[0.2em] mb-2" style={{ color: '#2d3748' }}>
                          GOAL RECEIPT
                        </h4>
                        
                        {/* Subtitle badge */}
                        <div className="text-center mb-3">
                          <span className="inline-block px-2 py-0.5 text-[10px] rounded-full" style={{ backgroundColor: '#e6f4f4', color: '#0E7A77' }}>
                            A manifestation completed
                          </span>
                        </div>
                        
                        {/* Equals separator */}
                        <div className="text-center text-xs mb-3" style={{ color: '#a0aec0', letterSpacing: '0.05em' }}>
                          ========================
                        </div>
                        
                        {/* Cosmos message */}
                        <p className="text-center text-sm italic mb-4" style={{ color: '#4a5568' }}>
                          The cosmos has delivered
                        </p>
                        
                        {/* Manifestation */}
                        <div className="text-center mb-4 flex-shrink-0">
                          <p className="text-xs mb-1" style={{ color: '#718096' }}>a manifested:</p>
                          <p className="text-base font-bold" style={{ color: '#2d3748' }}>
                            "{receipt.manifested}"
                          </p>
                        </div>
                        
                        {/* Dashed separator */}
                        <div className="flex items-center justify-center my-3">
                          <div className="flex-1 border-t border-dashed" style={{ borderColor: '#a0aec0' }}></div>
                        </div>
                        
                        {/* Journey Stats */}
                        <div className="mb-3 flex-1">
                          <p className="text-xs font-bold tracking-wider mb-2" style={{ color: '#2d3748' }}>
                            JOURNEY STATS:
                          </p>
                          <div className="space-y-1.5 text-sm">
                            <div className="flex justify-between">
                              <span style={{ color: '#4a5568' }}>Days on the road</span>
                              <span className="font-bold" style={{ color: '#2d3748' }}>{receipt.days}</span>
                            </div>
                            <div className="flex justify-between">
                              <span style={{ color: '#4a5568' }}>Signs logged</span>
                              <span className="font-bold" style={{ color: '#2d3748' }}>{receipt.signs}</span>
                            </div>
                            <div className="flex justify-between">
                              <span style={{ color: '#4a5568' }}>Sessions completed</span>
                              <span className="font-bold" style={{ color: '#2d3748' }}>{receipt.sessions}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Dashed separator */}
                        <div className="flex items-center justify-center my-3">
                          <div className="flex-1 border-t border-dashed" style={{ borderColor: '#a0aec0' }}></div>
                        </div>
                        
                        {/* Probability */}
                        <div className="text-center mb-3">
                          <p className="text-xs mb-1" style={{ color: '#4a5568' }}>Probability beaten:</p>
                          <p className="text-3xl font-bold" style={{ color: '#2d3748' }}>{receipt.probability}%</p>
                          <p className="text-xs mt-1" style={{ color: '#4a5568' }}>The universe delivered.</p>
                        </div>
                        
                        {/* CTA */}
                        <div className="text-center mt-auto pt-2">
                          <p className="text-[10px]" style={{ color: '#718096' }}>Start your road:</p>
                          <p className="text-xs font-bold" style={{ color: '#2d3748' }}>signroad.com</p>
                        </div>
                      </div>
                      
                      {/* SignRoad Verified Stamp */}
                      <div className="absolute bottom-12 right-3">
                        <div 
                          className="w-16 h-16 rounded-full border-2 flex flex-col items-center justify-center transform rotate-12"
                          style={{ 
                            borderColor: '#0E7A77',
                            backgroundColor: 'rgba(255, 255, 255, 0.95)'
                          }}
                        >
                          <span className="text-[9px] font-bold" style={{ color: '#0E7A77' }}>GOAL</span>
                          <span className="text-[8px]" style={{ color: '#0E7A77' }}>DONE</span>
                        </div>
                      </div>
                      
                      {/* Bottom dashed border */}
                      <div className="w-full h-3 flex items-center">
                        <div className="w-full border-t-2 border-dashed" style={{ borderColor: '#c4b8a8' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-neumo-surface">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neumo-text mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-neumo-text-secondary">
              Start free for 7 days. Cancel anytime.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Monthly */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-neumo-bg rounded-neumo-lg p-6 shadow-neumo"
            >
              <h3 className="text-lg font-semibold text-neumo-text mb-1">Monthly</h3>
              <p className="text-xs text-neumo-text-muted mb-4">Angel number pricing for manifesters</p>
              <p className="text-4xl font-bold text-neumo-text mb-6">
                $11.11 <span className="text-lg font-normal text-neumo-text-secondary">/month</span>
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  'All 1000+ sequential audio lessons',
                  '3 active signs to find',
                  'Unlimited goals & receipts',
                  'Tribe access',
                  '12 background sounds',
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-neumo-text-secondary">
                    <Check className="w-4 h-4 text-neumo-accent flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={onGetStarted}
                className="w-full py-3 bg-neumo-bg text-neumo-text font-semibold rounded-neumo shadow-neumo hover:shadow-neumo-inset transition-all"
              >
                Start Free Trial
              </button>
            </motion.div>

            {/* Annual */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-neumo-bg rounded-neumo-lg p-6 shadow-neumo border-2 border-neumo-accent relative"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-neumo-accent text-white text-xs font-semibold rounded-full">
                Save 33%
              </div>
              <h3 className="text-lg font-semibold text-neumo-text mb-1">Annual</h3>
              <p className="text-xs text-neumo-text-muted mb-4">That's just $7.40/month</p>
              <p className="text-4xl font-bold text-neumo-text mb-6">
                $88.88 <span className="text-lg font-normal text-neumo-text-secondary">/year</span>
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  'Everything in Monthly',
                  'Priority support',
                  'Premium receipt designs',
                  'Private Tribes',
                  'Early access to new features',
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-neumo-text-secondary">
                    <Check className="w-4 h-4 text-neumo-accent flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={onGetStarted}
                className="w-full py-3 bg-neumo-accent text-white font-semibold rounded-neumo shadow-neumo-sm hover:shadow-neumo-inset transition-all"
              >
                Start Free Trial
              </button>
            </motion.div>
          </div>

          {/* Free Forever */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-neumo-bg rounded-neumo-lg p-6 shadow-neumo"
          >
            <h3 className="font-semibold text-neumo-text mb-4 text-center">What Stays Free Forever</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                'Daily personalized message',
                '1 active sign',
                '3 background sounds',
                'Basic Universe Receipt',
                'Public Tribe access',
              ].map((feature, i) => (
                <span key={i} className="px-3 py-1.5 bg-neumo-surface rounded-neumo text-sm text-neumo-text-secondary shadow-neumo-inset-sm">
                  {feature}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neumo-text mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-neumo-bg rounded-neumo-lg shadow-neumo overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between"
                >
                  <span className="font-medium text-neumo-text">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-neumo-text-secondary transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-sm text-neumo-text-secondary">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-neumo-surface">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neumo-text mb-4">
              Your next sign could appear today.
            </h2>
            <p className="text-xl text-neumo-text-secondary mb-8">
              Are you ready to see it?
            </p>
            <button
              onClick={onGetStarted}
              className="px-10 py-4 bg-neumo-accent text-white text-lg font-semibold rounded-neumo shadow-neumo-sm hover:shadow-neumo-inset transition-all inline-flex items-center gap-3"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neumo-text mb-4">
              Insights & Reflections
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-neumo-bg rounded-neumo-lg p-6 shadow-neumo"
              >
                <h3 className="font-semibold text-neumo-text mb-2">{post.title}</h3>
                <p className="text-sm text-neumo-text-secondary mb-4">{post.excerpt}</p>
                <button className="text-sm text-neumo-accent font-medium hover:underline">
                  Read More →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-neumo-surface">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-xl font-semibold text-neumo-text mb-4">
            Get weekly guidance, signs, and insights.
          </h3>
          <form onSubmit={handleGetStarted} className="flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-neumo bg-neumo-bg shadow-neumo-inset text-neumo-text placeholder-neumo-text-muted focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-neumo-accent text-white font-semibold rounded-neumo shadow-neumo-sm hover:shadow-neumo-inset transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-neumo-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-neumo-accent rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="font-bold text-neumo-text">SignRoad</span>
              </div>
              <p className="text-sm text-neumo-text-secondary">
                Find signs, set goals, and manifest progress with daily guidance.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-neumo-text mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-neumo-text-secondary">
                <li><a href="#" className="hover:text-neumo-text">What You Can Do</a></li>
                <li><a href="#signs" className="hover:text-neumo-text">Explore Signs</a></li>
                <li><a href="#daily-message" className="hover:text-neumo-text">Daily Message</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-neumo-text mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-neumo-text-secondary">
                <li><a href="#" className="hover:text-neumo-text">About</a></li>
                <li><a href="#blog" className="hover:text-neumo-text">Blog</a></li>
                <li><a href="mailto:hello@signroad.com" className="hover:text-neumo-text">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-neumo-text mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-neumo-text-secondary">
                <li><a href="#" className="hover:text-neumo-text">Terms</a></li>
                <li><a href="#" className="hover:text-neumo-text">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-neumo-border text-center text-sm text-neumo-text-muted">
            © 2025 SignRoad. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
