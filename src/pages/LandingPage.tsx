import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Target, 
  Eye, 
  Headphones, 
  TrendingUp, 
  Trophy,
  Users,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Play,
  Check,
  Zap
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { LoginForm } from '../components/auth/LoginForm';

// ============================================
// HERO SECTION
// ============================================
const HeroSection: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 mb-8"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-sm text-amber-300 font-medium">Your manifestation journey starts here</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Master your manifestation journey in just{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
            10 minutes a day
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-neutral-300 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          From spotting signs from the universe to manifesting your goals—discover your life's purpose with structure, guidance, and proof.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center gap-4"
        >
          <button
            onClick={onGetStarted}
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-neutral-900 font-bold text-lg rounded-xl shadow-lg shadow-amber-500/25 transition-all duration-300 hover:scale-105"
          >
            Start Your 7-Day Free Journey
          </button>
          <p className="text-sm text-neutral-500">
            No credit card required. $11.11/month after trial.
          </p>
        </motion.div>

        {/* Journey Preview Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {[
            { icon: Target, label: 'Set Goal', color: 'text-blue-400' },
            { icon: Eye, label: 'Find Signs', color: 'text-purple-400' },
            { icon: Headphones, label: 'Daily Audio', color: 'text-teal-400' },
            { icon: Trophy, label: 'Get Receipt', color: 'text-amber-400' },
          ].map((step, index) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/10"
            >
              <step.icon className={`w-8 h-8 ${step.color}`} />
              <span className="text-sm text-neutral-300">{step.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// TRUST BAR
// ============================================
const TrustBar: React.FC = () => {
  const stats = [
    { value: '12,000+', label: 'Active manifesters' },
    { value: '47,293', label: 'Universe Receipts generated' },
    { value: '3.2 days', label: 'Average time to first sign' },
  ];

  return (
    <section className="py-8 bg-neutral-900 border-y border-neutral-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl md:text-3xl font-bold text-amber-400">{stat.value}</div>
              <div className="text-sm text-neutral-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// HOW IT WORKS
// ============================================
const HowItWorks: React.FC = () => {
  const steps = [
    { number: 1, title: 'Create your manifestation goal', description: 'Set a clear intention for what you want to manifest', icon: Target },
    { number: 2, title: 'Get signs to look for', description: 'Receive daily signs from the universe to spot in real life', icon: Eye },
    { number: 3, title: 'Complete daily audio lessons', description: '10-minute guided sessions teaching manifestation techniques', icon: Headphones },
    { number: 4, title: 'Spot your signs', description: 'Train your awareness to notice synchronicities around you', icon: Sparkles },
    { number: 5, title: 'Track your progress', description: 'Monitor sessions completed, signs found, and streaks built', icon: TrendingUp },
    { number: 6, title: 'Achieve your goal', description: 'Watch as the universe delivers what you manifested', icon: Check },
    { number: 7, title: 'Get your Universe Receipt', description: 'Receive proof of your manifestation with real data to share', icon: Trophy },
  ];

  return (
    <section className="py-20 bg-neutral-950 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How It Works: 7 Steps to Mastery
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            A structured path from setting your intention to manifesting your dreams
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 transition-colors ${
                step.number === 7 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <div className="text-xs text-amber-400 font-medium mb-1">Step {step.number}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-neutral-400">{step.description}</p>
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
// DAILY AUDIO & MESSAGE SECTION
// ============================================
const DailyLearningSection: React.FC = () => {
  return (
    <section className="py-20 bg-neutral-900 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Sequential Learning Journey
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            1,000+ audio lessons teaching manifestation & meditation. Everyone follows the same proven path.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Daily Audio Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-gradient-to-br from-teal-500/20 to-teal-600/10 border border-teal-500/30"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-teal-500/30 flex items-center justify-center">
                <Headphones className="w-7 h-7 text-teal-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Daily Audio Lessons</h3>
                <p className="text-teal-300 text-sm">10 minutes of guided learning</p>
              </div>
            </div>
            
            <ul className="space-y-3 mb-6">
              {[
                'Sequential curriculum - Step 1 to Step 1000',
                'Unlock next lesson after completing current',
                'Topics: awareness, manifestation, meditation',
                'AI-generated voices with 12 background sounds',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-neutral-300">
                  <Play className="w-4 h-4 text-teal-400 mt-1 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <div className="p-4 rounded-xl bg-neutral-900/50 border border-teal-500/20">
              <div className="text-xs text-teal-400 mb-1">Now Playing: Step 3</div>
              <div className="text-white font-medium mb-2">"How to Spot Signs"</div>
              <div className="h-1 bg-neutral-700 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-teal-500 rounded-full" />
              </div>
              <div className="flex justify-between text-xs text-neutral-500 mt-1">
                <span>6:42</span>
                <span>10:00</span>
              </div>
            </div>
          </motion.div>

          {/* Daily Message Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-purple-500/30 flex items-center justify-center">
                <MessageCircle className="w-7 h-7 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Daily Personalized Message</h3>
                <p className="text-purple-300 text-sm">Wisdom tailored just for you</p>
              </div>
            </div>
            
            <ul className="space-y-3 mb-6">
              {[
                '1,000+ unique messages in our database',
                'Personalized with your name',
                'Daily encouragement and validation',
                'Free forever - even after trial ends',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-neutral-300">
                  <Sparkles className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <div className="p-4 rounded-xl bg-neutral-900/50 border border-purple-500/20">
              <div className="text-xs text-purple-400 mb-2">Today's Message</div>
              <p className="text-white italic">
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
// USER STORIES / TESTIMONIALS
// ============================================
const UserStories: React.FC = () => {
  const stories = [
    {
      name: 'Emma R.',
      avatar: 'E',
      role: 'Marketing Manager',
      story: 'I was skeptical at first, but after finding my third sign in one week, I knew something was different. Manifested my dream job in 18 days.',
      manifestation: 'Dream job at tech startup',
      days: 18,
      signs: 5,
    },
    {
      name: 'Marcus T.',
      avatar: 'M',
      role: 'Software Engineer',
      story: 'The structured approach is what sold me. No more random affirmations—this actually tracks your progress and shows you proof.',
      manifestation: 'Relationship with soulmate',
      days: 34,
      signs: 12,
    },
    {
      name: 'Aisha K.',
      avatar: 'A',
      role: 'Freelance Designer',
      story: 'My tribe keeps me accountable. Seeing their wins motivates me to keep going. Already manifested 3 goals in 2 months.',
      manifestation: '$10K client contract',
      days: 21,
      signs: 8,
    },
  ];

  return (
    <section className="py-20 bg-neutral-950 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Real Stories, Real Results
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Join thousands who have transformed their lives through structured manifestation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-neutral-900 font-bold">
                  {story.avatar}
                </div>
                <div>
                  <div className="font-semibold text-white">{story.name}</div>
                  <div className="text-sm text-neutral-500">{story.role}</div>
                </div>
              </div>
              
              <p className="text-neutral-300 text-sm mb-4 leading-relaxed">"{story.story}"</p>
              
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <div className="text-xs text-amber-400 mb-1">Manifested</div>
                <div className="text-white font-medium text-sm mb-2">{story.manifestation}</div>
                <div className="flex gap-4 text-xs text-neutral-400">
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
// EXAMPLE RECEIPTS / PROOF SECTION
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
      category: 'Career',
    },
    {
      goal: 'Found my soulmate',
      user: 'Jessica L.',
      days: 45,
      signs: 32,
      sessions: 41,
      streak: 14,
      category: 'Love',
    },
    {
      goal: 'Launched successful business',
      user: 'David K.',
      days: 67,
      signs: 48,
      sessions: 58,
      streak: 21,
      category: 'Finance',
    },
  ];

  return (
    <section className="py-20 bg-neutral-900 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Proof It Works
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Real Universe Receipts from our community. Every stat is tracked and verified.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {receipts.map((receipt, index) => (
            <motion.div
              key={receipt.goal}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-2xl"
              style={{ fontFamily: 'monospace' }}
            >
              {/* Receipt paper background */}
              <div className="bg-[#fdfaf4] p-6 text-neutral-800">
                {/* Tear edge top */}
                <div className="absolute top-0 left-0 right-0 h-3 bg-[repeating-linear-gradient(90deg,transparent,transparent_8px,#fdfaf4_8px,#fdfaf4_16px)]" style={{ borderBottom: '2px dashed #d4c5a9' }} />
                
                <div className="pt-4">
                  {/* Header */}
                  <div className="text-center mb-4">
                    <div className="text-sm font-bold tracking-widest text-neutral-700">UNIVERSE RECEIPT</div>
                    <div className="text-xs text-neutral-500">================================</div>
                  </div>

                  {/* User & Goal */}
                  <div className="text-center mb-4">
                    <div className="text-xs text-neutral-500">{receipt.user} manifested:</div>
                    <div className="text-sm font-bold text-neutral-900 mt-1">"{receipt.goal}"</div>
                  </div>

                  {/* Stats */}
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

                  {/* Verified stamp */}
                  <div className="flex justify-center">
                    <div className="px-4 py-2 border-2 border-blue-600 rounded-full text-blue-600 text-xs font-bold transform -rotate-6">
                      VERIFIED
                    </div>
                  </div>
                </div>

                {/* Tear edge bottom */}
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
// TRIBES SECTION
// ============================================
const TribesSection: React.FC = () => {
  return (
    <section className="py-20 bg-neutral-950 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join Your Tribe
            </h2>
            <p className="text-neutral-400 mb-6">
              5-person accountability groups that keep you motivated and on track. See others' wins, share your progress, and grow together.
            </p>
            
            <ul className="space-y-4">
              {[
                'Matched with like-minded manifesters',
                'See real-time progress of tribe members',
                'Collective Tribe Lantern shows group energy',
                'Celebrate wins together',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-neutral-300">
                  <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-teal-400" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-teal-400" />
                <span className="font-semibold text-white">Manifestation Masters</span>
              </div>
              <div className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-400 text-xs">
                5/5 Active
              </div>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Sarah', health: 92, checked: true },
                { name: 'Marcus', health: 85, checked: true },
                { name: 'Emma', health: 78, checked: false },
                { name: 'David', health: 88, checked: true },
                { name: 'Aisha', health: 95, checked: true },
              ].map((member) => (
                <div key={member.name} className="flex items-center justify-between p-3 rounded-xl bg-neutral-800/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-neutral-900 text-sm font-bold">
                      {member.name[0]}
                    </div>
                    <span className="text-white text-sm">{member.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-xs text-neutral-400">{member.health}%</div>
                    {member.checked && (
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-green-400" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-center">
              <div className="text-xs text-teal-400 mb-1">Tribe Lantern</div>
              <div className="text-2xl font-bold text-white">87.6%</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// PRICING SECTION
// ============================================
const PricingSection: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => {
  return (
    <section className="py-20 bg-neutral-900 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-neutral-400">
            Start free for 7 days. Cancel anytime.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Monthly */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-neutral-800 border border-neutral-700"
          >
            <div className="text-lg font-semibold text-white mb-2">Monthly</div>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-4xl font-bold text-white">$11.11</span>
              <span className="text-neutral-400">/month</span>
            </div>
            <p className="text-sm text-neutral-400 mb-6">Angel number pricing for manifesters</p>
            
            <ul className="space-y-3 mb-8">
              {[
                'All 1000+ sequential audio lessons',
                '3 active signs to find',
                'Unlimited goals & receipts',
                'Tribe access',
                '12 background sounds',
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-neutral-300 text-sm">
                  <Check className="w-4 h-4 text-teal-400" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={onGetStarted}
              className="w-full py-3 rounded-xl bg-neutral-700 hover:bg-neutral-600 text-white font-medium transition-colors"
            >
              Start Free Trial
            </button>
          </motion.div>

          {/* Annual */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative p-8 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30"
          >
            <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-amber-500 text-neutral-900 text-xs font-bold">
              Save 33%
            </div>
            
            <div className="text-lg font-semibold text-white mb-2">Annual</div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl font-bold text-white">$88.88</span>
              <span className="text-neutral-400">/year</span>
            </div>
            <p className="text-sm text-amber-400 mb-6">That's just $7.40/month</p>
            
            <ul className="space-y-3 mb-8">
              {[
                'Everything in Monthly',
                'Priority support',
                'Premium receipt designs',
                'Private Tribes',
                'Early access to new features',
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-neutral-300 text-sm">
                  <Check className="w-4 h-4 text-amber-400" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={onGetStarted}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-neutral-900 font-bold transition-colors"
            >
              Start Free Trial
            </button>
          </motion.div>
        </div>

        {/* What stays free */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 rounded-2xl bg-neutral-800/50 border border-neutral-700"
        >
          <h3 className="text-lg font-semibold text-white mb-4 text-center">What Stays Free Forever</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Daily personalized message',
              '3 background sounds',
              '1 active sign',
              'Public Tribe access',
              'Basic Universe Receipt',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-700/50 text-neutral-300 text-sm">
                <Zap className="w-3 h-3 text-amber-400" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// FAQ SECTION
// ============================================
const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How do signs work?',
      answer: 'Each day, you receive a sign to look for in your daily life (like a feather, coin, or butterfly). When you spot it, you log it in the app. This trains your awareness and helps you notice synchronicities. You can have up to 3 active signs at once with Premium.',
    },
    {
      question: 'What if I don\'t achieve my goal during the trial?',
      answer: 'That\'s completely normal! Manifestation takes time, and the 7-day trial is about experiencing the process, not rushing results. Many users see their first signs within days, but goals often manifest over weeks or months. The journey is just as important as the destination.',
    },
    {
      question: 'Can I share my Universe Receipts?',
      answer: 'Absolutely! Universe Receipts are designed to be shared. When you achieve a goal, you get a beautiful receipt showing your real stats (days, signs found, sessions completed). You can download it as an image or share directly to Instagram, TikTok, or any social platform.',
    },
    {
      question: 'What\'s included in free vs. premium?',
      answer: 'Free users get daily personalized messages, 1 active sign, 3 background sounds, public Tribe access, and basic receipts. Premium unlocks all 1000+ audio lessons, 3 active signs, 12 background sounds, unlimited goals, premium receipt designs, and private Tribes.',
    },
    {
      question: 'Why $11.11 and $88.88?',
      answer: 'These are angel numbers! In manifestation and numerology, repeating numbers like 11:11 are considered powerful signs from the universe. We chose these prices to align with the spiritual nature of the platform and the manifestation community.',
    },
    {
      question: 'How is this different from other meditation apps?',
      answer: 'Unlike Calm or Headspace, SignRoad is specifically designed for manifestation with a structured learning path. We track your progress, assign real-world signs to find, and give you proof of your manifestations through Universe Receipts. It\'s not just meditation—it\'s a complete manifestation system.',
    },
  ];

  return (
    <section className="py-20 bg-neutral-950 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
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
              transition={{ delay: index * 0.05 }}
              className="rounded-xl bg-neutral-900 border border-neutral-800 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-medium text-white pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5">
                  <p className="text-neutral-400 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// FOOTER
// ============================================
const LandingFooter: React.FC = () => {
  return (
    <footer className="py-12 bg-neutral-900 border-t border-neutral-800 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-neutral-900" />
            </div>
            <span className="text-xl font-bold text-white">SignRoad</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-neutral-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          
          <div className="text-sm text-neutral-500">
            &copy; 2025 SignRoad. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

// ============================================
// MAIN LANDING PAGE COMPONENT
// ============================================
export const LandingPage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { isAuthenticated } = useAuthStore();

  // If somehow authenticated, this shouldn't render (App.tsx handles routing)
  if (isAuthenticated) {
    return null;
  }

  if (showLogin) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <button
            onClick={() => setShowLogin(false)}
            className="mb-6 text-neutral-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <ChevronDown className="w-4 h-4 rotate-90" />
            Back to home
          </button>
          <LoginForm />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <HeroSection onGetStarted={() => setShowLogin(true)} />
      <TrustBar />
      <HowItWorks />
      <DailyLearningSection />
      <UserStories />
      <ProofSection />
      <TribesSection />
      <PricingSection onGetStarted={() => setShowLogin(true)} />
      <FAQSection />
      <LandingFooter />
    </div>
  );
};
